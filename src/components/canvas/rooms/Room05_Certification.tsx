import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpatialText as Text } from '../common/SpatialText';
import * as THREE from 'three';
import { useScene } from '../../../context/SceneContext';
import { DossierContent } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';

export const Room05_Certification: React.FC = () => {
  const { openOverlay, exitRoom, currentRoomId, mode } = useScene();
  const isInside = (mode === 'room' || mode === 'transitioning') && currentRoomId === 'room-certification';

  const ROOM_X = -14;
  const ROOM_Z = -120;

  const prismRef = useRef<THREE.Mesh>(null);
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

  useFrame((_, delta) => {
    if (prismRef.current) {
      prismRef.current.rotation.y += delta * 0.4;
      prismRef.current.position.y = 1.8 + Math.sin(Date.now() * 0.002) * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
      ringRef.current.rotation.x += delta * 0.15;
    }
  });

  const openCertDossier = () => {
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
        'Demonstrated architectural rigor in production AI systems',
      ],
      technologies: ['Claude 3.5 Sonnet / Haiku / Opus', 'Anthropic API', 'Prompt Caching', 'Tool Use', 'Agentic Patterns', 'LangChain', 'Spring Boot'],
      diagramType: 'claude_cert',
    };
    openOverlay(dossier);
  };

  return (
    <group position={[ROOM_X, 0, ROOM_Z]}>
      {/* 1. Floor & Ceiling */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[14, 0.1, 12]} />
        <meshStandardMaterial color="#120A04" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[14, 0.2, 12]} />
        <meshStandardMaterial color="#0A0602" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 2. Perimeter Sanctuary Walls */}
      <mesh position={[0, 2.2, -6]}>
        <boxGeometry args={[14, 4.4, 0.3]} />
        <meshStandardMaterial color="#1A1008" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[-7, 2.2, 0]}>
        <boxGeometry args={[0.3, 4.4, 12]} />
        <meshStandardMaterial color="#1A1008" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.2, 6]}>
        <boxGeometry args={[14, 4.4, 0.3]} />
        <meshStandardMaterial color="#1A1008" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* 3. Room Header */}
      <group position={[0, 3.8, -5.7]}>
        <Text fontSize={0.28} color="#F59E0B" anchorX="center">
          CLAUDE CERTIFIED ARCHITECT MONUMENT // SECTOR 05
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.14} color="#FDE68A" anchorX="center">
          ANTHROPIC FOUNDATIONS: AGENTIC ARCHITECTURES & PRODUCTION RIGOR
        </Text>
      </group>

      {/* 4. Central Monument Plinth */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[1.6, 2.0, 1.0, 8]} />
        <meshStandardMaterial color="#1C140C" metalness={0.8} roughness={0.25} />
      </mesh>

      {/* Stepped Golden Pedestal Collar */}
      <mesh position={[0, 1.05, 0]}>
        <cylinderGeometry args={[1.2, 1.4, 0.1, 8]} />
        <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Floating Obsidian Prism with Embedded Claude Certified Glyph */}
      <mesh
        ref={prismRef}
        position={[0, 1.8, 0]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openCertDossier();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <octahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial
          color="#0B0907"
          metalness={0.9}
          roughness={0.1}
          emissive="#F59E0B"
          emissiveIntensity={hovered ? 0.6 : 0.25}
        />
      </mesh>

      {/* Orbiting Crystalline Halo Ring */}
      <mesh ref={ringRef} position={[0, 1.8, 0]}>
        <torusGeometry args={[1.6, 0.03, 16, 64]} />
        <meshBasicMaterial color="#FBBF24" transparent opacity={0.8} />
      </mesh>

      {/* Floating Inscription Text */}
      <group position={[0, 2.8, 0]}>
        <Text fontSize={0.18} color="#F59E0B" anchorX="center">
          CLAUDE CERTIFIED ARCHITECT
        </Text>
        <Text position={[0, -0.22, 0]} fontSize={0.12} color="#FFFFFF" anchorX="center">
          FOUNDATIONS CREDENTIAL
        </Text>
        <Text position={[0, -0.42, 0]} fontSize={0.09} color="#FDE68A" anchorX="center">
          ▶ CLICK ARTIFACT TO VERIFY ARCHITECTURAL PROOF ◀
        </Text>
      </group>

      {/* 5. Four Orbiting Architectural Pillar Tablets */}
      {/* Pillar 1: Context Engineering */}
      <group position={[-3.5, 1.4, -1.8]} rotation={[0, 0.3, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 1.8, 0.1]} />
          <meshStandardMaterial color="#1A1108" emissive="#F59E0B" emissiveIntensity={0.15} />
        </mesh>
        <Text position={[0, 0.6, 0.06]} fontSize={0.11} color="#F59E0B" anchorX="center">
          PILLAR I
        </Text>
        <Text position={[0, 0.35, 0.06]} fontSize={0.09} color="#FFFFFF" anchorX="center">
          CONTEXT ARCHITECTURE
        </Text>
        <Text position={[0, 0.05, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          Prompt Caching
        </Text>
        <Text position={[0, -0.15, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          Dynamic Context Reduction
        </Text>
        <Text position={[0, -0.35, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          Precision Needle Retrieval
        </Text>
      </group>

      {/* Pillar 2: Deterministic Tools */}
      <group position={[-1.8, 1.4, -3.8]} rotation={[0, 0.1, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 1.8, 0.1]} />
          <meshStandardMaterial color="#1A1108" emissive="#F59E0B" emissiveIntensity={0.15} />
        </mesh>
        <Text position={[0, 0.6, 0.06]} fontSize={0.11} color="#F59E0B" anchorX="center">
          PILLAR II
        </Text>
        <Text position={[0, 0.35, 0.06]} fontSize={0.09} color="#FFFFFF" anchorX="center">
          DETERMINISTIC TOOLS
        </Text>
        <Text position={[0, 0.05, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          Strict JSON Schemas
        </Text>
        <Text position={[0, -0.15, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          Multi-Step Tool Loops
        </Text>
        <Text position={[0, -0.35, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          Automated Recovery Retries
        </Text>
      </group>

      {/* Pillar 3: Agentic Workflows */}
      <group position={[1.8, 1.4, -3.8]} rotation={[0, -0.1, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 1.8, 0.1]} />
          <meshStandardMaterial color="#1A1108" emissive="#F59E0B" emissiveIntensity={0.15} />
        </mesh>
        <Text position={[0, 0.6, 0.06]} fontSize={0.11} color="#F59E0B" anchorX="center">
          PILLAR III
        </Text>
        <Text position={[0, 0.35, 0.06]} fontSize={0.09} color="#FFFFFF" anchorX="center">
          AGENTIC WORKFLOWS
        </Text>
        <Text position={[0, 0.05, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          Coordinator-Worker Swarms
        </Text>
        <Text position={[0, -0.15, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          Subagent Isolation
        </Text>
        <Text position={[0, -0.35, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          State Reducer Synthesis
        </Text>
      </group>

      {/* Pillar 4: Production Resilience */}
      <group position={[3.5, 1.4, -1.8]} rotation={[0, -0.3, 0]}>
        <mesh>
          <boxGeometry args={[1.6, 1.8, 0.1]} />
          <meshStandardMaterial color="#1A1108" emissive="#F59E0B" emissiveIntensity={0.15} />
        </mesh>
        <Text position={[0, 0.6, 0.06]} fontSize={0.11} color="#F59E0B" anchorX="center">
          PILLAR IV
        </Text>
        <Text position={[0, 0.35, 0.06]} fontSize={0.09} color="#FFFFFF" anchorX="center">
          PRODUCTION RESILIENCE
        </Text>
        <Text position={[0, 0.05, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          Quota & Rate Backoff
        </Text>
        <Text position={[0, -0.15, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          Multi-Provider Failovers
        </Text>
        <Text position={[0, -0.35, 0.06]} fontSize={0.065} color="#D1D5DB" anchorX="center">
          Enterprise Security Walls
        </Text>
      </group>

      {/* 6. Exit Threshold Gateway on the right */}
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
          <meshBasicMaterial color="#F59E0B" transparent opacity={0.18} />
        </mesh>
        <Text position={[0, 0.4, 0.05]} fontSize={0.16} color="#F59E0B" anchorX="center">
          [ ← RETURN TO CORRIDOR ]
        </Text>
        <Text position={[0, 0.1, 0.05]} fontSize={0.11} color="#FDE68A" anchorX="center">
          (OR PRESS ESCAPE)
        </Text>
      </group>

      <pointLight position={[0, 3.2, 0]} color="#F59E0B" distance={15} intensity={isInside ? 4 : 1.2} />
      <directionalLight position={[-3, 6, 2]} color="#FEF3C7" intensity={0.5} />
    </group>
  );
};
