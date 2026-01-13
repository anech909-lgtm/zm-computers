import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetail: (id: string) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  onAddToCart, 
  onViewDetail, 
  onQuickView,
  onToggleWishlist,
  isWishlisted
}) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 15;
    const rotateY = (centerX - x) / 15;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      onClick={() => onViewDetail(product.id)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        transition: rotation.x === 0 ? 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)' : 'none'
      }}
      className="group relative glass rounded-3xl p-6 md:p-8 transition-all duration-300 hover:shadow-[0_40px_80px_-20px_rgba(220,38,38,0.2)] cursor-pointer border border-white/5 hover:border-red-600/30 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden h-full flex flex-col"
    >
      {/* Dynamic Glow Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(220,38,38,0.08)_0%,transparent_50%)] transition-opacity pointer-events-none" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 bg-black/40 shadow-inner">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-[2s] cubic-bezier(0.2,0.8,0.2,1) group-hover:scale-110"
        />
        
        {/* Wishlist Button Overlay */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-4 right-4 z-30 p-3 rounded-full glass border border-white/10 transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isWishlisted ? 'text-red-500 bg-red-600/10 border-red-600/30' : 'text-white hover:text-red-500'
          }`}
        >
          <svg className="w-5 h-5" fill={isWishlisted ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 pointer-events-none group-hover:pointer-events-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="px-8 py-3 glass rounded-full text-white text-[9px] font-black uppercase tracking-[0.4em] border border-white/20 hover:bg-red-600 hover:border-red-600 transition-all transform translate-y-4 group-hover:translate-y-0 shadow-2xl"
          >
            Quick View
          </button>
        </div>

        {product.isNew && (
          <div className="absolute top-6 left-6 bg-white text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-2xl z-10">
            New Arrival
          </div>
        )}
        {product.isSale && (
          <div className="absolute top-16 left-6 bg-red-600 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] text-white shadow-2xl animate-pulse z-10">
            Sale
          </div>
        )}
      </div>

      <div className="space-y-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mb-2">{product.category}</p>
            <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-red-600 transition-colors duration-500 leading-none">{product.name}</h3>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {product.isSale && product.discountPrice ? (
            <div className="flex items-end space-x-3">
              <span className="text-2xl font-black text-red-500 tracking-tighter">{product.discountPrice}</span>
              <span className="text-[10px] line-through text-gray-600 font-bold uppercase tracking-widest pb-1">{product.price}</span>
            </div>
          ) : (
            <span className="text-2xl font-black text-white tracking-tighter">{product.price}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {product.specs.slice(0, 2).map((spec) => (
            <span key={spec} className="text-[8px] border border-white/5 bg-white/[0.02] px-3 py-1 rounded-full text-gray-400 uppercase font-black tracking-widest group-hover:border-red-600/20 transition-colors">
              {spec}
            </span>
          ))}
        </div>

        <div className="pt-6 mt-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
            className="w-full py-4 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] group-hover:bg-red-600 group-hover:text-white transition-all duration-500 transform group-hover:translate-y-[-4px] shadow-xl"
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;