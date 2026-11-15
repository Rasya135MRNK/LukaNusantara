# 🎨 DESIGN SYSTEM — LukaNusantara

Acuan visual untuk semua halaman. Konfigurasi Tailwind yang sama dipasang
di `<head>` setiap file HTML (lihat blok `tailwind.config`).

## 1. Identitas

| Aspek | Keputusan |
|-------|-----------|
| Mood | Dark-eco: gelap tenang seperti malam hutan tropis, aksen hijau daun yang hidup |
| Nada visual | Editorial-data: angka besar monospace, kartu bergaris tipis, banyak ruang |
| Sinyal bahaya | Amber/oranye hanya untuk ikon peringatan & penanda bencana |

## 2. Warna (Tailwind config: `colors`)

| Token | Hex | Penggunaan |
|-------|-----|------------|
| `deep.950` | `#07120D` | Latar paling gelap (body) |
| `deep.900` | `#0B1A13` | Latar section berselang-seling |
| `deep.800` | `#0F2418` | Kartu / panel |
| `deep.700` | `#153223` | Kartu hover, border lembut |
| `leaf.300` | `#6EE7B7` | Ikon sekunder, hover link |
| `leaf.400` | `#34D399` | **Aksen utama** — tombol, angka statistik, marker |
| `teal.400` | `#2DD4BF` | Aksen sekunder (gradien, garis kontur) |
| `amber.400` | `#FBBF24` | Ikon peringatan/ekspektasi |
| `sand` | `#E7E4D9` | Teks utama di atas latar gelap |
| `mist` | `#9CB4A7` | Teks sekunder/deskripsi |
| `rose.400` | `#FB7185` | Error form |

## 3. Tipografi (Google Fonts)

| Font | Kelas | Penggunaan |
|------|-------|------------|
| Nothing You Could Do | `font-display` | Judul besar (h1–h3, logo) — handwriting, **wajib weight 400** (jangan dibold) |
| Space Grotesk | `font-sg` | Font judul bawaan — semua elemen display di halaman Eksplorasi (logo, footer, judul kartu & modal), **kecuali** h1 & "Dulu vs Sekarang" yang tetap Nothing You Could Do |
| Playwrite AU SA Guides | `font-team` | Nama tim di halaman About — handwriting garis bantu (weight 400) |
| Orbitron | `font-orb` | Nama lembaga sumber data di halaman About (BNPB, BMKG, dst.) — futuristik |
| Special Elite | `font-elite` | Judul babak cerita di halaman Cerita — mesin ketik (weight 400) |
| Rough Typewriter | sela cerita | Kalimat interlude "bukalah matamu…" di halaman Cerita — self-host `assets/fonts/rough_typewriter.otf` (JibbaJabba Fonts, bebas personal, weight 400) |
| Shadows Into Light | `font-shadows` | Judul form "Laporan & Aspirasi Lingkungan" di halaman Contact — tulisan tangan tipis (weight 400) |
| Indie Flower | `font-indie` | Judul kartu aksi harian ("Bawa Tumbler Sendiri", dst.) di halaman Contact — tulisan tangan (weight 400, lisensi OFL Google Fonts: bebas termasuk komersial) |
| Inter | `font-body` | Paragraf, UI |
| JetBrains Mono | `font-mono` | Angka statistik, label data, kode |

Skala:
- H1: `text-4xl md:text-6xl font-bold tracking-tight`
- H2 section: `text-2xl md:text-4xl font-bold`
- Label overline: `font-mono text-xs uppercase tracking-[0.3em] text-leaf-400`
- Body: `text-sm md:text-base text-mist leading-relaxed`

## 4. Komponen Berulang

- **Tombol primer:** `bg-leaf-400 text-deep-950 font-semibold rounded-full px-6 py-3 hover:bg-leaf-300 transition`
- **Tombol ghost:** `border border-deep-600 text-sand rounded-full px-6 py-3 hover:border-leaf-400 hover:text-leaf-300 transition`
- **Kartu:** `bg-deep-800 border border-deep-700 rounded-2xl overflow-hidden hover:border-leaf-400/60 transition`
- **Chip filter:** `font-mono text-xs px-4 py-2 rounded-full border border-deep-600 hover:border-leaf-400 text-mist` (aktif: `bg-leaf-400 text-deep-950 border-leaf-400`)
- **Overline section:** label kecil di atas setiap judul section
- **Navbar:** fixed, `bg-deep-950/80 backdrop-blur border-b border-deep-700`
- **Footer:** kolom identitas, navigasi, atribusi sumber data

## 5. Motion (Anime.js v3)

| Efek | Parameter acuan |
|------|-----------------|
| Easing default | `easeOutExpo` (enter), `easeInOutQuad` (loop halus) |
| Durasi enter | `600–900 ms` |
| Stagger | `70–100 ms` |
| Line drawing | `strokeDashoffset` ke `0`, durasi `1400–2400 ms` |
| Counter | durasi `2000 ms`, format `id-ID` |
| Grid stagger | `translateY(24px) → 0` + opacity, delay `stagger: 70` |
| Trigger | `IntersectionObserver` — animasi hanya sekali (`once`) |

## 6. Ikon & Foto

- Ikon: [Lucide](https://lucide.dev) — `<i data-lucide="waves"></i>`, dirender via `refreshIcons()`
- Foto: Unsplash/Pexels hotlink; **wajib** pakai `onerror="__imgFallback(this)"` agar ada placeholder lokal saat offline
