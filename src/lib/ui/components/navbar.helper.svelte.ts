export interface NavLinkItem {
  link: string;
}

export interface NavButtonItem {
  action: () => void;
  ariaLabel?: string;
}

export interface NavItemCommon {
  content: string;
  active?: boolean;
}

export type NavItem = (NavButtonItem | NavLinkItem) & NavItemCommon;

export function isNavButton(item: NavItem): item is NavButtonItem & NavItemCommon {
  return "action" in item;
}

export function isNavLink(item: NavItem): item is NavLinkItem & NavItemCommon {
  return "link" in item;
}
