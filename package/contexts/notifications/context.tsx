import css from "./context.module.css";

import { FC, ReactNode, createContext, useCallback, useEffect, useRef, useState } from "react";

import { Notification, NotificationProps, NotificationsZone } from "@components/stateless";

import { useBufferedState } from "@hooks";

export interface SetNotificationParamsOptions {
  ttl?: number;
}

export interface NotificationsContextRendered {
  props: Omit<NotificationProps, "hide">;
  params?: SetNotificationParamsOptions;
}

export interface NotificationsContextType {
  set: (key: string, props: Omit<NotificationProps, "hide">, params?: SetNotificationParamsOptions) => void;
  unset: (key: string) => void;
  unsetAll: () => void;
  notifications: Record<string, NotificationProps>;
}

export const NotificationsContext = createContext<NotificationsContextType>({
  set: () => {
    console.warn("NotificationsContext.set() has been called but not initialized");
  },
  unset: () => {
    console.warn("NotificationsContext.unset() has been called but not initialized");
  },
  unsetAll: () => {
    console.warn("NotificationsContext.unsetAll() has been called but not initialized");
  },
  notifications: {},
});

export const WithNotifications: FC<{ children?: ReactNode }> = ({ children }) => {
  // Schedule timed notifications removal.
  const timeouts = useRef<Map<string, number>>(new Map());
  const [notifications, setNotifications] = useState<Record<string, NotificationProps>>({});

  // FadeOut animation takes 200ms, so we have a little buffer. Check the css of the notification component to make
  // sure this value always matches.
  const { data } = useBufferedState({ source: notifications, bufferedDuration: 800 });

  const unset = useCallback((key: string) => {
    setNotifications((notifications) => {
      const { [key]: _, ...rest } = notifications;
      // Cancel removal timeout, if any.
      timeouts.current.delete(key);
      return rest;
    });
  }, []);

  const unsetAll = useCallback(() => {
    setNotifications({});
  }, []);

  const set = useCallback(
    (key: string, props: Omit<NotificationProps, "hide">, params?: SetNotificationParamsOptions) => {
      // Cancel removal timeout, if any (can happen if the key is updated).
      timeouts.current.delete(key);

      // Schedule timed notifications removal.
      if (params?.ttl) {
        const timeout = window.setTimeout(() => unset(key), params.ttl);
        timeouts.current.set(key, timeout);
      }

      setNotifications((notifications) => ({
        ...notifications,
        [key]: props,
      }));
    },
    [unset]
  );

  useEffect(() => {
    // Clean up the timeouts when the component unmounts.
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeouts.current.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  return (
    <NotificationsContext.Provider value={{ set, unset, unsetAll, notifications }}>
      <NotificationsZone className={css.container}>
        {Object.entries(data).map(([key, props]) => (
          <Notification key={key} hide={props.status === "removed"} {...props.content} />
        ))}
      </NotificationsZone>
      {children}
    </NotificationsContext.Provider>
  );
};
