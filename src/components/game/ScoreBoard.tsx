
import React from 'react';
import { Card } from '@/components/ui/card';

interface ScoreBoardProps {
  score: number;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ score }) => {
  return (
    <div className="text-center mb-4 sm:mb-6">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-2">Number Puzzle</h1>
      <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-4 px-2">Match identical numbers or pairs that sum to 10!</p>
      
      <Card className="inline-block p-3 sm:p-4 bg-black text-white">
        <div className="text-xl sm:text-2xl font-bold">
          Score: {score}
        </div>
      </Card>
    </div>
  );
};

export default ScoreBoard;
