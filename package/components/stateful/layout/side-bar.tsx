import css from "./side-bar.module.css";

import { FC, HTMLAttributes, useContext } from "react";

import { StickyContext } from "@contexts";
import { mergeClassNames } from "@lib";

export const SideBar: FC<HTMLAttributes<HTMLDivElement>> = ({ className, style, ...props }) => {
  const { vertical, horizontal } = useContext(StickyContext);

  return (
    <div
      className={mergeClassNames(css.container, className)}
      style={{ top: vertical, left: horizontal, height: `calc(100vh - ${vertical}px)`, ...style }}
      {...props}
    />
  );
};
