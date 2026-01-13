
import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="pt-48 pb-32 px-6 md:px-12 bg-black min-h-screen relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-32">
          <div className="reveal">
            <span className="text-red-500 font-black uppercase tracking-[0.5em] text-[10px] mb-8 block">Inquiries</span>
            <h1 className="text-6xl md:text-8xl font-serif text-white mb-12 leading-[0.9] tracking-tighter">Connect with <span className="italic">Wholesale.</span></h1>
            <p className="text-gray-500 text-2xl leading-relaxed mb-20 font-light max-w-xl">
              Establish a direct line with Pakistan's leading technology sourcing partner. 
              Our enterprise team handles specialized hardware logistics globally.
            </p>

            <div className="space-y-16">
              <div className="group reveal delay-100">
                <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-4">Strategic Headquarters</h4>
                <p className="text-gray-400 text-xl font-light leading-relaxed italic group-hover:text-red-500 transition-colors">
                  Tower 21, Business Bay, Karachi, Pakistan.
                </p>
              </div>

              <div className="group reveal delay-200">
                <h4 className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-4">Priority Correspondence</h4>
                <p className="text-gray-400 text-xl font-light leading-relaxed group-hover:text-white transition-colors">
                  procurement@zmcomputers.pk<br />
                  +92 21 3456 7890
                </p>
              </div>

              <div className="flex space-x-6 reveal delay-300">
                {['LinkedIn', 'X-Platform', 'Corporate Portal'].map((social) => (
                  <button key={social} className="px-6 py-2 glass rounded-full border border-white/5 text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:border-red-600 transition-all">
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="reveal delay-400">
            <div className="glass p-12 md:p-16 rounded-[4rem] border border-white/5 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-12 text-red-600/10 pointer-events-none">
                <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </div>
              
              <h3 className="text-2xl font-serif text-white mb-10 tracking-tight">Wholesale Inquiry Form</h3>
              
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-4">Authorized Rep</label>
                    <input className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white text-sm focus:border-red-600 focus:bg-white/5 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-4">Corporate Entity</label>
                    <input className="w-full bg-white/[0.03] border border-white/5 rounded-2xl px-6 py-4 text-white text-sm focus:border-red-600 focus:bg-white/5 outline-none transition-all" placeholder="Enter Company Name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-gray-600 ml-4">Procurement Message</label>
                  <textarea rows={4} className="w-full bg-white/[0.03] border border-white/5 rounded-[2rem] px-6 py-6 text-white text-sm focus:border-red-600 focus:bg-white/5 outline-none transition-all resize-none" placeholder="Detail your project requirements..." />
                </div>

                <button className="w-full py-6 bg-red-600 text-white font-black text-xs uppercase tracking-[0.5em] rounded-2xl hover:bg-white hover:text-black transition-all shadow-xl active:scale-95 group">
                  <span className="flex items-center justify-center space-x-3">
                    <span>Submit Infrastructure Request</span>
                    <svg className="w-4 h-4 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </button>
              </form>
            </div>
            
            <p className="mt-8 text-[9px] text-gray-700 text-center uppercase tracking-[0.5em] font-bold">
              * Response time: <span className="text-red-500">2-4 Business Hours</span>. Priority given to verified corporate accounts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
