import React from 'react';
import { Volume2, VolumeX, Compass, MapPin, ArrowLeft } from 'lucide-react';
import { useScene } from '../../../context/SceneContext';
import { SECTOR_BAYS } from '../../../types/spatial';

export const TelemetryHUD: React.FC = () => {
  const {
    mode,
    cameraZ,
    activeSector,
    currentRoomId,
    exitRoom,
    toggleQuickTravel,
    toggleAudio,
    isAudioMuted,
  } = useScene();

  const isRoomMode = mode === 'room' || (mode === 'transitioning' && !!currentRoomId);
  const currentRoom = SECTOR_BAYS.find((b) => b.id === currentRoomId) || activeSector;

  return (
    <>
      {/* 1. TOP HEADER BAR */}
      <header className="fixed top-0 left-0 right-0 p-3 sm:p-6 z-30 pointer-events-none flex items-center justify-between gap-2 select-none font-mono">
        {/* Left: Engineering ID */}
        <div className="flex items-center gap-2 sm:gap-3 bg-[#070D18]/90 backdrop-blur-md px-2.5 sm:px-3.5 py-1.5 rounded border border-[#1E293B] shrink-0">
          <span className="w-2 h-2 rounded-full bg-[#00F2FE] animate-pulse" />
          <span className="text-[11px] sm:text-xs tracking-widest text-[#F8FAFC] font-semibold">
            AYAN PAL
          </span>
          <span className="text-[10px] text-[#64748B] hidden lg:inline">
            // SYSTEMS & AI ARCHITECT
          </span>
        </div>

        {/* Center: Sector Identifier Badge (Desktop / Tablet) */}
        <div className="hidden sm:flex items-center gap-2 bg-[#070D18]/90 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-[#1E293B] truncate">
          <MapPin className="w-3.5 h-3.5 text-[#00F2FE] shrink-0" />
          <span
            className="text-xs font-bold tracking-wider truncate"
            style={{ color: currentRoom.doorColor }}
          >
            {isRoomMode ? `INSIDE: ${currentRoom.title.toUpperCase()}` : currentRoom.code}
          </span>
          {!isRoomMode && (
            <span className="text-[11px] text-[#94A3B8] hidden md:inline truncate">
              | {currentRoom.title}
            </span>
          )}
        </div>

        {/* Right: Controls (Sectors Warp & Audio) */}
        <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
          <button
            onClick={toggleQuickTravel}
            className="flex items-center gap-1.5 text-xs bg-[#0F172A]/90 hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#00F2FE] p-1.5 sm:px-3 sm:py-1.5 rounded border border-[#334155] transition-colors cursor-pointer"
            title="Open Sector Index (Cmd+K)"
          >
            <Compass className="w-4 h-4 text-[#00F2FE]" />
            <span className="hidden sm:inline">SECTORS</span>
            <kbd className="text-[9px] bg-[#1E293B] px-1 py-0.5 rounded text-[#64748B] hidden sm:inline">⌘K</kbd>
          </button>

          <button
            onClick={toggleAudio}
            className="p-1.5 rounded bg-[#0F172A]/90 hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#00F2FE] border border-[#334155] transition-colors cursor-pointer"
            title={isAudioMuted ? "Unmute Interface Sound" : "Mute Interface Sound"}
          >
            {isAudioMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00F2FE]" />}
          </button>
        </div>
      </header>

      {/* 2. ROOM EXIT BUTTON (Prominently displayed when inside a room) */}
      {isRoomMode && (
        <div className="fixed bottom-16 sm:bottom-20 left-0 right-0 flex justify-center pointer-events-auto z-30">
          <button
            onClick={exitRoom}
            className="flex items-center gap-2 bg-[#0284C7]/90 hover:bg-[#0284C7] text-white px-5 py-2.5 rounded-full font-sans font-medium text-sm shadow-lg shadow-[#0284C7]/30 border border-[#38BDF8] transition-all transform hover:scale-105 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN TO CORRIDOR</span>
            <span className="text-xs bg-white/20 px-1.5 py-0.5 rounded ml-1 font-mono">ESC</span>
          </button>
        </div>
      )}

      {/* 3. BOTTOM TELEMETRY FOOTER */}
      <footer className="fixed bottom-0 left-0 right-0 p-3 sm:p-6 z-30 pointer-events-none flex items-end justify-between gap-2 select-none font-mono text-[11px] text-[#64748B]">
        {/* Left: Real-time Coordinate Telemetry */}
        <div className="bg-[#070D18]/80 backdrop-blur-md px-3 py-1 rounded border border-[#1E293B]">
          <span>POS_Z: </span>
          <span className="text-[#00F2FE] font-bold">{cameraZ.toFixed(2)}m</span>
          <span className="mx-2 text-[#334155]">|</span>
          <span>SECTOR: </span>
          <span className="text-[#F8FAFC]">{currentRoom.code}</span>
        </div>

        {/* Right: Interaction Guide */}
        <div className="hidden md:flex items-center gap-2 bg-[#070D18]/80 backdrop-blur-md px-3 py-1 rounded border border-[#1E293B]">
          <span>FREE ROAM: </span>
          <span className="text-[#00F2FE]">[ 🖱️ DRAG / SWIPE TO LOOK • WASD / SCROLL TO WALK ]</span>
          <span className="mx-1 text-[#334155]">|</span>
          <span>INTERACT: </span>
          <span className="text-[#94A3B8]">[ CLICK DOORS & CONSOLES ]</span>
        </div>
      </footer>
    </>
  );
};
