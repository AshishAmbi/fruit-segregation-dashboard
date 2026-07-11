import React from 'react';
import { MAT, SCENE } from './constants';

interface CameraModuleProps {
  flashIntensity?: number; // 0–1
}

const CameraModule: React.FC<CameraModuleProps> = ({ flashIntensity = 0 }) => {
  const x = SCENE.CAMERA_X;
  const standH = SCENE.CAM_STAND_H;
  const beltY  = SCENE.BELT_Y;

  return (
    <group position={[x, 0, 0]}>
      {/* Vertical gantry post — left */}
      <mesh castShadow position={[-0.05, standH / 2, -0.7]}>
        <boxGeometry args={[0.055, standH, 0.055]} />
        <meshStandardMaterial color={MAT.aluminium.color} metalness={0.88} roughness={0.28} />
      </mesh>
      {/* Vertical gantry post — right */}
      <mesh castShadow position={[-0.05, standH / 2, 0.7]}>
        <boxGeometry args={[0.055, standH, 0.055]} />
        <meshStandardMaterial color={MAT.aluminium.color} metalness={0.88} roughness={0.28} />
      </mesh>

      {/* Horizontal top crossbar */}
      <mesh castShadow position={[-0.05, standH, 0]}>
        <boxGeometry args={[0.055, 0.055, 1.5]} />
        <meshStandardMaterial color={MAT.aluminium.color} metalness={0.88} roughness={0.28} />
      </mesh>

      {/* ESP32-CAM module body */}
      <group position={[-0.05, standH - 0.05, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.08, 0.06, 0.12]} />
          <meshStandardMaterial
            color={MAT.sensorHousing.color}
            metalness={0.2}
            roughness={0.5}
          />
        </mesh>
        {/* Camera lens */}
        <mesh position={[-0.04, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.022, 0.03, 16]} />
          <meshStandardMaterial color="#080E18" metalness={0.9} roughness={0.05} />
        </mesh>
        {/* Camera lens glass */}
        <mesh position={[-0.056, 0, 0]}>
          <cylinderGeometry args={[0.014, 0.014, 0.005, 16]} />
          <meshStandardMaterial color="#2255AA" metalness={0.1} roughness={0.0} transparent opacity={0.7} />
        </mesh>
        {/* Flash LED */}
        <mesh position={[-0.041, 0.025, 0.035]}>
          <boxGeometry args={[0.015, 0.01, 0.015]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#FFFFFF"
            emissiveIntensity={flashIntensity * 3}
            metalness={0.0}
            roughness={0.0}
          />
        </mesh>
        {/* Point light for flash */}
        {flashIntensity > 0.1 && (
          <pointLight
            position={[-0.05, 0, 0]}
            intensity={flashIntensity * 4}
            color="#FFFFFF"
            distance={1.5}
            decay={2}
          />
        )}
        {/* Green status LED */}
        <mesh position={[0.041, 0.025, 0.035]}>
          <boxGeometry args={[0.008, 0.008, 0.008]} />
          <meshStandardMaterial
            color="#22C55E"
            emissive="#22C55E"
            emissiveIntensity={1.2}
            metalness={0}
            roughness={0}
          />
        </mesh>
      </group>

      {/* Cable running down the stand */}
      <mesh position={[-0.02, standH * 0.55, -0.68]} rotation={[0, 0, 0.06]}>
        <cylinderGeometry args={[0.008, 0.008, standH * 0.8, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.95} />
      </mesh>

      {/* Scanning zone indicator — thin red line on belt */}
      <mesh position={[0, beltY + 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.04, SCENE.CONVEYOR_WIDTH + 0.1]} />
        <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
};

export default CameraModule;
