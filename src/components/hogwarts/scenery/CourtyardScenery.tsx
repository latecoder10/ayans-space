import React from 'react';

export const CourtyardScenery: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden select-none pointer-events-none">
      {/* 1. Atmospheric Gothic Sky & Distant Spires */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          background: 'radial-gradient(ellipse at 50% 20%, #2A3644 0%, #151D28 50%, #090E16 100%)',
        }}
      />

      {/* 2. Detailed SVG Courtyard Backdrop (Image 2) */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 1000">
        <defs>
          <linearGradient id="portalMasonry" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4A4237" />
            <stop offset="35%" stopColor="#362F27" />
            <stop offset="70%" stopColor="#221D17" />
            <stop offset="100%" stopColor="#120E0B" />
          </linearGradient>
          <linearGradient id="oakDoor" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2F1C12" />
            <stop offset="50%" stopColor="#43281A" />
            <stop offset="100%" stopColor="#1C100A" />
          </linearGradient>
          <linearGradient id="statueStone" x1="0" y1="0" x2="0.6" y2="1">
            <stop offset="0%" stopColor="#7E7569" />
            <stop offset="50%" stopColor="#554E44" />
            <stop offset="100%" stopColor="#26231E" />
          </linearGradient>
          <radialGradient id="statueOrb" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="25%" stopColor="#FFF2B2" />
            <stop offset="60%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="orbHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F5CE62" stopOpacity="0.85" />
            <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#B45309" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="stainedGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818CF8" stopOpacity="0.75" />
            <stop offset="30%" stopColor="#EC4899" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#10B981" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
          <pattern id="flagstonePavement" width="60" height="40" patternUnits="userSpaceOnUse">
            <rect width="60" height="40" fill="#1C1B19" />
            <path d="M0,0 L30,0 L30,20 L0,20 Z M30,20 L60,20 L60,40 L30,40 Z" fill="#292723" stroke="#121110" strokeWidth="2" />
            <rect x="2" y="2" width="26" height="16" fill="#32302A" opacity="0.4" />
            <rect x="32" y="22" width="26" height="16" fill="#32302A" opacity="0.4" />
          </pattern>
        </defs>

        {/* BACKGROUND DISTANT TOWERS & WALLS */}
        <g opacity="0.55">
          <polygon points="680,240 710,120 740,240" fill="#232C37" />
          <rect x="690" y="240" width="40" height="280" fill="#1D242E" />
          <polygon points="860,280 890,160 920,280" fill="#232C37" />
          <rect x="870" y="280" width="40" height="240" fill="#1D242E" />
          <polygon points="1260,200 1290,90 1320,200" fill="#232C37" />
          <rect x="1270" y="200" width="40" height="320" fill="#1D242E" />
        </g>

        {/* LEFT GOTHIC ARCHWAY & OAK PORTAL (Image 2 main feature) */}
        <g id="courtyard-portal">
          {/* Main Stone Wall */}
          <rect x="0" y="0" width="560" height="740" fill="url(#portalMasonry)" />
          {/* Stone Blocks Shading */}
          <line x1="0" y1="120" x2="560" y2="120" stroke="#1A1511" strokeWidth="2" />
          <line x1="0" y1="260" x2="560" y2="260" stroke="#1A1511" strokeWidth="2" />
          <line x1="0" y1="410" x2="560" y2="410" stroke="#1A1511" strokeWidth="2" />
          <line x1="0" y1="580" x2="560" y2="580" stroke="#1A1511" strokeWidth="2" />

          {/* Grand Arched Doorway Surround */}
          <path d="M120,740 L120,380 C120,220 230,140 340,140 C450,140 540,220 540,380 L540,740 Z" fill="#1A1511" />
          {/* Molded Outer Arch Ring */}
          <path d="M140,740 L140,390 C140,250 240,170 340,170 C440,170 520,250 520,390 L520,740" stroke="#5A4F41" strokeWidth="14" fill="none" />
          <path d="M165,740 L165,400 C165,275 250,200 340,200 C430,200 495,275 495,400 L495,740" stroke="#3D342A" strokeWidth="10" fill="none" />

          {/* Heavy Double Oak Doors */}
          <path d="M180,740 L180,410 C180,300 260,230 340,230 C420,230 480,300 480,410 L480,740 Z" fill="url(#oakDoor)" />
          {/* Center Door Seam */}
          <line x1="340" y1="230" x2="340" y2="740" stroke="#120B07" strokeWidth="4" />
          {/* Wrought Iron Hinges and Studs */}
          <g fill="#1A1817">
            <rect x="180" y="320" width="70" height="12" rx="2" />
            <rect x="410" y="320" width="70" height="12" rx="2" />
            <rect x="180" y="520" width="70" height="12" rx="2" />
            <rect x="410" y="520" width="70" height="12" rx="2" />
            <circle cx="330" cy="530" r="7" fill="#8E6827" />
            <circle cx="350" cy="530" r="7" fill="#8E6827" />
          </g>
        </g>

        {/* LEFT STAINED GLASS WINDOW (Glowing vibrant jewel colors - Image 2) */}
        <g id="stained-glass-window">
          {/* Stone Frame */}
          <path d="M10,600 L10,320 C10,210 50,170 75,170 C100,170 140,210 140,320 L140,600 Z" fill="#0C0E14" stroke="#4A3F33" strokeWidth="8" />
          {/* Stained Glass Panes with Jewel Colors */}
          <g opacity="0.92">
            <path d="M25,320 C25,230 55,200 75,200 C95,200 125,230 125,320 Z" fill="#3B82F6" />
            <rect x="25" y="320" width="45" height="70" fill="#EF4444" />
            <rect x="80" y="320" width="45" height="70" fill="#10B981" />
            <rect x="25" y="400" width="45" height="70" fill="#F59E0B" />
            <rect x="80" y="400" width="45" height="70" fill="#8B5CF6" />
            <rect x="25" y="480" width="100" height="90" fill="#06B6D4" />
          </g>
          {/* Lead Tracery Lines */}
          <line x1="75" y1="200" x2="75" y2="580" stroke="#05060A" strokeWidth="4" />
          <line x1="25" y1="320" x2="125" y2="320" stroke="#05060A" strokeWidth="3" />
          <line x1="25" y1="400" x2="125" y2="400" stroke="#05060A" strokeWidth="3" />
          <line x1="25" y1="480" x2="125" y2="480" stroke="#05060A" strokeWidth="3" />
          {/* Soft Colored Radiant Glow into Courtyard */}
          <ellipse cx="80" cy="400" rx="140" ry="180" fill="url(#stainedGlow)" />
        </g>

        {/* RIGHT STONE WIZARD STATUE HOLDING GLOWING ORB LANTERN (Image 2) */}
        <g id="wizard-statue">
          {/* Stone Plinth Base */}
          <rect x="1220" y="700" width="90" height="40" fill="#2E2822" stroke="#1C1814" strokeWidth="2" rx="3" />
          <polygon points="1210,740 1320,740 1310,730 1220,730" fill="#3A322A" />

          {/* Robed Wizard Body */}
          <path d="M1235,700 L1245,560 C1245,530 1255,510 1265,510 C1275,510 1285,530 1285,560 L1295,700 Z" fill="url(#statueStone)" />
          {/* Flowing Robe Folds */}
          <path d="M1250,560 Q1240,630 1242,700" stroke="#1D1A16" strokeWidth="3" fill="none" />
          <path d="M1280,560 Q1290,630 1288,700" stroke="#1D1A16" strokeWidth="3" fill="none" />

          {/* Hooded Head & Beard */}
          <path d="M1250,510 C1250,475 1280,475 1280,510 C1280,535 1250,535 1250,510 Z" fill="#4B4339" />
          <polygon points="1257,515 1273,515 1265,542" fill="#5F5649" />

          {/* Hands holding glowing orb */}
          <ellipse cx="1265" cy="552" rx="8" ry="5" fill="#4B4339" />

          {/* Glowing Magical Orb Lantern (radiating warm light) */}
          <circle cx="1265" cy="552" r="14" fill="url(#statueOrb)" />
          <circle cx="1265" cy="552" r="160" fill="url(#orbHalo)" opacity="0.85" />
        </g>

        {/* COURTYARD GROUND & REFLECTIVE PAVEMENT (Image 2) */}
        <g id="courtyard-ground">
          <polygon points="0,730 1600,730 1600,1000 0,1000" fill="url(#flagstonePavement)" />
          {/* Reflective Wet Puddles with highlights */}
          <ellipse cx="780" cy="850" rx="360" ry="85" fill="#151A22" fillOpacity="0.85" />
          <ellipse cx="780" cy="850" rx="340" ry="75" fill="#1F2A38" fillOpacity="0.5" />
          <ellipse cx="780" cy="850" rx="280" ry="55" stroke="#38BDF8" strokeWidth="1" strokeOpacity="0.25" fill="none" />
        </g>

        {/* EMBOSSED GOLDEN HOGWARTS CREST ON COURTYARD FLOOR (Image 2 feature) */}
        <g id="embedded-crest" transform="translate(780, 850) scale(1, 0.45)">
          {/* Outer Shield Rim */}
          <path d="M-130,-70 L130,-70 L130,30 C130,100 0,160 0,160 C0,160 -130,100 -130,30 Z" fill="#0D1622" stroke="#D4AF37" strokeWidth="8" />
          {/* Inner Shield Rim */}
          <path d="M-115,-58 L115,-58 L115,25 C115,85 0,140 0,140 C0,140 -115,85 -115,25 Z" fill="#142132" stroke="#F5CE62" strokeWidth="3" />

          {/* 4 Quarters Divider */}
          <line x1="0" y1="-58" x2="0" y2="140" stroke="#D4AF37" strokeWidth="4" />
          <line x1="-115" y1="0" x2="115" y2="0" stroke="#D4AF37" strokeWidth="4" />

          {/* Four House Quarter Shading (Gryffindor Red, Slytherin Green, Ravenclaw Blue, Hufflepuff Gold) */}
          <path d="M-110,-55 L-5,-55 L-5,-5 L-110,-5 Z" fill="#8B1E1E" opacity="0.75" />
          <path d="M5,-55 L110,-55 L110,-5 L5,-5 Z" fill="#1B4D3E" opacity="0.75" />
          <path d="M-110,5 L-5,5 L-5,65 C-40,50 -80,25 -110,5 Z" fill="#1E3A8A" opacity="0.75" />
          <path d="M5,5 L110,5 C80,25 40,50 5,65 Z" fill="#B45309" opacity="0.75" />

          {/* Center 'H' Initial */}
          <text x="0" y="15" textAnchor="middle" fill="#FFEAA7" fontSize="42" fontFamily="serif" fontWeight="bold">H</text>

          {/* Golden Floor Glow */}
          <circle cx="0" cy="20" r="140" fill="#F5CE62" fillOpacity="0.12" />
        </g>
      </svg>

      {/* 3. Volumetric Courtyard Fog & Radiance */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 55%, rgba(245, 158, 11, 0.14) 0%, transparent 45%), radial-gradient(ellipse at 8% 40%, rgba(99, 102, 241, 0.12) 0%, transparent 40%)',
        }}
      />
    </div>
  );
};
