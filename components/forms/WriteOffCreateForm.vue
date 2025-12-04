<template>
  <Form
      :resolver
      :validate-on-blur="false"
      :validate-on-mount="false"
      :validate-on-submit="true"
      :validate-on-value-update="false"
      class="flex flex-col gap-4 py-2"
      @submit="onSubmit"
  >
    <!-- Поле выбора ингредиента -->
    <FormField v-slot="$field" name="ingredient">
      <FloatLabel variant="on">
        <AutoComplete
            :suggestions="ingredients"
            filter
            empty-message="Нет ингредиентов для поиска"
            empty-filter-message="Ингредиент не найден"
            option-label="name"
            :input-id="ingredientIdInputId"
            fluid
            force-selection
            :loading="loading"
            @complete="emit('search', $event.query)"
        >
          <template #option="slotProps">
            <div class="max-w-64">
              {{ slotProps.option.name }}
            </div>
          </template>
        </AutoComplete>
        <label :for="ingredientIdInputId">Ингредиент</label>
      </FloatLabel>
      <Message v-if="$field.error" severity="error" variant="simple">
        {{ $field.error.message }}
      </Message>
    </FormField>

    <FloatLabel variant="on">
      <DatePicker v-model="date" show-week class="w-full sm:w-[30rem]"/>
      <label>Дата</label>
    </FloatLabel>

    <!-- Поля для ввода времени -->
    <div class="flex gap-2 justify-between">
      <FormField v-slot="$field" name="hour" class="grow">
        <FloatLabel variant="on">
          <InputNumber
              :input-id="hourInputId"
              fluid
              :min="0"
              :max="23"
              :use-grouping="false"
          />
          <label :for="hourInputId">Часы (0–23)</label>
        </FloatLabel>
        <Message v-if="$field.error" severity="error" variant="simple">
          {{ $field.error.message }}
        </Message>
      </FormField>

      <FormField v-slot="$field" name="minute" class="grow">
        <FloatLabel variant="on">
          <InputNumber
              :input-id="minuteInputId"
              fluid
              :min="0"
              :max="59"
              :use-grouping="false"
          />
          <label :for="minuteInputId">Минуты (0–59)</label>
        </FloatLabel>
        <Message v-if="$field.error" severity="error" variant="simple">
          {{ $field.error.message }}
        </Message>
      </FormField>
    </div>

    <Button label="Сохранить" type="submit" icon="pi pi-check"/>
  </Form>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from "@primevue/forms/form";
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import type { Ingredient } from "~/types/ingredients";
import type { IngredientWriteOffCreateEvent } from "~/types/write-offs";

defineProps<{ ingredients: Ingredient[], loading: boolean }>();

const emit = defineEmits<{
  submit: [event: IngredientWriteOffCreateEvent];
  search: [ingredientName: string];
}>();

const date = ref<Date>(new Date());

const ingredientIdInputId = useId();
const hourInputId = useId();
const minuteInputId = useId();

const resolver = zodResolver(
    z.object({
      ingredient: z.any({ message: "Выберите ингредиент" }),
      hour: z
          .number({ message: "Введите часы" })
          .min(0, { message: "Минимум 0" })
          .max(23, { message: "Максимум 23" }),
      minute: z
          .number({ message: "Введите минуты" })
          .min(0, { message: "Минимум 0" })
          .max(59, { message: "Максимум 59" }),
    })
);

const onSubmit = (event: FormSubmitEvent) => {
  if (!event.valid) return;

  const year = date.value.getFullYear();
  const month = date.value.getMonth(); // 0-based for Date()
  const day = date.value.getDate();

  const toWriteOffAtLocal = new Date(year, month, day, event.values.hour, event.values.minute, 0);
  const toWriteOffAtUTC = toWriteOffAtLocal.toISOString().slice(0, 19);

  console.log("[WriteOffCreateForm emit]:", {
    ingredientId: event.values.ingredient.id,
    toWriteOffAt: toWriteOffAtUTC
  });

  emit("submit", {
    ingredientId: event.values.ingredient.id,
    toWriteOffAt: toWriteOffAtUTC,
  } as IngredientWriteOffCreateEvent);
};
</script>
