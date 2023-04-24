import css from "./iso-gregorian.module.css";
import { Calendar, CalendarProps } from "./utils";
import { FC, useCallback, useMemo, useState } from "react";
import { currentDate, InputDate, inputDateMax, daysInMonth } from "../date-handlers";
import { useStableInput } from "@hooks";
import { mergeClassNames } from "@lib";

type WeekStart = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export const ISOGregorianCalendarWeekStart = {
  SUNDAY: 0 as WeekStart,
  MONDAY: 1 as WeekStart,
  TUESDAY: 2 as WeekStart,
  WEDNESDAY: 3 as WeekStart,
  THURSDAY: 4 as WeekStart,
  FRIDAY: 5 as WeekStart,
  SATURDAY: 6 as WeekStart,
};

export interface ISOGregorianCalendarTranslations {
  months: {
    january: string;
    february: string;
    march: string;
    april: string;
    may: string;
    june: string;
    july: string;
    august: string;
    september: string;
    october: string;
    november: string;
    december: string;
  };
  weekdays: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
}

export interface ISOGregorianCalendarProps extends CalendarProps {
  translations: ISOGregorianCalendarTranslations;
  weekStart: WeekStart;
  forceDisplayYear?: number;
  forceDisplayMonth?: number;
  forceDisplayYearInput?: number;
}

const isMonthEnabled = (currentYear: number, currentMonth: number, minDate?: InputDate, maxDate?: InputDate): boolean =>
  (minDate?.year === undefined ||
    currentYear > minDate.year ||
    (currentYear === minDate.year && currentMonth >= minDate.month)) &&
  (maxDate?.year === undefined ||
    currentYear < maxDate.year ||
    (currentYear === maxDate.year && currentMonth <= maxDate.month));

const isDayEnabled = (
  currentYear: number,
  currentMonth: number,
  currentDay: number,
  minDate?: InputDate,
  maxDate?: InputDate
): boolean =>
  (minDate?.year === undefined ||
    currentYear > minDate.year ||
    (currentYear === minDate.year && currentMonth > minDate.month) ||
    (currentYear === minDate.year && currentMonth === minDate.month && currentDay >= minDate.day)) &&
  (maxDate?.year === undefined ||
    currentYear < maxDate.year ||
    (currentYear === maxDate.year && currentMonth < maxDate.month) ||
    (currentYear === maxDate.year && currentMonth === maxDate.month && currentDay <= maxDate.day));

const normalizeDaysPaddingLeft = (padding: number, weekStart: WeekStart): number => {
  const normalizedPadding = padding - weekStart;
  return normalizedPadding >= 0 ? normalizedPadding : normalizedPadding + 7;
};

const processWeekdaysHeader = (weekStart: WeekStart, translations: ISOGregorianCalendarTranslations): string[] => {
  const basePoint = [
    translations.weekdays.sunday,
    translations.weekdays.monday,
    translations.weekdays.tuesday,
    translations.weekdays.wednesday,
    translations.weekdays.thursday,
    translations.weekdays.friday,
    translations.weekdays.saturday,

    translations.weekdays.sunday,
    translations.weekdays.monday,
    translations.weekdays.tuesday,
    translations.weekdays.wednesday,
    translations.weekdays.thursday,
    translations.weekdays.friday,
    translations.weekdays.saturday,
  ];

  return basePoint.slice(weekStart, weekStart + 7);
};

const processDaysRows = <V,>(src: V[]): V[][] => {
  const output = [];

  for (let i = 0; i < src.length; i += 7) {
    output.push(src.slice(i, i + 7));
  }

  return output;
};

interface YearSelectorProps {
  displayedYear: number;
  displayYearBuffer?: number;
  actualMinDate?: InputDate;
  actualMaxDate?: InputDate;
  setDisplayedYear: (year?: number) => void;
}

const YearSelector: FC<YearSelectorProps> = ({
  displayedYear,
  displayYearBuffer,
  actualMinDate,
  actualMaxDate,
  setDisplayedYear,
}) => (
  <div className={mergeClassNames(css.yearContainer, displayedYear === displayYearBuffer ? css.valid : css.invalid)}>
    <input
      type="number"
      min={actualMinDate?.year}
      max={actualMaxDate?.year}
      value={displayYearBuffer}
      onChange={(e) => {
        const value = parseInt(e.target.value, 10);
        if (!isNaN(value)) {
          setDisplayedYear(Math.min(value, actualMaxDate?.year ?? Number.MAX_SAFE_INTEGER));
        }
      }}
    />
  </div>
);

