import { Context, ReactNode } from "react";

import { BackgroundFetchHookParams, BackgroundFetchHookResult, useBackgroundFetch } from "@hooks";

export interface APIDataContextParams<Res, Req extends any[]> extends BackgroundFetchHookParams<Res, Req> {
  ctx: Context<BackgroundFetchHookResult<Res, Req>>;
  children: ReactNode;
}

export const DefaultAPIDataContext: BackgroundFetchHookResult<unknown, any[]> = {
  reload: () => {
    console.warn("APIDataContext.reload() called before initialization.");
  },
  trigger: () => {
    console.warn("APIDataContext.trigger() called before initialization.");
  },
  setResponse: () => {
    console.warn("APIDataContext.setResponse() called before initialization.");
  },
  setError: () => {
    console.warn("APIDataContext.setError() called before initialization.");
  },
  setAPIError: () => {
    console.warn("APIDataContext.setAPIError() called before initialization.");
  },
  clear: () => {
    console.warn("APIDataContext.clear() called before initialization.");
  },
  clearErrors: () => {
    console.warn("APIDataContext.clearErrors() called before initialization.");
  },
};

export function WithAPIDataContext<Res, Req extends any[]>({
  ctx: Ctx,
  children,
  ...props
}: APIDataContextParams<Res, Req>) {
  const value = useBackgroundFetch(props);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
