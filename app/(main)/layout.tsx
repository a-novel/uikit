import { FC, ReactNode } from "react";

import { Metadata } from "next";

import { InitUI } from "@lib/backend";

import { NavBarProvider } from "./nav-bar-provider";

export const metadata: Metadata = {
  title: {
    default: "Agora UI Kit",
    template: "%s - Agora UI Kit",
  },
  description: "UI Kit for https://agoradesecrivains.fr",
  applicationName: "UI Kit - Agora des Écrivains",
  generator: "Next.js",
  colorScheme: "dark",
  themeColor: "#000000",
  icons: {
    icon: [
      { url: "/uikit/icon-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/uikit/icon-384x384.png", sizes: "384x384", type: "image/png" },
      { url: "/uikit/icon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/uikit/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/uikit/icon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/uikit/icon-apple.png", type: "image/png" },
      { url: "/uikit/icon-apple-1024x1024.png", sizes: "1024x1024", type: "image/png" },
      { url: "/uikit/icon-apple-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/uikit/icon-apple-120x120.png", sizes: "120x120", type: "image/png" },
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    // Automatic browser translation can break some states, so we don't encourage it.
    notranslate: true,
    // Don't index any image on the website.
    noimageindex: true,
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <InitUI lang="en">
    <NavBarProvider>{children}</NavBarProvider>
  </InitUI>
);

export default RootLayout;
