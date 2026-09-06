import React, { useState } from 'react';
import { ArrowRight, Eye, ShieldCheck, Cpu, Play, CheckCircle2, RotateCw } from 'lucide-react';

interface HeroProps {
  onOpenRFQ: () => void;
  onExploreWork: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenRFQ, onExploreWork }) => {
  const [wireframeMode, setWireframeMode] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [activeCallout, setActiveCallout] = useState<number | null>(null);

  const callouts = [
    { id: 1, x: '24%', y: '28%', title: 'Rotary Actuator Drive', spec: '1.0 HP / 940 RPM' },
    { id: 2, x: '72%', y: '42%', title: 'Precision Gearbox Housing', spec: 'W63 Torque Linkage' },
    { id: 3, x: '45%', y: '75%', title: 'Structural Mild Steel Base', spec: 'Laser-Cut / Welded Subframe' }
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden cad-grid-bg">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[500px] radial-glow pointer-events-none" />
      <div className="absolute top-10 right-10 w-96 h-96 radial-glow-spot pointer-events-none" />

      {/* Engineering coordinate watermark labels */}
      <div className="absolute top-28 left-6 hidden xl:block font-mono text-[10px] text-steel-500 space-y-1 select-none pointer-events-none">
        <div>DATUM: [0, 0, 0]</div>
        <div>SYS_GRID: 32.00mm ISO</div>
        <div>UNITS: METRIC (MM)</div>
        <div>TOL: ISO 2768-mK</div>
      </div>

      <div className="absolute top-28 right-6 hidden xl:block font-mono text-[10px] text-right text-steel-500 space-y-1 select-none pointer-events-none">
        <div>STATUS: ACTIVE_ENG_SESSION</div>
        <div>CAD_CORE: SOLIDWORKS / CATIA / CREO</div>
        <div>REV: 2.0.4 PRODUCTION</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & Intent */}
          <div className="lg:col-span-6 flex flex-col space-y-6 text-left">
            
            {/* Engineering Status Chip */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-elevated border border-surface-border w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-cad animate-pulse" />
              <span className="font-mono text-[11px] font-medium tracking-wider text-steel-300 uppercase">
                MECHANICAL DESIGN &bull; 3D CAD &bull; DFM
              </span>
            </div>

            {/* Hero Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.06]">
              FROM CONCEPT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-steel-200 to-cyan-cad">
                TO PRODUCTION.
              </span>
            </h1>

            {/* Authentic Positioning Copy */}
            <p className="text-base sm:text-lg text-steel-300 max-w-xl font-normal leading-relaxed">
              Mechanical design, precision CAD engineering, and manufacturing-ready solutions for products that must perform in the real world. From first sketch to shop-floor fabrication.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenRFQ}
                className="relative group px-6 py-3.5 rounded bg-cyan-cad hover:bg-cyan-300 text-black font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_0_25px_rgba(0,229,255,0.35)] active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreWork}
                className="px-6 py-3.5 rounded border border-surface-border bg-surface-elevated/70 hover:bg-surface-elevated hover:border-steel-400 text-steel-200 hover:text-white font-mono text-xs sm:text-sm font-medium tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4 text-cyan-cad" />
                <span>Explore Selected Work</span>
              </button>
            </div>

            {/* Engineering Trust Badges */}
            <div className="pt-6 border-t border-surface-border/60 grid grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-cad mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-mono font-semibold text-white">DFM Guaranteed</div>
                  <div className="text-[11px] text-steel-400">Production-ready tolerances</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Cpu className="w-4 h-4 text-cyan-cad mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-mono font-semibold text-white">Native CAD</div>
                  <div className="text-[11px] text-steel-400">SolidWorks, CATIA, Creo</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-cad mt-0.5 shrink-0" />
                <div>
                  <div className="text-xs font-mono font-semibold text-white">Turnaround</div>
                  <div className="text-[11px] text-steel-400">24h initial scoping</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive CAD Viewport */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg bg-surface border border-surface-border p-3 sm:p-4 technical-box shadow-2xl overflow-hidden group">
              
              {/* Telemetry Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-surface-border text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-steel-300 font-semibold">VIEWPORT_01 // ASSEMBLY_CAD</span>
                </div>
                <div className="flex items-center gap-3 text-steel-400 text-[11px]">
                  <span>SCALE: 1:1</span>
                  <span>ISO_ORTHO</span>
                </div>
              </div>

              {/* Viewport Canvas Frame */}
              <div className="relative aspect-[4/3] rounded bg-void/90 overflow-hidden flex items-center justify-center cad-grid-subtle">
                
                {/* Visual Assembly Graphic */}
                <div
                  className={`relative w-full h-full flex items-center justify-center transition-all duration-700 ${
                    isRotating ? 'animate-spin-slow' : ''
                  }`}
                >
                  <img
                    src="/assets/hero 1-rnoKV_8R.png"
                    alt="Authentic Invocad 3D Mechanical Assembly"
                    className={`max-h-[85%] max-w-[85%] object-contain filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] transition-all duration-300 ${
                      wireframeMode
                        ? 'invert hue-rotate-180 contrast-200 brightness-150 opacity-90'
                        : 'group-hover:scale-105'
                    }`}
                  />
                </div>

                {/* Technical Dimension Lines Overlay */}
                <div className="absolute inset-4 pointer-events-none select-none border border-cyan-cad/20 rounded">
                  {/* Top Dimension */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-void/80 px-2 py-0.5 rounded border border-surface-border text-[9px] font-mono text-cyan-cad">
                    &larr; W: 610.00 mm &rarr;
                  </div>

                  {/* Left Dimension */}
                  <div className="absolute top-1/2 left-2 -translate-y-1/2 -rotate-90 bg-void/80 px-2 py-0.5 rounded border border-surface-border text-[9px] font-mono text-cyan-cad">
                    &larr; H: 450.00 mm &rarr;
                  </div>

                  {/* Center Target Crosshair */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 border border-white/10 rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-cyan-cad rounded-full" />
                  </div>
                </div>

                {/* Interactive Technical Inspection Pins */}
                {callouts.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setActiveCallout(activeCallout === c.id ? null : c.id)}
                    style={{ top: c.y, left: c.x }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin focus:outline-none"
                    aria-label={`Inspect ${c.title}`}
                  >
                    <span className="relative flex h-5 w-5 items-center justify-center">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-cad opacity-50" />
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-cad text-black font-mono text-[9px] font-bold items-center justify-center">
                        {c.id}
                      </span>
                    </span>

                    {/* Inspection Tooltip */}
                    <div
                      className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2.5 rounded bg-surface-elevated/95 backdrop-blur-md border border-cyan-cad/40 shadow-xl text-left pointer-events-none transition-all duration-200 ${
                        activeCallout === c.id ? 'opacity-100 scale-100' : 'opacity-0 scale-95 hidden group-hover/pin:block group-hover/pin:opacity-100'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-cyan-cad font-semibold uppercase">
                        NODE #{c.id} &bull; COMPONENT
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">{c.title}</div>
                      <div className="text-[10px] font-mono text-steel-300 mt-1">{c.spec}</div>
                    </div>
                  </button>
                ))}

                {/* Bottom Live Coordinate Readout */}
                <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between font-mono text-[10px] text-steel-400 bg-void/90 backdrop-blur-sm px-2.5 py-1 rounded border border-surface-border">
                  <div className="flex items-center gap-3">
                    <span className="text-cyan-cad">XYZ: [412.8, 104.2, 88.0]</span>
                    <span className="hidden sm:inline">MAT: MILD_STEEL_AISI_1018</span>
                  </div>
                  <div>SURFACE_DEV: &plusmn;0.02mm</div>
                </div>
              </div>

              {/* Viewport Control Bar */}
              <div className="mt-3 pt-3 border-t border-surface-border flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setWireframeMode(!wireframeMode)}
                    className={`px-2.5 py-1 rounded text-[11px] border transition-colors flex items-center gap-1.5 ${
                      wireframeMode
                        ? 'bg-cyan-cad/20 text-cyan-cad border-cyan-cad'
                        : 'bg-surface-elevated text-steel-300 border-surface-border hover:border-steel-400'
                    }`}
                  >
                    <Eye className="w-3 h-3" />
                    <span>{wireframeMode ? 'Wireframe [ON]' : 'Shaded [CAD]'}</span>
                  </button>

                  <button
                    onClick={() => setIsRotating(!isRotating)}
                    className={`px-2.5 py-1 rounded text-[11px] border transition-colors flex items-center gap-1.5 ${
                      isRotating
                        ? 'bg-cyan-cad/20 text-cyan-cad border-cyan-cad'
                        : 'bg-surface-elevated text-steel-300 border-surface-border hover:border-steel-400'
                    }`}
                  >
                    <RotateCw className={`w-3 h-3 ${isRotating ? 'animate-spin' : ''}`} />
                    <span>{isRotating ? 'Turntable Active' : 'Auto-Rotate'}</span>
                  </button>
                </div>

                <div className="text-[11px] text-steel-400 flex items-center gap-1">
                  <Play className="w-2.5 h-2.5 text-cyan-cad" />
                  <span>Interactive Inspection View</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
