import css from "./date.module.css";

import CalendarIcon from "@public/icons/monochrome/calendar-edit.svg";
import CloseIcon from "@public/icons/monochrome/close.svg";

import { FC, ReactNode, useRef, useState } from "react";

import { CustomInputProps, InputBasic, InputToolbox } from "@components/stateful";

import { useFloatingMenu } from "@hooks";
import { mergeClassNames } from "@lib";

import { CalendarProps } from "./calendars/utils";
import { InputDate } from "./date-handlers";
import { DateTimeFormatter } from "./format/utils";

export interface DateInputProps extends CustomInputProps {
  value?: InputDate;
  neutral?: InputDate;
  onChange?: (date?: InputDate) => void;
  minDate?: InputDate;
  maxDate?: InputDate;
  formatter: DateTimeFormatter;
  calendar: (props: CalendarProps) => ReactNode;
  /**
   * @uikit-only
   */
  uikit?: boolean;
  /**
   * @uikit-only
   */
  startOpen?: boolean;
}

export const DateInput: FC<DateInputProps> = ({
  value,
  neutral,
  onChange,
  minDate,
  maxDate,
  required,
  className,
  children,
  formatter,
  calendar,
  uikit,
  startOpen,
  disabled,
  ...props
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [calendarOpen, setCalendarOpen] = useState(startOpen ?? false);

  useFloatingMenu({ ref: modalRef, opened: calendarOpen, disable: uikit, close: () => setCalendarOpen(false) });

  return (
    <InputBasic
      readOnly
      noFocusStyle
      type="text"
      disabled={disabled}
      required={required}
      value={value ? formatter.inputDateToISOString(value) : ""}
      className={mergeClassNames(
        css.container,
        calendarOpen ? "focus-within" : undefined,
        disabled ? css.disabled : undefined,
        className
      )}
      // This event is already attached to the input only, so it will not conflict with the toolbox actions.
      onClick={() => setCalendarOpen(!calendarOpen)}
      {...props}
    >
      <div ref={modalRef} className={css.calendar}>
        {calendar({
          selectedDate: value,
          defaultDate: neutral,
          minDate,
          maxDate,
          onSelectDate: onChange,
        })}
      </div>
      <InputToolbox
        actions={[
          {
            id: "clearDate",
            icon: <CloseIcon />,
            onClick: () => onChange?.(),
            hide: required || value == null || disabled,
          },
          { id: "toggleCalendar", icon: <CalendarIcon />, onClick: () => setCalendarOpen(!calendarOpen) },
        ]}
      />
      {children}
    </InputBasic>
  );
};
