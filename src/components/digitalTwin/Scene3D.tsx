import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stats } from '@react-three/drei';

import Lighting    from './Lighting';
import Floor       from './Floor';
import Conveyor    from './Conveyor';
import CameraModule from './CameraModule';
import WeightSensor from './WeightSensor';
import ColorSensor  from './ColorSensor';
import ServoGate    from './ServoGate';
import AcceptedBin  from './AcceptedBin';
import RejectedBin  from './RejectedBin';
import Fruit        from './Fruit';
import { useTwinAnimation } from './Animations';

// ─── Inner scene uses hooks inside Canvas ─────────────────────────────────────
const TwinScene: React.FC = () => {
  const anim = useTwinAnimation();

  return (
    <>
      <Lighting />
      <Floor />
      <Conveyor />
      <CameraModule  flashIntensity={anim.cameraFlash} />
      <WeightSensor  depression={anim.weightDepression} />
      <ColorSensor   glowIntensity={anim.colorGlow} />
      <ServoGate     angle={anim.servoAngle} />
      <AcceptedBin />
      <RejectedBin />

      <Fruit
        position={anim.fruitPos}
        color={anim.fruitColor}
        emissive={anim.fruitEmissive}
        visible={anim.fruitVisible}
        opacity={anim.fruitOpacity}
        scale={anim.fruitScale}
        wobble={anim.fruitWobble}
      />
    </>
  );
};

// ─── Fallback while loading ───────────────────────────────────────────────────
const SceneFallback: React.FC = () => (
  <mesh position={[0, 1, 0]}>
    <boxGeometry args={[0.5, 0.5, 0.5]} />
    <meshStandardMaterial color="#3B82F6" />
  </mesh>
);

// ─── Root Canvas ──────────────────────────────────────────────────────────────
interface Scene3DProps {
  showStats?: boolean;
}

const Scene3D: React.FC<Scene3DProps> = ({ showStats = false }) => {
  return (
    <Canvas
      className="r3f-canvas"
      camera={{
        position: [-0.5, 3.8, 7.2],
        fov:      42,
        near:     0.1,
        far:      60,
      }}
      shadows
      gl={{
        antialias:          true,
        powerPreference:    'high-performance',
        preserveDrawingBuffer: false,
      }}
      dpr={[1, 1.5]}
      frameloop="always"
    >
      {showStats && <Stats />}

      {/* HDR environment for reflections */}
      <Environment preset="warehouse" />

      <Suspense fallback={<SceneFallback />}>
        <TwinScene />
      </Suspense>

      <OrbitControls
        makeDefault
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={16}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI * 0.52}
        target={[0.5, 1.0, 0]}
        rotateSpeed={0.6}
        zoomSpeed={0.8}
        panSpeed={0.6}
        dampingFactor={0.08}
        enableDamping
      />
    </Canvas>
  );
};

export default Scene3D;
