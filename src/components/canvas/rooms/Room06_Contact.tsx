import React, { useState } from 'react';
import { SpatialText as Text } from '../common/SpatialText';
import { useScene } from '../../../context/SceneContext';
import { soundEngine } from '../../../utils/synthesizer';

interface PlinthProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  handle: string;
  actionText: string;
  color: string;
  onClick: () => void;
}

const ContactPlinth: React.FC<PlinthProps> = ({
  position,
  rotation = [0, 0, 0],
  title,
  handle,
  actionText,
  color,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
    soundEngine.playHover();
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={(e: { stopPropagation: () => void; delta?: number }) => {
        if (e.delta && e.delta > 8) return;
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Heavy Carbon Plinth Base */}
      <mesh position={[0, 0.7, 0]}>
        <boxGeometry args={[2.2, 1.4, 0.4]} />
        <meshStandardMaterial
          color="#0F172A"
          metalness={0.4}
          roughness={0.4}
          emissive={color}
          emissiveIntensity={hovered ? 0.2 : 0.04}
        />
      </mesh>

      {/* Front Inset Display Screen */}
      <mesh position={[0, 0.7, 0.21]}>
        <planeGeometry args={[2.0, 1.2]} />
        <meshStandardMaterial
          color="#060C18"
          metalness={0.6}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 0.35 : 0.1}
        />
      </mesh>

      {/* Top Illuminated Accent Bar */}
      <mesh position={[0, 1.38, 0.22]}>
        <planeGeometry args={[2.0, 0.05]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Plinth Content Text */}
      <Text
        position={[0, 1.05, 0.24]}
        fontSize={0.18}
        color={color}
        anchorX="center"
        renderOrder={20}
        material-depthTest={false}
      >
        {title}
      </Text>
      <Text
        position={[0, 0.72, 0.24]}
        fontSize={0.12}
        color="#FFFFFF"
        anchorX="center"
        renderOrder={20}
        material-depthTest={false}
      >
        {handle}
      </Text>
      <Text
        position={[0, 0.38, 0.24]}
        fontSize={0.10}
        color={hovered ? color : '#94A3B8'}
        anchorX="center"
        renderOrder={20}
        material-depthTest={false}
      >
        {hovered ? `▶ ${actionText} ◀` : actionText}
      </Text>

      <pointLight position={[0, 1.2, 0.8]} color={color} distance={6} intensity={hovered ? 3.5 : 1.8} />
    </group>
  );
};

export const Room06_Contact: React.FC = () => {
  const { setTargetZ, updateCameraZ } = useScene();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    soundEngine.playNodePulse(1200);
    navigator.clipboard.writeText('ayanpal104@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleOpenLink = (url: string) => {
    soundEngine.playClick(900);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleReturnToCorridor = () => {
    soundEngine.playClick(800);
    setTargetZ(-120);
    updateCameraZ(-120);
  };

  return (
    <group position={[0, 0, -155]}>
      {/* 1. Expansive Cantilevered Observation Deck Floor */}
      <mesh position={[0, -0.05, -15]}>
        <boxGeometry args={[18, 0.1, 30]} />
        <meshStandardMaterial color="#080D18" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* 2. Glass / Titanium Edge Guardrails */}
      {/* Left Rail */}
      <mesh position={[-8.9, 0.5, -15]}>
        <boxGeometry args={[0.1, 1.0, 30]} />
        <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Right Rail */}
      <mesh position={[8.9, 0.5, -15]}>
        <boxGeometry args={[0.1, 1.0, 30]} />
        <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Horizon Far Rail */}
      <mesh position={[0, 0.5, -29.9]}>
        <boxGeometry args={[18, 1.0, 0.1]} />
        <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 3. Horizon Atmosphere Dome */}
      <mesh position={[0, 10, -50]}>
        <planeGeometry args={[100, 40]} />
        <meshBasicMaterial color="#0A0F1E" />
      </mesh>

      {/* Subtle Twilight Horizon Light Beam */}
      <mesh position={[0, 3, -45]}>
        <planeGeometry args={[80, 8]} />
        <meshBasicMaterial color="#38BDF8" transparent opacity={0.25} />
      </mesh>

      {/* 4. Platform Architectural Header (Positioned right above plinths in view) */}
      <group position={[0, 2.7, -14]}>
        <Text
          fontSize={0.30}
          color="#F43F5E"
          anchorX="center"
          renderOrder={20}
          material-depthTest={false}
        >
          CONTACT HORIZON // TERMINAL PLATFORM
        </Text>
        <Text
          position={[0, -0.34, 0]}
          fontSize={0.14}
          color="#FDA4AF"
          anchorX="center"
          renderOrder={20}
          material-depthTest={false}
        >
          DIRECT PROFESSIONAL CHANNELS & SYSTEM COLLABORATION
        </Text>
      </group>

      {/* 5. Three Sleek Communication Plinths angled towards observer */}
      <ContactPlinth
        position={[-3.6, 0, -12.5]}
        rotation={[0, 0.25, 0]}
        title="GITHUB"
        handle="github.com/AyanPal10"
        actionText="OPEN REPOSITORIES"
        color="#38BDF8"
        onClick={() => handleOpenLink('https://github.com/AyanPal10')}
      />

      <ContactPlinth
        position={[0, 0, -13.5]}
        rotation={[0, 0, 0]}
        title="DIRECT EMAIL"
        handle="ayanpal104@gmail.com"
        actionText={copiedEmail ? "COPIED TO CLIPBOARD!" : "CLICK TO COPY EMAIL"}
        color={copiedEmail ? "#10B981" : "#F43F5E"}
        onClick={handleCopyEmail}
      />

      <ContactPlinth
        position={[3.6, 0, -12.5]}
        rotation={[0, -0.25, 0]}
        title="LINKEDIN"
        handle="linkedin.com/in/ayan-pal"
        actionText="CONNECT ON LINKEDIN"
        color="#60A5FA"
        onClick={() => handleOpenLink('https://www.linkedin.com/in/ayan-pal')}
      />

      {/* 6. Return Back to Facility Guide */}
      <group
        position={[0, 1.2, -4]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          handleReturnToCorridor();
        }}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
          soundEngine.playHover();
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'auto';
        }}
      >
        <mesh>
          <planeGeometry args={[4.5, 0.6]} />
          <meshBasicMaterial color="#0F172A" transparent opacity={0.85} />
        </mesh>
        <Text position={[0, 0, 0.01]} fontSize={0.15} color="#00F2FE" anchorX="center">
          ▲ RETURN TO FACILITY CORRIDOR ▲
        </Text>
      </group>

      <pointLight position={[0, 4.5, -14]} color="#FB7185" distance={25} intensity={3} />
      <pointLight position={[-4, 3, -12]} color="#38BDF8" distance={15} intensity={2} />
      <pointLight position={[4, 3, -12]} color="#60A5FA" distance={15} intensity={2} />
      <directionalLight position={[0, 8, -10]} color="#FFE4E6" intensity={0.5} />
    </group>
  );
};
