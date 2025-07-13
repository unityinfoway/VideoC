import React, { useState, useEffect, useRef } from 'react';

// You'll need to install these dependencies if running locally:
// npm install framer-motion lucide-react

// NOTE: Swiper.js is now loaded via CDN. The necessary <link> and <script> tags are mentioned below.

// Import Framer Motion for animations
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

import { ShieldCheck, Zap, Gem, LifeBuoy, Star, CheckCircle, ArrowRight, Twitter, Linkedin, Facebook, Instagram, ChevronDown, Tag, Clock } from 'lucide-react';

// --- Helper for Animations ---
const AnimatedSection = ({ children, delay = 0 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 50 },
      }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};


// --- Main App Component ---
const App = () => {
  return (
    <div className="bg-slate-900 text-gray-800 font-sans antialiased">
      {/* IMPORTANT: For Swiper.js sliders and styles to work, add these lines 
        to your project's main HTML file in the <head> section:
        
        <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
        <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
      */}
      <Header />
      <main>
        <HeroSection />
        <TrustedBySection />
        <FeaturesSection />
        <PricingSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

// --- Header Component ---
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center space-x-2">
              <Gem className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">DigitalHive</span>
            </a>
          </div>
          <nav className="hidden md:flex md:items-center md:space-x-8">
            <a href="#features" className="text-slate-300 hover:text-white transition-colors duration-300">Features</a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors duration-300">Pricing</a>
            <a href="#testimonials" className="text-slate-300 hover:text-white transition-colors duration-300">Testimonials</a>
            <a href="#faq" className="text-slate-300 hover:text-white transition-colors duration-300">FAQ</a>
          </nav>
          <div className="hidden md:block">
            <a href="#pricing" className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-cyan-500/20">Get Started</a>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-300 hover:text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-4 space-y-2">
            <a href="#features" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Features</a>
            <a href="#pricing" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Pricing</a>
            <a href="#testimonials" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">Testimonials</a>
            <a href="#faq" className="block px-3 py-2 rounded-md text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800">FAQ</a>
            <a href="#pricing" className="block w-full text-left mt-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-3 rounded-lg transition-all duration-300 shadow-lg">Get Started</a>
          </div>
        )}
      </div>
    </header>
  );
};

// --- SVG Icons for Products ---
const ProductLogos = {
    Figma: (props) => (
        <svg {...props} viewBox="0 0 16 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 24a8 8 0 0 1-8-8V8a8 8 0 0 1 8-8h8v8a8 8 0 0 1-8 8Z" fill="#F24E1E"></path><path d="M8 16a8 8 0 0 1-8-8V0h8a8 8 0 0 1 8 8v8a8 8 0 0 1-8 8Z" fill="#FF7262"></path><path d="M8 8a8 8 0 0 1-8-8h8a8 8 0 0 1 8 8 8 8 0 0 1-8 8Z" fill="#A259FF"></path><path d="M8 16a8 8 0 0 0 8-8 8 8 0 0 0-8-8v16Z" fill="#1ABCFE"></path><circle cx="8" cy="16" r="8" fill="#0ACF83"></circle></svg>
    ),
    AfterEffects: (props) => (
        <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14.88 6.255H9.12l-1.44 3.96h8.64l-1.44-3.96Zm-9.3 11.49 5.82-15.48h7.2l5.82 15.48h-4.5l-1.02-2.85H9.48l-1.02 2.85H4.08Z" fill="#9999FF"></path></svg>
    ),
    Gemini: (props) => (
        <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 10.25a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" fill="#8E77D8"></path><path d="M18.5 15.75a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5Z" fill="#8E77D8"></path><path d="M12 2.75A9.25 9.25 0 0 0 2.75 12 9.25 9.25 0 0 0 12 21.25c4.1 0 7.62-2.68 8.8-6.33a.75.75 0 0 0-1.4-.42A7.75 7.75 0 0 1 12 19.75a7.75 7.75 0 0 1-7.75-7.75A7.75 7.75 0 0 1 12 4.25c1.88 0 3.6.67 4.95 1.78a.75.75 0 1 0 .9-1.2A9.22 9.22 0 0 0 12 2.75Z" fill="#8E77D8"></path></svg>
    ),
    Netflix: (props) => (
        <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.49 24V9.31L3 24H0V0h3.9v14.1L9.06 0h4.29l-5.7 8.46L13.5 0h4.2v24h-4.02V9.81L8.49 24Z" fill="#E50914"></path></svg>
    ),
    AmazonPrime: (props) => (
        <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 15.6V3.88h3.9v11.72H0Zm12.06-7.74c0-4.32-3.3-6.18-8.16-6.18H0v8.52h3.9V5.5h-.42c2.4 0 3.72.9 3.72 2.94v1.5H3.9v4.2h4.2v-4.2h3.96Z" fill="#00A8E1"></path><path d="M24 15.6V0h-4.56l-4.2 10.02V0H11.4v15.6h3.66l4.62-10.92V15.6H24Z" fill="#00A8E1"></path></svg>
    ),
    Canva: (props) => (
        <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 0a12 12 0 1 0 12 12A12 12 0 0 0 12 0Zm5.4 16.8a.9.9 0 0 1-.9.9H7.5a.9.9 0 0 1-.9-.9V7.2a.9.9 0 0 1 .9-.9h9a.9.9 0 0 1 .9.9Z" fill="#00C4CC"></path><path d="M12 8.4a3.6 3.6 0 1 0 3.6 3.6 3.6 3.6 0 0 0-3.6-3.6Z" fill="#fff"></path></svg>
    ),
};


