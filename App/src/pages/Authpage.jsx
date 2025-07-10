import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

// --- (Icon components and CanvasBackground component remain the same, no changes needed there) ---

const UserIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const MailIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const EyeIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
);
  
const EyeOffIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
);

const CanvasBackground = () => {
    const canvasRef = useRef(null);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
  
      let particlesArray;
  
      class Particle {
        constructor(x, y, directionX, directionY, size, color) {
          this.x = x;
          this.y = y;
          this.directionX = directionX;
          this.directionY = directionY;
          this.size = size;
          this.color = color;
        }
  
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
  
        update() {
          if (this.x > canvas.width || this.x < 0) {
            this.directionX = -this.directionX;
          }
          if (this.y > canvas.height || this.y < 0) {
            this.directionY = -this.directionY;
          }
          this.x += this.directionX;
          this.y += this.directionY;
          this.draw();
        }
      }
  
      function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
          let size = (Math.random() * 2) + 1;
          let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
          let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
          let directionX = (Math.random() * .4) - .2;
          let directionY = (Math.random() * .4) - .2;
          let color = 'rgba(255, 255, 255, 0.8)';
          particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
      }
  
      function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
          for (let b = a; b < particlesArray.length; b++) {
            let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
              ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
            if (distance < (canvas.width / 7) * (canvas.height / 7)) {
              opacityValue = 1 - (distance / 20000);
              ctx.strokeStyle = `rgba(192, 132, 252, ${opacityValue})`;
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
              ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
              ctx.stroke();
            }
          }
        }
      }
      
      let animationFrameId;
      function animate() {
        animationFrameId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
          particlesArray[i].update();
        }
        connect();
      }
      
      const handleResize = () => {
          canvas.width = innerWidth;
          canvas.height = innerHeight;
          init();
      }
  
      window.addEventListener('resize', handleResize);
  
      init();
      animate();
      
      return () => {
          window.removeEventListener('resize', handleResize);
          cancelAnimationFrame(animationFrameId);
      }
    }, []);
  
    return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />;
}


export default function AuthPage() {
  const navigate = useNavigate();
  // CHANGE 1: State ko 'username' se 'email' kiya gaya hai
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authtoken")) {
      navigate("/home");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // AuthPage.js

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { email: formData.email, password: formData.password };

    try {
        const response = await fetch(`http://localhost:5000/api/auth/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || "Something went wrong");
        }
        
        toast.success(result.message || 'Login successful!');

        if (result.authtoken) {
            // Store all data in localStorage
            localStorage.setItem("authtoken", result.authtoken);
            localStorage.setItem("userId", result.userId);
            localStorage.setItem("username", result.username);
            localStorage.setItem("role", result.role); // <-- Role ko localStorage mein save karein

            // == YAHAN CHANGE HAI: ROLE KE HISAB SE REDIRECT KAREIN ==
            setTimeout(() => {
                if (result.role === 'admin') {
                    navigate('/admin/dashboard'); // Admin ko admin dashboard par bhejein
                } else {
                    navigate('/home'); // Normal user ko home par bhejein
                }
            }, 1500);
        }

    } catch (err) {
        toast.error(err.message);
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen w-full bg-[#0a092d] text-white flex items-center justify-center p-4 relative overflow-hidden">
      <Toaster position="top-center" reverseOrder={false} />
      <CanvasBackground />
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 rounded-2xl backdrop-blur-lg bg-white/5 border border-white/10 shadow-2xl shadow-black/20">
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Log in to continue your journey.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          
          <div className="relative">
            <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              // Yeh ab formData.email se value lega
              value={formData.email}
              onChange={handleInputChange}
              className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 placeholder-gray-400 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              required
            />
          </div>

          <div className="relative">
            <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-white/10 placeholder-gray-400 text-white border border-transparent focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-white">
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          
          <button
            type="submit"
            className="mt-4 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 font-semibold rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-purple-600/30 active:scale-100 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Loading...' : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}