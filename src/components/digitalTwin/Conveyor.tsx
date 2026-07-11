import React from 'react';
import { MAT, SCENE } from './constants';
import Belt from './Belt';
import Rollers from './Rollers';

const Conveyor: React.FC = () => {
  const halfL = SCENE.CONVEYOR_LENGTH / 2;

  // Leg positions — 4 corners
  const legPositions: [number, number, number][] = [
    [-halfL + 0.3,  0,  SCENE.CONVEYOR_WIDTH / 2 - 0.05],
    [-halfL + 0.3,  0, -SCENE.CONVEYOR_WIDTH / 2 + 0.05],
    [ halfL - 0.3,  0,  SCENE.CONVEYOR_WIDTH / 2 - 0.05],
    [ halfL - 0.3,  0, -SCENE.CONVEYOR_WIDTH / 2 + 0.05],
  ];

  // Mid support legs
  const midLegPositions: [number, number, number][] = [
    [-1.5, 0,  SCENE.CONVEYOR_WIDTH / 2 - 0.05],
    [-1.5, 0, -SCENE.CONVEYOR_WIDTH / 2 + 0.05],
    [ 1.5, 0,  SCENE.CONVEYOR_WIDTH / 2 - 0.05],
    [ 1.5, 0, -SCENE.CONVEYOR_WIDTH / 2 + 0.05],
  ];

  return (
    <group>
      {/* ── Side Panels (aluminium extrusion frame) ── */}
      {([-1, 1] as const).map((side) => (
        <group key={`side-${side}`}>
          {/* Upper rail */}
          <mesh
            castShadow
            position={[0, SCENE.BELT_Y - 0.04, side * (SCENE.CONVEYOR_WIDTH / 2 + 0.08)]}
          >
            <boxGeometry args={[SCENE.CONVEYOR_LENGTH + 0.1, 0.07, 0.07]} />
            <meshStandardMaterial
              color={MAT.brushedAluminium.color}
              metalness={MAT.brushedAluminium.metalness}
              roughness={MAT.brushedAluminium.roughness}
            />
          </mesh>
          {/* Lower rail */}
          <mesh
            castShadow
            position={[0, SCENE.LEG_HEIGHT * 0.35, side * (SCENE.CONVEYOR_WIDTH / 2 + 0.08)]}
          >
            <boxGeometry args={[SCENE.CONVEYOR_LENGTH + 0.1, 0.05, 0.05]} />
            <meshStandardMaterial
              color={MAT.aluminium.color}
              metalness={MAT.aluminium.metalness}
              roughness={MAT.aluminium.roughness}
            />
          </mesh>
        </group>
      ))}

      {/* ── Support Legs ── */}
      {[...legPositions, ...midLegPositions].map(([x, , z], i) => (
        <group key={`leg-${i}`} position={[x, 0, z]}>
          {/* Vertical leg */}
          <mesh castShadow position={[0, SCENE.LEG_HEIGHT / 2, 0]}>
            <boxGeometry args={[0.06, SCENE.LEG_HEIGHT, 0.06]} />
            <meshStandardMaterial
              color={MAT.aluminium.color}
              metalness={MAT.aluminium.metalness}
              roughness={MAT.aluminium.roughness}
            />
          </mesh>
          {/* Foot pad */}
          <mesh receiveShadow position={[0, 0.015, 0]}>
            <boxGeometry args={[0.12, 0.03, 0.12]} />
            <meshStandardMaterial color="#1A2230" metalness={0.5} roughness={0.6} />
          </mesh>
        </group>
      ))}

      {/* ── Motor Housing (right end) ── */}
      <group position={[halfL + 0.18, SCENE.BELT_Y - 0.08, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.28, 0.38]} />
          <meshStandardMaterial
            color={MAT.sensorHousing.color}
            metalness={0.3}
            roughness={0.55}
          />
        </mesh>
        {/* Motor label plate */}
        <mesh position={[0.145, 0, 0]}>
          <boxGeometry args={[0.01, 0.1, 0.18]} />
          <meshStandardMaterial color="#1E88E5" metalness={0.1} roughness={0.5} />
        </mesh>
        {/* Ventilation slots */}
        {[-0.06, 0, 0.06].map((z, i) => (
          <mesh key={`vent-${i}`} position={[0, 0.12, z]}>
            <boxGeometry args={[0.29, 0.018, 0.025]} />
            <meshStandardMaterial color="#111820" metalness={0.1} roughness={0.7} />
          </mesh>
        ))}
      </group>

      {/* ── Cross braces ── */}
      {[-2.0, 0.0, 2.0].map((x, i) => (
        <mesh key={`brace-${i}`} position={[x, 0.35, 0]}>
          <boxGeometry args={[0.04, 0.04, SCENE.CONVEYOR_WIDTH + 0.12]} />
          <meshStandardMaterial
            color={MAT.aluminium.color}
            metalness={0.8}
            roughness={0.3}
          />
        </mesh>
      ))}

      {/* ── Belt + Rollers ── */}
      <Belt />
      <Rollers />
    </group>
  );
};

export default Conveyor;