// --- Professional Product Showcase Slider ---
const ProductCard = ({ product }) => {
    const LogoComponent = product.logo;
    return (
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 p-6 flex flex-col items-center text-center transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 h-full overflow-hidden">
            <div className="w-full h-1.5" style={{ background: product.gradient }}></div>
            <div className="h-12 w-12 mt-6 mb-4 flex items-center justify-center">
                <LogoComponent className="h-full w-auto" />
            </div>
            <h3 className="text-lg font-bold text-white">{product.name}</h3>
            <p className="text-sm text-slate-400 mt-2 flex-grow">{product.description}</p>
            <a href="#" className="text-sm font-semibold text-cyan-400 mt-4 group">
                Explore <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
            </a>
        </div>
    );
};

const ProductShowcase = () => {
    const swiperRef = useRef(null);
    const products = [
        { name: "Figma Templates", logo: ProductLogos.Figma, description: "Pixel-perfect UI kits and design systems to supercharge your workflow.", gradient: "linear-gradient(to right, #F24E1E, #A259FF)" },
        { name: "After Effects Templates", logo: ProductLogos.AfterEffects, description: "Stunning motion graphics and video templates for any project.", gradient: "linear-gradient(to right, #9999FF, #D499FF)" },
        { name: "Gemini Pro", logo: ProductLogos.Gemini, description: "Unlock advanced AI capabilities with a verified premium account.", gradient: "linear-gradient(to right, #8E77D8, #4285F4)" },
        { name: "Netflix Premium", logo: ProductLogos.Netflix, description: "Binge-watch your favorite shows and movies in stunning 4K UHD.", gradient: "linear-gradient(to right, #E50914, #B20710)" },
        { name: "Amazon Prime", logo: ProductLogos.AmazonPrime, description: "Get fast shipping, exclusive deals, and endless entertainment.", gradient: "linear-gradient(to right, #00A8E1, #007399)" },
        { name: "Canva Pro", logo: ProductLogos.Canva, description: "Design anything with premium tools, templates, and assets.", gradient: "linear-gradient(to right, #00C4CC, #00C4CC)" },
    ];

    useEffect(() => {
        if (swiperRef.current && window.Swiper) {
            const swiper = new window.Swiper(swiperRef.current, {
                modules: [window.Swiper.Autoplay, window.Swiper.Pagination],
                spaceBetween: 24,
                slidesPerView: 1.5,
                centeredSlides: true,
                loop: true,
                autoplay: { delay: 3000, disableOnInteraction: false },
                 pagination: { el: '.swiper-pagination-products', clickable: true, renderBullet: (index, className) => `<span class="${className}" style="background-color: #fff"></span>` },
                breakpoints: { 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } },
            });
            return () => swiper.destroy();
        }
    }, []);

    return (
        <div className="mt-16">
            <div ref={swiperRef} className="swiper w-full">
                <div className="swiper-wrapper py-4">
                    {products.map((product, index) => (
                        <div key={index} className="swiper-slide h-auto p-2">
                           <ProductCard product={product} />
                        </div>
                    ))}
                </div>
                <div className="swiper-pagination-products mt-8 relative"></div>
            </div>
        </div>
    );
};

