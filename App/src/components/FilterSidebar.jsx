import React from 'react';

// --- ICONS ---
const TagIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
    </svg>
);
// Removed PriceIcon

// --- DATA (Filter Options) ---
const categories = [
    'All', 'Business', 'Fitness', 'Food', 'Fashion', 'Real Estate', 'Wedding', 'Minimal', 'Bold'
];
// Removed priceRanges

// --- REUSABLE FilterButton COMPONENT ---
function FilterButton({ label, value, isActive, onClick }) {
    const baseClasses = "w-full text-left pl-3 pr-4 py-2 text-sm rounded-md transition-all duration-200 border-l-2";
    const activeClasses = "bg-cyan-500/10 border-cyan-500 text-cyan-400 font-semibold";
    const inactiveClasses = "border-transparent text-slate-400 hover:text-white hover:bg-slate-800/60";

    return (
        <button
            onClick={() => onClick(value)}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
            {label}
        </button>
    );
}

// --- REUSABLE FilterGroup COMPONENT ---
function FilterGroup({ title, icon, options, activeFilter, onFilterChange, filterKey }) {
    return (
        <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
                {icon}
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    {title}
                </h3>
            </div>
            <div className="space-y-2">
                {options.map(option => (
                    <FilterButton
                        key={option}
                        label={option}
                        value={option}
                        isActive={activeFilter === option}
                        onClick={(value) => onFilterChange(filterKey, value)}
                    />
                ))}
            </div>
        </div>
    );
}

// --- THE MAIN SIDEBAR COMPONENT ---
export default function FilterSidebar({ activeFilters, onFilterChange }) {
    return (
        <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
            <div className="sticky top-24 p-5 bg-slate-900/70 backdrop-blur-sm rounded-xl border border-slate-800">
                
                {/* --- REMOVED: Price Filter Group --- */}

                <FilterGroup
                    title="Category"
                    icon={<TagIcon className="w-5 h-5 text-slate-500" />}
                    options={categories}
                    activeFilter={activeFilters.category}
                    onFilterChange={onFilterChange}
                    filterKey="category"
                />

            </div>
        </aside>
    );
}