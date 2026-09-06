import React from 'react';
import { ArrowUpRight, Gauge, Wrench, Shield, CheckCircle2, ChevronRight } from 'lucide-react';
import { PRODUCTS_DATA, ProductItem } from '../data/invocadData';

interface FeaturedWorkProps {
  onInspectProduct: (product: ProductItem) => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({ onInspectProduct }) => {
  return (
    <section id="work" className="py-24 border-b border-surface-border relative bg-void overflow-hidden">
      {/* CAD blueprint grid watermark */}
      <div className="absolute inset-0 cad-grid-bg opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-cad" />
              <span className="font-mono text-xs text-steel-400 tracking-widest uppercase">
                SECTION 03 // ENGINEERING PORTFOLIO
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              SELECTED WORK.
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-steel-300 font-normal leading-relaxed">
            Real industrial machinery, custom material handling conveyors, and specialized food processing systems designed and engineered by Invocad.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="space-y-8">
          
          {/* Row 1: Hero Project (Large Asymmetric Showcase) */}
          {PRODUCTS_DATA.slice(0, 1).map((product) => (
            <div
              key={product.id}
              onClick={() => onInspectProduct(product)}
              className="cursor-pointer group rounded-xl bg-surface border border-surface-border hover:border-cyan-cad/60 transition-all duration-300 overflow-hidden technical-box shadow-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-6 sm:p-8">
                
                {/* Visual */}
                <div className="lg:col-span-7 aspect-[16/10] rounded-lg bg-void/90 border border-surface-border overflow-hidden flex items-center justify-center p-6 relative cad-grid-subtle">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain filter drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-void/80 border border-surface-border px-2.5 py-1 rounded font-mono text-[10px] text-cyan-cad">
                    MACHINERY_ID // 0{product.id}
                  </div>
                  <div className="absolute bottom-3 right-3 bg-void/80 border border-surface-border px-2.5 py-1 rounded font-mono text-[10px] text-emerald-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{product.status}</span>
                  </div>
                </div>

                {/* Specs & Description */}
                <div className="lg:col-span-5 space-y-5">
                  <div>
                    <div className="font-mono text-xs text-cyan-cad tracking-wider uppercase mb-1">
                      {product.category}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-cyan-cad transition-colors">
                      {product.title}
                    </h3>
                  </div>

                  <p className="text-sm text-steel-300 leading-relaxed">
                    {product.tagline}
                  </p>

                  {/* Highlights Table */}
                  <div className="space-y-2 border-y border-surface-border py-4">
                    {product.specs.slice(0, 4).map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs font-mono">
                        <span className="text-steel-400">{s.label}:</span>
                        <span className="text-white font-semibold">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-wrap gap-1.5">
                      {product.industries.slice(0, 2).map((ind, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-surface-elevated text-[10px] font-mono text-steel-400"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>

                    <div className="inline-flex items-center gap-1 text-xs font-mono text-cyan-cad font-semibold group-hover:translate-x-1 transition-transform">
                      <span>View Specifications</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}

          {/* Row 2: Two Mid-Sized Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS_DATA.slice(1, 3).map((product) => (
              <div
                key={product.id}
                onClick={() => onInspectProduct(product)}
                className="cursor-pointer group rounded-xl bg-surface border border-surface-border hover:border-cyan-cad/60 transition-all duration-300 overflow-hidden technical-box flex flex-col justify-between p-6 shadow-xl"
              >
                <div>
                  <div className="aspect-[16/10] rounded-lg bg-void/90 border border-surface-border overflow-hidden flex items-center justify-center p-6 relative mb-5 cad-grid-subtle">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-void/80 border border-surface-border px-2 py-0.5 rounded font-mono text-[9px] text-cyan-cad">
                      MACHINERY_ID // 0{product.id}
                    </div>
                  </div>

                  <div className="font-mono text-[11px] text-cyan-cad tracking-wider uppercase mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-cad transition-colors mb-2">
                    {product.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-steel-300 leading-relaxed mb-4">
                    {product.tagline}
                  </p>
                </div>

                <div className="border-t border-surface-border pt-4 mt-auto">
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
                    <div>
                      <span className="text-steel-500 block text-[10px]">OUTPUT</span>
                      <span className="text-white font-medium">{product.specs.find(s => s.label.includes('Output') || s.label.includes('Payload'))?.value || '4.5 ton/hr'}</span>
                    </div>
                    <div>
                      <span className="text-steel-500 block text-[10px]">MOTOR</span>
                      <span className="text-white font-medium">{product.specs.find(s => s.label.includes('Motor'))?.value || '1.0 HP'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-cyan-cad">
                    <span>Inspect CAD Data</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Row 3: Makhana Graders (Open & Closed Duo) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS_DATA.slice(3, 5).map((product) => (
              <div
                key={product.id}
                onClick={() => onInspectProduct(product)}
                className="cursor-pointer group rounded-xl bg-surface border border-surface-border hover:border-cyan-cad/60 transition-all duration-300 overflow-hidden technical-box flex flex-col justify-between p-6 shadow-xl"
              >
                <div>
                  <div className="aspect-[16/10] rounded-lg bg-void/90 border border-surface-border overflow-hidden flex items-center justify-center p-6 relative mb-5 cad-grid-subtle">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain filter drop-shadow-xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 bg-void/80 border border-surface-border px-2 py-0.5 rounded font-mono text-[9px] text-cyan-cad">
                      MACHINERY_ID // 0{product.id}
                    </div>
                    <div className="absolute bottom-2 right-2 bg-void/80 border border-surface-border px-2 py-0.5 rounded font-mono text-[9px] text-emerald-400">
                      4-TIER SIZING
                    </div>
                  </div>

                  <div className="font-mono text-[11px] text-cyan-cad tracking-wider uppercase mb-1">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-cyan-cad transition-colors mb-2">
                    {product.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-steel-300 leading-relaxed mb-4">
                    {product.tagline}
                  </p>
                </div>

                <div className="border-t border-surface-border pt-4 mt-auto">
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono mb-4">
                    <div>
                      <span className="text-steel-500 block text-[10px]">CAPACITY</span>
                      <span className="text-white font-medium">300 kg / hr</span>
                    </div>
                    <div>
                      <span className="text-steel-500 block text-[10px]">VIBRO DRIVE</span>
                      <span className="text-white font-medium">Dual 1 HP &times; 2</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-cyan-cad">
                    <span>Inspect CAD Data</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
