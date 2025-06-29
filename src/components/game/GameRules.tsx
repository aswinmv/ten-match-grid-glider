
import React from 'react';
import { Card } from '@/components/ui/card';

const GameRules: React.FC = () => {
  return (
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
  );
};

export default GameRules;
