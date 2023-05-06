import { InputDate } from "../date-handlers";

import { DateTimeFormatter, ISONumberPadding } from "./utils";

// Crying rn

const ISODateRegex = /(((?<day>\d{2})-)?(?<month>\d{2})-)?(?<year>\d{4})/;

const inputDateToISOString = (date: InputDate): string =>
  isNaN(date.month)
    ? `${date.year}`
    : isNaN(date.day)
    ? `${ISONumberPadding(date.month + 1, 2)}-${date.year}`
    : `${ISONumberPadding(date.day + 1, 2)}-${ISONumberPadding(date.month + 1, 2)}-${date.year}`;

const ISOStringToInputDate = (date: string): InputDate => {
  const match = date.match(ISODateRegex);
  if (!match || !match.groups) throw new Error(`Invalid date string: ${date}`);

  const { year, month, day } = match.groups;

  return new InputDate({
    year: parseInt(year),
    month: parseInt(month) - 1,
    day: parseInt(day) - 1,
  });
};

export const ISO_FR: DateTimeFormatter = {
  inputDateToISOString,
  ISOStringToInputDate,
};
