import React from 'react';
import { X, GraduationCap, Briefcase, Code, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/resumeData';
import { soundEngine } from '../../utils/synthesizer';

interface HogwartsAboutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact: () => void;
}

export const HogwartsAboutModal: React.FC<HogwartsAboutModalProps> = ({ isOpen, onClose, onOpenContact }) => {
  if (!isOpen) return null;

  const handleClose = () => {
    soundEngine.playExitRoom();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      {/* Ancient Parchment Scroll Container */}
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] flex flex-col rounded-lg border-2 border-[#8E6827] bg-[#121620] shadow-[0_25px_70px_rgba(0,0,0,0.95)] overflow-hidden"
        style={{
          boxShadow: '0 0 45px rgba(212,175,55,0.25), inset 0 0 30px rgba(0,0,0,0.8)',
        }}
      >
        {/* Ornate Corner Mounts */}
        <div className="corner-bracket-gold" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#8E6827]/60 bg-gradient-to-r from-[#20140D] via-[#161B26] to-[#20140D]">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📜</span>
            <div>
              <span className="font-mono text-[10px] text-[#D4AF37] uppercase tracking-widest font-semibold block">
                The Marauder's Chronicle · Engineer Profile
              </span>
              <h2 className="font-serif text-xl font-bold text-gold-gradient">
                {PERSONAL_INFO.name}
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

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-[#E2E8F0]">
          {/* Bio Summary */}
          <div className="p-4 rounded border border-[#D4AF37]/30 bg-[#161E2C]/70">
            <h3 className="font-serif text-lg font-bold text-[#FFF6D6] mb-1">
              {PERSONAL_INFO.role}
            </h3>
            <p className="font-serif italic text-sm text-[#F5CE62] mb-3">
              "{PERSONAL_INFO.tagline}"
            </p>
            <p className="text-sm text-[#CBD5E1] leading-relaxed">
              Full stack engineer with 2+ years of production experience engineering high-concurrency microservices in Java Spring Boot, multi-provider LLM orchestration engines, vector search pipelines (RAG), and cloud-native architectures across AWS, Azure, and Google Cloud.
            </p>
          </div>

          {/* Anthropic Certification Badge */}
          <div className="p-4 rounded border border-[#D4AF37] bg-gradient-to-r from-[#2B1B10] via-[#1E150D] to-[#2B1B10] flex items-start gap-3.5 shadow-lg">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center shrink-0 text-xl">
              🏆
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-sm font-bold text-[#FDE047]">
                  {PERSONAL_INFO.certification.title}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#10B981]/20 text-[#34D399] border border-[#10B981]/40 font-mono">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-[#CBD5E1] mt-1">
                Issued by {PERSONAL_INFO.certification.issuer} · {PERSONAL_INFO.certification.focus}
              </p>
            </div>
          </div>

          {/* Education & Experience Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Education */}
            <div className="p-4 rounded border border-[#8E6827]/40 bg-black/40">
              <div className="flex items-center gap-2 mb-2 text-[#F5CE62]">
                <GraduationCap className="w-4 h-4" />
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider">Education</h4>
              </div>
              <p className="font-serif font-bold text-sm text-[#FFF]">{PERSONAL_INFO.education.degree}</p>
              <p className="text-xs text-[#94A3B8] mt-1">{PERSONAL_INFO.education.institution}</p>
              <p className="text-xs text-[#D4AF37] mt-1 font-mono">{PERSONAL_INFO.education.period} · {PERSONAL_INFO.education.location}</p>
            </div>

            {/* Current Enterprise Role */}
            <div className="p-4 rounded border border-[#8E6827]/40 bg-black/40">
              <div className="flex items-center gap-2 mb-2 text-[#F5CE62]">
                <Briefcase className="w-4 h-4" />
                <h4 className="font-serif text-xs font-bold uppercase tracking-wider">Current Role</h4>
              </div>
              <p className="font-serif font-bold text-sm text-[#FFF]">Global IT & Digital Engineering Firm</p>
              <p className="text-xs text-[#CBD5E1] mt-1">Full Stack Developer · AI Systems & Cloud</p>
              <p className="text-xs text-[#10B981] mt-1 font-mono">Bangalore, Karnataka · Active Delivery</p>
            </div>
          </div>

          {/* Active POCs / Secret Chamber Projects */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-[#F5CE62] uppercase tracking-wider flex items-center gap-2">
              <Code className="w-4 h-4 text-[#D4AF37]" />
              <span>Active POCs & Advanced Research</span>
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {PERSONAL_INFO.currentPOCs.map((poc) => (
                <div key={poc.id} className="p-3.5 rounded border border-[#D4AF37]/20 bg-[#141B26]/70">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif text-sm font-bold text-[#FFF6D6]">{poc.name}</span>
                    <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#3B82F6]/20 text-[#60A5FA] border border-[#3B82F6]/40">
                      {poc.stage}
                    </span>
                  </div>
                  <p className="text-xs text-[#CBD5E1] leading-relaxed mb-2">{poc.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {poc.tech.map((t) => (
                      <span key={t} className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-black/50 text-[#F5CE62] border border-[#D4AF37]/30">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-[#8E6827]/50 bg-[#0B0F17] flex items-center justify-between">
          <button
            onClick={() => {
              onClose();
              onOpenContact();
            }}
            className="flex items-center gap-1.5 text-xs font-serif text-[#F5CE62] hover:text-[#FFF] transition-colors cursor-pointer"
          >
            <span>Dispatch Owl Post to Ayan</span>
            <span>→</span>
          </button>

          <a
            href="/my resume.pdf"
            download="Ayan_Pal_Resume.pdf"
            onClick={() => soundEngine.playParchment()}
            className="flex items-center gap-1.5 px-4 py-1 rounded bg-[#3A2415] hover:bg-[#4E311D] border border-[#D4AF37] text-xs font-serif font-bold text-[#FDE047] transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Download Resume PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
};
