
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity?: number) => void;
  onViewDetail: (id: string) => void;
  onQuickView: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, onViewDetail, onQuickView }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
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
        transition: rotation.x === 0 ? 'transform 0.5s ease-out' : 'none'
      }}
      className="group relative glass rounded-3xl p-8 transition-all duration-300 hover:shadow-[0_40px_80px_-20px_rgba(220,38,38,0.2)] cursor-pointer border border-white/5 hover:border-red-600/30 bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden"
    >
      {/* Dynamic Glow Overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),rgba(220,38,38,0.08)_0%,transparent_50%)] transition-opacity pointer-events-none" />

      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-8 bg-black/40 shadow-inner">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-[1.5s] cubic-bezier(0.2,0.8,0.2,1) group-hover:scale-110"
        />
        
        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
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
          <div className="absolute top-6 right-6 bg-red-600 text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] text-white shadow-2xl animate-pulse z-10">
            Offer
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.4em] mb-2">{product.category}</p>
            <h3 className="text-2xl font-serif text-white group-hover:text-red-600 transition-colors duration-500 leading-none">{product.name}</h3>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {product.isSale && product.discountPrice ? (
            <>
              <span className="text-2xl font-black text-red-500 tracking-tighter">{product.discountPrice}</span>
              <span className="text-xs line-through text-gray-600 font-bold uppercase tracking-widest">{product.price}</span>
            </>
          ) : (
            <span className="text-2xl font-black text-white tracking-tighter">{product.price}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-4">
          {product.specs.slice(0, 2).map((spec) => (
            <span key={spec} className="text-[8px] border border-white/5 bg-white/[0.02] px-3 py-1 rounded-full text-gray-400 uppercase font-black tracking-widest group-hover:border-red-600/20 transition-colors">
              {spec}
            </span>
          ))}
        </div>

        <div className="pt-6">
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
