import React, { useState } from 'react';
import { HogwartsPainting } from './HogwartsPaintingsData';
import { soundEngine } from '../../utils/synthesizer';

interface FramedPaintingProps {
  painting: HogwartsPainting;
  onClick: (painting: HogwartsPainting) => void;
}

export const FramedPainting: React.FC<FramedPaintingProps> = ({ painting, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    soundEngine.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    soundEngine.playAlohomora();
    onClick(painting);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative cursor-pointer select-none transition-all duration-300 ease-out"
      style={{
        transform: isHovered ? 'translateY(-4px) scale(1.02)' : 'translateY(0) scale(1)',
      }}
    >
      {/* 1. Deep Antique Carved Wooden Picture Frame (Image 2) */}
      <div className="hogwarts-frame relative flex flex-col p-1.5 shadow-2xl">
        {/* Frame Brass Corner Rosettes */}
        <div className="absolute top-0.5 left-0.5 w-2.5 h-2.5 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none z-20" />
        <div className="absolute top-0.5 right-0.5 w-2.5 h-2.5 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none z-20" />
        <div className="absolute bottom-0.5 left-0.5 w-2.5 h-2.5 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none z-20" />
        <div className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none z-20" />

        {/* 2. Painting Canvas Artwork */}
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-slate-950">
          {/* Layered Art Representation */}
          <div 
            className={`absolute inset-0 bg-gradient-to-br ${painting.bgGradient} transition-transform duration-500 ease-out group-hover:scale-105`}
          >
            {/* Scenic SVG Illustration inside Painting Canvas */}
            <svg className="h-full w-full opacity-85" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice">
              <defs>
                <radialGradient id={`paintGlow-${painting.id}`} cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor={painting.glowColor} stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Distant Fog & Spires */}
              <circle cx="200" cy="100" r="140" fill={`url(#paintGlow-${painting.id})`} />

              {/* Specific Location Graphic Elements */}
              {painting.artworkType === 'courtyard' && (
                <g fill="#A89F91">
                  <path d="M40,250 L120,130 C150,90 250,90 280,130 L360,250 Z" opacity="0.6" />
                  <polygon points="170,110 200,40 230,110" fill="#3D5A50" />
                  <rect x="180" y="110" width="40" height="140" fill="#7B7264" />
                  <polygon points="80,150 100,80 120,150" fill="#3D5A50" />
                  <polygon points="280,150 300,80 320,150" fill="#3D5A50" />
                  {/* Flagstone paving */}
                  <path d="M0,210 L400,210 L400,250 L0,250 Z" fill="#241E18" />
                </g>
              )}

              {painting.artworkType === 'viaduct' && (
                <g>
                  {/* Mountain ravine */}
                  <polygon points="0,90 90,200 0,250" fill="#202A36" />
                  <polygon points="400,80 310,200 400,250" fill="#202A36" />
                  {/* Viaduct stone arches */}
                  <rect x="70" y="160" width="260" height="20" fill="#6B7280" />
                  <path d="M100,180 A20,30 0 0,1 140,180 L140,250 L100,250 Z" fill="#374151" />
                  <path d="M180,180 A20,30 0 0,1 220,180 L220,250 L180,250 Z" fill="#374151" />
                  <path d="M260,180 A20,30 0 0,1 300,180 L300,250 L260,250 Z" fill="#374151" />
                </g>
              )}

              {painting.artworkType === 'greathall' && (
                <g>
                  {/* High Gothic vaulted ceiling & floating lights */}
                  <path d="M50,250 L50,80 L200,30 L350,80 L350,250 Z" fill="#1E232F" />
                  <polygon points="200,30 50,80 200,100 350,80" fill="#2E3748" />
                  {/* Floating candle lights */}
                  <circle cx="120" cy="90" r="3" fill="#FDE047" />
                  <circle cx="180" cy="75" r="3.5" fill="#FDE047" />
                  <circle cx="230" cy="85" r="3" fill="#FDE047" />
                  <circle cx="280" cy="95" r="3" fill="#FDE047" />
                  {/* Long feast table */}
                  <polygon points="120,220 280,220 320,250 80,250" fill="#5A3E22" />
                </g>
              )}

              {painting.artworkType === 'astronomy' && (
                <g>
                  {/* Sky with stars */}
                  <circle cx="80" cy="40" r="1.5" fill="#FFFFFF" />
                  <circle cx="280" cy="30" r="2" fill="#FFFFFF" />
                  <circle cx="340" cy="70" r="1.5" fill="#FFFFFF" />
                  {/* Tower pinnacle */}
                  <rect x="170" y="90" width="60" height="160" fill="#334155" />
                  <polygon points="160,90 200,20 240,90" fill="#1E293B" />
                  <circle cx="200" cy="20" r="3" fill="#F5CE62" />
                  {/* Observation ring */}
                  <ellipse cx="200" cy="110" rx="38" ry="12" fill="none" stroke="#D4AF37" strokeWidth="2" />
                </g>
              )}

              {painting.artworkType === 'clocktower' && (
                <g>
                  {/* Tower facade */}
                  <rect x="140" y="50" width="120" height="200" fill="#383025" />
                  <polygon points="140,50 200,10 260,50" fill="#1F1A14" />
                  {/* Clock face */}
                  <circle cx="200" cy="95" r="28" fill="#F5E6C8" stroke="#D4AF37" strokeWidth="3" />
                  <line x1="200" y1="95" x2="200" y2="78" stroke="#1F1A14" strokeWidth="2.5" />
                  <line x1="200" y1="95" x2="214" y2="95" stroke="#1F1A14" strokeWidth="2" />
                  {/* Pendulum slit */}
                  <rect x="195" y="140" width="10" height="70" fill="#17130F" />
                  <circle cx="200" cy="190" r="8" fill="#D4AF37" />
                </g>
              )}

              {painting.artworkType === 'potions' && (
                <g>
                  {/* Dungeon stone vaults */}
                  <path d="M30,250 A80,80 0 0,1 190,250 Z" fill="#064E3B" opacity="0.5" />
                  <path d="M210,250 A80,80 0 0,1 370,250 Z" fill="#064E3B" opacity="0.5" />
                  {/* Glowing cauldron */}
                  <ellipse cx="200" cy="200" rx="40" ry="16" fill="#065F46" />
                  <ellipse cx="200" cy="195" rx="36" ry="12" fill="#34D399" />
                  {/* Bubbles */}
                  <circle cx="190" cy="175" r="4" fill="#6EE7B7" />
                  <circle cx="215" cy="165" r="5" fill="#6EE7B7" />
                  <circle cx="200" cy="150" r="3" fill="#A7F3D0" />
                </g>
              )}

              {painting.artworkType === 'herbology' && (
                <g>
                  {/* Greenhouse glass structure */}
                  <polygon points="100,250 100,130 200,70 300,130 300,250" fill="#064E3B" opacity="0.3" stroke="#D4AF37" strokeWidth="2" />
                  <line x1="200" y1="70" x2="200" y2="250" stroke="#D4AF37" strokeWidth="1.5" />
                  <line x1="100" y1="170" x2="300" y2="170" stroke="#D4AF37" strokeWidth="1.5" />
                  {/* Lush botanical greenery */}
                  <circle cx="150" cy="200" r="30" fill="#16A34A" opacity="0.75" />
                  <circle cx="250" cy="210" r="35" fill="#15803D" opacity="0.8" />
                  <circle cx="200" cy="190" r="25" fill="#22C55E" opacity="0.85" />
                </g>
              )}

              {painting.artworkType === 'library' && (
                <g>
                  {/* Tall dark wooden book stacks */}
                  <rect x="40" y="40" width="90" height="210" fill="#3B2616" stroke="#1C1008" strokeWidth="2" />
                  <rect x="270" y="40" width="90" height="210" fill="#3B2616" stroke="#1C1008" strokeWidth="2" />
                  {/* Books in rows */}
                  <line x1="45" y1="90" x2="125" y2="90" stroke="#A855F7" strokeWidth="12" strokeDasharray="6,2" />
                  <line x1="45" y1="140" x2="125" y2="140" stroke="#D4AF37" strokeWidth="12" strokeDasharray="8,3" />
                  <line x1="275" y1="90" x2="355" y2="90" stroke="#3B82F6" strokeWidth="12" strokeDasharray="7,2" />
                  <line x1="275" y1="140" x2="355" y2="140" stroke="#EC4899" strokeWidth="12" strokeDasharray="5,2" />
                  {/* Central floating illuminated grimoire */}
                  <polygon points="180,120 200,135 220,120 220,145 200,160 180,145" fill="#F5CE62" />
                  <circle cx="200" cy="138" r="35" fill="#C084FC" fillOpacity="0.25" />
                </g>
              )}
            </svg>

            {/* Magical Light Shimmer Overlay */}
            <div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-300"
            />
          </div>

          {/* Top Location Plaque */}
          <div className="absolute top-1.5 left-2 right-2 flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#F5CE62] drop-shadow-md">
              {painting.locationName}
            </span>
            <span className="text-xs drop-shadow">{painting.iconSymbol}</span>
          </div>

          {/* Bottom Title & Engineering Hook */}
          <div className="absolute bottom-1.5 left-2 right-2 flex flex-col">
            <h4 className="font-serif text-[11px] font-bold tracking-wide text-[#FFFDF5] line-clamp-1 drop-shadow-md group-hover:text-[#FDE047] transition-colors">
              {painting.title}
            </h4>
            <p className="font-mono text-[8px] text-[#CBD5E1] line-clamp-1 opacity-80">
              {painting.engineeringTitle}
            </p>
          </div>

          {/* Hover Golden Vignette Aura */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: `inset 0 0 20px ${painting.glowColor}55`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
