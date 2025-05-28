<template>
  <span>{{ formattedDate }}</span>
</template>

<script setup lang="ts">
import { format, parseISO } from "date-fns";

const props = defineProps<{
  date: Date | string;
}>();

const formattedDate = computed((): string => {
  if (props.date instanceof Date) {
    return format(props.date, "hh:mm");
  } else if (typeof props.date === "string") {
    return format(parseISO(props.date), "hh:mm");
  }
  return "Unknown date format";
});
</script>
