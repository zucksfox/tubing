import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Camera, Phone } from 'lucide-react';
import logoXGono from '../assets/images/logoxgono.png';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navigationItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'gallery', label: 'Galeri', icon: Camera },
    { id: 'contact', label: 'Kontak', icon: Phone },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-blue-100'
          : 'bg-white/90 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
        <h1 className="text-xl font-bold text-blue-600 flex items-center space-x-2">
  <img src={logoXGono} alt="Logo XGono" className="h-12 w-auto" />
</h1>


          <div
            className="flex items-center cursor-pointer group"
            onClick={() => scrollToSection('hero')}
          >
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="group flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <IconComponent className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-blue-600" />
            ) : (
              <Menu className="w-6 h-6 text-blue-600" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="py-4 border-t border-blue-100">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-blue-50 transition-colors duration-200 text-left"
                  >
                    <IconComponent className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-700 font-medium">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Background overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm -z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