// --- Background Graphics ---
const FloatingOrb = ({ className, initial, animate, transition }) => (
    <motion.div
        className={className}
        initial={initial}
        animate={animate}
        transition={transition}
    />
);

const HeroBackground = () => (
    <div className="absolute inset-0 overflow-hidden -z-10 bg-slate-900">
        <div className="absolute inset-0 bg-grid-slate-800/50 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <FloatingOrb
            className="absolute -top-20 -left-20 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
        />
        <FloatingOrb
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [1, 1.1, 1] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "mirror", delay: 3 }}
        />
         <FloatingOrb
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-indigo-500/10 rounded-full filter blur-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: [1, 1.1, 1] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "mirror", delay: 1 }}
        />
    </div>
);

// --- Countdown Timer ---
const CountdownTimer = () => {
    const calculateTimeLeft = () => {
        const difference = +new Date("2025-07-14T00:00:00") - +new Date();
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const formatTime = (time) => String(time).padStart(2, '0');

    return (
        <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 rounded-lg px-4 py-2 text-white font-mono text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-cyan-400" />
            <span>{formatTime(timeLeft.hours)}</span>:
            <span>{formatTime(timeLeft.minutes)}</span>:
            <span>{formatTime(timeLeft.seconds)}</span>
        </div>
    );
};

// --- Hero Section Component ---
const HeroSection = () => {
  return (
    <section className="py-20 md:py-24 relative overflow-hidden">
        <HeroBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="text-center md:text-left">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4 tracking-tighter">
                        Premium Digital Assets & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">Subscriptions</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto md:mx-0 mb-8">
                        Your one-stop marketplace for high-quality templates and verified premium accounts.
                    </motion.p>
                </div>
                {/* Deal Section */}
                <motion.div 
                    className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                >
                    <div className="flex justify-start mb-4">
                        <span className="bg-lime-400 text-lime-900 font-bold text-sm px-3 py-1 rounded-full flex items-center gap-1.5">
                            <Tag className="h-4 w-4" /> AI SALE
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-3">Get 73% off: Launch online with AI for less</h2>
                    <ul className="space-y-2 text-slate-300 mb-6">
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500"/> Built-in AI tools and bonus credits</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-green-500"/> 24/7 customer support</li>
                    </ul>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <a href="#pricing" className="w-full sm:w-auto flex-1 bg-slate-200 hover:bg-white text-slate-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-center">
                            Grab deal
                        </a>
                        <CountdownTimer />
                    </div>
                </motion.div>
            </div>
        </div>
    </section>
  );
};

// --- Trusted By Section ---
const CompanyLogos = {
    Google: (props) => <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Google</title><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.84-4.32 1.84-3.6 0-6.5-2.95-6.5-6.5s2.9-6.5 6.5-6.5c1.98 0 3.36.82 4.1 1.56l2.6-2.6C16.96 3.2 14.76 2 12.48 2 7.4 2 3.43 5.98 3.43 11s3.97 9 9.05 9c2.43 0 4.5-1 6.05-2.54 1.6-1.54 2.35-3.8 2.35-6.35 0-.7-.07-1.35-.2-2.02h-8.18Z" fill="currentColor"/></svg>,
    Microsoft: (props) => <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Microsoft</title><path d="M11.4 24H0V12.6h11.4V24ZM24 24H12.6V12.6H24V24ZM11.4 11.4H0V0h11.4v11.4ZM24 11.4H12.6V0H24v11.4Z" fill="currentColor"/></svg>,
    Spotify: (props) => <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Spotify</title><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2m4.992 13.94A.498.498 0 0 1 16.5 16a.5.5 0 0 1-.492-.552c-.24-1.44-.96-2.64-2.04-3.48-1.08-.9-2.4-1.2-3.96-1.2-.36 0-.72.06-1.02.12a.516.516 0 0 1-.552-.492.5.5 0 0 1 .492-.552c1.92-.36 3.96-.06 5.82 1.02 1.56.9 2.46 2.46 2.76 4.38Z" fill="currentColor"/></svg>,
    Shopify: (props) => <svg {...props} role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Shopify</title><path d="M18.31.02c-3.6 0-5.15 2.14-5.92 4.1H5.47L4.2 1.1A.4.4 0 0 0 3.82.9l-3.8.02h-.02c-.22 0-.4.18-.4.4v.2L4.76 23.1a.4.4 0 0 0 .4.3h3.8c.22 0 .4-.18.4-.4l-1.05-3.02h3.19l-1.05 3.02c0 .22.18.4.4.4h3.8c.22 0 .4-.18.4-.4l4.16-21.58c.02-.2-.16-.38-.38-.4l-3.8-.02a.4.4 0 0 0-.4.28l-1.27 3.02h-2.1c.4-1.2 1.29-4.32 5.17-4.32 1.43 0 2.93.58 3.52 1.15l1.01-2.2c-.1-.1-2.4-1.6-4.56-1.6Z" fill="currentColor"/></svg>,
};

const CompanyLogo = ({ SvgComponent, name }) => (
    <div className="flex justify-center items-center h-12">
        <SvgComponent className="h-8 w-auto text-slate-500 hover:text-white transition-colors duration-300" alt={name} />
    </div>
);

const TrustedBySection = () => {
    const companies = [
        { name: "Google", component: CompanyLogos.Google },
        { name: "Microsoft", component: CompanyLogos.Microsoft },
        { name: "Spotify", component: CompanyLogos.Spotify },
        { name: "Shopify", component: CompanyLogos.Shopify },
    ];

    return (
        <section className="py-16 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <h3 className="text-center text-slate-400 font-semibold tracking-wider uppercase">
                        Powering the next generation of creators
                    </h3>
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
                        {companies.map(company => <CompanyLogo key={company.name} SvgComponent={company.component} name={company.name} />)}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// --- Features Section Component ---
const FeatureTimelineItem = ({ icon, title, description, index }) => {
    const isEven = index % 2 === 0;
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

    return (
        <div ref={ref} className="flex justify-center items-start gap-8">
            {/* Text Content */}
            <motion.div 
                className={`w-5/12 ${isEven ? 'order-1 text-right' : 'order-3 text-left'}`}
                initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
            >
                <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-400 leading-relaxed">{description}</p>
            </motion.div>

            {/* Timeline Connector */}
            <div className="w-2/12 order-2 flex flex-col items-center">
                <motion.div 
                    className="flex-shrink-0 flex items-center justify-center h-20 w-20 rounded-full bg-slate-800 border-2 border-slate-700"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/20">
                        {icon}
                    </div>
                </motion.div>
                <div className="w-1 h-48 bg-slate-700/50 mt-4"></div>
            </div>

            {/* Spacer */}
            <div className={`w-5/12 ${isEven ? 'order-3' : 'order-1'}`}></div>
        </div>
    );
};


const FeaturesSection = () => {
  const features = [
    { icon: <Zap className="h-8 w-8" />, title: "Instant Delivery", description: "No more waiting. As soon as your payment is confirmed, your digital goods are delivered to your account instantly. Whether it's a design template or a premium subscription, you get access right away." },
    { icon: <ShieldCheck className="h-8 w-8" />, title: "Verified Seller Guarantee", description: "Shop with absolute confidence. Every product and subscription on DigitalHive is sourced from verified, reputable sellers. We guarantee the authenticity and functionality of every item for your peace of mind." },
    { icon: <Gem className="h-8 w-8" />, title: "Unbeatable Affordable Pricing", description: "Access premium, high-quality digital assets without the premium price tag. We believe in making top-tier tools and content accessible to everyone, helping you create more while spending less." },
    { icon: <LifeBuoy className="h-8 w-8" />, title: "24/7 Dedicated Support", description: "Our expert support team is here for you around the clock. If you have any questions or run into any issues, we're just a message away, ready to provide fast and friendly assistance." },
  ];

  return (
    <section id="features" className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 -z-0 bg-slate-900" style={{ backgroundImage: `radial-gradient(ellipse 80% 50% at 50% 120%, rgba(100, 108, 255, 0.15), transparent)`}}></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Why Choose DigitalHive?</h2>
                <p className="text-lg text-slate-400 mt-4 max-w-2xl mx-auto">We provide unparalleled value and a seamless experience for all your digital needs.</p>
            </div>
            <div className="relative">
                {/* This is a simplified version for mobile */}
                <div className="md:hidden space-y-12">
                     {features.map((feature, index) => (
                        <div key={index} className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700 flex items-start gap-4">
                             <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white">
                                {React.cloneElement(feature.icon, {className: "h-6 w-6"})}
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-1">{feature.title}</h3>
                                <p className="text-slate-400">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* This is the timeline for desktop */}
                <div className="hidden md:block">
                    <div className="absolute left-1/2 -translate-x-1/2 top-10 bottom-10 w-1 bg-slate-700/30 rounded-full"></div>
                    <div className="space-y-4">
                        {features.map((feature, index) => (
                            <FeatureTimelineItem key={index} {...feature} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

// --- Pricing Section Component ---
const PricingCard = ({ plan, description, price, features, popular = false, discount = null }) => (
    <div className={`relative bg-slate-800/70 backdrop-blur-sm p-8 rounded-xl border ${popular ? 'border-purple-600 shadow-2xl shadow-purple-500/20' : 'border-slate-700'} flex flex-col`}>
        {popular && (
            <div className="absolute top-0 -translate-y-1/2 w-full flex justify-center">
                <span className="bg-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-full uppercase">Best deal - Limited time only</span>
            </div>
        )}
        {discount && (
             <div className="absolute top-4 right-4 bg-lime-400 text-lime-900 font-bold text-xs px-2.5 py-1 rounded-full transform rotate-12">
                {discount}% OFF
            </div>
        )}
        <h3 className="text-2xl font-semibold text-white mb-2">{plan}</h3>
        <p className="text-slate-400 mb-6 h-10">{description}</p>
        <div className="flex items-baseline mb-6">
            <span className="text-4xl font-extrabold text-white">${price}</span>
            <span className="text-slate-400 ml-2">/ month</span>
        </div>
        <ul className="space-y-4 text-slate-300 mb-8 flex-grow">
            {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                </li>
            ))}
        </ul>
        <a href="#" className={`w-full text-center font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${popular ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-slate-700 hover:bg-slate-600 text-white'}`}>
            Choose Plan
        </a>
    </div>
);

const PricingSection = () => {
  const plans = [
    { plan: "Premium", description: "Everything you need to create your website.", price: "11.99", features: ["Access to all Figma templates", "1 Premium Subscription Account"] },
    { plan: "Business", description: "Level up with more power and enhanced features.", price: "2.99", popular: true, discount: 73, features: ["Access to all After Effects templates", "Up to 3 Premium Subscription Accounts", "Priority 24/7 Support"] },
    { plan: "Cloud Startup", description: "Enjoy optimized performance & powerful resources.", price: "15.99", discount: 71, features: ["Early access to new products", "All features from Business", "Dedicated server resources"] },
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-900 relative overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] -z-10" style={{background: 'radial-gradient(circle, rgba(100, 108, 255, 0.1) 0%, rgba(10, 10, 20, 0) 70%)'}}></div>
      <AnimatedSection>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Don't miss the limited-time deal</h2>
            <p className="text-lg text-slate-400 mt-4 max-w-2xl mx-auto">Get hosting, AI Website Builder and bonus AI credits with a 48-month Business plan.</p>
             <div className="mt-6 flex justify-center items-center gap-x-8 gap-y-2 text-slate-400 flex-wrap">
                <span className="flex items-center gap-2"><LifeBuoy className="h-5 w-5 text-cyan-400"/> 24/7 support</span>
                <span className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-cyan-400"/> 30-day money-back guarantee</span>
                <span className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-cyan-400"/> Cancel anytime</span>
            </div>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((p, i) => <PricingCard key={i} {...p} />)}
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
};

// --- Testimonials Section Component ---
const TestimonialCard = ({ quote, name, role, avatar }) => (
    <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700 h-full flex flex-col justify-center">
        <div className="flex items-center mb-4">
            <img className="h-12 w-12 rounded-full object-cover mr-4" src={avatar} alt={name} />
            <div>
                <p className="font-semibold text-white">{name}</p>
                <p className="text-sm text-cyan-400">{role}</p>
            </div>
        </div>
        <div className="flex mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />)}
        </div>
        <p className="text-slate-300 italic">"{quote}"</p>
    </div>
);

const TestimonialsSection = () => {
    const swiperRef = useRef(null);
    const testimonials = [
        { quote: "DigitalHive is a game-changer. The quality of the Figma templates is top-notch and the instant delivery of my Netflix account was seamless. Highly recommended!", name: "Sarah Johnson", role: "Freelance UI/UX Designer", avatar: "https://i.pravatar.cc/150?img=1" },
        { quote: "I was skeptical at first, but the prices are unbeatable and the service is legit. My Gemini Pro subscription works perfectly. Their 24/7 support is also very responsive.", name: "Michael Chen", role: "Motion Graphics Artist", avatar: "https://i.pravatar.cc/150?img=2" },
        { quote: "The yearly plan is incredible value. I get all the assets I need for my projects and my favorite streaming services in one place. It has simplified my digital life so much.", name: "Emily Rodriguez", role: "Digital Marketer", avatar: "https://i.pravatar.cc/150?img=3" },
        { quote: "Absolutely fantastic service. The After Effects templates saved me hours of work on a recent project. Will definitely be a returning customer!", name: "David Lee", role: "Video Editor", avatar: "https://i.pravatar.cc/150?img=4" }
    ];

    useEffect(() => {
        if (swiperRef.current && window.Swiper) {
            const swiper = new window.Swiper(swiperRef.current, {
                modules: [window.Swiper.Pagination, window.Swiper.Navigation, window.Swiper.Autoplay],
                spaceBetween: 30,
                slidesPerView: 1,
                loop: true,
                pagination: { 
                    el: '.swiper-pagination-testimonials',
                    clickable: true,
                    renderBullet: (index, className) => `<span class="${className}" style="background-color: #fff"></span>`
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: { delay: 5000, disableOnInteraction: false },
                breakpoints: {
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                },
            });
            return () => swiper.destroy();
        }
    }, []);

    return (
        <section id="testimonials" className="py-20 bg-slate-900">
            <AnimatedSection>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Loved by Creatives & Professionals</h2>
                        <p className="text-lg text-slate-400 mt-4 max-w-2xl mx-auto">Don't just take our word for it. Here's what our users have to say.</p>
                    </div>
                    <div ref={swiperRef} className="swiper pb-12 relative">
                        <div className="swiper-wrapper">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="swiper-slide p-2">
                                    <TestimonialCard {...testimonial} />
                                </div>
                            ))}
                        </div>
                        <div className="swiper-pagination-testimonials relative mt-4"></div>
                        <div className="swiper-button-next text-white"></div>
                        <div className="swiper-button-prev text-white"></div>
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
};

// --- FAQ Section Component ---
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-700">
      <button
        className="w-full flex justify-between items-center text-left py-5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-white">{question}</span>
        <ChevronDown className={`h-6 w-6 text-slate-400 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="overflow-hidden"
      >
        <p className="text-slate-300 pb-5 pr-6">{answer}</p>
      </motion.div>
    </div>
  );
};

const FaqSection = () => {
    const faqs = [
        { question: "How long does delivery take?", answer: "All our digital products and subscriptions are delivered instantly upon successful payment. You will receive an email with access details immediately." },
        { question: "What is your refund policy?", answer: "Due to the nature of digital goods, we generally do not offer refunds. However, if a product or account is not as described or faulty, we offer a replacement or a full refund within 7 days of purchase. Please contact our support team for assistance." },
        { question: "Are the subscription accounts safe to use?", answer: "Absolutely. All our accounts are 100% genuine and legally sourced. We guarantee the validity of the accounts for the entire duration of your subscription with us. Your privacy and security are our top priorities." },
        { question: "Can I share the templates or accounts?", answer: "Our standard license is for individual use. Sharing of accounts or templates is not permitted and may result in the termination of your service without a refund. Please read our Terms & Conditions for more details." }
    ];

    return (
        <section id="faq" className="py-20 bg-slate-900 relative overflow-hidden">
             <div className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] -z-10" style={{background: 'radial-gradient(circle, rgba(100, 108, 255, 0.1) 0%, rgba(10, 10, 20, 0) 70%)'}}></div>
            <AnimatedSection>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">Frequently Asked Questions</h2>
                        <p className="text-lg text-slate-400 mt-4 max-w-2xl mx-auto">Have questions? We have answers. If you can't find what you're looking for, feel free to contact us.</p>
                    </div>
                    <div className="max-w-3xl mx-auto">
                        {faqs.map((faq, index) => (
                            <FaqItem key={index} question={faq.question} answer={faq.answer} />
                        ))}
                    </div>
                </div>
            </AnimatedSection>
        </section>
    );
};

// --- Call to Action Section ---
const CtaSection = () => {
    return (
        <section className="py-20 bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                     <motion.div 
                        className="absolute -top-10 -left-10 w-48 h-48 bg-white/10 rounded-full"
                        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                        transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                     />
                     <motion.div 
                        className="absolute -bottom-12 -right-12 w-64 h-64 bg-white/10 rounded-full"
                        animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                        transition={{ ease: "linear", duration: 30, repeat: Infinity, delay: 5 }}
                     />
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
                        Ready to Elevate Your Digital Toolkit?
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-purple-200 text-lg max-w-2xl mx-auto mb-8 relative z-10">
                        Join thousands of creators and professionals who trust DigitalHive for their digital assets and subscriptions.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <a href="#pricing" className="bg-white hover:bg-gray-200 text-purple-600 font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-2xl inline-block relative z-10 transform hover:scale-105">
                            Get Started Now
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

// --- Footer Component ---
const Footer = () => {
    const socialLinks = [
        { icon: <Twitter className="h-6 w-6" />, href: "#" },
        { icon: <Linkedin className="h-6 w-6" />, href: "#" },
        { icon: <Facebook className="h-6 w-6" />, href: "#" },
        { icon: <Instagram className="h-6 w-6" />, href: "#" },
    ];
    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-1">
                        <a href="#" className="flex items-center space-x-2 mb-4">
                            <Gem className="h-8 w-8 text-cyan-400" />
                            <span className="text-2xl font-bold text-white">DigitalHive</span>
                        </a>
                        <p className="text-slate-400">The ultimate marketplace for premium digital goods.</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:col-span-2 gap-8">
                        <div>
                            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Products</h4>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Figma Templates</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">After Effects</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Subscriptions</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Company</h4>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Contact Support</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Legal</h4>
                            <ul className="mt-4 space-y-2">
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Terms & Conditions</a></li>
                                <li><a href="#" className="text-slate-400 hover:text-white transition-colors">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-slate-700 flex flex-col sm:flex-row justify-between items-center">
                    <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} DigitalHive. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 sm:mt-0">
                        {socialLinks.map((link, index) => (
                            <a key={index} href={link.href} className="text-slate-500 hover:text-white transition-colors">
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default App;
