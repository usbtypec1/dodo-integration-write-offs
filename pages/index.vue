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
          />
        </section>
      </template>
    </DataTable>
    <MainButton :visible="selectedIngredients.length > 0" text="Списать" />
  </div>
</template>

<script setup lang="ts">
import { MainButton } from "vue-tg";
import { parseISO, format } from "date-fns";
import type { IngredientWriteOff } from "~/types/write-offs";

const date = ref<Date>(new Date());

const isToday = useIsToday(date);

const isWrittenOffVisible = ref<boolean>(false);

const query = computed(() => {
  return {
    date: format(date.value, "yyyy-MM-dd"),
  };
});
const { data } = await useFetch<{ ingredientWriteOffs: IngredientWriteOff[] }>(
  "/api/write-offs",
  {
    query,
  }
);

const ingredientWriteOffs = computed((): IngredientWriteOff[] => {
  let writeOffs = data.value?.ingredientWriteOffs ?? [];
  if (!isWrittenOffVisible.value) {
    writeOffs = writeOffs.filter((writeOff) => writeOff.writtenOffAt === null);
  }
  return writeOffs;
});

const selectedIngredients = ref([]);
</script>
