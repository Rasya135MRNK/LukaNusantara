# 🌏 LukaNusantara — EcoDigital For Environment

Interaktif Website bertema pelestarian lingkungan yang mengangkat realitas bencana ekologis di Indonesia berbasis data ilmiah, dilengkapi dengan eksplorasi peta interaktif, komparasi perubahan ekosistem, dan edukasi mitigasi.

---

## 👥 Informasi Tim
* **Nama Tim:** [dah lah]
* **Anggota:**
  1. [Muhamad Rasya Naufal Khadafi] — [462025611050 / Universitas Darussalam Gontor]
  2. [Tamam ni'amillah] — [462025611095 / Universitas Darussalam Gontor]

---

## 🛠️ Tech Stack & Library (100% Open-Source / Gratis)
* **Struktur & Markup:** HTML5 Semantik
* **Styling:** Tailwind CSS (self-hosted v3.4.16 di `assets/vendor/`) + Custom CSS (`style.css`)
* **Interaktivitas & Logika:** Vanilla JavaScript (ES6+)
* **Engine Animasi:** [Anime.js](https://animejs.com/) (MIT License) — digunakan untuk *SVG line drawing*, *staggered grid*, *number counter*, dan transisi UI.
* **Ikonografi:** [Lucide Icons](https://lucide.dev/) (ISC License)
* **Tipografi:** Google Fonts (`Space Grotesk`, `Inter`, `JetBrains Mono`)

---

## 📂 Struktur Folder Proyek

```text
webdesign_namaTim_technoversary_vol.II/
├── index.html          # Halaman Home (Hero SVG, Statistik, Peta Interaktif)
├── eksplorasi.html     # Halaman Konten/Galeri (Filter Bencana & Before-After Slider)
├── about.html          # Halaman About (Misi, Timeline Ekologis, Sumber Data)
├── contact.html        # Halaman Contact (Simulasi Aksi Hijau & Form Pesan)
├── css/
│   └── style.css       # Custom styling, scrollbar, & animasi pendukung
├── js/
│   ├── data.js         # Data terstruktur bencana ekologis & sumber resmi
│   ├── animations.js   # Konfigurasi animasi Anime.js (SVG, Stagger, Counter)
│   └── main.js         # Logika interaktif (Peta, Filter Galeri, Slider, Modal)
├── assets/
│   ├── images/         # Aset foto dokumentasi bebas royalti (Unsplash/Pexels)
│   └── svg/            # Aset peta SVG Indonesia buatan sendiri / open-source
├── DESIGN_SYSTEM.md    # Dokumentasi sistem desain visual
├── PRD.md              # Product Requirements Document
└── README.md           # Dokumentasi utama proyek
