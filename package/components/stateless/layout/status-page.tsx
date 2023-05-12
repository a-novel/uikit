import css from "./status-page.module.css";

import { ReactNode } from "react";

import { Decorator, WithDecorator } from "../index";

import { mergeClassNames } from "@lib";

export interface StatusPageProps {
  title?: ReactNode;
  content?: ReactNode;
  decorator: Decorator;
  icon?: ReactNode;
  relative?: boolean;
  center?: boolean;
}

export const StatusPage = ({ title, content, decorator, icon, relative, center }: StatusPageProps) => (
  <WithDecorator
    decorator={decorator}
    render={(className) => (
      <div className={mergeClassNames(css.statusPage, relative ? css.relative : undefined, className)}>
        {icon && <div className={css.icon}>{icon}</div>}
        {title && <h1 className={css.title}>{title}</h1>}
        {content && (
          <div className={css.content} style={{ textAlign: center ? "center" : undefined }}>
            {content}
          </div>
        )}
      </div>
    )}
  />
);
