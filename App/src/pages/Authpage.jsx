import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from '../components/Toast';

// <-- IMPORT YOUR ASSETS HERE -->
import logoImage from '../assets/logo.png'; 
import backgroundImage from '../assets/bg5.jpg'; 
import authBannerImage from '../assets/auth-banner.jpg';

// Your Firebase imports
import { auth, db } from '../firebase.js';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { setDoc, doc, getDoc } from 'firebase/firestore';

// --- Components (Icons and Loaders) ---

const GoogleIcon = () => (
  <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.196C34.976 5.82 29.828 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
    <path fill="#FF3D00" d="M6.306 14.691c-1.645 3.119-2.656 6.637-2.656 10.309C3.65 29.363 4.661 32.881 6.306 36.009L12.05 31.549C11.233 29.531 10.8 27.345 10.8 25c0-2.345.433-4.531 1.25-6.549L6.306 14.691z"></path>
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-5.657-5.657C30.072 34.668 27.221 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-5.744 4.614C10.032 39.577 16.506 44 24 44z"></path>
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.16-4.082 5.571l5.657 5.657C42.488 36.425 44 31.13 44 25c0-2.616-.569-5.126-1.589-7.443l-5.8 4.526C37.525 18.067 37.225 20 37.225 20z"></path>
  </svg>
);

const LoadingSpinner = () => (
  <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);


