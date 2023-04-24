import { Metadata } from "next";
import { InitUI } from "@lib/backend";
import { FC, ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Agora UI Kit",
    template: "%s - Agora UI Kit",
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => <InitUI lang="en">{children}</InitUI>;

export default RootLayout;
