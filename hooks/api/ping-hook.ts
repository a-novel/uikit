import { useEffect, useRef } from "react";

export interface PingHookParams<Req extends any[]> {
  /**
   * The trigger to be periodically called.
   */
  call: (...req: Req) => void;
  /**
   * The arguments for the trigger. A new trigger is performed immediately when those arguments change, resetting the cycle.
   */
  args: Req;
  /**
   * The interval in milliseconds. If a value less than 1 is specified, the trigger is only called when
   * the arguments change.
   */
  interval: number;
  /**
   * Disable initial call, when an argument changes.
   */
  preventRefreshCall?: boolean;
  /**
   * The condition for the trigger to be called. If not specified, the trigger is called unconditionally.
   */
  condition?: boolean;
}

/**
 * Takes a trigger function, and calls it periodically.
 */
export const usePing = <Req extends any[]>({
  call,
  args,
  interval,
  condition,
  preventRefreshCall,
}: PingHookParams<Req>): void => {
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (condition === false) return;

    if (!preventRefreshCall) call(...args);

    if (interval < 1) return;

    intervalRef.current = window.setInterval(() => call(...args), interval);
    return () => window.clearInterval(intervalRef.current);
  }, [call, args, interval, condition, preventRefreshCall]);
};
