import React from 'react';
import { MAT, SCENE } from './constants';

interface ColorSensorProps {
  glowIntensity?: number; // 0–1
}

const ColorSensor: React.FC<ColorSensorProps> = ({ glowIntensity = 0 }) => {
  const x = SCENE.COLOR_X;
  const beltY = SCENE.BELT_Y;

  return (
    <group position={[x, 0, 0]}>
      {/* Sensor bracket arm — from the side */}
      <mesh castShadow position={[0, beltY + 0.32, -SCENE.CONVEYOR_WIDTH / 2 - 0.12]}>
        <boxGeometry args={[0.04, 0.6, 0.04]} />
        <meshStandardMaterial color={MAT.aluminium.color} metalness={0.88} roughness={0.28} />
      </mesh>

      {/* Horizontal arm */}
      <mesh castShadow position={[0, beltY + 0.62, -SCENE.CONVEYOR_WIDTH / 2 + 0.07]}>
        <boxGeometry args={[0.04, 0.04, SCENE.CONVEYOR_WIDTH * 0.65]} />
        <meshStandardMaterial color={MAT.aluminium.color} metalness={0.88} roughness={0.28} />
      </mesh>

      {/* Sensor head — pointing down at belt */}
      <group position={[0, beltY + 0.62, 0.1]}>
        {/* Body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.045, 0.04, 0.09, 16]} />
          <meshStandardMaterial
            color={MAT.sensorHousing.color}
            metalness={0.3}
            roughness={0.5}
          />
        </mesh>
        {/* LED emitter ring */}
        <mesh position={[0, -0.046, 0]}>
          <cylinderGeometry args={[0.038, 0.035, 0.012, 16]} />
          <meshStandardMaterial
            color={glowIntensity > 0.1 ? '#FFFFFF' : '#AAAAAA'}
            emissive={glowIntensity > 0.1 ? '#FFFFFF' : '#000000'}
            emissiveIntensity={glowIntensity * 5}
            metalness={0}
            roughness={0}
          />
        </mesh>
        {/* Lens center */}
        <mesh position={[0, -0.048, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.006, 16]} />
          <meshStandardMaterial
            color="#0A1A2A"
            metalness={0.9}
            roughness={0.05}
          />
        </mesh>
        {/* Glow point light */}
        {glowIntensity > 0.1 && (
          <pointLight
            position={[0, -0.12, 0]}
            intensity={glowIntensity * 3}
            color="#FFFFFF"
            distance={0.8}
            decay={2}
          />
        )}
        {/* Active LED color glow */}
        {glowIntensity > 0.1 && (
          <pointLight
            position={[0, -0.08, 0]}
            intensity={glowIntensity * 2}
            color="#00E5FF"
            distance={0.5}
            decay={2}
          />
        )}
      </group>

      {/* Cable to belt edge */}
      <mesh position={[0.01, beltY + 0.4, -SCENE.CONVEYOR_WIDTH / 2 - 0.09]}>
        <cylinderGeometry args={[0.006, 0.006, 0.18, 6]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.95} />
      </mesh>

      {/* Scan zone line on belt */}
      <mesh position={[0, beltY + 0.003, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, SCENE.CONVEYOR_WIDTH + 0.05]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={glowIntensity * 2 + 0.2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
};

export default ColorSensor;
