import { FC } from "react";
import { NavLabel, NavLink, NavLinkHome, NavZone } from "@components/stateless";
import logoButton from "@public/logo/logo-button.png";

export interface NavBarProps {
  pathname: string;
}

export const NavBar: FC<NavBarProps> = ({ pathname }) => (
  <>
    <NavZone>
      <NavLinkHome src={logoButton} href="/" alt="agora ui-kit logo" />
    </NavZone>
    <NavZone>
      <NavLabel>Action Components</NavLabel>
      <NavLink href="/actions/buttons" pathname={pathname}>
        Buttons
      </NavLink>
      <NavLink href="/actions/inputs" pathname={pathname}>
        Inputs
      </NavLink>
      <NavLink href="/actions/forms" pathname={pathname}>
        Forms
      </NavLink>
    </NavZone>
    <NavZone>
      <NavLabel>Navigation Components</NavLabel>
      <NavLink href="/nav/links" pathname={pathname}>
        Links
      </NavLink>
      <NavLink href="/nav/menus" pathname={pathname}>
        Menus
      </NavLink>
      <NavLink href="/nav/layouts" pathname={pathname}>
        Layouts
      </NavLink>
    </NavZone>
    <NavZone>
      <NavLabel>Layout Components</NavLabel>
      <NavLink href="/layouts/screen" pathname={pathname}>
        Screen
      </NavLink>
      <NavLink href="/layouts/modal" pathname={pathname}>
        Modal
      </NavLink>
      <NavLink href="/layouts/notifications" pathname={pathname}>
        Notifications
      </NavLink>
      <NavLink href="/layouts/status-pages" pathname={pathname}>
        Status Pages
      </NavLink>
    </NavZone>
  </>
);
