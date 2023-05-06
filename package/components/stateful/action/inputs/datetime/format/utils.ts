import { InputDate } from "../date-handlers";

export interface DateTimeFormatter {
  inputDateToISOString: (date: InputDate) => string;
  ISOStringToInputDate: (date: string) => InputDate;
}

export const ISONumberPadding = (src: number, length: number): string => `${src}`.padStart(length, "0");
