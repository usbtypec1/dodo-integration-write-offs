<template>
  <div class="flex flex-col gap-y-4">
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
          <i
            class="pi"
            :class="[isWrittenOffVisible ? 'pi-eye' : 'pi-eye-slash']"
          >
          </i>
          <label for="isWrittenOffVisible" class="font-semibold">
            Показать списанные
          </label>

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
    </DataTable>
    <WriteOffCreateDialog
      v-model:visible="isWriteOffDialogVisible"
      class="mx-4"
    />
    <MainButton
      :visible="selectedIngredients.length > 0"
      text="Списать"
      @click="onWriteOff"
    />
  </div>
</template>

<script setup lang="ts">
import { MainButton, usePopup } from "vue-tg";
import { parseISO, format, differenceInMilliseconds } from "date-fns";
import type { IngredientWriteOff } from "~/types/write-offs";
import { useIntervalFn } from "@vueuse/core";

const { showAlert } = usePopup();

const isWriteOffDialogVisible = ref<boolean>(false);

const date = ref<Date>(new Date());

const isToday = useIsToday(date);

const isWrittenOffVisible = ref<boolean>(false);

const query = computed(() => {
  return {
    date: format(date.value, "yyyy-MM-dd"),
  };
});
const { data, refresh, error } = await useFetch<{
  ingredientWriteOffs: IngredientWriteOff[];
}>("/api/write-offs", { query });

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
  let writeOffs = data.value?.ingredientWriteOffs ?? [];
  if (!isWrittenOffVisible.value) {
    writeOffs = writeOffs.filter((writeOff) => writeOff.writtenOffAt === null);
  }
  return writeOffs.toSorted(sortByToWriteOffAt);
});

const selectedIngredients = ref([]);

const onWriteOff = () => {
  showAlert?.("Ингредиенты успешно списаны");
};
</script>
