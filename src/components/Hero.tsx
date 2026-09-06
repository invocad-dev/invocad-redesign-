import React, { useEffect, useRef, useState } from 'react';
import { MechanicalViewport } from './3d/MechanicalViewport';
import { CADInspectionModal } from './3d/CADInspectionModal';
import { Maximize2, MousePointer } from 'lucide-react';

interface HeroProps {
  theme: 'warm' | 'dark';
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [inspectPartId, setInspectPartId] = useState<string | undefined>(undefined);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const bg = theme === 'warm' ? 'bg-[#F5F4F0]' : 'bg-[#0B0C0E]';
  const textPrimary = theme === 'warm' ? 'text-[#111118]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-500' : 'text-stone-400';
  const accentLine = theme === 'warm' ? 'bg-stone-300' : 'bg-stone-700';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const btnBg =
    theme === 'warm'
      ? 'bg-[#111118] text-white hover:bg-[#2a2a3e]'
      : 'bg-white text-[#111118] hover:bg-stone-200';
  const btnOutline =
    theme === 'warm'
      ? 'border-stone-300 text-stone-700 hover:border-stone-500'
      : 'border-stone-600 text-stone-300 hover:border-stone-400';

  const viewportBorder =
    theme === 'warm' ? 'border-stone-200/80 shadow-stone-300/40' : 'border-white/10 shadow-black/60';

  const openInspection = (partId?: string) => {
    setInspectPartId(partId);
    setModalOpen(true);
  };

  return (
    <section
      id="home"
      ref={ref}
      className={`relative min-h-screen flex items-center ${bg} overflow-hidden`}
    >
      {/* Subtle CAD background grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          color: theme === 'warm' ? '#888' : '#fff',
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-24 pb-16">
        {/* GRID: Left text | Right 3D */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 min-h-[82vh] items-center">
          {/* LEFT COLUMN — Editorial Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10 order-2 lg:order-1">
            {/* Overline label */}
            <div
              className={`flex items-center gap-3 mb-8 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className={`inline-block w-8 h-px ${accentLine}`} />
              <span className={`text-xs tracking-[0.3em] uppercase font-mono ${tagColor}`}>
                Precision CAD Engineering Studio
              </span>
            </div>

            {/* Main headline */}
            <div
              className={`transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <h1
                className={`font-bold leading-[0.9] tracking-tight ${textPrimary}`}
                style={{ fontSize: 'clamp(2.8rem, 6.2vw, 5.2rem)' }}
              >
                <span className="block">PRECISION</span>
                <span className="block">IN EVERY</span>
                <span className="block">DETAIL.</span>
              </h1>
            </div>

            {/* Sub-headline */}
            <div
              className={`mt-7 max-w-md transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <p className={`text-base leading-relaxed ${textSub}`}>
                Industrial product design and mechanical engineering — from concept sketch to
                production-ready CAD models, DFM validation, and GD&T documentation.
              </p>
            </div>

            {/* CTAs */}
            <div
              className={`mt-9 flex flex-wrap items-center gap-3.5 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <a
                href="#contact"
                className={`px-7 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-200 shadow-md ${btnBg}`}
              >
                Start a Project
              </a>
              <button
                onClick={() => openInspection()}
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-full text-sm font-semibold tracking-wider uppercase border transition-all duration-200 ${btnOutline}`}
              >
                <Maximize2 size={15} />
                Inspect 3D CAD
              </button>
            </div>

            {/* Stats row */}
            <div
              className={`mt-14 pt-8 border-t flex gap-10 transition-all duration-700 ${
                visible ? 'opacity-100' : 'opacity-0'
              } ${theme === 'warm' ? 'border-stone-200' : 'border-stone-800'}`}
              style={{ transitionDelay: '450ms' }}
            >
              {[
                { num: '10+', label: 'CAD Disciplines' },
                { num: '5', label: 'CAD Tool Suites' },
                { num: '100%', label: 'DFM Validated' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className={`text-2xl font-bold ${textPrimary}`}>{num}</div>
                  <div className={`text-xs tracking-wider uppercase mt-0.5 ${tagColor}`}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — Production-Grade 3D Viewport */}
          <div
            className={`lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 transition-all duration-1000 ${
              visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            {/* Viewport card with rounded border and subtle shadow */}
            <div
              className={`relative w-full rounded-2xl overflow-hidden border shadow-2xl ${viewportBorder} ${
                theme === 'warm' ? 'bg-[#edeae4]' : 'bg-[#0f1117]'
              }`}
              style={{ height: 'min(580px, 72vh)', minHeight: '420px' }}
            >
              <MechanicalViewport
                className="w-full h-full"
                autoRotate={true}
                cameraZ={7.8}
                rotationOffset={{ x: 0.3, y: -0.4 }}
                explosionFactor={0}
                showControls={true}
                interactive={true}
                onOpenInspectModal={openInspection}
              />
            </div>

            {/* Interactive hint footer */}
            <div className="mt-3.5 flex items-center justify-between w-full px-2 text-[11px] font-mono tracking-wider uppercase text-stone-400">
              <div className="flex items-center gap-1.5">
                <MousePointer size={12} className="text-cyan-500 animate-bounce" />
                <span>Drag to rotate • Scroll to zoom • Click parts to inspect</span>
              </div>
              <span className="hidden sm:inline">PBR Met/Rough Studio Lighting</span>
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
