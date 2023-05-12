import { useContext, useMemo } from "react";

import { FetchRequest } from "@lib/api";

import { AuthContext } from "@contexts";

export type AuthAPIHeaders = Pick<FetchRequest, "headers" | "requestInit">;

type AuthAPIHeadersProcessor<T> = (headers?: AuthAPIHeaders) => T;

interface AuthAPIHeadersParams<T = AuthAPIHeaders> {
  processor?: AuthAPIHeadersProcessor<T>;
}

// If no processor is defined, return AuthAPIHeaders or AuthAPIHeadersInline (depending on the inline flag).
// Otherwise, return the return type of the processor.
type AuthAPIHeadersResponse<T, P extends AuthAPIHeadersParams<T>> = {
  inline?: P extends {} ? AuthAPIHeaders : P["processor"] extends undefined ? AuthAPIHeaders : T;
  stacked?: P extends {} ? [AuthAPIHeaders] : P["processor"] extends undefined ? [AuthAPIHeaders] : [T];
};

export const useAuthAPIHeaders = <T, P extends AuthAPIHeadersParams<T>>(
  props?: P
): AuthAPIHeadersResponse<T, P> | undefined => {
  const { token } = useContext(AuthContext);
  const { processor } = props || {};

  const headersInline = useMemo(() => {
    const baseHeaders: AuthAPIHeaders | undefined = token ? { headers: { Authorization: token } } : undefined;
    return processor ? processor(baseHeaders) : baseHeaders;
  }, [processor, token]);

  const headersStacked = useMemo(() => (headersInline ? [headersInline] : undefined), [headersInline]);

  return { inline: headersInline, stacked: headersStacked } as AuthAPIHeadersResponse<T, P>;
};
