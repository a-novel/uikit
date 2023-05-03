"use client";

import { H2, TitleAnchor } from "@components/stateful";
import { AnchorNav, Skeleton } from "@components/stateless";

import { Presenter, PresenterBox } from "@internal";

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
    <h1>UI Skeletons</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={H2} id="default">
        {NAV_PARAMS.default}
      </TitleAnchor>

      <Presenter>
        <PresenterBox title="default">
          <Skeleton
            style={{
              borderRadius: "var(--border-radius)",
              overflow: "hidden",
              width: "20rem",
              height: "10rem",
            }}
          />
        </PresenterBox>
        <PresenterBox title="small">
          <Skeleton
            style={{
              borderRadius: "var(--button-radius)",
              overflow: "hidden",
              width: "10rem",
              height: "4rem",
            }}
          />
        </PresenterBox>
      </Presenter>
    </section>
  </section>
);
