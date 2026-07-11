import React from 'react';
import { SCENE } from './constants';

const AcceptedBin: React.FC = () => {
  const x = SCENE.BIN_ACCEPT_X;
  const z = SCENE.BIN_ACCEPT_Z;
  const y = SCENE.BIN_Y;
  const w = 0.7;
  const h = 0.55;
  const d = 0.65;

  return (
    <group position={[x, y, z]}>
      {/* Bottom */}
      <mesh castShadow receiveShadow position={[0, 0.015, 0]}>
        <boxGeometry args={[w, 0.03, d]} />
        <meshStandardMaterial color="#1A3A2A" metalness={0.1} roughness={0.7} />
      </mesh>
      {/* Front wall */}
      <mesh castShadow position={[0, h / 2, d / 2]}>
        <boxGeometry args={[w, h, 0.03]} />
        <meshStandardMaterial color="#1E4030" metalness={0.08} roughness={0.7} />
      </mesh>
      {/* Back wall */}
      <mesh castShadow position={[0, h / 2, -d / 2]}>
        <boxGeometry args={[w, h, 0.03]} />
        <meshStandardMaterial color="#1A3828" metalness={0.08} roughness={0.7} />
      </mesh>
      {/* Left wall */}
      <mesh castShadow position={[-w / 2, h / 2, 0]}>
        <boxGeometry args={[0.03, h, d]} />
        <meshStandardMaterial color="#1C3C2C" metalness={0.08} roughness={0.7} />
      </mesh>
      {/* Right wall */}
      <mesh castShadow position={[w / 2, h / 2, 0]}>
        <boxGeometry args={[0.03, h, d]} />
        <meshStandardMaterial color="#1C3C2C" metalness={0.08} roughness={0.7} />
      </mesh>
      {/* Label strip — green */}
      <mesh position={[0, h * 0.72, d / 2 + 0.001]}>
        <boxGeometry args={[w - 0.06, 0.07, 0.002]} />
        <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={0.4} />
      </mesh>
      {/* Accept glow */}
      <pointLight
        position={[0, h + 0.2, 0]}
        intensity={0.3}
        color="#22C55E"
        distance={1.2}
        decay={2}
      />
    </group>
  );
};

export default AcceptedBin;
