import React from 'react';

export const PanoramicCastleScenery: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* 1. Golden Hour Sky Backdrop */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          background: 'radial-gradient(ellipse at 48% 30%, #F5CE62 0%, #D89839 25%, #6B8BA4 65%, #30475E 100%)',
        }}
      />

      {/* 2. Soft Atmospheric Cloud & Mountain Silhouettes */}
      <svg className="absolute inset-0 w-full h-full opacity-65" preserveAspectRatio="none" viewBox="0 0 1440 900">
        <defs>
          <linearGradient id="mistGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF2D6" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#DFB67B" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#253549" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="mountainGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6C839B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2A3747" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="mountainGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#486076" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1B2430" stopOpacity="1" />
          </linearGradient>
          <radialGradient id="sunGlow" cx="45%" cy="32%" r="40%">
            <stop offset="0%" stopColor="#FFFBE6" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#F5CE62" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sun Aura */}
        <circle cx="680" cy="260" r="320" fill="url(#sunGlow)" />

        {/* Distant Misty Mountain Ranges */}
        <path d="M0,520 Q240,430 480,490 T960,460 T1440,510 L1440,900 L0,900 Z" fill="url(#mountainGrad1)" />
        <path d="M0,560 Q320,490 640,540 T1280,520 T1440,560 L1440,900 L0,900 Z" fill="url(#mountainGrad2)" opacity="0.85" />
      </svg>

      {/* 3. High-Definition Scenic SVG Layer: Hogwarts Castle on Rocky Cliffs (Image 1) */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 1000">
        <defs>
          <linearGradient id="stoneCastle" x1="0" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#A89F91" />
            <stop offset="35%" stopColor="#7B7264" />
            <stop offset="70%" stopColor="#4E473D" />
            <stop offset="100%" stopColor="#2C2720" />
          </linearGradient>
          <linearGradient id="sunlightStone" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFEAA7" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E1912" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="spireRoof" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3D5A50" />
            <stop offset="60%" stopColor="#253832" />
            <stop offset="100%" stopColor="#121D1A" />
          </linearGradient>
          <linearGradient id="cliffRock" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5D5449" />
            <stop offset="40%" stopColor="#3C352D" />
            <stop offset="100%" stopColor="#181512" />
          </linearGradient>
          <linearGradient id="waterSurface" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E2F38" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#2F4C5A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#101820" stopOpacity="0.95" />
          </linearGradient>
          <radialGradient id="lanternFlame" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="20%" stopColor="#FFF1B0" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="85%" stopColor="#B45309" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lanternHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5CE62" stopOpacity="0.8" />
            <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.35" />
            <stop offset="70%" stopColor="#D97706" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <pattern id="cobblestone" width="48" height="28" patternUnits="userSpaceOnUse">
            <rect width="48" height="28" fill="#3D372F" />
            <path d="M0,0 L24,0 L24,14 L0,14 Z M24,14 L48,14 L48,28 L24,28 Z" fill="#4B443A" stroke="#26221D" strokeWidth="1.5" />
            <circle cx="12" cy="7" r="1.5" fill="#5F574A" opacity="0.6" />
            <circle cx="36" cy="21" r="1.5" fill="#5F574A" opacity="0.6" />
          </pattern>
        </defs>

        {/* CLIFF MASS (Left & Center-Right) */}
        <g id="cliff-mass">
          {/* Main Left Cliff */}
          <path d="M80,680 Q120,740 180,820 L240,950 L270,1000 L0,1000 L0,680 Z" fill="url(#cliffRock)" />
          {/* Central Promontory under Castle */}
          <path d="M120,680 C180,620 280,640 420,650 C580,660 680,690 760,750 L820,1000 L120,1000 Z" fill="url(#cliffRock)" />
          {/* Right Cliff Edge */}
          <path d="M1200,640 Q1380,650 1520,720 L1600,760 L1600,1000 L1180,1000 Z" fill="url(#cliffRock)" />
        </g>

        {/* HOGWARTS CASTLE TOWERS & SPIRES (Left & Center) */}
        <g id="castle-architecture">
          {/* Great Hall Body */}
          <rect x="240" y="380" width="180" height="270" fill="url(#stoneCastle)" />
          <path d="M240,380 L330,310 L420,380 Z" fill="url(#spireRoof)" />
          {/* Great Hall Gothic Windows */}
          <g fill="#FFE8A3" opacity="0.75">
            <path d="M260,420 A12,12 0 0,1 284,420 L284,540 L260,540 Z" />
            <path d="M295,420 A12,12 0 0,1 319,420 L319,540 L295,540 Z" />
            <path d="M330,420 A12,12 0 0,1 354,420 L354,540 L330,540 Z" />
            <path d="M365,420 A12,12 0 0,1 389,420 L389,540 L365,540 Z" />
          </g>

          {/* Tall Astronomy Spire */}
          <rect x="420" y="240" width="80" height="410" fill="url(#stoneCastle)" />
          <polygon points="420,240 460,110 500,240" fill="url(#spireRoof)" />
          {/* Spire Finial Cross/Star */}
          <line x1="460" y1="110" x2="460" y2="85" stroke="#F5CE62" strokeWidth="3" />
          <circle cx="460" cy="85" r="4" fill="#FFE8A3" />

          {/* Central Main Keep Tower */}
          <rect x="520" y="290" width="110" height="360" fill="url(#stoneCastle)" />
          <polygon points="520,290 575,150 630,290" fill="url(#spireRoof)" />
          <line x1="575" y1="150" x2="575" y2="125" stroke="#F5CE62" strokeWidth="3" />
          <circle cx="575" cy="125" r="4" fill="#FFE8A3" />

          {/* Eastern Battlement Wall & Turrets */}
          <rect x="630" y="440" width="380" height="210" fill="url(#stoneCastle)" />
          {/* Turret 1 */}
          <rect x="740" y="360" width="60" height="290" fill="url(#stoneCastle)" />
          <polygon points="740,360 770,250 800,360" fill="url(#spireRoof)" />
          {/* Turret 2 */}
          <rect x="920" y="390" width="55" height="260" fill="url(#stoneCastle)" />
          <polygon points="920,390 947,300 975,390" fill="url(#spireRoof)" />
          {/* Far Right Tower */}
          <rect x="1100" y="410" width="70" height="240" fill="url(#stoneCastle)" />
          <polygon points="1100,410 1135,290 1170,410" fill="url(#spireRoof)" />

          {/* Battlements notches */}
          <g fill="#4E473D">
            <rect x="630" y="428" width="16" height="14" />
            <rect x="654" y="428" width="16" height="14" />
            <rect x="678" y="428" width="16" height="14" />
            <rect x="702" y="428" width="16" height="14" />
            <rect x="810" y="428" width="16" height="14" />
            <rect x="834" y="428" width="16" height="14" />
            <rect x="858" y="428" width="16" height="14" />
            <rect x="882" y="428" width="16" height="14" />
            <rect x="980" y="428" width="16" height="14" />
            <rect x="1004" y="428" width="16" height="14" />
          </g>

          {/* Green Banners on Great Hall */}
          <polygon points="440,380 475,380 475,480 457,460 440,480" fill="#1B4D3E" opacity="0.9" />
          <polygon points="750,440 780,440 780,510 765,495 750,510" fill="#1B4D3E" opacity="0.9" />

          {/* Sunlight Warm Overlay across Castle Facade */}
          <path d="M240,380 L330,310 L420,380 L420,240 L460,110 L500,240 L520,290 L575,150 L630,290 L630,440 L1010,440 L1010,650 L240,650 Z" fill="url(#sunlightStone)" opacity="0.45" />
        </g>

        {/* FOREGROUND VIADUCT / COBBLESTONE BRIDGE PATHWAY (Leading to castle) */}
        <g id="viaduct-pathway">
          <path d="M-50,1000 L350,720 L860,730 L1100,1000 Z" fill="url(#cobblestone)" />
          {/* Path curb stones */}
          <path d="M-50,1000 L350,720 L370,720 L-20,1000 Z" fill="#6B5E4F" />
          <path d="M1100,1000 L860,730 L880,730 L1130,1000 Z" fill="#5A4E40" />
        </g>

        {/* SERENE WATER POOL & REFLECTION (Right foreground) */}
        <g id="water-pool">
          <ellipse cx="1060" cy="890" rx="280" ry="120" fill="url(#waterSurface)" />
          {/* Subtle water ripples and golden sky reflection */}
          <path d="M880,870 C940,860 1020,875 1120,865 C1200,855 1260,870 1300,880" stroke="#F5CE62" strokeWidth="2" strokeOpacity="0.4" fill="none" />
          <path d="M840,900 C920,890 1060,910 1180,895 C1240,885 1280,905 1320,915" stroke="#FFEAA7" strokeWidth="1.5" strokeOpacity="0.3" fill="none" />
          <ellipse cx="1120" cy="910" rx="90" ry="25" fill="#F59E0B" fillOpacity="0.15" />
        </g>

        {/* VINTAGE BRASS / BRONZE GLOWING LANTERN ON STONE POST (Image 1 feature) */}
        <g id="vintage-lantern">
          {/* Stone post */}
          <rect x="1105" y="785" width="22" height="60" fill="#3D362C" rx="2" stroke="#25211B" strokeWidth="1.5" />
          <polygon points="1098,785 1134,785 1128,775 1104,775" fill="#4E4437" />

          {/* Lantern Brass Frame */}
          <rect x="1102" y="725" width="28" height="50" fill="#1C1813" stroke="#8E6827" strokeWidth="2" rx="3" />
          <polygon points="1096,725 1136,725 1116,700" fill="#2E2416" stroke="#8E6827" strokeWidth="1.5" />
          <circle cx="1116" cy="697" r="4" fill="#D4AF37" />

          {/* Glass Pane & Flame */}
          <rect x="1106" y="731" width="20" height="38" fill="#FFF9E0" fillOpacity="0.35" />
          <ellipse cx="1116" cy="750" rx="6" ry="12" fill="url(#lanternFlame)" />

          {/* Warm Amber Lantern Halo Lighting */}
          <circle cx="1116" cy="750" r="140" fill="url(#lanternHalo)" opacity="0.9" />

          {/* Reflection of lantern in pool below */}
          <ellipse cx="1116" cy="855" rx="18" ry="8" fill="#F59E0B" fillOpacity="0.6" />
          <ellipse cx="1116" cy="862" rx="28" ry="5" fill="#D97706" fillOpacity="0.3" />
        </g>
      </svg>

      {/* 4. Foreground Volumetric Sunlight & Mist Shimmer */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 72% 76%, rgba(245, 158, 11, 0.12) 0%, transparent 45%), radial-gradient(circle at 45% 25%, rgba(255, 234, 167, 0.15) 0%, transparent 60%)',
        }}
      />
    </div>
  );
};
