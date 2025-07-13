import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- ICONS ---
const Logo = (props) => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor: '#6366F1', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor: '#8B5CF6', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill="url(#logoGradient)" opacity="0.8"/>
        <path d="M2 17l10 5 10-5" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" stroke="url(#logoGradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
);

const LogOutIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
);

const MenuIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const ChevronDownIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
);

// The component is now exported directly, without a MemoryRouter wrapper.
export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('Guest');
    const [isProUser, setIsProUser] = useState(false);
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        
        if (token) {
            setIsLoggedIn(true);
            setUsername(localStorage.getItem('username') || 'User');
            setIsProUser(localStorage.getItem('isPlanActive') === 'true');

            const fetchUserData = async () => {
                try {
                    const response = await fetch('http://localhost:5000/api/auth/me', {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    if (!response.ok) {
                        handleLogout();
                        return;
                    }
                    const data = await response.json();
                    setUsername(data.user.fullName);
                    setIsProUser(data.user.isPlanActive);
                    localStorage.setItem('username', data.user.fullName);
                    localStorage.setItem('isPlanActive', data.user.isPlanActive);
                } catch (error) {
                    console.error("Failed to fetch user data:", error);
                    handleLogout();
                }
            };
            fetchUserData();
        }

        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = '/login';
    };

    const navLinks = [
        { name: 'Features', href: '#' },
        { name: 'Pricing', href: '#' },
        { name: 'F&Q', href: '#' },
        { name: 'Contact', href: '/contact' },
        { name: 'Account', href: '#' },
    ];

    return (
        <header
            className={`sticky top-0 z-30 w-full transition-all duration-300 ${
                isScrolled || isMobileMenuOpen
                ? "bg-slate-950/90 backdrop-blur-sm border-b border-slate-800"
                : "bg-transparent"
            }`}
        >
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-2">
                            <Logo />
                            <h1 className="text-xl font-bold text-white hidden sm:block">Vyapaara</h1>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.href} className="text-sm font-medium text-slate-300 hover:text-white transition-colors">
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4">
                        {isLoggedIn && !isProUser && (
                            <div className="hidden md:block">
                                <Link to="/#pricing" className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors">
                                    Go Unlimited
                                </Link>
                            </div>
                        )}
                        
                        {isLoggedIn ? (
                             <div className="relative">
                                <button
                                    onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-700">
                                        <UserIcon className="w-6 h-6 text-slate-400" />
                                    </div>
                                    <ChevronDownIcon className="text-slate-400 hidden md:block" />
                                </button>
                                {isProfileMenuOpen && (
                                    <div className="absolute top-14 right-0 w-56 bg-slate-800 rounded-md shadow-lg border border-slate-700 py-1 z-30 animate-fade-in-slide-up">
                                        <div className="px-4 py-3 border-b border-slate-700">
                                            <p className="text-sm text-slate-400">Signed in as</p>
                                            <p className="text-sm font-semibold text-white truncate">
                                                {username}
                                            </p>
                                        </div>
                                        <Link to="/dashboard" className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">Dashboard</Link>
                                        <Link to="/settings" className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">Settings</Link>
                                        <div className="border-t border-slate-700 my-1"></div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
                                        >
                                            <LogOutIcon className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" className="hidden md:block px-5 py-2.5 text-sm font-semibold text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                                Sign In
                            </Link>
                        )}
                        
                        <div className="lg:hidden">
                            <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
                                <MenuIcon className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isMobileMenuOpen && (
                 <div className="lg:hidden animate-fade-in-slide-up">
                    <div className="px-4 pt-2 pb-3 space-y-1 sm:px-6">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.href} className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">
                                {link.name}
                            </Link>
                        ))}
                         <div className="border-t border-slate-800 pt-4 mt-4 space-y-2">
                            {isLoggedIn && !isProUser && (
                                <Link to="/pricing" className="block text-center w-full px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors">
                                    Go Unlimited
                                </Link>
                            )}
                            {!isLoggedIn && (
                                <Link to="/login" className="block text-center w-full px-5 py-2.5 text-sm font-semibold text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors">
                                    Sign In
                                </Link>
                            )}
                         </div>
                    </div>
                </div>
            )}
        </header>
    );
}
