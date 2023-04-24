import {
  genericInputValidationProcessDecorator,
  genericInputValidationProcessStatus,
  genericInputValidationProcessStatusIcon,
  genericInputValidationProcessStatusMessage,
  GenericInputValidationProps,
} from "../children/validator-generic";
import { ReactElement } from "react";
import { mergeClassNames } from "@lib";
import { SelectInput, SelectInputProps, WithInputValidation } from "@components/stateful";

export interface SelectInputValidatedProps<V extends number | string>
  extends GenericInputValidationProps,
    Omit<SelectInputProps<V>, "decorator"> {
  defaultValue?: V;
}

export function SelectInputValidated<V extends number | string>({
  validMessage,
  loadingMessage,
  warningMessage,
  errorMessage,
  children,
  className,
  defaultValue,
  forceStatus,
  ...props
}: SelectInputValidatedProps<V>): ReactElement<any, any> {
  const actualStatus =
    forceStatus ||
    genericInputValidationProcessStatus({
      loadingMessage,
      warningMessage,
      errorMessage,
      isDefaultGeneric: props.value === defaultValue,
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
        <SelectInput className={mergeClassNames(validatorClassName, className)} decorator={decorator} {...props}>
          {children}
          {validatorChildren}
        </SelectInput>
      )}
    />
  );
}
