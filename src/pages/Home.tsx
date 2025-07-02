
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleStartGame = () => {
    navigate('/game');
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center relative bg-cover bg-center bg-no-repeat overflow-hidden" style={{
      backgroundImage: 'url("/lovable-uploads/f5f9751f-528c-408e-bbb7-a9a15528d493.png")'
    }}>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-blue-900/20"></div>
      
      <div className="relative z-10 text-center px-4 flex flex-col items-center justify-center h-full">
        {/* Game Title with pixelated/retro style */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-wider">
          <span className="inline-block text-yellow-400 drop-shadow-[0_6px_0_#1e40af] transform hover:scale-105 transition-transform duration-200">
            NUMBER
          </span>
          <br />
          <span className="inline-block text-yellow-400 drop-shadow-[0_6px_0_#1e40af] transform hover:scale-105 transition-transform duration-200">
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
          className="text-lg px-6 py-3 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border-4 border-yellow-500"
        >
          🎮 START GAME
        </Button>
      </div>
    </div>
  );
};

export default Home;
