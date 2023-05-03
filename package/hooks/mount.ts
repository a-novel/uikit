import { EffectCallback, useEffect, useState } from "react";

/**
 * Runs an effect only when mounted.
 */
export const useMountEffect = (fn: EffectCallback) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      fn();
    }
  }, [mounted, fn]);
};
