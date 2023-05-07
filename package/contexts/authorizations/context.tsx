import { FC, ReactNode, createContext, useContext, useEffect, useMemo } from "react";

import { AuthContext } from "@contexts";
import { FetchErrorMessages, useBackgroundFetch, useCaptureException } from "@hooks";

export interface AuthorizationsContextParams<T> {
  api: (token: string) => Promise<T>;
  errors: FetchErrorMessages;
  children?: ReactNode;
}

const AuthorizationsContext = createContext({});

export const WithAuthorizations: FC<AuthorizationsContextParams<any>> = ({ api, errors, children }) => {
  const { status, token } = useContext(AuthContext);

  const params = useMemo<[string]>(() => [token || ""], [token]);

  const authorizations = useBackgroundFetch({
    call: api,
    errors,
    condition: status === "authenticated",
    params,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      authorizations.setResponse(undefined);
    }
  }, [authorizations, status]);

  useCaptureException({ error: authorizations.error });
  useCaptureException({ error: authorizations.apiError });

  return <AuthorizationsContext.Provider value={authorizations.response}>{children}</AuthorizationsContext.Provider>;
};
