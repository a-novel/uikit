"use client";

import { AnchorNav } from "@components/stateless";
import { TitleAnchor, H2 } from "@components/stateful";
import { IframePresenter, IFramePresenterBox } from "@internal";
import { useWindow } from "@hooks";

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  default: "Default",
  footer: "With Footer",
};

// ================================================================================
// COMPONENT
// ================================================================================

export const PageComponent = () => {
  const clientWindow = useWindow();

  return (
    <section>
      <h1>UI Screen</h1>
      <AnchorNav params={NAV_PARAMS} />

      <section>
        <TitleAnchor renderer={H2} id="nav">
          {NAV_PARAMS.default}
        </TitleAnchor>
        <IframePresenter>
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-screen/normal`}
            title="normal"
          />
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-screen/normal-overflow`}
            title="normal - overflow"
          />
        </IframePresenter>
      </section>

      <section>
        <TitleAnchor renderer={H2} id="frame">
          {NAV_PARAMS.footer}
        </TitleAnchor>
        <IframePresenter>
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-screen/footer`}
            title="footer"
          />
          <IFramePresenterBox
            src={`${clientWindow && clientWindow.location.origin}/framed/demo-screen/footer-overflow`}
            title="footer - overflow"
          />
        </IframePresenter>
      </section>
    </section>
  );
};
