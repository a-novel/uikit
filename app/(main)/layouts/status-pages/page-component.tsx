"use client";

import TacosIcon from "@public/icons/colored/tacos.svg";
import checkLottie from "@public/lottie/text-input/check.json";

import { TitleAnchor } from "@components/stateful";
import { AnchorNav, StatusPage } from "@components/stateless";
import { Player } from "@lottiefiles/react-lottie-player";

import { ResizablePresenter, ResizablePresenterBox } from "@internal";

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  default: "Default",
  default_nav: {
    default: "Default",
    decorators: "Decorators",
  },
};

// ================================================================================
// COMPONENT
// ================================================================================

export const PageComponent = () => (
  <section>
    <h1>UI Status Pages</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={"h2"} id="default">
        {NAV_PARAMS.default}
      </TitleAnchor>

      <TitleAnchor renderer="h3" id="default_nav_default">
        {NAV_PARAMS.default_nav.default}
      </TitleAnchor>
      <ResizablePresenter>
        <ResizablePresenterBox style={{ position: "relative" }} height="20rem" width="40rem" title="standard">
          <StatusPage relative title="I am a status page" content="I am a status description" decorator="standard" />
        </ResizablePresenterBox>
        <ResizablePresenterBox style={{ position: "relative" }} height="20rem" width="40rem" title="long text">
          <StatusPage
            relative
            title="I am a longer status page title with way to much or too long information"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            decorator="standard"
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox style={{ position: "relative" }} height="20rem" width="40rem" title="with icon">
          <StatusPage
            relative
            icon={<TacosIcon />}
            title="I am a status page"
            content="I am a status description"
            decorator="standard"
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox style={{ position: "relative" }} height="20rem" width="40rem" title="with lottie icon">
          <StatusPage
            relative
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            title="I am a status page"
            content="I am a status description"
            decorator="standard"
          />
        </ResizablePresenterBox>
      </ResizablePresenter>

      <TitleAnchor renderer="h3" id="default_nav_decorators">
        {NAV_PARAMS.default_nav.decorators}
      </TitleAnchor>
      <ResizablePresenter>
        <ResizablePresenterBox style={{ position: "relative" }} height="20rem" width="40rem" title="standard">
          <StatusPage
            relative
            title="I am a longer status page title with way to much or too long information"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            decorator="standard"
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox style={{ position: "relative" }} height="20rem" width="40rem" title="important">
          <StatusPage
            relative
            title="I am a longer status page title with way to much or too long information"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            decorator="important"
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox style={{ position: "relative" }} height="20rem" width="40rem" title="premium">
          <StatusPage
            relative
            title="I am a longer status page title with way to much or too long information"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            decorator="premium"
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox style={{ position: "relative" }} height="20rem" width="40rem" title="warning">
          <StatusPage
            relative
            title="I am a longer status page title with way to much or too long information"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            decorator="warning"
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox style={{ position: "relative" }} height="20rem" width="40rem" title="danger">
          <StatusPage
            relative
            title="I am a longer status page title with way to much or too long information"
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
            decorator="danger"
          />
        </ResizablePresenterBox>
      </ResizablePresenter>
    </section>
  </section>
);
