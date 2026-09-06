import React from 'react';
import { Layers, Activity, Box, Cpu, Compass, PenTool, CheckCircle, Shield } from 'lucide-react';

export const CapabilityStrip: React.FC = () => {
  const capabilities = [
    { label: '3D CAD MODELING', icon: Box, meta: 'SOLIDWORKS &bull; CATIA' },
    { label: 'MECHANICAL DESIGN', icon: Compass, meta: 'KINEMATICS &bull; LINKAGES' },
    { label: 'CAE & FEA SIMULATION', icon: Activity, meta: 'STRESS &bull; THERMAL' },
    { label: 'MANUFACTURING DRAWINGS', icon: PenTool, meta: 'ASME Y14.5 &bull; GD&T' },
    { label: 'DFM & SHEET METAL', icon: Layers, meta: 'LASER NESTING &bull; CNC' },
    { label: 'REVERSE ENGINEERING', icon: Cpu, meta: 'SCAN-TO-CAD &bull; RECON' },
    { label: 'PHYSICAL PROTOTYPING', icon: Shield, meta: 'SHOP FLOOR &bull; FAI' }
  ];

  return (
    <div className="border-y border-surface-border bg-surface-subtle/80 backdrop-blur-sm relative z-20 overflow-hidden py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 overflow-x-auto no-scrollbar scroll-smooth">
          {capabilities.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-2.5 shrink-0 group cursor-default py-1"
              >
                <div className="w-6 h-6 rounded bg-surface-elevated border border-surface-border flex items-center justify-center text-cyan-cad group-hover:border-cyan-cad/60 transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-xs font-bold tracking-wider text-steel-200 group-hover:text-cyan-cad transition-colors whitespace-nowrap">
                    {cap.label}
                  </span>
                  <span
                    className="font-mono text-[9px] text-steel-500 whitespace-nowrap"
                    dangerouslySetInnerHTML={{ __html: cap.meta }}
                  />
                </div>
                {idx < capabilities.length - 1 && (
                  <span className="text-surface-border font-mono text-xs pl-6 hidden lg:inline select-none">
                    /
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
