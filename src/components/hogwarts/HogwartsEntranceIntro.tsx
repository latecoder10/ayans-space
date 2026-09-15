import React, { useState } from 'react';
import { Sparkles, Shield, Compass, ChevronRight, Volume2 } from 'lucide-react';
import { useScene } from '../../context/SceneContext';
import { soundEngine } from '../../utils/synthesizer';

export const HogwartsEntranceIntro: React.FC = () => {
  const { isEntranceIntroOpen, enterCastle, skipEntrance } = useScene();
  const [isHovered, setIsHovered] = useState(false);

  if (!isEntranceIntroOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl select-none transition-opacity duration-1000 animate-in fade-in">
      {/* Mystical radial ambient glow (Emerald and warm gold, inspired by hogwarts-entra) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,78,59,0.35)_0%,rgba(15,23,42,0.6)_45%,#050807_80%)] pointer-events-none" />

      {/* Decorative Golden Hogwarts Corner Ornaments */}
      <div className="absolute top-6 left-6 text-[#D4AF37]/40 text-xs font-serif tracking-widest pointer-events-none hidden sm:block">
        ✦ SANCTUM ARCHITECTURALIS ✦
      </div>
      <div className="absolute top-6 right-6 text-[#D4AF37]/40 text-xs font-mono pointer-events-none hidden sm:block">
        PORTAL LAT: 57°28&apos;N // CORRIDOR Z: 24m
      </div>
      <div className="absolute bottom-6 left-6 text-[#10B981]/60 text-xs font-mono tracking-wider pointer-events-none flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping" />
        AUDIO SYSTEM ENGAGED
      </div>
      <div className="absolute bottom-6 right-6 text-[#D4AF37]/50 text-xs font-serif pointer-events-none hidden sm:block">
        &ldquo;DRACO DORMIENS NUNQUAM TITILLANDUS&rdquo;
      </div>

      {/* Main Center Monolith Modal */}
      <div className="relative z-10 max-w-xl w-full mx-4 px-6 py-10 sm:px-12 sm:py-14 text-center rounded-2xl bg-[#0B0F0D]/95 border border-[#D4AF37]/40 shadow-2xl shadow-[#10B981]/10">
        {/* Crest Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#064E3B]/40 border border-[#10B981]/40 text-[11px] text-[#6EE7B7] uppercase tracking-[0.25em] font-mono mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#34D399]" />
          A Forbidden Entrance
        </div>

        {/* Grand Title */}
        <h1 className="text-4xl sm:text-6xl font-serif tracking-[0.18em] text-[#F3F4F6] font-normal leading-tight drop-shadow-[0_0_25px_rgba(52,211,153,0.35)]">
          HOGWARTS
        </h1>

        {/* Subtitle */}
        <p className="mt-3 text-sm sm:text-base text-[#9CA3AF] font-serif tracking-widest uppercase">
          AYAN PAL // SYSTEMS & AI ARCHITECT
        </p>

        <p className="mt-4 text-xs sm:text-sm text-[#A7F3D0]/80 font-mono max-w-md mx-auto leading-relaxed">
          The enchanted castle gates await your command. Step inside to explore enterprise agentic architectures, distributed pipelines, and verified production systems.
        </p>

        {/* Primary Enter Button */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          <button
            onClick={enterCastle}
            onMouseEnter={() => {
              setIsHovered(true);
              soundEngine.playHover();
            }}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative px-8 py-3.5 rounded-xl font-serif text-sm tracking-[0.2em] font-bold text-[#E6D5AC] hover:text-[#FFFDF0] uppercase transition-all duration-300 border border-[#D4AF37]/60 hover:border-[#F5D77F] bg-gradient-to-r from-[#172520] via-[#0F1E19] to-[#172520] hover:from-[#1E3A2F] hover:to-[#1E3A2F] shadow-lg shadow-black/80 hover:shadow-[#10B981]/30 cursor-pointer overflow-hidden transform hover:scale-[1.03]"
          >
            {/* Shimmer sweep effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <div className="flex items-center gap-3 relative z-10">
              <Shield className="w-4 h-4 text-[#F5D77F] group-hover:rotate-12 transition-transform" />
              <span>ENTER THE CASTLE</span>
              <ChevronRight className="w-4 h-4 text-[#F5D77F] group-hover:translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Secondary Quick Entry */}
          <button
            onClick={skipEntrance}
            className="text-xs text-[#9CA3AF] hover:text-[#FDE047] font-mono tracking-wider transition-colors pt-2 underline underline-offset-4 decoration-white/20 hover:decoration-[#FDE047] cursor-pointer"
          >
            Skip Intro & Go Directly to Grand Hall
          </button>
        </div>

        {/* Audio note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-[#6B7280] font-mono">
          <Volume2 className="w-3.5 h-3.5 text-[#34D399]" />
          <span>Interactive spatial sound generated purely via Web Audio API</span>
        </div>
      </div>
    </div>
  );
};
