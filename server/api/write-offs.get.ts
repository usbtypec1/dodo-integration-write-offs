import { IngredientWriteOffsResponse } from "~/server/types/write-offs";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const date = query.date as string | undefined; // expected in 'YYYY-MM-DD' format
  const unitId = query.unitId as string | undefined

  const runtimeConfig = useRuntimeConfig();
  const responseData = await $fetch<IngredientWriteOffsResponse>(
    "/write-offs/",
    {
      baseURL: runtimeConfig.apiBaseUrl,
      query: { date, unit_id: unitId },
    }
  );

  return responseData.ingredient_write_offs.map((writeOff) => ({
    id: writeOff.id,
    ingredientName: writeOff.ingredient_name,
    toWriteOffAt: writeOff.to_write_off_at,
    writtenOffAt: writeOff.written_off_at,
    createdAt: writeOff.created_at,
  }));
});
