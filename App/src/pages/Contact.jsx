import React, { useState } from 'react';

// --- SHARED COMPONENT IMPORTS ---
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { HeroBackground, AnimatedSection } from '../components/CommonComponents';

// --- ICONS for this page ---
const MailIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);

const PhoneIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
);

const SendIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
);


// --- MAIN CONTACT PAGE COMPONENT ---
export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // In a real application, you would send this data to a backend or service like EmailJS
        console.log('Form submitted:', formData);
        alert(`Thank you, ${formData.name}. Your message has been sent!`);
        // Reset form
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    const inputClasses = "w-full px-4 py-3 bg-slate-800/80 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors duration-300";

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
                                    Get in Touch
                                </h1>
                                <p className="max-w-2xl mx-auto mt-6 text-lg text-slate-400">
                                    Have a question or a project in mind? We'd love to hear from you.
                                    Fill out the form below or email us directly.
                                </p>
                            </div>
                        </AnimatedSection>
                        
                        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16">
                            {/* Contact Form */}
                            <AnimatedSection delay={200}>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                                        <input type="text" name="name" id="name" required className={inputClasses} value={formData.name} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                                        <input type="email" name="email" id="email" required className={inputClasses} value={formData.email} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                                        <input type="text" name="subject" id="subject" required className={inputClasses} value={formData.subject} onChange={handleChange} />
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                                        <textarea name="message" id="message" required rows="5" className={inputClasses} value={formData.message} onChange={handleChange}></textarea>
                                    </div>
                                    <div>
                                        <button 
                                            type="submit" 
                                            className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-all duration-300 text-lg shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-1"
                                        >
                                            <SendIcon className="w-6 h-6" />
                                            Send Message
                                        </button>
                                    </div>
                                </form>
                            </AnimatedSection>

                            {/* Contact Information */}
                            <AnimatedSection delay={400}>
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Contact Information</h3>
                                        <p className="text-slate-400">
                                            Reach out to us directly through any of the methods below.
                                        </p>
                                    </div>
                                    <ul className="space-y-6 text-slate-300">
                                        <li className="flex items-center gap-4">
                                            <div className="p-3 bg-slate-800/80 rounded-full">
                                                <MailIcon className="w-6 h-6 text-indigo-400"/>
                                            </div>
                                            <a href="mailto:contact@vyapaara.com" className="hover:text-white transition-colors">contact@vyapaara.com</a>
                                        </li>
                                        <li className="flex items-center gap-4">
                                            <div className="p-3 bg-slate-800/80 rounded-full">
                                                <PhoneIcon className="w-6 h-6 text-indigo-400"/>
                                            </div>
                                            <span>(123) 456-7890</span>
                                        </li>
                                    </ul>
                                    <div>
                                       <h3 className="text-2xl font-bold text-white mt-10 mb-2">Follow Us</h3>
                                        <p className="text-slate-400">
                                            Stay up to date with our latest assets and news.
                                        </p>
                                        <div className="flex gap-4 mt-4">
                                            {/* Add your social media links here */}
                                            <a href="#" className="text-slate-400 hover:text-white transition-colors">Twitter</a>
                                            <a href="#" className="text-slate-400 hover:text-white transition-colors">Instagram</a>
                                            <a href="#" className="text-slate-400 hover:text-white transition-colors">GitHub</a>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </div>
    );
}