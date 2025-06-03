import { UnitsResponse } from "~/server/types/units";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userId = query.userId as string | undefined;

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID is required",
    });
  }

  const runtimeConfig = useRuntimeConfig();
  const responseData = await $fetch<UnitsResponse>(`roles/users/${userId}/units/`, {
    baseURL: runtimeConfig.apiBaseUrl,
  });
  return responseData.units.map(({ id, name }) => ({ id, name }));
});
