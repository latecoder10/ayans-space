import { X, Keyboard, Compass, Wand2, Sun, Volume2, Shield } from 'lucide-react';
import { soundEngine } from '../../../utils/synthesizer';

interface CheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeyboardCheatsheetModal: React.FC<CheatsheetModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const keyGroups = [
    {
      title: 'Movement & Traversal',
      items: [
        { keys: ['W', 'A', 'S', 'D'], desc: 'Walk forward, back, or strafe through corridor' },
        { keys: ['Shift'], desc: 'Sprint / rapid movement' },
        { keys: ['Click + Drag'], desc: '360° Free look / inspect castle architecture' },
        { keys: ['Trackpad Two-Finger'], desc: 'Smooth pan along corridor length' },
      ],
    },
    {
      title: 'Spells & Magic',
      items: [
        { keys: ['1'], desc: 'Select Lumos (Illumination charm)' },
        { keys: ['2'], desc: 'Select Expecto Patronum (Silver patronus)' },
        { keys: ['3'], desc: 'Select Alohomora (Unlocks dossiers & chambers)' },
        { keys: ['4'], desc: 'Select Wingardium Leviosa (Levitation resonance)' },
        { keys: ['Click Canvas'], desc: 'Cast active spell at target point' },
      ],
    },
    {
      title: 'Navigation & Sanctum',
      items: [
        { keys: ['J', 'or', '⌘K'], desc: 'Open Marauder’s Map & Chamber Directory' },
        { keys: ['T'], desc: 'Cycle Castle Atmosphere (Midnight / Twilight / Dawn)' },
        { keys: ['M'], desc: 'Toggle Audio Synthesizer (Mute / Unmute)' },
        { keys: ['G'], desc: 'Return to Castle Entrance Gates' },
        { keys: ['Esc'], desc: 'Close open modals, dossiers, or exit chamber' },
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none animate-in fade-in">
      <div className="w-full max-w-lg bg-[#140F0A] border-2 border-[#D4AF37]/50 rounded-2xl shadow-2xl p-6 relative text-[#E6D5AC]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30">
          <div className="flex items-center gap-3">
            <Keyboard className="w-5 h-5 text-[#F5D77F]" />
            <div>
              <h2 className="text-base font-serif font-bold text-[#FFFDF0] tracking-wider">
                CASTLE CONTROLS & GRIMOIRE
              </h2>
              <p className="text-[11px] font-mono text-[#A39276]">
                Keyboard shortcuts & spatial interaction guide
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playClick(900);
              onClose();
            }}
            className="p-1.5 rounded-lg hover:bg-[#D4AF37]/20 text-[#C4B087] hover:text-[#FFFDF0] transition-colors cursor-pointer border border-[#D4AF37]/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mt-4 space-y-5 max-h-[60vh] overflow-y-auto pr-1">
          {keyGroups.map((group, gIdx) => (
            <div key={`group-${gIdx}`} className="space-y-2">
              <h3 className="text-xs font-serif font-bold text-[#FDE047] uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                {group.title}
              </h3>
              <div className="grid gap-2">
                {group.items.map((item, iIdx) => (
                  <div
                    key={`item-${gIdx}-${iIdx}`}
                    className="flex items-center justify-between p-2 rounded-lg bg-[#1D1610]/80 border border-[#D4AF37]/15"
                  >
                    <span className="text-xs font-mono text-[#D6C4A1]">{item.desc}</span>
                    <div className="flex items-center gap-1 shrink-0">
                      {item.keys.map((k, kIdx) =>
                        k === 'or' ? (
                          <span key={kIdx} className="text-[10px] text-[#8C7A60] font-mono mx-0.5">
                            or
                          </span>
                        ) : (
                          <kbd
                            key={kIdx}
                            className="px-2 py-0.5 rounded bg-[#2A2016] border border-[#D4AF37]/40 text-[#F5D77F] font-mono text-xs font-bold shadow-sm"
                          >
                            {k}
                          </kbd>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3.5 border-t border-[#D4AF37]/30 flex items-center justify-between text-[11px] font-mono text-[#8C7A60]">
          <span>PRODUCED WITH WEBGL & THREE.JS</span>
          <span>PRESS [ ESC ] TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
