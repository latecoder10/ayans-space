import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SpatialText as Text } from '../common/SpatialText';
import { soundEngine } from '../../../utils/synthesizer';
import { WallTorch } from '../common/HogwartsLighting';
import { useScene } from '../../../context/SceneContext';
import { PERSONAL_INFO } from '../../../data/resumeData';

interface ContactStationProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  badgeText: string;
  title: string;
  value: string;
  description: string;
  actionText: string;
  color: string;
  onClick: () => void;
  isPrimary?: boolean;
}

const ContactStation: React.FC<ContactStationProps> = ({
  position,
  rotation = [0, 0, 0],
  badgeText,
  title,
  value,
  description,
  actionText,
  color,
  onClick,
  isPrimary = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * (hovered ? 0.8 : 0.2);
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
    <group
      position={position}
      rotation={rotation}
      onClick={(e: { stopPropagation: () => void; delta?: number }) => {
        if (e.delta && e.delta > 8) return;
        e.stopPropagation();
        soundEngine.playAlohomora();
        onClick();
      }}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      {/* 1. Pedestal Base */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[isPrimary ? 1.4 : 1.1, isPrimary ? 1.6 : 1.3, 1.0, 16]} />
        <meshStandardMaterial color="#1A140E" roughness={0.8} metalness={0.3} />
      </mesh>

      {/* Gold Ring Trim at Pedestal Base */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[isPrimary ? 1.65 : 1.35, isPrimary ? 1.7 : 1.4, 0.1, 16]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Rotating Astrolabe Rune Ring on Floor */}
      <mesh ref={ringRef} position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[isPrimary ? 1.75 : 1.45, isPrimary ? 1.95 : 1.6, 32]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.85 : 0.45} />
      </mesh>

      {/* 2. Slanted Console Desk Top */}
      <group position={[0, 1.05, 0]} rotation={[-0.25, 0, 0]}>
        {/* Console Plinth Body */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[isPrimary ? 3.0 : 2.5, 1.25, 0.25]} />
          <meshStandardMaterial
            color="#140F0A"
            roughness={0.6}
            metalness={0.4}
            emissive={color}
            emissiveIntensity={hovered ? 0.35 : 0.08}
          />
        </mesh>

        {/* Gold Border Trim */}
        <mesh position={[0, 0, 0.13]}>
          <planeGeometry args={[isPrimary ? 2.9 : 2.4, 1.15]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Dark Obsidian Cartouche Plate */}
        <mesh position={[0, 0, 0.135]}>
          <planeGeometry args={[isPrimary ? 2.8 : 2.3, 1.05]} />
          <meshStandardMaterial color="#0C0906" roughness={0.7} metalness={0.2} />
        </mesh>

        {/* Badge Label */}
        <Text
          position={[0, 0.38, 0.15]}
          fontSize={0.075}
          color="#D4AF37"
          anchorX="center"
          anchorY="middle"
        >
          {badgeText.toUpperCase()}
        </Text>

        {/* Station Title */}
        <Text
          position={[0, 0.22, 0.15]}
          fontSize={0.13}
          color="#FDE047"
          anchorX="center"
          anchorY="middle"
        >
          {title.toUpperCase()}
        </Text>

        {/* Station Value / Address */}
        <Text
          position={[0, 0.02, 0.15]}
          fontSize={isPrimary ? 0.14 : 0.11}
          color="#FFFDF0"
          anchorX="center"
          anchorY="middle"
        >
          {value}
        </Text>

        {/* Station Description */}
        <Text
          position={[0, -0.16, 0.15]}
          fontSize={0.075}
          color="#CBD5E1"
          anchorX="center"
          anchorY="middle"
          maxWidth={isPrimary ? 2.6 : 2.2}
        >
          {description}
        </Text>

        {/* Interactive Action Button Pill */}
        <group position={[0, -0.36, 0.15]}>
          <mesh>
            <planeGeometry args={[isPrimary ? 2.2 : 1.9, 0.26]} />
            <meshBasicMaterial color={hovered ? '#D4AF37' : '#2A1F14'} />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.09}
            color={hovered ? '#000000' : '#FDE047'}
            anchorX="center"
            anchorY="middle"
          >
            {hovered ? `✦ ${actionText} ✦` : actionText}
          </Text>
        </group>
      </group>

      {/* Dedicated Warm Station Illumination */}
      <pointLight
        position={[0, 1.6, 0.4]}
        color={color}
        distance={5}
        intensity={hovered ? 3.0 : 1.5}
      />
    </group>
  );
};

