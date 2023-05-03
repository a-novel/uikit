import css from "./nav-bar.module.css";

import { ButtonHTMLAttributes, ComponentProps, DetailedHTMLProps, FC, HTMLAttributes, forwardRef } from "react";

import Image from "next/image";
import Link from "next/link";

import { Decorator, WithDecorator } from "../index";

import { mergeClassNames } from "@lib";

export type ReactURL = ComponentProps<typeof Link>["href"];

/**
 * Add a static label. Compatible with vertical navigation only.
 */
export const NavLabel: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={mergeClassNames(css.navLabel, className)} {...props}>
    {children}
  </div>
);

export interface NavLinkHomeProps extends ComponentProps<typeof Link> {
  /**
   * The home link image.
   */
  src: ComponentProps<typeof Image>["src"];
  /**
   * The alt attribute of the image.
   */
  alt: string;
}

/**
 * Displays the home navigation link. Unlike standard links, home link has no "active" state. It is used to
 * bring back a user to the default page of the application.
 */
export const NavLinkHome: FC<NavLinkHomeProps> = ({ src, alt, className, ...props }) => (
  <li className={mergeClassNames(css.homeLink, className)}>
    <Link {...props}>
      <Image src={src} alt={alt} />
    </Link>
  </li>
);

export interface NavLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  /**
   * The href attribute of the link.
   */
  href: ReactURL;
  /**
   * Prevent user from using the link.
   */
  disabled?: boolean;
  /**
   * The current pathname, should be retrieved with {@link import('next/navigation').usePathname|usePathname}.
   * This value is used to check whether the link is active or not, while allowing it to remain a static server
   * component.
   * The link is considered active if the current pathname starts with the link's href (any child route). This
   * behavior can be changed by setting {@link strict} to true.
   */
  pathname: string;
  /**
   * The class name to apply when the link is active.
   */
  activeClassName?: string;
  /**
   * When strict mode is activated, the current link is only considered active if both {@link href} and
   * {@link pathname} are strictly equal.
   */
  strict?: boolean;
  /**
   * Use a custom decorator for the link.
   */
  decorator?: Decorator;
  /**
   * The default type for a navigation link. It can be set to "button" to render a button instead of a link.
   */
  type?: "link";
}

export type NavButtonProps = {
  /**
   * Use a custom decorator for the button.
   */
  decorator?: Decorator;
  /**
   * Create a navigation button. The aspect is similar to a navigation link, however it can be used to perform more
   * complex actions, or actions that do not imply an immediate redirection.
   */
  type: "button";
} & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

const isNavButtonProps = (props: NavLinkProps | NavButtonProps): props is NavButtonProps => props.type === "button";

const isLinkActive = (pathname: string, href?: ReactURL, strict?: boolean) => {
  if (!href) {
    return false;
  }

  // Href can be a full object, as it is a property of next Link.
  let strHREF = typeof href === "string" ? href : href.pathname;

  if (!strHREF) {
    return false;
  }

  if (strict) {
    return pathname === strHREF;
  }

  // Ensure both value have a trailing slash, to avoid false positive
  // (for example, /foo and /foo-bar should not match).
  if (!strHREF.endsWith("/")) strHREF += "/";
  if (!pathname.endsWith("/")) pathname += "/";

  return pathname.startsWith(strHREF);
};

/**
 * The standard Link component. It wraps Next/Link while adding some features. A list of said features can be found
 * by looking at {@link NavLinkProps} and {@link NavButtonProps}. It also supports a-novel {@link Decorator}.
 */
export const NavLink: FC<NavLinkProps | NavButtonProps> = ({ children, className, decorator, ...props }) => {
  // When link is disabled, being either a standard or button link, we don't have to return an active component under
  // the hood. A generic span for both will be enough.
  if (props.disabled) {
    return (
      <li className={mergeClassNames(css.navLink, css.disabled, className)}>
        <span>{children}</span>
      </li>
    );
  }

  if (isNavButtonProps(props)) {
    return (
      <WithDecorator
        decorator={decorator}
        render={(decoratorClassName) => (
          <li className={mergeClassNames(css.navLink, decoratorClassName, className)}>
            <button {...props}>{children}</button>
          </li>
        )}
      />
    );
  }

  const { href, activeClassName, strict, pathname, ...rest } = props as NavLinkProps;

  const active = isLinkActive(pathname, href, strict);
  return (
    <WithDecorator
      decorator={decorator}
      render={(decoratorClassName) => (
        <li
          className={mergeClassNames(
            css.navLink,
            decoratorClassName,
            active ? css.active : undefined,
            active ? activeClassName : undefined,
            className
          )}
        >
          <Link href={href as ReactURL} {...rest}>
            {children}
          </Link>
        </li>
      )}
    />
  );
};

/**
 * NavZone groups links together.
 */
export const NavZone: FC<HTMLAttributes<HTMLUListElement>> = ({ children, className }) => (
  <ul className={mergeClassNames(css.navZone, className)}>{children}</ul>
);

export interface NavProps extends HTMLAttributes<HTMLElement> {
  /**
   * Toggles the orientation of the navigation bar. Default is "horizontal".
   */
  mode?: "horizontal" | "vertical";
  /**
   * Mark this bar as the main nav bar, with a higher z-index to remain accessible. Only one main nav bar should be
   * present in a page, preferably at the highest level possible.
   */
  main?: boolean;
}

/**
 * The nav bar container.
 */
export const Nav = forwardRef<HTMLElement, NavProps>(function Nav({ children, className, mode, main, ...props }, ref) {
  return (
    <nav
      ref={ref}
      className={mergeClassNames(css.navBar, main ? css.main : undefined, css[mode || "horizontal"], className)}
      {...props}
    >
      {children}
    </nav>
  );
});
