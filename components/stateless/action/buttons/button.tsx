import css from "./button.module.css";

import { ButtonHTMLAttributes, ComponentProps, FC, HTMLAttributes } from "react";

import Link from "next/link";

import { Decorator, WithDecorator } from "@components/stateless";

import { mergeClassNames } from "@lib";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  decorator?: Decorator;
}

export const Button: FC<ButtonProps> = ({ className, decorator, ...props }) => (
  <WithDecorator
    decorator={decorator || "standard"}
    render={(decoratorClassName) => (
      <button className={mergeClassNames(css.button, decoratorClassName, className)} {...props} />
    )}
  />
);

type ButtonSecondaryDefaultType = ComponentProps<"button"> & {
  type?: "button";
};

type ButtonSecondaryLinkType = ComponentProps<typeof Link> & {
  type: "link";
};

export type ButtonSecondaryType = ButtonSecondaryDefaultType | ButtonSecondaryLinkType;

export const ButtonSecondary = ({ type = "button", className, ...props }: ButtonSecondaryType) =>
  type === "link" ? (
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
