import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Mail, HelpCircle } from 'lucide-react';
import { FAQ_DATA } from '../data/invocadData';

interface FAQProps {
  theme: 'warm' | 'dark';
}

const WHATSAPP_BASE = 'https://wa.me/917812883741?text=';

export const FAQ: React.FC<FAQProps> = ({ theme }) => {
  const [openId, setOpenId] = useState<number | null>(1); // First item open by default

  const toggleFaq = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const bg = theme === 'warm' ? 'bg-[#F5F4F0]' : 'bg-[#0B0C0E]';
  const textPrimary = theme === 'warm' ? 'text-[#111118]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-500' : 'text-stone-400';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const divider = theme === 'warm' ? 'border-stone-200' : 'border-stone-800';
  const itemBorder = theme === 'warm' ? 'border-stone-200/90' : 'border-white/10';
  const itemBgOpen = theme === 'warm' ? 'bg-white shadow-sm' : 'bg-white/5 shadow-md';
  const itemBgClosed = theme === 'warm' ? 'bg-transparent hover:bg-white/50' : 'bg-transparent hover:bg-white/[0.02]';
  const numColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-600';
  const contactCardBg = theme === 'warm' ? 'bg-stone-100/70 border-stone-200' : 'bg-[#12141a] border-white/10';

  return (
    <section id="faq" className={`${bg} py-32 px-6 md:px-12`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className={`text-xs tracking-[0.3em] uppercase font-mono ${tagColor}`}>
            06 — Frequently Asked Questions
          </span>
          <span className="w-12 h-px bg-stone-400/30" />
        </div>

        {/* 2-Column Editorial Grid: Left Sticky Info | Right Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Editorial Heading & Quick Support Card */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h2
                className={`font-bold leading-tight mb-6 ${textPrimary}`}
                style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)' }}
              >
                Clear Answers.<br />Zero Ambiguity.
              </h2>
              <p className={`text-sm leading-relaxed mb-8 ${textSub}`}>
                Everything you need to know about our CAD design workflow, manufacturing validation (DFM/DFA), simulation (FEA/CAE), and fabrication support.
              </p>
            </div>

            {/* Support Callout Box */}
            <div className={`p-6 rounded-2xl border ${contactCardBg} space-y-4`}>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Have a specific requirement?
                </span>
              </div>
              <p className={`text-xs leading-relaxed ${textSub}`}>
                Send us your sketch, sample part photo, or RFP document. Our senior engineering leads review and respond within 24 hours.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`${WHATSAPP_BASE}${encodeURIComponent(
                    "Hi Invocad, I have a question regarding your engineering services."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold tracking-wide transition-colors"
                >
                  <MessageCircle size={14} />
                  Ask via WhatsApp
                </a>
                <a
                  href="mailto:contactinvocad@gmail.com"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-medium hover:text-black dark:hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  Email Engineering
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 10 Accordion Items */}
          <div className="lg:col-span-8 border-t border-b border-stone-200/80 dark:border-white/10 divide-y divide-stone-200/80 dark:divide-white/10">
            {FAQ_DATA.map((faq) => {
              const isOpen = openId === faq.id;
              const numStr = faq.id < 10 ? `0${faq.id}` : `${faq.id}`;

              return (
                <div
                  key={faq.id}
                  className={`transition-all duration-200 rounded-xl my-1.5 overflow-hidden ${
                    isOpen ? itemBgOpen : itemBgClosed
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full text-left p-5 md:p-6 flex items-start justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`font-mono text-xs pt-1 font-semibold flex-shrink-0 ${numColor}`}>
                        {numStr}
                      </span>
                      <h3
                        className={`text-base md:text-lg font-semibold transition-colors duration-200 ${
                          isOpen ? (theme === 'warm' ? 'text-black' : 'text-cyan-300') : textPrimary
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-cyan-500/20 text-cyan-400'
                          : theme === 'warm'
                          ? 'bg-stone-200 text-stone-600'
                          : 'bg-white/10 text-stone-400'
                      }`}
                    >
                      <ChevronDown size={15} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 md:px-6 pb-6 pt-0 ml-8 text-sm leading-relaxed text-stone-600 dark:text-stone-300 whitespace-pre-line border-t border-stone-100 dark:border-white/5 mt-2">
                      <div className="pt-4">
                        {faq.answer}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
