import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpatialText as Text } from '../common/SpatialText';
import * as THREE from 'three';
import { useScene } from '../../../context/SceneContext';
import { CASE_STUDIES } from '../../../data/caseStudies';
import { DossierContent } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';

interface ConsoleItemProps {
  position: [number, number, number];
  title: string;
  subtitle: string;
  category: string;
  color: string;
  metrics: string;
  onClick: () => void;
}

const ConsoleItem: React.FC<ConsoleItemProps> = ({
  position,
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
      ringRef.current.rotation.z += delta * (hovered ? 2.5 : 0.8);
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
    <group position={position}>
      {/* Heavy Industrial Pedestal Base */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.55, 0.7, 0.9, 8]} />
        <meshStandardMaterial color="#0B1320" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Rotating Luminous Ring */}
      <mesh ref={ringRef} position={[0, 0.92, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.6, 0.65, 32]} />
        <meshBasicMaterial color={color} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating Holographic Console Screen */}
      <group
        position={[0, 1.45, 0]}
        rotation={[-0.25, 0, 0]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {/* Terminal Glass Slab */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.5, 0.9, 0.04]} />
          <meshStandardMaterial
            color="#050C18"
            metalness={0.9}
            roughness={0.1}
            emissive={color}
            emissiveIntensity={hovered ? 0.4 : 0.1}
          />
        </mesh>

        {/* Terminal Text */}
        <Text position={[0, 0.3, 0.03]} fontSize={0.07} color={color} anchorX="center">
          {`[ ${category} ]`}
        </Text>
        <Text position={[0, 0.12, 0.03]} fontSize={0.11} color="#FFFFFF" anchorX="center">
          {title}
        </Text>
        <Text position={[0, -0.06, 0.03]} fontSize={0.065} color="#94A3B8" anchorX="center">
          {subtitle}
        </Text>
        <Text position={[0, -0.22, 0.03]} fontSize={0.065} color="#38BDF8" anchorX="center">
          {`METRIC: ${metrics}`}
        </Text>

        {/* Interactive Inspection Badge */}
        {hovered && (
          <Text position={[0, -0.34, 0.03]} fontSize={0.065} color="#00F2FE" anchorX="center">
            ▶ CLICK TO INSPECT DOSSIER ◀
          </Text>
        )}
      </group>

      {/* Subtle Terminal Glow */}
      <pointLight position={[0, 1.4, 0.4]} color={color} distance={4} intensity={hovered ? 2.5 : 1} />
    </group>
  );
};

