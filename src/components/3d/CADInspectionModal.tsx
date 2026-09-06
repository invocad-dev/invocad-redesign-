import React, { useState } from 'react';
import { MechanicalViewport } from './MechanicalViewport';
import { MECHANICAL_PARTS, MechanicalPartInfo } from './mechanicalData';
import {
  X,
  Layers,
  Sliders,
  CheckCircle2,
  FileText,
  MessageCircle,
  Maximize2,
  Minimize2,
  Wrench,
  Cpu,
  ChevronRight,
} from 'lucide-react';

interface CADInspectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPartId?: string;
  theme: 'warm' | 'dark';
}

const WHATSAPP_BASE = 'https://wa.me/917812883741?text=';

export const CADInspectionModal: React.FC<CADInspectionModalProps> = ({
  isOpen,
  onClose,
  initialPartId,
  theme,
}) => {
  const [selectedPartId, setSelectedPartId] = useState<string>(initialPartId || 'shaft');
  const [explosion, setExplosion] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'bom' | 'specs' | 'tolerances'>('bom');

  if (!isOpen) return null;

  const currentPart = MECHANICAL_PARTS[selectedPartId] || MECHANICAL_PARTS.shaft;
  const partsList = Object.values(MECHANICAL_PARTS);

  const bgModal = theme === 'warm' ? 'bg-[#0f1117]' : 'bg-[#090a0f]';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn select-none">
      <div
        className={`relative w-full h-full max-w-7xl rounded-2xl ${bgModal} border border-white/15 shadow-2xl flex flex-col overflow-hidden text-white`}
      >
        {/* HEADER BAR */}
        <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between flex-shrink-0 bg-black/40">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="font-mono text-sm font-semibold tracking-wider uppercase text-white">
                INVOCAD 3D CAD INSPECTION WORKBENCH
              </span>
            </div>
            <span className="hidden md:inline-block text-xs font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-white/70">
              REV 2.4 • SOLIDWORKS / STEP 242 COMPLIANT
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`${WHATSAPP_BASE}${encodeURIComponent(
                `Hi Invocad team, I am inspecting the ${currentPart.name} (${currentPart.partNumber}) and would like to discuss design specifications & DFM.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#25D366] hover:bg-[#20b858] text-white text-xs font-semibold tracking-wide transition-colors"
            >
              <MessageCircle size={14} />
              Discuss Part on WhatsApp
            </a>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* WORKBENCH BODY: 3-Column Studio Layout */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
          {/* LEFT COLUMN: Interactive Bill of Materials (BOM) & Specs */}
          <div className="lg:col-span-4 border-r border-white/10 flex flex-col h-full bg-black/30 overflow-hidden">
            {/* Tabs */}
            <div className="flex items-center border-b border-white/10 p-2 gap-1 bg-black/20">
              {(
                [
                  { id: 'bom', label: 'Bill of Materials', icon: Layers },
                  { id: 'specs', label: 'Part Specs', icon: FileText },
                  { id: 'tolerances', label: 'GD&T / Tolerances', icon: Wrench },
                ] as const
              ).map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-all
                      ${activeTab === tab.id ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30' : 'text-white/60 hover:text-white hover:bg-white/5'}`}
                  >
                    <Icon size={13} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === 'bom' && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-mono text-white/50 px-2 uppercase tracking-wider mb-2">
                    Assembly Components ({partsList.length})
                  </div>
                  {partsList.map((part) => (
                    <div
                      key={part.id}
                      onClick={() => setSelectedPartId(part.id)}
                      className={`group p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between
                        ${selectedPartId === part.id ? 'bg-cyan-500/15 border-cyan-400/50 shadow-md' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20'}`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: part.colorHighlight }}
                        />
                        <div>
                          <div className="font-mono text-[10px] text-cyan-300 uppercase">
                            {part.partNumber}
                          </div>
                          <div className="font-semibold text-xs text-white leading-tight">
                            {part.name}
                          </div>
                        </div>
                      </div>
                      <ChevronRight
                        size={14}
                        className={`transition-transform ${selectedPartId === part.id ? 'text-cyan-300 translate-x-1' : 'text-white/30'}`}
                      />
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="p-2 space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                    <div className="flex items-center gap-2 text-cyan-300 font-mono text-xs uppercase tracking-wider">
                      <Cpu size={14} />
                      <span>{currentPart.partNumber}</span>
                    </div>
                    <h3 className="font-bold text-base text-white">{currentPart.name}</h3>
                    <p className="text-xs text-white/70 leading-relaxed">
                      {currentPart.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5 font-mono text-xs">
                    <div className="text-[11px] uppercase tracking-wider text-white/40 pb-1 border-b border-white/10">
                      Material Specification
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Base Material:</span>
                      <span className="text-white text-right">{currentPart.material}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Heat Treatment:</span>
                      <span className="text-white text-right">{currentPart.treatment}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/50">Component Mass:</span>
                      <span className="text-cyan-300">{currentPart.mass}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'tolerances' && (
                <div className="p-2 space-y-3 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2.5">
                    <div className="text-[11px] uppercase tracking-wider text-cyan-300 pb-1 border-b border-white/10">
                      GD&T & Manufacturing Tolerances
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-white/50 text-[10px]">Geometric Standard:</div>
                      <div className="text-white bg-black/40 p-2 rounded border border-white/5">
                        {currentPart.standard}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-white/50 text-[10px]">Critical Dimension Tolerance:</div>
                      <div className="text-white bg-black/40 p-2 rounded border border-white/5">
                        {currentPart.tolerance}
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-white/50 text-[10px]">Surface Texture (Roughness):</div>
                      <div className="text-white bg-black/40 p-2 rounded border border-white/5">
                        {currentPart.surfaceFinish}
                      </div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-cyan-200/80 text-[11px] leading-relaxed">
                    All CAD models and 2D manufacturing drawings produced by Invocad adhere strictly to ASME Y14.5-2018 and ISO 1101 geometric dimensioning & tolerancing standards.
                  </div>
                </div>
              )}
            </div>

            {/* Quick Component Spec Footnote */}
            <div className="p-4 border-t border-white/10 bg-black/40 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-mono text-white/50 uppercase">Active Part</div>
                <div className="text-xs font-semibold text-white">{currentPart.name}</div>
              </div>
              <a
                href={`${WHATSAPP_BASE}${encodeURIComponent(
                  `Hi Invocad, I'd like a custom quotation for manufacturing ${currentPart.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs font-mono uppercase tracking-wider transition-colors"
              >
                Quote Part
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Master 3D Viewport with Full Orbit & Controls */}
          <div className="lg:col-span-8 relative flex flex-col h-full bg-gradient-to-b from-[#11141c] to-[#090a0e]">
            {/* Real Mechanical Viewport */}
            <div className="flex-1 w-full h-full relative">
              <MechanicalViewport
                className="w-full h-full"
                cameraZ={8.0}
                autoRotate={false}
                explosionFactor={explosion}
                showControls={true}
                interactive={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