export const Room06_Contact: React.FC = () => {
  const { openContactModal } = useScene();

  const handleOpenEmail = () => {
    window.location.href = `mailto:${PERSONAL_INFO.contact.email}?subject=Portfolio%20Inquiry%20-%20Ayan%20Pal`;
  };

  const handleOpenLinkedIn = () => {
    window.open(PERSONAL_INFO.contact.linkedin, '_blank');
  };

  const handleOpenGitHub = () => {
    window.open(PERSONAL_INFO.contact.github, '_blank');
  };

  const handleDownloadResume = () => {
    soundEngine.playAlohomora();
    const link = document.createElement('a');
    link.href = '/my resume.pdf';
    link.download = 'Ayan_Pal_Resume.pdf';
    link.click();
  };

  return (
    <group position={[0, 0, 0]}>
      {/* =========================================================================
          1. ENTRANCE PROMENADE (Connecting corridor portal at Z=-150 to Deck Z=-157)
         ========================================================================= */}
      {/* Promenade Flagstone Floor */}
      <mesh position={[0, -0.05, -153.5]}>
        <boxGeometry args={[7.8, 0.1, 7.0]} />
        <meshStandardMaterial color="#221B14" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Left Promenade Stone Balustrade */}
      <mesh position={[-3.85, 0.45, -153.5]}>
        <boxGeometry args={[0.3, 0.9, 7.0]} />
        <meshStandardMaterial color="#2B221A" roughness={0.85} />
      </mesh>

      {/* Right Promenade Stone Balustrade */}
      <mesh position={[3.85, 0.45, -153.5]}>
        <boxGeometry args={[0.3, 0.9, 7.0]} />
        <meshStandardMaterial color="#2B221A" roughness={0.85} />
      </mesh>

      {/* Promenade Wall Torches */}
      <WallTorch position={[-3.7, 1.2, -152]} rotationY={Math.PI / 2} />
      <WallTorch position={[3.7, 1.2, -152]} rotationY={-Math.PI / 2} />
      <WallTorch position={[-3.7, 1.2, -155.5]} rotationY={Math.PI / 2} />
      <WallTorch position={[3.7, 1.2, -155.5]} rotationY={-Math.PI / 2} />

      {/* =========================================================================
          2. GRAND CIRCULAR OBSERVATION DECK (Center: X=0, Z=-166, Radius=10.5m)
         ========================================================================= */}
      {/* Primary Circular Flagstone Deck Base */}
      <mesh position={[0, -0.05, -166]}>
        <cylinderGeometry args={[10.5, 10.8, 0.2, 48]} />
        <meshStandardMaterial color="#1E1710" roughness={0.8} metalness={0.2} />
      </mesh>

      {/* Astrolabe Brass Outer Ring Inlay on Deck */}
      <mesh position={[0, 0.015, -166]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[8.8, 9.0, 48]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Astrolabe Brass Inner Ring Inlay on Deck */}
      <mesh position={[0, 0.015, -166]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.2, 5.35, 48]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Astrolabe Central Rune Mandala Disk */}
      <mesh position={[0, 0.02, -166]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.5, 32]} />
        <meshStandardMaterial
          color="#2A1E14"
          roughness={0.7}
          metalness={0.4}
          emissive="#D4AF37"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Perimeter Cantilevered Balustrade (With Open Passage on +Z Entrance) */}
      <mesh position={[0, 0.45, -166]}>
        <cylinderGeometry
          args={[10.4, 10.4, 0.9, 48, 1, true, -Math.PI * 0.72, Math.PI * 1.44]}
        />
        <meshStandardMaterial color="#2B221A" roughness={0.85} side={THREE.DoubleSide} />
      </mesh>

      {/* Perimeter Beacon Pillars & Torches */}
      <WallTorch position={[-8.8, 1.2, -161]} rotationY={0.9} />
      <WallTorch position={[8.8, 1.2, -161]} rotationY={-0.9} />
      <WallTorch position={[-9.5, 1.2, -168]} rotationY={1.3} />
      <WallTorch position={[9.5, 1.2, -168]} rotationY={-1.3} />
      <WallTorch position={[-5.2, 1.2, -174.5]} rotationY={2.2} />
      <WallTorch position={[5.2, 1.2, -174.5]} rotationY={-2.2} />

      {/* Main Overhead Deck Illumination (Radiant, warm starlight and beacon light) */}
      <pointLight position={[0, 5.0, -166]} color="#FFE8B0" distance={28} intensity={3.0} />
      <pointLight position={[0, 2.5, -160]} color="#F5D77F" distance={16} intensity={2.0} />
      <pointLight position={[0, 2.5, -172]} color="#60A5FA" distance={18} intensity={1.8} />

      {/* =========================================================================
          3. PANORAMIC CELESTIAL HORIZON & DISTANT HOGWARTS VISTA
         ========================================================================= */}
      <group position={[0, 0, -178]}>
        {/* Glowing Horizon Ribbon (Skyline Boundary) */}
        <mesh position={[0, 1.5, 0]}>
          <planeGeometry args={[36, 4.5]} />
          <meshBasicMaterial color="#1E172C" transparent opacity={0.65} />
        </mesh>

        {/* Distant Mountain Ridges */}
        <mesh position={[-11, 2.0, -2]}>
          <coneGeometry args={[7.0, 6.0, 6]} />
          <meshStandardMaterial color="#0A0D18" roughness={0.9} />
        </mesh>
        <mesh position={[11, 2.5, -2]}>
          <coneGeometry args={[8.0, 7.0, 6]} />
          <meshStandardMaterial color="#080B14" roughness={0.9} />
        </mesh>

        {/* Distant Castle Tower Spires Silhouettes */}
        <mesh position={[-4, 4.2, -1]}>
          <coneGeometry args={[1.4, 5.5, 8]} />
          <meshStandardMaterial color="#0C0E1A" roughness={0.9} />
        </mesh>
        <mesh position={[4, 5.0, -1]}>
          <coneGeometry args={[1.6, 6.5, 8]} />
          <meshStandardMaterial color="#0B0D18" roughness={0.9} />
        </mesh>
        <mesh position={[0, 6.2, -3]}>
          <coneGeometry args={[2.0, 8.5, 8]} />
          <meshStandardMaterial color="#070912" roughness={0.9} />
        </mesh>
      </group>

      {/* =========================================================================
          4. GRAND PLATFORM TITLE PLAQUE (Facing user from rear parapet)
         ========================================================================= */}
      <group position={[0, 3.8, -174.5]}>
        {/* Backing Frame */}
        <mesh>
          <planeGeometry args={[8.2, 1.1]} />
          <meshStandardMaterial color="#140E0A" roughness={0.7} metalness={0.5} />
        </mesh>
        {/* Gold Border */}
        <mesh position={[0, 0, 0.005]}>
          <planeGeometry args={[8.0, 0.95]} />
          <meshBasicMaterial color="#D4AF37" transparent opacity={0.35} />
        </mesh>

        <Text position={[0, 0.22, 0.02]} fontSize={0.25} color="#FDE047" anchorX="center">
          ✦ CNT.06 · CONTACT HORIZON PLATFORM ✦
        </Text>
        <Text position={[0, -0.05, 0.02]} fontSize={0.12} color="#FFFDF0" anchorX="center">
          Direct Communication Dispatch & Professional Network // Ayan Pal
        </Text>
        <Text position={[0, -0.28, 0.02]} fontSize={0.085} color="#A89874" anchorX="center">
          Kolkata, India · Open to High-Impact Full-Time & Architecture Advisory Roles
        </Text>
      </group>

      {/* =========================================================================
          5. THE 5 INTERACTIVE CONTACT STATIONS (Arranged symmetrically & legibly)
         ========================================================================= */}
      {/* 5.1 Center-Stage: Direct Message Dispatch Console */}
      <ContactStation
        position={[0, 0, -162.0]}
        rotation={[0, 0, 0]}
        badgeText="PRIMARY DISPATCH STATION"
        title="DIRECT COMMUNICATION DISPATCH"
        value="TRANSMIT DIRECT MESSAGE"
        description="Launch official communication console to send direct technical inquiries or opportunity briefs."
        actionText="OPEN DISPATCH CONSOLE"
        color="#EC4899"
        onClick={openContactModal}
        isPrimary={true}
      />

      {/* 5.2 Inner-Left: Direct Email Inbox */}
      <ContactStation
        position={[-2.2, 0, -166.5]}
        rotation={[0, 0.18, 0]}
        badgeText="DIRECT ELECTRONIC MAIL"
        title="INBOX DISPATCH"
        value={PERSONAL_INFO.contact.email}
        description="Direct inbox for enterprise architecture, LLM pipelines, or full-stack engineering."
        actionText="COMPOSE DIRECT EMAIL"
        color="#F59E0B"
        onClick={handleOpenEmail}
      />

      {/* 5.3 Inner-Right: LinkedIn Professional Network */}
      <ContactStation
        position={[2.2, 0, -166.5]}
        rotation={[0, -0.18, 0]}
        badgeText="PROFESSIONAL NETWORK"
        title="LINKEDIN PROFILE"
        value="linkedin.com/in/ayan-pal-00067b1b6"
        description="Full professional history, endorsements, patents, and engineering track record."
        actionText="OPEN LINKEDIN PROFILE"
        color="#38BDF8"
        onClick={handleOpenLinkedIn}
      />

      {/* 5.4 Outer-Left: GitHub Codebase */}
      <ContactStation
        position={[-5.0, 0, -164.0]}
        rotation={[0, 0.42, 0]}
        badgeText="OPEN-SOURCE ARCHITECTURE"
        title="GITHUB REPOSITORY"
        value="github.com/latecoder10"
        description="Multi-agent orchestration engines, high-speed OCR benchmarks, and full-stack systems."
        actionText="EXPLORE GITHUB CODE"
        color="#A855F7"
        onClick={handleOpenGitHub}
      />

      {/* 5.5 Outer-Right: Official Curriculum Vitae */}
      <ContactStation
        position={[5.0, 0, -164.0]}
        rotation={[0, -0.42, 0]}
        badgeText="VERIFIED CREDENTIALS"
        title="CURRICULUM VITAE"
        value="Ayan_Pal_Resume.pdf"
        description="Anthropic Claude Certified Architect · 100MB OCR Engine · Multi-Cloud DICOM Systems."
        actionText="DOWNLOAD PDF RESUME"
        color="#10B981"
        onClick={handleDownloadResume}
      />
    </group>
  );
};

export default Room06_Contact;
