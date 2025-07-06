
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative overflow-hidden">
      {/* Rich crimson to violet gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#b31217] via-[#8b1462] to-[#6a0572]"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#b31217]/15 to-[#6a0572]/25"></div>
      
      {/* Abstract texture overlays with enhanced depth */}
      <div className="absolute inset-0 opacity-25 bg-grain"></div>
      <div className="absolute inset-0 opacity-15">
        {/* Subtle swirl patterns */}
        <div className="absolute top-1/5 left-1/5 w-[500px] h-[500px] bg-white/3 rounded-full blur-[80px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-[#8b1462]/8 rounded-full blur-[60px] animate-pulse delay-2000"></div>
        <div className="absolute top-1/2 right-1/4 w-[300px] h-[300px] bg-white/4 rounded-full blur-[40px] animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-[350px] h-[350px] bg-[#6a0572]/6 rounded-full blur-[70px] animate-pulse delay-3000"></div>
      </div>
      
      {/* Center highlight with vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/20"></div>
      <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent"></div>
      
      <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center h-full">
        {/* Game Title with futuristic styling */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-wider">
          <span className="inline-block text-white drop-shadow-[0_8px_0_#4a0e4e] transform hover:scale-105 transition-transform duration-200 filter drop-shadow-lg">
            NUMBER
          </span>
          <br />
          <span className="inline-block text-white drop-shadow-[0_8px_0_#4a0e4e] transform hover:scale-105 transition-transform duration-200 filter drop-shadow-lg">
            MATCH
          </span>
        </h1>
        
        {/* Subtitle with enhanced contrast */}
        <p className="text-white/90 text-base sm:text-lg md:text-xl mb-8 font-semibold drop-shadow-lg max-w-2xl">
          Match identical numbers or pairs that sum to 10!
        </p>
        
        {/* Start Game Button with modern styling */}
        <Button 
          onClick={handleStartGame} 
          size="lg" 
          className="text-lg px-8 py-4 bg-white/95 hover:bg-white text-[#6a0572] font-bold rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 border-2 border-white/30 backdrop-blur-sm"
        >
          🎮 START GAME
        </Button>
      </div>
    </div>
  );
};

export default Home;
