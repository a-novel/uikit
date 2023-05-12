import { ReactNode } from "react";

export * from "./action";
export * from "./nav";
export * from "./generics";
export * from "./layout";

export interface LayoutProps {
  children: ReactNode;
}
