import React from 'react';

interface PhilosophyProps {
  theme: 'warm' | 'dark';
}

const PILLARS = [
  {
    index: '01',
    title: 'Engineering Rigour',
    body: 'Every design decision is validated against mechanical constraints, material properties, and manufacturing tolerances — not just aesthetics.',
  },
  {
    index: '02',
    title: 'Design for Manufacturing',
    body: 'We build parts that can actually be made. DFM and DFA principles are embedded from the first sketch, avoiding costly late-stage redesigns.',
  },
  {
    index: '03',
    title: 'Accuracy Over Speed',
    body: 'Tight tolerances, clean geometry, and exhaustive checking before handoff. Our documentation holds up on the shop floor.',
  },
];

export const Philosophy: React.FC<PhilosophyProps> = ({ theme }) => {
  const bg = theme === 'warm' ? 'bg-[#EEECEA]' : 'bg-[#111318]';
  const textPrimary = theme === 'warm' ? 'text-[#111118]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-500' : 'text-stone-400';
  const divider = theme === 'warm' ? 'border-stone-300' : 'border-stone-700';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const numColor = theme === 'warm' ? 'text-stone-300' : 'text-stone-700';

  return (
    <section id="services" className={`${bg} py-32 px-6 md:px-12`}>
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-20">
          <span className={`text-xs tracking-[0.3em] uppercase font-mono ${tagColor}`}>02 — Philosophy</span>
          <span className={`flex-1 h-px ${bg === 'bg-[#EEECEA]' ? 'bg-stone-300' : 'bg-stone-700'} max-w-[80px]`} />
        </div>

        {/* Two-column: heading left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          <div className="lg:col-span-5">
            <h2
              className={`font-bold leading-tight ${textPrimary}`}
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Built to Last.<br />Engineered to Fit.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex flex-col justify-end">
            <p className={`text-base leading-relaxed ${textSub}`}>
              Invocad is a mechanical engineering and product design studio specialising in precision CAD for industrial machinery, consumer hardware, and complex assemblies. We work directly with manufacturers, startups, and R&amp;D teams who demand accuracy and clean documentation.
            </p>
          </div>
        </div>

        {/* Pillar list */}
        <div className={`border-t ${divider}`}>
          {PILLARS.map((p, i) => (
            <div
              key={p.index}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 py-10 border-b ${divider} group`}
            >
              <div className="md:col-span-1">
                <span className={`font-mono text-sm ${numColor}`}>{p.index}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className={`text-lg font-semibold tracking-wide ${textPrimary}`}>{p.title}</h3>
              </div>
              <div className="md:col-span-6 md:col-start-7">
                <p className={`text-sm leading-relaxed ${textSub}`}>{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
