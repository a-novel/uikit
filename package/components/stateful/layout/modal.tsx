import css from "./modal.module.css";

import FlaresError from "@public/icons/monochrome/flares/flares-error.svg";
import FlaresSuccess from "@public/icons/monochrome/flares/flares-success.svg";
import FlaresWarning from "@public/icons/monochrome/flares/flares-warning.svg";
import Flares from "@public/icons/monochrome/flares/flares.svg";

import { FC, HTMLAttributes, ReactNode, useEffect } from "react";

import { mergeClassNames } from "@lib";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  decorator?: "info" | "success" | "warning" | "error";
}

const RenderFlares: FC<Pick<ModalProps, "decorator">> = ({ decorator }) => {
  switch (decorator) {
    case "success":
      return <FlaresSuccess />;
    case "warning":
      return <FlaresWarning />;
    case "error":
      return <FlaresError />;
    default:
      return <Flares />;
  }
};

export const Modal: FC<ModalProps> = ({ visible, className, decorator, children, ...props }) => {
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [visible]);

  return (
    <div
      className={mergeClassNames(css.wrapper, visible ? css.visible : css.hidden, css[decorator || "info"], className)}
      {...props}
    >
      <div className={css.background}>
        <RenderFlares decorator={decorator} />
      </div>
      <div className={css.modal}>{children}</div>
    </div>
  );
};

export interface ModalTitleProps extends HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
}

export const ModalTitle: FC<ModalTitleProps> = ({ className, children, icon, ...props }) => (
  <div className={mergeClassNames(css.title, className)} {...props}>
    <span className={css.titleContent}>{children}</span>
    {icon && <div className={css.icon}>{icon}</div>}
  </div>
);

export const ModalContent: FC<HTMLAttributes<HTMLParagraphElement>> = ({ className, ...props }) => (
  <p className={mergeClassNames(css.content, className)} {...props} />
);

export const ModalButtonZone: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={mergeClassNames(css.buttonZone, className)} {...props} />
);
