"use client";

import { TitleAnchor, H2 } from "@components/stateful";
import { Presenter, PresenterBox, ResizablePresenter, ResizablePresenterBox, Usage } from "@internal";
import { AnchorNav, Button, ButtonSecondary, ButtonZone, ButtonSecondaryZone, Decorator } from "@components/stateless";
import { FC } from "react";

// ================================================================================
// BUTTON
// ================================================================================

const BUTTON_IMPORT = `
import { Button } from "@anovel/uikit/components/stateless";
`;

const BUTTON_USAGE = `
const Default = () => <Button onClick={doSomething}>Click me !</Button>;

const TypeSubmit = () => <Button type="submit">Click me !</Button>;

const WithDecorator = () =>  <Button decorator="important">Click me !</Button>;

const Disabled = () => <Button disabled>Cannot click :(</Button>;
`;

// ================================================================================
// BUTTON SECONDARY
// ================================================================================

const BUTTON_SECONDARY_IMPORT = `
import { ButtonSecondary } from "@anovel/uikit/components/stateless";
`;

const BUTTON_SECONDARY_USAGE = `
const Default = () => <ButtonSecondary onclick={doSomething}>Click me !</ButtonSecondary>;

const TypeLink = () => <ButtonSecondary type="link" href="/app">Click me !</ButtonSecondary>;

const Disabled = () => <ButtonSecondary disabled>Cannot click :(</ButtonSecondary>;`;

// ================================================================================
// BUTTON ZONE
// ================================================================================

const BUTTON_ZONE_IMPORT = `
import { ButtonZone, Button } from "@anovel/uikit/components/stateless";
`;

const BUTTON_ZONE_USAGE = `
const Default = () => (
  <ButtonZone>
    <Button>Click me !</Button>
    <Button decorator="important">Click me !</Button>
  </ButtonZone>
);
`;

// ================================================================================
// BUTTON ZONE SECONDARY
// ================================================================================

const BUTTON_ZONE_SECONDARY_IMPORT = `
import { ButtonSecondaryZone, ButtonSecondary } from "@anovel/uikit/components/stateless";
`;

const BUTTON_ZONE_SECONDARY_USAGE = `
const Default = (
  <ButtonSecondaryZone>
    <ButtonSecondary>Click me !</ButtonSecondary>
    <ButtonSecondary>Don't click me !</ButtonSecondary>
  </ButtonSecondaryZone>
);

const WithAlignment = (
  <ButtonSecondaryZone align="right">
    <ButtonSecondary>Click me !</ButtonSecondary>
    <ButtonSecondary>Don't click me !</ButtonSecondary>
  </ButtonSecondaryZone>
);
`;

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  button: "Button",
  button_nav: {
    default: "Default",
    states: "States",
    responsive: "Responsive",
  },
  button_secondary: "Button Secondary",
  button_secondary_nav: {
    default: "Default",
    alt_modes: "Alt Modes",
    responsive: "Responsive",
  },
  button_zone: "Button Zone",
  button_zone_secondary: "Button Secondary Zone",
};

// ================================================================================
// COMPONENT
// ================================================================================

interface SingleButtonStatesPresenterProps {
  decorator?: Decorator;
}

const SingleButtonStatesPresenter: FC<SingleButtonStatesPresenterProps> = ({ decorator }) => (
  <>
    <PresenterBox title={decorator || "default"}>
      <Button decorator={decorator}>Click me !</Button>
    </PresenterBox>
    <PresenterBox title={`${decorator || "default"} hover`}>
      <Button decorator={decorator} className="hover">
        Click me !
      </Button>
    </PresenterBox>
  </>
);

