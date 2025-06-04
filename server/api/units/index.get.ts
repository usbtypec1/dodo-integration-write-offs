import { UnitsResponse } from "~/server/types/units";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const userId = query.userId as string | undefined;

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "User ID is required",
      message: "User ID is required to fetch units.",
    });
  }

  const runtimeConfig = useRuntimeConfig();
  try {
    const responseData = await $fetch<UnitsResponse>(
      `roles/users/${userId}/units/`,
      {
        baseURL: runtimeConfig.apiBaseUrl,
      }
    );
    return responseData.units.map(({ id, name }) => ({ id, name }));
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw createError({
        statusCode: 404,
        statusMessage: "User Not Found",
        message: "User with the given ID not found.",
      });
    }
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
      message: "Failed to fetch units.",
    });
  }
});
