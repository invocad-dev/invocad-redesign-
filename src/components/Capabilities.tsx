import React, { useState } from 'react';
import { MechanicalViewport, CADRenderMode } from './3d/MechanicalViewport';
import { CADInspectionModal } from './3d/CADInspectionModal';
import { ArrowUpRight, Maximize2 } from 'lucide-react';

interface CapabilitiesProps {
  theme: 'warm' | 'dark';
}

interface CapabilityItem {
  id: string;
  num: string;
  title: string;
  shortDesc: string;
  deliverables: string[];
  tools: string[];
  mode: CADRenderMode;
  explosion: number;
  rotation: { x: number; y: number };
}

const CAPABILITIES: CapabilityItem[] = [
  {
    id: 'cad-modeling',
    num: '01',
    title: '3D CAD Modeling',
    shortDesc: 'Parametric solid modeling, complex surfacing, and modular assembly architecture with clean, rebuildable feature trees.',
    deliverables: ['Parametric CAD Models', 'Native SolidWorks/Creo Files', 'STEP AP242 Neutral Archives'],
    tools: ['SolidWorks', 'CATIA V5', 'PTC Creo'],
    mode: 'solid',
    explosion: 0,
    rotation: { x: 0.35, y: -0.4 },
  },
  {
    id: 'mechanical-design',
    num: '02',
    title: 'Mechanical Design',
    shortDesc: 'Mechanism kinematics, gear train ratios, link synthesis, and power transmission sizing for dynamic machinery.',
    deliverables: ['Kinematic Motion Reports', 'Gear Ratio Calculations', 'Bearing Life L10h Analysis'],
    tools: ['Mechanism Analysis', 'SolidWorks Motion', 'Kinematic Solver'],
    mode: 'solid',
    explosion: 0.45,
    rotation: { x: 0.25, y: 0.4 },
  },
  {
    id: 'machine-design',
    num: '03',
    title: 'Machine Design',
    shortDesc: 'Turnkey industrial automation, material handling conveyors, structural frames, and custom special purpose machinery (SPM).',
    deliverables: ['Full Machine GA Drawings', 'Structural Channel Calcs', 'Motor & Drive Sizing'],
    tools: ['Heavy Machinery', 'Drive Transmission', 'Modular Frames'],
    mode: 'solid',
    explosion: 0.15,
    rotation: { x: 0.3, y: -0.75 },
  },
  {
    id: 'sheet-metal',
    num: '04',
    title: 'Sheet Metal & Fabrication',
    shortDesc: 'Laser cut nesting layouts, press brake bend deductions (K-Factor), and DFM sheet metal enclosures designed for low scrap.',
    deliverables: ['1:1 CNC Laser DXF Files', 'Flat Pattern Unfolds', 'Press Brake Setup Sheets'],
    tools: ['AutoCAD Nesting', 'Sheet Metal DFM', 'K-Factor Tables'],
    mode: 'xray',
    explosion: 0.25,
    rotation: { x: 0.4, y: 0.6 },
  },
  {
    id: 'manufacturing-drawings',
    num: '05',
    title: 'Manufacturing Drawings',
    shortDesc: 'ASME Y14.5 and ISO 1101 compliant 2D engineering blueprints with complete GD&T datum frames, surface finishes, and multi-tier BOMs.',
    deliverables: ['Shop-Floor Fabrication Drawings', 'ASME Y14.5 GD&T Sheets', 'Complete Itemized BOMs'],
    tools: ['GD&T (ASME Y14.5)', 'ISO 1101', 'Shop Floor Prints'],
    mode: 'wireframe',
    explosion: 0,
    rotation: { x: 0.1, y: 0.1 },
  },
  {
    id: 'reverse-engineering',
    num: '06',
    title: 'Reverse Engineering',
    shortDesc: 'Reconstruction of precision parametric CAD models from physical parts, scan point-clouds, and legacy obsolete drawings.',
    deliverables: ['Parametric Scan-to-CAD Models', 'Wear & Deviation Reports', 'Modernized CAD Libraries'],
    tools: ['3D Scan Reconstruction', 'Deviation Analysis', 'Legacy 2D-to-3D'],
    mode: 'xray',
    explosion: 0.6,
    rotation: { x: -0.2, y: -0.9 },
  },
];

