import "client-only";

import { MutableRefObject, useCallback, useEffect, useRef } from "react";

export type Callback =
  | ((width: number, height: number, target: Element) => void)
  | ((width: number, height: number) => void)
  | (() => void);

export interface ResizeParams {
  /**
   * An optional element to watch, instead of the whole window. If given, callback will only be triggered if this
   * element size changes.
   */
  element?: MutableRefObject<any>;
  /**
   * This parameter control which axis to listen for resizing. Target refers either to the window object, or the
   * {@link element} if given:
   *  - "width": only trigger callback when the target width changes.
   *  - "height": only trigger callback when the target height changes.
   *  - "both": trigger callback when any dimension of the target changes.
   *
   * Default value is "both".
   */
  listen?: "width" | "height" | "both";
}

/**
 * Triggers a callback everytime the window, or a targeted element, is resized.
 *
 * @example Basic usage
 * import { useResize } from "@anovel/uikit/hooks";
 *
 * const MyComponent = () => {
 *   const [width, setWidth] = useState(0);
 *   const [height, setHeight] = useState(0);
 *
 *   const onResize = useCallback(width: number, height: number) => {
 *     setWidth(width);
 *     setHeight(height);
 *   }, []);
 *
 *   useResize(onResize);
 *
 *   return (
 *     <div>
 *       Current body dimensions: {width} x {height}
 *     </div>
 *   );
 * }
 *
 * @example Listen for a specific element
 * import { useResize } from "@anovel/uikit/hooks";
 *
 * const MyComponent = () => {
 *   const ref = useRef();
 *   const [width, setWidth] = useState(0);
 *   const [height, setHeight] = useState(0);
 *
 *   const onResize = useCallback(width: number, height: number) => {
 *     setWidth(width);
 *     setHeight(height);
 *   }, []);
 *
 *   useResize(onResize, { element: ref.current });
 *
 *   return (
 *     <div ref={ref}>
 *       Current div dimensions: {width} x {height}
 *     </div>
 *   );
 * }
 *
 * @example Listen for a specific axis
 * import { useResize } from "@anovel/uikit/hooks";
 *
 * const MyComponent = () => {
 *   const [height, setHeight] = useState(0);
 *
 *   const onResize = useCallback(width: number, height: number) => {
 *     setHeight(height);
 *   }, []);
 *
 *   useResize(onResize, { listen: "height" });
 *
 *   return (
 *     <div ref={ref}>
 *       Current body height: {height}
 *     </div>
 *   );
 * }
 */
export const useResize = (callback: Callback, { element, listen }: ResizeParams = {}) => {
  // Keep track of the targets dimensions.
  const dimensions = useRef<{ width: number; height: number }>();

  const resizeObserverCallback = useCallback(
    (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        // So basically, contentRect is deprecated, leaving me with only contentBoxSize and borderBoxSize.
        // The issues with the last 2 are:
        //  - Because theoretically, an element may have multiple boxes, the API is an array of DOMRectReadOnly
        //    rather than a single DOMRectReadOnly (which makes it less convenient to use).
        //  - There is no width/height on those, but only inlineSize/blockSize. What sucks ? Both inlineSize and
        //    blockSize can refer to width or height depending on the writing mode. Since IDGAF about the text
        //    direction when performing DOM operations, this ones bother me.
        // So I'll rather go with the good ol getBoundingClientRect, even if it means making an extra computation.
        const { width, height } = entry.target.getBoundingClientRect();

        // Check whether the callback should be triggered or not (depending on the listen parameter).
        const trigger =
          listen === "height"
            ? height !== dimensions.current?.height
            : listen === "width"
            ? width !== dimensions.current?.width
            : width !== dimensions.current?.width || height !== dimensions.current?.height;

        if (trigger) {
          // Update the dimensions reference, to use for comparison in future triggers.
          dimensions.current = { width, height };
          callback(width, height, entry.target);
        }
      }
    },
    [callback, listen]
  );

  useEffect(() => {
    const target = element?.current == null ? window.document.body : element.current;
    // Compatibility looks good enough so far.
    // https://caniuse.com/?search=ResizeObserver
    const resizeObserver = new ResizeObserver(resizeObserverCallback);
    resizeObserver.observe(target);
    return () => resizeObserver.disconnect();
  }, [element, resizeObserverCallback]);
};
