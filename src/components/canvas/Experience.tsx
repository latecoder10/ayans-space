import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { CorridorCameraRig } from './camera/CorridorCameraRig';
import { ArchitecturalCorridor } from './corridor/ArchitecturalCorridor';
import { Room01_Systems } from './rooms/Room01_Systems';
import { Room02_AILab } from './rooms/Room02_AILab';
import { Room03_Distributed } from './rooms/Room03_Distributed';
import { Room04_Career } from './rooms/Room04_Career';
import { Room05_Certification } from './rooms/Room05_Certification';
import { Room06_Contact } from './rooms/Room06_Contact';

const SceneInspector: React.FC = () => {
  const { scene, camera } = useThree();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as { __threeScene: THREE.Scene }).__threeScene = scene;
      (window as unknown as { __threeCamera: THREE.Camera }).__threeCamera = camera;
    }
  }, [scene, camera]);
  return null;
};

export const Experience: React.FC = () => {
  // Magical stardust motes floating through the Hogwarts castle corridor
  const particleGeo = useMemo(() => {
    const count = 350;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic spatial distribution (prevents React compiler purity warnings)
      const seedX = Math.sin(i * 12.9898) * 43758.5453;
      const seedY = Math.sin(i * 78.233) * 43758.5453;
      const seedZ = Math.sin(i * 45.164) * 43758.5453;
      const randX = seedX - Math.floor(seedX);
      const randY = seedY - Math.floor(seedY);
      const randZ = seedZ - Math.floor(seedZ);

      positions[i * 3] = (randX - 0.5) * 8; // X: -4 to +4
      positions[i * 3 + 1] = randY * 3.6;   // Y: 0 to 3.6
      positions[i * 3 + 2] = 22 - randZ * 185; // Z: +22 to -163
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <>
      {/* Smooth Camera Controller & Traversal Rig */}
      <CorridorCameraRig />
      <SceneInspector />

      {/* Atmospheric Castle Fog (Soft Warm Twilight Falloff, pushed back for great visibility) */}
      <fog attach="fog" args={['#1A1612', 48, 210]} />

      {/* Global Magical Lighting (Illuminating shadows with warm architectural clarity) */}
      <hemisphereLight args={['#FFF6DF', '#30271E', 0.9]} />
      <ambientLight intensity={1.15} color="#FFE6AC" />
      <directionalLight position={[10, 22, 16]} intensity={1.35} color="#FFF8E7" />
      <directionalLight position={[-10, 16, -30]} intensity={0.75} color="#A5C4F7" />
      <directionalLight position={[0, 14, -85]} intensity={0.65} color="#FED7AA" />

      {/* Floating Golden Stardust Motes */}
      <points geometry={particleGeo}>
        <pointsMaterial size={0.045} color="#FFD166" transparent opacity={0.55} />
      </points>

      {/* Grand Hogwarts Architectural Corridor & Doorways */}
      <ArchitecturalCorridor />

      {/* Walkable Castle Chambers */}
      <Room01_Systems />
      <Room02_AILab />
      <Room03_Distributed />
      <Room04_Career />
      <Room05_Certification />
      <Room06_Contact />
    </>
  );
};