export const Room01_Systems: React.FC = () => {
  const { openOverlay, exitRoom, currentRoomId, mode } = useScene();
  const isInside = (mode === 'room' || mode === 'transitioning') && currentRoomId === 'room-systems';

  // Base coordinates for Room 01: X = -14, Z = 0
  const ROOM_X = -14;
  const ROOM_Z = 0;

  const handleOpenCaseStudy = (id: string) => {
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
    };

    openOverlay(dossier);
  };

  return (
    <group position={[ROOM_X, 0, ROOM_Z]}>
      {/* Room Bounds: 14m x 12m, Height: 4.5m */}
      {/* 1. Floor */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[14, 0.1, 12]} />
        <meshStandardMaterial color="#060A12" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* 2. Ceiling */}
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[14, 0.2, 12]} />
        <meshStandardMaterial color="#04070D" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 3. Outer Walls (Back, Left, Front) */}
      {/* Back Wall */}
      <mesh position={[0, 2.2, -6]}>
        <boxGeometry args={[14, 4.4, 0.3]} />
        <meshStandardMaterial color="#0A0F1A" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Left Wall */}
      <mesh position={[-7, 2.2, 0]}>
        <boxGeometry args={[0.3, 4.4, 12]} />
        <meshStandardMaterial color="#0A0F1A" metalness={0.7} roughness={0.4} />
      </mesh>
      {/* Front Wall */}
      <mesh position={[0, 2.2, 6]}>
        <boxGeometry args={[14, 4.4, 0.3]} />
        <meshStandardMaterial color="#0A0F1A" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* 4. Server Racks along the back wall with blinking status lights */}
      {[-5, -3, -1, 1, 3, 5].map((x) => (
        <group key={`rack-${x}`} position={[x, 1.8, -5.5]}>
          <mesh>
            <boxGeometry args={[1.5, 3.4, 0.8]} />
            <meshStandardMaterial color="#070C15" metalness={0.9} roughness={0.2} />
          </mesh>
          {/* Server LED indicators */}
          <mesh position={[0, 0.6, 0.41]}>
            <planeGeometry args={[1.2, 0.04]} />
            <meshBasicMaterial color="#00F2FE" />
          </mesh>
          <mesh position={[0, 0.2, 0.41]}>
            <planeGeometry args={[1.2, 0.04]} />
            <meshBasicMaterial color="#3B82F6" />
          </mesh>
          <mesh position={[0, -0.4, 0.41]}>
            <planeGeometry args={[1.2, 0.04]} />
            <meshBasicMaterial color="#10B981" />
          </mesh>
        </group>
      ))}

      {/* 5. Room Header Plaque */}
      <group position={[0, 3.8, -5.7]}>
        <Text fontSize={0.28} color="#00F2FE" anchorX="center">
          SYSTEMS & CORE PROJECTS ARCHIVE // SECTOR 01
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.14} color="#94A3B8" anchorX="center">
          INTERACTIVE ARCHITECTURAL DOSSIERS (CLICK ANY TERMINAL TO INSPECT)
        </Text>
      </group>

      {/* 6. Four Interactive Project Consoles arranged in an inspection arc */}
      <ConsoleItem
        position={[-3.8, 0, -1.5]}
        title="QODE AI"
        subtitle="SDLC AUTOMATION ENGINE"
        category="AI SYSTEMS"
        color="#00F2FE"
        metrics="99.9% LLM CONTINUITY"
        onClick={() => handleOpenCaseStudy('qodeai')}
      />

      <ConsoleItem
        position={[-1.3, 0, -2.5]}
        title="ROCHE DICOM"
        subtitle="MULTI-CLOUD MEDICAL PIPELINE"
        category="DISTRIBUTED SCALE"
        color="#38BDF8"
        metrics="3 CLOUDS / HIGH-CONCURRENCY"
        onClick={() => handleOpenCaseStudy('roche-dicom')}
      />

      <ConsoleItem
        position={[1.3, 0, -2.5]}
        title="LUMBERFI"
        subtitle="ENTERPRISE WORKFORCE SAAS"
        category="FULL STACK & MOBILE"
        color="#3B82F6"
        metrics="ONBOARDING + TIMESHEET APP"
        onClick={() => handleOpenCaseStudy('lumberfi')}
      />

      <ConsoleItem
        position={[3.8, 0, -1.5]}
        title="SOCIAL HUB"
        subtitle="EVENT-DRIVEN STREAMING"
        category="BACKEND ARCHITECTURE"
        color="#818CF8"
        metrics="WEBSOCKET / REAL-TIME CHAT"
        onClick={() => handleOpenCaseStudy('social-media')}
      />

      {/* 7. Exit Threshold Gateway on the right (leads back to corridor) */}
      <group position={[6.6, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh
          onClick={(e: { stopPropagation: () => void; delta?: number }) => {
            if (e.delta && e.delta > 8) return;
            e.stopPropagation();
            exitRoom();
          }}
          onPointerOver={() => {
            document.body.style.cursor = 'pointer';
            soundEngine.playHover();
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'auto';
          }}
        >
          <planeGeometry args={[3, 2.8]} />
          <meshBasicMaterial color="#00F2FE" transparent opacity={0.18} />
        </mesh>
        <Text position={[0, 0.4, 0.05]} fontSize={0.16} color="#00F2FE" anchorX="center">
          [ ← RETURN TO CORRIDOR ]
        </Text>
        <Text position={[0, 0.1, 0.05]} fontSize={0.11} color="#94A3B8" anchorX="center">
          (OR PRESS ESCAPE)
        </Text>
      </group>

      {/* Room Atmosphere Lighting */}
      <pointLight position={[0, 3.5, 0]} color="#00F2FE" distance={15} intensity={isInside ? 3 : 0.8} />
      <directionalLight position={[-4, 6, 2]} color="#E2E8F0" intensity={0.4} />
    </group>
  );
};
