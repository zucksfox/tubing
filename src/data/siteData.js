// Data konfigurasi website yang dapat dikelola melalui admin dashboard
export const siteData = {
  // Data paket harga
  packages: [
    {
      id: 1,
      name: "Paket Reguler",
      price: "Rp 75.000",
      duration: "1-1,5 Jam",
      popular: false,
      features: [
        "Tubing 2 km",
        "Peralatan lengkap (helm, life jacket)",
        "Pemandu berpengalaman",
        "Dokumentasi foto",
        "Snack ringan"
      ]
    },
    {
      id: 2,
      name: "Paket Premium",
      price: "Rp 150.000",
      duration: "1-1,5 Jam",
      popular: true,
      features: [
        "Tubing 2 km",
        "Welcome Drink & Snack",
        "River Tubing",
        "Fun Games",
        "Pemandu",
        "Sound System",
        "Dokumentasi foto",
        "Makan Siang",
        "Kelapa Muda",
        "Tempat Transit",
        "Asuransi"
      ]
    },
    {
      id: 3,
      name: "Paket Camping",
      price: "Rp 200.000",
      duration: "1-1,5 Jam",
      popular: false,
      features: [
        "Tubing 2 km",
        "Peralatan camping lengkap",
        "3x makan (malam, pagi, siang)",
        "Api unggun",
        "Games outbound",
        "Dokumentasi lengkap",
        "Tenda dan sleeping bag"
      ]
    }
  ],

  // Data galeri gambar
  galleryImages: [
    {
      id: 1,
      src: "tubing1.jpg",
      alt: "Petualangan Tubing XGono - Keseruan di Sungai",
      title: "Tubing Adventure 1"
    },
    {
      id: 2,
      src: "tubing2.jpg",
      alt: "Tubing Adventure - Momen Bersama Keluarga",
      title: "Tubing Adventure 2"
    },
    {
      id: 3,
      src: "tubing3.jpg",
      alt: "XGono Tubing - Sensasi Menantang Adrenalin",
      title: "Tubing Adventure 3"
    }
  ],

  // Data video
  videoProfile: {
    youtubeVideoId: "UuPaS81n0xg",
    title: "Profil XGono Adventure",
    description: "Saksikan video profil kami yang menampilkan keseruan dan pengalaman tak terlupakan di XGono Tubing Adventure."
  },

  // Konfigurasi kontak
  contact: {
    whatsappNumber: "6287719048030",
    address: "XGono Tubing Adventure Location",
    email: "info@xgono-adventure.com"
  }
};

// Fungsi untuk menyimpan data (dalam real app, ini akan menggunakan API)
export const saveData = (data) => {
  try {
    localStorage.setItem('xgono_site_data', JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving data:', error);
    return false;
  }
};

// Fungsi untuk memuat data
export const loadData = () => {
  try {
    const savedData = localStorage.getItem('xgono_site_data');
    if (savedData) {
      return JSON.parse(savedData);
    }
    return siteData;
  } catch (error) {
    console.error('Error loading data:', error);
    return siteData;
  }
};
