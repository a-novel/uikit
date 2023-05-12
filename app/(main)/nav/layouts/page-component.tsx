"use client";

import logoButton from "../../../../public/uikit/logo/logo-button.png";

import { TitleAnchor } from "@components/stateful";
import { AnchorNav, Nav, NavLabel, NavLink, NavLinkHome, NavZone } from "@components/stateless";

import { IFramePresenterBox, IframePresenter, ResizablePresenter, ResizablePresenterBox, Usage } from "@internal";

import { useWindow } from "@hooks";

// ================================================================================
// LINK
// ================================================================================

const LAYOUTS_IMPORT = `import { NavLink, NavZone, Nav } from "@anovel/uikit/components/stateless";`;

const LAYOUTS_USAGE = `const horizontalNav = (
  <Nav mode="horizontal">
    <NavZone>
      {/* Pathname argument should come from a usePathname() call, from a parent client page */}
      <NavLink href="/fake" pathname="/foo">
        Page 1
      </NavLink>
    </NavZone>
  </Nav>
);

const verticalNav = (
  <Nav mode="vertical">
    <NavZone>
      {/* Pathname argument should come from a usePathname() call, from a parent client page */}
      <NavLink href="/fake" pathname="/foo">
        Page 1
      </NavLink>
    </NavZone>
  </Nav>
);`;

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  nav: "Navigation",
  nav_nav: {
    h: "Horizontal",
    v: "Vertical",
  },
  frame: "App Simulator",
};

// ================================================================================
// COMPONENT
// ================================================================================

