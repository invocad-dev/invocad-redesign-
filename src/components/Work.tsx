import React, { useState } from 'react';
import { X, MessageCircle, ArrowUpRight, CheckCircle2, ArrowRight } from 'lucide-react';

interface WorkProps {
  theme: 'warm' | 'dark';
}

interface CaseStudy {
  id: string;
  code: string;
  category: string;
  title: string;
  image: string;
  scope: string[];
  summary: string;
  specs: Array<{ label: string; value: string }>;
  deliverables: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cso',
    code: '01',
    category: 'Machine Design & Automation',
    title: 'Color Sorting Output Conveyor',
    image: '/assets/color-sorting-conveyor.png',
    scope: ['3D CAD Modeling', 'Mechanical Engineering', 'Manufacturing Documentation', 'Optical Sorter Integration'],
    summary: 'A heavy-duty horizontal material transfer system engineered specifically for delicate agricultural commodities like cardamom and bulk spices. Engineered with mild steel structural channels, food-grade continuous belt, and low-friction guide rails for seamless optical color sorter discharge.',
    specs: [
      { label: 'Drive Motor', value: '1.0 HP Industrial Duty' },
      { label: 'Gearbox Reduction', value: 'W63 Precision Worm Drive' },
      { label: 'Continuous Output', value: '4.5 Metric Tons / Hour' },
      { label: 'Belt Profile', value: 'Food-Grade Continuous Belt (610 mm)' },
    ],
    deliverables: ['Full 3D SolidWorks Assembly', 'ASME Y14.5 Fabrication Drawings', 'Laser Cut DXF Flat Patterns', 'BOM with Hardware Specs'],
  },
  {
    id: 'fbc',
    code: '02',
    category: 'Material Transfer Systems',
    title: 'Flat Belt Continuous Conveyor',
    image: '/assets/flat-belt-conveyor.png',
    scope: ['Chassis Design', 'Tensioning Kinematics', 'DFM Optimization', 'Shop-Floor Blueprints'],
    summary: 'Engineered for smooth, vibration-damped horizontal transfer across food packaging and inspection lines. Features precision screw-takeup belt tensioners, sealed bearing blocks, and modular mounting brackets for rapid installation.',
    specs: [
      { label: 'Drive Unit', value: '1.0 HP High-Torque Electric Motor' },
      { label: 'Effective Width', value: '2.0 Feet (610 mm)' },
      { label: 'Throughput', value: '4.5 Tons / Hour Continuous' },
      { label: 'Chassis Material', value: 'Welded Mild Steel Channel' },
    ],
    deliverables: ['Parametric CAD Model', 'Weldment Fabrication Drawings', 'Bearing & Drive Selection Report'],
  },
  {
    id: 'mog',
    code: '03',
    category: 'Agri-Commodity Machinery',
    title: 'Makhana 4-Deck Vibro Grader',
    image: '/assets/makhana-open-grader.png',
    scope: ['Vibratory Kinematics', 'Multi-Deck Sizing', 'Dynamic Structural Analysis', 'Fabrication Package'],
    summary: 'Four-deck precision vibratory screening machine engineered for damage-free size classification of fox nuts (makhana). Dual synchronized unbalanced motors generate uniform elliptical trajectory to achieve clean four-tier separation with zero seed breakage.',
    specs: [
      { label: 'Vibration Drive', value: 'Dual Vibro Motors (1.0 HP × 2)' },
      { label: 'Sorting Decks', value: '4 Interlocking Perforated Decks' },
      { label: 'Rated Capacity', value: '300 kg / Hour Continuous' },
      { label: 'Infeed System', value: '20 kg Regulated Flow Gate Hopper' },
    ],
    deliverables: ['Complete Dynamic CAD Assembly', 'Laser Perforation DXFs', 'Vibration Isolator Mount Selection', 'Complete 2D GD&T Prints'],
  },
  {
    id: 'mc',
    code: '04',
    category: 'Heavy-Duty Bulk Handling',
    title: 'Modular Interlocking Conveyor System',
    image: '/assets/modular-conveyor.png',
    scope: ['Modular Architecture', 'Structural Tower CAD', 'Load Rating Calcs', 'Tooling Consultation'],
    summary: 'A modular interlocking conveyor system designed for high-payload elevated elevation and horizontal transfer. The rigid structural design accommodates heavy continuous loads while allowing rapid segment replacement and hygienic washdown.',
    specs: [
      { label: 'Segment Length', value: '10.0 ft Modular Units' },
      { label: 'Rated Payload', value: '150 kg per Linear Foot' },
      { label: 'Elevated Height', value: '10.0 ft Structural Tower Frame' },
      { label: 'Chassis Frame', value: 'Heavy MS Welded Substructure' },
    ],
    deliverables: ['Modular Assembly CAD', 'Structural Load Calculation Sheet', 'Multi-Tier Assembly BOM'],
  },
  {
    id: 'mcg',
    code: '05',
    category: 'Sanitary Food Processing',
    title: 'Makhana Closed Sanitary Grader',
    image: '/assets/makhana-closed-grader.png',
    scope: ['Dust Containment Enclosure', 'Sanitary DFM', 'Quick-Release Mechanisms', 'Fabrication Oversight'],
    summary: 'Fully enclosed sanitary grading system designed for cleanroom environments and sterile agricultural packaging lines. Features sealed viewing ports, quick-release clamp latches, and dust-tight aspiration connections.',
    specs: [
      { label: 'Enclosure Rating', value: 'Sanitary Dust-Tight MS / SS' },
      { label: 'Vibration Drive', value: 'Dual Synchronized 1.0 HP × 2' },
      { label: 'Throughput', value: '300 kg / Hour Efficiency' },
      { label: 'Screen Apertures', value: 'Customizable Tier Apertures' },
    ],
    deliverables: ['Dust-Tight Sheet Metal CAD', 'Forming & Welding Blueprints', 'Sanitary Gasket Specs'],
  },
];

