/*
 * Gaan's launch intro: light show drawn on index.html's .intro-light canvas, in a worker (OffscreenCanvas),
 * so app startup on the main thread can't stall it.
 *
 * Timeline (seconds from the intro's first animation frame, shared with intro.css):
 *   0.00  spark ignites in the badge as it pops, ambient bloom starts
 *   0.40  squircle ripple rings expand from behind the badge (clipped so they emerge from its edge)
 *   0.40-1.40  comet trace laps the badge contour; tight + medium + wide blur passes
 *   1.40-2.00  everything fades into a clean hold (CSS then settles the lockup)
 * Canvas is 240 logical px, centred on the 96px badge.
 */
"use strict";

const T0 = 0; // the intro's own clock; CSS delays are authored against the same zero
const END = 2.0;

const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeOut = (t) => 1 - (1 - t) ** 3;
const easeInOut = (t) => (t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2);

// Badge geometry in logical (240-unit) space
const SIZE = 240;
const HALF = 47.5; // badge half-width (96px minus the 1px border, centred)
const RADIUS = 24;

// Brand colours (from the logo): amber -> hot pink -> magenta/violet
const AMBER = [255, 190, 70];
const CORAL = [255, 90, 80];
const PINK = [255, 45, 120];
const VIOLET = [190, 80, 255];
const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t));
const rgba = (c, a) => `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${a})`;
const trail = (k) => (k < 0.5 ? mix(AMBER, PINK, k / 0.5) : mix(PINK, VIOLET, (k - 0.5) / 0.5)); // head -> tail

let ctx = null;
let buf = null; // sharp comet layer, blurred into ctx in three passes
let bctx = null;
let start = 0;
let first = true;
let path = null; // equal-length samples of the badge contour

// Badge contour as 480 equal-length points, starting top-centre, clockwise.
function buildPath() {
  const dense = [];
  const step = 0.5;
  const line = (x0, y0, x1, y1) => {
    const n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / step));
    for (let i = 0; i < n; i++) dense.push([x0 + ((x1 - x0) * i) / n, y0 + ((y1 - y0) * i) / n]);
  };
  const arc = (cx, cy, a0, a1) => {
    const n = Math.round((Math.abs(a1 - a0) * RADIUS) / step);
    for (let i = 0; i < n; i++) {
      const a = a0 + ((a1 - a0) * i) / n;
      dense.push([cx + Math.cos(a) * RADIUS, cy + Math.sin(a) * RADIUS]);
    }
  };
  const c = SIZE / 2;
  const L = c - HALF;
  const R = c + HALF;
  const i0 = R - RADIUS;
  const i1 = L + RADIUS;
  const P = Math.PI;
  line(c, L, i0, L);
  arc(i0, L + RADIUS, -P / 2, 0);
  line(R, L + RADIUS, R, R - RADIUS);
  arc(i0, R - RADIUS, 0, P / 2);
  line(i0, R, i1, R);
  arc(i1, R - RADIUS, P / 2, P);
  line(L, R - RADIUS, L, L + RADIUS);
  arc(i1, L + RADIUS, P, (3 * P) / 2);
  line(i1, L, c, L);
  const cum = [0];
  for (let i = 1; i < dense.length; i++) cum.push(cum[i - 1] + Math.hypot(dense[i][0] - dense[i - 1][0], dense[i][1] - dense[i - 1][1]));
  const total = cum[cum.length - 1];
  const M = 480;
  const out = [];
  let j = 0;
  for (let k = 0; k <= M; k++) {
    const d = (total * k) / M;
    while (j < cum.length - 2 && cum[j + 1] < d) j++;
    const f = (d - cum[j]) / (cum[j + 1] - cum[j] || 1);
    out.push([dense[j][0] + (dense[j + 1][0] - dense[j][0]) * f, dense[j][1] + (dense[j + 1][1] - dense[j][1]) * f]);
  }
  return out;
}

function pointAt(u) {
  const f = clamp(u) * (path.length - 1);
  const i = Math.min(path.length - 2, Math.floor(f));
  const r = f - i;
  return [path[i][0] + (path[i + 1][0] - path[i][0]) * r, path[i][1] + (path[i + 1][1] - path[i][1]) * r];
}

