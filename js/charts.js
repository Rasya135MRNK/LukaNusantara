/* ============================================================
   LukaNusantara — js/charts.js
   Grafik statistik SVG tanpa dependensi eksternal.
   Dipakai di Home (tren krisis) dan Eksplorasi (data & modul).
   Semua seri berasal dari SITE_DATA.CHARTS di js/data.js.
   ============================================================ */

const CHART = (() => {
  let uid = 0;

  const FONT = "JetBrains Mono, monospace";
  const GRID = "#1E4530";
  const MIST = "#9CB4A7";
  const SAND = "#E7E4D9";

  function niceMax(raw) {
    if (!raw || raw <= 0) return 10;
    const exp = Math.pow(10, Math.floor(Math.log10(raw)));
    const n = raw / exp;
    const step = n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10;
    return step * exp;
  }

  function compact(n, unit) {
    if (unit === "hektare") {
      if (n >= 1e6) return (n / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " jt";
      if (n >= 1e3) return (n / 1e3).toLocaleString("id-ID", { maximumFractionDigits: 0 }) + " rb";
    }
    return n.toLocaleString("id-ID", { maximumFractionDigits: 1 });
  }

  function full(n, unit) {
    const suffix = unit ? " " + unit : "";
    return n.toLocaleString("id-ID", { maximumFractionDigits: 2 }) + suffix;
  }

  function ticks(max, count = 4) {
    return Array.from({ length: count + 1 }, (_, i) => (max / count) * i);
  }

  function axisLabel(n, unit) {
    if (unit === "hektare") {
      if (n >= 1e6) return (n / 1e6).toLocaleString("id-ID", { maximumFractionDigits: 1 }) + " jt";
      if (n >= 1e3) return (n / 1e3).toLocaleString("id-ID", { maximumFractionDigits: 0 }) + " rb";
    }
    return n.toLocaleString("id-ID", { maximumFractionDigits: 0 });
  }

  function barChart(cfg) {
    const W = 520, H = 280;
    const m = { l: 46, r: 14, t: 30, b: 44 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const max = niceMax(Math.max(...cfg.values));
    const gap = iw / cfg.values.length;
    const bw = Math.min(38, gap * 0.58);
    const tickVals = ticks(max, 4);
    const showAll = cfg.values.length <= 7;

    const grid = tickVals
      .map((v) => {
        const y = m.t + ih - (v / max) * ih;
        return `<line x1="${m.l}" y1="${y.toFixed(1)}" x2="${W - m.r}" y2="${y.toFixed(1)}" stroke="${GRID}" stroke-width="1" stroke-dasharray="3 5"/>
        <text x="${m.l - 8}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-family="${FONT}" font-size="9" fill="${MIST}" opacity=".75">${axisLabel(v, cfg.unit)}</text>`;
      })
      .join("");

    const bars = cfg.values
      .map((v, i) => {
        const x = m.l + gap * i + (gap - bw) / 2;
        const h = Math.max(2, (v / max) * ih);
        const y = m.t + ih - h;
        const label = compact(v, cfg.unit);
        const show = showAll || v === Math.max(...cfg.values) || i === cfg.values.length - 1;
        return `<g>
          <rect class="chart-bar" style="animation-delay:${(0.06 * i).toFixed(2)}s" x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="3" fill="${cfg.color}" opacity=".9">
            <title>${cfg.labels[i]}: ${full(v, cfg.unit)}</title>
          </rect>
          ${show ? `<text x="${(x + bw / 2).toFixed(1)}" y="${(y - 7).toFixed(1)}" text-anchor="middle" font-family="${FONT}" font-size="8.5" fill="${SAND}" opacity=".85">${label}</text>` : ""}
          <text x="${(x + bw / 2).toFixed(1)}" y="${H - 20}" text-anchor="middle" font-family="${FONT}" font-size="9" fill="${MIST}">${cfg.labels[i]}</text>
        </g>`;
      })
      .join("");

    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${cfg.title} ${cfg.subtitle}">
      ${grid}
      <line x1="${m.l}" y1="${m.t + ih}" x2="${W - m.r}" y2="${m.t + ih}" stroke="${GRID}" stroke-width="1.4"/>
      ${bars}
    </svg>`;
  }

  function lineChart(cfg) {
    const W = 520, H = 280;
    const m = { l: 46, r: 18, t: 30, b: 44 };
    const iw = W - m.l - m.r, ih = H - m.t - m.b;
    const max = niceMax(Math.max(...cfg.values));
    const tickVals = ticks(max, 4);
    const step = cfg.values.length > 1 ? iw / (cfg.values.length - 1) : iw;
    const points = cfg.values.map((v, i) => ({
      x: m.l + step * i,
      y: m.t + ih - (v / max) * ih,
      v,
    }));
    const line = points.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
    const base = m.t + ih;
    const area = `${line} L${points[points.length - 1].x.toFixed(1)} ${base} L${points[0].x.toFixed(1)} ${base} Z`;
    const id = `chartGrad${++uid}`;

    const grid = tickVals
      .map((v) => {
        const y = m.t + ih - (v / max) * ih;
        return `<line x1="${m.l}" y1="${y.toFixed(1)}" x2="${W - m.r}" y2="${y.toFixed(1)}" stroke="${GRID}" stroke-width="1" stroke-dasharray="3 5"/>
        <text x="${m.l - 8}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-family="${FONT}" font-size="9" fill="${MIST}" opacity=".75">${axisLabel(v, cfg.unit)}</text>`;
      })
      .join("");

    const dots = points
      .map(
        (p, i) => `<g>
          <circle class="chart-point" style="animation-delay:${(0.12 * i + 0.45).toFixed(2)}s" cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="#07120D" stroke="${cfg.color}" stroke-width="2">
            <title>${cfg.labels[i]}: ${full(p.v, cfg.unit)}</title>
          </circle>
          <text x="${p.x.toFixed(1)}" y="${(p.y - 10).toFixed(1)}" text-anchor="middle" font-family="${FONT}" font-size="8.5" fill="${SAND}" opacity=".85">${compact(p.v, cfg.unit)}</text>
          <text x="${p.x.toFixed(1)}" y="${H - 20}" text-anchor="middle" font-family="${FONT}" font-size="9" fill="${MIST}">${cfg.labels[i]}</text>
        </g>`
      )
      .join("");

    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${cfg.title} ${cfg.subtitle}">
      <defs>
        <linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="${cfg.color}" stop-opacity=".32"/>
          <stop offset="1" stop-color="${cfg.color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      ${grid}
      <line x1="${m.l}" y1="${base}" x2="${W - m.r}" y2="${base}" stroke="${GRID}" stroke-width="1.4"/>
      <path class="chart-area" d="${area}" fill="url(#${id})"/>
      <path class="chart-line" pathLength="1" d="${line}" fill="none" stroke="${cfg.color}" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"/>
      ${dots}
    </svg>`;
  }

  function hbarChart(cfg) {
    const W = 520;
    const row = 40;
    const H = 44 + row * cfg.values.length;
    const m = { l: 150, r: 56, t: 18 };
    const iw = W - m.l - m.r;
    const max = niceMax(Math.max(...cfg.values));

    const rows = cfg.values
      .map((v, i) => {
        const y = m.t + i * row;
        const w = Math.max(2, (v / max) * iw);
        return `<g>
          <text x="${m.l - 10}" y="${y + 16}" text-anchor="end" font-family="${FONT}" font-size="9.5" fill="${MIST}">${cfg.labels[i]}</text>
          <rect x="${m.l}" y="${y + 4}" width="${iw}" height="15" rx="4" fill="${GRID}" opacity=".5"/>
          <rect class="chart-hbar" style="animation-delay:${(0.08 * i).toFixed(2)}s" x="${m.l}" y="${y + 4}" width="${w.toFixed(1)}" height="15" rx="4" fill="${cfg.color}" opacity=".9">
            <title>${cfg.labels[i]}: ${full(v, cfg.unit)}</title>
          </rect>
          <text x="${(m.l + w + 8).toFixed(1)}" y="${y + 16}" font-family="${FONT}" font-size="9" fill="${SAND}" opacity=".9">${v.toLocaleString("id-ID", { maximumFractionDigits: 1 })}${cfg.unit === "%" ? "%" : ""}</text>
        </g>`;
      })
      .join("");

    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${cfg.title} ${cfg.subtitle}">${rows}</svg>`;
  }

  function rangeChart(cfg) {
    const W = 520;
    const row = 46;
    const H = 44 + row * cfg.values.length;
    const m = { l: 142, r: 66, t: 20 };
    const iw = W - m.l - m.r;
    const max = niceMax(Math.max(...cfg.values.map((v) => v[1])));

    const rows = cfg.values
      .map((pair, i) => {
        const [lo, hi] = pair;
        const y = m.t + i * row;
        const x1 = m.l + (lo / max) * iw;
        const x2 = m.l + (hi / max) * iw;
        const label = lo === hi ? lo.toLocaleString("id-ID") : `${lo.toLocaleString("id-ID")}–${hi.toLocaleString("id-ID")}`;
        return `<g>
          <text x="${m.l - 10}" y="${y + 16}" text-anchor="end" font-family="${FONT}" font-size="9.5" fill="${MIST}">${cfg.labels[i]}</text>
          <rect x="${m.l}" y="${y + 4}" width="${iw}" height="15" rx="4" fill="${GRID}" opacity=".5"/>
          <rect class="chart-hbar" style="animation-delay:${(0.1 * i).toFixed(2)}s" x="${x1.toFixed(1)}" y="${y + 4}" width="${Math.max(3, x2 - x1).toFixed(1)}" height="15" rx="4" fill="${cfg.color}" opacity=".9">
            <title>${cfg.labels[i]}: ${label} ${cfg.unit}</title>
          </rect>
          <text x="${(x2 + 8).toFixed(1)}" y="${y + 16}" font-family="${FONT}" font-size="9" fill="${SAND}" opacity=".9">${label}</text>
        </g>`;
      })
      .join("");

    return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="${cfg.title} ${cfg.subtitle}">
      <line x1="${m.l}" y1="${m.t - 2}" x2="${m.l}" y2="${H - 18}" stroke="${GRID}" stroke-width="1" stroke-dasharray="3 5"/>
      ${rows}
    </svg>`;
  }

  function svg(cfg) {
    if (!cfg) return "";
    if (cfg.type === "line") return lineChart(cfg);
    if (cfg.type === "hbar") return hbarChart(cfg);
    if (cfg.type === "range") return rangeChart(cfg);
    return barChart(cfg);
  }

  function cardHTML(cfg) {
    if (!cfg) return "";
    const source = cfg.sourceUrl
      ? `<a href="${cfg.sourceUrl}" target="_blank" rel="noopener" class="text-mist/80 underline decoration-deep-600 underline-offset-2 hover:text-leaf-300">${cfg.source}</a>`
      : cfg.source;
    return `<article class="chart-card bg-deep-800 border border-deep-700 rounded-2xl p-5 md:p-6 opacity-0">
      <div class="flex items-start justify-between gap-3">
        <div>
          <p class="font-mono text-[10px] uppercase tracking-[0.25em] text-leaf-400">${cfg.kicker}</p>
          <h3 class="mt-1 font-sg font-bold text-base md:text-lg leading-snug">${cfg.title}</h3>
          <p class="mt-1 font-mono text-[10px] uppercase tracking-widest text-mist/60">${cfg.subtitle}</p>
        </div>
        <span class="shrink-0 px-2 py-1 rounded-full border border-deep-600 font-mono text-[9px] uppercase tracking-widest text-mist/70">${cfg.unit}</span>
      </div>
      <div class="mt-4">${svg(cfg)}</div>
      <p class="mt-3 font-mono text-[10px] leading-relaxed text-mist/60">Sumber: ${source}</p>
    </article>`;
  }

  function renderGrid(container, ids) {
    if (!container) return;
    const charts = ids.map((id) => SITE_DATA.CHARTS[id]).filter(Boolean);
    if (!charts.length) return;
    container.innerHTML = charts.map(cardHTML).join("");

    const cards = Array.from(container.children);
    cards.forEach((card) => {
      const show = () => {
        card.classList.add("is-visible");
        if (typeof ANIM !== "undefined" && ANIM.animateIn) ANIM.animateIn(card, { y: 18, stagger: 0 });
        else card.style.opacity = "1";
      };
      if (typeof ANIM !== "undefined" && ANIM.observeOnce) ANIM.observeOnce(card, show, 0.2);
      else show();
    });
  }

  return { svg, cardHTML, renderGrid };
})();
