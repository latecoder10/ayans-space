import React, { useMemo, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useThree, useFrame } from '@react-three/fiber';
import { CorridorCameraRig } from './camera/CorridorCameraRig';
import { ArchitecturalCorridor } from './corridor/ArchitecturalCorridor';
import { Room01_Systems } from './rooms/Room01_Systems';
import { Room02_AILab } from './rooms/Room02_AILab';
import { Room03_Distributed } from './rooms/Room03_Distributed';
import { Room04_Career } from './rooms/Room04_Career';
import { Room05_Certification } from './rooms/Room05_Certification';
import { Room06_Contact } from './rooms/Room06_Contact';
import { useScene } from '../../context/SceneContext';

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

// Dynamic Spell Cast Visual Effect
const SpellBurstFX: React.FC = () => {
  const { currentSpell, spellCastCount } = useScene();
  const { camera } = useThree();
  const lightRef = useRef<THREE.PointLight>(null);
  const burstGroupRef = useRef<THREE.Group>(null);
  const burstProgress = useRef(1);

  useEffect(() => {
    if (spellCastCount > 0) {
      burstProgress.current = 0;
      if (burstGroupRef.current) {
        // Place burst slightly ahead of camera
        const forward = new THREE.Vector3(0, 0, -2.5).applyQuaternion(camera.quaternion);
        burstGroupRef.current.position.copy(camera.position).add(forward);
      }
    }
  }, [spellCastCount, camera]);

  useFrame((_, delta) => {
    if (burstProgress.current < 1) {
      burstProgress.current += delta * 2.5;
      const t = Math.min(1, burstProgress.current);
      const intensity = Math.sin(t * Math.PI) * 4.5;

      if (lightRef.current) {
        lightRef.current.intensity = intensity;
      }
      if (burstGroupRef.current) {
        burstGroupRef.current.scale.setScalar(1 + t * 2.2);
      }
    } else if (lightRef.current && lightRef.current.intensity > 0) {
      lightRef.current.intensity = 0;
    }
  });

  const spellColor = useMemo(() => {
    switch (currentSpell) {
      case 'lumos':
        return '#FDE047';
      case 'patronum':
        return '#93C5FD';
      case 'alohomora':
        return '#F59E0B';
      case 'leviosa':
        return '#C084FC';
      default:
        return '#FDE047';
    }
  }, [currentSpell]);

  return (
    <group ref={burstGroupRef}>
      <pointLight ref={lightRef} color={spellColor} distance={18} intensity={0} />
      {burstProgress.current < 1 && (
        <mesh>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshBasicMaterial color={spellColor} transparent opacity={(1 - burstProgress.current) * 0.75} />
        </mesh>
      )}
    </group>
  );
};

export const Experience: React.FC = () => {
  const { atmosphere } = useScene();

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

  // Atmosphere lighting configurations inspired by hogwarts-3d/src/sky.js
  const lighting = useMemo(() => {
    if (atmosphere === 'twilight') {
      return {
        fogColor: '#24170E',
        fogNear: 42,
        fogFar: 200,
        hemiSky: '#FFD199',
        hemiGround: '#3D2619',
        hemiIntensity: 1.05,
        ambientColor: '#FFAF52',
        ambientIntensity: 1.25,
        dirPos: [15, 20, 25] as [number, number, number],
        dirColor: '#FF8C42',
        dirIntensity: 1.65,
        particleColor: '#FBBF24',
      };
    }
    if (atmosphere === 'dawn') {
      return {
        fogColor: '#141D24',
        fogNear: 46,
        fogFar: 210,
        hemiSky: '#DCEEFA',
        hemiGround: '#232E38',
        hemiIntensity: 0.95,
        ambientColor: '#BEE3F8',
        ambientIntensity: 1.05,
        dirPos: [-12, 24, 18] as [number, number, number],
        dirColor: '#EBF8FF',
        dirIntensity: 1.35,
        particleColor: '#93C5FD',
      };
    }
    // Default: Midnight Lumos
    return {
      fogColor: '#0E0C09',
      fogNear: 40,
      fogFar: 185,
      hemiSky: '#FFF6DF',
      hemiGround: '#261C14',
      hemiIntensity: 0.85,
      ambientColor: '#FFE6AC',
      ambientIntensity: 1.1,
      dirPos: [10, 22, 16] as [number, number, number],
      dirColor: '#FFF8E7',
      dirIntensity: 1.25,
      particleColor: '#FFD166',
    };
  }, [atmosphere]);

  return (
    <>
      {/* Smooth Camera Controller & Traversal Rig */}
      <CorridorCameraRig />
      <SceneInspector />
      <SpellBurstFX />

      {/* Atmospheric Castle Fog */}
      <fog attach="fog" args={[lighting.fogColor, lighting.fogNear, lighting.fogFar]} />

      {/* Global Magical Lighting */}
      <hemisphereLight args={[lighting.hemiSky, lighting.hemiGround, lighting.hemiIntensity]} />
      <ambientLight intensity={lighting.ambientIntensity} color={lighting.ambientColor} />
      <directionalLight position={lighting.dirPos} intensity={lighting.dirIntensity} color={lighting.dirColor} />
      <directionalLight position={[-10, 16, -30]} intensity={0.65} color="#A5C4F7" />
      <directionalLight position={[0, 14, -85]} intensity={0.55} color="#FED7AA" />

      {/* Floating Stardust Motes */}
      <points geometry={particleGeo}>
        <pointsMaterial size={0.045} color={lighting.particleColor} transparent opacity={0.6} />
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
