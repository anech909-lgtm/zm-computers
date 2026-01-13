
import React, { useState } from 'react';
import { Product } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose, onAddToCart }) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  const activePrice = product.numericDiscountPrice || product.numericPrice;

  const handleAdd = () => {
    setIsAdding(true);
    onAddToCart(product, quantity);
    setTimeout(() => {
      setIsAdding(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 py-6 md:px-6 md:py-12">
      <div 
        className="absolute inset-0 bg-black/95 backdrop-blur-xl transition-opacity animate-fade-in" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-5xl glass rounded-[2rem] md:rounded-[3rem] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.1)] animate-scale-up max-h-[90vh] overflow-y-auto custom-scrollbar">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 md:top-8 md:right-8 z-50 w-10 h-10 md:w-12 md:h-12 glass rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-all border border-white/10"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square lg:aspect-auto min-h-[300px] lg:h-full bg-black/40">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            
            {product.isSale && (
              <div className="absolute top-6 left-6 md:top-10 md:left-10 bg-red-600 text-white font-black px-4 md:px-6 py-1.5 md:py-2 rounded-full uppercase tracking-[0.2em] text-[8px] md:text-[9px] animate-pulse">
                Wholesale Special
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="p-8 md:p-12 lg:p-20 flex flex-col justify-center bg-black/50">
            <div className="mb-8 md:mb-10">
              <span className="text-red-500 font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-[8px] md:text-[9px] mb-3 md:mb-4 block">
                Quick Repository View
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 md:mb-6 leading-tight">
                {product.name}
              </h2>
              <div className="flex items-center space-x-4 md:space-x-6">
                {product.isSale && product.discountPrice ? (
                  <div className="flex flex-wrap items-center gap-3 md:gap-4">
                    <span className="text-3xl md:text-4xl font-black text-red-600 tracking-tighter">{product.discountPrice}</span>
                    <span className="text-xs md:text-sm line-through text-gray-600 font-bold uppercase tracking-widest">{product.price}</span>
                  </div>
                ) : (
                  <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">{product.price}</span>
                )}
              </div>
            </div>

            <div className="space-y-6 md:space-y-8 mb-10 md:mb-12">
              <div className="grid grid-cols-1 gap-3 md:gap-4">
                {product.specs.map((spec) => (
                  <div key={spec} className="flex items-center space-x-4">
                    <div className="w-1.5 h-1.5 bg-red-600 rounded-full flex-shrink-0" />
                    <span className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-widest leading-snug">{spec}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 md:pt-10 border-t border-white/5 space-y-6 md:space-y-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-0">
                <div className="flex items-center glass border border-white/10 rounded-full p-1 md:p-1.5 h-12 md:h-14">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 md:w-10 h-full flex items-center justify-center text-white hover:text-red-500 transition-colors text-lg md:text-xl font-light"
                  >
                    －
                  </button>
                  <span className="w-10 md:w-12 text-center text-white font-black text-base md:text-lg">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 md:w-10 h-full flex items-center justify-center text-white hover:text-red-500 transition-colors text-lg md:text-xl font-light"
                  >
                    ＋
                  </button>
                </div>
                <div className="text-center sm:text-right">
                  <p className="text-gray-600 text-[8px] uppercase font-black tracking-[0.4em] mb-1">Batch Sum</p>
                  <p className="text-xl md:text-2xl font-black text-white">Rs. {(activePrice * quantity).toLocaleString()}</p>
                </div>
              </div>

              <button 
                onClick={handleAdd}
                disabled={isAdding}
                className={`w-full py-5 md:py-6 rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all duration-500 flex items-center justify-center space-x-4 ${
                  isAdding 
                  ? 'bg-white text-black scale-105' 
                  : 'bg-red-600 text-white hover:bg-white hover:text-black hover:scale-[1.02]'
                }`}
              >
                {isAdding ? (
                  <>
                    <svg className="w-4 h-4 md:w-5 md:h-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing Batch...</span>
                  </>
                ) : (
                  <span>Commit to Order</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scale-up {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-up {
          animation: scale-up 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
      `}</style>
    </div>
  );
};

export default QuickViewModal;
