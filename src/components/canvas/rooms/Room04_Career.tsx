import React, { useState } from 'react';
import { SpatialText as Text } from '../common/SpatialText';
import { useScene } from '../../../context/SceneContext';
import { DossierContent } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';

interface CareerMonolithProps {
  position: [number, number, number];
  level: string;
  period: string;
  title: string;
  focus: string;
  color: string;
  onClick: () => void;
}

const CareerMonolith: React.FC<CareerMonolithProps> = ({
  position,
  level,
  period,
  title,
  focus,
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
      onClick={(e: { stopPropagation: () => void; delta?: number }) => {
        if (e.delta && e.delta > 8) return;
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Heavy Carbon Slab Monolith */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[1.6, 3.2, 0.4]} />
        <meshStandardMaterial
          color="#09121A"
          metalness={0.9}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 0.35 : 0.05}
        />
      </mesh>

      {/* Luminous Edge Accent */}
      <mesh position={[0, 1.6, 0.21]}>
        <planeGeometry args={[1.4, 0.04]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Inscription Content */}
      <Text position={[0, 2.7, 0.22]} fontSize={0.11} color={color} anchorX="center">
        {level}
      </Text>
      <Text position={[0, 2.4, 0.22]} fontSize={0.08} color="#94A3B8" anchorX="center">
        {period}
      </Text>
      <Text position={[0, 1.9, 0.22]} fontSize={0.12} color="#FFFFFF" anchorX="center">
        {title}
      </Text>
      <Text position={[0, 1.4, 0.22]} fontSize={0.075} color="#A7F3D0" anchorX="center">
        {focus}
      </Text>

      {/* Inspection prompt on hover */}
      {hovered && (
        <Text position={[0, 0.6, 0.22]} fontSize={0.075} color="#34D399" anchorX="center">
          ▶ CLICK TO EXAMINE MILESTONES ◀
        </Text>
      )}

      <pointLight position={[0, 1.6, 0.5]} color={color} distance={3.5} intensity={hovered ? 2.5 : 0.8} />
    </group>
  );
};

