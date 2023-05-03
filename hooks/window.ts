import { useEffect, useState } from "react";

/**
 * Returns the window object only when rendered on the client. It allows to call window outside effects, while
 * enabling SSR.
 */
export const useWindow = () => {
  const [stableWindow, setStableWindow] = useState<Window | undefined>(undefined);

  useEffect(() => {
    setStableWindow(window);
  }, []);

  return stableWindow;
};
