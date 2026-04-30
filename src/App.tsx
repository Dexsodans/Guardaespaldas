import { Canvas } from '@react-three/fiber';
import { Obstacles } from './components/game/Obstacles';
import VIPBox from './components/game/movimiento/VIPBox';
import CustomCursor from './components/game/movimiento/CustomCursor';
import { GameProvider } from './components/game/GameContext';
import { GameUI } from './components/game/GameUI';
import { Goal } from './components/game/Goal';
import './App.css';

function App() {
  return (
    <GameProvider>
      <div className="canvas-container" style={{ position: "relative", width: "100vw", height: "100vh", background: "#050505" }}>
        
        <GameUI />

        {/* Canvas de Three.js */}
        <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <gridHelper args={[20, 20, 0x444444, 0x222222]} rotation={[Math.PI / 2, 0, 0]} />

          {/* Obstáculos */}
          <Obstacles />

          {/* Meta para ganar */}
          <Goal position={[7, 0, 0]} />

          {/* Personaje jugable - Ahora dentro del Canvas */}
          <VIPBox />

        </Canvas>

        {/* Cursor personalizado */}
        <CustomCursor />

      </div>
    </GameProvider>
  );
}

export default App;