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

// The NavLink component is no longer needed and has been removed.

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('Guest');
    const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authtoken');
        const storedUsername = localStorage.getItem('username');
        if (token && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authtoken');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        window.location.href = '/login';
    };

    const linkClassName = "px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:text-white transition-colors";

    return (
        <header
            className={`sticky top-0 z-20 w-full transition-colors duration-300 ${
                isScrolled
                ? "bg-slate-950/80 backdrop-blur-sm border-b border-slate-800"
                : "bg-transparent"
            }`}
        >
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2">
                            <Logo />
                            <h1 className="text-xl font-bold text-white">Vyapaara</h1>
                        </Link>
                    </div>
                    
                    {/* --- UPDATED NAVIGATION LINKS --- */}
                    <nav className="hidden md:flex items-center gap-4">
                        <Link to="/" className={linkClassName}>Home</Link>
                        <Link to="/templates" className={linkClassName}>Templates</Link>
                        <Link to="/graphics" className={linkClassName}>Graphics</Link>
                        <Link to="/contact" className={linkClassName}>Contact</Link>
                    </nav>

                    <div className="relative flex items-center gap-4">
                        <button
                            onClick={() => setProfileMenuOpen(!isProfileMenuOpen)}
                            className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center"
                        >
                            <UserIcon className="w-6 h-6 text-slate-400" />
                        </button>
                        {isProfileMenuOpen && (
                            <div className="absolute top-14 right-0 w-48 bg-slate-800 rounded-md shadow-lg border border-slate-700 py-1 z-30">
                                {isLoggedIn ? (
                                    <>
                                        <div className="px-4 py-2 border-b border-slate-700">
                                            <p className="text-sm font-semibold text-white">
                                                {username}
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
                                        >
                                            <LogOutIcon className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </>
                                ) : (
                                    <Link to="/login" className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700">
                                        Login
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}