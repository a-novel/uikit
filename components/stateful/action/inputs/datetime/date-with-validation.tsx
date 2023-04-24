import { FC } from "react";
import { DateInput, DateInputProps, inputDateLess, WithInputValidation } from "@components/stateful";
import { mergeClassNames } from "@lib";
import {
  genericInputValidationProcessDecorator,
  genericInputValidationProcessStatus,
  genericInputValidationProcessStatusIcon,
  genericInputValidationProcessStatusMessage,
  GenericInputValidationProps,
} from "../children/validator-generic";

export interface DateInputValidatedProps extends GenericInputValidationProps, Omit<DateInputProps, "decorator"> {}

export const DateInputValidated: FC<DateInputValidatedProps> = ({
  validMessage,
  loadingMessage,
  warningMessage,
  errorMessage,
  children,
  className,
  forceStatus,
  ...props
}) => {
  const actualStatus =
    forceStatus ||
    genericInputValidationProcessStatus({
      loadingMessage,
      warningMessage,
      errorMessage,
      isDefaultGeneric: inputDateLess(props.value, props.neutral) === 0,
    });
  const statusMessage = genericInputValidationProcessStatusMessage(
    actualStatus,
    validMessage,
    loadingMessage,
    warningMessage,
    errorMessage
  );
  const statusIcon = genericInputValidationProcessStatusIcon(actualStatus);

  return (
    <WithInputValidation
      show={actualStatus !== "no-change"}
      icon={statusIcon}
      message={statusMessage}
      decorator={genericInputValidationProcessDecorator(actualStatus)}
      renderer={(validatorClassName, decorator, validatorChildren) => (
        <DateInput className={mergeClassNames(validatorClassName, className)} decorator={decorator} {...props}>
          {children}
          {validatorChildren}
        </DateInput>
      )}
    />
  );
};
