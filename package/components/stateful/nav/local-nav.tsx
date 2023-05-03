import css from "./local-nav.module.css";

import LinkIcon from "@public/icons/monochrome/link.svg";

import { FC, HTMLAttributes } from "react";

import { H2 } from "../index";

import { captureException, mergeClassNames } from "@lib";

export interface TitleAnchorProps extends Omit<HTMLAttributes<HTMLHeadingElement>, "id"> {
  renderer?: "h1" | typeof H2 | "h3" | "h4" | "h5" | "h6";
  id: string;
}

export const TitleAnchor: FC<TitleAnchorProps> = ({ renderer: Renderer = "h1", id, children, className, ...props }) => (
  <Renderer id={id} className={mergeClassNames(css.titleAnchor, className)} {...props}>
    {children}
    <a
      href={`#${id}`}
      onClick={() =>
        navigator.clipboard
          .writeText(`${window.location.host}${window.location.pathname}#${id}`)
          .catch(captureException)
      }
      className={css.titleAnchorIcon}
    >
      <LinkIcon />
    </a>
  </Renderer>
);
