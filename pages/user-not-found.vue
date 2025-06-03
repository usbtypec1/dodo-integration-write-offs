<template>
  <div>
    <h1 class="text-2xl font-semibold">У вас нет доступа</h1>
    <MainButton @click="close" text="Закрыть" />
  </div>
</template>

<script setup lang="ts">
import { useMiniApp, MainButton } from "vue-tg";

const { close } = useMiniApp();
</script>
