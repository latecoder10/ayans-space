import React from 'react';
import { X, Compass, MapPin, Sparkles } from 'lucide-react';
import { useScene } from '../../../context/SceneContext';
import { SECTOR_BAYS } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';

export const QuickTravelDrawer: React.FC = () => {
  const { isQuickTravelOpen, toggleQuickTravel, warpToSector, activeSector } = useScene();

  if (!isQuickTravelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md select-none">
      <div className="w-full max-w-xl bg-[#140F0A] border-2 border-[#D4AF37]/60 rounded-xl shadow-2xl shadow-amber-950/50 p-6 relative animate-in fade-in zoom-in-95 duration-200 text-[#E6D5AC]">
        {/* Subtle aged parchment background texture */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-black/40 rounded-xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30 relative z-10">
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-[#F5D77F]" />
            <div>
              <h2 className="text-base font-bold tracking-widest font-serif text-[#FDE047]">
                THE MARAUDER&apos;S MAP // CASTLE INDEX
              </h2>
              <p className="text-[11px] text-[#C4B087] font-mono">
                &ldquo;I solemnly swear that I am up to no good&rdquo; · Instant Chamber Warp
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playHover();
              toggleQuickTravel();
            }}
            className="p-1.5 rounded-lg hover:bg-[#D4AF37]/20 text-[#C4B087] hover:text-[#FDE047] transition-colors cursor-pointer border border-[#D4AF37]/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sector Grid */}
        <div className="grid gap-2.5 mt-5 relative z-10 max-h-[60vh] overflow-y-auto pr-1">
          {SECTOR_BAYS.map((bay) => {
            const isCurrent = activeSector.id === bay.id;
            return (
              <button
                key={bay.id}
                onClick={() => {
                  soundEngine.playAlohomora();
                  warpToSector(bay.id);
                }}
                className={`flex items-center justify-between p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#D4AF37]/20 border-[#F5D77F] text-[#FFFDF0] shadow-md shadow-amber-900/30 ring-1 ring-[#D4AF37]/50'
                    : 'bg-[#1C1610]/80 border-[#D4AF37]/20 hover:bg-[#2A2016] text-[#D8C7A0] hover:text-[#FDE047] hover:border-[#D4AF37]/50'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className="text-xs font-serif font-bold px-2.5 py-1 rounded border border-[#D4AF37]/30"
                    style={{ backgroundColor: `${bay.doorColor}25`, color: bay.doorColor }}
                  >
                    {bay.code}
                  </span>
                  <div>
                    <div className="text-sm font-semibold font-serif tracking-wide text-[#FDFBF7] flex items-center gap-2">
                      {bay.title}
                      {isCurrent && <Sparkles className="w-3.5 h-3.5 text-[#FDE047] animate-pulse" />}
                    </div>
                    <div className="text-[11px] text-[#A89874] font-mono mt-0.5">{bay.subtitle}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 font-mono text-[11px] text-[#C4B087]">
                  <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>{bay.doorZ}m</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-5 pt-3.5 border-t border-[#D4AF37]/30 flex items-center justify-between text-[11px] text-[#A89874] font-mono relative z-10">
          <span>CLICK ANY CHAMBER TO GLIDE CAMERA</span>
          <span>PRESS [ ESC ] TO CLOSE MAP</span>
        </div>
      </div>
    </div>
  );
};
