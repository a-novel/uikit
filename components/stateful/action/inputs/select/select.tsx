import css from "./select.module.css";

import CloseIcon from "@public/icons/monochrome/close.svg";
import ExpandIcon from "@public/icons/monochrome/expand.svg";

import { ReactElement, ReactNode, useRef, useState } from "react";

import { CustomInputProps, InputBasic, InputToolbox } from "@components/stateful";

import { useFloatingMenu } from "@hooks";
import { mergeClassNames } from "@lib";

export interface SelectValue<V extends string | number> {
  value: V;
  /**
   * Optional component to render instead of the raw value.
   */
  render?: ReactNode;
}

const isSelectValue = <V extends string | number>(value: any): value is SelectValue<V> =>
  value != null && typeof value === "object" && "value" in value;

export interface SelectInputProps<V extends string | number> extends CustomInputProps {
  values: (SelectValue<V> | V)[];
  value?: V;
  render?: (value?: V) => string;
  onChange?: (value?: V) => void;
  /**
   * Limit the height of the displayed list of elements. Overflow will be scrollable.
   */
  maxListHeight?: string;
  /**
   * @uikit-only
   */
  uikit?: boolean;
  /**
   * @uikit-only
   */
  startOpen?: boolean;
  /**
   * @uikit-only
   */
  hoverValue?: V;
}

export function SelectInput<V extends string | number>({
  value,
  values,
  onChange,
  required,
  className,
  children,
  uikit,
  startOpen,
  disabled,
  hoverValue,
  render,
  maxListHeight,
  ...props
}: SelectInputProps<V>): ReactElement<any, any> {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(startOpen ?? false);

  useFloatingMenu({ ref: modalRef, opened: modalOpen, disable: uikit, close: () => setModalOpen(false) });

  return (
    <InputBasic
      readOnly
      noFocusStyle
      type="text"
      disabled={disabled}
      required={required}
      value={render ? render(value) : value}
      className={mergeClassNames(
        css.container,
        modalOpen ? "focus-within" : undefined,
        disabled ? css.disabled : undefined,
        className
      )}
      // This event is already attached to the input only, so it will not conflict with the toolbox actions.
      onClick={() => setModalOpen(!modalOpen)}
      {...props}
    >
      <div ref={modalRef} className={css.selectOptions}>
        <ul style={{ maxHeight: maxListHeight }}>
          {values.map((item) => {
            let render: ReactNode | undefined;
            let rowValue: V;

            if (isSelectValue(item)) {
              render = item.render;
              rowValue = item.value;
            } else {
              rowValue = item;
            }

            return (
              <li
                onClick={() => {
                  onChange?.(rowValue);
                }}
                key={rowValue}
                className={mergeClassNames(
                  css.selectOption,
                  value === rowValue ? css.selected : undefined,
                  rowValue === hoverValue ? "hover" : undefined
                )}
              >
                {render ?? <span className="select-value">{rowValue}</span>}
              </li>
            );
          })}
        </ul>
      </div>
      <InputToolbox
        actions={[
          {
            id: "clearSelection",
            icon: <CloseIcon />,
            onClick: () => onChange?.(),
            hide: required || value == null || disabled,
          },
          {
            id: "toggleSelection",
            icon: <ExpandIcon className={css.expandIcon} />,
            onClick: () => setModalOpen(!modalOpen),
          },
        ]}
      />
      {children}
    </InputBasic>
  );
}

export interface SelectItemWithIconProps<V extends string | number> {
  icon: ReactNode;
  value: V;
}

export function SelectItemWithIcon<V extends string | number>({
  icon,
  value,
}: SelectItemWithIconProps<V>): ReactElement<any, any> {
  return (
    <>
      <span className="select-value">{value}</span>
      <span className={css.itemIcon}>{icon}</span>
    </>
  );
}
