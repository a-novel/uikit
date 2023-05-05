import css from "./screen.module.css";

import { FC, HTMLAttributes, useContext } from "react";

import { StickyContext } from "@contexts";
import { mergeClassNames } from "@lib";

export interface ScreenProps extends HTMLAttributes<HTMLDivElement> {
  center?: boolean;
}

export const Screen: FC<ScreenProps> = ({ className, center, style, ...props }) => {
  const { vertical, horizontal } = useContext(StickyContext);

  return (
    <div
      className={mergeClassNames(css.container, center ? css.center : undefined, className)}
      style={{ width: `calc(100vw - ${horizontal}px)`, minHeight: `calc(100vh - ${vertical}px)`, ...style }}
      {...props}
    />
  );
};

export const ScreenFooter: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={mergeClassNames(css.footer, className)} {...props} />
);
