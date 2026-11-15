/* ============================================================
   LukaNusantara — js/motion-ui.js
   Lapisan micro-interaction Motion (motion.dev) di atas helper
   Anime.js (js/animations.js). Semua sifatnya opsional: kalau
   library gagal termuat atau pengguna mengaktifkan reduced
   motion, halaman tetap berfungsi normal tanpa ini.

   API:
   - init()  : pasang spring press global (delegasi pointer)
   - pop(el) : spring "muncul" untuk kartu penting (form success)
   ============================================================ */

const MOTION_UI = (() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const M = window.Motion;
  if (!M || reduced) {
    return { init() {}, pop() {} };
  }

  /* Elemen yang mendapat umpan balik tekanan (shadcn-style press):
     tautan, tombol, kartu aksi, dan apa pun ber-atribut data-press */
  const PRESSABLE = "a, button, label.action-card, [data-press]";

  /* Elemen yang memakai transform sendiri (mis. -translate-x-1/2
     Tailwind) tidak disentuh agar animasi tidak saling menimpa */
  const canPress = (el) => el && getComputedStyle(el).transform === "none";

  let pressed = null;

  const press = (e) => {
    if (pressed) release();
    const el = e.target.closest(PRESSABLE);
    if (!el || !canPress(el)) return;
    pressed = el;
    M.animate(el, { scale: 0.97 }, { duration: 0.12, ease: "easeOut" });
  };

  const release = () => {
    if (!pressed) return;
    M.animate(
      pressed,
      { scale: 1 },
      { type: "spring", stiffness: 480, damping: 26 }
    );
    pressed = null;
  };

  /* Kartu mendapat pantulan spring SETELAH entrance Anime.js selesai —
     hanya scale agar tidak berebut properti transform dengan Anime.js
     (Anime = mesin reveal, Motion = lapisan pantulan). Dipakai untuk
     momen penting, mis. kartu "Pesanmu Terkirim" (halaman Contact) */
  function pop(el) {
    if (!el || !canPress(el)) return;
    M.animate(
      el,
      { scale: [0.94, 1] },
      { type: "spring", stiffness: 300, damping: 20 }
    );
  }

  function init() {
    document.addEventListener("pointerdown", press);
    document.addEventListener("pointerup", release);
    document.addEventListener("pointercancel", release);
  }

  return { init, pop };
})();

MOTION_UI.init();
