import React, { useState } from 'react';
import { MechanicalViewport } from './3d/MechanicalViewport';
import { CADInspectionModal } from './3d/CADInspectionModal';
import { MessageCircle, Mail, Phone, ArrowUpRight, Maximize2 } from 'lucide-react';

interface CTAContactProps {
  theme: 'warm' | 'dark';
}

const WHATSAPP_URL = 'https://wa.me/917812883741?text=Hi%20Invocad%20team%2C%20I%20have%20an%20engineering%20project%20I%20would%20like%20to%20discuss.';

export const CTAContact: React.FC<CTAContactProps> = ({ theme }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [inspectPartId, setInspectPartId] = useState<string | undefined>(undefined);

  const openInspection = (partId?: string) => {
    setInspectPartId(partId);
    setModalOpen(true);
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) {
      const navOffset = 70;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <footer id="contact" className="bg-[#101115] text-white pt-36 md:pt-44 pb-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Overline Label */}
        <div className="flex items-center gap-4 mb-8">
          <span className="text-[11px] tracking-[0.25em] uppercase font-mono text-stone-500">
            08 / Project Initiation
          </span>
          <span className="w-12 h-px bg-stone-800" />
        </div>

        {/* Main Showroom Hero Callout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28 md:mb-36">
          {/* Left: Confident Statement & Direct Actions */}
          <div className="lg:col-span-7">
            <h2
              className="font-extrabold tracking-[-0.035em] leading-[0.88] text-white mb-8"
              style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.8rem)' }}
            >
              HAVE AN IDEA?<br />
              LET'S ENGINEER IT.
            </h2>

            <p className="text-base md:text-lg text-stone-400 max-w-lg leading-relaxed mb-10">
              Whether you need turnkey machine design, FEA structural simulation, or production-ready ASME drawings — let's build hardware that performs.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white font-mono font-semibold text-xs tracking-wider uppercase transition-all shadow-lg"
              >
                <MessageCircle size={15} />
                <span>START A PROJECT ON WHATSAPP</span>
                <ArrowUpRight size={14} />
              </a>

              <a
                href="mailto:contactinvocad@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-stone-700 hover:border-white text-stone-300 hover:text-white font-mono font-semibold text-xs tracking-wider uppercase transition-all"
              >
                <Mail size={15} />
                <span>EMAIL ENGINEERING BRIEF</span>
              </a>
            </div>

            {/* Direct Channel Coordinates */}
            <div className="pt-8 border-t border-stone-800/90 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div className="flex items-center gap-3 text-stone-400">
                <Phone size={14} className="text-cyan-400 flex-shrink-0" />
                <a href="tel:+917812883741" className="hover:text-white transition-colors">
                  +91 78128 83741
                </a>
              </div>
              <div className="flex items-center gap-3 text-stone-400">
                <Mail size={14} className="text-cyan-400 flex-shrink-0" />
                <a href="mailto:contactinvocad@gmail.com" className="hover:text-white transition-colors">
                  contactinvocad@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contained Close-up Mechanical Inspection */}
          <div className="hidden lg:flex lg:col-span-5 flex-col items-center">
            <div
              className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50"
              style={{ height: '440px' }}
            >
              <MechanicalViewport
                className="w-full h-full"
                autoRotate={true}
                cameraZ={8.0}
                rotationOffset={{ x: 0.25, y: 0.5 }}
                explosionFactor={0.3}
                showControls={true}
                interactive={true}
                onOpenInspectModal={openInspection}
              />

              <div className="absolute top-4 right-4 pointer-events-auto z-20">
                <button
                  onClick={() => openInspection()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black text-white text-[10px] font-mono uppercase tracking-wider border border-white/10 shadow-sm"
                >
                  <Maximize2 size={11} />
                  <span>Full CAD Specs</span>
                </button>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between w-full px-2 text-[10px] font-mono uppercase tracking-widest text-stone-500">
              <span>Assembly Inspection Mode</span>
              <span>Epicyclic Drive System</span>
            </div>
          </div>
        </div>

        {/* Understated Minimalist Footer Navigation */}
        <div className="pt-12 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo Brand */}
          <div className="flex items-center gap-3">
            <span className="font-extrabold tracking-[0.25em] uppercase text-sm text-white">
              INVOCAD
            </span>
            <span className="text-stone-600 text-xs font-mono">•</span>
            <span className="text-xs font-mono text-stone-500 uppercase tracking-wider">
              Precision CAD &amp; Engineering Studio
            </span>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap items-center gap-6 md:gap-8 text-xs font-mono tracking-wider uppercase text-stone-400">
            {['work', 'capabilities', 'engineering', 'process', 'faq'].map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link)}
                className="hover:text-white transition-colors"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-xs font-mono text-stone-500">
            © 2025 INVOCAD. All rights reserved.
          </div>
        </div>

        {/* CAD Tool Credentials Bar */}
        <div className="mt-8 pt-6 border-t border-stone-800/40 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono uppercase tracking-widest text-stone-600">
          <span>Supported Platforms: SolidWorks • CATIA • Creo • ANSYS • AutoCAD</span>
          <span>Standards: ASME Y14.5 • ISO 1101 • DIN 3962</span>
        </div>
      </div>

      {/* CAD Inspection Modal */}
      <CADInspectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialPartId={inspectPartId}
        theme={theme}
      />
    </footer>
  );
};
