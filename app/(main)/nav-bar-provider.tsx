"use client";

import { FC, ReactNode } from "react";

import { usePathname } from "next/navigation";

import { NavWrapper } from "@components/stateful";

import { NavBar } from "./nav-bar";

export const NavBarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  return (
    <NavWrapper main navComponent={<NavBar pathname={pathname} />} mode="vertical">
      {children}
    </NavWrapper>
  );
};
