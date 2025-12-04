import { Unit } from "~/server/types/units";

export default defineEventHandler(async (event) => {
  const unitId = getRouterParam(event, "id");

  if (!unitId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Unit ID is required",
      message: "Unit ID is required to fetch unit details.",
    });
  }
  const runtimeConfig = useRuntimeConfig();
  const responseData = await $fetch<{ units: Unit[] }>(`units/`, {
    baseURL: runtimeConfig.apiBaseUrl,
  });

  const unit = responseData.units.find((unit) => unit.id === Number(unitId));
  if (!unit) {
    throw createError({
      statusCode: 404,
      statusMessage: "Unit Not Found",
      message: `Unit with ID ${unitId} not found.`,
    });
  }
  return {
    id: unit.id,
    name: unit.name,
  };
});
