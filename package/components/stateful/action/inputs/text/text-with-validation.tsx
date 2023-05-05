import checkLottie from "@public/lottie/text-input/check.json";
import crossLottie from "@public/lottie/text-input/cross.json";
import loadingLottie from "@public/lottie/text-input/loading.json";
import typingLottie from "@public/lottie/text-input/typing.json";
import warningLottie from "@public/lottie/text-input/warning.json";

import { FC, ReactNode, useCallback, useState } from "react";

import {
  TextInput,
  TextInputError,
  TextInputProps,
  TextInputStatus,
  WithInputValidation,
  WithInputValidationProps,
} from "../../../index";
import { Player } from "@lottiefiles/react-lottie-player";

import { mergeClassNames } from "@lib";

export interface TextInputValidationMessages {
  required: string;
  tooShort: string;
  tooLong: string;
  regexp: string;
  valid?: ReactNode;
  loading?: ReactNode;
  customError?: ReactNode;
  customErrorCritical?: ReactNode;
  customWarning?: ReactNode;
}

export interface TextInputValidatedProps extends Omit<TextInputProps, "decorator"> {
  messages: TextInputValidationMessages;
  forceStatus?: TextInputStatus;
}

const processErrorMessage = (
  cause: TextInputError | undefined,
  standardMessages: TextInputValidationMessages
): ReactNode => {
  switch (cause) {
    case "regexp":
      return standardMessages.regexp;
    case "min-length":
      return standardMessages.tooShort;
    case "required":
      return standardMessages.required;
    case "custom-critical":
      return standardMessages.customErrorCritical;
    default:
      return standardMessages.customError;
  }
};

const processWarningMessage = (
  cause: TextInputError | undefined,
  standardMessages: TextInputValidationMessages
): ReactNode => {
  switch (cause) {
    case "max-length":
      return standardMessages.tooLong;
    default:
      return standardMessages.customWarning;
  }
};

const processStatusMessage = (
  status: TextInputStatus,
  messages: TextInputValidationMessages,
  errorStatus?: TextInputError
): ReactNode | null => {
  switch (status) {
    case "error":
      return processErrorMessage(errorStatus, messages);
    case "warning":
      return processWarningMessage(errorStatus, messages);
    case "loading":
      return messages.loading;
    case "valid":
      return messages.valid;
    default:
      return null;
  }
};

const processStatusIcon = (status: TextInputStatus): ReactNode => {
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

const processDecorator = (status: TextInputStatus): WithInputValidationProps["decorator"] => {
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
  messages,
  children,
  className,
  forceStatus,
  onValidationChange,
  ...props
}) => {
  const [status, setStatus] = useState<TextInputStatus>("no-change");
  const [statusError, setStatusError] = useState<TextInputError>();

  const captureStatus = useCallback((status: TextInputStatus, error?: TextInputError) => {
    setStatus(status);
    setStatusError(error);
  }, []);

  const validationChange = useCallback(
    (status: TextInputStatus, error?: TextInputError, errorValue?: unknown) => {
      captureStatus(status, error);
      onValidationChange?.(status, error, errorValue);
    },
    [captureStatus, onValidationChange]
  );

  const actualStatus = forceStatus || status;
  const statusMessage = processStatusMessage(actualStatus, messages, statusError);
  const statusIcon = processStatusIcon(actualStatus);

  return (
    <WithInputValidation
      show={actualStatus !== "no-change"}
      icon={statusIcon}
      message={statusMessage}
      decorator={processDecorator(actualStatus)}
      renderer={(validatorClassName, decorator, validatorChildren) => (
        <TextInput
          onValidationChange={validationChange}
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
