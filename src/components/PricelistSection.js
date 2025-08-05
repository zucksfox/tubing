import React from 'react';
import { FaCheck, FaWhatsapp, FaStar } from 'react-icons/fa';

const PricelistSection = () => {

  const handleWhatsAppClick = (packageName) => {
    const phoneNumber = '6287719048030';
    const message = `Halo, saya ingin pesan paket ${packageName} di XGono Tubing Adventure`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const packages = [
    {
      name: "Paket Reguler",
      price: "Rp 75.000",
      duration: "2-3 Jam",
      popular: false,
      features: [
        "Tubing 5 km",
        "Peralatan lengkap (helm, life jacket)",
        "Pemandu berpengalaman",
        "Dokumentasi foto",
        "Snack ringan"
      ]
    },
    {
      name: "Paket Keluarga",
      price: "Rp 125.000",
      duration: "3-4 Jam",
      popular: true,
      features: [
        "Tubing 7 km",
        "Peralatan lengkap untuk keluarga",
        "Pemandu khusus keluarga",
        "Dokumentasi foto & video",
        "Makan siang",
        "Area bermain anak",
        "Asuransi kecelakaan"
      ]
    },
    {
      name: "Paket Camping",
      price: "Rp 200.000",
      duration: "1 Hari 1 Malam",
      popular: false,
      features: [
        "Tubing 10 km",
        "Peralatan camping lengkap",
        "3x makan (malam, pagi, siang)",
        "Api unggun",
        "Games outbound",
        "Dokumentasi lengkap",
        "Tenda dan sleeping bag"
      ]
    }
  ];

  return (
    <section id="pricelist" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}

          {/* Price Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:border-blue-200 ${
                  pkg.popular ? 'ring-4 ring-blue-primary ring-opacity-20' : ''
                }`}
              >
                {/* Popular badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-blue-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <FaStar className="text-xs" />
                      Paling Populer
                    </div>
                  </div>
                )}

                <div className="p-8">
                  {/* Package name */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {pkg.name}
                  </h3>
                  
                  {/* Duration */}
                  <p className="text-gray-500 mb-4">{pkg.duration}</p>
                  
                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-blue-primary">
                      {pkg.price}
                    </span>
                    <span className="text-gray-500 ml-2">/orang</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <FaCheck className="text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleWhatsAppClick(pkg.name)}
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 hover:transform hover:scale-105 ${
                      pkg.popular
                        ? 'bg-blue-primary hover:bg-blue-dark text-white hover:shadow-lg'
                        : 'bg-blue-light hover:bg-blue-primary text-blue-primary hover:text-white hover:shadow-lg'
                    }`}
                  >
                    <FaWhatsapp />
                    Pesan Sekarang
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Additional info */}
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">
              🎯 Gratis konsultasi dan diskusi paket sesuai kebutuhan Anda
            </p>
            <p className="text-sm text-gray-500">
              * Harga dapat berubah sewaktu-waktu. Hubungi kami untuk informasi terbaru.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricelistSection;
