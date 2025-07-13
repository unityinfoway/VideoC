import React, { useState, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

// --- Using your exact import statements as requested ---
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroBackground from '../components/HeroBackground';

// --- ICONS ---
const LockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);
const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);
const EyeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);
const EyeOffIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

// --- STATUS DIALOG COMPONENT ---
const StatusDialog = ({ status, email }) => {
    if (!status) return null;

    const dialogContent = {
        sending: {
            icon: (
                <svg className="animate-spin h-8 w-8 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            ),
            title: "Account Created!",
            message: "Finalizing setup and sending login credentials to your email...",
        },
        success: {
            icon: (
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            ),
            title: "Registration Successful!",
            message: `Your login credentials have been sent to <strong class="text-white break-all">${email}</strong>. Redirecting you now...`,
        },
    };

    const currentContent = dialogContent[status];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-slate-800 rounded-xl p-8 max-w-sm w-full mx-4 text-center border border-slate-700 shadow-lg transform transition-all animate-fade-in-slide-up">
                <div className="mx-auto flex items-center justify-center h-12 w-12 mb-4">
                    {currentContent.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{currentContent.title}</h3>
                <p className="text-slate-300 mb-6" dangerouslySetInnerHTML={{ __html: currentContent.message }}></p>
            </div>
        </div>
    );
};


export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { plan, billingCycle } = location.state || {
      plan: { name: 'Pro', price: { monthly: '999', yearly: '9999' } },
      billingCycle: 'monthly'
  };

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    address: '',
    country: 'India',
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dialogStatus, setDialogStatus] = useState(null);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const summaryCardRef = useRef(null);
  const handleMouseMove = (e, cardRef) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (rect.height / 2 - y) / 10;
    const rotateY = (x - rect.width / 2) / 10;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  const handleMouseLeave = (cardRef) => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreedToTerms) {
      setError('You must agree to the Terms and Privacy Policy.');
      return;
    }

    setLoading(true);

    const submissionData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        address: formData.address,
        country: formData.country,
        phoneNumber: formData.phoneNumber,
        plan: {
            name: plan.name,
            cycle: billingCycle,
            price: price
        }
    };

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const data = await response.json();

      if (!response.ok) {
          throw new Error(data.message || `Server Error: ${response.status}`);
      }

      // --- AUTO-LOGIN AND REDIRECT LOGIC ---
      // 1. Save the token, username, and plan status to localStorage
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('username', data.user.fullName);
      localStorage.setItem('isPlanActive', data.user.isPlanActive);
      console.log('Auth token, username, and plan status saved to localStorage.');

      // 2. Show the intermediate "sending email" loader
      setDialogStatus('sending');

      // 3. After a delay, switch to the final success dialog
      setTimeout(() => {
        setDialogStatus('success');
        
        // 4. After showing the success message, redirect to home
        setTimeout(() => {
            setDialogStatus(null); // Hide the dialog
            navigate('/home'); // Redirect to home page
        }, 2000); // 2-second delay on the success message

      }, 3000); // 3-second delay for "sending email" message

    } catch (err) {
      console.error('Frontend error during registration:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const price = billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly;

  return (
    <div className="bg-slate-950 min-h-screen text-slate-100">
      <HeroBackground />
      <Navbar />

      <StatusDialog
        status={dialogStatus}
        email={formData.email}
      />

      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-white">
            Secure Checkout
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            You're just one step away. Please provide your billing information.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side: Billing Form */}
          <div className="lg:col-span-2 p-6 bg-slate-900 rounded-xl border border-slate-800">
            <div className="space-y-6">
              {/* Account Creation Section */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-4">Create Your Account</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">Email Address</label>
                    <input type="email" id="email" required className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="you@example.com" value={formData.email} onChange={handleInputChange}/>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                      <div className="relative">
                        <input type={showPassword ? "text" : "password"} id="password" required className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="••••••••" value={formData.password} onChange={handleInputChange}/>
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"><EyeIcon/></button>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-1">Confirm Password</label>
                      <div className="relative">
                        <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" required className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="••••••••" value={formData.confirmPassword} onChange={handleInputChange}/>
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400"><EyeOffIcon/></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Billing Details Section */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4 border-b border-slate-700 pb-4">Billing Details</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-300 mb-1">Full Name</label>
                    <input type="text" id="fullName" required className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="John Doe" value={formData.fullName} onChange={handleInputChange}/>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-slate-300 mb-1">Address</label>
                    <input type="text" id="address" required className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="123 Main St" value={formData.address} onChange={handleInputChange}/>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-slate-300 mb-1">Country</label>
                      <select id="country" required className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white focus:ring-2 focus:ring-indigo-500 outline-none" value={formData.country} onChange={handleInputChange}>
                        <option>India</option>
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="phoneNumber" className="block text-sm font-medium text-slate-300 mb-1">Phone Number</label>
                      <input type="tel" id="phoneNumber" required className="w-full bg-slate-800 border border-slate-700 rounded-md px-3 py-2 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="+91 12345 67890" value={formData.phoneNumber} onChange={handleInputChange}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Order Summary */}
          <div className="lg:col-span-1">
            <div ref={summaryCardRef} onMouseMove={(e) => handleMouseMove(e, summaryCardRef)} onMouseLeave={() => handleMouseLeave(summaryCardRef)} className="p-6 bg-slate-900 rounded-xl border border-slate-800 sticky top-24 flex flex-col gap-4" style={{ transition: 'transform 0.4s ease-in-out' }}>
              <h2 className="text-2xl font-bold text-white text-center border-b border-slate-700 pb-4">Your Plan</h2>
              <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-lg">
                <div>
                  <h3 className="font-bold text-white">{plan.name} Plan</h3>
                  <p className="text-sm text-slate-400">Billed {billingCycle}</p>
                </div>
                <div className="text-lg font-bold text-white">₹{price}</div>
              </div>
              <div className="border-t border-slate-700 pt-4">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" name="terms" type="checkbox" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-slate-600 rounded bg-slate-700"/>
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-slate-300">I agree to the <a href="#" className="text-indigo-400 hover:text-indigo-300">Terms</a> and <a href="#" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</a>.</label>
                  </div>
                </div>
              </div>
              {error && <p className="text-red-400 text-sm text-center bg-red-900/20 border border-red-500/30 rounded-md p-2">{error}</p>}
              <p className="text-xs text-slate-500 text-center">By completing your purchase, you agree to our Terms of Service.</p>
              <button type="submit" disabled={!agreedToTerms || loading} className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg shadow-indigo-500/20 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:shadow-none">
                {loading ? (<svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>) : (<LockIcon />)}
                <span>{loading ? 'Processing...' : `Pay ₹${price}`}</span>
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8">
          <Link to="/cart" className="inline-flex items-center gap-2 text-slate-400 hover:text-white group">
            <ArrowLeftIcon className="transition-transform group-hover:-translate-x-1" />
            <span>Return to Cart</span>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
