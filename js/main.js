/* ============================================================
   LukaNusantara — js/main.js
   Dispatcher per halaman via <body data-page="...">.

   Pemilik bagian (lihat PLAN.md):
   - Dev A (Rasya) : initHome (hero, statistik, peta), initNav
   - Dev B (Tamam) : initEksplorasi, initContact  ← cari "TODO Dev B"
   ============================================================ */

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* ------------------------------------------------------------
   Fallback gambar offline: ganti <img> gagal dengan placeholder
   SVG lokal (gradient + label). Pakai di semua <img> halaman:
   <img ... onerror="__imgFallback(this)">
   ------------------------------------------------------------ */
window.__imgFallback = function (img) {
  img.onerror = null;
  const label = (img.alt || "Ilustrasi LukaNusantara").slice(0, 42);
  const svg =
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>` +
    `<defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>` +
    `<stop offset='0' stop-color='#0F2418'/><stop offset='1' stop-color='#153223'/>` +
    `</linearGradient></defs>` +
    `<rect width='800' height='500' fill='url(%23g)'/>` +
    `<g fill='none' stroke='%2334D399' stroke-opacity='0.5' stroke-width='2'>` +
    `<path d='M80 380 Q 250 260 420 340 T 720 300'/>` +
    `<path d='M60 420 Q 260 320 460 390 T 760 350'/>` +
    `</g>` +
    `<text x='40' y='470' fill='%239CB4A7' font-family='monospace' font-size='18'>${label}</text>` +
    `</svg>`;
  img.src = "data:image/svg+xml;charset=utf-8," + svg.replace(/#/g, "%23").replace(/'/g, "'");
};

/* ============================================================
   NAVBAR — toggle menu mobile (semua halaman)
   ============================================================ */
function initNav() {
  const toggle = $("#nav-toggle");
  const menu = $("#nav-menu-mobile");
  if (!toggle || !menu) return;
  toggle.addEventListener("click", () => {
    const open = !menu.classList.contains("hidden");
    menu.classList.toggle("hidden", open);
    toggle.setAttribute("aria-expanded", String(!open));
  });
}

/* ============================================================
   HOME — hero, statistik, peta interaktif  (Dev A)
   ============================================================ */

/* Statistik krisis: kartu + counter saat masuk viewport */
function renderStats() {
  const wrap = $("#stats-grid");
  if (!wrap || !SITE_DATA.STATS.length) return;
  wrap.innerHTML = SITE_DATA.STATS.map(
    (s, i) => `
    <div class="stat-card bg-deep-800 border border-deep-700 rounded-2xl p-6 md:p-8 opacity-0">
      <p class="font-mono text-3xl md:text-4xl text-leaf-400 font-bold">
        <span class="stat-number" data-value="${s.value}">0</span><span class="stat-suffix text-lg text-sand">${s.suffix}</span>
      </p>
      <p class="mt-3 text-sm md:text-base text-mist leading-relaxed">${s.label}</p>
      <p class="mt-4 font-mono text-[11px] uppercase tracking-widest text-mist/60">Sumber: ${s.source}</p>
    </div>`
  ).join("");

  $$(".stat-card", wrap).forEach((card) => {
    ANIM.observeOnce(card, (el) => {
      el.style.opacity = "1";
      ANIM.animateIn(el, { y: 28, stagger: 0 });
      const num = $(".stat-number", el);
      ANIM.countUp(num, Number(num.dataset.value));
    }, 0.35);
  });
}

/* Marker wilayah di atas peta */
function renderMap() {
  const layer = $("#map-markers");
  if (!layer) return;
  layer.innerHTML = Object.entries(SITE_DATA.REGIONS)
    .map(
      ([id, r]) => `
    <button class="marker-btn absolute -translate-x-1/2 -translate-y-1/2 group"
            data-region="${id}"
            style="left:${r.markerX}%; top:${r.markerY}%"
            aria-label="Wilayah ${r.name}">
      <span class="marker-pulse absolute inset-0 -m-2 rounded-full bg-leaf-400/40 pointer-events-none"></span>
      <span class="marker-dot relative block w-4 h-4 rounded-full bg-leaf-400 border-2 border-deep-950 transition-transform duration-200 group-hover:scale-125"></span>
      <span class="absolute left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 rounded-full bg-deep-950/90 border border-deep-700 font-mono text-[10px] uppercase tracking-widest text-sand opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        ${r.name}
      </span>
    </button>`
    )
    .join("");

  $$(".marker-btn", layer).forEach((btn) => {
    btn.addEventListener("click", () => selectRegion(btn.dataset.region));
  });
}

/* Panel detail wilayah (klik marker) */
function selectRegion(id) {
  const region = SITE_DATA.REGIONS[id];
  const panel = $("#region-panel");
  if (!region || !panel) return;

  $$(".marker-btn").forEach((b) => b.classList.toggle("is-active", b.dataset.region === id));

  panel.innerHTML = `
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-leaf-400">Wilayah: ${region.name}</p>
        <h3 class="mt-2 font-display text-2xl md:text-3xl font-bold text-sand flex items-center gap-3">
          <i data-lucide="${region.icon}" class="w-6 h-6 text-amber-400"></i>${region.disaster}
        </h3>
        <p class="mt-1 text-sm text-mist/80 italic">${region.tagline}</p>
      </div>
    </div>

    <p class="mt-4 text-sm md:text-base text-mist leading-relaxed">${region.desc}</p>

    <div class="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3">
      ${region.fakta
        .map(
          (f) => `
        <div class="bg-deep-950/60 border border-deep-700 rounded-xl p-3">
          <p class="font-mono text-sm text-leaf-300 font-semibold">${f.value}</p>
          <p class="mt-1 text-[11px] text-mist/70 leading-snug">${f.label}</p>
        </div>`
        )
        .join("")}
    </div>

    <div class="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <p class="font-mono text-[11px] uppercase tracking-widest text-amber-400 mb-2">Penyebab ilmiah</p>
        <ul class="space-y-2">
          ${region.penyebab
            .map(
              (p) => `
            <li class="flex gap-2 text-sm text-mist">
              <i data-lucide="chevron-right" class="w-4 h-4 text-amber-400 shrink-0 mt-0.5"></i>${p}
            </li>`
            )
            .join("")}
        </ul>
      </div>
      <div>
        <p class="font-mono text-[11px] uppercase tracking-widest text-leaf-400 mb-2">Langkah mitigasi</p>
        <ul class="space-y-2">
          ${region.mitigasi
            .map(
              (m) => `
            <li class="flex gap-2 text-sm text-mist">
              <i data-lucide="sprout" class="w-4 h-4 text-leaf-400 shrink-0 mt-0.5"></i>${m}
            </li>`
            )
            .join("")}
        </ul>
      </div>
    </div>`;

  ANIM.refreshIcons();
  ANIM.animateIn(panel.children, { y: 18, stagger: 60 });
}

/* ============================================================
   HOME init
   ============================================================ */
function initHome() {
  /* Hero: kontur tergambar + judul per kata */
  const heroSvg = $("#hero-svg");
  if (heroSvg) ANIM.drawLines(heroSvg, { duration: 2400, stagger: 140 });

  const title = $("#hero-title");
  if (title) ANIM.revealWords(title, 350);
  const subtitle = $("#hero-sub");
  if (subtitle) ANIM.revealWords(subtitle, 900);

  /* Statistik */
  renderStats();

  /* Peta */
  renderMap();
  const firstRegion = Object.keys(SITE_DATA.REGIONS)[0];
  if (firstRegion) selectRegion(firstRegion);
}

/* ============================================================
   EKSPLORASI — filter, slider, modal  (Dev B)
   ============================================================ */
function initEksplorasi() {
  // TODO Dev B (tugas B2–B4):
  // 1. Render chip filter dari kategori unik SITE_DATA.GALLERY (+"Semua")
  // 2. Render grid kartu galeri; animasikan dengan ANIM.animateIn()
  // 3. Before-after slider: pointer drag pada .ba-handle (touch-action sudah diatur CSS)
  // 4. Modal: klik kartu → isi #detail-modal dari item → ANIM.refreshIcons()
  //    Jangan lupa ikon <i data-lucide="..."> dan onerror="__imgFallback(this)" pada <img>.
}

/* ============================================================
   ABOUT — timeline, sumber data, tim  (opsional)
   ============================================================ */
function initAbout() {
  // TODO (tugas C1):
  // 1. Render SITE_DATA.TIMELINE → #timeline (scroll reveal per item: ANIM.observeOnce + ANIM.animateIn)
  // 2. Render SITE_DATA.SOURCES → #sources-list (kartu + link eksternal)
  // 3. Render SITE_DATA.TEAM → #team-grid
}

/* ============================================================
   CONTACT — kalkulator hijau & form  (Dev B)
   ============================================================ */
function initContact() {
  // TODO Dev B (tugas B6–B7):
  // 1. Render SITE_DATA.ACTIONS → #actions-list (checkbox kartu: icon, title, desc,
  //    "hemat X kg CO₂e + Y plastik/tahun")
  // 2. Saat checklist berubah: jumlahkan co2 & plastic yang dipilih → update
  //    #calc-co2, #calc-plastic (ANIM.countUp) dan progress bar #calc-progress
  //    lewat ANIM.setProgress (target acuan: 1000 kg CO₂e/tahun, tampilkan %).
  // 3. Form (#report-form): validasi required + email regex; pesan error di
  //    .form-error; sukses → sembunyikan form, tampilkan #form-success dengan
  //    animasi check (ANIM.drawLines pada path .draw-line di dalam svg).
}

/* ============================================================
   DISPATCHER
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNav();

  const page = document.body.dataset.page;
  if (page === "home") initHome();
  else if (page === "eksplorasi") initEksplorasi();
  else if (page === "about") initAbout();
  else if (page === "contact") initContact();

  ANIM.refreshIcons();

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
});
