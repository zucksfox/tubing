import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import logoXGono from '../assets/images/logoxgono.png';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '6287776656166';
    const message = 'Halo saya ingin pesan tubing di XGono Adventure';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-primary to-blue-dark"
      style={{
        transform: `translateY(${scrollY * 0.5}px)`
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Background image placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("assets/images/s.png")',
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 animate-fade-in">
        <div className="mb-6 animate-slide-up">
          <img 
            src={logoXGono} 
            alt="XGono Tubing Adventure" 
            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto filter drop-shadow-2xl"
          />
        </div>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-slide-up">
          Rasakan Sensasi Tubing di Tengah Alam!
        </p>
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 animate-float flex items-center gap-3 mx-auto"
        >
          <FaWhatsapp className="text-2xl" />
          Pesan Sekarang
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
