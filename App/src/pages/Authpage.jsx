import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MyLogo from '../assets/logo.png';

// --- Reusable Icon Components ---
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C41.38,36.168,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

// --- Animated Background Component ---
const AnimatedBackground = () => {
    const numLines = 25;
    const lines = Array.from({ length: numLines });

    const lineVariants = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => ({
            pathLength: 1,
            opacity: 0.7,
            transition: {
                pathLength: { delay: i * 0.1, type: "spring", duration: 2, bounce: 0 },
                opacity: { delay: i * 0.1, duration: 0.1 },
            }
        })
    };
    
    return (
        <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
             <svg width="100%" height="100%" className="absolute top-0 left-0" preserveAspectRatio="none">
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                        <stop offset="100%" stopColor="rgba(139, 92, 246, 0.2)" />
                    </linearGradient>
                </defs>
                {lines.map((_, i) => (
                    <React.Fragment key={i}>
                        {/* Horizontal Line */}
                        <motion.line
                            x1="-5%"
                            y1={`${(i / (numLines - 1)) * 100}%`}
                            x2="105%"
                            y2={`${(i / (numLines - 1)) * 100}%`}
                            stroke="url(#line-gradient)"
                            strokeWidth="0.3"
                            variants={lineVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i}
                        />
                        {/* Vertical Line */}
                        <motion.line
                            x1={`${(i / (numLines - 1)) * 100}%`}
                            y1="-5%"
                            x2={`${(i / (numLines - 1)) * 100}%`}
                            y2="105%"
                            stroke="url(#line-gradient)"
                            strokeWidth="0.3"
                            variants={lineVariants}
                            initial="hidden"
                            animate="visible"
                            custom={i + 5} // offset delay
                        />
                    </React.Fragment>
                ))}
            </svg>
            <motion.div
                className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-blue-600/40 to-purple-600/40 rounded-full filter blur-3xl opacity-40"
                animate={{
                    x: [0, 40, -20, 0],
                    y: [0, -30, 20, 0],
                    scale: [1, 1.1, 1, 1.05, 1],
                    rotate: [0, 10, -10, 0]
                }}
                transition={{
                    duration: 30,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut"
                }}
            />
            <motion.div
                className="absolute -bottom-1/4 -right-1/4 w-3/4 h-3/4 bg-gradient-to-tl from-purple-600/30 to-blue-600/30 rounded-full filter blur-3xl opacity-40"
                 animate={{
                    x: [0, -30, 10, 0],
                    y: [0, 20, -40, 0],
                    scale: [1, 1.05, 1, 0.95, 1],
                    rotate: [0, -15, 15, 0]
                }}
                transition={{
                    duration: 35,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: 5
                }}
            />
        </div>
    );
};

const formVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3, ease: "easeIn" } }
};

const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
};

