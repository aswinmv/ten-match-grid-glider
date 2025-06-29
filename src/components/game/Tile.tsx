
import React from 'react';
import { Tile as TileType } from '@/hooks/useGameLogic';

interface TileProps {
  tile: TileType;
  index: number;
  isSelected: boolean;
  isHinted: boolean;
  onClick: (tile: TileType, index: number) => void;
}

const Tile: React.FC<TileProps> = ({ tile, index, isSelected, isHinted, onClick }) => {
  // Handle matched tiles - show gray "N" box
  if (tile.isMatched) {
    return (
      <div className="aspect-square rounded text-sm sm:text-base md:text-lg font-bold bg-gray-200 text-gray-500 border border-gray-300 flex items-center justify-center cursor-default">
        N
      </div>
    );
  }

  return (
    <button
      onClick={() => onClick(tile, index)}
      disabled={tile.isEmpty}
      className={`
        aspect-square rounded text-sm sm:text-base md:text-lg font-bold transition-all duration-200 border
        ${tile.isEmpty 
          ? 'bg-transparent cursor-not-allowed border-transparent' 
          : isSelected
            ? 'bg-black text-white scale-105 sm:scale-110 border-black shadow-lg transform'
            : isHinted
              ? 'bg-white text-black border-yellow-400 border-2 shadow-lg animate-pulse'
              : 'bg-white text-black border-gray-300 hover:bg-gray-100 hover:border-black hover:scale-105 shadow-sm hover:shadow-md'
        }
      `}
    >
      {!tile.isEmpty && tile.value}
    </button>
  );
};

export default Tile;