export const PageComponent = () => {
  const clientWindow = useWindow();

  return (
    <section>
      <h1>UI Navigation - Layouts</h1>
      <AnchorNav params={NAV_PARAMS} />

      <section>
        <TitleAnchor renderer={"h2"} id="nav">
          {NAV_PARAMS.nav}
        </TitleAnchor>

        <Usage import={LAYOUTS_IMPORT} code={LAYOUTS_USAGE} />

        <TitleAnchor renderer="h3" id="nav_nav_h">
          {NAV_PARAMS.nav_nav.h}
        </TitleAnchor>
        <ResizablePresenter>
          <ResizablePresenterBox minWidth="30rem" minHeight="12rem" title="standard" withFoam="vertical">
            <Nav style={{ zIndex: "0" }} mode="horizontal">
              <NavZone>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/rzx5RtCeLY4AAAAC/southpark-eric-cartman.gif"
                  pathname="foo"
                >
                  Page 1
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/9e8UPzbp-jAAAAAC/princess-kenny-south-park.gif"
                  pathname="foo"
                  className="active"
                >
                  Page 2
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/wt9HmC9DxnsAAAAd/south-park-stan.gif"
                  pathname="foo"
                >
                  Page 3
                </NavLink>
              </NavZone>
            </Nav>
          </ResizablePresenterBox>

          <ResizablePresenterBox
            minWidth="30rem"
            minHeight="12rem"
            title="standard - multiple nav zones"
            withFoam="vertical"
          >
            <Nav style={{ zIndex: "0" }} mode="horizontal">
              <NavZone>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/rzx5RtCeLY4AAAAC/southpark-eric-cartman.gif"
                  pathname="foo"
                >
                  Page 1
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/9e8UPzbp-jAAAAAC/princess-kenny-south-park.gif"
                  pathname="foo"
                  className="active"
                >
                  Page 2
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/wt9HmC9DxnsAAAAd/south-park-stan.gif"
                  pathname="foo"
                >
                  Page 3
                </NavLink>
              </NavZone>
              <NavZone>
                <NavLink target="_blank" href="https://www.youtube.com/watch?v=PqIMNE7QBSQ" pathname="foo">
                  Other Page 1
                </NavLink>
                <NavLink target="_blank" href="https://www.youtube.com/watch?v=HkGNeN0LGOE" pathname="foo">
                  Other Page 2
                </NavLink>
              </NavZone>
              <NavZone>
                <NavLink target="_blank" href="https://www.youtube.com/watch?v=b6fRijO3PNI" pathname="foo">
                  Link 1
                </NavLink>
                <NavLink target="_blank" href="https://www.youtube.com/shorts/RnKDa0LKqqY" pathname="foo">
                  Link 2
                </NavLink>
              </NavZone>
            </Nav>
          </ResizablePresenterBox>

          <ResizablePresenterBox
            minWidth="30rem"
            minHeight="12rem"
            title="standard - with home link"
            withFoam="vertical"
          >
            <Nav style={{ zIndex: "0" }} mode="horizontal">
              <NavZone>
                <NavLinkHome
                  src={logoButton}
                  href="https://www.youtube.com/watch?v=4vrUMPu3h5Y"
                  target="_blank"
                  alt="agora ui-kit logo"
                />
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/rzx5RtCeLY4AAAAC/southpark-eric-cartman.gif"
                  pathname="foo"
                >
                  Page 1
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/9e8UPzbp-jAAAAAC/princess-kenny-south-park.gif"
                  pathname="foo"
                  className="active"
                >
                  Page 2
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/wt9HmC9DxnsAAAAd/south-park-stan.gif"
                  pathname="foo"
                >
                  Page 3
                </NavLink>
              </NavZone>
              <NavZone>
                <NavLink target="_blank" href="https://www.youtube.com/watch?v=b6fRijO3PNI" pathname="foo">
                  Link 1
                </NavLink>
                <NavLink target="_blank" href="https://www.youtube.com/shorts/RnKDa0LKqqY" pathname="foo">
                  Link 2
                </NavLink>
              </NavZone>
            </Nav>
          </ResizablePresenterBox>
        </ResizablePresenter>

        <TitleAnchor renderer="h3" id="nav_nav_v">
          {NAV_PARAMS.nav_nav.v}
        </TitleAnchor>
        <ResizablePresenter inline>
          <ResizablePresenterBox
            width="20rem"
            minWidth="20rem"
            height="30rem"
            minHeight="5rem"
            title="standard"
            withFoam="horizontal"
          >
            <Nav style={{ zIndex: "0" }} mode="vertical">
              <NavZone>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/rzx5RtCeLY4AAAAC/southpark-eric-cartman.gif"
                  pathname="foo"
                >
                  Page 1
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/9e8UPzbp-jAAAAAC/princess-kenny-south-park.gif"
                  pathname="foo"
                  className="active"
                >
                  Page 2
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/wt9HmC9DxnsAAAAd/south-park-stan.gif"
                  pathname="foo"
                >
                  Page 3
                </NavLink>
              </NavZone>
            </Nav>
          </ResizablePresenterBox>

          <ResizablePresenterBox
            width="20rem"
            minWidth="20rem"
            height="30rem"
            minHeight="5rem"
            title="standard - multiple nav zones"
            withFoam="horizontal"
          >
            <Nav style={{ zIndex: "0" }} mode="vertical">
              <NavZone>
                <NavLabel>Pages</NavLabel>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/rzx5RtCeLY4AAAAC/southpark-eric-cartman.gif"
                  pathname="foo"
                >
                  Page 1
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/9e8UPzbp-jAAAAAC/princess-kenny-south-park.gif"
                  pathname="foo"
                  className="active"
                >
                  Page 2
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/wt9HmC9DxnsAAAAd/south-park-stan.gif"
                  pathname="foo"
                >
                  Page 3
                </NavLink>
              </NavZone>
              <NavZone>
                <NavLabel>Other Pages</NavLabel>
                <NavLink target="_blank" href="https://www.youtube.com/watch?v=PqIMNE7QBSQ" pathname="foo">
                  Other Page 1
                </NavLink>
                <NavLink target="_blank" href="https://www.youtube.com/watch?v=HkGNeN0LGOE" pathname="foo">
                  Other Page 2
                </NavLink>
              </NavZone>
              <NavZone>
                <NavLabel>Links</NavLabel>
                <NavLink target="_blank" href="https://www.youtube.com/watch?v=b6fRijO3PNI" pathname="foo">
                  Link 1
                </NavLink>
                <NavLink target="_blank" href="https://www.youtube.com/shorts/RnKDa0LKqqY" pathname="foo">
                  Link 2
                </NavLink>
              </NavZone>
            </Nav>
          </ResizablePresenterBox>

          <ResizablePresenterBox
            width="20rem"
            minWidth="20rem"
            height="30rem"
            minHeight="5rem"
            title="standard - with home link"
            withFoam="horizontal"
          >
            <Nav style={{ zIndex: "0" }} mode="vertical">
              <NavZone>
                <NavLinkHome
                  src={logoButton}
                  href="https://www.youtube.com/watch?v=4vrUMPu3h5Y"
                  target="_blank"
                  alt="agora ui-kit logo"
                />
              </NavZone>
              <NavZone>
                <NavLabel>Pages</NavLabel>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/rzx5RtCeLY4AAAAC/southpark-eric-cartman.gif"
                  pathname="foo"
                >
                  Page 1
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/9e8UPzbp-jAAAAAC/princess-kenny-south-park.gif"
                  pathname="foo"
                  className="active"
                >
                  Page 2
                </NavLink>
                <NavLink
                  target="_blank"
                  href="https://media.tenor.com/wt9HmC9DxnsAAAAd/south-park-stan.gif"
                  pathname="foo"
                >
                  Page 3
                </NavLink>
              </NavZone>
              <NavZone>
                <NavLabel>Links</NavLabel>
                <NavLink target="_blank" href="https://www.youtube.com/watch?v=b6fRijO3PNI" pathname="foo">
                  Link 1
                </NavLink>
                <NavLink target="_blank" href="https://www.youtube.com/shorts/RnKDa0LKqqY" pathname="foo">
                  Link 2
                </NavLink>
              </NavZone>
            </Nav>
          </ResizablePresenterBox>
        </ResizablePresenter>
      </section>

      <section>
        <TitleAnchor renderer={"h2"} id="frame">
          {NAV_PARAMS.frame}
        </TitleAnchor>
        <IframePresenter>
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-navigation/horizontal`}
            title="horizontal main layout"
          />
        </IframePresenter>
      </section>
    </section>
  );
};
