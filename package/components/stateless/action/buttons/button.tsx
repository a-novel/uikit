import css from "./button.module.css";

import { ComponentProps, FC, HTMLAttributes } from "react";

import Link from "next/link";

import { Decorator, WithDecorator } from "../../index";

import { mergeClassNames } from "@lib";

type ButtonDefaultType = ComponentProps<"button"> & {
  mode?: "button";
};

type ButtonLinkType = ComponentProps<typeof Link> & {
  disabled?: boolean;
  mode: "link";
};

export type ButtonType = (ButtonDefaultType | ButtonLinkType) & {
  decorator?: Decorator;
};

export const Button: FC<ButtonType> = ({ mode = "button", className, disabled, decorator, ...props }) => (
  <WithDecorator
    decorator={decorator || "standard"}
    render={(decoratorClassName) =>
      mode === "link" ? (
        <Link
          className={mergeClassNames(css.button, disabled ? "disabled" : undefined, decoratorClassName, className)}
          {...(props as ComponentProps<typeof Link>)}
        />
      ) : (
        <button
          className={mergeClassNames(css.button, decoratorClassName, className)}
          disabled={disabled}
          {...(props as ComponentProps<"button">)}
        />
      )
    }
  />
);

type ButtonSecondaryDefaultType = ComponentProps<"button"> & {
  mode?: "button";
};

type ButtonSecondaryLinkType = ComponentProps<typeof Link> & {
  mode: "link";
};

export type ButtonSecondaryType = ButtonSecondaryDefaultType | ButtonSecondaryLinkType;

export const ButtonSecondary: FC<ButtonSecondaryType> = ({ mode = "button", className, ...props }) =>
  mode === "link" ? (
    <Link className={mergeClassNames(css.buttonSecondary, className)} {...(props as ComponentProps<typeof Link>)} />
  ) : (
    <button className={mergeClassNames(css.buttonSecondary, className)} {...(props as ComponentProps<"button">)} />
  );

export const ButtonZone: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={mergeClassNames(css.buttonZone, className)} {...props} />
);

export interface ButtonSecondaryZoneProps extends HTMLAttributes<HTMLDivElement> {
  align?: "left" | "right" | "center";
}

export const ButtonSecondaryZone: FC<ButtonSecondaryZoneProps> = ({ className, align = "left", ...props }) => (
  <div className={mergeClassNames(css.buttonSecondaryZone, css[align], className)} {...props} />
);
