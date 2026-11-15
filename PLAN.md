# 📋 PLAN.md — Rencana Kerja & Pembagian Tugas LukaNusantara

> Dokumen internal tim. Update status tiap tugas dengan ✔ saat selesai.

## 👥 Pembagian Tugas

| Role | Anggota | Lingkup |
|------|---------|---------|
| **Dev A** | Muhamad Rasya Naufal Khadafi | Home (`index.html`), animasi inti (`animations.js`), peta interaktif, data `REGIONS` + `STATS` |
| **Dev B** | Tamam Ni'amillah | Eksplorasi (`eksplorasi.html`), Contact (`contact.html`), data `GALLERY` + `ACTIONS` |

Sisa pekerjaan (`about.html`, kurasi foto) diambil siapa yang lebih dulu selesai.

---

## Tahap 0 — Fondasi (selesai oleh Dev A, commit bersama)

| # | Tugas | Status |
|---|-------|--------|
| 0.1 | `git init` + `.gitignore` | ✔ |
| 0.2 | Template `<head>` seragam (Tailwind CDN + config, Anime.js v3, Lucide, Google Fonts) di 4 halaman | ✔ |
| 0.3 | `js/data.js` — schema lengkap: `REGIONS`, `STATS`, `TIMELINE`, `SOURCES`, `TEAM`, `GALLERY`, `ACTIONS` | ✔ (lihat kontrak di bawah) |
| 0.4 | Navbar + Footer seragam di semua halaman | ✔ |
| 0.5 | `css/style.css` (scrollbar, pulse marker, utilitas) | ✔ |
| 0.6 | `DESIGN_SYSTEM.md` (palet, tipografi, komponen) | ✔ |

## Tahap 1 — Pekerjaan Paralel

### Dev A (Rasya)
| # | Tugas | File | Status |
|---|-------|------|--------|
| A1 | Hero SVG line drawing + text reveal stagger | `index.html`, `js/animations.js` | ✔ |
| A2 | Counter statistik (IntersectionObserver + anime) | `index.html`, `js/animations.js` | ✔ |
| A3 | Peta SVG stylized 5 pulau + marker pulse | `index.html` | ✔ |
| A4 | Klik wilayah → panel detail | `js/main.js` | ✔ |
| A5 | Data `REGIONS` + `STATS` terisi | `js/data.js` | ✔ |

### Dev B (Tamam) — TODO
| # | Tugas | File | Status |
|---|-------|------|--------|
| B1 | Isi data `GALLERY` (±12 kartu, 4 kategori) | `js/data.js` | ✔ |
| B2 | Filter kategori + stagger grid | `eksplorasi.html`, `js/main.js` → `initEksplorasi()` | ✔ |
| B3 | Before-after slider (pointer drag) | `eksplorasi.html` | ✔ |
| B4 | Modal detail edukasi | `eksplorasi.html` | ✔ |
| B5 | Isi data `ACTIONS` | `js/data.js` | ✔ |
| B6 | Kalkulator komitmen hijau + progress bar | `contact.html`, `js/main.js` → `initContact()` | ✔ |
| B7 | Form laporan: validasi + animasi konfirmasi | `contact.html` | ✔ |

### Sisa (opsional, siapa duluan)
| # | Tugas | File | Status |
|---|-------|------|--------|
| C1 | `about.html`: misi, timeline scroll-triggered, sumber data, tim | `about.html`, `js/main.js` → `initAbout()` | ✔ |
| C2 | Isi data `TIMELINE`, `SOURCES`, `TEAM` | `js/data.js` | ✔ (data dasar sudah diisi Dev A) |
| C3 | Kurasi foto Unsplash + fallback placeholder | `js/data.js` | ⬜ |

### Tambahan (hasil keputusan tim — scrollytelling, dikerjakan Dev A)
| # | Tugas | File | Status |
|---|-------|------|--------|
| D1 | Halaman scrollytelling crossfade 7 babak "Nusantara yang Memudar" | `cerita.html` | ✔ |
| D2 | Mesin scroll-progress + fallback reduced-motion | `js/main.js` → `initCerita()` | ✔ |
| D3 | Kontrak data `STORY` + link navbar/footer "Cerita" di semua halaman | `js/data.js`, `css/style.css`, 5 halaman | ✔ |

---

## Kontrak `js/data.js` (JANGAN ubah nama key tanpa sepakat)

```js
STATS    = [ { value, suffix, label, source } ]        // dipakai index.html (Dev A selesai)
REGIONS  = { <id>: { name, icon, disaster, tagline, desc, fakta[], penyebab[], mitigasi[], markerX, markerY } }  // index.html
STORY    = [ { id, title, text, image, alt, filter, overlay } ]  // cerita.html (Dev A) — filter CSS & kepekatan overlay per babak
GALLERY  = [ { id, title, category, region, image, alt, desc, fakta[], penyebab[], aksi[] } ]  // TODO Dev B
ACTIONS  = [ { id, icon, title, desc, co2, plastic } ]  // TODO Dev B (co2 = kg CO₂e/tahun)
TIMELINE = [ { icon, title, desc } ]                    // about.html
SOURCES  = [ { name, desc, url } ]                      // about.html
TEAM     = [ { name, role, desc } ]                     // about.html
```

## Kontrak `js/main.js` & `js/animations.js`

- `main.js` mem-dispatch per halaman lewat `<body data-page="home|eksplorasi|about|contact">`.
- Dev B hanya mengisi fungsi **`initEksplorasi()`** dan **`initContact()`** (stub sudah disediakan).
- Helper animasi bersama dari `animations.js` (jangan duplikat): `revealWords()`, `countUp()`, `observeOnce()`, `animateIn()`, `setProgress()`, `refreshIcons()`.

## Aturan Kerja Tim

1. **Satu file, satu pemilik.** Dev A: `index.html`, `animations.js`, bagian `REGIONS`/`STATS`. Dev B: `eksplorasi.html`, `contact.html`, bagian `GALLERY`/`ACTIONS`, fungsi `initEksplorasi`/`initContact`.
2. Konflik merge di `data.js`/`main.js` dihindari dengan hanya mengedit bagian masing-masing.
3. Komit kecil & sering, pakai prefix: `feat:`, `fix:`, `chore:`, `docs:`.

## Urutan Commit

```text
chore: fondasi proyek            (Tahap 0)
feat: home page (dev A)          (Tahap 1 - Dev A)
feat: eksplorasi (dev B)         (Tahap 1 - Dev B)
feat: contact (dev B)
feat: about + integrasi
fix: polish & verifikasi
```

## Tahap 2 — Verifikasi Bersama

- [ ] `python3 -m http.server` → keempat halaman terbuka, konsol bebas error
- [ ] Peta klik, filter galeri, slider, modal, kalkulator, validasi form berfungsi
- [ ] Kepatuhan konten: bebas SARA/hoaks, semua angka mencantumkan sumber
