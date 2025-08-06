import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import PricelistSection from './components/PricelistSection';
import GallerySection from './components/GallerySection';
import VideoProfileSection from './components/VideoProfileSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import AdminApp from './admin/AdminApp';

// Main website component
const MainWebsite = () => {
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
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Main website route */}
        <Route path="/" element={<MainWebsite />} />
        
        {/* Admin panel routes */}
        <Route path="/admin/*" element={<AdminApp />} />
        
        {/* Catch all route - redirect to main website */}
        <Route path="*" element={<MainWebsite />} />
      </Routes>
    </Router>
  );
}

export default App;
