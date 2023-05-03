import "client-only";

import {
  CSSProperties,
  ForwardedRef,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useResize } from "@hooks";

export interface StickyContextType {
  /**
   * Returns the current combined height of registered sticky elements, in all parent containers.
   * */
  vertical: number;
  /**
   * Returns the current combined width of registered sticky elements, in all parent containers.
   */
  horizontal: number;
}

export const StickyContext = createContext<StickyContextType>({ vertical: 0, horizontal: 0 });

export interface StickyProviderProps<T extends HTMLElement> {
  render: (ref: ForwardedRef<T>, style: CSSProperties) => ReactNode;
  stickyRef?: ForwardedRef<T>;
  /**
   * If true, ignore parent sticky elements offsets, and set this element offset as 0. Every child will inherit
   * that reference.
   */
  reset?: boolean;
  /**
   * Define which axis is affected by the sticky element. By default, both are affected.
   * If an axis is not affected, the current element size on that axis will not be accounted by children.
   */
  mode?: "horizontal" | "vertical";
}

/**
 * Register sticky elements, and combine their dimensions to make them stack next to one another.
 *
 * When an element is registered using this hook, its "left" and "top" CSS properties are updated
 * to match the current combined dimensions of all parent sticky elements. The registered element
 * must be sticky in order for the hook to work properly.
 *
 * Additionally, the element receives 2 css variables, "--sticky-top" and "--sticky-left", with the
 * same values as the "top" and "left" CSS properties. They can be used for further css
 * manipulation.
 *
 * @example Stack 2 nav bars, a vertical nav bar under a horizontal one.
 * import { WithSticky } from "@anovel/uikit/contexts";
 *
 * const MyComponent = () => (
 *   <WithSticky
 *     mode="vertical"
 *     render={(ref, style) => (
 *       (ref, style) => (
 *         <NavBarHorizontal ref={ref}/>
 *         { ... }
 *         <WithSticky
 *           mode="horizontal"
 *           render={(ref, style) => (
 *             <NavBarVertical ref={ref}/>
 *             { ... }
 *           )}
 *         />
 *       )
 *     )}
 *   />
 * );
 */
export function WithSticky<T extends HTMLElement>({
  render,
  reset,
  mode,
  stickyRef,
}: StickyProviderProps<T>): ReactElement<any, any> {
  const stickyElement = useRef<T | null>(null);

  // Offset (size) of the reference element. Both those offsets are added to the inherited parent offsets, then
  // passed down to child sticky elements.
  const [vertical, setVertical] = useState(0);
  const [horizontal, setHorizontal] = useState(0);

  const { vertical: parentVertical, horizontal: parentHorizontal } = useContext(StickyContext);

  const onResize = useCallback(
    (width: number, height: number, target: Element) => {
      if (target !== stickyElement.current) return;

      const heightOffset = mode === "horizontal" ? 0 : height;
      const widthOffset = mode === "vertical" ? 0 : width;

      setVertical(reset ? heightOffset : parentVertical + heightOffset);
      setHorizontal(reset ? widthOffset : parentHorizontal + widthOffset);
    },
    [parentHorizontal, parentVertical, reset, stickyElement, mode]
  );

  useResize(onResize, {
    element: stickyElement,
    listen: mode === "horizontal" ? "width" : mode === "vertical" ? "height" : "both",
  });

  useEffect(() => {
    if (stickyElement.current == null) return;

    const { width, height } = stickyElement.current.getBoundingClientRect();
    onResize(width, height, stickyElement.current);
  }, [onResize, stickyElement]);

  return (
    <StickyContext.Provider value={{ vertical, horizontal }}>
      {render(
        // https://stackoverflow.com/a/62238917/9021186
        (node) => {
          stickyElement.current = node;
          if (typeof stickyRef === "function") {
            stickyRef(node);
          } else if (stickyRef) {
            stickyRef.current = node;
          }
        },
        {
          top: `${reset ? 0 : parentVertical}px`,
          left: `${reset ? 0 : parentHorizontal}px`,
          "--sticky-top": `${reset ? 0 : parentVertical}px`,
          "--sticky-left": `${reset ? 0 : parentHorizontal}px`,
        } as CSSProperties
      )}
    </StickyContext.Provider>
  );
}
