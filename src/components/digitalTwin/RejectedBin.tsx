import React from 'react';
import { SCENE } from './constants';

const RejectedBin: React.FC = () => {
  const x = SCENE.BIN_REJECT_X;
  const z = SCENE.BIN_REJECT_Z;
  const y = SCENE.BIN_Y;
  const w = 0.7;
  const h = 0.55;
  const d = 0.65;

  return (
    <group position={[x, y, z]}>
      {/* Bottom */}
      <mesh castShadow receiveShadow position={[0, 0.015, 0]}>
        <boxGeometry args={[w, 0.03, d]} />
        <meshStandardMaterial color="#3A1A1A" metalness={0.1} roughness={0.7} />
      </mesh>
      {/* Front wall */}
      <mesh castShadow position={[0, h / 2, d / 2]}>
        <boxGeometry args={[w, h, 0.03]} />
        <meshStandardMaterial color="#3E1E1E" metalness={0.08} roughness={0.7} />
      </mesh>
      {/* Back wall */}
      <mesh castShadow position={[0, h / 2, -d / 2]}>
        <boxGeometry args={[w, h, 0.03]} />
        <meshStandardMaterial color="#381A1A" metalness={0.08} roughness={0.7} />
      </mesh>
      {/* Left wall */}
      <mesh castShadow position={[-w / 2, h / 2, 0]}>
        <boxGeometry args={[0.03, h, d]} />
        <meshStandardMaterial color="#3C1C1C" metalness={0.08} roughness={0.7} />
      </mesh>
      {/* Right wall */}
      <mesh castShadow position={[w / 2, h / 2, 0]}>
        <boxGeometry args={[0.03, h, d]} />
        <meshStandardMaterial color="#3C1C1C" metalness={0.08} roughness={0.7} />
      </mesh>
      {/* Label strip — red */}
      <mesh position={[0, h * 0.72, d / 2 + 0.001]}>
        <boxGeometry args={[w - 0.06, 0.07, 0.002]} />
        <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.4} />
      </mesh>
      {/* Reject glow */}
      <pointLight
        position={[0, h + 0.2, 0]}
        intensity={0.3}
        color="#EF4444"
        distance={1.2}
        decay={2}
      />
    </group>
  );
};

export default RejectedBin;
