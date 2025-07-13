import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import HeroBackground from '../components/HeroBackground'; // <-- IMPORTED

// --- ICONS (No changes) ---
const CheckCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);
const ChevronDownIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
const SupportIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path><path d="M12 12v-4"></path><path d="M12 16h.01"></path>
    </svg>
);
const GuaranteeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>
    </svg>
);
const CancelIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>
    </svg>
);

// --- Pricing Card with Home Page Theme ---
const PricingCard = ({ plan, billingCycle }) => {
  const cardRef = useRef(null);
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (rect.height / 2 - y) / (plan.isFeatured ? 15 : 20);
    const rotateY = (x - rect.width / 2) / (plan.isFeatured ? 15 : 20);
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    cardRef.current.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1500px) rotateX(0deg) rotateY(0deg)";
  };

  const price = billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly;
  const originalPrice = billingCycle === "monthly" ? plan.originalPrice?.monthly : plan.originalPrice?.yearly;
  const topFeatures = plan.features.slice(0, 4);
  const otherFeatures = plan.features.slice(4);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`product-card group cursor-default ${plan.isFeatured ? 'featured' : ''}`}
    >
      <div className="product-card-glow"></div>
      <div className="product-card-content p-8 flex flex-col">
          {plan.isFeatured && (
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-fit px-4 py-1.5 text-xs font-semibold tracking-wide text-white bg-purple-600 rounded-full whitespace-nowrap">
              BEST DEAL
            </div>
          )}
          {plan.discount && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 text-sm font-bold text-slate-900 bg-green-400 rounded-full">
                {plan.discount}
              </span>
            </div>
          )}
          <div className="flex-grow">
            <h3 className="text-2xl font-semibold text-white mb-2">{plan.name}</h3>
            <p className="text-slate-400 text-sm mb-6 h-10">{plan.description}</p>
            <div className="mb-6 h-16 flex items-baseline">
                {plan.name === "Free" ? (
                    <span className="text-5xl font-extrabold text-white">Free</span>
                ) : (
                    <div className="flex items-baseline">
                        <span className="text-5xl font-extrabold text-white">₹{price}</span>
                        {originalPrice && (
                            <span className="ml-3 text-2xl font-medium text-slate-500 line-through">
                                ₹{originalPrice}
                            </span>
                        )}
                    </div>
                )}
            </div>
            <Link
              to="/cart"
              state={{ plan: plan, billingCycle: billingCycle }}
              className={`block text-center w-full py-3 font-semibold rounded-lg transition-all duration-300 text-base mb-8 ${
                plan.isFeatured
                  ? "bg-purple-600 text-white hover:bg-purple-500 transform hover:-translate-y-0.5"
                  : "bg-slate-700 text-white hover:bg-slate-600"
              }`}
            >
              {plan.name === "Free" ? "Get Started Free" : "Choose Plan"}
            </Link>
            <ul className="space-y-3 mb-5 text-left">
              {topFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{feature}</span>
                </li>
              ))}
            </ul>
            {showAllFeatures && (
                <ul className="space-y-3 mb-5 animate-fade-in-fast text-left">
                  {otherFeatures.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                  ))}
                </ul>
            )}
          </div>
          {otherFeatures.length > 0 && (
            <div className="mt-auto pt-5 border-t border-slate-700/50">
              <button
                  onClick={() => setShowAllFeatures(!showAllFeatures)}
                  className="text-sm text-purple-400 font-semibold flex items-center gap-2 mx-auto hover:text-purple-300 transition-colors"
              >
                <span>See {showAllFeatures ? "less" : "all"} features</span>
                <ChevronDownIcon className={`transform transition-transform duration-300 ${showAllFeatures ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}
      </div>
    </div>
  );
};


// --- MAIN PRICING SECTION COMPONENT ---
export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const pricingPlans = [
    { id: 1, name: "Free", description: "A great starting point for individuals and hobbyists.", price: { monthly: 0, yearly: 0 }, features: [ "Access to 20+ free templates", "1 Website Project", "Basic Support", "5GB Storage", ], isFeatured: false, },
    { id: 2, name: "Pro", description: "For professionals who need more power and features.", price: { monthly: 499, yearly: 4999 }, originalPrice: { monthly: 1849, yearly: 18499 }, features: [ "Access to all 500+ templates", "Unlimited Website Projects", "Priority 24/7 Support", "AI Website Builder", "Advanced Analytics", "Dedicated server resources", ], isFeatured: true, discount: "73% OFF",},
  ];

  return (
    <section id="pricing" className="relative px-4 py-16 text-white overflow-hidden">
      
      {/* Background now uses the consistent HeroBackground component */}
      <HeroBackground />

      <div className="relative max-w-screen-xl mx-auto z-10">
        <div className="text-center mb-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Find the Perfect Plan for You
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-slate-400">
            Start for free and scale up as you grow. No credit card required for the free plan.
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 mb-12">
            <div className="flex items-center gap-3"> <SupportIcon className="w-5 h-5 text-purple-400"/> <span className="text-slate-300">24/7 support</span> </div>
            <div className="flex items-center gap-3"> <GuaranteeIcon className="w-5 h-5 text-purple-400"/> <span className="text-slate-300">30-day money-back guarantee</span> </div>
            <div className="flex items-center gap-3"> <CancelIcon className="w-5 h-5 text-purple-400"/> <span className="text-slate-300">Cancel anytime</span> </div>
        </div>

        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={`font-semibold ${ billingCycle === "monthly" ? "text-white" : "text-slate-400" }`}> Monthly </span>
          <div onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")} className="cursor-pointer w-14 h-8 flex items-center bg-slate-700 rounded-full p-1 duration-300 ease-in-out">
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${ billingCycle === "yearly" ? "translate-x-6" : "" }`}></div>
          </div>
          <span className={`font-semibold ${ billingCycle === "yearly" ? "text-white" : "text-slate-400" }`}> Yearly </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start max-w-4xl mx-auto">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} billingCycle={billingCycle} />
          ))}
        </div>
      </div>
    </section>
  );
}