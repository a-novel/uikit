import css from "./status-page.module.css";

import { ReactNode } from "react";

import { Decorator, WithDecorator } from "@components/stateless";

import { mergeClassNames } from "@lib";

export interface StatusPageProps {
  title: ReactNode;
  content: ReactNode;
  decorator: Decorator;
  icon?: ReactNode;
}

export const StatusPage = ({ title, content, decorator, icon }: StatusPageProps) => (
  <WithDecorator
    decorator={decorator}
    render={(className) => (
      <div className={mergeClassNames(css.statusPage, className)}>
        {icon && <div className={css.icon}>{icon}</div>}
        <h1 className={css.title}>{title}</h1>
        <div className={css.content}>{content}</div>
      </div>
    )}
  />
);
