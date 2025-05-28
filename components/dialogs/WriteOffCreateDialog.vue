<template>
  <Dialog v-model:visible="visible" header="Добавить списание" modal class="w-full md:w-96">
    <WriteOffCreateForm />
  </Dialog>
</template>

<script lang="ts" setup>
const visible = defineModel<boolean>("visible", {
  default: false,
});
</script>
