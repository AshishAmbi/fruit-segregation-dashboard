import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { MAT, SCENE } from './constants';

interface ServoGateProps {
  angle?: number; // radians — 0 = straight (accept), PI/2 = deflect (reject)
}

const ServoGate: React.FC<ServoGateProps> = ({ angle = 0 }) => {
  const gateRef = useRef<Group>(null);
  const x       = SCENE.SERVO_X;
  const beltY   = SCENE.BELT_Y;

  // Smoothly interpolate to target angle
  const currentAngleRef = useRef(0);
  useFrame((_, delta) => {
    if (!gateRef.current) return;
    const diff = angle - currentAngleRef.current;
    currentAngleRef.current += diff * Math.min(delta * 6, 1);
    gateRef.current.rotation.y = currentAngleRef.current;
  });

  return (
    <group position={[x, 0, 0]}>
      {/* Servo motor body */}
      <mesh castShadow position={[0, beltY + 0.04, 0]}>
        <boxGeometry args={[0.14, 0.08, 0.08]} />
        <meshStandardMaterial
          color={MAT.plastic.color}
          metalness={MAT.plastic.metalness}
          roughness={MAT.plastic.roughness}
        />
      </mesh>
      {/* Servo body screw mounts */}
      {([-0.06, 0.06] as const).map((z, i) => (
        <mesh key={`mount-${i}`} position={[-0.02, beltY - 0.015, z]}>
          <boxGeometry args={[0.1, 0.02, 0.035]} />
          <meshStandardMaterial color="#1A2233" metalness={0.4} roughness={0.6} />
        </mesh>
      ))}

      {/* Servo shaft */}
      <mesh castShadow position={[0.05, beltY + 0.04, 0]}>
        <cylinderGeometry args={[0.012, 0.012, 0.03, 12]} />
        <meshStandardMaterial color={MAT.steel.color} metalness={0.95} roughness={0.15} />
      </mesh>

      {/* Gate arm — pivots around shaft */}
      <group
        ref={gateRef}
        position={[0.05, beltY + 0.055, 0]}
      >
        {/* Main gate paddle */}
        <mesh castShadow position={[0, 0, SCENE.CONVEYOR_WIDTH * 0.3]}>
          <boxGeometry args={[0.09, 0.12, SCENE.CONVEYOR_WIDTH * 0.62]} />
          <meshStandardMaterial
            color="#FF6B35"
            metalness={0.15}
            roughness={0.55}
          />
        </mesh>
        {/* Gate reinforcement rib */}
        <mesh position={[0, 0, SCENE.CONVEYOR_WIDTH * 0.3]}>
          <boxGeometry args={[0.075, 0.005, SCENE.CONVEYOR_WIDTH * 0.58]} />
          <meshStandardMaterial color="#CC4411" metalness={0.1} roughness={0.6} />
        </mesh>
        {/* Pivot screw */}
        <mesh>
          <cylinderGeometry args={[0.007, 0.007, 0.04, 8]} />
          <meshStandardMaterial color="#6A7A8A" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Mounting bracket */}
      <mesh castShadow position={[-0.02, beltY - 0.04, 0]}>
        <boxGeometry args={[0.06, 0.08, 0.14]} />
        <meshStandardMaterial color={MAT.aluminium.color} metalness={0.85} roughness={0.3} />
      </mesh>
    </group>
  );
};

export default ServoGate;