export const Capabilities: React.FC<CapabilitiesProps> = ({ theme }) => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [inspectPartId, setInspectPartId] = useState<string | undefined>(undefined);

  const activeItem = CAPABILITIES[activeIdx];

  const bg = theme === 'warm' ? 'bg-[#F7F6F2]' : 'bg-[#0B0C0E]';
  const textPrimary = theme === 'warm' ? 'text-[#121316]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-600' : 'text-stone-400';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const divider = theme === 'warm' ? 'border-stone-200' : 'border-stone-800';
  const activeBorder = theme === 'warm' ? 'border-[#121316]' : 'border-white';
  const numColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-600';

  const viewportBorder =
    theme === 'warm'
      ? 'border border-stone-200/90 bg-[#edeae4]/70 shadow-[0_20px_50px_rgba(0,0,0,0.04)]'
      : 'border border-white/10 bg-[#12141a]/70 shadow-[0_20px_50px_rgba(0,0,0,0.4)]';

  const openInspection = (partId?: string) => {
    setInspectPartId(partId);
    setModalOpen(true);
  };

  return (
    <section id="capabilities" className={`${bg} py-36 md:py-44 px-6 md:px-12 transition-colors`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[11px] tracking-[0.25em] uppercase font-mono ${tagColor}`}>
                03 / Engineering Index
              </span>
              <span className="w-12 h-px bg-stone-300 dark:bg-stone-700" />
            </div>
            <h2
              className={`font-extrabold tracking-[-0.03em] leading-[0.92] ${textPrimary}`}
              style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)' }}
            >
              ENGINEERING<br />
              CAPABILITIES
            </h2>
          </div>

          <p className={`max-w-sm text-sm md:text-base leading-relaxed ${textSub}`}>
            Six core engineering pillars covering complete product architecture — from conceptual morphology to fabrication-level ASME documentation.
          </p>
        </div>

        {/* Editorial Layout: Vertical Index Left (60%) | Sticky Purpose-Driven 3D Right (40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: Large Editorial Menu */}
          <div className={`lg:col-span-7 border-t ${divider}`}>
            {CAPABILITIES.map((item, idx) => {
              const isActive = idx === activeIdx;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveIdx(idx)}
                  onClick={() => setActiveIdx(idx)}
                  className={`group py-8 md:py-10 border-b cursor-pointer transition-all duration-200 ${
                    isActive ? activeBorder : divider
                  }`}
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex items-baseline gap-6 md:gap-8">
                      <span
                        className={`font-mono text-sm md:text-base font-bold transition-colors ${
                          isActive
                            ? theme === 'warm'
                              ? 'text-[#121316]'
                              : 'text-cyan-400'
                            : numColor
                        }`}
                      >
                        {item.num}
                      </span>
                      <h3
                        className={`font-extrabold tracking-tight transition-all duration-200 ${
                          isActive
                            ? `${textPrimary} translate-x-1`
                            : `${textSub} group-hover:${textPrimary}`
                        }`}
                        style={{ fontSize: 'clamp(1.4rem, 2.4vw, 2rem)' }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    <ArrowUpRight
                      size={20}
                      className={`flex-shrink-0 transition-transform duration-200 ${
                        isActive
                          ? `${textPrimary} translate-x-1 -translate-y-1 opacity-100`
                          : 'opacity-0 group-hover:opacity-40'
                      }`}
                    />
                  </div>

                  {/* Expanded Content for Active Item */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      isActive ? 'max-h-60 opacity-100 mt-5 pl-12 md:pl-16' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <p className={`text-sm md:text-base leading-relaxed mb-4 ${textSub}`}>
                      {item.shortDesc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.deliverables.map((deliv) => (
                        <span
                          key={deliv}
                          className={`px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border ${
                            theme === 'warm'
                              ? 'bg-stone-100 border-stone-200 text-stone-700'
                              : 'bg-white/5 border-white/10 text-stone-300'
                          }`}
                        >
                          {deliv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Purpose-Driven Sticky 3D Viewport */}
          <div className="hidden lg:flex lg:col-span-5 items-start sticky top-28">
            <div className="w-full flex flex-col">
              {/* Active State Metadata */}
              <div className="flex items-center justify-between mb-4 px-1">
                <div>
                  <div className={`font-mono text-[10px] uppercase tracking-widest ${tagColor}`}>
                    Active Inspection State
                  </div>
                  <div className={`text-sm font-bold tracking-tight ${textPrimary}`}>
                    {activeItem.title}
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest border ${
                    theme === 'warm'
                      ? 'bg-stone-200/80 border-stone-300 text-stone-800'
                      : 'bg-white/10 border-white/15 text-stone-200'
                  }`}
                >
                  Mode: {activeItem.mode}
                </span>
              </div>

              {/* 3D Viewport Card */}
              <div
                className={`relative w-full rounded-2xl overflow-hidden ${viewportBorder}`}
                style={{ height: '460px' }}
              >
                <MechanicalViewport
                  className="w-full h-full"
                  autoRotate={false}
                  cameraZ={7.8}
                  rotationOffset={activeItem.rotation}
                  explosionFactor={activeItem.explosion}
                  showControls={true}
                  interactive={true}
                  onOpenInspectModal={openInspection}
                />

                <div className="absolute top-4 right-4 pointer-events-auto z-20">
                  <button
                    onClick={() => openInspection()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-wider uppercase transition-all shadow-sm"
                  >
                    <Maximize2 size={11} />
                    <span>Expand</span>
                  </button>
                </div>
              </div>

              {/* Tool Suite Footnote */}
              <div className="mt-3.5 flex items-center justify-between px-1 text-[10px] font-mono uppercase tracking-wider text-stone-400">
                <span>Tools: {activeItem.tools.join(' • ')}</span>
                <span>Hover list to change state</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CAD Inspection Modal */}
      <CADInspectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPartId={inspectPartId}
        theme={theme}
      />
    </section>
  );
};
