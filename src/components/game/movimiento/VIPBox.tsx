// VIPBox.tsx
import { useRef, useCallback, useEffect } from "react";
import Moveable from "react-moveable";
import type { OnDrag } from "react-moveable";
import * as THREE from "three";

export default function VIPBox() {
    const vipRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDragging = useRef<boolean>(false);
    const audioCtx = useRef<AudioContext | null>(null);

    // ---- THREE.JS ----
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(80, 80);
        renderer.setPixelRatio(window.devicePixelRatio);

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
        camera.position.z = 5;

        const bodyGeo = new THREE.BoxGeometry(1.5, 1.5, 0.2);
        const bodyMat = new THREE.MeshStandardMaterial({ color: 0x4fc3f7, roughness: 0.3, metalness: 0.6 });
        const body = new THREE.Mesh(bodyGeo, bodyMat);
        scene.add(body);

        const edgeGeo = new THREE.BoxGeometry(1.58, 1.58, 0.15);
        const edgeMat = new THREE.MeshStandardMaterial({ color: 0x0a0a2a, roughness: 1 });
        const edge = new THREE.Mesh(edgeGeo, edgeMat);
        edge.position.z = -0.05;
        scene.add(edge);

        const eyeGeo = new THREE.CircleGeometry(0.12, 16);
        const eyeMat = new THREE.MeshBasicMaterial({ color: 0x0a0a2a });
        const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
        eyeL.position.set(-0.28, 0.1, 0.12);
        scene.add(eyeL);

        const eyeR = eyeL.clone();
        eyeR.position.set(0.28, 0.1, 0.12);
        scene.add(eyeR);

        const mouthPoints = [
            new THREE.Vector3(-0.22, -0.18, 0.12),
            new THREE.Vector3(0, -0.28, 0.12),
            new THREE.Vector3(0.22, -0.18, 0.12),
        ];
        const mouthGeo = new THREE.BufferGeometry().setFromPoints(mouthPoints);
        const mouthMat = new THREE.LineBasicMaterial({ color: 0x0a0a2a, linewidth: 2 });
        const mouth = new THREE.Line(mouthGeo, mouthMat);
        scene.add(mouth);

        const ambient = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambient);
        const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
        dirLight.position.set(2, 2, 5);
        scene.add(dirLight);

        let animId: number;
        let t = 0;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            t += 0.03;
            if (!isDragging.current) {
                body.rotation.z = Math.sin(t * 0.5) * 0.15;
                edge.rotation.z = body.rotation.z;
            } else {
                body.rotation.z = Math.sin(t * 4) * 0.08;
                edge.rotation.z = body.rotation.z;
            }
            renderer.render(scene, camera);
        };
        animate();

        return () => {
            cancelAnimationFrame(animId);
            renderer.dispose();
        };
    }, []);

    // ---- AUDIO ----
    const startMusic = useCallback(() => {
        if (isDragging.current) return;
        isDragging.current = true;

        const ctx = new AudioContext();
        audioCtx.current = ctx;

        const notes = [523, 659, 784, 880, 784, 659, 523, 440];
        const noteDuration = 0.15;

        const playLoop = () => {
            notes.forEach((freq, i) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.type = "square";
                osc.frequency.value = freq;
                gain.gain.setValueAtTime(0.08, ctx.currentTime + i * noteDuration);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * noteDuration + noteDuration * 0.9);
                osc.start(ctx.currentTime + i * noteDuration);
                osc.stop(ctx.currentTime + i * noteDuration + noteDuration);
            });

            setTimeout(() => {
                if (isDragging.current) playLoop();
            }, notes.length * noteDuration * 1000);
        };

        playLoop();
    }, []);

    const stopMusic = useCallback(() => {
        isDragging.current = false;
        audioCtx.current?.close();
        audioCtx.current = null;
    }, []);

    return (
        <>
            <style>{`
        * { cursor: none !important; }
        .custom-cursor {
          position: fixed;
          width: 20px; height: 20px;
          background: #4fc3f7;
          border-radius: 3px;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%) rotate(45deg);
          box-shadow: 0 0 10px #4fc3f7aa;
        }
      `}</style>

            <div
                ref={vipRef}
                onMouseDown={startMusic}
                onMouseUp={stopMusic}
                onTouchStart={startMusic}
                onTouchEnd={stopMusic}
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 80,
                    height: 80,
                    touchAction: "none",
                    filter: "drop-shadow(0 0 12px #4fc3f7aa)",
                    zIndex: 100,
                }}
            >
                <canvas ref={canvasRef} width={80} height={80} style={{ display: "block" }} />
            </div>

            <Moveable
                target={vipRef}
                draggable={true}
                onDrag={({ target, left, top }: OnDrag) => {
                    const el = target as HTMLElement;
                    el.style.left = `${left}px`;
                    el.style.top = `${top}px`;
                    el.style.transform = "none";
                }}
            />
        </>
    );
}