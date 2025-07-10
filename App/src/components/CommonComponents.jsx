import React, { useEffect, useRef, useState } from 'react';

// --- Reusable Background Component ---
export const HeroBackground = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            document.documentElement.style.setProperty('--mouse-x', `${clientX}px`);
            document.documentElement.style.setProperty('--mouse-y', `${clientY}px`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-slate-950"></div>
            <div className="absolute top-0 -left-1/4 w-96 h-96 md:w-[40rem] md:h-[40rem] bg-indigo-600/20 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
            <div className="absolute bottom-0 -right-1/4 w-96 h-96 md:w-[40rem] md:h-[40rem] bg-purple-600/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
            <div className="aura-background"></div>
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
    );
};

// --- Reusable Scroll Animation Wrapper ---
export const AnimatedSection = ({ children, delay = 0 }) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => { 
            if (entry.isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => { 
            if (currentRef) {
                observer.unobserve(currentRef); 
            }
        };
    }, []);

    return (
        <div 
            ref={ref} 
            style={{transitionDelay: `${delay}ms`}} 
            className={`transition-all duration-1000 ease-in-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            {children}
        </div>
    );
};