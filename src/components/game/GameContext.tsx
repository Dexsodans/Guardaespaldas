import React, { createContext, useContext, useState, useCallback } from 'react';

interface GameState {
  collisions: number;
  gameStatus: 'playing' | 'won' | 'lost';
  incrementCollisions: () => void;
  winGame: () => void;
  loseGame: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameState | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collisions, setCollisions] = useState(0);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');

  const incrementCollisions = useCallback(() => {
    setCollisions((prev) => prev + 1);
  }, []);

  const winGame = useCallback(() => {
    setGameStatus('won');
  }, []);

  const loseGame = useCallback(() => {
    setGameStatus('lost');
  }, []);

  const resetGame = useCallback(() => {
    setCollisions(0);
    setGameStatus('playing');
  }, []);

  return (
    <GameContext.Provider value={{ collisions, gameStatus, incrementCollisions, winGame, loseGame, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
