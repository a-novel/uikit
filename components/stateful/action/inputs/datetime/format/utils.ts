import { InputDate, InputTime } from "../date-handlers";

export interface DateTimeFormatter {
  inputDateToISOString: (date: InputDate) => string;
  inputTimeToISOString: (time: InputTime) => string;
  inputDateTimeToISOString: (date?: InputDate, time?: InputTime) => string;
  ISOStringToInputDate: (date: string) => InputDate;
  ISOStringToInputTime: (time: string) => InputTime;
}

export const ISONumberPadding = (src: number, length: number): string => `${src}`.padStart(length, "0");
