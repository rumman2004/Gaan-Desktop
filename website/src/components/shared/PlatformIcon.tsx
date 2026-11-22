import React from "react";
import { Smartphone, Monitor, Apple, Laptop } from "@/components/ui/animated-icons";

export type SupportedPlatform =
  | "windows"
  | "mac"
  | "macos"
  | "android"
  | "linux"
  | "ios"
  | "desktop";

export interface PlatformIconProps {
  platform: SupportedPlatform;
  className?: string;
  size?: number;
}

export function PlatformIcon({
  platform,
  className,
  size = 18,
}: PlatformIconProps) {
  const p = platform.toLowerCase();

  if (p === "windows") {
    return (
      <span
        style={{ fontSize: size * 1.1, lineHeight: 1 }}
        className={className}
        aria-hidden="true"
      >
        ⊞
      </span>
    );
  }

  if (p === "mac" || p === "macos" || p === "apple") {
    return <Apple size={size} className={className} aria-hidden="true" />;
  }

  if (p === "android") {
    return <Smartphone size={size} className={className} aria-hidden="true" />;
  }

  if (p === "linux") {
    return <Laptop size={size} className={className} aria-hidden="true" />;
  }

  return <Monitor size={size} className={className} aria-hidden="true" />;
}
