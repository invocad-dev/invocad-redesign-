import React from 'react';
import { Compass, Mail, Phone, MapPin, ArrowUpRight, Shield } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/invocadData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface text-steel-400 font-mono text-xs border-t border-surface-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Col 1 & 2: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-surface-elevated border border-surface-border flex items-center justify-center">
                <img
                  src="/assets/logo.png"
                  alt="Invocad Mark"
                  className="w-5 h-5 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <Compass className="w-4 h-4 text-cyan-cad" />
              </div>
              <span className="font-mono text-base font-bold tracking-widest text-white uppercase">
                INVOCAD
              </span>
            </div>

            <p className="text-steel-400 font-sans text-xs sm:text-sm leading-relaxed max-w-sm">
              {COMPANY_INFO.positioning}
            </p>

            <div className="pt-2 text-[11px] text-steel-500 space-y-1">
              <div>STUDIO: MECHANICAL CAD &bull; CAE &bull; DFM</div>
              <div>LOCALE: INDIA &bull; GLOBAL CLIENT DELIVERY</div>
              <div>STANDARD: ISO 2768 &bull; ASME Y14.5</div>
            </div>
          </div>

          {/* Col 3: Navigation Index */}
          <div className="space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              Index
            </div>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="hover:text-cyan-cad transition-colors">Services Suite</a>
              </li>
              <li>
                <a href="#work" className="hover:text-cyan-cad transition-colors">Selected Machinery</a>
              </li>
              <li>
                <a href="#process" className="hover:text-cyan-cad transition-colors">Engineering Process</a>
              </li>
              <li>
                <a href="#expertise" className="hover:text-cyan-cad transition-colors">Technical Standards</a>
              </li>
              <li>
                <a href="#why-invocad" className="hover:text-cyan-cad transition-colors">Why Invocad</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-cyan-cad transition-colors">FAQ &amp; Pricing</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Key Services */}
          <div className="space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              Core Capabilities
            </div>
            <ul className="space-y-2">
              {SERVICES_DATA.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <a href="#services" className="hover:text-cyan-cad transition-colors truncate block">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Direct Engineering Contacts */}
          <div className="space-y-3">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              Direct Contact
            </div>
            <div className="space-y-2.5">
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 hover:text-cyan-cad transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-cad shrink-0" />
                <span className="truncate">{COMPANY_INFO.email}</span>
              </a>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 hover:text-cyan-cad transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-cad shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </a>

              <div className="pt-2 text-[11px] text-steel-500">
                <span>{COMPANY_INFO.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-surface-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-steel-500">
          <div>
            {COMPANY_INFO.copyright}
          </div>
          <div className="flex items-center gap-6">
            <span>Precision Engineering Studio</span>
            <span className="w-1 h-1 rounded-full bg-steel-600" />
            <span className="text-cyan-cad">CAD Model Integrity Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
