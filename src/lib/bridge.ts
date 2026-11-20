/** Typed access to the preload bridge, with a friendly error in plain-browser dev. */
import type { GAANApi } from "../../electron/preload";

declare global {
  interface Window {
    GAAN?: GAANApi;
  }
}

export function hasBridge(): boolean {
  return typeof window !== "undefined" && !!window.GAAN;
}

export function requireBridge(): GAANApi {
  if (typeof window === "undefined" || !window.GAAN) {
    throw new Error("Not running inside the GAAN desktop shell.");
  }
  return window.GAAN;
}
