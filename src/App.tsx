import { Canvas } from '@react-three/fiber';
import { Obstacles } from './components/game/Obstacles';
import './App.css'; // <--- ¡Asegúrate de que esta línea esté!

function App() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Obstacles />
      </Canvas>
    </div>
  );
}

export default App;