<template>
  <Tag v-if="minutesLeft <= 0" value="Просрочка" severity="danger" />
  <Tag
    v-else-if="minutesLeft <= 15"
    :value="`Осталось ${minutesLeft} минут`"
    severity="warn"
  />
  <p v-else>Нет</p>
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
</script>
