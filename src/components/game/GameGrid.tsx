
import React from 'react';
import { Card } from '@/components/ui/card';
import Tile from './Tile';
import { Tile as TileType } from '@/hooks/useGameLogic';

interface GameGridProps {
  grid: TileType[];
  isTileSelected: (tileId: string) => boolean;
  isTileHinted: (tileId: string) => boolean;
  onTileClick: (tile: TileType, index: number) => void;
}

const GameGrid: React.FC<GameGridProps> = ({ grid, isTileSelected, isTileHinted, onTileClick }) => {
  return (
    <Card className="p-2 sm:p-3 md:p-4 bg-white border-2 border-black">
      <div className="grid grid-cols-9 gap-1 sm:gap-2">
        {grid.map((tile, index) => (
          <Tile
            key={tile.id}
            tile={tile}
            index={index}
            isSelected={isTileSelected(tile.id)}
            isHinted={isTileHinted(tile.id)}
            onClick={onTileClick}
          />
        ))}
      </div>
    </Card>
  );
};

export default GameGrid;
