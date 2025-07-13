import React, { useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBackground from '../components/HeroBackground';

// --- ICONS ---
const CheckCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const EmptyCartIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      <line x1="12" y1="12" x2="16" y2="16"></line>
      <line x1="16" y1="12" x2="12" y2="16"></line>
    </svg>
);

const LockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);


export default function Cartpage() { // Renamed to Cartpage to match your router
  const location = useLocation();
  const { plan, billingCycle } = location.state || {};

  // Tilt Animation Logic
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  const handleMouseMove = (e, cardRef) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (rect.height / 2 - y) / 10;
    const rotateY = (x - rect.width / 2) / 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    cardRef.current.style.transition = 'transform 0.1s ease-out';
  };

  const handleMouseLeave = (cardRef) => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    cardRef.current.style.transition = 'transform 0.4s ease-in-out';
  };

  // Empty Cart Page
  if (!plan) {
    return (
        <div className="bg-slate-950 min-h-screen text-white flex flex-col">
            <HeroBackground />
            <Navbar />
            <div className="flex-grow flex items-center justify-center">
                <div className="text-center p-8 max-w-md mx-auto animate-fade-in-slide-up">
                    <div className="flex justify-center items-center mx-auto w-24 h-24 mb-6 bg-slate-800/50 rounded-full border-2 border-slate-700" style={{ animationDelay: '100ms' }}>
                        <EmptyCartIcon className="text-slate-600" />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-3" style={{ animationDelay: '200ms' }}>Your Cart is Empty</h1>
                    <p className="text-slate-400 mb-8" style={{ animationDelay: '300ms' }}>Looks like you haven't chosen a plan yet. Let's find one that's perfect for you.</p>
                    <div style={{ animationDelay: '400ms' }}>
                        <Link to="/#pricing" className="inline-block px-8 py-3 bg-indigo-600 font-semibold rounded-lg hover:bg-indigo-500 transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-500/30">
                            Browse Plans
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
  }

  const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;
  const isYearly = billingCycle === 'yearly';
  const discount = isYearly ? (price * 0.15).toFixed(2) : 0;
  const subtotal = isYearly ? (price / 0.85).toFixed(2) : price;
  
  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 overflow-x-hidden">
      <Navbar />
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="animate-fade-in-fast">
            <Link to="/#pricing" className="inline-flex items-center gap-2 text-white hover:text-indigo-300 transition-colors mb-8 group">
                <ArrowLeftIcon className="transition-transform group-hover:-translate-x-1" />
                <span>Back to Plans</span>
            </Link>
        </div>
        
        <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-white animate-fade-in" style={{ animationDelay: '100ms' }}>
              Review Your Order
            </h1>
            <p className="text-slate-400 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
                You're almost there! Please take a moment to verify your selection below. This is the final step before you unlock amazing creative assets.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div 
            ref={leftCardRef}
            onMouseMove={(e) => handleMouseMove(e, leftCardRef)}
            onMouseLeave={() => handleMouseLeave(leftCardRef)}
            className="md:col-span-2 p-6 bg-slate-900 rounded-xl border border-slate-800 relative glowing-card animate-fade-in-slide-up" 
            style={{ animationDelay: '300ms' }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">{plan.name} Plan</h2>
            <p className="text-indigo-400 font-semibold mb-6">
              Billed {billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}
            </p>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-3">
              Features Included:
            </h3>
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 animate-list-item" style={{ animationDelay: `${400 + index * 80}ms` }}>
                  <CheckCircleIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-1 animate-fade-in-slide-up" style={{ animationDelay: '450ms' }}>
            <div 
              ref={rightCardRef}
              onMouseMove={(e) => handleMouseMove(e, rightCardRef)}
              onMouseLeave={() => handleMouseLeave(rightCardRef)}
              className="p-6 bg-gradient-to-b from-slate-800/80 to-slate-900/80 rounded-xl border border-slate-700 sticky top-24 flex flex-col gap-6"
            >
               <h2 className="text-2xl font-bold text-white text-center border-b border-slate-700 pb-4">
                Order Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal}</span>
                </div>
                {isYearly && (
                  <div className="flex justify-between">
                    <span className="text-slate-400">Yearly Discount (15%)</span>
                    <span className="text-green-400 font-medium">- ₹{discount}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-700 pt-5">
                <label htmlFor="coupon" className="text-xs font-medium text-slate-400">HAVE A COUPON CODE?</label>
                <div className="flex gap-2 mt-2">
                  <input type="text" id="coupon" placeholder="Enter code" className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition" />
                  <button className="px-4 bg-slate-700 hover:bg-slate-600 rounded-md text-sm font-semibold transition-colors">Apply</button>
                </div>
              </div>

              <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-700">
                <div className="flex justify-between items-center text-lg">
                  <span className="text-white font-bold">Total Due Today</span>
                  <span className="text-2xl text-white font-extrabold">₹{price}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                state={{ plan: plan, billingCycle: billingCycle }}
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                <LockIcon />
                <span>Proceed to Secure Checkout</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}