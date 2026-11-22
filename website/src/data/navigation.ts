export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "The Player", href: "#player" },
  { label: "Features", href: "#features" },
  { label: "Showcase", href: "#showcase" },
  { label: "Desktop", href: "#desktop" },
  { label: "Library", href: "#library" },
  { label: "The Difference", href: "#difference" },
  { label: "Downloads", href: "#downloads" },
  { label: "FAQ", href: "#faq" },
];

export const GITHUB_DESKTOP_REPO = "https://github.com/rumman2004/Gaan-Desktop";
export const GITHUB_MOBILE_REPO = "https://github.com/rumman2004/Gaan";
