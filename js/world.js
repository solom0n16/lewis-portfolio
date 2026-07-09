/* ═══════════════════════════════════════════════════════════════
   LEWIS BUENAVENTURA · PORTFOLIO 2026 — js/world.js
   THE SAGE FOG — soft gradient atmosphere behind the whole site.

   One cool sage "glow", a faint top mist, and a cursor-following
   highlight, rendered as soft radial gradients on a low-res canvas.
   Section [data-world] names morph the composition; everything
   lerps continuously so the page reads as one graded piece.

   Scene names:
     dawn    → soft hero light (mint highlight from below)
     meadow  → calm reading mood (sage drifts side)
     fog     → deeper, near-dark (projects spotlight)
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  document.documentElement.classList.add('js');
  document.documentElement.classList.remove('no-js');

  var canvas = document.getElementById('world');
  if (!canvas) return;
  var ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) { canvas.style.display = 'none'; return; }

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;

  var RES = isTouch ? 0.32 : 0.44;
  var W = 0, H = 0;

  function resize() {
    W = Math.max(2, Math.round(window.innerWidth * RES));
    H = Math.max(2, Math.round(window.innerHeight * RES));
    canvas.width = W;
    canvas.height = H;
  }
  resize();

  /* Scenes — viewport-relative coords; y>1 = below fold */
  var SCENES = {
    dawn:   { sun: { x: .50, y: 1.18, r: 1.20, a: .50 }, mist: { x: .15, y: -.25, r: 1.00, a: .12 } },
    meadow: { sun: { x: .82, y: 1.30, r: 1.15, a: .32 }, mist: { x: .10, y: -.30, r: 1.05, a: .14 } },
    fog:    { sun: { x: -.20, y: 1.34, r: 1.00, a: .22 }, mist: { x: 1.15, y: -.30, r: .90, a: .08 } }
  };

  var state = 'dawn';
  var cur = JSON.parse(JSON.stringify(SCENES.dawn));
  cur.sun.a = 0;
  cur.mist.a = 0;

  var pointer = { x: .5, y: .55 }, pointerRaw = { x: .5, y: .55 };
  var glow = 0, glowTarget = 0;
  var scrollProg = 0;
  var energy = 0;
  var running = true;
  var t = 0;

  /* Input */
  if (!isTouch) {
    window.addEventListener('pointermove', function (e) {
      pointerRaw.x = e.clientX / window.innerWidth;
      pointerRaw.y = e.clientY / window.innerHeight;
      glowTarget = 1;
    }, { passive: true });
    document.addEventListener('mouseleave', function () { glowTarget = 0; });
  } else {
    window.addEventListener('touchstart', function (e) {
      if (!e.touches.length) return;
      pointerRaw.x = e.touches[0].clientX / window.innerWidth;
      pointerRaw.y = e.touches[0].clientY / window.innerHeight;
      glowTarget = 1;
    }, { passive: true });
    window.addEventListener('touchmove', function (e) {
      if (!e.touches.length) return;
      pointerRaw.x = e.touches[0].clientX / window.innerWidth;
      pointerRaw.y = e.touches[0].clientY / window.innerHeight;
    }, { passive: true });
    window.addEventListener('touchend', function () { glowTarget = 0; }, { passive: true });
  }

  function readScroll() {
    var doc = document.documentElement;
    var max = Math.max(1, doc.scrollHeight - window.innerHeight);
    scrollProg = Math.min(1, Math.max(0, (window.scrollY || doc.scrollTop) / max));
  }
  window.addEventListener('scroll', readScroll, { passive: true });
  readScroll();

  /* State switching via IntersectionObserver */
  function setState(name) {
    if (!SCENES[name] || name === state) return;
    state = name;
    energy = Math.max(energy, 0.5);
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          var w = en.target.getAttribute('data-world');
          if (w) setState(w);
        }
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('[data-world]').forEach(function (s) { io.observe(s); });
  }

  var resizeT;
  window.addEventListener('resize', function () {
    clearTimeout(resizeT);
    resizeT = setTimeout(resize, 120);
  });
  document.addEventListener('visibilitychange', function () {
    running = !document.hidden;
    if (running && !reduced) requestAnimationFrame(tick);
  });

  /* Painters */
  function lerp(a, b, k) { return a + (b - a) * k; }

  function paintOrb(x, y, r, stops) {
    if (r <= 0) return;
    var g = ctx.createRadialGradient(x, y, 0, x, y, r);
    for (var i = 0; i < stops.length; i++) g.addColorStop(stops[i][0], stops[i][1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  function frame() {
    var tgt = SCENES[state];
    var K = 0.028;
    cur.sun.x = lerp(cur.sun.x, tgt.sun.x, K);
    cur.sun.y = lerp(cur.sun.y, tgt.sun.y, K);
    cur.sun.r = lerp(cur.sun.r, tgt.sun.r, K);
    cur.sun.a = lerp(cur.sun.a, tgt.sun.a, K);
    cur.mist.x = lerp(cur.mist.x, tgt.mist.x, K);
    cur.mist.y = lerp(cur.mist.y, tgt.mist.y, K);
    cur.mist.r = lerp(cur.mist.r, tgt.mist.r, K);
    cur.mist.a = lerp(cur.mist.a, tgt.mist.a, K);

    pointer.x = lerp(pointer.x, pointerRaw.x, 0.05);
    pointer.y = lerp(pointer.y, pointerRaw.y, 0.05);
    glow = lerp(glow, glowTarget, 0.06);
    energy *= 0.962;

    var base = Math.max(W, H);
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';

    var breathe = Math.sin(t * 0.45) * 0.012 + Math.sin(t * 0.17) * 0.01;
    var leanX = (pointer.x - 0.5) * (isTouch ? 0.025 : 0.06);
    var leanY = (pointer.y - 0.5) * (isTouch ? 0.015 : 0.035);
    var drift = Math.sin(t * 0.1 + scrollProg * 4) * 0.018;

    /* main sun — cool sage glow with mint highlight */
    var sa = Math.min(1, cur.sun.a * (1 + energy * 0.9) + breathe);
    var sx = (cur.sun.x + leanX + drift) * W;
    var sy = (cur.sun.y + leanY) * H;
    var sr = cur.sun.r * base;

    paintOrb(sx, sy, sr, [
      [0,   'rgba(201,237,220,' + (sa * 0.55).toFixed(3) + ')'],
      [0.20,'rgba(168,212,192,' + (sa * 0.40).toFixed(3) + ')'],
      [0.45,'rgba(137,182,165,' + (sa * 0.22).toFixed(3) + ')'],
      [0.75,'rgba(50,80,72,'    + (sa * 0.08).toFixed(3) + ')'],
      [1,   'rgba(0,0,0,0)']
    ]);
    /* bright core */
    paintOrb(sx, sy, sr * 0.32, [
      [0,   'rgba(223,242,232,' + (sa * 0.35).toFixed(3) + ')'],
      [1,   'rgba(0,0,0,0)']
    ]);

    /* mist — faint sage wash at top */
    var ma = cur.mist.a * (1 + energy * 0.4);
    paintOrb((cur.mist.x - leanX * 0.6) * W, cur.mist.y * H, cur.mist.r * base, [
      [0,  'rgba(168,212,192,' + (ma * 0.45).toFixed(3) + ')'],
      [0.5,'rgba(80,120,108,'  + (ma * 0.18).toFixed(3) + ')'],
      [1,  'rgba(0,0,0,0)']
    ]);

    /* cursor glow */
    var ga = glow * (isTouch ? 0.10 : 0.13) * (1 + energy * 0.6);
    if (ga > 0.004) {
      paintOrb(pointer.x * W, pointer.y * H, base * 0.28, [
        [0,  'rgba(201,237,220,' + ga.toFixed(3) + ')'],
        [0.5,'rgba(137,182,165,' + (ga * 0.4).toFixed(3) + ')'],
        [1,  'rgba(0,0,0,0)']
      ]);
    }

    ctx.globalCompositeOperation = 'source-over';
  }

  function tick() {
    if (!running) return;
    t += 0.016;
    frame();
    requestAnimationFrame(tick);
  }

  if (reduced) {
    cur = JSON.parse(JSON.stringify(SCENES[state]));
    glow = 0;
    frame();
  } else {
    requestAnimationFrame(tick);
  }

  window.DataWorld = {
    setState: setState,
    setScroll: function (p) { scrollProg = Math.min(1, Math.max(0, p)); },
    pulse: function () { energy = 1; },
    isTouch: isTouch
  };
})();
