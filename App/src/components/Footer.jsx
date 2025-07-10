import React from 'react';

// The Logo component is needed for the footer
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


export default function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Logo />
                        <p className="text-sm text-slate-400">
                            &copy; {new Date().getFullYear()} Vyapaara. All rights
                            reserved.
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-sm text-slate-400 hover:text-white"
                        >
                            Twitter
                        </a>
                        <a
                            href="#"
                            className="text-sm text-slate-400 hover:text-white"
                        >
                            GitHub
                        </a>
                        <a
                            href="#"
                            className="text-sm text-slate-400 hover:text-white"
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}