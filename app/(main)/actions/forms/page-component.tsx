"use client";

import { FC, ReactNode } from "react";

import {
  DateInput,
  H2,
  ISOGregorianCalendarWeekStart,
  ISO_FR,
  ISO_GREGORIAN_CALENDAR,
  SexInput,
  TextInput,
  TextInputValidated,
  TextInputValidationMessages,
  TitleAnchor,
} from "@components/stateful";
import { AnchorNav, Button, ButtonZone, Form, FormInfoBox, FormRow } from "@components/stateless";

import { ResizablePresenter, ResizablePresenterBox } from "@internal";

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  basic: "Form",
  basic_nav: {
    default: "Default",
    row: "Row",
  },
  info_box: "Info Box",
  info_box_nav: {
    default: "Default",
    decorators: "Decorators",
  },
};

// ================================================================================
// COMPONENT
// ================================================================================

const defaultMessages: TextInputValidationMessages = {
  required: "required",
  tooShort: "too short",
  tooLong: "length limit",
  regexp: "regexp",
};

const GregorianCalendarTranslations = {
  months: {
    january: "Jan",
    february: "Feb",
    march: "Mar",
    april: "Apr",
    may: "May",
    june: "Jun",
    july: "Jul",
    august: "Aug",
    september: "Sep",
    october: "Oct",
    november: "Nov",
    december: "Dec",
  },
  weekdays: {
    monday: "Mon",
    tuesday: "Tue",
    wednesday: "Wed",
    thursday: "Thu",
    friday: "Fri",
    saturday: "Sat",
    sunday: "Sun",
  },
};

const SexInputTranslations = {
  male: "Male",
  female: "Female",
};

const minMaxDates = {
  minDate: { year: 2011, month: 7, day: 11 },
  maxDate: { year: 2030, month: 7, day: 11 },
  neutral: { year: 2020, month: 6, day: 15 },
};

const InfoBoxPresenter: FC<{ children: ReactNode; title: string }> = ({ children, title }) => (
  <ResizablePresenterBox width="32rem" title={title}>
    <div style={{ width: "28rem", padding: "2rem" }}>{children}</div>
  </ResizablePresenterBox>
);

export const PageComponent = () => (
  <section>
    <h1>UI Forms</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={H2} id="basic">
        {NAV_PARAMS.basic}
      </TitleAnchor>

      <TitleAnchor renderer="h3" id="basic_nav_default">
        {NAV_PARAMS.basic_nav.default}
      </TitleAnchor>
      <ResizablePresenter>
        <ResizablePresenterBox width="40rem" withFoam="horizontal" fillFoam="end" title="standard">
          <Form>
            <TextInputValidated
              messages={{ ...defaultMessages, customError: "This value is not valid." }}
              value="X"
              forceStatus="error"
              placeholder="Foooo"
              label="foo"
            />
            <TextInputValidated messages={defaultMessages} value="" minLength={10} placeholder="Barbar" label="bar" />
            <ButtonZone>
              <Button type="button">Send</Button>
              <Button type="button" decorator="important">
                Mega Send
              </Button>
            </ButtonZone>
          </Form>
        </ResizablePresenterBox>
        <ResizablePresenterBox width="60rem" withFoam="horizontal" fillFoam="end" title="large">
          <Form mode="large">
            <TextInputValidated
              messages={{ ...defaultMessages, customError: "This value is not valid." }}
              value="X"
              forceStatus="error"
              placeholder="Foooo"
              label="foo"
            />
            <TextInputValidated messages={defaultMessages} value="" minLength={10} placeholder="Barbar" label="bar" />
            <ButtonZone>
              <Button type="button">Send</Button>
              <Button type="button" decorator="important">
                Mega Send
              </Button>
              <Button
                type="button"
                onClick={() => console.log("FUCK YOU I WON'T DO WHAT YOU TELL ME")}
                decorator="danger"
              >
                Oh nonono
              </Button>
            </ButtonZone>
          </Form>
        </ResizablePresenterBox>
      </ResizablePresenter>

      <TitleAnchor renderer="h3" id="basic_nav_row">
        {NAV_PARAMS.basic_nav.row}
      </TitleAnchor>
      <ResizablePresenter>
        <ResizablePresenterBox width="40rem" withFoam="horizontal" fillFoam="end" title="standard">
          <Form>
            <TextInput value="" placeholder="Foooo" label="foo" />
            <FormRow>
              <SexInput translations={SexInputTranslations} value="male" label="sex" placeholder="Choose gender" />
              <DateInput
                label="date"
                placeholder="jj-mm-aaaa"
                value={{ year: 2020, month: 1, day: 1 }}
                neutral={minMaxDates.neutral}
                minDate={minMaxDates.minDate}
                maxDate={minMaxDates.maxDate}
                formatter={ISO_FR}
                calendar={(props) => (
                  <ISO_GREGORIAN_CALENDAR
                    weekStart={ISOGregorianCalendarWeekStart.MONDAY}
                    translations={GregorianCalendarTranslations}
                    {...props}
                  />
                )}
              />
            </FormRow>
            <TextInput value="" placeholder="Barbar" label="bar" />
            <ButtonZone>
              <Button type="button">Send</Button>
              <Button type="button" decorator="important">
                Mega Send
              </Button>
            </ButtonZone>
          </Form>
        </ResizablePresenterBox>
      </ResizablePresenter>
    </section>

    <section>
      <TitleAnchor renderer={H2} id="info_box">
        {NAV_PARAMS.info_box}
      </TitleAnchor>

      <TitleAnchor renderer="h3" id="info_box_nav_default">
        {NAV_PARAMS.info_box_nav.default}
      </TitleAnchor>
      <ResizablePresenter>
        <InfoBoxPresenter title="standard">
          <FormInfoBox decorator="standard">I am an info box</FormInfoBox>
        </InfoBoxPresenter>
        <InfoBoxPresenter title="long">
          <FormInfoBox decorator="standard">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </FormInfoBox>
        </InfoBoxPresenter>
        <InfoBoxPresenter title="closable">
          <FormInfoBox decorator="standard" onClose={() => console.log("clickity clockitiy")}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </FormInfoBox>
        </InfoBoxPresenter>
      </ResizablePresenter>

      <TitleAnchor renderer="h3" id="info_box_nav_decorators">
        {NAV_PARAMS.info_box_nav.decorators}
      </TitleAnchor>
      <ResizablePresenter>
        <InfoBoxPresenter title="standard">
          <FormInfoBox decorator="standard">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </FormInfoBox>
        </InfoBoxPresenter>
        <InfoBoxPresenter title="important">
          <FormInfoBox decorator="important">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </FormInfoBox>
        </InfoBoxPresenter>
        <InfoBoxPresenter title="premium">
          <FormInfoBox decorator="premium">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </FormInfoBox>
        </InfoBoxPresenter>
        <InfoBoxPresenter title="warning">
          <FormInfoBox decorator="warning">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </FormInfoBox>
        </InfoBoxPresenter>
        <InfoBoxPresenter title="danger">
          <FormInfoBox decorator="danger">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </FormInfoBox>
        </InfoBoxPresenter>
      </ResizablePresenter>
    </section>
  </section>
);