interface DaySelectorProps {
  daysSelectorHeaders: string[];
  daysSelector: ({
    enabled: boolean;
    selected: boolean;
    value: number;
  } | null)[][];
  displayedYear: number;
  displayedMonth: number;
  setDay: (day?: number) => void;
  setYear: (year?: number) => void;
  setMonth: (month?: number) => void;
}

const DaySelector: FC<DaySelectorProps> = ({
  daysSelectorHeaders,
  daysSelector,
  displayedYear,
  displayedMonth,
  setDay,
  setYear,
  setMonth,
}) => (
  <div className={css.dayContainer}>
    <table>
      <thead>
        <tr>
          {daysSelectorHeaders.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {daysSelector.map((daysRow, idx) => (
          <tr key={idx}>
            {daysRow.map((day, idx) => (
              <td key={idx}>
                {day ? (
                  <button
                    type="button"
                    disabled={!day.enabled}
                    className={mergeClassNames(css.daySelector, day.selected ? css.selected : undefined)}
                    onClick={() => {
                      setDay(day.value);
                      setYear(displayedYear);
                      setMonth(displayedMonth);
                    }}
                  >
                    {day.value + 1}
                  </button>
                ) : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

interface MonthSelectorProps {
  monthsSelector: Record<
    string,
    {
      label: string;
      enabled: boolean;
      opened: boolean;
      selected: boolean;
      value: number;
    }
  >;
  setDisplayedMonth: (month: number) => void;
}

const MonthSelector: FC<MonthSelectorProps> = ({ setDisplayedMonth, monthsSelector }) => (
  <div className={css.monthContainer}>
    {Object.entries(monthsSelector).map(([key, { label, enabled, opened, selected, value }]) => (
      <button
        type="button"
        key={key}
        disabled={!enabled}
        className={mergeClassNames(
          css.monthSelector,
          selected ? css.selected : undefined,
          opened ? css.opened : undefined
        )}
        onClick={() => {
          setDisplayedMonth(value);
        }}
      >
        {label}
      </button>
    ))}
  </div>
);

export const ISO_GREGORIAN_CALENDAR: Calendar<ISOGregorianCalendarProps> = ({
  selectedDate,
  defaultDate,
  minDate,
  maxDate,
  onSelectDate,
  translations,
  weekStart,
  forceDisplayYear,
  forceDisplayMonth,
  forceDisplayYearInput,
}) => {
  const nowDate = currentDate();

  // --------------------------------------------------------------------------------
  // Manage the date that is marked as selected in the calendar UI.
  // This date is different from the actual selected date, until user "saves" it's
  // choice by clicking on the according button.
  // It is initialized with the initially selected date (if any), then internal
  // handlers automatically take care of updating it.
  // --------------------------------------------------------------------------------

  const [month, setMonth] = useState(selectedDate?.month);
  const [day, setDay] = useState(selectedDate?.day);

  // --------------------------------------------------------------------------------
  // While user is scrolling through the calendar, we need a state for the displayed
  // year and month. This state must be independent of the selected value.
  // --------------------------------------------------------------------------------

  const isDisplayYearValid = useCallback(
    (value?: number) =>
      !!value && (minDate == null || minDate.year <= value) && (maxDate == null || maxDate.year >= value),
    [maxDate, minDate]
  );

  // On input change, the displayYearBuffer only is updated. The actual displayYear value is not updated unless the
  // displayYearBuffer is valid.
  const {
    value: displayYearBuffer,
    stableValue: displayedYear = nowDate.year,
    setValue: setDisplayedYear,
  } = useStableInput({
    initial:
      forceDisplayYear ||
      selectedDate?.year ||
      defaultDate?.year ||
      inputDateMax(nowDate, minDate)?.year ||
      nowDate.year,
    validate: isDisplayYearValid,
  });

  const [displayedMonth, setDisplayedMonth] = useState(
    forceDisplayMonth ||
      selectedDate?.month ||
      defaultDate?.month ||
      inputDateMax(nowDate, minDate)?.month ||
      nowDate.month
  );

  const processMonthSelector = useCallback(
    (label: string, idx: number) => ({
      label,
      value: idx,
      enabled: isMonthEnabled(displayedYear, idx, minDate, maxDate),
      opened: displayedMonth === idx,
      selected: selectedDate?.year === displayedYear && month === idx,
    }),
    [maxDate, minDate, displayedMonth, displayedYear, month, selectedDate?.year]
  );

  const monthsSelector = useMemo(
    () => ({
      january: processMonthSelector(translations.months.january, 0),
      february: processMonthSelector(translations.months.february, 1),
      march: processMonthSelector(translations.months.march, 2),
      april: processMonthSelector(translations.months.april, 3),
      may: processMonthSelector(translations.months.may, 4),
      june: processMonthSelector(translations.months.june, 5),
      july: processMonthSelector(translations.months.july, 6),
      august: processMonthSelector(translations.months.august, 7),
      september: processMonthSelector(translations.months.september, 8),
      october: processMonthSelector(translations.months.october, 9),
      november: processMonthSelector(translations.months.november, 10),
      december: processMonthSelector(translations.months.december, 11),
    }),
    [
      processMonthSelector,
      translations.months.april,
      translations.months.august,
      translations.months.december,
      translations.months.february,
      translations.months.january,
      translations.months.july,
      translations.months.june,
      translations.months.march,
      translations.months.may,
      translations.months.november,
      translations.months.october,
      translations.months.september,
    ]
  );

  const processDaySelector = useCallback(
    (idx: number) => ({
      enabled: isDayEnabled(displayedYear, displayedMonth, idx, minDate, maxDate),
      selected: selectedDate?.year === displayedYear && month === displayedMonth && day === idx,
      value: idx,
    }),
    [maxDate, minDate, day, displayedMonth, displayedYear, month, selectedDate?.year]
  );

  const maxDaysForCurrentMonth = useMemo(
    () => daysInMonth(displayedYear, displayedMonth),
    [displayedMonth, displayedYear]
  );

  const paddingDaysLeft = useMemo(
    () => normalizeDaysPaddingLeft(new Date(displayedYear, displayedMonth).getDay(), weekStart),
    [displayedMonth, displayedYear, weekStart]
  );

  const paddingDaysRight = useMemo(() => {
    const rest = (paddingDaysLeft + maxDaysForCurrentMonth) % 7;
    return rest === 0 ? 0 : 7 - rest;
  }, [maxDaysForCurrentMonth, paddingDaysLeft]);

  const daysSelector = useMemo(
    () =>
      processDaysRows(
        Array.from({ length: paddingDaysLeft + maxDaysForCurrentMonth + paddingDaysRight }, (_, id) =>
          id < paddingDaysLeft || id >= paddingDaysLeft + maxDaysForCurrentMonth
            ? null
            : processDaySelector(id - paddingDaysLeft)
        )
      ),
    [maxDaysForCurrentMonth, paddingDaysLeft, paddingDaysRight, processDaySelector]
  );

  const daysSelectorHeaders = useMemo(() => processWeekdaysHeader(weekStart, translations), [translations, weekStart]);

  // --------------------------------------------------------------------------------
  // Callbacks used to update state in parent container.
  // --------------------------------------------------------------------------------

  // Update is triggered whenever a valid day is selected.
  const update = useCallback(
    (day?: number) => {
      setDay(day);
      onSelectDate?.(
        displayedYear != null && month != null && day != null
          ? { year: displayedYear, month: displayedMonth, day }
          : undefined
      );
    },
    [month, onSelectDate, displayedYear, displayedMonth]
  );

  return (
    <div className={css.container}>
      <div className={css.dateContainer}>
        <div className={css.yearAndMonthSelector}>
          <YearSelector
            displayedYear={displayedYear}
            actualMinDate={minDate}
            actualMaxDate={maxDate}
            displayYearBuffer={forceDisplayYearInput || displayYearBuffer}
            setDisplayedYear={setDisplayedYear}
          />
          <MonthSelector monthsSelector={monthsSelector} setDisplayedMonth={setDisplayedMonth} />
        </div>
        <DaySelector
          daysSelectorHeaders={daysSelectorHeaders}
          daysSelector={daysSelector}
          displayedYear={displayedYear}
          displayedMonth={displayedMonth}
          setDay={update}
          setYear={setDisplayedYear}
          setMonth={setMonth}
        />
      </div>
    </div>
  );
};