const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'error' });

  const handleAuthSuccess = (message) => {
    setIsSuccess(true);
    setToast({ message, type: 'success' });
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };
  
  const handleAuthError = (err) => {
      const errorMap = {
          'auth/invalid-credential': 'Invalid email or password. Please try again.',
          'auth/email-already-in-use': 'An account with this email already exists.',
          'auth/weak-password': 'The password is too weak. Please choose a stronger one.',
          'auth/user-not-found': 'No account found with this email.',
      };
      setToast({ message: errorMap[err.code] || err.message, type: 'error' });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setToast({ message: '', type: 'error' });
    setLoading(true);

    if (isLogin) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const token = await userCredential.user.getIdToken();
        const userDocRef = doc(db, "users", userCredential.user.uid);
        const docSnap = await getDoc(userDocRef);
        
        if (docSnap.exists()) {
            const userData = docSnap.data();
            const userName = `${userData.firstName} ${userData.lastName}`;
            localStorage.setItem('authToken', token);
            localStorage.setItem('userName', userName);
        }
        
        handleAuthSuccess('Login Successful! Redirecting...');
      } catch (err) {
        handleAuthError(err);
      }
    } else {
      const nameRegex = /^[A-Za-z]+$/;
      if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        setLoading(false);
        return setToast({ message: 'Names should only contain letters.', type: 'error' });
      }
      if (password.length < 6) {
        setLoading(false);
        return setToast({ message: 'Password must be at least 6 characters.', type: 'error' });
      }
      const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      if (!specialCharRegex.test(password)) {
        setLoading(false);
        return setToast({ message: 'Password must include a special character.', type: 'error' });
      }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, "users", userCredential.user.uid), { uid: userCredential.user.uid, firstName: firstName, lastName: lastName, email: userCredential.user.email, createdAt: new Date(), authProvider: "email" });
        
        const token = await userCredential.user.getIdToken();
        const userName = `${firstName} ${lastName}`;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userName', userName);

        handleAuthSuccess('Account Created! Redirecting...');
      } catch (err) {
        handleAuthError(err);
      }
    }
    setLoading(false);
  };

  const handleGoogleAuth = async () => {
    setToast({ message: '', type: 'error' });
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const userDocRef = doc(db, "users", result.user.uid);
      const docSnap = await getDoc(userDocRef);
      
      let fName, lName;
      if (!docSnap.exists()) {
        const nameParts = result.user.displayName ? result.user.displayName.split(' ') : [];
        fName = nameParts[0] || '';
        lName = nameParts.slice(1).join(' ') || '';
        await setDoc(userDocRef, { uid: result.user.uid, firstName: fName, lastName: lName, email: result.user.email, createdAt: new Date(), authProvider: "google" });
      } else {
          const userData = docSnap.data();
          fName = userData.firstName;
          lName = userData.lastName;
      }

      const token = await result.user.getIdToken();
      const userName = `${fName} ${lName}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('userName', userName);

      handleAuthSuccess('Login Successful! Redirecting...');
    } catch (err) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!resetEmail) {
        return setToast({ message: 'Please enter your email address.', type: 'error' });
    }
    setLoading(true);
    try {
        await sendPasswordResetEmail(auth, resetEmail);
        setToast({ message: 'Password reset link sent! Check your inbox.', type: 'success' });
        setIsResetModalOpen(false);
        setResetEmail('');
    } catch (err) {
        handleAuthError(err);
    }
    setLoading(false);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setToast({ message: '', type: 'error' });
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
  };

  return (
    <>
      <style>{`
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus, 
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px #1f2937 inset !important;
          -webkit-text-fill-color: #e2e8f0 !important;
          caret-color: #e2e8f0 !important;
          border-bottom-color: #3b82f6 !important;
        }
      `}</style>
      <div 
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="min-h-screen bg-black/20 flex flex-col justify-center items-center p-4">
            <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'error' })} />
            
            <AnimatePresence>
                {isResetModalOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-slate-800 p-8 rounded-lg shadow-xl w-full max-w-md"
                            initial={{ scale: 0.9, y: -20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: -20 }}
                        >
                            <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
                            <p className="text-slate-400 mb-6">Enter your email address and we'll send you a link to reset your password.</p>
                            <form onSubmit={handlePasswordReset}>
                                <label className="text-xs text-slate-400">Email Address</label>
                                <input
                                    type="email"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    required
                                    className="w-full bg-transparent border-b-2 border-slate-600 focus:border-blue-500 text-white placeholder-slate-500 py-2 outline-none transition-colors duration-300"
                                    placeholder="you@example.com"
                                />
                                <div className="flex justify-end gap-4 mt-8">
                                    <button type="button" onClick={() => setIsResetModalOpen(false)} className="px-6 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition-colors">Cancel</button>
                                    <button type="submit" disabled={loading} className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors">
                                        {loading ? 'Sending...' : 'Send Reset Link'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="relative w-full max-w-4xl bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
            
            {isSuccess && (
                <motion.div 
                className="absolute inset-0 bg-slate-900/90 flex justify-center items-center z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                >
                <LoadingSpinner />
                </motion.div>
            )}

            {/* --- Left Column: Authentication Form --- */}
            <div className="p-6 md:p-10 flex flex-col justify-center">
                <div className="mb-6">
                    <img 
                        src={logoImage} 
                        alt="Your Company Logo" 
                        className="h-9 w-auto"
                    />
                    {/* CHANGE: Wrapped changing text in AnimatePresence for a smooth cross-fade animation. */}
                    {/* The parent div has a fixed height (h-20) to prevent the layout from shifting during the animation. */}
                    <div className="relative h-20 mt-4">
                        <AnimatePresence initial={false}>
                            <motion.div
                                key={isLogin ? 'login-title' : 'signup-title'}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0"
                            >
                                <h1 className="text-2xl font-bold text-slate-100">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                                <p className="text-slate-400 text-sm mt-1">{isLogin ? 'Sign in to continue your journey.' : 'Get started with a free account.'}</p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* CHANGE: Converted form to motion.form and added the `layout` prop. */}
                {/* This will automatically animate the form's height when its content changes. */}
                <motion.form 
                    layout
                    transition={{ duration: 0.4, type: "spring", bounce: 0.15 }}
                    onSubmit={handleSubmit} 
                    className="space-y-5"
                >
                    {/* CHANGE: Wrapped conditional inputs in AnimatePresence for smooth entry/exit. */}
                    <AnimatePresence initial={false}>
                        {!isLogin && (
                        <motion.div
                            key="nameFields" // A unique key is crucial for AnimatePresence
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto', transition: { duration: 0.3 } }}
                            exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
                            className="overflow-hidden" // Hide content as height collapses
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required={!isLogin} className="w-full bg-transparent border-b-2 border-slate-600 focus:border-blue-500 text-white placeholder-slate-500 py-2 outline-none transition-colors duration-300" placeholder="First Name" />
                                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required={!isLogin} className="w-full bg-transparent border-b-2 border-slate-600 focus:border-blue-500 text-white placeholder-slate-500 py-2 outline-none transition-colors duration-300" placeholder="Last Name" />
                            </div>
                        </motion.div>
                        )}
                    </AnimatePresence>

                    <div>
                        <label className="text-xs text-slate-400">Email Address</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-transparent border-b-2 border-slate-600 focus:border-blue-500 text-white placeholder-slate-500 py-2 outline-none transition-colors duration-300" placeholder="you@example.com" />
                    </div>
                    <div>
                        <div className="flex justify-between items-center">
                        <label className="text-xs text-slate-400">Password</label>
                        {isLogin && <button type="button" onClick={() => setIsResetModalOpen(true)} className="text-xs font-medium text-blue-500 hover:text-blue-400">Forgot Password?</button>}
                        </div>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-transparent border-b-2 border-slate-600 focus:border-blue-500 text-white placeholder-slate-500 py-2 outline-none transition-colors duration-300" placeholder="••••••••" />
                    </div>
                    <div>
                        <button type="submit" disabled={loading || isSuccess} className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ring-offset-slate-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                        </button>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex-grow border-t border-slate-700"></div>
                        <span className="mx-4 text-xs font-medium text-slate-500">OR</span>
                        <div className="flex-grow border-t border-slate-700"></div>
                    </div>
                    <div>
                        <button onClick={handleGoogleAuth} type="button" disabled={loading || isSuccess} className="w-full flex items-center justify-center bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-sm font-medium text-slate-300 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 ring-offset-slate-900 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed">
                        <GoogleIcon />
                        Sign in with Google
                        </button>
                    </div>
                </motion.form>
                <div className="text-center mt-6">
                <div className="text-sm text-slate-400">
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <button onClick={toggleAuthMode} className="ml-1 font-medium text-blue-500 hover:text-blue-400 hover:underline">
                    {isLogin ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>
                </div>
            </div>
            
            {/* --- Right Column: Image Banner --- */}
            <div className="hidden md:block">
                <img 
                    src={authBannerImage} 
                    alt="Promotional Banner" 
                    className="w-full h-full object-cover rounded-r-2xl"
                />
            </div>
            </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;