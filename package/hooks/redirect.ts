import { useCallback } from "react";

import { redirect, usePathname, useRouter } from "next/navigation";

const LOCAL_STORAGE_KEY = "agora_last_visited_path";

export interface LastPathRedirectHook {
  /**
   * Perform a next redirect, and save the current path (before redirection) in local storage.
   */
  redirectPush: (dest: string) => void;
  /**
   * Perform a next redirect to the last visited path saved in local storage. If no path is present,
   * navigate to the fallback path instead.
   */
  redirectPop: (fallback: string) => void;
  /**
   * Navigate to a new path, and save the current path (before navigation) in local storage.
   */
  navPush: ReturnType<typeof useRouter>["push"];
  /**
   * Navigate to the last visited path saved in local storage. If no path is present, navigate to the fallback path
   */
  navPop: ReturnType<typeof useRouter>["push"];
  /**
   * Replace the current path, and save the current path (before navigation) in local storage.
   */
  replacePush: ReturnType<typeof useRouter>["replace"];
  /**
   * Replace the current path with the last visited path saved in local storage. If no path is present, replace the
   * current path with the fallback path.
   */
  replacePop: ReturnType<typeof useRouter>["replace"];
  /**
   * Clear the last visited path from local storage.
   */
  clear: () => void;
}

export const useLastPathRedirect = (): LastPathRedirectHook => {
  const pathname = usePathname();
  const { push, replace } = useRouter();

  const set = useCallback(
    (dest: string) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, pathname);
      return dest;
    },
    [pathname]
  );

  const pop = useCallback((fallback: string) => {
    const lastVisitedPath = localStorage.getItem(LOCAL_STORAGE_KEY);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    return lastVisitedPath || fallback;
  }, []);

  const redirectPush = useCallback((dest: string) => redirect(set(dest)), [set]);

  const redirectPop = useCallback((fallback: string) => redirect(pop(fallback)), [pop]);

  const navPush = useCallback<typeof push>((url, options) => push(set(url), options), [push, set]);

  const navPop = useCallback<typeof push>((url, options) => push(pop(url), options), [pop, push]);

  const replacePush = useCallback<typeof replace>((url, options) => replace(set(url), options), [replace, set]);

  const replacePop = useCallback<typeof replace>((url, options) => replace(pop(url), options), [pop, replace]);

  const clear = useCallback(() => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }, []);

  return { redirectPush, redirectPop, navPush, navPop, replacePush, replacePop, clear };
};
