import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, Layers, FileText, Wrench } from 'lucide-react';
import { PROCESS_STEPS } from '../data/invocadData';

export const EngineeringProcess: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="process" className="py-24 border-b border-surface-border relative bg-surface-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-cad" />
              <span className="font-mono text-xs text-steel-400 tracking-widest uppercase">
                SECTION 04 // ENGINEERING LIFECYCLE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              FROM CONCEPT TO PRODUCTION.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-steel-300 font-normal leading-relaxed">
            A disciplined 6-stage engineering roadmap designed for zero-defect handover. Engage us across the complete continuum or for targeted phases.
          </p>
        </div>

        {/* Desktop Horizontal Step Navigation */}
        <div className="hidden lg:block mb-12">
          <div className="relative">
            {/* Connecting Baseline Technical Track */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-[1px] bg-surface-border z-0" />

            <div className="grid grid-cols-6 gap-4 relative z-10">
              {PROCESS_STEPS.map((step, idx) => {
                const isActive = idx === activeStepIndex;
                const isPast = idx < activeStepIndex;
                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`text-left p-4 rounded-lg border transition-all duration-200 focus:outline-none ${
                      isActive
                        ? 'bg-surface-elevated border-cyan-cad shadow-[0_0_20px_rgba(0,229,255,0.15)]'
                        : 'bg-surface border-surface-border hover:border-steel-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`font-mono text-xs font-bold ${
                          isActive ? 'text-cyan-cad' : 'text-steel-400'
                        }`}
                      >
                        {step.step}
                      </span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive
                            ? 'bg-cyan-cad animate-ping'
                            : isPast
                            ? 'bg-steel-500'
                            : 'bg-surface-border'
                        }`}
                      />
                    </div>
                    <div className="text-sm font-bold text-white tracking-wide truncate">
                      {step.title}
                    </div>
                    <div className="text-[11px] text-steel-400 truncate mt-1">
                      {step.tagline}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Stage Detailed Card (Desktop & Mobile) */}
        <div className="rounded-xl bg-surface border border-surface-border p-6 sm:p-8 technical-box shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Stage Summary */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-cyan-cad/10 border border-cyan-cad/20 text-cyan-cad font-mono text-xs font-bold">
                STAGE // {activeStep.step} &bull; {activeStep.title.toUpperCase()}
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                {activeStep.tagline}
              </h3>

              <p className="text-sm sm:text-base text-steel-200 leading-relaxed">
                {activeStep.description}
              </p>

              <div className="p-3.5 rounded bg-void/80 border border-surface-border text-xs font-mono text-steel-400">
                <span className="text-cyan-cad font-semibold block mb-1">FLEXIBILITY NOTE:</span>
                {activeStep.flexibilityNote}
              </div>
            </div>

            {/* Deliverables Checklist */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono text-steel-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-cyan-cad" />
                <span>Audited Deliverables for Stage {activeStep.step}</span>
              </div>

              <div className="space-y-2.5">
                {activeStep.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded bg-surface-elevated border border-surface-border text-xs sm:text-sm text-steel-200 flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-cyan-cad shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Progress switcher buttons */}
              <div className="pt-4 flex items-center justify-between">
                <button
                  onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                  disabled={activeStepIndex === 0}
                  className="px-3 py-1.5 rounded text-xs font-mono border border-surface-border text-steel-300 disabled:opacity-30 hover:border-steel-400 transition-colors"
                >
                  &larr; Previous Stage
                </button>

                <div className="font-mono text-xs text-steel-500">
                  {activeStepIndex + 1} of {PROCESS_STEPS.length}
                </div>

                <button
                  onClick={() =>
                    setActiveStepIndex((prev) => Math.min(PROCESS_STEPS.length - 1, prev + 1))
                  }
                  disabled={activeStepIndex === PROCESS_STEPS.length - 1}
                  className="px-3 py-1.5 rounded text-xs font-mono bg-surface-elevated border border-surface-border text-white disabled:opacity-30 hover:border-cyan-cad transition-colors"
                >
                  Next Stage &rarr;
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Mobile Vertical Timeline Accordion */}
        <div className="lg:hidden mt-8 space-y-3">
          <div className="text-xs font-mono text-steel-400 uppercase tracking-wider">
            All Process Stages:
          </div>
          <div className="grid grid-cols-2 gap-2">
            {PROCESS_STEPS.map((step, idx) => (
              <button
                key={step.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-2.5 rounded text-left border text-xs font-mono ${
                  idx === activeStepIndex
                    ? 'bg-surface-elevated border-cyan-cad text-white'
                    : 'bg-surface border-surface-border text-steel-400'
                }`}
              >
                <span className="font-bold text-cyan-cad block">{step.step}</span>
                <span className="truncate block font-sans">{step.title}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
