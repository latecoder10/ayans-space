import React, { useRef, useState, Suspense } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Room01_Systems } from '../rooms/Room01_Systems';
import { Room02_AILab } from '../rooms/Room02_AILab';
import { Room03_Distributed } from '../rooms/Room03_Distributed';
import { Room04_Career } from '../rooms/Room04_Career';
import { Room05_Certification } from '../rooms/Room05_Certification';
import { Room06_Contact } from '../rooms/Room06_Contact';

export const RoomWarmup: React.FC = () => {
  const [isDone, setIsDone] = useState(false);
  const frameCount = useRef(0);
  const { gl, scene, camera } = useThree();

  useFrame(() => {
    if (isDone) return;

    frameCount.current += 1;

    // After 5 frames of initial rendering, force WebGL compilation and unmount
    if (frameCount.current === 5) {
      try {
        const renderer = gl as unknown as {
          compileAsync?: (s: THREE.Scene, c: THREE.Camera) => Promise<void>;
          compile?: (s: THREE.Scene, c: THREE.Camera) => void;
        };
        if (typeof renderer.compileAsync === 'function') {
          renderer.compileAsync(scene, camera)
            .then(() => setIsDone(true))
            .catch(() => {
              if (renderer.compile) renderer.compile(scene, camera);
              setIsDone(true);
            });
        } else if (typeof renderer.compile === 'function') {
          renderer.compile(scene, camera);
          setIsDone(true);
        } else {
          setIsDone(true);
        }
      } catch {
        setIsDone(true);
      }
    }
  });

  if (isDone) return null;

  return (
    <group position={[0, -500, 0]}>
      {/* Off-screen GPU compilation sandbox */}
      <Suspense fallback={null}>
        <Room01_Systems />
      </Suspense>
      <Suspense fallback={null}>
        <Room02_AILab />
      </Suspense>
      <Suspense fallback={null}>
        <Room03_Distributed />
      </Suspense>
      <Suspense fallback={null}>
        <Room04_Career />
      </Suspense>
      <Suspense fallback={null}>
        <Room05_Certification />
      </Suspense>
      <Suspense fallback={null}>
        <Room06_Contact />
      </Suspense>
    </group>
  );
};
