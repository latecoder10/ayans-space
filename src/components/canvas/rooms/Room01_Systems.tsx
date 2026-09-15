import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpatialText as Text } from '../common/SpatialText';
import * as THREE from 'three';
import { useScene } from '../../../context/SceneContext';
import { CASE_STUDIES } from '../../../data/caseStudies';
import { DossierContent } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';
import { FloatingCandle, WallTorch } from '../common/HogwartsLighting';

interface GrimoireLecternProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  subtitle: string;
  category: string;
  color: string;
  metrics: string;
  onClick: (screenPos?: { x: number; y: number }) => void;
}

const GrimoireLectern: React.FC<GrimoireLecternProps> = ({
  position,
  rotation,
  title,
  subtitle,
  category,
  color,
  metrics,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (hovered ? 2.0 : 0.6);
    }
  });

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
    <group position={position} rotation={rotation || [0, 0, 0]}>
      {/* Heavy Carved Dark Walnut & Stone Pedestal Base */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.55, 0.72, 0.9, 8]} />
        <meshStandardMaterial color="#2B1A10" roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Gold Trim Ring on Pedestal */}
      <mesh position={[0, 0.9, 0]}>
        <cylinderGeometry args={[0.58, 0.58, 0.06, 12]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Rotating Luminous Runestone Ring */}
      <mesh ref={ringRef} position={[0, 0.95, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.62, 0.68, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Illuminated Grimoire Book / Parchment Slab */}
      <group
        position={[0, 1.45, 0]}
        rotation={[-0.28, 0, 0]}
        onClick={(e: { stopPropagation: () => void; delta?: number; clientX?: number; clientY?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          soundEngine.playAlohomora();
          onClick(e.clientX && e.clientY ? { x: e.clientX, y: e.clientY } : undefined);
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Leather-Bound Book Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.55, 0.95, 0.08]} />
          <meshStandardMaterial
            color="#1F140A"
            roughness={0.7}
            metalness={0.3}
            emissive={color}
            emissiveIntensity={hovered ? 0.35 : 0.08}
          />
        </mesh>

        {/* Parchment Inner Page */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[1.45, 0.85]} />
          <meshStandardMaterial color="#F7F1E5" roughness={0.9} />
        </mesh>

        {/* Ornate Gold Leaf Border Trim */}
        <mesh position={[0, 0, 0.046]}>
          <planeGeometry args={[1.48, 0.88]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.4} />
        </mesh>

        {/* Grimoire Inscribed Text */}
        <Text position={[0, 0.28, 0.05]} fontSize={0.07} color="#8E6827" anchorX="center">
          {`✦ ${category} ✦`}
        </Text>
        <Text position={[0, 0.12, 0.05]} fontSize={0.105} color="#1A1A1A" anchorX="center">
          {title}
        </Text>
        <Text position={[0, -0.05, 0.05]} fontSize={0.065} color="#4A4A4A" anchorX="center">
          {subtitle}
        </Text>
        <Text position={[0, -0.22, 0.05]} fontSize={0.065} color="#854D0E" anchorX="center">
          {`KEY IMPACT: ${metrics}`}
        </Text>

        {/* Interactive Prompt */}
        {hovered && (
          <Text position={[0, -0.34, 0.05]} fontSize={0.07} color="#B45309" anchorX="center">
            ▶ UNSEAL GRIMOIRE DOSSIER ◀
          </Text>
        )}
      </group>

      {/* Warm Ambient Glow */}
      <pointLight position={[0, 1.4, 0.4]} color={color} distance={4} intensity={hovered ? 2.5 : 1} />
    </group>
  );
};

