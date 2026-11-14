# 📄 PRODUCT REQUIREMENTS DOCUMENT (PRD) — LUKANUSANTARA

## 1. Informasi Umum
* **Judul Website:** LukaNusantara: Peta Interaktif Bencana Ekologis dan Edukasi Mitigasi Lingkungan Indonesia
* **Tema Lomba:** EcoDigital For Environment: Web Design Competition[cite: 1]
* **Sub-Tema:** Edukasi Lingkungan (1) & Isu Lingkungan Global (8)[cite: 1]
* **Konsep Utama:** Website *interactive storytelling* yang menampilkan realitas dampak kerusakan lingkungan dan bencana ekologis di Indonesia berbasis data resmi, lalu mengarahkan pengguna pada langkah mitigasi dan pemulihan.
* **Kepatuhan Konten:** Bebas unsur SARA, pornografi, kekerasan/korban jiwa, hoaks, dan pencemaran nama baik. Fokus murni pada fenomena ekologis dan data ilmiah (BNPB, BMKG, KLHK).

---

## 2. Struktur Halaman & Fitur Interaktif (Anime.js Showcase)

Website terdiri dari **4 halaman wajib** sesuai ketentuan lomba[cite: 4]:

### A. Halaman Home (`index.html`)
1. **Hero Section dengan SVG Line Drawing (Anime.js):**
   * Animasi garis kontur/topografi atau siluet kepulauan Indonesia yang tergambar otomatis saat halaman dimuat (`strokeDashoffset`).
   * *Text reveal animation* per kata menggunakan *staggering* Anime.js.
2. **Counter Statistik Krisis Ekologis (Anime.js Number Counter):**
   * Angka statistik dampak lingkungan (contoh: luas deforestasi, kejadian banjir/kekeringan tahunan) yang menghitung naik secara dinamis saat masuk ke *viewport* (menggunakan `IntersectionObserver` + `anime()`).
3. **Peta Interaktif Bencana Ekologis Indonesia:**
   * Peta SVG Indonesia dengan titik indikator berdenyut (*pulse animation* dari Anime.js).
   * Saat pengguna mengklik titik/pulau (Sumatera, Jawa, Kalimantan, Sulawesi, Papua), muncul panel detail jenis bencana ekologis dominan, penyebab ilmiah, dan langkah mitigasinya.

### B. Halaman Konten / Galeri (`eksplorasi.html`)
1. **Filter Kategori Bencana (Anime.js Stagger Grid):**
   * Filter interaktif (`Semua`, `Banjir Rob`, `Deforestasi`, `Kekeringan`, `Limbah Plastik`) dengan transisi kartu keluar-masuk yang mulus.
2. **Interactive Before-After Comparison Slider:**
   * Fitur menggeser gambar kondisi kawasan hutan atau pesisir Indonesia (Dulu vs Sekarang) untuk menunjukkan perubahan ekosistem secara visual.
3. **Artikel & Modal Detail Edukasi:**
   * Setiap kartu bencana dapat diklik untuk membuka modal informasi mendalam: Fakta Data, Penyebab Ekologis, dan Aksi Pencegahan.

### C. Halaman About (`about.html`)
1. **Latar Belakang & Misi LukaNusantara:**
   * Penjelasan mengapa isu bencana ekologis penting disuarakan melalui media digital[cite: 1].
2. **Timeline Edukasi (Scroll-Triggered Animation):**
   * Alur visual interaktif: *Aktivitas Manusia $\rightarrow$ Degradasi Ekosistem $\rightarrow$ Bencana Ekologis $\rightarrow$ Aksi Mitigasi*.
3. **Transparansi Sumber Data & Profil Tim:**
   * Daftar referensi lembaga resmi (BNPB, BMKG, KLHK) sebagai jaminan bebas hoaks[cite: 4], serta profil pembuat karya.

### D. Halaman Contact & Aksi (`contact.html`)
1. **Kalkulator / Simulasi Komitmen Hijau (Interaktif):**
   * Pengguna dapat memilih aksi harian sederhana (mengurangi plastik, hemat energi, tanam pohon) dan melihat estimasi dampak positifnya dengan animasi *progress bar* Anime.js.
2. **Formulir Laporan / Aspirasi Lingkungan:**
   * Form interaktif dengan validasi JavaScript dan animasi konfirmasi pengiriman pesan.