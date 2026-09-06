import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQ_DATA, FaqItem } from '../data/invocadData';

export const FAQSection: React.FC = () => {
  const [openIds, setOpenIds] = useState<number[]>([1]); // First FAQ open by default

  const toggleFaq = (id: number) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-24 border-b border-surface-border relative bg-void overflow-hidden">
      {/* Subtle blueprint grid */}
      <div className="absolute inset-0 cad-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-surface-border">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-cad" />
            <span className="font-mono text-xs text-steel-400 tracking-widest uppercase">
              FREQUENTLY ASKED QUESTIONS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
            CLARITY &amp; PRICING.
          </h2>

          <p className="text-sm sm:text-base text-steel-300 max-w-xl mx-auto leading-relaxed">
            Transparent answers regarding how we engineer, collaborate, quote, and support hardware projects from concept to completion.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_DATA.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-surface border-cyan-cad/60 shadow-[0_0_20px_rgba(0,229,255,0.08)]'
                    : 'bg-surface/70 border-surface-border hover:border-steel-500'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span
                      className={`font-mono text-xs sm:text-sm font-bold ${
                        isOpen ? 'text-cyan-cad' : 'text-steel-500'
                      }`}
                    >
                      0{faq.id}
                    </span>
                    <span className="text-sm sm:text-base font-bold text-white tracking-wide">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-7 h-7 rounded bg-surface-elevated border border-surface-border flex items-center justify-center shrink-0 text-steel-300 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 border-cyan-cad text-cyan-cad' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-surface-border/60 text-xs sm:text-sm text-steel-300 leading-relaxed whitespace-pre-line">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
