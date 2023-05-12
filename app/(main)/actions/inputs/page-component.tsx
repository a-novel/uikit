"use client";

import BurgerIcon from "@public/icons/colored/burger.svg";
import PizzaIcon from "@public/icons/colored/pizza.svg";
import TacosIcon from "@public/icons/colored/tacos.svg";
import SearchIcon from "@public/icons/monochrome/search.svg";
import SendIcon from "@public/icons/monochrome/send.svg";
import checkLottie from "@public/lottie/text-input/check.json";

import { FC, ReactNode } from "react";

import {
  DateInput,
  DateInputValidated,
  ISO_FR,
  ISO_GREGORIAN_CALENDAR,
  ISO_GREGORIAN_WEEK_START,
  InputBasic,
  InputDate,
  InputToolbox,
  InputValidationMessageWithAction,
  PasswordInput,
  PasswordValidatedInput,
  SearchInput,
  SelectInput,
  SelectInputValidated,
  SelectItemWithIcon,
  SexInput,
  SexInputValidated,
  TextArea,
  TextInput,
  TextInputValidated,
  TextInputValidationMessages,
  TitleAnchor,
  WithInputValidation,
} from "@components/stateful";
import { AnchorNav } from "@components/stateless";
import { Player } from "@lottiefiles/react-lottie-player";

import { Presenter, PresenterBox, PresenterBoxProps } from "@internal";

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  basic: "Basic Input",
  basic_nav: {
    default: "Default",
    states: "States",
  },
  text_area: "TextArea Input",
  text_area_nav: {
    default: "Default",
    states: "States",
  },
  children: "Children",
  children_nav: {
    toolbox: "Toolbox",
    validation: "Validation",
  },
  date: "Date",
  date_nav: {
    default: "Default",
    validation: "With validation",
  },
  select: "Select",
  select_nav: {
    default: "Default",
    renderers: "Renderers",
    validation: "With validation",
  },
  special: "Special",
  special_nav: {
    text: "Text",
    text_validation: "Text - with validation",
    password: "Password",
    password_validation: "Password - with validation",
    search: "Search",
    sex: "Sex",
    sex_validation: "Sex - with validation",
  },
};

// ================================================================================
// COMPONENT
// ================================================================================

const InputPresenterBox: FC<PresenterBoxProps> = ({ style, ...props }) => (
  <PresenterBox {...props} style={{ width: "16rem", gap: ".6rem", ...style }} />
);

const InputDateOpenedPresenterBox: FC<{ children: ReactNode; title: string }> = ({ children, title }) => (
  <InputPresenterBox style={{ width: "32rem" }} title={title}>
    <div style={{ width: "16rem", paddingLeft: "16rem", paddingTop: "15rem" }}>{children}</div>
  </InputPresenterBox>
);

const InputSelectOpenedPresenterBox: FC<{ children: ReactNode; title: string; height: string }> = ({
  children,
  title,
  height,
}) => (
  <InputPresenterBox title={title}>
    <div style={{ paddingBottom: height }}>{children}</div>
  </InputPresenterBox>
);

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
  minDate: new InputDate({ year: 2011, month: 7, day: 11 }),
  maxDate: new InputDate({ year: 2030, month: 7, day: 11 }),
  defaultDate: new InputDate({ year: 2020, month: 6, day: 15 }),
};

