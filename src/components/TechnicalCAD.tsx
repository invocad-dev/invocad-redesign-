import React, { useState } from 'react';
import { Layers, Activity, FileCheck, Cpu, ArrowRight } from 'lucide-react';

interface TechnicalCADProps {
  theme: 'warm' | 'dark';
}

interface StageData {
  id: string;
  code: string;
  title: string;
  category: string;
  headline: string;
  description: string;
  parameters: Array<{ label: string; value: string }>;
  standards: string[];
}

const STAGES: StageData[] = [
  {
    id: 'cad-model',
    code: '01',
    title: '3D Solid Model',
    category: 'Parametric Geometry',
    headline: 'Native Feature Trees & Kinematic Packaging',
    description: 'We build fully parametric, robust CAD assemblies with clean feature associativity. Every fillet, chamfer, draft angle, and wall thickness is modeled for manufacturing tooling constraints.',
    parameters: [
      { label: 'Feature Geometry', value: 'Parametric Solid Bodies' },
      { label: 'Associativity', value: 'Bidirectional Model Linking' },
      { label: 'Interference Check', value: '0.000 mm Zero Clashes' },
      { label: 'Software Suites', value: 'SolidWorks / CATIA / Creo' },
    ],
    standards: ['ISO 10303 STEP AP242', 'Parasolid Kernel X_T', 'ASME Y14.41 MBD'],
  },
  {
    id: 'fea-simulation',
    code: '02',
    title: 'FEA & Simulation',
    category: 'Virtual Stress Testing',
    headline: 'Von Mises Stress, Deflection & Safety Factors',
    description: 'Before committing metal to CNC tooling, assemblies undergo finite element analysis (FEA) to detect stress concentrations, verify factor of safety, and simulate cyclic dynamic fatigue under real operational loads.',
    parameters: [
      { label: 'Von Mises Stress', value: 'Max Peak 245 MPa (Well below 480 MPa yield)' },
      { label: 'Factor of Safety', value: 'n = 2.45 Dynamic Load Rating' },
      { label: 'Max Deflection', value: 'δ < 0.042 mm at 100% Torque' },
      { label: 'Analysis Suite', value: 'ANSYS Mechanical / SolidWorks Simulation' },
    ],
    standards: ['Von Mises Yield Criterion', 'Euler-Bernoulli Elasticity', 'ASTM E8/E8M Standards'],
  },
  {
    id: 'gdt-blueprint',
    code: '03',
    title: 'ASME Y14.5 Blueprint',
    category: 'Shop Floor Drawings',
    headline: 'Geometric Dimensioning & Tolerancing (GD&T)',
    description: '2D drawings serve as legally binding fabrication instructions. We define functional datums, positional tolerances, runouts, surface roughness Ra, and multi-tier BOMs to guarantee shop-floor interchangeability.',
    parameters: [
      { label: 'GD&T Dimensioning', value: 'ASME Y14.5-2018 / ISO 1101' },
      { label: 'Bore Tolerances', value: 'ISO 286-1 H7 / js6 Bearing Fits' },
      { label: 'Surface Texture', value: 'Ra 0.4 µm Ground / Ra 1.6 µm Milled' },
      { label: 'Inspection Protocol', value: 'First Article Inspection (FAI) Ready' },
    ],
    standards: ['ASME Y14.5-2018', 'ISO 2768-mK General', 'DIN EN ISO 1302 Surface'],
  },
  {
    id: 'machined-part',
    code: '04',
    title: 'Fabricated Machine',
    category: 'Production Validation',
    headline: 'From Digital CAD to Physical Hardware',
    description: 'The final culmination: production-ready drawings turn seamlessly into verified physical components. We consult directly with CNC machinists, laser cutters, and fabricators to ensure 100% fidelity to the digital model.',
    parameters: [
      { label: 'Fabrication Method', value: 'CNC 5-Axis Turning & Milled Channels' },
      { label: 'Material Grade', value: 'Structural Mild Steel & Billet 6061' },
      { label: 'Surface Treatment', value: 'Powder Coated & Anodized Hardware' },
      { label: 'Shop Floor Handover', value: '1:1 Fitment Without Manual Rework' },
    ],
    standards: ['ISO 9001 Quality Framework', 'DFM Machining Limits', 'DFA Assembly Protocol'],
  },
];

