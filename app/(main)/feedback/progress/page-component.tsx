"use client";

import CalendarIcon from "@public/icons/monochrome/calendar-edit.svg";
import LinkIcon from "@public/icons/monochrome/link.svg";
import SearchIcon from "@public/icons/monochrome/search.svg";
import SendIcon from "@public/icons/monochrome/send.svg";

import { Progress, Stepper, TitleAnchor } from "@components/stateful";
import { AnchorNav } from "@components/stateless";

import { ResizablePresenter, ResizablePresenterBox } from "@internal";

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  default: "Default",
  options: "Options",
};

// ================================================================================
// COMPONENT
// ================================================================================

export const PageComponent = () => (
  <section>
    <h1>UI Progress</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={"h2"} id="default">
        {NAV_PARAMS.default}
      </TitleAnchor>

      <ResizablePresenter>
        <ResizablePresenterBox width="30rem" title="initial">
          <div style={{ padding: "1rem" }}>
            <Progress
              value={0}
              total={128}
              steps={[
                {
                  decorator: "important",
                  value: 32,
                  label: "go here",
                },
                {
                  decorator: "warning",
                  value: 64,
                  label: "be careful",
                },
                {
                  decorator: "danger",
                  value: 96,
                  label: "don't go there",
                },
              ]}
            />
          </div>
        </ResizablePresenterBox>
        <ResizablePresenterBox width="30rem" title="partially completed">
          <div style={{ padding: "1rem" }}>
            <Progress
              value={50}
              total={128}
              steps={[
                {
                  decorator: "important",
                  value: 32,
                  label: "go here",
                },
                {
                  decorator: "warning",
                  value: 64,
                  label: "be careful",
                },
                {
                  decorator: "danger",
                  value: 96,
                  label: "don't go there",
                },
              ]}
            />
          </div>
        </ResizablePresenterBox>
        <ResizablePresenterBox width="30rem" title="partially completed #2">
          <div style={{ padding: "1rem" }}>
            <Progress
              value={80}
              total={128}
              steps={[
                {
                  decorator: "important",
                  value: 32,
                  label: "go here",
                },
                {
                  decorator: "warning",
                  value: 64,
                  label: "be careful",
                },
                {
                  decorator: "danger",
                  value: 96,
                  label: "don't go there",
                },
              ]}
            />
          </div>
        </ResizablePresenterBox>
        <ResizablePresenterBox width="30rem" title="terminated">
          <div style={{ padding: "1rem" }}>
            <Progress
              value={128}
              total={128}
              steps={[
                {
                  decorator: "important",
                  value: 32,
                  label: "go here",
                },
                {
                  decorator: "warning",
                  value: 64,
                  label: "be careful",
                },
                {
                  decorator: "danger",
                  value: 96,
                  label: "don't go there",
                },
              ]}
            />
          </div>
        </ResizablePresenterBox>
      </ResizablePresenter>
    </section>

    <section>
      <TitleAnchor renderer={"h2"} id="options">
        {NAV_PARAMS.options}
      </TitleAnchor>

      <ResizablePresenter>
        <ResizablePresenterBox width="30rem" title="label">
          <div style={{ padding: "1rem" }}>
            <Progress
              value={50}
              total={128}
              steps={[
                {
                  decorator: "important",
                  value: 32,
                  label: "go here",
                },
                {
                  decorator: "warning",
                  value: 64,
                  label: "be careful",
                },
                {
                  decorator: "danger",
                  value: 96,
                  label: "don't go there",
                },
              ]}
              label="Progress:"
            />
          </div>
        </ResizablePresenterBox>
        <ResizablePresenterBox width="30rem" title="progress value">
          <div style={{ padding: "1rem" }}>
            <Progress
              value={50}
              total={128}
              steps={[
                {
                  decorator: "important",
                  value: 32,
                  label: "go here",
                },
                {
                  decorator: "warning",
                  value: 64,
                  label: "be careful",
                },
                {
                  decorator: "danger",
                  value: 96,
                  label: "don't go there",
                },
              ]}
              displayProgressValue
            />
          </div>
        </ResizablePresenterBox>
      </ResizablePresenter>
    </section>
  </section>
);
