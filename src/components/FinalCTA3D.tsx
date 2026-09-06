import React from 'react';
import { ArrowRight, Phone, Mail, Compass, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/invocadData';

interface FinalCTA3DProps {
  onOpenRFQ: () => void;
  isDarkTheme: boolean;
}

export const FinalCTA3D: React.FC<FinalCTA3DProps> = ({
  onOpenRFQ,
  isDarkTheme,
}) => {
  return (
    <section id="contact" className="min-h-screen flex flex-col justify-between pt-28 pb-12 px-6 sm:px-12 lg:px-16 relative z-10">
      
      {/* Top Telemetry Tag */}
      <div className="w-full flex items-center justify-between font-mono text-[10px] sm:text-xs tracking-widest uppercase opacity-60 border-b border-current/10 pb-4">
        <div>07 // COMMISSIONS &amp; CONTACT</div>
        <div>RAPID RESPONSE &bull; 24H SCOPE REVIEW</div>
      </div>

      {/* Main Closing Call to Action */}
      <div className="my-auto py-12 max-w-5xl mx-auto text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-current/15 font-mono text-[10px] tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>ACCEPTING NEW MECHANICAL &bull; CAD INQUIRIES</span>
        </div>

        <h2 className="text-[11vw] sm:text-[9vw] lg:text-[7vw] font-black uppercase tracking-[-0.04em] leading-[0.9]">
          HAVE AN IDEA? <br />
          <span className="opacity-40">LET&apos;S ENGINEER IT.</span>
        </h2>

        <p className="max-w-xl mx-auto text-base sm:text-lg opacity-80 font-normal leading-relaxed">
          From first sketches and napkin geometry to precision 3D CAD, dynamic simulation, and shop-floor fabrication blueprints.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenRFQ}
            className={`w-full sm:w-auto px-10 py-5 rounded-full font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 group ${
              isDarkTheme
                ? 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_35px_rgba(255,255,255,0.25)]'
                : 'bg-black text-white hover:bg-neutral-800 shadow-[0_0_30px_rgba(0,0,0,0.2)]'
            }`}
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-5 rounded-full border border-current/20 hover:border-current transition-colors font-mono text-xs sm:text-sm font-semibold tracking-wider uppercase flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Discussion</span>
          </a>
        </div>

        {/* Direct Contacts */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-8 font-mono text-xs opacity-70">
          <a href={`mailto:${COMPANY_INFO.email}`} className="hover:opacity-100 transition-opacity">
            {COMPANY_INFO.email}
          </a>
          <span>&bull;</span>
          <a href={`tel:${COMPANY_INFO.phone}`} className="hover:opacity-100 transition-opacity">
            {COMPANY_INFO.phone}
          </a>
          <span>&bull;</span>
          <span className="text-cyan-400">NDA PROTECTED</span>
        </div>
      </div>

      {/* Minimal Bottom Footer */}
      <footer className="w-full border-t border-current/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] sm:text-xs opacity-50">
        <div>{COMPANY_INFO.copyright}</div>
        <div className="flex items-center gap-6">
          <span>PRECISION PRODUCT DESIGN STUDIO</span>
          <span>ISO 2768 &bull; ASME Y14.5</span>
        </div>
      </footer>

    </section>
  );
};
