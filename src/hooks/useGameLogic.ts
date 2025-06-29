import { useState, useEffect, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Tile {
  id: string;
  value: number;
  row: number;
  col: number;
  isEmpty: boolean;
  isMatched: boolean;
}

export interface SelectedTile {
  tile: Tile;
  index: number;
}

export const useGameLogic = () => {
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
          isEmpty: false,
          isMatched: false
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
    if (tile1.isEmpty || tile2.isEmpty || tile1.isMatched || tile2.isMatched) return false;
    
    // Check if values match the rules (identical or sum to 10)
    const valuesMatch = tile1.value === tile2.value || tile1.value + tile2.value === 10;
    
    // Check position rules (adjacent or opposite ends of same row)
    const positionValid = areAdjacent(tile1, tile2) || areOppositeEnds(tile1, tile2);
    
    return valuesMatch && positionValid;
  };

  // Handle tile selection
  const handleTileClick = (tile: Tile, index: number) => {
    if (tile.isEmpty || tile.isMatched) return;

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
        // Valid match - mark both tiles as matched
        const newGrid = [...grid];
        newGrid[firstTile.index] = { ...newGrid[firstTile.index], isMatched: true };
        newGrid[index] = { ...newGrid[index], isMatched: true };
        
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
    const activeTiles = grid.filter(tile => !tile.isEmpty && !tile.isMatched);
    
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
        isEmpty: false,
        isMatched: false
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

  const isTileSelected = (tileId: string): boolean => {
    return selectedTiles.some(selected => selected.tile.id === tileId);
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

  return {
    grid,
    selectedTiles,
    score,
    handleTileClick,
    hasAvailableMatches,
    addNewRow,
    resetGame,
    isTileSelected
  };
};
