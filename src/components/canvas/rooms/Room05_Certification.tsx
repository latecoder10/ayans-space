import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpatialText as Text } from '../common/SpatialText';
import * as THREE from 'three';
import { useScene } from '../../../context/SceneContext';
import { DossierContent } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';
import { FloatingCandle, WallTorch } from '../common/HogwartsLighting';

export const Room05_Certification: React.FC = () => {
  const { openOverlay } = useScene();

  const ROOM_X = -10;
  const ROOM_Z = -120;

  const crestRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
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

  useFrame(({ clock }, delta) => {
    if (crestRef.current) {
      crestRef.current.rotation.y += delta * 0.4;
      crestRef.current.position.y = 1.8 + Math.sin(clock.getElapsedTime() * 1.5) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
    }
  });

  const openCertDossier = () => {
    soundEngine.playAlohomora();
    const dossier: DossierContent = {
      id: 'claude-architect-cert',
      title: 'Claude Certified Architect: Foundations',
      subtitle: 'Official credential validating enterprise agentic design, context engineering & LLM orchestration',
      category: 'ENTERPRISE AI CREDENTIAL',
      badge: 'Certified Professional',
      clientOrProduct: 'Anthropic Certification Program',
      overview:
        'Demonstrated foundational and architectural competency in designing, deploying, and managing enterprise systems built on Anthropic Claude models. Covers advanced context management, deterministic tool use, autonomous subagent patterns, and high-availability production architectures.',
      technicalHighlights: [
        'Advanced Context Management: Precision system prompt engineering, prompt caching breakpoints, dynamic context reduction, and long-form retrieval optimization.',
        'Deterministic Tool Orchestration: Strict JSON Schema tool definitions, multi-step tool call loops, error-handling validation retries, and output structuring.',
        'Autonomous Multi-Agent Systems: Coordinator-worker topologies, parallel worker task distribution, state reconciliation, and subagent evaluation frameworks.',
        'Enterprise Reliability & Security: Safe API key management, multi-provider quota failover, rate limit backoff strategies, and prompt injection defense barriers.',
      ],
      metricsOrDeliverables: [
        'Certified Foundations Credential achieved',
        'Direct application in QodeAI SDLC platform and OCR pipeline',
        'Enterprise-grade production LLM security standards',
      ],
      technologies: ['Anthropic Claude 3.5 Sonnet', 'Prompt Caching', 'Tool Use', 'TypeScript', 'Python', 'LLM Security'],
      diagramType: 'llm_orchestration',
      credentialUrl: 'https://www.anthropic.com',
      repoUrl: 'https://github.com/latecoder10',
    };
    openOverlay(dossier);
  };

  return (
    <group position={[ROOM_X, 0, ROOM_Z]}>
      {/* Dedicated Chamber Torchlight & Ambient Radiance */}
      <pointLight position={[0, 3.2, 0]} color="#FFE29A" distance={18} intensity={2.2} />

      {/* 1. Stone Chamber Floor */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[12, 0.1, 12]} />
        <meshStandardMaterial color="#29241E" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* 2. Gothic Stone Walls */}
      <mesh position={[-6, 2.5, 0]}>
        <boxGeometry args={[0.3, 5.0, 12]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>
      <mesh position={[0, 2.5, -6]}>
        <boxGeometry args={[12, 5.0, 0.3]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>
      <mesh position={[0, 2.5, 6]}>
        <boxGeometry args={[12, 5.0, 0.3]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>
      {/* Entry Arch Wall (X = 6) */}
      <mesh position={[6, 2.5, -3.5]}>
        <boxGeometry args={[0.3, 5.0, 5]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>
      <mesh position={[6, 2.5, 3.5]}>
        <boxGeometry args={[0.3, 5.0, 5]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>

      {/* 3. Ceiling */}
      <mesh position={[0, 4.8, 0]}>
        <boxGeometry args={[12, 0.3, 12]} />
        <meshStandardMaterial color="#221C16" roughness={0.9} />
      </mesh>

      {/* 4. Floating Candles & Torches */}
      <FloatingCandle position={[-2, 3.4, -2]} bobOffset={0.8} />
      <FloatingCandle position={[2, 3.5, -2]} bobOffset={2.0} />
      <FloatingCandle position={[-2, 3.3, 2]} bobOffset={3.2} />
      <FloatingCandle position={[2, 3.6, 2]} bobOffset={4.4} />
      <WallTorch position={[-5.8, 2.2, -3]} rotationY={Math.PI / 2} />
      <WallTorch position={[-5.8, 2.2, 3]} rotationY={Math.PI / 2} />

      {/* 5. Chamber Title Banner on Back Wall directly facing Entry Arch */}
      <group position={[-5.8, 3.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[7.2, 0.85]} />
          <meshStandardMaterial color="#1E140C" roughness={0.7} metalness={0.4} />
        </mesh>
        <Text position={[0, 0.14, 0.02]} fontSize={0.24} color="#FDE047" anchorX="center">
          SANCTUM OF ANTHROPIC MASTERY
        </Text>
        <Text position={[0, -0.15, 0.02]} fontSize={0.12} color="#E2E8F0" anchorX="center">
          Claude Certified Architect: Foundations · Context Engineering · Agentic Tool Use
        </Text>
      </group>

      {/* 6. Central Golden Anthropic Crest Monolith (Majestic Backdrop) */}
      <group position={[-2.8, 0, 0]}>
        {/* Tiered Stone & Gold Plinth Base */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[1.5, 1.8, 0.5, 8]} />
          <meshStandardMaterial color="#2B1A10" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.55, 0]}>
          <cylinderGeometry args={[1.2, 1.35, 0.15, 8]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.3} />
        </mesh>

        {/* Floating Rotating Golden Medallion Crest */}
        <group
          ref={crestRef}
          position={[0, 1.8, 0]}
          onClick={(e: { stopPropagation: () => void; delta?: number }) => {
            if (e.delta && e.delta > 8) return;
            e.stopPropagation();
            openCertDossier();
          }}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          {/* Heavy Golden Seal Medallion */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.9, 0.9, 0.12, 32]} />
            <meshStandardMaterial
              color="#D4AF37"
              metalness={0.9}
              roughness={0.2}
              emissive="#F59E0B"
              emissiveIntensity={hovered ? 0.4 : 0.1}
            />
          </mesh>

          {/* Inner Dark Velvet Insert */}
          <mesh position={[0, 0, 0.065]}>
            <circleGeometry args={[0.78, 32]} />
            <meshStandardMaterial color="#1E140C" roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, -0.065]} rotation={[0, Math.PI, 0]}>
            <circleGeometry args={[0.78, 32]} />
            <meshStandardMaterial color="#1E140C" roughness={0.6} />
          </mesh>

          {/* Anthropic / Claude Spark Symbol */}
          <Text position={[0, 0.1, 0.075]} fontSize={0.16} color="#FDE047" anchorX="center" anchorY="middle">
            ✦ CLAUDE ✦
          </Text>
          <Text position={[0, -0.15, 0.075]} fontSize={0.09} color="#FFFFFF" anchorX="center" anchorY="middle">
            CERTIFIED ARCHITECT
          </Text>

          {/* Opposite side text */}
          <Text position={[0, 0.1, -0.075]} rotation={[0, Math.PI, 0]} fontSize={0.16} color="#FDE047" anchorX="center" anchorY="middle">
            ✦ ANTHROPIC ✦
          </Text>
          <Text position={[0, -0.15, -0.075]} rotation={[0, Math.PI, 0]} fontSize={0.09} color="#FFFFFF" anchorX="center" anchorY="middle">
            FOUNDATIONS
          </Text>
        </group>

        {/* Rotating Luminous Runic Orbit Ring */}
        <mesh ref={ringRef} position={[0, 1.8, 0]} rotation={[-Math.PI / 4, 0, 0]}>
          <ringGeometry args={[1.3, 1.38, 32]} />
          <meshBasicMaterial color="#FDE047" side={THREE.DoubleSide} />
        </mesh>

        <pointLight position={[0, 2.0, 0]} color="#FDE047" distance={7} intensity={2.6} />
      </group>

      {/* 7. Grimoire Pedestal with Credential Details (Aligned directly in front of door facing user) */}
      <group
        position={[-0.8, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openCertDossier();
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.45, 0.6, 1.0, 8]} />
          <meshStandardMaterial color="#2B1A10" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.4, 0]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[1.8, 1.0, 0.08]} />
          <meshStandardMaterial color="#1E140C" emissive="#D4AF37" emissiveIntensity={hovered ? 0.35 : 0.05} />
        </mesh>
        <mesh position={[0, 1.4, 0.045]} rotation={[-0.25, 0, 0]}>
          <planeGeometry args={[1.7, 0.9]} />
          <meshStandardMaterial color="#F7F1E5" roughness={0.9} />
        </mesh>
        <Text position={[0, 1.66, 0.1]} fontSize={0.085} color="#854D0E" anchorX="center">
          OFFICIAL VERIFIED CREDENTIAL
        </Text>
        <Text position={[0, 1.48, 0.1]} fontSize={0.065} color="#1E293B" anchorX="center">
          Issued by Anthropic · Verified AI Architect
        </Text>
        <Text position={[0, 1.25, 0.1]} fontSize={0.065} color="#B45309" anchorX="center">
          {hovered ? '✦ CLICK TO UNSEAL FULL DOSSIER ✦' : 'Click to Inspect Syllabus & Deliverables'}
        </Text>
      </group>
    </group>
  );
};
