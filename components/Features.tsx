
import React from 'react';

const Features: React.FC = () => {
  const features = [
    {
      title: "Direct Sourcing",
      desc: "We bypass middlemen, connecting your retail enterprise directly with top-tier hardware manufacturers worldwide.",
      icon: "M13 10V3L4 14h7v7l9-11h-7z"
    },
    {
      title: "Enterprise Scale",
      desc: "Capable of fulfilling orders from single specialized units to thousands of high-end workstations for the Pakistan market.",
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    },
    {
      title: "Global Logistics",
      desc: "Our premium delivery network ensures that your tech arrives securely, anywhere on the planet, tax-verified.",
      icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    }
  ];

  return (
    <section id="story" className="py-24 md:py-48 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-red-600/5 blur-[100px] md:blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-red-600/5 blur-[80px] md:blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <div className="reveal opacity-0 translate-y-10 scale-95 transition-all duration-1000">
            <span className="text-red-500 font-bold uppercase tracking-[0.4em] md:tracking-[0.5em] text-[10px] mb-6 md:mb-8 block">Our Commitment</span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-serif text-white mb-8 md:mb-12 leading-[1.2] md:leading-[1.1]">
              The Gold Standard <br className="hidden md:block" /> in <span className="italic">Tech Wholesale.</span>
            </h2>
            <p className="text-gray-500 text-lg md:text-xl mb-12 md:mb-16 leading-relaxed font-light">
              At ZM Computers, we don't just sell hardware; we architect tech infrastructures. 
              Our selection is curated for the most demanding environments, from financial 
              trading floors to world-class animation studios.
            </p>
            <div className="space-y-8 md:space-y-12">
              {features.map((f, idx) => (
                <div key={f.title} className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8 group reveal opacity-0 translate-y-10 transition-all duration-1000" style={{ transitionDelay: `${idx * 200}ms` }}>
                  <div className="flex-shrink-0 w-14 h-14 md:w-16 md:h-16 glass rounded-2xl flex items-center justify-center text-red-600 border border-white/5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:border-red-600/30">
                    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d={f.icon} /></svg>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-serif text-white mb-2 md:mb-3 tracking-wide">{f.title}</h4>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative reveal opacity-0 translate-y-10 scale-95 transition-all duration-1000 delay-300 mt-12 lg:mt-0">
            <div className="aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden glass p-3 md:p-4 border border-white/5 transition-all duration-1000 hover:scale-[1.02] group shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" 
                alt="Tech Environment" 
                className="w-full h-full object-cover rounded-[1.5rem] md:rounded-[2.5rem] opacity-50 transition-all duration-[2s] group-hover:opacity-100 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>
            
            {/* Elegant Metric Badge */}
            <div className="absolute -bottom-8 -left-4 sm:-bottom-16 sm:-left-16 w-60 h-60 sm:w-80 sm:h-80 glass rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 border border-white/10 -rotate-3 transition-all duration-1000 hover:rotate-0 hover:scale-105 backdrop-blur-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
              <p className="text-5xl sm:text-7xl font-serif text-white mb-2 sm:mb-4 italic">99<span className="text-red-600">.</span>9%</p>
              <p className="text-[8px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.6em] text-red-500 font-black mb-6 sm:mb-10">Client Retention</p>
              <div className="pt-6 sm:pt-10 border-t border-white/5">
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed italic">Trusted by global enterprises and leading local corporations for infrastructure deployments.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
