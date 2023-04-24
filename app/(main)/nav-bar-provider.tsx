"use client";

import { usePathname } from "next/navigation";
import { NavBar } from "./nav-bar";
import { FC, ReactNode } from "react";
import { NavWrapper } from "@components/stateful";

export const NavBarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <NavWrapper main navComponent={<NavBar pathname={pathname} />} mode="vertical">
      {children}
    </NavWrapper>
  );
};
