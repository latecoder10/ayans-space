import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpatialText as Text } from '../common/SpatialText';
import * as THREE from 'three';
import { useScene } from '../../../context/SceneContext';
import { DossierContent } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';
import { FloatingCandle, WallTorch } from '../common/HogwartsLighting';

export const Room02_AILab: React.FC = () => {
  const { openOverlay } = useScene();

  const ROOM_X = 10;
  const ROOM_Z = -30;

  // Cauldron & Vector Cloud refs
  const pointCloudRef = useRef<THREE.Points>(null);
  const cauldronLiquidRef = useRef<THREE.Mesh>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleHoverNode = (node: string | null) => {
    setHoveredNode(node);
    if (node) {
      document.body.style.cursor = 'pointer';
      soundEngine.playHover();
    } else {
      document.body.style.cursor = 'auto';
    }
  };

  // Generate vector particles
  const pointsGeo = React.useMemo(() => {
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const sx = Math.sin(i * 14.234) * 43758.5453;
      const sy = Math.sin(i * 93.412) * 43758.5453;
      const sz = Math.sin(i * 51.876) * 43758.5453;
      const rx = sx - Math.floor(sx);
      const ry = sy - Math.floor(sy);
      const rz = sz - Math.floor(sz);

      positions[i * 3] = (rx - 0.5) * 3.5;
      positions[i * 3 + 1] = 1.3 + (ry - 0.5) * 1.8;
      positions[i * 3 + 2] = (rz - 0.5) * 3.5;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame(({ clock }, delta) => {
    if (pointCloudRef.current) {
      pointCloudRef.current.rotation.y += delta * 0.25;
    }
    if (cauldronLiquidRef.current) {
      const t = clock.getElapsedTime() * 3;
      const s = 1 + Math.sin(t) * 0.03;
      cauldronLiquidRef.current.scale.set(s, 1, s);
    }
  });

  const openAIDossier = (type: 'ocr' | 'servicenow' | 'failover') => {
    soundEngine.playAlohomora();
    if (type === 'ocr') {
      const dossier: DossierContent = {
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
      };
      openOverlay(dossier);
    } else if (type === 'servicenow') {
      const dossier: DossierContent = {
        id: 'servicenow-rag',
        title: 'ServiceNow Knowledge Base & RAG Pipeline',
        subtitle: 'Vector embeddings, chunk deduplication, and cross-source verification',
        category: 'SEMANTIC RETRIEVAL',
        badge: 'Active POC Delivery',
        clientOrProduct: 'Enterprise IT Service Management',
        overview:
          'Constructed a production-ready enterprise retrieval-augmented generation (RAG) pipeline ingesting multi-format ServiceNow incident histories, documentation wikis, and runbooks into a high-density ChromaDB vector space with hybrid semantic reranking.',
        technicalHighlights: [
          'Chunk Boundary Optimization: Content-aware recursive text splitting preserving code snippets and ITIL workflow hierarchies.',
          'Vector Index Architecture: High-dimensional embeddings with cosine similarity distance metrics and metadata pre-filtering.',
          'Hybrid Reranking: Reciprocal Rank Fusion (RRF) combining dense semantic vectors with BM25 lexical keyword scoring.',
          'Hallucination Guardrails: Strict source attribution prompting with confidence scoring thresholds before response generation.',
        ],
        metricsOrDeliverables: [
          'Sub-second query retrieval over 50,000+ indexed documentation nodes',
          'Zero-hallucination baseline on internal benchmark queries',
          'Automated incremental reindexing webhook listener',
        ],
        technologies: ['ChromaDB', 'LangChain', 'OpenAI Embeddings', 'Python', 'ServiceNow API', 'FastAPI'],
        diagramType: 'servicenow_rag',
        repoUrl: 'https://github.com/latecoder10',
      };
      openOverlay(dossier);
    } else {
      const dossier: DossierContent = {
        id: 'quota-failover',
        title: 'Multi-Provider LLM Orchestration & Quota-Aware Failover',
        subtitle: 'Dynamic token tracking, rate-limit hedging, and zero-interruption inference',
        category: 'LLM INFRASTRUCTURE',
        badge: 'Core Production Component',
        clientOrProduct: 'QodeAI Platform Backbone',
        overview:
          'Engineered a centralized multi-provider LLM gateway orchestrating inference across Anthropic Claude, OpenAI, and Google Gemini with real-time token tracking, rate-limit backoff, and instantaneous zero-downtime provider failover.',
        technicalHighlights: [
          'Dynamic API Key Rotation: Pool-based round-robin key rotation with granular token budget monitoring per tenant.',
          'Automated Fallback Cascades: Primary failure instantly triggers secondary provider retry with prompt adaptation.',
          'Circuit Breakers: Exponential backoff with jitter on 429 Rate Limit and 503 Service Unavailable HTTP codes.',
          'Telemetry Logging: Structured execution tracing recording latency, token count, cost, and provider routing rationale.',
        ],
        metricsOrDeliverables: [
          '100% request completion during simulated single-provider outages',
          'Zero-interruption inference for enterprise users',
          'Automated quota exhaustion warnings and recovery',
        ],
        technologies: ['Java', 'Spring Boot', 'Anthropic Claude API', 'OpenAI API', 'Google GenAI SDK', 'Resilience4j'],
        diagramType: 'llm_orchestration',
        repoUrl: 'https://github.com/latecoder10',
      };
      openOverlay(dossier);
    }
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
      <mesh position={[6, 2.5, 0]}>
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
      {/* Entry Arch Wall (X = -6) */}
      <mesh position={[-6, 2.5, -3.5]}>
        <boxGeometry args={[0.3, 5.0, 5]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>
      <mesh position={[-6, 2.5, 3.5]}>
        <boxGeometry args={[0.3, 5.0, 5]} />
        <meshStandardMaterial color="#2E2721" roughness={0.85} />
      </mesh>

      {/* 3. Ceiling */}
      <mesh position={[0, 4.8, 0]}>
        <boxGeometry args={[12, 0.3, 12]} />
        <meshStandardMaterial color="#221C16" roughness={0.9} />
      </mesh>

      {/* 4. Floating Candles & Torches */}
      <FloatingCandle position={[-2, 3.5, -2]} bobOffset={0.5} />
      <FloatingCandle position={[2, 3.4, -2]} bobOffset={1.7} />
      <FloatingCandle position={[-2, 3.6, 2]} bobOffset={2.9} />
      <FloatingCandle position={[2, 3.3, 2]} bobOffset={4.1} />
      <WallTorch position={[5.8, 2.2, -3]} rotationY={-Math.PI / 2} />
      <WallTorch position={[5.8, 2.2, 3]} rotationY={-Math.PI / 2} />

      {/* 5. Chamber Title Banner on Back Wall directly facing Entry Arch */}
      <group position={[5.8, 3.6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[7.2, 0.85]} />
          <meshStandardMaterial color="#1E140C" roughness={0.7} metalness={0.4} />
        </mesh>
        <Text position={[0, 0.14, 0.02]} fontSize={0.24} color="#C084FC" anchorX="center">
          ALCHEMICAL AI & ORCHESTRATION LAB
        </Text>
        <Text position={[0, -0.15, 0.02]} fontSize={0.12} color="#E2E8F0" anchorX="center">
          100MB Document OCR · ChromaDB Vector Search · Multi-LLM Quota Routing
        </Text>
      </group>

      {/* 6. Center Alchemical Cauldron & Floating Vector Cloud (Mystical Backdrop) */}
      <group position={[4.5, 0, 0]}>
        {/* Cast Iron Cauldron Pot */}
        <mesh position={[0, 0.45, 0]}>
          <sphereGeometry args={[0.75, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.7]} />
          <meshStandardMaterial color="#1E1E1E" roughness={0.8} metalness={0.6} side={THREE.DoubleSide} />
        </mesh>
        {/* Cauldron Tripod Legs */}
        <mesh position={[-0.45, 0.15, 0.25]} rotation={[0.2, 0, -0.3]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>
        <mesh position={[0.45, 0.15, 0.25]} rotation={[0.2, 0, 0.3]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.15, -0.5]} rotation={[-0.3, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
          <meshStandardMaterial color="#111" metalness={0.8} />
        </mesh>

        {/* Bubbling Magical Liquid */}
        <mesh ref={cauldronLiquidRef} position={[0, 0.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.65, 24]} />
          <meshBasicMaterial color="#A855F7" />
        </mesh>

        {/* Ambient Cauldron Glow */}
        <pointLight position={[0, 0.9, 0]} color="#C084FC" distance={6} intensity={2.2} />

        {/* Floating Mystical Vector Particle Cloud */}
        <points ref={pointCloudRef} geometry={pointsGeo}>
          <pointsMaterial size={0.06} color="#E879F9" transparent opacity={0.7} />
        </points>
      </group>

      {/* 7. The 3 Alchemical AI Grimoire Pedestals (Aligned directly in front of door facing incoming user) */}
      {/* Center Flagship Node: OCR Subagents directly centered */}
      <group
        position={[2.6, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openAIDossier('ocr');
        }}
        onPointerOver={() => handleHoverNode('ocr')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.45, 0.6, 1.0, 8]} />
          <meshStandardMaterial color="#2B1A10" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.4, 0]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[1.5, 0.9, 0.08]} />
          <meshStandardMaterial color="#1E140C" emissive="#A855F7" emissiveIntensity={hoveredNode === 'ocr' ? 0.35 : 0.05} />
        </mesh>
        <mesh position={[0, 1.4, 0.045]} rotation={[-0.25, 0, 0]}>
          <planeGeometry args={[1.4, 0.8]} />
          <meshStandardMaterial color="#F7F1E5" roughness={0.9} />
        </mesh>
        <Text position={[0, 1.62, 0.1]} fontSize={0.075} color="#6B21A8" anchorX="center">
          100MB OCR SUBAGENTS
        </Text>
        <Text position={[0, 1.45, 0.1]} fontSize={0.055} color="#1E293B" anchorX="center">
          Coordinator-Worker Multi-Agent Spawning
        </Text>
        <Text position={[0, 1.25, 0.1]} fontSize={0.055} color="#9333EA" anchorX="center">
          {hoveredNode === 'ocr' ? '▶ CLICK TO UNSEAL ◀' : 'Status: Production POC'}
        </Text>
      </group>

      {/* Left Node: ServiceNow RAG Pipeline angled inward */}
      <group
        position={[2.2, 0, -2.3]}
        rotation={[0, -Math.PI / 2 - 0.32, 0]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openAIDossier('servicenow');
        }}
        onPointerOver={() => handleHoverNode('servicenow')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.45, 0.6, 1.0, 8]} />
          <meshStandardMaterial color="#2B1A10" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.4, 0]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[1.5, 0.9, 0.08]} />
          <meshStandardMaterial color="#1E140C" emissive="#3B82F6" emissiveIntensity={hoveredNode === 'servicenow' ? 0.35 : 0.05} />
        </mesh>
        <mesh position={[0, 1.4, 0.045]} rotation={[-0.25, 0, 0]}>
          <planeGeometry args={[1.4, 0.8]} />
          <meshStandardMaterial color="#F7F1E5" roughness={0.9} />
        </mesh>
        <Text position={[0, 1.62, 0.1]} fontSize={0.075} color="#1D4ED8" anchorX="center">
          CHROMADB RAG PIPELINE
        </Text>
        <Text position={[0, 1.45, 0.1]} fontSize={0.055} color="#1E293B" anchorX="center">
          50,000+ Vector Ingestion & Reciprocal Rerank
        </Text>
        <Text position={[0, 1.25, 0.1]} fontSize={0.055} color="#2563EB" anchorX="center">
          {hoveredNode === 'servicenow' ? '▶ CLICK TO UNSEAL ◀' : 'Status: High-Density Search'}
        </Text>
      </group>

      {/* Right Node: LLM Quota Routing angled inward */}
      <group
        position={[2.2, 0, 2.3]}
        rotation={[0, -Math.PI / 2 + 0.32, 0]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openAIDossier('failover');
        }}
        onPointerOver={() => handleHoverNode('failover')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.45, 0.6, 1.0, 8]} />
          <meshStandardMaterial color="#2B1A10" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.4, 0]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[1.5, 0.9, 0.08]} />
          <meshStandardMaterial color="#1E140C" emissive="#F59E0B" emissiveIntensity={hoveredNode === 'failover' ? 0.35 : 0.05} />
        </mesh>
        <mesh position={[0, 1.4, 0.045]} rotation={[-0.25, 0, 0]}>
          <planeGeometry args={[1.4, 0.8]} />
          <meshStandardMaterial color="#F7F1E5" roughness={0.9} />
        </mesh>
        <Text position={[0, 1.62, 0.1]} fontSize={0.075} color="#B45309" anchorX="center">
          LLM QUOTA-ROUTING GATEWAY
        </Text>
        <Text position={[0, 1.45, 0.1]} fontSize={0.055} color="#1E293B" anchorX="center">
          Claude · OpenAI · Gemini Failover Circuit
        </Text>
        <Text position={[0, 1.25, 0.1]} fontSize={0.055} color="#D97706" anchorX="center">
          {hoveredNode === 'failover' ? '▶ CLICK TO UNSEAL ◀' : 'Status: Zero-Interruption'}
        </Text>
      </group>
    </group>
  );
};
