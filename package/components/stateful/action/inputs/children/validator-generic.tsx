import checkLottie from "@public/lottie/text-input/check.json";
import crossLottie from "@public/lottie/text-input/cross.json";
import loadingLottie from "@public/lottie/text-input/loading.json";
import warningLottie from "@public/lottie/text-input/warning.json";

import { ReactNode } from "react";

import { WithInputValidationProps } from "../../../index";
import { Player } from "@lottiefiles/react-lottie-player";

export type GenericInputValidationStatus = "no-change" | "warning" | "error" | "valid" | "loading";

export interface GenericInputValidationProps {
  validMessage?: ReactNode;
  loadingMessage?: ReactNode;
  warningMessage?: ReactNode;
  errorMessage?: ReactNode;
  forceStatus?: GenericInputValidationStatus;
}

interface ProcessStatus {
  loadingMessage?: ReactNode;
  warningMessage?: ReactNode;
  errorMessage?: ReactNode;
  isDefaultGeneric?: boolean;
}

export const genericInputValidationProcessStatus = ({
  loadingMessage,
  warningMessage,
  errorMessage,
  isDefaultGeneric,
}: ProcessStatus): GenericInputValidationStatus => {
  if (isDefaultGeneric) {
    return "no-change";
  }

  if (errorMessage) {
    return "error";
  }

  if (warningMessage) {
    return "warning";
  }

  if (loadingMessage) {
    return "loading";
  }

  return "valid";
};

export const genericInputValidationProcessStatusMessage = (
  status: GenericInputValidationStatus,
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

export const genericInputValidationProcessStatusIcon = (status: GenericInputValidationStatus): ReactNode => {
  switch (status) {
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

export const genericInputValidationProcessDecorator = (
  status: GenericInputValidationStatus
): WithInputValidationProps["decorator"] => {
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
