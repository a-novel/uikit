"use client";

import logoButton from "@public/uikit/logo/logo-button.png";

import { FC, ReactNode } from "react";

import { H2, TitleAnchor } from "@components/stateful";
import {
  AnchorNav,
  Decorator,
  Nav,
  NavLabel,
  NavLink,
  NavLinkHome,
  NavZone,
  UserProfileLink,
} from "@components/stateless";

import { Presenter, PresenterBox, Usage } from "@internal";

// ================================================================================
// LINK
// ================================================================================

const LINK_IMPORT = `
import { NavLink, NavZone, Nav } from "@anovel/uikit/components/stateless";
`;

const LINK_USAGE = `
const HorizontalNav = () => (
  <Nav mode="horizontal">
    <NavZone>
      {/* Pathname argument should come from a usePathname() call, from a parent client page */}
      <NavLink href="/fake" pathname="/foo">
        Page 1
      </NavLink>
    </NavZone>
  </Nav>
);

const VerticalNav = () => (
  <Nav mode="vertical">
    <NavZone>
      {/* Pathname argument should come from a usePathname() call, from a parent client page */}
      <NavLink href="/fake" pathname="/foo">
        Page 1
      </NavLink>
    </NavZone>
  </Nav>
);

const Disabled = () => (
  <NavLink href="/fake" disabled pathname="/foo">
    Page 1
  </NavLink>
);

const WithDecorator = () => (
  <NavLink href="/fake" decorator="warning" pathname="/foo">
    Page 1
  </NavLink>
);

const TypeButton = () => (
  <NavLink onClick={onClick} type="button">
    Page 1
  </NavLink>
);
`;

// ================================================================================
// LABEL
// ================================================================================

const LABEL_IMPORT = `import { NavLink, NavLabel, NavZone, Nav } from "@anovel/uikit/components/stateless";`;

const LABEL_USAGE = `
const VerticalNav = () => (
  <Nav mode="vertical">
    <NavZone>
      <NavLabel>
        Page Group 1
      </NavLabel>
    </NavZone>
  </Nav>
);
`;

// ================================================================================
// HOME LINK
// ================================================================================

const HOME_LINK_IMPORT = `
import { NavLink, NavLinkHome, NavZone, Nav } from "@anovel/uikit/components/stateless";
import logoButton from "path/to/logo-button.png";
`;

const HOME_LINK_USAGE = `
const HorizontalNav = () => (
  <Nav mode="horizontal">
    <NavZone>
      <NavLinkHome href="/fake" alt="my logo button"/>
    </NavZone>
  </Nav>
);

const VerticalNav = () => (
  <Nav mode="vertical">
    <NavZone>
      <NavLinkHome href="/fake" alt="my logo button"/>
    </NavZone>
  </Nav>
);
`;

// ================================================================================
// USER LINK
// ================================================================================

const USER_LINK_IMPORT = `
import { UserProfileLink, NavZone, Nav } from "@anovel/uikit/components/stateless";
import logoButton from "path/to/logo-button.png";
`;

const USER_LINK_USAGE = `
const HorizontalNav = () => (
  <Nav mode="horizontal">
    <NavZone>
      <UserProfileLink
        href="/foo"
        pathname="/fake"
        username="John Doe"
        email="foo@example.com"
      />
    </NavZone>
  </Nav>
);
`;

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  link: "Link",
  link_nav: {
    default_h: "Default - Horizontal",
    default_v: "Default - Vertical",
    decorators_h: "Decorators - Horizontal",
    decorators_v: "Decorators - Vertical",
    types_h: "Types - Horizontal",
    types_v: "Types - Vertical",
    responsive_h: "Responsive - Horizontal",
    responsive_v: "Responsive - Vertical",
  },
  label: "Label (vertical only)",
  label_nav: {
    default: "Default",
    responsive: "Responsive",
  },
  home_link: "Home Link",
  home_link_nav: {
    default_h: "Default - Horizontal",
    default_v: "Default - Vertical",
  },
  user_link: "User Link",
  user_link_nav: {
    default_h: "Default - Horizontal",
    default_v: "Default - Vertical",
    responsive_h: "Responsive - Horizontal",
    responsive_v: "Responsive - Vertical",
  },
};

// ================================================================================
// COMPONENT
// ================================================================================