export const PageComponent = () => (
  <section>
    <h1>UI Buttons</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={H2} id="button">
        {NAV_PARAMS.button}
      </TitleAnchor>

      <Usage import={BUTTON_IMPORT} code={BUTTON_USAGE} />

      <TitleAnchor renderer="h3" id="button_nav_default">
        {NAV_PARAMS.button_nav.default}
      </TitleAnchor>
      <Presenter>
        <SingleButtonStatesPresenter />
        <PresenterBox title="disabled">
          <Button className="disabled">Click me !</Button>
        </PresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="button_nav_states">
        {NAV_PARAMS.button_nav.states}
      </TitleAnchor>
      <Presenter>
        <SingleButtonStatesPresenter decorator="important" />
        <SingleButtonStatesPresenter decorator="premium" />
        <SingleButtonStatesPresenter decorator="warning" />
        <SingleButtonStatesPresenter decorator="danger" />
      </Presenter>

      <TitleAnchor renderer="h3" id="button_nav_responsive">
        {NAV_PARAMS.button_nav.responsive}
      </TitleAnchor>
      <Presenter>
        <Button>I am a button with a longer text, but it&apos;s ok</Button>
        <div style={{ maxWidth: "16rem" }}>
          <Button>I am a button with a text so long, I have to add extra lines in order to fit my big text</Button>
        </div>
      </Presenter>
    </section>

    <section>
      <TitleAnchor renderer={H2} id="button_secondary">
        {NAV_PARAMS.button_secondary}
      </TitleAnchor>

      <Usage import={BUTTON_SECONDARY_IMPORT} code={BUTTON_SECONDARY_USAGE} />

      <TitleAnchor renderer="h3" id="button_secondary_nav_default">
        {NAV_PARAMS.button_secondary_nav.default}
      </TitleAnchor>
      <Presenter>
        <PresenterBox title="default">
          <ButtonSecondary>Click me !</ButtonSecondary>
        </PresenterBox>
        <PresenterBox title="hover">
          <ButtonSecondary className="hover">Click me !</ButtonSecondary>
        </PresenterBox>
        <PresenterBox title="disabled">
          <ButtonSecondary className="disabled">Click me !</ButtonSecondary>
        </PresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="button_secondary_nav_alt_modes">
        {NAV_PARAMS.button_secondary_nav.alt_modes}
      </TitleAnchor>
      <Presenter>
        <PresenterBox title="link">
          <ButtonSecondary href="/" type="link">
            Click me !
          </ButtonSecondary>
        </PresenterBox>
        <PresenterBox title="link hover">
          <ButtonSecondary href="/" className="hover" type="link">
            Click me !
          </ButtonSecondary>
        </PresenterBox>
        <PresenterBox title="link disabled">
          <ButtonSecondary href="/" className="disabled" type="link">
            Click me !
          </ButtonSecondary>
        </PresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="button_secondary_nav_responsive">
        {NAV_PARAMS.button_secondary_nav.responsive}
      </TitleAnchor>
      <Presenter>
        <ButtonSecondary>I am a button with a longer text, but it&apos;s ok</ButtonSecondary>
        <div style={{ maxWidth: "16rem" }}>
          <ButtonSecondary>
            I am a button with a text so long, I have to add extra lines in order to fit my big text
          </ButtonSecondary>
        </div>
      </Presenter>
    </section>

    <section>
      <TitleAnchor renderer={H2} id="button_zone">
        {NAV_PARAMS.button_zone}
      </TitleAnchor>

      <Usage import={BUTTON_ZONE_IMPORT} code={BUTTON_ZONE_USAGE} />

      <ResizablePresenter>
        <ResizablePresenterBox
          minWidth="12rem"
          minHeight="8rem"
          width="31rem"
          title="standard - 1 button"
          withFoam="vertical"
        >
          <ButtonZone>
            <Button>Click me !</Button>
          </ButtonZone>
        </ResizablePresenterBox>
        <ResizablePresenterBox
          minWidth="12rem"
          minHeight="8rem"
          width="31rem"
          title="standard - 2 buttons"
          withFoam="vertical"
        >
          <ButtonZone>
            <Button>Click me !</Button>
            <Button decorator="important" onClick={() => console.log("douchebag")}>
              Don&apos;t click me !
            </Button>
          </ButtonZone>
        </ResizablePresenterBox>
        <ResizablePresenterBox minWidth="12rem" minHeight="8rem" width="30rem" title="gigamix" withFoam="vertical">
          <ButtonZone>
            <Button>Click me !</Button>
            <Button decorator="danger">I am a button with a longer text</Button>
            <Button decorator="important" onClick={() => console.log("douchebag")}>
              Don&apos;t click me !
            </Button>
          </ButtonZone>
        </ResizablePresenterBox>
      </ResizablePresenter>
    </section>

    <section>
      <TitleAnchor renderer={H2} id="button_zone_secondary">
        {NAV_PARAMS.button_zone_secondary}
      </TitleAnchor>

      <Usage import={BUTTON_ZONE_SECONDARY_IMPORT} code={BUTTON_ZONE_SECONDARY_USAGE} />

      <ResizablePresenter>
        <ResizablePresenterBox
          minWidth="12rem"
          minHeight="8rem"
          width="28rem"
          title="standard - 1 button"
          withFoam="vertical"
        >
          <ButtonSecondaryZone>
            <ButtonSecondary>Click me !</ButtonSecondary>
          </ButtonSecondaryZone>
        </ResizablePresenterBox>
        <ResizablePresenterBox
          minWidth="12rem"
          minHeight="8rem"
          width="28rem"
          title="standard - 2 buttons"
          withFoam="vertical"
        >
          <ButtonSecondaryZone>
            <ButtonSecondary>Click me !</ButtonSecondary>
            <ButtonSecondary onClick={() => console.log("douchebag")}>Don&apos;t click me !</ButtonSecondary>
          </ButtonSecondaryZone>
        </ResizablePresenterBox>
        <ResizablePresenterBox minWidth="12rem" minHeight="8rem" width="30rem" title="gigamix" withFoam="vertical">
          <ButtonSecondaryZone>
            <ButtonSecondary>Click me !</ButtonSecondary>
            <ButtonSecondary>I am a button with a longer text</ButtonSecondary>
            <ButtonSecondary onClick={() => console.log("douchebag")}>Don&apos;t click me !</ButtonSecondary>
          </ButtonSecondaryZone>
        </ResizablePresenterBox>
        <ResizablePresenterBox
          minWidth="12rem"
          minHeight="8rem"
          width="28rem"
          title="align - center"
          withFoam="vertical"
        >
          <ButtonSecondaryZone align="center">
            <ButtonSecondary>Click me !</ButtonSecondary>
            <ButtonSecondary onClick={() => console.log("douchebag")}>Don&apos;t click me !</ButtonSecondary>
          </ButtonSecondaryZone>
        </ResizablePresenterBox>
        <ResizablePresenterBox
          minWidth="12rem"
          minHeight="8rem"
          width="28rem"
          title="align - right"
          withFoam="vertical"
        >
          <ButtonSecondaryZone align="right">
            <ButtonSecondary>Click me !</ButtonSecondary>
            <ButtonSecondary onClick={() => console.log("douchebag")}>Don&apos;t click me !</ButtonSecondary>
          </ButtonSecondaryZone>
        </ResizablePresenterBox>
      </ResizablePresenter>
    </section>
  </section>
);
