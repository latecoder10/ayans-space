import React, { useState } from 'react';
import { CourtyardScenery } from '../scenery/CourtyardScenery';
import { FramedPainting } from '../FramedPainting';
import { HOGWARTS_PAINTINGS, HogwartsPainting } from '../HogwartsPaintingsData';
import { soundEngine } from '../../../utils/synthesizer';
import { Compass, Sparkles, Filter } from 'lucide-react';

interface CourtyardSceneProps {
  onSelectPainting: (painting: HogwartsPainting) => void;
  onGoHome: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
}

export const CourtyardScene: React.FC<CourtyardSceneProps> = ({
  onSelectPainting,
  onGoHome,
  onOpenAbout,
  onOpenContact,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [activeNavPill, setActiveNavPill] = useState<'portfolio' | 'about' | 'experience' | 'contact'>('portfolio');

  const categories = [
    { id: 'ALL', label: 'All Chambers' },
    { id: 'AI_SYSTEMS', label: 'AI & LLM Orchestration' },
    { id: 'DISTRIBUTED_PIPELINES', label: 'Distributed Multi-Cloud' },
    { id: 'ENTERPRISE_SAAS', label: 'Enterprise SaaS' },
    { id: 'FULL_STACK', label: 'Full Stack & Graphics' },
  ];

  const filteredPaintings = activeCategory === 'ALL'
    ? HOGWARTS_PAINTINGS
    : HOGWARTS_PAINTINGS.filter((p) => p.category === activeCategory);

  const handlePillClick = (tab: 'home' | 'portfolio' | 'about' | 'experience' | 'contact') => {
    soundEngine.playClick(920);
    if (tab === 'home') {
      onGoHome();
    } else if (tab === 'portfolio') {
      setActiveNavPill('portfolio');
    } else if (tab === 'about') {
      setActiveNavPill('about');
      onOpenAbout();
    } else if (tab === 'experience') {
      setActiveNavPill('experience');
      onOpenAbout();
    } else if (tab === 'contact') {
      setActiveNavPill('contact');
      onOpenContact();
    }
  };

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden flex flex-col justify-between">
      {/* 1. High Definition Courtyard Scenery (Image 2) */}
      <CourtyardScenery />

      {/* 2. Centerpiece: The Grand Frosted Glass Slate Board (Image 2) */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-3 sm:px-6 max-w-7xl mx-auto w-full">
        <div className="hogwarts-board corner-bracket-gold w-full max-w-6xl p-4 sm:p-6 lg:p-7 flex flex-col gap-5">
          {/* TOP EMBOSSED GOLDEN CREST & TITLE (Image 2) */}
          <div className="flex flex-col items-center text-center relative border-b border-[#D4AF37]/30 pb-4">
            {/* Embossed Hogwarts Crest Medallion */}
            <div className="relative mb-2">
              <div className="w-14 h-14 rounded-full bg-gradient-to-b from-[#4A3319] to-[#1F140A] border-2 border-[#D4AF37] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                <span className="font-serif text-2xl font-bold text-gold-gradient select-none">H</span>
              </div>
              <div className="absolute -inset-1 rounded-full border border-[#F5CE62]/40 animate-pulse pointer-events-none" />
            </div>

            {/* Board Title in High-Contrast Gold Typography (Image 2) */}
            <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gold-gradient tracking-wider drop-shadow-md">
              HOGWARTS PORTFOLIO
            </h1>

            {/* Subtitle matching Image 2 */}
            <p className="font-serif text-xs sm:text-sm text-[#F1DEC0] tracking-widest uppercase mt-1">
              3D environments, interactive storytelling · Distributed AI Systems
            </p>
          </div>

          {/* MAIN WORKSPACE: LEFT PILL BUTTONS + 8 FRAMED PICTURES GRID (Image 2) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* LEFT PILL BUTTONS COLUMN (Image 2) */}
            <div className="md:col-span-3 lg:col-span-2 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
              <button
                onClick={() => handlePillClick('home')}
                className="font-serif text-xs font-semibold px-4 py-2 rounded-full border border-[#8E6827]/60 bg-black/40 text-[#CBD5E1] hover:text-[#FDE047] hover:border-[#FDE047] transition-all cursor-pointer whitespace-nowrap text-left flex items-center gap-2"
              >
                <Compass className="w-3.5 h-3.5 text-[#F5CE62]" />
                <span>Home</span>
              </button>

              <button
                onClick={() => handlePillClick('portfolio')}
                className={`font-serif text-xs font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer whitespace-nowrap text-left flex items-center gap-2 ${
                  activeNavPill === 'portfolio'
                    ? 'border-[#D4AF37] bg-[#3A2415]/90 text-[#FDE047] shadow-[0_0_15px_rgba(212,175,55,0.3)] font-bold'
                    : 'border-[#8E6827]/60 bg-black/40 text-[#CBD5E1] hover:text-[#FDE047]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FDE047]" />
                <span>Portfolio</span>
              </button>

              <button
                onClick={() => handlePillClick('about')}
                className="font-serif text-xs font-semibold px-4 py-2 rounded-full border border-[#8E6827]/60 bg-black/40 text-[#CBD5E1] hover:text-[#FDE047] hover:border-[#FDE047] transition-all cursor-pointer whitespace-nowrap text-left"
              >
                About
              </button>

              <button
                onClick={() => handlePillClick('experience')}
                className="font-serif text-xs font-semibold px-4 py-2 rounded-full border border-[#8E6827]/60 bg-black/40 text-[#CBD5E1] hover:text-[#FDE047] hover:border-[#FDE047] transition-all cursor-pointer whitespace-nowrap text-left"
              >
                Experience
              </button>

              <button
                onClick={() => handlePillClick('contact')}
                className="font-serif text-xs font-semibold px-4 py-2 rounded-full border border-[#8E6827]/60 bg-black/40 text-[#CBD5E1] hover:text-[#FDE047] hover:border-[#FDE047] transition-all cursor-pointer whitespace-nowrap text-left"
              >
                Contact
              </button>

              {/* Verified Badge */}
              <div className="hidden md:block mt-4 p-3 rounded bg-black/50 border border-[#D4AF37]/30 text-center">
                <span className="font-mono text-[9px] text-[#34D399] uppercase tracking-wider block font-bold">
                  ● ANTHROPIC VERIFIED
                </span>
                <span className="font-serif text-[10px] text-[#CBD5E1] mt-0.5 block">
                  Claude Certified Architect
                </span>
              </div>
            </div>

            {/* MAIN GALLERY: 2x4 GRID OF 8 FRAMED PAINTINGS (Image 2) */}
            <div className="md:col-span-9 lg:col-span-10 flex flex-col gap-4">
              {/* Category Filter Chips */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                <Filter className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      soundEngine.playClick(850);
                      setActiveCategory(cat.id);
                    }}
                    className={`font-serif text-[10px] sm:text-[11px] px-2.5 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'border-[#FDE047] bg-[#4A3319] text-[#FDE047] font-bold shadow-sm'
                        : 'border-[#8E6827]/50 bg-black/30 text-[#CBD5E1] hover:text-[#FFF] hover:border-[#D4AF37]'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* 2x4 Grid (8 Paintings) */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {filteredPaintings.map((painting) => (
                  <FramedPainting
                    key={painting.id}
                    painting={painting}
                    onClick={onSelectPainting}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Bottom Ambient Info Bar */}
      <footer className="relative z-20 px-6 py-2.5 flex items-center justify-between text-[#CBD5E1]/70 font-mono text-[10px] bg-black/40 backdrop-blur-sm border-t border-[#8E6827]/30">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
          <span>Hogwarts Cloister Portal Active</span>
        </span>
        <span className="font-serif text-[#D4AF37]">
          Click any framed painting to inspect detailed technical grimoire
        </span>
      </footer>
    </div>
  );
};
