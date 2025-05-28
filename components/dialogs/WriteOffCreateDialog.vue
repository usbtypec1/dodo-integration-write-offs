<template>
  <Dialog
    v-model:visible="visible"
    header="Добавить списание"
    modal
    class="w-full md:w-96"
  >
    <WriteOffCreateForm :ingredients />
  </Dialog>
</template>

<script lang="ts" setup>
import type { Ingredient } from "~/types/ingredients";

defineProps<{
  ingredients: Ingredient[];
}>();

const visible = defineModel<boolean>("visible", {
  default: false,
});
</script>
