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
    <FormField v-slot="$field" name="ingredientId">
      <FloatLabel variant="on">
        <Select
            :options="ingredients"
            filter
            :filter-fields="['name']"
            filter-placeholder="Поиск по названию"
            empty-message="Нет ингредиентов для поиска"
            empty-filter-message="Ингредиент не найден"
            option-value="id"
            option-label="name"
            :input-id="ingredientIdInputId"
            fluid
        >
          <template #option="slotProps">
            <div class="max-w-64">
              {{ slotProps.option.name }}
            </div>
          </template>
        </Select>
        <label :for="ingredientIdInputId">Ингредиент</label>
      </FloatLabel>
      <Message v-if="$field.error" severity="error" variant="simple">
        {{ $field.error.message }}
      </Message>
    </FormField>

    <!-- Поля для ввода времени -->
    <div class="flex gap-2">
      <FormField v-slot="$field" name="hour">
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

      <FormField v-slot="$field" name="minute">
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

    <Button label="Сохранить" type="submit" icon="pi pi-check" />
  </Form>
</template>

<script lang="ts" setup>
import type { FormSubmitEvent } from "@primevue/forms/form";
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import type { Ingredient } from "~/types/ingredients";
import type { IngredientWriteOffCreateEvent } from "~/types/write-offs";

defineProps<{ ingredients: Ingredient[] }>();

const emit = defineEmits<{
  submit: [event: IngredientWriteOffCreateEvent];
}>();

const ingredientIdInputId = useId();
const hourInputId = useId();
const minuteInputId = useId();

const resolver = zodResolver(
    z.object({
      ingredientId: z.string({ message: "Выберите ингредиент" }),
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

  const { ingredientId, hour, minute } = event.values;

  // Construct ISO datetime string without timezone (e.g. "2025-10-31T14:30:00")
  const now = new Date();

  // Add 3 hours safely with rollover handling
  const adjustedDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hour - 3, // Add 3 hours
      minute,
      0
  );

  const isoDate = adjustedDate.toISOString().slice(0, 19); // "YYYY-MM-DDTHH:mm:ss"

  console.log("[WriteOffCreateForm emit]:", { ingredientId, toWriteOffAt: isoDate });

  emit("submit", {
    ingredientId,
    toWriteOffAt: isoDate,
  } as IngredientWriteOffCreateEvent);
};
</script>
