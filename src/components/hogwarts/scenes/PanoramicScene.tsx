import React from 'react';
import { PanoramicCastleScenery } from '../scenery/PanoramicCastleScenery';
import { FloatingParchmentCard } from '../FloatingParchmentCard';
import { HOGWARTS_PAINTINGS, HogwartsPainting } from '../HogwartsPaintingsData';
import { soundEngine } from '../../../utils/synthesizer';
import { Castle, Sparkles } from 'lucide-react';

interface PanoramicSceneProps {
  onSelectPainting: (painting: HogwartsPainting) => void;
  onEnterCourtyard: () => void;
}

export const PanoramicScene: React.FC<PanoramicSceneProps> = ({
  onSelectPainting,
  onEnterCourtyard,
}) => {
  // 3 Featured Works for Panoramic View (Image 1)
  const featuredPaintings = HOGWARTS_PAINTINGS.filter((p) => p.featuredInPanorama).slice(0, 3);

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden flex flex-col justify-between">
      {/* 1. High Definition Panoramic Castle Scenery (Image 1) */}
      <PanoramicCastleScenery />

      {/* 2. Main Center-Stage: Floating 3D Golden Cards hovering over cobblestones (Image 1) */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center pt-24 pb-16 px-4 max-w-7xl mx-auto w-full">
        {/* Subtle Title Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/40 border border-[#D4AF37]/50 backdrop-blur-md mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
            <span className="font-serif text-[11px] text-[#FFE8A3] tracking-widest uppercase">
              Citadel Viaduct · Spatial Portfolio
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-gold-gradient tracking-wide drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
            Ayan Pal
          </h1>
          <p className="font-serif text-xs sm:text-sm text-[#E2E8F0]/90 tracking-wider mt-1 drop-shadow">
            Java Full Stack Architect · AI Product Engineering · Claude Certified
          </p>
        </div>

        {/* The 3 Floating 3D Cards (Image 1 Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-5xl justify-items-center items-center">
          {featuredPaintings.map((painting, index) => (
            <FloatingParchmentCard
              key={painting.id}
              painting={painting}
              index={index}
              onClick={onSelectPainting}
            />
          ))}
        </div>

        {/* Portal Button to Courtyard Gallery (Image 2) */}
        <div className="mt-8">
          <button
            onClick={() => {
              soundEngine.playAlohomora();
              onEnterCourtyard();
            }}
            className="group flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-[#D4AF37] bg-gradient-to-r from-[#3A2415]/90 via-[#26180E]/90 to-[#3A2415]/90 backdrop-blur-md text-[#FFF6D6] hover:text-[#FDE047] hover:border-[#FDE047] font-serif text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] cursor-pointer"
          >
            <Castle className="w-4 h-4 text-[#FDE047] group-hover:scale-110 transition-transform" />
            <span>Enter Hogwarts Courtyard Gallery</span>
            <span className="text-[#F5CE62] group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      {/* 3. Bottom Ambient Info Bar */}
      <footer className="relative z-20 px-6 py-3 flex items-center justify-between text-[#CBD5E1]/70 font-mono text-[10px] bg-black/40 backdrop-blur-sm border-t border-[#8E6827]/30">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
          <span>Hogwarts Citadel Server Online · 60 FPS</span>
        </span>
        <span className="hidden sm:inline font-serif text-[#D4AF37]">
          Move cursor to guide the Lumos wand · Click to unseal archives
        </span>
      </footer>
    </div>
  );
};
