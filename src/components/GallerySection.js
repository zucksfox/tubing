import React, { useEffect, useState, useCallback } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Import gambar lokal
import tubing1 from '../assets/images/tubing/tubing1.jpg';
import tubing2 from '../assets/images/tubing/tubing2.jpg';
import tubing3 from '../assets/images/tubing/tubing3.jpg';

const GallerySection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('gallery');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    {
      id: 1,
      src: tubing1,
      alt: "Petualangan Tubing XGono - Keseruan di Sungai"
    },
    {
      id: 2,
      src: tubing2,
      alt: "Tubing Adventure - Momen Bersama Keluarga"
    },
    {
      id: 3,
      src: tubing3,
      alt: "XGono Tubing - Sensasi Menantang Adrenalin"
    }
  ];


  const openLightbox = (index) => {
    setCurrentImage(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  }, [galleryImages.length]);

  const prevImage = useCallback(() => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  }, [galleryImages.length]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen, nextImage, prevImage, closeLightbox]);

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Galeri
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Lihat momen-momen seru dan pengalaman tak terlupakan para petualang 
              yang telah merasakan sensasi tubing bersama XGono Adventure.
            </p>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative group cursor-pointer overflow-hidden rounded-lg ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-2xl">🔍</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-10"
          >
            <FaTimes />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-10"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl hover:text-gray-300 transition-colors z-10"
          >
            <FaChevronRight />
          </button>

          {/* Image */}
          <div className="max-w-4xl max-h-full p-4">
            <img
              src={galleryImages[currentImage].src}
              alt={galleryImages[currentImage].alt}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* Image counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
            {currentImage + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </section>
  );
};

export default GallerySection;
