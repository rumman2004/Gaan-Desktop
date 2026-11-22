import React from "react";
import { Navbar } from "../shared/Navbar";
import { Footer } from "../shared/Footer";
import { BackToTop } from "../shared/BackToTop";
import { SmoothCursor } from "../magicui/smooth-cursor";

export interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <BackToTop />
      <SmoothCursor />
    </div>
  );
}
