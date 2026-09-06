import React, { useState } from 'react';
import { X, Send, ShieldCheck, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { COMPANY_INFO, SERVICES_DATA } from '../data/invocadData';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  onClose,
  defaultService
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedService, setSelectedService] = useState(defaultService || SERVICES_DATA[0].title);
  const [timeline, setTimeline] = useState('Standard (2-4 weeks)');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construct WhatsApp message and direct email fallback
    const text = `*New Engineering RFQ - Invocad*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Email:* ${encodeURIComponent(email)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Service:* ${encodeURIComponent(selectedService)}%0A*Timeline:* ${encodeURIComponent(timeline)}%0A*Project Scope:* ${encodeURIComponent(message)}`;
    const waUrl = `https://wa.me/917812883741?text=${text}`;

    setSubmitted(true);

    // Open WhatsApp in new tab
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl rounded-xl bg-surface border border-cyan-cad/40 shadow-2xl p-6 sm:p-8 z-10 technical-box my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded bg-surface-elevated border border-surface-border text-steel-400 hover:text-white hover:border-steel-400 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-cad/10 border border-cyan-cad flex items-center justify-center mx-auto text-cyan-cad">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-extrabold text-white">
              PROJECT BRIEF SUBMITTED
            </h3>
            <p className="text-sm text-steel-300 max-w-md mx-auto leading-relaxed">
              Thank you, <span className="text-white font-semibold">{name}</span>. We are opening WhatsApp to immediately connect you with our lead mechanical engineer. You can also reach us directly at <span className="text-cyan-cad font-mono">{COMPANY_INFO.email}</span>.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded bg-cyan-cad text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-cyan-300 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="space-y-2 mb-6 pr-8">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-cad uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-cad animate-pulse" />
                <span>REQUEST FOR QUOTE &bull; INVOCAD STUDIO</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                START AN ENGINEERING PROJECT
              </h3>
              <p className="text-xs sm:text-sm text-steel-400 leading-relaxed">
                Tell us about your product or problem. We review briefs and respond with engineering scopes within 24 hours.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-steel-300 uppercase block">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. David Miller"
                    className="w-full px-3.5 py-2.5 rounded bg-surface-elevated border border-surface-border text-sm text-white placeholder-steel-600 focus:outline-none focus:border-cyan-cad transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-steel-300 uppercase block">
                    Corporate / Contact Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="david@company.com"
                    className="w-full px-3.5 py-2.5 rounded bg-surface-elevated border border-surface-border text-sm text-white placeholder-steel-600 focus:outline-none focus:border-cyan-cad transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-steel-300 uppercase block">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded bg-surface-elevated border border-surface-border text-sm text-white placeholder-steel-600 focus:outline-none focus:border-cyan-cad transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-mono text-xs text-steel-300 uppercase block">
                    Primary Service Discipline
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded bg-surface-elevated border border-surface-border text-sm text-white focus:outline-none focus:border-cyan-cad transition-colors font-sans"
                  >
                    {SERVICES_DATA.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="Turnkey Hardware Development">Full Turnkey Machine / Product</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-steel-300 uppercase block">
                  Target Project Timeline
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Urgent (< 2 weeks)', 'Standard (2-4 weeks)', 'Long-term / Milestone'].map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setTimeline(opt)}
                      className={`py-2 px-2 rounded border text-xs font-mono transition-colors text-center ${
                        timeline === opt
                          ? 'bg-cyan-cad/20 text-cyan-cad border-cyan-cad'
                          : 'bg-surface-elevated text-steel-400 border-surface-border hover:border-steel-500'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-mono text-xs text-steel-300 uppercase block">
                  Project Description &amp; Technical Requirements *
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your mechanical concept, existing files (sketches, 2D DWGs, 3D STEP), materials, or problem to solve..."
                  className="w-full px-3.5 py-2.5 rounded bg-surface-elevated border border-surface-border text-sm text-white placeholder-steel-600 focus:outline-none focus:border-cyan-cad transition-colors"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-steel-500">
                  <ShieldCheck className="w-4 h-4 text-cyan-cad shrink-0" />
                  <span>Strict NDA upon request. Zero data sharing.</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-3 rounded bg-cyan-cad hover:bg-cyan-300 text-black font-mono text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center justify-center gap-2"
                >
                  <span>Transmit Project Brief</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
