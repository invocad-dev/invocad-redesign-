import React, { useState, useEffect } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Capabilities } from './components/Capabilities';
import { TechnicalCAD } from './components/TechnicalCAD';
import { Work } from './components/Work';
import { Process } from './components/Process';
import { FAQ } from './components/FAQ';
import { CTAContact } from './components/CTAContact';

type Theme = 'warm' | 'dark';

function App() {
  const [theme, setTheme] = useState<Theme>('warm');

  // Synchronize dark class to html document element
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'warm' ? 'dark' : 'warm'));

  return (
    <div
      className="min-h-screen selection:bg-cyan-500 selection:text-black"
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      {/* High-Precision Desktop Custom Cursor */}
      <CustomCursor />

      {/* Understated Minimalist Navigation */}
      <Navbar theme={theme} onThemeToggle={toggleTheme} />

      {/* 
        =======================================================
        INVOCAD DIGITAL ENGINEERING SHOWROOM
        Structured into 8 purposeful chapters:
        01 / HERO: Precision in Every Detail (Split editorial layout)
        02 / PHILOSOPHY: We Turn Ideas into Manufacturable Systems
        03 / CAPABILITIES: Engineering Index with 3D State Transitions
        04 / TECHNICAL CAD: From CAD to Reality (4-Stage Pipeline)
        05 / SELECTED WORK: Engineered for Real-World Applications
        06 / PROCESS: From Idea to Production (6-Phase Timeline)
        07 / FAQ: Authentic 10-Question Clarifications
        08 / CTA & FOOTER: Have an Idea? Let's Engineer It.
        =======================================================
      */}
      <main>
        <Hero theme={theme} />
        <Philosophy theme={theme} />
        <Capabilities theme={theme} />
        <TechnicalCAD theme={theme} />
        <Work theme={theme} />
        <Process theme={theme} />
        <FAQ theme={theme} />
      </main>

      <CTAContact theme={theme} />
    </div>
  );
}

export default App;
