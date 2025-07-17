import React, { useLayoutEffect, useRef } from 'react';

// Note: GSAP imports have been removed to fix the "Could not resolve" build error.
// This component now assumes that GSAP, ScrollTrigger, and SplitText are available
// globally on the `window` object (e.g., loaded via a <script> tag in your HTML).

// --- Register GSAP Plugins from the global scope ---
// This needs to run for the animations to work. We check if GSAP exists first.
if (window.gsap) {
  window.gsap.registerPlugin(window.gsap.ScrollTrigger, window.gsap.SplitText);
}


// --- SVG Icon Component ---
// A simple, stylish SVG for the animation.
const CreativeAssetIcon = ({ svgRef, ...props }) => (
  <svg
    ref={svgRef}
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="iconGradient" x1="0" y1="0" x2="100" y2="100">
        <stop offset="0%" stopColor="#818cf8" />
        <stop offset="100%" stopColor="#67e8f9" />
      </linearGradient>
    </defs>
    {/* The paths will be animated by GSAP */}
    <path className="svg-draw" d="M30 50 L30 90 L70 90 L70 50 L30 50 Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path className="svg-draw" d="M40 40 L40 80 L80 80 L80 40 L40 40 Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path className="svg-draw" d="M50 30 L50 70 L90 70 L90 30 L50 30 Z" stroke="url(#iconGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path className="svg-draw" d="M60,20 L95,55" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
    <path className="svg-draw" d="M25,60 L60,95" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);


// --- Main Feature Showcase Component ---
const FeatureShowcase = () => {
  const sectionRef = useRef(null);
  const h2Ref = useRef(null);
  const pRef = useRef(null);
  const buttonRef = useRef(null);
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    // Assign GSAP and its plugins from the global window object
    const gsap = window.gsap;
    const SplitText = window.SplitText || (gsap && gsap.SplitText);

    // Exit if GSAP or the SplitText plugin isn't available
    if (!gsap || !SplitText) {
      console.error("GSAP or the SplitText plugin is not available. Please ensure they are loaded correctly.");
      return;
    }

    // Use GSAP Context for proper cleanup in React
    const ctx = gsap.context(() => {
      // --- Split the headline text into characters ---
      const split = new SplitText(h2Ref.current, {
        type: "chars",
        charsClass: "char",
      });
      const chars = split.chars; // Array of character elements

      // --- Set initial states (before animation) ---
      gsap.set(chars, { y: 30, opacity: 0 });
      gsap.set([pRef.current, buttonRef.current], { y: 20, opacity: 0 });
      gsap.set(svgRef.current, { scale: 0.8, opacity: 0 });
      
      // Select all paths within the SVG to animate
      const svgPaths = svgRef.current.querySelectorAll('.svg-draw');
      gsap.set(svgPaths, { strokeDasharray: (i, el) => el.getTotalLength(), strokeDashoffset: (i, el) => el.getTotalLength() });


      // --- Create the master animation timeline ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // Start animation when the top of the section is 60% from the viewport top
          end: "bottom 80%",
          toggleActions: "play none none none", // Play once on enter
          // markers: true, // Uncomment for debugging
        },
      });

      // --- Add animations to the timeline ---
      
      // 1. Animate the SVG icon first
      tl.to(svgRef.current, {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
      })
      // 2. Animate the SVG paths drawing themselves
      .to(svgPaths, {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: 'power2.inOut',
        stagger: 0.2,
      }, "-=0.5") // Overlap with previous animation

      // 3. Animate the headline characters
      .to(chars, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.03,
        ease: 'power3.out',
      }, "-=1.2") // Overlap for a more dynamic feel

      // 4. Animate the paragraph
      .to(pRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, "-=0.5")

      // 5. Animate the button
      .to(buttonRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
      }, "-=0.8");

    }, sectionRef); // Scope the context to the main section element

    // --- Cleanup function ---
    // This will revert all GSAP animations and kill the ScrollTrigger instance when the component unmounts
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-slate-900 text-white font-sans">
      <section
        ref={sectionRef}
        className="min-h-screen w-full flex flex-col justify-center items-center p-4 overflow-hidden"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Animated SVG Icon */}
          <div className="flex justify-center">
            <CreativeAssetIcon svgRef={svgRef} />
          </div>

          {/* Animated Headline */}
          <h2
            ref={h2Ref}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-slate-100"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }} // Prevents character overflow during animation
          >
            Build Beyond Limits with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Premium Assets</span>.
          </h2>

          {/* Animated Paragraph */}
          <p ref={pRef} className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
            Access a universe of curated design elements, from icons to illustrations, and bring your most ambitious creative visions to life.
          </p>

          {/* Animated Button */}
          <div ref={buttonRef}>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/30">
              Explore the Collection
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeatureShowcase;
