"use client";

import CalendarIcon from "@public/icons/monochrome/calendar-edit.svg";
import LinkIcon from "@public/icons/monochrome/link.svg";
import SearchIcon from "@public/icons/monochrome/search.svg";
import SendIcon from "@public/icons/monochrome/send.svg";

import { H2, TitleAnchor } from "@components/stateful";
import { AnchorNav, Stepper } from "@components/stateless";

import { ResizablePresenter, ResizablePresenterBox } from "@internal";

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  vertical: "Vertical",
};

// ================================================================================
// COMPONENT
// ================================================================================

export const PageComponent = () => (
  <section>
    <h1>UI Steppers</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={H2} id="basic">
        {NAV_PARAMS.vertical}
      </TitleAnchor>

      <ResizablePresenter>
        <ResizablePresenterBox width="30rem" height="40rem" withFoam="vertical" fillFoam="end" title="initial">
          <Stepper
            steps={[
              {
                id: "step1",
                name: "Step 1 - Does something important",
                status: "locked",
                icon: <CalendarIcon />,
              },
              {
                id: "step2",
                name: "Step 2 - Does something else",
                status: "locked",
                icon: <LinkIcon />,
              },
              {
                id: "step3",
                name: "Step 3 - Almost done",
                status: "locked",
                icon: <SearchIcon />,
              },
              {
                id: "step4",
                name: "Step 4 - Finale",
                status: "locked",
                icon: <SendIcon />,
              },
            ]}
            statusName={(value) => value}
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox
          width="30rem"
          height="40rem"
          withFoam="vertical"
          fillFoam="end"
          title="partially completed"
        >
          <Stepper
            steps={[
              {
                id: "step1",
                name: "Step 1 - Does something important",
                status: "completed",
                icon: <CalendarIcon />,
              },
              {
                id: "step2",
                name: "Step 2 - Does something else",
                status: "active",
                icon: <LinkIcon />,
              },
              {
                id: "step3",
                name: "Step 3 - Almost done",
                status: "available",
                icon: <SearchIcon />,
              },
              {
                id: "step4",
                name: "Step 4 - Finale",
                status: "locked",
                icon: <SendIcon />,
              },
            ]}
            statusName={(value) => value}
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox width="30rem" height="40rem" withFoam="vertical" fillFoam="end" title="steps hovered">
          <Stepper
            steps={[
              {
                id: "step1",
                name: "Step 1 - Does something important",
                status: "completed",
                icon: <CalendarIcon />,
                hover: true,
              },
              {
                id: "step2",
                name: "Step 2 - Does something else",
                status: "active",
                icon: <LinkIcon />,
                hover: true,
              },
              {
                id: "step3",
                name: "Step 3 - Almost done",
                status: "available",
                icon: <SearchIcon />,
                hover: true,
              },
              {
                id: "step4",
                name: "Step 4 - Finale",
                status: "locked",
                icon: <SendIcon />,
              },
            ]}
            statusName={(value) => value}
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox width="30rem" height="40rem" withFoam="vertical" fillFoam="end" title="terminated">
          <Stepper
            steps={[
              {
                id: "step1",
                name: "Step 1 - Does something important",
                status: "completed",
                icon: <CalendarIcon />,
              },
              {
                id: "step2",
                name: "Step 2 - Does something else",
                status: "completed",
                icon: <LinkIcon />,
              },
              {
                id: "step3",
                name: "Step 3 - Almost done",
                status: "completed",
                icon: <SearchIcon />,
              },
              {
                id: "step4",
                name: "Step 4 - Finale",
                status: "completed",
                icon: <SendIcon />,
              },
            ]}
            statusName={(value) => value}
          />
        </ResizablePresenterBox>
      </ResizablePresenter>
    </section>
  </section>
);
