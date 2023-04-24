export interface InputDate {
  day: number;
  month: number;
  year: number;
}

export interface InputTime {
  hour: number;
  minute: number;
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

/**
 * Compares 2 {@link InputTime}, and return a normalized less result:
 *  - 1: the reference time is after the second v
 *  - 0: the times are equal
 *  - -1: the reference time is before the second time
 *
 * An undefined time is considered to be the earliest possible time, and 2 undefined times will be considered
 * equal.
 */
export const inputTimeLess = (referenceTime?: InputTime, time?: InputTime): number => {
  if (referenceTime == null) return time == null ? 0 : -1;
  if (time == null) return 1;

  if (referenceTime.hour !== time.hour) return normalizeLess(referenceTime.hour - time.hour);

  return normalizeLess(referenceTime.minute - time.minute);
};

/**
 * Return the lowest time in the list of times. If all times are undefined, undefined will be returned.
 * Otherwise, undefined times are ignored, and the result will always be a defined time.
 */
export const inputTimeMin = (...times: (InputTime | undefined)[]): InputTime | undefined => {
  let minTime = times[0];
  for (let i = 1; i < times.length; i++) {
    // Ignore null times.
    if (times[i] == null) continue;
    // Less comparison does not ignore undefined values, unlike us. So if the initial date is undefined, it MUST
    // be manually replaced for less comparison to produce expected results.
    if (minTime == null) {
      minTime = times[i];
      continue;
    }
    if (inputTimeLess(times[i], minTime) < 0) minTime = times[i];
  }
  return minTime;
};

/**
 * Return the highest time in the list of times. If all times are undefined, undefined will be returned.
 * Otherwise, undefined times are ignored, and the result will always be a defined time.
 */
export const inputTimeMax = (...times: (InputTime | undefined)[]): InputTime | undefined => {
  let maxTime = times[0];
  for (let i = 1; i < times.length; i++) {
    // Ignore null times.
    if (times[i] == null) continue;
    // Less comparison does not ignore undefined values, unlike us. So if the initial date is undefined, it MUST
    // be manually replaced for less comparison to produce expected results.
    if (maxTime == null) {
      maxTime = times[i];
      continue;
    }
    if (inputTimeLess(times[i], maxTime) > 0) maxTime = times[i];
  }
  return maxTime;
};

const daysPerMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const daysPerMonthLeap = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * Will be useful if this code ever remains in 2100 (hello from past).
 */
const isLeapYear = (year: number): boolean => (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;

export const daysInMonth = (year: number, month: number): number => {
  if (month < 0 || month > 11) throw new Error("Invalid month");
  return isLeapYear(year) ? daysPerMonthLeap[month] : daysPerMonth[month];
};

// Why do I inflict this on myself

/**
 * Sums 2 dates together, and normalize the result.
 */
export const sumDates = (a: InputDate, b: InputDate): InputDate => {
  let newDay = a.day + b.day;
  let newMonth = a.month + b.month;
  let newYear = a.year + b.year;

  if (newMonth > 11) {
    newMonth = newMonth % 12;
    newYear += Math.floor(newMonth / 12);
  } else if (newMonth < 0) {
    // The modulo result will be negative, so in the end we'll subtract a value.
    newMonth = 12 + (newMonth % 12);
    // Same here, upper value is negative, so the added value will be negative.
    newYear += Math.ceil(newMonth / 12);
  }

  const maxDays = daysInMonth(newYear, newMonth);

  // Because each month has a different number of days, we use recursion to make calculations easier.
  // It is not the most efficient method, but performance impact should remain negligible. In a real
  // case scenario, the number of days to add/subtract will be very small, so there is no reason to
  // have more than 1 recursive call.
  if (newDay >= maxDays) {
    return sumDates({ day: newDay - maxDays, month: newMonth, year: newYear }, { day: 0, month: 1, year: 0 });
  } else if (newDay < 0) {
    return sumDates({ day: newDay + maxDays, month: newMonth, year: newYear }, { day: 0, month: -1, year: 0 });
  }

  return { day: newDay, month: newMonth, year: newYear };
};

/**
 * Simulate a less function for a full datetime object (combining date and time together).
 */
export const inputDateTimeLess = (
  referenceDate: InputDate | undefined,
  referenceTime: InputTime | undefined,
  date: InputDate | undefined,
  time: InputTime | undefined
): number => {
  if (referenceDate && date) {
    const dateLess = inputDateLess(referenceDate, date);
    // Since we perform a full datetime comparison, there is no need to check time if the dates are different, since
    // time will not change results.
    if (dateLess !== 0) return dateLess;
  }

  if (referenceTime && time) {
    return inputTimeLess(referenceTime, time);
  }

  return 0;
};

export const currentDate = () => {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth(),
    // Day value is not 0-based in the Date API, unlike months.
    day: now.getDate() - 1,
  };
};

export const currentTime = () => {
  const now = new Date();
  return {
    hour: now.getHours(),
    minute: now.getMinutes(),
  };
};
