import checkLottie from "@public/lottie/text-input/check.json";
import crossLottie from "@public/lottie/text-input/cross.json";
import loadingLottie from "@public/lottie/text-input/loading.json";
import typingLottie from "@public/lottie/text-input/typing.json";
import warningLottie from "@public/lottie/text-input/warning.json";

import { FC, ReactNode, useCallback, useEffect, useState } from "react";

import {
  TextInput,
  TextInputError,
  TextInputProps,
  TextInputStatus,
  WithInputValidation,
  WithInputValidationProps,
} from "@components/stateful";
import { Player } from "@lottiefiles/react-lottie-player";

import { mergeClassNames } from "@lib";

export type TextInputValidationStatus = TextInputStatus | "loading";

export interface TextInputValidationStandardErrorMessages {
  required: string;
  tooShort: string;
  lengthLimit: string;
  regexp: string;
}

export interface TextInputValidatedProps extends Omit<TextInputProps, "onValidationChange" | "decorator"> {
  onValidationChange?:
    | ((status: TextInputValidationStatus) => void)
    | ((status: TextInputValidationStatus, error?: TextInputError) => void);
  validMessage?: ReactNode;
  loadingMessage?: ReactNode;
  warningMessage?: ReactNode;
  errorMessage?: ReactNode;
  messages: TextInputValidationStandardErrorMessages;
  forceStatus?: TextInputValidationStatus;
}

const processStatus = (textInputStatus: TextInputStatus, loading?: boolean): TextInputValidationStatus => {
  if (loading) {
    return "loading";
  }

  return textInputStatus;
};

const processStatusMessage = (
  status: TextInputValidationStatus,
  valid: ReactNode | null,
  loading: ReactNode | null,
  warning: ReactNode | null,
  error: ReactNode | null
): ReactNode | null => {
  switch (status) {
    case "error":
      return error;
    case "warning":
      return warning;
    case "loading":
      return loading;
    case "valid":
      return valid;
    default:
      return null;
  }
};

const processStatusIcon = (status: TextInputValidationStatus): ReactNode => {
  switch (status) {
    case "typing":
      return <Player autoplay loop src={typingLottie} />;
    case "error":
      return <Player autoplay keepLastFrame src={crossLottie} />;
    case "warning":
      return <Player autoplay loop src={warningLottie} />;
    case "loading":
      return <Player autoplay loop src={loadingLottie} />;
    case "valid":
      return <Player autoplay keepLastFrame src={checkLottie} />;
    default:
      return null;
  }
};

const processErrorMessage = (
  cause: TextInputError | undefined,
  standardMessages: TextInputValidationStandardErrorMessages,
  otherError?: ReactNode
): ReactNode => {
  switch (cause) {
    case "regexp":
      return standardMessages.regexp;
    case "min-length":
      return standardMessages.tooShort;
    case "required":
      return standardMessages.required;
    default:
      return otherError;
  }
};

const processWarningMessage = (
  cause: TextInputError | undefined,
  standardMessages: TextInputValidationStandardErrorMessages,
  otherWarning?: ReactNode
): ReactNode => {
  switch (cause) {
    case "max-length":
      return standardMessages.lengthLimit;
    default:
      return otherWarning;
  }
};

const processDecorator = (status: TextInputValidationStatus): WithInputValidationProps["decorator"] => {
  switch (status) {
    case "valid":
      return "valid";
    case "loading":
      return "default";
    case "warning":
      return "warning";
    case "error":
      return "error";
    default:
      return undefined;
  }
};

export const TextInputValidated: FC<TextInputValidatedProps> = ({
  onValidationChange,
  validMessage,
  loadingMessage,
  warningMessage,
  errorMessage,
  messages,
  children,
  className,
  forceStatus,
  ...props
}) => {
  const [status, setStatus] = useState<TextInputStatus>("no-change");
  const [statusError, setStatusError] = useState<TextInputError>();

  const captureStatus = useCallback((status: TextInputStatus, error?: TextInputError) => {
    setStatus(status);
    setStatusError(error);
  }, []);

  const actualErrorMessage = processErrorMessage(statusError, messages, errorMessage);
  const actualWarningMessage = processWarningMessage(statusError, messages, warningMessage);
  const actualStatus = forceStatus || processStatus(status, loadingMessage != null);
  const statusMessage = processStatusMessage(
    actualStatus,
    validMessage,
    loadingMessage,
    actualWarningMessage,
    actualErrorMessage
  );
  const statusIcon = processStatusIcon(actualStatus);

  useEffect(() => {
    onValidationChange?.(actualStatus, statusError);
  }, [onValidationChange, actualStatus, statusError]);

  return (
    <WithInputValidation
      show={actualStatus !== "no-change"}
      icon={statusIcon}
      message={statusMessage}
      decorator={processDecorator(actualStatus)}
      renderer={(validatorClassName, decorator, validatorChildren) => (
        <TextInput
          onValidationChange={captureStatus}
          className={mergeClassNames(validatorClassName, className)}
          decorator={decorator}
          {...props}
        >
          {children}
          {validatorChildren}
        </TextInput>
      )}
    />
  );
};
