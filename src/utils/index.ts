import { HOUR_TO_MINUTE, MINUTE_TO_SECONDS } from "../const";

export const toSeconds = (hours: number) =>
  hours * MINUTE_TO_SECONDS * HOUR_TO_MINUTE;

export const toNumber = (value: string) => {
  const aNumber = Number(value);
  if (isNaN(aNumber)) throw new Error(`${value} is not a number`);

  return aNumber;
};

export const toDate = (value: string) => {
  if (isNaN(Date.parse(value))) throw new Error(`${value} is invalid datetime`);
  return new Date(value);
};

export const isEmptyString = (value: string) => value.length === 0;
