import "client-only";

import { FC, ReactNode, createContext, useCallback, useEffect, useMemo } from "react";

import dynamic from "next/dynamic";

import { APIError } from "@lib/api";

import { useFetch, useMountEffect, usePing } from "@hooks";

export const AUTH_LOCAL_STORAGE_KEY = "agora_token";

/**
 * Indicate the current status of authentication.
 */
export type AuthStatus = "loading" | "unauthenticated" | "authenticated";

export interface AuthContextType {
  /**
   * Clears local token, and set status to "unauthenticated".
   */
  logout: () => void;
  /**
   * Update local token, and set status to "authenticated".
   */
  login: (token: string) => void;
  /**
   * Any error that happened during the auth process.
   */
  error?: unknown;
  /**
   * Any error that happened while checking token status.
   */
  apiError?: APIError;
  status: AuthStatus;
  /**
   * The current token, if any.
   */
  token?: string | null;
  success?: boolean;
  failure?: boolean;
  clearErrors: () => void;
}

export interface AuthProviderProps {
  checkInterval?: number;
  children?: ReactNode;
  /**
   * Verify the token is valid, and return an updated token if required.
   */
  api: (token?: string) => Promise<string>;
}

export const AuthContext = createContext<AuthContextType>({
  status: "loading",
  logout: () => {
    console.warn("AuthContext.logout() called before initialization.");
  },
  login: () => {
    console.warn("AuthContext.login() called before initialization.");
  },
  clearErrors: () => {
    console.warn("AuthContext.clearErrors() called before initialization.");
  },
});

const WithAuthComponent: FC<AuthProviderProps> = ({ children, checkInterval, api }) => {
  // Only compute initial token when component is loaded.
  const initialToken = useMemo(() => window.localStorage.getItem(AUTH_LOCAL_STORAGE_KEY), []);

  const {
    trigger,
    loading,
    response: token,
    apiError,
    error,
    setResponse,
    setError,
    setAPIError,
    clearErrors,
    success,
    failure,
  } = useFetch({
    call: api,
  });

  const status = useMemo(
    () =>
      (loading == null && initialToken) || loading === true ? "loading" : token ? "authenticated" : "unauthenticated",
    [initialToken, loading, token]
  );

  const wrapperToken = useMemo(() => [token] as [string | undefined], [token]);

  usePing({
    call: trigger,
    args: wrapperToken,
    interval: checkInterval || 0,
    condition: token != null,
    preventRefreshCall: true,
  });

  useMountEffect(() => {
    if (initialToken) {
      trigger(initialToken);
    }
  });

  const login = useCallback(
    (token: string) => {
      setResponse(token);
    },
    [setResponse]
  );

  const logout = useCallback(() => {
    setResponse(undefined);
    setError(undefined);
    setAPIError(undefined);
    window.localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY);
  }, [setAPIError, setError, setResponse]);

  // Auto-logout on 403.
  useEffect(() => {
    if (apiError?.status === 403) {
      logout();
      return;
    }
  }, [apiError?.status, logout]);

  // Update localStorage values on token change.
  useEffect(() => {
    // Only remove on explicit logout, to avoid losing local token in case of API error.
    if (token != null) {
      window.localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, token);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ success, failure, logout, login, error, status, token, apiError, clearErrors }}>
      {children}
    </AuthContext.Provider>
  );
};

export const WithAuth = dynamic(() => Promise.resolve(WithAuthComponent), { ssr: false });
