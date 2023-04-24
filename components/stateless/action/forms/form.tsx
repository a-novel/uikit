import css from "./form.module.css";
import { FC, HTMLAttributes } from "react";
import { mergeClassNames } from "@lib";
import CloseIcon from "@public/icons/monochrome/close.svg";
import { Decorator, WithDecorator } from "@components/stateless";

export interface FormAttributes extends HTMLAttributes<HTMLFormElement> {
  mode?: "standard" | "large" | "dynamic";
}

export const Form: FC<FormAttributes> = ({ className, mode = "standard", ...props }) => (
  <form className={mergeClassNames(css.container, css[mode], className)} {...props} />
);

export const FormRow: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={mergeClassNames(css.row, className)} {...props} />
);

export interface FormInfoBoxProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
  decorator: Decorator;
}

export const FormInfoBox: FC<FormInfoBoxProps> = ({ className, children, decorator, onClose, ...props }) => (
  <WithDecorator
    decorator={decorator}
    render={(decoratorClassName) => (
      <div className={mergeClassNames(css.formInfo, decoratorClassName, className)} {...props}>
        <span className={css.formInfoContent}>{children}</span>
        {onClose && (
          <button className={css.formInfoClose} onClick={onClose}>
            <CloseIcon />
          </button>
        )}
      </div>
    )}
  />
);
