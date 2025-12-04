<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Выберите точку продаж</h1>
    <Message
      v-if="units?.length === 0"
      severity="warn"
      icon="pi pi-exclamation-triangle"
    >
      Нет доступных точек продаж
    </Message>
    <section
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
    >
      <NuxtLink
        v-for="unit in units"
        :key="unit.id"
        :to="{ name: 'units-id', params: { id: unit.id } }"
      >
        <Card>
          <template #content>
            <span class="text-lg font-semibold">{{ unit.name }}</span>
          </template>
        </Card>
      </NuxtLink>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useMiniApp } from "vue-tg";
import type { Unit } from "~/types/units";

const { initDataUnsafe } = useMiniApp();

const { data: units, error } = await useFetch<Unit[]>("/api/units", {
  query: {
    userId: initDataUnsafe?.user?.id ?? 896678539,
  },
});
watchEffect(async () => {
  if (error.value) {
    await navigateTo({
      name: "user-not-found",
    });
  } else if (units.value && units.value.length === 1) {
    await navigateTo({
      name: "units-id",
      params: { id: units.value[0].id },
    });
  }
});
</script>
