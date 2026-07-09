/* ═══════════════════════════════════════════════════════════════
   LEWIS BUENAVENTURA · PORTFOLIO 2026 — js/script.js
   THE CONDUCTOR — scroll choreography, cursor, UI.

   Stack: Lenis (smooth scroll) + GSAP ScrollTrigger
   Adapted from Carlo's portfolio reference for the pinned
   horizontal projects gallery. Falls back to static page if
   CDNs fail. Touch devices get native snap scroll.
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 00 · Utils & env ──────────────────────────────────────── */
  var qs  = function (s, c) { return (c || document).querySelector(s); };
  var qsa = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };

  var hasGSAP  = typeof gsap !== 'undefined';
  var hasST    = hasGSAP && typeof ScrollTrigger !== 'undefined';
  var hasLenis = typeof Lenis !== 'undefined';
  var isTouch  = window.matchMedia('(hover: none), (pointer: coarse)').matches;
  var reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var world    = function () { return window.DataWorld || null; };

  if (hasST) {
    gsap.registerPlugin(ScrollTrigger);
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
  }

  function staticFallback() {
    document.documentElement.classList.remove('js');
    document.documentElement.classList.add('no-js');
    qsa('[data-reveal]').forEach(function (el) {
      el.style.opacity = 1; el.style.transform = 'none';
    });
  }
  if (!hasGSAP || !hasST) staticFallback();

  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  /* ── 01 · Smooth scroll (Lenis) ────────────────────────────── */
  var lenis = null;
  if (hasLenis && !reduced) {
    lenis = new Lenis({
      duration: 1.15,
      easing: function (t) { return 1 - Math.pow(1 - t, 3); },
      smoothWheel: true,
      syncTouch: false
    });
    if (hasST) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }
  function scrollToEl(target, offset) {
    if (lenis) lenis.scrollTo(target, { offset: offset || 0, duration: 1.4, force: true });
    else if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'smooth' });
    else target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /* ── 02 · Preloader ────────────────────────────────────────── */
  (function preloader() {
    var pre  = qs('#preloader');
    if (!pre) return;
    var fill = qs('#preloaderFill'),
        pct  = qs('#preloaderPct'),
        msg  = qs('#preloaderMsg');
    var msgs = ['loading…', 'connecting…', 'querying…',
                'modeling…', 'rendering…', 'ready.'];
    var p = 0, mi = 0, loaded = false, done = false;

    window.addEventListener('load', function () { loaded = true; });
    setTimeout(function () { loaded = true; }, 3200);

    var iv = setInterval(function () {
      var ceiling = loaded ? 100 : 88;
      p = Math.min(ceiling, p + 2.2 + Math.random() * 3.4);
      if (fill) fill.style.width = p + '%';
      if (pct)  pct.textContent = Math.floor(p) + '%';
      var target = Math.min(msgs.length - 1, Math.floor(p / 18));
      if (target !== mi && msg) { mi = target; msg.textContent = msgs[mi]; }
      if (p >= 100 && !done) {
        done = true;
        clearInterval(iv);
        setTimeout(function () {
          window.scrollTo(0, 0);
          if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
          pre.classList.add('done');
          if (world()) world().pulse();
          document.body.classList.add('is-ready');
        }, 280);
      }
    }, 60);
  })();

  /* ── 03 · Split text ───────────────────────────────────────── */
  qsa('[data-split]').forEach(function (el) {
    var nodes = Array.prototype.slice.call(el.childNodes);
    el.innerHTML = '';
    nodes.forEach(function (node) {
      if (node.nodeType === 3) {
        node.textContent.split(/(\s+)/).forEach(function (word) {
          if (!word) return;
          if (/^\s+$/.test(word)) { el.appendChild(document.createTextNode(' ')); return; }
          var w = document.createElement('span');
          w.className = 'word';
          word.split('').forEach(function (ch) {
            var c = document.createElement('span');
            c.className = 'char';
            c.textContent = ch;
            w.appendChild(c);
          });
          el.appendChild(w);
        });
      } else if (node.nodeType === 1) {
        var clone = node.cloneNode(false);
        clone.innerHTML = '';
        var inner = document.createElement('span');
        inner.setAttribute('data-split', '');
        inner.textContent = node.textContent;
        clone.appendChild(inner);
        el.appendChild(clone);
      } else {
        el.appendChild(node.cloneNode(true));
      }
    });
    qsa('[data-split]', el).forEach(function (sub) {
      var txt = sub.textContent;
      var parent = sub.parentNode;
      sub.remove();
      txt.split(/(\s+)/).forEach(function (word) {
        if (!word) return;
        if (/^\s+$/.test(word)) { parent.appendChild(document.createTextNode(' ')); return; }
        var w = document.createElement('span');
        w.className = 'word';
        word.split('').forEach(function (ch) {
          var c = document.createElement('span');
          c.className = 'char';
          c.textContent = ch;
          w.appendChild(c);
        });
        parent.appendChild(w);
      });
    });
  });

  /* ── 04 · Reveals + split reveals ──────────────────────────── */
  if (hasST && !reduced) {
    qsa('[data-reveal]').forEach(function (el) {
      gsap.fromTo(el,
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true } });
    });
    qsa('[data-split]').forEach(function (el) {
      var chars = qsa('.char', el);
      if (!chars.length) return;
      gsap.fromTo(chars,
        { opacity: 0, yPercent: 90, rotateX: -55 },
        { opacity: 1, yPercent: 0, rotateX: 0,
          duration: 1.1, ease: 'power4.out',
          stagger: { each: 0.022, from: 'start' },
          scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
    });
  }

  /* ── 05 · Cursor (desktop only) ────────────────────────────── */
  (function crosshair() {
    if (isTouch || reduced) return;
    var xh = qs('#xhair'); if (!xh) return;
    var ring = qs('#xhairRing'), coords = qs('#xhairCoords');
    var x = innerWidth / 2, y = innerHeight / 2, tx = x, ty = y;
    var dot = qs('.xhair-dot', xh);

    document.addEventListener('pointermove', function (e) {
      tx = e.clientX; ty = e.clientY;
      if (coords) coords.textContent =
        'x:' + String(Math.round(tx)).padStart(4, '0') +
        ' · y:' + String(Math.round(ty)).padStart(4, '0');
    }, { passive: true });

    document.addEventListener('pointerdown', function () { xh.classList.add('is-down'); });
    document.addEventListener('pointerup',   function () { xh.classList.remove('is-down'); });
    document.addEventListener('mouseleave',  function () { xh.classList.add('is-hidden'); });
    document.addEventListener('mouseenter',  function () { xh.classList.remove('is-hidden'); });

    document.addEventListener('pointerover', function (e) {
      var t = e.target.closest('[data-cursor], a, button');
      xh.classList.toggle('is-active', !!t);
    }, { passive: true });

    (function loop() {
      x += (tx - x) * 0.22; y += (ty - y) * 0.22;
      ring.style.left = x + 'px'; ring.style.top = y + 'px';
      if (coords) { coords.style.left = x + 'px'; coords.style.top = y + 'px'; }
      dot.style.left = tx + 'px'; dot.style.top = ty + 'px';
      requestAnimationFrame(loop);
    })();
  })();

  /* ── 06 · Magnetic elements ────────────────────────────────── */
  if (!isTouch && !reduced && hasGSAP) {
    qsa('[data-magnetic]').forEach(function (el) {
      var sx = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' });
      var sy = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' });
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        sx((e.clientX - r.left - r.width / 2) * 0.28);
        sy((e.clientY - r.top - r.height / 2) * 0.28);
      });
      el.addEventListener('pointerleave', function () { sx(0); sy(0); });
    });
  }

  /* ── 07 · 3D tilt — lite cards ─────────────────────────────── */
  if (!isTouch && !reduced && hasGSAP) {
    qsa('[data-tilt-lite]').forEach(function (card) {
      var rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3.out' });
      var ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3.out' });
      gsap.set(card, { transformPerspective: 900 });
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        ry(((e.clientX - r.left) / r.width - 0.5) * 5);
        rx(-((e.clientY - r.top) / r.height - 0.5) * 4);
      });
      card.addEventListener('pointerleave', function () { rx(0); ry(0); });
    });
  }

  /* ── 08 · Glass specular sweep on hover ────────────────────── */
  qsa('.glass, .glass-deep').forEach(function (g) {
    if (g.closest('.project-visual')) return;
    g.addEventListener('pointerenter', function () {
      g.classList.remove('shine');
      void g.offsetWidth;
      g.classList.add('shine');
    });
    g.addEventListener('animationend', function () { g.classList.remove('shine'); });
  });

  /* ── 09 · Nav — hide on down, show on up ───────────────────── */
  (function nav() {
    var nav = qs('#nav'); if (!nav) return;
    var lastY = 0;
    function onScroll(y) {
      if (y > lastY + 6 && y > 140) nav.classList.add('is-hidden');
      else if (y < lastY - 6)       nav.classList.remove('is-hidden');
      lastY = y;
    }
    if (lenis) lenis.on('scroll', function (e) { onScroll(e.scroll); });
    else window.addEventListener('scroll', function () { onScroll(window.scrollY); }, { passive: true });

    var links = qsa('.nav-links a');
    if ('IntersectionObserver' in window) {
      var map = {};
      links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) {
            links.forEach(function (a) { a.classList.remove('is-current'); });
            var a = map[en.target.id]; if (a) a.classList.add('is-current');
          }
        });
      }, { rootMargin: '-40% 0px -50% 0px' });
      ['hero', 'about', 'workflow', 'projects', 'experience', 'credentials', 'contact'].forEach(function (id) {
        var s = qs('#' + id); if (s) io.observe(s);
      });
    }

    var burger = qs('#navBurger'), sheet = qs('#navSheet');
    if (burger && sheet) {
      burger.addEventListener('click', function () {
        var open = sheet.classList.toggle('is-open');
        burger.setAttribute('aria-expanded', open);
        sheet.setAttribute('aria-hidden', !open);
      });
      qsa('a', sheet).forEach(function (a) {
        a.addEventListener('click', function () {
          sheet.classList.remove('is-open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    qsa('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var target = qs(id);
        if (!target) return;
        e.preventDefault();
        var navOffset = id === '#hero' ? 0 : -88;
        var st = window.__projST;
        if (st && lenis) {
          var cur = window.scrollY || 0;
          var ty = target.getBoundingClientRect().top + cur;
          var crosses = (cur < st.start && ty > st.end) || (cur > st.end && ty < st.start);
          if (crosses) {
            lenis.scrollTo(target, { offset: navOffset, immediate: true, force: true });
            return;
          }
        }
        scrollToEl(target, navOffset);
      });
    });
  })();

  /* ── 10 · Scroll progress + world sync ─────────────────────── */
  (function progress() {
    var fill = qs('#scrollProgressFill');
    function upd(y) {
      var max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
      var p = clamp(y / max, 0, 1);
      if (fill) fill.style.transform = 'scaleY(' + p + ')';
      if (world()) world().setScroll(p);
    }
    if (lenis) lenis.on('scroll', function (e) { upd(e.scroll); });
    else window.addEventListener('scroll', function () { upd(window.scrollY); }, { passive: true });
    upd(window.scrollY || 0);
  })();

  /* ── 11 · Projects — pinned horizontal scroll (Image 2 layout) ─ */
  (function projects() {
    var track = qs('#projectsTrack'); if (!track) return;
    var cards = qsa('.project-card', track);
    var rail = qs('#projRail'), current = qs('#projCurrent');

    function setCurrent(p) {
      if (rail) rail.style.transform = 'scaleX(' + clamp(0.33 + p * 0.67, 0, 1) + ')';
      if (current) current.textContent = '0' + (Math.round(p * (cards.length - 1)) + 1);
    }

    var mqDesktop = window.matchMedia('(min-width: 881px)');

    if (mqDesktop.matches && hasST && !reduced) {
      var getDist = function () {
        return Math.max(0, track.scrollWidth - innerWidth +
               parseFloat(getComputedStyle(track).paddingLeft) * 0.4);
      };

      var stepIdx = 0, stepAnim = false, stepCool = 0, returnLock = false, lastWheelTime = 0;

      function styleCards() {
        var mid = innerWidth / 2;
        cards.forEach(function (card) {
          var r = card.getBoundingClientRect();
          var c = r.left + r.width / 2;
          var d = clamp((c - mid) / innerWidth, -1, 1);
          gsap.set(card, {
            rotationY: d * -14,
            z: -Math.abs(d) * 140,
            opacity: Math.max(0, 1 - Math.pow(Math.abs(d) / 0.72, 2)),
            transformPerspective: 1400
          });
          card.classList.toggle('is-active', Math.abs(d) < 0.1);
        });
      }

      function killScrub() {
        var st = window.__projST;
        if (!st) return;
        ScrollTrigger.update();
        var tw = st.getTween && st.getTween();
        if (tw) tw.progress(1);
        styleCards();
      }

      var posesP = [0, 0.5, 1];
      function computePoses() {
        var st = window.__projST;
        var dist = getDist();
        if (!st || !dist) return;
        var curX = Number(gsap.getProperty(track, 'x')) || 0;
        var saved = cards.map(function (c) { return c.style.transform; });
        cards.forEach(function (c) { c.style.transform = 'none'; });
        posesP = cards.map(function (card) {
          var r = card.getBoundingClientRect();
          var center = r.left + r.width / 2 - curX;
          return Math.max(0, Math.min(1, (center - innerWidth / 2) / dist));
        });
        cards.forEach(function (c, i) { c.style.transform = saved[i]; });
        posesP[0] = 0;
        posesP[posesP.length - 1] = 1;
      }

      function nearestPose(p) {
        var best = 0, bd = Infinity;
        for (var i = 0; i < posesP.length; i++) {
          var d = Math.abs(p - posesP[i]);
          if (d < bd) { bd = d; best = i; }
        }
        return best;
      }

      function poseY(i) {
        var st = window.__projST;
        var p = posesP[Math.max(0, Math.min(posesP.length - 1, i))];
        var raw = st.start + (st.end - st.start) * p;
        return Math.max(st.start + 2, Math.min(st.end - 2, raw));
      }

      function stepTo(i, fast) {
        var st = window.__projST;
        if (!st) return;
        stepIdx = Math.max(0, Math.min(cards.length - 1, i));
        stepAnim = true;
        var dur = fast ? 0.45 : 0.9;
        if (lenis) {
          lenis.scrollTo(poseY(stepIdx), {
            duration: dur,
            easing: function (t) { return 1 - Math.pow(1 - t, 3); }
          });
        } else {
          window.scrollTo({ top: poseY(stepIdx), behavior: 'smooth' });
        }
        setTimeout(function () {
          stepAnim = false;
          stepCool = performance.now() + 150;
        }, dur * 1000 + 80);
      }

      window.addEventListener('wheel', function (e) {
        var st = window.__projST;
        var nowT = performance.now();
        var isFresh = (nowT - lastWheelTime) > 150;
        if (Math.abs(e.deltaY) >= 4) lastWheelTime = nowT;

        if (isTouch || !st || !st.isActive) return;

        if (returnLock) {
          if (e.deltaY > 4) {
            e.preventDefault();
            e.stopPropagation();
            if (stepAnim || performance.now() < stepCool) return;
            returnLock = false;
            track.classList.remove('is-locked');
            if (lenis) lenis.scrollTo(st.start, { immediate: true });
            killScrub();
            stepIdx = 0;
            stepTo(1);
          } else if (e.deltaY < -4) {
            e.preventDefault();
            e.stopPropagation();
            if (stepAnim || performance.now() < stepCool) return;
            returnLock = false;
            track.classList.remove('is-locked');
            if (lenis) {
              lenis.scrollTo(st.start, { immediate: true });
              killScrub();
              lenis.scrollTo(st.start - innerHeight * 0.22, { duration: 0.6 });
            } else {
              killScrub();
              window.scrollTo({ top: st.start - innerHeight * 0.22, behavior: 'smooth' });
            }
            stepCool = performance.now() + 250;
          }
          return;
        }

        if (stepAnim || nowT < stepCool) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        if (Math.abs(e.deltaY) < 4) { e.preventDefault(); e.stopPropagation(); return; }
        if (!isFresh) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        var dir = e.deltaY > 0 ? 1 : -1;
        stepIdx = nearestPose(st.progress);
        var next = stepIdx + dir;
        if (next < 0 || next > cards.length - 1) return;
        e.preventDefault();
        e.stopPropagation();
        stepTo(next);
      }, { passive: false, capture: true });

      var ptl = gsap.timeline({
        scrollTrigger: {
          trigger: '#projectsPin',
          start: 'top top',
          end: function () { return '+=' + Math.round(getDist() * 0.78 + 220); },
          scrub: 0.45,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: function () { requestAnimationFrame(computePoses); },
          onToggle: function (self) {
            if (isTouch || returnLock) return;
            if (self.isActive) {
              if (self.direction === -1) {
                stepIdx = nearestPose(self.progress);
                return;
              }
              stepIdx = 0;
              if (lenis) lenis.scrollTo(poseY(0), { immediate: true, force: true });
              else window.scrollTo(0, poseY(0));
              killScrub();
              stepAnim = false;
              stepCool = 0;
            } else {
              stepAnim = false;
            }
          },
          onUpdate: function (st) {
            if (returnLock) { setCurrent(0); return; }
            setCurrent(st.progress);
            styleCards();
          }
        }
      });
      ptl.to(track, { x: function () { return -getDist(); }, ease: 'none', duration: 1 });
      window.__projST = ptl.scrollTrigger;
      setCurrent(0);
      requestAnimationFrame(function () { computePoses(); styleCards(); });

      function lockPose() {
        killScrub();
        track.classList.add('is-locked');
        cards.forEach(function (c, i) { c.classList.toggle('is-active', i === 0); });
        setCurrent(0);
      }
      function returnWatch(y) {
        var st = window.__projST;
        if (!st) return;
        if (!returnLock && y > st.end + innerHeight * 1.02) {
          returnLock = true;
          lockPose();
        } else if (returnLock && y < st.start + 10) {
          returnLock = false;
          track.classList.remove('is-locked');
          killScrub();
        }
      }
      if (lenis) lenis.on('scroll', function (e) { returnWatch(e.scroll); });
      else window.addEventListener('scroll', function () { returnWatch(window.scrollY); }, { passive: true });

      /* grab to scroll inside the pinned gallery */
      var pinEl = qs('#projectsPin');
      if (pinEl && !isTouch) {
        var grabbing = false, gx = 0;
        pinEl.addEventListener('pointerdown', function (e) {
          var st = window.__projST;
          if (!st || !st.isActive || returnLock) return;
          if (e.target.closest('a, button')) return;
          grabbing = true;
          gx = e.clientX;
          pinEl.classList.add('is-grabbing');
          e.preventDefault();
        });
        window.addEventListener('pointermove', function (e) {
          if (!grabbing) return;
          var st = window.__projST;
          if (!st) return;
          var dx = e.clientX - gx;
          gx = e.clientX;
          var v = Math.max(st.start, Math.min(st.end, st.scroll() - dx * 1.6));
          if (lenis) lenis.scrollTo(v, { immediate: true, force: true });
          else window.scrollTo(0, v);
        });
        window.addEventListener('pointerup', function () {
          if (!grabbing) return;
          grabbing = false;
          pinEl.classList.remove('is-grabbing');
          var st = window.__projST;
          if (st && st.isActive && !returnLock) stepTo(nearestPose(st.progress), true);
        });
      }
    } else {
      /* MOBILE / fallback */
      cards.forEach(function (card) { card.classList.add('is-active'); });
      track.addEventListener('scroll', function () {
        var max = Math.max(1, track.scrollWidth - track.clientWidth);
        setCurrent(clamp(track.scrollLeft / max, 0, 1));
      }, { passive: true });
      setCurrent(0);
      if (hasST && !reduced) {
        cards.forEach(function (card) {
          gsap.fromTo(card, { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 90%', once: true } });
        });
      }
    }
  })();

  /* ── 12 · Skills Matrix — build blocks + animate fill ──────── */
  (function skillsMatrix() {
    var rows = qsa('.skill-row');
    if (!rows.length) return;

    rows.forEach(function (row) {
      var wrap = qs('.skill-blocks', row);
      if (!wrap) return;
      var level = parseInt(row.getAttribute('data-skill') || '0', 10);
      for (var i = 0; i < 10; i++) {
        var b = document.createElement('span');
        b.className = 'skill-block' + (i < level ? ' will-fill' : '');
        wrap.appendChild(b);
      }
    });

    function fillRow(row, delay) {
      var blocks = qsa('.will-fill', row);
      blocks.forEach(function (b, i) {
        setTimeout(function () { b.classList.add('is-filled'); }, delay + i * 55);
      });
    }

    if (hasST && !reduced) {
      rows.forEach(function (row, ri) {
        ScrollTrigger.create({
          trigger: row, start: 'top 92%', once: true,
          onEnter: function () { fillRow(row, ri * 120); }
        });
      });
    } else {
      rows.forEach(function (row) {
        qsa('.will-fill', row).forEach(function (b) { b.classList.add('is-filled'); });
      });
    }
  })();

  /* ── 13 · Experience + stat reveals ────────────────────────── */
  if (hasST && !reduced) {
    qsa('[data-exp]').forEach(function (item, i) {
      gsap.fromTo(item, { opacity: 0, y: 36 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: (i % 4) * 0.08,
          scrollTrigger: { trigger: item, start: 'top 90%', once: true } });
    });
    qsa('[data-stat]').forEach(function (s, i) {
      gsap.fromTo(s, { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: (i % 4) * 0.08,
          scrollTrigger: { trigger: s, start: 'top 92%', once: true } });
    });
  }

  /* ── 13b · Metrics count-up ────────────────────────────────── */
  (function metrics() {
    var items = qsa('[data-metric]');
    if (!items.length) return;

    function run(el) {
      var end = parseFloat(el.getAttribute('data-value')) || 0;
      var numEl = qs('.metric-num', el);
      if (!numEl) return;
      if (hasGSAP && !reduced) {
        var obj = { v: 0 };
        gsap.to(obj, {
          v: end, duration: 1.6, ease: 'power2.out',
          onUpdate: function () { numEl.textContent = Math.round(obj.v); }
        });
      } else {
        numEl.textContent = end;
      }
    }

    if (hasST && !reduced) {
      items.forEach(function (el, i) {
        ScrollTrigger.create({
          trigger: el, start: 'top 88%', once: true,
          onEnter: function () { setTimeout(function () { run(el); }, (i % 5) * 90); }
        });
        gsap.fromTo(el, { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: (i % 5) * 0.06,
            scrollTrigger: { trigger: el, start: 'top 90%', once: true } });
      });
    } else {
      items.forEach(run);
    }
  })();

  /* ── 13c · Workflow roadmap reveal + active step ───────────── */
  (function workflowRoadmap() {
    var flow = qs('#flow');
    var steps = flow ? qsa('[data-flow]', flow) : [];
    if (!flow || !steps.length) return;

    if (hasST && !reduced) {
      ScrollTrigger.create({
        trigger: flow,
        start: 'top 72%',
        end: 'bottom 34%',
        scrub: true,
        onUpdate: function (self) {
          flow.style.setProperty('--flow-progress', self.progress.toFixed(3));
        }
      });

      steps.forEach(function (step, i) {
        gsap.fromTo(step, { opacity: 0, y: 34, scale: 0.965 },
          { opacity: 0.58, y: 18, scale: 0.985, duration: 0.65, ease: 'power3.out', delay: (i % 7) * 0.04,
            scrollTrigger: { trigger: step, start: 'top 92%', once: true } });

        ScrollTrigger.create({
          trigger: step,
          start: 'top 64%',
          end: 'bottom 42%',
          onEnter: function () { step.classList.add('is-active'); },
          onEnterBack: function () { step.classList.add('is-active'); },
          onLeave: function () { if (!step.classList.contains('is-final')) step.classList.remove('is-active'); },
          onLeaveBack: function () { if (!step.classList.contains('is-final')) step.classList.remove('is-active'); }
        });
      });
    } else {
      flow.style.setProperty('--flow-progress', '1');
      steps.forEach(function (step) { step.classList.add('is-active'); });
    }

    if (hasST && !reduced) {
      qsa('[data-tm]').forEach(function (card, i) {
        gsap.fromTo(card, { opacity: 0, y: 36 },
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: card, start: 'top 90%', once: true } });
      });
    }
  })();

  /* ── 14 · Credentials Orbit — drag-to-spin solar system ────── */
  (function credOrbit() {
    var stage = qs('#orbitStage'); if (!stage) return;
    var cards = qsa('[data-orbit]', stage);
    if (!cards.length) return;

    /* static fallback: reduced motion or no rAF weirdness */
    if (reduced) {
      stage.classList.add('is-static');
      return;
    }

    var TAU = Math.PI * 2;
    var theta = -0.6;                 /* start angle */
    var AUTO = 0.0022;                /* idle spin speed (rad/frame @60fps) */
    var spin = 0;                     /* drag-added velocity */
    var dragging = false, lastX = 0, movedPx = 0;
    var visible = true;

    if ('IntersectionObserver' in window) {
      visible = false;
      new IntersectionObserver(function (es) {
        es.forEach(function (en) { visible = en.isIntersecting; });
      }, { threshold: 0.05 }).observe(stage);
    }

    /* drag: pointer on the stage spins the system */
    stage.addEventListener('pointerdown', function (e) {
      dragging = true;
      movedPx = 0;
      lastX = e.clientX;
      stage.classList.add('is-grabbing');
    });
    window.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - lastX;
      lastX = e.clientX;
      movedPx += Math.abs(dx);
      theta += dx * 0.006;            /* direct drive while held */
      spin = dx * 0.0011;             /* remember velocity for inertia */
    });
    window.addEventListener('pointerup', function () {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove('is-grabbing');
    });

    /* a real drag shouldn't fire the card's link */
    cards.forEach(function (card) {
      card.addEventListener('click', function (e) {
        if (movedPx > 8) { e.preventDefault(); }
      });
      card.addEventListener('dragstart', function (e) { e.preventDefault(); });
    });

    function layout() {
      var w = stage.clientWidth, h = stage.clientHeight;
      var rx = Math.min(w * 0.40, 520);          /* horizontal radius */
      var ry = h * 0.32;                          /* vertical radius (ellipse) */
      var cx = w / 2, cy = h / 2;

      for (var i = 0; i < cards.length; i++) {
        var a = theta + (i * TAU) / cards.length;
        var x = Math.cos(a) * rx;
        var y = Math.sin(a) * ry;
        var depth = (Math.sin(a) + 1) / 2;        /* 0 = back, 1 = front */
        var scale = 0.62 + depth * 0.38;
        var card = cards[i];
        card.style.transform =
          'translate(' + (cx + x - card.offsetWidth / 2) + 'px,' +
          (cy + y - card.offsetHeight / 2) + 'px) scale(' + scale.toFixed(3) + ')';
        card.style.opacity = (0.35 + depth * 0.65).toFixed(3);
        card.style.zIndex = Math.round(depth * 100);
        /* cards behind the core shouldn't steal hovers/clicks */
        card.style.pointerEvents = depth < 0.28 ? 'none' : 'auto';
      }
    }

    (function loop() {
      if (visible) {
        if (!dragging) {
          theta += AUTO + spin;
          spin *= 0.95;                /* inertia decays */
        }
        layout();
      }
      requestAnimationFrame(loop);
    })();

    window.addEventListener('resize', layout);
  })();

  /* ── 15 · Manila clock + back-to-top ───────────────────────── */
  (function contact() {
    var clock = qs('#contactClock');
    if (clock) {
      var fmt;
      try {
        fmt = new Intl.DateTimeFormat('en-PH', {
          timeZone: 'Asia/Manila', hour12: false,
          hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
      } catch (e) { fmt = null; }
      function tickClock() {
        clock.textContent = 'MNL ' + (fmt ? fmt.format(new Date()) : new Date().toLocaleTimeString());
      }
      tickClock();
      setInterval(tickClock, 1000);
    }
    var top = qs('#backToTop');
    if (top) top.addEventListener('click', function () {
      var st = window.__projST;
      if (st && lenis && (window.scrollY || 0) > st.end) {
        lenis.scrollTo(0, { immediate: true, force: true });
      } else {
        scrollToEl(0);
      }
    });
  })();

  /* ── 16 · Keep ST honest after layout shifts ───────────────── */
  if (hasST) {
    window.addEventListener('load', function () { ScrollTrigger.refresh(); });
    var rT;
    window.addEventListener('resize', function () {
      clearTimeout(rT);
      rT = setTimeout(function () { ScrollTrigger.refresh(); }, 250);
    });
  }
})();
