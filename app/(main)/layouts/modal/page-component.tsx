"use client";

import { TitleAnchor } from "@components/stateful";
import { AnchorNav } from "@components/stateless";

import { IFramePresenterBox, IframePresenter } from "@internal";

import { useWindow } from "@hooks";

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  default: "Default",
};

// ================================================================================
// COMPONENT
// ================================================================================

export const PageComponent = () => {
  const clientWindow = useWindow();

  return (
    <section>
      <h1>UI Modal</h1>
      <AnchorNav params={NAV_PARAMS} />

      <section>
        <TitleAnchor renderer={"h2"} id="nav">
          {NAV_PARAMS.default}
        </TitleAnchor>
        <IframePresenter>
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-modal/default`}
            title="default"
          />
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-modal/title-with-icon`}
            title="title with icon"
          />
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-modal/title-with-icon-long`}
            title="title with icon (long)"
          />
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-modal/success`}
            title="success"
          />
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-modal/warning`}
            title="warning"
          />
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-modal/error`}
            title="error"
          />
        </IframePresenter>
      </section>
    </section>
  );
};
