import { fromHoursToSeconds } from "./utils/fromHoursToSeconds";

export const JWT_SECRET = process.env.JWT_SECRET;
export const HOUR_TO_MINUTES = 60;
export const MINUTE_TO_SECONDS = 60;
export const DURATION_LIMIT_IN_HOURS = 8;

export const DURATION_LIMIT_IN_SECONDS = fromHoursToSeconds(
  DURATION_LIMIT_IN_HOURS
);
