import { FC, useCallback, useEffect, useState } from "react";

import { InputBasic, InputProps } from "../basic";

import { useMountEffect } from "@hooks";

export type TextInputStatus = "no-change" | "typing" | "warning" | "error" | "valid";

export type TextInputError = "regexp" | "min-length" | "max-length" | "required";

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
  onValidationChange?: (status: TextInputStatus, error?: TextInputError) => void;
}

export const TextInput: FC<TextInputProps> = ({
  onStableChange,
  onChange,
  neutral = "",
  value,
  regexp,
  type = "text",
  onValidationChange,
  required,
  minLength,
  maxLength,
  ...props
}) => {
  const [status, setStatus] = useState<TextInputStatus>("no-change");
  const [statusError, setStatusError] = useState<TextInputError>();

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
    } else {
      setStatus("valid");
      setStatusError(undefined);
    }
  }, [maxLength, minLength, neutral, regexp, required, value]);

  useEffect(() => {
    onValidationChange?.(status, statusError);
  }, [onValidationChange, status, statusError]);

  // Run validation once on render.
  useMountEffect(() => {
    updateStatusStable();
  });

  return (
    <InputBasic
      onChange={(e) => {
        setStatus("typing");
        setStatusError(undefined);
        onChange?.(e);
      }}
      onStableChange={(value) => {
        updateStatusStable();
        onStableChange?.(value);
      }}
      value={value}
      type={type}
      minLength={minLength}
      maxLength={maxLength}
      required={required}
      {...props}
    />
  );
};
