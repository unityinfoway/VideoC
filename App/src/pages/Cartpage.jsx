import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBackground from '../components/HeroBackground';

const EmptyCartIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="21" r="1"></circle>
      <circle cx="20" cy="21" r="1"></circle>
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      <line x1="12" y1="12" x2="16" y2="16"></line>
      <line x1="16" y1="12" x2="12" y2="16"></line>
    </svg>
);

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


export default function Cart() {
  const location = useLocation();
  const { plan, billingCycle } = location.state || {};

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
                        <Link to="/" className="inline-block px-8 py-3 bg-indigo-600 font-semibold rounded-lg hover:bg-indigo-500 transition-all transform hover:-translate-y-1 shadow-lg shadow-indigo-500/30">
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
    <div className="bg-slate-950 min-h-screen text-slate-100">
      <Navbar />
      {/* Page Load Animation */}
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-fade-in-slide-up">
        
        {/* Back Button */}
        <Link to="/" className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors mb-8 group">
          <ArrowLeftIcon className="transition-transform group-hover:-translate-x-1" />
          <span>Back to Plans</span>
        </Link>
        
        {/* Gradient Heading */}
        <h1 className="text-5xl font-extrabold tracking-tight mb-12 text-center bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
          Review Your Order
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Side: Order Details with Glow Effect */}
          <div className="md:col-span-2 p-6 bg-slate-900 rounded-xl border border-slate-800 relative glowing-card">
            <h2 className="text-2xl font-bold text-white mb-2">{plan.name} Plan</h2>
            <p className="text-indigo-400 font-semibold mb-6">
              Billed {billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}
            </p>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-slate-700 pb-3">
              Features Included:
            </h3>
            {/* Staggered Animation for list items */}
            <ul className="space-y-3">
              {plan.features.map((feature, index) => (
                <li 
                  key={index} 
                  className="flex items-center gap-3 animate-fade-in-item"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CheckCircleIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Order Summary */}
          <div className="md:col-span-1">
            <div className="p-6 bg-slate-900 rounded-xl border border-slate-800 sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6 border-b border-slate-700 pb-4">
                Order Summary
              </h2>
              <div className="space-y-4 text-sm">
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
                <div className="flex justify-between text-lg pt-4 border-t border-slate-700">
                  <span className="text-white font-bold">Total</span>
                  <span className="text-white font-bold">₹{price}</span>
                </div>
              </div>
              <button className="w-full mt-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 hover:bg-indigo-500 transition-all transform hover:-translate-y-1">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}