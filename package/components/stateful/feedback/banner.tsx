import css from "./banner.module.css";

import { FC, HTMLAttributes, LegacyRef, ReactNode } from "react";

import { Decorator, WithDecorator } from "@components/stateless";

import { WithSticky } from "@contexts";
import { mergeClassNames } from "@lib";

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  decorator: Decorator;
  content?: ReactNode;
}

export const Banner: FC<BannerProps> = ({ children, decorator, className, content, style, ...props }) =>
  content ? (
    <WithSticky
      mode="vertical"
      render={(ref, stickyStyle) => (
        <>
          <WithDecorator
            decorator={decorator}
            render={(decoratorClassName) => (
              <div
                ref={ref as LegacyRef<HTMLDivElement>}
                className={mergeClassNames(css.container, decoratorClassName, className)}
                style={{ ...stickyStyle, ...style }}
                {...props}
              >
                {content}
              </div>
            )}
          />
          {children}
        </>
      )}
    />
  ) : (
    <>children</>
  );
