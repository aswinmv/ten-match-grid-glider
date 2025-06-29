
import React from 'react';
import { useGameLogic } from '@/hooks/useGameLogic';
import ScoreBoard from './game/ScoreBoard';
import GameControls from './game/GameControls';
import GameGrid from './game/GameGrid';
import GameRules from './game/GameRules';

const NumberPuzzleGame = () => {
  const {
    grid,
    score,
    handleTileClick,
    hasAvailableMatches,
    addNewRow,
    resetGame,
    isTileSelected
  } = useGameLogic();

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4 md:p-6">
      <div className="max-w-md mx-auto sm:max-w-lg md:max-w-2xl">
        <ScoreBoard score={score} />
        
        <GameControls 
          onReset={resetGame}
          onAddRow={addNewRow}
          hasAvailableMatches={hasAvailableMatches()}
        />

        <GameGrid 
          grid={grid}
          isTileSelected={isTileSelected}
          onTileClick={handleTileClick}
        />

        <GameRules />
      </div>
    </div>
  );
};

export default NumberPuzzleGame;
