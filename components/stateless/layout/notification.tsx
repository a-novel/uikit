import css from "./notification.module.css";
import { FC, HTMLAttributes, ReactNode } from "react";
import { Decorator, WithDecorator } from "@components/stateless";
import { mergeClassNames } from "@lib";

import loadingLottie from "@public/lottie/status/loading.json";

import CloseIcon from "@public/icons/monochrome/close.svg";
import { Player } from "@lottiefiles/react-lottie-player";

export interface NotificationProps extends HTMLAttributes<HTMLDivElement> {
  decorator?: Decorator;
  hide?: boolean;
}

export const Notification: FC<NotificationProps> = ({ decorator, hide, className, ...props }) => (
  <WithDecorator
    decorator={decorator}
    render={(decoratorClassName) => (
      <div
        className={mergeClassNames(css.notification, hide ? css.hide : undefined, decoratorClassName, className)}
        {...props}
      />
    )}
  />
);

export const NotificationContentBasic: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={mergeClassNames(css.notificationContent, className)} {...props} />
);

export interface NotificationContentWithTitleProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  title: ReactNode;
}

export const NotificationContentWithTitle: FC<NotificationContentWithTitleProps> = ({
  title,
  children,
  className,
  ...props
}) => (
  <NotificationContentBasic className={mergeClassNames(css.withTitle, className)} {...props}>
    <div className={css.title}>{title}</div>
    <div className={css.body}>{children}</div>
  </NotificationContentBasic>
);

export interface NotificationContentWithIconProps extends HTMLAttributes<HTMLDivElement> {
  icon: ReactNode;
}

export const NotificationContentWithIcon: FC<NotificationContentWithIconProps> = ({
  icon,
  children,
  className,
  ...props
}) => (
  <NotificationContentBasic className={mergeClassNames(css.withIcon, className)} {...props}>
    <div className={css.body}>{children}</div>
    <div className={css.icon}>{icon}</div>
  </NotificationContentBasic>
);

export interface NotificationContentClosableProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
  /**
   * @uikit-only
   */
  hoverCloseButton?: boolean;
}

export const NotificationContentClosable: FC<NotificationContentClosableProps> = ({
  onClose,
  children,
  className,
  hoverCloseButton,
  ...props
}) => (
  <NotificationContentBasic className={mergeClassNames(css.closable, className)} {...props}>
    <div className={css.body}>{children}</div>
    <div className={mergeClassNames(css.action, hoverCloseButton ? "hover" : undefined)} onClick={onClose}>
      <CloseIcon />
    </div>
  </NotificationContentBasic>
);

export const APILoaderNotification: FC<HTMLAttributes<HTMLDivElement>> = (props) => (
  <Notification>
    <NotificationContentWithIcon icon={<Player autoplay loop src={loadingLottie} />} {...props} />
  </Notification>
);

export const NotificationsZone: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={mergeClassNames(css.notificationsZone, className)} {...props} />
);
