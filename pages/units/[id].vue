<template>
  <div class="flex flex-col gap-y-4">
    <h1 class="text-2xl font-bold">Списания МСК-4</h1>
    <section class="flex flex-col gap-y-1">
      <label class="font-semibold">Дата списаний</label>
      <DatePicker
        v-model="date"
        date-format="dd.mm.yy - DD"
        class="w-full md:w-64"
      />
    </section>
    <DataTable
      v-model:selection="selectedIngredients"
      :value="ingredientWriteOffs"
      selectionMode="multiple"
      :metaKeySelection="false"
      dataKey="id"
    >
      <template #header>
        <section class="flex items-center justify-between md:justify-end gap-2">
          <div class="flex gap-x-4 items-center">
            <i
              class="pi"
              :class="[isWrittenOffVisible ? 'pi-eye' : 'pi-eye-slash']"
            >
            </i>
            <label for="isWrittenOffVisible" class="font-semibold">
              Показать списанные
            </label>
          </div>

          <ToggleSwitch
            input-id="isWrittenOffVisible"
            v-model="isWrittenOffVisible"
          />
        </section>
      </template>
      <template #empty>
        <Message
          class="flex justify-center items-center"
          severity="warn"
          icon="pi pi-exclamation-triangle"
        >
          Нет данных
        </Message>
      </template>
      <Column field="ingredientName" header="Ингредиент" />
      <Column field="toWriteOffAt" header="Время списания">
        <template #body="{ data }: { data: IngredientWriteOff }">
          <DateStringToTime :date="data.toWriteOffAt" />
        </template>
      </Column>
      <Column field="isWrittenOff" header="Время списания">
        <template #body="{ data }: { data: IngredientWriteOff }">
          <DateStringToTime
            v-if="data.writtenOffAt !== null"
            :date="data.writtenOffAt"
          />
          <WriteOffCountdown
            v-else
            :toWriteOffAt="parseISO(data.toWriteOffAt)"
          />
        </template>
      </Column>
      <template #footer v-if="isToday">
        <section class="flex items-center justify-center">
          <Button
            label="Добавить ингредиент"
            icon="pi pi-plus"
            class="w-full md:w-auto"
            @click="isWriteOffDialogVisible = true"
          />
        </section>
      </template>
      <template #footer v-if="selectedIngredients.length > 0">
        <section
          class="flex md:flex-row flex-col justify-between items-center gap-2"
        >
          <span> Выбрано {{ selectedIngredients.length }} ингредиентов </span>
          <Button
            @click="onResetSelectedIngredients"
            icon="pi pi-times"
            label="Сбросить"
            class="md:w-auto w-full"
            outlined
          />
        </section>
      </template>
    </DataTable>
    <WriteOffCreateDialog
      v-model:visible="isWriteOffDialogVisible"
      class="mx-4"
      :ingredients="ingredients!"
      @submit="onCreateWriteOff"
    />
    <MainButton
      :visible="selectedIngredients.length > 0"
      text="Списать"
      @click="onWriteOff"
    />
    <SecondaryButton
      :visible="selectedIngredients.length > 0"
      text="Удалить"
      @click="onRemoveWriteOffs"
    />
    <BackButton @click="navigateTo({ name: 'index' })" />
  </div>
</template>

<script setup lang="ts">
import {
  MainButton,
  SecondaryButton,
  usePopup,
  useHapticFeedback,
  BackButton,
} from "vue-tg";
import { parseISO, format, differenceInMilliseconds } from "date-fns";
import type {
  IngredientWriteOff,
  IngredientWriteOffCreateEvent,
} from "~/types/write-offs";
import { useIntervalFn } from "@vueuse/core";
import type { Ingredient } from "~/types/ingredients";

const { notificationOccurred } = useHapticFeedback();
const { showAlert, showConfirm } = usePopup();

const route = useRoute();
const unitId = route.params.id as string;

const isWriteOffDialogVisible = ref<boolean>(false);

const date = ref<Date>(new Date());

const isToday = useIsToday(date);

const isWrittenOffVisible = ref<boolean>(false);

const { data: ingredients } = await useFetch<Ingredient[]>("/api/ingredients");

const query = computed(() => {
  return {
    date: format(date.value, "yyyy-MM-dd"),
  };
});
const { data, refresh, error } = await useFetch<IngredientWriteOff[]>(
  "/api/write-offs",
  { query }
);

useIntervalFn(async () => {
  await refresh();
  if (error.value) {
    console.error("Could not load data:", error.value);
    showAlert?.("Не удалось загрузить данные");
  }
}, 30_000);

const sortByToWriteOffAt = (a: IngredientWriteOff, b: IngredientWriteOff) => {
  const now = new Date();
  const diffA = Math.abs(differenceInMilliseconds(a.toWriteOffAt, now));
  const diffB = Math.abs(differenceInMilliseconds(b.toWriteOffAt, now));
  return diffA - diffB;
};

const ingredientWriteOffs = computed((): IngredientWriteOff[] => {
  let writeOffs = data.value ?? [];
  if (!isWrittenOffVisible.value) {
    writeOffs = writeOffs.filter((writeOff) => writeOff.writtenOffAt === null);
  }
  return writeOffs.toSorted(sortByToWriteOffAt);
});

const selectedIngredients = ref([]);

const onResetSelectedIngredients = () => {
  selectedIngredients.value = [];
};

const onWriteOff = () => {
  showConfirm?.(
    `Вы уверены что хотите списать ${selectedIngredients.value.length} ингредиентов?`,
    (ok: boolean) => {
      if (!ok) return;
      notificationOccurred?.("success");
      showAlert?.("Ингредиенты успешно списаны");
    }
  );
};

const onRemoveWriteOffs = () => {
  showConfirm?.(
    `Вы уверены что хотите удалить ${selectedIngredients.value.length} списаний?`,
    (ok: boolean) => {
      if (!ok) return;
      notificationOccurred?.("success");
      showAlert?.("Списания успешно удалены");
    }
  );
};

const onCreateWriteOff = async (event: IngredientWriteOffCreateEvent) => {
  try {
    console.log(event)
    await $fetch("/api/write-offs", {
      method: "POST",
      body: {...event, unitId},
    });
    await refresh();
    notificationOccurred?.("success");
    showAlert?.("Списание ингредиента успешно запланировано");
  } catch (error) {
    notificationOccurred?.("error");
    showAlert?.("Не удалось создать запланированное списание");
  }
};
</script>
