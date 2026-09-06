import React from 'react';
import { Layers, CheckCircle2, ShieldCheck, Compass, PenTool } from 'lucide-react';

export const TechnicalExplodedShowcase: React.FC = () => {
  const bomItems = [
    {
      partNo: 'INV-PT-01',
      name: 'Splined Drive Shaft',
      material: 'AISI 4340 Alloy Steel (Induction Hardened)',
      spec: 'Ground & Polished / Tolerance h6 (&plusmn;0.008mm)'
    },
    {
      partNo: 'INV-PT-02',
      name: 'Sun & Planetary Spur Gears',
      material: 'EN24 / Case Hardened 58-62 HRC',
      spec: 'Module 1.5 // 20&deg; Pressure Angle // DIN Class 6'
    },
    {
      partNo: 'INV-PT-03',
      name: 'Planetary Carrier Sub-Assembly',
      material: 'Aluminum 6061-T6 (Black Anodized)',
      spec: '5-Axis CNC Milled // Weight-Relieved Geometry'
    },
    {
      partNo: 'INV-PT-04',
      name: 'Deep Groove Radial Bearings',
      material: 'High-Carbon Chromium 52100',
      spec: 'ABEC-5 / C3 Internal Radial Clearance'
    },
    {
      partNo: 'INV-PT-05',
      name: 'Hex Socket Cap Screws (x8)',
      material: 'Grade 12.9 High-Tensile Steel',
      spec: 'Torque Spec: 32 Nm // Thread Class 6g'
    },
    {
      partNo: 'INV-PT-06',
      name: 'Machined Outer Flange Shell',
      material: 'Structural Mild Steel / Powder Coated',
      spec: 'Laser Cut & Precision TIG Welded Substructure'
    }
  ];

  return (
    <section id="technical" className="min-h-screen py-28 px-6 sm:px-12 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-current/10 pb-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase opacity-60">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>06 // TECHNICAL ANATOMY &amp; BOM</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-[-0.03em] leading-none">
              EVERY COMPONENT <br />
              <span className="opacity-40">HAS A PURPOSE.</span>
            </h2>
          </div>
          <div className="font-mono text-xs tracking-wider uppercase opacity-70 max-w-sm">
            EXPLODED 3D VIEWPORT ACTIVE &bull; ALL INTERNAL BEARINGS, SHAFTS, AND GEAR TEETH VISIBLE.
          </div>
        </div>

        {/* BOM Technical Specification Sheet Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Telemetry Data Box */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-6 rounded-xl border border-current/15 bg-current/5 space-y-4">
              <div className="font-mono text-xs tracking-widest uppercase text-cyan-400 flex items-center gap-2">
                <Compass className="w-4 h-4" />
                <span>ASSEMBLY AUDIT // REV. 04</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed opacity-80">
                True engineering excellence happens at the interface: where tolerances stack up, thermal expansion is accounted for, and maintenance access is guaranteed.
              </p>

              <div className="pt-2 border-t border-current/10 space-y-2 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="opacity-60">TOTAL COMPONENT COUNT:</span>
                  <span className="font-bold">34 PARTS</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">TOTAL ASSEMBLY MASS:</span>
                  <span className="font-bold">14.82 KG</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">CRITICAL TOLERANCE:</span>
                  <span className="font-bold text-cyan-400">&plusmn;0.015 MM</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-60">DRAWING STANDARD:</span>
                  <span className="font-bold">ASME Y14.5M</span>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl border border-current/15 bg-current/5 font-mono text-xs space-y-2">
              <div className="text-cyan-400 uppercase font-bold">
                NATIVE CAD INTEROPERABILITY
              </div>
              <p className="text-[11px] opacity-70 leading-relaxed">
                Native SolidWorks (.sldprt/.sldasm), CATIA (.CATPart), PTC Creo (.prt), and neutral STEP AP242 models with semantic PMI / GD&T.
              </p>
            </div>
          </div>

          {/* Right: Itemized Bill of Materials (BOM) Table */}
          <div className="lg:col-span-8 rounded-xl border border-current/15 bg-current/5 overflow-hidden">
            <div className="p-4 border-b border-current/10 font-mono text-xs uppercase tracking-wider flex items-center justify-between opacity-70">
              <span>ITEMIZED BILL OF MATERIALS (BOM)</span>
              <span>ISO 9001 COMPLIANT ARCHIVE</span>
            </div>

            <div className="divide-y divide-current/10 font-mono text-xs">
              {bomItems.map((item, idx) => (
                <div
                  key={item.partNo}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-current/5 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-cyan-400 font-bold">{item.partNo}</span>
                      <span className="font-bold font-sans text-sm sm:text-base tracking-wide">
                        {item.name}
                      </span>
                    </div>
                    <div className="text-[11px] opacity-70">{item.material}</div>
                  </div>

                  <div className="text-left sm:text-right text-[11px] opacity-60">
                    {item.spec}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
