import { InputDate, InputTime } from "../date-handlers";
import { DateTimeFormatter, ISONumberPadding } from "./utils";

// Crying rn

const ISODateRegex = /(((?<day>\d{2})-)?(?<month>\d{2})-)?(?<year>\d{4})/;
const ISOTimeRegex = /(?<hour>\d{2}):(?<minute>\d{2})/;

const inputDateToISOString = (date: InputDate): string =>
  isNaN(date.month)
    ? `${date.year}`
    : isNaN(date.day)
    ? `${ISONumberPadding(date.month + 1, 2)}-${date.year}`
    : `${ISONumberPadding(date.day + 1, 2)}-${ISONumberPadding(date.month + 1, 2)}-${date.year}`;

const inputTimeToISOString = (time: InputTime): string =>
  `${ISONumberPadding(time.hour, 2)}:${ISONumberPadding(time.minute, 2)}`;

const inputDateTimeToISOString = (date?: InputDate, time?: InputTime): string => {
  if (!date && !time) return "";

  const datePart = date ? inputDateToISOString(date) : "";
  const timePart = time ? inputTimeToISOString(time) : "";

  return `${datePart} ${timePart}`.trim();
};

const ISOStringToInputDate = (date: string): InputDate => {
  const match = date.match(ISODateRegex);
  if (!match || !match.groups) throw new Error(`Invalid date string: ${date}`);

  const { year, month, day } = match.groups;

  return {
    year: parseInt(year),
    month: parseInt(month) - 1,
    day: parseInt(day) - 1,
  };
};

const ISOStringToInputTime = (time: string): InputTime => {
  const match = time.match(ISOTimeRegex);
  if (!match || !match.groups) throw new Error(`Invalid time string: ${time}`);

  const { hour, minute } = match.groups;

  return {
    hour: parseInt(hour),
    minute: parseInt(minute),
  };
};

export const ISO_FR: DateTimeFormatter = {
  inputDateToISOString,
  inputTimeToISOString,
  inputDateTimeToISOString,
  ISOStringToInputDate,
  ISOStringToInputTime,
};
