import React, { useState } from 'react';
import { X, Compass, MapPin, Sparkles, Award, BookOpen, Wand2, Shield, ArrowRight } from 'lucide-react';
import { useScene } from '../../../context/SceneContext';
import { SECTOR_BAYS } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';

export const QuickTravelDrawer: React.FC = () => {
  const {
    isQuickTravelOpen,
    toggleQuickTravel,
    warpToSector,
    activeSector,
    cameraZ,
    returnToGate,
  } = useScene();
  const [activeTab, setActiveTab] = useState<'chambers' | 'codex' | 'grimoire'>('chambers');

  if (!isQuickTravelOpen) return null;

  const ACHIEVEMENTS = [
    {
      id: 'claude-architect',
      title: 'Claude Certified Architect',
      category: 'ANTHROPIC CREDENTIAL',
      desc: 'Mastery in enterprise agentic topologies, precision context caching, deterministic tool use, and subagent orchestration.',
      icon: '🛡️',
      earned: true,
    },
    {
      id: 'ocr-pipeline',
      title: '100MB Document OCR Master',
      category: 'AUTONOMOUS AI WORKFLOWS',
      desc: 'Built multi-stage coordinator-worker subagent parsing pipeline handling up to 100MB mixed-type enterprise documents.',
      icon: '📜',
      earned: true,
    },
    {
      id: 'qodeai-engine',
      title: 'Autonomous SDLC Architect',
      category: 'SYSTEMS & ARITHMANCY',
      desc: 'End-to-end SDLC automation system with multi-provider LLM failover, ChromaDB embeddings, and structured Jira artifact synthesis.',
      icon: '⚡',
      earned: true,
    },
    {
      id: 'distributed-vault',
      title: 'Distributed Systems Pioneer',
      category: 'HEALTHCARE & MESH',
      desc: 'Multi-cloud enterprise DICOM medical image streaming pipeline engineered with 99.99% availability target.',
      icon: '🏛️',
      earned: true,
    },
    {
      id: 'zero-trust',
      title: 'Zero-Trust Security Sentinel',
      category: 'ENTERPRISE DEFENSE',
      desc: 'Strict multi-tenant security barrier with JWT token rotation, role isolation, and fine-grained data encryption.',
      icon: '🗝️',
      earned: true,
    },
    {
      id: 'citadel-scholar',
      title: 'Ravenclaw Citadel Scholar',
      category: 'FULL-STACK MASTERY',
      desc: 'Expertise bridging low-level systems engineering with modern generative AI, 3D WebGL interfaces, and cloud architectures.',
      icon: '🦅',
      earned: true,
    },
  ];

  const GRIMOIRE_SPELLS = [
    {
      name: 'Lumos',
      incantation: 'Lumos Solem',
      icon: '💡',
      effect: 'Flares brilliant golden light from the wand tip, dispersing shadows and illuminating castle architecture.',
      key: '1',
    },
    {
      name: 'Expecto Patronum',
      incantation: 'Expecto Patronum',
      icon: '🦌',
      effect: 'Conjures a silver ethereal patronus burst with majestic harmonic chords, clearing gloom and darkness.',
      key: '2',
    },
    {
      name: 'Alohomora',
      incantation: 'Alohomora',
      icon: '🗝️',
      effect: 'Mystically unlocks sealed chamber doorways and opens deep technical project dossiers.',
      key: '3',
    },
    {
      name: 'Wingardium Leviosa',
      incantation: 'Wingardium Leviosa',
      icon: '🪄',
      effect: 'Channels anti-gravity resonance, lifting floating parchment cards and enchanted artifacts.',
      key: '4',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-lg select-none animate-in fade-in">
      <div className="w-full max-w-2xl bg-[#130E09] border-2 border-[#D4AF37]/60 rounded-2xl shadow-2xl p-5 sm:p-7 relative text-[#E6D5AC] overflow-hidden">
        {/* Subtle aged parchment background texture gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#2A1E14_0%,#130E09_70%)] pointer-events-none" />

        {/* Ornate Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/30 relative z-10">
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-[#F5D77F]" />
            <div>
              <h2 className="text-base sm:text-lg font-serif font-bold text-[#FFFDF0] tracking-widest leading-tight">
                THE MARAUDER&apos;S MAP // CITADEL INDEX
              </h2>
              <p className="text-[11px] text-[#A89874] font-mono">
                &ldquo;Messrs Moony, Wormtail, Padfoot, &amp; Prongs are proud to present...&rdquo;
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              soundEngine.playHover();
              toggleQuickTravel();
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#22180F] hover:bg-[#342416] text-[#C4B087] hover:text-[#FFFDF0] transition-colors cursor-pointer border border-[#D4AF37]/30 font-serif text-xs"
            title="Mischief Managed (Close)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Mischief Managed</span>
          </button>
        </div>

        {/* Tabs: Chambers / Codex / Grimoire */}
        <div className="flex items-center gap-2 mt-4 pb-2 border-b border-[#D4AF37]/20 relative z-10">
          <button
            onClick={() => {
              soundEngine.playClick(950);
              setActiveTab('chambers');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold tracking-wider transition-all cursor-pointer ${
              activeTab === 'chambers'
                ? 'bg-[#D4AF37]/25 text-[#FDE047] border border-[#F5D77F]/60'
                : 'text-[#A89874] hover:text-[#FFFDF0] hover:bg-[#22180F]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>CHAMBERS ({SECTOR_BAYS.length})</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick(1050);
              setActiveTab('codex');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold tracking-wider transition-all cursor-pointer ${
              activeTab === 'codex'
                ? 'bg-[#D4AF37]/25 text-[#FDE047] border border-[#F5D77F]/60'
                : 'text-[#A89874] hover:text-[#FFFDF0] hover:bg-[#22180F]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>TITLES &amp; CODEX ({ACHIEVEMENTS.length})</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playClick(1150);
              setActiveTab('grimoire');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-serif font-bold tracking-wider transition-all cursor-pointer ${
              activeTab === 'grimoire'
                ? 'bg-[#D4AF37]/25 text-[#FDE047] border border-[#F5D77F]/60'
                : 'text-[#A89874] hover:text-[#FFFDF0] hover:bg-[#22180F]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>SPELL GRIMOIRE</span>
          </button>
        </div>

        {/* Tab 1: Chambers & Direct Warp */}
        {activeTab === 'chambers' && (
          <div className="grid gap-2.5 mt-4 relative z-10 max-h-[52vh] overflow-y-auto pr-1">
            {/* Castle Gates Return Option */}
            <button
              onClick={() => {
                toggleQuickTravel();
                returnToGate();
              }}
              className="flex items-center justify-between p-3 rounded-xl border border-[#10B981]/40 bg-[#0F231B]/60 hover:bg-[#153428] text-left transition-all cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-serif font-bold px-2 py-0.5 rounded bg-[#10B981]/20 text-[#6EE7B7] border border-[#10B981]/30">
                  GATE
                </span>
                <div>
                  <div className="text-sm font-semibold font-serif text-[#F3F4F6] flex items-center gap-2">
                    Castle Entrance &amp; Iron Gates
                  </div>
                  <div className="text-[11px] text-[#A7F3D0] font-mono mt-0.5">
                    Outer Forecourt // Relive entrance sequence
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#6EE7B7]">
                <span>Z: 32m</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </button>

            {/* Chamber List */}
            {SECTOR_BAYS.map((bay) => {
              const isCurrent = activeSector.id === bay.id;
              const distance = Math.round(Math.abs(cameraZ - bay.doorZ));

              return (
                <button
                  key={bay.id}
                  onClick={() => {
                    soundEngine.playAlohomora();
                    warpToSector(bay.id);
                  }}
                  className={`flex items-center justify-between p-3 sm:p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isCurrent
                      ? 'bg-[#D4AF37]/20 border-[#F5D77F] text-[#FFFDF0] shadow-md shadow-amber-950/40 ring-1 ring-[#D4AF37]/50'
                      : 'bg-[#1C1610]/80 border-[#D4AF37]/20 hover:bg-[#2A2016] text-[#D8C7A0] hover:text-[#FDE047] hover:border-[#D4AF37]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 sm:gap-3.5">
                    <span
                      className="text-xs font-serif font-bold px-2.5 py-1 rounded border border-[#D4AF37]/30 shrink-0"
                      style={{ backgroundColor: `${bay.doorColor}25`, color: bay.doorColor }}
                    >
                      {bay.code}
                    </span>
                    <div>
                      <div className="text-sm font-semibold font-serif tracking-wide text-[#FDFBF7] flex items-center gap-2">
                        {bay.title}
                        {isCurrent && <Sparkles className="w-3.5 h-3.5 text-[#FDE047] animate-pulse" />}
                      </div>
                      <div className="text-[11px] text-[#A89874] font-mono mt-0.5 leading-snug">
                        {bay.subtitle}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-[11px] text-[#C4B087] shrink-0">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{distance}m away</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab 2: Titles & Achievements Codex */}
        {activeTab === 'codex' && (
          <div className="grid gap-2.5 mt-4 relative z-10 max-h-[52vh] overflow-y-auto pr-1">
            {ACHIEVEMENTS.map((ach) => (
              <div
                key={ach.id}
                className="p-3.5 rounded-xl bg-[#1C1610]/90 border border-[#D4AF37]/30 flex items-start gap-3.5"
              >
                <div className="text-2xl p-2 rounded-lg bg-[#2A2016] border border-[#D4AF37]/25 shrink-0">
                  {ach.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-serif font-bold text-[#FFFDF0]">{ach.title}</h3>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/20 text-[#F5D77F] border border-[#D4AF37]/30 uppercase">
                      {ach.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#C4B087] font-mono mt-1 leading-relaxed">{ach.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Spell Grimoire */}
        {activeTab === 'grimoire' && (
          <div className="grid gap-3 mt-4 relative z-10 max-h-[52vh] overflow-y-auto pr-1">
            {GRIMOIRE_SPELLS.map((spell, idx) => (
              <div
                key={`grimoire-${idx}`}
                className="p-3.5 rounded-xl bg-[#1C1610]/90 border border-[#D4AF37]/30 flex items-start justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="text-2xl p-2 rounded-lg bg-[#2A2016] border border-[#D4AF37]/25 shrink-0">
                    {spell.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-serif font-bold text-[#FFFDF0]">{spell.name}</h3>
                      <span className="text-[10px] font-mono text-[#D4AF37] italic">
                        {spell.incantation}
                      </span>
                    </div>
                    <p className="text-xs text-[#C4B087] font-mono mt-1 leading-relaxed">
                      {spell.effect}
                    </p>
                  </div>
                </div>
                <kbd className="px-2 py-1 rounded bg-[#2A2016] border border-[#D4AF37]/40 text-[#F5D77F] font-mono text-xs font-bold shrink-0">
                  Key [{spell.key}]
                </kbd>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 pt-3.5 border-t border-[#D4AF37]/30 flex items-center justify-between text-[11px] text-[#A89874] font-mono relative z-10">
          <span>&ldquo;I SOLEMNLY SWEAR THAT I AM UP TO NO GOOD&rdquo;</span>
          <span>PRESS [ ESC ] TO CLOSE</span>
        </div>
      </div>
    </div>
  );
};
