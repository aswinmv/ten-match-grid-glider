
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 2500); // 2.5 seconds

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden">
      {/* Same gradient background as home page for consistency */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#3f2b96] via-[#a8c0ff] to-[#fbc2eb]"></div>
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-[#a8c0ff]/20 to-[#3f2b96]/30"></div>
      
      {/* Center radial glow */}
      <div className="absolute inset-0 bg-gradient-radial from-white/8 via-transparent to-transparent"></div>
      
      <div className="relative z-10 text-center">
        {/* Brand name with fade-in animation */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white drop-shadow-[0_6px_0_#3f2b96] animate-fade-in tracking-wider">
          COOPLIX
        </h1>
      </div>
    </div>
  );
};

export default SplashScreen;
