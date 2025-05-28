<template>
  <Form
    :resolver
    :validate-on-blur="false"
    :validate-on-mount="false"
    :validate-on-submit="true"
    :validate-on-value-update="false"
    class="flex flex-col gap-4 py-2"
  >
    <FormField v-slot="$field" name="ingredientName">
      <FloatLabel variant="on">
        <label for="">Ингредиент</label>
        <InputText fluid />
      </FloatLabel>
      <Message v-if="$field.error" severity="error" variant="simple">
        {{ $field.error.message }}
      </Message>
    </FormField>
    <FormField v-slot="$field" name="toWriteOffAt">
      <FloatLabel variant="on">
        <label for="">Время списания</label>
        <DatePicker time-only fluid />
      </FloatLabel>
      <Message v-if="$field.error" severity="error" variant="simple">
        {{ $field.error.message }}
      </Message>
    </FormField>
    <Button label="Сохранить" type="submit" icon="pi pi-check" />
  </Form>
</template>

<script lang="ts" setup>
import { z } from "zod";
import { zodResolver } from "@primevue/forms/resolvers/zod";

const resolver = zodResolver(
  z.object({
    ingredientName: z
      .string({ message: "Введите название ингредиента" })
      .max(100, {
        message: "Название ингредиента не может превышать 100 символов",
      }),
    toWriteOffAt: z.date({
      message: "Введите время списания",
    }),
  })
);
</script>
