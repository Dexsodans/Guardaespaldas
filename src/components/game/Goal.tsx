import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGame } from './GameContext';

export const Goal = ({ position = [8, 0, 0] }) => {
  const meshRef = useRef<THREE.Group>(null);
  const { winGame, gameStatus } = useGame();

  useFrame((state) => {
    if (!meshRef.current || gameStatus !== 'playing') return;

    // Pulse animation
    const s = 1 + Math.sin(state.clock.getElapsedTime() * 4) * 0.1;
    meshRef.current.scale.set(s, s, s);
    meshRef.current.rotation.z += 0.02;

    // Check collision with VIPBox
    // We can look for the VIPBox in the scene or just use a distance check
    const vip = state.scene.getObjectByName('vip-box');
    if (vip) {
      const dist = meshRef.current.position.distanceTo(vip.position);
      if (dist < 1.5) {
        winGame();
      }
    }
  });

  return (
    <group ref={meshRef} position={position} name="goal">
      <mesh>
        <torusGeometry args={[1, 0.1, 16, 100]} />
        <meshStandardMaterial color="#00ff00" emissive="#004400" />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 0.05, 32]} />
        <meshStandardMaterial color="#00ff00" transparent opacity={0.3} />
      </mesh>
      <pointLight color="#00ff00" intensity={2} distance={5} />
    </group>
  );
};
