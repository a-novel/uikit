import css from "./basic.module.css";

import {
  FC,
  HTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { mergeClassNames } from "@lib";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Optional label, to display over the input.
   */
  label?: ReactNode;
  /**
   * Apply special styling to the input.
   */
  decorator?: "valid" | "warning" | "error";
  /**
   * Similar to onChange, but called only when the input is not modified for a certain amount of time. It avoids running
   * complex operations too often.
   */
  onStableChange?: (value: any) => void;
  children?: ReactNode;
  /**
   * Helper text displayed above the input.
   */
  helper?: ReactNode;
  /**
   * Prevent input from being applied styles on focus.
   */
  noFocusStyle?: boolean;
  containerProps?: Omit<HTMLAttributes<HTMLDivElement>, "className">;
}

/**
 * Generic text-like input component. Suitable for any input that can be represented as a text/numeric field.
 */
export const InputBasic: FC<InputProps> = ({
  value,
  label,
  decorator,
  onChange,
  onStableChange,
  className,
  children,
  helper,
  noFocusStyle,
  disabled,
  containerProps,
  ...props
}) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const [typing, setTyping] = useState(false);

  // Run the onStableChange callback if user is not typing anymore.
  useEffect(() => {
    if (!typing) onStableChange?.(value);
  }, [onStableChange, value, typing]);

  return (
    <div className={css.wrapper}>
      {helper && <label className={css.helper}>{helper}</label>}
      <div
        className={mergeClassNames(
          css.container,
          decorator ? css[decorator] : css.default,
          disabled ? css.disabled : undefined,
          noFocusStyle ? css.unfocusable : undefined,
          className
        )}
        {...containerProps}
      >
        <input
          className={css.input}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            // Update the typing status.
            if (timer.current != null) {
              clearTimeout(timer.current);
            }
            setTyping(true);

            // Typing is automatically set to false, once user has not typed anything for a certain amount of time.
            timer.current = setTimeout(() => {
              setTyping(false);
            }, 500);

            onChange?.(e);
          }}
          {...props}
        />
        {label && <label className={css.label}>{label}</label>}
        {children && <div className={css.children}>{children}</div>}
      </div>
    </div>
  );
};

export interface CustomInputProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  /**
   * Optional label, to display over the input.
   */
  label?: ReactNode;
  /**
   * Apply special styling to the input.
   */
  decorator?: "valid" | "warning" | "error";
  disabled?: boolean;
  name?: string;
  required?: boolean;
  placeholder?: string;
  /**
   * Helper text displayed above the input.
   */
  helper?: ReactNode;
}

export interface TextAreaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "rows" | "cols"> {
  /**
   * Optional label, to display over the input.
   */
  label?: ReactNode;
  value: string;
  /**
   * Apply special styling to the input.
   */
  decorator?: "valid" | "warning" | "error";
  /**
   * Similar to onChange, but called only when the input is not modified for a certain amount of time. It avoids running
   * complex operations too often.
   */
  onStableChange?: (value: any) => void;
  children?: ReactNode;
  /**
   * Helper text displayed above the input.
   */
  helper?: ReactNode;
}

/**
 * Generic textarea input. Mirrors the functionalities and style of {@link InputBasic}, for the textarea component.
 *
 * This component also automatically adjusts its height to fit its content. You can specify min/max height using the
 * style property, or custom classNames.
 */
export const TextArea: FC<TextAreaProps> = ({
  value,
  label,
  decorator,
  onChange,
  onStableChange,
  className,
  children,
  helper,
  disabled,
  ...props
}) => {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const elementRef = useRef<HTMLTextAreaElement>(null);

  const callStableChange = useCallback(() => {
    // Reset the timer on each call, until the input is not modified for a certain amount of time.
    if (timer.current != null) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      onStableChange?.(value);
    }, 500);
  }, [onStableChange, value]);

  useEffect(() => {
    if (elementRef.current == null) return;

    elementRef.current.style.height = "0";
    elementRef.current.style.height = `${elementRef.current.scrollHeight}px`;
  }, [elementRef.current?.scrollHeight]);

  return (
    <div className={css.wrapper}>
      {helper && <label className={css.helper}>{helper}</label>}
      <div
        className={mergeClassNames(
          css.container,
          css.textAreaContainer,
          decorator ? css[decorator] : css.default,
          disabled ? css.disabled : undefined,
          className
        )}
      >
        <textarea
          ref={elementRef}
          className={css.input}
          value={value}
          disabled={disabled}
          onChange={(e) => {
            onChange?.(e);
            callStableChange();
          }}
          {...props}
        />
        {label && <label className={css.label}>{label}</label>}
        {children && <div className={css.children}>{children}</div>}
      </div>
    </div>
  );
};
