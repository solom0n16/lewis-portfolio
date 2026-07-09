LEWIS BUENAVENTURA · PORTFOLIO 2026
====================================

HOW TO RUN
  Open index.html in any modern browser. No build step, no server.

FOLDER STRUCTURE
  /index.html            main page
  /case-study.html       case study template (serves all 4 studies)
  /css/style.css         all styles
  /js/script.js          main page interactions
  /js/world.js           ambient background
  /js/cases.js           ★ ALL CASE STUDY CONTENT — edit here
  /js/case-page.js       case study renderer (rarely need to touch)
  /images/               put all your assets here

────────────────────────────────────────────────────
IMAGES TO ADD (drop into /images/, names matter)
────────────────────────────────────────────────────
  headshot.png            your portrait (portrait orientation)

  Homepage project snapshots:
  project-01.png          Financial Report
  project-02.png          Italy COVID-19
  project-03.png          SEA CO2 / Thailand
  project-04.png          Glassdoor Job Market

  Case study PIPELINE screenshots (5 per project).
  Pattern: {prefix}-{n}-{stage}.png
    Financial Report  → fin-1-raw / fin-2-sql / fin-3-powerquery / fin-4-model / fin-5-dashboard
    Italy COVID-19    → covid-1-raw … covid-5-dashboard
    SEA CO2           → co2-1-raw … co2-5-dashboard
    Glassdoor         → jobs-1-raw … jobs-5-dashboard
  (You can rename these in js/cases.js if you prefer other names.)

  Any missing image shows a tasteful placeholder — safe to launch
  with gaps and fill in over time.

  Résumé: put Lewis-Buenaventura-Resume.pdf in the root folder
  (same level as index.html) for the download buttons to work.

────────────────────────────────────────────────────
EDITING GUIDE — where each thing lives
────────────────────────────────────────────────────
HOMEPAGE (index.html) — search for these:

  • Headline / bio ............ "hero-card-headline" / "about-bio"
  • NOW strip ................. "now-strip"   (currently doing…)
  • Metrics numbers .......... "data-metric"  (data-value = the number,
                               the suffix text is in the markup)
  • Tech / Core skill scores . "data-skill"   (score out of 10)
  • TOOLBOX / INDUSTRIES ...... "readout-card"
  • How I Work steps ......... "flow-step"
  • Experience cards ......... "exp-item"
  • Credentials orbit cards .. "orbit-card"   (tag / name / issuer /
                               href = link to the credential)
                               Update the count in "orbit-core-count".
  • Testimonials ............. "tm-card"      (quote / name / role)
  • Email / LinkedIn / GitHub  contact section (search "@gmail" / "GITHUB")

CASE STUDIES (js/cases.js) — one object per project. Every section
is a labelled field with inline comments at the top of the file:
  context, problem, dataBody+data, pipeline (5 stages),
  dashBody, stats, findings, recommendations, impact, lessons, links.
  Set any link to '' (empty string) to hide that button.

  Case study URLs:
    case-study.html#financial-report
    case-study.html#covid-italy
    case-study.html#co2-thailand
    case-study.html#glassdoor-jobs

────────────────────────────────────────────────────
COLORS
────────────────────────────────────────────────────
  Edit the CSS variables at the very top of css/style.css:
    --ink / --sage / --sage-bright / --mint / --cream …
  Change those 5–6 and the whole site re-themes.

────────────────────────────────────────────────────
NOTES
────────────────────────────────────────────────────
  • Numbers in Experience bullets and homepage Metrics are
    APPROXIMATE placeholders — verify/replace with real figures.
  • Testimonials are placeholders — add real quotes when you have them.
  • Projects gallery: pinned horizontal scroll on desktop, native
    swipe on mobile. The pipeline screenshots live in the case study
    page (click "Case Study" on any project), not the homepage cards.
  • Dark-mode native, fully responsive, respects
    prefers-reduced-motion, custom cursor on desktop only.


MARCUS UPDATE - GLASSDOOR CASE STUDY
- Added Glassdoor Job Market case content to project 04.
- Added Sprint 4 PDF deck under /assets/.
- Added cleaning and EDA notebooks under /notebooks/.
- Added cleaned CSV under /data/ for reproducibility.
- Added project and methodology images under /images/.
- Dashboard link intentionally omitted until a real dashboard artifact exists.
