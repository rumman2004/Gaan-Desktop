export interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Desktop", href: "#desktop" },
      { label: "Android", href: "#downloads" },
      { label: "Download", href: "#downloads" },
      { label: "What's New", href: "https://github.com/rumman2004/Gaan-Desktop/releases", isExternal: true },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "https://github.com/rumman2004/Gaan-Desktop/blob/main/README.md", isExternal: true },
      { label: "FAQ", href: "#faq" },
      { label: "Install Guide", href: "#downloads" },
      { label: "Release Assets", href: "https://github.com/rumman2004/Gaan-Desktop/releases/latest", isExternal: true },
      { label: "Project README", href: "https://github.com/rumman2004/Gaan-Desktop/blob/main/README.md", isExternal: true },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/rumman2004/Gaan-Desktop", isExternal: true },
      { label: "Report an Issue", href: "https://github.com/rumman2004/Gaan-Desktop/issues", isExternal: true },
      { label: "Contribute", href: "https://github.com/rumman2004/Gaan-Desktop/pulls", isExternal: true },
      { label: "Android Source", href: "https://github.com/rumman2004/Gaan", isExternal: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "GPL-3.0 License", href: "https://github.com/rumman2004/Gaan-Desktop/blob/main/LICENSE", isExternal: true },
    ],
  },
];
