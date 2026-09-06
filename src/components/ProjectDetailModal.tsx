import React from 'react';
import { X, CheckCircle2, ArrowUpRight, Gauge, Wrench, Shield, Layers } from 'lucide-react';
import { ProductItem, COMPANY_INFO } from '../data/invocadData';

interface ProjectDetailModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onInquire: (productTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  product,
  onClose,
  onInquire
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl rounded-xl bg-surface border border-cyan-cad/40 shadow-2xl p-6 sm:p-8 z-10 technical-box my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded bg-surface-elevated border border-surface-border text-steel-400 hover:text-white hover:border-steel-400 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Visual Column */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/3] rounded-lg bg-void/90 border border-surface-border overflow-hidden flex items-center justify-center p-6 relative cad-grid-subtle">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain filter drop-shadow-2xl"
              />
              <div className="absolute top-3 left-3 bg-void/80 border border-surface-border px-2.5 py-1 rounded font-mono text-[10px] text-cyan-cad">
                CAD_SPEC // 0{product.id}
              </div>
              <div className="absolute bottom-3 left-3 bg-void/80 border border-surface-border px-2.5 py-1 rounded font-mono text-[10px] text-emerald-400">
                STATUS: {product.status.toUpperCase()}
              </div>
            </div>

            {/* Target Industries */}
            <div className="p-4 rounded bg-surface-elevated border border-surface-border space-y-2">
              <span className="font-mono text-[10px] text-steel-400 uppercase tracking-wider block">
                Primary Industrial Applications
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.industries.map((ind, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded bg-void border border-surface-border text-xs font-mono text-steel-300"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Details & Specs Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="font-mono text-xs text-cyan-cad tracking-wider uppercase mb-1">
                {product.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {product.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-steel-300 leading-relaxed">
              {product.descriptionHtml.replace(/<\/?[^>]+(>|$)/g, '')}
            </p>

            {/* Engineering Specifications Table */}
            <div className="space-y-2">
              <div className="font-mono text-xs text-steel-400 uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-cyan-cad" />
                <span>Audited Technical Specifications</span>
              </div>
              
              <div className="rounded-lg bg-surface-elevated border border-surface-border divide-y divide-surface-border overflow-hidden">
                {product.specs.map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 text-xs font-mono">
                    <span className="text-steel-400">{s.label}</span>
                    <span className="text-white font-semibold">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-steel-400 italic">
              * Dimensions, motors, hopper volumes, and deck counts are customizable to client specifications.
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  onClose();
                  onInquire(product.title);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded bg-cyan-cad hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
              >
                <span>Request Custom Machine Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={`${COMPANY_INFO.whatsappUrl}%20regarding%20${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-3 rounded border border-surface-border bg-surface-elevated hover:bg-surface text-steel-200 text-xs font-mono flex items-center justify-center gap-2"
              >
                <span>Discuss on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
