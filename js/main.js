/* ============================================================
   LukaNusantara — js/main.js
   Dispatcher per halaman via <body data-page="...">.

   Catatan tim (lihat PLAN.md):
   - Dev A (Rasya) : initHome (hero, statistik, peta), initNav
   - Dev B (Tamam) : rencananya initEksplorasi & initContact —
     saat integrasi final bagian ini diimplementasikan oleh Dev A
     atas nama Dev B agar hasil akhir utuh untuk demo.
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

/* Background hero memudar + parallax ringan saat halaman digulir */
function initHeroBackground() {
  const bg = $("#hero-bg");
  const hero = $("#hero");
  if (!bg || !hero) return;
  const update = () => {
    const progress = Math.min(1, window.scrollY / (hero.offsetHeight * 0.9));
    bg.style.opacity = String(1 - progress);
    bg.style.transform = `translateY(${window.scrollY * 0.25}px)`;
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function initHome() {
  /* Hero: kontur tergambar + judul per kata */
  const heroSvg = $("#hero-svg");
  if (heroSvg) ANIM.drawLines(heroSvg, { duration: 2400, stagger: 140 });

  const title = $("#hero-title");
  if (title) ANIM.revealWords(title, 350);
  const subtitle = $("#hero-sub");
  if (subtitle) ANIM.revealWords(subtitle, 900);

  /* Background hero memudar saat scroll */
  initHeroBackground();

  /* Statistik */
  renderStats();

  /* Peta */
  renderMap();
  const firstRegion = Object.keys(SITE_DATA.REGIONS)[0];
  if (firstRegion) selectRegion(firstRegion);
}

/* ============================================================
   EKSPLORASI — filter, galeri, slider, modal
   ============================================================ */

let currentFilter = "Semua";

function shortDesc(text, max = 110) {
  return text.length > max ? text.slice(0, max).replace(/\s+\S*$/, "") + "…" : text;
}

/* Chip filter: "Semua" + kategori unik dari GALLERY */
function renderFilter() {
  const bar = $("#filter-bar");
  if (!bar) return;
  const cats = ["Semua", ...new Set(SITE_DATA.GALLERY.map((g) => g.category))];
  bar.innerHTML = cats
    .map((c) => {
      const active = c === currentFilter;
      return `<button class="filter-chip font-mono text-xs px-4 py-2 rounded-full border transition ${
        active
          ? "bg-leaf-400 text-deep-950 border-leaf-400"
          : "border-deep-600 text-mist hover:border-leaf-400 hover:text-sand"
      }" data-cat="${c}">${c}</button>`;
    })
    .join("");
  $$(".filter-chip", bar).forEach((btn) =>
    btn.addEventListener("click", () => {
      if (btn.dataset.cat === currentFilter) return;
      currentFilter = btn.dataset.cat;
      renderFilter();
      transitionGallery();
    })
  );
}

/* Transisi keluar → render ulang grid dengan stagger */
function transitionGallery() {
  const grid = $("#gallery-grid");
  if (!grid || !grid.children.length || !ANIM.hasAnime()) {
    renderGallery();
    return;
  }
  anime({
    targets: grid.children,
    opacity: [1, 0],
    translateY: [0, -14],
    duration: 250,
    easing: "easeInQuad",
    complete: renderGallery,
  });
}

/* Kartu galeri sesuai filter aktif */
function renderGallery() {
  const grid = $("#gallery-grid");
  if (!grid) return;
  const items =
    currentFilter === "Semua"
      ? SITE_DATA.GALLERY
      : SITE_DATA.GALLERY.filter((g) => g.category === currentFilter);

  if (!items.length) {
    grid.innerHTML = `<p class="col-span-full text-center text-mist py-16">Belum ada kasus pada kategori ini.</p>`;
    return;
  }

  grid.innerHTML = items
    .map(
      (g) => `
    <button class="gallery-card text-left bg-deep-800 border border-deep-700 rounded-2xl overflow-hidden hover:border-leaf-400/60 transition group" data-id="${g.id}">
      <div class="relative h-44 overflow-hidden">
        <img src="${g.image}" alt="${g.alt}" onerror="__imgFallback(this)"
             class="w-full h-full object-cover group-hover:scale-105 transition duration-500" loading="lazy" />
        <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-deep-950/85 border border-deep-600 font-mono text-[10px] uppercase tracking-widest text-leaf-300">${g.category}</span>
      </div>
      <div class="p-5">
        <h3 class="font-sg font-bold text-lg leading-snug">${g.title}</h3>
        <p class="mt-2 font-mono text-[10px] uppercase tracking-widest text-mist/70">Lokasi: ${g.region}</p>
        <p class="mt-3 text-sm text-mist leading-relaxed">${shortDesc(g.desc)}</p>
        <p class="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-leaf-300">Buka modul edukasi <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i></p>
      </div>
    </button>`
    )
    .join("");

  $$(".gallery-card", grid).forEach((card) =>
    card.addEventListener("click", () => {
      const item = SITE_DATA.GALLERY.find((x) => x.id === card.dataset.id);
      if (item) openModal(item);
    })
  );

  ANIM.refreshIcons();
  ANIM.animateIn(grid.children, { y: 22, stagger: 70 });
}

/* Before-after slider: pointer drag menggeser pembatas */
function initBeforeAfter() {
  const wrap = $("#ba");
  if (!wrap) return;
  const after = $("#ba-after");
  const handle = $("#ba-handle");
  const setPos = (clientX) => {
    const rect = wrap.getBoundingClientRect();
    let pct = ((clientX - rect.left) / rect.width) * 100;
    pct = Math.max(2, Math.min(98, pct));
    after.style.clipPath = `inset(0 0 0 ${pct}%)`;
    handle.style.left = pct + "%";
    wrap.style.setProperty("--pos", pct + "%");
  };
  wrap.addEventListener("pointerdown", (e) => {
    e.preventDefault();
    wrap.setPointerCapture(e.pointerId);
    setPos(e.clientX);
  });
  wrap.addEventListener("pointermove", (e) => {
    if (e.buttons) setPos(e.clientX);
  });
}

/* Modal detail edukasi */
function initModal() {
  const modal = $("#detail-modal");
  if (!modal) return;
  modal.addEventListener("click", (e) => {
    if (e.target.id === "modal-backdrop" || e.target.closest("#modal-close")) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
  });
}

function openModal(item) {
  const modal = $("#detail-modal");
  const content = $("#modal-content");
  content.innerHTML = `
    <div class="flex items-start justify-between gap-4">
      <div>
        <span class="inline-block px-2.5 py-1 rounded-full bg-leaf-400/10 border border-leaf-400/40 font-mono text-[10px] uppercase tracking-widest text-leaf-300">${item.category}</span>
        <h3 class="mt-3 font-sg font-bold text-2xl md:text-3xl leading-snug">${item.title}</h3>
        <p class="mt-1 font-mono text-[11px] uppercase tracking-widest text-mist/70">Lokasi: ${item.region}</p>
      </div>
      <button id="modal-close" class="p-2 rounded-full border border-deep-600 text-mist hover:text-sand hover:border-leaf-400 transition shrink-0" aria-label="Tutup modal">
        <i data-lucide="x" class="w-4 h-4"></i>
      </button>
    </div>
    <img src="${item.image}" alt="${item.alt}" onerror="__imgFallback(this)" loading="lazy"
         class="mt-5 w-full h-52 md:h-64 object-cover rounded-xl border border-deep-700" />
    <p class="mt-5 text-sm md:text-base text-mist leading-relaxed">${item.desc}</p>
    <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-deep-950/60 border border-deep-700 rounded-xl p-4">
        <p class="font-mono text-[11px] uppercase tracking-widest text-leaf-400 mb-3">Fakta Data</p>
        <ul class="space-y-2">${item.fakta
          .map((f) => `<li class="flex gap-2 text-xs text-mist leading-relaxed"><i data-lucide="database" class="w-3.5 h-3.5 text-leaf-400 shrink-0 mt-0.5"></i>${f}</li>`)
          .join("")}</ul>
      </div>
      <div class="bg-deep-950/60 border border-deep-700 rounded-xl p-4">
        <p class="font-mono text-[11px] uppercase tracking-widest text-amber-400 mb-3">Penyebab Ekologis</p>
        <ul class="space-y-2">${item.penyebab
          .map((p) => `<li class="flex gap-2 text-xs text-mist leading-relaxed"><i data-lucide="chevron-right" class="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5"></i>${p}</li>`)
          .join("")}</ul>
      </div>
      <div class="bg-deep-950/60 border border-deep-700 rounded-xl p-4">
        <p class="font-mono text-[11px] uppercase tracking-widest text-tealx-400 mb-3">Aksi Pencegahan</p>
        <ul class="space-y-2">${item.aksi
          .map((a) => `<li class="flex gap-2 text-xs text-mist leading-relaxed"><i data-lucide="sprout" class="w-3.5 h-3.5 text-tealx-400 shrink-0 mt-0.5"></i>${a}</li>`)
          .join("")}</ul>
      </div>
    </div>`;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  ANIM.refreshIcons();
  ANIM.animateIn(content.children, { y: 16, stagger: 50 });
}

function closeModal() {
  const modal = $("#detail-modal");
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

function initEksplorasi() {
  renderFilter();
  renderGallery();
  initBeforeAfter();
  initModal();
}

/* ============================================================
   CERITA — scrollytelling crossfade "Nusantara yang Memudar"
   ============================================================ */

/* Membangun layer gambar & caption dari STORY, lalu mengikat
   opacity tiap layer ke progres scroll. Setiap perpindahan babak
   punya ritme 3 fase: tulisan keluar → gambar berganti (crossfade
   tanpa flicker) → tulisan babak berikutnya muncul. Di antara babak
   2 & 3 disisip segmen sela: kalimat "bukalah matamu…" yang terbelah
   dari tengah (atas naik, bawah turun) membuka babak berikutnya. */
function initCerita() {
  const wrap = $("#story-scroll");
  const stage = $("#story-stage");
  const captionWrap = $("#story-captions");
  if (!wrap || !stage || !captionWrap) return;

  const scenes = SITE_DATA.STORY;
  if (!scenes.length) return;
  const N = scenes.length;

  /* Aksesibilitas: tanpa gerak → mode statis (CSS fallback) */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    wrap.classList.add("story-static");
    stage.innerHTML = scenes
      .map(
        (s, i) => `
      <img class="scene-layer" src="${s.image}" alt="${s.alt}" onerror="__imgFallback(this)" style="filter:${s.filter}; object-position:${s.pos || "center"}" />
      <div class="story-caption">
        <p class="font-elite text-lg text-leaf-400">${s.title}</p>
        <p class="mt-3 text-sm text-mist leading-relaxed max-w-xl">${s.text}</p>
      </div>` +
        (i === 1
          ? `
      <p class="story-interlude-static">bukalah matamu dan lihatlah dunia</p>`
          : "")
      )
      .join("");
    return;
  }

  /* Layer + caption dinamis */
  stage.insertAdjacentHTML(
    "afterbegin",
    scenes
      .map(
        (s, i) => `
      <img class="scene-layer" data-index="${i}" src="${s.image}" alt="${s.alt}"
           onerror="__imgFallback(this)" loading="eager"
           style="filter:${s.filter}; opacity:${i === 0 ? 1 : 0}; object-position:${s.pos || "center"}" />`
      )
      .join("")
  );
  captionWrap.innerHTML =
    scenes
      .map(
        (s, i) => `
    <div class="story-caption" data-index="${i}" style="opacity:${i === 0 ? 1 : 0}">
      <p class="font-mono text-[11px] uppercase tracking-[0.3em] text-leaf-400">Babak ${i + 1}</p>
      <h2 class="mt-3 font-elite text-2xl md:text-4xl leading-snug">${s.title}</h2>
      <p class="mt-4 text-sm md:text-base text-mist leading-relaxed max-w-xl">${s.text}</p>
    </div>`
      )
      .join("") +
    `
    <div class="story-interlude" style="opacity:0">
      <span class="interlude-half interlude-top">bukalah matamu dan lihatlah dunia</span>
      <span class="interlude-half interlude-bottom" aria-hidden="true">bukalah matamu dan lihatlah dunia</span>
    </div>`;

  /* Preload agar crossfade tidak tersendat */
  scenes.forEach((s) => {
    const im = new Image();
    im.src = s.image;
  });

  const layers = $$(".scene-layer", stage);
  const captions = $$(".story-caption", captionWrap);
  const interlude = $(".story-interlude", captionWrap);
  const interludeTop = $(".interlude-top", captionWrap);
  const interludeBottom = $(".interlude-bottom", captionWrap);
  const overlay = $("#story-overlay");
  const counter = $("#story-counter");
  const fill = $("#story-progress-fill");
  const hint = $("#story-hint");
  const blackout = $("#story-blackout");
  const clamp01 = (v) => Math.max(0, Math.min(1, v));
  const ramp = (p, a, b) => clamp01((p - a) / (b - a));

  /* Ritme 3 fase per perpindahan babak (t = posisi dalam jendela babak):
     1) tulisan keluar            : t 0.25–0.45
     2) gambar berganti           : t 0.45–0.70
     3) tulisan berikutnya masuk  : t 0.70–0.95
     Linimasa = N + 1 segmen: 8 babak + 1 segmen sela (interlude) yang
     menempati celah antara segmen babak 2 & 3. */
  const OUT_A = 0.25, OUT_B = 0.45;
  const SWAP_A = 0.45, SWAP_B = 0.7;
  const IN_A = 0.7, IN_B = 0.95;
  const INTERLUDE_SEG = 2; /* segmen sela setelah Denyut Kehidupan */
  const M = N + 1; /* jumlah segmen linimasa */
  const segOf = (i) => (i < 2 ? i : i + 1); /* segmen tempat babak i berada */

  function apply(p) {
    const seg = Math.min(M - 1, Math.max(0, Math.floor(p * M)));
    const t = p * M - seg; /* posisi dalam segmen aktif */

    layers.forEach((el, i) => {
      if (i === 0) return; /* lapisan dasar selalu 1, tertutup dari atas */
      /* Gambar babak i masuk di fase 2 segmen sebelum segmennya sendiri —
         gambar Suara Mesin tampil di belakang sela, sisanya seperti biasa */
      const s = i < 2 ? i - 1 : i;
      el.style.opacity = String(ramp(p, (s + SWAP_A) / M, (s + SWAP_B) / M));
    });

    captions.forEach((el, i) => {
      const s = segOf(i);
      /* Babak pertama langsung terlihat sejak halaman dibuka */
      let o = i === 0 ? 1 : ramp(p, (s - 1 + IN_A) / M, (s - 1 + IN_B) / M);
      if (i < N - 1) o *= 1 - ramp(p, (s + OUT_A) / M, (s + OUT_B) / M);
      el.style.opacity = String(o);
    });

    /* Sela: masuk di fase 3 segmen 1 (scroll ketiga) — kini di atas layar
       yang sudah menghitam — lalu terbelah dari tengah di fase 3 segmen
       sela: setengah atas naik, setengah bawah turun, serentak dengan
       masuknya caption babak berikutnya pada fase yang sama. */
    const buka = ramp(p, (INTERLUDE_SEG + IN_A) / M, (INTERLUDE_SEG + IN_B) / M);
    interlude.style.opacity = String(ramp(p, (1 + IN_A) / M, (1 + IN_B) / M) * (1 - buka));
    interludeTop.style.transform = `translateY(${(-16 * buka).toFixed(2)}vh)`;
    interludeBottom.style.transform = `translateY(${(16 * buka).toFixed(2)}vh)`;

    /* Layar mengelap sampai hitam menggantikan pergantian gambar pada
       transisi ini: gelap di fase 2 segmen 1 (gambar Denyut Kehidupan
       "menghilang" ke hitam), gambar Suara Mesin berganti di belakang
       layar hitam, lalu hitam terangkat serentak saat sela terbuka. */
    blackout.style.opacity = String(
      ramp(p, (1 + SWAP_A) / M, (1 + SWAP_B) / M) * (1 - buka)
    );

    /* Overlay menebal serentak dengan pergantian gambar (fase 2).
       Segmen 1 menahan overlay (tak ada gambar yang berganti di sana);
       segmen sela menjadi tempat pergantian overlay babak 1 → 2. */
    let ovA, ovB;
    if (seg === 0) { ovA = 0; ovB = 1; }
    else if (seg === 1) { ovA = 1; ovB = 1; }
    else if (seg === INTERLUDE_SEG) { ovA = 1; ovB = 2; }
    else { ovA = seg - 1; ovB = Math.min(N - 1, seg); }
    overlay.style.opacity = String(
      scenes[ovA].overlay + (scenes[ovB].overlay - scenes[ovA].overlay) * ramp(t, SWAP_A, SWAP_B)
    );

    /* Counter mengikuti caption babak yang tampil — sela tidak bernomor
       (masih bagian Denyut Kehidupan), berpindah saat sela terbuka */
    let shown;
    if (seg <= 1) shown = seg;
    else if (seg === INTERLUDE_SEG) shown = t >= IN_A ? 2 : 1;
    else shown = seg - 1;
    if (counter) counter.textContent = `Babak ${shown + 1} / ${N}`;
    if (fill) fill.style.height = `${p * 100}%`;
    if (hint && p > 0.04) hint.style.opacity = String(1 - ramp(p, 0.04, 0.09));
  }

  let ticking = false;
  const update = () => {
    ticking = false;
    const total = wrap.offsetHeight - window.innerHeight;
    const p = total > 0 ? clamp01(-wrap.getBoundingClientRect().top / total) : 0;
    apply(p);
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

/* ============================================================
   ABOUT — timeline, sumber data, tim
   ============================================================ */
function renderTimeline() {
  const wrap = $("#timeline");
  if (!wrap) return;
  wrap.innerHTML = `
    <div class="absolute left-[27px] top-2 bottom-6 w-px timeline-line"></div>
    ${SITE_DATA.TIMELINE.map(
      (t) => `
    <div class="timeline-item relative flex gap-5 pb-10 last:pb-0 opacity-0">
      <div class="relative z-10 w-14 h-14 shrink-0 rounded-full bg-deep-950 border-2 border-deep-600 flex items-center justify-center">
        <i data-lucide="${t.icon}" class="w-6 h-6 text-leaf-400"></i>
      </div>
      <div class="flex-1 bg-deep-800 border border-deep-700 rounded-2xl p-5">
        <h3 class="font-display font-bold text-lg">${t.title}</h3>
        <p class="mt-2 text-sm text-mist leading-relaxed">${t.desc}</p>
      </div>
    </div>`
    ).join("")}
  `;
  $$(".timeline-item", wrap).forEach((item) =>
    ANIM.observeOnce(item, (el) => {
      ANIM.refreshIcons();
      ANIM.animateIn(el, { y: 26, stagger: 0 });
    }, 0.2)
  );
  ANIM.refreshIcons();
}

function renderSources() {
  const wrap = $("#sources-list");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.SOURCES.map(
    (s) => `
    <a href="${s.url}" target="_blank" rel="noopener noreferrer"
       class="flex items-center justify-between gap-4 bg-deep-800 border border-deep-700 rounded-xl p-4 hover:border-leaf-400/60 transition group opacity-0">
      <div>
        <p class="font-orb font-semibold text-sand group-hover:text-leaf-300 transition">${s.name}</p>
        <p class="mt-1 text-xs text-mist leading-relaxed">${s.desc}</p>
      </div>
      <i data-lucide="external-link" class="w-4 h-4 text-mist group-hover:text-leaf-300 transition shrink-0"></i>
    </a>`
  ).join("");
  $$("a", wrap).forEach((a) =>
    ANIM.observeOnce(a, (el) => {
      el.style.opacity = "1";
      ANIM.animateIn(el, { y: 16, stagger: 0 });
    }, 0.3)
  );
  ANIM.refreshIcons();
}

function renderTeam() {
  const wrap = $("#team-grid");
  if (!wrap) return;
  wrap.innerHTML = SITE_DATA.TEAM.map(
    (t) => `
    <div class="bg-deep-800 border border-deep-700 rounded-2xl p-6 opacity-0">
      <p class="font-team text-lg">${t.name}</p>
      <span class="inline-block mt-2 px-2.5 py-1 rounded-full bg-leaf-400/10 border border-leaf-400/40 font-mono text-[10px] uppercase tracking-widest text-leaf-300">${t.role}</span>
      <p class="mt-3 text-sm text-mist leading-relaxed">${t.desc}</p>
    </div>`
  ).join("");
  $$(".bg-deep-800", wrap).forEach((card) =>
    ANIM.observeOnce(card, (el) => {
      el.style.opacity = "1";
      ANIM.animateIn(el, { y: 20, stagger: 0 });
    }, 0.3)
  );
}

function initAbout() {
  renderTimeline();
  renderSources();
  renderTeam();
}

/* ============================================================
   CONTACT — kalkulator komitmen hijau & form laporan
   ============================================================ */

function renderActions() {
  const list = $("#actions-list");
  if (!list) return;
  list.innerHTML = SITE_DATA.ACTIONS.map(
    (a) => `
    <label class="action-card cursor-pointer bg-deep-800 border border-deep-700 rounded-2xl p-5 flex gap-4 items-start hover:border-leaf-400/50 transition">
      <input type="checkbox" data-id="${a.id}" class="sr-only action-check-input" />
      <span class="action-check w-6 h-6 rounded-full border-2 border-deep-600 flex items-center justify-center shrink-0 mt-0.5 transition">
        <i data-lucide="check" class="w-3.5 h-3.5"></i>
      </span>
      <span class="min-w-0">
        <span class="font-indie flex items-center gap-2 text-sand">
          <i data-lucide="${a.icon}" class="w-4 h-4 text-leaf-400"></i>${a.title}
        </span>
        <span class="block mt-1 text-xs text-mist leading-relaxed">${a.desc}</span>
        <span class="inline-block mt-2 px-2 py-0.5 rounded-full bg-deep-950/70 border border-deep-600 font-mono text-[10px] text-leaf-300">
          hemat ${a.co2} kg CO&#8322;e/thn${a.plastic ? ` &middot; ${a.plastic} item plastik` : ""}
        </span>
      </span>
    </label>`
  ).join("");

  $$("input.action-check-input", list).forEach((input) =>
    input.addEventListener("change", () => {
      input.closest(".action-card").classList.toggle("is-checked", input.checked);
      updateImpact();
    })
  );
  ANIM.refreshIcons();
  ANIM.animateIn(list.children, { y: 20, stagger: 60 });
}

/* Jumlahkan dampak aksi tercentang → angka + progress bar */
function updateImpact() {
  const checked = $$("#actions-list input.action-check-input:checked").map((i) =>
    SITE_DATA.ACTIONS.find((a) => a.id === i.dataset.id)
  );
  const co2 = checked.reduce((s, a) => s + a.co2, 0);
  const plastic = checked.reduce((s, a) => s + (a.plastic || 0), 0);
  ANIM.countUp($("#calc-co2"), co2, 800);
  ANIM.countUp($("#calc-plastic"), plastic, 800);
  const pct = Math.min(100, Math.round((co2 / 1000) * 100));
  ANIM.setProgress($("#calc-progress"), pct);
  $("#calc-percent").textContent = pct + "%";
}

/* Validasi & konfirmasi form laporan */
function bindReportForm() {
  const form = $("#report-form");
  if (!form) return;
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const rules = [
    { el: "#f-nama", test: (v) => v.trim().length >= 3, msg: "Nama minimal 3 karakter." },
    { el: "#f-email", test: (v) => EMAIL_RE.test(v.trim()), msg: "Format email tidak valid." },
    { el: "#f-kategori", test: (v) => v !== "", msg: "Pilih salah satu kategori." },
    { el: "#f-pesan", test: (v) => v.trim().length >= 10, msg: "Pesan minimal 10 karakter." },
  ];
  const showError = (input, msg) => {
    const err = input.parentElement.querySelector(".form-error");
    err.textContent = msg;
    err.classList.remove("hidden");
    input.classList.add("border-rose-400");
  };
  const clearError = (input) => {
    const err = input.parentElement.querySelector(".form-error");
    if (err) err.classList.add("hidden");
    input.classList.remove("border-rose-400");
  };
  rules.forEach(({ el }) => {
    const input = $(el);
    input.addEventListener("input", () => clearError(input));
    input.addEventListener("change", () => clearError(input));
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    rules.forEach(({ el, test, msg }) => {
      const input = $(el);
      if (!test(input.value)) {
        valid = false;
        showError(input, msg);
      }
    });
    if (!valid) return;

    /* Demo: simpan lokal di peramban, tanpa server */
    const data = Object.fromEntries(new FormData(form));
    const reports = JSON.parse(localStorage.getItem("ln_reports") || "[]");
    reports.push({ ...data, waktu: new Date().toISOString() });
    localStorage.setItem("ln_reports", JSON.stringify(reports));

    form.classList.add("hidden");
    const success = $("#form-success");
    success.classList.remove("hidden");
    ANIM.refreshIcons();
    ANIM.animateIn(success, { y: 20, stagger: 0 });
    /* Pantulan spring Motion menyusul entrance Anime.js (650 ms) —
       hanya scale, agar dua engine tidak menimpa transform yang sama */
    if (window.MOTION_UI) setTimeout(() => MOTION_UI.pop(success), 660);
    const svg = success.querySelector("svg");
    if (svg) ANIM.drawLines(svg, { duration: 800, stagger: 300 });
    success.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  const resetBtn = $("#success-reset");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      form.classList.remove("hidden");
      $("#form-success").classList.add("hidden");
      ANIM.animateIn(form, { y: 16, stagger: 0 });
      form.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }
}

function initContact() {
  renderActions();
  bindReportForm();
}

/* ============================================================
   DISPATCHER
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  initNav();

  const page = document.body.dataset.page;
  if (page === "home") initHome();
  else if (page === "cerita") initCerita();
  else if (page === "eksplorasi") initEksplorasi();
  else if (page === "about") initAbout();
  else if (page === "contact") initContact();

  ANIM.refreshIcons();

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
});
