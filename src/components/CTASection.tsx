import React from 'react';
import { ArrowRight, Phone, Mail, Compass, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/invocadData';

interface CTASectionProps {
  onOpenRFQ: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenRFQ }) => {
  return (
    <section id="contact" className="py-28 relative bg-void border-b border-surface-border overflow-hidden cad-grid-bg">
      {/* Dramatic ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] radial-glow pointer-events-none" />

      {/* Subtle background CAD watermark assembly */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none hidden lg:block">
        <img
          src="/assets/CAD-79kIFWmv.png"
          alt="CAD Background Watermark"
          className="w-full h-full object-contain animate-spin-slow"
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
        
        {/* Telemetry Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-elevated border border-surface-border">
          <span className="w-2 h-2 rounded-full bg-cyan-cad animate-pulse" />
          <span className="font-mono text-xs text-steel-300 tracking-widest uppercase">
            NOW ACCEPTING NEW ENGINEERING COMMISSIONS
          </span>
        </div>

        {/* Closing Headline */}
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase leading-none">
            HAVE A PRODUCT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-steel-200 to-cyan-cad">
              TO BUILD?
            </span>
          </h2>
          <p className="text-xl sm:text-2xl font-mono text-cyan-cad tracking-wide">
            Let&apos;s engineer it.
          </p>
        </div>

        <p className="text-sm sm:text-base text-steel-300 max-w-xl mx-auto font-normal leading-relaxed">
          From concept drawings to production-grade 3D CAD, simulation, and manufacturing handover. Share your requirements and receive an engineering scope review within 24 hours.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={onOpenRFQ}
            className="w-full sm:w-auto px-8 py-4 rounded bg-cyan-cad hover:bg-cyan-300 text-black font-mono text-sm font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_0_30px_rgba(0,229,255,0.4)] active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded border border-surface-border bg-surface-elevated hover:bg-surface hover:border-steel-400 text-white font-mono text-sm font-medium tracking-wide transition-colors flex items-center justify-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Quick Discussion</span>
          </a>
        </div>

        {/* Direct Contact strip */}
        <div className="pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-steel-400 border-t border-surface-border/60 max-w-2xl mx-auto">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-cyan-cad" />
            <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
              {COMPANY_INFO.email}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-cyan-cad" />
            <a href={`tel:${COMPANY_INFO.phone}`} className="hover:text-white transition-colors">
              {COMPANY_INFO.phone}
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-steel-500">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-cad" />
            <span>Strict NDA Protection Available</span>
          </div>
        </div>

      </div>
    </section>
  );
};
