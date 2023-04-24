"use client";

import { TitleAnchor, H2 } from "@components/stateful";
import { Presenter, PresenterBox, ResizablePresenter, ResizablePresenterBox } from "@internal/index";
import {
  AnchorNav,
  APILoaderNotification,
  Notification,
  NotificationContentBasic,
  NotificationContentClosable,
  NotificationContentWithIcon,
  NotificationContentWithTitle,
  NotificationsZone,
} from "@components/stateless";
import { FC, ReactNode } from "react";

import TacosIcon from "@public/icons/colored/tacos.svg";

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  item: "Item",
  item_nav: {
    contents: "Contents",
    decorators: "Decorators",
    combos: "Combos",
    special: "Special",
  },
  zone: "Zone",
  zone_nav: {
    default: "Default",
  },
};

// ================================================================================
// COMPONENT
// ================================================================================

const NotificationPresenterBox: FC<{ children: ReactNode; title: string }> = ({ children, title }) => (
  <PresenterBox style={{ width: "16rem" }} title={title}>
    {children}
  </PresenterBox>
);

export const PageComponent = () => (
  <section>
    <h1>UI Notifications</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={H2} id="item">
        {NAV_PARAMS.item}
      </TitleAnchor>

      <TitleAnchor renderer="h3" id="item_nav_contents">
        {NAV_PARAMS.item_nav.contents}
      </TitleAnchor>
      <Presenter>
        <NotificationPresenterBox title="basic content">
          <Notification>
            <NotificationContentBasic>I am a notification</NotificationContentBasic>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="basic content - long">
          <Notification>
            <NotificationContentBasic>
              I am a notification with a longer text and lot of extra useful information for the user about its current
              and latest actions. Please read me till the end or your machine will explode.
            </NotificationContentBasic>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="with title">
          <Notification>
            <NotificationContentWithTitle title="About me">I am a notification</NotificationContentWithTitle>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="with title - long">
          <Notification>
            <NotificationContentWithTitle title="I am a long notification title with way more content than what I should have">
              I am a notification with a longer text and lot of extra useful information for the user about its current
              and latest actions. Please read me till the end or your machine will explode.
            </NotificationContentWithTitle>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="with icon">
          <Notification>
            <NotificationContentWithIcon icon={<TacosIcon />}>I am a notification</NotificationContentWithIcon>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="with icon - long">
          <Notification>
            <NotificationContentWithIcon icon={<TacosIcon />}>
              I am a notification with a longer text and lot of extra useful information for the user about its current
              and latest actions. Please read me till the end or your machine will explode.
            </NotificationContentWithIcon>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="closable">
          <Notification>
            <NotificationContentClosable>I am a notification</NotificationContentClosable>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="closable - long">
          <Notification>
            <NotificationContentClosable>
              I am a notification with a longer text and lot of extra useful information for the user about its current
              and latest actions. Please read me till the end or your machine will explode.
            </NotificationContentClosable>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="closable - hover">
          <Notification>
            <NotificationContentClosable hoverCloseButton>I am a notification</NotificationContentClosable>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="closable - long hover">
          <Notification>
            <NotificationContentClosable hoverCloseButton>
              I am a notification with a longer text and lot of extra useful information for the user about its current
              and latest actions. Please read me till the end or your machine will explode.
            </NotificationContentClosable>
          </Notification>
        </NotificationPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="item_nav_decorators">
        {NAV_PARAMS.item_nav.decorators}
      </TitleAnchor>
      <Presenter>
        <NotificationPresenterBox title="standard">
          <Notification decorator="standard">
            <NotificationContentBasic>I am a notification</NotificationContentBasic>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="important">
          <Notification decorator="important">
            <NotificationContentBasic>I am a notification</NotificationContentBasic>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="premium">
          <Notification decorator="premium">
            <NotificationContentBasic>I am a notification</NotificationContentBasic>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="warning">
          <Notification decorator="warning">
            <NotificationContentBasic>I am a notification</NotificationContentBasic>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="danger">
          <Notification decorator="danger">
            <NotificationContentBasic>I am a notification</NotificationContentBasic>
          </Notification>
        </NotificationPresenterBox>
      </Presenter>
      <Presenter>
        <NotificationPresenterBox title="standard - with title">
          <Notification decorator="standard">
            <NotificationContentWithTitle title="About me">I am a notification</NotificationContentWithTitle>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="important - with title">
          <Notification decorator="important">
            <NotificationContentWithTitle title="About me">I am a notification</NotificationContentWithTitle>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="premium - with title">
          <Notification decorator="premium">
            <NotificationContentWithTitle title="About me">I am a notification</NotificationContentWithTitle>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="warning - with title">
          <Notification decorator="warning">
            <NotificationContentWithTitle title="About me">I am a notification</NotificationContentWithTitle>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="danger - with title">
          <Notification decorator="danger">
            <NotificationContentWithTitle title="About me">I am a notification</NotificationContentWithTitle>
          </Notification>
        </NotificationPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="item_nav_combos">
        {NAV_PARAMS.item_nav.combos}
      </TitleAnchor>
      <Presenter>
        <NotificationPresenterBox title="with title and icon">
          <Notification>
            <NotificationContentWithIcon icon={<TacosIcon />}>
              <NotificationContentWithTitle title="About me">I am a notification</NotificationContentWithTitle>
            </NotificationContentWithIcon>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="with title and closable">
          <Notification>
            <NotificationContentClosable>
              <NotificationContentWithTitle title="About me">I am a notification</NotificationContentWithTitle>
            </NotificationContentClosable>
          </Notification>
        </NotificationPresenterBox>
        <NotificationPresenterBox title="with title and icon and closable">
          <Notification>
            <NotificationContentClosable>
              <NotificationContentWithIcon icon={<TacosIcon />}>
                <NotificationContentWithTitle title="About me">I am a notification</NotificationContentWithTitle>
              </NotificationContentWithIcon>
            </NotificationContentClosable>
          </Notification>
        </NotificationPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="item_nav_special">
        {NAV_PARAMS.item_nav.special}
      </TitleAnchor>
      <Presenter>
        <NotificationPresenterBox title="api loader">
          <APILoaderNotification>Loading something...</APILoaderNotification>
        </NotificationPresenterBox>
      </Presenter>
    </section>

    <section>
      <TitleAnchor renderer={H2} id="zone">
        {NAV_PARAMS.zone}
      </TitleAnchor>

      <TitleAnchor renderer="h3" id="zone_nav_default">
        {NAV_PARAMS.zone_nav.default}
      </TitleAnchor>
      <ResizablePresenter>
        <ResizablePresenterBox withFoam="horizontal" width="25rem" height="30rem" title="default">
          <NotificationsZone>
            <APILoaderNotification>Loading something...</APILoaderNotification>
            <Notification>
              <NotificationContentBasic>I am a notification</NotificationContentBasic>
            </Notification>
            <Notification>
              <NotificationContentWithIcon icon={<TacosIcon />}>I am a notification</NotificationContentWithIcon>
            </Notification>
          </NotificationsZone>
        </ResizablePresenterBox>
      </ResizablePresenter>
    </section>
  </section>
);