interface SingleLinkPresenterProps {
  mode: "horizontal" | "vertical";
  title: string;
  children: ReactNode;
}

const SingleLinkPresenter: FC<SingleLinkPresenterProps> = ({ children, mode, title }) => (
  <PresenterBox title={title}>
    <Nav style={{ zIndex: "0" }} mode={mode}>
      <NavZone>{children}</NavZone>
    </Nav>
  </PresenterBox>
);

interface SingleLinkStatesPresenterProps {
  mode: "horizontal" | "vertical";
  decorator?: Decorator;
}

const SingleLinkStatesPresenter: FC<SingleLinkStatesPresenterProps> = ({ mode, decorator }) => (
  <>
    <SingleLinkPresenter mode={mode} title={decorator || "default"}>
      <NavLink href="/fake" decorator={decorator} pathname="foo">
        Page 1
      </NavLink>
    </SingleLinkPresenter>
    <SingleLinkPresenter mode={mode} title={`${decorator || "default"} hover`}>
      <NavLink href="/fake" decorator={decorator} className="hover" pathname="foo">
        Page 1
      </NavLink>
    </SingleLinkPresenter>
    <SingleLinkPresenter mode={mode} title={`${decorator || "default"} active`}>
      <NavLink href="/fake" decorator={decorator} className="active" pathname="foo">
        Page 1
      </NavLink>
    </SingleLinkPresenter>
  </>
);

