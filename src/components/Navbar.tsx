import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'warm' | 'dark';
  onThemeToggle: () => void;
}

const NAV_LINKS = ['Work', 'Services', 'Process', 'Contact'];

export const Navbar: React.FC<NavbarProps> = ({ theme, onThemeToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const bg = theme === 'warm'
    ? scrolled ? 'bg-[#F5F4F0]/90 backdrop-blur-md border-stone-200/70' : 'bg-transparent border-transparent'
    : scrolled ? 'bg-[#0D0E12]/90 backdrop-blur-md border-white/10' : 'bg-transparent border-transparent';

  const textColor = theme === 'warm' ? 'text-stone-800' : 'text-white';
  const linkColor = theme === 'warm' ? 'text-stone-600 hover:text-stone-900' : 'text-stone-400 hover:text-white';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id.toLowerCase());
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${bg}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className={`font-semibold tracking-[0.18em] uppercase text-sm ${textColor} transition-colors`}>
          INVOCAD
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`text-sm tracking-widest uppercase font-medium transition-colors duration-200 ${linkColor}`}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onThemeToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
              ${theme === 'warm' ? 'text-stone-600 hover:bg-stone-200' : 'text-stone-400 hover:bg-white/10'}`}
            aria-label="Toggle theme"
          >
            {theme === 'warm' ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium tracking-wider uppercase transition-all duration-200 bg-[#1a1a2e] text-white hover:bg-[#2a2a3e]"
          >
            Start Project
          </a>

          <button
            className={`md:hidden w-8 h-8 flex items-center justify-center ${textColor}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={`md:hidden px-6 pb-6 pt-2 flex flex-col gap-4 ${theme === 'warm' ? 'bg-[#F5F4F0]' : 'bg-[#0D0E12]'}`}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`text-sm tracking-widest uppercase font-medium text-left ${linkColor}`}
            >
              {link}
            </button>
          ))}
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-5 py-2 rounded-full text-sm font-medium tracking-wider uppercase bg-[#1a1a2e] text-white"
          >
            Start Project
          </a>
        </div>
      )}
    </nav>
  );
};
