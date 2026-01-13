import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Features from './components/Features';
import TechAdvisor from './components/TechAdvisor';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProductDetail from './components/ProductDetail';
import QuickViewModal from './components/QuickViewModal';
import Contact from './components/Contact';
import { PRODUCTS } from './constants';
import { ViewType, CartItem, Product } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewType>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedSpecs, setSelectedSpecs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [notification, setNotification] = useState<{message: string, visible: boolean}>({message: '', visible: false});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0', 'scale-100');
          entry.target.classList.remove('opacity-0', 'translate-y-10', 'scale-95');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [view, selectedProductId, selectedSpecs, searchQuery]);

  const showNotification = (message: string) => {
    setNotification({ message, visible: true });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, visible: false }));
    }, 3000);
  };

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    
    showNotification(`${quantity}x ${product.name} added to infrastructure order.`);
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const isBookmarked = prev.find(p => p.id === product.id);
      if (isBookmarked) {
        showNotification("Item removed from your repository.");
        return prev.filter(p => p.id !== product.id);
      }
      showNotification("Item saved to your private repository.");
      return [...prev, product];
    });
  };

  const handleViewDetail = (id: string) => {
    setSelectedProductId(id);
    setView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const toggleSpecFilter = (spec: string) => {
    setSelectedSpecs(prev => 
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() !== '' && view === 'home') {
      setView('categories');
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const total = cart.reduce((acc, item) => acc + (item.numericDiscountPrice || item.numericPrice) * item.quantity, 0);

  const selectedProduct = useMemo(() => 
    PRODUCTS.find(p => p.id === selectedProductId), 
    [selectedProductId]
  );

  const allSpecs = useMemo(() => {
    const specs = new Set<string>();
    PRODUCTS.forEach(p => p.specs.forEach(s => specs.add(s)));
    return Array.from(specs).sort();
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSpecs = selectedSpecs.length === 0 || selectedSpecs.every(spec => p.specs.includes(spec));
      const matchesSearch = searchQuery === '' || 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesSpecs && matchesSearch;
    });
  }, [selectedSpecs, searchQuery]);

  const renderContent = () => {
    switch(view) {
      case 'home':
        return (
          <>
            <Hero onExplore={() => setView('categories')} />
            <section id="collections" className="py-32 px-6 md:px-12 bg-black relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(220,38,38,0.05)_0%,transparent_50%)] pointer-events-none" />
              <div className="max-w-7xl auto px-4 mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20">
                  <div className="reveal opacity-0 translate-y-10 scale-95 transition-all duration-1000">
                    <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-[10px] mb-4 block">Selection</span>
                    <h2 className="text-4xl md:text-7xl font-serif text-white">The <span className="italic">Collection</span></h2>
                  </div>
                  <div className="reveal opacity-0 translate-y-10 scale-95 transition-all duration-1000 delay-200 mt-6 md:mt-0 max-w-md">
                    <p className="text-gray-500 text-lg border-l-2 border-red-600 pl-6 font-light">
                      Engineered for those who refuse to compromise. Every unit in the Pakistani repository is tested, 
                      benchmarked, and verified for peak performance.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                  {PRODUCTS.slice(0, 4).map((product, idx) => (
                    <div key={product.id} className="reveal opacity-0 translate-y-10 scale-95 transition-all duration-1000" style={{ transitionDelay: `${idx * 150}ms` }}>
                      <ProductCard 
                        product={product} 
                        onAddToCart={handleAddToCart} 
                        onViewDetail={handleViewDetail} 
                        onQuickView={handleQuickView}
                        onToggleWishlist={handleToggleWishlist}
                        isWishlisted={!!wishlist.find(p => p.id === product.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <Features />
          </>
        );

      case 'categories':
        const categories = Array.from(new Set(filteredProducts.map(p => p.category)));
        return (
          <div className="pt-48 pb-20 px-6 md:px-12 bg-black min-h-screen relative">
            <div className="absolute top-0 left-0 w-full h-screen bg-[conic-gradient(from_0deg_at_50%_50%,rgba(220,38,38,0.02)_0%,transparent_100%)] animate-slow-spin pointer-events-none" />
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="mb-20 reveal">
                <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">
                  {searchQuery ? `Searching: ${searchQuery}` : 'Archive'}
                </span>
                <h1 className="text-5xl md:text-8xl font-serif text-white mb-8">
                  {searchQuery ? 'Search' : 'Hardware'} <span className="italic">{searchQuery ? 'Results' : 'Segments'}</span>
                </h1>
                
                <div className="mt-12 space-y-6">
                  <div className="flex items-center space-x-4">
                    <span className="text-gray-500 text-[10px] font-black uppercase tracking-[0.3em]">Technical Filters</span>
                    <div className="flex-1 h-[1px] bg-white/5" />
                    {(selectedSpecs.length > 0 || searchQuery !== '') && (
                      <button 
                        onClick={() => { setSelectedSpecs([]); setSearchQuery(''); }}
                        className="text-red-500 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors"
                      >
                        Clear All Filters
                      </button>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {allSpecs.map((spec) => (
                      <button
                        key={spec}
                        onClick={() => toggleSpecFilter(spec)}
                        className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${
                          selectedSpecs.includes(spec)
                            ? 'bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)] scale-110'
                            : 'glass border-white/5 text-gray-400 hover:border-white/20 hover:text-white hover:scale-105'
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-32">
                {categories.length === 0 ? (
                   <div className="py-32 text-center glass rounded-3xl border border-white/5 reveal">
                      <p className="text-gray-500 text-xl mb-4 font-serif italic">
                        No hardware matches "{searchQuery || 'these parameters'}".
                      </p>
                      <button 
                        onClick={() => { setSelectedSpecs([]); setSearchQuery(''); }} 
                        className="text-red-500 font-bold uppercase tracking-widest text-[10px]"
                      >
                        Reset Infrastructure Search
                      </button>
                   </div>
                ) : (
                  categories.map((cat, catIdx) => (
                    <div key={cat} className="reveal opacity-0 translate-y-10 scale-95 transition-all duration-1000">
                      <div className="flex items-center space-x-6 mb-12">
                        <h2 className="text-3xl font-bold uppercase tracking-[0.3em] text-white tracking-widest">{cat}</h2>
                        <div className="flex-1 h-[1px] bg-red-600/20" />
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">
                          {filteredProducts.filter(p => p.category === cat).length} Units
                        </span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        {filteredProducts.filter(p => p.category === cat).map((p) => (
                          <ProductCard 
                            key={p.id} 
                            product={p} 
                            onAddToCart={handleAddToCart} 
                            onViewDetail={handleViewDetail} 
                            onQuickView={handleQuickView}
                            onToggleWishlist={handleToggleWishlist}
                            isWishlisted={!!wishlist.find(item => item.id === p.id)}
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        );

      case 'wishlist':
        return (
          <div className="pt-48 pb-20 px-6 md:px-12 bg-black min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="mb-20 reveal">
                <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Saved Infrastructure</span>
                <h1 className="text-5xl md:text-8xl font-serif text-white mb-8">Your <span className="italic text-red-600">Wishlist</span></h1>
                {wishlist.length === 0 ? (
                  <div className="py-20 text-center glass rounded-3xl border border-white/5 reveal">
                    <p className="text-gray-500 text-xl mb-8 font-serif italic">Your private repository is currently empty.</p>
                    <button onClick={() => setView('categories')} className="px-10 py-4 bg-white text-black font-black uppercase tracking-widest text-xs rounded-full hover:bg-red-600 hover:text-white transition-all shadow-xl">Explore Hardware</button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                    {wishlist.map((product, idx) => (
                      <div key={product.id} className="reveal opacity-0 translate-y-10 scale-95 transition-all duration-1000" style={{ transitionDelay: `${idx * 100}ms` }}>
                        <ProductCard 
                          product={product} 
                          onAddToCart={handleAddToCart} 
                          onViewDetail={handleViewDetail} 
                          onQuickView={handleQuickView}
                          onToggleWishlist={handleToggleWishlist}
                          isWishlisted={true}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'bestsellers':
        return (
          <div className="pt-48 pb-20 px-6 md:px-12 bg-black min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="mb-20 reveal">
                <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Hot Items</span>
                <h1 className="text-5xl md:text-8xl font-serif text-white mb-8">High Demand <br /><span className="text-red-600 italic">Inventory</span></h1>
                <p className="text-gray-500 text-xl max-w-2xl font-light leading-relaxed">Our fastest-moving hardware solutions, currently available for immediate bulk dispatch from our central distribution hubs.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                {PRODUCTS.filter(p => p.isBestSeller || p.isSale).map((product, idx) => (
                  <div key={product.id} className="reveal opacity-0 translate-y-10 scale-95 transition-all duration-1000" style={{ transitionDelay: `${idx * 100}ms` }}>
                    <ProductCard 
                      product={product} 
                      onAddToCart={handleAddToCart} 
                      onViewDetail={handleViewDetail} 
                      onQuickView={handleQuickView}
                      onToggleWishlist={handleToggleWishlist}
                      isWishlisted={!!wishlist.find(p => p.id === product.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'product-detail':
        if (!selectedProduct) return null;
        return (
          <ProductDetail 
            product={selectedProduct} 
            allProducts={PRODUCTS}
            onAddToCart={handleAddToCart} 
            onViewDetail={handleViewDetail}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={!!wishlist.find(p => p.id === selectedProduct.id)}
            onBack={() => setView('categories')} 
            onQuickView={handleQuickView}
          />
        );

      case 'contact':
        return <Contact />;

      case 'checkout':
        return (
          <div className="pt-48 pb-20 px-6 md:px-12 bg-black min-h-screen">
            <div className="max-w-4xl mx-auto">
              <div className="mb-16 text-center reveal">
                <span className="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Wholesale Processing</span>
                <h1 className="text-5xl font-serif text-white mb-4">Complete <span className="italic">Order</span></h1>
                <p className="text-gray-500 uppercase text-[10px] font-bold tracking-widest">Global Logistics Verified</p>
              </div>
              <div className="grid md:grid-cols-5 gap-12">
                <div className="md:col-span-3 space-y-8 reveal delay-100">
                  <div className="glass p-8 rounded-3xl border border-white/5 space-y-6 shadow-2xl">
                    <h3 className="text-white font-bold text-lg uppercase tracking-tight">Client Verification</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input placeholder="Legal Entity Name" className="col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600 outline-none transition-all focus:bg-white/10" />
                      <input placeholder="VAT / NTN / Tax ID" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600 outline-none transition-all focus:bg-white/10" />
                      <input placeholder="Contact Phone" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600 outline-none transition-all focus:bg-white/10" />
                    </div>
                  </div>
                  <div className="glass p-8 rounded-3xl border border-white/5 space-y-6 shadow-2xl">
                    <h3 className="text-white font-bold text-lg uppercase tracking-tight">Delivery Infrastructure</h3>
                    <div className="space-y-4">
                      <input placeholder="Distribution Center Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600 outline-none transition-all focus:bg-white/10" />
                      <div className="grid grid-cols-3 gap-4">
                        <input placeholder="City" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600 outline-none transition-all focus:bg-white/10" />
                        <input placeholder="Postal Code" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600 outline-none transition-all focus:bg-white/10" />
                        <input placeholder="Country" className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-red-600 outline-none transition-all focus:bg-white/10" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 space-y-8 reveal delay-200">
                  <div className="glass p-8 rounded-3xl border border-white/5 bg-red-600/5 shadow-[0_30px_60px_-15px_rgba(220,38,38,0.1)]">
                    <h3 className="text-white font-bold text-sm uppercase tracking-widest mb-6">Order Summary</h3>
                    <div className="space-y-4 mb-8 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                      {cart.map(item => (
                        <div key={item.id} className="flex justify-between text-xs">
                          <span className="text-gray-400 font-medium">{item.quantity}x {item.name}</span>
                          <span className="text-white font-black">Rs. {((item.numericDiscountPrice || item.numericPrice) * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                      <span className="text-white font-black uppercase text-xs tracking-widest">Total Value</span>
                      <span className="text-2xl font-black text-red-600">Rs. {total.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => setView('confirmation')}
                      className="w-full mt-8 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-2xl hover:scale-105 active:scale-95"
                    >
                      Authorize Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'confirmation':
        return (
          <div className="pt-48 pb-20 px-6 md:px-12 bg-black min-h-screen flex items-center justify-center">
            <div className="max-w-2xl text-center reveal">
              <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-12 shadow-[0_0_50px_rgba(220,38,38,0.5)] animate-bounce-slow">
                <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
              </div>
              <h1 className="text-5xl md:text-7xl font-serif text-white mb-8">Order <span className="italic text-red-600">Authorized.</span></h1>
              <p className="text-gray-400 text-xl leading-relaxed mb-12 font-light">
                Your high-priority order has been queued for dispatch. A dedicated account manager will contact you within 60 minutes to coordinate international logistics and tax compliance.
              </p>
              <div className="p-8 glass rounded-3xl border border-white/5 mb-12">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Confirmation Token</p>
                <p className="text-red-500 font-mono text-lg font-bold tracking-widest">ZM-9824-THX-2024</p>
              </div>
              <button 
                onClick={() => {
                  setCart([]);
                  setView('home');
                }}
                className="px-12 py-5 bg-white text-black font-black text-xs uppercase tracking-[0.3em] rounded-full hover:bg-red-600 hover:text-white transition-all shadow-xl hover:scale-105"
              >
                Return to Portal
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-black selection:bg-red-600 selection:text-white">
      <Navbar 
        onNavigate={setView} 
        currentView={view} 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        wishlistCount={wishlist.length}
        toggleCart={() => setIsCartOpen(!isCartOpen)} 
        searchQuery={searchQuery}
        onSearch={handleSearch}
      />
      {renderContent()}
      <Footer onNavigate={setView} />
      <TechAdvisor />
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setView('checkout');
        }}
      />
      <QuickViewModal 
        product={quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={!!quickViewProduct && !!wishlist.find(p => p.id === quickViewProduct.id)}
      />

      {/* Global Toast Notification */}
      <div className={`fixed bottom-12 left-1/2 -translate-x-1/2 z-[200] transition-all duration-700 pointer-events-none ${notification.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="glass px-8 py-4 rounded-full border border-red-600/30 flex items-center space-x-4 shadow-[0_30px_60px_-15px_rgba(220,38,38,0.4)] backdrop-blur-3xl">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_10px_rgba(220,38,38,1)]" />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.3em] whitespace-nowrap">{notification.message}</span>
        </div>
      </div>

      <style>{`
        .reveal { 
          transition-property: opacity, transform; 
          transition-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1); 
        }
        @keyframes slow-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: slow-spin 30s linear infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #222;
          border-radius: 2px;
        }
      `}</style>
    </main>
  );
};

export default App;