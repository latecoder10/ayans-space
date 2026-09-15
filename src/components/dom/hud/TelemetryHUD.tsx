import React from 'react';
import { Volume2, VolumeX, Compass, MapPin, ArrowLeft, Wand2, FileText, Send, User, ChevronUp, ChevronDown } from 'lucide-react';
import { useScene } from '../../../context/SceneContext';
import { SECTOR_BAYS } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';

interface TelemetryHUDProps {
  onOpenAbout?: () => void;
  onOpenContact?: () => void;
  lumosActive?: boolean;
  onToggleLumos?: () => void;
}

export const TelemetryHUD: React.FC<TelemetryHUDProps> = ({
  onOpenAbout,
  onOpenContact,
  lumosActive = true,
  onToggleLumos,
}) => {
  const {
    mode,
    cameraZ,
    activeSector,
    currentRoomId,
    exitRoom,
    toggleQuickTravel,
    toggleAudio,
    isAudioMuted,
    setTargetZ,
    enterRoom,
  } = useScene();

  const isRoomMode = mode === 'room' || (mode === 'transitioning' && !!currentRoomId);
  const currentRoom = SECTOR_BAYS.find((b) => b.id === currentRoomId) || activeSector;

  const handleDownloadResume = () => {
    soundEngine.playAlohomora();
    const link = document.createElement('a');
    link.href = '/my resume.pdf';
    link.download = 'Ayan_Pal_Resume.pdf';
    link.click();
  };

  return (
    <>
      {/* 1. TOP HOGWARTS NAVIGATION HEADER */}
      <header className="fixed top-0 left-0 right-0 p-3 sm:p-5 z-30 pointer-events-none flex items-center justify-between gap-2 select-none font-serif">
        {/* Left: Wizard Engineer Crest */}
        <div className="flex items-center gap-2.5 sm:gap-3 bg-[#120D08]/90 backdrop-blur-md px-3 sm:px-4 py-2 rounded-lg border border-[#D4AF37]/40 shadow-lg shadow-black/60 shrink-0 pointer-events-auto">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5D77F] animate-pulse shadow-sm shadow-[#F5D77F]" />
          <div>
            <div className="text-[12px] sm:text-xs tracking-wider text-[#FFFDF0] font-bold">
              AYAN PAL
            </div>
            <div className="text-[9px] sm:text-[10px] text-[#D4AF37] font-mono leading-none">
              SYSTEMS & AI ARCHITECT
            </div>
          </div>
        </div>

        {/* Center: Chamber Location Badge */}
        <div className="hidden md:flex items-center gap-2.5 bg-[#120D08]/90 backdrop-blur-md px-4 py-2 rounded-full border border-[#D4AF37]/40 shadow-lg shadow-black/60 truncate">
          <MapPin className="w-4 h-4 text-[#F5D77F] shrink-0" />
          <span
            className="text-xs font-bold tracking-wider uppercase font-serif"
            style={{ color: currentRoom.doorColor }}
          >
            {isRoomMode ? `INSIDE: ${currentRoom.title}` : `CORRIDOR // ${currentRoom.code}`}
          </span>
          {!isRoomMode && (
            <span className="text-[11px] text-[#C4B087] hidden lg:inline">
              | {currentRoom.title}
            </span>
          )}
        </div>

        {/* Right: Spell & Navigation Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0 font-sans">
          {/* Marauder's Map Warp */}
          <button
            onClick={() => {
              soundEngine.playHover();
              toggleQuickTravel();
            }}
            className="flex items-center gap-1.5 text-xs bg-[#1A140E]/90 hover:bg-[#2A2016] text-[#E6D5AC] hover:text-[#FDE047] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-md cursor-pointer"
            title="Open Marauder's Map / Sector Index (Cmd+K)"
          >
            <Compass className="w-4 h-4 text-[#F5D77F]" />
            <span className="hidden sm:inline font-serif font-medium">MAP</span>
            <kbd className="text-[9px] bg-[#2A2016] px-1 py-0.5 rounded text-[#C4B087] font-mono hidden sm:inline">⌘K</kbd>
          </button>

          {/* About Modal */}
          {onOpenAbout && (
            <button
              onClick={() => {
                soundEngine.playAlohomora();
                onOpenAbout();
              }}
              className="flex items-center gap-1 text-xs bg-[#1A140E]/90 hover:bg-[#2A2016] text-[#E6D5AC] hover:text-[#FDE047] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-md cursor-pointer"
              title="About Ayan Pal"
            >
              <User className="w-3.5 h-3.5 text-[#F5D77F]" />
              <span className="hidden md:inline font-serif font-medium">ABOUT</span>
            </button>
          )}

          {/* Owl Post Contact Modal */}
          {onOpenContact && (
            <button
              onClick={() => {
                soundEngine.playAlohomora();
                onOpenContact();
              }}
              className="flex items-center gap-1 text-xs bg-[#1A140E]/90 hover:bg-[#2A2016] text-[#E6D5AC] hover:text-[#FDE047] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-md cursor-pointer"
              title="Dispatch Owl (Contact)"
            >
              <Send className="w-3.5 h-3.5 text-[#F5D77F]" />
              <span className="hidden md:inline font-serif font-medium">OWL POST</span>
            </button>
          )}

          {/* Resume PDF */}
          <button
            onClick={handleDownloadResume}
            className="flex items-center gap-1 text-xs bg-[#1A140E]/90 hover:bg-[#2A2016] text-[#E6D5AC] hover:text-[#FDE047] px-2.5 sm:px-3 py-1.5 rounded-lg border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all shadow-md cursor-pointer"
            title="Download Official Resume PDF"
          >
            <FileText className="w-3.5 h-3.5 text-[#F5D77F]" />
            <span className="hidden lg:inline font-serif font-medium">RESUME</span>
          </button>

          {/* Lumos Wand Trail Toggle */}
          {onToggleLumos && (
            <button
              onClick={() => {
                soundEngine.playHover();
                onToggleLumos();
              }}
              className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                lumosActive
                  ? 'bg-[#D4AF37]/20 border-[#F5D77F] text-[#FDE047]'
                  : 'bg-[#1A140E]/90 border-[#D4AF37]/30 text-[#8E7E63] hover:text-[#E6D5AC]'
              }`}
              title={lumosActive ? 'Extinguish Lumos Cursor' : 'Ignite Lumos Wand Cursor'}
            >
              <Wand2 className="w-4 h-4" />
            </button>
          )}

          {/* Spell Audio Toggle */}
          <button
            onClick={() => {
              toggleAudio();
            }}
            className="p-1.5 rounded-lg bg-[#1A140E]/90 hover:bg-[#2A2016] text-[#E6D5AC] hover:text-[#FDE047] border border-[#D4AF37]/30 transition-all cursor-pointer"
            title={isAudioMuted ? 'Unmute Spell Effects' : 'Mute Spell Effects'}
          >
            {isAudioMuted ? (
              <VolumeX className="w-4 h-4 text-amber-600" />
            ) : (
              <Volume2 className="w-4 h-4 text-[#F5D77F]" />
            )}
          </button>
        </div>
      </header>

      {/* 2. ROOM EXIT BUTTON (Prominently displayed when inside a chamber) */}
      {isRoomMode && (
        <div className="fixed bottom-16 sm:bottom-20 left-0 right-0 flex justify-center pointer-events-auto z-30 px-4">
          <button
            onClick={() => {
              soundEngine.playAlohomora();
              exitRoom();
            }}
            className="flex items-center gap-2.5 bg-gradient-to-r from-[#2B1D11] via-[#3A2818] to-[#2B1D11] hover:from-[#3D2918] hover:to-[#3D2918] text-[#FDE047] px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-serif font-semibold text-xs sm:text-sm shadow-xl shadow-black/80 border-2 border-[#D4AF37] transition-all transform hover:scale-105 cursor-pointer ring-2 ring-[#D4AF37]/40"
          >
            <ArrowLeft className="w-4 h-4 text-[#FDE047]" />
            <span className="tracking-wide">RETURN TO CASTLE CORRIDOR</span>
            <span className="text-[10px] sm:text-xs bg-[#D4AF37]/20 border border-[#D4AF37]/40 px-2 py-0.5 rounded ml-1 font-mono text-[#FFFDF0]">
              ESC
            </span>
          </button>
        </div>
      )}

      {/* 2.1 MOBILE & LAPTOP SMOOTH WALK CONTROLS (Corridor Mode) */}
      {!isRoomMode && (
        <div className="fixed right-3 sm:right-5 bottom-14 sm:bottom-16 flex flex-col gap-1.5 z-30 pointer-events-auto">
          <button
            onClick={() => {
              soundEngine.playHover();
              setTargetZ((prev) => Math.max(-155, prev - 12));
            }}
            className="flex items-center gap-1 bg-[#1A140E]/90 hover:bg-[#2A2016] text-[#FDE047] border border-[#D4AF37]/40 hover:border-[#D4AF37] px-3 py-2 rounded-lg shadow-lg text-xs font-serif font-bold transition-all cursor-pointer backdrop-blur-md active:scale-95"
            title="Walk Forward Down Hallway (W / ArrowUp)"
          >
            <ChevronUp className="w-4 h-4 text-[#F5D77F]" />
            <span className="hidden sm:inline">FORWARD</span>
          </button>
          <button
            onClick={() => {
              soundEngine.playHover();
              setTargetZ((prev) => Math.min(22, prev + 12));
            }}
            className="flex items-center gap-1 bg-[#1A140E]/90 hover:bg-[#2A2016] text-[#E6D5AC] hover:text-[#FDE047] border border-[#D4AF37]/30 hover:border-[#D4AF37] px-3 py-2 rounded-lg shadow-lg text-xs font-serif font-bold transition-all cursor-pointer backdrop-blur-md active:scale-95"
            title="Walk Backward (S / ArrowDown)"
          >
            <ChevronDown className="w-4 h-4 text-[#F5D77F]" />
            <span className="hidden sm:inline">BACK</span>
          </button>
        </div>
      )}

      {/* 2.2 INSTANT CHAMBER JUMP DOCK (One-touch access for mobile & laptop anywhere) */}
      {!isRoomMode && (
        <div className="fixed bottom-12 sm:bottom-14 left-0 right-0 flex justify-center pointer-events-auto z-25 px-2">
          <div className="flex items-center gap-1 sm:gap-1.5 bg-[#120D08]/90 backdrop-blur-md px-2.5 sm:px-3 py-1.5 rounded-full border border-[#D4AF37]/30 shadow-xl overflow-x-auto max-w-full scrollbar-none">
            <span className="text-[10px] text-[#A89874] font-serif font-semibold pl-1 pr-1 hidden md:inline">WARP:</span>
            {SECTOR_BAYS.map((bay) => (
              <button
                key={`dock-${bay.id}`}
                onClick={() => {
                  soundEngine.playAlohomora();
                  enterRoom(bay.id);
                }}
                className={`text-[10px] sm:text-[11px] font-serif px-2 sm:px-2.5 py-1 rounded-full whitespace-nowrap transition-all cursor-pointer border ${
                  activeSector.id === bay.id
                    ? 'bg-[#D4AF37]/25 text-[#FDE047] border-[#D4AF37] font-bold shadow-sm shadow-[#D4AF37]/30'
                    : 'bg-[#1A140E]/80 text-[#C4B087] hover:text-[#FFFDF0] hover:bg-[#261E16] border-[#D4AF37]/20'
                }`}
                title={`Enter ${bay.title}`}
              >
                {bay.code.replace('SECTOR ', '')} {bay.title.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 3. BOTTOM TELEMETRY FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 p-2 sm:p-4 z-20 pointer-events-none flex items-end justify-between gap-2 select-none font-mono text-[10px] sm:text-[11px] text-[#A89874]">
        {/* Left: Spatial Coordinates */}
        <div className="bg-[#120D08]/85 backdrop-blur-md px-3 py-1 rounded-lg border border-[#D4AF37]/30 shadow-md">
          <span>Z: </span>
          <span className="text-[#FDE047] font-bold">{cameraZ.toFixed(1)}m</span>
          <span className="mx-1.5 text-[#574932]">|</span>
          <span className="text-[#FFFDF0]">{currentRoom.code}</span>
        </div>

        {/* Right: Free Roam Controls Guide */}
        <div className="hidden lg:flex items-center gap-2 bg-[#120D08]/85 backdrop-blur-md px-3.5 py-1 rounded-lg border border-[#D4AF37]/30 shadow-md">
          <span>CONTROLS: </span>
          <span className="text-[#FDE047]">🖱️ Drag to look · W/S or Scroll to walk · Click Doors to Enter</span>
        </div>
      </footer>
    </>
  );
};
