import { useEffect } from "react";

import { isAPIError } from "@lib/api";

import { CaptureExceptionOptions, captureException } from "@lib";

export interface CaptureExceptionParams extends CaptureExceptionOptions {
  /**
   * The error to be captured.
   */
  error: unknown;
  /**
   * If the error is an {@link import('@lib/api').APIError|APIError} and it has any of the codes listed here,
   * it will be ignored.
   */
  ignoreAPICodes?: number[];
}

/**
 * Calls the standard exception handler, every time the error is updated. The error must either be memoized or
 * wrapped in a state.
 */
export const useCaptureException = ({ error, ignoreAPICodes, ...options }: CaptureExceptionParams) => {
  useEffect(() => {
    if (error == null) {
      return;
    }

    if (isAPIError(error) && ignoreAPICodes?.includes(error.status)) {
      return;
    }

    captureException(error, options);
  }, [error, ignoreAPICodes, options]);
};
