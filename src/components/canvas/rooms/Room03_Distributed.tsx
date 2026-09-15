import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpatialText as Text } from '../common/SpatialText';
import * as THREE from 'three';
import { useScene } from '../../../context/SceneContext';
import { DossierContent } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';
import { FloatingCandle, WallTorch } from '../common/HogwartsLighting';

export const Room03_Distributed: React.FC = () => {
  const { openOverlay } = useScene();

  const ROOM_X = -10;
  const ROOM_Z = -60;

  const crystalRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
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

  useFrame(({ clock }, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.4;
      crystalRef.current.position.y = 1.3 + Math.sin(clock.getElapsedTime() * 1.5) * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.3;
    }
  });

  const openDistributedDossier = (type: 'multicloud' | 'concurrency' | 'k8s') => {
    soundEngine.playAlohomora();
    if (type === 'multicloud') {
      const dossier: DossierContent = {
        id: 'multicloud-dicom',
        title: 'Multi-Cloud Healthcare Medical Imaging (DICOM) Backbone',
        subtitle: 'Heterogeneous cloud storage and streaming across AWS, Azure, and Google Cloud',
        category: 'DISTRIBUTED ARCHITECTURES',
        badge: 'Production Scale (Healthcare Enterprise)',
        clientOrProduct: 'Global Healthcare & Diagnostics Enterprise',
        overview:
          'Engineered a fault-tolerant Java microservices streaming backbone responsible for ingesting, validating, and distributing petabyte-scale medical imaging data across AWS Health Imaging, Azure DICOM Services, and Google Cloud Healthcare API without data loss or cloud vendor lock-in.',
        technicalHighlights: [
          'Unified Ingestion Interface: Abstracted heterogeneous cloud APIs behind a singular reactive Java microservice contract.',
          'Cross-Cloud Storage Sync: S3, Azure Blob, and GCS synchronization with cryptographic checksum verification.',
          'High-Throughput Streaming: Chunked multipart data streaming preventing memory exhaustion during multi-gigabyte scans.',
          'Enterprise Healthcare Compliance: HIPAA and DICOM standard conformance across all cloud transit boundaries.',
        ],
        metricsOrDeliverables: [
          'Interoperable across 3 global cloud platforms (AWS, Azure, GCP)',
          'Zero data loss across distributed sync pipelines',
          'Automated CI/CD via GitHub Actions and Docker',
          'Instrumented with Prometheus and Grafana telemetry',
        ],
        technologies: ['Java', 'Spring Boot', 'AWS Health Imaging', 'Azure DICOM', 'GCP Healthcare', 'Docker', 'Kubernetes'],
        diagramType: 'multicloud_dicom',
        repoUrl: 'https://github.com/latecoder10',
      };
      openOverlay(dossier);
    } else if (type === 'concurrency') {
      const dossier: DossierContent = {
        id: 'concurrency-engine',
        title: 'High-Concurrency Reactive Microservices Mesh',
        subtitle: 'Non-blocking I/O event streaming and backpressure handling',
        category: 'SYSTEMS ARCHITECTURE',
        badge: 'Production Core',
        clientOrProduct: 'Enterprise Backend Infrastructure',
        overview:
          'Constructed high-throughput reactive Java Spring Boot microservices designed to service thousands of simultaneous healthcare and enterprise ledger transactions without thread pool starvation or connection queue overflows.',
        technicalHighlights: [
          'Reactive Streams: Fully non-blocking event-driven pipeline utilizing Project Reactor and WebFlux.',
          'Backpressure Control: Dynamic load shedding and backpressure buffering preventing downstream resource degradation.',
          'Connection Pooling: Optimized HikariCP and R2DBC database connection pools maintaining sub-5ms query acquisition.',
          'Resilience Patterns: Automated timeout boundaries, fallback fall-throughs, and rate limiter enforcement.',
        ],
        metricsOrDeliverables: [
          '5,000+ concurrent requests handled per container instance',
          'Sub-30ms P99 latency across all internal API endpoints',
          'Zero thread starvation incidents in load testing',
        ],
        technologies: ['Java 17', 'Spring Boot', 'Project Reactor', 'R2DBC', 'Redis', 'Resilience4j'],
        diagramType: 'concurrency_engine',
        repoUrl: 'https://github.com/latecoder10',
      };
      openOverlay(dossier);
    } else {
      const dossier: DossierContent = {
        id: 'k8s-mesh',
        title: 'Kubernetes Container Orchestration & Zero-Trust Mesh',
        subtitle: 'Automated horizontal pod autoscaling, mTLS service mesh, and GitOps',
        category: 'CLOUD INFRASTRUCTURE',
        badge: 'Enterprise Platform',
        clientOrProduct: 'Cloud Operations Backbone',
        overview:
          'Architected and managed production Kubernetes clusters orchestrating microservices with automated horizontal autoscaling, mutual TLS zero-trust security between pods, and GitOps declarative continuous deployment.',
        technicalHighlights: [
          'Zero-Trust Networking: Istio service mesh enforcing mTLS encryption and strict RBAC authorization policies.',
          'Horizontal Pod Autoscaling: Metric-driven scaling based on custom Prometheus queue depth and CPU/memory thresholds.',
          'Declarative GitOps: ArgoCD continuous delivery keeping production environments synchronized with version control.',
          'High-Availability Topology: Multi-zone node pool failover with automated health probes and graceful pod shutdown.',
        ],
        metricsOrDeliverables: [
          '99.99% service availability uptime',
          'Automated scale-out from 3 to 50 pods under peak load in <90 seconds',
          'Zero plain-text traffic inside the cluster network',
        ],
        technologies: ['Kubernetes', 'Istio', 'Docker', 'Helm', 'ArgoCD', 'Prometheus', 'Grafana'],
        diagramType: 'k8s_mesh',
        repoUrl: 'https://github.com/latecoder10',
      };
      openOverlay(dossier);
    }
  };

  return (
    <group position={[ROOM_X, 0, ROOM_Z]}>
      {/* Dedicated Chamber Torchlight & Ambient Radiance */}
      <pointLight position={[0, 3.2, 0]} color="#FFE29A" distance={18} intensity={2.2} />

      {/* 1. Stone Castle Chamber Floor */}
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

      {/* 3. High Stone Ceiling */}
      <mesh position={[0, 4.8, 0]}>
        <boxGeometry args={[12, 0.3, 12]} />
        <meshStandardMaterial color="#221C16" roughness={0.9} />
      </mesh>

      {/* 4. Floating Candles & Torches */}
      <FloatingCandle position={[-2, 3.4, -2]} bobOffset={1.0} />
      <FloatingCandle position={[2, 3.5, -2]} bobOffset={2.2} />
      <FloatingCandle position={[-2, 3.3, 2]} bobOffset={3.4} />
      <FloatingCandle position={[2, 3.6, 2]} bobOffset={4.6} />
      <WallTorch position={[-5.8, 2.2, -3]} rotationY={Math.PI / 2} />
      <WallTorch position={[-5.8, 2.2, 3]} rotationY={Math.PI / 2} />

      {/* 5. Chamber Title Banner on Back Wall directly facing Entry Arch */}
      <group position={[-5.8, 3.6, 0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[7.2, 0.85]} />
          <meshStandardMaterial color="#1E140C" roughness={0.7} metalness={0.4} />
        </mesh>
        <Text position={[0, 0.14, 0.02]} fontSize={0.24} color="#38BDF8" anchorX="center">
          MULTI-CLOUD DISTRIBUTED VAULT
        </Text>
        <Text position={[0, -0.15, 0.02]} fontSize={0.12} color="#E2E8F0" anchorX="center">
          Heterogeneous Cloud DICOM · Non-Blocking Spring Microservices · Kubernetes Mesh
        </Text>
      </group>

      {/* 6. Central Floating DICOM Stasis Crystal (Backdrop Focal Point) */}
      <group position={[-4.5, 0, 0]}>
        <mesh position={[0, 0.4, 0]}>
          <cylinderGeometry args={[0.8, 1.1, 0.8, 8]} />
          <meshStandardMaterial color="#2B1A10" roughness={0.8} />
        </mesh>
        {/* Crystal Body */}
        <mesh ref={crystalRef} position={[0, 1.3, 0]}>
          <octahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#0284C7"
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
        {/* Runic Ring */}
        <mesh ref={ringRef} position={[0, 1.3, 0]} rotation={[-Math.PI / 3, 0, 0]}>
          <ringGeometry args={[0.85, 0.92, 24]} />
          <meshBasicMaterial color="#0284C7" side={THREE.DoubleSide} />
        </mesh>
        <pointLight position={[0, 1.5, 0]} color="#38BDF8" distance={6} intensity={2.2} />
      </group>

      {/* 7. The 3 Distributed Vault Runestones (Aligned directly in front of door facing incoming user) */}
      {/* Center Flagship Runestone: Multi-Cloud DICOM (Healthcare Enterprise) */}
      <group
        position={[-2.6, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openDistributedDossier('multicloud');
        }}
        onPointerOver={() => handleHoverNode('multicloud')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.45, 0.6, 1.0, 8]} />
          <meshStandardMaterial color="#2B1A10" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.4, 0]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[1.5, 0.9, 0.08]} />
          <meshStandardMaterial color="#1E140C" emissive="#0284C7" emissiveIntensity={hoveredNode === 'multicloud' ? 0.35 : 0.05} />
        </mesh>
        <mesh position={[0, 1.4, 0.045]} rotation={[-0.25, 0, 0]}>
          <planeGeometry args={[1.4, 0.8]} />
          <meshStandardMaterial color="#F7F1E5" roughness={0.9} />
        </mesh>
        <Text position={[0, 1.62, 0.1]} fontSize={0.075} color="#0369A1" anchorX="center">
          MULTI-CLOUD MEDICAL DICOM
        </Text>
        <Text position={[0, 1.45, 0.1]} fontSize={0.055} color="#1E293B" anchorX="center">
          AWS · Azure · GCP Healthcare Data
        </Text>
        <Text position={[0, 1.25, 0.1]} fontSize={0.055} color="#0284C7" anchorX="center">
          {hoveredNode === 'multicloud' ? '▶ CLICK TO UNSEAL ◀' : 'Status: Production Scale'}
        </Text>
      </group>

      {/* Left Runestone: High Concurrency Engine angled inward */}
      <group
        position={[-2.2, 0, 2.3]}
        rotation={[0, Math.PI / 2 + 0.32, 0]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openDistributedDossier('concurrency');
        }}
        onPointerOver={() => handleHoverNode('concurrency')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.45, 0.6, 1.0, 8]} />
          <meshStandardMaterial color="#2B1A10" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.4, 0]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[1.5, 0.9, 0.08]} />
          <meshStandardMaterial color="#1E140C" emissive="#10B981" emissiveIntensity={hoveredNode === 'concurrency' ? 0.35 : 0.05} />
        </mesh>
        <mesh position={[0, 1.4, 0.045]} rotation={[-0.25, 0, 0]}>
          <planeGeometry args={[1.4, 0.8]} />
          <meshStandardMaterial color="#F7F1E5" roughness={0.9} />
        </mesh>
        <Text position={[0, 1.62, 0.1]} fontSize={0.075} color="#047857" anchorX="center">
          HIGH-CONCURRENCY MESH
        </Text>
        <Text position={[0, 1.45, 0.1]} fontSize={0.055} color="#1E293B" anchorX="center">
          Non-Blocking Project Reactor Streams
        </Text>
        <Text position={[0, 1.25, 0.1]} fontSize={0.055} color="#059669" anchorX="center">
          {hoveredNode === 'concurrency' ? '▶ CLICK TO UNSEAL ◀' : 'Status: 5,000+ Concurrent'}
        </Text>
      </group>

      {/* Right Runestone: Kubernetes & Zero-Trust angled inward */}
      <group
        position={[-2.2, 0, -2.3]}
        rotation={[0, Math.PI / 2 - 0.32, 0]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openDistributedDossier('k8s');
        }}
        onPointerOver={() => handleHoverNode('k8s')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.45, 0.6, 1.0, 8]} />
          <meshStandardMaterial color="#2B1A10" roughness={0.8} />
        </mesh>
        <mesh position={[0, 1.4, 0]} rotation={[-0.25, 0, 0]}>
          <boxGeometry args={[1.5, 0.9, 0.08]} />
          <meshStandardMaterial color="#1E140C" emissive="#F59E0B" emissiveIntensity={hoveredNode === 'k8s' ? 0.35 : 0.05} />
        </mesh>
        <mesh position={[0, 1.4, 0.045]} rotation={[-0.25, 0, 0]}>
          <planeGeometry args={[1.4, 0.8]} />
          <meshStandardMaterial color="#F7F1E5" roughness={0.9} />
        </mesh>
        <Text position={[0, 1.62, 0.1]} fontSize={0.075} color="#B45309" anchorX="center">
          KUBERNETES & ISTIO MESH
        </Text>
        <Text position={[0, 1.45, 0.1]} fontSize={0.055} color="#1E293B" anchorX="center">
          Zero-Trust mTLS · GitOps ArgoCD
        </Text>
        <Text position={[0, 1.25, 0.1]} fontSize={0.055} color="#D97706" anchorX="center">
          {hoveredNode === 'k8s' ? '▶ CLICK TO UNSEAL ◀' : 'Status: 99.99% Uptime'}
        </Text>
      </group>
    </group>
  );
};
