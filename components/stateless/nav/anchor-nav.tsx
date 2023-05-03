import css from "./anchor-nav.module.css";

import { FC } from "react";

export interface AnchorNavProps {
  params: Record<string, any>;
}

const mapParams = (params: Record<string, any>, source?: string) =>
  Object.entries(params).map(([key, value]) => {
    const anchor = source ? `${source}_${key}` : key;

    return typeof value === "string" ? (
      <li key={anchor} className={css.item}>
        <a href={`#${anchor}`}>{value}</a>
      </li>
    ) : (
      <ul key={anchor} className={css.subWrapper}>
        {mapParams(value, anchor)}
      </ul>
    );
  });

export const AnchorNav: FC<AnchorNavProps> = ({ params }) => <ul className={css.wrapper}>{mapParams(params)}</ul>;
