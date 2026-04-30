import { useState } from 'react';
import { Canvas } from '@react-three/fiber';

import { Obstacles } from './components/game/Obstacles';

import VIPBox from './components/game/movimiento/VIPBox';
import CustomCursor from './components/game/movimiento/CustomCursor';

import Timer from './components/game/Contadores/Timer';
import CollisionCounter from './components/game/Contadores/CollisionCounter';

import './App.css';

function App() {

  // Estado preparado para futuras colisiones reales
  const [collisions] = useState(0);

  // Estado preparado para iniciar/detener el juego
  const [gameStarted] = useState(true);

  return (
    <div
      className="canvas-container"
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >

      {/* CONTADORES */}
      <Timer isRunning={gameStarted} />

      <CollisionCounter collisions={collisions} />

      {/* Canvas de Three.js */}
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />

        <pointLight position={[10, 10, 10]} />

        {/* Obstáculos */}
        <Obstacles />
      </Canvas>

      {/* Cursor personalizado */}
      <CustomCursor />

      {/* Personaje draggable */}
      <VIPBox />

    </div>
  );
}

export default App;