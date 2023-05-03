import css from "./skeleton.module.css";

import skeletonDefault from "@public/lottie/skeletons/skeleton-default.json";

import { FC, HTMLAttributes } from "react";

import { Player } from "@lottiefiles/react-lottie-player";

import { mergeClassNames } from "@lib";

export const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <Player
    autoplay
    loop
    src={JSON.stringify(skeletonDefault)}
    className={mergeClassNames(css.skeleton, className)}
    {...props}
  />
);
