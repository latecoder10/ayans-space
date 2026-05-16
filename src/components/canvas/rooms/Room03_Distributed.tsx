import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpatialText as Text } from '../common/SpatialText';
import * as THREE from 'three';
import { useScene } from '../../../context/SceneContext';
import { DossierContent } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';

export const Room03_Distributed: React.FC = () => {
  const { openOverlay, exitRoom, currentRoomId, mode } = useScene();
  const isInside = (mode === 'room' || mode === 'transitioning') && currentRoomId === 'room-distributed';

  const ROOM_X = -14;
  const ROOM_Z = -60;

  const clusterRef = useRef<THREE.Group>(null);
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

  useFrame((_, delta) => {
    if (clusterRef.current) {
      clusterRef.current.rotation.y += delta * 0.2;
    }
  });

  const openDistributedDossier = (type: 'multicloud' | 'concurrency' | 'k8s') => {
    if (type === 'multicloud') {
      const dossier: DossierContent = {
        id: 'multicloud-dicom',
        title: 'Multi-Cloud Healthcare Medical Imaging (DICOM) Backbone',
        subtitle: 'Heterogeneous cloud storage and streaming across AWS, Azure, and Google Cloud',
        category: 'DISTRIBUTED ARCHITECTURES',
        badge: 'Production Scale (Roche)',
        clientOrProduct: 'Roche (Healthcare)',
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
      };
      openOverlay(dossier);
    } else if (type === 'concurrency') {
      const dossier: DossierContent = {
        id: 'concurrency-engine',
        title: 'High-Concurrency Java Multithreading & In-Memory Bus',
        subtitle: 'Lock-free structures, thread pool optimization, and Redis caching layers',
        category: 'SYSTEM CONCURRENCY',
        badge: 'Core Runtime Rigor',
        clientOrProduct: 'Distributed Infrastructure Core',
        overview:
          'Designed high-throughput concurrent worker architectures utilizing Java ExecutorServices, atomic references, and Redis in-memory pub/sub to maximize parallel processing efficiency while avoiding thread contention and deadlock hazards.',
        technicalHighlights: [
          'Worker Pool Tuning: Custom thread pools sized dynamically to CPU core topology and I/O wait ratios.',
          'In-Memory Data Caching: Distributed Redis cluster caching frequently requested imaging metadata to eliminate DB bottlenecks.',
          'Lock Contention Elimination: Non-blocking data structures and concurrent queues for worker dispatch.',
          'Resilience & Circuit Breakers: Resilience4j circuit breakers halting cascading failures during downstream throttling.',
        ],
        metricsOrDeliverables: [
          'Sub-10ms cache retrieval for high-frequency queries',
          'Zero deadlock occurrence across high-load test suites',
          'Comprehensive JUnit and Mockito test coverage',
          'Strict memory leak prevention in long-running services',
        ],
        technologies: ['Java', 'Spring Boot', 'Redis', 'Resilience4j', 'JUnit', 'Mockito', 'Thread Pools'],
      };
      openOverlay(dossier);
    } else {
      const dossier: DossierContent = {
        id: 'k8s-mesh',
        title: 'Kubernetes Container Orchestration & Production Telemetry',
        subtitle: 'Automated CI/CD workflows, Docker containerization, and Prometheus/Grafana observability',
        category: 'DEVOPS & OBSERVABILITY',
        badge: 'Enterprise Reliability',
        clientOrProduct: 'Platform Infrastructure',
        overview:
          'Standardized containerization and deployment pipelines for all microservices, establishing automated GitHub Actions CI/CD workflows and full-stack observability with real-time Prometheus metrics and Grafana dashboards.',
        technicalHighlights: [
          'Container Standardization: Multi-stage Docker builds minimizing production image footprint and attack surface.',
          'Kubernetes Orchestration: Declarative manifests with automated health checks, readiness probes, and horizontal pod autoscaling.',
          'Full-Stack Observability: Custom Micrometer metrics exported to Prometheus for request latency, error budgets, and JVM health.',
          'Automated Quality Gates: SonarQube static analysis and security scanning integrated into every CI pull request.',
        ],
        metricsOrDeliverables: [
          'Sub-5 minute deployment pipeline from commit to cluster',
          'Automated zero-downtime rolling updates',
          'Real-time P95/P99 latency tracking dashboards',
          'Automated alerts on error budget burn',
        ],
        technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'Prometheus', 'Grafana', 'SonarQube', 'Micrometer'],
      };
      openOverlay(dossier);
    }
  };

  return (
    <group position={[ROOM_X, 0, ROOM_Z]}>
      {/* 1. Floor & Ceiling */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[14, 0.1, 12]} />
        <meshStandardMaterial color="#060914" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[14, 0.2, 12]} />
        <meshStandardMaterial color="#04060E" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 2. Walls */}
      <mesh position={[0, 2.2, -6]}>
        <boxGeometry args={[14, 4.4, 0.3]} />
        <meshStandardMaterial color="#0A0E1C" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[-7, 2.2, 0]}>
        <boxGeometry args={[0.3, 4.4, 12]} />
        <meshStandardMaterial color="#0A0E1C" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.2, 6]}>
        <boxGeometry args={[14, 4.4, 0.3]} />
        <meshStandardMaterial color="#0A0E1C" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* 3. Center: Suspended 3D Multi-Cloud Orbital Cluster */}
      <group ref={clusterRef} position={[0, 2.2, 0]}>
        {/* Central Java Microservices Core Sphere */}
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#2563EB" emissive="#3B82F6" emissiveIntensity={0.6} metalness={0.8} roughness={0.2} />
        </mesh>
        <Text position={[0, 0, 0.8]} fontSize={0.12} color="#FFFFFF" anchorX="center">
          JAVA CORE
        </Text>

        {/* Orbit Ring */}
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[2.5, 0.03, 16, 64]} />
          <meshBasicMaterial color="#38BDF8" transparent opacity={0.6} />
        </mesh>

        {/* Satellite Node 1: AWS */}
        <mesh position={[2.5, 0, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[2.5, 0.4, 0]} fontSize={0.1} color="#FBBF24" anchorX="center">
          AWS
        </Text>

        {/* Satellite Node 2: Azure */}
        <mesh position={[-1.25, 2.16, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#0078D4" emissive="#0078D4" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[-1.25, 2.56, 0]} fontSize={0.1} color="#60A5FA" anchorX="center">
          AZURE
        </Text>

        {/* Satellite Node 3: GCP */}
        <mesh position={[-1.25, -2.16, 0]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#34A853" emissive="#34A853" emissiveIntensity={0.5} />
        </mesh>
        <Text position={[-1.25, -2.56, 0]} fontSize={0.1} color="#4ADE80" anchorX="center">
          GCP
        </Text>
      </group>

      {/* 4. Room Header */}
      <group position={[0, 3.8, -5.7]}>
        <Text fontSize={0.28} color="#60A5FA" anchorX="center">
          DISTRIBUTED SYSTEMS & CLOUD TOPOLOGY // SECTOR 03
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.14} color="#BFDBFE" anchorX="center">
          MULTI-CLOUD INTEROPERABILITY, CONCURRENCY & KUBERNETES MESH
        </Text>
      </group>

      {/* 5. Three Consoles */}
      <group
        position={[-3.6, 0, -2.5]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openDistributedDossier('multicloud');
        }}
        onPointerOver={() => handleHoverNode('multicloud')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.5, 0.65, 1.0, 6]} />
          <meshStandardMaterial color="#0C1324" metalness={0.8} />
        </mesh>
        <group position={[0, 1.45, 0]} rotation={[-0.2, 0.2, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.9, 0.04]} />
            <meshStandardMaterial
              color="#070C18"
              emissive="#3B82F6"
              emissiveIntensity={hoveredNode === 'multicloud' ? 0.4 : 0.1}
            />
          </mesh>
          <Text position={[0, 0.28, 0.03]} fontSize={0.07} color="#60A5FA" anchorX="center">
            [ CLOUD BACKBONE ]
          </Text>
          <Text position={[0, 0.1, 0.03]} fontSize={0.10} color="#FFFFFF" anchorX="center">
            MULTI-CLOUD DICOM
          </Text>
          <Text position={[0, -0.08, 0.03]} fontSize={0.065} color="#93C5FD" anchorX="center">
            AWS + Azure + GCP Streaming
          </Text>
          <Text position={[0, -0.24, 0.03]} fontSize={0.065} color="#38BDF8" anchorX="center">
            ▶ CLICK TO INSPECT ◀
          </Text>
        </group>
        <pointLight position={[0, 1.4, 0.3]} color="#38BDF8" intensity={hoveredNode === 'multicloud' ? 2.5 : 1} distance={3.5} />
      </group>

      <group
        position={[0, 0, -3.8]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openDistributedDossier('concurrency');
        }}
        onPointerOver={() => handleHoverNode('concurrency')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.5, 0.65, 1.0, 6]} />
          <meshStandardMaterial color="#0C1324" metalness={0.8} />
        </mesh>
        <group position={[0, 1.45, 0]} rotation={[-0.2, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.9, 0.04]} />
            <meshStandardMaterial
              color="#070C18"
              emissive="#60A5FA"
              emissiveIntensity={hoveredNode === 'concurrency' ? 0.4 : 0.1}
            />
          </mesh>
          <Text position={[0, 0.28, 0.03]} fontSize={0.07} color="#93C5FD" anchorX="center">
            [ RUNTIME CONCURRENCY ]
          </Text>
          <Text position={[0, 0.1, 0.03]} fontSize={0.10} color="#FFFFFF" anchorX="center">
            JAVA THREAD ENGINE
          </Text>
          <Text position={[0, -0.08, 0.03]} fontSize={0.065} color="#BFDBFE" anchorX="center">
            Lock-Free & Redis Caching
          </Text>
          <Text position={[0, -0.24, 0.03]} fontSize={0.065} color="#60A5FA" anchorX="center">
            ▶ CLICK TO INSPECT ◀
          </Text>
        </group>
        <pointLight position={[0, 1.4, 0.3]} color="#60A5FA" intensity={hoveredNode === 'concurrency' ? 2.5 : 1} distance={3.5} />
      </group>

      <group
        position={[3.6, 0, -2.5]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          openDistributedDossier('k8s');
        }}
        onPointerOver={() => handleHoverNode('k8s')}
        onPointerOut={() => handleHoverNode(null)}
      >
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.5, 0.65, 1.0, 6]} />
          <meshStandardMaterial color="#0C1324" metalness={0.8} />
        </mesh>
        <group position={[0, 1.45, 0]} rotation={[-0.2, -0.2, 0]}>
          <mesh>
            <boxGeometry args={[1.5, 0.9, 0.04]} />
            <meshStandardMaterial
              color="#070C18"
              emissive="#38BDF8"
              emissiveIntensity={hoveredNode === 'k8s' ? 0.4 : 0.1}
            />
          </mesh>
          <Text position={[0, 0.28, 0.03]} fontSize={0.07} color="#38BDF8" anchorX="center">
            [ CONTAINER MESH ]
          </Text>
          <Text position={[0, 0.1, 0.03]} fontSize={0.10} color="#FFFFFF" anchorX="center">
            KUBERNETES & PROMETHEUS
          </Text>
          <Text position={[0, -0.08, 0.03]} fontSize={0.065} color="#BAE6FD" anchorX="center">
            CI/CD & Observability
          </Text>
          <Text position={[0, -0.24, 0.03]} fontSize={0.065} color="#38BDF8" anchorX="center">
            ▶ CLICK TO INSPECT ◀
          </Text>
        </group>
        <pointLight position={[0, 1.4, 0.3]} color="#38BDF8" intensity={hoveredNode === 'k8s' ? 2.5 : 1} distance={3.5} />
      </group>

      {/* 6. Exit Threshold Gateway on the right (leads back to corridor) */}
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
          <meshBasicMaterial color="#3B82F6" transparent opacity={0.18} />
        </mesh>
        <Text position={[0, 0.4, 0.05]} fontSize={0.16} color="#60A5FA" anchorX="center">
          [ ← RETURN TO CORRIDOR ]
        </Text>
        <Text position={[0, 0.1, 0.05]} fontSize={0.11} color="#BFDBFE" anchorX="center">
          (OR PRESS ESCAPE)
        </Text>
      </group>

      <pointLight position={[0, 3.5, 0]} color="#3B82F6" distance={15} intensity={isInside ? 3 : 0.8} />
      <directionalLight position={[-4, 6, 2]} color="#BFDBFE" intensity={0.4} />
    </group>
  );
};
