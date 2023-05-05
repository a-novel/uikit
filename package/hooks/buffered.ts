import "client-only";

import { useEffect, useRef, useState } from "react";

export type DataList<T> = Record<string, T>;

export type DataListWithStatus<T> = Record<string, { content: T; status: "active" | "removed" }>;

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
 *
 * @example
 * import { useBufferedState, DataList } from "@anovel/uikit/hooks";
 *
 * // Dummy component, with a button that displays a notification when clicked.
 * // The notification is removed after 6s.
 * // When a notification is removed (while in the buffer), a custom class is added to it, for smooth
 * // removal transition.
 * const MyComponent = () => {
 *   const [notifications, setNotifications] = useState<DataList<Notification>>({});
 *   const [clickCount, setClickCount] = useState(0);
 *   const timers = useRef<number[]>();
 *
 *   const { data } = useBufferedState({ source : notifications, bufferedDuration: 600 });
 *
 *   const newNotification = () => {
 *     setClickCount(prevValue => prevValue + 1);
 *     setNotifications(prevValue => [
 *       ...prevValue,
 *       { [`notification-${clickCount}`]: `You clicked ${clickCount} times on the button` }
 *      ]);
 *
 *     // Add a new timer to remove the notification.
 *     timers.current = [
 *       ...timers.current,
 *       window.setTimeout(() => {
 *         setNotifications(prevValue => {
 *           const { [key]: _, ...rest } = prevValue;
 *           return rest;
 *         });
 *       }, 6000)
 *     ];
 *   };
 *
 *   useEffect(() => {
 *     return () => {
 *       timers.current.forEach(timer => window.clearTimeout(timer));
 *     };
 *   }, []);
 *
 *   return (
 *     <>
 *       <button onClick={newNotification}>Click me</button>
 *       <div className="notifications">
 *         {
 *           Object.entries(data).map(([key, { content, status }]) => (
 *             // The "removed" className will display a remove transition.
 *             // Status is either "removed" or "active".
 *             <div key={key} className={`notification ${status}`}>
 *               {content}
 *             </div>
 *           ))
 *         }
 *       </div>
 *     </>
 *   );
 * }
 */
export const useBufferedState = <T>({ source, bufferedDuration }: BufferedHookParams<T>): BufferedHook<T> => {
  // Keep a copy of the source, so we can compare which items got removed.
  const [sourceCP, setSourceCP] = useState<DataList<T>>(source);
  const [buffer, setBuffer] = useState<DataList<T>>({});
  const timeouts = useRef<Map<string, number>>(new Map());
  // At the initial state, data just contains every source item with the "active" status, as no item is
  // yet buffered.
  const [data, setData] = useState<DataListWithStatus<T>>({});

  // Update our source copy when the actual source is updated. Add removed items to the buffer.
  useEffect(() => {
    // Buffer items are the combination of items from previous buffer and source copy that do not appear in
    // the source.
    setBuffer((prevBuffer) =>
      Object.entries({ ...prevBuffer, ...sourceCP })
        .filter(([key]) => !source[key])
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
    );

    // Update our copy of the source, now we got the information we needed.
    setSourceCP(source);
  }, [source, sourceCP]);

  // Once the buffer has been updated, update the full data object with the new statuses.
  useEffect(() => {
    setData((prevData) => {
      const updateWithStatus = (status: "active" | "removed") => (value: [string, T]) => {
        // If the value already exists in the data source, we update it, in order to keep insertion order.
        if (prevData[value[0]]) {
          prevData[value[0]].status = status;
          prevData[value[0]].content = value[1];
        } else {
          prevData[value[0]] = { content: value[1], status };
        }
      };

      // Object in the buffer have the status "removed".
      Object.entries(buffer).forEach(updateWithStatus("removed"));

      // Object in the source have the status "active".
      Object.entries(source).forEach(updateWithStatus("active"));

      // Permanently delete keys that have been removed from both source and buffer.
      Object.keys(prevData).forEach((key) => {
        if (!source[key] && !buffer[key]) {
          delete prevData[key];
        }
      });

      // React compare objects by reference to perform updates. We need to force a new copy of the object
      // to be created, otherwise updates will not trigger properly.
      return { ...prevData };
    });
  }, [buffer, source]);

  // Prepare items to be removed from the buffer, after the duration indicated by the bufferedDuration parameter.
  useEffect(() => {
    // Remove items from the buffer, after the duration indicated by the bufferedDuration parameter.
    Object.keys(buffer)
      // The item is already scheduled for removal.
      .filter((key) => !timeouts.current.has(key))
      .forEach((key) => {
        timeouts.current.set(
          key,
          window.setTimeout(() => {
            // Remove the item from the buffer.
            setBuffer(({ [key]: _, ...prevBuffer }) => prevBuffer);
            // Remove the timeout from the list.
            timeouts.current.delete(key);
          }, bufferedDuration)
        );
      });

    // Remove items that were cleared from the buffer. This can happen when an item is added back to the source.
    Object.keys(timeouts.current).forEach((key) => {
      if (!buffer[key]) {
        window.clearTimeout(timeouts.current.get(key));
        timeouts.current.delete(key);
      }
    });
  }, [buffer, bufferedDuration]);

  useEffect(() => {
    // Clean up the timeouts when the component unmounts.
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeouts.current.forEach((timeout) => window.clearTimeout(timeout));
    };
  }, []);

  return { buffer, data };
};