// --- Main App Component ---
export default function App() {
    const [isLogin, setIsLogin] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };
    
    const brandingItemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    };
    const Logo = MyLogo; // Replace with your actual logo path

    return (
        <div className="relative min-h-screen bg-slate-900 text-white font-sans overflow-hidden">
            <AnimatedBackground />
            <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="w-full max-w-6xl mx-auto grid lg:grid-cols-2 rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                        background: 'rgba(15, 23, 42, 0.6)',
                        backdropFilter: 'blur(15px)',
                        border: '1px solid rgba(51, 65, 85, 0.5)'
                    }}
                >
                    
                    {/* Left Section: Form */}
                    <div className="p-8 md:p-12 order-2 lg:order-1">                      
                        <AnimatePresence mode="wait">
                            {isLogin ? (
                                <motion.div key="login" variants={formVariants} initial="initial" animate="animate" exit="exit">
                                    <motion.div variants={itemVariants} className="mb-8 text-center lg:text-left">
                                        <img src={Logo} alt="Logo" className="w-16 h-16 mb-4 mx-auto lg:mx-0"/>
                                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back.</h1>
                                        <p className="text-slate-400">Sign in to access your dashboard.</p>
                                    </motion.div>
                                    <form className="space-y-5">
                                        <motion.div variants={itemVariants} className="relative">
                                            <label htmlFor="login-email" className="text-sm font-medium text-slate-300">Email Address</label>
                                            <input id="login-email" type="email" placeholder="you@example.com" className="mt-1 w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="relative">
                                            <label htmlFor="login-password" className="text-sm font-medium text-slate-300">Password</label>
                                            <input id="login-password" type="password" placeholder="••••••••••••" className="mt-1 w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="flex justify-between items-center text-sm">
                                            <label className="flex items-center text-slate-400">
                                                <input type="checkbox" className="w-4 h-4 rounded bg-slate-700 border-slate-600 text-blue-500 focus:ring-blue-500" />
                                                <span className="ml-2">Remember me</span>
                                            </label>
                                            <a href="#" className="font-medium text-blue-400 hover:underline">Forgot Password?</a>
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <motion.button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                                Sign In
                                            </motion.button>
                                        </motion.div>
                                    </form>
                                    <motion.div variants={itemVariants} className="mt-6 text-center">
                                        <p className="text-sm text-slate-400">
                                            Don't have an account? <button onClick={() => setIsLogin(false)} className="font-medium text-blue-400 hover:underline bg-transparent border-none p-0 cursor-pointer">Sign Up</button>
                                        </p>
                                    </motion.div>
                                </motion.div>
                            ) : (
                                <motion.div key="signup" variants={formVariants} initial="initial" animate="animate" exit="exit">
                                    <motion.div variants={itemVariants} className="mb-8 text-center lg:text-left">
                                        <img src={Logo} alt="Logo" className="w-16 h-16 mb-4 mx-auto lg:mx-0"/>
                                        <h1 className="text-3xl font-bold text-white mb-2">Sign Up For Free.</h1>
                                        <p className="text-slate-400">Let's sign up quickly to get started</p>
                                    </motion.div>
                                    <form className="space-y-5">
                                        <motion.div variants={itemVariants} className="relative">
                                            <label htmlFor="username" className="text-sm font-medium text-slate-300">Username</label>
                                            <input id="username" type="text" placeholder="e.g., A_XE_A_13b" className="mt-1 w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="relative">
                                            <label htmlFor="email" className="text-sm font-medium text-slate-300">Email Address</label>
                                            <input id="email" type="email" placeholder="you@example.com" className="mt-1 w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                        </motion.div>
                                        <motion.div variants={itemVariants} className="relative">
                                            <label htmlFor="password" className="text-sm font-medium text-slate-300">Password</label>
                                            <input id="password" type="password" placeholder="••••••••••••" className="mt-1 w-full bg-slate-800/50 border border-slate-700 rounded-lg py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
                                            <div className="absolute right-4 top-10 text-xs text-green-400">Strong</div>
                                        </motion.div>
                                        <motion.div variants={itemVariants}>
                                            <motion.button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all duration-300" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                                                Sign Up
                                            </motion.button>
                                        </motion.div>
                                    </form>
                                    <motion.div variants={itemVariants} className="mt-6 text-center">
                                        <p className="text-sm text-slate-400">
                                            Already have an account? <button onClick={() => setIsLogin(true)} className="font-medium text-blue-400 hover:underline bg-transparent border-none p-0 cursor-pointer">Sign In</button>
                                        </p>
                                    </motion.div>
                                    <motion.div variants={itemVariants} className="relative flex py-5 items-center">
                                        <div className="flex-grow border-t border-slate-700"></div>
                                        <span className="flex-shrink mx-4 text-slate-500 text-sm">OR</span>
                                        <div className="flex-grow border-t border-slate-700"></div>
                                    </motion.div>
                                    <motion.div variants={itemVariants}>
                                        <button className="w-full flex items-center justify-center gap-3 bg-slate-800/50 border border-slate-700 rounded-lg py-3 hover:bg-slate-700/70 transition-colors">
                                            <GoogleIcon />
                                            Sign Up With Google
                                        </button>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right Section: Branding */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="p-8 md:p-12 flex flex-col justify-center items-center text-center lg:text-left order-1 lg:order-2"
                        style={{ background: 'rgba(15, 23, 42, 0.3)' }}
                    >
                        <div className="w-full max-w-sm">
                            <motion.h2 variants={brandingItemVariants} className="text-5xl font-extrabold text-white mb-4">IN8</motion.h2>
                            <motion.h3 variants={brandingItemVariants} className="text-2xl font-bold text-slate-200 mb-4">Seamless. Secure. Smarter Video Meetings.</motion.h3>
                            <motion.p variants={brandingItemVariants} className="text-slate-400 leading-relaxed">
                                IN8 is your all-in-one solution for effortless video conferencing—designed for teams, educators, and creators. Connect with clarity, collaborate in real time, and experience the future of virtual meetings with cutting-edge performance and enterprise-level security.
                            </motion.p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}