function renderComet(t, s) {
  bctx.clearRect(0, 0, buf.width, buf.height);
  const T_START = 0.4;
  const T_LEN = 1.0;
  const p = clamp((t - T_START) / T_LEN);
  if (p <= 0) return false;
  const fade = 1 - clamp((t - 1.3) / 0.2);
  if (fade <= 0) return false;

  const head = easeInOut(p); // one full lap, slow-fast-slow
  const tailLen = 0.24;
  const K = 44;
  bctx.lineCap = "round";
  bctx.lineJoin = "round";
  let prev = null;
  for (let j = 0; j <= K; j++) {
    const k = j / K;
    const u = head - tailLen * k;
    if (u < 0) break;
    const pt = pointAt(u);
    if (prev) {
      bctx.strokeStyle = rgba(trail(k), (1 - k) ** 1.6 * fade);
      bctx.lineWidth = (0.6 + 2.6 * (1 - k)) * s;
      bctx.beginPath();
      bctx.moveTo(prev[0] * s, prev[1] * s);
      bctx.lineTo(pt[0] * s, pt[1] * s);
      bctx.stroke();
    }
    prev = pt;
  }
  // Hot white head
  const h = pointAt(head);
  const g = bctx.createRadialGradient(h[0] * s, h[1] * s, 0, h[0] * s, h[1] * s, 7 * s);
  g.addColorStop(0, `rgba(255, 255, 255, ${fade})`);
  g.addColorStop(0.35, rgba(AMBER, 0.7 * fade));
  g.addColorStop(1, "rgba(255, 120, 80, 0)");
  bctx.fillStyle = g;
  bctx.beginPath();
  bctx.arc(h[0] * s, h[1] * s, 7 * s, 0, Math.PI * 2);
  bctx.fill();
  return true;
}

function render(t) {
  if (!ctx || !buf || !bctx) return;
  const cw = ctx.canvas.width;
  const ch = ctx.canvas.height;
  const s = cw / SIZE;
  const cx = cw / 2;
  const cy = ch / 2;

  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, cw, ch);
  ctx.globalCompositeOperation = "source-over";
  ctx.filter = "none";

  // 1. Ambient bloom behind the badge: amber core -> pink -> clear. Peaks ~0.7s, gone by 2.0s.
  const bloomIn = easeOut(clamp(t / 1.0));
  const bloomOut = 1 - easeInOut(clamp((t - 1.1) / 0.9));
  if (bloomOut > 0) {
    const r = (46 + 62 * bloomIn) * s;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, rgba(AMBER, 0.34 * bloomOut));
    g.addColorStop(0.4, rgba(PINK, 0.2 * bloomOut));
    g.addColorStop(0.75, rgba(VIOLET, 0.08 * bloomOut));
    g.addColorStop(1, "rgba(0, 0, 0, 0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, cw, ch);
  }

  // 2. Squircle ripple rings expanding from behind the badge. Clipped (even-odd) to outside the badge,
  //    so they emerge from its edge instead of drawing over the logo.
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, cw, ch);
  ctx.roundRect(cx - HALF * s, cy - HALF * s, HALF * 2 * s, HALF * 2 * s, RADIUS * s);
  ctx.clip("evenodd");
  const rings = 4;
  for (let i = 0; i < rings; i++) {
    const rt = clamp((t - (0.4 + i * 0.14)) / 1.0);
    if (rt <= 0 || rt >= 1) continue;
    const e = easeOut(rt);
    const half = (HALF + 64 * e) * s;
    const rad = (RADIUS + 64 * e) * s;
    const col = mix(AMBER, VIOLET, i / (rings - 1));
    ctx.strokeStyle = rgba(col, (1 - e) ** 1.4 * 0.5);
    ctx.lineWidth = Math.max(1, (2.6 - 1.8 * rt) * s);
    ctx.beginPath();
    ctx.roundRect(cx - half, cy - half, half * 2, half * 2, rad);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Ignition spark, in step with the badge popping (0 -> 0.5s)
  if (t < 0.55) {
    const st = clamp(t / 0.5);
    const a = (1 - st) ** 1.5;
    const r = (12 + 34 * easeOut(st)) * s;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
    g.addColorStop(0, `rgba(255, 255, 255, ${0.95 * a})`);
    g.addColorStop(0.3, rgba(AMBER, 0.7 * a));
    g.addColorStop(0.7, rgba(PINK, 0.25 * a));
    g.addColorStop(1, "rgba(255, 60, 120, 0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
  }

  // 4. Comet trace around the badge contour: wide atmospheric, medium, tight, then the sharp core.
  if (renderComet(t, s)) {
    ctx.globalCompositeOperation = "lighter";
    const passes = [
      ["blur(14px)", 0.9],
      ["blur(6px)", 0.9],
      ["blur(2px)", 0.8],
      ["none", 1],
    ];
    for (const [f, a] of passes) {
      ctx.filter = f === "none" ? "none" : f.replace(/(\d+)px/, (_, n) => `${n * s}px`);
      ctx.globalAlpha = a;
      ctx.drawImage(buf, 0, 0);
    }
    ctx.filter = "none";
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
  }
}

function finished() {
  if (!ctx) return;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function tick(now) {
  const t = (performance.timeOrigin + now - start) / 1000 - T0;
  if (t >= END) return finished();
  render(Math.max(0, t));
  if (first) {
    first = false;
    postMessage("lit");
  }
  requestAnimationFrame(tick);
}

self.onmessage = ({ data }) => {
  if (Number.isFinite(data.start)) start = data.start;
  if (!data.canvas) return;
  ctx = data.canvas.getContext("2d");
  buf = new OffscreenCanvas(data.canvas.width, data.canvas.height);
  bctx = buf.getContext("2d");
  path = buildPath();
  requestAnimationFrame(tick);
};