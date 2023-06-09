import css from "./skeleton.module.css";

import errorLottie from "@public/lottie/skeletons/error.json";
import forbiddenLottie from "@public/lottie/skeletons/forbidden.json";
import loaderLottie from "@public/lottie/skeletons/loader.json";
import notFoundLottie from "@public/lottie/skeletons/not-found.json";

import { FC, HTMLAttributes, ReactNode } from "react";

import { StatusPage } from "@components/stateless";
import { Player } from "@lottiefiles/react-lottie-player";

import { mergeClassNames } from "@lib";

export const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={mergeClassNames(css.skeleton, className)} {...props} />
);

export interface LoaderProps {
  children?: ReactNode;
  loading: boolean;
  message?: string;
}

export const WithLoader: FC<LoaderProps> = ({ children, loading, message }) =>
  loading ? (
    <StatusPage
      center
      relative
      decorator="danger"
      content={message}
      icon={<Player autoplay loop src={loaderLottie} />}
    />
  ) : (
    <>{children}</>
  );

export interface NotFoundProps {
  title?: ReactNode;
  content?: ReactNode;
  icon?: ReactNode;
}

export const NotFound: FC<NotFoundProps> = ({ content, title, icon }) => (
  <StatusPage
    center
    relative
    decorator="danger"
    title={title}
    content={content}
    icon={icon ?? <Player autoplay loop src={notFoundLottie} />}
  />
);

export interface InternalErrorProps {
  title?: ReactNode;
  content?: ReactNode;
  icon?: ReactNode;
}

export const InternalError: FC<InternalErrorProps> = ({ content, title, icon }) => (
  <StatusPage
    center
    relative
    decorator="danger"
    title={title}
    content={content}
    icon={icon ?? <Player autoplay loop src={errorLottie} />}
  />
);

export interface ForbiddenAccessProps {
  title?: ReactNode;
  content?: ReactNode;
  icon?: ReactNode;
}

export const ForbiddenAccess: FC<ForbiddenAccessProps> = ({ content, title, icon }) => (
  <StatusPage
    center
    relative
    decorator="danger"
    title={title}
    content={content}
    icon={icon ?? <Player autoplay loop src={forbiddenLottie} />}
  />
);
