import React, { useEffect, useRef } from 'react';
import {
  X,
  GitBranch,
  ExternalLink,
  Globe,
  Award,
  Feather,
} from 'lucide-react';
import gsap from 'gsap';
import { useScene } from '../../../context/SceneContext';
import { soundEngine } from '../../../utils/synthesizer';

export const GlobalDossierOverlay: React.FC = () => {
  const { overlayContent, closeOverlay } = useScene();
  const cardRef = useRef<HTMLDivElement>(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && overlayContent) {
        soundEngine.playHover();
        closeOverlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [overlayContent, closeOverlay]);

  // Click outside to close (without needing a screen-dimming modal backdrop)
  useEffect(() => {
    if (!overlayContent) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        soundEngine.playHover();
        closeOverlay();
      }
    };
    const timer = setTimeout(() => {
      window.addEventListener('mousedown', handlePointerDown);
      window.addEventListener('touchstart', handlePointerDown);
    }, 60);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, [overlayContent, closeOverlay]);

  // Prevent wheel events on the popup card from bubbling to window/canvas camera rig
  useEffect(() => {
    const cardEl = cardRef.current;
    if (!cardEl) return;

    const stopBubble = (e: Event) => {
      e.stopPropagation();
    };

    cardEl.addEventListener('wheel', stopBubble, { passive: true });
    cardEl.addEventListener('touchmove', stopBubble, { passive: true });

    return () => {
      cardEl.removeEventListener('wheel', stopBubble);
      cardEl.removeEventListener('touchmove', stopBubble);
    };
  }, [overlayContent]);

  // Snappy parchment entrance animation for the letter
  useEffect(() => {
    if (overlayContent && cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, x: 28, y: -16, scale: 0.94, rotate: 1 },
        { opacity: 1, x: 0, y: 0, scale: 1, rotate: 0, duration: 0.32, ease: 'back.out(1.2)' }
      );
    }
  }, [overlayContent]);

  if (!overlayContent) return null;

  const repoUrl = overlayContent.repoUrl || 'https://github.com/latecoder10';

  return (
    <aside
      id="in-game-dossier-popover"
      aria-label="Active Hogwarts Letter Dossier"
      className="fixed top-12 sm:top-16 right-2.5 sm:right-5 md:right-7 z-40 pointer-events-none flex flex-col items-end font-serif w-[calc(100vw-1.25rem)] sm:w-[410px] md:w-[440px]"
    >
      {/* Hogwarts Acceptance Letter Parchment Card */}
      <div
        ref={cardRef}
        onWheel={(e) => e.stopPropagation()}
        className="pointer-events-auto select-text parchment-letter-bg relative w-full max-h-[calc(100vh-7.5rem)] sm:max-h-[78vh] flex flex-col rounded-2xl border-4 border-[#6E421E]/60 text-[#2C180C] overflow-hidden transition-all shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(180,130,60,0.25)]"
      >
        {/* Distressed Deckle Parchment Inner Inset Borders */}
        <div className="absolute inset-1.5 border border-[#8B5A2B]/40 rounded-xl pointer-events-none z-10" />
        <div className="absolute inset-2.5 border border-[#5C381E]/20 rounded-lg pointer-events-none z-10" />

        {/* Antique Creases & Burnt Edge Stains Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(139,90,43,0.12)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(100,50,15,0.15)_0%,transparent_60%)] pointer-events-none z-10" />

        {/* Burnt Tattered Corner Marks */}
        <div className="absolute -top-3 -left-3 w-10 h-10 bg-[#3B2211]/30 rounded-full blur-sm pointer-events-none z-10" />
        <div className="absolute -top-3 -right-3 w-10 h-10 bg-[#3B2211]/30 rounded-full blur-sm pointer-events-none z-10" />
        <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-[#3B2211]/30 rounded-full blur-sm pointer-events-none z-10" />
        <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-[#3B2211]/30 rounded-full blur-sm pointer-events-none z-10" />

        {/* Close Wax-Seal Stamp Button in Top Corner */}
        <button
          id="btn-close-dossier-popover"
          onClick={() => {
            soundEngine.playHover();
            closeOverlay();
          }}
          className="absolute top-3 right-3 z-30 flex items-center gap-1 text-[11px] font-serif font-bold text-[#FFF8E7] bg-[#7E1818] hover:bg-[#991B1B] px-2.5 py-1 rounded-full border border-[#4F0D0D] wax-seal-shadow transition-all cursor-pointer group"
          title="Close letter [ESC]"
        >
          <span className="hidden sm:inline tracking-wider">ESC</span>
          <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
        </button>

        {/* Scrollable Parchment Letter Content */}
        <div
          onWheel={(e) => e.stopPropagation()}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-5 sm:px-6 pt-5 pb-5 space-y-3.5 relative z-20 text-left parchment-scrollbar touch-pan-y selection:bg-[#7E1818] selection:text-[#FFF8E7]"
        >

          {/* 1. HOGWARTS CREST & FORMAL LETTERHEAD */}
          <div className="text-center pt-1 pb-2 relative">
            {/* Circular Crimson Crest Stamp */}
            <div className="mx-auto w-14 h-14 rounded-full border-2 border-[#7E1818] p-0.5 flex items-center justify-center relative mb-1.5 shadow-[0_0_8px_rgba(126,24,24,0.3)]">
              <div className="w-full h-full rounded-full border border-[#7E1818]/60 flex flex-col items-center justify-center bg-[#7E1818]/5">
                <span className="font-serif text-2xl font-black text-[#7E1818] leading-none tracking-tighter" style={{ fontFamily: 'Cinzel Decorative, serif' }}>
                  H
                </span>
              </div>
              {/* Arcane Seal Dots */}
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 text-[8px] text-[#7E1818]">✦</span>
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-[#7E1818]">✦</span>
            </div>

            {/* Hogwarts School Title in Crimson Vintage Type */}
            <h1 className="text-lg sm:text-xl font-extrabold text-[#7E1818] tracking-[0.08em] uppercase font-serif leading-tight">
              Hogwarts School
            </h1>
            <div className="text-xs sm:text-sm italic font-serif text-[#7E1818] tracking-widest mt-0.5" style={{ fontFamily: 'Playfair Display, serif' }}>
              of Witchcraft and Wizardry
            </div>

            {/* Headmaster / Architect Byline */}
            <div className="mt-2 text-[10px] text-[#4A2E19] font-serif tracking-wider font-semibold uppercase">
              HEADMASTER & LEAD ARCHITECT: AYAN PAL
            </div>
            <div className="text-[9px] text-[#6E482B] italic font-serif">
              (Order of Systems & AI Architecture · First Class · Distributed Guild)
            </div>

            {/* Crimson Hairline Divider Line with Center Diamond */}
            <div className="relative mt-2.5 mb-1 flex items-center justify-center">
              <div className="w-full border-t border-[#7E1818]/40" />
              <span className="absolute px-2 bg-[#EAD6AF] text-[#7E1818] text-[9px]">♦</span>
            </div>
          </div>

          {/* 2. FORMAL SALUTATION */}
          <div className="pt-0.5">
            <p className="text-xs sm:text-[13px] font-bold text-[#2A1608] font-serif">
              Dear Traveler & Inquirer,
            </p>
            <p className="text-xs text-[#3D2513] font-serif leading-relaxed mt-1">
              We are pleased to inform you that you have been granted full clearance to inspect the chamber dossier of:
            </p>
          </div>

          {/* 3. CASE STUDY TITLE & SUBTITLE IN DEEP SEPIA INK */}
          <div className="p-3 rounded-xl bg-[#DFCA9E]/50 border border-[#8B5A2B]/40 shadow-inner">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[9px] font-bold text-[#7E1818] uppercase tracking-widest font-serif bg-[#7E1818]/10 px-2 py-0.5 rounded border border-[#7E1818]/30">
                ✦ {overlayContent.category.replace(/_/g, ' ')}
              </span>
              {(overlayContent.badge || overlayContent.timeline) && (
                <span className="text-[9px] text-[#5C381E] font-serif italic">
                  · {overlayContent.badge || overlayContent.timeline}
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-lg font-black text-[#1E0F05] font-serif leading-snug">
              {overlayContent.title}
            </h2>
            <p className="text-xs text-[#4A2E19] mt-1 italic font-serif leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
              &ldquo;{overlayContent.subtitle}&rdquo;
            </p>
          </div>

          {/* 4. WAX-SEAL ACTION BUTTONS (View Repository, Demo, Credential) */}
          <div className="flex flex-wrap items-center gap-2 pt-0.5">
            {/* Crimson Wax Seal Button for Repository */}
            <a
              id="btn-dossier-repo"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundEngine.playNodePulse(950)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#7E1818] hover:bg-[#991B1B] text-[#FFF8E7] text-xs font-serif font-bold border border-[#4F0D0D] wax-seal-shadow transition-all cursor-pointer shadow-md"
            >
              <GitBranch className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>View Repository</span>
              <ExternalLink className="w-3 h-3 text-[#FDE047]" />
            </a>

            {/* Slytherin Emerald Seal for Live Demo */}
            {overlayContent.liveUrl && (
              <a
                id="btn-dossier-live"
                href={overlayContent.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playNodePulse(1050)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#184828] hover:bg-[#205D34] text-[#E8F5E9] text-xs font-serif font-semibold border border-[#0D2816] shadow-sm transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#6EE7B7]" />
                <span>Live Demo</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#6EE7B7]" />
              </a>
            )}

            {/* Ravenclaw Sapphire Seal for Credentials */}
            {overlayContent.credentialUrl && (
              <a
                id="btn-dossier-credential"
                href={overlayContent.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundEngine.playNodePulse(1150)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#1B324D] hover:bg-[#254569] text-[#E8F1F8] text-xs font-serif font-semibold border border-[#101F30] shadow-sm transition-all cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-[#93C5FD]" />
                <span>Official Credential</span>
                <ExternalLink className="w-2.5 h-2.5 text-[#93C5FD]" />
              </a>
            )}
          </div>

          {/* 5. OVERVIEW SECTION AS PARCHMENT PASSAGE */}
          <div className="p-3 rounded-lg bg-[#E4D1A7]/60 border border-[#8B5A2B]/35 text-xs text-[#2A170B] leading-relaxed font-serif">
            <div className="flex items-center gap-1.5 text-[10px] font-serif font-bold text-[#7E1818] uppercase tracking-wider mb-1">
              <Feather className="w-3 h-3 text-[#7E1818]" />
              <span>Executive Summary</span>
            </div>
            <p className="leading-relaxed">
              {overlayContent.overview}
            </p>
          </div>

          {/* 6. TECHNICAL ENCHANTMENTS & ARCHITECTURE */}
          {overlayContent.technicalHighlights.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[10px] font-serif font-bold text-[#7E1818] uppercase tracking-wider flex items-center gap-1">
                <span>Enclosed Architecture & Artifacts</span>
                <span className="text-[#8B5A2B]">📜</span>
              </div>
              <div className="space-y-1">
                {overlayContent.technicalHighlights.slice(0, 3).map((highlight, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2 text-xs text-[#301D0F] font-serif leading-snug"
                  >
                    <span className="text-[#7E1818] font-bold mt-0.5">✦</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. TECH STACK LABELS AS VINTAGE PARCHMENT TAGS */}
          {overlayContent.technologies.length > 0 && (
            <div className="pt-2 border-t border-[#8B5A2B]/30">
              <div className="text-[10px] font-serif font-bold text-[#5C381E] uppercase tracking-wider mb-1.5">
                Magical Tools & Technologies:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {overlayContent.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono bg-[#D8C090] text-[#2C180C] px-2 py-0.5 rounded border border-[#8B5A2B]/40 shadow-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 8. FORMAL HOGWARTS SIGN-OFF */}
          <div className="pt-3 border-t border-[#7E1818]/30 flex items-end justify-between">
            <div>
              <p className="text-xs font-serif text-[#4A2E19]">
                Yours sincerely,
              </p>
              <p className="text-sm font-bold italic text-[#7E1818] font-serif mt-0.5" style={{ fontFamily: 'Playfair Display, serif' }}>
                Ayan Pal
              </p>
              <p className="text-[9px] text-[#6E482B] font-serif italic">
                Senior Systems Engineer & Chamber Curator
              </p>
            </div>

            {/* Hogwarts Red Wax Seal Stamp Badge */}
            <div className="w-10 h-10 rounded-full bg-[#7E1818] text-[#FFF8E7] border border-[#4F0D0D] wax-seal-shadow flex flex-col items-center justify-center text-[8px] font-serif font-bold tracking-tighter shadow-md shrink-0">
              <span className="text-[9px] leading-none">✦</span>
              <span className="text-[7px] leading-none uppercase">VERIFIED</span>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="text-center pt-1">
            <span className="text-[9px] text-[#7A5232] font-serif italic">
              We await your dispatch · Press [ESC] or click outside to dismiss
            </span>
          </div>

        </div>
      </div>
    </aside>
  );
};
