interface NavLinkItem {
  link: string;
}

interface NavButtonItem {
  action: () => void;
}

interface NavItemCommon {
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
