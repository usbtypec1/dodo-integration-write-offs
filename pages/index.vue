<template>
  <div class="flex flex-col gap-y-4">
    <DatePicker v-model="date" fluid date-format="dd.mm.yy - DD" />
    <DataTable
      v-model:selection="selectedIngredients"
      :value="ingredientWriteOffs"
      selectionMode="multiple"
      :metaKeySelection="false"
      dataKey="id"
    >
      <template #header>
        <section class="flex items-center gap-2">
          <ToggleSwitch
            input-id="isWrittenOffVisible"
            v-model="isWrittenOffVisible"
          />
          <label for="isWrittenOffVisible">Показать списанные</label>
        </section>
      </template>
      <template #empty>
        <p class="text-center mb-2">Нет данных</p>
        <Button label="Добавьте первый ингредиент" fluid />
      </template>
      <Column field="ingredientName" header="Ингредиент" />
      <Column field="toWriteOffAt" header="Время списания">
        <template #body="{ data }: { data: IngredientWriteOff }">
          {{ format(parseISO(data.toWriteOffAt), "hh:MM") }}
        </template>
      </Column>
      <Column field="isWrittenOff" header="Время списания">
        <template #body="{ data }: { data: IngredientWriteOff }">
          <p v-if="data.writtenOffAt !== null">
            {{ format(parseISO(data.writtenOffAt), "hh:MM") }}
          </p>
          <WriteOffCountdown
            v-else
            :toWriteOffAt="parseISO(data.toWriteOffAt)"
          />
        </template>
      </Column>
    </DataTable>
    <MainButton :visible="selectedIngredients.length > 0" text="Списать"/>
  </div>
</template>

<script setup lang="ts">
import { MainButton } from 'vue-tg'
import { parseISO, format } from "date-fns";
import type { IngredientWriteOff } from "~/types/write-offs";

const date = ref<Date>(new Date());

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
