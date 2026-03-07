import React, { useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import { CorridorCameraRig } from './camera/CorridorCameraRig';
import { ArchitecturalCorridor } from './corridor/ArchitecturalCorridor';
import { RoomWarmup } from './systems/RoomWarmup';
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
  // Ambient atmospheric dust particles along corridor
  const particleGeo = useMemo(() => {
    const count = 300;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8; // X: -4 to +4
      positions[i * 3 + 1] = Math.random() * 3.5;   // Y: 0 to 3.5
      positions[i * 3 + 2] = 20 - Math.random() * 180; // Z: +20 to -160
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <>
      {/* Camera Controller & Traversal Rig */}
      <CorridorCameraRig />
      <SceneInspector />

      {/* Atmospheric Fog (Gentle distant falloff) */}
      <fog attach="fog" args={['#050811', 60, 220]} />

      {/* Global Lighting */}
      <ambientLight intensity={1.0} color="#E2E8F0" />
      <directionalLight position={[10, 20, 15]} intensity={1.2} color="#FFFFFF" />
      <directionalLight position={[-10, 15, -30]} intensity={0.8} color="#38BDF8" />

      {/* Ambient Floating Dust Motes */}
      <points geometry={particleGeo}>
        <pointsMaterial size={0.04} color="#38BDF8" transparent opacity={0.4} />
      </points>

      {/* Industrial Architectural Corridor & Doorways */}
      <ArchitecturalCorridor />

      {/* Spatial Rooms */}
      <Room01_Systems />
      <Room02_AILab />
      <Room03_Distributed />
      <Room04_Career />
      <Room05_Certification />
      <Room06_Contact />
    </>
  );
};
