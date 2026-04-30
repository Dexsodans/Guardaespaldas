import { useGame } from './GameContext';

export const GameUI = () => {
  const { collisions, gameStatus, resetGame } = useGame();

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 1000,
      color: 'white',
      fontFamily: 'sans-serif',
      pointerEvents: 'none',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    }}>
 
      
      {gameStatus !== 'playing' && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(0,0,0,0.8)',
          padding: '40px',
          borderRadius: '20px',
          textAlign: 'center',
          pointerEvents: 'auto'
        }}>
          <h2>{gameStatus === 'won' ? '¡HAS GANADO!' : 'GAME OVER'}</h2>
          <button 
            onClick={resetGame}
            style={{
              padding: '10px 20px',
              fontSize: '20px',
              cursor: 'pointer',
              background: '#4fc3f7',
              border: 'none',
              borderRadius: '5px',
              color: 'black',
              fontWeight: 'bold'
            }}
          >
            Reiniciar
          </button>
        </div>
      )}
    </div>
  );
};
