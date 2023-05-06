import { FC, useCallback, useEffect, useMemo, useState } from "react";

import { InputBasic, InputProps } from "../basic";

import { useMountEffect } from "@hooks";

export type TextInputStatus = "no-change" | "typing" | "warning" | "error" | "valid" | "loading";

export type TextInputError = "regexp" | "min-length" | "max-length" | "required" | "custom" | "custom-critical";

export type TextInputValidatorResponse = { status: TextInputStatus; error?: unknown };

export type TextInputValidator = (value: string) => TextInputValidatorResponse | Promise<TextInputValidatorResponse>;

export interface TextInputProps extends Omit<InputProps, "type" | "value" | "onStableChange"> {
  value: string;
  onStableChange?: (value: string) => void;
  /**
   * Defines what is considered the "empty" (non-modified) value. Defaults to "".
   */
  neutral?: string;
  /**
   * The input will not be validated until it matches the given regexp.
   */
  regexp?: RegExp;
  type?: "text" | "password" | "email" | "search";
  onValidationChange?:
    | ((status: TextInputStatus) => void)
    | ((status: TextInputStatus, error?: TextInputError) => void)
    | ((status: TextInputStatus, error?: TextInputError, errorValue?: unknown) => void);
  /**
   * Custom validators to run on stable change.
   */
  customValidator?: TextInputValidator;
  /**
   * The maximum number of consecutive spaces allowed. Defaults to 1.
   * Set to Infinity to disable. 0 disable spaces entirely.
   */
  maxConsecutiveSpaces?: number;
}

export const TextInput: FC<TextInputProps> = ({
  onStableChange,
  onChange,
  neutral = "",
  value,
  regexp,
  type = "text",
  customValidator,
  onValidationChange,
  required,
  minLength,
  maxLength,
  maxConsecutiveSpaces,
  ...props
}) => {
  const [status, setStatus] = useState<TextInputStatus>("no-change");
  const [statusError, setStatusError] = useState<TextInputError>();
  const [errorValue, setErrorValue] = useState<unknown>();

  const replaceSpacesRegexp = useMemo(
    () => (maxConsecutiveSpaces === Infinity ? null : new RegExp(` {${(maxConsecutiveSpaces ?? 1) + 1},}`, "g")),
    [maxConsecutiveSpaces]
  );

  const updateStatusStable = useCallback(() => {
    if (value === neutral) {
      setStatus("no-change");
      setStatusError(undefined);
    } else if (value === "" && required) {
      setStatus("error");
      setStatusError("required");
    } else if (minLength && value.length < minLength) {
      setStatus("error");
      setStatusError("min-length");
    } else if (regexp && !regexp.test(value)) {
      setStatus("error");
      setStatusError("regexp");
    } else if (maxLength && value.length >= maxLength) {
      setStatus("warning");
      setStatusError("max-length");
    } else if (customValidator) {
      const response = customValidator(value);

      if (response instanceof Promise) {
        setStatus("loading");
        response
          .then(({ status, error }) => {
            setStatus(status);
            setErrorValue(error);
            setStatusError(error ? "custom" : undefined);
          })
          .catch((e) => {
            setStatus("error");
            setErrorValue(e);
            setStatusError("custom-critical");
          });
      } else {
        setStatus(response.status);
        setErrorValue(response.error);
        setStatusError(response.error ? "custom" : undefined);
      }
    } else {
      setStatus("valid");
      setStatusError(undefined);
    }
  }, [customValidator, maxLength, minLength, neutral, regexp, required, value]);

  const stableChange = useCallback(
    (value: string) => {
      updateStatusStable();
      onStableChange?.(value);
    },
    [onStableChange, updateStatusStable]
  );

  useEffect(() => {
    onValidationChange?.(status, statusError, errorValue);
  }, [errorValue, onValidationChange, status, statusError]);

  // Run validation once on render.
  useMountEffect(() => {
    updateStatusStable();
  });

  return (
    <InputBasic
      onChange={(e) => {
        setStatus("typing");
        setStatusError(undefined);
        setErrorValue(undefined);

        e.target.value = e.target.value.trimStart();
        if (replaceSpacesRegexp) {
          e.target.value = e.target.value.replace(replaceSpacesRegexp, " ".repeat(maxConsecutiveSpaces ?? 1));
        }

        onChange?.(e);
      }}
      onStableChange={stableChange}
      value={value}
      type={type}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      {...props}
    />
  );
};
