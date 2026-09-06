import React from 'react';

interface ProcessProps {
  theme: 'warm' | 'dark';
}

const STEPS = [
  {
    num: '01',
    title: 'Brief',
    body: 'Scope call, requirements capture, constraint mapping.',
    duration: '1–2 days',
  },
  {
    num: '02',
    title: 'Concept',
    body: 'Sketch ideation, geometry exploration, feasibility check.',
    duration: '3–5 days',
  },
  {
    num: '03',
    title: '3D Modelling',
    body: 'Parametric solid modelling with tolerance-aware features.',
    duration: '5–15 days',
  },
  {
    num: '04',
    title: 'Simulation',
    body: 'FEA stress / thermal analysis, motion simulation if required.',
    duration: '2–5 days',
  },
  {
    num: '05',
    title: 'Drawings',
    body: 'ASME 2D drawings, GD&T annotation, BOM generation.',
    duration: '2–4 days',
  },
  {
    num: '06',
    title: 'Handoff',
    body: 'Native CAD files, STEP/IGES exports, documentation package.',
    duration: '1 day',
  },
];

export const Process: React.FC<ProcessProps> = ({ theme }) => {
  const bg = theme === 'warm' ? 'bg-[#F5F4F0]' : 'bg-[#0B0C0E]';
  const textPrimary = theme === 'warm' ? 'text-[#111118]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-500' : 'text-stone-400';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const cardBg = theme === 'warm' ? 'bg-white' : 'bg-[#151618]';
  const cardBorder = theme === 'warm' ? 'border-stone-200' : 'border-stone-800';
  const numColor = theme === 'warm' ? 'text-stone-300' : 'text-stone-700';
  const durationColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const lineBg = theme === 'warm' ? 'bg-stone-200' : 'bg-stone-800';
  const dotBg = theme === 'warm' ? 'bg-[#111118]' : 'bg-white';

  return (
    <section id="process" className={`${bg} py-32 px-6 md:px-12`}>
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className={`text-xs tracking-[0.3em] uppercase font-mono ${tagColor}`}>05 — Process</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <h2
            className={`font-bold leading-tight ${textPrimary}`}
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            From Brief to<br />Production-Ready.
          </h2>
          <p className={`max-w-xs text-sm leading-relaxed ${textSub}`}>
            A structured six-stage workflow that keeps every project on time, on spec, and fully documented.
          </p>
        </div>

        {/* Pipeline — horizontal on desktop, vertical on mobile */}

        {/* Connector line */}
        <div className="relative">
          {/* Horizontal line (desktop) */}
          <div className={`hidden md:block absolute top-8 left-0 right-0 h-px ${lineBg}`} style={{ zIndex: 0 }} />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 md:gap-2 relative" style={{ zIndex: 1 }}>
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex flex-col">
                {/* Dot */}
                <div className="flex items-center justify-center mb-5 md:mb-4">
                  <div
                    className={`w-4 h-4 rounded-full border-2 ${dotBg} ${theme === 'warm' ? 'border-[#111118]' : 'border-white'} flex-shrink-0`}
                    style={{ boxShadow: '0 0 0 4px var(--dot-ring, transparent)' }}
                  />
                </div>

                {/* Card */}
                <div className={`flex-1 rounded-xl p-4 border ${cardBg} ${cardBorder}`}>
                  <div className={`font-mono text-xs mb-2 ${numColor}`}>{step.num}</div>
                  <h3 className={`font-semibold text-sm mb-2 ${textPrimary}`}>{step.title}</h3>
                  <p className={`text-xs leading-relaxed ${textSub}`}>{step.body}</p>
                  <div className={`mt-3 font-mono text-[10px] tracking-wider uppercase ${durationColor}`}>{step.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
