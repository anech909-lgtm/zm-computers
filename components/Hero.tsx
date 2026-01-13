
import React from 'react';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0%,transparent_70%)] z-[5]" />
        
        {/* Rotating Geometric Lens */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vw] md:w-[120vw] md:h-[120vw] border border-red-600/5 rounded-full animate-slow-rotate pointer-events-none z-0">
           <div className="absolute top-0 left-1/2 w-1 h-full bg-gradient-to-b from-red-600/20 via-transparent to-transparent opacity-30" />
           <div className="absolute left-0 top-1/2 w-full h-1 bg-gradient-to-r from-red-600/20 via-transparent to-transparent opacity-30" />
        </div>

        <img 
          src="https://images.unsplash.com/photo-1547082299-de196ea013d6?auto=format&fit=crop&q=100&w=1920" 
          alt="Hero Hardware" 
          className="w-full h-full object-cover opacity-30 scale-110 animate-pulse-slow grayscale"
        />
      </div>

      <div className="relative z-20 text-center px-4 md:px-6 max-w-6xl mx-auto">
        <div className="reveal inline-block px-6 md:px-8 py-2 md:py-3 mb-6 md:mb-10 border border-white/5 rounded-full bg-white/[0.02] text-red-500 text-[8px] md:text-[9px] font-black tracking-[0.3em] md:tracking-[0.5em] uppercase animate-fade-in shadow-2xl backdrop-blur-md">
          Elite Infrastructure Wholesale
        </div>
        
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[9rem] font-serif mb-8 md:mb-12 text-white leading-[1.1] md:leading-[0.9] reveal tracking-tighter">
          Pure <span className="text-red-600 italic">Performance</span> <br className="hidden sm:block" />
          <span className="text-gray-400 opacity-20">At Scale.</span>
        </h1>
        
        <p className="text-base sm:text-lg md:text-2xl text-gray-500 max-w-3xl mx-auto mb-10 md:mb-16 leading-relaxed reveal delay-200 font-light tracking-wide px-4">
          ZM Computers bridges the gap between high-end hardware manufacturing and global enterprise needs. 
          Discover a curated selection of world-class workstations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-10 reveal delay-400 px-6 sm:px-0">
          <button 
            onClick={onExplore}
            className="group relative w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 bg-red-600 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em] rounded-full hover:bg-white hover:text-black transition-all transform hover:scale-105 shadow-[0_30px_60px_-15px_rgba(220,38,38,0.4)]"
          >
            Start Exploring
          </button>
          <button className="w-full sm:w-auto px-10 md:px-16 py-5 md:py-7 glass text-white font-black text-[10px] md:text-xs uppercase tracking-[0.4em] rounded-full hover:bg-white/10 transition-all border border-white/10 hover:border-white/20">
            Wholesale App
          </button>
        </div>
      </div>

      {/* Aesthetic Accents */}
      <div className="absolute left-12 bottom-12 hidden xl:block">
        <div className="flex flex-col space-y-6 opacity-20">
          <div className="w-[1px] h-32 bg-gradient-to-t from-red-600 to-transparent" />
          <p className="text-[9px] uppercase tracking-[0.6em] vertical-text text-white font-bold">PAKISTAN • EST. 2024</p>
        </div>
      </div>

      <style>{`
        .vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1.1); }
          50% { transform: scale(1.18); }
        }
        .animate-pulse-slow { animation: pulse-slow 20s ease-in-out infinite; }
        @keyframes slow-rotate {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-slow-rotate { animation: slow-rotate 120s linear infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
