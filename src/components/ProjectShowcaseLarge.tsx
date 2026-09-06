import React, { useState } from 'react';
import { ArrowRight, ChevronRight, ChevronLeft, ArrowUpRight, Gauge, Layers, Wrench } from 'lucide-react';
import { PRODUCTS_DATA, ProductItem } from '../data/invocadData';

interface ProjectShowcaseLargeProps {
  onInspectProduct: (product: ProductItem) => void;
}

export const ProjectShowcaseLarge: React.FC<ProjectShowcaseLargeProps> = ({
  onInspectProduct,
}) => {
  const [activeProjectIdx, setActiveProjectIdx] = useState(0);

  const activeProject = PRODUCTS_DATA[activeProjectIdx];

  const handleNext = () => {
    setActiveProjectIdx((prev) => (prev + 1) % PRODUCTS_DATA.length);
  };

  const handlePrev = () => {
    setActiveProjectIdx((prev) => (prev - 1 + PRODUCTS_DATA.length) % PRODUCTS_DATA.length);
  };

  return (
    <section id="work" className="min-h-screen py-28 px-6 sm:px-12 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-current/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>04 // INDUSTRIAL HARDWARE PORTFOLIO</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-[-0.03em] leading-none">
              ENGINEERING SHOWCASE.
            </h2>
          </div>

          {/* Project Carousel Controls */}
          <div className="flex items-center gap-4 font-mono text-xs">
            <span className="opacity-60">
              0{activeProjectIdx + 1} / 0{PRODUCTS_DATA.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-current/20 flex items-center justify-center hover:border-current transition-colors"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-current/20 flex items-center justify-center hover:border-current transition-colors"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Giant Editorial Campaign Canvas */}
        <div className="relative rounded-2xl border border-current/15 bg-current/5 overflow-hidden p-6 sm:p-12 lg:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left: Giant Authentic Machine Visual */}
            <div className="lg:col-span-7 aspect-[16/11] rounded-xl overflow-hidden relative flex items-center justify-center p-8 border border-current/10 bg-current/5">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-all duration-700 hover:scale-105"
              />

              <div className="absolute top-4 left-4 font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded bg-black/40 backdrop-blur-md text-white border border-white/10">
                PROJ_REF // 0{activeProject.id}
              </div>

              <div className="absolute bottom-4 right-4 font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded bg-black/40 backdrop-blur-md text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{activeProject.status}</span>
              </div>
            </div>

            {/* Right: Editorial Typography & Machine Metadata */}
            <div className="lg:col-span-5 space-y-6">
              <div className="font-mono text-xs tracking-widest uppercase text-cyan-400">
                {activeProject.category}
              </div>

              <h3 className="text-3xl sm:text-5xl font-black uppercase tracking-tight leading-[1.02]">
                {activeProject.title}
              </h3>

              <p className="text-sm sm:text-base leading-relaxed opacity-80">
                {activeProject.tagline}
              </p>

              {/* Specification Highlights */}
              <div className="space-y-2.5 border-y border-current/10 py-5 font-mono text-xs">
                {activeProject.specs.slice(0, 4).map((spec, sIdx) => (
                  <div key={sIdx} className="flex items-center justify-between">
                    <span className="opacity-60">{spec.label}:</span>
                    <span className="font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={() => onInspectProduct(activeProject)}
                  className="w-full sm:w-auto px-8 py-4 rounded-full border border-current hover:bg-current hover:text-black transition-all duration-300 font-mono text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 group"
                >
                  <span>View Project Specifications</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>

            </div>

          </div>

          {/* Quick Switcher Thumbnails */}
          <div className="mt-12 pt-8 border-t border-current/10 grid grid-cols-5 gap-3 sm:gap-4">
            {PRODUCTS_DATA.map((prod, pIdx) => {
              const isSelected = pIdx === activeProjectIdx;
              return (
                <button
                  key={prod.id}
                  onClick={() => setActiveProjectIdx(pIdx)}
                  className={`text-left p-2.5 sm:p-3 rounded-lg border transition-all text-xs font-mono truncate ${
                    isSelected
                      ? 'border-current bg-current/10 font-bold'
                      : 'border-current/10 opacity-50 hover:opacity-90'
                  }`}
                >
                  <span className="block text-[10px] opacity-60">0{prod.id}</span>
                  <span className="truncate block font-sans">{prod.title}</span>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
