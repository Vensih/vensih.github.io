/* ── FAN CHART GEOMETRY ──────────────────────────────────────────────────────
   Canvas: 5500 × 5200 px   |   Origin (Vensi): CX=3000, CY=4800
   Radial step per generation: R_STEP = 350 px  (same for all generations)

   Fan spans 10°–170° (standard math angles, CCW from +x axis).
   Each node sits at the midpoint angle of its section:
     Gen 1  (span 160°):  Father 130°,  Mother 50°
     Gen 2  (span  80°):  pat-gf 150°, pat-gm 110°, mat-gf 70°, mat-gm 30°
     Gen 3  (span  40°):  160° 140° 120° 100° 80° 60° 40° 20°
     Gen 4  (span  20°):  Rustem 165°, Sebije 155°
     Gen 5  (span  10°):  Ibrahim 165°  (only father of Rustem known)
     Gen 6  (span   5°):  Hajdar  165°  (only father of Ibrahim known)
─────────────────────────────────────────────────────────────────────────── */

const CANVAS_W = 5500;
const CANVAS_H = 5200;
const CX       = 3000;   // Vensi x
const CY       = 4800;   // Vensi y
const R_STEP   = 350;    // radial gap per generation

function fanXY(deg, gen) {
  const r = R_STEP * gen;
  const rad = deg * Math.PI / 180;
  return { x: Math.round(CX + r * Math.cos(rad)),
           y: Math.round(CY - r * Math.sin(rad)) };
}

/* ── FAMILY DATA ─────────────────────────────────────────────────────────── */
function mkNode(id, name, dates, title, gen, angleDeg, labelPos, icon, photo) {
  const pos = gen === 0 ? { x: CX, y: CY } : fanXY(angleDeg, gen);
  return { id, name, dates, title, gen, icon: icon||null, photo: photo||null,
           x: pos.x, y: pos.y, labelPos };
}

const people = [
  /* Gen 0 — VENSI */
  mkNode("vensi",    "Vensi Hajdari",       "21/05/2004", "",                0,   0,   "below", "star"),

  /* Gen 1 — Prindërit */
  mkNode("father",   "Bahri Hajdari",       "18/12/1955", "",               1, 130,  "below", "star"),
  mkNode("mother",   "Valbona Hajdari",     "04/01/1967", "",               1,  50,  "below"),

  /* Gen 2 — Gjyshërit */
  mkNode("pat-gf",   "Vehbi Hajdari",       "",     "",                     2, 150,  "below"),
  mkNode("pat-gm",   "Nazire Hajdari",      "",     "",                     2, 110,  "above"),
  mkNode("mat-gf",   "Xhemal Fishta",       "",     "",                     2,  70,  "above"),
  mkNode("mat-gm",   "Naxhije Fishta",      "",     "",                     2,  30,  "below"),

  /* Gen 3 — Stërgjyshërit */
  mkNode("pp-ggf",   "Halim Hajdari",       "",     "",                     3, 160,  "below"),
  mkNode("pp-ggm",   "Hamide Hajdari",      "",     "",                     3, 140,  "above"),
  mkNode("pm-ggf",   "Musa Nurja",          "",     "",                     3, 120,  "above"),
  mkNode("pm-ggm",   "Hava Nurja",          "",     "",                     3, 100,  "above"),
  mkNode("mp-ggf",   "Sait Fishta",         "",     "",                     3,  80,  "above"),
  mkNode("mp-ggm",   "Vace Fishta",         "",     "",                     3,  60,  "above"),
  mkNode("mm-ggf",   "Toefik Rexha",        "",     "",                     3,  40,  "above"),
  mkNode("mm-ggm",   "Bedrije Rexha",       "",     "",                     3,  20,  "below"),

  /* Gen 4 — Stër-stërgjyshërit */
  mkNode("rustem",   "Rustem Hajdari",      "",     "",                     4, 165,  "below"),
  mkNode("sebije",   "Sebije Hajdari",      "",     "",                     4, 155,  "above"),
  mkNode("hassan",   "Hassan Kahari",       "",     "",                     4, 145,  "above"),
  mkNode("vace-k",   "Vace Kahari",         "",     "",                     4, 135,  "above"),

  /* Gen 5 — Rustem's and Sebije's parents */
  mkNode("ibrahim",  "Ibrahim Hajdari",     "",     "",                     5, 165,  "below"),
  mkNode("mani",     "Mani Preza",          "",     "",                     5, 157.5,"above"),
  mkNode("laje",     "Laje Preza",          "",     "",                     5, 152.5,"above"),

  /* Gen 6 — Hajdar (Ibrahim's father) */
  mkNode("hajdar",   "Hajdar Hajdari",      "",     "",                     6, 165,  "below"),
];

