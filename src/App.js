import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PricelistSection from './components/PricelistSection';
import GallerySection from './components/GallerySection';
import VideoProfileSection from './components/VideoProfileSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <div className="App">
      {/* Header Navigation */}
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Pricelist Section */}
      <PricelistSection />
      
      {/* Gallery Section */}
      <GallerySection />
      
      {/* Video Profile Section */}
      <VideoProfileSection />
      
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
