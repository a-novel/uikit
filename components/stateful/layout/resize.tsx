import { FC, HTMLAttributes, MutableRefObject, useCallback, useEffect, useRef, useState } from "react";
import { mergeClassNames } from "@lib";
import css from "./resize.module.css";

export type ResizableBlockHandle = "right" | "bottom" | "bottom-right";

export type ResizableBlockBoundMode = "horizontal" | "vertical";

export interface ResizableBlockProps extends HTMLAttributes<HTMLElement> {
  /**
   * Constraint which handles can be used to resize the element. If null, all of them can be used.
   */
  resizeHandle?: ResizableBlockHandle[];
  bound?: MutableRefObject<HTMLDivElement | undefined>;
  boundMode?: ResizableBlockBoundMode;
}

/**
 * ResizableBlock returns a div that can be resized by dragging the bottom right corner, according to some preferences.
 */
export const ResizableBlock: FC<ResizableBlockProps> = ({
  bound,
  children,
  boundMode,
  resizeHandle,
  className,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const rightHandleRef = useRef<HTMLDivElement>(null);
  const bottomHandleRef = useRef<HTMLDivElement>(null);
  const bottomRightHandleRef = useRef<HTMLDivElement>(null);

  const [activeResizeHandle, setActiveResizeHandle] = useState<ResizableBlockHandle | null>(null);

  const resize = useCallback(
    (e: MouseEvent, handle: ResizableBlockHandle) => {
      // We can't resize if we don't have a reference to the element.
      if (ref.current == null) {
        return;
      }

      const { clientX, clientY } = e;
      const currentSize = ref.current.getBoundingClientRect();
      const boundSize = bound?.current?.getBoundingClientRect();

      // Can we resize in the x direction?
      if (handle === "right" || handle === "bottom-right") {
        // If a css:min-width is defined, it will prevent the element from shrinking more. So we are safe to set the
        // width as low as we want.
        const xMin = currentSize.left;
        // If a css:max-width is defined, it will prevent the element from growing more. So the only limit for the
        // width is the container size (or window).
        const xMax = (boundMode == null || boundMode === "horizontal") && (boundSize?.right || window.innerWidth);

        const x = Math.min(Math.max(clientX, xMin), xMax || Infinity);
        ref.current.style.width = `${x - currentSize.left}px`;
      }

      // Can we resize in the y direction?
      if (handle === "bottom" || handle === "bottom-right") {
        // If a css:min-height is defined, it will prevent the element from shrinking more. So we are safe to set the
        // height as low as we want.
        const yMin = currentSize.top;
        // If a css:max-height is defined, it will prevent the element from growing more. So the only limit for the
        // height is the container size (or window).
        const yMax = (boundMode == null || boundMode === "vertical") && (boundSize?.bottom || window.innerHeight);

        const y = Math.min(Math.max(clientY, yMin), yMax || Infinity);
        ref.current.style.height = `${y - currentSize.top}px`;
      }
    },
    [bound, boundMode]
  );

  useEffect(() => {
    if (ref.current == null) {
      return;
    }

    const onMouseDown = (e: MouseEvent) => {
      if (e.target === rightHandleRef.current) {
        setActiveResizeHandle("right");
      } else if (e.target === bottomHandleRef.current) {
        setActiveResizeHandle("bottom");
      } else if (e.target === bottomRightHandleRef.current) {
        setActiveResizeHandle("bottom-right");
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (activeResizeHandle) {
        resize(e, activeResizeHandle);
      }
    };

    const onMouseUp = () => {
      setActiveResizeHandle(null);
    };

    const rightHandle = rightHandleRef.current;
    const bottomHandle = bottomHandleRef.current;
    const bottomRightHandle = bottomRightHandleRef.current;

    rightHandle?.addEventListener("mousedown", onMouseDown);
    bottomHandle?.addEventListener("mousedown", onMouseDown);
    bottomRightHandle?.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      rightHandle?.removeEventListener("mousedown", onMouseDown);
      bottomHandle?.removeEventListener("mousedown", onMouseDown);
      bottomRightHandle?.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [resize, activeResizeHandle]);

  return (
    <div ref={ref} className={mergeClassNames(css.container, className)} {...props}>
      {children}
      {(resizeHandle?.includes("right") || resizeHandle == null) && (
        <div ref={rightHandleRef} className={mergeClassNames(css.resizeHandler, css.right)} />
      )}
      {(resizeHandle?.includes("bottom") || resizeHandle == null) && (
        <div ref={bottomHandleRef} className={mergeClassNames(css.resizeHandler, css.bottom)} />
      )}
      {(resizeHandle?.includes("bottom-right") || resizeHandle == null) && (
        <div ref={bottomRightHandleRef} className={mergeClassNames(css.resizeHandler, css.bottomRight)} />
      )}
    </div>
  );
};
