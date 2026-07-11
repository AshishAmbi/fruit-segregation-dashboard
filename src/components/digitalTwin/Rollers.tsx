import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';
import { MAT, SCENE } from './constants';

const Rollers: React.FC = () => {
  const frontRollerRef = useRef<Mesh>(null);
  const rearRollerRef  = useRef<Mesh>(null);
  const supportRefs    = useRef<(Mesh | null)[]>([]);

  const halfL  = SCENE.CONVEYOR_LENGTH / 2;
  const rollerY = SCENE.BELT_Y - 0.01;
  const r       = 0.11; // roller radius

  // Spin rollers
  useFrame((_, delta) => {
    const angVel = delta * 3.2; // radians/sec
    if (frontRollerRef.current)  frontRollerRef.current.rotation.z  -= angVel;
    if (rearRollerRef.current)   rearRollerRef.current.rotation.z   -= angVel;
    supportRefs.current.forEach((m) => { if (m) m.rotation.z -= angVel; });
  });

  const rollerMat = (
    <meshStandardMaterial
      color={MAT.steel.color}
      metalness={MAT.steel.metalness}
      roughness={MAT.steel.roughness}
    />
  );

  const supportXs = [-2.4, -1.0, 0.4, 1.8];

  return (
    <group>
      {/* Front drive roller */}
      <mesh ref={frontRollerRef} castShadow position={[halfL - 0.05, rollerY, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[r, r, SCENE.CONVEYOR_WIDTH + 0.18, 24]} />
        {rollerMat}
      </mesh>

      {/* Rear idler roller */}
      <mesh ref={rearRollerRef} castShadow position={[-halfL + 0.05, rollerY, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[r, r, SCENE.CONVEYOR_WIDTH + 0.18, 24]} />
        {rollerMat}
      </mesh>

      {/* Support rollers along the span */}
      {supportXs.map((x, i) => (
        <mesh
          key={`support-${i}`}
          ref={(el) => { supportRefs.current[i] = el; }}
          castShadow
          position={[x, rollerY - 0.04, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <cylinderGeometry args={[r * 0.7, r * 0.7, SCENE.CONVEYOR_WIDTH + 0.1, 16]} />
          {rollerMat}
        </mesh>
      ))}

      {/* Roller end caps */}
      {[halfL - 0.05, -halfL + 0.05].map((x, i) =>
        [-1, 1].map((side) => (
          <mesh
            key={`cap-${i}-${side}`}
            position={[x, rollerY, side * (SCENE.CONVEYOR_WIDTH / 2 + 0.09 + 0.02)]}
          >
            <cylinderGeometry args={[r + 0.01, r + 0.01, 0.025, 16]} />
            <meshStandardMaterial color="#5A6A7A" metalness={0.9} roughness={0.2} />
          </mesh>
        ))
      )}
    </group>
  );
};

export default Rollers;
