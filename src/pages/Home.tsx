
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Soft indigo to pastel blue to warm peach gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3f2b96] via-[#a8c0ff] to-[#fbc2eb]"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#a8c0ff]/20 to-[#3f2b96]/30"></div>
      
      {/* Subtle texture overlays with soft noise and cloudy swirls */}
      <div className="absolute inset-0 opacity-20 bg-soft-noise"></div>
      <div className="absolute inset-0 opacity-15">
        {/* Soft cloudy swirl patterns */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-white/10 rounded-full blur-[60px] animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] bg-[#fbc2eb]/15 rounded-full blur-[50px] animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-white/8 rounded-full blur-[40px] animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-[280px] h-[280px] bg-[#a8c0ff]/12 rounded-full blur-[45px] animate-pulse delay-3000"></div>
      </div>
      
      {/* Center radial glow for UI elements */}
      <div className="absolute inset-0 bg-gradient-radial from-white/8 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/10"></div>
      
      <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center h-full">
        {/* Game Title with enhanced styling */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-wider">
          <span className="inline-block text-white drop-shadow-[0_6px_0_#3f2b96] transform hover:scale-105 transition-transform duration-200 filter drop-shadow-lg">
            NUMBER
          </span>
          <br />
          <span className="inline-block text-white drop-shadow-[0_6px_0_#3f2b96] transform hover:scale-105 transition-transform duration-200 filter drop-shadow-lg">
            MATCH
          </span>
        </h1>
        
        {/* Subtitle with enhanced contrast */}
        <p className="text-white/95 text-base sm:text-lg md:text-xl mb-8 font-semibold drop-shadow-lg max-w-2xl">
          Match identical numbers or pairs that sum to 10!
        </p>
        
        {/* Start Game Button with updated styling */}
        <Button 
          onClick={handleStartGame} 
          size="lg" 
          className="text-lg px-8 py-4 bg-white/95 hover:bg-white text-[#3f2b96] font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 border-2 border-white/40 backdrop-blur-sm"
        >
          🎮 START GAME
        </Button>
      </div>
    </div>
  );
};

export default Home;
