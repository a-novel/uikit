import css from "./feed-renderers.module.css";

import { FC, ReactNode } from "react";

import { InfiniteFeedElementProps } from "@components/stateful";

export interface InlineFeedElementProps<R> extends InfiniteFeedElementProps<R> {}

export interface InlineFeedRendererProps<R> {
  values: InfiniteFeedElementProps<R>[];
  render: FC<InlineFeedElementProps<R>>;
}

export function InlineFeedRenderer<R extends {}>({ values, render: Render }: InlineFeedRendererProps<R>) {
  return (
    <div className={css.inlineWrapper}>
      {values.map((props) => (
        <Render key={props.id} {...props} />
      ))}
    </div>
  );
}

export const StaticInlineFeedRenderer: FC<{ children: ReactNode }> = ({ children }) => (
  <div className={css.inlineWrapper}>{children}</div>
);

export interface GridFeedElementProps<R> extends InfiniteFeedElementProps<R> {}

export interface GridFeedRendererProps<R> {
  values: InfiniteFeedElementProps<R>[];
  render: FC<GridFeedElementProps<R>>;
  columns: number;
  columnsGap: string;
  columnSize: string;
}

export function GridFeedRenderer<R extends {}>({
  values,
  render: Render,
  columns,
  columnSize,
  columnsGap,
}: GridFeedRendererProps<R>) {
  return (
    <div
      style={{
        // Width of columns plus width of gaps between columns.
        maxWidth: `calc((${columns} * ${columnSize}) + (${columns - 1} * ${columnsGap}))`,
        gap: columnsGap,
        gridTemplateColumns: `repeat(auto-fit, ${columnSize})`,
      }}
      className={css.gridWrapper}
    >
      {values.map((props) => (
        <Render key={props.id} {...props} />
      ))}
    </div>
  );
}

export interface StaticGridFeedRendererProps {
  columns: number;
  columnsGap: string;
  columnSize: string;
  children: ReactNode;
}

export function StaticGridFeedRenderer({ children, columns, columnSize, columnsGap }: StaticGridFeedRendererProps) {
  return (
    <div
      style={{
        // Width of columns plus width of gaps between columns.
        maxWidth: `calc((${columns} * ${columnSize}) + (${columns - 1} * ${columnsGap}))`,
        gap: columnsGap,
        gridTemplateColumns: `repeat(auto-fit, ${columnSize})`,
      }}
      className={css.gridWrapper}
    >
      {children}
    </div>
  );
}
