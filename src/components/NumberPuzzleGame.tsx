import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Plus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Tile {
  id: string;
  value: number;
  row: number;
  col: number;
  isEmpty: boolean;
}

interface SelectedTile {
  tile: Tile;
  index: number;
}

const NumberPuzzleGame = () => {
  const [grid, setGrid] = useState<Tile[]>([]);
  const [selectedTiles, setSelectedTiles] = useState<SelectedTile[]>([]);
  const [score, setScore] = useState(0);
  const [gameRows, setGameRows] = useState(9);

  // Initialize the game grid
  const initializeGrid = useCallback((rows: number = 9) => {
    const newGrid: Tile[] = [];
    let id = 0;
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < 9; col++) {
        newGrid.push({
          id: `tile-${id++}`,
          value: Math.floor(Math.random() * 9) + 1,
          row,
          col,
          isEmpty: false
        });
      }
    }
    
    setGrid(newGrid);
    setGameRows(rows);
  }, []);

  // Check if two tiles are adjacent (including diagonally)
  const areAdjacent = (tile1: Tile, tile2: Tile): boolean => {
    const rowDiff = Math.abs(tile1.row - tile2.row);
    const colDiff = Math.abs(tile1.col - tile2.col);
    return rowDiff <= 1 && colDiff <= 1 && !(rowDiff === 0 && colDiff === 0);
  };

  // Check if two tiles are at opposite ends of the same row
  const areOppositeEnds = (tile1: Tile, tile2: Tile): boolean => {
    if (tile1.row !== tile2.row) return false;
    
    // Check if there are no non-empty tiles between them
    const minCol = Math.min(tile1.col, tile2.col);
    const maxCol = Math.max(tile1.col, tile2.col);
    
    for (let col = minCol + 1; col < maxCol; col++) {
      const tileIndex = tile1.row * 9 + col;
      if (tileIndex < grid.length && !grid[tileIndex].isEmpty) {
        return false;
      }
    }
    
    return true;
  };

  // Check if a match is valid
  const isValidMatch = (tile1: Tile, tile2: Tile): boolean => {
    if (tile1.isEmpty || tile2.isEmpty) return false;
    
    // Check if values match the rules (identical or sum to 10)
    const valuesMatch = tile1.value === tile2.value || tile1.value + tile2.value === 10;
    
    // Check position rules (adjacent or opposite ends of same row)
    const positionValid = areAdjacent(tile1, tile2) || areOppositeEnds(tile1, tile2);
    
    return valuesMatch && positionValid;
  };

  // Handle tile selection
  const handleTileClick = (tile: Tile, index: number) => {
    if (tile.isEmpty) return;

    // If tile is already selected, deselect it
    if (selectedTiles.some(selected => selected.tile.id === tile.id)) {
      setSelectedTiles(selectedTiles.filter(selected => selected.tile.id !== tile.id));
      return;
    }

    // If no tiles selected, select this one
    if (selectedTiles.length === 0) {
      setSelectedTiles([{ tile, index }]);
      return;
    }

    // If one tile selected, check for match
    if (selectedTiles.length === 1) {
      const firstTile = selectedTiles[0];
      
      if (isValidMatch(firstTile.tile, tile)) {
        // Valid match - remove both tiles
        const newGrid = [...grid];
        newGrid[firstTile.index] = { ...newGrid[firstTile.index], isEmpty: true };
        newGrid[index] = { ...newGrid[index], isEmpty: true };
        
        setGrid(newGrid);
        setScore(prev => prev + 10);
        setSelectedTiles([]);
        
        toast({
          title: "Match found!",
          description: `${firstTile.tile.value} and ${tile.value} - Great job!`,
        });
      } else {
        // Invalid match - select the new tile instead
        setSelectedTiles([{ tile, index }]);
        toast({
          title: "Invalid match",
          description: "Tiles must be identical/sum to 10 and be adjacent or at row ends",
          variant: "destructive"
        });
      }
    }
  };

  // Check if any matches are available
  const hasAvailableMatches = useCallback((): boolean => {
    const activeTiles = grid.filter(tile => !tile.isEmpty);
    
    for (let i = 0; i < activeTiles.length; i++) {
      for (let j = i + 1; j < activeTiles.length; j++) {
        if (isValidMatch(activeTiles[i], activeTiles[j])) {
          return true;
        }
      }
    }
    
    return false;
  }, [grid]);

  // Add a new row when no matches available
  const addNewRow = () => {
    const newRow: Tile[] = [];
    const newRowIndex = gameRows;
    
    for (let col = 0; col < 9; col++) {
      newRow.push({
        id: `tile-${newRowIndex}-${col}`,
        value: Math.floor(Math.random() * 9) + 1,
        row: newRowIndex,
        col,
        isEmpty: false
      });
    }
    
    setGrid(prev => [...prev, ...newRow]);
    setGameRows(prev => prev + 1);
    
    toast({
      title: "New row added!",
      description: "Keep matching those numbers!",
    });
  };

  // Reset the game
  const resetGame = () => {
    initializeGrid();
    setSelectedTiles([]);
    setScore(0);
    toast({
      title: "Game reset!",
      description: "Ready for a new challenge?",
    });
  };

  // Initialize game on component mount
  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  // Check for available matches
  useEffect(() => {
    if (grid.length > 0 && !hasAvailableMatches()) {
      setTimeout(() => {
        toast({
          title: "No more matches!",
          description: "Add a new row to continue playing",
        });
      }, 1000);
    }
  }, [grid, hasAvailableMatches]);

  const isTileSelected = (tileId: string): boolean => {
    return selectedTiles.some(selected => selected.tile.id === tileId);
  };

  return (
    <div className="min-h-screen bg-white p-2 sm:p-4 md:p-6">
      <div className="max-w-md mx-auto sm:max-w-lg md:max-w-2xl">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">Number Puzzle</h1>
          <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 px-2">Match identical numbers or pairs that sum to 10!</p>
          
          <Card className="inline-block p-3 sm:p-4 bg-black text-white">
            <div className="text-xl sm:text-2xl font-bold">
              Score: {score}
            </div>
          </Card>
        </div>

        {/* Game Controls */}
        <div className="flex justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-2">
          <Button 
            onClick={resetGame}
            className="bg-white hover:bg-gray-100 text-black border-2 border-black text-sm sm:text-base px-3 sm:px-4 py-2"
            variant="outline"
          >
            <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Reset
          </Button>
          
          <Button
            onClick={addNewRow}
            disabled={hasAvailableMatches()}
            className="bg-black hover:bg-gray-800 text-white disabled:opacity-50 disabled:bg-gray-300 text-sm sm:text-base px-3 sm:px-4 py-2"
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Add Row
          </Button>
        </div>

        {/* Game Grid */}
        <Card className="p-2 sm:p-3 md:p-4 bg-white border-2 border-black">
          <div className="grid grid-cols-9 gap-1 sm:gap-2">
            {grid.map((tile, index) => (
              <button
                key={tile.id}
                onClick={() => handleTileClick(tile, index)}
                disabled={tile.isEmpty}
                className={`
                  aspect-square rounded text-sm sm:text-base md:text-lg font-bold transition-all duration-200 border
                  ${tile.isEmpty 
                    ? 'bg-transparent cursor-not-allowed border-transparent' 
                    : isTileSelected(tile.id)
                      ? 'bg-black text-white scale-105 sm:scale-110 border-black shadow-lg transform'
                      : 'bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-black hover:scale-105 shadow-sm hover:shadow-md'
                  }
                `}
              >
                {!tile.isEmpty && tile.value}
              </button>
            ))}
          </div>
        </Card>

        {/* Game Rules */}
        <Card className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-50 border border-gray-200">
          <h3 className="text-black font-semibold mb-2 text-sm sm:text-base">How to Play:</h3>
          <ul className="text-gray-700 text-xs sm:text-sm space-y-1">
            <li>• Click two tiles that are identical OR sum to 10</li>
            <li>• Tiles must be adjacent (including diagonally)</li>
            <li>• OR at opposite ends of the same row with no tiles between</li>
            <li>• Matched tiles disappear and you earn 10 points</li>
            <li>• Add new rows when no matches are available</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default NumberPuzzleGame;