export const Room04_Career: React.FC = () => {
  const { openOverlay, exitRoom, currentRoomId, mode } = useScene();
  const isInside = (mode === 'room' || mode === 'transitioning') && currentRoomId === 'room-career';

  const ROOM_X = 14;
  const ROOM_Z = -90;

  const openCareerLevel = (levelIndex: number) => {
    const levels: DossierContent[] = [
      {
        id: 'career-l1',
        title: 'Level 01 // Computational & Algorithmic Grounding',
        subtitle: 'B.E. in Computer Science (SVCE Bangalore, 8.54 CGPA)',
        category: 'CAREER FOUNDATIONS',
        timeline: '2019 – 2023',
        clientOrProduct: 'SVCE Bangalore',
        overview:
          'Rigorous foundation in computer science principles: algorithmic complexity, memory management, concurrent threading, network socket programming, and database normalization. Formed the engineering discipline required for large-scale distributed systems.',
        technicalHighlights: [
          'Algorithmic Rigor: Deep expertise in asymptotic analysis, data structures, and optimized search/graph algorithms.',
          'Memory & Concurrency: Core JVM memory models, garbage collection tuning, multithreaded synchronization primitives.',
          'Database Architecture: Relational schema design, normalization forms, index tuning, and ACID transaction semantics.',
          'System Programming: TCP/IP socket communication, HTTP protocol specifications, and POSIX system calls.',
        ],
        metricsOrDeliverables: [
          'Graduated with First Class Distinction (8.54 CGPA)',
          'Comprehensive foundations in Java, C/C++, and Python',
          'Core grounding in distributed computing fundamentals',
        ],
        technologies: ['Java', 'C/C++', 'Python', 'SQL', 'Data Structures', 'Algorithms', 'Operating Systems', 'Networking'],
        diagramType: 'career_progression',
      },
      {
        id: 'career-l2',
        title: 'Level 02 // Enterprise Full-Stack Core & Mobile Companion',
        subtitle: 'Associate Software Engineer at Estuate Inc. (Lumberfi SaaS Engine)',
        category: 'ENTERPRISE SAAS',
        timeline: 'Jan 2023 – Dec 2023',
        clientOrProduct: 'Estuate Inc. / Lumberfi',
        overview:
          'Delivered production-grade full-stack features for multi-tenant enterprise clients, transitioning complex corporate onboarding flows into responsive React interfaces and extending core features into a companion React Native mobile timesheet app.',
        technicalHighlights: [
          'Modular Frontend Architecture: Component design systems with React and Material UI integrated with secure REST endpoints.',
          'Mobile Extension: Engineered React Native companion application enabling timesheet entry and document uploads on iOS/Android.',
          'Quality Assurance: Comprehensive Jest unit testing enforcing zero state regressions across critical onboarding pathways.',
          'Enterprise Containerization: Deployed via Docker with GitHub Actions automated CI/CD pipelines.',
        ],
        metricsOrDeliverables: [
          'Multi-tenant workforce onboarding delivered on schedule',
          'Cross-platform React Native companion app released',
          'Extensive unit test coverage with Jest and React Testing Library',
        ],
        technologies: ['React', 'TypeScript', 'React Native', 'Material UI', 'REST APIs', 'Jest', 'Docker', 'GitHub Actions'],
        diagramType: 'career_progression',
      },
      {
        id: 'career-l3',
        title: 'Level 03 // Distributed Scale & Multi-Cloud Healthcare Imaging',
        subtitle: 'Software Engineer at Estuate Inc. (Roche Healthcare Backbone)',
        category: 'DISTRIBUTED SYSTEMS',
        timeline: 'Jan 2024 – Dec 2025',
        clientOrProduct: 'Estuate Inc. / Roche',
        overview:
          'Engineered a distributed, concurrent Java microservices data backbone streaming petabyte-scale medical imaging (DICOM) across AWS, Azure, and Google Cloud with strict cryptographic integrity and high-throughput concurrency.',
        technicalHighlights: [
          'Heterogeneous Cloud Storage: Integrated AWS S3, Azure Blob Storage, and GCP Cloud Storage into a unified ingestion pipeline.',
          'Concurrent Java Workers: Custom thread pools with Redis caching to maximize data throughput and minimize latency.',
          'Automated CI/CD & Verification: Comprehensive JUnit and Mockito test suites orchestrated on Kubernetes clusters.',
          'Observability Pipeline: Real-time Prometheus metrics and Grafana dashboards for latency and queue monitoring.',
        ],
        metricsOrDeliverables: [
          'Interoperable across AWS, Azure, and Google Cloud',
          'Petabyte-scale DICOM medical imaging streaming',
          'Production Kubernetes deployments with zero-downtime rollouts',
        ],
        technologies: ['Java', 'Spring Boot', 'AWS', 'Azure', 'GCP', 'Redis', 'Kubernetes', 'Prometheus', 'Grafana'],
        diagramType: 'career_progression',
      },
      {
        id: 'career-l4',
        title: 'Level 04 // Autonomous AI Product Engineering Apex',
        subtitle: 'AI Systems Architect & Full Stack Lead at Estuate Inc. (QodeAI & Agentic Pipelines)',
        category: 'AI PRODUCT ENGINEERING',
        timeline: 'Apr 2026 – Present',
        clientOrProduct: 'Estuate Inc. / Internal & Enterprise Clients',
        overview:
          'Architected and delivered QodeAI: an autonomous SDLC platform translating raw requirements into verified enterprise artifacts. Developed 100MB OCR subagent workflows, ServiceNow vector embedding plugins, and earned Claude Certified Architect Foundations.',
        technicalHighlights: [
          'Multi-Provider LLM Orchestration: Quota-aware API key rotation and automated failover across Anthropic Claude and OpenAI.',
          'Vector Retrieval (RAG): ChromaDB high-dimensional embeddings enabling semantic and flash search across enterprise specs.',
          '100MB OCR Subagents Pipeline: Multi-stage coordinator pattern spawning parallel chunk parsers with deterministic JSON schemas.',
          'Claude Certified Architect: Verified competency in context engineering, deterministic tool usage, and agentic workflows.',
        ],
        metricsOrDeliverables: [
          'Single-handedly architected and delivered QodeAI backend',
          'Live enterprise technical client demonstrations conducted',
          'Claude Certified Architect Foundations credential achieved',
        ],
        technologies: ['Java', 'Spring Boot', 'React', 'LangChain', 'ChromaDB', 'Claude API', 'OpenAI API', 'Docker'],
        diagramType: 'career_progression',
      },
    ];

    openOverlay(levels[levelIndex]);
  };

  return (
    <group position={[ROOM_X, 0, ROOM_Z]}>
      {/* 1. Floor & Ceiling */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[14, 0.1, 12]} />
        <meshStandardMaterial color="#060F0C" metalness={0.85} roughness={0.2} />
      </mesh>
      <mesh position={[0, 4.4, 0]}>
        <boxGeometry args={[14, 0.2, 12]} />
        <meshStandardMaterial color="#040A08" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 2. Perimeter Walls */}
      <mesh position={[0, 2.2, -6]}>
        <boxGeometry args={[14, 4.4, 0.3]} />
        <meshStandardMaterial color="#0B1713" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[7, 2.2, 0]}>
        <boxGeometry args={[0.3, 4.4, 12]} />
        <meshStandardMaterial color="#0B1713" metalness={0.7} roughness={0.4} />
      </mesh>
      <mesh position={[0, 2.2, 6]}>
        <boxGeometry args={[14, 4.4, 0.3]} />
        <meshStandardMaterial color="#0B1713" metalness={0.7} roughness={0.4} />
      </mesh>

      {/* 3. Room Header */}
      <group position={[0, 3.8, -5.7]}>
        <Text fontSize={0.28} color="#34D399" anchorX="center">
          ARCHITECTURAL CAREER EVOLUTION // SECTOR 04
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.14} color="#A7F3D0" anchorX="center">
          SPATIAL DOMAIN ESCALATION: ALGORITHMIC RIGOR TO AUTONOMOUS AI APEX
        </Text>
      </group>

      {/* 4. Four Monumental Career Monoliths Spaced Across the Room */}
      <CareerMonolith
        position={[-4.5, 0, -2]}
        level="LEVEL 01"
        period="2019 – 2023"
        title="CS FOUNDATIONS"
        focus="Algorithms, Concurrency & JVM"
        color="#10B981"
        onClick={() => openCareerLevel(0)}
      />

      <CareerMonolith
        position={[-1.5, 0, -2]}
        level="LEVEL 02"
        period="2023"
        title="ENTERPRISE SAAS"
        focus="Full-Stack Core & Mobile App"
        color="#34D399"
        onClick={() => openCareerLevel(1)}
      />

      <CareerMonolith
        position={[1.5, 0, -2]}
        level="LEVEL 03"
        period="2024 – 2025"
        title="DISTRIBUTED SCALE"
        focus="Roche DICOM Across 3 Clouds"
        color="#6EE7B7"
        onClick={() => openCareerLevel(2)}
      />

      <CareerMonolith
        position={[4.5, 0, -2]}
        level="LEVEL 04"
        period="2026 – PRESENT"
        title="AUTONOMOUS AI"
        focus="QodeAI & Agentic Pipelines"
        color="#A7F3D0"
        onClick={() => openCareerLevel(3)}
      />

      {/* 5. Exit Threshold Gateway on the left */}
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
          <meshBasicMaterial color="#10B981" transparent opacity={0.18} />
        </mesh>
        <Text position={[0, 0.4, 0.05]} fontSize={0.16} color="#34D399" anchorX="center">
          [ ← RETURN TO CORRIDOR ]
        </Text>
        <Text position={[0, 0.1, 0.05]} fontSize={0.11} color="#A7F3D0" anchorX="center">
          (OR PRESS ESCAPE)
        </Text>
      </group>

      <pointLight position={[0, 3.5, 0]} color="#10B981" distance={15} intensity={isInside ? 3 : 0.8} />
      <directionalLight position={[4, 6, 2]} color="#D1FAE5" intensity={0.4} />
    </group>
  );
};
