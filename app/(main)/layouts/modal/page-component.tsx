"use client";

import { AnchorNav } from "@components/stateless";
import { TitleAnchor, H2 } from "@components/stateful";
import { IframePresenter, IFramePresenterBox } from "@internal/index";

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  default: "Default",
};

// ================================================================================
// COMPONENT
// ================================================================================

export const PageComponent = () => (
  <section>
    <h1>UI Modal</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={H2} id="nav">
        {NAV_PARAMS.default}
      </TitleAnchor>
      <IframePresenter>
        <IFramePresenterBox
          src={`${global.window && window.location.origin}/framed/demo-modal/default`}
          title="default"
        />
        <IFramePresenterBox
          src={`${global.window && window.location.origin}/framed/demo-modal/title-with-icon`}
          title="title with icon"
        />
        <IFramePresenterBox
          src={`${global.window && window.location.origin}/framed/demo-modal/title-with-icon-long`}
          title="title with icon (long)"
        />
        <IFramePresenterBox
          src={`${global.window && window.location.origin}/framed/demo-modal/success`}
          title="success"
        />
        <IFramePresenterBox
          src={`${global.window && window.location.origin}/framed/demo-modal/warning`}
          title="warning"
        />
        <IFramePresenterBox src={`${global.window && window.location.origin}/framed/demo-modal/error`} title="error" />
      </IframePresenter>
    </section>
  </section>
);
