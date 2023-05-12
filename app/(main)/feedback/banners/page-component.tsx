"use client";

import { TitleAnchor } from "@components/stateful";
import { AnchorNav } from "@components/stateless";

import { IFramePresenterBox, IframePresenter } from "@internal";

import { useWindow } from "@hooks";

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  decorators: "Decorators",
};

// ================================================================================
// COMPONENT
// ================================================================================

export const PageComponent = () => {
  const clientWindow = useWindow();

  return (
    <section>
      <h1>UI Banners</h1>
      <AnchorNav params={NAV_PARAMS} />

      <section>
        <TitleAnchor renderer={"h2"} id="decorators">
          {NAV_PARAMS.decorators}
        </TitleAnchor>
        <IframePresenter>
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-banner/standard`}
            title="standard"
          />
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-banner/important`}
            title="important"
          />
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-banner/premium`}
            title="premium"
          />
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-banner/warning`}
            title="warning"
          />
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-banner/danger`}
            title="danger"
          />
        </IframePresenter>
      </section>
    </section>
  );
};
