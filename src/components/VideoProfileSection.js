import React, { useEffect, useState } from 'react';

const VideoProfileSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('video-profile');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  // Ganti dengan ID video YouTube yang diinginkan
  const youtubeVideoId = "czQ2KID9plQ"; // Contoh: Amazing Nature 4K video, ganti dengan video profil XGono yang sesuai

  return (
    <section id="video-profile" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Video Profile
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Saksikan video profil kami yang menampilkan keseruan dan pengalaman 
              tak terlupakan di XGono Tubing Adventure.
            </p>
          </div>

          {/* Video Container with Box Effect */}
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
            {/* Main Box Container */}
            <div className="relative mx-auto max-w-4xl">
              {/* Gradient Border Box */}
              <div className="relative p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-105">
                {/* Inner White Box */}
                <div className="relative bg-white rounded-2xl overflow-hidden">
                  {/* Content Padding */}
                  <div className="p-8 md:p-12">
                    {/* Video Title */}
                    <div className="text-center mb-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">🎬 Profil XGono Adventure</h3>
                      <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    </div>
                    
                    {/* Video Container */}
                    <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-xl" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&modestbranding=1&showinfo=0&controls=1`}
                        title="XGono Tubing Adventure - Video Profile"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Decorative Floating Elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-blue-500 rounded-full opacity-30 animate-pulse blur-sm"></div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-purple-500 rounded-full opacity-30 animate-pulse blur-sm" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/3 -right-4 w-8 h-8 bg-pink-500 rounded-full opacity-30 animate-pulse blur-sm" style={{ animationDelay: '2s' }}></div>
              <div className="absolute bottom-1/3 -left-4 w-10 h-10 bg-yellow-400 rounded-full opacity-30 animate-pulse blur-sm" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>

          {/* Additional Info */}
          <div className={`text-center mt-12 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
            <p className="text-gray-600 text-sm md:text-base">
              📺 Jangan lupa untuk <span className="font-semibold text-blue-600">subscribe</span> dan 
              <span className="font-semibold text-red-500"> like</span> video kami!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoProfileSection;
