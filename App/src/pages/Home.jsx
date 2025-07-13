import React, { useState, useEffect, useRef } from "react";
import "../styles/home.css";
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img7 from "../assets/7.jpg";
import img8 from "../assets/8.jpg";
import img9 from "../assets/9.jpg";
import img6 from "../assets/6.jpg";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import HeroBackground from '../components/HeroBackground';
import PricingSection from "../components/PricingSection";
import templateData from "../data/templateData.json";
import useScrollToHash from "../hooks/useScrollToHash";


// --- ICONS ---
const CheckCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ChevronDownIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);
const Logo = (props) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#6366F1", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#8B5CF6", stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path
      d="M12 2L2 7l10 5 10-5-10-5z"
      fill="url(#logoGradient)"
      opacity="0.8"
    />
    <path
      d="M2 17l10 5 10-5"
      stroke="url(#logoGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 12l10 5 10-5"
      stroke="url(#logoGradient)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// --- New DealTimer Component ---
const DealTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const { hours, minutes, seconds } = prevTime;
        if (hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(timer);
          return prevTime;
        }
        if (seconds > 0) {
          return { ...prevTime, seconds: seconds - 1 };
        }
        if (minutes > 0) {
          return { ...prevTime, minutes: minutes - 1, seconds: 59 };
        }
        if (hours > 0) {
          return { hours: hours - 1, minutes: 59, seconds: 59 };
        }
        return prevTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="deal-timer-container">
      <p>
        🔥 Limited time deal! Ends in:{" "}
        <span className="timer">
          {String(timeLeft.hours).padStart(2, "0")}:
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </p>
    </div>
  );
};

const HeroCodeBlock = () => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = (rect.height / 2 - y) / 15;
    const rotateY = (x - rect.width / 2) / 15;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    cardRef.current.style.transform = `perspective(1500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      "perspective(1500px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative h-80 w-full max-w-md mx-auto md:max-w-none hero-code-card animate-fade-in-slide-up"
      style={{ animationDelay: "0.3s" }}
    >
      <div className="hero-code-card-glow"></div>
      <div className="hero-code-card-content">
        <pre className="text-xs text-emerald-300">
          <code className="animate-pulse">
            {`const Vyapaara = () => {
  const assets = [
  "Figma UI Kits",
  "After Effects Templates",
  "Canva Pro Accounts",
  "Social Growth Services"
  ];

  return (
  <Marketplace>
      {assets.map(asset => <ProductCard name={asset} />)}
  </Marketplace>
  )
}`}
          </code>
        </pre>
      </div>
    </div>
  );
};


// --- Infinite Scroller Component ---
const InfiniteScroller = ({ children, direction = "rtl" }) => {
  return (
    <div className="scroller-container" data-direction={direction}>
      <div className="scroller-content">
        {children}
        {children}
      </div>
    </div>
  );
};

// --- Scroll Animation Wrapper ---
const AnimatedSection = ({ children }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

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
      className={`transition-all duration-1000 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
    >
      {children}
    </div>
  );
};

// --- New CountingNumber Component for Animation ---
const CountingNumber = ({ targetNumber, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const increment = targetNumber / (duration / 16);
          const timer = setInterval(() => {
            start += increment;
            if (start < targetNumber) {
              setCount(Math.ceil(start));
            } else {
              setCount(targetNumber);
              clearInterval(timer);
            }
          }, 16);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.5 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [targetNumber, duration, hasAnimated]);

  return (
    <span ref={ref} className="text-indigo-400">
      {count}
      {count === targetNumber ? "+" : ""}
    </span>
  );
};

