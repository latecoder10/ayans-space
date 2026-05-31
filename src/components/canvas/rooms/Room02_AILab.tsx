import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpatialText as Text } from '../common/SpatialText';
import * as THREE from 'three';
import { useScene } from '../../../context/SceneContext';
import { DossierContent } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';

export const Room02_AILab: React.FC = () => {
  const { openOverlay, exitRoom, currentRoomId, mode } = useScene();
  const isInside = (mode === 'room' || mode === 'transitioning') && currentRoomId === 'room-ai-lab';

  const ROOM_X = 14;
  const ROOM_Z = -30;

  // Orbiting Vector Cloud ref
  const pointCloudRef = useRef<THREE.Points>(null);
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

  // Generate vector points
  const pointsGeo = React.useMemo(() => {
    const count = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 4;
      positions[i * 3 + 1] = 1.2 + (Math.random() - 0.5) * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (pointCloudRef.current) {
      pointCloudRef.current.rotation.y += delta * 0.25;
      pointCloudRef.current.rotation.x += delta * 0.1;
    }
  });

  const openAIDossier = (type: 'ocr' | 'servicenow' | 'failover') => {
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
      };
      openOverlay(dossier);
    } else if (type === 'servicenow') {
      const dossier: DossierContent = {
        id: 'servicenow-rag',
        title: 'ServiceNow AI Knowledge Base & Incident Vector Search',
        subtitle: 'Automated incident embedding and real-time semantic + flash search engine',
        category: 'VECTOR RETRIEVAL & RAG',
        badge: 'Enterprise Integration',
        clientOrProduct: 'ServiceNow AI Plugin',
        overview:
          'Architected an automated knowledge base ingestion pipeline integrating directly with ServiceNow. Historical resolved incidents and knowledge articles are embedded into high-dimensional vector space, enabling real-time semantic and flash search that intercepts user tickets before submission to provide instant resolution.',
        technicalHighlights: [
          'ServiceNow Plugin Integration: Automated webhooks and scheduled sync pipelines streaming resolved ticket resolutions and KB articles.',
          'High-Density Vector DB: ChromaDB/Vector store indexing with chunking optimized for technical troubleshooting nomenclature.',
          'Pre-Submission Deflection: Real-time hybrid similarity queries (Cosine + BM25 flash search) intercepting ticket creation to suggest verified fixes.',
          'Continuous Feedback Loop: Resolution efficacy analytics refining embedding distance thresholds over time.',
        ],
        metricsOrDeliverables: [
          'Automated incident synchronization pipeline',
          'Sub-150ms hybrid semantic search retrieval',
          'Significant ticket deflection before IT desk dispatch',
          'Persistent vector store memory architecture',
        ],
        technologies: ['ServiceNow API', 'Vector Embeddings', 'ChromaDB', 'Python', 'Spring Boot', 'Semantic Search', 'BM25'],
        diagramType: 'servicenow_rag',
      };
      openOverlay(dossier);
    } else {
      const dossier: DossierContent = {
        id: 'llm-gateway',
        title: 'Multi-Provider LLM Orchestration & Failover Gateway',
        subtitle: 'Dynamic quota-aware API key rotation and zero-downtime model fallbacks',
        category: 'AI SYSTEM RELIABILITY',
        badge: 'Core Production Component',
        clientOrProduct: 'QodeAI Platform Backbone',
        overview:
          'Engineered a fault-tolerant multi-provider LLM gateway that monitors token limits, rate quotas, and provider latency across Anthropic, OpenAI, and fallback models to guarantee 99.9% pipeline continuity during peak enterprise loads.',
        technicalHighlights: [
          'Automated Quota Monitoring: Real-time token burn tracking with automatic cooldown triggering on 429 rate limit responses.',
          'Model Fallback Hierarchies: Graceful degradation from premier reasoning models to high-throughput secondary models.',
          'Streaming Continuity: Seamless token stream handover preventing interrupted client responses during failovers.',
          'Cost & Latency Telemetry: Per-workspace token accounting with latency percentiles instrumented for observability.',
        ],
        metricsOrDeliverables: [
          '99.9% LLM pipeline uptime during multi-tenant bursts',
          'Zero-interruption automatic model failover',
          'Sub-50ms routing overhead across providers',
          'Multi-tenant API key isolation and encryption',
        ],
        technologies: ['Java', 'Spring Boot', 'Anthropic Claude API', 'OpenAI API', 'Redis Rate-Limiter', 'Docker'],
        diagramType: 'llm_orchestration',
      };
      openOverlay(dossier);
    }
  };

  return (
    <group position={[ROOM_X, 0, ROOM_Z]}>
      {/* 1. Floor */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[14, 0.1, 12]} />
        <meshStandardMaterial color="#0A0614" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* 2. Ceiling */}
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[14, 0.2, 12]} />
        <meshStandardMaterial color="#080410" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 3. Perimeter Walls */}
      <mesh position={[0, 2.2, -6]}>
        <boxGeometry args={[14, 4.4, 0.3]} />
        <meshStandardMaterial color="#100A1C" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[7, 2.2, 0]}>
        <boxGeometry args={[0.3, 4.4, 12]} />
        <meshStandardMaterial color="#100A1C" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.2, 6]}>
        <boxGeometry args={[14, 4.4, 0.3]} />
        <meshStandardMaterial color="#100A1C" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* 4. Center: Holographic Vector Space Point Cloud */}
      <group position={[0, 0, 0]}>
        <points ref={pointCloudRef} geometry={pointsGeo}>
          <pointsMaterial size={0.08} color="#C084FC" transparent opacity={0.75} />
        </points>
        {/* Core Vector Ring Base */}
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 2.0, 32]} />
          <meshBasicMaterial color="#A855F7" side={THREE.DoubleSide} />
        </mesh>
        <Text position={[0, 0.3, 0]} fontSize={0.12} color="#A855F7" anchorX="center">
          HIGH-DIMENSIONAL VECTOR CORE
        </Text>
      </group>

      {/* 5. Header Plaque */}
      <group position={[0, 3.8, -5.7]}>
        <Text fontSize={0.28} color="#C084FC" anchorX="center">
          AUTONOMOUS AI ENGINEERING LAB // SECTOR 02
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.14} color="#E9D5FF" anchorX="center">
          AGENTIC WORKFLOWS, OCR PIPELINES & MULTI-PROVIDER ORCHESTRATION
        </Text>
      </group>

      {/* 6. Three Dedicated AI Consoles */}
      {/* Console 1: 100MB OCR Document Pipeline */}
      <group
        position={[-3.6, 0, -2.5]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openAIDossier('ocr');
        }}
        onPointerOver={() => handleHoverNode('ocr')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.5, 0.65, 1.0, 6]} />
          <meshStandardMaterial color="#160E26" metalness={0.8} roughness={0.25} />
        </mesh>
        <group position={[0, 1.45, 0]} rotation={[-0.2, 0.2, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.9, 0.04]} />
            <meshStandardMaterial
              color="#0E071A"
              emissive="#A855F7"
              emissiveIntensity={hoveredNode === 'ocr' ? 0.4 : 0.1}
            />
          </mesh>
          <Text position={[0, 0.28, 0.03]} fontSize={0.07} color="#C084FC" anchorX="center">
            [ SUBAGENT PIPELINE ]
          </Text>
          <Text position={[0, 0.1, 0.03]} fontSize={0.10} color="#FFFFFF" anchorX="center">
            100MB OCR EXTRACTION
          </Text>
          <Text position={[0, -0.08, 0.03]} fontSize={0.065} color="#D8B4FE" anchorX="center">
            Coordinator + Parallel Parsers
          </Text>
          <Text position={[0, -0.24, 0.03]} fontSize={0.065} color="#A855F7" anchorX="center">
            ▶ CLICK TO INSPECT ◀
          </Text>
        </group>
        <pointLight position={[0, 1.4, 0.3]} color="#A855F7" intensity={hoveredNode === 'ocr' ? 2.5 : 1} distance={3.5} />
      </group>

      {/* Console 2: ServiceNow Vector Search */}
      <group
        position={[0, 0, -3.8]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openAIDossier('servicenow');
        }}
        onPointerOver={() => handleHoverNode('servicenow')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.5, 0.65, 1.0, 6]} />
          <meshStandardMaterial color="#160E26" metalness={0.8} roughness={0.25} />
        </mesh>
        <group position={[0, 1.45, 0]} rotation={[-0.2, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.9, 0.04]} />
            <meshStandardMaterial
              color="#0E071A"
              emissive="#38BDF8"
              emissiveIntensity={hoveredNode === 'servicenow' ? 0.4 : 0.1}
            />
          </mesh>
          <Text position={[0, 0.28, 0.03]} fontSize={0.07} color="#38BDF8" anchorX="center">
            [ VECTOR RAG SEARCH ]
          </Text>
          <Text position={[0, 0.1, 0.03]} fontSize={0.10} color="#FFFFFF" anchorX="center">
            SERVICENOW AI PLUGIN
          </Text>
          <Text position={[0, -0.08, 0.03]} fontSize={0.065} color="#BAE6FD" anchorX="center">
            Auto Embedding & Deflection
          </Text>
          <Text position={[0, -0.24, 0.03]} fontSize={0.065} color="#38BDF8" anchorX="center">
            ▶ CLICK TO INSPECT ◀
          </Text>
        </group>
        <pointLight position={[0, 1.4, 0.3]} color="#38BDF8" intensity={hoveredNode === 'servicenow' ? 2.5 : 1} distance={3.5} />
      </group>

      {/* Console 3: LLM Multi-Provider Gateway */}
      <group
        position={[3.6, 0, -2.5]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openAIDossier('failover');
        }}
        onPointerOver={() => handleHoverNode('failover')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.5, 0.65, 1.0, 6]} />
          <meshStandardMaterial color="#160E26" metalness={0.8} roughness={0.25} />
        </mesh>
        <group position={[0, 1.45, 0]} rotation={[-0.2, -0.2, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.9, 0.04]} />
            <meshStandardMaterial
              color="#0E071A"
              emissive="#10B981"
              emissiveIntensity={hoveredNode === 'failover' ? 0.4 : 0.1}
            />
          </mesh>
          <Text position={[0, 0.28, 0.03]} fontSize={0.07} color="#34D399" anchorX="center">
            [ HIGH-AVAILABILITY ]
          </Text>
          <Text position={[0, 0.1, 0.03]} fontSize={0.10} color="#FFFFFF" anchorX="center">
            LLM GATEWAY & FAILOVER
          </Text>
          <Text position={[0, -0.08, 0.03]} fontSize={0.065} color="#A7F3D0" anchorX="center">
            Quota-Aware Dynamic Routing
          </Text>
          <Text position={[0, -0.24, 0.03]} fontSize={0.065} color="#10B981" anchorX="center">
            ▶ CLICK TO INSPECT ◀
          </Text>
        </group>
        <pointLight position={[0, 1.4, 0.3]} color="#10B981" intensity={hoveredNode === 'failover' ? 2.5 : 1} distance={3.5} />
      </group>

      {/* 7. Exit Threshold Gateway on the left (leads back to corridor) */}
      <group position={[-6.6, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
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
          <meshBasicMaterial color="#A855F7" transparent opacity={0.18} />
        </mesh>
        <Text position={[0, 0.4, 0.05]} fontSize={0.16} color="#C084FC" anchorX="center">
          [ ← RETURN TO CORRIDOR ]
        </Text>
        <Text position={[0, 0.1, 0.05]} fontSize={0.11} color="#E9D5FF" anchorX="center">
          (OR PRESS ESCAPE)
        </Text>
      </group>

      {/* Room Atmosphere Lighting */}
      <pointLight position={[0, 3.5, 0]} color="#A855F7" distance={15} intensity={isInside ? 3 : 0.8} />
      <directionalLight position={[4, 6, 2]} color="#DDD6FE" intensity={0.4} />
    </group>
  );
};
