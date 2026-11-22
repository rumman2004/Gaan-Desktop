import React, { useEffect } from "react";
import { cn } from "../../lib/utils";
import { X, ChevronLeft, ChevronRight } from "@/components/ui/animated-icons";
import { IconButton } from "./IconButton";

export interface LightboxImage {
  src: string;
  alt: string;
  title?: string;
  category?: string;
}

export interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentImage = images[currentIndex];
  const total = images.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + total) % total);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % total);
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, total, onClose, onNavigate]);

  if (!isOpen || !currentImage) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay-scrim)] backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Top Bar with title and close button */}
      <div className="absolute top-0 inset-x-0 p-3 sm:p-6 flex items-center justify-between z-10 text-[var(--overlay-text)]">
        <div>
          {currentImage.title && (
            <h3 className="text-base sm:text-lg font-semibold">
              {currentImage.title}
            </h3>
          )}
          {currentImage.category && (
            <span className="text-xs text-[var(--overlay-muted-text)] uppercase tracking-wider">
              {currentImage.category} • {currentIndex + 1} of {total}
            </span>
          )}
        </div>
        <IconButton
          icon={<X className="size-5 sm:size-6" />}
          aria-label="Close lightbox"
          onClick={onClose}
          className="bg-[var(--overlay-control-bg)] hover:bg-[var(--overlay-control-hover)] text-[var(--overlay-text)] border-transparent"
        />
      </div>

      {/* Main Image View */}
      <div
        className="relative max-w-[92vw] max-h-[82vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-h-[82vh] max-w-[92vw] object-contain rounded-xl shadow-2xl animate-in zoom-in-95 duration-200"
        />
      </div>

      {/* Prev / Next controls */}
      {total > 1 && (
        <div className="absolute inset-x-4 flex items-center justify-between pointer-events-none">
          <IconButton
            icon={<ChevronLeft className="size-6 sm:size-7" />}
            aria-label="Previous image"
            onClick={() => onNavigate((currentIndex - 1 + total) % total)}
            className="pointer-events-auto bg-[var(--overlay-control-bg)] hover:bg-[var(--overlay-control-hover)] text-[var(--overlay-text)] border-transparent size-11 sm:size-12"
          />
          <IconButton
            icon={<ChevronRight className="size-6 sm:size-7" />}
            aria-label="Next image"
            onClick={() => onNavigate((currentIndex + 1) % total)}
            className="pointer-events-auto bg-[var(--overlay-control-bg)] hover:bg-[var(--overlay-control-hover)] text-[var(--overlay-text)] border-transparent size-11 sm:size-12"
          />
        </div>
      )}
    </div>
  );
}
