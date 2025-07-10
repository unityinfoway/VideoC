import React, { useState, useEffect } from 'react';

// --- ICONS for the Lightbox Controls ---
const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const ChevronLeftIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m15 18-6-6 6-6"/></svg>
);

const ChevronRightIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m9 18 6-6-6-6"/></svg>
);


export const ImageLightbox = ({ images, startIndex = 0, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(startIndex);

    // --- Navigation Functions ---
    const goToPrevious = () => {
        const isFirstImage = currentIndex === 0;
        const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastImage = currentIndex === images.length - 1;
        const newIndex = isLastImage ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    // --- Keyboard Navigation ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowRight') {
                goToNext();
            } else if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    return (
        <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in"
            onClick={onClose}
        >
            {/* Close Button (Top Right) */}
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition" onClick={onClose}>
                <XIcon className="w-8 h-8" />
            </button>

            {/* Left Navigation */}
            <button 
                className="absolute left-6 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition"
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            >
                <ChevronLeftIcon className="w-8 h-8" />
            </button>
            
            {/* Main Image Container - SIZE ADJUSTED HERE */}
            <div 
                className="relative max-w-[80vw] max-h-[80vh] flex items-center justify-center" 
                onClick={(e) => e.stopPropagation()}
            >
                <img 
                    src={images[currentIndex]} 
                    alt={`Preview ${currentIndex + 1}`} 
                    className="max-w-full max-h-full object-contain rounded-lg"
                />
                 <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>

            {/* Right Navigation */}
             <button 
                className="absolute right-6 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition"
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
            >
                <ChevronRightIcon className="w-8 h-8" />
            </button>
        </div>
    );
};