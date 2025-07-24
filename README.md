# XGono Tubing Adventure - Landing Page

Proyek React.js untuk landing page wisata arung jeram "XGono Tubing Adventure" dengan tema warna biru yang menarik dan eye-catching.

## ✨ Fitur

- **One-page scroll** - Single page application dengan smooth scrolling
- **Parallax Scrolling** - Efek parallax pada hero section
- **Hover Effects** - Efek hover interaktif pada pricelist cards
- **Lightbox Gallery** - Galeri foto dengan lightbox functionality
- **Floating WhatsApp Button** - Tombol WhatsApp mengambang dengan tooltip
- **Responsive Design** - Optimal untuk mobile dan desktop
- **Smooth Animations** - Animasi fade-in dan slide-up saat scroll

## 🎨 Desain

- **Tema Warna**: Biru lembut dan menarik (`#2563eb`, `#3b82f6`, `#dbeafe`)
- **Typography**: Font system yang clean dan modern
- **Icons**: React Icons (FontAwesome, Simple Icons)
- **Framework CSS**: Tailwind CSS untuk styling yang konsisten

## 📱 Sections

1. **Hero Section**
   - Judul: "XGono Tubing Adventure"
   - Slogan: "Rasakan Sensasi Arung Jeram di Tengah Alam!"
   - Tombol "Pesan Sekarang" dengan link WhatsApp
   - Background image dengan parallax effect

2. **Pricelist**
   - 3 Paket: Reguler (Rp 75.000), Keluarga (Rp 125.000), Camping (Rp 200.000)
   - Cards dengan hover effects
   - Badge "Paling Populer" pada paket keluarga
   - Tombol WhatsApp pada setiap paket

3. **Galeri**
   - Grid gallery dengan 6 placeholder images
   - Lightbox functionality (klik untuk memperbesar)
   - Keyboard navigation (arrow keys, escape)
   - Hover effects pada gambar

4. **Kontak**
   - Informasi lokasi, jam operasional, kontak darurat
   - Social media buttons (Instagram, TikTok)
   - CTA card untuk WhatsApp
   - Background gradient biru

5. **Footer**
   - Company information
   - Quick navigation links
   - Social media links
   - Copyright notice

## 🚀 Teknologi

- **React 18** - Frontend framework
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library

## 📦 Instalasi

1. Clone atau download proyek ini
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan development server:
   ```bash
   npm start
   ```
4. Buka [http://localhost:3000](http://localhost:3000) di browser

## 🔧 Kustomisasi

### WhatsApp Number
Ganti nomor WhatsApp di semua komponen:
```javascript
const phoneNumber = '6281234567890'; // Ganti dengan nomor Anda
```

### Social Media Links
Update link Instagram dan TikTok di:
- `src/components/ContactSection.js`
- `src/components/Footer.js`

### Images
Ganti placeholder images dengan foto asli di:
- Hero section background
- Gallery images (6 buah)

### Content
Edit teks dan informasi di setiap komponen sesuai kebutuhan bisnis.

## 🌍 Deploy

### Vercel
1. Push code ke GitHub
2. Connect ke Vercel
3. Deploy otomatis

### Netlify
1. Build project: `npm run build`
2. Upload folder `build` ke Netlify
3. Atau connect via Git repository

## 📞 WhatsApp Integration

Semua tombol WhatsApp akan redirect ke:
```
https://wa.me/6281234567890?text=MESSAGE
```

Format pesan otomatis:
- Hero: "Halo saya ingin pesan rafting di XGono Adventure"
- Pricelist: "Halo, saya ingin pesan paket [NAMA_PAKET] di XGono Tubing Adventure"
- Contact: "Halo, saya ingin mengetahui informasi lebih lanjut tentang XGono Tubing Adventure"

## 🎯 SEO Ready

- Semantic HTML structure
- Meta descriptions (perlu ditambahkan di `public/index.html`)
- Alt texts untuk images
- Fast loading dengan optimized images

## 📱 Mobile Responsive

- Mobile-first design
- Touch-friendly buttons
- Optimized images untuk mobile
- Smooth scrolling di mobile

## 🚀 Performance

- Lazy loading images
- Optimized animations
- Minimal JavaScript bundle
- Fast Tailwind CSS

---

**© 2025 XGono Tubing Adventure** - Built with ❤️ for adventure lovers