export const Room01_Systems: React.FC = () => {
  const { openOverlay } = useScene();

  // Base coordinates for Room 01: X = -10, Z = 0
  const ROOM_X = -10;
  const ROOM_Z = 0;

  const handleOpenCaseStudy = (id: string, screenPos?: { x: number; y: number }) => {
    const cs = CASE_STUDIES.find((c) => c.id === id);
    if (!cs) return;

    const dossier: DossierContent = {
      id: cs.id,
      title: cs.title,
      subtitle: cs.subtitle,
      badge: cs.timeline,
      category: cs.category,
      timeline: cs.timeline,
      clientOrProduct: cs.clientOrProduct,
      overview: cs.summary,
      technicalHighlights: cs.architectureHighlights,
      metricsOrDeliverables: cs.metricsOrScope,
      technologies: cs.technologies,
      diagramType: cs.diagramType,
      repoUrl: cs.repoUrl,
      liveUrl: cs.liveUrl,
      credentialUrl: cs.credentialUrl,
    };
    openOverlay(dossier, screenPos);
  };

  return (
    <group position={[ROOM_X, 0, ROOM_Z]}>
      {/* Dedicated Chamber Torchlight & Ambient Radiance */}
      <pointLight position={[0, 3.2, 0]} color="#FFE29A" distance={18} intensity={2.2} />

      {/* 1. Stone Castle Chamber Flagstone Floor */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[12, 0.1, 12]} />
        <meshStandardMaterial color="#29241E" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* 2. Gothic Stone Chamber Walls */}
      {/* Back Wall (X = -6) */}
      <mesh position={[-6, 2.5, 0]}>
        <boxGeometry args={[0.3, 5.0, 12]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>
      {/* North Wall (Z = -6) */}
      <mesh position={[0, 2.5, -6]}>
        <boxGeometry args={[12, 5.0, 0.3]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>
      {/* South Wall (Z = 6) */}
      <mesh position={[0, 2.5, 6]}>
        <boxGeometry args={[12, 5.0, 0.3]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>
      {/* Front Wall with Entry Arch (X = 6) */}
      <mesh position={[6, 2.5, -3.5]}>
        <boxGeometry args={[0.3, 5.0, 5]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>
      <mesh position={[6, 2.5, 3.5]}>
        <boxGeometry args={[0.3, 5.0, 5]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>

      {/* 3. High Stone Vaulted Ceiling */}
      <mesh position={[0, 4.8, 0]}>
        <boxGeometry args={[12, 0.3, 12]} />
        <meshStandardMaterial color="#221C16" roughness={0.9} />
      </mesh>

      {/* 4. Floating Enchanted Candles */}
      <FloatingCandle position={[-2, 3.4, -2]} bobOffset={0} />
      <FloatingCandle position={[2, 3.5, -2]} bobOffset={1.2} />
      <FloatingCandle position={[-2, 3.3, 2]} bobOffset={2.4} />
      <FloatingCandle position={[2, 3.6, 2]} bobOffset={3.6} />
      <FloatingCandle position={[0, 3.8, 0]} bobOffset={4.8} />

      {/* 5. Wall Torches */}
      <WallTorch position={[-5.8, 2.2, -3]} rotationY={Math.PI / 2} />
      <WallTorch position={[-5.8, 2.2, 3]} rotationY={Math.PI / 2} />
      <WallTorch position={[0, 2.2, -5.8]} rotationY={0} />

      {/* 6. Chamber Banner Title on Back Wall directly facing Entry Arch */}
      <group position={[-5.8, 3.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[7.2, 0.85]} />
          <meshStandardMaterial color="#1E140C" roughness={0.7} metalness={0.4} />
        </mesh>
        <Text position={[0, 0.14, 0.02]} fontSize={0.24} color="#FDE047" anchorX="center">
          CHAMBER OF ARITHMANCY & SYSTEMS
        </Text>
        <Text position={[0, -0.15, 0.02]} fontSize={0.12} color="#E2E8F0" anchorX="center">
          Autonomous SDLC Engine · High-Concurrency Microservices · Zero-Downtime Failover
        </Text>
      </group>

      {/* 7. Grimoire Lecterns (The 3 Core Projects Aligned in Front of Door) */}
      {/* Center Flagship Project: QodeAI directly in front of user's eye */}
      <GrimoireLectern
        position={[-2.6, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        title="QodeAI Automation"
        subtitle="Autonomous SDLC Engine"
        category="AI SYSTEMS ARCHITECTURE"
        color="#F59E0B"
        metrics="Zero-Interruption LLM Failover"
        onClick={(pos) => handleOpenCaseStudy('qodeai', pos)}
      />

      {/* Left Project: Real-Time Mesh angled inward */}
      <GrimoireLectern
        position={[-2.2, 0, 2.3]}
        rotation={[0, Math.PI / 2 + 0.32, 0]}
        title="Real-Time Mesh"
        subtitle="Sub-50ms Distributed Pub/Sub"
        category="NETWORK SYSTEMS"
        color="#00F2FE"
        metrics="5,000+ Concurrent Nodes"
        onClick={(pos) => handleOpenCaseStudy('realtime-mesh', pos)}
      />

      {/* Right Project: Workforce SaaS angled inward */}
      <GrimoireLectern
        position={[-2.2, 0, -2.3]}
        rotation={[0, Math.PI / 2 - 0.32, 0]}
        title="Workforce SaaS"
        subtitle="Multi-Tenant SaaS Workflows"
        category="ENTERPRISE SAAS"
        color="#10B981"
        metrics="Biometric & e-Sign Workflows"
        onClick={(pos) => handleOpenCaseStudy('lumberfi', pos)}
      />
    </group>
  );
};
