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
  notifications: Map<string, NotificationProps>;
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
  notifications: new Map(),
});

export const WithNotifications: FC<{ children?: ReactNode }> = ({ children }) => {
  // Schedule timed notifications removal.
  const timeouts = useRef<Map<string, number>>(new Map());
  const [notifications, setNotifications] = useState<Map<string, NotificationProps>>(new Map());

  // FadeOut animation takes 200ms, so we have a little buffer. Check the css of the notification component to make
  // sure this value always matches.
  const { data } = useBufferedState({ source: notifications, bufferedDuration: 800 });

  const unset = useCallback((key: string) => {
    setNotifications((notifications) => {
      notifications.delete(key);
      // Cancel removal timeout, if any.
      if (timeouts.current.has(key)) {
        window.clearTimeout(timeouts.current.get(key)!);
        timeouts.current.delete(key);
      }
      return new Map(notifications);
    });
  }, []);

  const unsetAll = useCallback(() => {
    setNotifications((notifications) => {
      notifications.clear();
      // Cancel all removal timeouts.
      timeouts.current.forEach((timeout) => window.clearTimeout(timeout));
      timeouts.current.clear();
      return new Map(notifications);
    });
  }, []);

  const set = useCallback(
    (key: string, props: Omit<NotificationProps, "hide">, params?: SetNotificationParamsOptions) => {
      // Cancel removal timeout, if any (can happen if the key is updated).
      if (timeouts.current.has(key)) {
        window.clearTimeout(timeouts.current.get(key)!);
        timeouts.current.delete(key);
      }

      // Schedule timed notifications removal.
      if (params?.ttl) {
        timeouts.current.set(
          key,
          window.setTimeout(() => unset(key), params.ttl)
        );
      }

      setNotifications((notifications) => {
        notifications.set(key, props);
        return new Map(notifications);
      });
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
        {Array.from(data).map(([key, props]) => (
          <Notification key={key} hide={props.status === "removed"} {...props.content} />
        ))}
      </NotificationsZone>
      {children}
    </NotificationsContext.Provider>
  );
};
