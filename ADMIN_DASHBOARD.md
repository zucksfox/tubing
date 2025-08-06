# Dashboard Admin XGono Tubing Adventure

## 🎯 Overview
Dashboard admin yang memungkinkan pengelola website untuk mengatur konten website seperti harga paket, gambar galeri, dan video profil tanpa perlu coding.

## 🚀 Cara Mengakses Dashboard

### 1. Akses melalui URL
Buka browser dan akses:
```
http://localhost:3000/admin
```
atau di production:
```
https://yourwebsite.com/admin
```

### 2. Login
Gunakan kredensial berikut:
- **Username:** `admin`
- **Password:** `xgono2024`

> ⚠️ **Penting:** Ganti password default di file `src/admin/utils/auth.js` untuk keamanan.

## 🎛️ Fitur Dashboard

### 1. Dashboard Utama
- Ringkasan statistik website
- Paket populer
- Aktivitas terbaru
- Informasi sistem

### 2. Kelola Harga Paket
- **Tambah paket baru** - Buat paket wisata baru
- **Edit paket** - Ubah nama, harga, durasi, dan fitur
- **Hapus paket** - Hapus paket yang tidak diperlukan
- **Tandai populer** - Tandai paket sebagai "Paling Populer"

#### Cara Menambah Paket Baru:
1. Klik tombol "Tambah Paket"
2. Isi form:
   - Nama Paket (contoh: "Paket Family")
   - Harga (contoh: "Rp 125.000")
   - Durasi (contoh: "2-3 Jam")
   - Centang "populer" jika ingin ditandai sebagai paket populer
   - Tambah fitur-fitur paket
3. Klik "Simpan Paket"

### 3. Kelola Gambar Galeri
- **Upload gambar baru** - Upload dari komputer atau gunakan URL
- **Edit gambar** - Ubah judul dan deskripsi
- **Preview gambar** - Lihat gambar dalam mode fullscreen
- **Hapus gambar** - Hapus gambar yang tidak diperlukan

#### Cara Menambah Gambar:
1. Klik tombol "Tambah Gambar"
2. Upload file gambar atau masukkan URL gambar
3. Isi judul dan alt text untuk SEO
4. Preview gambar di sisi kanan
5. Klik "Simpan Gambar"

#### Format Gambar yang Didukung:
- PNG, JPG, JPEG
- Maksimal 10MB
- Resolusi yang direkomendasikan: minimal 800x600px

### 4. Kelola Video Profil
- **Update video YouTube** - Ganti video profil perusahaan
- **Edit judul dan deskripsi** - Ubah informasi video
- **Preview video** - Lihat video secara langsung

#### Cara Mengganti Video:
1. Klik tombol "Edit Video"
2. Masukkan URL YouTube atau Video ID (11 karakter)
3. Contoh URL: `https://www.youtube.com/watch?v=UuPaS81n0xg`
4. Atau hanya ID: `UuPaS81n0xg`
5. Ubah judul dan deskripsi jika diperlukan
6. Klik "Simpan"

## 💾 Penyimpanan Data

Data disimpan di browser menggunakan **localStorage**. Ini berarti:
- ✅ Perubahan tersimpan secara otomatis
- ✅ Data bertahan setelah browser ditutup
- ⚠️ Data hilang jika browser cache dibersihkan
- ⚠️ Data tidak tersinkronisasi antar perangkat

### Untuk Production:
Ganti sistem penyimpanan dengan database yang tepat:
1. Edit file `src/data/siteData.js`
2. Implementasikan API untuk save/load data
3. Gunakan database seperti MongoDB, MySQL, atau PostgreSQL

## 🔐 Keamanan

### Default Credentials:
- Username: `admin`
- Password: `xgono2024`

### Mengubah Password:
1. Buka file `src/admin/utils/auth.js`
2. Ubah nilai `ADMIN_CREDENTIALS`:
```javascript
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'password_baru_anda' // Ganti dengan password yang kuat
};
```

### Rekomendasi Keamanan:
- ✅ Gunakan password yang kuat
- ✅ Implementasikan hash password
- ✅ Gunakan sistem autentikasi JWT
- ✅ Tambahkan rate limiting
- ✅ Implementasikan HTTPS

## 📱 Responsive Design
Dashboard mendukung akses dari:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile Phone

## 🔄 Update Otomatis Website
Setiap perubahan yang disimpan di dashboard akan langsung:
- ✅ Update website utama
- ✅ Tampil notifikasi sukses
- ✅ Data tersimpan otomatis

## 🛠️ Troubleshooting

### Dashboard tidak bisa diakses:
1. Pastikan server development berjalan: `npm start`
2. Cek URL: `http://localhost:3000/admin`
3. Bersihkan browser cache

### Login gagal:
1. Pastikan username dan password benar
2. Cek file `src/admin/utils/auth.js`
3. Bersihkan localStorage browser

### Gambar tidak tampil:
1. Pastikan URL gambar valid dan dapat diakses
2. Cek ukuran file (maksimal 10MB)
3. Gunakan format PNG, JPG, atau JPEG

### Video tidak tampil:
1. Pastikan video YouTube bersifat public
2. Cek Video ID (harus 11 karakter)
3. Pastikan URL YouTube valid

## 📞 Support
Jika mengalami masalah, hubungi developer atau cek dokumentasi React.js dan Tailwind CSS.

## 🎨 Kustomisasi
Dashboard dapat dikustomisasi dengan mengubah:
- **Warna:** Edit file CSS atau konfigurasi Tailwind
- **Layout:** Modify komponen di folder `src/admin/`
- **Fitur:** Tambah menu baru di `AdminLayout.js`
- **Branding:** Ubah logo dan nama di header

---

**Selamat mengelola website XGono Tubing Adventure! 🎉**
