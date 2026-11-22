export interface ComparisonMetric {
  feature: string;
  gaan: string | boolean;
  commercialStreaming: string | boolean;
  highlight?: boolean;
}

export const COMPARISONS: ComparisonMetric[] = [
  { feature: "Price", gaan: "Free, every feature", commercialStreaming: "Full experience often requires a subscription", highlight: true },
  { feature: "Ads", gaan: "No ads", commercialStreaming: "Free tiers may include ads", highlight: true },
  { feature: "Source code", gaan: "Public on GitHub, GPL-3.0", commercialStreaming: "Often closed source" },
  { feature: "Local files", gaan: "First-class library support", commercialStreaming: "Support varies by app" },
  { feature: "Your data", gaan: "Readable local data and backup options", commercialStreaming: "Often account-bound" },
  { feature: "Desktop feel", gaan: "Media keys, mini player and shortcuts", commercialStreaming: "Features vary by app" },
];

export const HONEST_LIMITATIONS = [
  { title: "Online sources need a connection", desc: "Streaming and online discovery depend on an internet connection. Local files remain available on the device." },
  { title: "No iOS release", desc: "The current published builds are for Windows, macOS and Android. Check the releases page for current platform availability." },
];
