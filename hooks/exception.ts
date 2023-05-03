import { useEffect } from "react";

import { isAPIError } from "@lib/api";

import { captureException } from "@lib";

export interface CaptureExceptionParams {
  /**
   * The error to be captured.
   */
  error: unknown;
  /**
   * When true, error is not propagated to the standard exception handler.
   */
  silent?: boolean;
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
export const useCaptureException = ({ error, silent, ignoreAPICodes }: CaptureExceptionParams) => {
  useEffect(() => {
    if (silent || error == null) {
      return;
    }

    if (isAPIError(error) && ignoreAPICodes?.includes(error.status)) {
      return;
    }

    captureException(error);
  }, [error, ignoreAPICodes, silent]);
};
