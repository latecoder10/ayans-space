import React from 'react';
import { Sparkles, Volume2, VolumeX, FileText, Compass, Castle } from 'lucide-react';
import { soundEngine } from '../../utils/synthesizer';

interface HogwartsHeaderProps {
  currentView: 'panoramic' | 'courtyard';
  onSelectView: (view: 'panoramic' | 'courtyard') => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  wandActive: boolean;
  onToggleWand: () => void;
  audioEnabled: boolean;
  onToggleAudio: () => void;
}

export const HogwartsHeader: React.FC<HogwartsHeaderProps> = ({
  currentView,
  onSelectView,
  onOpenAbout,
  onOpenContact,
  wandActive,
  onToggleWand,
  audioEnabled,
  onToggleAudio,
}) => {
  const handleNavClick = (action: () => void) => {
    soundEngine.playClick(950);
    action();
  };

  return (
    <header className="fixed top-4 left-0 right-0 z-40 px-3 sm:px-8 max-w-6xl mx-auto pointer-events-auto">
      {/* Ornate Carved Wooden & Gold Top Bar (Image 1) */}
      <div className="hogwarts-top-bar flex items-center justify-between px-3 sm:px-6 py-2.5">
        {/* LEFT NAVIGATION LINKS (Image 1: Home, Work, About, Contact) */}
        <nav className="flex items-center gap-1 sm:gap-4">
          <button
            onClick={() => handleNavClick(() => onSelectView('panoramic'))}
            className={`font-serif text-xs sm:text-sm tracking-wider uppercase px-2.5 py-1 rounded transition-all duration-200 cursor-pointer ${
              currentView === 'panoramic'
                ? 'text-[#FDE047] font-bold bg-[#3A2415]/70 border border-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                : 'text-[#E2E8F0]/80 hover:text-[#FDE047] hover:bg-black/30'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => handleNavClick(() => onSelectView('courtyard'))}
            className={`font-serif text-xs sm:text-sm tracking-wider uppercase px-2.5 py-1 rounded transition-all duration-200 cursor-pointer ${
              currentView === 'courtyard'
                ? 'text-[#FDE047] font-bold bg-[#3A2415]/70 border border-[#D4AF37]/50 shadow-[0_0_12px_rgba(212,175,55,0.25)]'
                : 'text-[#E2E8F0]/80 hover:text-[#FDE047] hover:bg-black/30'
            }`}
          >
            Work
          </button>

          <button
            onClick={() => handleNavClick(onOpenAbout)}
            className="font-serif text-xs sm:text-sm tracking-wider uppercase px-2.5 py-1 rounded text-[#E2E8F0]/80 hover:text-[#FDE047] hover:bg-black/30 transition-all duration-200 cursor-pointer"
          >
            About
          </button>

          <button
            onClick={() => handleNavClick(onOpenContact)}
            className="font-serif text-xs sm:text-sm tracking-wider uppercase px-2.5 py-1 rounded text-[#E2E8F0]/80 hover:text-[#FDE047] hover:bg-black/30 transition-all duration-200 cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* CENTER ORNATE CARTOUCHE (Image 1: Diamond with ✦ PORTFOLIO ✦) */}
        <div className="flex items-center justify-center">
          <div className="relative flex items-center gap-2 px-3 sm:px-5 py-1">
            {/* Left Gold Filigree Flourish */}
            <span className="hidden sm:inline text-[#D4AF37]/70 text-xs">«✦»</span>

            {/* Central Diamond Title Plaque */}
            <div className="flex flex-col items-center">
              <span className="font-display text-xs sm:text-base tracking-[0.2em] font-bold text-gold-gradient drop-shadow-md">
                ✦ PORTFOLIO ✦
              </span>
              <span className="font-serif text-[9px] sm:text-[10px] text-[#D4AF37]/90 tracking-widest hidden md:inline">
                AYAN PAL · ARCHITECT
              </span>
            </div>

            {/* Right Gold Filigree Flourish */}
            <span className="hidden sm:inline text-[#D4AF37]/70 text-xs">«✦»</span>
          </div>
        </div>

        {/* RIGHT CONTROLS (Image 1: Sliders, Sparkles, Audio, Resume) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Quick View Switcher Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick(1100);
              onSelectView(currentView === 'panoramic' ? 'courtyard' : 'panoramic');
            }}
            title={currentView === 'panoramic' ? 'Switch to Courtyard Portal' : 'Switch to Panoramic Citadel'}
            className="p-1.5 sm:p-2 rounded border border-[#8E6827]/60 bg-black/40 text-[#F5CE62] hover:text-[#FFF] hover:border-[#F5CE62] transition-colors cursor-pointer flex items-center gap-1"
          >
            {currentView === 'panoramic' ? (
              <>
                <Castle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FDE047]" />
                <span className="font-serif text-[10px] hidden lg:inline text-[#F5CE62]">Courtyard</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FDE047]" />
                <span className="font-serif text-[10px] hidden lg:inline text-[#F5CE62]">Citadel</span>
              </>
            )}
          </button>

          {/* Lumos Wand Particles Toggle */}
          <button
            onClick={() => {
              soundEngine.playLumos();
              onToggleWand();
            }}
            title={wandActive ? 'Lumos Active (Click to extinguish wand)' : 'Nox Active (Click to cast Lumos)'}
            className={`p-1.5 sm:p-2 rounded border transition-colors cursor-pointer ${
              wandActive
                ? 'border-[#FDE047] bg-[#D4AF37]/20 text-[#FDE047] shadow-[0_0_10px_rgba(253,224,71,0.35)]'
                : 'border-[#8E6827]/60 bg-black/40 text-[#94A3B8] hover:text-[#F5CE62]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={() => {
              onToggleAudio();
              if (!audioEnabled) soundEngine.playSpellCast();
            }}
            title={audioEnabled ? 'Mute spell acoustics' : 'Unmute spell acoustics'}
            className={`p-1.5 sm:p-2 rounded border transition-colors cursor-pointer ${
              audioEnabled
                ? 'border-[#8E6827]/60 bg-black/40 text-[#F5CE62] hover:text-[#FFF]'
                : 'border-red-900/60 bg-red-950/40 text-red-400'
            }`}
          >
            {audioEnabled ? (
              <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>

          {/* Resume PDF Download */}
          <a
            href="/my resume.pdf"
            download="Ayan_Pal_Resume.pdf"
            onClick={() => soundEngine.playParchment()}
            title="Download Ayan Pal's Verified Resume PDF"
            className="flex items-center gap-1 px-2 py-1.5 rounded border border-[#D4AF37]/80 bg-gradient-to-b from-[#3A2415] to-[#1F130B] text-[#FFF6D6] hover:text-[#FDE047] hover:border-[#FDE047] text-[11px] font-serif font-bold transition-all shadow-[0_2px_8px_rgba(0,0,0,0.6)] cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-[#F5CE62]" />
            <span className="hidden md:inline">Resume</span>
          </a>
        </div>
      </div>
    </header>
  );
};
