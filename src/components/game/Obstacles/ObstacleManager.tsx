import { useState, useEffect } from 'react';
import { SingleObstacle } from './SingleObstacle';

export const ObstacleManager = () => {
  const [obstacles, setObstacles] = useState([
    { id: 1, pos: [-4, 2, 0], type: 'box' },
    { id: 2, pos: [4, -2, 0], type: 'box' },
    { id: 3, pos: [-2, -3, 0], type: 'box' },
    { id: 4, pos: [3, 3, 0], type: 'box' },
    { id: 5, pos: [0, 4, 0], type: 'box' },
    { id: 6, pos: [-5, -1, 0], type: 'box' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setObstacles((prev) => {
        // Just randomly move one obstacle to keep it dynamic
        return prev.map(obs => {
          if (Math.random() > 0.7) {
            return {
              ...obs,
              pos: [
                (Math.random() - 0.5) * 15,
                (Math.random() - 0.5) * 10,
                0
              ]
            };
          }
          return obs;
        });
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <group name="Manager_De_Obstaculos">
      {obstacles.map((obs) => (
        <SingleObstacle key={obs.id} position={obs.pos} type={obs.type} />
      ))}
    </group>
  );
};