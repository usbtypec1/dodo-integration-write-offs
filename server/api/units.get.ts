import { UnitsResponse } from "~/server/types/units";

export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig();
  const responseData = await $fetch<UnitsResponse>("/units/", {
    baseURL: runtimeConfig.apiBaseUrl,
  });
  return responseData.units.map(({ id, name }) => ({ id, name }));
});
