"use client";

import css from "./page.module.css";
import { CSSProperties, FC, useEffect, useState } from "react";
import { TitleAnchor, H2 } from "@components/stateful";
import { captureException } from "@lib";
import Link from "next/link";
import { Usage } from "@internal/index";

interface ColorPalette {
  title: string;
  colors: Record<string, "light" | "dark">;
  id: string;
}

const ColorPalette: FC<ColorPalette> = ({ title, colors, id }) => (
  <div className={css.colorPalette}>
    <TitleAnchor renderer="h3" id={`colorPalettes_${id}`}>
      {title}
    </TitleAnchor>
    <div className={css.colorPaletteColors}>
      {Object.entries(colors).map(([name, displayMode]) => (
        <div
          key={name}
          className={css.colorPaletteColor}
          style={
            {
              "--palette": `var(${name})`,
              "--text-mode": displayMode === "light" ? "#FFFFFF" : "#000000",
            } as CSSProperties
          }
        >
          <h5>{name}</h5>
          <div
            className={css.colorPaletteColorValue}
            onClick={() =>
              navigator.clipboard
                .writeText(getComputedStyle(document.body).getPropertyValue(name))
                .catch(captureException)
            }
          >
            <span>{getComputedStyle(document.body).getPropertyValue(name)}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const UI_USAGE = `
// app/layout.tsx
import { InitUI } from "@anovel/uikit/lib/backend";

interface RootLayoutProps {
  children: ReactNode;
}

// Don't forget to initialize contexts in a children client component.
const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <InitUI lang="en">
    {children}
  </InitUI>
);

export default RootLayout;
`;

const Page = () => {
  // Avoid issues when rendering on the server, since document is not yet evaluated.
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section>
      <h1>General styles</h1>
      <Usage code={UI_USAGE} />
      <section>
        <TitleAnchor renderer={H2} id="colorPalettes">
          Color palettes
        </TitleAnchor>
        <div className={css.colorPalettesWrapper}>
          <ColorPalette
            title="Blue"
            id="blue"
            colors={{
              "--blue": "dark",
              "--blue-secondary": "light",
              "--blue-tertiary": "light",
              "--blue-dark": "light",
            }}
          />
          <ColorPalette
            title="Green"
            id="green"
            colors={{
              "--green": "dark",
              "--green-secondary": "light",
              "--green-tertiary": "light",
              "--green-dark": "light",
            }}
          />
          <ColorPalette
            title="Orange"
            id="orange"
            colors={{
              "--orange": "dark",
              "--orange-secondary": "light",
              "--orange-tertiary": "light",
              "--orange-dark": "light",
            }}
          />
          <ColorPalette
            title="Red"
            id="red"
            colors={{
              "--red": "dark",
              "--red-secondary": "light",
              "--red-tertiary": "light",
              "--red-dark": "light",
            }}
          />
          <ColorPalette
            title="Purple"
            id="purple"
            colors={{
              "--purple": "dark",
              "--purple-secondary": "light",
              "--purple-tertiary": "light",
              "--purple-dark": "light",
            }}
          />
          <ColorPalette
            title="Gold"
            id="gold"
            colors={{
              "--gold": "dark",
              "--gold-secondary": "light",
              "--gold-tertiary": "light",
              "--gold-dark": "light",
            }}
          />
          <ColorPalette
            title="Grey"
            id="grey"
            colors={{
              "--background": "light",
              "--grey-900": "light",
              "--grey-800": "light",
              "--grey-700": "light",
              "--grey-600": "light",
              "--grey-500": "dark",
              "--grey-400": "dark",
              "--grey-300": "dark",
              "--grey-200": "dark",
              "--grey-100": "dark",
              "--text": "dark",
            }}
          />
        </div>
      </section>
      <section>
        <TitleAnchor renderer={H2} id="typography">
          Typography
        </TitleAnchor>
        <div className={css.typography}>
          <div className={css.typographyBorderVisualizer}>
            <h1>I am a title of level h1</h1>
          </div>
          <div className={css.typographyBorderVisualizer}>
            <h2>I am a title of level h2</h2>
          </div>
          <div className={css.typographyBorderVisualizer}>
            <h3>I am a title of level h3</h3>
          </div>
          <div className={css.typographyBorderVisualizer}>
            <h5>I am a title of level h5</h5>
          </div>
          <div className={css.typographyBorderVisualizer}>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. <strong>Kono wa strong text desu.</strong> Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
              proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <p>
            Here is a paragraph to test text selection.<span className="selected-test"> This text is selected. </span>
            This text is not selected.
          </p>
          <p>
            {/* My level of maturity */}
            <Link href={"https://www.youtube.com/watch?v=dQw4w9WgXcQ"} target="_blank">
              This is a link to win 10 million euros.
            </Link>
          </p>
        </div>
      </section>
    </section>
  );
};

export default Page;
