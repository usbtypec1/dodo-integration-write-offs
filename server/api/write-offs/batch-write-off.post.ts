export default defineEventHandler(async (event) => {
  // Read JSON or form data from the POST request body
  const body = await readBody(event);

  const runtimeConfig = useRuntimeConfig();

  await $fetch("/write-offs/batch-write-off/", {
    method: "POST",
    baseURL: runtimeConfig.apiBaseUrl,
    body: {
      ingredient_write_off_ids: body.writeOffIds,
    },
  });

  setResponseStatus(event, 204);
  return null;
});
