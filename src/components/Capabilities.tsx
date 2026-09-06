import React, { useState } from 'react';
import { MechanicalViewport } from './3d/MechanicalViewport';
import { ArrowRight } from 'lucide-react';

interface CapabilitiesProps {
  theme: 'warm' | 'dark';
}

const SERVICES = [
  { id: '01', title: 'Product Design', desc: 'Full 3D product development from concept to production-ready model. SolidWorks, CATIA, Creo.' },
  { id: '02', title: 'DFM / DFA', desc: 'Design for Manufacturing and Assembly — tolerance stack-up, process selection, supplier alignment.' },
  { id: '03', title: 'Drafting & GD&T', desc: 'ASME-compliant 2D drawings, title blocks, BOMs, and GD&T annotation for shop floor use.' },
  { id: '04', title: 'Reverse Engineering', desc: 'Scan-to-CAD workflows from physical parts or legacy drawings back into parametric models.' },
  { id: '05', title: '2D-to-3D Migration', desc: 'Convert flat AutoCAD drawings into fully-parametric 3D solid models.' },
  { id: '06', title: 'Mechanism & Kinematics', desc: 'Linkage synthesis, motion simulation, clearance checks, and kinematic reports.' },
  { id: '07', title: 'CAE / Simulation', desc: 'ANSYS-based FEA, stress and thermal analysis, fatigue life estimation.' },
  { id: '08', title: 'Rendering', desc: 'Photorealistic product visualisation for marketing, investor decks, and client approvals.' },
  { id: '09', title: 'AutoCAD Nesting', desc: 'Sheet metal nesting, die layout, and material yield optimisation.' },
  { id: '10', title: 'Concept Design', desc: 'Industrial design ideation, form exploration, and design language development.' },
];

// Each service maps to a specific viewport pose
const POSES: Array<{ rotationOffset: { x: number; y: number }; explosionFactor: number }> = [
  { rotationOffset: { x: 0.2, y: -0.3 }, explosionFactor: 0 },
  { rotationOffset: { x: 0.0, y: 0.5 }, explosionFactor: 0 },
  { rotationOffset: { x: -0.2, y: -0.6 }, explosionFactor: 0 },
  { rotationOffset: { x: 0.3, y: 0.8 }, explosionFactor: 0 },
  { rotationOffset: { x: 0.4, y: -0.9 }, explosionFactor: 0 },
  { rotationOffset: { x: 0.1, y: 1.2 }, explosionFactor: 0.3 },
  { rotationOffset: { x: -0.1, y: -1.1 }, explosionFactor: 0.5 },
  { rotationOffset: { x: 0.35, y: 0.2 }, explosionFactor: 0 },
  { rotationOffset: { x: -0.3, y: 0.7 }, explosionFactor: 0 },
  { rotationOffset: { x: 0.15, y: -0.4 }, explosionFactor: 0 },
];

export const Capabilities: React.FC<CapabilitiesProps> = ({ theme }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  const bg = theme === 'warm' ? 'bg-[#F5F4F0]' : 'bg-[#0B0C0E]';
  const textPrimary = theme === 'warm' ? 'text-[#111118]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-500' : 'text-stone-400';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const divider = theme === 'warm' ? 'border-stone-200' : 'border-stone-800';
  const hoverBg = theme === 'warm' ? 'hover:bg-stone-100' : 'hover:bg-white/5';
  const activeBg = theme === 'warm' ? 'bg-stone-100' : 'bg-white/5';

  return (
    <section id="services-detail" className={`${bg} py-32 px-6 md:px-12`}>
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-20">
          <span className={`text-xs tracking-[0.3em] uppercase font-mono ${tagColor}`}>03 — Capabilities</span>
        </div>

        {/* Two-column: index list LEFT, 3D RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Service index list */}
          <div className={`lg:col-span-7 border-t ${divider}`}>
            {SERVICES.map((svc, i) => (
              <div
                key={svc.id}
                onMouseEnter={() => setActiveIdx(i)}
                className={`group flex items-start gap-6 py-5 px-3 cursor-default border-b ${divider} transition-all duration-200 rounded-sm ${i === activeIdx ? activeBg : hoverBg}`}
              >
                <span className={`font-mono text-xs pt-1 flex-shrink-0 ${tagColor}`}>{svc.id}</span>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-semibold transition-colors duration-200 ${textPrimary}`}
                    style={{ fontSize: 'clamp(0.9rem, 1.4vw, 1.1rem)' }}
                  >
                    {svc.title}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed mt-1 transition-all duration-300 ${textSub} ${i === activeIdx ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                  >
                    {svc.desc}
                  </p>
                </div>
                <ArrowRight
                  size={15}
                  className={`flex-shrink-0 mt-1 transition-all duration-200 ${i === activeIdx ? `opacity-100 ${textPrimary}` : 'opacity-0'}`}
                />
              </div>
            ))}
          </div>

          {/* Sticky 3D panel — RIGHT SIDE ONLY */}
          <div className="hidden lg:flex lg:col-span-5 items-start">
            <div className="sticky top-24 w-full">
              {/* Service name display */}
              <div className="mb-4">
                <div className={`font-mono text-xs ${tagColor} mb-1`}>Currently viewing</div>
                <div className={`text-lg font-semibold ${textPrimary}`}>
                  {SERVICES[activeIdx].title}
                </div>
              </div>

              {/* 3D viewport — contained, bounded */}
              <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingBottom: '100%' }}>
                <MechanicalViewport
                  className="absolute inset-0 w-full h-full"
                  autoRotate={false}
                  cameraZ={8.0}
                  rotationOffset={POSES[activeIdx].rotationOffset}
                  explosionFactor={POSES[activeIdx].explosionFactor}
                  enableMouseParallax={true}
                />
                {/* subtle border */}
                <div className={`absolute inset-0 rounded-2xl ring-1 pointer-events-none ${theme === 'warm' ? 'ring-stone-200' : 'ring-stone-800'}`} />
              </div>

              {/* Tool tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {['SolidWorks', 'CATIA', 'Creo', 'ANSYS', 'AutoCAD'].map((tool) => (
                  <span
                    key={tool}
                    className={`px-3 py-1 rounded-full text-xs font-mono tracking-wide ${theme === 'warm' ? 'bg-stone-200 text-stone-600' : 'bg-stone-800 text-stone-400'}`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
