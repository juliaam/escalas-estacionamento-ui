import { Period } from "../enums/period";

export function getAvailablePeriod(dayOfWeek: number) {
  if (dayOfWeek === 0) return Period.values;
  return [Period.enum.night];
}
