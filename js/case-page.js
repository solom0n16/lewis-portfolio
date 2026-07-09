/* ═══════════════════════════════════════════════════════════════
   LEWIS BUENAVENTURA · PORTFOLIO 2026 — js/case-page.js
   Renders one case study from js/cases.js based on the URL hash,
   and drives the interactive Methodology pipeline stepper.
   e.g.  case-study.html#covid-italy
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var qs = function (s) { return document.querySelector(s); };
  var CASES = window.CASES || {};
  var ORDER = window.CASE_ORDER || Object.keys(CASES);

  function paras(arr) {
    return (arr || []).map(function (p) { return '<p>' + p + '</p>'; }).join('');
  }
  function bullets(arr) {
    return (arr || []).map(function (i) { return '<li>' + i + '</li>'; }).join('');
  }

  function slugFromHash() {
    var h = (location.hash || '').replace('#', '');
    return CASES[h] ? h : ORDER[0];
  }

  /* ── pipeline stepper state ── */
  var pipe = { stages: [], i: 0 };

  function renderPipe() {
    var s = pipe.stages[pipe.i];
    if (!s) return;
    var total = pipe.stages.length;

    qs('#pipeNum').textContent =
      ('0' + (pipe.i + 1)) + ' / ' + ('0' + total);
    qs('#pipeTitle').textContent = s.title;
    qs('#pipeDesc').innerHTML = s.desc;
    qs('#pipeShotLabel').textContent = (s.label || 'SCREENSHOT') + ' SCREENSHOT';

    var img = qs('#pipeShot');
    img.style.display = '';
    img.src = s.shot;
    img.alt = s.title + ' screenshot';

    /* tab active state */
    var tabs = document.querySelectorAll('.pipeline-tab');
    for (var t = 0; t < tabs.length; t++) {
      tabs[t].classList.toggle('is-active', t === pipe.i);
      tabs[t].setAttribute('aria-selected', t === pipe.i ? 'true' : 'false');
    }
  }

  function buildPipe(stages) {
    pipe.stages = stages || [];
    pipe.i = 0;
    var tabsWrap = qs('#pipelineTabs');
    tabsWrap.innerHTML = '';

    pipe.stages.forEach(function (s, idx) {
      var b = document.createElement('button');
      b.className = 'pipeline-tab';
      b.setAttribute('role', 'tab');
      b.innerHTML =
        '<span class="pipeline-tab-label mono">' + (s.label || ('0' + (idx + 1))) + '</span>' +
        '<span class="pipeline-tab-name">' + s.title + '</span>';
      b.addEventListener('click', function () { pipe.i = idx; renderPipe(); });
      tabsWrap.appendChild(b);

      if (idx < pipe.stages.length - 1) {
        var arr = document.createElement('span');
        arr.className = 'pipeline-tab-arrow';
        arr.setAttribute('aria-hidden', 'true');
        tabsWrap.appendChild(arr);
      }
    });

    renderPipe();
  }

  qs('#pipePrev').addEventListener('click', function () {
    pipe.i = (pipe.i - 1 + pipe.stages.length) % pipe.stages.length;
    renderPipe();
  });
  qs('#pipeNext').addEventListener('click', function () {
    pipe.i = (pipe.i + 1) % pipe.stages.length;
    renderPipe();
  });

  /* ── main render ── */
  function render() {
    var slug = slugFromHash();
    var c = CASES[slug];
    if (!c) return;

    var idx = ORDER.indexOf(slug);
    var total = ORDER.length;

    document.title = c.title + ' \u00B7 Case Study \u00B7 Lewis Buenaventura';
    qs('#caseTag').textContent = 'CASE STUDY \u00B7 ' + c.num + ' / 0' + total;

    qs('#caseTitle').innerHTML =
      c.title + ' <span class="serif-it">' + c.titleAccent + '</span>';
    qs('#caseLede').textContent = c.lede;

    qs('#metaRole').textContent = c.meta.role;
    qs('#metaTimeline').textContent = c.meta.timeline;
    qs('#metaTools').textContent = c.meta.tools;
    qs('#metaAnalysis').textContent = c.meta.analysis;

    qs('#caseContext').innerHTML = paras(c.context);
    qs('#caseProblem').innerHTML = paras(c.problem);
    qs('#caseDataBody').innerHTML = paras(c.dataBody);
    qs('#caseData').innerHTML = bullets(c.data);

    buildPipe(c.pipeline);

    qs('#caseDashHeading').textContent = c.dashHeading || 'The Dashboard';
    qs('#caseDashBody').innerHTML = paras(c.dashBody);
    var shot = qs('#caseShot');
    shot.style.display = '';
    shot.src = c.shot;
    shot.alt = c.title + ' output snapshot';
    qs('#caseShotLabel').textContent = c.shotLabel || 'FINAL DASHBOARD';

    qs('#caseStats').innerHTML = (c.stats || []).map(function (s) {
      return '<div class="case-stat glass">' +
        '<span class="case-stat-value">' + s.value + '</span>' +
        '<span class="case-stat-label">' + s.label + '</span></div>';
    }).join('');
    qs('#caseFindings').innerHTML = bullets(c.findings);
    qs('#caseRecommendations').innerHTML = bullets(c.recommendations);
    qs('#caseImpact').innerHTML = paras(c.impact);
    qs('#caseLessons').innerHTML = bullets(c.lessons);

    var links = [];
    var linkMap = [
      { key: 'deck',      label: 'Full Deck' },
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'cleaning',  label: 'Cleaning Notebook' },
      { key: 'notebook',  label: 'EDA Notebook' },
      { key: 'dataset',   label: 'Cleaned CSV' },
      { key: 'cleaning_code', label: 'Cleaning Code' },
      { key: 'notebook_code', label: 'EDA Code' }
    ];
    linkMap.forEach(function (l) {
      if (c.links && c.links[l.key]) links.push({ label: l.label, href: c.links[l.key] });
    });
    qs('#caseLinks').innerHTML = links.map(function (l) {
      return '<a class="project-link" href="' + l.href + '" target="_blank" rel="noopener">' +
        '<span>' + l.label + '</span><span class="cta-arrow"></span></a>';
    }).join('');

    var prevSlug = ORDER[(idx - 1 + total) % total];
    var nextSlug = ORDER[(idx + 1) % total];
    qs('#casePrev').href = '#' + prevSlug;
    qs('#casePrevTitle').textContent = CASES[prevSlug].title;
    qs('#caseNext').href = '#' + nextSlug;
    qs('#caseNextTitle').textContent = CASES[nextSlug].title;
  }

  window.addEventListener('hashchange', function () {
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  render();
})();
