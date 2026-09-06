import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Cpu, Wrench, Layers, Compass } from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../data/invocadData';

interface ServicesMatrixProps {
  onSelectServiceForRFQ: (serviceTitle: string) => void;
}

export const ServicesMatrix: React.FC<ServicesMatrixProps> = ({ onSelectServiceForRFQ }) => {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES_DATA[0].id);

  const activeService = SERVICES_DATA.find((s) => s.id === activeServiceId) || SERVICES_DATA[0];

  return (
    <section id="services" className="py-24 border-b border-surface-border relative bg-surface-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-cad" />
              <span className="font-mono text-xs text-steel-400 tracking-widest uppercase">
                SECTION 02 // CAPABILITIES &amp; SERVICES
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              ENGINEERING SUITE.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-steel-300 font-normal leading-relaxed">
            Ten specialized engineering disciplines covering every stage of hardware development — from abstract ideation to shop-floor CNC fabrication.
          </p>
        </div>

        {/* Desktop Interactive Layout (Two Columns: Index on Left, Active Spec Panel on Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Index (10 Services List) */}
          <div className="lg:col-span-5 space-y-2">
            {SERVICES_DATA.map((service) => {
              const isActive = service.id === activeServiceId;
              return (
                <div
                  key={service.id}
                  onClick={() => setActiveServiceId(service.id)}
                  onMouseEnter={() => setActiveServiceId(service.id)}
                  className={`cursor-pointer p-4 rounded-lg border transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-surface-elevated border-cyan-cad shadow-[0_0_20px_rgba(0,229,255,0.12)]'
                      : 'bg-surface/60 border-surface-border hover:bg-surface hover:border-steel-500'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs transition-colors ${
                          isActive ? 'text-cyan-cad font-bold' : 'text-steel-500 group-hover:text-steel-300'
                        }`}
                      >
                        {service.number}
                      </span>
                      <h3
                        className={`text-sm sm:text-base font-bold tracking-wide transition-colors ${
                          isActive ? 'text-white' : 'text-steel-200 group-hover:text-white'
                        }`}
                      >
                        {service.title}
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline font-mono text-[10px] text-steel-400 uppercase">
                        {service.category}
                      </span>
                      <ArrowUpRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isActive
                            ? 'text-cyan-cad translate-x-0.5 -translate-y-0.5'
                            : 'text-steel-600 group-hover:text-steel-400'
                        }`}
                      />
                    </div>
                  </div>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-cad rounded-r" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Spec Sheet Viewport */}
          <div className="lg:col-span-7 lg:sticky lg:top-24">
            <div className="rounded-xl bg-surface border border-surface-border p-6 sm:p-8 technical-box shadow-2xl relative overflow-hidden">
              
              {/* Header Telemetry */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-6 border-b border-surface-border">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2 py-0.5 rounded bg-cyan-cad/10 text-cyan-cad border border-cyan-cad/20 font-bold">
                    SPEC_ID // {activeService.number}
                  </span>
                  <span className="text-steel-400 font-medium uppercase">
                    {activeService.category}
                  </span>
                </div>
                <div className="font-mono text-xs text-steel-500">
                  STANDARD: ASME &bull; ISO &bull; DIN
                </div>
              </div>

              {/* Title & Short Desc */}
              <div className="space-y-3 mb-6">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeService.title}
                </h3>
                <p className="text-sm sm:text-base text-steel-200 leading-relaxed">
                  {activeService.fullDesc}
                </p>
              </div>

              {/* Authentic Visual Render Frame */}
              <div className="relative aspect-[16/9] rounded-lg bg-void border border-surface-border overflow-hidden mb-6 group/img flex items-center justify-center cad-grid-bg">
                <img
                  src={activeService.image}
                  alt={activeService.title}
                  className="w-full h-full object-contain p-4 group-hover/img:scale-105 transition-transform duration-500 filter drop-shadow-xl"
                  onError={(e) => {
                    // Fallback to stylized SVG placeholder if specific format needs adjustment
                    (e.target as HTMLElement).style.opacity = '0.9';
                  }}
                />
                <div className="absolute bottom-2 left-2 bg-void/80 backdrop-blur-sm border border-surface-border px-2.5 py-0.5 rounded font-mono text-[10px] text-cyan-cad">
                  CAD_ASSET // {activeService.title.toUpperCase()}
                </div>
              </div>

              {/* Technical Deliverables Checklist */}
              <div className="space-y-3 mb-6">
                <div className="text-xs font-mono text-steel-400 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-cyan-cad" />
                  <span>Key Deliverables &amp; Engineering Scope</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.bullets.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded bg-surface-elevated/70 border border-surface-border text-xs text-steel-300 flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-cad mt-0.5 shrink-0" />
                      <span className="leading-snug">{bullet}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tooling Tags & Direct Action */}
              <div className="pt-4 border-t border-surface-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-mono text-[10px] text-steel-400 uppercase mr-1">STACK:</span>
                  {activeService.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-void border border-surface-border font-mono text-[10px] text-steel-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => onSelectServiceForRFQ(activeService.title)}
                  className="px-4 py-2 rounded bg-cyan-cad hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shrink-0"
                >
                  <span>Scope This Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
