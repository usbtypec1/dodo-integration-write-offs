import { isToday } from "date-fns";

export const useIsToday = (date: Ref<Date>) => {
  return computed((): boolean => isToday(date.value));
};
