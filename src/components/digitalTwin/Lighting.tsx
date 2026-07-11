import React from 'react';

const Lighting: React.FC = () => {
  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={0.35} color="#B8CCE8" />

      {/* Main key light — industrial overhead */}
      <directionalLight
        position={[2, 8, 4]}
        intensity={1.8}
        color="#D6E8FF"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-near={0.5}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.001}
      />

      {/* Fill light from the front-left */}
      <directionalLight
        position={[-4, 5, 6]}
        intensity={0.6}
        color="#E8F0FF"
      />

      {/* Rim light from behind */}
      <directionalLight
        position={[0, 3, -6]}
        intensity={0.4}
        color="#6088C0"
      />

      {/* Ground bounce */}
      <hemisphereLight
        args={['#334466', '#1A2030', 0.25]}
      />

      {/* Accent: blue neon strip under the conveyor */}
      <pointLight
        position={[0, 0.3, 0]}
        intensity={0.6}
        color="#3B82F6"
        distance={6}
        decay={2}
      />

      {/* Left work light */}
      <spotLight
        position={[-4, 4, 2]}
        target-position={[-2, 0, 0]}
        intensity={1.0}
        angle={0.4}
        penumbra={0.5}
        color="#E8F0FF"
        castShadow={false}
      />

      {/* Right work light */}
      <spotLight
        position={[4, 4, 2]}
        target-position={[2, 0, 0]}
        intensity={0.8}
        angle={0.4}
        penumbra={0.5}
        color="#E8F0FF"
        castShadow={false}
      />
    </>
  );
};

export default Lighting;
