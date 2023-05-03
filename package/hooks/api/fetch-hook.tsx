import React, { ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { NotificationContentClosable, NotificationContentWithTitle } from "@components/stateless";
import { APIError, isAPIError } from "@lib/api";

import { NotificationsContext } from "@contexts";

export interface FetchHookParams<Res, Req extends any[]> {
  /**
   * The async function that will be called when the hook is triggered. It must return a promise. If an error is returned
   * by the API, it should be of type {@link APIError}.
   */
  call: (...req: Req) => Promise<Res>;
  /**
   * An initial value to be used before any call is made. Once a call has been triggered, if an error occurred, the
   * last response object is kept, and its value can still be used as a fallback.
   */
  initial?: Res;
  /**
   * An optional handler, to trigger whenever loading state switches to true.
   */
  onLoading?: () => void;
}

export interface FetchHookResult<Res, Req extends any[]> {
  /**
   * Triggers the api call. When called, loading is set to true until the call completes.
   *
   * If an error of type {@link APIError} is returned, it is stored in the {@link apiError} property. If any other
   * error occurs, it is stored in the {@link error} property.
   *
   * On error, the previous value of {@link response} is kept, and can still be used as a fallback. Otherwise, the
   * response value is updated according to the API results.
   */
  trigger: (...req: Req) => void;
  /**
   * Indicates if a call is currently processing.
   */
  loading: boolean;
  /**
   * The last returned response object, if any.
   */
  response?: Res;
  /**
   * If an error is returned by the API, it is stored here. If any other error occurs, it is stored in the
   * {@link error} property.
   */
  apiError?: APIError;
  /**
   * If an error is returned by the API, it is stored in the {@link apiError} property. If any other error occurs, it
   * is stored here.
   */
  error?: unknown;
  /**
   * Force the {@link response} value.
   */
  setResponse: (res?: Res) => void;
  /**
   * Force the {@link apiError} value.
   */
  setAPIError: (err?: APIError) => void;
  /**
   * Force the {@link error} value.
   */
  setError: (err?: unknown) => void;
}

export const useFetch = <Res, Req extends any[]>({
  call,
  initial,
  onLoading,
}: FetchHookParams<Res, Req>): FetchHookResult<Res, Req> => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(initial);
  const [apiError, setAPIError] = useState<APIError>();
  const [error, setError] = useState<unknown>();

  const trigger = useCallback(
    async (...req: Req) => {
      setLoading(true);
      onLoading?.();

      try {
        const res = await call(...req);
        setResponse(res);
        setAPIError(undefined);
        setError(undefined);
      } catch (e) {
        if (isAPIError(e)) {
          setAPIError(e);
        } else {
          setError(e);
        }
      }

      setLoading(false);
    },
    [call, onLoading]
  );

  return {
    trigger,
    loading,
    response,
    apiError,
    error,
    setResponse,
    setAPIError,
    setError,
  };
};

export interface BackgroundFetchHookResult<Res, Req extends any[]> {
  /**
   * Indicates if a call is currently processing.
   */
  loading: boolean;
  /**
   * The last returned response object, if any.
   */
  response?: Res;
  /**
   * Force the {@link response} value.
   */
  setResponse: (res?: Res) => void;
  error?: unknown;
}

export interface FetchErrorMessage {
  title: ReactNode;
  content: ReactNode;
}

export interface FetchErrorMessages {
  /**
   * The default message to display, when error is not known.
   */
  default: FetchErrorMessage;
  /**
   * Define special messages for {@link APIError} codes.
   */
  codeMessages?: Record<number, FetchErrorMessage>;
}

export interface BackgroundFetchHookParams<Res, Req extends any[]> extends FetchHookParams<Res, Req> {
  /**
   * Triggers a new api call every time they are modified. Must be memoized.
   */
  params: Req;
  condition?: boolean;
  errors: FetchErrorMessages;
  /**
   * Capture the error to handle it manually. You may call resume() to proceed with the default behavior.
   */
  onError?: (err: unknown, resume: () => void) => void;
}

/**
 * Similar to {@link useFetch}, but the call is triggered immediately when the hook is mounted, and error are
 * handled automatically. Requires a {@link NotificationsContext} ancestor.
 */
export const useBackgroundFetch = <Res, Req extends any[]>({
  params,
  errors,
  onError,
  condition,
  ...props
}: BackgroundFetchHookParams<Res, Req>): BackgroundFetchHookResult<Res, Req> => {
  const id = useMemo(() => crypto.randomUUID(), []);

  const { set, unset } = useContext(NotificationsContext);

  const { trigger, loading, response, error, apiError, setResponse, setAPIError, setError } = useFetch(props);

  const onCloseHandler = useCallback(() => {
    unset(id);
    setAPIError(undefined);
    setError(undefined);
  }, [id, setAPIError, setError, unset]);

  const handleError = useCallback(() => {
    if (apiError) {
      const errorMessage = errors.codeMessages?.[apiError.status] || errors.default;

      set(id, {
        decorator: "danger",
        children: (
          <NotificationContentClosable onClose={onCloseHandler}>
            <NotificationContentWithTitle title={errorMessage.title}>
              {errorMessage.content}
            </NotificationContentWithTitle>
          </NotificationContentClosable>
        ),
      });
    }

    if (error) {
      set(id, {
        decorator: "danger",
        children: (
          <NotificationContentClosable onClose={onCloseHandler}>
            <NotificationContentWithTitle title={errors.default.title}>
              {errors.default.content}
            </NotificationContentWithTitle>
          </NotificationContentClosable>
        ),
      });
    }

    unset(id);
  }, [apiError, error, errors, id, onCloseHandler, set, unset]);

  useEffect(() => {
    if (condition !== false) trigger(...params);
  }, [condition, params, trigger]);

  useEffect(() => {
    if ((error != null || apiError) != null && onError != null) {
      onError(error || apiError, handleError);
    }

    handleError();
  }, [apiError, error, handleError, onError]);

  return {
    loading,
    response,
    setResponse,
    error: error || apiError,
  };
};
