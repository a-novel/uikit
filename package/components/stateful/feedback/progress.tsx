import css from "./progress.module.css";

import { FC, HTMLAttributes, ReactNode, useCallback, useMemo } from "react";

import { Decorator, WithDecorator } from "@components/stateless";

import { mergeClassNames } from "@lib";

export interface ProgressStep {
  decorator: Decorator;
  value: number;
  label: ReactNode;
}

export interface ProgressProps extends HTMLAttributes<HTMLDivElement> {
  initialDecorator?: Decorator;
  value: number;
  total: number;
  /**
   * Allow to display a non-linear progress bar, to accommodate large values.
   * The output is the percentage value (in range 0-100) that should be used to display the progress.
   */
  progressCurve?: (value: number, total: number) => number;
  steps: ProgressStep[];
  label?: ReactNode;
  displayProgressValue?: boolean | ((value: number, total: number) => ReactNode);
}

export const ProgressCurveStopPoints = (points: [number, number][]) => {
  const sortedPoints = points.sort((a, b) => a[0] - b[0]);

  if (sortedPoints.some((_, i) => i > 0 && sortedPoints[i][1] <= sortedPoints[i - 1][1])) {
    throw new Error("B values must be strictly increasing.");
  }

  if (sortedPoints.some((p) => p[1] < 0 || p[1] > 100)) {
    throw new Error("B values must be in range 0-100.");
  }

  if (sortedPoints.some((p) => p[0] < 0)) {
    throw new Error("A values must be positive.");
  }

  if (sortedPoints.length < 1) {
    throw new Error("at least 1 points is required.");
  }

  return (value: number, total: number) => {
    // Find the previous stop point, if any.
    const start = sortedPoints.findLast((p) => p[0] <= value) || [0, 0];
    // Find the next stop point, if any.
    const end = sortedPoints.find((p) => p[0] > value) || [total, 100];

    // Compute the percentage of the value between the two stop points.
    const percentage = (value - start[0]) / (end[0] - start[0]);

    return start[1] + (end[1] - start[1]) * percentage;
  };
};

export const Progress: FC<ProgressProps> = ({
  initialDecorator,
  value,
  total,
  steps,
  label,
  displayProgressValue,
  className,
  progressCurve,
  ...props
}) => {
  const sortedSteps = useMemo(() => steps.sort((a, b) => a.value - b.value), [steps]);
  const lastActiveStep = useMemo(() => sortedSteps.findLast((step) => step.value <= value), [sortedSteps, value]);

  const getPercentage = useCallback(
    (value: number, total: number) => {
      if (progressCurve) {
        return progressCurve(value, total);
      }
      return (value / total) * 100;
    },
    [progressCurve]
  );

  return (
    <WithDecorator
      decorator={lastActiveStep?.decorator || initialDecorator || "standard"}
      render={(decoratorClassName) => (
        <div className={mergeClassNames(css.wrapper, decoratorClassName, className)} {...props}>
          {label ? <div className={css.label}>{label}</div> : null}
          <div className={css.progressBarWrapper}>
            <div className={css.progressBar} style={{ width: `${getPercentage(value, total)}%` }} />
            {sortedSteps.map((step) => (
              <div
                key={step.value}
                className={step.value > value ? css.step : css.stepActive}
                style={{ left: `${getPercentage(step.value, total)}%` }}
              >
                {step.label}
              </div>
            ))}
          </div>
          {displayProgressValue ? (
            <div className={css.progressValue}>
              {typeof displayProgressValue === "function" ? displayProgressValue(value, total) : `${value}/${total}`}
            </div>
          ) : null}
        </div>
      )}
    />
  );
};
