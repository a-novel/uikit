import "client-only";

import { useCallback, useEffect, useRef, useState } from "react";

export type DataList<T> = Map<string, T>;

export type DataListWithStatus<T> = Map<string, { content: T; status: "active" | "removed" }>;

export interface BufferedHookParams<T> {
  /**
   * The source data. Must be a memoized object to avoid infinite rendering.
   * Each key is a unique identifier, used to track a data element.
   */
  source: DataList<T>;
  /**
   * The duration, in ms, during which a removed data is kept in the
   * buffer.
   * Once an item is added to the buffer, it will completely disappear
   * after this duration. If it is added back to the data source, it is moved back
   * to the regular output, and the process repeats.
   */
  bufferedDuration: number;
}

export interface BufferedHook<T> {
  /**
   * Keep items that were removed from the output data, in a temporary buffer. The items are kept for the time
   * specified by the {@link BufferedHookParams.bufferedDuration} parameter.
   *
   * There is never duplicate data between the output data and the buffer. If a key of the buffer is added to
   * the output data, it is removed from the buffer.
   */
  buffer: DataList<T>;
  /**
   * The data merges together the source and the buffer, adding a status to each item.
   * With this approach, buffered and non-buffered items are managed by a single state.
   * This allows to render a single list, where buffered items are only added an attribute,
   * keeping their original insertion order.
   */
  data: DataListWithStatus<T>;
}

/**
 * This hook allows items of a list to be kept in a buffer for a short amount of time after being deleted.
 * The source list is a record of key/value pairs, where each key is a unique identifier (think of it as a
 * uuid in a database).
 */
export const useBufferedState = <T>({ source, bufferedDuration }: BufferedHookParams<T>): BufferedHook<T> => {
  // Keep a copy of the source, so we can compare which items got removed.
  const [sourceCP, setSourceCP] = useState<DataList<T>>(source);
  // Data combines buffered and active data, while keeping the ordering of the data.
  const [data, setData] = useState<DataListWithStatus<T>>(new Map());
  const [buffer, setBuffer] = useState<DataList<T>>(new Map());

  const timeouts = useRef<Map<string, number>>(new Map());

  // ================================================================================
  // Update the source copy when source changes, and add removed items to the buffer.
  // ================================================================================
  useEffect(() => {
    setSourceCP((prevSourceCP) => {
      // Enforce sourceCP and buffer to update sequentially.
      setBuffer((prevBuffer) => {
        prevSourceCP.forEach((value, key) => {
          if (!source.has(key)) {
            // Key was removed from the source.
            prevBuffer.set(key, value);
          }
        });

        source.forEach((value, key) => {
          // Key was added to the source.
          prevBuffer.delete(key);
        });

        return new Map(prevBuffer);
      });

      return source;
    });
  }, [source]);

  // Update combined data.
  useEffect(() => {
    setData((prevData) => {
      buffer.forEach((content, key) => {
        prevData.set(key, { content, status: "removed" });
      });

      sourceCP.forEach((content, key) => {
        prevData.set(key, { content, status: "active" });
      });

      // Permanently delete keys that have been removed from both source and buffer.
      prevData.forEach((value, key) => {
        if (!sourceCP.has(key) && !buffer.has(key)) {
          prevData.delete(key);
        }
      });

      // React compare objects by reference to perform updates. We need to force a new copy of the object
      // to be created, otherwise updates will not trigger properly.
      return new Map(prevData);
    });
  }, [buffer, sourceCP]);

  const onRemoval = useCallback(
    (key: string) => () => {
      setBuffer((prevBuffer) => {
        prevBuffer.delete(key);
        return new Map(prevBuffer);
      });
    },
    []
  );

  // Prepare items to be removed from the buffer, after the duration indicated by the bufferedDuration parameter.
  useEffect(() => {
    // Schedule new buffer keys for removal.
    buffer.forEach((_, key) => {
      if (!timeouts.current.has(key)) {
        timeouts.current.set(key, window.setTimeout(onRemoval(key), bufferedDuration));
      }
    });

    // Remove items that were cleared from the buffer.
    timeouts.current.forEach((timeout, key) => {
      if (!buffer.has(key)) {
        window.clearTimeout(timeout);
        timeouts.current.delete(key);
      }
    });
  }, [buffer, bufferedDuration, onRemoval]);

  useEffect(() => {
    const t = timeouts;
    // Clean up the timeouts when the component unmounts.
    return () => {
      t.current.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  return { buffer, data };
};
