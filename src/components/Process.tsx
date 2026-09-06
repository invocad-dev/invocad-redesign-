import React, { useState } from 'react';

interface ProcessProps {
  theme: 'warm' | 'dark';
}

interface ProcessStep {
  num: string;
  title: string;
  summary: string;
  deliverables: string;
  duration: string;
}

const STEPS: ProcessStep[] = [
  {
    num: '01',
    title: 'UNDERSTAND',
    summary: 'Comprehensive engineering brief, load cases, dimensional envelope, and operating constraints capture.',
    deliverables: 'Functional Spec Matrix',
    duration: '1–2 Days',
  },
  {
    num: '02',
    title: 'CONCEPT',
    summary: 'Kinematic feasibility studies, geometric packaging exploration, and raw material trade-off analysis.',
    deliverables: 'Architecture Options',
    duration: '3–5 Days',
  },
  {
    num: '03',
    title: 'MODEL',
    summary: 'Parametric 3D solid modeling with native feature associativity, drafted faces, and chamfered geometry.',
    deliverables: '3D CAD Feature Trees',
    duration: '5–12 Days',
  },
  {
    num: '04',
    title: 'ENGINEER',
    summary: 'Design for Manufacturing (DFM/DFA) audit, tolerance stackup calculation, and FEA finite element simulation.',
    deliverables: 'FEA & DFM Reports',
    duration: '3–6 Days',
  },
  {
    num: '05',
    title: 'DOCUMENT',
    summary: 'ASME Y14.5 fabrication blueprints, complete GD&T callouts, flat DXF cut contours, and itemized BOM.',
    deliverables: 'Shop Floor Drawings',
    duration: '2–4 Days',
  },
  {
    num: '06',
    title: 'MANUFACTURE',
    summary: 'Direct consultation with CNC machinists, fabricator file preparation, and First Article Inspection support.',
    deliverables: 'Tooling Alignment',
    duration: 'Production Support',
  },
];

export const Process: React.FC<ProcessProps> = ({ theme }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const bg = theme === 'warm' ? 'bg-[#EEECEA]' : 'bg-[#111318]';
  const textPrimary = theme === 'warm' ? 'text-[#121316]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-600' : 'text-stone-400';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const cardBg = theme === 'warm' ? 'bg-[#F7F6F2]' : 'bg-[#181A20]';
  const cardBorder = theme === 'warm' ? 'border-stone-200/90' : 'border-white/10';
  const numColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-600';
  const lineBg = theme === 'warm' ? 'bg-stone-300' : 'bg-stone-800';
  const dotActive = theme === 'warm' ? 'bg-[#121316]' : 'bg-cyan-400';

  return (
    <section id="process" className={`${bg} py-36 md:py-44 px-6 md:px-12 transition-colors`}>
      <div className="max-w-7xl mx-auto">
        {/* Overline Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className={`text-[11px] tracking-[0.25em] uppercase font-mono ${tagColor}`}>
            06 / Structured Methodology
          </span>
          <span className="w-12 h-px bg-stone-300 dark:bg-stone-700" />
        </div>

        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 md:mb-28">
          <div>
            <h2
              className={`font-extrabold tracking-[-0.03em] leading-[0.92] ${textPrimary}`}
              style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)' }}
            >
              FROM IDEA<br />
              TO PRODUCTION.
            </h2>
          </div>

          <p className={`max-w-md text-sm md:text-base leading-relaxed ${textSub}`}>
            A disciplined six-stage mechanical engineering pipeline engineered to de-risk fabrication, eliminate tolerance stack clashes, and guarantee shop-floor repeatability.
          </p>
        </div>

        {/* Timeline Pipeline: Desktop Horizontal | Mobile Vertical */}
        <div className="relative">
          {/* Connecting Axis Line (Desktop) */}
          <div
            className={`hidden lg:block absolute top-[19px] left-8 right-8 h-px ${lineBg}`}
            style={{ zIndex: 0 }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 relative" style={{ zIndex: 1 }}>
            {STEPS.map((step, idx) => {
              const isActive = idx === activeStep;

              return (
                <div
                  key={step.num}
                  onMouseEnter={() => setActiveStep(idx)}
                  className="flex flex-col cursor-pointer group"
                >
                  {/* Timeline Node Marker */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 border ${
                        isActive
                          ? `${dotActive} text-white shadow-md scale-110 border-transparent`
                          : theme === 'warm'
                          ? 'bg-white border-stone-300 text-stone-600 group-hover:border-black'
                          : 'bg-black border-stone-700 text-stone-400 group-hover:border-white'
                      }`}
                    >
                      {step.num}
                    </div>

                    <span className="lg:hidden text-xs font-mono font-bold tracking-wider uppercase text-stone-400">
                      Phase {step.num}
                    </span>
                  </div>

                  {/* Step Card */}
                  <div
                    className={`flex-1 p-5 md:p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
                      cardBg
                    } ${
                      isActive
                        ? `${cardBorder} shadow-lg -translate-y-1`
                        : `${cardBorder} opacity-85 group-hover:opacity-100`
                    }`}
                  >
                    <div>
                      <h3
                        className={`font-extrabold text-sm md:text-base tracking-wider uppercase mb-2 ${textPrimary}`}
                      >
                        {step.title}
                      </h3>
                      <p className={`text-xs md:text-sm leading-relaxed mb-4 ${textSub}`}>
                        {step.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-200/80 dark:border-white/10 space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400">
                        Deliverable
                      </div>
                      <div className={`text-xs font-semibold font-mono ${textPrimary} truncate`}>
                        {step.deliverables}
                      </div>
                      <div className="text-[10px] font-mono text-stone-400 uppercase pt-1">
                        {step.duration}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
