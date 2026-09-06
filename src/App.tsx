import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Philosophy } from './components/Philosophy';
import { Capabilities } from './components/Capabilities';
import { Work } from './components/Work';
import { Process } from './components/Process';
import { CTAContact } from './components/CTAContact';

type Theme = 'warm' | 'dark';

function App() {
  const [theme, setTheme] = useState<Theme>('warm');

  // Apply theme class to root for tailwind dark mode
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
      style={{ fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}
    >
      <Navbar theme={theme} onThemeToggle={toggleTheme} />

      {/*
        ARCHITECTURE CHANGE:
        NO fullscreen fixed 3D canvas.
        3D viewports are self-contained within specific section columns.
        Every section has clear text-only regions that are NEVER obscured.
      */}

      <Hero theme={theme} />
      <Philosophy theme={theme} />
      <Capabilities theme={theme} />
      <Work theme={theme} />
      <Process theme={theme} />
      <CTAContact theme={theme} />
    </div>
  );
}

export default App;
