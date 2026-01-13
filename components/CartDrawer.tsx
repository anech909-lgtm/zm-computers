
import React from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, onUpdateQuantity, onCheckout }) => {
  const total = cart.reduce((acc, item) => acc + (item.numericDiscountPrice || item.numericPrice) * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity" onClick={onClose} />
      <div className="absolute top-0 right-0 w-full md:max-w-md h-full bg-black shadow-[0_0_100px_rgba(0,0,0,1)] animate-slide-left flex flex-col border-l border-white/5">
        <div className="p-6 md:p-10 flex items-center justify-between border-b border-white/5">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif text-white italic">Your Order</h2>
            <p className="text-[9px] text-red-500 font-black uppercase tracking-[0.5em] mt-2">Wholesale Inventory</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:bg-white/5 rounded-full transition-all text-white border border-white/10">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 md:space-y-10 custom-scrollbar">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center px-4">
              <div className="w-20 h-20 md:w-24 md:h-24 bg-white/[0.02] rounded-full flex items-center justify-center mb-8 border border-white/5 shadow-inner">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 11-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
              </div>
              <p className="text-gray-600 uppercase text-[10px] tracking-[0.3em] font-black">Your order is empty</p>
              <button onClick={onClose} className="mt-8 px-8 py-3.5 bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl">Start Sourcing</button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={item.id} className="flex space-x-4 md:space-x-6 group animate-fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden bg-white/[0.02] flex-shrink-0 border border-white/5 group-hover:border-red-600/30 transition-colors">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="text-white font-serif text-lg md:text-xl leading-tight mb-1 md:mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-[8px] md:text-[9px] uppercase font-black tracking-[0.3em]">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3 md:mt-4">
                    <div className="flex items-center space-x-3 md:space-x-5 glass px-3 md:px-4 py-1 rounded-full border border-white/5">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-white hover:text-red-500 text-lg transition-colors font-light">－</button>
                      <span className="text-[9px] md:text-[10px] font-black text-white min-w-[20px] md:min-w-[24px] text-center">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-white hover:text-red-500 text-lg transition-colors font-light">＋</button>
                    </div>
                    <span className="text-white font-black text-xs md:text-sm tracking-tight">Rs. {((item.numericDiscountPrice || item.numericPrice) * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-6 md:p-10 border-t border-white/5 space-y-6 md:space-y-8 bg-gradient-to-t from-red-600/5 to-transparent">
            <div className="flex items-center justify-between">
              <span className="text-gray-500 uppercase text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.4em]">Order Value</span>
              <span className="text-3xl md:text-4xl font-black text-white tracking-tighter">Rs. {total.toLocaleString()}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full py-5 md:py-6 bg-white text-black font-black text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] rounded-2xl hover:bg-red-600 hover:text-white transition-all shadow-[0_30px_60px_-15px_rgba(255,255,255,0.1)] hover:scale-[1.02] active:scale-95"
            >
              Authorize Order
            </button>
            <p className="text-[8px] md:text-[9px] text-gray-600 text-center uppercase tracking-[0.4em] md:tracking-[0.5em] font-bold">Complimentary Global Priority Shipping</p>
          </div>
        )}
      </div>
      <style>{`
        @keyframes slide-left {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-slide-left { animation: slide-left 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 2px; }
      `}</style>
    </div>
  );
};

export default CartDrawer;
