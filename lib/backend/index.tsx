import "@styles/global.css";
import "@styles/var.css";
import "server-only";
import localFont from "next/font/local";
import { FC, ReactNode } from "react";
import { dir } from "i18next";

// We are using the open source fonts available here: http://git.ghostscript.com/?p=urw-core35-fonts.git;a=tree
const NimbusSans = localFont({
  src: [
    {
      path: "fonts/NimbusSans-Regular.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "fonts/NimbusSans-Italic.ttf",
      weight: "normal",
      style: "italic",
    },
    {
      path: "fonts/NimbusSans-Bold.ttf",
      weight: "bold",
      style: "normal",
    },
    {
      path: "fonts/NimbusSans-BoldItalic.ttf",
      weight: "bold",
      style: "italic",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export interface InitUIProps {
  children?: ReactNode;
  lang: string;
}

/**
 * Initialize the UI with the required HTML elements and global components.
 *
 * Contexts are not registered here.
 */
export const InitUI: FC<InitUIProps> = ({ children, lang }) => (
  <html lang={lang} dir={dir(lang)} className={NimbusSans.className}>
    <body
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {children}
    </body>
  </html>
);
