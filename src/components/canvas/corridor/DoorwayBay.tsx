import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpatialText as Text } from '../common/SpatialText';
import * as THREE from 'three';
import { SectorBay } from '../../../types/spatial';
import { useScene } from '../../../context/SceneContext';
import { soundEngine } from '../../../utils/synthesizer';

interface DoorwayBayProps {
  bay: SectorBay;
}

export const DoorwayBay: React.FC<DoorwayBayProps> = ({ bay }) => {
  const { enterRoom, closestBay, distanceToClosestBay, mode, currentRoomId } = useScene();
  const [hovered, setHovered] = useState(false);

  const leftDoorHingeRef = useRef<THREE.Group>(null);
  const rightDoorHingeRef = useRef<THREE.Group>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const runeRef = useRef<THREE.Mesh>(null);
  const wasNearby = useRef(false);

  const isNearby = closestBay?.id === bay.id && distanceToClosestBay < 6;
  const isLeft = bay.doorSide === 'left';
  const isRight = bay.doorSide === 'right';
  const isCenter = bay.doorSide === 'center';

  useEffect(() => {
    if (isNearby && !wasNearby.current && mode === 'corridor') {
      soundEngine.playAlohomora();
    }
    wasNearby.current = isNearby;
  }, [isNearby, mode]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
    soundEngine.playHover();
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  };

  // Bay Position in Corridor Coordinates
  const posX = isLeft ? -3.65 : isRight ? 3.65 : 0;
  const posY = 0;
  const posZ = bay.doorZ;
  const rotY = isLeft ? Math.PI / 2 : isRight ? -Math.PI / 2 : 0;

  // Animate medieval door swing when nearby, hovered, or inside this chamber
  useFrame((_, delta) => {
    const isInsideThisRoom = currentRoomId === bay.id;
    const targetAngle = isNearby || hovered || isInsideThisRoom ? Math.PI * 0.45 : 0;

    if (leftDoorHingeRef.current) {
      leftDoorHingeRef.current.rotation.y +=
        (-targetAngle - leftDoorHingeRef.current.rotation.y) * 0.08;
    }
    if (rightDoorHingeRef.current) {
      rightDoorHingeRef.current.rotation.y +=
        (targetAngle - rightDoorHingeRef.current.rotation.y) * 0.08;
    }

    if (glowLightRef.current) {
      const targetIntensity = hovered ? 3.5 : isNearby ? 2.5 : 1.0;
      glowLightRef.current.intensity +=
        (targetIntensity - glowLightRef.current.intensity) * 0.1;
    }

    if (runeRef.current) {
      runeRef.current.rotation.z += delta * 0.8;
    }
  });

  const handleClick = (e: { stopPropagation: () => void; delta?: number }) => {
    if (e.delta && e.delta > 8) return;
    e.stopPropagation();
    if (mode === 'corridor') {
      soundEngine.playAlohomora();
      enterRoom(bay.id);
    }
  };

  if (isCenter) {
    // Grand Panoramic Gateway to the Contact Horizon Platform
    return (
      <group position={[0, posY, posZ]}>
        {/* Stone Gothic Arch Portal Frame */}
        <mesh position={[0, 2.9, 0]}>
          <boxGeometry args={[8.4, 0.6, 0.8]} />
          <meshStandardMaterial color="#221B14" roughness={0.8} metalness={0.2} />
        </mesh>
        <mesh position={[-3.85, 1.45, 0]}>
          <boxGeometry args={[0.6, 2.9, 0.8]} />
          <meshStandardMaterial color="#221B14" roughness={0.8} metalness={0.2} />
        </mesh>
        <mesh position={[3.85, 1.45, 0]}>
          <boxGeometry args={[0.6, 2.9, 0.8]} />
          <meshStandardMaterial color="#221B14" roughness={0.8} metalness={0.2} />
        </mesh>

        {/* Gold Arch Keystone Accent */}
        <mesh position={[0, 3.25, 0.1]}>
          <boxGeometry args={[0.8, 0.45, 0.65]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Portal Ornate Plaque */}
        <group position={[0, 3.4, 0.45]}>
          <mesh>
            <planeGeometry args={[5.8, 0.7]} />
            <meshStandardMaterial color="#1A120B" roughness={0.7} metalness={0.5} />
          </mesh>
          <Text
            position={[0, 0.1, 0.02]}
            fontSize={0.22}
            color="#FDE047"
            anchorX="center"
            anchorY="middle"
          >
            {`✦ ${bay.code} · ${bay.title.toUpperCase()} ✦`}
          </Text>
          <Text
            position={[0, -0.15, 0.02]}
            fontSize={0.11}
            color="#E2E8F0"
            anchorX="center"
            anchorY="middle"
          >
            {bay.subtitle.toUpperCase()}
          </Text>
        </group>

        {/* Golden Threshold Line on Floor */}
        <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[7.2, 0.35]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={hovered ? 0.85 : 0.4} />
        </mesh>

        {/* Unobstructed Clickable Gateway Trigger (Keeps view into horizon clear!) */}
        <mesh
          position={[0, 1.4, 0]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[7.0, 2.8]} />
          <meshBasicMaterial color="#F59E0B" transparent opacity={hovered ? 0.12 : 0.0} depthWrite={false} />
        </mesh>

        {/* Interactive Prompt Hint */}
        {(isNearby || hovered) && (
          <>
            <group
              position={[0, 1.6, 0.6]}
              onClick={handleClick}
              onPointerOver={handlePointerOver}
              onPointerOut={handlePointerOut}
            >
              <mesh>
                <planeGeometry args={[4.4, 0.55]} />
                <meshBasicMaterial color="#0E0C0A" transparent opacity={0.9} />
              </mesh>
              {/* Outer Gold Trim */}
              <mesh position={[0, 0, 0.005]}>
                <ringGeometry args={[2.0, 2.05, 4]} />
                <meshBasicMaterial color="#D4AF37" />
              </mesh>
              <Text
                position={[0, 0, 0.02]}
                fontSize={0.16}
                color="#FDE047"
                anchorX="center"
                anchorY="middle"
              >
                ✦ [ STEP ONTO CONTACT HORIZON PLATFORM ] ✦
              </Text>
            </group>

            <pointLight
              ref={glowLightRef}
              position={[0, 2.5, -0.5]}
              color="#F59E0B"
              distance={12}
              intensity={hovered ? 3.0 : 1.8}
            />
          </>
        )}
      </group>
    );
  }

  return (
    <group position={[posX, posY, posZ]} rotation={[0, rotY, 0]}>
      {/* 1. Outer Stone Arch Alcove */}
      <mesh position={[0, 2.7, 0]}>
        <boxGeometry args={[3.8, 0.5, 0.6]} />
        <meshStandardMaterial color="#221C16" roughness={0.85} metalness={0.2} />
      </mesh>
      <mesh position={[-1.8, 1.35, 0]}>
        <boxGeometry args={[0.45, 2.7, 0.6]} />
        <meshStandardMaterial color="#221C16" roughness={0.85} metalness={0.2} />
      </mesh>
      <mesh position={[1.8, 1.35, 0]}>
        <boxGeometry args={[0.45, 2.7, 0.6]} />
        <meshStandardMaterial color="#221C16" roughness={0.85} metalness={0.2} />
      </mesh>

      {/* 2. Carved Chamber Header Plaque */}
      <group position={[0, 3.15, 0.32]}>
        <mesh>
          <planeGeometry args={[3.4, 0.45]} />
          <meshStandardMaterial color="#1E140C" roughness={0.6} metalness={0.4} />
        </mesh>
        <Text
          position={[0, 0.05, 0.01]}
          fontSize={0.15}
          color="#FDE047"
          anchorX="center"
          anchorY="middle"
        >
          {`${bay.code} · ${bay.title}`}
        </Text>
        <Text
          position={[0, -0.12, 0.01]}
          fontSize={0.08}
          color="#E2E8F0"
          anchorX="center"
          anchorY="middle"
        >
          {bay.subtitle}
        </Text>
      </group>

      {/* 3. Medieval Dark Oak Double Doors with Iron Straps */}
      <group position={[0, 0, 0]}>
        {/* Left Door Leaf with Hinge at X = -1.5 */}
        <group ref={leftDoorHingeRef} position={[-1.5, 0, 0]}>
          <mesh
            position={[0.72, 1.25, 0]}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <boxGeometry args={[1.45, 2.45, 0.12]} />
            <meshStandardMaterial
              color="#2B1A10"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>

          {/* Left Door Wrought Iron Straps */}
          <mesh position={[0.72, 1.9, 0.065]}>
            <boxGeometry args={[1.4, 0.08, 0.02]} />
            <meshStandardMaterial color="#1E1E1E" metalness={0.85} roughness={0.3} />
          </mesh>
          <mesh position={[0.72, 0.6, 0.065]}>
            <boxGeometry args={[1.4, 0.08, 0.02]} />
            <meshStandardMaterial color="#1E1E1E" metalness={0.85} roughness={0.3} />
          </mesh>

          {/* Left Door Iron Studs */}
          <mesh position={[1.1, 1.25, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.04, 6]} />
            <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>

        {/* Right Door Leaf with Hinge at X = +1.5 */}
        <group ref={rightDoorHingeRef} position={[1.5, 0, 0]}>
          <mesh
            position={[-0.72, 1.25, 0]}
            onClick={handleClick}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
          >
            <boxGeometry args={[1.45, 2.45, 0.12]} />
            <meshStandardMaterial
              color="#2B1A10"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>

          {/* Right Door Wrought Iron Straps */}
          <mesh position={[-0.72, 1.9, 0.065]}>
            <boxGeometry args={[1.4, 0.08, 0.02]} />
            <meshStandardMaterial color="#1E1E1E" metalness={0.85} roughness={0.3} />
          </mesh>
          <mesh position={[-0.72, 0.6, 0.065]}>
            <boxGeometry args={[1.4, 0.08, 0.02]} />
            <meshStandardMaterial color="#1E1E1E" metalness={0.85} roughness={0.3} />
          </mesh>

          {/* Right Door Iron Studs */}
          <mesh position={[-1.1, 1.25, 0.07]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.03, 0.03, 0.04, 6]} />
            <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </group>

      {/* 4. Magical Alohomora Runestone Floating in Doorway */}
      <group
        position={[0, 1.35, 0.4]}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <mesh ref={runeRef}>
          <ringGeometry args={[0.32, 0.36, 16]} />
          <meshBasicMaterial color="#FDE047" transparent opacity={hovered ? 0.9 : 0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 5. Interactive Prompt Banner when nearby */}
      {(isNearby || hovered) && (
        <group
          position={[0, 1.5, 0.75]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <mesh>
            <planeGeometry args={[2.5, 0.4]} />
            <meshBasicMaterial color="#120E0A" transparent opacity={0.9} />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.14}
            color="#FDE047"
            anchorX="center"
            anchorY="middle"
          >
            ✦ ALOHOMORA · ENTER ✦
          </Text>
        </group>
      )}

      {/* 6. Warm Chamber Threshold Light (Active when approaching) */}
      {(isNearby || hovered) && (
        <pointLight
          ref={glowLightRef}
          position={[0, 2.2, 0.4]}
          color="#F59E0B"
          distance={7}
          intensity={hovered ? 2.5 : 1.6}
        />
      )}
    </group>
  );
};
