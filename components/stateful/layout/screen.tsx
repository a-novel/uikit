import css from "./screen.module.css";
import { FC, HTMLAttributes, useContext } from "react";
import { StickyContext } from "@contexts";
import { mergeClassNames } from "@lib";

export const Screen: FC<HTMLAttributes<HTMLDivElement>> = ({ className, style, ...props }) => {
  const { vertical, horizontal } = useContext(StickyContext);

  return (
    <div
      className={mergeClassNames(css.container, className)}
      style={{ width: `calc(100vw - ${horizontal}px)`, minHeight: `calc(100vh - ${vertical}px)`, ...style }}
      {...props}
    />
  );
};

export const ScreenFooter: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={mergeClassNames(css.footer, className)} {...props} />
);
