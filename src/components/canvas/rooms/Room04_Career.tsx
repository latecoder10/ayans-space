import React, { useState } from 'react';
import { SpatialText as Text } from '../common/SpatialText';
import { useScene } from '../../../context/SceneContext';
import { DossierContent } from '../../../types/spatial';
import { soundEngine } from '../../../utils/synthesizer';
import { FloatingCandle, WallTorch } from '../common/HogwartsLighting';
import { HouseBanner } from '../common/HouseBanner';

interface CareerSteleProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  level: string;
  period: string;
  title: string;
  focus: string;
  color: string;
  onClick: () => void;
}

const CareerStele: React.FC<CareerSteleProps> = ({
  position,
  rotation,
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
      rotation={rotation || [0, 0, 0]}
      onClick={(e: { stopPropagation: () => void; delta?: number }) => {
        if (e.delta && e.delta > 8) return;
        e.stopPropagation();
        soundEngine.playAlohomora();
        onClick();
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* Heavy Carved Stone Monolith Stele */}
      <mesh position={[0, 1.6, 0]}>
        <boxGeometry args={[1.7, 3.2, 0.4]} />
        <meshStandardMaterial
          color="#201A15"
          metalness={0.4}
          roughness={0.7}
          emissive={color}
          emissiveIntensity={hovered ? 0.3 : 0.05}
        />
      </mesh>

      {/* Gold Trim Border */}
      <mesh position={[0, 1.6, 0.205]}>
        <planeGeometry args={[1.55, 3.05]} />
        <meshBasicMaterial color="#D4AF37" transparent opacity={0.3} />
      </mesh>

      {/* Inset Parchment Chronicle Slab */}
      <mesh position={[0, 1.6, 0.21]}>
        <planeGeometry args={[1.45, 2.95]} />
        <meshStandardMaterial color="#F7F2E7" roughness={0.9} />
      </mesh>

      {/* Text Elements */}
      <Text position={[0, 2.75, 0.23]} fontSize={0.09} color="#854D0E" anchorX="center">
        {period}
      </Text>
      <Text position={[0, 2.45, 0.23]} fontSize={0.13} color="#1E1E1E" anchorX="center">
        {title}
      </Text>
      <Text position={[0, 2.15, 0.23]} fontSize={0.095} color="#451A03" anchorX="center">
        {level}
      </Text>

      {/* Separator Filigree */}
      <mesh position={[0, 1.9, 0.22]}>
        <planeGeometry args={[1.1, 0.02]} />
        <meshBasicMaterial color="#D4AF37" />
      </mesh>

      <Text position={[0, 1.5, 0.23]} fontSize={0.075} color="#334155" anchorX="center" maxWidth={1.3}>
        {focus}
      </Text>

      {/* Interactive Prompt */}
      {hovered && (
        <Text position={[0, 0.45, 0.23]} fontSize={0.08} color="#B45309" anchorX="center">
          ✦ UNSEAL CHRONICLE ✦
        </Text>
      )}

      {/* Ambient Light */}
      <pointLight position={[0, 1.8, 0.5]} color={color} distance={4} intensity={hovered ? 2.5 : 1.0} />
    </group>
  );
};

export const Room04_Career: React.FC = () => {
  const { openOverlay } = useScene();

  const ROOM_X = 10;
  const ROOM_Z = -90;

  const openCareerDossier = (stage: 'se' | 'ase' | 'edu') => {
    soundEngine.playAlohomora();
    if (stage === 'se') {
      const dossier: DossierContent = {
        id: 'career-se',
        title: 'Software Engineer // Enterprise Engineering & AI Platforms',
        subtitle: 'Global IT & Digital Engineering Firm · 2024 - Present · Bangalore / Global',
        category: 'CAREER CHRONICLE',
        badge: 'Current Role',
        timeline: '2024 - Present',
        clientOrProduct: 'Global Digital Engineering Services',
        overview:
          'Promoted to Software Engineer, driving architecture and implementation for enterprise AI platforms, full-stack systems, and distributed healthcare integrations. Serving as core architect for QodeAI automated SDLC platform and multi-cloud healthcare pipelines.',
        technicalHighlights: [
          'Architected QodeAI automated code-generation and quality gates, reducing enterprise dev cycle times.',
          'Spearheaded multi-cloud DICOM medical imaging backend for a Fortune 500 Healthcare Enterprise across AWS, Azure, and Google Cloud.',
          'Built high-density RAG pipelines with hybrid semantic reranking for IT service management documentation.',
          'Earned Claude Certified Architect credential from Anthropic validating production AI competency.',
        ],
        metricsOrDeliverables: [
          'Core architect on 3 enterprise-grade systems',
          'Production deployments across healthcare, SaaS workflows, and AI automation',
          'Anthropic Claude Certified Architect certification',
        ],
        technologies: ['React', 'TypeScript', 'Java', 'Spring Boot', 'Claude API', 'Kubernetes', 'Docker', 'AWS', 'Azure'],
        repoUrl: 'https://github.com/latecoder10',
      };
      openOverlay(dossier);
    } else if (stage === 'ase') {
      const dossier: DossierContent = {
        id: 'career-ase',
        title: 'Associate Software Engineer // Full-Stack & Microservices',
        subtitle: 'Global IT & Digital Engineering Firm · 2023 - 2024',
        category: 'CAREER CHRONICLE',
        badge: 'Promoted to SE',
        timeline: '2023 - 2024',
        clientOrProduct: 'Enterprise Software Delivery',
        overview:
          'Constructed robust backend Java Spring Boot microservices, high-performance database migrations, and responsive React frontend applications for global enterprise clients including construction-domain workforce SaaS and healthcare providers.',
        technicalHighlights: [
          'Engineered core business logic for enterprise workforce SaaS, delivering biometric verification and onboarding workflows.',
          'Refactored legacy REST APIs into high-throughput non-blocking endpoints, reducing P99 latency by 35%.',
          'Implemented end-to-end automated testing pipelines with JUnit, Mockito, and Cypress achieving 90%+ branch coverage.',
          'Collaborated closely with cross-functional global architecture teams across North America and APAC.',
        ],
        metricsOrDeliverables: [
          'Promoted to Software Engineer within 11 months based on technical impact',
          'Successfully delivered zero-defect sprints across multiple client accounts',
        ],
        technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Git'],
        repoUrl: 'https://github.com/latecoder10',
      };
      openOverlay(dossier);
    } else {
      const dossier: DossierContent = {
        id: 'career-edu',
        title: 'Bachelor of Engineering // Computer Science & Engineering',
        subtitle: 'Sri Venkateshwara College of Engineering (SVCE) · 2019 - 2023',
        category: 'FOUNDATIONAL ACADEMICS',
        badge: 'Completed B.E (CSE)',
        timeline: '2019 - 2023',
        clientOrProduct: 'Academic Degree',
        overview:
          'Intensive four-year engineering curriculum focused on distributed systems, algorithms & data structures, compiler design, database management, and autonomous systems.',
        technicalHighlights: [
          'Advanced Algorithms & Computational Complexity: Graph theory, dynamic programming, distributed consensus.',
          'Operating Systems & Networking: Concurrency, memory virtualization, TCP/IP stack mechanics, sockets.',
          'Software Engineering Principles: Object-oriented design, architectural design patterns, clean code.',
        ],
        metricsOrDeliverables: [
          'Graduated in Computer Science & Engineering',
          'Led campus technical workshops on modern web architecture and microservices',
        ],
        technologies: ['Data Structures', 'Algorithms', 'Distributed Systems', 'Java', 'C++', 'SQL', 'Networks'],
        repoUrl: 'https://github.com/latecoder10',
      };
      openOverlay(dossier);
    }
  };

  return (
    <group position={[ROOM_X, 0, ROOM_Z]}>
      {/* Dedicated Chamber Torchlight & Ambient Radiance */}
      <pointLight position={[0, 3.2, 0]} color="#FFE29A" distance={18} intensity={2.2} />

      {/* 1. Stone Castle Floor */}
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

      {/* 4. Floating Candles */}
      <FloatingCandle position={[-2, 3.5, -2]} bobOffset={0.3} />
      <FloatingCandle position={[2, 3.4, -2]} bobOffset={1.5} />
      <FloatingCandle position={[-2, 3.6, 2]} bobOffset={2.7} />
      <FloatingCandle position={[2, 3.3, 2]} bobOffset={3.9} />
      <WallTorch position={[5.8, 2.2, -3]} rotationY={-Math.PI / 2} />
      <WallTorch position={[5.8, 2.2, 3]} rotationY={-Math.PI / 2} />

      {/* 5. Chamber Title Banner on Back Wall directly facing Entry Arch */}
      <group position={[5.8, 3.6, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[7.2, 0.85]} />
          <meshStandardMaterial color="#1E140C" roughness={0.7} metalness={0.4} />
        </mesh>
        <Text position={[0, 0.14, 0.02]} fontSize={0.24} color="#FDE047" anchorX="center">
          THE GREAT HALL · CAREER CHRONICLE
        </Text>
        <Text position={[0, -0.15, 0.02]} fontSize={0.12} color="#E2E8F0" anchorX="center">
          Enterprise Digital Engineering · Academic Foundations · Professional Milestones
        </Text>
      </group>

      {/* 6. Hogwarts House Banners in Chamber */}
      <HouseBanner position={[5.7, 2.2, -4]} rotationY={-Math.PI / 2} house="gryffindor" />
      <HouseBanner position={[5.7, 2.2, 4]} rotationY={-Math.PI / 2} house="ravenclaw" />

      {/* 7. Career Monolith Steles (Aligned directly in front of door facing incoming user) */}
      {/* Center Stele: Current Senior Role (2024 - PRESENT) directly in front of eye */}
      <CareerStele
        position={[2.8, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        period="2024 - PRESENT"
        title="SOFTWARE ENGINEER"
        level="GLOBAL IT FIRM"
        focus="Leading enterprise AI architecture, multi-cloud streaming pipelines, and autonomous SDLC platforms."
        color="#F59E0B"
        onClick={() => openCareerDossier('se')}
      />

      {/* Left Stele: Academic Foundation (2019 - 2023) angled inward */}
      <CareerStele
        position={[2.3, 0, -2.4]}
        rotation={[0, -Math.PI / 2 - 0.25, 0]}
        period="2019 - 2023"
        title="B.E. IN COMPUTER SCIENCE"
        level="SRI VENKATESHWARA COLL."
        focus="Bachelor of Engineering. Focused on distributed systems, algorithms, OS design, and concurrent networking."
        color="#10B981"
        onClick={() => openCareerDossier('edu')}
      />

      {/* Right Stele: Promotion Fast-Track (2023 - 2024) angled inward */}
      <CareerStele
        position={[2.3, 0, 2.4]}
        rotation={[0, -Math.PI / 2 + 0.25, 0]}
        period="2023 - 2024"
        title="ASSOCIATE SOFTWARE ENGINEER"
        level="GLOBAL IT FIRM"
        focus="Built reactive Java microservices, workforce SaaS modules, and high-throughput REST APIs. Promoted in 11 months."
        color="#38BDF8"
        onClick={() => openCareerDossier('ase')}
      />
    </group>
  );
};
