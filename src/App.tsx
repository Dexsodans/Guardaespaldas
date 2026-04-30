// App.tsx
import VIPBox from "./components/game/movimiento/VIPBox";
import CustomCursor from "./components/game/movimiento/CustomCursor";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden", background: "#0a0a1a" }}>
      <CustomCursor />
      <VIPBox />
    </div>
  );
}