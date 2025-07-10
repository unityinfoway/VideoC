import React, { useState, useEffect } from 'react';

// --- SHARED COMPONENT IMPORTS ---
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HeroBackground, AnimatedSection } from '../components/CommonComponents';
import { TemplateCard, TemplateDetailModal } from '../components/TemplateComponents';
import { ImageLightbox } from '../components/ImageLightbox'; 

// --- DATA IMPORT ---
import graphicsTemplatesData from '../data/graphicsTemplates.json';

// --- NEW: SEARCH ICON ---
// A simple SVG icon for the search bar. You can place this in another file if you prefer.
const SearchIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
    </svg>
);


// --- MAIN GRAPHICS PAGE COMPONENT ---
export default function GraphicsPage() {
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [lightboxImages, setLightboxImages] = useState([]);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // --- NEW: STATE FOR FILTERS AND SEARCH ---
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [filteredTemplates, setFilteredTemplates] = useState(graphicsTemplatesData);

    // --- NEW: DERIVE CATEGORIES FROM DATA ---
    // This automatically creates filter buttons from the categories in your JSON data.
    const allCategories = ['All', ...new Set(graphicsTemplatesData.map(item => item.category))];

   // --- NEW: EFFECT TO HANDLE FILTERING LOGIC ---
useEffect(() => {
    let currentTemplates = [...graphicsTemplatesData];

    // 1. Filter by the selected category
    if (selectedCategory !== 'All') {
        currentTemplates = currentTemplates.filter(
            template => template.category === selectedCategory
        );
    }

    // 2. Filter by the search term (checks title and description)
    if (searchTerm) {
        currentTemplates = currentTemplates.filter(template =>
            // 👇 FIX IS HERE: Add `|| ''` to safely handle missing properties
            (template.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
            (template.description || '').toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    setFilteredTemplates(currentTemplates);

}, [searchTerm, selectedCategory]); // This effect re-runs whenever searchTerm or selectedCategory changes


    // --- Modal Handlers ---
    const openModal = (template) => { setSelectedTemplate(template); };
    const closeModal = () => { setSelectedTemplate(null); };

    // --- Lightbox Handler ---
    const handlePreviewClick = (images) => {
        setLightboxImages(images);
        setIsLightboxOpen(true);
        closeModal(); 
    };

    return (
        <div className="w-full text-slate-100 bg-slate-950">
            <div className="relative z-10">
                <HeroBackground />
                <Navbar />
                <main className="px-4 py-24 sm:py-32">
                    <div className="max-w-screen-xl mx-auto">
                        <AnimatedSection>
                            <div className="text-center mb-16">
                                <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                                    Graphics & Fonts Gallery
                                </h1>
                                <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-400">
                                    Discover a universe of assets. High-quality graphics and fonts to bring your vision to life.
                                </p>
                            </div>
                        </AnimatedSection>
                        
                        {/* --- NEW: FILTER AND SEARCH CONTROLS --- */}
                        <AnimatedSection delay={100}>
                            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
                                {/* Search Bar */}
                                <div className="relative w-full md:w-1/3">
                                    <input
                                        type="text"
                                        placeholder="Search templates..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                                    />
                                    <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                </div>
                                {/* Filter Buttons */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {allCategories.map(category => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ease-in-out
                                                ${selectedCategory === category
                                                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/20'
                                                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                                                }`}
                                        >
                                            {category}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* --- UPDATED: TEMPLATE GRID --- */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredTemplates.length > 0 ? (
                                filteredTemplates.map((template, index) => (
                                    <AnimatedSection key={template.id} delay={index * 100}>
                                        <TemplateCard template={template} onClick={openModal} />
                                    </AnimatedSection>
                                ))
                            ) : (
                                // --- NEW: MESSAGE FOR NO RESULTS ---
                                <div className="col-span-full text-center py-16">
                                    <h3 className="text-2xl font-semibold text-slate-300">No Templates Found</h3>
                                    <p className="text-slate-500 mt-2">Try adjusting your search or filter criteria.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <TemplateDetailModal 
                    template={selectedTemplate} 
                    onClose={closeModal} 
                    onPreviewClick={handlePreviewClick}
                />

                {isLightboxOpen && (
                    <ImageLightbox 
                        images={lightboxImages} 
                        onClose={() => setIsLightboxOpen(false)} 
                    />
                )}
                
                <Footer />
            </div>
        </div>
    );
}