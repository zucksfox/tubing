import React from 'react';
import HeroSection from './components/HeroSection';
import PricelistSection from './components/PricelistSection';
import GallerySection from './components/GallerySection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <div className="App">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Pricelist Section */}
      <PricelistSection />
      
      {/* Gallery Section */}
      <GallerySection />
      
      {/* Contact Section */}
      <ContactSection />
      
      {/* Footer */}
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
