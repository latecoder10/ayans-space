import React from 'react';
import { Lightbulb, Sparkles, KeyRound, Feather, Wand2, LucideIcon } from 'lucide-react';
import { useScene, SpellType } from '../../../context/SceneContext';
import { soundEngine } from '../../../utils/synthesizer';

interface SpellDef {
  id: SpellType;
  name: string;
  incantation: string;
  key: string;
  color: string;
  icon: LucideIcon;
  description: string;
}

const SPELLS: SpellDef[] = [
  {
    id: 'lumos',
    name: 'Lumos',
    incantation: 'Illumination Charm',
    key: '1',
    color: '#FDE047',
    icon: Lightbulb,
    description: 'Flares radiant golden light, revealing architectural details',
  },
  {
    id: 'patronum',
    name: 'Expecto Patronum',
    incantation: 'Silver Guardian',
    key: '2',
    color: '#93C5FD',
    icon: Sparkles,
    description: 'Unleashes silver celestial chords and stardust aura',
  },
  {
    id: 'alohomora',
    name: 'Alohomora',
    incantation: 'Unlocking Charm',
    key: '3',
    color: '#F59E0B',
    icon: KeyRound,
    description: 'Unlocks nearest chamber doorway or technical dossier',
  },
  {
    id: 'leviosa',
    name: 'Wingardium Leviosa',
    incantation: 'Levitation Charm',
    key: '4',
    color: '#C084FC',
    icon: Feather,
    description: 'Mystical anti-gravity resonance across the castle',
  },
];

export const SpellActionBar: React.FC = () => {
  const { currentSpell, setCurrentSpell, castActiveSpell, isEntranceIntroOpen } = useScene();

  if (isEntranceIntroOpen) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none select-none">
      <div className="flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-2xl bg-[#0F0B07]/90 backdrop-blur-md border border-[#D4AF37]/40 shadow-2xl shadow-black/80 pointer-events-auto">
        {/* Wand Icon Header */}
        <div className="hidden md:flex items-center gap-1.5 pl-2 pr-1 text-[#D4AF37] font-serif text-xs font-bold border-r border-[#D4AF37]/20">
          <Wand2 className="w-3.5 h-3.5 text-[#F5D77F] animate-pulse" />
          <span className="tracking-wider">SPURCHE</span>
        </div>

        {/* Spell Chips */}
        {SPELLS.map((spell) => {
          const isActive = currentSpell === spell.id;
          const IconComponent = spell.icon;

          return (
            <button
              key={spell.id}
              onClick={() => {
                if (isActive) {
                  castActiveSpell();
                } else {
                  soundEngine.playClick(1000);
                  setCurrentSpell(spell.id);
                }
              }}
              title={`${spell.name} [Key ${spell.key}] — ${spell.description}. Click again to cast!`}
              className={`group flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#2A2014] to-[#1F170E] border-[#F5D77F] shadow-md shadow-amber-950/60 ring-1 ring-[#D4AF37]/50 scale-105'
                  : 'bg-[#150F0A]/80 border-[#D4AF37]/20 hover:bg-[#22180F] hover:border-[#D4AF37]/40'
              }`}
            >
              {/* Hotkey Badge */}
              <span
                className="w-4 h-4 rounded text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border"
                style={{
                  backgroundColor: isActive ? `${spell.color}25` : '#1C150E',
                  borderColor: isActive ? spell.color : '#4A3B2A',
                  color: isActive ? spell.color : '#A39276',
                }}
              >
                {spell.key}
              </span>

              {/* Icon */}
              <IconComponent
                className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110"
                style={{ color: isActive ? spell.color : '#C4B087' }}
              />

              {/* Name (hidden on small mobile screens to keep bar compact) */}
              <div className="hidden sm:block text-left">
                <div
                  className="text-xs font-serif font-bold tracking-wider leading-none"
                  style={{ color: isActive ? '#FFFDF0' : '#D1C2A3' }}
                >
                  {spell.name}
                </div>
                <div className="text-[9px] font-mono text-[#8C7A60] leading-none mt-0.5">
                  {spell.incantation}
                </div>
              </div>
            </button>
          );
        })}

        {/* Cast Action Trigger Button */}
        <button
          onClick={() => castActiveSpell()}
          className="flex items-center gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#854D0E] to-[#B45309] hover:from-[#A16207] hover:to-[#D97706] text-[#FFFDF0] font-serif text-xs font-bold tracking-wider border border-[#FDE047]/60 shadow-lg shadow-amber-950/50 hover:shadow-amber-500/20 cursor-pointer transition-all active:scale-95"
          title="Cast active spell in current chamber or direction"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FEF08A] animate-spin" style={{ animationDuration: '4s' }} />
          <span>CAST</span>
        </button>
      </div>
    </div>
  );
};
