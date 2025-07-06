
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Dynamic gradient background with textures */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-purple-700 to-violet-600"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-red-500/20 to-violet-700/30"></div>
      
      {/* Subtle texture overlays */}
      <div className="absolute inset-0 opacity-20 bg-grain"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-300/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-red-300/10 rounded-full blur-xl animate-pulse delay-500"></div>
      </div>
      
      {/* Central overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-radial from-black/10 via-transparent to-transparent"></div>
      
      <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center h-full">
        {/* Game Title with enhanced styling */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-wider">
          <span className="inline-block text-white drop-shadow-[0_8px_0_#7c2d12] transform hover:scale-105 transition-transform duration-200">
            NUMBER
          </span>
          <br />
          <span className="inline-block text-white drop-shadow-[0_8px_0_#7c2d12] transform hover:scale-105 transition-transform duration-200">
            MATCH
          </span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-white text-base sm:text-lg md:text-xl mb-8 font-semibold drop-shadow-lg max-w-2xl">
          Match identical numbers or pairs that sum to 10!
        </p>
        
        {/* Start Game Button */}
        <Button 
          onClick={handleStartGame} 
          size="lg" 
          className="text-lg px-8 py-4 bg-white hover:bg-gray-100 text-purple-700 font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 border-4 border-white/20"
        >
          🎮 START GAME
        </Button>
      </div>
    </div>
  );
};

export default Home;
