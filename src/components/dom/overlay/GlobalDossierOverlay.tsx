import React, { useEffect, useRef } from 'react';
import { X, Cpu, Layers, CheckCircle, Code, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { useScene } from '../../../context/SceneContext';

export const GlobalDossierOverlay: React.FC = () => {
  const { overlayContent, closeOverlay } = useScene();
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayContent && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 30, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'power2.out' }
      );
    }
  }, [overlayContent]);

  if (!overlayContent) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-6">
      <div className="min-h-full w-full min-w-0 flex items-center justify-center">
        <div
          ref={cardRef}
          className="w-full max-w-[calc(100vw-24px)] sm:max-w-3xl rounded-xl sm:rounded-2xl bg-[#090E1A] border border-[#1E293B] p-4 sm:p-8 text-left shadow-2xl transition-all font-sans my-4 box-border overflow-hidden"
        >
        {/* Top Badge & Close Button */}
        <div className="flex items-start justify-between pb-3 border-b border-[#1E293B] gap-2 flex-wrap sm:flex-nowrap">
          <div className="flex items-center gap-1.5 font-mono flex-wrap flex-1 min-w-0">
            <span className="text-[10px] sm:text-[11px] font-semibold bg-[#00F2FE]/15 text-[#00F2FE] px-2 py-0.5 rounded border border-[#00F2FE]/30 truncate">
              {overlayContent.category}
            </span>
            {overlayContent.badge && (
              <span className="text-[10px] sm:text-[11px] bg-[#1E293B] text-[#94A3B8] px-2 py-0.5 rounded truncate">
                {overlayContent.badge}
              </span>
            )}
          </div>

          <button
            onClick={closeOverlay}
            className="flex items-center gap-1 text-xs text-[#94A3B8] hover:text-white bg-[#1E293B]/60 hover:bg-[#1E293B] px-2.5 py-1 rounded-lg border border-[#334155] transition-colors cursor-pointer font-mono shrink-0"
          >
            <span>CLOSE</span>
            <kbd className="text-[9px] text-[#64748B] hidden sm:inline">ESC</kbd>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Title & Subtitle */}
        <div className="mt-4">
          <h2 className="text-base sm:text-2xl font-bold text-white tracking-tight break-words">
            {overlayContent.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1 leading-relaxed">
            {overlayContent.subtitle}
          </p>
        </div>

        {/* Overview Section */}
        <div className="mt-6 p-4 rounded-xl bg-[#0F172A]/70 border border-[#1E293B]/80">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#38BDF8] uppercase tracking-wider mb-2">
            <Cpu className="w-4 h-4" />
            <span>Executive Architecture Summary</span>
          </div>
          <p className="text-sm text-[#E2E8F0] leading-relaxed">
            {overlayContent.overview}
          </p>
        </div>

        {/* Technical Architecture Highlights */}
        {overlayContent.technicalHighlights.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#00F2FE] uppercase tracking-wider mb-3">
              <Layers className="w-4 h-4" />
              <span>Architectural Pillars & Implementation Highlights</span>
            </div>
            <div className="grid gap-2.5">
              {overlayContent.technicalHighlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-lg bg-[#0B1323] border border-[#1E293B] text-xs text-[#CBD5E1] leading-relaxed"
                >
                  <CheckCircle className="w-4 h-4 text-[#00F2FE] shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Metrics or Deliverables */}
        {overlayContent.metricsOrDeliverables.length > 0 && (
          <div className="mt-6">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#34D399] uppercase tracking-wider mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>Scale, Throughput & Verification Scope</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {overlayContent.metricsOrDeliverables.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-lg bg-[#061410] border border-[#065F46]/40 text-xs text-[#A7F3D0] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technologies Badges */}
        {overlayContent.technologies.length > 0 && (
          <div className="mt-6 pt-4 border-t border-[#1E293B]">
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-wider mb-2.5">
              <Code className="w-4 h-4 text-[#64748B]" />
              <span>Technology Ecosystem</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {overlayContent.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono bg-[#1E293B]/70 text-[#E2E8F0] px-2.5 py-1 rounded-md border border-[#334155]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="mt-8 pt-4 border-t border-[#1E293B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#64748B] font-mono">
          <span className="text-[10px] sm:text-xs">SOURCE VERIFIED IN AYAN PAL REPOSITORY</span>
          <button
            onClick={closeOverlay}
            className="text-[#00F2FE] hover:underline cursor-pointer text-xs"
          >
            RETURN TO SPATIAL CHAMBER
          </button>
        </div>
      </div>
    </div>
  </div>
);
};
