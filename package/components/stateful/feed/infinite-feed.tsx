import css from "./infinite-feed.module.css";

import {
  HTMLAttributes,
  MutableRefObject,
  ReactNode,
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { mergeClassNames } from "@lib";

const DEFAULT_TRIGGER_ON_RECORDS_LEFT = 10;

export const INFINITE_FEED_EMPTY_QUERY = {};

interface InfiniteFeedCallbackParams {
  limit: number;
  offset: number;
}

interface InfiniteFeedCallbackResponseResult {
  id: string;
}

interface InfiniteFeedCallbackResponse<R> {
  data: (R & InfiniteFeedCallbackResponseResult)[];
  total: number;
}

export interface InfiniteFeedElementProps<R> {
  data: R;
  id: string;
  trigger: boolean;
  elementRef: MutableRefObject<HTMLElement | null>;
}

export type InfiniteFeedCallback<Q extends {}, R extends {}> = (
  query: Q & InfiniteFeedCallbackParams
) => Promise<InfiniteFeedCallbackResponse<R>>;

export type InfiniteFeedRenderer<R extends {}> = (values: InfiniteFeedElementProps<R>[]) => ReactNode;

export interface InfiniteFeedProps<Q extends {}, R extends {}> extends HTMLAttributes<HTMLDivElement> {
  /**
   * The API call to load new results.
   */
  api: InfiniteFeedCallback<Q, R>;
  /**
   * Optional error handler. By default, errors are ignored.
   */
  onError?: (error: unknown) => void;
  render: InfiniteFeedRenderer<R>;
  /**
   * Icon to display when no results are available. This only shows up after at least one successful api call.
   */
  emptyIcon: ReactNode;
  /**
   * Text to display when no results are available. This only shows up after at least one successful api call.
   */
  emptyText: string;
  /**
   * When set, replaces the results display with the error icon and text. It has to be set manually, as
   * overriding previously loaded result is not ideal in terms of user experience.
   */
  errorIcon?: ReactNode;
  /**
   * When set, replaces the results display with the error icon and text. It has to be set manually, as
   * overriding previously loaded result is not ideal in terms of user experience.
   */
  errorText?: string;
  /**
   * When set, only run initial call, and don't load more content on scroll.
   */
  staticFeed?: boolean;
  /**
   * Change the scrolling parent, from being the current container to the full page (document body).
   */
  fullPage?: boolean;
  /**
   * The number of rows to load per api call. This parameter is passed to the API, and used to determine whether
   * we reached the end of results.
   */
  batchSize: number;
  /**
   * A function that returns a Node to display the total number of results. When set, a sticky bar
   * will appear at the top of the feed, with this information.
   */
  displayTotal?: ((total: number) => ReactNode) | ((total: number, loaded: number) => ReactNode);
  /**
   * Component to display while loading new results.
   */
  loader?: ReactNode;
  /**
   * Extra params to pass to the api call.
   */
  params: Q;
  /**
   * Determine how many elements should be left on the scroll list before triggering the next api call.
   */
  triggerOffset?: number;
}

const isChildScrolled = (parent?: HTMLElement | null, child?: HTMLElement | null) => {
  const parentRect = parent?.getBoundingClientRect();
  const childRect = child?.getBoundingClientRect();

  return parentRect && childRect && childRect.top <= parentRect.bottom;
};

/**
 * Create a reference generator for an element of a feed list. It uses refsList to keep track of already created
 * refs, to not create them twice.
 */
const feedElementRef =
  (refsList: MutableRefObject<Map<string, MutableRefObject<HTMLElement | null>>>) => (index: string) => {
    let currentRef = refsList.current.get(index);

    if (currentRef == null) {
      currentRef = createRef<HTMLElement | null>();
      refsList.current.set(index, currentRef);
    }

    return currentRef as MutableRefObject<HTMLElement | null>;
  };

const parseFeedResults =
  <R,>(triggerPos: number, generateRef: ReturnType<typeof feedElementRef>) =>
  ([id, data]: [string, R], index: number) => ({
    id,
    data,
    trigger: index === triggerPos,
    elementRef: generateRef(id),
  });

export function InfiniteFeed<Q extends {}, R extends {}>({
  api,
  onError,
  render,
  emptyIcon,
  emptyText,
  errorIcon,
  errorText,
  staticFeed,
  batchSize,
  params,
  displayTotal,
  fullPage,
  className,
  loader,
  triggerOffset = DEFAULT_TRIGGER_ON_RECORDS_LEFT,
  ...props
}: InfiniteFeedProps<Q, R>) {
  const [results, setResults] = useState<Map<string, R>>(new Map());
  const [total, setTotal] = useState(0);
  // When set to true, stop loading new results.
  const [endReached, setEndReached] = useState(false);

  // Prevent concurrent calls from overlapping.
  const ongoingCall = useRef<Promise<void>>();
  // By default, the wrapper is the scrollable element, we want to attach a listener to.
  const wrapperRef = useRef<HTMLDivElement>(null);
  // The offset of the query.
  const offsetRef = useRef(0);
  // Keep a list of references to each element in the results, so we can use any of them as a trigger
  // for the next api call.
  const elementRefs = useRef<Map<string, MutableRefObject<HTMLElement | null>>>(new Map());

  // Compute the position of the element that should trigger the next api call.
  const triggerPos = results.size - triggerOffset;

  // Parse results as a props object, to be passed down to the renderer.
  const parsedResults = useMemo(
    () => Array.from(results.entries()).map(parseFeedResults(triggerPos, feedElementRef(elementRefs))),
    [results, triggerPos]
  );

  const updateResults = useCallback(async () => {
    const promises: Promise<InfiniteFeedCallbackResponse<R>>[] = [
      api({ limit: batchSize, offset: offsetRef.current, ...params }),
    ];

    // If we are past offset 0, run 2 queries: one at the current offset and the other one at offset 0.
    // We can then dynamically inject new results into the list.
    if (offsetRef.current > 0) {
      promises.push(api({ limit: batchSize, offset: 0, ...params }));
    }

    const results = await Promise.all(promises);

    const uniqueResults = new Map();

    // Since the second call fetches the results at the beginning of the query, they are more relevant.
    // We want to keep them in priority.
    if (results[1] != null && results[1].data?.length > 0) {
      results[1].data.forEach((result) => uniqueResults.set(result.id, result));
    }

    if (results[0] != null && results[0].data?.length > 0) {
      results[0].data.forEach((result) => uniqueResults.set(result.id, result));
    }

    return {
      // The first call is the one that targets the greatest offset,
      // meaning it should tell us if we reached the end.
      endReached: results[0].data == null || results[0].data.length < batchSize,
      // Both calls are made concurrently, so they should both return same length.
      // Anyway, since we have to trust one, we trust the first one.
      total: results[0].total,
      results: uniqueResults,
    };
  }, [api, batchSize, params]);

  const run = useCallback(() => {
    const p = updateResults()
      .then(({ endReached, total, results }) => {
        // A new api call was forced, those results are not valid anymore.
        if (ongoingCall.current !== p) return;
        ongoingCall.current = undefined;

        setEndReached(endReached);
        setTotal(total);
        setResults((prevResults) => {
          const newResults = new Map(prevResults);
          results.forEach((result, id) => newResults.set(id, result));
          offsetRef.current = newResults.size;
          return newResults;
        });
      })
      .catch(async (e) => {
        // A new api call was forced, those results are not valid anymore.
        if (ongoingCall.current !== p) return;
        ongoingCall.current = undefined;

        onError?.(e);
        // Force a cool down when an error occurs, to avoid spamming the api.
        await new Promise((resolve) => setTimeout(resolve, 3000));
      });

    ongoingCall.current = p;
  }, [onError, updateResults]);

  // Reset results when params change.
  useEffect(() => {
    setResults(new Map());
    setEndReached(false);
    setTotal(0);
    offsetRef.current = 0;
    elementRefs.current = new Map();
  }, [params]);

  // Set scroll listener.
  useEffect(() => {
    // Avoid performing DOM measurements uselessly.
    if (endReached) return;

    if (staticFeed) {
      setEndReached(true);
      run();
      return;
    }

    // Check if we need to load new results when content is scrolled.
    const triggerUpdate = () => {
      const trigger = Array.from(elementRefs.current.values())[triggerPos];

      // When the trigger element has been scrolled, run the next api call.
      // A null trigger means we have not loaded any element yet.
      if ((trigger == null || isChildScrolled(wrapperRef.current, trigger?.current)) && ongoingCall.current == null) {
        run();
      }
    };

    // Force a static run, in case screen is too large and one batch is not enough to fill the gap.
    triggerUpdate();

    const parent = fullPage ? document.body : wrapperRef.current;
    parent?.addEventListener("scroll", triggerUpdate);

    return () => {
      parent?.removeEventListener("scroll", triggerUpdate);
    };
  }, [endReached, fullPage, run, staticFeed, triggerPos, wrapperRef]);

  if (errorIcon && errorText) {
    return (
      <div
        className={mergeClassNames(
          css.containerError,
          staticFeed ? css.staticFeed : undefined,
          fullPage ? css.full : undefined,
          className
        )}
        {...props}
      >
        <div className={css.icon}>{errorIcon}</div>
        <div className={css.text}>{errorText}</div>
      </div>
    );
  }

  if (results.size === 0) {
    if (endReached) {
      return (
        <div
          className={mergeClassNames(
            css.containerEmpty,
            staticFeed ? css.staticFeed : undefined,
            fullPage ? css.full : undefined,
            className
          )}
          {...props}
        >
          <div className={css.icon}>{emptyIcon}</div>
          <div className={css.text}>{emptyText}</div>
        </div>
      );
    }

    return (
      <div
        className={mergeClassNames(
          css.containerLoading,
          staticFeed ? css.staticFeed : undefined,
          fullPage ? css.full : undefined,
          className
        )}
        {...props}
      >
        {loader}
      </div>
    );
  }

  return (
    <div
      ref={wrapperRef}
      className={mergeClassNames(
        css.container,
        staticFeed ? css.staticFeed : undefined,
        fullPage ? css.full : undefined,
        className
      )}
      {...props}
    >
      {displayTotal && <div className={css.count}>{displayTotal(total, results.size)}</div>}
      {render(parsedResults)}
      {endReached || staticFeed ? null : loader}
    </div>
  );
}
