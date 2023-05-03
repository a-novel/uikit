import { FC, ReactNode, useCallback, useState } from "react";

import { TextInputValidated, TextInputValidatedProps, TextInputValidationStatus } from "../../../index";

export interface TextWithUniqValidationProps extends TextInputValidatedProps {
  validator: (value: string) => Promise<boolean>;
  validatorPendingMessage: ReactNode;
  validatorError: ReactNode;
  validatorUnexpectedError: ReactNode;
  validatorMode: "new" | "exist";
}

export const TextWithUniqValidation: FC<TextWithUniqValidationProps> = ({
  value,
  onValidationChange,
  validator,
  validatorPendingMessage,
  validatorError,
  validatorUnexpectedError,
  validatorMode,
  errorMessage,
  loadingMessage,
  ...props
}) => {
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [checkError, setCheckError] = useState<ReactNode>();

  const checkUniq = useCallback(
    async (status: TextInputValidationStatus) => {
      if (status !== "valid") {
        return;
      }

      setIsCheckingStatus(true);
      setCheckError(undefined);
      try {
        const exists = await validator(value);
        setCheckError(
          validatorMode === "new" ? (exists ? validatorError : undefined) : !exists ? validatorError : undefined
        );
      } catch (error) {
        setCheckError(validatorUnexpectedError);
      } finally {
        setIsCheckingStatus(false);
      }
    },
    [validator, validatorError, validatorMode, validatorUnexpectedError, value]
  );

  return (
    <TextInputValidated
      onValidationChange={(status, err) => {
        checkUniq(status).catch(console.error);
        onValidationChange?.(status, err);
      }}
      loadingMessage={isCheckingStatus ? validatorPendingMessage : loadingMessage}
      errorMessage={checkError ?? errorMessage}
      value={value}
      {...props}
    />
  );
};
