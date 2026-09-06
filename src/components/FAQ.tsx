import React, { useState } from 'react';
import { ChevronDown, MessageCircle, Mail } from 'lucide-react';
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

  const bg = theme === 'warm' ? 'bg-[#F7F6F2]' : 'bg-[#0B0C0E]';
  const textPrimary = theme === 'warm' ? 'text-[#121316]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-600' : 'text-stone-400';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const itemBorder = theme === 'warm' ? 'border-stone-200/90' : 'border-white/10';
  const itemBgOpen = theme === 'warm' ? 'bg-white shadow-sm' : 'bg-white/5 shadow-md';
  const itemBgClosed = theme === 'warm' ? 'bg-transparent hover:bg-white/50' : 'bg-transparent hover:bg-white/[0.02]';
  const numColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-600';
  const contactCardBg = theme === 'warm' ? 'bg-[#EDEAE4]/80 border-stone-200' : 'bg-[#12141a] border-white/10';

  return (
    <section id="faq" className={`${bg} py-36 md:py-44 px-6 md:px-12 transition-colors`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Label */}
        <div className="flex items-center gap-4 mb-6">
          <span className={`text-[11px] tracking-[0.25em] uppercase font-mono ${tagColor}`}>
            07 / Frequently Asked Questions
          </span>
          <span className="w-12 h-px bg-stone-300 dark:bg-stone-700" />
        </div>

        {/* 2-Column Editorial Grid: Left Sticky Info | Right Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Editorial Heading & Direct Support Card */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h2
                className={`font-extrabold tracking-[-0.03em] leading-[0.92] mb-6 ${textPrimary}`}
                style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
              >
                CLEAR ANSWERS.<br />
                ZERO AMBIGUITY.
              </h2>
              <p className={`text-sm md:text-base leading-relaxed mb-8 ${textSub}`}>
                Direct, transparent answers regarding how Invocad quotes, models, simulates (FEA), validates (DFM/DFA), and supports physical manufacturing.
              </p>
            </div>

            {/* Direct Engineering Support Box */}
            <div className={`p-6 md:p-8 rounded-2xl border ${contactCardBg} space-y-4`}>
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                  Have a specific question?
                </span>
              </div>
              <p className={`text-xs md:text-sm leading-relaxed ${textSub}`}>
                Share your concept sketch, CAD files, or manufacturing requirements with our engineering leads for a technical review within 24 hours.
              </p>
              <div className="pt-2 flex flex-col gap-2.5">
                <a
                  href={`${WHATSAPP_BASE}${encodeURIComponent(
                    "Hi Invocad team, I have a project inquiry regarding mechanical engineering and CAD design."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-mono font-semibold tracking-wider uppercase transition-colors shadow-sm"
                >
                  <MessageCircle size={14} />
                  <span>CONSULT VIA WHATSAPP</span>
                </a>
                <a
                  href="mailto:contactinvocad@gmail.com"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-mono font-semibold tracking-wider uppercase hover:text-black dark:hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  <span>EMAIL ENGINEERING</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 10 Authentic Questions Accordion */}
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
                    <div className="flex items-start gap-4 md:gap-5">
                      <span className={`font-mono text-xs pt-1 font-bold flex-shrink-0 ${numColor}`}>
                        {numStr}
                      </span>
                      <h3
                        className={`text-base md:text-lg font-bold tracking-tight transition-colors duration-200 ${
                          isOpen ? (theme === 'warm' ? 'text-black' : 'text-cyan-400') : textPrimary
                        }`}
                      >
                        {faq.question}
                      </h3>
                    </div>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform duration-300 ${
                        isOpen
                          ? 'rotate-180 bg-cyan-500/20 text-cyan-500'
                          : theme === 'warm'
                          ? 'bg-stone-200 text-stone-600'
                          : 'bg-white/10 text-stone-400'
                      }`}
                    >
                      <ChevronDown size={15} />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 md:px-6 pb-6 pt-0 ml-8 md:ml-10 text-sm leading-relaxed text-stone-600 dark:text-stone-300 whitespace-pre-line border-t border-stone-100 dark:border-white/5 mt-2">
                      <div className="pt-4 font-normal">
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
