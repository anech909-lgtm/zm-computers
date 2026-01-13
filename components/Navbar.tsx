
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { ViewType } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
  cartCount: number;
  wishlistCount: number;
  toggleCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, cartCount, wishlistCount, toggleCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className={`mx-auto max-w-7xl px-6 md:px-12 transition-all duration-500 ${isScrolled ? 'glass rounded-full shadow-2xl mx-4 md:mx-auto' : ''}`}>
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-bold text-xl transform rotate-12 group-hover:rotate-0 transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)]">
              ZM
            </div>
            <span className="text-xl font-bold tracking-tighter text-gradient hidden sm:block">COMPUTERS</span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-10">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  if (item.view) onNavigate(item.view);
                }}
                className={`text-xs font-bold tracking-[0.2em] uppercase transition-all relative py-2 ${
                  item.isRed ? 'text-red-500 hover:text-red-400' : 'text-gray-400 hover:text-white'
                } ${currentView === item.view ? 'text-white' : ''}`}
              >
                {item.label}
                {currentView === item.view && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-red-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => onNavigate('wishlist')}
              className={`relative p-2 transition-all duration-300 hover:scale-110 ${currentView === 'wishlist' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              <svg className="w-6 h-6" fill={currentView === 'wishlist' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[9px] font-black flex items-center justify-center rounded-full shadow-lg">
                  {wishlistCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={toggleCart}
              className="relative p-2 text-white hover:text-red-500 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-[9px] font-bold flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)]">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 glass rounded-full"
            >
              <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-black z-[-1] transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-12">
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.label}
              onClick={() => {
                if (item.view) onNavigate(item.view);
                setMobileMenuOpen(false);
              }}
              className={`text-3xl font-serif transition-all transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${
                item.isRed ? 'text-red-500' : 'text-white'
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate('wishlist');
              setMobileMenuOpen(false);
            }}
            className={`text-3xl font-serif transition-all transform ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-white`}
            style={{ transitionDelay: `${NAV_ITEMS.length * 100}ms` }}
          >
            Wishlist ({wishlistCount})
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
