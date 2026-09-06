import React, { useState, useEffect } from 'react';
import { SceneBackground } from './components/3d/SceneBackground';
import { NavbarMinimal } from './components/NavbarMinimal';
import { HeroCinematic } from './components/HeroCinematic';
import { IntroEditorial } from './components/IntroEditorial';
import { CapabilitiesEditorial } from './components/CapabilitiesEditorial';
import { ProjectShowcaseLarge } from './components/ProjectShowcaseLarge';
import { ProcessPipeline } from './components/ProcessPipeline';
import { TechnicalExplodedShowcase } from './components/TechnicalExplodedShowcase';
import { FinalCTA3D } from './components/FinalCTA3D';
import { ProjectModal } from './components/ProjectModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProductItem } from './data/invocadData';

export function App() {
  // Theme state: default to warm off-white/titanium studio inspired by Pinterest reference
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Scroll tracking state for 3D synchronization
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [explosionFactor, setExplosionFactor] = useState(0);

  // Interactive modal states
  const [rfqModalOpen, setRfqModalOpen] = useState(false);
  const [selectedRfqService, setSelectedRfqService] = useState<string | undefined>(undefined);
  const [inspectedProduct, setInspectedProduct] = useState<ProductItem | null>(null);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      setScrollProgress(progress);

      // Section triggers based on element positions
      const sectionIds = ['hero', 'about', 'services', 'work', 'process', 'technical', 'contact'];
      const scrollMiddle = scrollY + window.innerHeight * 0.45;

      let currentSec = 0;
      sectionIds.forEach((id, index) => {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollMiddle >= top) {
            currentSec = index;
          }
        }
      });
      setActiveSection(currentSec);

      // Exploded factor calculation: smoothly expand as approaching/entering section 5 (technical)
      const techEl = document.getElementById('technical');
      if (techEl) {
        const techTop = techEl.offsetTop;
        const techHeight = techEl.offsetHeight;
        const distToTech = scrollY - (techTop - window.innerHeight * 0.6);
        if (distToTech > 0 && distToTech < techHeight + window.innerHeight * 0.5) {
          const factor = Math.min(1, Math.max(0, distToTech / (window.innerHeight * 0.6)));
          setExplosionFactor(factor);
        } else if (distToTech >= techHeight + window.innerHeight * 0.5) {
          setExplosionFactor(0.1);
        } else {
          setExplosionFactor(0);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenRFQ = (serviceTitle?: string) => {
    setSelectedRfqService(serviceTitle);
    setRfqModalOpen(true);
  };

  const handleExploreWork = () => {
    const workEl = document.getElementById('work');
    if (workEl) {
      workEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 font-sans selection:bg-cyan-400 selection:text-black ${
        isDarkTheme
          ? 'bg-[#0B0C0E] text-[#F8FAFC]'
          : 'bg-[#F7F6F2] text-[#0E0F12]'
      }`}
    >
      {/* 3D Mechanical Assembly Scene Running in Background */}
      <SceneBackground
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        explosionFactor={explosionFactor}
        isDarkTheme={isDarkTheme}
      />

      {/* Floating Minimal Navigation */}
      <NavbarMinimal
        onOpenRFQ={() => handleOpenRFQ()}
        isDarkTheme={isDarkTheme}
        onToggleTheme={() => setIsDarkTheme(!isDarkTheme)}
      />

      {/* Main Single Continuous Editorial Experience */}
      <main className="relative z-10">
        <div id="hero">
          <HeroCinematic
            onOpenRFQ={() => handleOpenRFQ()}
            onExploreWork={handleExploreWork}
            isDarkTheme={isDarkTheme}
          />
        </div>

        <div id="about">
          <IntroEditorial />
        </div>

        <div id="services">
          <CapabilitiesEditorial
            onSelectService={(title) => handleOpenRFQ(title)}
            onHoverCapability={() => {}}
          />
        </div>

        <div id="work">
          <ProjectShowcaseLarge
            onInspectProduct={(prod) => setInspectedProduct(prod)}
          />
        </div>

        <div id="process">
          <ProcessPipeline />
        </div>

        <div id="technical">
          <TechnicalExplodedShowcase />
        </div>

        <div id="contact">
          <FinalCTA3D
            onOpenRFQ={() => handleOpenRFQ()}
            isDarkTheme={isDarkTheme}
          />
        </div>
      </main>

      {/* RFQ Project Scoping Modal */}
      <ProjectModal
        isOpen={rfqModalOpen}
        onClose={() => setRfqModalOpen(false)}
        defaultService={selectedRfqService}
      />

      {/* Industrial Machine Specification Modal */}
      <ProjectDetailModal
        product={inspectedProduct}
        onClose={() => setInspectedProduct(null)}
        onInquire={(title) => {
          setInspectedProduct(null);
          handleOpenRFQ(`Machinery: ${title}`);
        }}
      />
    </div>
  );
}

export default App;
