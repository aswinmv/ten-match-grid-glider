
import React from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Plus, Lightbulb } from 'lucide-react';

interface GameControlsProps {
  onReset: () => void;
  onAddRow: () => void;
  onHint: () => void;
  hasAvailableMatches: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({ onReset, onAddRow, onHint, hasAvailableMatches }) => {
  return (
    <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 px-2 flex-wrap">
      <Button 
        onClick={onReset}
        className="bg-white hover:bg-gray-100 text-black border-2 border-black text-sm sm:text-base px-3 sm:px-4 py-2"
        variant="outline"
      >
        <RefreshCw className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        Reset
      </Button>
      
      <Button
        onClick={onHint}
        className="bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 text-purple-800 border-2 border-purple-200 hover:border-purple-300 text-sm sm:text-base px-3 sm:px-4 py-2 transition-all duration-200 shadow-sm hover:shadow-md"
        variant="outline"
      >
        <Lightbulb className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        Hint
      </Button>
      
      <Button
        onClick={onAddRow}
        disabled={hasAvailableMatches}
        className="bg-black hover:bg-gray-800 text-white disabled:opacity-50 disabled:bg-gray-300 text-sm sm:text-base px-3 sm:px-4 py-2"
      >
        <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
        Add Row
      </Button>
    </div>
  );
};

export default GameControls;
