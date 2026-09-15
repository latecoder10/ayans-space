import React, { useRef, useState } from 'react';
import { HogwartsPainting } from './HogwartsPaintingsData';
import { soundEngine } from '../../utils/synthesizer';

interface FloatingParchmentCardProps {
  painting: HogwartsPainting;
  index: number;
  onClick: (painting: HogwartsPainting) => void;
}

export const FloatingParchmentCard: React.FC<FloatingParchmentCardProps> = ({ painting, index, onClick }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Parallax tilt degrees
    setRotateX(-(y / (rect.height / 2)) * 10);
    setRotateY((x / (rect.width / 2)) * 12);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleClick = () => {
    soundEngine.playAlohomora();
    onClick(painting);
  };

  // Staggered gentle vertical floating animation delay
  const floatDelay = `${index * 0.4}s`;

  return (
    <div
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer select-none transition-transform duration-200 ease-out"
      style={{
        perspective: 1000,
        animation: `hogwartsFloat 4.5s ease-in-out infinite alternate ${floatDelay}`,
      }}
    >
      <div
        className="hogwarts-floating-card relative flex flex-col p-4 w-72 sm:w-80 overflow-hidden"
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.04 : 1})`,
          transition: 'transform 0.15s ease-out, border-color 0.25s, box-shadow 0.25s',
        }}
      >
        {/* Ornate Golden Filigree Corners (Image 1) */}
        <div className="corner-bracket-gold" />

        {/* Top Header & Crest */}
        <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-base drop-shadow-sm">{painting.iconSymbol}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[#F5CE62] font-semibold">
              {painting.categoryLabel}
            </span>
          </div>
          <span className="font-serif text-[10px] text-[#D4AF37]/80">✦ № 0{index + 1}</span>
        </div>

        {/* Scenic Painting Miniature */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded border border-[#8E6827]/40 mb-3 bg-black/60 shadow-inner">
          <div className={`absolute inset-0 bg-gradient-to-br ${painting.bgGradient} opacity-90 transition-transform duration-500 group-hover:scale-105`} />
          <div className="absolute inset-0 flex items-center justify-center p-3 text-center">
            <span className="font-serif text-sm font-bold text-[#FFF6D6] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {painting.title}
            </span>
          </div>
          <div className="absolute bottom-1 right-1.5 font-mono text-[9px] text-[#CBD5E1] bg-black/60 px-1.5 py-0.5 rounded">
            {painting.locationName}
          </div>
        </div>

        {/* Title & Core Engineering Achievement */}
        <div className="flex flex-col gap-1.5 mb-3">
          <h3 className="font-serif text-sm font-bold text-[#FFF6D6] tracking-wide group-hover:text-[#FDE047] transition-colors leading-snug">
            {painting.engineeringTitle}
          </h3>
          <p className="font-body text-xs text-[#CBD5E1]/90 leading-relaxed line-clamp-2">
            {painting.shortDescription}
          </p>
        </div>

        {/* Technologies Runic Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {painting.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#1A1F29]/80 text-[#F5CE62] border border-[#D4AF37]/30"
            >
              {tech}
            </span>
          ))}
          {painting.technologies.length > 4 && (
            <span className="font-mono text-[9px] px-1 py-0.5 text-[#94A3B8]">
              +{painting.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Action Button: Inspect Grimoire */}
        <div className="mt-auto pt-2 border-t border-[#D4AF37]/20 flex items-center justify-between text-[#F5CE62] font-serif text-[11px] tracking-wider font-semibold group-hover:text-[#FDE047]">
          <span className="flex items-center gap-1.5">
            <span>Inspect Dossier</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </span>
          <span className="text-[10px] text-[#94A3B8] font-mono">Alohomora</span>
        </div>
      </div>
    </div>
  );
};
