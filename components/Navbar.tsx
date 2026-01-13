import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';
import { ViewType } from '../types';

interface NavbarProps {
  onNavigate: (view: ViewType) => void;
  currentView: ViewType;
  cartCount: number;
  wishlistCount: number;
  toggleCart: () => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onNavigate, 
  currentView, 
  cartCount, 
  wishlistCount, 
  toggleCart,
  searchQuery,
  onSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6 md:py-8'}`}>
      <div className={`mx-auto max-w-7xl px-4 md:px-8 transition-all duration-500 ${isScrolled ? 'glass rounded-full shadow-2xl mx-4 md:mx-auto' : ''}`}>
        <div className="flex items-center justify-between h-16">
          
          {/* Logo Section - Prevent Shrinking */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group flex-shrink-0"
            onClick={() => {
              onSearch('');
              onNavigate('home');
            }}
          >
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center font-bold text-xl transform rotate-12 group-hover:rotate-0 transition-all shadow-[0_0_15px_rgba(220,38,38,0.5)] flex-shrink-0 text-white">
              ZM
            </div>
            <span className="text-xl font-bold tracking-tighter text-gradient hidden lg:block">COMPUTERS</span>
          </div>

          {/* Desktop Nav - Optimized Breakpoints */}
          <div className="hidden xl:flex items-center space-x-8 px-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  onSearch('');
                  if (item.view) onNavigate(item.view);
                }}
                className={`text-[10px] font-black tracking-[0.2em] uppercase transition-all relative py-2 whitespace-nowrap ${
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

          {/* Action Section */}
          <div className="flex items-center space-x-2 md:space-x-4 lg:space-x-6">
            
            {/* Search Bar - Responsive Sizing */}
            <div className="hidden md:flex items-center glass rounded-full px-4 py-2 border border-white/5 focus-within:border-red-600/50 transition-all duration-500 group shadow-inner max-w-[150px] lg:max-w-none">
              <svg className="w-4 h-4 text-gray-500 group-focus-within:text-red-600 transition-colors flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Search Archive..." 
                className="bg-transparent border-none outline-none text-[9px] font-black uppercase tracking-[0.2em] text-white ml-2 w-0 group-focus-within:w-28 lg:w-28 lg:focus:w-44 transition-all duration-700 placeholder:text-gray-600"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => onSearch('')}
                  className="ml-2 text-gray-600 hover:text-white transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            {/* Mobile Search Icon (only visible when bar is hidden) */}
            <button 
              onClick={() => onNavigate('categories')}
              className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button 
              onClick={() => onNavigate('wishlist')}
              className={`relative p-2 transition-all duration-300 hover:scale-110 ${currentView === 'wishlist' ? 'text-red-500' : 'text-white hover:text-red-500'}`}
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill={currentView === 'wishlist' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-white text-black text-[8px] md:text-[9px] font-black flex items-center justify-center rounded-full shadow-lg">
                  {wishlistCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={toggleCart}
              className="relative p-2 text-white hover:text-red-500 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 md:w-4 md:h-4 bg-red-600 text-[8px] md:text-[9px] font-bold flex items-center justify-center rounded-full shadow-[0_0_10px_rgba(220,38,38,0.5)] text-white">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-10 h-10 flex flex-col items-center justify-center space-y-1.5 glass rounded-full flex-shrink-0"
            >
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-5 h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay - Full Screen with Animations */}
      <div className={`fixed inset-0 bg-black z-[-1] transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex flex-col items-center justify-center h-full space-y-8 md:space-y-12">
          {/* Mobile Search */}
          <div className="w-full max-w-xs px-6 mb-4">
            <div className="flex items-center glass rounded-2xl px-6 py-4 border border-white/10">
               <input 
                type="text" 
                placeholder="Search Inventory..." 
                className="bg-transparent border-none outline-none text-xs font-bold uppercase tracking-widest text-white w-full"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center space-y-6 md:space-y-8">
            {NAV_ITEMS.map((item, idx) => (
              <button
                key={item.label}
                onClick={() => {
                  onSearch('');
                  if (item.view) onNavigate(item.view);
                  setMobileMenuOpen(false);
                }}
                className={`text-2xl md:text-4xl font-serif transition-all transform duration-500 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} ${
                  item.isRed ? 'text-red-500' : 'text-white'
                }`}
                style={{ transitionDelay: `${idx * 75}ms` }}
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('wishlist');
                setMobileMenuOpen(false);
              }}
              className={`text-2xl md:text-4xl font-serif transition-all transform duration-500 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-white/50 hover:text-white`}
              style={{ transitionDelay: `${NAV_ITEMS.length * 75}ms` }}
            >
              Wholesale Wishlist ({wishlistCount})
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;