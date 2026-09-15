import React, { useState } from 'react';
import { X, ExternalLink, Cpu, Layers, Award, Terminal, CheckCircle2 } from 'lucide-react';
import { HogwartsPainting } from './HogwartsPaintingsData';
import { CASE_STUDIES } from '../../data/caseStudies';
import { soundEngine } from '../../utils/synthesizer';

interface HogwartsDossierModalProps {
  painting: HogwartsPainting | null;
  onClose: () => void;
}

export const HogwartsDossierModal: React.FC<HogwartsDossierModalProps> = ({ painting, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'metrics' | 'stack'>('overview');

  if (!painting) return null;

  const matchedCaseStudy = CASE_STUDIES.find((cs) => cs.id === painting.caseStudyId);

  const handleClose = () => {
    soundEngine.playExitRoom();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Outer Ancient Leather & Brass Book Cover */}
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-lg border-2 border-[#8E6827] bg-[#121620] shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden"
        style={{
          boxShadow: '0 0 45px rgba(212,175,55,0.25), inset 0 0 30px rgba(0,0,0,0.8)',
        }}
      >
        {/* Ornate Corner Mounts */}
        <div className="absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none z-30" />
        <div className="absolute top-1 right-1 w-5 h-5 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none z-30" />
        <div className="absolute bottom-1 left-1 w-5 h-5 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none z-30" />
        <div className="absolute bottom-1 right-1 w-5 h-5 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none z-30" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#8E6827]/60 bg-gradient-to-r from-[#20140D] via-[#161B26] to-[#20140D]">
          <div className="flex items-center gap-2.5">
            <span className="text-xl drop-shadow">{painting.iconSymbol}</span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold">
                  Hogwarts Dossier · {painting.locationName}
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#3B2616] text-[#FDE047] border border-[#D4AF37]/40">
                  {painting.categoryLabel}
                </span>
              </div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-gold-gradient">
                {painting.title}
              </h2>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-full border border-[#8E6827]/60 bg-black/40 text-[#CBD5E1] hover:text-[#FFF] hover:border-[#F5CE62] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 pt-3 pb-2 border-b border-[#D4AF37]/20 bg-[#0E131C] overflow-x-auto">
          <button
            onClick={() => {
              soundEngine.playClick(850);
              setActiveTab('overview');
            }}
            className={`font-serif text-xs px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'overview'
                ? 'bg-[#3A2415] text-[#FDE047] border border-[#D4AF37]/80 font-bold shadow'
                : 'text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-white/5'
            }`}
          >
            Overview & Lore
          </button>

          <button
            onClick={() => {
              soundEngine.playClick(850);
              setActiveTab('architecture');
            }}
            className={`font-serif text-xs px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'architecture'
                ? 'bg-[#3A2415] text-[#FDE047] border border-[#D4AF37]/80 font-bold shadow'
                : 'text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-white/5'
            }`}
          >
            Architecture Blueprint
          </button>

          <button
            onClick={() => {
              soundEngine.playClick(850);
              setActiveTab('metrics');
            }}
            className={`font-serif text-xs px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'metrics'
                ? 'bg-[#3A2415] text-[#FDE047] border border-[#D4AF37]/80 font-bold shadow'
                : 'text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-white/5'
            }`}
          >
            Production Metrics
          </button>

          <button
            onClick={() => {
              soundEngine.playClick(850);
              setActiveTab('stack');
            }}
            className={`font-serif text-xs px-3 py-1.5 rounded transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'stack'
                ? 'bg-[#3A2415] text-[#FDE047] border border-[#D4AF37]/80 font-bold shadow'
                : 'text-[#94A3B8] hover:text-[#E2E8F0] hover:bg-white/5'
            }`}
          >
            Spell Technologies
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-[#E2E8F0]">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Engineering Title & Tagline */}
              <div className="p-4 rounded border border-[#D4AF37]/30 bg-[#161E2C]/70">
                <span className="font-mono text-xs text-[#F5CE62] uppercase tracking-wider block mb-1">
                  Verified Engineering System
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFF6D6] leading-snug">
                  {painting.engineeringTitle}
                </h3>
                <p className="mt-2 text-sm text-[#CBD5E1] leading-relaxed">
                  {painting.fullDescription}
                </p>
              </div>

              {/* Magical Hogwarts Lore Box */}
              <div className="p-4 rounded border border-[#8E6827]/40 bg-gradient-to-r from-[#2B1B10]/70 via-[#1F140C]/60 to-[#2B1B10]/70 relative overflow-hidden">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⚡</span>
                  <div>
                    <h4 className="font-serif text-xs font-bold text-[#FDE047] uppercase tracking-wider mb-1">
                      Arcane Lore & Spatial Allegory
                    </h4>
                    <p className="font-serif italic text-sm text-[#FFE8A3]/90 leading-relaxed">
                      "{painting.magicalLore}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Highlights List */}
              {matchedCaseStudy && (
                <div className="space-y-3">
                  <h4 className="font-serif text-sm font-bold text-[#F5CE62] uppercase tracking-wider flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#D4AF37]" />
                    <span>Key Engineering Accomplishments</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {matchedCaseStudy.architectureHighlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 p-3 rounded bg-black/40 border border-[#D4AF37]/20 text-xs sm:text-sm text-[#E2E8F0]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ARCHITECTURE BLUEPRINT */}
          {activeTab === 'architecture' && (
            <div className="space-y-6">
              <div className="p-4 rounded border border-[#D4AF37]/40 bg-black/60">
                <h4 className="font-serif text-sm font-bold text-[#F5CE62] mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[#D4AF37]" />
                  <span>High-Level Architectural Topology</span>
                </h4>

                {/* Interactive SVG Topology Diagram */}
                <div className="relative w-full aspect-[16/9] rounded border border-[#8E6827]/30 bg-[#0B0F17] p-3 flex items-center justify-center overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 800 450">
                    <defs>
                      <linearGradient id="nodeGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#25354C" />
                        <stop offset="100%" stopColor="#0F172A" />
                      </linearGradient>
                      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="#D4AF37" />
                      </marker>
                    </defs>

                    {/* Node 1: Client / Ingestion Gateway */}
                    <rect x="40" y="170" width="160" height="100" rx="8" fill="url(#nodeGrad)" stroke="#D4AF37" strokeWidth="2" />
                    <text x="120" y="210" textAnchor="middle" fill="#FFF" fontSize="14" fontFamily="serif" fontWeight="bold">Ingestion Layer</text>
                    <text x="120" y="235" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="monospace">REST & WebSockets</text>

                    {/* Node 2: Core Processing Orchestrator */}
                    <rect x="300" y="140" width="200" height="160" rx="8" fill="url(#nodeGrad)" stroke="#F5CE62" strokeWidth="2.5" />
                    <text x="400" y="185" textAnchor="middle" fill="#FDE047" fontSize="16" fontFamily="serif" fontWeight="bold">Java Spring Boot Core</text>
                    <text x="400" y="210" textAnchor="middle" fill="#E2E8F0" fontSize="12" fontFamily="monospace">Multi-Threading & Failover</text>
                    <text x="400" y="235" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="monospace">Key Rotation / Auth Gate</text>
                    <text x="400" y="260" textAnchor="middle" fill="#38BDF8" fontSize="11" fontFamily="monospace">ChromaDB / Redis Cache</text>

                    {/* Node 3: External Heterogeneous Providers (Top Right) */}
                    <rect x="580" y="80" width="180" height="90" rx="8" fill="url(#nodeGrad)" stroke="#38BDF8" strokeWidth="2" />
                    <text x="670" y="115" textAnchor="middle" fill="#38BDF8" fontSize="13" fontFamily="serif" fontWeight="bold">Cloud Providers</text>
                    <text x="670" y="140" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="monospace">AWS · Azure · GCP</text>

                    {/* Node 4: Vector / Relational Storage (Bottom Right) */}
                    <rect x="580" y="270" width="180" height="90" rx="8" fill="url(#nodeGrad)" stroke="#10B981" strokeWidth="2" />
                    <text x="670" y="305" textAnchor="middle" fill="#10B981" fontSize="13" fontFamily="serif" fontWeight="bold">Storage Tiers</text>
                    <text x="670" y="330" textAnchor="middle" fill="#94A3B8" fontSize="11" fontFamily="monospace">ChromaDB · MySQL · S3</text>

                    {/* Connection Lines */}
                    <line x1="200" y1="220" x2="295" y2="220" stroke="#D4AF37" strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="500" y1="190" x2="575" y2="135" stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="500" y1="250" x2="575" y2="305" stroke="#10B981" strokeWidth="2" markerEnd="url(#arrow)" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PRODUCTION METRICS */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold text-[#F5CE62] uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                <span>Verified Impact & Production Scope</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {painting.keyMetrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded border border-[#D4AF37]/30 bg-[#141B26]/80 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 text-xs font-serif font-bold text-[#FDE047]">
                      {idx + 1}
                    </div>
                    <span className="text-xs sm:text-sm text-[#E2E8F0] leading-snug">{metric}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STACK */}
          {activeTab === 'stack' && (
            <div className="space-y-4">
              <h4 className="font-serif text-sm font-bold text-[#F5CE62] uppercase tracking-wider flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#D4AF37]" />
                <span>Technology Runes & Frameworks</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {painting.technologies.map((tech) => (
                  <div
                    key={tech}
                    className="flex items-center gap-2 p-2.5 rounded bg-black/40 border border-[#8E6827]/40 hover:border-[#F5CE62] transition-colors"
                  >
                    <span className="text-xs text-[#D4AF37]">✦</span>
                    <span className="font-mono text-xs text-[#FFF6D6] font-semibold">{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 border-t border-[#8E6827]/50 bg-[#0B0F17] flex items-center justify-between">
          <span className="font-serif text-xs text-[#94A3B8]">
            Hogwarts Archival Record · Ayan Pal
          </span>
          <div className="flex items-center gap-2">
            <a
              href="https://github.com/latecoder10"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1 rounded border border-[#D4AF37]/40 text-xs font-serif text-[#F5CE62] hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              onClick={handleClose}
              className="px-4 py-1 rounded bg-[#3A2415] hover:bg-[#4E311D] border border-[#D4AF37] text-xs font-serif font-bold text-[#FDE047] transition-colors cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
