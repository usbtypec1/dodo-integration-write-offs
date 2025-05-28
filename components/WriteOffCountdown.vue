<template>
  <Tag :value="tagValue" :severity="tagSeverity" />
</template>

<script setup lang="ts">
import { useNow } from "@vueuse/core";
import { differenceInMinutes } from "date-fns";

const props = defineProps<{
  toWriteOffAt: Date;
}>();

const now = useNow({ interval: 10_000 });

const minutesLeft = computed(() => {
  return differenceInMinutes(props.toWriteOffAt, now.value);
});

const tagSeverity = computed(() => {
  if (minutesLeft.value <= 0) return "danger";
  if (minutesLeft.value <= 15) return "warn";
  return "success";
});

const tagValue = computed(() => {
  if (minutesLeft.value <= 0) return "Просрочка";
  return `Осталось ${minutesLeft.value} минут`;
});
</script>
