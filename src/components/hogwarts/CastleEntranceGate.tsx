import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScene } from '../../context/SceneContext';
import { WallTorch } from '../canvas/common/HogwartsLighting';

export const CastleEntranceGate: React.FC = () => {
  const { isGateOpen } = useScene();
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);

  // Smooth lerp for realistic gate hinge opening
  useFrame((_, delta) => {
    const targetLeft = isGateOpen ? -Math.PI / 2.2 : 0;
    const targetRight = isGateOpen ? Math.PI / 2.2 : 0;
    const speed = Math.min(1, delta * 3.2);

    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        leftDoorRef.current.rotation.y,
        targetLeft,
        speed
      );
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(
        rightDoorRef.current.rotation.y,
        targetRight,
        speed
      );
    }
  });

  const DOOR_WIDTH = 3.6;
  const DOOR_HEIGHT = 4.2;
  const GATE_Z = 24;

  return (
    <group position={[0, 0, GATE_Z]}>
      {/* ============================================================ */}
      {/* 1. OUTSIDE APPROACH BRIDGE & FORECOURT (Z = 0 to 14 forward) */}
      {/* ============================================================ */}
      <mesh position={[0, -0.05, 7]} receiveShadow>
        <boxGeometry args={[7.8, 0.1, 14]} />
        <meshStandardMaterial color="#241E18" roughness={0.9} metalness={0.15} />
      </mesh>

      {/* Flagstone mortar accents along bridge */}
      <mesh position={[-2.4, 0.01, 7]}>
        <planeGeometry args={[0.04, 14]} />
        <meshBasicMaterial color="#140F0A" />
      </mesh>
      <mesh position={[2.4, 0.01, 7]}>
        <planeGeometry args={[0.04, 14]} />
        <meshBasicMaterial color="#140F0A" />
      </mesh>

      {/* Left Approach Parapet Wall */}
      <mesh position={[-3.9, 0.6, 7]}>
        <boxGeometry args={[0.4, 1.2, 14]} />
        <meshStandardMaterial color="#2E261F" roughness={0.85} />
      </mesh>
      {/* Right Approach Parapet Wall */}
      <mesh position={[3.9, 0.6, 7]}>
        <boxGeometry args={[0.4, 1.2, 14]} />
        <meshStandardMaterial color="#2E261F" roughness={0.85} />
      </mesh>

      {/* Stone Pedestals & Sconces along Forecourt */}
      <mesh position={[-3.9, 1.3, 10]}>
        <boxGeometry args={[0.55, 0.3, 0.55]} />
        <meshStandardMaterial color="#42362C" roughness={0.7} />
      </mesh>
      <mesh position={[3.9, 1.3, 10]}>
        <boxGeometry args={[0.55, 0.3, 0.55]} />
        <meshStandardMaterial color="#42362C" roughness={0.7} />
      </mesh>
      <WallTorch position={[-3.7, 1.5, 8]} rotationY={Math.PI / 2} />
      <WallTorch position={[3.7, 1.5, 8]} rotationY={-Math.PI / 2} />

      {/* ============================================================ */}
      {/* 2. MASSIVE GOTHIC GATE PILLARS & ARCHWAY                     */}
      {/* ============================================================ */}
      {/* Left Stone Pillar */}
      <group position={[-3.9, 0, 0]}>
        <mesh position={[0, 2.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 4.6, 1.0]} />
          <meshStandardMaterial color="#2A221B" roughness={0.8} metalness={0.2} />
        </mesh>
        {/* Plinth */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.25, 0.6, 1.25]} />
          <meshStandardMaterial color="#1E1712" roughness={0.9} />
        </mesh>
        {/* Capital */}
        <mesh position={[0, 4.6, 0]}>
          <boxGeometry args={[1.2, 0.35, 1.2]} />
          <meshStandardMaterial color="#3C3026" roughness={0.7} />
        </mesh>
        {/* Gothic Finial Spire */}
        <mesh position={[0, 5.2, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.65, 1.2, 4]} />
          <meshStandardMaterial color="#1E1712" roughness={0.85} />
        </mesh>
      </group>

      {/* Right Stone Pillar */}
      <group position={[3.9, 0, 0]}>
        <mesh position={[0, 2.3, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.0, 4.6, 1.0]} />
          <meshStandardMaterial color="#2A221B" roughness={0.8} metalness={0.2} />
        </mesh>
        {/* Plinth */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[1.25, 0.6, 1.25]} />
          <meshStandardMaterial color="#1E1712" roughness={0.9} />
        </mesh>
        {/* Capital */}
        <mesh position={[0, 4.6, 0]}>
          <boxGeometry args={[1.2, 0.35, 1.2]} />
          <meshStandardMaterial color="#3C3026" roughness={0.7} />
        </mesh>
        {/* Gothic Finial Spire */}
        <mesh position={[0, 5.2, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.65, 1.2, 4]} />
          <meshStandardMaterial color="#1E1712" roughness={0.85} />
        </mesh>
      </group>

      {/* Gothic Torus Arch Spanning Overhead */}
      <mesh position={[0, 4.2, 0]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[3.9, 0.35, 12, 32, Math.PI]} />
        <meshStandardMaterial color="#382C22" roughness={0.75} metalness={0.25} />
      </mesh>

      {/* Arch Keystone Crest */}
      <mesh position={[0, 4.65, 0]}>
        <boxGeometry args={[0.6, 0.6, 0.5]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.8} roughness={0.3} />
      </mesh>
      <pointLight position={[0, 4.8, 0.4]} color="#FDE047" distance={8} intensity={1.5} />

      {/* Emerald Castle Aura Rune Light */}
      <pointLight position={[0, 2.2, 0.3]} color="#10B981" distance={12} intensity={2.2} />

      {/* ============================================================ */}
      {/* 3. WROUGHT-IRON GATE DOORS (PIVOTED HINGES)                 */}
      {/* ============================================================ */}

      {/* LEFT GATE DOOR GROUP (Pivot at X = -3.5, Z = 0) */}
      <group ref={leftDoorRef} position={[-3.5, 0, 0]}>
        {/* Shift content so inner edge meets center (X = 0 in world) */}
        <group position={[DOOR_WIDTH / 2, 0, 0]}>
          {/* Main Top and Bottom Horizontal Rails */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[DOOR_WIDTH, 0.16, 0.14]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[0, 2.1, 0]}>
            <boxGeometry args={[DOOR_WIDTH, 0.14, 0.14]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[0, DOOR_HEIGHT - 0.2, 0]}>
            <boxGeometry args={[DOOR_WIDTH, 0.16, 0.14]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.25} />
          </mesh>

          {/* Outer Vertical Framing Rails */}
          <mesh position={[-DOOR_WIDTH / 2 + 0.1, DOOR_HEIGHT / 2, 0]}>
            <boxGeometry args={[0.18, DOOR_HEIGHT, 0.14]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[DOOR_WIDTH / 2 - 0.1, DOOR_HEIGHT / 2, 0]}>
            <boxGeometry args={[0.18, DOOR_HEIGHT, 0.14]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.25} />
          </mesh>

          {/* Vertical Iron Spindles with Spear Spikes */}
          {[-1.3, -0.8, -0.3, 0.2, 0.7, 1.2].map((xOffset, idx) => (
            <group key={`left-bar-${idx}`} position={[xOffset, 0, 0]}>
              <mesh position={[0, DOOR_HEIGHT / 2, 0]}>
                <cylinderGeometry args={[0.045, 0.045, DOOR_HEIGHT, 8]} />
                <meshStandardMaterial color="#151A18" metalness={0.9} roughness={0.3} />
              </mesh>
              {/* Spear Finial Spike */}
              <mesh position={[0, DOOR_HEIGHT + 0.25, 0]}>
                <coneGeometry args={[0.09, 0.5, 6]} />
                <meshStandardMaterial color="#111614" metalness={0.95} roughness={0.2} />
              </mesh>
              {/* Glowing Emerald Runic Ring Accent */}
              {idx % 2 === 0 && (
                <mesh position={[0, 1.8 + Math.sin(idx) * 0.4, 0]}>
                  <torusGeometry args={[0.08, 0.02, 6, 12]} />
                  <meshBasicMaterial color="#34D399" />
                </mesh>
              )}
            </group>
          ))}

          {/* Diagonal Bracing Bars */}
          <mesh position={[0, 1.1, 0]} rotation={[0, 0, 0.65]}>
            <boxGeometry args={[2.8, 0.07, 0.08]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, 3.1, 0]} rotation={[0, 0, -0.65]}>
            <boxGeometry args={[2.8, 0.07, 0.08]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* RIGHT GATE DOOR GROUP (Pivot at X = 3.5, Z = 0) */}
      <group ref={rightDoorRef} position={[3.5, 0, 0]}>
        {/* Shift content so inner edge meets center (X = 0 in world) */}
        <group position={[-DOOR_WIDTH / 2, 0, 0]}>
          {/* Main Top and Bottom Horizontal Rails */}
          <mesh position={[0, 0.25, 0]}>
            <boxGeometry args={[DOOR_WIDTH, 0.16, 0.14]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[0, 2.1, 0]}>
            <boxGeometry args={[DOOR_WIDTH, 0.14, 0.14]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[0, DOOR_HEIGHT - 0.2, 0]}>
            <boxGeometry args={[DOOR_WIDTH, 0.16, 0.14]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.25} />
          </mesh>

          {/* Outer Vertical Framing Rails */}
          <mesh position={[-DOOR_WIDTH / 2 + 0.1, DOOR_HEIGHT / 2, 0]}>
            <boxGeometry args={[0.18, DOOR_HEIGHT, 0.14]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.25} />
          </mesh>
          <mesh position={[DOOR_WIDTH / 2 - 0.1, DOOR_HEIGHT / 2, 0]}>
            <boxGeometry args={[0.18, DOOR_HEIGHT, 0.14]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.25} />
          </mesh>

          {/* Vertical Iron Spindles with Spear Spikes */}
          {[-1.2, -0.7, -0.2, 0.3, 0.8, 1.3].map((xOffset, idx) => (
            <group key={`right-bar-${idx}`} position={[xOffset, 0, 0]}>
              <mesh position={[0, DOOR_HEIGHT / 2, 0]}>
                <cylinderGeometry args={[0.045, 0.045, DOOR_HEIGHT, 8]} />
                <meshStandardMaterial color="#151A18" metalness={0.9} roughness={0.3} />
              </mesh>
              {/* Spear Finial Spike */}
              <mesh position={[0, DOOR_HEIGHT + 0.25, 0]}>
                <coneGeometry args={[0.09, 0.5, 6]} />
                <meshStandardMaterial color="#111614" metalness={0.95} roughness={0.2} />
              </mesh>
              {/* Glowing Emerald Runic Ring Accent */}
              {idx % 2 === 1 && (
                <mesh position={[0, 1.8 + Math.cos(idx) * 0.4, 0]}>
                  <torusGeometry args={[0.08, 0.02, 6, 12]} />
                  <meshBasicMaterial color="#34D399" />
                </mesh>
              )}
            </group>
          ))}

          {/* Diagonal Bracing Bars */}
          <mesh position={[0, 1.1, 0]} rotation={[0, 0, -0.65]}>
            <boxGeometry args={[2.8, 0.07, 0.08]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[0, 3.1, 0]} rotation={[0, 0, 0.65]}>
            <boxGeometry args={[2.8, 0.07, 0.08]} />
            <meshStandardMaterial color="#111614" metalness={0.9} roughness={0.3} />
          </mesh>
        </group>
      </group>
    </group>
  );
};
