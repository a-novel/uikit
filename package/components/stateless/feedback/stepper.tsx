import css from "./stepper.module.css";

import checkLottie from "@public/lottie/text-input/check.json";
import loadingLottie from "@public/lottie/text-input/loading.json";

import { FC, HTMLAttributes, ReactNode } from "react";

import { Player } from "@lottiefiles/react-lottie-player";

import { mergeClassNames } from "@lib";

export type StepperStepStatus = "completed" | "active" | "available" | "locked";

export interface StepperStep {
  id: string;
  name: string;
  status: StepperStepStatus;
  icon: ReactNode;
  onClick?: () => void;
  /**
   * @uikit-only
   */
  hover?: boolean;
}

export interface StepperProps extends Omit<HTMLAttributes<HTMLUListElement>, "children"> {
  steps: StepperStep[];
  statusName: (status: StepperStepStatus) => string;
}

const StepperIcon: FC<{ icon: ReactNode; status: StepperStepStatus }> = ({ icon, status }) => {
  switch (status) {
    case "completed":
      return <Player autoplay keepLastFrame src={checkLottie} />;
    case "active":
      return <Player autoplay keepLastFrame src={loadingLottie} />;
    default:
      return <>{icon}</>;
  }
};

const StepperElement: FC<{ step: StepperStep; statusName: (status: StepperStepStatus) => string }> = ({
  step,
  statusName,
}) => (
  <>
    <div className={mergeClassNames(css.separator, css[step.status])} />
    <li
      className={mergeClassNames(
        css.step,
        step.onClick ? css.interactive : undefined,
        step.hover ? "hover" : undefined,
        css[step.status]
      )}
      onClick={step.onClick}
    >
      <div className={css.icon}>
        <StepperIcon icon={step.icon} status={step.status} />
      </div>
      <div className={css.content}>
        <div className={css.name}>{step.name}</div>
        <div className={css.status}>{statusName(step.status)}</div>
      </div>
    </li>
  </>
);

export const Stepper: FC<StepperProps> = ({ className, statusName, steps, ...props }) => (
  <ul className={mergeClassNames(css.container, className)} {...props}>
    {steps.map((step) => (
      <StepperElement key={step.id} step={step} statusName={statusName} />
    ))}
  </ul>
);
