import React from 'react';
import { MAT } from './constants';

const Floor: React.FC = () => {
  return (
    <group>
      {/* Main concrete floor */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <planeGeometry args={[24, 16]} />
        <meshStandardMaterial
          color={MAT.concrete.color}
          metalness={MAT.concrete.metalness}
          roughness={MAT.concrete.roughness}
        />
      </mesh>

      {/* Concrete grid lines — industrial floor markings */}
      {[-4, 0, 4].map((x) =>
        [-4, 0, 4].map((z) => (
          <mesh
            key={`tile-${x}-${z}`}
            receiveShadow
            rotation={[-Math.PI / 2, 0, 0]}
            position={[x, -0.015, z]}
          >
            <planeGeometry args={[3.9, 3.9]} />
            <meshStandardMaterial
              color="#3A4152"
              metalness={0.0}
              roughness={0.92}
            />
          </mesh>
        ))
      )}

      {/* Yellow safety stripe */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -2.5]}>
        <planeGeometry args={[12, 0.12]} />
        <meshStandardMaterial color="#CA8A04" roughness={0.8} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 2.5]}>
        <planeGeometry args={[12, 0.12]} />
        <meshStandardMaterial color="#CA8A04" roughness={0.8} />
      </mesh>
    </group>
  );
};

export default Floor;
