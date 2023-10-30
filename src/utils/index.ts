import { HOUR_TO_MINUTES, MINUTE_TO_SECONDS } from "../const";

export const fromHoursToSeconds = (numberOfHours: number) =>
  numberOfHours * HOUR_TO_MINUTES * MINUTE_TO_SECONDS;
