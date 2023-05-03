import { MutableRefObject, useEffect, useState } from "react";

export interface FloatingMenuProps {
  /**
   * Reference of the floating menu container. Any click within this container will be ignored by the hook.
   */
  ref: MutableRefObject<any>;
  /**
   * When true, disable the hook.
   */
  disable?: boolean;
  /**
   * Prevent hook from attaching listeners when the floating menu is not shown.
   */
  opened?: boolean;
  /**
   * Callback to hide the floating menu.
   */
  close: () => void;
}

/**
 * Automatically close a floating menu when a user click anywhere on the document, outside the menu.
 *
 * @example
 * import { useFloatingMenu } from "@anovel/uikit/hooks";
 *
 * const MyComponent = () => {
 *   const ref = useRef();
 *   const [opened, setOpened] = useState(false);
 *
 *   useFloatingMenu({ ref, opened, close: () => setOpened(false) });
 *
 *   return (
 *     <div>
 *       <button onClick={() => setOpened(true)}>Open</button>
 *       <div className="floating-menu" ref={ref} style={{ display: opened ? "block" : "none" }}>
 *     </div>
 *   );
 * }
 */
export const useFloatingMenu = ({ opened, disable, ref, close }: FloatingMenuProps) => {
  // Avoid immediately closing the menu when the open button is clicked, by delaying the state check by 1 cycle.
  const [openBuffered, setOpenBuffered] = useState(false);

  useEffect(() => {
    setOpenBuffered(opened || false);
  }, [opened]);

  useEffect(() => {
    if (!openBuffered || disable) return;

    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target)) {
        close();
      }
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [close, disable, openBuffered, ref]);
};
