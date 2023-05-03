import { Dispatch, SetStateAction, useEffect, useState } from "react";

export interface StableInputParams<V> {
  /**
   * The initial value for both buffered and stable values.
   * Acts like the initializer of useState.
   */
  initial?: V;
  /**
   * Each time the buffered value is updated, this method is called with the new buffered value.
   * When it returns true, the stable value is updated with the new buffered value.
   */
  validate: (value?: V) => boolean;
}

export interface StableInputHook<V> {
  /**
   * The current buffered value. This is the most up-to-date value, but it may fail the required validation, and
   * not be safe to use.
   */
  value?: V;
  /**
   * Safe to use, validated value. This value is only updated when the buffered {@link value} passes the validation
   * set by {@link StableInputParams.validate}.
   */
  stableValue?: V;
  /**
   * Update the buffered value.
   */
  setValue: Dispatch<SetStateAction<V | undefined>>;
}

/**
 * This hook allows to create 2 versions of a state: a buffered value, and a stable value.
 * The idea for the stable value is to be updated only when the buffered value passes a custom validation. It
 * allows a value to go through multiple unsafe stages, and only trigger some updates when it reaches a stable state.
 *
 * @example Year input. The calendar should only be updated if the year value is between 1900 and 2100.
 * import { useStableInput } from "@anovel/uikit/hooks";
 *
 * const Calendar = () => {
 *   const { value: year, stableValue: yearStable, setValue: setYear } = useStableInput({
 *     initial: 2021,
 *     validate: (year) => year >= 1900 && year <= 2100,
 *   });
 *
 *   return (
 *     <div className="calendar">
 *       <input type="number" value={year} onChange={(e) => setYear(parseInt(e.target.value, 10))} />
 *       {showCalendarForYear(yearStable)}
 *     </div>
 *   );
 * };
 */
export const useStableInput = <V>({ initial, validate }: StableInputParams<V>): StableInputHook<V> => {
  const [value, setValue] = useState(initial);
  const [stableValue, setStableValue] = useState(initial);

  useEffect(() => {
    validate(value) && setStableValue(value);
  }, [validate, value]);

  return { value, stableValue, setValue };
};