/* ── RIBBON CONNECTIONS ──────────────────────────────────────────────────── */
const connections = [
  { from: "vensi",   to: "father",   color: "amber" },
  { from: "vensi",   to: "mother",   color: "amber" },
  { from: "father",  to: "pat-gf",   color: "teal"  },
  { from: "father",  to: "pat-gm",   color: "teal"  },
  { from: "mother",  to: "mat-gf",   color: "teal"  },
  { from: "mother",  to: "mat-gm",   color: "teal"  },
  { from: "pat-gf",  to: "pp-ggf",   color: "mist"  },
  { from: "pat-gf",  to: "pp-ggm",   color: "mist"  },
  { from: "pat-gm",  to: "pm-ggf",   color: "mist"  },
  { from: "pat-gm",  to: "pm-ggm",   color: "mist"  },
  { from: "mat-gf",  to: "mp-ggf",   color: "mist"  },
  { from: "mat-gf",  to: "mp-ggm",   color: "mist"  },
  { from: "mat-gm",  to: "mm-ggf",   color: "mist"  },
  { from: "mat-gm",  to: "mm-ggm",   color: "mist"  },
  { from: "pp-ggf",  to: "rustem",   color: "mist2" },
  { from: "pp-ggf",  to: "sebije",   color: "mist2" },
  { from: "pp-ggm",  to: "hassan",   color: "mist2" },
  { from: "pp-ggm",  to: "vace-k",   color: "mist2" },
  { from: "rustem",  to: "ibrahim",  color: "mist3" },
  { from: "sebije",  to: "mani",     color: "mist3" },
  { from: "sebije",  to: "laje",     color: "mist3" },
  { from: "ibrahim", to: "hajdar",   color: "mist3" },
];

const ribbonStyles = {
  amber: { fill:"rgba(205,148,30,0.40)", stroke:"rgba(205,148,30,0.22)", width:52 },
  teal:  { fill:"rgba(85,152,128,0.32)", stroke:"rgba(85,152,128,0.18)", width:36 },
  mist:  { fill:"rgba(120,155,135,0.20)", stroke:"rgba(120,155,135,0.11)", width:24 },
  mist2: { fill:"rgba(110,145,125,0.14)", stroke:"rgba(110,145,125,0.08)", width:16 },
  mist3: { fill:"rgba(100,135,115,0.10)", stroke:"rgba(100,135,115,0.06)", width:12 },
};

/* ── PAN / ZOOM STATE ────────────────────────────────────────────────────── */
const MIN_SCALE = 0.08;
const MAX_SCALE = 4.0;
let state = { tx: 0, ty: 0, scale: 1 };

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function applyTransform(tx, ty, scale) {
  state = { tx, ty, scale: clamp(scale, MIN_SCALE, MAX_SCALE) };
  document.getElementById("canvas").style.transform =
    `translate(${state.tx}px,${state.ty}px) scale(${state.scale})`;
}

function initView() {
  const vw = window.innerWidth, vh = window.innerHeight;
  // Show Vensi + gen1 comfortably; canvas area to show ≈ 1200×900
  const scale = clamp(Math.min(vw / 1200, vh / 900), MIN_SCALE, MAX_SCALE);
  // Center viewport on a point halfway between Vensi and the parent row
  const focusY = CY - R_STEP * 0.5;
  applyTransform(vw / 2 - CX * scale, vh / 2 - focusY * scale, scale);
}

window.addEventListener("resize", initView);

