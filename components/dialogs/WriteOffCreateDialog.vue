<template>
  <Dialog
      v-model:visible="visible"
      header="Добавить списание"
      modal
      class="w-full md:w-96"
  >
    <WriteOffCreateForm :ingredients :loading="loading" @submit="onSubmit" @search="onSearch"/>
  </Dialog>
</template>

<script lang="ts" setup>
import type { Ingredient } from "~/types/ingredients";
import type { IngredientWriteOffCreateEvent } from "~/types/write-offs";

const { loading = false } = defineProps<{
  ingredients: Ingredient[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  submit: [event: IngredientWriteOffCreateEvent];
  search: [ingredientName: string];
}>();

const visible = defineModel<boolean>("visible", {
  default: false,
});

const onSubmit = (event: IngredientWriteOffCreateEvent) => {
  emit("submit", event);
  visible.value = false;
};

const onSearch = (ingredientName: string) => {
  emit("search", ingredientName);
};
</script>
