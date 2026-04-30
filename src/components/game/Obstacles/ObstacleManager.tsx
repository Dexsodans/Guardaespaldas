import { useState, useEffect } from 'react';
import { SingleObstacle } from './SingleObstacle';

export const ObstacleManager = () => {
  // Estado para guardar la lista de obstáculos actuales
  const [obstacles, setObstacles] = useState([
    { id: 1, pos: [0, 0, -5] },
    { id: 2, pos: [2, 1, -10] },
    { id: 3, pos: [-2, -1, -15] },
    { id: 4, pos: [1, -2, -20] }
  ]);

  useEffect(() => {
    // Creamos un intervalo que se ejecuta cada 5000ms (5 segundos)
    const interval = setInterval(() => {
      setObstacles((prev) => {
        // 1. Quitamos el primero de la lista (el más viejo)
        const remaining = prev.slice(1);
        
        // 2. Creamos uno nuevo en una posición aleatoria
        const newObstacle = {
          id: Date.now(), // ID único basado en el tiempo
          pos: [
            (Math.random() - 0.5) * 10, // X aleatorio
            (Math.random() - 0.5) * 6,  // Y aleatorio
            -20 // Z al fondo
          ]
        };

        // 3. Devolvemos la lista con el nuevo al final (siempre mantenemos 4)
        return [...remaining, newObstacle];
      });
    }, 5000);

    // Limpiamos el intervalo si el componente se destruye
    return () => clearInterval(interval);
  }, []);

  return (
    <group name="Manager_De_Obstaculos">
      {obstacles.map((obs) => (
        <SingleObstacle key={obs.id} position={obs.pos} />
      ))}
    </group>
  );
};