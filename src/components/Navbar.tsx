import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  theme: 'warm' | 'dark';
  onThemeToggle: () => void;
}

const NAV_LINKS = [
  { label: 'WORK', id: 'work' },
  { label: 'CAPABILITIES', id: 'capabilities' },
  { label: 'ENGINEERING', id: 'engineering' },
  { label: 'PROCESS', id: 'process' },
  { label: 'FAQ', id: 'faq' },
];

export const Navbar: React.FC<NavbarProps> = ({ theme, onThemeToggle }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    setMobileOpen(false);
  };

  const navBg = theme === 'warm'
    ? scrolled
      ? 'bg-[#F7F6F2]/92 backdrop-blur-md border-b border-stone-200/80 shadow-[0_4px_24px_rgba(0,0,0,0.02)]'
      : 'bg-transparent border-b border-transparent'
    : scrolled
      ? 'bg-[#0B0C0E]/92 backdrop-blur-md border-b border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]'
      : 'bg-transparent border-b border-transparent';

  const logoColor = theme === 'warm' ? 'text-[#121316]' : 'text-white';
  const linkColor = theme === 'warm' ? 'text-stone-600 hover:text-[#121316]' : 'text-stone-400 hover:text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div
        className={`max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'h-15 py-3.5' : 'h-20 py-5'
        }`}
      >
        {/* Logo / Studio Brand */}
        <a
          href="#"
          className={`flex items-center gap-2 font-bold tracking-[0.22em] uppercase text-sm ${logoColor} transition-colors group`}
        >
          <span>INVOCAD</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-80 group-hover:scale-125 transition-transform" />
        </a>

        {/* Desktop Navigation Links — Centered, Thin, Minimal */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-xs tracking-[0.18em] uppercase font-mono font-medium transition-colors relative py-1 ${linkColor} group`}
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-current transition-all duration-200 group-hover:w-full opacity-60" />
            </button>
          ))}
        </nav>

        {/* Right Actions: Theme Toggle + CTA */}
        <div className="flex items-center gap-4">
          {/* Subtle Theme Toggle */}
          <button
            onClick={onThemeToggle}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
              theme === 'warm'
                ? 'text-stone-600 hover:text-[#121316] hover:bg-stone-200/60'
                : 'text-stone-400 hover:text-white hover:bg-white/10'
            }`}
            aria-label="Toggle theme"
            title="Toggle theme"
          >
            {theme === 'warm' ? <Moon size={14} /> : <Sun size={14} />}
          </button>

          {/* Minimalist CTA Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-mono font-semibold tracking-wider uppercase transition-all duration-200 bg-[#121316] text-white hover:bg-black dark:bg-white dark:text-[#121316] dark:hover:bg-stone-200 shadow-sm"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            className={`md:hidden w-9 h-9 flex items-center justify-center rounded-lg transition-colors ${
              theme === 'warm' ? 'text-stone-800 hover:bg-stone-200/50' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation */}
      {mobileOpen && (
        <div
          className={`md:hidden px-6 pt-4 pb-8 border-b transition-all flex flex-col gap-4 animate-fadeIn ${
            theme === 'warm'
              ? 'bg-[#F7F6F2] border-stone-200'
              : 'bg-[#0B0C0E] border-white/10'
          }`}
        >
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm tracking-[0.18em] uppercase font-mono font-medium text-left py-2 border-b border-stone-200/40 dark:border-white/5 ${linkColor}`}
            >
              {link.label}
            </button>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="inline-flex items-center justify-center gap-2 mt-3 px-5 py-3 rounded-full text-xs font-mono font-semibold tracking-wider uppercase bg-[#121316] text-white dark:bg-white dark:text-[#121316]"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight size={14} />
          </a>
        </div>
      )}
    </header>
  );
};