export const TechnicalCAD: React.FC<TechnicalCADProps> = ({ theme }) => {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);

  const stage = STAGES[activeStageIdx];

  const bg = theme === 'warm' ? 'bg-[#EEECEA]' : 'bg-[#111318]';
  const textPrimary = theme === 'warm' ? 'text-[#121316]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-600' : 'text-stone-400';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const cardBg = theme === 'warm' ? 'bg-[#F7F6F2]' : 'bg-[#181A20]';
  const cardBorder = theme === 'warm' ? 'border-stone-200/90' : 'border-white/10';
  const activeTabBg = theme === 'warm' ? 'bg-white text-[#121316] shadow-sm' : 'bg-white/10 text-white';
  const inactiveTabBg = theme === 'warm' ? 'text-stone-600 hover:text-black' : 'text-stone-400 hover:text-white';

  return (
    <section id="engineering" className={`${bg} py-36 md:py-44 px-6 md:px-12 transition-colors`}>
      <div className="max-w-7xl mx-auto">
        {/* Overline Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className={`text-[11px] tracking-[0.25em] uppercase font-mono ${tagColor}`}>
            04 / Engineering Methodology
          </span>
          <span className="w-12 h-px bg-stone-300 dark:bg-stone-700" />
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2
              className={`font-extrabold tracking-[-0.03em] leading-[0.92] ${textPrimary}`}
              style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)' }}
            >
              FROM CAD<br />
              TO REALITY.
            </h2>
          </div>

          <p className={`max-w-md text-sm md:text-base leading-relaxed ${textSub}`}>
            A systematic engineering progression from 3D parametric geometry, through finite element validation and ASME GD&amp;T blueprints, to physical shop-floor fabrication.
          </p>
        </div>

        {/* Stage Selection Navigation — 4 Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-10">
          {STAGES.map((s, idx) => {
            const isActive = idx === activeStageIdx;
            return (
              <button
                key={s.id}
                onClick={() => setActiveStageIdx(idx)}
                className={`p-4 md:p-5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? `${cardBg} ${cardBorder} shadow-sm border-l-4 ${theme === 'warm' ? 'border-l-[#121316]' : 'border-l-cyan-400'}`
                    : 'bg-transparent border-transparent hover:bg-stone-200/50 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono text-xs font-bold ${isActive ? (theme === 'warm' ? 'text-[#121316]' : 'text-cyan-400') : tagColor}`}>
                    {s.code}
                  </span>
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${tagColor}`}>
                    Stage {s.code}
                  </span>
                </div>
                <div className={`text-sm md:text-base font-bold tracking-tight ${isActive ? textPrimary : textSub}`}>
                  {s.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Stage Content Card: Blueprint / Technical Documentation Frame */}
        <div
          className={`rounded-2xl border ${cardBg} ${cardBorder} p-6 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all`}
        >
          {/* Top Drawing Border Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-stone-200 dark:border-white/10 text-[11px] font-mono uppercase tracking-widest text-stone-400">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className={textPrimary}>INVOCAD ENGINEERING SYSTEM</span>
              <span>•</span>
              <span>DWG NO: INV-ENG-{stage.code}-2025</span>
            </div>
            <div>
              <span>DISCIPLINE: {stage.category}</span>
            </div>
          </div>

          {/* Main Visual & Technical Specs Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Narrative & Engineering Standards */}
            <div className="lg:col-span-6 flex flex-col">
              <div className={`font-mono text-xs font-semibold uppercase tracking-wider mb-2 ${theme === 'warm' ? 'text-cyan-600' : 'text-cyan-400'}`}>
                {stage.category}
              </div>

              <h3
                className={`font-extrabold tracking-tight leading-snug mb-4 ${textPrimary}`}
                style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)' }}
              >
                {stage.headline}
              </h3>

              <p className={`text-sm md:text-base leading-relaxed mb-8 ${textSub}`}>
                {stage.description}
              </p>

              {/* Verified Engineering Standards Tags */}
              <div className="space-y-2">
                <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400">
                  Compliance &amp; Engineering Standards
                </div>
                <div className="flex flex-wrap gap-2">
                  {stage.standards.map((std) => (
                    <span
                      key={std}
                      className={`px-3 py-1 rounded-full text-xs font-mono tracking-wider border ${
                        theme === 'warm'
                          ? 'bg-white border-stone-200 text-stone-800'
                          : 'bg-black/40 border-white/10 text-stone-200'
                      }`}
                    >
                      {std}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Technical Parameters Matrix & Blueprint Frame */}
            <div className="lg:col-span-6">
              <div
                className={`rounded-xl border p-6 md:p-8 ${
                  theme === 'warm'
                    ? 'bg-white border-stone-200/90 shadow-sm'
                    : 'bg-[#12141a] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-stone-200/80 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <FileCheck size={16} className="text-cyan-500" />
                    <span className={`text-xs font-mono font-bold uppercase tracking-wider ${textPrimary}`}>
                      Technical Engineering Parameters
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">
                    Rev 2.4 Verified
                  </span>
                </div>

                <div className="space-y-4">
                  {stage.parameters.map((param) => (
                    <div
                      key={param.label}
                      className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-3 border-b border-stone-100 dark:border-white/5"
                    >
                      <span className="text-xs font-mono text-stone-500 dark:text-stone-400">
                        {param.label}
                      </span>
                      <span className={`text-xs sm:text-sm font-mono font-semibold ${textPrimary} text-right`}>
                        {param.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footnote callout */}
                <div className="mt-6 pt-2 flex items-center justify-between text-[11px] font-mono text-stone-400">
                  <span>Zero-tolerance shop-floor handoff</span>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400 hover:underline font-semibold"
                  >
                    <span>Request Engineering Spec</span>
                    <ArrowRight size={12} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
