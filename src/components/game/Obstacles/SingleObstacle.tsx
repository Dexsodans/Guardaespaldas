import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const SingleObstacle = ({ position, type = 'box' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Rotation and slight movement to make them "improved"
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y += Math.sin(state.clock.getElapsedTime() + position[0]) * 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={position} name="obstacle">
      {type === 'box' ? (
        <boxGeometry args={[1, 1, 1]} />
      ) : (
        <octahedronGeometry args={[0.7, 0]} />
      )}
      <meshStandardMaterial 
        color={type === 'box' ? "#ff4444" : "#ffaa00"} 
        emissive={type === 'box' ? "#220000" : "#221100"}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};
