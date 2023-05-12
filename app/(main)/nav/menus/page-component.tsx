"use client";

import MoreIcon from "@public/icons/monochrome/more-horizontal.svg";

import { FC, ReactNode } from "react";

import { DropMenu, DropMenuActions, TitleAnchor } from "@components/stateful";
import { AnchorNav, Nav, NavLink, NavZone } from "@components/stateless";

import { Presenter, PresenterBox, Usage } from "@internal";

// ================================================================================
// LINK
// ================================================================================

const DROP_MENU_IMPORT = `
import { NavLink, NavZone, Nav } from "@anovel/uikit/components/stateless";
import { DropMenu, DropMenuActions } from "@anovel/uikit/components/stateful";
import DropIcon from "path/to/icon.svg";
`;

const DROP_MENU_USAGE = `
const HorizontalNav = (
  <Nav mode="horizontal">
    <NavZone />
    <NavZone>
      <DropMenu icon={<DropIcon />}>
        <DropMenuActions>
          <NavLink href="/foo" pathname="foo">
            Page 1
          </NavLink>
          <NavLink href="/bar" pathname="foo">
            Page 2
          </NavLink>
          <NavLink type="button" decorator="danger">
            Dangerous action
          </NavLink>
        </DropMenuActions>
      </DropMenu>
    </NavZone>
  </Nav>
);
`;

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  drop_menu: "Drop Menu (horizontal only)",
  drop_menu_nav: {
    default: "States",
    items: "Items",
  },
};

// ================================================================================
// COMPONENT
// ================================================================================

interface DropMenuPresenterProps {
  children: ReactNode;
  className?: string;
  initialState?: boolean;
  title: string;
  height: string;
  width: string;
  disabled?: boolean;
}

const DropMenuPresenter: FC<DropMenuPresenterProps> = ({
  disabled,
  children,
  initialState,
  height,
  width,
  title,
  className,
}) => (
  <PresenterBox title={title}>
    <div style={{ height, width }}>
      <Nav style={{ zIndex: "0" }} mode="horizontal">
        <NavZone>
          <NavLink href="/fake" pathname="foo" className="active">
            Page 1
          </NavLink>
        </NavZone>
        <NavZone>
          <DropMenu disabled={disabled} uikit className={className} initialState={initialState} icon={<MoreIcon />}>
            {children}
          </DropMenu>
        </NavZone>
      </Nav>
    </div>
  </PresenterBox>
);

const DropMenuDefaultItem = () => (
  <div
    style={{
      height: "6rem",
      width: "8rem",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    Drop menu content
  </div>
);

const DropMenuActionsItem = () => (
  <DropMenuActions>
    <NavLink href="/" pathname="foo">
      Page 1
    </NavLink>
    <NavLink href="/" pathname="foo" className="hover">
      Page 2
    </NavLink>
    <NavLink type="button" decorator="danger">
      Dangerous action
    </NavLink>
  </DropMenuActions>
);

export const PageComponent = () => (
  <section>
    <h1>UI Navigation - Menus</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={"h2"} id="drop_menu">
        {NAV_PARAMS.drop_menu}
      </TitleAnchor>

      <Usage import={DROP_MENU_IMPORT} code={DROP_MENU_USAGE} />

      <TitleAnchor renderer="h3" id="drop_menu_nav_default">
        {NAV_PARAMS.drop_menu_nav.default}
      </TitleAnchor>

      <Presenter>
        <DropMenuPresenter width="20rem" height="5rem" title="default">
          <DropMenuDefaultItem />
        </DropMenuPresenter>
        <DropMenuPresenter className="hover" width="20rem" height="5rem" title="hover">
          <DropMenuDefaultItem />
        </DropMenuPresenter>
        <DropMenuPresenter initialState={true} width="20rem" height="10rem" title="active">
          <DropMenuDefaultItem />
        </DropMenuPresenter>
        <DropMenuPresenter disabled width="20rem" height="10rem" title="disabled">
          <DropMenuDefaultItem />
        </DropMenuPresenter>
      </Presenter>

      <TitleAnchor renderer="h3" id="drop_menu_nav_items">
        {NAV_PARAMS.drop_menu_nav.items}
      </TitleAnchor>

      <Presenter>
        <DropMenuPresenter initialState={true} width="20rem" height="16rem" title="actions">
          <DropMenuActionsItem />
        </DropMenuPresenter>
      </Presenter>
    </section>
  </section>
);
