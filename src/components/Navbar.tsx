import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Phone, Mail, Compass, Layers } from 'lucide-react';
import { COMPANY_INFO } from '../data/invocadData';

interface NavbarProps {
  onOpenRFQ: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenRFQ }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Selected Work', href: '#work' },
    { name: 'Process', href: '#process' },
    { name: 'Expertise', href: '#expertise' },
    { name: 'Why Invocad', href: '#why-invocad' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-void/85 backdrop-blur-md border-b border-surface-border py-3 shadow-2xl shadow-black/60'
            : 'bg-void/40 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Telemetry */}
            <a href="#" className="flex items-center gap-3 group focus:outline-none focus:ring-1 focus:ring-cyan-cad rounded">
              <div className="relative w-9 h-9 rounded bg-surface-elevated border border-surface-border flex items-center justify-center overflow-hidden group-hover:border-cyan-cad/60 transition-colors">
                <img
                  src="/assets/logo.png"
                  alt="Invocad Logo Mark"
                  className="w-6 h-6 object-contain filter drop-shadow group-hover:scale-105 transition-transform"
                  onError={(e) => {
                    // Fallback to crisp icon if file path needs alternate
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <Compass className="w-5 h-5 text-cyan-cad opacity-0 group-hover:opacity-100 absolute transition-opacity pointer-events-none" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold tracking-widest text-steel-50 uppercase">
                    INVOCAD
                  </span>
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-cyan-cad/10 text-cyan-cad border border-cyan-cad/20">
                    STUDIO
                  </span>
                </div>
                <span className="text-[10px] font-mono tracking-wider text-steel-400 hidden sm:inline-block">
                  PRECISION PRODUCT ENGINEERING
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-1.5 rounded text-xs font-mono tracking-wide text-steel-300 hover:text-cyan-cad hover:bg-surface-elevated/60 transition-colors duration-150"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action & RFQ Button */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={COMPANY_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-surface-border bg-surface text-steel-300 hover:text-white hover:border-steel-400 text-xs font-mono transition-colors"
                title="Direct Engineering WhatsApp"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>+91 7812883741</span>
              </a>

              <button
                onClick={onOpenRFQ}
                className="relative group overflow-hidden px-4 py-2 rounded bg-cyan-cad text-black font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] active:scale-95 flex items-center gap-1.5"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={onOpenRFQ}
                className="px-3 py-1.5 rounded bg-cyan-cad text-black font-mono text-xs font-semibold tracking-wider uppercase sm:hidden"
              >
                Project
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded bg-surface-elevated border border-surface-border text-steel-200 hover:text-cyan-cad transition-colors focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed top-16 right-0 bottom-0 w-full max-w-xs bg-surface border-l border-surface-border p-6 overflow-y-auto flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-surface-border">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-cad" />
                  <span className="text-xs font-mono tracking-widest text-steel-400 uppercase">
                    NAVIGATION INDEX
                  </span>
                </div>
                <span className="text-[10px] font-mono text-cyan-cad px-2 py-0.5 bg-cyan-cad/10 rounded">
                  v2.0
                </span>
              </div>

              <div className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2 px-3 rounded hover:bg-surface-elevated text-sm font-mono tracking-wide text-steel-200 hover:text-cyan-cad transition-colors"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-steel-500" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-surface-border space-y-4">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRFQ();
                }}
                className="w-full py-3 rounded bg-cyan-cad text-black font-mono text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-cyan-300 transition-colors"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <div className="space-y-2 text-xs font-mono text-steel-400">
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-cad" />
                  <span>{COMPANY_INFO.email}</span>
                </a>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-cyan-cad" />
                  <span>{COMPANY_INFO.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
