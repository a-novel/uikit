"use client";

import SearchIcon from "@public/icons/monochrome/search.svg";

import { FC, MutableRefObject } from "react";

import {
  INFINITE_FEED_EMPTY_QUERY,
  InfiniteFeed,
  InfiniteFeedElementProps,
  InlineFeedElementProps,
  InlineFeedRenderer,
  Skeleton,
  TitleAnchor,
} from "@components/stateful";
import { AnchorNav } from "@components/stateless";

import { ResizablePresenter, ResizablePresenterBox } from "@internal";

// ================================================================================
// NAVIGATION
// ================================================================================

const NAV_PARAMS = {
  default: "Default",
};

// ================================================================================
// COMPONENT
// ================================================================================

interface colorsAPIQuery {
  limit: number;
  offset: number;
}

interface Color {
  color: string;
  id: string;
}

const colorsAPI = async ({ limit, offset }: colorsAPIQuery) => {
  const colors = ["var(--blue-tertiary)", "var(--green-tertiary)", "var(--gold-tertiary)", "var(--purple-tertiary)"];

  const results: Color[] = Array.from({ length: 120 }, (_, i) => ({
    id: `${offset + i}`,
    color: colors[Math.floor(i / 30)],
  }));

  return { data: results.slice(offset, offset + limit), total: 120 };
};

const colorsAPIEmpty = async ({ limit, offset }: colorsAPIQuery) => ({ data: [], total: 0 });

const colorsAPIDelayed = async ({ limit, offset }: colorsAPIQuery) => {
  await new Promise((resolve) => setTimeout(resolve, 10000));
  return await colorsAPI({ limit, offset });
};

const RenderColor: FC<InlineFeedElementProps<Color>> = ({ data: { color }, trigger, elementRef }) => (
  <div
    ref={elementRef as MutableRefObject<HTMLDivElement | null>}
    style={{
      borderStyle: "solid",
      borderWidth: "thin",
      borderColor: color,
      color,
      backgroundColor: trigger ? undefined : color,
      height: "6rem",
      borderRadius: "var(--border-radius)",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    {trigger ? "TRIGGER RELOAD" : ""}
  </div>
);

const renderColors = (colors: InfiniteFeedElementProps<Color>[]) => (
  <InlineFeedRenderer render={RenderColor} values={colors} />
);

export const PageComponent = () => (
  <section>
    <h1>UI Steppers</h1>
    <AnchorNav params={NAV_PARAMS} />

    <section>
      <TitleAnchor renderer={"h2"} id="default">
        {NAV_PARAMS.default}
      </TitleAnchor>

      <ResizablePresenter>
        <ResizablePresenterBox width="40rem" height="30rem" title="normal">
          <InfiniteFeed
            api={colorsAPI}
            render={renderColors}
            emptyIcon={<SearchIcon />}
            emptyText="No results."
            batchSize={30}
            params={INFINITE_FEED_EMPTY_QUERY}
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox width="40rem" height="30rem" title="with results count">
          <InfiniteFeed
            style={{ borderRadius: "var(--border-radius)" }}
            api={colorsAPI}
            render={renderColors}
            emptyIcon={<SearchIcon />}
            emptyText="No results."
            batchSize={30}
            params={INFINITE_FEED_EMPTY_QUERY}
            displayTotal={(total: number, loaded: number) => `${total} results (${loaded} loaded)`}
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox width="40rem" height="30rem" title="with loader">
          <InfiniteFeed
            api={colorsAPIDelayed}
            render={renderColors}
            emptyIcon={<SearchIcon />}
            emptyText="No results."
            batchSize={30}
            params={INFINITE_FEED_EMPTY_QUERY}
            loader={
              <Skeleton
                style={{
                  width: "calc(100% - 1.2rem)",
                  boxSizing: "border-box",
                  margin: ".6rem",
                  flexShrink: "0",
                  height: "6rem",
                  borderRadius: "var(--border-radius)",
                }}
              />
            }
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox width="40rem" height="30rem" title="no results">
          <InfiniteFeed
            api={colorsAPIEmpty}
            render={renderColors}
            emptyIcon={<SearchIcon />}
            emptyText="No results."
            batchSize={30}
            params={INFINITE_FEED_EMPTY_QUERY}
          />
        </ResizablePresenterBox>
        <ResizablePresenterBox width="40rem" height="30rem" title="error">
          <InfiniteFeed
            api={colorsAPIEmpty}
            render={renderColors}
            emptyIcon={<SearchIcon />}
            emptyText="No results."
            errorIcon={<SearchIcon />}
            errorText="No results."
            batchSize={30}
            params={INFINITE_FEED_EMPTY_QUERY}
          />
        </ResizablePresenterBox>
      </ResizablePresenter>
    </section>
  </section>
);
