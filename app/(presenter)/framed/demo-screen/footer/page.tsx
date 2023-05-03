"use client";

import MoreIcon from "@public/icons/monochrome/more-horizontal.svg";
import logoButton from "@public/uikit/logo/logo-button.png";

import { useState } from "react";

import { DropMenu, DropMenuActions, NavWrapper, Screen, ScreenFooter } from "@components/stateful";
import { NavLink, NavLinkHome, NavZone, UserProfileLink } from "@components/stateless";

const Page = () => {
  const [active, setActive] = useState("/");

  const NavComponent = (
    <>
      <NavZone>
        <NavLinkHome
          src={logoButton}
          alt="logo button"
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setActive("/");
          }}
        />
        <NavLink type="button" className={active === "/foo" ? "active" : undefined} onClick={() => setActive("/foo")}>
          Page 1
        </NavLink>
        <NavLink type="button" className={active === "/bar" ? "active" : undefined} onClick={() => setActive("/bar")}>
          Page 2
        </NavLink>
        <NavLink type="button" className={active === "/qux" ? "active" : undefined} onClick={() => setActive("/qux")}>
          Page 3
        </NavLink>
      </NavZone>
      <NavZone>
        <NavLink
          type="button"
          decorator="premium"
          className={active === "/premium" ? "active" : undefined}
          onClick={() => setActive("/premium")}
        >
          Premium Page
        </NavLink>
      </NavZone>
      <NavZone>
        <UserProfileLink
          href="/user"
          pathname={active}
          username="John Doe"
          email="foo@example.com"
          onClick={(e) => {
            e.preventDefault();
            setActive("/user");
          }}
        />
        <DropMenu icon={<MoreIcon />}>
          <DropMenuActions>
            <NavLink
              type="button"
              className={active === "/profile/view" ? "active" : undefined}
              onClick={() => setActive("/profile/view")}
            >
              View Profile
            </NavLink>
            <NavLink
              type="button"
              className={active === "/profile/edit" ? "active" : undefined}
              onClick={() => setActive("/profile/edit")}
            >
              Edit Profile
            </NavLink>
            <NavLink type="button" decorator="danger">
              Logout
            </NavLink>
          </DropMenuActions>
        </DropMenu>
      </NavZone>
    </>
  );

  return (
    <NavWrapper main navComponent={NavComponent} mode="horizontal">
      <Screen>
        <div style={{ width: "100%", flexGrow: "1", backgroundColor: "var(--blue-dark)" }}>
          The blue block is the screen area.
        </div>
        <ScreenFooter>This is the footer part of the screen.</ScreenFooter>
      </Screen>
    </NavWrapper>
  );
};

export default Page;
