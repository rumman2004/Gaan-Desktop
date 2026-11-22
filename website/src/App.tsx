import { useEffect, useState } from "react";
import { Home } from "./pages/Home";
import { ThemeProvider } from "./context/theme-context";
import { AnimatedIconObserver } from "./components/ui/AnimatedIconObserver";

export type Platform = "windows" | "mac" | "android" | "other";

export default function App() {
  const [detectedOS, setDetectedOS] = useState<Platform>("windows");

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    setDetectedOS(
      ua.includes("android")
        ? "android"
        : ua.includes("mac") || ua.includes("iphone") || ua.includes("ipad")
        ? "mac"
        : ua.includes("win")
        ? "windows"
        : "other"
    );
  }, []);

  return (
    <ThemeProvider>
      <AnimatedIconObserver />
      <Home detectedOS={detectedOS} />
    </ThemeProvider>
  );
}
