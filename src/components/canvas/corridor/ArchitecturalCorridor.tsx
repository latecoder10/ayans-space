import React, { useMemo } from 'react';
import { SpatialText as Text } from '../common/SpatialText';
import { SECTOR_BAYS } from '../../../types/spatial';
import { DoorwayBay } from './DoorwayBay';

export const ArchitecturalCorridor: React.FC = () => {
  // Corridor bounds: Z = 24 to Z = -150 (Total ~174 units)
  const CORRIDOR_LENGTH = 174;
  const CORRIDOR_CENTER_Z = -63; // (24 + (-150)) / 2

  // Structural ribs every 6 units along Z
  const ribs = useMemo(() => {
    const list: number[] = [];
    for (let z = 22; z >= -148; z -= 6) {
      // Don't place rib right in front of door centers
      const isNearDoor = SECTOR_BAYS.some((b) => Math.abs(z - b.doorZ) < 1.5);
      if (!isNearDoor) {
        list.push(z);
      }
    }
    return list;
  }, []);

  // Wall segments between bays
  const wallIntervals = useMemo(() => {
    // Left bays at Z = 0, -60, -120
    // Right bays at Z = -30, -90
    // We construct solid wall spans between these intervals
    return [
      { startZ: 24, endZ: 2, side: 'left' as const },
      { startZ: -2, endZ: -58, side: 'left' as const },
      { startZ: -62, endZ: -118, side: 'left' as const },
      { startZ: -122, endZ: -150, side: 'left' as const },

      { startZ: 24, endZ: -28, side: 'right' as const },
      { startZ: -32, endZ: -88, side: 'right' as const },
      { startZ: -92, endZ: -150, side: 'right' as const },
    ];
  }, []);

  return (
    <group>
      {/* 1. Main Basalt Floor */}
      <mesh position={[0, -0.05, CORRIDOR_CENTER_Z]}>
        <boxGeometry args={[8, 0.1, CORRIDOR_LENGTH]} />
        <meshStandardMaterial
          color="#080C14"
          metalness={0.8}
          roughness={0.25}
        />
      </mesh>

      {/* 2. Subsurface Luminous Guide Tracks (Floor LEDs) */}
      <mesh position={[-2.4, 0.01, CORRIDOR_CENTER_Z]}>
        <planeGeometry args={[0.06, CORRIDOR_LENGTH]} />
        <meshBasicMaterial color="#00F2FE" />
      </mesh>
      <mesh position={[2.4, 0.01, CORRIDOR_CENTER_Z]}>
        <planeGeometry args={[0.06, CORRIDOR_LENGTH]} />
        <meshBasicMaterial color="#00F2FE" />
      </mesh>

      {/* Center line pulse guide */}
      <mesh position={[0, 0.005, CORRIDOR_CENTER_Z]}>
        <planeGeometry args={[0.02, CORRIDOR_LENGTH]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>

      {/* 3. Ceiling Structural Slab */}
      <mesh position={[0, 3.6, CORRIDOR_CENTER_Z]}>
        <boxGeometry args={[8, 0.2, CORRIDOR_LENGTH]} />
        <meshStandardMaterial color="#060910" metalness={0.9} roughness={0.3} />
      </mesh>

      {/* 4. Overhead Structural Rib Frames */}
      {ribs.map((z) => (
        <group key={`rib-${z}`} position={[0, 1.8, z]}>
          {/* Top arch beam */}
          <mesh position={[0, 1.7, 0]}>
            <boxGeometry args={[7.8, 0.25, 0.3]} />
            <meshStandardMaterial color="#111827" metalness={0.75} roughness={0.35} />
          </mesh>
          {/* Left vertical stanchion */}
          <mesh position={[-3.85, 0, 0]}>
            <boxGeometry args={[0.3, 3.4, 0.3]} />
            <meshStandardMaterial color="#111827" metalness={0.75} roughness={0.35} />
          </mesh>
          {/* Right vertical stanchion */}
          <mesh position={[3.85, 0, 0]}>
            <boxGeometry args={[0.3, 3.4, 0.3]} />
            <meshStandardMaterial color="#111827" metalness={0.75} roughness={0.35} />
          </mesh>
          {/* Recessed Overhead Downlight Fixture */}
          {Math.abs(z % 12) < 2 && (
            <pointLight position={[0, 1.5, 0]} color="#38BDF8" intensity={0.6} distance={8} />
          )}
        </group>
      ))}

      {/* 5. Solid Wall Segments */}
      {wallIntervals.map((seg, idx) => {
        const length = seg.startZ - seg.endZ;
        const centerZ = (seg.startZ + seg.endZ) / 2;
        const posX = seg.side === 'left' ? -3.9 : 3.9;

        return (
          <mesh key={`wall-${idx}`} position={[posX, 1.8, centerZ]}>
            <boxGeometry args={[0.2, 3.4, length]} />
            <meshStandardMaterial
              color="#0B1019"
              metalness={0.8}
              roughness={0.3}
            />
          </mesh>
        );
      })}

      {/* 6. Facility Entrance Hall Header (Z = 21) */}
      <group position={[0, 2.3, 21.5]}>
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[6.5, 1.1]} />
          <meshBasicMaterial color="#070C15" />
        </mesh>
        <Text
          position={[0, 0.25, 0.02]}
          fontSize={0.22}
          color="#00F2FE"
          anchorX="center"
          anchorY="middle"
        >
          AYAN PAL // FACILITY CORE
        </Text>
        <Text
          position={[0, -0.05, 0.02]}
          fontSize={0.13}
          color="#94A3B8"
          anchorX="center"
          anchorY="middle"
        >
          DISTRIBUTED SYSTEMS & AUTONOMOUS AI PRODUCT ENGINEERING
        </Text>
        <Text
          position={[0, -0.28, 0.02]}
          fontSize={0.11}
          color="#38BDF8"
          anchorX="center"
          anchorY="middle"
        >
          ▼ SCROLL / SWIPE TO TRAVERSE ARCHITECTURAL BAYS ▼
        </Text>
      </group>

      {/* 7. Sector Doorway Bays */}
      {SECTOR_BAYS.map((bay) => (
        <DoorwayBay key={bay.id} bay={bay} />
      ))}
    </group>
  );
};
