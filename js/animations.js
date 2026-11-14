/* ============================================================
   LukaNusantara — js/animations.js
   Helper animasi Anime.js v3 yang dipakai SEMUA halaman.
   Pemilik: Dev A (Rasya) — Dev B cukup memakai API di bawah,
   jangan mendefinisikan ulang.

   API:
   - refreshIcons()          : render ulang ikon Lucide
   - observeOnce(el, cb)     : animasi saat elemen masuk viewport (sekali)
   - revealWords(el, delay)  : text reveal per kata (stagger)
   - countUp(el, value)      : angka berjalan, format id-ID
   - animateIn(targets, opt) : enter + stagger generik
   - setProgress(el, pct)    : animasi lebar progress bar (pct 0-100)
   - drawLines(svg)          : SVG line drawing (.draw-line dalam svg)
   ============================================================ */

const ANIM = (() => {
  const EASE = "easeOutExpo";

  function hasAnime() {
    if (typeof anime === "undefined") {
      console.warn("[animations.js] Anime.js belum termuat — animasi dilewati.");
      return false;
    }
    return true;
  }

  /* Render ulang ikon Lucide setelah DOM dinamis dibuat */
  function refreshIcons() {
    if (window.lucide && typeof lucide.createIcons === "function") {
      lucide.createIcons();
    }
  }

  /* Animasi sekali saja saat elemen terlihat. cb(el) dipanggil saat terpicu. */
  function observeOnce(el, cb, threshold = 0.25) {
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cb(el);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
  }

  /* Text reveal per kata. Teks dipecah menjadi <span class="reveal-word">. */
  function revealWords(el, delay = 0) {
    if (!el) return;
    if (!el.dataset.split) {
      el.dataset.split = "1";
      const words = el.textContent.trim().split(/\s+/);
      el.innerHTML = words
        .map((w) => `<span class="reveal-word">${w}</span>`)
        .join(" ");
    }
    const words = el.querySelectorAll(".reveal-word");
    if (!hasAnime()) {
      words.forEach((w) => (w.style.opacity = 1));
      return;
    }
    anime.set(words, { opacity: [0, 0], translateY: [18, 18] });
    anime({
      targets: words,
      opacity: [0, 1],
      translateY: [18, 0],
      delay: anime.stagger(90, { start: delay }),
      duration: 700,
      easing: EASE,
    });
  }

  /* Angka berjalan; suffix di data langsung ke elemen tanpa ikut dihitung */
  function countUp(el, value, duration = 2000) {
    if (!el) return;
    if (!hasAnime()) {
      el.textContent = value.toLocaleString("id-ID");
      return;
    }
    const obj = { n: 0 };
    anime({
      targets: obj,
      n: value,
      round: 1,
      duration,
      easing: "easeOutExpo",
      update: () => {
        el.textContent = obj.n.toLocaleString("id-ID");
      },
    });
  }

  /* Enter + stagger generik untuk grid/kartu/daftar */
  function animateIn(targets, opt = {}) {
    if (!targets || (NodeList.prototype.isPrototypeOf(targets) && !targets.length)) return;
    if (!hasAnime()) return;
    anime({
      targets,
      opacity: [0, 1],
      translateY: [opt.y ?? 24, 0],
      scale: opt.scale ? [opt.scale, 1] : undefined,
      delay: anime.stagger(opt.stagger ?? 70, { start: opt.delay ?? 0 }),
      duration: opt.duration ?? 650,
      easing: EASE,
    });
  }

  /* Progress bar: el = elemen fill (width %) */
  function setProgress(el, pct) {
    if (!el) return;
    if (!hasAnime()) {
      el.style.width = pct + "%";
      return;
    }
    anime({
      targets: el,
      width: pct + "%",
      duration: 900,
      easing: EASE,
    });
  }

  /* SVG line drawing: gambar semua path ber-class .draw-line di dalam svg */
  function drawLines(svg, opt = {}) {
    if (!svg) return;
    const paths = svg.querySelectorAll(".draw-line");
    if (!paths.length) return;
    if (!hasAnime()) {
      paths.forEach((p) => (p.style.strokeDashoffset = 0));
      return;
    }
    anime({
      targets: paths,
      strokeDashoffset: [anime.setDashoffset, 0],
      duration: opt.duration ?? 2200,
      delay: anime.stagger(opt.stagger ?? 160, { start: opt.delay ?? 0 }),
      easing: "easeInOutSine",
    });
  }

  return { EASE, hasAnime, refreshIcons, observeOnce, revealWords, countUp, animateIn, setProgress, drawLines };
})();
