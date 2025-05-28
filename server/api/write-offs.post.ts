export default defineEventHandler(async (event) => {
  // Read JSON or form data from the POST request body
  const body = await readBody(event);

  const runtimeConfig = useRuntimeConfig();
  await $fetch("/write-offs/", {
    method: "POST",
    baseURL: runtimeConfig.apiBaseUrl,
    body: {
      ingredient_id: body.ingredientId,
      to_write_off_at: body.toWriteOffAt,
      unit_id: body.unitId,
    },
  });

  setResponseStatus(event, 201);
  return null;
});
