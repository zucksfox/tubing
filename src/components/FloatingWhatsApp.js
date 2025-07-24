import React, { useState, useEffect } from 'react';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';

const FloatingWhatsApp = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show button after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
      // Show tooltip for first time users
      setTimeout(() => {
        setShowTooltip(true);
        // Hide tooltip after 5 seconds
        setTimeout(() => setShowTooltip(false), 5000);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '6287776656166';
    const message = 'Halo, saya tertarik dengan paket wisata arung jeram di XGono Adventure. Bisa info lebih lanjut?';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setShowTooltip(false);
  };

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-20 right-0 bg-white rounded-lg shadow-lg p-4 w-64 border border-gray-200 animate-slide-up">
          <button
            onClick={closeTooltip}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes className="text-sm" />
          </button>
          <div className="pr-6">
            <p className="text-sm font-semibold text-gray-800 mb-1">
              👋 Halo! Ada yang bisa kami bantu?
            </p>
            <p className="text-xs text-gray-600 mb-2">
              Chat langsung dengan tim kami untuk informasi dan reservasi.
            </p>
            <button
              onClick={handleWhatsAppClick}
              className="text-xs text-blue-primary font-semibold hover:text-blue-dark"
            >
              Chat Sekarang →
            </button>
          </div>
          {/* Arrow pointing to button */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 animate-float group"
        title="Chat via WhatsApp"
      >
        <FaWhatsapp className="text-2xl" />
        
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
        
        {/* Online indicator */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-xs text-white font-bold">1</span>
        </div>
      </button>

      {/* Small label for first-time visitors */}
      <div className="absolute -left-20 top-1/2 transform -translate-y-1/2 bg-green-500 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        Chat Kami!
      </div>
    </div>
  );
};

export default FloatingWhatsApp;