export const PageComponent = () => (
  <section>
    <h1>UI Navigation - Links</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={H2} id="link">
        {NAV_PARAMS.link}
      </TitleAnchor>

      <Usage import={LINK_IMPORT} code={LINK_USAGE} />

      <TitleAnchor renderer="h3" id="link_nav_default_h">
        {NAV_PARAMS.link_nav.default_h}
      </TitleAnchor>
      <Presenter>
        <SingleLinkStatesPresenter mode="horizontal" />
        <SingleLinkPresenter mode="horizontal" title="disabled">
          <NavLink href="/fake" pathname="foo" disabled>
            Page 1
          </NavLink>
        </SingleLinkPresenter>
      </Presenter>

      <TitleAnchor renderer="h3" id="link_nav_default_v">
        {NAV_PARAMS.link_nav.default_v}
      </TitleAnchor>
      <Presenter>
        <SingleLinkStatesPresenter mode="vertical" />
        <SingleLinkPresenter mode="vertical" title="disabled">
          <NavLink href="/fake" pathname="foo" disabled>
            Page 1
          </NavLink>
        </SingleLinkPresenter>
      </Presenter>

      <TitleAnchor renderer="h3" id="link_nav_decorators_h">
        {NAV_PARAMS.link_nav.decorators_h}
      </TitleAnchor>
      <Presenter>
        <SingleLinkStatesPresenter mode="horizontal" decorator="standard" />
        <SingleLinkStatesPresenter mode="horizontal" decorator="important" />
        <SingleLinkStatesPresenter mode="horizontal" decorator="premium" />
        <SingleLinkStatesPresenter mode="horizontal" decorator="warning" />
        <SingleLinkStatesPresenter mode="horizontal" decorator="danger" />
      </Presenter>

      <TitleAnchor renderer="h3" id="link_nav_decorators_v">
        {NAV_PARAMS.link_nav.decorators_v}
      </TitleAnchor>
      <Presenter>
        <SingleLinkStatesPresenter mode="vertical" decorator="standard" />
        <SingleLinkStatesPresenter mode="vertical" decorator="important" />
        <SingleLinkStatesPresenter mode="vertical" decorator="premium" />
        <SingleLinkStatesPresenter mode="vertical" decorator="warning" />
        <SingleLinkStatesPresenter mode="vertical" decorator="danger" />
      </Presenter>

      <TitleAnchor renderer="h3" id="link_nav_types_h">
        {NAV_PARAMS.link_nav.types_h}
      </TitleAnchor>
      <Presenter>
        <SingleLinkPresenter mode="horizontal" title="button">
          <NavLink type="button" className="hover">
            Page 1
          </NavLink>
        </SingleLinkPresenter>
      </Presenter>

      <TitleAnchor renderer="h3" id="link_nav_types_v">
        {NAV_PARAMS.link_nav.types_v}
      </TitleAnchor>
      <Presenter>
        <SingleLinkPresenter mode="vertical" title="button">
          <NavLink type="button" className="hover">
            Page 1
          </NavLink>
        </SingleLinkPresenter>
      </Presenter>

      <TitleAnchor renderer="h3" id="link_nav_responsive_h">
        {NAV_PARAMS.link_nav.responsive_h}
      </TitleAnchor>
      <Presenter>
        <Nav style={{ zIndex: "0" }} mode="horizontal">
          <NavZone>
            <NavLink href="/fake" pathname="foo" className="hover">
              I am a very long link with a very long text
            </NavLink>
          </NavZone>
        </Nav>
      </Presenter>

      <TitleAnchor renderer="h3" id="link_nav_responsive_v">
        {NAV_PARAMS.link_nav.responsive_v}
      </TitleAnchor>
      <Presenter>
        <Nav style={{ zIndex: "0" }} mode="vertical">
          <NavZone>
            <NavLink href="/fake" pathname="foo" className="hover">
              I am a very long link with a very long text
            </NavLink>
          </NavZone>
        </Nav>
      </Presenter>
    </section>

    <section>
      <TitleAnchor renderer={H2} id="label">
        {NAV_PARAMS.label}
      </TitleAnchor>

      <Usage import={LABEL_IMPORT} code={LABEL_USAGE} />

      <TitleAnchor renderer="h3" id="label_nav_default">
        {NAV_PARAMS.label_nav.default}
      </TitleAnchor>
      <Presenter>
        <Nav style={{ zIndex: "0" }} mode="vertical">
          <NavZone>
            <NavLabel>Page Group 1</NavLabel>
          </NavZone>
        </Nav>
      </Presenter>

      <TitleAnchor renderer="h3" id="label_nav_responsive">
        {NAV_PARAMS.label_nav.responsive}
      </TitleAnchor>
      <Presenter>
        <Nav style={{ zIndex: "0" }} mode="vertical">
          <NavZone>
            <NavLabel>A big page group with a very long name</NavLabel>
          </NavZone>
        </Nav>
      </Presenter>
    </section>

    <section>
      <TitleAnchor renderer={H2} id="home_link">
        {NAV_PARAMS.home_link}
      </TitleAnchor>

      <Usage import={HOME_LINK_IMPORT} code={HOME_LINK_USAGE} />

      <TitleAnchor renderer="h3" id="home_link_nav_default_h">
        {NAV_PARAMS.link_nav.default_h}
      </TitleAnchor>
      <Presenter>
        <PresenterBox title="default">
          <Nav style={{ zIndex: "0" }} mode="horizontal">
            <NavZone>
              <NavLinkHome href="/fake" src={logoButton} alt="177013" />
            </NavZone>
          </Nav>
        </PresenterBox>
        <PresenterBox title="hover">
          <Nav style={{ zIndex: "0" }} mode="horizontal">
            <NavZone>
              <NavLinkHome href="/fake" className="hover" src={logoButton} alt="177013" />
            </NavZone>
          </Nav>
        </PresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="home_link_nav_default_v">
        {NAV_PARAMS.link_nav.default_v}
      </TitleAnchor>
      <Presenter>
        <PresenterBox title="default">
          <Nav style={{ zIndex: "0" }} mode="vertical">
            <NavZone>
              <NavLinkHome href="/fake" src={logoButton} alt="177013" />
            </NavZone>
          </Nav>
        </PresenterBox>
        <PresenterBox title="hover">
          <Nav style={{ zIndex: "0" }} mode="vertical">
            <NavZone>
              <NavLinkHome href="/fake" className="hover" src={logoButton} alt="177013" />
            </NavZone>
          </Nav>
        </PresenterBox>
      </Presenter>
    </section>

    <section>
      <TitleAnchor renderer={H2} id="user_link">
        {NAV_PARAMS.user_link}
      </TitleAnchor>

      <Usage import={USER_LINK_IMPORT} code={USER_LINK_USAGE} />

      <TitleAnchor renderer="h3" id="user_link_nav_default_h">
        {NAV_PARAMS.user_link_nav.default_h}
      </TitleAnchor>
      <Presenter>
        <PresenterBox title="default">
          <Nav style={{ zIndex: "0" }} mode="horizontal">
            <NavZone>
              <UserProfileLink href="/foo" pathname="/fake" username="John Doe" email="foo@example.com" />
            </NavZone>
          </Nav>
        </PresenterBox>
        <PresenterBox title="hover">
          <Nav style={{ zIndex: "0" }} mode="horizontal">
            <NavZone>
              <UserProfileLink
                className="hover"
                href="/foo"
                pathname="/fake"
                username="John Doe"
                email="foo@example.com"
              />
            </NavZone>
          </Nav>
        </PresenterBox>
        <PresenterBox title="active">
          <Nav style={{ zIndex: "0" }} mode="horizontal">
            <NavZone>
              <UserProfileLink
                className="active"
                href="/foo"
                pathname="/fake"
                username="John Doe"
                email="foo@example.com"
              />
            </NavZone>
          </Nav>
        </PresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="user_link_nav_default_v">
        {NAV_PARAMS.user_link_nav.default_v}
      </TitleAnchor>
      <Presenter>
        <PresenterBox title="default">
          <Nav style={{ zIndex: "0" }} mode="vertical">
            <NavZone>
              <UserProfileLink href="/foo" pathname="/fake" username="John Doe" email="foo@example.com" />
            </NavZone>
          </Nav>
        </PresenterBox>
        <PresenterBox title="hover">
          <Nav style={{ zIndex: "0" }} mode="vertical">
            <NavZone>
              <UserProfileLink
                className="hover"
                href="/foo"
                pathname="/fake"
                username="John Doe"
                email="foo@example.com"
              />
            </NavZone>
          </Nav>
        </PresenterBox>
        <PresenterBox title="active">
          <Nav style={{ zIndex: "0" }} mode="vertical">
            <NavZone>
              <UserProfileLink
                className="active"
                href="/foo"
                pathname="/fake"
                username="John Doe"
                email="foo@example.com"
              />
            </NavZone>
          </Nav>
        </PresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="user_link_nav_responsive_h">
        {NAV_PARAMS.user_link_nav.responsive_h}
      </TitleAnchor>
      <Presenter>
        <Nav style={{ zIndex: "0" }} mode="horizontal">
          <NavZone>
            <UserProfileLink
              className="hover"
              href="/foo"
              pathname="/fake"
              username="Jugemu-jugemu Gokōnosurikire Kaijarisuigyo-no Suigyōmatsu Unraimatsu Fūraimatsu Kūnerutokoroni-sumutokoro Yaburakōjino-burakōji Paipopaipo-paiponoshūringan Shūringanno-gūrindai Gūrindaino-ponpokopīno-ponpokonāno Chōkyūmeino-chōsuke"
              email="jugemu-jugemu-gokōnosurikire-kaijarisuigyo-no-suigyōmatsu-unraimatsu-fūraimatsu-kūnerutokoroni-sumutokoro-yaburakōjino-burakōji-paipopaipo-paiponoshūringan-shūringanno-gūrindai-gūrindaino-ponpokopīno-ponpokonāno-chōkyūmeino-chōsuke@central.city"
            />
          </NavZone>
        </Nav>
      </Presenter>

      <TitleAnchor renderer="h3" id="user_link_nav_responsive_v">
        {NAV_PARAMS.user_link_nav.responsive_v}
      </TitleAnchor>
      <Presenter>
        <Nav style={{ zIndex: "0" }} mode="vertical">
          <NavZone>
            <UserProfileLink
              className="hover"
              href="/foo"
              pathname="/fake"
              username="Jugemu-jugemu Gokōnosurikire Kaijarisuigyo-no Suigyōmatsu Unraimatsu Fūraimatsu Kūnerutokoroni-sumutokoro Yaburakōjino-burakōji Paipopaipo-paiponoshūringan Shūringanno-gūrindai Gūrindaino-ponpokopīno-ponpokonāno Chōkyūmeino-chōsuke"
              email="jugemu-jugemu-gokōnosurikire-kaijarisuigyo-no-suigyōmatsu-unraimatsu-fūraimatsu-kūnerutokoroni-sumutokoro-yaburakōjino-burakōji-paipopaipo-paiponoshūringan-shūringanno-gūrindai-gūrindaino-ponpokopīno-ponpokonāno-chōkyūmeino-chōsuke@central.city"
            />
          </NavZone>
        </Nav>
      </Presenter>
    </section>
  </section>
);
