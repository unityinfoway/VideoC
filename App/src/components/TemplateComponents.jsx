import React, { useEffect, useRef } from 'react';

// --- ICONS (Full and correct SVG code) ---
const DownloadIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
);

const XIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const EyeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
);

// --- Reusable Template Card Component ---
export const TemplateCard = ({ template, onClick }) => {
    const cardRef = useRef(null);
    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = (rect.height / 2 - y) / 20;
        const rotateY = (x - rect.width / 2) / 20;
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
        cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };
    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    };

    return (
        <div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} onClick={() => onClick(template)} className="product-card group cursor-pointer">
            <div className="product-card-glow"></div>
            <div className="product-card-content relative">
                {template.price && (
                    <div className="absolute top-4 right-4 z-10 bg-indigo-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                        ₹{template.price}
                    </div>
                )}
                <img src={template.images?.[0] || template.imageUrl} alt={template.name} className="w-full h-48 rounded-lg object-cover mb-4 transition-transform duration-300 group-hover:scale-105" />
                <div className="relative">
                    <h3 className="text-lg font-bold text-white">{template.name}</h3>
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{template.description}</p>
                </div>
            </div>
        </div>
    );
};

// --- UPDATED Template Detail Modal Component ---
export const TemplateDetailModal = ({ template, onClose, onPreviewClick }) => {
    
    const handlePayment = async () => {
        if (!template) return;

        // Make sure to use your new, secure Test Key ID
        const key_id = "rzp_test_2lUAVegOmmNtf2"; 
        
        // 1. Create Order on Your Backend
        const response = await fetch('http://localhost:5201/api/create-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: template.price * 100, // Amount in paise
                currency: 'INR',
            }),
        });

        const order = await response.json();
        if (!order) {
            alert('Order creation failed. Please try again.');
            return}

        // 2. Configure Razorpay Options
        const options = {
            key: key_id,
            amount: order.amount,
            currency: order.currency,
            name: "Vyapaara Marketplace",
            description: `Payment for ${template.name}`,
            image: "/logo.svg",
            order_id: order.id,
            handler: async function (response) {
                const data = {
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_signature: response.razorpay_signature,
                };

                // 4. Verify Payment on Your Backend
                const verificationResponse = await fetch('http://localhost:5201/api/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });
                
                const verificationResult = await verificationResponse.json();

                if (verificationResult.success) {
                    alert('Payment successful!');
                    window.location.href = template.zipUrl;
                } else {
                    alert('Payment verification failed. Please contact support.');
                }
            },
            prefill: {
                name: "Ayush Kumar",
                email: "ayush@example.com",
                contact: "9999999999",
            },
            notes: {
                template_id: template.id,
            },
            theme: {
                color: "#6366F1",
            },
        };

        // 6. Open Razorpay Checkout
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    useEffect(() => {
        const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    if (!template) return null;

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div className="relative w-full max-w-4xl bg-slate-900/95 border border-slate-700 rounded-2xl p-6 md:p-8 grid md:grid-cols-2 gap-8 modal-content-slide-in" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10"><XIcon className="w-6 h-6" /></button>
                
                <div className="w-full h-64 md:h-auto rounded-lg overflow-hidden border border-slate-700 bg-slate-800/50 flex items-center justify-center">
                     <img src={template.images?.[0] || template.imageUrl} alt={template.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-3xl font-extrabold text-white mb-4">{template.name}</h2>
                    <p className="text-slate-300 flex-grow mb-6">{template.description}</p>
                    
                    <div className="mt-auto flex flex-col gap-4">
                        {template.price && (
                            <div className="text-center mb-2">
                                <span className="text-4xl font-extrabold text-white">₹{template.price}</span>
                                <span className="text-slate-400 text-sm">/one-time purchase</span>
                            </div>
                        )}

                        {template.images && template.images.length > 0 && (
                            <button
                                onClick={() => onPreviewClick(template.images)}
                                className="w-full inline-flex items-center justify-center gap-3 px-8 py-3 bg-slate-700/80 text-slate-200 font-semibold rounded-lg hover:bg-slate-700 transition-all duration-300 text-lg"
                            >
                                <EyeIcon className="w-6 h-6" />
                                Show Previews
                            </button>
                        )}
                        <button onClick={handlePayment} className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition-all duration-300 text-lg shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 transform hover:-translate-y-1">
                            <DownloadIcon className="w-6 h-6" />
                            Buy & Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};