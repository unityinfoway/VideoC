import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import HeroBackground from '../components/HeroBackground';

// --- ICON COMPONENTS ---
const MailIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);
const LockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);
const EyeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
);
const EyeOffIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);
const ArrowLeftIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);


// --- BRANDING & DECORATIVE COMPONENTS ---
const BrandLogo = () => (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="brandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#A78BFA', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#brandGradient)" opacity="0.9"/>
        <path d="M2 17l10 5 10-5" stroke="url(#brandGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="url(#brandGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


export default function AuthPage() {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [loginFormData, setLoginFormData] = useState({ email: "", password: "" });
  const [signupFormData, setSignupFormData] = useState({ fullName: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLoginChange = (e) => {
    setLoginFormData({ ...loginFormData, [e.target.name]: e.target.value });
  };
  
  const handleSignupChange = (e) => {
    setSignupFormData({ ...signupFormData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading('Logging in...');

    const payload = { email: loginFormData.email, password: loginFormData.password };

    try {
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }
        
        toast.dismiss(loadingToast);
        toast.success(result.message || 'Login successful!');

        if (result.token && result.user) {
            localStorage.setItem("authToken", result.token);
            localStorage.setItem("userId", result.user._id);
            localStorage.setItem("username", result.user.fullName);
            localStorage.setItem("role", result.user.role);
            localStorage.setItem("isPlanActive", result.user.isPlanActive);

            setTimeout(() => {
                if (result.user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/home');
                }
            }, 1000);
        }

    } catch (err) {
        toast.dismiss(loadingToast);
        toast.error(err.message || "Login failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };
  
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const loadingToast = toast.loading('Creating account...');

    const payload = { 
        email: signupFormData.email, 
        password: signupFormData.password,
        fullName: signupFormData.fullName
    };

    try {
        const response = await fetch(`http://localhost:5000/api/auth/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }
        
        toast.dismiss(loadingToast);
        toast.success('Account created! Logging you in...');
        
        if (result.token && result.user) {
            localStorage.setItem("authToken", result.token);
            localStorage.setItem("userId", result.user._id);
            localStorage.setItem("username", result.user.fullName);
            localStorage.setItem("role", result.user.role);
            localStorage.setItem("isPlanActive", result.user.isPlanActive);

            setTimeout(() => {
                navigate('/home');
            }, 1000);
        }

    } catch (err) {
        toast.dismiss(loadingToast);
        toast.error(err.message || "Signup failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <HeroBackground />
      <Toaster position="top-center" reverseOrder={false} toastOptions={{
          style: {
              background: '#1e293b',
              color: '#fff',
          }
      }} />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/home" className="flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group mb-8">
            <ArrowLeftIcon className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
        </Link>
        <div className="p-8 md:p-10 space-y-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl shadow-black/40">
            <div className="text-center">
                <div className="flex justify-center mb-4">
                    <BrandLogo />
                </div>
              <h2 className="text-4xl font-bold tracking-tight">
                {isLoginView ? 'Welcome Back' : 'Create an Account'}
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                {isLoginView ? 'Log in to continue to Vyapaara.' : 'Get started with your free account.'}
              </p>
            </div>

            {isLoginView ? (
                <form className="flex flex-col gap-y-6" onSubmit={handleLoginSubmit}>
                  <div className="relative">
                    <label htmlFor="email-login" className="sr-only">Email</label>
                    <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="email-login" type="email" name="email" placeholder="Email Address" value={loginFormData.email} onChange={handleLoginChange} className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-white/10 placeholder-gray-400 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
                  </div>
                  <div className="relative">
                    <label htmlFor="password-login" className="sr-only">Password</label>
                    <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="password-login" type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={loginFormData.password} onChange={handleLoginChange} className="w-full pl-12 pr-12 py-3.5 rounded-lg bg-white/10 placeholder-gray-400 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-white">{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-purple-600 bg-gray-700 border-gray-600 focus:ring-purple-500 rounded" />
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">Remember me</label>
                    </div>
                    <div className="text-sm">
                        <Link to="/forgot-password" className="font-medium text-purple-400 hover:text-purple-300">Forgot password?</Link>
                    </div>
                  </div>
                  <button type="submit" className="w-full mt-2 px-4 py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/20 hover:from-purple-700 hover:to-blue-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading}>{loading ? 'Logging In...' : "Login"}</button>
                  <p className="text-center text-sm text-gray-400">
                    Don't have an account?{' '}
                    <button type="button" onClick={() => setIsLoginView(false)} className="font-medium text-purple-400 hover:text-purple-300">Sign up</button>
                  </p>
                </form>
            ) : (
                <form className="flex flex-col gap-y-6" onSubmit={handleSignUpSubmit}>
                  <div className="relative">
                    <label htmlFor="fullName-signup" className="sr-only">Full Name</label>
                    <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="fullName-signup" type="text" name="fullName" placeholder="Full Name" value={signupFormData.fullName} onChange={handleSignupChange} className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-white/10 placeholder-gray-400 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
                  </div>
                  <div className="relative">
                    <label htmlFor="email-signup" className="sr-only">Email</label>
                    <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="email-signup" type="email" name="email" placeholder="Email Address" value={signupFormData.email} onChange={handleSignupChange} className="w-full pl-12 pr-4 py-3.5 rounded-lg bg-white/10 placeholder-gray-400 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
                  </div>
                  <div className="relative">
                    <label htmlFor="password-signup" className="sr-only">Password</label>
                    <LockIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input id="password-signup" type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={signupFormData.password} onChange={handleSignupChange} className="w-full pl-12 pr-12 py-3.5 rounded-lg bg-white/10 placeholder-gray-400 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-white">{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
                  </div>
                  <button type="submit" className="w-full mt-2 px-4 py-3.5 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/20 hover:from-purple-700 hover:to-blue-600 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed" disabled={loading}>{loading ? 'Creating Account...' : "Sign Up"}</button>
                  <p className="text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <button type="button" onClick={() => setIsLoginView(true)} className="font-medium text-purple-400 hover:text-purple-300">Login</button>
                  </p>
                </form>
            )}
        </div>
      </div>
    </div>
  );
}
