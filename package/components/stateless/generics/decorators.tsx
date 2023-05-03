import css from "./decorators.module.css";

import { FC, ReactNode } from "react";

import { mergeClassNames } from "@lib";

/**
 * Decorator specify some styling rules depending on its value.
 */
export type Decorator = "standard" | "important" | "premium" | "warning" | "danger";

export interface DecoratorProps {
  /**
   * Decorator specify some styling rules depending on its value.
   */
  decorator?: Decorator;
  /**
   * Render the component with a specific className, depending on the {@link decorator} value.
   */
  render: (className: string) => ReactNode;
}

/**
 * Call a render method with specific styling rules.
 *
 * When rendered with a decorator, the component will have access to the following:
 *  - a global className, depending on the decorator: "decorator" when a decorator is set, or "no-decorator" otherwise.
 *    This can be used to apply different rules if no decorator is given.
 *  - CSS variables, which values depend on the decorator:
 *
 * Available css variables are:
 *  - "--decorator-main": the main color for the current decorator.
 *  - "--decorator-secondary": the secondary color for the current decorator.
 *  - "--decorator-tertiary": the tertiary color for the current decorator.
 *  - "--decorator-dark": a darker shade of the current decorator color.
 *
 * @example
 * import { WithDecorator } from "@anovel/uikit/components/stateless";
 *
 * const Component = () => (
 *  <WithDecorator
 *    decorator="standard"
 *    render={className => <ChildComponent className={className} />}
 *  />
 * );
 */
export const WithDecorator: FC<DecoratorProps> = ({ decorator, render }) => (
  <>{render(decorator != null ? mergeClassNames("decorator", css[decorator]) : "no-decorator")}</>
);
