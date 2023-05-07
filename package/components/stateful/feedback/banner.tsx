import css from "./banner.module.css";

import { FC, HTMLAttributes, LegacyRef, ReactNode } from "react";

import { Decorator, WithDecorator } from "@components/stateless";

import { WithSticky } from "@contexts";
import { mergeClassNames } from "@lib";

export interface BannerContent {
  decorator: Decorator;
  content: ReactNode;
}

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  content: BannerContent[];
}

const RenderBanners: FC<{ content: BannerContent[] }> = ({ content }) => (
  <>
    {content &&
      content.map(({ decorator, content }, index) => (
        <WithDecorator
          decorator={decorator}
          key={index}
          render={(decoratorClassName) => (
            <div className={mergeClassNames(css.container, decoratorClassName)}>{content}</div>
          )}
        />
      ))}
  </>
);

export const Banner: FC<BannerProps> = ({ children, content, className, style, ...props }) => (
  <WithSticky
    mode="vertical"
    render={(ref, stickyStyle) => (
      <>
        <div
          ref={ref as LegacyRef<HTMLDivElement>}
          className={mergeClassNames(css.wrapper)}
          style={{ ...stickyStyle, ...style }}
          {...props}
        >
          <RenderBanners content={content} />
        </div>
        {children}
      </>
    )}
  />
);
