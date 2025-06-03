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
    <FormField v-slot="$field" name="toWriteOffAt">
      <FloatLabel variant="on">
        <label :for="toWriteOffAtInputId">Время списания</label>
        <DatePicker time-only :input-id="toWriteOffAtInputId" fluid />
      </FloatLabel>
      <Message v-if="$field.error" severity="error" variant="simple">
        {{ $field.error.message }}
      </Message>
    </FormField>
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
const toWriteOffAtInputId = useId();

const resolver = zodResolver(
  z.object({
    ingredientId: z.string({ message: "Выберите ингредиент" }),
    toWriteOffAt: z.date({
      message: "Введите время списания",
    }),
  })
);

const onSubmit = (event: FormSubmitEvent) => {
  if (!event.valid) return;
  console.log("[WriteOffCreateForm]: ", event);
  emit("submit", event.values as IngredientWriteOffCreateEvent);
};
</script>
