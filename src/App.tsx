import { Canvas } from '@react-three/fiber';
import { Obstacles } from './components/game/Obstacles';
import VIPBox from './components/game/movimiento/VIPBox';
import CustomCursor from './components/game/movimiento/CustomCursor';
import './App.css';

function App() {
  return (
    <div className="canvas-container" style={{ position: "relative", width: "100vw", height: "100vh" }}>
      
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
