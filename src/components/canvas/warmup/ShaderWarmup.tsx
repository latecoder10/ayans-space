import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';

export const ShaderWarmup: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const { gl, scene, camera } = useThree();
  const compiled = useRef(false);

  useEffect(() => {
    if (compiled.current) return;
    compiled.current = true;

    // Use compileAsync if supported by Three.js WebGLRenderer to avoid blocking main thread
    const renderer = gl as unknown as {
      compileAsync?: (s: unknown, c: unknown, target?: unknown) => Promise<void>;
      compile: (s: unknown, c: unknown) => void;
    };

    if (typeof renderer.compileAsync === 'function') {
      renderer.compileAsync(scene, camera, scene)
        .then(() => {
          onComplete?.();
        })
        .catch(() => {
          renderer.compile(scene, camera);
          onComplete?.();
        });
    } else {
      renderer.compile(scene, camera);
      onComplete?.();
    }
  }, [gl, scene, camera, onComplete]);

  return null;
};
