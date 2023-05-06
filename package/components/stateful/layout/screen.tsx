import css from "./screen.module.css";

import { FC, HTMLAttributes, ReactNode, useContext } from "react";

import { StickyContext } from "@contexts";
import { mergeClassNames } from "@lib";

const ScreenFooter: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={mergeClassNames(css.footer, className)} {...props} />
);

export interface ScreenProps extends HTMLAttributes<HTMLDivElement> {
  center?: boolean;
  footer?: ReactNode;
}

export const Screen: FC<ScreenProps> = ({ className, center, style, children, footer, ...props }) => {
  const { vertical, horizontal } = useContext(StickyContext);

  return (
    <div
      className={mergeClassNames(css.container, center ? css.center : undefined, className)}
      style={{ minWidth: `calc(100vw - ${horizontal}px)`, minHeight: `calc(100vh - ${vertical}px)`, ...style }}
      {...props}
    >
      <div className={css.childWrapper}>{children}</div>
      {footer && <ScreenFooter>{footer}</ScreenFooter>}
    </div>
  );
};
