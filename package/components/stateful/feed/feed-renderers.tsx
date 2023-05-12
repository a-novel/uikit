import css from "./feed-renderers.module.css";

import { FC, ReactNode } from "react";

import { InfiniteFeedElementProps } from "@components/stateful";

export interface InlineFeedElementProps<R> extends InfiniteFeedElementProps<R> {
  className: string;
}

export interface InlineFeedRendererProps<R> {
  values: InfiniteFeedElementProps<R>[];
  render: FC<InlineFeedElementProps<R>>;
}

export function InlineFeedRenderer<R extends {}>({ values, render: Render }: InlineFeedRendererProps<R>) {
  return (
    <>
      {values.map((props) => (
        <Render key={props.id} className={css.inlineFeedRenderer} {...props} />
      ))}
    </>
  );
}
