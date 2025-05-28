<template>
  <Dialog
    v-model:visible="visible"
    header="Добавить списание"
    modal
    class="w-full md:w-96"
  >
    <WriteOffCreateForm @submit="onSubmit" :ingredients />
  </Dialog>
</template>

<script lang="ts" setup>
import type { Ingredient } from "~/types/ingredients";
import type { IngredientWriteOffCreateEvent } from "~/types/write-offs";

defineProps<{
  ingredients: Ingredient[];
}>();

const emit = defineEmits<{
  submit: [event: IngredientWriteOffCreateEvent];
}>();

const visible = defineModel<boolean>("visible", {
  default: false,
});

const onSubmit = (event: IngredientWriteOffCreateEvent) => {
  emit("submit", event);
  visible.value = false;
};
</script>
