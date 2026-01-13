import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductDetailProps {
  product: Product;
  allProducts: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
  onViewDetail: (id: string) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onBack: () => void;
  onQuickView: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ 
  product, 
  allProducts, 
  onAddToCart, 
  onViewDetail, 
  onToggleWishlist, 
  isWishlisted, 
  onBack, 
  onQuickView 
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const adjustQuantity = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const activePrice = product.numericDiscountPrice || product.numericPrice;
  const totalPrice = activePrice * quantity;

  const handleAdd = () => {
    setIsAdding(true);
    onAddToCart(product, quantity);
    
    // Show localized high-end confirmation
    setTimeout(() => {
      setIsAdding(false);
      setShowToast(true);
      // Auto-hide after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    }, 800);
  };

  const relatedProducts = useMemo(() => {
    return allProducts
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [allProducts, product]);

  return (
    <div className="pt-48 pb-32 px-6 md:px-12 bg-black min-h-screen relative overflow-hidden">
      {/* Localized Toast Notification */}
      <div className={`fixed top-32 left-1/2 -translate-x-1/2 z-[200] transition-all duration-1000 pointer-events-none ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}`}>
        <div className="glass px-10 py-5 rounded-full border border-red-600/40 shadow-[0_40px_80px_-15px_rgba(220,38,38,0.3)] backdrop-blur-3xl flex items-center space-x-4">
          <div className="w-2 h-2 bg-red-600 rounded-full animate-ping" />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.4em]">Infrastructure Committed to Batch</span>
        </div>
      </div>

      <div className="absolute top-1/4 right-0 w-[100vw] h-[100vw] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)] pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto relative z-10">
        <button 
          onClick={onBack}
          className="group flex items-center space-x-6 mb-20 text-[10px] font-black uppercase tracking-[0.6em] text-gray-500 hover:text-white transition-all reveal"
        >
          <div className="w-14 h-14 glass rounded-full flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-all border border-white/5">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          </div>
          <span>Back to Sourcing</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-32 items-start mb-48">
          <div className="reveal">
            <div className="relative glass rounded-[4rem] p-6 border border-white/5 shadow-2xl overflow-hidden group">
              <div className="aspect-[4/5] rounded-[3rem] overflow-hidden bg-black/40">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-[3s] group-hover:scale-110"
                />
              </div>
              {product.isSale && (
                <div className="absolute top-12 right-12 bg-red-600 text-white font-black px-8 py-3 rounded-full uppercase tracking-[0.4em] text-[10px] animate-pulse shadow-2xl">
                  Inventory Sale
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-6 mt-12">
              {[1,2,3,4].map((i) => (
                <div key={i} className="aspect-square glass rounded-[2rem] p-2 border border-white/5 cursor-pointer hover:border-red-600/50 transition-all group overflow-hidden">
                  <img src={product.image} className="w-full h-full object-cover rounded-[1.5rem] opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700" alt="thumbnail" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-16 reveal">
            <div>
              <div className="flex items-center space-x-6 mb-10">
                <span className="text-red-500 font-black uppercase tracking-[0.6em] text-[10px]">{product.category}</span>
                <div className="w-20 h-[1px] bg-red-600/30" />
                <span className="text-gray-600 text-[10px] uppercase tracking-[0.6em] font-black italic">ZM-REF-{product.id}</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif text-white mb-10 leading-[0.9] tracking-tighter">{product.name}</h1>
              <p className="text-gray-500 text-2xl leading-relaxed max-w-xl font-light">
                The pinnacle of {product.category.toLowerCase()} engineering. Designed for extreme performance and absolute reliability in Pakistani institutional environments.
              </p>
            </div>

            <div className="flex items-end space-x-8">
              {product.isSale && product.discountPrice ? (
                <div className="flex flex-col">
                  <span className="text-gray-600 text-sm line-through uppercase tracking-[0.4em] font-black mb-3 italic opacity-50">MSRP {product.price}</span>
                  <span className="text-7xl font-black text-red-600 tracking-tighter">{product.discountPrice}</span>
                </div>
              ) : (
                <span className="text-7xl font-black text-white tracking-tighter">{product.price}</span>
              )}
            </div>

            <div className="space-y-8">
              <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px]">Technical Specifications</h4>
              <div className="grid grid-cols-2 gap-6">
                {product.specs.map((spec) => (
                  <div key={spec} className="glass p-6 rounded-[2rem] border border-white/5 flex items-center space-x-5 group hover:border-red-600/40 transition-all duration-500">
                    <div className="w-2 h-2 bg-red-600 rounded-full group-hover:animate-ping" />
                    <span className="text-gray-400 text-sm font-black tracking-widest uppercase">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-16 border-t border-white/5 space-y-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between space-y-8 md:space-y-0">
                <div className="space-y-5">
                  <span className="text-white font-black uppercase tracking-[0.5em] text-[10px] block opacity-50">Order Volume</span>
                  <div className="flex items-center glass border border-white/10 rounded-full p-2 h-20 w-fit">
                    <button onClick={() => adjustQuantity(-1)} className="w-16 h-full flex items-center justify-center text-white hover:text-red-500 transition-all text-2xl font-light">－</button>
                    <span className="w-24 text-center text-white font-black text-2xl">{quantity}</span>
                    <button onClick={() => adjustQuantity(1)} className="w-16 h-full flex items-center justify-center text-white hover:text-red-500 transition-all text-2xl font-light">＋</button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-[9px] uppercase font-black tracking-[0.5em] mb-3">Est. Batch Value</p>
                  <p className="text-5xl font-black text-white tracking-tighter">Rs. {totalPrice.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-stretch space-x-4 h-24">
                <button 
                  onClick={handleAdd}
                  disabled={isAdding}
                  className={`flex-1 relative overflow-hidden group flex items-center justify-center space-x-6 px-10 rounded-[2.5rem] font-black text-xs uppercase tracking-[0.5em] transition-all duration-700 shadow-2xl transform active:scale-95 ${
                    isAdding 
                    ? 'bg-white text-black scale-[1.03]' 
                    : 'bg-red-600 text-white hover:bg-white hover:text-black hover:scale-[1.02]'
                  }`}
                >
                  <span className="relative z-10 flex items-center space-x-4">
                    {isAdding ? (
                      <>
                        <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                        <span>Add to Wholesale Order</span>
                      </>
                    )}
                  </span>
                </button>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`w-24 flex items-center justify-center rounded-[2.5rem] glass border transition-all duration-500 hover:scale-105 active:scale-90 ${
                    isWishlisted ? 'border-red-600 text-red-500 bg-red-600/10' : 'border-white/10 text-white hover:border-red-600/50 hover:text-red-500'
                  }`}
                >
                  <svg className="w-8 h-8" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="reveal mt-64 border-t border-white/5 pt-48">
            <h2 className="text-4xl md:text-8xl font-serif text-white mb-24 tracking-tighter">Complementary <span className="italic">Inventory</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              {relatedProducts.map((relProduct) => (
                <ProductCard 
                  key={relProduct.id} 
                  product={relProduct} 
                  onAddToCart={(p) => onAddToCart(p, 1)} 
                  onViewDetail={onViewDetail}
                  onQuickView={onQuickView}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={!!allProducts.find(p => p.id === relProduct.id && isWishlisted)} // Note: simplified logic for related products
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;