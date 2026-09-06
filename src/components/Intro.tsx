import React from 'react';
import { Target, Layers, Cpu, ArrowUpRight, CheckSquare } from 'lucide-react';
import { COMPANY_INFO } from '../data/invocadData';

export const Intro: React.FC = () => {
  return (
    <section id="about" className="py-24 border-b border-surface-border relative bg-void overflow-hidden">
      {/* Background CAD detail grid watermark */}
      <div className="absolute inset-0 cad-grid-bg opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Telemetry Identifier */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-cad" />
          <span className="font-mono text-xs text-steel-400 tracking-widest uppercase">
            SECTION 01 // MISSION &amp; PHILOSOPHY
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Bold Statement */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              ENGINEERING THAT MOVES PRODUCTS FORWARD.
            </h2>

            <div className="p-5 rounded-lg bg-surface border border-surface-border technical-box">
              <div className="text-xs font-mono text-cyan-cad uppercase tracking-wider mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                <span>CORE DIRECTIVE</span>
              </div>
              <p className="text-steel-200 text-sm sm:text-base leading-relaxed">
                "At Invocad, we exist to transform raw ideas into real-world products through intelligent design and precision engineering. Our mission is to bridge imagination and industry — crafting every line, curve, and component with purpose."
              </p>
            </div>

            {/* Flexible Engagement Callout */}
            <div className="border-l-2 border-cyan-cad pl-4 py-1 space-y-1">
              <div className="text-xs font-mono font-semibold text-white uppercase">
                Flexible Lifecycle Engagement
              </div>
              <p className="text-xs text-steel-400 leading-relaxed">
                Engage us for end-to-end turnkey development or standalone modules: standalone 3D CAD modeling, 2D-to-3D drawing migration, FEA simulation audit, or DFM production support.
              </p>
            </div>
          </div>

          {/* Right Column: Three Engineering Pillars */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Pillar 1 */}
            <div className="p-6 rounded-lg bg-surface border border-surface-border hover:border-steel-400 transition-colors group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-elevated border border-surface-border flex items-center justify-center text-cyan-cad group-hover:border-cyan-cad transition-colors">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Manufacturing-Aware Engineering
                  </h3>
                </div>
                <span className="font-mono text-xs text-steel-500">01</span>
              </div>
              <p className="text-xs sm:text-sm text-steel-300 mt-3 leading-relaxed">
                Every CAD file is designed around real machine tooling limits: sheet metal bend radii, laser cutting kerfs, CNC milling clearances, injection draft angles, and standard hardware sizes.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-lg bg-surface border border-surface-border hover:border-steel-400 transition-colors group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-elevated border border-surface-border flex items-center justify-center text-cyan-cad group-hover:border-cyan-cad transition-colors">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Parametric Precision &amp; Standards
                  </h3>
                </div>
                <span className="font-mono text-xs text-steel-500">02</span>
              </div>
              <p className="text-xs sm:text-sm text-steel-300 mt-3 leading-relaxed">
                We build fully parametric solid and surface models with clean feature trees in native formats (SolidWorks, CATIA, Creo). All technical drawings comply strictly with ASME Y14.5 and ISO standards.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-lg bg-surface border border-surface-border hover:border-steel-400 transition-colors group">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-surface-elevated border border-surface-border flex items-center justify-center text-cyan-cad group-hover:border-cyan-cad transition-colors">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Inventor to Enterprise Agility
                  </h3>
                </div>
                <span className="font-mono text-xs text-steel-500">03</span>
              </div>
              <p className="text-xs sm:text-sm text-steel-300 mt-3 leading-relaxed">
                From solo inventors with patent concepts to MSMEs scaling custom conveyor machinery or automotive OEMs needing specialized tooling fixtures — we adapt seamlessly to your technical brief.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
