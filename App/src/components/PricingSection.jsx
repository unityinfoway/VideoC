import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Link ko import kiya gaya hai

// --- ICONS ---
const CheckCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ChevronDownIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// --- UPDATED PRICING CARD COMPONENT ---
const PricingCard = ({ plan, billingCycle }) => {
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const price = billingCycle === "monthly" ? plan.price.monthly : plan.price.yearly;
  const topFeatures = plan.features.slice(0, 4);
  const otherFeatures = plan.features.slice(4);

  return (
    <div
      className={`relative p-6 rounded-xl border transition-all duration-300 flex flex-col ${
        plan.isFeatured
          ? "bg-slate-800/60 border-indigo-500/80 shadow-lg shadow-indigo-500/10"
          : "bg-slate-900/80 border-slate-700 hover:border-slate-500"
      }`}
    >
      {plan.isFeatured && (
        <div className="absolute top-0 right-0 -mt-3 mr-3">
          <span className="px-3 py-1 text-xs font-semibold tracking-wide text-white bg-indigo-600 rounded-full">
            Popular
          </span>
        </div>
      )}
      
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
        <p className="text-slate-400 text-sm mb-4 h-10">{plan.description}</p>
        
        <div className="mb-5">
          {typeof price === "number" ? (
            <div>
              <span className="text-4xl font-extrabold text-white">₹{price}</span>
              <span className="text-lg text-slate-400 ml-1">
                /{billingCycle === "monthly" ? "mo" : "yr"}
              </span>
            </div>
          ) : (
            <span className="text-4xl font-extrabold text-white">{price}</span>
          )}
        </div>

        <Link
          to="/cart"
          state={{ plan: plan, billingCycle: billingCycle }}
          className={`block text-center w-full py-2.5 font-semibold rounded-lg transition-all duration-300 text-base mb-6 ${
            plan.isFeatured
              ? "bg-indigo-600 text-white hover:bg-indigo-500 transform hover:-translate-y-0.5"
              : "bg-slate-700/50 text-white hover:bg-slate-600"
          }`}
        >
          {plan.name === "Enterprise" ? "Contact Sales" : "Choose Plan"}
        </Link>

        <ul className="space-y-3 mb-5">
          {topFeatures.map((feature, index) => (
            <li key={index} className="flex items-center gap-3">
              <CheckCircleIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <span className="text-slate-300 text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        {showAllFeatures && (
             <ul className="space-y-3 mb-5 animate-fade-in-fast">
                {otherFeatures.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                    <CheckCircleIcon className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                ))}
            </ul>
        )}
      </div>

      {otherFeatures.length > 0 && (
        <div className="mt-auto pt-4 border-t border-slate-700/50">
           <button 
                onClick={() => setShowAllFeatures(!showAllFeatures)}
                className="text-sm text-indigo-300 font-semibold flex items-center gap-2 mx-auto hover:text-indigo-200 transition-colors"
            >
               <span>See {showAllFeatures ? "less" : "all"} features</span>
               <ChevronDownIcon className={`transform transition-transform duration-300 ${showAllFeatures ? 'rotate-180' : ''}`} />
           </button>
        </div>
      )}
    </div>
  );
};


// --- MAIN PRICING SECTION COMPONENT ---
export default function PricingSection() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const pricingPlans = [
    {
      id: 1,
      name: "Creator",
      description: "For individuals and creators just getting started.",
      price: { monthly: 499, yearly: 4999 },
      features: [
        "Access to 100+ templates",
        "Basic UI Kits",
        "Standard License",
        "Email Support",
        "5 Downloads per day"
      ],
      isFeatured: false,
    },
    {
      id: 2,
      name: "Pro",
      description: "For professionals and teams who need more power.",
      price: { monthly: 999, yearly: 9999 },
      features: [
        "Access to all 1000+ assets",
        "All Premium UI Kits",
        "Canva & ChatGPT Accounts",
        "Priority Support",
        "Early access to new assets",
        "Unlimited Downloads"
      ],
      isFeatured: true,
    },
    {
      id: 3,
      name: "Enterprise",
      description: "For large organizations with custom needs.",
      price: { monthly: "Custom", yearly: "Custom" },
      features: [
        "Everything in Pro",
        "Custom Asset Creation",
        "Dedicated Account Manager",
        "Team & Collaboration Tools",
        "API Access",
        "24/7 Phone Support",
        "Custom Integrations"
      ],
      isFeatured: false,
    },
  ];

  return (
    <section id="pricing" className="px-4">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Flexible Pricing for Everyone
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-slate-400">
            Choose the perfect plan to fit your needs, whether you're a solo
            creator or a large enterprise.
          </p>
        </div>

        {/* --- Monthly/Yearly Toggle Switch --- */}
        <div className="flex justify-center items-center gap-4 mb-12">
          <span className={`font-semibold ${ billingCycle === "monthly" ? "text-white" : "text-slate-400" }`}>
            Monthly
          </span>
          <div
            onClick={() => setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly")}
            className="cursor-pointer w-14 h-8 flex items-center bg-slate-700 rounded-full p-1 duration-300 ease-in-out"
          >
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${ billingCycle === "yearly" ? "translate-x-6" : "" }`}></div>
          </div>
          <span className={`font-semibold ${ billingCycle === "yearly" ? "text-white" : "text-slate-400" }`}>
            Yearly
          </span>
          <span className="text-sm font-medium bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md">
            Save 15%
          </span>
        </div>

        {/* --- Pricing Cards Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} billingCycle={billingCycle} />
          ))}
        </div>
      </div>
    </section>
  );
}