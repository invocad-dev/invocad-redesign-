import React from 'react';
import { Target, Wrench, Shield, Users, Clock, Check } from 'lucide-react';

export const WhyInvocad: React.FC = () => {
  const differentiators = [
    {
      badge: "PRINCIPLE 01",
      title: "PURPOSEFUL PRECISION",
      tagline: "Every line, curve, and dimension has an engineering purpose.",
      desc: "We do not produce decorative CAD geometry that fails when converted into metal or plastic. Every radius, wall thickness, and fastener clearance is engineered for structural equilibrium and load tolerance.",
      icon: Target
    },
    {
      badge: "PRINCIPLE 02",
      title: "ENGINEERING-FIRST MINDSET",
      tagline: "Designed with real-world shop-floor manufacturing in mind.",
      desc: "Because our team understands CNC milling paths, sheet metal press brakes, weldment shrinkage, and assembly jigs, our models transition seamlessly into physical components without emergency redesigns.",
      icon: Wrench
    },
    {
      badge: "PRINCIPLE 03",
      title: "FLEXIBLE MODULAR ENGAGEMENT",
      tagline: "Engage for the full continuum or specific engineering stages.",
      desc: "Whether you need a complete turnkey product engineered from scratch, an independent FEA stress validation audit, or urgent 2D-to-3D drawing migration, we integrate cleanly into your existing team's pipeline.",
      icon: Shield
    },
    {
      badge: "PRINCIPLE 04",
      title: "COLLABORATIVE SHOP-FLOOR SUPPORT",
      tagline: "We stand with you through machining, assembly, and trial runs.",
      desc: "Engineering support does not end when files are transferred. We coordinate directly with machinists and fabricators to address shop queries, update revisions, and ensure the finished product meets design intent.",
      icon: Users
    }
  ];

  return (
    <section id="why-invocad" className="py-24 border-b border-surface-border relative bg-surface-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-cad" />
              <span className="font-mono text-xs text-steel-400 tracking-widest uppercase">
                SECTION 06 // THE INVOCAD DIFFERENCE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              WHY PARTNER WITH US.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-steel-300 font-normal leading-relaxed">
            Authentic engineering discipline, rigorous manufacturing awareness, and transparent collaboration from initial sketch to final physical hardware.
          </p>
        </div>

        {/* 4 Clean Engineering Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((diff, idx) => {
            const Icon = diff.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-xl bg-surface border border-surface-border hover:border-steel-400 transition-all duration-300 technical-box group shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-2.5 py-1 rounded bg-cyan-cad/10 text-cyan-cad font-mono text-[10px] font-bold border border-cyan-cad/20">
                      {diff.badge}
                    </span>
                    <div className="w-9 h-9 rounded bg-surface-elevated border border-surface-border flex items-center justify-center text-cyan-cad group-hover:border-cyan-cad transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-2 group-hover:text-cyan-cad transition-colors">
                    {diff.title}
                  </h3>

                  <div className="font-mono text-xs text-steel-300 mb-4">
                    {diff.tagline}
                  </div>

                  <p className="text-xs sm:text-sm text-steel-400 leading-relaxed">
                    {diff.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-surface-border flex items-center gap-2 font-mono text-[11px] text-steel-500">
                  <Check className="w-3.5 h-3.5 text-cyan-cad" />
                  <span>Verified Shop-Floor Engineering Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
