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
  const { enterRoom, closestBay, distanceToClosestBay, mode } = useScene();
  const [hovered, setHovered] = useState(false);

  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);
  const glowLightRef = useRef<THREE.PointLight>(null);
  const wasNearby = useRef(false);

  const isNearby = closestBay?.id === bay.id && distanceToClosestBay < 6;
  const isLeft = bay.doorSide === 'left';
  const isRight = bay.doorSide === 'right';
  const isCenter = bay.doorSide === 'center';

  useEffect(() => {
    if (isNearby && !wasNearby.current && mode === 'corridor') {
      soundEngine.playDoorSlide();
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
  const posX = isLeft ? -3.6 : isRight ? 3.6 : 0;
  const posY = 0;
  const posZ = bay.doorZ;
  const rotY = isLeft ? Math.PI / 2 : isRight ? -Math.PI / 2 : 0;

  // Animate door slide when nearby or hovered
  useFrame(() => {
    const targetSlide = isNearby || hovered ? 0.8 : 0; // Doors part open when approaching

    if (leftDoorRef.current) {
      leftDoorRef.current.position.x += ((-0.75 - targetSlide) - leftDoorRef.current.position.x) * 0.1;
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.position.x += ((0.75 + targetSlide) - rightDoorRef.current.position.x) * 0.1;
    }

    if (glowLightRef.current) {
      const targetIntensity = hovered ? 4 : isNearby ? 2.5 : 0.8;
      glowLightRef.current.intensity += (targetIntensity - glowLightRef.current.intensity) * 0.1;
    }
  });

  const handleClick = (e: { stopPropagation: () => void; delta?: number }) => {
    if (e.delta && e.delta > 8) return;
    e.stopPropagation();
    if (mode === 'corridor') {
      enterRoom(bay.id);
    }
  };

  if (isCenter) {
    // Terminal Horizon Portal for Contact Room
    return (
      <group position={[0, posY, posZ]}>
        {/* Arch Frame */}
        <mesh position={[0, 2.5, 0]}>
          <boxGeometry args={[8, 0.4, 0.6]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-3.8, 1.25, 0]}>
          <boxGeometry args={[0.4, 2.5, 0.6]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[3.8, 1.25, 0]}>
          <boxGeometry args={[0.4, 2.5, 0.6]} />
          <meshStandardMaterial color="#1E293B" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Portal Telemetry Sign */}
        <group position={[0, 2.9, 0.35]}>
          <mesh>
            <planeGeometry args={[4.2, 0.5]} />
            <meshBasicMaterial color="#0A0F1D" />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.22}
            color={bay.doorColor}
            anchorX="center"
            anchorY="middle"
          >
            {`${bay.code} // ${bay.title.toUpperCase()}`}
          </Text>
        </group>

        {/* Luminous Threshold Trigger */}
        <mesh
          position={[0, 1.4, 0]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <planeGeometry args={[6.5, 2.8]} />
          <meshBasicMaterial color={bay.doorColor} transparent opacity={hovered ? 0.25 : 0.08} />
        </mesh>

        <pointLight ref={glowLightRef} position={[0, 2.5, -1]} color={bay.doorColor} distance={10} intensity={2} />
      </group>
    );
  }

  return (
    <group position={[posX, posY, posZ]} rotation={[0, rotY, 0]}>
      {/* Outer Doorway Wall Frame (Sawtooth Alcove Entrance) */}
      <mesh position={[0, 2.6, 0]}>
        <boxGeometry args={[3.6, 0.4, 0.5]} />
        <meshStandardMaterial color="#161F30" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-1.7, 1.2, 0]}>
        <boxGeometry args={[0.4, 2.4, 0.5]} />
        <meshStandardMaterial color="#161F30" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[1.7, 1.2, 0]}>
        <boxGeometry args={[0.4, 2.4, 0.5]} />
        <meshStandardMaterial color="#161F30" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Sector Signboard Plaque */}
      <group position={[0, 3.0, 0.28]}>
        <mesh>
          <planeGeometry args={[3.2, 0.42]} />
          <meshBasicMaterial color="#090E17" />
        </mesh>
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.16}
          color={bay.doorColor}
          anchorX="center"
          anchorY="middle"
        >
          {`${bay.code} // ${bay.title}`}
        </Text>
      </group>

      {/* Physical Sliding Doors */}
      <group position={[0, 1.2, 0]}>
        {/* Left Door Leaf */}
        <mesh
          ref={leftDoorRef}
          position={[-0.75, 0, 0]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[1.45, 2.35, 0.15]} />
          <meshStandardMaterial
            color="#0D1522"
            metalness={0.85}
            roughness={0.25}
            emissive={bay.doorColor}
            emissiveIntensity={hovered ? 0.3 : 0.05}
          />
        </mesh>

        {/* Right Door Leaf */}
        <mesh
          ref={rightDoorRef}
          position={[0.75, 0, 0]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <boxGeometry args={[1.45, 2.35, 0.15]} />
          <meshStandardMaterial
            color="#0D1522"
            metalness={0.85}
            roughness={0.25}
            emissive={bay.doorColor}
            emissiveIntensity={hovered ? 0.3 : 0.05}
          />
        </mesh>

        {/* Central Luminous Seam Light */}
        <mesh position={[0, 0, 0.08]}>
          <boxGeometry args={[0.04, 2.3, 0.02]} />
          <meshBasicMaterial color={bay.doorColor} />
        </mesh>
      </group>

      {/* Interactive Enter Prompt when nearby */}
      {(isNearby || hovered) && (
        <group
          position={[0, 1.5, 0.8]}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <mesh>
            <planeGeometry args={[1.8, 0.35]} />
            <meshBasicMaterial color="#000000" transparent opacity={0.7} />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.13}
            color="#FFFFFF"
            anchorX="center"
            anchorY="middle"
          >
            [ CLICK TO ENTER ]
          </Text>
        </group>
      )}

      {/* Threshold Downlight */}
      <pointLight
        ref={glowLightRef}
        position={[0, 2.4, 0.5]}
        color={bay.doorColor}
        distance={6}
        intensity={1.5}
      />
    </group>
  );
};
