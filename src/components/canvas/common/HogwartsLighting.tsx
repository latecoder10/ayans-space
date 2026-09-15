import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingCandleProps {
  position: [number, number, number];
  bobOffset?: number;
  bobSpeed?: number;
}

export const FloatingCandle: React.FC<FloatingCandleProps> = ({
  position,
  bobOffset = 0,
  bobSpeed = 1.2,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const flameRef = useRef<THREE.Mesh>(null);
  const initialY = position[1];

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * bobSpeed + bobOffset;
    if (groupRef.current) {
      groupRef.current.position.y = initialY + Math.sin(t) * 0.06;
    }
    if (flameRef.current) {
      const flicker = 0.92 + Math.sin(t * 6) * 0.12;
      flameRef.current.scale.set(flicker, flicker * 1.1, flicker);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Wax Candle Body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.04, 0.045, 0.45, 8]} />
        <meshStandardMaterial color="#FAF5EB" roughness={0.7} />
      </mesh>

      {/* Black Wick */}
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.005, 0.005, 0.05, 4]} />
        <meshBasicMaterial color="#1E1E1E" />
      </mesh>

      {/* Glowing Teardrop Flame */}
      <mesh ref={flameRef} position={[0, 0.29, 0]}>
        <coneGeometry args={[0.025, 0.07, 6]} />
        <meshBasicMaterial color="#FFAE34" />
      </mesh>

      {/* Outer Flame Glow Halo */}
      <mesh position={[0, 0.29, 0]}>
        <sphereGeometry args={[0.05, 6, 6]} />
        <meshBasicMaterial color="#FFD166" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

export const FloatingCandleCluster: React.FC<{
  count?: number;
  zRange?: [number, number];
  xRange?: [number, number];
  yRange?: [number, number];
}> = ({ count = 30, zRange = [18, -145], xRange = [-2.5, 2.5], yRange = [2.7, 3.4] }) => {
  const candles = useMemo(() => {
    const list: Array<{ x: number; y: number; z: number; speed: number; offset: number }> = [];
    const spanZ = zRange[0] - zRange[1];
    for (let i = 0; i < count; i++) {
      const z = zRange[0] - (i / count) * spanZ + (Math.sin(i * 3.7) * 2);
      const x = ((Math.sin(i * 7.1) + 1) / 2) * (xRange[1] - xRange[0]) + xRange[0];
      const y = ((Math.cos(i * 5.3) + 1) / 2) * (yRange[1] - yRange[0]) + yRange[0];
      list.push({
        x,
        y,
        z,
        speed: 0.9 + (i % 4) * 0.15,
        offset: i * 0.7,
      });
    }
    return list;
  }, [count, zRange, xRange, yRange]);

  return (
    <group>
      {candles.map((c, idx) => (
        <FloatingCandle
          key={`candle-${idx}`}
          position={[c.x, c.y, c.z]}
          bobOffset={c.offset}
          bobSpeed={c.speed}
        />
      ))}
    </group>
  );
};

interface WallTorchProps {
  position: [number, number, number];
  rotationY?: number;
}

export const WallTorch: React.FC<WallTorchProps> = ({ position, rotationY = 0 }) => {
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 7;
    if (flameRef.current) {
      const scaleY = 1 + Math.sin(t) * 0.15;
      const scaleXZ = 1 + Math.cos(t * 1.2) * 0.1;
      flameRef.current.scale.set(scaleXZ, scaleY, scaleXZ);
    }
  });

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Wrought Iron Wall Mount Plate */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[0.16, 0.4, 0.04]} />
        <meshStandardMaterial color="#1E1E1E" roughness={0.8} metalness={0.6} />
      </mesh>

      {/* Curved Iron Arm */}
      <mesh position={[0, -0.07, 0.12]} rotation={[0.45, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
        <meshStandardMaterial color="#1E1E1E" roughness={0.8} metalness={0.6} />
      </mesh>

      {/* Iron Torch Cup */}
      <mesh position={[0, 0.06, 0.22]}>
        <cylinderGeometry args={[0.07, 0.04, 0.14, 6]} />
        <meshStandardMaterial color="#222222" roughness={0.85} metalness={0.6} />
      </mesh>

      {/* Burning Wood Core */}
      <mesh position={[0, 0.12, 0.22]}>
        <cylinderGeometry args={[0.035, 0.035, 0.1, 6]} />
        <meshStandardMaterial color="#3E2723" roughness={0.9} emissive="#FF6F00" emissiveIntensity={0.5} />
      </mesh>

      {/* Animated Fire Flame */}
      <mesh ref={flameRef} position={[0, 0.22, 0.22]}>
        <coneGeometry args={[0.065, 0.22, 6]} />
        <meshBasicMaterial color="#FF9100" />
      </mesh>

      {/* Inner Flame Core */}
      <mesh position={[0, 0.18, 0.22]}>
        <sphereGeometry args={[0.045, 6, 6]} />
        <meshBasicMaterial color="#FFEE58" />
      </mesh>
    </group>
  );
};
