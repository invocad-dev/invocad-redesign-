import React, { useState } from 'react';
import { CheckCircle2, FileText, ArrowRight } from 'lucide-react';
import { PROCESS_STEPS } from '../data/invocadData';

export const ProcessPipeline: React.FC = () => {
  const [activeStage, setActiveStage] = useState(0);

  const pipelineStages = [
    {
      code: '01',
      title: 'UNDERSTAND',
      tagline: 'Discovery, boundary conditions & engineering scope.',
      deliverables: ['Technical Requirement Document (TRD)', 'Design Constraint Audit', 'Material Feasibility']
    },
    {
      code: '02',
      title: 'CONCEPT',
      tagline: 'Mechanism topology & morphological layout exploration.',
      deliverables: ['3D Conceptual Volumes', 'Linkage Geometry', 'Ergonomic Architecture']
    },
    {
      code: '03',
      title: 'MODEL',
      tagline: 'Parametric solid & surface CAD engineering.',
      deliverables: ['Native 3D CAD Parts & Assemblies', 'Parametric Feature Trees', 'Dynamic Clash Audit']
    },
    {
      code: '04',
      title: 'ENGINEER',
      tagline: 'CAE simulation, FEA stress & thermal dissipation.',
      deliverables: ['Von Mises Stress Verification', 'Factor of Safety Confirmation', 'Thermal Flow Reports']
    },
    {
      code: '05',
      title: 'DOCUMENT',
      tagline: 'ASME Y14.5 manufacturing blueprints & laser nesting.',
      deliverables: ['2D Shop Floor Drawings (GD&T)', 'CNC DXF Nesting Layouts', 'Itemized Part BOM']
    },
    {
      code: '06',
      title: 'MANUFACTURE',
      tagline: 'Shop floor vendor coordination & FAI inspection support.',
      deliverables: ['Tooling & Machinist Consultation', 'First Article Inspection (FAI)', 'Revision Maintenance']
    }
  ];

  return (
    <section id="process" className="min-h-screen py-28 px-6 sm:px-12 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-current/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>05 // CONTINUOUS ENGINEERING PIPELINE</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-[-0.03em] leading-none">
              FROM CONCEPT TO PRODUCTION.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs tracking-wider uppercase opacity-70">
            A single continuous engineering continuum. Engage end-to-end or across isolated milestones.
          </p>
        </div>

        {/* Continuous Technical Pipeline Track */}
        <div className="relative mb-16 hidden lg:block">
          {/* Baseline Technical Line */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-current/20 z-0" />

          {/* Active Highlight Track */}
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 h-[2px] bg-cyan-400 z-0 transition-all duration-500"
            style={{ width: `${(activeStage / (pipelineStages.length - 1)) * 100}%` }}
          />

          <div className="grid grid-cols-6 gap-4 relative z-10">
            {pipelineStages.map((stage, idx) => {
              const isActive = idx === activeStage;
              const isPast = idx <= activeStage;
              return (
                <button
                  key={stage.code}
                  onClick={() => setActiveStage(idx)}
                  className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                    isActive
                      ? 'border-current bg-current/10 shadow-lg scale-105'
                      : 'border-current/15 bg-current/5 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      {stage.code}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive
                          ? 'bg-cyan-400 animate-ping'
                          : isPast
                          ? 'bg-current'
                          : 'bg-current/20'
                      }`}
                    />
                  </div>

                  <div className="font-mono text-sm font-black uppercase tracking-wider">
                    {stage.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Stage Detail Canvas */}
        <div className="p-8 sm:p-12 rounded-2xl border border-current/15 bg-current/5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <div className="font-mono text-xs tracking-widest uppercase text-cyan-400">
                PIPELINE STAGE // 0{activeStage + 1}
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">
                {pipelineStages[activeStage].title}
              </h3>
              <p className="text-base sm:text-lg opacity-80 leading-relaxed">
                {pipelineStages[activeStage].tagline}
              </p>
            </div>

            <div className="lg:col-span-6 space-y-4 border-t lg:border-t-0 lg:border-l border-current/10 pt-6 lg:pt-0 lg:pl-8">
              <div className="font-mono text-xs tracking-widest uppercase opacity-60">
                Stage Deliverables &amp; Output Artifacts:
              </div>
              <div className="space-y-2.5">
                {pipelineStages[activeStage].deliverables.map((item, dIdx) => (
                  <div
                    key={dIdx}
                    className="p-3 rounded-lg border border-current/10 bg-current/5 flex items-center gap-3 text-xs sm:text-sm font-mono"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Stage Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-6 lg:hidden">
          {pipelineStages.map((st, i) => (
            <button
              key={st.code}
              onClick={() => setActiveStage(i)}
              className={`p-3 rounded-lg border text-left text-xs font-mono ${
                i === activeStage
                  ? 'border-current bg-current/10 font-bold'
                  : 'border-current/10 opacity-60'
              }`}
            >
              <span className="text-cyan-400 block">{st.code}</span>
              <span>{st.title}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
