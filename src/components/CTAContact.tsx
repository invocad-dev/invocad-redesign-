import React from 'react';
import { MechanicalViewport } from './3d/MechanicalViewport';
import { MessageCircle, Mail, Phone } from 'lucide-react';

interface CTAContactProps {
  theme: 'warm' | 'dark';
}

const WHATSAPP_URL = 'https://wa.me/917812883741?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20Invocad.';

export const CTAContact: React.FC<CTAContactProps> = ({ theme }) => {
  const bg = theme === 'warm' ? 'bg-[#111118]' : 'bg-[#0D0E12]';
  const textPrimary = 'text-white';
  const textSub = 'text-stone-400';
  const tagColor = 'text-stone-500';
  const divider = 'border-stone-800';

  return (
    <section id="contact" className={`${bg} py-32 px-6 md:px-12 relative overflow-hidden`}>
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <span className={`text-xs tracking-[0.3em] uppercase font-mono ${tagColor}`}>06 — Contact</span>
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
              Whether you need a complete product design, a single 3D model, or a manufacturing drawing package — start a conversation.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-wrap gap-3 mb-12">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#25D366] text-white font-semibold text-sm tracking-wide hover:bg-[#1fb85a] transition-colors"
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
                  className={`text-sm ${textSub} hover:text-white transition-colors`}
                >
                  +91 78128 83741
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className={tagColor} />
                <a
                  href="mailto:contactinvocad@gmail.com"
                  className={`text-sm ${textSub} hover:text-white transition-colors`}
                >
                  contactinvocad@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Right — contained 3D viewport (smaller, supporting role) */}
          <div className="hidden lg:flex lg:col-span-5 lg:col-start-8 items-center">
            <div className="relative w-full" style={{ paddingBottom: '95%' }}>
              <MechanicalViewport
                className="absolute inset-0 w-full h-full"
                autoRotate={true}
                cameraZ={9.0}
                rotationOffset={{ x: 0.2, y: 0.4 }}
                explosionFactor={0.45}
                enableMouseParallax={true}
              />
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className={`mt-24 pt-8 border-t ${divider} flex flex-col md:flex-row items-center justify-between gap-4`}>
          <span className={`font-semibold tracking-[0.18em] uppercase text-sm text-white`}>INVOCAD</span>
          <span className={`text-xs ${tagColor}`}>© 2025 INVOCAD. All rights reserved.</span>
          <div className="flex items-center gap-6">
            {['SolidWorks', 'CATIA', 'Creo', 'ANSYS', 'AutoCAD'].map((tool) => (
              <span key={tool} className={`text-xs font-mono ${tagColor} hidden md:inline`}>{tool}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
