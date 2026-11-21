import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ThemePreview } from './components/ThemePreview';
import { AiSection } from './components/AiSection';
import { MobileAppSection } from './components/MobileAppSection';
import { FeaturesGrid } from './components/FeaturesGrid';
import { ComparisonTable } from './components/ComparisonTable';
import { DownloadModal } from './components/DownloadModal';
import { Footer } from './components/Footer';

export default function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [detectedOS, setDetectedOS] = useState<'windows' | 'mac' | 'android' | 'other'>('windows');

  useEffect(() => {
    const ua = window.navigator.userAgent.toLowerCase();
    if (ua.includes('android')) {
      setDetectedOS('android');
    } else if (ua.includes('mac') || ua.includes('iphone') || ua.includes('ipad')) {
      setDetectedOS('mac');
    } else if (ua.includes('win')) {
      setDetectedOS('windows');
    } else {
      setDetectedOS('other');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c0e] text-[#f4f4f6] selection:bg-rose-500/30 selection:text-white relative">
      {/* Top Navbar */}
      <Navbar
        onOpenDownload={() => setDownloadModalOpen(true)}
        detectedOS={detectedOS}
      />

      <main>
        {/* Hero Section with Interactive Mockup */}
        <Hero
          onOpenDownload={() => setDownloadModalOpen(true)}
          detectedOS={detectedOS}
        />

        {/* Aesthetic Themes Live Showcase */}
        <ThemePreview />

        {/* AI Recommendations & Multi-Provider Cascade */}
        <AiSection />

        {/* Android Mobile App Showcase */}
        <MobileAppSection
          onDownloadApk={() => setDownloadModalOpen(true)}
        />

        {/* 8-Card Features Grid */}
        <FeaturesGrid />

        {/* Spotify vs Gaan Comparison Table */}
        <ComparisonTable />
      </main>

      {/* Footer */}
      <Footer />

      {/* Platform Download Modal */}
      <DownloadModal
        isOpen={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
      />
    </div>
  );
}
