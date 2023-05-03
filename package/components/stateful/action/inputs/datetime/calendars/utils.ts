import { FC } from "react";

import { InputDate } from "../date-handlers";

export interface CalendarProps {
  selectedDate?: InputDate;
  defaultDate?: InputDate;
  minDate?: InputDate;
  maxDate?: InputDate;
  onSelectDate?: (date?: InputDate) => void;
}

export type Calendar<P extends CalendarProps = CalendarProps> = FC<P>;
