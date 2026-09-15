import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { SpatialText as Text } from './SpatialText';
import * as THREE from 'three';
import { soundEngine } from '../../../utils/synthesizer';

interface CorridorPaintingProps {
  position: [number, number, number];
  rotationY: number;
  title: string;
  subtitle: string;
  category: string;
  accentColor: string;
  imageArt: 'castle' | 'cauldron' | 'crest' | 'quidditch' | 'tower';
  onClick: () => void;
}

export const CorridorPainting: React.FC<CorridorPaintingProps> = ({
  position,
  rotationY,
  title,
  subtitle,
  category,
  accentColor,
  imageArt,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame(({ clock }) => {
    if (glowRef.current) {
      const t = clock.getElapsedTime() * 3;
      glowRef.current.intensity = hovered ? 2.2 + Math.sin(t) * 0.4 : 0.8;
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

  // Select artistic tone based on imageArt
  const canvasBg = 
    imageArt === 'castle' ? '#141824' :
    imageArt === 'cauldron' ? '#1A1424' :
    imageArt === 'crest' ? '#241B10' :
    imageArt === 'quidditch' ? '#14221A' : '#1A1820';

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Outer Heavy Baroque Gold Frame */}
      <mesh
        position={[0, 0, 0]}
        onClick={(e: { stopPropagation: () => void; delta?: number }) => {
          if (e.delta && e.delta > 8) return;
          e.stopPropagation();
          soundEngine.playAlohomora();
          onClick();
        }}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <boxGeometry args={[1.7, 2.3, 0.08]} />
        <meshStandardMaterial
          color={hovered ? '#F5D77F' : '#8E6827'}
          metalness={0.85}
          roughness={0.25}
          emissive={hovered ? '#D4AF37' : '#000000'}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>

      {/* Inner Beveled Dark Walnut Liner */}
      <mesh position={[0, 0, 0.045]}>
        <boxGeometry args={[1.5, 2.1, 0.02]} />
        <meshStandardMaterial color="#1E140C" roughness={0.7} metalness={0.2} />
      </mesh>

      {/* Gold Beading Filigree Trim */}
      <mesh position={[0, 0, 0.055]}>
        <boxGeometry args={[1.42, 2.02, 0.01]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.9} />
      </mesh>

      {/* Inner Enchanted Canvas */}
      <mesh position={[0, 0.12, 0.062]}>
        <planeGeometry args={[1.34, 1.6]} />
        <meshStandardMaterial
          color={canvasBg}
          roughness={0.4}
          metalness={0.1}
          emissive={accentColor}
          emissiveIntensity={hovered ? 0.25 : 0.05}
        />
      </mesh>

      {/* Frame Plaque Banner (Embossed Brass Cartouche) */}
      <group position={[0, -0.85, 0.07]}>
        <mesh>
          <planeGeometry args={[1.35, 0.32]} />
          <meshStandardMaterial color="#1A1208" metalness={0.7} roughness={0.4} />
        </mesh>
        <Text position={[0, 0.06, 0.01]} fontSize={0.065} color="#FDE047" anchorX="center" anchorY="middle">
          {title.toUpperCase()}
        </Text>
        <Text position={[0, -0.06, 0.01]} fontSize={0.045} color="#CBD5E1" anchorX="center" anchorY="middle">
          {hovered ? subtitle : category}
        </Text>
      </group>

      {/* Interactive Stardust / Alohomora Hint */}
      {hovered && (
        <group position={[0, 0.1, 0.12]}>
          <Text position={[0, 0, 0]} fontSize={0.08} color="#FFF6D6" anchorX="center" anchorY="middle">
            ✦ UNSEAL GRIMOIRE ✦
          </Text>
        </group>
      )}

      {/* Warm Ambient Frame Light */}
      <pointLight
        ref={glowRef}
        position={[0, 0, 0.4]}
        color={hovered ? '#FDE047' : accentColor}
        distance={4}
        intensity={hovered ? 2.0 : 0.6}
      />
    </group>
  );
};
