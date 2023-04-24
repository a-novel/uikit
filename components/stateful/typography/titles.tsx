import { FC, ForwardedRef, HTMLAttributes } from "react";
import { WithSticky } from "@contexts";

interface HProps extends HTMLAttributes<HTMLHeadingElement> {
  level: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const H: FC<HProps> = ({ level: Level, style, ...props }) => (
  <WithSticky
    mode="vertical"
    render={(stickyRef: ForwardedRef<HTMLHeadingElement>, stickyStyle) => (
      <Level ref={stickyRef} style={{ ...stickyStyle, ...style }} {...props} />
    )}
  />
);

/**
 * H2 Title has its own component, because unlike other titles, it can stick to the top of the page.
 */
export const H2: FC<HTMLAttributes<HTMLHeadingElement>> = (props) => <H level="h2" {...props} />;
