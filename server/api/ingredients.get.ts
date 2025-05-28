import { IngredientsResponse } from "~/server/types/ingredients";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();

  const responseData = await $fetch<IngredientsResponse>("/write-offs/ingredients/", {
    baseURL: runtimeConfig.apiBaseUrl,
  });

  return responseData.ingredients.map(({ id, name }) => ({ id, name }));
});
