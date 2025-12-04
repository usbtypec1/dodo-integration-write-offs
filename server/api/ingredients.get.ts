import type { Ingredient } from "~/server/types/ingredients";

export default defineCachedEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const query = getQuery(event)
  const name = query.name
  return await $fetch<Ingredient[]>("/write-offs/ingredients/", {
    baseURL: runtimeConfig.apiBaseUrl,
    query: { name },
  });
}, { maxAge: 60 * 15 });
