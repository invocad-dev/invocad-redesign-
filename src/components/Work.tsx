import React, { useState } from 'react';
import { X, MessageCircle, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface WorkProps {
  theme: 'warm' | 'dark';
}

const PRODUCTS = [
  {
    id: 'cso',
    label: 'Material Handling',
    title: 'Color Sorting Output Conveyor',
    image: '/assets/color-sorting-conveyor.png',
    category: 'Agricultural Processing',
    specs: [
      { label: 'Drive Unit', value: '1.0 HP Industrial Motor' },
      { label: 'Gearbox Unit', value: 'W63 Precision Drive' },
      { label: 'Continuous Output', value: '4.5 Metric Tons / Hr' },
      { label: 'Target Handling', value: 'Cardamom & Sensitive Bulk' },
    ],
    desc: 'High-throughput horizontal material transfer system specifically calibrated for delicate agricultural commodities like cardamom. Built with heavy-duty mild steel channel, hygienic food-grade belt, and modular mounting brackets for direct optical sorter integration.',
  },
  {
    id: 'fbc',
    label: 'Conveyor Automation',
    title: 'Flat Belt Conveyor System',
    image: '/assets/flat-belt-conveyor.png',
    category: 'Factory Automation',
    specs: [
      { label: 'Drive Unit', value: '1.0 HP High-Torque Motor' },
      { label: 'Effective Width', value: '610 mm (2.0 ft)' },
      { label: 'Rated Capacity', value: '4.5 Tons / Hr' },
      { label: 'Chassis Frame', value: 'Welded Mild Steel Channel' },
    ],
    desc: 'Continuous horizontal flat-belt conveyor engineered for uniform spice and granule distribution across inspection lines. Features low-vibration mounting dampers and adjustable belt tensioners for continuous 24/7 industrial duty.',
  },
  {
    id: 'mc',
    label: 'Elevated Handling',
    title: 'Modular Interlocking Conveyor',
    image: '/assets/modular-conveyor.png',
    category: 'Bulk Handling',
    specs: [
      { label: 'Modular Length', value: '10 ft Segment Units' },
      { label: 'Payload Rating', value: '150 kg / Linear Foot' },
      { label: 'Configuration', value: 'Horizontal / Inclined' },
      { label: 'Serviceability', value: 'Quick-Swap Modular Links' },
    ],
    desc: 'Heavy-duty modular conveyor system engineered for flexible plant layout and elevated material movement. Interlocking polymer segments allow high-load continuous transfer with minimal downtime and rapid washdown capability.',
  },
  {
    id: 'mog',
    label: 'Vibro-Classification',
    title: 'Makhana Open Grader',
    image: '/assets/makhana-open-grader.png',
    category: 'Agri-Commodity Machinery',
    specs: [
      { label: 'Vibration Motors', value: '2× 1.0 HP Synchronized' },
      { label: 'Grading Decks', value: '4 Tier Sizing Screens' },
      { label: 'Throughput', value: '300 kg / Hr Continuous' },
      { label: 'Feed Control', value: '20 kg Regulated Hopper' },
    ],
    desc: 'Four-deck precision vibro-screening grader engineered for multi-stage size classification of fox nuts (makhana). Dual synchronized unbalanced motors generate uniform elliptical throw to prevent seed impact damage.',
  },
  {
    id: 'mcg',
    label: 'Cleanroom Processing',
    title: 'Makhana Closed Sanitary Grader',
    image: '/assets/makhana-closed-grader.png',
    category: 'Dust-Sealed Machinery',
    specs: [
      { label: 'Drive Power', value: 'Dual Vibro Motors (2 HP)' },
      { label: 'Enclosure', value: 'Sanitary Dust-Tight MS/SS' },
      { label: 'Processing Speed', value: '300 kg / Hr Capacity' },
      { label: 'Deck Screens', value: 'Quick-Release 4 Decks' },
    ],
    desc: 'Fully enclosed variant of the makhana classification system designed for sterile, dust-controlled food processing environments. Sealed inspection ports, dust aspiration flanges, and tool-less deck changeover.',
  },
];

const WHATSAPP_BASE = 'https://wa.me/917812883741?text=';

export const Work: React.FC<WorkProps> = ({ theme }) => {
  const [selected, setSelected] = useState<typeof PRODUCTS[0] | null>(null);

  const bg = theme === 'warm' ? 'bg-[#EEECEA]' : 'bg-[#111318]';
  const textPrimary = theme === 'warm' ? 'text-[#111118]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-500' : 'text-stone-400';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const cardBg = theme === 'warm' ? 'bg-white' : 'bg-[#181a20]';
  const cardBorder = theme === 'warm' ? 'border-stone-200/90' : 'border-white/10';
  const modalBg = theme === 'warm' ? 'bg-[#F5F4F0]' : 'bg-[#14161d]';
  const specBg = theme === 'warm' ? 'bg-stone-100' : 'bg-black/40';

  return (
    <section id="work" className={`${bg} py-32 px-6 md:px-12`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs tracking-[0.3em] uppercase font-mono ${tagColor}`}>
                04 — Industrial Case Studies
              </span>
              <span className="w-8 h-px bg-stone-400/40" />
            </div>
            <h2
              className={`font-bold leading-tight ${textPrimary}`}
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Engineered Machinery &amp; Systems
            </h2>
          </div>
          <p className={`max-w-md text-sm leading-relaxed ${textSub}`}>
            Authentic commercial machinery designed, detailed, and production-validated by Invocad for industrial food, agri-processing, and material handling clients.
          </p>
        </div>

        {/* Products Grid — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelected(product)}
              className={`group cursor-pointer rounded-2xl overflow-hidden border ${cardBg} ${cardBorder} hover:shadow-2xl transition-all duration-300 flex flex-col`}
            >
              {/* Image Container with CAD Blueprint Backplate */}
              <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#181c24] to-[#0d1016] overflow-hidden flex items-center justify-center p-4">
                {/* Subtle CAD grid overlay in backplate */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(to right, #38bdf8 1px, transparent 1px),
                      linear-gradient(to bottom, #38bdf8 1px, transparent 1px)
                    `,
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Product Photo */}
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="relative z-10 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-xl"
                />

                {/* Category Pill */}
                <div className="absolute top-3.5 left-3.5 z-20">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-black/75 text-white/90 backdrop-blur-md border border-white/10">
                    {product.category}
                  </span>
                </div>

                {/* Inspect Overlay Trigger */}
                <div className="absolute bottom-3.5 right-3.5 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider bg-cyan-500 text-black font-semibold shadow-lg">
                    <span>Inspect</span>
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className={`font-mono text-[11px] uppercase tracking-wider mb-1.5 ${tagColor}`}>
                    {product.label}
                  </div>
                  <h3 className={`font-bold text-base mb-3 leading-snug ${textPrimary}`}>
                    {product.title}
                  </h3>
                  <p className={`text-xs leading-relaxed line-clamp-2 mb-4 ${textSub}`}>
                    {product.desc}
                  </p>
                </div>

                {/* Key Specifications Badges */}
                <div className="pt-4 border-t border-stone-200/60 dark:border-white/10 grid grid-cols-2 gap-2">
                  {product.specs.slice(0, 2).map((spec) => (
                    <div key={spec.label} className={`p-2 rounded-lg ${specBg}`}>
                      <div className="text-[9px] font-mono uppercase tracking-wider text-stone-400 truncate">
                        {spec.label}
                      </div>
                      <div className={`text-xs font-semibold truncate ${textPrimary}`}>
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md animate-fadeIn"
          onClick={() => setSelected(null)}
        >
          <div
            className={`relative w-full max-w-3xl rounded-2xl ${modalBg} border border-white/15 overflow-hidden shadow-2xl max-h-[90vh] flex flex-col`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Hero */}
            <div className="relative w-full h-72 md:h-84 bg-gradient-to-b from-[#181c24] to-[#0c0e14] p-6 flex items-center justify-center flex-shrink-0">
              <img
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-contain filter drop-shadow-2xl"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white/80 hover:text-white backdrop-blur-md flex items-center justify-center transition-colors border border-white/10"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider bg-black/75 text-cyan-300 backdrop-blur-md border border-white/10">
                  {selected.category}
                </span>
              </div>
            </div>

            {/* Modal Details */}
            <div className="p-6 md:p-8 overflow-y-auto">
              <div className={`font-mono text-xs mb-1.5 ${tagColor}`}>{selected.label}</div>
              <h2 className={`text-2xl font-bold mb-3 ${textPrimary}`}>{selected.title}</h2>
              <p className={`text-sm leading-relaxed mb-6 ${textSub}`}>{selected.desc}</p>

              {/* Full Specs Matrix */}
              <div className="mb-8">
                <div className={`text-xs font-mono uppercase tracking-wider mb-3 ${tagColor}`}>
                  Technical Engineering Specifications
                </div>
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl ${specBg} border border-stone-200/50 dark:border-white/5`}>
                  {selected.specs.map((spec) => (
                    <div key={spec.label} className="p-2">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-stone-400 mb-0.5">
                        {spec.label}
                      </div>
                      <div className={`text-sm font-semibold ${textPrimary}`}>{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={15} />
                  <span>Production-Ready Fabrication Drawings Available</span>
                </div>
                <a
                  href={`${WHATSAPP_BASE}${encodeURIComponent(
                    `Hi Invocad team, I am interested in technical drawings / manufacturing specs for the ${selected.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-sm transition-colors shadow-lg"
                >
                  <MessageCircle size={16} />
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
