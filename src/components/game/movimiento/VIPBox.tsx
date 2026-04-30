import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useGame } from "../GameContext";

export default function VIPBox() {
    const meshRef = useRef<THREE.Group>(null);
    const bodyRef = useRef<THREE.Mesh>(null);
    const { incrementCollisions, gameStatus } = useGame();
    const { viewport, mouse, scene } = useThree();
    
    const [isDragging, setIsDragging] = useState(false);
    const pos = useRef(new THREE.Vector3(0, 0, 0));
    const targetPos = useRef(new THREE.Vector3(0, 0, 0));

    // Audio setup
    const audioCtx = useRef<AudioContext | null>(null);
    const playAudio = () => {
        if (!audioCtx.current) audioCtx.current = new AudioContext();
        const ctx = audioCtx.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 440;
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
    };

    // Collision detection
    const lastCollisionTime = useRef(0);
    const collisionCooldown = 500; // ms

    useFrame((state, delta) => {
        if (!meshRef.current || gameStatus !== 'playing') return;

        // Follow mouse when dragging
        if (isDragging) {
            targetPos.current.set(
                (mouse.x * viewport.width) / 2,
                (mouse.y * viewport.height) / 2,
                0
            );
        }

        // Smooth movement
        pos.current.lerp(targetPos.current, 0.2);
        
        // Physical Collision Detection
        const boxSize = 0.75; // Half size of the box
        const obstacles = scene.getObjectsByProperty('name', 'obstacle');
        
        let collisionDetected = false;
        let collisionNormal = new THREE.Vector3();

        obstacles.forEach((obs) => {
            if (obs instanceof THREE.Mesh) {
                const obsPos = obs.position;
                // Simple AABB collision (obstacles are 1x1x1 cubes)
                const dx = Math.abs(pos.current.x - obsPos.x);
                const dy = Math.abs(pos.current.y - obsPos.y);
                const dz = Math.abs(pos.current.z - obsPos.z);

                if (dx < boxSize + 0.5 && dy < boxSize + 0.5 && dz < 0.1 + 0.5) {
                    collisionDetected = true;
                    // Calculate normal for push-back
                    if (dx > dy) {
                        collisionNormal.set(pos.current.x > obsPos.x ? 1 : -1, 0, 0);
                    } else {
                        collisionNormal.set(0, pos.current.y > obsPos.y ? 1 : -1, 0);
                    }
                    
                    // Push back (prevent passing through)
                    const pushFactor = 0.1;
                    pos.current.add(collisionNormal.multiplyScalar(pushFactor));
                    targetPos.current.copy(pos.current);

                    const now = Date.now();
                    if (now - lastCollisionTime.current > collisionCooldown) {
                        incrementCollisions();
                        playAudio();
                        lastCollisionTime.current = now;
                    }
                }
            }
        });

        meshRef.current.position.copy(pos.current);

        // Animation
        if (bodyRef.current) {
            const t = state.clock.getElapsedTime();
            bodyRef.current.rotation.z = isDragging ? Math.sin(t * 10) * 0.1 : Math.sin(t * 2) * 0.1;
        }
    });

    return (
        <group 
            ref={meshRef} 
            name="vip-box"
            onPointerDown={(e) => {
                e.stopPropagation();
                (e.target as HTMLElement).setPointerCapture(e.pointerId);
                setIsDragging(true);
            }}
            onPointerUp={(e) => {
                e.stopPropagation();
                (e.target as HTMLElement).releasePointerCapture(e.pointerId);
                setIsDragging(false);
            }}
        >
            {/* Body */}
            <mesh ref={bodyRef}>
                <boxGeometry args={[1.5, 1.5, 0.2]} />
                <meshStandardMaterial color={0x4fc3f7} roughness={0.3} metalness={0.6} />
                
                {/* Edge/Border */}
                <mesh position={[0, 0, -0.05]}>
                    <boxGeometry args={[1.58, 1.58, 0.15]} />
                    <meshStandardMaterial color={0x0a0a2a} roughness={1} />
                </mesh>

                {/* Eyes */}
                <mesh position={[-0.28, 0.1, 0.12]}>
                    <circleGeometry args={[0.12, 16]} />
                    <meshBasicMaterial color={0x0a0a2a} />
                </mesh>
                <mesh position={[0.28, 0.1, 0.12]}>
                    <circleGeometry args={[0.12, 16]} />
                    <meshBasicMaterial color={0x0a0a2a} />
                </mesh>
            </mesh>
        </group>
    );
}
