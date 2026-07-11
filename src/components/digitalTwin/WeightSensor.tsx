import React from 'react';
import { MAT, SCENE } from './constants';

interface WeightSensorProps {
  depression?: number; // 0–1, how far down the platform is pressed
}

const WeightSensor: React.FC<WeightSensorProps> = ({ depression = 0 }) => {
  const x        = SCENE.WEIGHT_X;
  const beltY    = SCENE.BELT_Y;
  const pressY   = depression * -0.018; // max 18mm press

  return (
    <group position={[x, 0, 0]}>
      {/* Load cell body — mounted under the belt */}
      <mesh castShadow position={[0, beltY - 0.09, 0]}>
        <boxGeometry args={[0.22, 0.06, 0.12]} />
        <meshStandardMaterial
          color={MAT.steel.color}
          metalness={MAT.steel.metalness}
          roughness={MAT.steel.roughness}
        />
      </mesh>

      {/* Weight platform — slightly above belt level, depresses when fruit is on it */}
      <group position={[0, pressY, 0]}>
        {/* Platform surface */}
        <mesh castShadow receiveShadow position={[0, beltY + 0.01, 0]}>
          <boxGeometry args={[0.38, 0.018, SCENE.CONVEYOR_WIDTH - 0.02]} />
          <meshStandardMaterial
            color="#6A7A8A"
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
        {/* Platform edge highlight */}
        <mesh position={[0, beltY + 0.02, 0]}>
          <boxGeometry args={[0.36, 0.004, SCENE.CONVEYOR_WIDTH - 0.04]} />
          <meshStandardMaterial
            color="#AAC0D8"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Digital readout display */}
      <group position={[0.24, beltY + 0.06, 0]}>
        {/* Housing */}
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.09, 0.16]} />
          <meshStandardMaterial color={MAT.sensorHousing.color} metalness={0.2} roughness={0.5} />
        </mesh>
        {/* Display screen */}
        <mesh position={[0.062, 0, 0]}>
          <boxGeometry args={[0.005, 0.055, 0.11]} />
          <meshStandardMaterial
            color="#0A2A1A"
            emissive="#22C55E"
            emissiveIntensity={0.4}
            metalness={0}
            roughness={0}
          />
        </mesh>
        {/* Status LED */}
        <mesh position={[0.062, 0.038, 0.062]}>
          <sphereGeometry args={[0.006, 8, 8]} />
          <meshStandardMaterial
            color="#22C55E"
            emissive="#22C55E"
            emissiveIntensity={1.5}
          />
        </mesh>
      </group>

      {/* Wiring cable */}
      <mesh position={[0.1, beltY - 0.06, 0.04]}>
        <cylinderGeometry args={[0.005, 0.005, 0.15, 6]} />
        <meshStandardMaterial color="#1A1A2A" roughness={0.95} />
      </mesh>
    </group>
  );
};

export default WeightSensor;
