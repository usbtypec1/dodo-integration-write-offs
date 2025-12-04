import type { Ingredient } from "~/server/types/ingredients";

export default defineEventHandler(async (_) => {
  const runtimeConfig = useRuntimeConfig();

  return await $fetch<Ingredient[]>("/write-offs/ingredients/", {
    baseURL: runtimeConfig.apiBaseUrl,
  });
});
