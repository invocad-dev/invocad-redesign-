import React, { useState } from 'react';
import { MechanicalViewport } from './3d/MechanicalViewport';
import { CADInspectionModal } from './3d/CADInspectionModal';
import { MessageCircle, Mail, Phone, Maximize2 } from 'lucide-react';

interface CTAContactProps {
  theme: 'warm' | 'dark';
}

const WHATSAPP_URL = 'https://wa.me/917812883741?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20Invocad.';

export const CTAContact: React.FC<CTAContactProps> = ({ theme }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inspectPartId, setInspectPartId] = useState<string | undefined>(undefined);

  const bg = theme === 'warm' ? 'bg-[#111118]' : 'bg-[#0D0E12]';
  const textPrimary = 'text-white';
  const textSub = 'text-stone-400';
  const tagColor = 'text-stone-500';
  const divider = 'border-stone-800';

  const openInspection = (partId?: string) => {
    setInspectPartId(partId);
    setModalOpen(true);
  };

  return (
    <section id="contact" className={`${bg} py-32 px-6 md:px-12 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className={`text-xs tracking-[0.3em] uppercase font-mono ${tagColor}`}>07 — Contact</span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left — headline + CTAs */}
          <div className="lg:col-span-6">
            <h2
              className={`font-bold leading-tight ${textPrimary} mb-6`}
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              LET'S BUILD<br />WHAT'S NEXT.
            </h2>

            <p className={`text-base leading-relaxed mb-10 max-w-md ${textSub}`}>
              Whether you need a complete product design, a single 3D CAD model, or a manufacturing drawing package with DFM analysis — start a conversation with our engineering team.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm tracking-wide hover:bg-[#1fb85a] transition-colors shadow-lg"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
              <a
                href="mailto:contactinvocad@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-stone-700 text-stone-300 font-medium text-sm tracking-wide hover:border-stone-500 hover:text-white transition-colors"
              >
                <Mail size={16} />
                Send an Email
              </a>
            </div>

            {/* Contact details */}
            <div className={`pt-8 border-t ${divider} flex flex-col gap-4`}>
              <div className="flex items-center gap-3">
                <Phone size={14} className={tagColor} />
                <a
                  href="tel:+917812883741"
                  className={`text-sm ${textSub} hover:text-white transition-colors font-mono`}
                >
                  +91 78128 83741
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className={tagColor} />
                <a
                  href="mailto:contactinvocad@gmail.com"
                  className={`text-sm ${textSub} hover:text-white transition-colors font-mono`}
                >
                  contactinvocad@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right — contained interactive 3D viewport */}
          <div className="hidden lg:flex lg:col-span-5 lg:col-start-8 flex-col items-center">
            <div
              className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40"
              style={{ height: '460px' }}
            >
              <MechanicalViewport
                className="w-full h-full"
                autoRotate={true}
                cameraZ={8.2}
                rotationOffset={{ x: 0.25, y: 0.45 }}
                explosionFactor={0.35}
                showControls={true}
                interactive={true}
                onOpenInspectModal={openInspection}
              />
            </div>
            <div className="mt-3 flex items-center justify-between w-full px-2 text-[11px] font-mono tracking-wider uppercase text-stone-500">
              <span>Interactive Exploded Assembly</span>
              <button
                onClick={() => openInspection()}
                className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
              >
                <Maximize2 size={12} />
                <span>Full Specs</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className={`mt-24 pt-8 border-t ${divider} flex flex-col md:flex-row items-center justify-between gap-4`}>
          <span className="font-semibold tracking-[0.18em] uppercase text-sm text-white">INVOCAD</span>
          <span className={`text-xs ${tagColor}`}>© 2025 INVOCAD. All rights reserved.</span>
          <div className="flex items-center gap-6">
            {['SolidWorks', 'CATIA', 'Creo', 'ANSYS', 'AutoCAD'].map((tool) => (
              <span key={tool} className={`text-xs font-mono ${tagColor} hidden md:inline`}>
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CAD Inspection Modal */}
      <CADInspectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPartId={inspectPartId}
        theme={theme}
      />
    </section>
  );
};