export const PageComponent = () => (
  <section>
    <h1>UI Inputs</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={"h2"} id="basic">
        {NAV_PARAMS.basic}
      </TitleAnchor>

      <TitleAnchor renderer="h3" id="basic_nav_default">
        {NAV_PARAMS.basic_nav.default}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <InputBasic label="foo" value="" />
        </InputPresenterBox>
        <InputPresenterBox title="with placeholder">
          <InputBasic label="foo" value="" placeholder="hello world" />
        </InputPresenterBox>
        <InputPresenterBox title="with value">
          <InputBasic label="foo" value="Bar" />
        </InputPresenterBox>
        <InputPresenterBox title="with long value">
          <InputBasic
            label="foo"
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        </InputPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="basic_nav_states">
        {NAV_PARAMS.basic_nav.states}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="focused">
          <InputBasic label="foo" value="Bar" className="focus-within" />
        </InputPresenterBox>
        <InputPresenterBox title="valid">
          <InputBasic label="foo" value="Bar" decorator="valid" />
        </InputPresenterBox>
        <InputPresenterBox title="warning">
          <InputBasic label="foo" value="Bar" decorator="warning" />
        </InputPresenterBox>
        <InputPresenterBox title="error">
          <InputBasic label="foo" value="Bar" decorator="error" />
        </InputPresenterBox>
        <InputPresenterBox title="disabled">
          <InputBasic label="foo" value="Bar" disabled />
        </InputPresenterBox>
        <InputPresenterBox title="no label">
          <InputBasic value="Bar" />
        </InputPresenterBox>
      </Presenter>
      <Presenter style={{ flexDirection: "column" }}>
        <InputPresenterBox title="with helper text">
          <InputBasic
            label="foo"
            value="Bar"
            helper={
              <span>
                Some <strong>important</strong> information.
              </span>
            }
          />
        </InputPresenterBox>
        <InputPresenterBox title="with helper text - long">
          <InputBasic
            label="foo"
            value="Bar"
            helper={
              <span>
                Some <strong>important</strong> information about the current input, so the user understands better what
                value is expected and why it is asked.
              </span>
            }
          />
        </InputPresenterBox>
      </Presenter>
    </section>

    <section>
      <TitleAnchor renderer={"h2"} id="text_area">
        {NAV_PARAMS.text_area}
      </TitleAnchor>

      <TitleAnchor renderer="h3" id="text_area_nav_default">
        {NAV_PARAMS.text_area_nav.default}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <TextArea label="foo" value="" />
        </InputPresenterBox>
        <InputPresenterBox title="with placeholder">
          <TextArea label="foo" value="" placeholder="hello world" />
        </InputPresenterBox>
        <InputPresenterBox title="with value">
          <TextArea label="foo" value="Bar" />
        </InputPresenterBox>
        <InputPresenterBox title="with long value capped">
          <TextArea
            label="foo"
            style={{ maxHeight: "4rem" }}
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        </InputPresenterBox>
        <InputPresenterBox title="with long value">
          <TextArea
            label="foo"
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        </InputPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="text_area_nav_states">
        {NAV_PARAMS.text_area_nav.states}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="focused">
          <TextArea label="foo" value="Bar" className="focus-within" />
        </InputPresenterBox>
        <InputPresenterBox title="valid">
          <TextArea label="foo" value="Bar" decorator="valid" />
        </InputPresenterBox>
        <InputPresenterBox title="warning">
          <TextArea label="foo" value="Bar" decorator="warning" />
        </InputPresenterBox>
        <InputPresenterBox title="error">
          <TextArea label="foo" value="Bar" decorator="error" />
        </InputPresenterBox>
        <InputPresenterBox title="disabled">
          <TextArea label="foo" value="Bar" disabled />
        </InputPresenterBox>
        <InputPresenterBox title="no label">
          <TextArea value="Bar" />
        </InputPresenterBox>
      </Presenter>
    </section>

    <section>
      <TitleAnchor renderer={"h2"} id="children">
        {NAV_PARAMS.children}
      </TitleAnchor>

      <TitleAnchor renderer="h3" id="children_nav_toolbox">
        {NAV_PARAMS.children_nav.toolbox}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <InputBasic label="foo" value="Bar">
            <InputToolbox
              actions={[
                {
                  id: "search",
                  icon: <SearchIcon />,
                  onClick: () => {},
                },
                {
                  id: "send",
                  icon: <SendIcon />,
                  onClick: () => {},
                },
              ]}
            />
          </InputBasic>
        </InputPresenterBox>
        <InputPresenterBox title="icon hover">
          <InputBasic label="foo" value="Bar">
            <InputToolbox
              actions={[
                {
                  id: "search",
                  icon: <SearchIcon />,
                  onClick: () => {},
                  className: "hover",
                },
                {
                  id: "send",
                  icon: <SendIcon />,
                  onClick: () => {},
                },
              ]}
            />
          </InputBasic>
        </InputPresenterBox>
        <InputPresenterBox title="with overflow">
          <InputBasic
            label="foo"
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          >
            <InputToolbox
              actions={[
                {
                  id: "search",
                  icon: <SearchIcon />,
                  onClick: () => {},
                },
                {
                  id: "send",
                  icon: <SendIcon />,
                  onClick: () => {},
                },
              ]}
            />
          </InputBasic>
        </InputPresenterBox>
        <InputPresenterBox title="with text area - short">
          <TextArea label="foo" value="Bar">
            <InputToolbox
              actions={[
                {
                  id: "search",
                  icon: <SearchIcon />,
                  onClick: () => {},
                },
                {
                  id: "send",
                  icon: <SendIcon />,
                  onClick: () => {},
                },
              ]}
            />
          </TextArea>
        </InputPresenterBox>
        <InputPresenterBox title="with text area - long">
          <TextArea
            label="foo"
            style={{ maxHeight: "8rem" }}
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          >
            <InputToolbox
              actions={[
                {
                  id: "search",
                  icon: <SearchIcon />,
                  onClick: () => {},
                },
                {
                  id: "send",
                  icon: <SendIcon />,
                  onClick: () => {},
                },
              ]}
            />
          </TextArea>
        </InputPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="children_nav_validation">
        {NAV_PARAMS.children_nav.validation}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="no decorator">
          <WithInputValidation
            show
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="default">
          <WithInputValidation
            show
            decorator="default"
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="valid">
          <WithInputValidation
            show
            decorator="valid"
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="warning">
          <WithInputValidation
            show
            decorator="warning"
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="error">
          <WithInputValidation
            show
            decorator="error"
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="with toolbox">
          <WithInputValidation
            show
            decorator="default"
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                <InputToolbox
                  actions={[
                    {
                      id: "search",
                      icon: <SearchIcon />,
                      onClick: () => {},
                    },
                    {
                      id: "send",
                      icon: <SendIcon />,
                      onClick: () => {},
                    },
                  ]}
                />
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="hidden">
          <WithInputValidation
            show={false}
            decorator="default"
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                <InputToolbox
                  actions={[
                    {
                      id: "search",
                      icon: <SearchIcon />,
                      onClick: () => {},
                    },
                    {
                      id: "send",
                      icon: <SendIcon />,
                      onClick: () => {},
                    },
                  ]}
                />
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
      </Presenter>
      <Presenter style={{ flexDirection: "column" }}>
        <InputPresenterBox title="with message - no decorator">
          <WithInputValidation
            show
            className="focus-within"
            message="This is a message."
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="with message - default">
          <WithInputValidation
            show
            decorator="default"
            className="focus-within"
            message="This is a message."
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="with message - valid">
          <WithInputValidation
            show
            decorator="valid"
            className="focus-within"
            message="This is a message."
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="with message - warning">
          <WithInputValidation
            show
            decorator="warning"
            className="focus-within"
            message="This is a message."
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="with message - error">
          <WithInputValidation
            show
            decorator="error"
            className="focus-within"
            message="This is a message."
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="with message - hidden">
          <WithInputValidation
            show={false}
            decorator="default"
            className="focus-within"
            message="This is a message."
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                <InputToolbox
                  actions={[
                    {
                      id: "search",
                      icon: <SearchIcon />,
                      onClick: () => {},
                    },
                    {
                      id: "send",
                      icon: <SendIcon />,
                      onClick: () => {},
                    },
                  ]}
                />
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="with message - not focused">
          <WithInputValidation
            show
            decorator="default"
            message="This is a message."
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox style={{ padding: "2rem 0" }} title="with long message">
          <WithInputValidation
            show
            decorator="default"
            className="focus-within"
            message="This is a very long and informaive message about the status of the current input, with valuable information for the end user."
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox style={{ padding: "2rem 0" }} title="with action message">
          <WithInputValidation
            show
            decorator="default"
            className="focus-within"
            message={
              <InputValidationMessageWithAction buttonMessage="click me!">
                This is a message with an action.
              </InputValidationMessageWithAction>
            }
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox style={{ padding: "2rem 0" }} title="with action message hover">
          <WithInputValidation
            show
            decorator="default"
            className="focus-within"
            message={
              <InputValidationMessageWithAction className="button-hover" buttonMessage="click me!">
                This is a message with an action.
              </InputValidationMessageWithAction>
            }
            icon={<Player autoplay keepLastFrame src={checkLottie} />}
            renderer={(className, decorator, children) => (
              <TextInput value="Bar" className={className} decorator={decorator}>
                {children}
              </TextInput>
            )}
          />
        </InputPresenterBox>
      </Presenter>
    </section>

    <section>
      <TitleAnchor renderer={"h2"} id="date">
        {NAV_PARAMS.date}
      </TitleAnchor>

      <TitleAnchor renderer="h3" id="date_nav_default">
        {NAV_PARAMS.date_nav.default}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <DateInput
            uikit
            label="date"
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="placeholder">
          <DateInput
            uikit
            label="date"
            placeholder="jj-mm-aaaa"
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="value">
          <DateInput
            uikit
            label="date"
            placeholder="jj-mm-aaaa"
            value={new InputDate({ year: 2020, month: 1, day: 1 })}
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="hover">
          <DateInput
            uikit
            label="date"
            placeholder="jj-mm-aaaa"
            className="hover"
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="disabled">
          <DateInput
            uikit
            label="date"
            disabled
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputPresenterBox>
      </Presenter>
      <Presenter>
        <InputDateOpenedPresenterBox title="menu open - no value selected">
          <DateInput
            uikit
            label="date"
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            startOpen
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputDateOpenedPresenterBox>
        <InputDateOpenedPresenterBox title="menu open - value selected current month">
          <DateInput
            uikit
            label="date"
            value={new InputDate({ year: 2020, month: 6, day: 11 })}
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            startOpen
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputDateOpenedPresenterBox>
        <InputDateOpenedPresenterBox title="menu open - value selected another month">
          <DateInput
            uikit
            label="date"
            value={new InputDate({ year: 2020, month: 2, day: 11 })}
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            startOpen
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                forceDisplayMonth={6}
                {...props}
              />
            )}
          />
        </InputDateOpenedPresenterBox>
        <InputDateOpenedPresenterBox title="menu open - value selected another year">
          <DateInput
            uikit
            label="date"
            value={new InputDate({ year: 2019, month: 2, day: 11 })}
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            startOpen
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                forceDisplayMonth={6}
                forceDisplayYear={2020}
                {...props}
              />
            )}
          />
        </InputDateOpenedPresenterBox>
        <InputDateOpenedPresenterBox title="menu open - invalid year input">
          <DateInput
            uikit
            label="date"
            value={new InputDate({ year: 2020, month: 2, day: 11 })}
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            startOpen
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                forceDisplayMonth={6}
                forceDisplayYearInput={199}
                {...props}
              />
            )}
          />
        </InputDateOpenedPresenterBox>
        <InputDateOpenedPresenterBox title="menu open - lower limit">
          <DateInput
            uikit
            label="date"
            defaultDate={minMaxDates.minDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            startOpen
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputDateOpenedPresenterBox>
        <InputDateOpenedPresenterBox title="menu open - upper limit">
          <DateInput
            uikit
            label="date"
            defaultDate={minMaxDates.maxDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            startOpen
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputDateOpenedPresenterBox>
        <InputDateOpenedPresenterBox title="menu open - required (no selection)">
          <DateInput
            uikit
            required
            label="date"
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            startOpen
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputDateOpenedPresenterBox>
        <InputDateOpenedPresenterBox title="menu open - required">
          <DateInput
            uikit
            required
            label="date"
            value={new InputDate({ year: 2020, month: 5, day: 11 })}
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            startOpen
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputDateOpenedPresenterBox>
        <InputDateOpenedPresenterBox title="menu open - start week on wednesday">
          <DateInput
            uikit
            label="date"
            defaultDate={minMaxDates.defaultDate}
            minDate={minMaxDates.minDate}
            maxDate={minMaxDates.maxDate}
            startOpen
            formatter={ISO_FR}
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.WEDNESDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputDateOpenedPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="date_nav_validation">
        {NAV_PARAMS.date_nav.validation}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <DateInputValidated
            value={new InputDate({ year: 2020, month: 1, day: 1 })}
            formatter={ISO_FR}
            forceStatus="no-change"
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="valid">
          <DateInputValidated
            value={new InputDate({ year: 2020, month: 1, day: 1 })}
            formatter={ISO_FR}
            forceStatus="valid"
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="warning">
          <DateInputValidated
            value={new InputDate({ year: 2020, month: 1, day: 1 })}
            formatter={ISO_FR}
            forceStatus="warning"
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="error">
          <DateInputValidated
            value={new InputDate({ year: 2020, month: 1, day: 1 })}
            formatter={ISO_FR}
            forceStatus="error"
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputPresenterBox>
        <InputPresenterBox title="loading">
          <DateInputValidated
            value={new InputDate({ year: 2020, month: 1, day: 1 })}
            formatter={ISO_FR}
            forceStatus="loading"
            calendar={(props) => (
              <ISO_GREGORIAN_CALENDAR
                weekStart={ISO_GREGORIAN_WEEK_START.MONDAY}
                translations={GregorianCalendarTranslations}
                {...props}
              />
            )}
          />
        </InputPresenterBox>
      </Presenter>
    </section>

    <section>
      <TitleAnchor renderer={"h2"} id="select">
        {NAV_PARAMS.select}
      </TitleAnchor>

      <TitleAnchor renderer="h3" id="select_nav_default">
        {NAV_PARAMS.select_nav.default}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <SelectInput values={["foo", "bar"]} uikit />
        </InputPresenterBox>
        <InputPresenterBox title="placeholder">
          <SelectInput placeholder="choose wisely" values={["foo", "bar"]} uikit />
        </InputPresenterBox>
        <InputPresenterBox title="value">
          <SelectInput placeholder="choose wisely" values={["foo", "bar"]} value="foo" uikit />
        </InputPresenterBox>
        <InputPresenterBox title="value - required">
          <SelectInput placeholder="choose wisely" values={["foo", "bar"]} value="foo" required uikit />
        </InputPresenterBox>
        <InputPresenterBox title="disabled">
          <SelectInput placeholder="choose wisely" values={["foo", "bar"]} disabled uikit />
        </InputPresenterBox>
      </Presenter>
      <Presenter>
        <InputSelectOpenedPresenterBox height="10rem" title="menu open">
          <SelectInput values={["foo", "bar"]} uikit startOpen />
        </InputSelectOpenedPresenterBox>
        <InputSelectOpenedPresenterBox height="10rem" title="menu open - item hover">
          <SelectInput values={["foo", "bar"]} hoverValue="bar" uikit startOpen />
        </InputSelectOpenedPresenterBox>
        <InputSelectOpenedPresenterBox height="10rem" title="menu open - item selected">
          <SelectInput values={["foo", "bar"]} value="bar" uikit startOpen />
        </InputSelectOpenedPresenterBox>
        <InputSelectOpenedPresenterBox height="10rem" title="menu open - items overflow">
          <SelectInput
            values={["foo", "bar", "qux", "alpha", "beta", "gamma"]}
            maxListHeight="6.5rem"
            value="bar"
            uikit
            startOpen
          />
        </InputSelectOpenedPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="select_nav_renderers">
        {NAV_PARAMS.select_nav.renderers}
      </TitleAnchor>
      <Presenter>
        <InputSelectOpenedPresenterBox height="10rem" title="menu open">
          <SelectInput
            values={[
              { value: "tacos", render: <SelectItemWithIcon icon={<TacosIcon />} value="tacos" /> },
              { value: "pizza", render: <SelectItemWithIcon icon={<PizzaIcon />} value="pizza" /> },
              { value: "burger", render: <SelectItemWithIcon icon={<BurgerIcon />} value="burger" /> },
            ]}
            value="tacos"
            uikit
            startOpen
          />
        </InputSelectOpenedPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="select_nav_validation">
        {NAV_PARAMS.select_nav.validation}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <SelectInputValidated values={["foo", "bar"]} forceStatus="no-change" uikit />
        </InputPresenterBox>
        <InputPresenterBox title="valid">
          <SelectInputValidated values={["foo", "bar"]} forceStatus="valid" uikit />
        </InputPresenterBox>
        <InputPresenterBox title="warning">
          <SelectInputValidated values={["foo", "bar"]} forceStatus="warning" uikit />
        </InputPresenterBox>
        <InputPresenterBox title="error">
          <SelectInputValidated values={["foo", "bar"]} forceStatus="error" uikit />
        </InputPresenterBox>
        <InputPresenterBox title="loading">
          <SelectInputValidated values={["foo", "bar"]} forceStatus="loading" uikit />
        </InputPresenterBox>
      </Presenter>
    </section>

    <section>
      <TitleAnchor renderer={"h2"} id="special">
        {NAV_PARAMS.special}
      </TitleAnchor>

      <TitleAnchor renderer="h3" id="special_nav_text">
        {NAV_PARAMS.special_nav.text}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <TextInput value="Bar" />
        </InputPresenterBox>
        <InputPresenterBox title="with overflow">
          <TextInput value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
        </InputPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="special_nav_text_validation">
        {NAV_PARAMS.special_nav.text_validation}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <TextInputValidated messages={defaultMessages} value="Bar" forceStatus="no-change" />
        </InputPresenterBox>
        <InputPresenterBox title="typing">
          <TextInputValidated messages={defaultMessages} value="Bar" forceStatus="typing" />
        </InputPresenterBox>
        <InputPresenterBox title="valid">
          <TextInputValidated messages={defaultMessages} value="Bar" forceStatus="valid" />
        </InputPresenterBox>
        <InputPresenterBox title="warning">
          <TextInputValidated messages={defaultMessages} value="Bar" forceStatus="warning" />
        </InputPresenterBox>
        <InputPresenterBox title="error">
          <TextInputValidated messages={defaultMessages} value="Bar" forceStatus="error" />
        </InputPresenterBox>
        <InputPresenterBox title="loading">
          <TextInputValidated messages={defaultMessages} value="Bar" forceStatus="loading" />
        </InputPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="special_nav_password">
        {NAV_PARAMS.special_nav.password}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <PasswordInput value="Bar" />
        </InputPresenterBox>
        <InputPresenterBox title="visible">
          <PasswordInput initialVisibility value="Bar" />
        </InputPresenterBox>
        <InputPresenterBox title="with overflow">
          <PasswordInput value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
        </InputPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="special_nav_password_validation">
        {NAV_PARAMS.special_nav.password_validation}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <PasswordValidatedInput messages={defaultMessages} value="Bar" forceStatus="no-change" />
        </InputPresenterBox>
        <InputPresenterBox title="typing">
          <PasswordValidatedInput messages={defaultMessages} value="Bar" forceStatus="typing" />
        </InputPresenterBox>
        <InputPresenterBox title="valid">
          <PasswordValidatedInput messages={defaultMessages} value="Bar" forceStatus="valid" />
        </InputPresenterBox>
        <InputPresenterBox title="warning">
          <PasswordValidatedInput messages={defaultMessages} value="Bar" forceStatus="warning" />
        </InputPresenterBox>
        <InputPresenterBox title="error">
          <PasswordValidatedInput messages={defaultMessages} value="Bar" forceStatus="error" />
        </InputPresenterBox>
        <InputPresenterBox title="loading">
          <PasswordValidatedInput messages={defaultMessages} value="Bar" forceStatus="loading" />
        </InputPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="special_nav_search">
        {NAV_PARAMS.special_nav.search}
      </TitleAnchor>
      <Presenter>
        <InputPresenterBox title="default">
          <SearchInput value="Bar" />
        </InputPresenterBox>
        <InputPresenterBox title="with overflow">
          <SearchInput value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." />
        </InputPresenterBox>
        <InputPresenterBox title="inline">
          <SearchInput
            inline
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        </InputPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="special_nav_sex">
        {NAV_PARAMS.special_nav.sex}
      </TitleAnchor>
      <Presenter>
        <InputSelectOpenedPresenterBox height="10rem" title="default">
          <SexInput translations={SexInputTranslations} value="female" uikit startOpen />
        </InputSelectOpenedPresenterBox>
      </Presenter>

      <TitleAnchor renderer="h3" id="special_nav_sex_validation">
        {NAV_PARAMS.special_nav.sex_validation}
      </TitleAnchor>
      <Presenter>
        <InputSelectOpenedPresenterBox height="10rem" title="default">
          <SexInputValidated
            translations={SexInputTranslations}
            value="female"
            forceStatus="no-change"
            uikit
            startOpen
          />
        </InputSelectOpenedPresenterBox>
        <InputSelectOpenedPresenterBox height="10rem" title="valid">
          <SexInputValidated translations={SexInputTranslations} value="female" forceStatus="valid" uikit startOpen />
        </InputSelectOpenedPresenterBox>
        <InputSelectOpenedPresenterBox height="10rem" title="warning">
          <SexInputValidated translations={SexInputTranslations} value="female" forceStatus="warning" uikit startOpen />
        </InputSelectOpenedPresenterBox>
        <InputSelectOpenedPresenterBox height="10rem" title="error">
          <SexInputValidated translations={SexInputTranslations} value="female" forceStatus="error" uikit startOpen />
        </InputSelectOpenedPresenterBox>
        <InputSelectOpenedPresenterBox height="10rem" title="loading">
          <SexInputValidated translations={SexInputTranslations} value="female" forceStatus="loading" uikit startOpen />
        </InputSelectOpenedPresenterBox>
      </Presenter>
    </section>
  </section>
);
