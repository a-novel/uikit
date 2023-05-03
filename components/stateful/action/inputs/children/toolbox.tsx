import css from "./toolbox.module.css";

import { FC, MouseEventHandler, ReactNode } from "react";

import { mergeClassNames } from "@lib";

export interface InputToolboxAction {
  id: string;
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  hide?: boolean;
}

export interface InputToolboxProps {
  actions: InputToolboxAction[];
}

export const InputToolbox: FC<InputToolboxProps> = ({ actions }) => {
  if (actions.length === 0) return null;

  return (
    <>
      {actions.map(({ id, icon, onClick, className, hide }) =>
        hide ? null : (
          <button type="button" key={id} className={mergeClassNames(css.toolboxAction, className)} onClick={onClick}>
            {icon}
          </button>
        )
      )}
    </>
  );
};
