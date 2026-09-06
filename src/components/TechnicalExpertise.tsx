import React from 'react';
import { Cpu, Layers, Activity, FileCheck, CheckCircle2 } from 'lucide-react';
import { TECHNICAL_SPECS, COMPANY_INFO } from '../data/invocadData';

export const TechnicalExpertise: React.FC = () => {
  const specSheetSections = [
    {
      code: "SPEC_01",
      title: "Parametric CAD Suites",
      items: [
        { name: "Dassault Systèmes SolidWorks", detail: "Advanced solid & surface modeling, welded structures, configurations" },
        { name: "Autodesk AutoCAD Mechanical", detail: "Detailed 2D schematics, plant layouts, sheet metal nesting profiles" },
        { name: "Dassault Systèmes CATIA", detail: "Complex Class-A surfaces, aerospace & automotive surfacing" },
        { name: "PTC Creo Parametric", detail: "Robust assembly top-down design, mechanism dynamics" }
      ]
    },
    {
      code: "SPEC_02",
      title: "CAE & Physical Simulation",
      items: [
        { name: "FEA Structural Stress", detail: "Static linear/non-linear stress, deflection, yield criteria" },
        { name: "Von Mises & Safety Factor", detail: "FoS validation against yield & ultimate tensile strength" },
        { name: "Thermal Dissipation", detail: "Steady-state & transient heat transfer, conduction, convection" },
        { name: "Kinematic Motion Analysis", detail: "Dynamic interference, velocities, reaction forces at pins & joints" }
      ]
    },
    {
      code: "SPEC_03",
      title: "Manufacturing & DFM Constraints",
      items: [
        { name: "Design for Manufacturing (DFM)", detail: "Wall thickness optimization, draft angles, CNC tool clearances" },
        { name: "Design for Assembly (DFA)", detail: "Hardware count minimization, self-locating tabs, error-proofing" },
        { name: "GD&T Dimensioning", detail: "Full compliance with ASME Y14.5 and ISO 1101 standards" },
        { name: "Sheet Metal Unfolding", detail: "Bend deduction, K-factor calculation, laser cutting nesting" }
      ]
    },
    {
      code: "SPEC_04",
      title: "Data Handover & Interoperability",
      items: [
        { name: "Neutral CAD Intermediates", detail: "STEP AP214 / AP242, Parasolid (.x_t), IGES (.igs)" },
        { name: "Manufacturing Cut Contours", detail: "1:1 DXF / DWG with clean polylines for CNC laser & waterjet" },
        { name: "Fabrication Blueprints", detail: "Vector PDF drawing sets with complete title block and revision history" },
        { name: "BOM Documentation", detail: "Organized part catalog with materials, treatment, and supplier specs" }
      ]
    }
  ];

  return (
    <section id="expertise" className="py-24 border-b border-surface-border relative bg-void overflow-hidden">
      {/* CAD technical coordinate watermark */}
      <div className="absolute inset-0 cad-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-cad" />
              <span className="font-mono text-xs text-steel-400 tracking-widest uppercase">
                SECTION 05 // TECHNICAL AUDIT SHEET
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              TECHNICAL EXPERTISE.
            </h2>
          </div>
          <div className="font-mono text-xs text-steel-400 max-w-sm">
            <div className="flex items-center justify-between border-b border-surface-border pb-1 mb-1">
              <span>DRAWING_NO:</span>
              <span className="text-white">INV-SPEC-2025</span>
            </div>
            <div className="flex items-center justify-between border-b border-surface-border pb-1 mb-1">
              <span>ENGINEERING_TOLERANCE:</span>
              <span className="text-cyan-cad">&plusmn;0.05 mm (CNC)</span>
            </div>
            <div className="flex items-center justify-between">
              <span>STANDARDS_FRAMEWORK:</span>
              <span className="text-white">ASME Y14.5 / ISO 2768</span>
            </div>
          </div>
        </div>

        {/* Blueprint Spec Sheet Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {specSheetSections.map((sec) => (
            <div
              key={sec.code}
              className="p-6 sm:p-8 rounded-xl bg-surface border border-surface-border technical-box shadow-xl"
            >
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-surface-border">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-cyan-cad/10 text-cyan-cad font-mono text-[10px] font-bold border border-cyan-cad/20">
                    {sec.code}
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {sec.title}
                  </h3>
                </div>
                <div className="w-2 h-2 rounded-full bg-cyan-cad/60" />
              </div>

              <div className="space-y-4">
                {sec.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded bg-surface-elevated/80 border border-surface-border hover:border-steel-500 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-bold text-white font-mono">
                        {item.name}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-cad shrink-0" />
                    </div>
                    <p className="text-xs text-steel-400 mt-1 leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
