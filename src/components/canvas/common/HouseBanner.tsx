import React from 'react';

interface HouseBannerProps {
  position: [number, number, number];
  rotationY: number;
  house: 'gryffindor' | 'ravenclaw' | 'slytherin' | 'hufflepuff';
}

export const HouseBanner: React.FC<HouseBannerProps> = ({ position, rotationY, house }) => {
  const colors = {
    gryffindor: { primary: '#740001', secondary: '#D3A625', text: 'GRYFFINDOR' },
    ravenclaw: { primary: '#0E1A40', secondary: '#946B2D', text: 'RAVENCLAW' },
    slytherin: { primary: '#1A472A', secondary: '#5D5D5D', text: 'SLYTHERIN' },
    hufflepuff: { primary: '#ECB939', secondary: '#372E29', text: 'HUFFLEPUFF' },
  }[house];

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* Wrought Iron Mounting Rod */}
      <mesh position={[0, 1.25, 0.04]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.02, 0.02, 1.3, 8]} />
        <meshStandardMaterial color="#1E1E1E" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Brass Finial Caps */}
      <mesh position={[-0.65, 1.25, 0.04]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.65, 1.25, 0.04]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Velvet Tapestry Body */}
      <mesh position={[0, 0.2, 0.02]}>
        <planeGeometry args={[1.0, 2.0]} />
        <meshStandardMaterial color={colors.primary} roughness={0.85} metalness={0.1} />
      </mesh>

      {/* Golden Chevron Border Trim */}
      <mesh position={[0, 0.2, 0.025]}>
        <planeGeometry args={[0.88, 1.88]} />
        <meshStandardMaterial color={colors.secondary} roughness={0.5} metalness={0.7} />
      </mesh>
      <mesh position={[0, 0.2, 0.03]}>
        <planeGeometry args={[0.82, 1.82]} />
        <meshStandardMaterial color={colors.primary} roughness={0.85} />
      </mesh>

      {/* Gold Fringe Tassels along bottom */}
      <mesh position={[0, -0.84, 0.025]}>
        <boxGeometry args={[1.0, 0.08, 0.02]} />
        <meshStandardMaterial color="#D4AF37" roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  );
};
