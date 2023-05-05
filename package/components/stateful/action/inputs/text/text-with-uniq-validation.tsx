import { FC, ReactNode, useCallback, useEffect, useState } from "react";

import {
  TextInputError,
  TextInputStatus,
  TextInputValidated,
  TextInputValidatedProps,
  TextInputValidationMessages,
  TextInputValidator,
} from "../../../index";

export type TextAPIInputValidationStatus = TextInputStatus | "invalid";

export type TextAPIInputError = TextInputError | "api-error";

export type TextAPIInputValidatorResponse = { status: TextAPIInputValidationStatus; error?: TextAPIInputError };

export type TextAPIInputValidator = (
  value: string
) => TextAPIInputValidatorResponse | Promise<TextAPIInputValidatorResponse>;

export interface TextAPIInputValidationMessages extends TextInputValidationMessages {
  invalid: ReactNode;
}

export interface TextWithAPIValidationProps
  extends Omit<TextInputValidatedProps, "onValidationChange" | "customValidator" | "messages"> {
  validator: (value: string) => Promise<boolean>;
  onValidationChange?:
    | ((status: TextAPIInputValidationStatus) => void)
    | ((status: TextAPIInputValidationStatus, errorType?: TextAPIInputError) => void)
    | ((status: TextAPIInputValidationStatus, errorType?: TextAPIInputError, errorValue?: unknown) => void);
  customValidator?: TextAPIInputValidator;
  messages: TextAPIInputValidationMessages;
}

export const TextAPIInputValidated: FC<TextWithAPIValidationProps> = ({
  value,
  onValidationChange,
  validator,
  onChange,
  messages,
  customValidator,
  ...props
}) => {
  const [basicValidation, setBasicValidation] = useState<TextInputStatus>("no-change");
  const [basicError, setBasicError] = useState<TextInputError>();
  const [basicErrorValue, setBasicErrorValue] = useState<unknown>();
  // This value is set to undefined when using the standard input validation.
  // If it is defined to false, onValidationChange will receive the custom
  // "invalid" status.
  const [apiValidation, setApiValidation] = useState<boolean>();

  const apiValidator = useCallback<TextInputValidator>(async () => {
    const ok = await validator(value);
    if (!ok) {
      setApiValidation(false);
      return { status: "error" };
    }

    if (customValidator) {
      const custom = await customValidator(value);

      // If a custom validator returns the "invalid" status, we treat it as if the api validation failed.
      if (custom.status === "invalid") {
        setApiValidation(false);
        return { status: "error" };
      }

      if (custom.status !== "valid") {
        return { status: custom.status, error: custom.error };
      }
    }

    setApiValidation(ok);
    return { status: "valid" };
  }, [customValidator, validator, value]);

  const localOnValidationChange = useCallback((status: TextInputStatus, err?: TextInputError, errValue?: unknown) => {
    setBasicValidation(status);
    setBasicError(err);
    setBasicErrorValue(errValue);
  }, []);

  useEffect(() => {
    const validation = apiValidation == null ? basicValidation : apiValidation ? "valid" : "invalid";
    onValidationChange?.(validation, basicError, basicErrorValue);
  }, [apiValidation, basicError, basicErrorValue, basicValidation, onValidationChange]);

  const { invalid, customError, ...otherMessages } = messages;

  return (
    <TextInputValidated
      onChange={(e) => {
        setApiValidation(undefined);
        onChange?.(e);
      }}
      messages={{
        ...otherMessages,
        customError: apiValidation === false ? invalid : customError,
      }}
      onValidationChange={localOnValidationChange}
      customValidator={apiValidator}
      value={value}
      {...props}
    />
  );
};
