import "server-only";

import "@styles/global.css";
import "@styles/var.css";

import { FC, ReactNode } from "react";

import localFont from "next/font/local";

import { dir } from "i18next";

// We are using the open source fonts available here: http://git.ghostscript.com/?p=urw-core35-fonts.git;a=tree
const NimbusSans = localFont({
  src: [
    {
      path: "../../public/fonts/NimbusSans-Regular.ttf",
      weight: "normal",
      style: "normal",
    },
    {
      path: "../../public/fonts/NimbusSans-Italic.ttf",
      weight: "normal",
      style: "italic",
    },
    {
      path: "../../public/fonts/NimbusSans-Bold.ttf",
      weight: "bold",
      style: "normal",
    },
    {
      path: "../../public/fonts/NimbusSans-BoldItalic.ttf",
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
