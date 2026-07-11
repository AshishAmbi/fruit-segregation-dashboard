import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import { MAT, SCENE } from './constants';

interface BeltProps {
  scrollSpeed?: number; // belt texture scroll speed, units/sec
}

const Belt: React.FC<BeltProps> = ({ scrollSpeed = 0.4 }) => {
  const beltRef = useRef<Mesh>(null);
  const offsetRef = useRef(0);

  // Animate belt scroll via UV offset (simulated with mesh position oscillation is not needed;
  // we use a shader-less approach: animate a thin overlay mesh)
  useFrame((_, delta) => {
    offsetRef.current += delta * scrollSpeed;
  });

  return (
    <group>
      {/* Main rubber belt surface */}
      <mesh ref={beltRef} receiveShadow castShadow position={[0, SCENE.BELT_Y, 0]}>
        <boxGeometry args={[SCENE.CONVEYOR_LENGTH, SCENE.BELT_Y * 0.06, SCENE.CONVEYOR_WIDTH]} />
        <meshStandardMaterial
          color={MAT.rubber.color}
          metalness={MAT.rubber.metalness}
          roughness={MAT.rubber.roughness}
        />
      </mesh>

      {/* Belt ribs (tactile ridges) — 18 evenly spaced */}
      {Array.from({ length: 18 }, (_, i) => {
        const x = -SCENE.CONVEYOR_LENGTH / 2 + 0.24 + i * (SCENE.CONVEYOR_LENGTH / 18);
        return (
          <mesh key={`rib-${i}`} castShadow position={[x, SCENE.BELT_Y + 0.012, 0]}>
            <boxGeometry args={[0.045, 0.025, SCENE.CONVEYOR_WIDTH + 0.02]} />
            <meshStandardMaterial
              color="#232D3A"
              metalness={0.0}
              roughness={0.95}
            />
          </mesh>
        );
      })}

      {/* Side edge guards — aluminium lips */}
      {([-1, 1] as const).map((side) => (
        <mesh
          key={`guard-${side}`}
          castShadow
          position={[0, SCENE.BELT_Y + 0.03, side * (SCENE.CONVEYOR_WIDTH / 2 + 0.04)]}
        >
          <boxGeometry args={[SCENE.CONVEYOR_LENGTH, 0.06, 0.035]} />
          <meshStandardMaterial
            color={MAT.aluminium.color}
            metalness={MAT.aluminium.metalness}
            roughness={MAT.aluminium.roughness}
          />
        </mesh>
      ))}
    </group>
  );
};

export default Belt;
