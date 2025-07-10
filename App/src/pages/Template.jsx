import React, { useState, useEffect } from "react";

// --- (All imports and other components like Navbar, Footer, etc. remain the same) ---
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  HeroBackground,
  AnimatedSection,
} from "../components/CommonComponents";
import {
  TemplateCard,
  TemplateDetailModal,
} from "../components/TemplateComponents";
import { ImageLightbox } from "../components/ImageLightbox";
import FilterSidebar from "../components/FilterSidebar";

// --- (CONSTANTS, ICONS, SPINNERS: NO CHANGE) ---
const SearchIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
    />
  </svg>
);
const LoadingSpinner = () => (
  <div className="col-span-full flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-18 w-18 border-t-3 border-b-3 border-cyan-700"></div>
  </div>
);

// --- MAIN GRAPHICS PAGE COMPONENT ---
export default function GraphicsPage() {
  // --- Simplified State ---
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [allTemplates, setAllTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // --- UPDATED: activeFilters state no longer includes price ---
  const [activeFilters, setActiveFilters] = useState({ category: "All" });
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  // --- Effect to fetch initial data ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await import("../data/graphicsTemplates.json");
        const templates = data.default || [];
        setAllTemplates(templates);
        setFilteredTemplates(templates);
      } catch (error) {
        console.error("Failed to load templates:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- UPDATED: Simplified filtering logic ---
  useEffect(() => {
    const applyFilters = (template) => {
      // --- UPDATED: Destructure only category from activeFilters ---
      const { category } = activeFilters;
      const cleanedSearchTerm = searchTerm.trim().toLowerCase();

      if (cleanedSearchTerm) {
        const nameMatch = template.name
          .toLowerCase()
          .includes(cleanedSearchTerm);
        const descMatch = template.description
          .toLowerCase()
          .includes(cleanedSearchTerm);
        if (!nameMatch && !descMatch) return false;
      }

      // --- REMOVED: Price filter logic block ---

      if (category !== "All") {
        const categoryTerm = category.toLowerCase();
        const categoryMatch =
          template.name.toLowerCase().includes(categoryTerm) ||
          template.description.toLowerCase().includes(categoryTerm);
        if (!categoryMatch) return false;
      }
      return true;
    };

    if (!isLoading) {
      const results = allTemplates.filter(applyFilters);
      setFilteredTemplates(results);
    }
  }, [searchTerm, allTemplates, activeFilters, isLoading]);

  // --- Handler to update filters ---
  const handleFilterChange = (filterType, value) => {
    setActiveFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  // --- Modal & Lightbox Handlers ---
  const openModal = (template) => {
    setSelectedTemplate(template);
  };
  const closeModal = () => {
    setSelectedTemplate(null);
  };
  const handlePreviewClick = (images) => {
    setLightboxImages(images);
    setIsLightboxOpen(true);
    closeModal();
  };

  return (
    // The entire JSX return block remains exactly the same
    <div className="w-full text-slate-100 bg-slate-950">
      <div className="relative z-10">
        <HeroBackground />
        <Navbar />
        <main className="px-4 py-24 sm:py-32">
          <div className="max-w-screen-xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight">
                  Create in Minutes
                </h1>
                <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-400">
                  Save time with smart, ready-made designs that do the hard work for you.


                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={100}>
              <div className="flex justify-center mb-12">
                <div className="relative w-full md:w-1/2">
                  <input
                    type="text"
                    placeholder="Search by name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/60 border border-slate-700 rounded-full text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                  />
                  <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                </div>
              </div>
            </AnimatedSection>

            <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
              <FilterSidebar
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
              />
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                  {isLoading ? (
                    <LoadingSpinner />
                  ) : filteredTemplates.length > 0 ? (
                    filteredTemplates.map((template, index) => (
                      <AnimatedSection key={template.id} delay={index * 50}>
                        <TemplateCard template={template} onClick={openModal} />
                      </AnimatedSection>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-16">
                      <h3 className="text-2xl font-semibold text-slate-300">
                        No Templates Found
                      </h3>
                      <p className="text-slate-500 mt-2">
                        Try adjusting your search or filter criteria.
                      </p>
                    </div>
                  )}
                </div>
              </div>
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
