import React, { useState } from 'react';
import { X, MessageCircle } from 'lucide-react';

interface WorkProps {
  theme: 'warm' | 'dark';
}

const PRODUCTS = [
  {
    id: 'cso',
    label: 'Industrial Conveyor',
    title: 'Color Sorting Output Conveyor',
    image: '/assets/COLOR%20SORTING%20OUTPUT%20CONVEYOR-DnJizWwv.png',
    category: 'Material Handling',
    specs: [
      { label: 'Drive', value: '1 HP Motor' },
      { label: 'Output Width', value: 'W63' },
      { label: 'Throughput', value: '4.5 ton/hr' },
      { label: 'Application', value: 'Cardamom grading line' },
    ],
    desc: 'High-throughput output conveyor designed for cardamom color-sorting integration. Belt profile optimised for seed fragility; DFM-driven frame for local fabrication.',
  },
  {
    id: 'fbc',
    label: 'Flat Belt Conveyor',
    title: 'Flat Belt Conveyor',
    image: '/assets/FLAT%20BELT%20CONVEYOR-7n7b6dq1.png',
    category: 'Material Handling',
    specs: [
      { label: 'Drive', value: '1 HP Motor' },
      { label: 'Belt Width', value: 'W63' },
      { label: 'Throughput', value: '4.5 ton/hr' },
      { label: 'Frame', value: 'Welded mild steel' },
    ],
    desc: 'Robust flat-belt conveyor with modular frame for food processing facilities. Hygienic belt selection and food-grade coating options included in documentation.',
  },
  {
    id: 'mc',
    label: 'Modular Conveyor',
    title: 'Modular Conveyor System',
    image: '/assets/MODULAR%20CONVEYOR-8RDG0DW3.png',
    category: 'Material Handling',
    specs: [
      { label: 'Length', value: '10 ft modules' },
      { label: 'Load Rating', value: '150 kg/ft' },
      { label: 'Config', value: 'Straight / inclined' },
      { label: 'Drive', value: 'End-drive / centre-drive' },
    ],
    desc: 'Modular conveyor architecture allowing flexible factory layout. Each 10 ft section is independently serviceable with common spare parts.',
  },
  {
    id: 'mog',
    label: 'Open Grader',
    title: 'Makhana Open Grader',
    image: '/assets/MAKHANA%20OPEN%20GRADER-X7wSomXO.png',
    category: 'Agricultural Processing',
    specs: [
      { label: 'Drive', value: '2× 1 HP Vibro' },
      { label: 'Decks', value: '4 grading layers' },
      { label: 'Throughput', value: '300 kg/hr' },
      { label: 'Frame', value: 'Open / accessible' },
    ],
    desc: 'Dual vibrating motor grader for Makhana (fox nut) size classification. Four-deck design with mesh size customisation; open frame for quick cleaning.',
  },
  {
    id: 'mcg',
    label: 'Closed Grader',
    title: 'Makhana Closed Grader',
    image: '/assets/MAKHANA%20CLOSED%20GRADER-hHH5RNnX.png',
    category: 'Agricultural Processing',
    specs: [
      { label: 'Drive', value: '2× 1 HP Vibro' },
      { label: 'Decks', value: '4 grading layers' },
      { label: 'Throughput', value: '300 kg/hr' },
      { label: 'Enclosure', value: 'Dust-sealed housing' },
    ],
    desc: 'Enclosed variant of the Makhana grader for controlled environments and dusty processing areas. Sealed bearing blocks and dust-tight sheet metal housing.',
  },
];

const WHATSAPP_BASE = 'https://wa.me/917812883741?text=';

export const Work: React.FC<WorkProps> = ({ theme }) => {
  const [selected, setSelected] = useState<typeof PRODUCTS[0] | null>(null);

  const bg = theme === 'warm' ? 'bg-[#EEECEA]' : 'bg-[#111318]';
  const textPrimary = theme === 'warm' ? 'text-[#111118]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-500' : 'text-stone-400';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const cardBg = theme === 'warm' ? 'bg-[#F5F4F0]' : 'bg-[#1a1b1f]';
  const cardBorder = theme === 'warm' ? 'border-stone-200' : 'border-stone-800';
  const modalBg = theme === 'warm' ? 'bg-[#F5F4F0]' : 'bg-[#1a1b1f]';
  const specBg = theme === 'warm' ? 'bg-stone-100' : 'bg-stone-900';
  const divider = theme === 'warm' ? 'border-stone-200' : 'border-stone-700';

  return (
    <section id="work" className={`${bg} py-32 px-6 md:px-12`}>
      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-4">
            <span className={`text-xs tracking-[0.3em] uppercase font-mono ${tagColor}`}>04 — Work</span>
          </div>
          <div>
            <h2
              className={`font-bold leading-tight text-right ${textPrimary}`}
              style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.8rem)' }}
            >
              Industrial Case Studies
            </h2>
          </div>
        </div>

        {/* Product grid — large panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {PRODUCTS.map((product, i) => (
            <div
              key={product.id}
              onClick={() => setSelected(product)}
              className={`group cursor-pointer rounded-xl overflow-hidden border ${cardBg} ${cardBorder} hover:shadow-lg transition-all duration-300`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden bg-stone-900" style={{ paddingBottom: '70%' }}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-black/50 text-white backdrop-blur-sm">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5">
                <div className={`font-mono text-xs mb-2 ${tagColor}`}>{product.label}</div>
                <h3 className={`font-semibold text-base mb-3 ${textPrimary}`}>{product.title}</h3>
                {/* Quick specs */}
                <div className="flex flex-wrap gap-2">
                  {product.specs.slice(0, 2).map((spec) => (
                    <span
                      key={spec.label}
                      className={`px-2 py-0.5 rounded text-xs font-mono ${specBg} ${textSub}`}
                    >
                      {spec.label}: {spec.value}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className={`relative w-full max-w-3xl rounded-2xl ${modalBg} overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal image */}
            <div className="relative bg-stone-900" style={{ paddingBottom: '50%' }}>
              <img
                src={selected.image}
                alt={selected.title}
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal body */}
            <div className="p-8">
              <div className={`font-mono text-xs mb-2 ${tagColor}`}>{selected.category}</div>
              <h2 className={`text-2xl font-bold mb-4 ${textPrimary}`}>{selected.title}</h2>
              <p className={`text-sm leading-relaxed mb-8 ${textSub}`}>{selected.desc}</p>

              {/* Specs grid */}
              <div className={`grid grid-cols-2 gap-3 mb-8 p-5 rounded-xl ${specBg}`}>
                {selected.specs.map((spec) => (
                  <div key={spec.label}>
                    <div className={`text-xs font-mono uppercase tracking-wider mb-0.5 ${tagColor}`}>{spec.label}</div>
                    <div className={`text-sm font-semibold ${textPrimary}`}>{spec.value}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a
                href={`${WHATSAPP_BASE}${encodeURIComponent(`Hi, I'm interested in the ${selected.title} — can we discuss specifications?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#25D366] text-white font-semibold text-sm hover:bg-[#1fb85a] transition-colors"
              >
                <MessageCircle size={16} />
                Discuss on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