/* ── INIT DOM ────────────────────────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initView();

  const viewport  = document.getElementById("viewport");
  const svg       = document.getElementById("ribbon-svg");
  const nodesLayer = document.getElementById("nodes-layer");
  const tooltip   = document.getElementById("tooltip");

  const byId = {};
  people.forEach(p => { byId[p.id] = p; });

  /* ── Ribbons ──────────────────────────────── */
  connections.forEach(conn => {
    const a = byId[conn.from], b = byId[conn.to];
    if (!a || !b) return;
    const s = ribbonStyles[conn.color];
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.dataset.from = conn.from; g.dataset.to = conn.to;
    g.style.transition = "opacity 0.18s";
    const el = document.createElementNS("http://www.w3.org/2000/svg", "path");
    el.setAttribute("d",      buildRibbon(a.x, a.y, b.x, b.y, s.width));
    el.setAttribute("fill",   s.fill);
    el.setAttribute("stroke", s.stroke);
    el.setAttribute("stroke-width", "0.8");
    g.appendChild(el); svg.appendChild(g);
  });

  /* ── Nodes ────────────────────────────────── */
  people.forEach(person => {
    const div = document.createElement("div");
    div.className = `node gen${person.gen}`;
    if (person.id === "vensi") div.classList.add("central");
    if (person.labelPos === "above") div.classList.add("label-above");
    div.style.left   = person.x + "px";
    div.style.top    = person.y + "px";
    div.dataset.id   = person.id;

    if (person.icon === "crown") {
      const ic = document.createElement("span");
      ic.className = "node-icon"; ic.innerHTML = "&#9819;";
      ic.style.color = "#c8a020"; div.appendChild(ic);
    }

    const ring = document.createElement("div");
    ring.className = "portrait-ring";
    if (person.photo) {
      const img = document.createElement("img");
      img.src = person.photo; img.alt = person.name; ring.appendChild(img);
    } else {
      const ph = document.createElement("div");
      ph.className = "placeholder-img";
      const w = person.name.split(" ");
      ph.textContent = w.length >= 2
        ? (w[0][0] + w[w.length-1][0]).toUpperCase()
        : w[0].slice(0,2).toUpperCase();
      ring.appendChild(ph);
    }
    div.appendChild(ring);

    const label = document.createElement("div");
    label.className = "node-label";
    const nameEl = document.createElement("span");
    nameEl.className = "name"; nameEl.textContent = person.name;
    if (person.icon === "star") {
      const ic = document.createElement("span");
      ic.textContent = " ✦"; ic.style.fontSize = "0.75em";
      ic.style.verticalAlign = "middle"; ic.style.opacity = "0.7";
      nameEl.appendChild(ic);
    }
    label.appendChild(nameEl);
    if (person.dates) {
      const dEl = document.createElement("span");
      dEl.className = "dates"; dEl.textContent = person.dates;
      label.appendChild(dEl);
    }
    if (person.title) {
      const tEl = document.createElement("span");
      tEl.className = "title"; tEl.textContent = person.title;
      label.appendChild(tEl);
    }
    div.appendChild(label);
    nodesLayer.appendChild(div);

    div.addEventListener("mouseenter", e => {
      tooltip.style.display = "block";
      tooltip.querySelector(".tt-name").textContent  = person.name;
      tooltip.querySelector(".tt-dates").textContent = person.dates || "";
      tooltip.querySelector(".tt-title").textContent = person.title || "";
      moveTip(e);
      hilite(person.id, true);
    });
    div.addEventListener("mousemove",  moveTip);
    div.addEventListener("mouseleave", () => {
      tooltip.style.display = "none";
      hilite(person.id, false);
    });
  });

  function moveTip(e) {
    tooltip.style.left = (e.clientX + 14) + "px";
    tooltip.style.top  = (e.clientY -  8) + "px";
  }

  function hilite(id, on) {
    svg.querySelectorAll("g[data-from]").forEach(g => {
      const active = g.dataset.from === id || g.dataset.to === id;
      g.style.opacity = on ? (active ? "1" : "0.25") : "1";
    });
    document.querySelectorAll(".node").forEach(n => {
      const nid = n.dataset.id;
      const linked = connections.some(c =>
        (c.from === id && c.to === nid) || (c.to === id && c.from === nid));
      n.style.opacity = (on && !linked && nid !== id) ? "0.45" : "1";
    });
  }

  /* ── WHEEL ZOOM ───────────────────────────── */
  viewport.addEventListener("wheel", e => {
    e.preventDefault();
    const factor   = Math.exp(-e.deltaY * 0.001);
    const newScale = clamp(state.scale * factor, MIN_SCALE, MAX_SCALE);
    const rect = viewport.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const cx = (mx - state.tx) / state.scale;
    const cy = (my - state.ty) / state.scale;
    applyTransform(mx - cx * newScale, my - cy * newScale, newScale);
  }, { passive: false });

  /* ── MOUSE DRAG ───────────────────────────── */
  let drag = null;
  viewport.addEventListener("mousedown", e => {
    if (e.button !== 0) return;
    drag = { ox: e.clientX - state.tx, oy: e.clientY - state.ty };
    viewport.classList.add("dragging");
  });
  window.addEventListener("mousemove", e => {
    if (!drag) return;
    applyTransform(e.clientX - drag.ox, e.clientY - drag.oy, state.scale);
  });
  window.addEventListener("mouseup", () => {
    drag = null;
    viewport.classList.remove("dragging");
  });

  /* ── TOUCH PAN + PINCH ZOOM ───────────────── */
  let touch0 = null;
  viewport.addEventListener("touchstart", e => {
    e.preventDefault();
    if (e.touches.length === 1) {
      const t = e.touches[0];
      touch0 = { type:"pan", ox: t.clientX - state.tx, oy: t.clientY - state.ty };
    } else if (e.touches.length === 2) {
      const t1 = e.touches[0], t2 = e.touches[1];
      touch0 = {
        type: "pinch",
        dist: Math.hypot(t2.clientX-t1.clientX, t2.clientY-t1.clientY),
        cx: (t1.clientX+t2.clientX)/2, cy: (t1.clientY+t2.clientY)/2,
        tx: state.tx, ty: state.ty, scale: state.scale
      };
    }
  }, { passive: false });
  viewport.addEventListener("touchmove", e => {
    e.preventDefault();
    if (!touch0) return;
    if (touch0.type === "pan" && e.touches.length === 1) {
      const t = e.touches[0];
      applyTransform(t.clientX - touch0.ox, t.clientY - touch0.oy, state.scale);
    } else if (touch0.type === "pinch" && e.touches.length === 2) {
      const t1 = e.touches[0], t2 = e.touches[1];
      const dist = Math.hypot(t2.clientX-t1.clientX, t2.clientY-t1.clientY);
      const newScale = clamp(touch0.scale * dist / touch0.dist, MIN_SCALE, MAX_SCALE);
      const cx = (touch0.cx - touch0.tx) / touch0.scale;
      const cy = (touch0.cy - touch0.ty) / touch0.scale;
      applyTransform(touch0.cx - cx*newScale, touch0.cy - cy*newScale, newScale);
    }
  }, { passive: false });
  viewport.addEventListener("touchend", () => { touch0 = null; });

  /* ── DOUBLE-CLICK ZOOM IN ─────────────────── */
  viewport.addEventListener("dblclick", e => {
    // Prevent triggering on node double-click
    if (e.target.closest(".node")) return;
    const rect = viewport.getBoundingClientRect();
    const mx = e.clientX - rect.left, my = e.clientY - rect.top;
    const cx = (mx - state.tx) / state.scale;
    const cy = (my - state.ty) / state.scale;
    const newScale = clamp(state.scale * 1.6, MIN_SCALE, MAX_SCALE);
    applyTransform(mx - cx*newScale, my - cy*newScale, newScale);
  });

  /* ── RESET BUTTON ─────────────────────────── */
  document.getElementById("btn-reset").addEventListener("click", initView);
});

