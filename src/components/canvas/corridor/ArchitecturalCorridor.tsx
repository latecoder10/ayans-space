import React, { useMemo } from 'react';
import { SpatialText as Text } from '../common/SpatialText';
import { SECTOR_BAYS } from '../../../types/spatial';
import { DoorwayBay } from './DoorwayBay';
import { FloatingCandleCluster, WallTorch } from '../common/HogwartsLighting';
import { CorridorPainting } from '../common/CorridorPainting';
import { HouseBanner } from '../common/HouseBanner';
import { useScene } from '../../../context/SceneContext';
import { CASE_STUDIES } from '../../../data/caseStudies';
import { DossierContent } from '../../../types/spatial';

export const ArchitecturalCorridor: React.FC = () => {
  const { openOverlay } = useScene();

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
      repoUrl: cs.repoUrl,
      liveUrl: cs.liveUrl,
      credentialUrl: cs.credentialUrl,
    };
    openOverlay(dossier);
  };

  const handleOpenClaudeCert = () => {
    openOverlay({
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
    });
  };

  const handleOpenOCRPipeline = () => {
    openOverlay({
      id: 'ocr-pipeline',
      title: '100MB Document OCR & Agentic Parsing Pipeline',
      subtitle: 'Multi-stage coordinator-driven subagent spawning for mixed-type enterprise documents',
      category: 'AUTONOMOUS AI WORKFLOWS',
      badge: 'Active POC Delivery',
      clientOrProduct: 'AI Product Engineering',
      overview:
        'Engineered an end-to-end multi-stage agentic document processing architecture designed to ingest mixed-format documents up to 100MB, execute high-accuracy OCR extraction, and dynamically spawn specialized subagent parsers to deliver structured JSON output with minimal latency.',
      technicalHighlights: [
        'Coordinator-Worker Pattern: Central orchestrator agent analyzes document topology and spawns parallel subagents for isolated page chunks.',
        'Mixed-Type OCR Extraction: Hybrid optical character recognition combining specialized vision models for unstructured scans and tables.',
        'Latency Minimization: Asynchronous chunk streaming reduces time-to-first-token parsing by 60% compared to monolithic serial pipelines.',
        'Schema Guarantee: Subagents enforce strict Pydantic/TypeScript output typing with automated error-correction loops.',
      ],
      metricsOrDeliverables: [
        'Up to 100MB payload ingestion support',
        'Dynamic multi-subagent worker concurrency',
        'Deterministic structured JSON output extraction',
        'Target latency optimization for high-density tables',
      ],
      technologies: ['Python', 'TypeScript', 'LangChain', 'OCR Engines', 'Vision Models', 'Subagent Coordinator', 'Docker'],
      diagramType: 'document_ocr',
      repoUrl: 'https://github.com/latecoder10',
    });
  };

  // Corridor bounds: Z = 24 to Z = -150 (Total ~174 units)
  const CORRIDOR_LENGTH = 174;
  const CORRIDOR_CENTER_Z = -63;

  // Gothic pointed arch ribs every 6 units along Z
  const archPositions = useMemo(() => {
    const list: number[] = [];
    for (let z = 22; z >= -148; z -= 6) {
      // Don't place arch right in front of door centers
      const isNearDoor = SECTOR_BAYS.some((b) => Math.abs(z - b.doorZ) < 1.5);
      if (!isNearDoor) {
        list.push(z);
      }
    }
    return list;
  }, []);

  // Wall segments between bays
  const wallIntervals = useMemo(() => {
    return [
      { startZ: 24, endZ: 2, side: 'left' as const },
      { startZ: -2, endZ: -58, side: 'left' as const },
      { startZ: -62, endZ: -118, side: 'left' as const },
      { startZ: -122, endZ: -150, side: 'left' as const },

      { startZ: 24, endZ: -28, side: 'right' as const },
      { startZ: -32, endZ: -88, side: 'right' as const },
      { startZ: -92, endZ: -150, side: 'right' as const },
    ];
  }, []);

  // Torch locations (spaced cleanly along alternating walls)
  const torchPositions = useMemo(() => {
    const list: Array<{ x: number; y: number; z: number; rotY: number }> = [];
    for (let z = 18; z >= -145; z -= 18) {
      const nearDoor = SECTOR_BAYS.some((b) => Math.abs(z - b.doorZ) < 2);
      if (!nearDoor) {
        // Left wall torch
        list.push({ x: -3.75, y: 2.1, z, rotY: Math.PI / 2 });
        // Right wall torch (slightly offset)
        list.push({ x: 3.75, y: 2.1, z: z - 9, rotY: -Math.PI / 2 });
      }
    }
    return list;
  }, []);

  return (
    <group>
      {/* 1. Ancient Flagstone Castle Floor */}
      <mesh position={[0, -0.05, CORRIDOR_CENTER_Z]}>
        <boxGeometry args={[8.2, 0.1, CORRIDOR_LENGTH]} />
        <meshStandardMaterial
          color="#29241E"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>

      {/* Flagstone Tile Joint Strips (Aged Mortar lines) */}
      <mesh position={[-2.6, 0.01, CORRIDOR_CENTER_Z]}>
        <planeGeometry args={[0.04, CORRIDOR_LENGTH]} />
        <meshBasicMaterial color="#1A1612" />
      </mesh>
      <mesh position={[2.6, 0.01, CORRIDOR_CENTER_Z]}>
        <planeGeometry args={[0.04, CORRIDOR_LENGTH]} />
        <meshBasicMaterial color="#1A1612" />
      </mesh>
      <mesh position={[0, 0.01, CORRIDOR_CENTER_Z]}>
        <planeGeometry args={[0.04, CORRIDOR_LENGTH]} />
        <meshBasicMaterial color="#1A1612" />
      </mesh>

      {/* Subtle Golden Carpet Runner Down Center of Corridor */}
      <mesh position={[0, 0.012, CORRIDOR_CENTER_Z]}>
        <planeGeometry args={[2.2, CORRIDOR_LENGTH]} />
        <meshStandardMaterial
          color="#4E1E05"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      {/* Golden Filigree Border Trim on Carpet */}
      <mesh position={[-1.1, 0.014, CORRIDOR_CENTER_Z]}>
        <planeGeometry args={[0.06, CORRIDOR_LENGTH]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>
      <mesh position={[1.1, 0.014, CORRIDOR_CENTER_Z]}>
        <planeGeometry args={[0.06, CORRIDOR_LENGTH]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>

      {/* 2. Gothic Ribbed Vaulted Ceiling */}
      <mesh position={[0, 3.8, CORRIDOR_CENTER_Z]}>
        <boxGeometry args={[8.2, 0.25, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#221C16" roughness={0.85} metalness={0.15} />
      </mesh>

      {/* 2.1 Unified Warm Torchlight Illumination (Smooth 60fps on mobile & laptop) */}
      <pointLight position={[0, 2.7, 10]} color="#FFBE6B" distance={34} intensity={2.3} />
      <pointLight position={[0, 2.7, -25]} color="#FFBE6B" distance={34} intensity={2.3} />
      <pointLight position={[0, 2.7, -65]} color="#FFBE6B" distance={34} intensity={2.3} />
      <pointLight position={[0, 2.7, -105]} color="#FFBE6B" distance={34} intensity={2.3} />
      <pointLight position={[0, 2.7, -145]} color="#FFBE6B" distance={34} intensity={2.3} />

      {/* 3. Canopy of Floating Enchanted Candles */}
      <FloatingCandleCluster count={26} zRange={[20, -145]} />

      {/* 4. Wall-Mounted Iron Torch Sconces */}
      {torchPositions.map((t, idx) => (
        <WallTorch
          key={`torch-${idx}`}
          position={[t.x, t.y, t.z]}
          rotationY={t.rotY}
        />
      ))}

      {/* 5. Gothic Pointed Arches lining the Corridor */}
      {archPositions.map((z) => (
        <group key={`arch-${z}`} position={[0, 0, z]}>
          {/* Left Stone Pillar */}
          <mesh position={[-3.85, 1.8, 0]}>
            <boxGeometry args={[0.4, 3.6, 0.45]} />
            <meshStandardMaterial color="#342D26" roughness={0.8} metalness={0.2} />
          </mesh>
          {/* Left Pillar Base Plinth */}
          <mesh position={[-3.85, 0.2, 0]}>
            <boxGeometry args={[0.55, 0.4, 0.6]} />
            <meshStandardMaterial color="#29221C" roughness={0.9} />
          </mesh>
          {/* Left Pillar Capital */}
          <mesh position={[-3.85, 3.2, 0]}>
            <boxGeometry args={[0.52, 0.25, 0.55]} />
            <meshStandardMaterial color="#40362D" roughness={0.7} metalness={0.3} />
          </mesh>

          {/* Right Stone Pillar */}
          <mesh position={[3.85, 1.8, 0]}>
            <boxGeometry args={[0.4, 3.6, 0.45]} />
            <meshStandardMaterial color="#342D26" roughness={0.8} metalness={0.2} />
          </mesh>
          {/* Right Pillar Base Plinth */}
          <mesh position={[3.85, 0.2, 0]}>
            <boxGeometry args={[0.55, 0.4, 0.6]} />
            <meshStandardMaterial color="#29221C" roughness={0.9} />
          </mesh>
          {/* Right Pillar Capital */}
          <mesh position={[3.85, 3.2, 0]}>
            <boxGeometry args={[0.52, 0.25, 0.55]} />
            <meshStandardMaterial color="#40362D" roughness={0.7} metalness={0.3} />
          </mesh>

          {/* Left Arch Spandrel Segment (Angled up to center) */}
          <mesh position={[-1.9, 3.45, 0]} rotation={[0, 0, -0.16]}>
            <boxGeometry args={[3.8, 0.3, 0.35]} />
            <meshStandardMaterial color="#393128" roughness={0.75} metalness={0.2} />
          </mesh>

          {/* Right Arch Spandrel Segment (Angled up to center) */}
          <mesh position={[1.9, 3.45, 0]} rotation={[0, 0, 0.16]}>
            <boxGeometry args={[3.8, 0.3, 0.35]} />
            <meshStandardMaterial color="#393128" roughness={0.75} metalness={0.2} />
          </mesh>

          {/* Central Gothic Pointed Keystone */}
          <mesh position={[0, 3.75, 0]}>
            <boxGeometry args={[0.45, 0.45, 0.4]} />
            <meshStandardMaterial color="#D4AF37" roughness={0.4} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* 6. Ashlar Stone Masonry Wall Spans */}
      {wallIntervals.map((seg, idx) => {
        const length = seg.startZ - seg.endZ;
        const centerZ = (seg.startZ + seg.endZ) / 2;
        const posX = seg.side === 'left' ? -3.95 : 3.95;

        return (
          <group key={`wall-${idx}`}>
            {/* Main Stone Wall Block */}
            <mesh position={[posX, 1.8, centerZ]}>
              <boxGeometry args={[0.3, 3.6, length]} />
              <meshStandardMaterial
                color="#2D2620"
                roughness={0.85}
                metalness={0.15}
              />
            </mesh>
            {/* Lower Stone Baseboard Trim */}
            <mesh position={[posX * 0.98, 0.2, centerZ]}>
              <boxGeometry args={[0.15, 0.4, length]} />
              <meshStandardMaterial color="#231E18" roughness={0.9} />
            </mesh>
            {/* Upper Stone Cornice Trim */}
            <mesh position={[posX * 0.98, 3.4, centerZ]}>
              <boxGeometry args={[0.15, 0.2, length]} />
              <meshStandardMaterial color="#3A3128" roughness={0.8} />
            </mesh>
          </group>
        );
      })}

      {/* 7. Enchanted Moving Corridor Paintings on Wall Spans */}
      <CorridorPainting
        position={[-3.8, 2.0, 12]}
        rotationY={Math.PI / 2}
        title="QodeAI Automation"
        subtitle="Autonomous SDLC Engine"
        category="ARITHMANCY & SYSTEMS"
        accentColor="#F59E0B"
        imageArt="castle"
        onClick={() => handleOpenCaseStudy('qodeai')}
      />

      <CorridorPainting
        position={[3.8, 2.0, 10]}
        rotationY={-Math.PI / 2}
        title="Anthropic Mastery"
        subtitle="Claude Certified Architect"
        category="FOUNDATIONS CREDENTIAL"
        accentColor="#FDE047"
        imageArt="crest"
        onClick={handleOpenClaudeCert}
      />

      <CorridorPainting
        position={[-3.8, 2.0, -16]}
        rotationY={Math.PI / 2}
        title="Multi-Cloud DICOM"
        subtitle="Healthcare Streaming Pipeline"
        category="DISTRIBUTED VAULT"
        accentColor="#3B82F6"
        imageArt="tower"
        onClick={() => handleOpenCaseStudy('roche-dicom')}
      />

      <CorridorPainting
        position={[3.8, 2.0, -48]}
        rotationY={-Math.PI / 2}
        title="100MB OCR Engine"
        subtitle="Coordinator-Worker Subagents"
        category="ALCHEMICAL AI LAB"
        accentColor="#A855F7"
        imageArt="cauldron"
        onClick={handleOpenOCRPipeline}
      />

      <CorridorPainting
        position={[-3.8, 2.0, -78]}
        rotationY={Math.PI / 2}
        title="Workforce SaaS"
        subtitle="Multi-Tenant SaaS Workflows"
        category="ENTERPRISE SAAS"
        accentColor="#10B981"
        imageArt="quidditch"
        onClick={() => handleOpenCaseStudy('lumberfi')}
      />

      <CorridorPainting
        position={[3.8, 2.0, -108]}
        rotationY={-Math.PI / 2}
        title="Zero-Trust Security"
        subtitle="Multi-Tenant Isolation & JWT"
        category="DEFENSE SANCTUARY"
        accentColor="#EC4899"
        imageArt="crest"
        onClick={() => handleOpenCaseStudy('realtime-mesh')}
      />

      {/* 8. Hogwarts House Tapestries hung along Corridor */}
      <HouseBanner position={[-3.8, 1.8, 4]} rotationY={Math.PI / 2} house="gryffindor" />
      <HouseBanner position={[3.8, 1.8, 2]} rotationY={-Math.PI / 2} house="ravenclaw" />
      <HouseBanner position={[-3.8, 1.8, -44]} rotationY={Math.PI / 2} house="slytherin" />
      <HouseBanner position={[3.8, 1.8, -72]} rotationY={-Math.PI / 2} house="hufflepuff" />

      {/* 9. Entrance Archway at Corridor Start (Z = 21.5) */}
      <group position={[0, 2.4, 21.5]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[7.6, 0.45, 0.5]} />
          <meshStandardMaterial color="#2B1E14" metalness={0.7} roughness={0.3} />
        </mesh>
        <Text
          position={[0, 0.05, 0.28]}
          fontSize={0.22}
          color="#FDE047"
          anchorX="center"
          anchorY="middle"
        >
          ✦ HOGWARTS CITADEL · SPATIAL CHRONICLE ✦
        </Text>
        <Text
          position={[0, -0.15, 0.28]}
          fontSize={0.11}
          color="#FFE8A3"
          anchorX="center"
          anchorY="middle"
        >
          AYAN PAL // FULL STACK ARCHITECT & AI ENGINEER
        </Text>
      </group>

      {/* 10. Chamber Doorways */}
      {SECTOR_BAYS.map((bay) => (
        <DoorwayBay key={bay.id} bay={bay} />
      ))}
    </group>
  );
};
