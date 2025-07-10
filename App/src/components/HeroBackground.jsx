import React, { useEffect } from 'react';

const HeroBackground = () => {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      document.documentElement.style.setProperty("--mouse-x", `${clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950"></div>
      <div className="absolute top-0 -left-1/4 w-96 h-96 md:w-[40rem] md:h-[40rem] bg-indigo-600/20 rounded-full filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute bottom-0 -right-1/4 w-96 h-96 md:w-[40rem] md:h-[40rem] bg-purple-600/20 rounded-full filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
      <div className="aura-background"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>
  );
};

export default HeroBackground;