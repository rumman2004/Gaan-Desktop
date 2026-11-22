import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Card } from "../ui/Card";
import { PlatformSelector } from "./PlatformSelector";
import { ArchitectureSelector } from "./ArchitectureSelector";
import { DownloadButton } from "./DownloadButton";
import { ReleaseInfo } from "./ReleaseInfo";
import { InstallSteps } from "./InstallSteps";
import {
  DOWNLOAD_PLATFORMS,
  type TargetPlatform,
  type Architecture,
} from "../../data/downloads";
import { useReleases, type ReleasesState } from "../../lib/releases";

export interface DownloadCardProps {
  initialPlatform?: TargetPlatform;
  releases?: ReleasesState;
  className?: string;
}

export function DownloadCard({
  initialPlatform = "windows",
  releases: releaseData,
  className,
}: DownloadCardProps) {
  const [platform, setPlatform] = useState<TargetPlatform>(initialPlatform);
  const platformInfo = DOWNLOAD_PLATFORMS[platform];

  const defaultArch = platformInfo.architectures.find((a) => a.recommended)?.arch || platformInfo.architectures[0].arch;
  const [arch, setArch] = useState<Architecture>(defaultArch);

  // Use live release data hook from verified project configuration
  const fetchedReleases = useReleases(!releaseData);
  const releases = releaseData ?? fetchedReleases;

  const handlePlatformChange = (newPlatform: TargetPlatform) => {
    setPlatform(newPlatform);
    const newDefaultArch = DOWNLOAD_PLATFORMS[newPlatform].architectures.find((a) => a.recommended)?.arch || DOWNLOAD_PLATFORMS[newPlatform].architectures[0].arch;
    setArch(newDefaultArch);
  };

  // Determine accurate dynamic download URL based on selected platform & arch
  const getDynamicDownloadUrl = (): string => {
    if (platform === "windows") {
      return releases.desktop.windowsExeUrl;
    }
    if (platform === "mac") {
      return arch === "arm64"
        ? releases.desktop.macArm64DmgUrl
        : releases.desktop.macX64DmgUrl;
    }
    if (platform === "android") {
      return arch === "arm64"
        ? releases.mobile.apkArm64Url
        : releases.mobile.apkUniversalUrl;
    }
    return releases.desktop.htmlUrl;
  };

  const selectedArchInfo = platformInfo.architectures.find((a) => a.arch === arch);
  const currentVersion = platform === "android" ? releases.mobile.tag : releases.desktop.tag;
  const currentPublishDate = platform === "android" ? releases.mobile.publishedAt : releases.desktop.publishedAt;
  const currentSourceUrl = platform === "android" ? releases.mobile.htmlUrl : releases.desktop.htmlUrl;
  const selectedAsset = platform === "windows"
    ? releases.desktop.assets.find((asset) => asset.name.toLowerCase().endsWith(".exe"))
    : platform === "mac"
      ? releases.desktop.assets.find((asset) => asset.name.toLowerCase().endsWith(".dmg") && asset.name.toLowerCase().includes(arch === "arm64" ? "arm64" : "x64"))
      : releases.mobile.assets.find((asset) => asset.name.toLowerCase().endsWith(".apk") && (arch === "arm64" ? asset.name.toLowerCase().includes("arm64") : asset.name.toLowerCase() === "gaan.apk"));
  const packageSize = selectedAsset
    ? `${(selectedAsset.size / (1024 * 1024)).toFixed(1)} MB`
    : "See release assets";

  return (
    <Card
      variant="outlined"
      className={cn(
        "p-6 sm:p-10 bg-[var(--bg-card)] border border-[var(--border-default)] shadow-[var(--shadow-hover)] flex flex-col gap-8 sm:gap-10",
        className
      )}
    >
      {/* 1. Operating System Tabs */}
      <PlatformSelector selected={platform} onChange={handlePlatformChange} />

      {/* 2. Architecture & File Selector */}
      <ArchitectureSelector
        architectures={platformInfo.architectures}
        selected={arch}
        onChange={setArch}
      />

      {/* 3. Primary Download Button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[var(--bg-secondary)]/60 border border-[var(--border-subtle)]">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-[var(--text-primary)]">
            Ready to download Gaan for {platformInfo.displayName}?
          </h4>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-0.5">
            Package: {selectedArchInfo?.label} • {packageSize} • Official GitHub release
          </p>
        </div>

        <DownloadButton
          label={`Download for ${platformInfo.displayName}`}
          sublabel={`${selectedAsset?.name ?? selectedArchInfo?.fileExtension ?? "Release assets"} · ${packageSize}`}
          href={getDynamicDownloadUrl()}
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
        />
      </div>

      {/* 4. Release metadata info bar */}
      <ReleaseInfo
        version={currentVersion}
        releaseDate={currentPublishDate}
        sourceUrl={currentSourceUrl}
      />

      {/* 5. Platform Installation Steps */}
      <InstallSteps
        steps={platformInfo.installGuide}
        systemRequirements={platformInfo.systemRequirements}
      />
    </Card>
  );
}
