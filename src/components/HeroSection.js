import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import logoXGono from '../assets/images/logoxgono.png';

const HeroSection = () => {

  const handleWhatsAppClick = () => {
    const phoneNumber = '6285702784443';
    const message = 'Halo saya ingin pesan tubing di XGono Adventure';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-primary to-blue-dark"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-40"></div>
      
      {/* Background image placeholder */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url("assets/images/s.png")'
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <div className="mb-6">
          <img 
            src={logoXGono} 
            alt="XGono Tubing Adventure" 
            className="max-w-xs md:max-w-md lg:max-w-lg mx-auto h-auto filter drop-shadow-2xl"
          />
        </div>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Rasakan Sensasi Tubing di Tengah Alam!
        </p>
        <button
          onClick={handleWhatsAppClick}
          className="bg-green-500 text-white font-bold py-4 px-8 rounded-full text-lg flex items-center gap-3 mx-auto"
        >
          <FaWhatsapp className="text-2xl" />
          Pesan Sekarang
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