// --- NEW COMPONENT TO SHOW CURRENT PLAN STATUS ---
const CurrentPlanStatus = ({ expiryDate }) => {
    if (!expiryDate) {
        return null; // Don't render if expiry date is not available
    }
    const formattedDate = new Date(expiryDate).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    return (
        <section id="pricing" className="px-4 py-16">
            <div className="max-w-screen-md mx-auto text-center">
                <div className="p-8 rounded-2xl bg-slate-800/50 border border-slate-700 shadow-lg">
                    <h2 className="text-3xl font-bold text-white mb-3">You Have an Active Plan</h2>
                    <p className="text-slate-300 text-lg">
                        Your current pro plan is active until:
                    </p>
                    <p className="text-2xl font-bold text-green-400 my-4">
                        {formattedDate}
                    </p>
                    <Link 
                        to="/account" 
                        className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-500 transition-colors"
                    >
                        Manage Subscription
                    </Link>
                </div>
            </div>
        </section>
    );
};


// --- MAIN APP COMPONENT ---
export default function Home() {
  useScrollToHash();
  
  // --- NEW STATE AND LOGIC FOR USER DATA ---
  const [userData, setUserData] = useState({
      isLoggedIn: false,
      isPlanActive: false,
      planExpiryDate: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if(token) {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if(response.ok) {
                    const data = await response.json();
                    setUserData({
                        isLoggedIn: true,
                        isPlanActive: data.user.isPlanActive,
                        planExpiryDate: data.user.planExpiryDate
                    });
                } else {
                    // Handle cases where token is invalid/expired
                    localStorage.clear();
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };
        fetchUserData();
    }
  }, []);

  const {
    digitalTemplates: digitalTemplatesData,
    premiumAccounts: premiumAccountsData,
    socialServices: socialServicesData,
    faqData,
  } = templateData;

  const digitalTemplates = [
    { ...digitalTemplatesData[0], imageUrl: img2 },
    { ...digitalTemplatesData[1], imageUrl: img1 },
    { ...digitalTemplatesData[2], imageUrl: img3 },
  ];

  const premiumAccounts = [
    { ...premiumAccountsData[0], imageUrl: img4 },
    { ...premiumAccountsData[1], imageUrl: img6 },
    { ...premiumAccountsData[2], imageUrl: img5 },
  ];

  const socialServices = [
    { ...socialServicesData[0], imageUrl: img9 },
    { ...socialServicesData[1], imageUrl: img7 },
    { ...socialServicesData[2], imageUrl: img8 },
  ];

  const ProductCard = ({ item }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = (rect.height / 2 - y) / 20;
      const rotateY = (x - rect.width / 2) / 20;
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      if (!cardRef.current) return;
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    };

    return (
      <Link to={item.link} className="block">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="product-card group cursor-pointer"
        >
          <div className="product-card-glow"></div>
          <div className="product-card-content">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-48 rounded-lg object-cover mb-4 transition-transform duration-300 group-hover:scale-105"
            />
            <div className="relative">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-sm text-slate-400 mt-1">{item.description}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const FeatureCard = ({ icon, title, children }) => (
    <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700 transition-all duration-300 hover:border-indigo-500/50 hover:-translate-y-1">
      <div className="text-indigo-400 mb-4">{icon}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-400">{children}</p>
    </div>
  );

  const TestimonialCard = ({ name, role, text, avatarUrl }) => (
    <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700">
      <p className="text-slate-300 mb-4">"{text}"</p>
      <div className="flex items-center">
        <img
          src={avatarUrl}
          alt={name}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <p className="font-semibold text-white">{name}</p>
          <p className="text-sm text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  );

  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border-b border-slate-700 py-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center text-left text-lg font-semibold text-white"
        >
          <span>{question}</span>
          <ChevronDownIcon
            className={`transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-40 mt-2" : "max-h-0"
          }`}
        >
          <p className="text-slate-400 pt-2">{answer}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <HeroBackground />
      <div className="w-full text-slate-100">
        <div className="relative z-10">
          <Navbar />
          <main>
            {/* --- Hero Section --- */}
            <section className="relative pt-24 pb-32 sm:pt-32 sm:pb-40 px-4">
              <div className="max-w-screen-xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                  <h1 className="text-5xl sm:text-6xl font-extrabold text-white tracking-tight animate-fade-in-slide-up">
                    Your Digital Marketplace for Creative Assets
                  </h1>
                  <p
                    className="max-w-xl mx-auto md:mx-0 mt-6 text-lg text-slate-400 animate-fade-in-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    High-quality templates, premium accounts, and social growth
                    services to elevate your projects and brand.
                  </p>
                  <div
                    className="mt-8 flex justify-center md:justify-start gap-4 animate-fade-in-slide-up"
                    style={{ animationDelay: "0.4s" }}
                  >
                    <a
                      href="#templates"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-all duration-300 text-lg shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-1"
                    >
                      Explore Assets
                    </a>
                  </div>
                  <div className="mt-4 animate-fade-in-slide-up" style={{ animationDelay: "0.6s" }}>
                    <DealTimer />
                  </div>
                </div>
                <HeroCodeBlock />
              </div>
            </section>

            <div className="relative">
              <svg
                className="absolute top-0 left-0 w-full -translate-y-1"
                viewBox="0 0 1440 100"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  fill="#0f172a"
                  d="M0,32L48,53.3C96,75,192,117,288,133.3C384,149,480,139,576,117.3C672,96,768,64,864,69.3C960,75,1056,117,1152,133.3C1248,149,1344,139,1392,133.3L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                />
              </svg>
            </div>

            <div className="relative">
              <div className="space-y-32 py-24 bg-slate-950">
                <AnimatedSection>
                  <section id="features" className="px-4">
                    <div className="max-w-screen-xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white">
                          Why Choose Vyapaara?
                        </h2>
                        <p className="text-slate-400 mt-2">
                          The best assets, curated for quality and ready for
                          production.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <FeatureCard
                          icon={<CheckCircleIcon />}
                          title="Curated Quality"
                        >
                          Every item is reviewed by our team to ensure it meets
                          our high standards for quality and usability.
                        </FeatureCard>
                        <FeatureCard
                          icon={<CheckCircleIcon />}
                          title="Instant Access"
                        >
                          Get immediate access to your purchased assets and
                          start using them in your projects right away.
                        </FeatureCard>
                        <FeatureCard
                          icon={<CheckCircleIcon />}
                          title="Simple Licensing"
                        >
                          Our straightforward license allows for broad use in
                          both personal and commercial projects.
                        </FeatureCard>
                      </div>
                    </div>
                  </section>
                </AnimatedSection>

                {/* --- CONDITIONAL PRICING SECTION --- */}
                <AnimatedSection>
                    {userData.isLoggedIn && userData.isPlanActive ? (
                        <CurrentPlanStatus expiryDate={userData.planExpiryDate} />
                    ) : (
                        <PricingSection />
                    )}
                </AnimatedSection>

                <AnimatedSection>
                  <section id="achievements" className="px-4">
                    <div className="max-w-screen-xl mx-auto text-center">
                      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-3 leading-tight">
                        Unlock <CountingNumber targetNumber={1000} />{" "}
                        <span className="text-indigo-400">Premium Assets</span>.
                        <br className="hidden sm:inline" /> Elevate Your
                        Projects.
                      </h2>
                      <p className="text-lg sm:text-xl text-slate-400 max-w-3xl mx-auto">
                        Join a thriving community of creators who are building
                        stunning designs and boosting their brands with
                        Vyapaara's curated collection.
                      </p>
                    </div>
                  </section>
                </AnimatedSection>

                <AnimatedSection>
                  <section id="templates" className="px-4">
                    <div className="max-w-screen-xl mx-auto">
                      <h2 className="text-3xl font-bold text-white mb-8">
                        Digital Templates
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {digitalTemplates.map((item) => (
                          <ProductCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  </section>
                </AnimatedSection>

                <AnimatedSection>
                  <section id="accounts" className="px-4">
                    <div className="max-w-screen-xl mx-auto">
                      <h2 className="text-3xl font-bold text-white mb-8">
                        Premium Accounts
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {premiumAccounts.map((item) => (
                          <ProductCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  </section>
                </AnimatedSection>

                <AnimatedSection>
                  <section id="social" className="px-4">
                    <div className="max-w-screen-xl mx-auto">
                      <h2 className="text-3xl font-bold text-white mb-8">
                        Social Growth Services
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {socialServices.map((item) => (
                          <ProductCard key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  </section>
                </AnimatedSection>

                <AnimatedSection>
                  <section id="how-it-works" className="px-4">
                    <div className="max-w-screen-xl mx-auto text-center">
                      <h2 className="text-4xl font-bold text-white mb-4">
                        Get Started in 3 Easy Steps
                      </h2>
                      <p className="text-slate-400 mb-12">
                        A seamless process from Browse to using your new assets.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700">
                          <div className="text-3xl font-bold text-indigo-400 mb-3">
                            01
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            Browse & Discover
                          </h3>
                          <p className="text-slate-400">
                            Explore our curated collections of digital assets to
                            find the perfect fit for your project.
                          </p>
                        </div>
                        <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700">
                          <div className="text-3xl font-bold text-indigo-400 mb-3">
                            02
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            Secure Purchase
                          </h3>
                          <p className="text-slate-400">
                            Add items to your cart and complete your purchase
                            through our secure payment gateway.
                          </p>
                        </div>
                        <div className="p-6 rounded-lg bg-slate-800/50 border border-slate-700">
                          <div className="text-3xl font-bold text-indigo-400 mb-3">
                            03
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2">
                            Download & Create
                          </h3>
                          <p className="text-slate-400">
                            Get instant access to your files. Download them
                            immediately and start creating something amazing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </section>
                </AnimatedSection>

                <AnimatedSection>
                  <section id="testimonials" className="px-4">
                    <div className="max-w-screen-xl mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white">
                          Loved by Creators Worldwide
                        </h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <TestimonialCard
                          name="Sarah D."
                          role="Freelance Designer"
                          text="Vyapaara has been a game-changer for my workflow. The Figma UI kits are top-notch and save me hours of work."
                          avatarUrl="https://i.pravatar.cc/150?img=1"
                        />
                        <TestimonialCard
                          name="Mike R."
                          role="YouTuber"
                          text="I was struggling to grow my channel, but the subscriber service gave me the boost I needed to get noticed. Highly recommend!"
                          avatarUrl="https://i.pravatar.cc/150?img=2"
                        />
                      </div>
                    </div>
                  </section>
                </AnimatedSection>

                <AnimatedSection>
                  <section id="scroller-section" className="space-y-24">
                    <InfiniteScroller direction="rtl">
                      <span className="scroller-item">After Effects</span>
                      <span className="scroller-item">Figma</span>
                      <span className="scroller-item">Canva Pro</span>
                      <span className="scroller-item">Social Media Growth</span>
                      <span className="scroller-item">Video Templates</span>
                      <span className="scroller-item">UI Kits</span>
                      <span className="scroller-item">Premium Fonts</span>
                    </InfiniteScroller>
                    <InfiniteScroller direction="ltr">
                      <span className="scroller-item">Instagram Followers</span>
                      <span className="scroller-item">YouTube Subscribers</span>
                      <span className="scroller-item">Instant Delivery</span>
                      <span className="scroller-item">24/7 Support</span>
                      <span className="scroller-item">Secure Payments</span>
                      <span className="scroller-item">High Quality</span>
                      <span className="scroller-item">Creative Assets</span>
                    </InfiniteScroller>
                  </section>
                </AnimatedSection>

                <AnimatedSection>
                  <section id="faq" className="px-4">
                    <div className="max-w-screen-md mx-auto">
                      <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-white">
                          Frequently Asked Questions
                        </h2>
                        <p className="text-slate-400 mt-2">
                          Have questions? We've got answers.
                        </p>
                      </div>
                      <div>
                        {faqData.map((faq, index) => (
                          <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                          />
                        ))}
                      </div>
                    </div>
                  </section>
                </AnimatedSection>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  )}