import css from "./validator.module.css";

import ArrowIcon from "@public/icons/monochrome/arrow.svg";

import { FC, MouseEventHandler, ReactNode, useEffect, useRef } from "react";

import { InputProps } from "../basic";

import { mergeClassNames } from "@lib";

type InputDecorator = InputProps["decorator"];

export interface WithInputValidationProps {
  show: boolean;
  decorator?: "default" | "valid" | "warning" | "error";
  message?: ReactNode;
  icon: ReactNode;
  renderer: (className: string, decorator?: "valid" | "warning" | "error", children?: ReactNode) => ReactNode;
  className?: string;
}

const parseDecorator = (decorator?: "default" | "valid" | "warning" | "error"): InputDecorator => {
  switch (decorator) {
    case "valid":
      return "valid";
    case "warning":
      return "warning";
    case "error":
      return "error";
    default:
      return undefined;
  }
};

export const WithInputValidation: FC<WithInputValidationProps> = ({
  decorator,
  message,
  icon,
  renderer,
  show,
  className,
}) => {
  // Force animation replay when the decorator changes.
  // https://stackoverflow.com/a/45036752/9021186
  const statusBoxRef = useRef<HTMLDivElement>(null);
  const statusMessageRef = useRef<HTMLDivElement>(null);
  const statusMessageArrowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    for (const el of [statusBoxRef.current, statusMessageRef.current, statusMessageArrowRef.current]) {
      if (el != null) {
        el.style.animation = "none";
        el.getBoundingClientRect();
        el.style.animation = "";
      }
    }
  }, [decorator, show]);

  const children = show ? (
    <>
      <div
        ref={statusBoxRef}
        className={mergeClassNames(
          css.statusBox,
          decorator ? css[decorator] : css.noDecorator,
          show ? css.visible : undefined
        )}
      >
        {icon}
      </div>
      <div className={message == null ? css.statusMessageHidden : css.statusMessage}>
        <div className={css.statusMessageArrow} ref={statusMessageArrowRef}>
          <ArrowIcon />
        </div>
        <div className={css.statusMessageText} ref={statusMessageRef}>
          {message}
        </div>
      </div>
    </>
  ) : null;

  return (
    <>
      {renderer(
        mergeClassNames(css.container, decorator ? css[decorator] : css.noDecorator, className),
        parseDecorator(decorator),
        children
      )}
    </>
  );
};

export const InputValidationMessageWithAction: FC<{
  children: ReactNode;
  buttonMessage: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}> = (props) => (
  <div className={mergeClassNames(css.messageWithAction, props.className)}>
    {props.children}
    <button
      className={css.messageWithActionAction}
      // Important, otherwise it will be triggered on form submit.
      type="button"
      onClick={props.onClick}
    >
      {props.buttonMessage}
    </button>
  </div>
);
