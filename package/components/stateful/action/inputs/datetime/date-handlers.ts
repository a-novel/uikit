const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const daysPerMonthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const daysInMonth = (month: number, year: number): number => {
  if (month < 0 || month > 11) throw new Error(`Invalid month value: ${month}`);
  return isLeapYear(year) ? daysPerMonthLeap[month] : daysPerMonth[month];
};

// Why do I inflict this on myself

export class InputDate {
  day: number;
  month: number;
  year: number;

  constructor(data: Date | { year: number; month: number; day: number }) {
    if (data instanceof Date) {
      this.year = data.getFullYear();
      this.month = data.getMonth();
      // Day value is not 0-based in the Date API, unlike months.
      this.day = data.getDate() - 1;
      return;
    }

    this.year = data.year;
    this.month = data.month;
    this.day = data.day;
  }

  toDate = (): Date => new Date(this.year, this.month, this.day + 1);

  isLeapYear = () => isLeapYear(this.year);

  daysThisMonth = () => daysInMonth(this.month, this.year);

  sum = (data: InputDate | { year?: number; month?: number; day?: number }): InputDate => {
    const b =
      data instanceof InputDate
        ? data
        : new InputDate({ day: data.day ?? 0, month: data.month ?? 0, year: data.year ?? 0 });

    const output = new InputDate({ day: this.day + b.day, month: this.month + b.month, year: this.year + b.year });

    if (output.month > 11) {
      output.month = output.month % 12;
      output.year += Math.floor(output.month / 12);
    } else if (output.month < 0) {
      // The modulo result will be negative, so in the end we'll subtract a value.
      output.month = 12 + (output.month % 12);
      // Same here, upper value is negative, so the added value will be negative.
      output.year += Math.ceil(output.month / 12);
    }

    const maxDays = output.daysThisMonth();

    // Because each month has a different number of days, we use recursion to make calculations easier.
    // It is not the most efficient method, but performance impact should remain negligible. In a real
    // case scenario, the number of days to add/subtract will be very small, so there is no reason to
    // have more than 1 recursive call.
    if (output.day >= maxDays) {
      output.day = output.day - maxDays;
      return output.sum({ month: 1 });
    } else if (output.day < 0) {
      output.day = output.day + maxDays;
      return output.sum({ month: -1 });
    }

    return output;
  };
}

/**
 * Normalizes the result of a less comparison to be -1, 0, or 1.
 */
const normalizeLess = (value: number): number => (value < 0 ? -1 : value > 0 ? 1 : 0);

/**
 * Compares 2 {@link InputDate}, and return a normalized less result:
 *  - 1: the reference date is after the second date
 *  - 0: the dates are equal
 *  - -1: the reference date is before the second date
 *
 * An undefined date is considered to be the earliest possible date, and 2 undefined dates will be considered
 * equal.
 */
export const inputDateLess = (referenceDate?: InputDate, date?: InputDate): number => {
  if (referenceDate == null) return date == null ? 0 : -1;
  if (date == null) return 1;

  if (referenceDate.year !== date.year) return normalizeLess(referenceDate.year - date.year);
  if (referenceDate.month !== date.month) return normalizeLess(referenceDate.month - date.month);

  return normalizeLess(referenceDate.day - date.day);
};

/**
 * Return the lowest date in the list of dates. If all dates are undefined, undefined will be returned.
 * Otherwise, undefined dates are ignored, and the result will always be a defined date.
 */
export const inputDateMin = (...dates: (InputDate | undefined)[]): InputDate | undefined => {
  let minDate = dates[0];
  for (let i = 1; i < dates.length; i++) {
    // Ignore null dates.
    if (dates[i] == null) continue;
    // Less comparison does not ignore undefined values, unlike us. So if the initial date is undefined, it MUST
    // be manually replaced for less comparison to produce expected results.
    if (minDate == null) {
      minDate = dates[i];
      continue;
    }
    if (inputDateLess(dates[i], minDate) < 0) minDate = dates[i];
  }
  return minDate;
};

/**
 * Return the highest date in the list of dates. If all dates are undefined, undefined will be returned.
 * Otherwise, undefined dates are ignored, and the result will always be a defined date.
 */
export const inputDateMax = (...dates: (InputDate | undefined)[]): InputDate | undefined => {
  let maxDate = dates[0];
  for (let i = 1; i < dates.length; i++) {
    // Ignore null dates.
    if (dates[i] == null) continue;
    // Less comparison does not ignore undefined values, unlike us. So if the initial date is undefined, it MUST
    // be manually replaced for less comparison to produce expected results.
    if (maxDate == null) {
      maxDate = dates[i];
      continue;
    }
    if (inputDateLess(dates[i], maxDate) > 0) maxDate = dates[i];
  }
  return maxDate;
};

export const currentDate = (): InputDate => {
  const now = new Date();
  return new InputDate(now);
};
