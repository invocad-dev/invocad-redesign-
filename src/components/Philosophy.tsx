import React from 'react';

interface PhilosophyProps {
  theme: 'warm' | 'dark';
}

const PILLARS = [
  {
    index: '01',
    title: 'Engineering Rigour',
    body: 'Every design decision is validated against mechanical stress, material properties, and kinematic constraints — not just aesthetic computer renderings.',
  },
  {
    index: '02',
    title: 'Design for Manufacturing',
    body: 'We design parts to be built. DFM and DFA principles are embedded from the first sketch, eliminating costly shop-floor re-tooling and late redesigns.',
  },
  {
    index: '03',
    title: 'Production-Ready Accuracy',
    body: 'Sub-millimeter tolerances, ASME Y14.5 compliant 2D blueprints, and complete GD&T callouts ensure zero misinterpretation during fabrication.',
  },
];

export const Philosophy: React.FC<PhilosophyProps> = ({ theme }) => {
  const bg = theme === 'warm' ? 'bg-[#EEECEA]' : 'bg-[#111318]';
  const textPrimary = theme === 'warm' ? 'text-[#121316]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-600' : 'text-stone-400';
  const divider = theme === 'warm' ? 'border-stone-300' : 'border-stone-800';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const numColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-600';

  return (
    <section id="philosophy" className={`${bg} py-36 md:py-44 px-6 md:px-12 transition-colors`}>
      <div className="max-w-7xl mx-auto">
        {/* Overline Label */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <span className={`text-[11px] tracking-[0.25em] uppercase font-mono ${tagColor}`}>
            02 / Philosophy &amp; Approach
          </span>
          <span className="w-16 h-px bg-stone-300 dark:bg-stone-700" />
        </div>

        {/* Editorial Split: Massive Headline Left | Narrative Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-24 md:mb-32 items-start">
          <div className="lg:col-span-7">
            <h2
              className={`font-extrabold tracking-[-0.03em] leading-[0.92] ${textPrimary}`}
              style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.5rem)' }}
            >
              WE TURN IDEAS INTO<br />
              MANUFACTURABLE<br />
              SYSTEMS.
            </h2>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-end pt-2 lg:pt-4">
            <p className={`text-base md:text-lg leading-relaxed ${textSub}`}>
              From early concepts to production-ready engineering documentation, Invocad transforms ideas into precise, manufacturable systems. We eliminate engineering uncertainty before cutting steel.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-cyan-500" />
              <span className={`text-xs font-mono uppercase tracking-wider ${tagColor}`}>
                SolidWorks • CATIA • Creo • ANSYS • AutoCAD
              </span>
            </div>
          </div>
        </div>

        {/* Three Editorial Pillars */}
        <div className={`border-t ${divider}`}>
          {PILLARS.map((pillar) => (
            <div
              key={pillar.index}
              className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 py-10 md:py-14 border-b ${divider} group transition-colors`}
            >
              <div className="md:col-span-1">
                <span className={`font-mono text-sm font-semibold tracking-wider ${numColor}`}>
                  {pillar.index}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className={`text-xl md:text-2xl font-bold tracking-tight ${textPrimary}`}>
                  {pillar.title}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className={`text-sm md:text-base leading-relaxed ${textSub}`}>
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
