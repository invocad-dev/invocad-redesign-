import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sun, Moon } from 'lucide-react';

interface NavbarMinimalProps {
  onOpenRFQ: () => void;
  isDarkTheme: boolean;
  onToggleTheme: () => void;
}

export const NavbarMinimal: React.FC<NavbarMinimalProps> = ({
  onOpenRFQ,
  isDarkTheme,
  onToggleTheme,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'WORK', href: '#work' },
    { name: 'SERVICES', href: '#services' },
    { name: 'PROCESS', href: '#process' },
    { name: 'TECH SPEC', href: '#technical' },
    { name: 'ABOUT', href: '#about' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 sm:px-8 pt-4 sm:pt-6 pointer-events-none`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between pointer-events-auto rounded-full transition-all duration-300 px-5 py-3 ${
            isScrolled
              ? isDarkTheme
                ? 'bg-black/60 backdrop-blur-md border border-white/10 shadow-2xl'
                : 'bg-white/70 backdrop-blur-md border border-black/10 shadow-lg'
              : 'bg-transparent'
          }`}
        >
          {/* Left: INVOCAD Logo Brandmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none"
          >
            <span className="font-mono text-xs font-black tracking-[0.25em] uppercase transition-colors">
              INVOCAD
            </span>
            <span
              className={`font-mono text-[9px] px-1.5 py-0.5 rounded transition-colors ${
                isDarkTheme
                  ? 'bg-white/10 text-white/70'
                  : 'bg-black/5 text-black/70'
              }`}
            >
              STUDIO // 3D
            </span>
          </a>

          {/* Center: Minimalist Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="font-mono text-[11px] tracking-widest uppercase hover:opacity-100 opacity-60 transition-opacity"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right: Studio Palette Switcher & Action */}
          <div className="flex items-center gap-3">
            {/* Theme Switcher Button */}
            <button
              onClick={onToggleTheme}
              className={`p-2 rounded-full border transition-colors ${
                isDarkTheme
                  ? 'border-white/15 bg-white/5 text-white hover:bg-white/10'
                  : 'border-black/10 bg-black/5 text-black hover:bg-black/10'
              }`}
              title={isDarkTheme ? 'Switch to Warm Titanium Studio' : 'Switch to Dark Charcoal Studio'}
              aria-label="Toggle visual theme"
            >
              {isDarkTheme ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-700" />}
            </button>

            {/* Primary Action Button */}
            <button
              onClick={onOpenRFQ}
              className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full font-mono text-[11px] font-semibold tracking-wider uppercase transition-all duration-200 active:scale-95 ${
                isDarkTheme
                  ? 'bg-white text-black hover:bg-slate-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]'
                  : 'bg-black text-white hover:bg-neutral-800 shadow-[0_0_20px_rgba(0,0,0,0.15)]'
              }`}
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-full border transition-colors ${
                isDarkTheme
                  ? 'border-white/15 bg-white/5 text-white'
                  : 'border-black/10 bg-black/5 text-black'
              }`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden pointer-events-auto">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 bottom-0 w-72 p-6 flex flex-col justify-between shadow-2xl transition-colors ${
              isDarkTheme
                ? 'bg-[#0E0F12] text-white border-l border-white/10'
                : 'bg-[#F7F6F2] text-black border-l border-black/10'
            }`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-current/10">
                <span className="font-mono text-xs tracking-widest font-bold uppercase">
                  INVOCAD STUDIO
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 rounded opacity-70 hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-mono text-xs tracking-widest uppercase py-2 opacity-80 hover:opacity-100"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-current/10">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenRFQ();
                }}
                className={`w-full py-3 rounded-full font-mono text-xs font-bold uppercase tracking-wider ${
                  isDarkTheme ? 'bg-white text-black' : 'bg-black text-white'
                }`}
              >
                Start a Project &rarr;
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
