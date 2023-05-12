import React, { ReactNode, useCallback, useEffect, useState } from "react";

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
   * Indicates if a call is currently processing. Undefined while no call has been made.
   */
  loading?: boolean;
  /**
   * Indicates whether last call was successful or not.
   */
  success?: boolean;
  /**
   * Indicates whether last call failed or not.
   */
  failure?: boolean;
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
  clearErrors: () => void;
  /**
   * Reset all returns values to their initial state.
   */
  clear: () => void;
}

export const useFetch = <Res, Req extends any[]>({
  call,
  initial,
  onLoading,
}: FetchHookParams<Res, Req>): FetchHookResult<Res, Req> => {
  const [loading, setLoading] = useState<boolean>();
  const [success, setSuccess] = useState<boolean>();
  const [response, setResponse] = useState(initial);
  const [apiError, setAPIError] = useState<APIError>();
  const [error, setError] = useState<unknown>();

  const clear = useCallback(() => {
    setLoading(undefined);
    setSuccess(undefined);
    setResponse(initial);
    setAPIError(undefined);
    setError(undefined);
  }, [initial]);

  const trigger = useCallback(
    async (...req: Req) => {
      setLoading(true);
      onLoading?.();

      try {
        const res = await call(...req);
        setResponse(res);
        setAPIError(undefined);
        setError(undefined);
        setSuccess(true);
      } catch (e) {
        setSuccess(false);
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

  const clearErrors = useCallback(() => {
    setAPIError(undefined);
    setError(undefined);
  }, []);

  return {
    trigger,
    loading,
    response,
    apiError,
    error,
    setResponse,
    setAPIError,
    setError,
    clearErrors,
    success,
    clear,
    failure: error != null || apiError != null,
  };
};

export interface BackgroundFetchHookParams<Res, Req extends any[]> extends FetchHookParams<Res, Req> {
  /**
   * Triggers a new api call every time they are modified. Must be memoized.
   */
  params?: Req;
  condition?: boolean;
  /**
   * Call clear when params are nil.
   */
  autoClean?: boolean;
}

export interface BackgroundFetchHookResult<Res, Req extends any[]> extends FetchHookResult<Res, Req> {
  reload: () => void;
}

/**
 * Similar to {@link useFetch}, but the call is triggered immediately when the hook is mounted, and error are
 * handled automatically. Requires a {@link NotificationsContext} ancestor.
 */
export const useBackgroundFetch = <Res, Req extends any[]>({
  params,
  condition,
  autoClean,
  ...props
}: BackgroundFetchHookParams<Res, Req>): BackgroundFetchHookResult<Res, Req> => {
  const res = useFetch(props);

  const reload = useCallback(() => {
    if (condition !== false && params != null) {
      res.trigger(...params);
    }
  }, [condition, params, res]);

  useEffect(() => {
    reload();
  }, [condition, params, reload, res, res.trigger]);

  useEffect(() => {
    if (params == null && autoClean === true) {
      res.setResponse(undefined);
      res.clearErrors();
    }
  }, [autoClean, params, res]);

  return { ...res, reload };
};
