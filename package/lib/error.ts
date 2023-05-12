import { isAPIError } from "@lib/api";

export interface CaptureExceptionOptions {
  silent?: boolean;
}

export type ExceptionHandler = (error: unknown, options?: CaptureExceptionOptions) => void;

class exceptionHandler {
  handlers: ExceptionHandler[] = [];

  addHandler = (handler: ExceptionHandler) => {
    this.handlers.push(handler);
  };

  removeHandler = (handler: ExceptionHandler) => {
    this.handlers = this.handlers.filter((h) => h !== handler);
  };

  capture = (error: unknown, options?: CaptureExceptionOptions) => {
    this.handlers.forEach((h) => h(error, options));
  };

  constructor(options?: { handlers?: ExceptionHandler[] }) {
    if (options?.handlers) {
      this.handlers = options.handlers;
    }
  }
}

const defaultHandler = new exceptionHandler({
  handlers: [
    (error, options) => {
      // No need to log api errors, as they are already logged by the browser no matter what.
      if (options?.silent || isAPIError(error)) {
        return;
      }

      console.error(error);
    },
  ],
});

export const captureException = defaultHandler.capture;
export const addExceptionHandler = defaultHandler.addHandler;
export const removeExceptionHandler = defaultHandler.removeHandler;

export type autoCaptureInputExceptionCallback<Status, ErrorStatus> =
  | ((status: Status) => void)
  | ((status: Status, errorStatus?: ErrorStatus) => void)
  | ((status: Status, errorStatus?: ErrorStatus, error?: unknown) => void);

export const autoCaptureInputException =
  <Status, ErrorStatus>(callback: autoCaptureInputExceptionCallback<Status, ErrorStatus>) =>
  (status: Status, errorStatus?: ErrorStatus, error?: unknown) => {
    if (errorStatus != null) {
      captureException(error, { silent: true });
    }

    callback(status, errorStatus, error);
  };
