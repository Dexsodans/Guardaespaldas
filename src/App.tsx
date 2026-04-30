// App.tsx
import { useState } from "react";
import VIPBox from "./components/game/movimiento/VIPBox";

const OBSTACLE_IDS: string[] = ["obs-1", "obs-2", "obs-3"];

export default function App() {
  const [score, setScore] = useState<number>(0);

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden", background: "#111" }}>

      <h2 style={{ position: "absolute", top: 16, left: 16, color: "white", zIndex: 10 }}>
        Colisiones: {score}
      </h2>

      <div id="obs-1" style={{ position: "absolute", left: 200, top: 150, width: 80,  height: 80,  background: "crimson",    borderRadius: 8 }} />
      <div id="obs-2" style={{ position: "absolute", left: 400, top: 300, width: 100, height: 60,  background: "royalblue",  borderRadius: 8 }} />
      <div id="obs-3" style={{ position: "absolute", left: 300, top: 80,  width: 70,  height: 90,  background: "darkorange", borderRadius: 8 }} />

      <VIPBox
        obstacleIds={OBSTACLE_IDS}
        onCollision={() => setScore((s: number) => s + 1)}
      />

    </div>
  );
}