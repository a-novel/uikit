import "client-only";

import { FC, ReactNode, createContext, useCallback, useEffect, useMemo } from "react";

import dynamic from "next/dynamic";

import { APIError } from "@lib/api";

import { useFetch, useMountEffect, usePing } from "@hooks";

export const LOCAL_STORAGE_KEY = "agora_token";

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
  cleanErrors: () => void;
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
  cleanErrors: () => {
    console.warn("AuthContext.cleanErrors() called before initialization.");
  },
});

const WithAuthComponent: FC<AuthProviderProps> = ({ children, checkInterval, api }) => {
  // Only compute initial token when component is loaded.
  const initialToken = useMemo(() => window.localStorage.getItem(LOCAL_STORAGE_KEY), []);

  const {
    trigger,
    loading,
    response: token,
    apiError,
    error,
    setResponse,
    setError,
    setAPIError,
  } = useFetch({
    call: api,
    initial: initialToken,
  });

  const status = useMemo(() => (loading ? "loading" : token ? "authenticated" : "unauthenticated"), [loading, token]);

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
  }, [setResponse]);

  const cleanErrors = useCallback(() => {
    setAPIError(undefined);
    setError(undefined);
  }, [setAPIError, setError]);

  // Auto logout.
  useEffect(() => {
    // The local token, if any, is not valid anymore. We have to delete it and force user to re-login.
    if (status === "authenticated" && apiError?.status === 403) {
      logout();
      return;
    }
  }, [apiError?.status, logout, status]);

  // Update localStorage values on token change.
  useEffect(() => {
    token ? window.localStorage.setItem(LOCAL_STORAGE_KEY, token) : window.localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, [token]);

  return (
    <AuthContext.Provider value={{ logout, login, error, status, token, apiError, cleanErrors }}>
      {children}
    </AuthContext.Provider>
  );
};

export const WithAuth = dynamic(() => Promise.resolve(WithAuthComponent), { ssr: false });
