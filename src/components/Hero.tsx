import React, { useEffect, useState } from 'react';
import { MechanicalViewport } from './3d/MechanicalViewport';
import { CADInspectionModal } from './3d/CADInspectionModal';
import { ArrowUpRight, ArrowDown, Maximize2 } from 'lucide-react';

interface HeroProps {
  theme: 'warm' | 'dark';
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inspectPartId, setInspectPartId] = useState<string | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const bg = theme === 'warm' ? 'bg-[#F7F6F2]' : 'bg-[#0B0C0E]';
  const textPrimary = theme === 'warm' ? 'text-[#121316]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-600' : 'text-stone-400';
  const accentLine = theme === 'warm' ? 'bg-stone-300' : 'bg-stone-800';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';

  const btnPrimary =
    theme === 'warm'
      ? 'bg-[#121316] text-white hover:bg-black shadow-sm'
      : 'bg-white text-[#121316] hover:bg-stone-200 shadow-sm';

  const btnSecondary =
    theme === 'warm'
      ? 'border border-stone-300 text-stone-700 hover:border-stone-800 hover:text-black'
      : 'border border-stone-700 text-stone-300 hover:border-white hover:text-white';

  const viewportBorder =
    theme === 'warm'
      ? 'border border-stone-200/90 bg-[#edeae4]/70 shadow-[0_20px_50px_rgba(0,0,0,0.04)]'
      : 'border border-white/10 bg-[#12141a]/70 shadow-[0_20px_50px_rgba(0,0,0,0.4)]';

  const openInspection = (partId?: string) => {
    setInspectPartId(partId);
    setModalOpen(true);
  };

  const scrollToCapabilities = () => {
    const el = document.getElementById('capabilities');
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      className={`relative min-h-[92vh] flex items-center pt-24 pb-16 lg:py-0 ${bg} overflow-hidden`}
    >
      {/* Subtle Architectural Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          color: theme === 'warm' ? '#666' : '#fff',
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-8 lg:py-16">
        {/* EDITORIAL SPLIT: Left Headline (55%) | Right Contained 3D Assembly (45%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* LEFT: Massive Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10 order-2 lg:order-1">
            {/* Overline Label */}
            <div className="flex items-center gap-3 mb-6 lg:mb-8">
              <span className={`w-8 h-px ${accentLine}`} />
              <span className={`text-[11px] font-mono tracking-[0.25em] uppercase ${tagColor}`}>
                01 / Digital Engineering Showroom
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1
                className={`font-extrabold tracking-[-0.035em] leading-[0.88] ${textPrimary}`}
                style={{ fontSize: 'clamp(3rem, 7.2vw, 6.2rem)' }}
              >
                <span className="block">PRECISION</span>
                <span className="block">IN EVERY</span>
                <span className="block">DETAIL.</span>
              </h1>
            </div>

            {/* Sub-headline */}
            <div className="mt-6 lg:mt-8 max-w-lg">
              <p className={`text-base md:text-lg leading-relaxed font-normal ${textSub}`}>
                Precision CAD &amp; mechanical engineering — from concept sketch to production-ready
                documentation, DFM validation, and tooling handoff.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 lg:mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 ${btnPrimary}`}
              >
                <span>START A PROJECT</span>
                <ArrowUpRight size={14} />
              </a>

              <button
                onClick={scrollToCapabilities}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 ${btnSecondary}`}
              >
                <span>EXPLORE CAPABILITIES</span>
                <ArrowDown size={14} />
              </button>
            </div>

            {/* Subtle Technical Annotations — Restrained Engineering Seasoning */}
            <div
              className={`mt-14 pt-8 border-t flex flex-wrap gap-8 lg:gap-12 ${
                theme === 'warm' ? 'border-stone-200' : 'border-stone-800'
              }`}
            >
              {[
                { code: '01', title: 'PRECISION ASSEMBLY', desc: 'DIN 3962 Class 6 Tolerancing' },
                { code: '02', title: 'CNC MACHINED', desc: 'Billet 7075-T6 & 4140 Steel' },
                { code: '03', title: '1:4.2 RATIO', desc: 'Epicyclic Planetary Transmission' },
              ].map((item) => (
                <div key={item.code} className="flex flex-col">
                  <span className="font-mono text-[10px] text-stone-400 uppercase tracking-widest mb-0.5">
                    {item.code} / {item.title}
                  </span>
                  <span className={`text-xs font-medium ${textPrimary}`}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Contained, Art-Directed 3D Mechanical Viewport (35-45% width) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2">
            {/* Viewport Frame */}
            <div
              className={`relative w-full rounded-2xl overflow-hidden ${viewportBorder}`}
              style={{ height: 'min(540px, 65vh)', minHeight: '380px' }}
            >
              <MechanicalViewport
                className="w-full h-full"
                autoRotate={true}
                cameraZ={7.8}
                rotationOffset={{ x: 0.3, y: -0.42 }}
                explosionFactor={0}
                showControls={true}
                interactive={true}
                onOpenInspectModal={openInspection}
              />

              {/* Minimalist Top Right "Inspect CAD" Pill */}
              <div className="absolute top-4 right-4 pointer-events-auto z-20">
                <button
                  onClick={() => openInspection()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black text-white/90 hover:text-white backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider uppercase transition-all shadow-sm"
                >
                  <Maximize2 size={11} />
                  <span>Inspect CAD</span>
                </button>
              </div>
            </div>

            {/* Sub-label under 3D model */}
            <div className="mt-3 flex items-center justify-between w-full px-2 text-[10px] font-mono uppercase tracking-widest text-stone-400">
              <span>Interactive Model • Drag to Orbit</span>
              <span className="hidden sm:inline">PBR Physical Shading</span>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen CAD Inspection Modal */}
      <CADInspectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPartId={inspectPartId}
        theme={theme}
      />
    </section>
  );
};
