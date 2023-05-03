import "client-only";

import css from "./nav-bar.module.css";

import { FC, HTMLAttributes, ReactNode, useMemo, useRef, useState } from "react";

import { Nav } from "@components/stateless";

import { WithSticky } from "@contexts";
import { useFloatingMenu } from "@hooks";
import { mergeClassNames } from "@lib";

export interface NavWrapperProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Toggles the orientation of the navigation. Default is "horizontal".
   *
   * Note this refers to the orientation of the navigation bar, not the alignment of the wrapper.
   */
  mode?: "horizontal" | "vertical";
  /**
   * Must be a {@link Nav} component.
   */
  navComponent: ReactNode;
  /**
   * Sets the {@link NavProps.main} property.
   */
  main?: boolean;
}

/**
 * Wraps together a navigation bar and its content, with proper alignment.
 */
export const NavWrapper: FC<NavWrapperProps> = ({ children, navComponent, className, mode, main, ...props }) => {
  // Sticky mode is based on alignment, not orientation. If the nav bar is, for example, horizontal, then elements
  // will stick under it, so it will be a vertical alignment.
  const stickyMode = useMemo(() => (mode === "vertical" ? "horizontal" : "vertical"), [mode]);

  return (
    <WithSticky
      mode={stickyMode}
      render={(ref, style) => (
        <div
          className={mergeClassNames(css.navWrapper, main ? css.main : undefined, css[mode || "horizontal"], className)}
          {...props}
        >
          <Nav main={main} mode={mode} ref={ref} style={style}>
            {navComponent}
          </Nav>
          <div className={css.navWrapperContent}>{children}</div>
        </div>
      )}
    />
  );
};

export interface DropMenuProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * The icon to display for the drop menu.
   */
  icon: ReactNode;
  /**
   * Prevent the menu from being opened.
   */
  disabled?: boolean;
  /**
   * Forces the initial state of the menu (opened=true, closed=false).
   */
  initialState?: boolean;
  /**
   * Adjustments for UI-Kit display.
   */
  uikit?: boolean;
}

export const DropMenu: FC<DropMenuProps> = ({ icon, disabled, uikit, children, initialState, className, ...props }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(initialState ?? false);

  useFloatingMenu({ ref: menuRef, opened: open, disable: uikit, close: () => setOpen(false) });

  return (
    <div
      className={mergeClassNames(
        css.dropMenu,
        open ? css.active : undefined,
        disabled ? css.disabled : undefined,
        className
      )}
      {...props}
    >
      <button onClick={() => setOpen((prevState) => !prevState)} className={css.dropMenuButton}>
        {icon}
      </button>
      <div ref={menuRef} className={css.dropMenuContent}>
        {children}
      </div>
    </div>
  );
};

export const DropMenuActions: FC<HTMLAttributes<HTMLUListElement>> = ({ className, ...props }) => (
  <ul className={mergeClassNames(css.dropMenuActions, className)} {...props} />
);
