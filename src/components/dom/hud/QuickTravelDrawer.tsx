import React from 'react';
import { X, Navigation } from 'lucide-react';
import { useScene } from '../../../context/SceneContext';
import { SECTOR_BAYS } from '../../../types/spatial';

export const QuickTravelDrawer: React.FC = () => {
  const { isQuickTravelOpen, toggleQuickTravel, warpToSector, activeSector } = useScene();

  if (!isQuickTravelOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
      <div className="w-full max-w-lg bg-[#0A0F1D] border border-[#1E293B] rounded-xl shadow-2xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1E293B]">
          <div className="flex items-center gap-2">
            <Navigation className="w-5 h-5 text-[#00F2FE]" />
            <h2 className="text-sm font-bold tracking-wider font-mono text-[#F8FAFC]">
              FACILITY DIRECT WARP // SECTOR INDEX
            </h2>
          </div>
          <button
            onClick={toggleQuickTravel}
            className="p-1.5 rounded-lg hover:bg-[#1E293B] text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sector Grid */}
        <div className="grid gap-2.5 mt-4">
          {SECTOR_BAYS.map((bay) => {
            const isCurrent = activeSector.id === bay.id;
            return (
              <button
                key={bay.id}
                onClick={() => warpToSector(bay.id)}
                className={`flex items-center justify-between p-3 rounded-lg border text-left transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-[#00F2FE]/10 border-[#00F2FE]/50 text-[#F8FAFC]'
                    : 'bg-[#0E1526]/60 border-[#1E293B] hover:bg-[#1E293B]/60 text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                    style={{ backgroundColor: `${bay.doorColor}20`, color: bay.doorColor }}
                  >
                    {bay.code}
                  </span>
                  <div>
                    <div className="text-xs font-medium font-sans">{bay.title}</div>
                    <div className="text-[10px] text-[#64748B] font-mono">{bay.subtitle}</div>
                  </div>
                </div>

                <div className="text-[10px] font-mono text-[#64748B]">
                  {bay.doorZ}m
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-4 pt-3 border-t border-[#1E293B] flex items-center justify-between text-[11px] text-[#64748B] font-mono">
          <span>SELECT TO INSTANTLY WARP CAMERA</span>
          <span>PRESS [ ESC ] TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
