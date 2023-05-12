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

export const EMPTY_QUERY = {};

interface InfiniteFeedCallbackParams {
  limit: number;
  offset: number;
}

interface InfiniteFeedCallbackResponseResult {
  id: string;
}

interface InfiniteFeedCallbackResponse<R> {
  results: (R & InfiniteFeedCallbackResponseResult)[];
  total: number;
}

export interface InfiniteFeedElementProps<R> {
  data: R;
  id: string;
  trigger: boolean;
  elementRef: MutableRefObject<HTMLElement | null>;
}

export interface InfiniteFeedProps<Q extends {}, R extends {}> extends HTMLAttributes<HTMLDivElement> {
  api: (query: Q & InfiniteFeedCallbackParams) => Promise<InfiniteFeedCallbackResponse<R>>;
  onError?: (error: unknown) => void;
  render: (values: InfiniteFeedElementProps<R>[]) => ReactNode;
  emptyIcon: ReactNode;
  emptyText: string;
  errorIcon?: ReactNode;
  errorText?: string;
  staticFeed?: boolean;
  fullPage?: boolean;
  batchSize: number;
  displayTotal?: ((total: number) => ReactNode) | ((total: number, loaded: number) => ReactNode);
  loader?: ReactNode;
  params: Q;
}

const isChildScrolled = (parent?: HTMLElement | null, child?: HTMLElement | null) => {
  const parentRect = parent?.getBoundingClientRect();
  const childRect = child?.getBoundingClientRect();

  return parentRect && childRect && childRect.top <= parentRect.bottom;
};

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
  ...props
}: InfiniteFeedProps<Q, R>) {
  const [results, setResults] = useState<Map<string, R>>(new Map());
  const [total, setTotal] = useState(0);
  const [endReached, setEndReached] = useState(false);

  const ongoingCall = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const elementRefs = useRef<Map<string, MutableRefObject<HTMLElement | null>>>(new Map());

  const triggerOffset = useMemo(
    () => Math.min(DEFAULT_TRIGGER_ON_RECORDS_LEFT, Math.floor(batchSize / 2)),
    [batchSize]
  );
  const triggerPos = results.size - triggerOffset;

  const getRef = useCallback((index: string) => {
    let currentRef = elementRefs.current.get(index);

    if (currentRef == null) {
      currentRef = createRef<HTMLElement | null>();
      elementRefs.current.set(index, currentRef);
    }

    return currentRef as MutableRefObject<HTMLElement | null>;
  }, []);

  const parsedResults = useMemo(() => {
    return Array.from(results.entries()).map(([id, data], index) => ({
      id,
      data,
      trigger: index === triggerPos,
      elementRef: getRef(id),
    }));
  }, [getRef, results, triggerPos]);

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

    // The first call is the one that targets the greatest offset,
    // meaning it should tell us if we reached the end.
    setEndReached(results[0].results.length < batchSize);
    // Both calls are made concurrently, so they should both return same length.
    // Anyway, since we have to trust one, we trust the first one.
    setTotal(results[0].total);

    setResults((prevResults) => {
      const newResults = new Map(prevResults);

      // Since the second call fetches the results at the beginning of the query, they are more relevant.
      // We want to keep them in priority.
      if (results[1] != null) {
        results[1].results.forEach((result) => newResults.set(result.id, result));
      }

      results[0].results.forEach((result) => newResults.set(result.id, result));
      offsetRef.current = newResults.size;

      return newResults;
    });
  }, [api, batchSize, params]);

  const run = useCallback(() => {
    if (ongoingCall.current) return;

    ongoingCall.current = true;
    updateResults()
      .catch(onError)
      .finally(() => {
        ongoingCall.current = false;
      });
  }, [onError, updateResults]);

  useEffect(() => {
    if (endReached || results.size > 0) return;
    // Run initial call.
    run();
  }, [endReached, results.size, run]);

  useEffect(() => {
    // Avoid performing DOM measurements uselessly.
    if (endReached || staticFeed) return;

    const triggerUpdate = () => {
      const trigger = Array.from(elementRefs.current.values())[triggerPos];

      if (isChildScrolled(wrapperRef.current, trigger.current)) {
        run();
      }
    };

    const parent = fullPage ? document.body : wrapperRef.current;
    parent?.addEventListener("scroll", triggerUpdate);

    return () => {
      parent?.removeEventListener("scroll", triggerUpdate);
    };
  }, [endReached, fullPage, run, staticFeed, triggerPos, wrapperRef]);

  if (errorIcon && errorText) {
    return (
      <div
        className={mergeClassNames(css.containerError, staticFeed ? css.staticFeed : undefined, className)}
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
          className={mergeClassNames(css.containerEmpty, staticFeed ? css.staticFeed : undefined, className)}
          {...props}
        >
          <div className={css.icon}>{emptyIcon}</div>
          <div className={css.text}>{emptyText}</div>
        </div>
      );
    }

    return (
      <div
        className={mergeClassNames(css.containerLoading, staticFeed ? css.staticFeed : undefined, className)}
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
      {endReached ? null : loader}
    </div>
  );
}
