import { HOUR_TO_MINUTE, MINUTE_TO_SECONDS } from "../const";

export const toSeconds = (hours: number) =>
  hours * MINUTE_TO_SECONDS * HOUR_TO_MINUTE;
