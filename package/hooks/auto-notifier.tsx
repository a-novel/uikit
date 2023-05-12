import { ReactNode, useCallback, useContext, useEffect, useMemo } from "react";

import { NotificationContentClosable, NotificationContentWithTitle, NotificationProps } from "@components/stateless";

import { NotificationsContext } from "@contexts";

export type AutoNotificationRenderer = (onClose: () => void) => Omit<NotificationProps, "hide">;

export interface AutoNotificationParams {
  condition: boolean;
  clearCondition: () => void;
  render: AutoNotificationRenderer;
}

export const useAutoNotification = ({ condition, clearCondition, render }: AutoNotificationParams) => {
  const id = useMemo(() => crypto.randomUUID(), []);
  const { set, unset } = useContext(NotificationsContext);

  const onClose = useCallback(() => {
    clearCondition();
  }, [clearCondition]);

  useEffect(() => {
    if (!condition) {
      unset(id);
      return;
    }

    set(id, render(onClose));
  }, [condition, render, id, onClose, set, unset]);
};

export const useAutoNotificationErrorRender = (title: ReactNode, content: ReactNode) => {
  return useCallback<AutoNotificationRenderer>(
    (onClose) => ({
      decorator: "danger",
      children: (
        <NotificationContentClosable onClose={onClose}>
          <NotificationContentWithTitle title={title}>{content}</NotificationContentWithTitle>
        </NotificationContentClosable>
      ),
    }),
    [title, content]
  );
};