const WHATSAPP_BASE = 'https://wa.me/917812883741?text=';

export const Work: React.FC<WorkProps> = ({ theme }) => {
  const [selected, setSelected] = useState<CaseStudy | null>(null);

  const bg = theme === 'warm' ? 'bg-[#F7F6F2]' : 'bg-[#0B0C0E]';
  const textPrimary = theme === 'warm' ? 'text-[#121316]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-600' : 'text-stone-400';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const cardBorder = theme === 'warm' ? 'border-stone-200/90' : 'border-white/10';
  const modalBg = theme === 'warm' ? 'bg-[#F7F6F2]' : 'bg-[#12141A]';
  const specBg = theme === 'warm' ? 'bg-stone-100/80' : 'bg-white/5';

  return (
    <section id="work" className={`${bg} py-36 md:py-44 px-6 md:px-12 transition-colors`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-24 md:mb-32">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-[11px] tracking-[0.25em] uppercase font-mono ${tagColor}`}>
                05 / Selected Work
              </span>
              <span className="w-12 h-px bg-stone-300 dark:bg-stone-700" />
            </div>
            <h2
              className={`font-extrabold tracking-[-0.03em] leading-[0.92] ${textPrimary}`}
              style={{ fontSize: 'clamp(2.4rem, 5.2vw, 4.4rem)' }}
            >
              ENGINEERED FOR<br />
              REAL-WORLD APPLICATIONS.
            </h2>
          </div>

          <p className={`max-w-md text-sm md:text-base leading-relaxed ${textSub}`}>
            Authentic commercial machinery designed, detailed, and production-validated by Invocad for industrial food, agri-processing, and automated material handling.
          </p>
        </div>

        {/* Alternating Large Case Study Panels */}
        <div className="space-y-28 md:space-y-36">
          {CASE_STUDIES.map((study, idx) => {
            const isEven = idx % 2 === 1;

            return (
              <div
                key={study.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center"
              >
                {/* Visual Side (Large, approx 55%) */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div
                    onClick={() => setSelected(study)}
                    className={`group relative rounded-2xl overflow-hidden cursor-pointer border ${cardBorder} shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] aspect-[16/11] bg-gradient-to-b from-[#181c24] to-[#0c0e14] p-6 md:p-8 flex items-center justify-center`}
                  >
                    {/* Architectural Grid Texture in Backplate */}
                    <div
                      className="absolute inset-0 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage: `
                          linear-gradient(to right, #38bdf8 1px, transparent 1px),
                          linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
                        `,
                        backgroundSize: '32px 32px',
                      }}
                    />

                    {/* Machine Photo */}
                    <img
                      src={study.image}
                      alt={study.title}
                      loading="lazy"
                      className="relative z-10 w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Category Pill Tag */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-wider uppercase bg-black/75 text-white/90 backdrop-blur-md border border-white/10">
                        {study.category}
                      </span>
                    </div>

                    {/* Hover Inspect Indicator */}
                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-mono font-semibold tracking-wider uppercase bg-white text-black shadow-lg">
                        <span>Inspect Case</span>
                        <ArrowUpRight size={13} />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative & Specifications Side */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-center ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs font-bold text-stone-400">
                      CASE {study.code}
                    </span>
                    <span className="w-8 h-px bg-stone-300 dark:bg-stone-700" />
                    <span className={`text-[11px] font-mono uppercase tracking-widest ${tagColor}`}>
                      {study.category}
                    </span>
                  </div>

                  <h3
                    className={`font-extrabold tracking-tight leading-snug mb-4 ${textPrimary}`}
                    style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
                  >
                    {study.title}
                  </h3>

                  <p className={`text-sm md:text-base leading-relaxed mb-6 ${textSub}`}>
                    {study.summary}
                  </p>

                  {/* Scope Badges */}
                  <div className="mb-6">
                    <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400 mb-2">
                      Engineering Scope
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {study.scope.map((s) => (
                        <span
                          key={s}
                          className={`px-2.5 py-1 rounded-md text-[11px] font-mono border ${
                            theme === 'warm'
                              ? 'bg-stone-100 border-stone-200 text-stone-700'
                              : 'bg-white/5 border-white/10 text-stone-300'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Quick Specs 2x2 Matrix */}
                  <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-stone-200 dark:border-white/10 mb-6">
                    {study.specs.slice(0, 2).map((spec) => (
                      <div key={spec.label} className={`p-2.5 rounded-lg ${specBg}`}>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-stone-400 truncate">
                          {spec.label}
                        </div>
                        <div className={`text-xs font-semibold truncate ${textPrimary}`}>
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Open Case Action */}
                  <button
                    onClick={() => setSelected(study)}
                    className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider uppercase text-cyan-600 dark:text-cyan-400 hover:underline group"
                  >
                    <span>VIEW DETAILED BLUEPRINT SPECS</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelected(null)}
        >
          <div
            className={`relative w-full max-w-4xl rounded-2xl ${modalBg} border border-white/15 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative w-full h-80 md:h-96 bg-gradient-to-b from-[#181c24] to-[#0c0e14] p-8 flex items-center justify-center flex-shrink-0">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white backdrop-blur-md flex items-center justify-center transition-colors border border-white/10"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-black/75 text-cyan-300 backdrop-blur-md border border-white/10">
                  {selected.category}
                </span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-10 overflow-y-auto">
              <div className="flex items-center gap-3 mb-2 font-mono text-xs text-stone-400">
                <span>CASE {selected.code}</span>
                <span>•</span>
                <span>{selected.category}</span>
              </div>

              <h2 className={`text-2xl md:text-3xl font-bold mb-4 ${textPrimary}`}>
                {selected.title}
              </h2>

              <p className={`text-sm md:text-base leading-relaxed mb-8 ${textSub}`}>
                {selected.summary}
              </p>

              {/* Full Technical Specifications */}
              <div className="mb-8">
                <div className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-3">
                  Technical Engineering Specifications
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl border border-stone-200 dark:border-white/10 bg-black/5 dark:bg-white/5">
                  {selected.specs.map((spec) => (
                    <div key={spec.label} className="p-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-0.5">
                        {spec.label}
                      </div>
                      <div className={`text-sm font-semibold ${textPrimary}`}>
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Deliverables */}
              <div className="mb-8">
                <div className="text-xs font-mono uppercase tracking-widest text-stone-400 mb-3">
                  Delivered Documentation &amp; Models
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selected.deliverables.map((deliv) => (
                    <div key={deliv} className="flex items-center gap-2 text-xs font-mono text-stone-600 dark:text-stone-300">
                      <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-stone-200 dark:border-white/10">
                <span className="text-xs font-mono text-stone-400">
                  Ready for turnkey manufacturing integration
                </span>
                <a
                  href={`${WHATSAPP_BASE}${encodeURIComponent(
                    `Hi Invocad team, I am reviewing the ${selected.title} case study and would like to discuss engineering specs.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs font-mono tracking-wider uppercase transition-colors shadow-md"
                >
                  <MessageCircle size={14} />
                  Discuss Machinery on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
