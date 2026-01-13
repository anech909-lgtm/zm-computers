
import React from 'react';
import { NAV_ITEMS } from '../constants';
import { ViewType } from '../types';

interface FooterProps {
  onNavigate: (view: ViewType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-black pt-20 md:pt-32 pb-8 md:pb-12 border-t border-white/5 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-red-600/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16 md:mb-24">
          <div className="sm:col-span-2">
            <div 
              className="flex items-center space-x-2 mb-6 md:mb-8 cursor-pointer group w-fit"
              onClick={() => onNavigate('home')}
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-red-600 rounded flex items-center justify-center font-bold text-base md:text-lg rotate-12 group-hover:rotate-0 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] text-white">ZM</div>
              <span className="text-xl md:text-2xl font-bold tracking-tighter text-gradient">COMPUTERS</span>
            </div>
            <p className="text-gray-500 text-base md:text-lg max-w-sm mb-10 md:mb-12 font-light">
              Pakistan's premier wholesale destination for high-performance computing hardware and enterprise infrastructure solutions.
            </p>
            <div className="flex flex-wrap gap-4">
              {['LinkedIn', 'Global Trade', 'Support'].map(label => (
                <button key={label} className="px-5 md:px-6 py-2 md:py-2.5 glass rounded-full flex items-center justify-center text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:border-red-600/50 transition-all border border-white/5">
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">Navigation</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-4">
              {NAV_ITEMS.map(item => (
                <li key={item.label}>
                  <button 
                    onClick={() => item.view && onNavigate(item.view)}
                    className="text-gray-500 hover:text-red-500 transition-colors uppercase text-[9px] md:text-[10px] font-bold tracking-widest text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => onNavigate('wishlist')}
                  className="text-gray-500 hover:text-white transition-colors uppercase text-[9px] md:text-[10px] font-bold tracking-widest text-left"
                >
                  Wholesale Registry
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-6 md:mb-8">Sourcing Newsletter</h4>
            <p className="text-gray-500 text-[9px] md:text-[10px] font-bold tracking-widest uppercase mb-4 md:mb-6 leading-loose">Join our network for exclusive stock updates.</p>
            <div className="flex flex-col space-y-4">
              <input 
                type="email" 
                placeholder="corporate@domain.com" 
                className="bg-white/[0.03] border border-white/5 rounded-2xl px-5 py-3.5 md:py-4 text-[9px] md:text-[10px] font-black tracking-widest uppercase text-white focus:outline-none focus:border-red-600 transition-colors"
              />
              <button className="bg-white text-black text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] md:tracking-[0.4em] py-3.5 md:py-4 rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-2xl active:scale-95">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[8px] md:text-[9px] uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-700 font-bold text-center md:text-left gap-6 md:gap-0">
          <p>© 2024 ZM COMPUTERS PAKISTAN. ARCHITECTING INFRASTRUCTURE.</p>
          <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
            <button className="hover:text-red-500 transition-colors">Privacy Charter</button>
            <button className="hover:text-red-500 transition-colors">Terms of Trade</button>
            <button className="hover:text-red-500 transition-colors">Tax Compliance</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
