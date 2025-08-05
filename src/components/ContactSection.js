import React, { useEffect, useState } from 'react';
import { FaWhatsapp, FaInstagram, FaMapMarkerAlt, FaClock, FaPhone } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';

const ContactSection = () => {
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

    const section = document.getElementById('contact');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const handleWhatsAppClick = () => {
    const phoneNumber = '6287719048030';
    const message = 'Halo, saya ingin mengetahui informasi lebih lanjut tentang XGono Tubing Adventure';
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/xgonotubingadventure', '_blank');
  };

  const handleTiktokClick = () => {
    window.open('https://tiktok.com/@xgonotubingadventure', '_blank');
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-2xl text-blue-primary" />,
      title: "Lokasi",
      info: "Jl. Candimulyo No.Km.002, Treko I, Treko, Kec. Mungkid, Kabupaten Magelang, Jawa Tengah 56551",
      subtitle: "Meeting point di Basecamp XGono"
    },
    {
      icon: <FaClock className="text-2xl text-blue-primary" />,
      title: "Jam Operasional",
      info: "Setiap Hari 08:00 - 17:00 WIB",
      subtitle: "Reservasi H-1 untuk hasil terbaik"
    },
    {
      icon: <FaPhone className="text-2xl text-blue-primary" />,
      title: "Kontak Darurat",
      info: "+628561899829",
      subtitle: "24/7 untuk keperluan urgent"
    },
    {
      icon: <FaPhone className="text-2xl text-blue-primary" />,
      title: "Kontak Darurat",
      info: "+6285712784443",
      subtitle: "Untuk informasi lebih lanjut"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-primary to-blue-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Hubungi Kami
            </h2>
            <p className="text-lg max-w-3xl mx-auto leading-relaxed opacity-90">
              Siap untuk petualangan tak terlupakan? Hubungi kami sekarang untuk reservasi 
              dan konsultasi paket yang sesuai dengan kebutuhan Anda.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Contact Info */}
            <div className={`space-y-8 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index}
                    className={`flex items-start space-x-4 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex-shrink-0 p-3 bg-white bg-opacity-20 rounded-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">
                        {item.title}
                      </h3>
                      <p className="text-lg font-semibold opacity-90">
                        {item.info}
                      </p>
                      <p className="text-sm opacity-70">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Media */}
              <div className={`pt-8 border-t border-white border-opacity-20 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
                <h3 className="text-xl font-bold mb-4">Follow Kami</h3>
                <div className="flex space-x-4">
                  <button
                    onClick={handleInstagramClick}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <FaInstagram className="text-xl" />
                    Instagram
                  </button>
                  <button
                    onClick={handleTiktokClick}
                    className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <SiTiktok className="text-xl" />
                    TikTok
                  </button>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div className={`${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-2xl p-8 border border-white border-opacity-20">
                <div className="text-center">
                  <div className="mb-6">
                    <FaWhatsapp className="text-6xl mx-auto mb-4 text-green-400" />
                    <h3 className="text-2xl font-bold mb-2">
                      Pesan Sekarang via WhatsApp
                    </h3>
                    <p className="opacity-80">
                      Dapatkan respon cepat dan konsultasi gratis dengan tim kami
                    </p>
                  </div>

                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 mb-6"
                  >
                    <FaWhatsapp className="text-2xl" />
                    Chat di WhatsApp
                  </button>

                  <div className="space-y-2 text-sm opacity-80">
                    <p>✅ Konsultasi GRATIS</p>
                    <p>✅ Respon dalam 5 menit</p>
                    <p>✅ Paket custom tersedia</p>
                  </div>
                </div>
              </div>

              {/* Emergency Info */}
              <div className="mt-6 text-center">
                <p className="text-sm opacity-70 mb-2">Untuk keperluan darurat:</p>
                <p className="text-lg font-semibold">+628561899829</p>
                <p className="text-sm opacity-70">+6285702784443</p>
              </div>
            </div>
          </div>

          {/* Bottom Message */}
          <div className={`text-center mt-16 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-white border-opacity-20">
              <p className="text-lg font-semibold mb-2">
                🌟 Tunggu apa lagi? Adventure menanti Anda!
              </p>
              <p className="opacity-80">
                Bergabunglah dengan ribuan petualang yang telah merasakan sensasi tubing bersama XGono Adventure
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
