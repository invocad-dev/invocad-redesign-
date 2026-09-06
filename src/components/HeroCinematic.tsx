import React from 'react';
import { ArrowRight, ArrowDownRight, Compass } from 'lucide-react';

interface HeroCinematicProps {
  onOpenRFQ: () => void;
  onExploreWork: () => void;
  isDarkTheme: boolean;
}

export const HeroCinematic: React.FC<HeroCinematicProps> = ({
  onOpenRFQ,
  onExploreWork,
  isDarkTheme,
}) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 lg:px-16 overflow-hidden pointer-events-none">
      
      {/* Top Editorial Annotation Bar */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] sm:text-xs tracking-[0.2em] uppercase opacity-70 border-b border-current/10 pb-4">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span>INVOCAD &bull; SPEC_01</span>
          <span className="hidden sm:inline">&bull; PLANETARY DRIVE ASSEMBLY</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="hidden md:inline">SYSTEM: MECHANICAL CAD // CAE</span>
          <span>REV. 04 &bull; TOL: &plusmn;0.02MM</span>
        </div>
      </div>

      {/* Main Hero Dramatic Layout (Magazine / Editorial Scale) */}
      <div className="my-auto py-12 relative z-10">
        <div className="max-w-[90vw] xl:max-w-7xl">
          
          {/* Subtitle Telemetry Pill */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-current/15 font-mono text-[10px] tracking-widest uppercase">
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>HIGH-PRECISION PRODUCT ENGINEERING</span>
          </div>

          {/* Enormous Editorial Headline (8vw–12vw) */}
          <h1 className="text-[12vw] sm:text-[10vw] lg:text-[8.5vw] font-black uppercase tracking-[-0.04em] leading-[0.88] select-none">
            PRECISION <br />
            <span className="opacity-40 hover:opacity-100 transition-opacity">IN EVERY</span> <br />
            DETAIL.
          </h1>

          {/* Concise Supporting Copy & CTA row */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-end pointer-events-auto">
            <p className="md:col-span-5 text-sm sm:text-base font-normal leading-relaxed opacity-80 max-w-md">
              Invocad transforms complex ideas into manufacturable mechanical hardware. Native 3D CAD modeling, kinematics, CAE simulation, and shop-floor engineering drawings.
            </p>

            <div className="md:col-span-7 flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              <button
                onClick={onOpenRFQ}
                className={`group px-7 py-3.5 rounded-full font-mono text-xs font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-2 ${
                  isDarkTheme
                    ? 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_30px_rgba(255,255,255,0.25)]'
                    : 'bg-black text-white hover:bg-neutral-800 shadow-[0_0_25px_rgba(0,0,0,0.2)]'
                }`}
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreWork}
                className="px-6 py-3.5 rounded-full border border-current/20 font-mono text-xs tracking-wider uppercase hover:border-current transition-colors flex items-center gap-2 opacity-80 hover:opacity-100"
              >
                <span>Explore Showcase</span>
                <ArrowDownRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Subtle Bottom Technical Callout Strip */}
      <div className="w-full flex flex-wrap items-center justify-between gap-4 font-mono text-[9px] sm:text-[10px] tracking-widest uppercase opacity-50 border-t border-current/10 pt-4">
        <div>COORDINATES: [X: 312.40, Y: 180.50, Z: 95.00]</div>
        <div className="hidden sm:inline">SOLIDWORKS &bull; CATIA &bull; CREO &bull; AUTOCAD</div>
        <div>SCROLL TO EXPLORE 3D ASSEMBLY &darr;</div>
      </div>

    </section>
  );
};
