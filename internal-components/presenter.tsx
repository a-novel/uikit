import css from "./presenter.module.css";

import { FC, HTMLAttributes, ReactNode, RefObject } from "react";

import { ResizableBlock } from "@components/stateful";

import { mergeClassNames } from "@lib";

export const Presenter: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={mergeClassNames(css.presenter, className)} {...props} />
);

export interface ResizablePresenterProps extends HTMLAttributes<HTMLDivElement> {
  inline?: boolean;
}

export const ResizablePresenter: FC<ResizablePresenterProps> = ({ children, inline }) => (
  <div className={mergeClassNames(css.resizablePresenter, inline ? css.inline : undefined)}>{children}</div>
);

export const IframePresenter: FC<HTMLAttributes<HTMLDivElement>> = ({ children }) => (
  <div className={css.iframePresenter}>{children}</div>
);

export interface PresenterBoxProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const PresenterBox: FC<PresenterBoxProps> = ({ children, title, className, ...props }) => (
  <div className={mergeClassNames(css.presenterBox, className)} {...props}>
    <h5>{title}</h5>
    <div>{children}</div>
  </div>
);

export interface IFramePresenterBoxProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  src: string;
  title: string;
}

export const IFramePresenterBox: FC<IFramePresenterBoxProps> = ({ src, title, className, ...props }) => (
  <div className={mergeClassNames(css.iframePresenter, className)} {...props}>
    <h5>{title}</h5>
    <iframe width={1080} height={720} loading="eager" className={css.iframePresenterBox} src={src} />
  </div>
);

export interface WithFoamProps {
  children: ReactNode;
  display: "vertical" | "horizontal";
  fill?: "begin" | "end" | "both";
}

export const WithFoam: FC<WithFoamProps> = ({ children, display, fill }) => (
  <div className={mergeClassNames(css.foam, css[display])}>
    {fill !== "end" && <div className={css.foamBox} />}
    {children}
    {fill !== "begin" && <div className={css.foamBox} />}
  </div>
);

export interface ResizablePresenterBoxProps extends PresenterBoxProps {
  minWidth?: string;
  maxWidth?: string;
  minHeight?: string;
  maxHeight?: string;
  width?: string;
  height?: string;
  withFoam?: "vertical" | "horizontal";
  fillFoam?: "begin" | "end" | "both";
  scrollBoxRef?: RefObject<HTMLDivElement>;
}

export const ResizablePresenterBox: FC<ResizablePresenterBoxProps> = ({
  children,
  title,
  minHeight,
  maxWidth,
  minWidth,
  maxHeight,
  height,
  width,
  withFoam,
  fillFoam,
  scrollBoxRef,
}) => (
  <div className={css.presenterBox}>
    <h5>{title}</h5>
    <ResizableBlock
      ref={scrollBoxRef}
      className={mergeClassNames(css.resizablePresenterBox, withFoam && css[withFoam])}
      style={{ minHeight, minWidth, maxHeight, maxWidth, height, width }}
    >
      {withFoam ? (
        <WithFoam fill={fillFoam} display={withFoam}>
          {children}
        </WithFoam>
      ) : (
        children
      )}
    </ResizableBlock>
  </div>
);
