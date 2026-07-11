import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import type { Mesh } from 'three';

interface FruitProps {
  position: [number, number, number];
  color: string;
  emissive?: string;
  visible: boolean;
  opacity?: number;
  scale?: number;
  wobble?: number; // 0–1, adds a subtle rotation wobble
}

const Fruit: React.FC<FruitProps> = ({
  position,
  color,
  emissive = '#000000',
  visible,
  opacity = 1,
  scale = 1,
  wobble = 0,
}) => {
  const meshRef = useRef<Mesh>(null);
  const timeRef = useRef(Math.random() * Math.PI * 2); // random start phase

  useFrame((_, delta) => {
    if (!meshRef.current || !visible) return;
    timeRef.current += delta;
    // Gentle wobble rotation when on conveyor
    if (wobble > 0) {
      meshRef.current.rotation.z += delta * 0.8 * wobble;
      meshRef.current.rotation.x = Math.sin(timeRef.current * 1.2) * 0.05 * wobble;
    }
  });

  if (!visible) return null;

  const radius = 0.085 * scale;

  return (
    <mesh
      ref={meshRef}
      position={position}
      castShadow
    >
      <sphereGeometry args={[radius, 24, 24]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={0.15}
        metalness={0.05}
        roughness={0.55}
        transparent={opacity < 1}
        opacity={opacity}
      />
    </mesh>
  );
};

export default Fruit;
