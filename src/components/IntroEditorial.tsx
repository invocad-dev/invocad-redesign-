import React from 'react';
import { Layers, ShieldCheck, Cpu } from 'lucide-react';
import { COMPANY_INFO } from '../data/invocadData';

export const IntroEditorial: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-28 px-6 sm:px-12 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Telemetry Tag */}
        <div className="flex items-center gap-2 mb-8 font-mono text-xs tracking-widest uppercase opacity-60">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
          <span>02 // PHILOSOPHY &amp; MISSION</span>
        </div>

        {/* Enormous Display Typography */}
        <h2 className="text-[9vw] sm:text-[7vw] lg:text-[5.5vw] font-black uppercase tracking-[-0.03em] leading-[0.95] max-w-5xl mb-12">
          WE TURN IDEAS <br />
          INTO MANUFACTURABLE <br />
          <span className="opacity-40">SYSTEMS.</span>
        </h2>

        {/* Concise Editorial Copy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start border-t border-current/10 pt-10">
          
          <div className="md:col-span-6 space-y-4">
            <p className="text-lg sm:text-2xl font-light leading-relaxed">
              &ldquo;At Invocad, we exist to transform raw ideas into real-world products through intelligent design and precision engineering. Our mission is to bridge imagination and industry — crafting every line, curve, and component with purpose.&rdquo;
            </p>
            <div className="font-mono text-xs tracking-wider uppercase opacity-50">
              INVOCAD ENGINEERING DIRECTIVE
            </div>
          </div>

          <div className="md:col-span-6 space-y-6 md:pl-8 border-t md:border-t-0 md:border-l border-current/10 pt-6 md:pt-0">
            <p className="text-sm sm:text-base leading-relaxed opacity-80">
              Invocad provides mechanical CAD and engineering solutions that take products from concept geometry to production-ready documentation. With deep expertise across SolidWorks, CATIA, Creo, and AutoCAD, we support inventors, hardware startups, MSMEs, and high-volume manufacturers.
            </p>

            <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-2">
              <div className="p-4 rounded-lg border border-current/10 bg-current/5">
                <div className="font-bold uppercase mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>DFM FIRST</span>
                </div>
                <div className="text-[11px] opacity-70">
                  Every tolerance calibrated for real-world CNC &amp; sheet metal tooling.
                </div>
              </div>

              <div className="p-4 rounded-lg border border-current/10 bg-current/5">
                <div className="font-bold uppercase mb-1 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                  <span>MODULAR</span>
                </div>
                <div className="text-[11px] opacity-70">
                  Engage for full development or standalone CAD, FEA, or drafting.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
