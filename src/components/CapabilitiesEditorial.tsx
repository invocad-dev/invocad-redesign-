import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle2, Layers, Cpu, PenTool } from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../data/invocadData';

interface CapabilitiesEditorialProps {
  onSelectService: (serviceTitle: string) => void;
  onHoverCapability?: (index: number) => void;
}

export const CapabilitiesEditorial: React.FC<CapabilitiesEditorialProps> = ({
  onSelectService,
  onHoverCapability,
}) => {
  const [hoveredIdx, setHoveredIdx] = useState<number>(0);

  // Group into 6 monumental editorial disciplines matching prompt
  const capabilities = [
    {
      number: '01',
      title: '3D CAD MODELING',
      subtitle: 'Native Parametric Solids & Assemblies',
      desc: 'Precision solid modeling with clean feature trees in SolidWorks, CATIA, Creo, and AutoCAD. Parametric constraints, dynamic assembly mating, and clash detection.',
      image: '/assets/serviceImageOne-BnS0ZQwf.png',
      tools: ['SolidWorks', 'CATIA', 'Creo', 'STEP/IGES'],
      annotation: 'DATUM: NATIVE_PARAMETRIC // ISO 1101'
    },
    {
      number: '02',
      title: 'MECHANICAL DESIGN',
      subtitle: 'Kinematics, Linkages & Dynamics',
      desc: 'Engineering mechanical linkages, dynamic travel strokes, gear reductions, and multi-body kinematic simulations to eliminate collisions before cutting metal.',
      image: '/assets/serviceImage-CoHIfGk1.png',
      tools: ['Motion Analysis', 'Collision Detection', 'Linkages'],
      annotation: 'DYNAMICS: 940 RPM // TORQUE MATRIX'
    },
    {
      number: '03',
      title: 'MACHINE DESIGN (SPM)',
      subtitle: 'Conveyors, Processing Equipment & Automation',
      desc: 'Turnkey special-purpose machinery design: high-throughput food conveyors, sorting systems, vibro-graders, and structural frames engineered for 24/7 reliability.',
      image: '/assets/COLOR%20SORTING%20OUTPUT%20CONVEYOR-DnJizWwv.png',
      tools: ['Machine Architecture', 'W63 Drives', 'Chassis Calc'],
      annotation: 'PAYLOAD: 4.5 TON/HR // HEAVY INDUSTRY'
    },
    {
      number: '04',
      title: 'SHEET METAL & FABRICATION',
      subtitle: 'Laser Nesting, K-Factor & Press Brake Tooling',
      desc: 'High-precision sheet metal unfolding, bend allowances, press brake tooling calculations, and optimized CNC laser nesting to minimize raw material scrap.',
      image: '/assets/autoCADNesting-D8cea7AI.jpg',
      tools: ['AutoCAD Nesting', 'Bend Deductions', 'DXF Cut Paths'],
      annotation: 'NESTING EFFICIENCY: > 92% SHEET YIELD'
    },
    {
      number: '05',
      title: 'MANUFACTURING DRAWINGS',
      subtitle: 'GD&T, ASME Y14.5 Blueprints & BOM',
      desc: 'Legally binding 2D fabrication drawings, section views, exploded views, and itemized Bill of Materials (BOM) for zero-ambiguity shop floor communication.',
      image: '/assets/draftingImage-BaxF8jRZ.jpg',
      tools: ['ASME Y14.5', 'ISO 2768-mK', 'BOM Catalogs'],
      annotation: 'STANDARDS: ASME Y14.5M // GD&T'
    },
    {
      number: '06',
      title: 'REVERSE ENGINEERING',
      subtitle: 'Scan-to-CAD & Legacy Modernization',
      desc: 'Transforming physical legacy components and 3D scan meshes into fully parametric, editable CAD solid models for improvement, reproduction, and tooling.',
      image: '/assets/reverseEngineering-CO2ft1xD.png',
      tools: ['3D Scan Reconstruction', 'Deviation Audit', '2D-to-3D'],
      annotation: 'SURFACE DEVIATION: < 0.025 MM'
    }
  ];

  return (
    <section id="services" className="min-h-screen py-28 px-6 sm:px-12 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-current/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>03 // CORE CAPABILITIES</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-[-0.03em] leading-none">
              ENGINEERING DISCIPLINES.
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs tracking-wider uppercase opacity-70">
            Hover to inspect technical scope, deliverable parameters, and CAD tooling stack.
          </p>
        </div>

        {/* Large Editorial List */}
        <div className="divide-y divide-current/10 border-b border-current/10">
          {capabilities.map((cap, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={cap.number}
                onMouseEnter={() => {
                  setHoveredIdx(idx);
                  if (onHoverCapability) onHoverCapability(idx);
                }}
                className="py-8 sm:py-10 transition-all duration-300 group cursor-pointer"
                onClick={() => onSelectService(cap.title)}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  
                  {/* Left: Number & Giant Title */}
                  <div className="flex items-baseline gap-6 sm:gap-10">
                    <span className="font-mono text-base sm:text-xl font-bold opacity-40 group-hover:opacity-100 group-hover:text-cyan-400 transition-all">
                      {cap.number}
                    </span>
                    <div>
                      <h3 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight group-hover:translate-x-3 transition-transform duration-300">
                        {cap.title}
                      </h3>
                      <div className="font-mono text-xs tracking-widest uppercase opacity-60 mt-2">
                        {cap.subtitle}
                      </div>
                    </div>
                  </div>

                  {/* Right: Technical Annotation & Trigger */}
                  <div className="flex items-center gap-6 lg:text-right">
                    <div className="font-mono text-[11px] tracking-widest uppercase opacity-50 hidden sm:block">
                      {cap.annotation}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-current/20 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all shrink-0">
                      <ArrowUpRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    </div>
                  </div>

                </div>

                {/* Expanded Details on Active Hover */}
                {isHovered && (
                  <div className="mt-6 pt-6 border-t border-current/5 grid grid-cols-1 md:grid-cols-12 gap-6 items-center animate-fadeIn">
                    <p className="md:col-span-6 text-sm leading-relaxed opacity-80">
                      {cap.desc}
                    </p>

                    <div className="md:col-span-3 flex flex-wrap gap-1.5 font-mono text-[10px] uppercase">
                      {cap.tools.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded border border-current/15 bg-current/5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="md:col-span-3 aspect-[16/9] rounded-lg overflow-hidden border border-current/15 relative bg-current/5">
                      <img
                        src={cap.image}
                        alt={cap.title}
                        className="w-full h-full object-contain p-2 filter drop-shadow-md"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