/* ── RIBBON GEOMETRY — uniform-width curved band ──────────────────────────── */
function buildRibbon(x1, y1, x2, y2, w) {
  const dx = x2-x1, dy = y2-y1;
  const len = Math.sqrt(dx*dx + dy*dy) || 1;
  const nx = -dy/len, ny = dx/len;
  const hw = w * 0.5;
  const bow = len * 0.05;
  const mx = (x1+x2)*0.5 + ny*bow, my = (y1+y2)*0.5 - nx*bow;
  const p0x=x1+nx*hw, p0y=y1+ny*hw, p1x=x1-nx*hw, p1y=y1-ny*hw;
  const p2x=x2+nx*hw, p2y=y2+ny*hw, p3x=x2-nx*hw, p3y=y2-ny*hw;
  const c0x=mx+nx*hw, c0y=my+ny*hw, c1x=mx-nx*hw, c1y=my-ny*hw;
  return [
    `M ${p0x.toFixed(1)} ${p0y.toFixed(1)}`,
    `Q ${c0x.toFixed(1)} ${c0y.toFixed(1)} ${p2x.toFixed(1)} ${p2y.toFixed(1)}`,
    `L ${p3x.toFixed(1)} ${p3y.toFixed(1)}`,
    `Q ${c1x.toFixed(1)} ${c1y.toFixed(1)} ${p1x.toFixed(1)} ${p1y.toFixed(1)}`,
    `Z`
  ].join(" ");
}
