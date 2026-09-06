import React, { useEffect, useRef, useState } from 'react';
import { MechanicalViewport } from './3d/MechanicalViewport';

interface HeroProps {
  theme: 'warm' | 'dark';
}

export const Hero: React.FC<HeroProps> = ({ theme }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const bg = theme === 'warm' ? 'bg-[#F5F4F0]' : 'bg-[#0B0C0E]';
  const textPrimary = theme === 'warm' ? 'text-[#111118]' : 'text-white';
  const textSub = theme === 'warm' ? 'text-stone-500' : 'text-stone-400';
  const accentLine = theme === 'warm' ? 'bg-stone-300' : 'bg-stone-700';
  const tagColor = theme === 'warm' ? 'text-stone-400' : 'text-stone-500';
  const btnBg = theme === 'warm' ? 'bg-[#111118] text-white hover:bg-[#2a2a3e]' : 'bg-white text-[#111118] hover:bg-stone-200';
  const btnOutline = theme === 'warm' ? 'border-stone-300 text-stone-700 hover:border-stone-500' : 'border-stone-600 text-stone-300 hover:border-stone-400';

  return (
    <section
      id="home"
      ref={ref}
      className={`relative min-h-screen flex items-center ${bg} overflow-hidden`}
    >
      {/* Subtle background grid — very faint */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
          color: theme === 'warm' ? '#888' : '#fff',
        }}
      />

      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-24 pb-16">
        {/* GRID: Left text | Right 3D */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[80vh] items-center">

          {/* LEFT COLUMN — Typography */}
          <div className="lg:col-span-6 flex flex-col justify-center z-10 order-2 lg:order-1">
            {/* Overline label */}
            <div
              className={`flex items-center gap-3 mb-10 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '0ms' }}
            >
              <span className={`inline-block w-8 h-px ${accentLine}`} />
              <span className={`text-xs tracking-[0.3em] uppercase font-mono ${tagColor}`}>
                CAD Engineering Studio
              </span>
            </div>

            {/* Main headline */}
            <div
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '100ms' }}
            >
              <h1
                className={`font-bold leading-[0.9] tracking-tight ${textPrimary}`}
                style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
              >
                <span className="block">PRECISION</span>
                <span className="block">IN EVERY</span>
                <span className="block">DETAIL.</span>
              </h1>
            </div>

            {/* Sub-headline */}
            <div
              className={`mt-8 max-w-sm transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <p className={`text-base leading-relaxed ${textSub}`}>
                Industrial product design and mechanical engineering — from concept sketch to production-ready CAD documentation.
              </p>
            </div>

            {/* CTAs */}
            <div
              className={`mt-10 flex flex-wrap gap-3 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: '300ms' }}
            >
              <a
                href="#contact"
                className={`px-7 py-3 rounded-full text-sm font-semibold tracking-wider uppercase transition-all duration-200 ${btnBg}`}
              >
                Start a Project
              </a>
              <a
                href="#work"
                className={`px-7 py-3 rounded-full text-sm font-medium tracking-wider uppercase border transition-all duration-200 ${btnOutline}`}
              >
                View Work
              </a>
            </div>

            {/* Stats row */}
            <div
              className={`mt-16 pt-8 border-t flex gap-10 transition-all duration-700 ${visible ? 'opacity-100' : 'opacity-0'} ${theme === 'warm' ? 'border-stone-200' : 'border-stone-800'}`}
              style={{ transitionDelay: '450ms' }}
            >
              {[
                { num: '10+', label: 'CAD Services' },
                { num: '5', label: 'Tool Platforms' },
                { num: '100%', label: 'Quality Focus' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div className={`text-2xl font-bold ${textPrimary}`}>{num}</div>
                  <div className={`text-xs tracking-wider uppercase mt-0.5 ${tagColor}`}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN — 3D Viewport (CONTAINED, not fullscreen) */}
          <div
            className={`lg:col-span-6 flex items-center justify-center order-1 lg:order-2 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            style={{ transitionDelay: '100ms' }}
          >
            <div className="relative w-full" style={{ paddingBottom: '90%' }}>
              <MechanicalViewport
                className="absolute inset-0 w-full h-full"
                autoRotate={true}
                cameraZ={7.5}
                rotationOffset={{ x: 0.25, y: -0.35 }}
                explosionFactor={0}
                enableMouseParallax={true}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <div className={`w-px h-10 animate-pulse ${accentLine}`} />
        <span className={`text-[10px] tracking-[0.3em] uppercase ${tagColor}`}>Scroll</span>
      </div>
    </section>
  );
};
