/* ═══════════════════════════════════════════════════════════════
   LEWIS BUENAVENTURA · PORTFOLIO 2026 — js/cases.js
   CASE STUDY CONTENT — edit everything here.

   Each case study is one object keyed by its slug. Sections follow
   the storytelling order:
     context → problem → data → methodology(pipeline) → dashboard
     → findings → recommendations → impact → lessons

   FIELDS
   • title / titleAccent  → headline (accent = italic mint tail)
   • lede                 → 1–2 sentence summary
   • meta                 → role / timeline / tools / analysis
   • context[]            → Business Context paragraphs
   • problem[]            → The Problem paragraphs
   • dataBody[]           → Available Data intro paragraphs
   • data[]               → bullet list of datasets/sources
   • pipeline[]           → the 5 stages. Each: { title, label, desc, shot }
                            shot = screenshot path (drop into /images/)
   • dashBody[]           → The Dashboard paragraphs
   • stats[]              → 3 headline numbers { value, label }
   • findings[]           → Key Findings bullets
   • recommendations[]    → Business Recommendations bullets
   • impact[]             → Business Impact paragraphs
   • lessons[]            → Lessons Learned bullets
   • links                → { deck, dashboard, cleaning, notebook, dataset } (''=hide)

   <strong>…</strong> is allowed inside any string.
   ═══════════════════════════════════════════════════════════════ */

/* shared pipeline scaffold — clone + edit per project.
   The 5 stages map to: messy Excel → SQL → Power Query → model → dashboard */
function pipelineTemplate(slugImgPrefix) {
  return [
    { title: 'Raw Dataset', label: 'RAW',
      desc: 'Placeholder — the messy starting point: an Excel export with inconsistent columns, blanks, and mixed types.',
      shot: 'images/' + slugImgPrefix + '-1-raw.png' },
    { title: 'Cleaning', label: 'CLEAN',
      desc: 'Placeholder — the SQL query (or Power Query step) that filters, joins, and standardizes the raw data.',
      shot: 'images/' + slugImgPrefix + '-2-sql.png' },
    { title: 'Transform', label: 'SHAPE',
      desc: 'Placeholder — Power Query applied steps: type fixes, unpivots, calculated columns, and merges.',
      shot: 'images/' + slugImgPrefix + '-3-powerquery.png' },
    { title: 'Model', label: 'MODEL',
      desc: 'Placeholder — the star-schema data model: fact and dimension tables with relationships and measures.',
      shot: 'images/' + slugImgPrefix + '-4-model.png' },
    { title: 'Dashboard', label: 'SHIP',
      desc: 'Placeholder — the final dashboard the stakeholder actually uses to make the decision.',
      shot: 'images/' + slugImgPrefix + '-5-dashboard.png' }
  ];
}

window.CASES = {

  /* ── 01 · FINANCIAL REPORT ─────────────────────────────────── */
  'financial-report': {
    num: '01',
    title: 'Financial Report',
    titleAccent: 'one source of truth.',
    lede: 'Placeholder lede — one or two sentences on what this financial reporting build consolidates and the decision it supports.',
    meta: {
      role: 'Data Analyst',
      timeline: 'Placeholder \u00B7 20XX',
      tools: 'Excel, Power BI, DAX',
      analysis: 'Variance, Trend, KPI Reporting'
    },
    context: [
      'Placeholder — set the scene. What business is this, what part of it does the finance reporting touch, and why does it matter to the people running it.'
    ],
    problem: [
      'Placeholder — the specific pain: numbers disagreed between teams, month-end was manual, leadership had no single trustworthy view.',
      'What decision was delayed or made blind because the reporting wasn\u2019t there.'
    ],
    dataBody: [
      'Placeholder — where the data came from and its rough shape and volume.'
    ],
    data: [
      'Placeholder dataset \u2014 e.g. monthly P&amp;L exports (XX months)',
      'Placeholder dataset \u2014 e.g. transaction-level revenue by segment',
      'Placeholder dataset \u2014 e.g. budget vs. actual targets'
    ],
    pipeline: pipelineTemplate('fin'),
    dashBody: [
      'Placeholder — describe the dashboard\u2019s pages: executive summary, P&amp;L drilldown, segment/margin view.'
    ],
    shot: 'images/project-01.png',
    stats: [
      { value: 'X hrs', label: 'MONTHLY REPORTING TIME SAVED (PLACEHOLDER)' },
      { value: 'X%', label: 'VARIANCE FLAGGED BEFORE MONTH-END (PLACEHOLDER)' },
      { value: '1', label: 'SOURCE OF TRUTH, REPLACING X FILES' }
    ],
    findings: [
      'Placeholder finding \u2014 the margin trend nobody had noticed.',
      'Placeholder finding \u2014 the segment quietly dragging profitability.',
      'Placeholder finding \u2014 the seasonality pattern that reframed targets.'
    ],
    recommendations: [
      'Placeholder recommendation \u2014 the action leadership should take based on the above.',
      'Placeholder recommendation \u2014 a process or cadence change.',
      'Placeholder recommendation \u2014 where to invest or cut.'
    ],
    impact: [
      'Placeholder — what changed after: faster closes, decisions on shared numbers, self-serve answers instead of ad-hoc pulls.'
    ],
    lessons: [
      'Placeholder lesson \u2014 something technical you\u2019d do differently.',
      'Placeholder lesson \u2014 something about stakeholders or scope.'
    ],
    links: { deck: '#', dashboard: '#', notebook: '' }
  },

  /* ── 02 · ITALY COVID-19 ───────────────────────────────────── */
  'covid-italy': {
    num: '02',
    title: 'Italy COVID-19',
    titleAccent: 'public health data.',
    lede: 'Placeholder lede — analyzing Italy\u2019s COVID-19 public health data to surface patterns in spread, response, and recovery.',
    meta: {
      role: 'Data Analytics Fellow \u00B7 Eskwelabs',
      timeline: 'Placeholder \u00B7 2026',
      tools: 'Python, SQL, Pandas',
      analysis: 'EDA, Time Series, Storytelling'
    },
    context: [
      'Placeholder — why this dataset, what public-health question framed the work, and who the intended audience was.'
    ],
    problem: [
      'Placeholder — raw public health data needed cleaning and structure before any honest signal could emerge.',
      'The audience was non-technical: the story had to hold without the code.'
    ],
    dataBody: [
      'Placeholder — the source of the Italy COVID-19 data, its date range, and granularity (national vs. regional).'
    ],
    data: [
      'Placeholder dataset \u2014 e.g. daily case/death counts by region',
      'Placeholder dataset \u2014 e.g. testing and hospitalization figures',
      'Placeholder dataset \u2014 e.g. policy/intervention timeline'
    ],
    pipeline: pipelineTemplate('covid'),
    dashBody: [
      'Placeholder — the dashboard/notebook views and the narrative arc they follow.'
    ],
    shot: 'images/project-02.png',
    stats: [
      { value: 'X', label: 'REGIONS ANALYZED ACROSS X WAVES (PLACEHOLDER)' },
      { value: 'X rows', label: 'RAW RECORDS CLEANED (PLACEHOLDER)' },
      { value: 'X', label: 'KEY PATTERNS PRESENTED TO MENTORS' }
    ],
    findings: [
      'Placeholder finding \u2014 the regional disparity the national numbers hid.',
      'Placeholder finding \u2014 the lag between policy and curve response.',
      'Placeholder finding \u2014 what the second wave did differently.'
    ],
    recommendations: [
      'Placeholder recommendation \u2014 what a public-health stakeholder might act on.',
      'Placeholder recommendation \u2014 a monitoring or reporting improvement.'
    ],
    impact: [
      'Placeholder — presented to industry mentors; practiced the full lifecycle from raw CSV to a narrative non-technical stakeholders could act on.'
    ],
    lessons: [
      'Placeholder lesson \u2014 a data-quality or interpretation pitfall you caught.',
      'Placeholder lesson \u2014 something about communicating uncertainty.'
    ],
    links: { deck: '#', dashboard: '', notebook: '#' }
  },

  /* ── 03 · SEA CO2 · THAILAND ───────────────────────────────── */
  'co2-thailand': {
    num: '03',
    title: 'SEA CO\u2082 Emissions',
    titleAccent: 'Thailand\u2019s path to 1.5\u00B0C.',
    lede: 'Placeholder lede — a climate policy dashboard tracking Southeast Asian emissions, with Thailand\u2019s trajectory measured against the 1.5\u00B0C target.',
    meta: {
      role: 'Data Analytics Fellow \u00B7 Eskwelabs',
      timeline: 'Placeholder \u00B7 2026',
      tools: 'Power BI, Python, SQL',
      analysis: 'Emissions Tracking, Gap Analysis'
    },
    context: [
      'Placeholder — the climate-policy backdrop and why Thailand within SEA is the focus.'
    ],
    problem: [
      'Placeholder — global emissions datasets are dense and abstract; the task was making Thailand\u2019s trajectory concrete for policy discussion.',
      'How far is the current path from 1.5\u00B0C-aligned, and which sectors carry the gap?'
    ],
    dataBody: [
      'Placeholder — the emissions datasets used and their coverage of SEA economies and sectors.'
    ],
    data: [
      'Placeholder dataset \u2014 e.g. national CO\u2082 emissions by year',
      'Placeholder dataset \u2014 e.g. sector breakdown (energy, transport, industry)',
      'Placeholder dataset \u2014 e.g. 1.5\u00B0C-aligned pathway benchmark'
    ],
    pipeline: pipelineTemplate('co2'),
    dashBody: [
      'Placeholder — the policy-facing dashboard: where the gap is, by sector and year.'
    ],
    shot: 'images/project-03.png',
    stats: [
      { value: 'X Mt', label: 'ANNUAL GAP VS. 1.5\u00B0C PATH (PLACEHOLDER)' },
      { value: 'X', label: 'SEA COUNTRIES BENCHMARKED (PLACEHOLDER)' },
      { value: 'X%', label: 'OF GAP IN TOP 2 SECTORS (PLACEHOLDER)' }
    ],
    findings: [
      'Placeholder finding \u2014 the sector driving most of the divergence.',
      'Placeholder finding \u2014 where Thailand outperforms its neighbors.',
      'Placeholder finding \u2014 the single policy lever with the most leverage.'
    ],
    recommendations: [
      'Placeholder recommendation \u2014 the highest-leverage policy action.',
      'Placeholder recommendation \u2014 a sector to prioritize.',
      'Placeholder recommendation \u2014 a monitoring cadence.'
    ],
    impact: [
      'Placeholder — a dashboard that turns an abstract global target into a concrete national gap, sector by sector, year by year.'
    ],
    lessons: [
      'Placeholder lesson \u2014 on modeling assumptions or data comparability.',
      'Placeholder lesson \u2014 on presenting climate data responsibly.'
    ],
    links: { deck: '#', dashboard: '#', notebook: '' }
  },

  /* ── 04 · GLASSDOOR JOB MARKET ─────────────────────────────── */
  'glassdoor-jobs': {
    num: '04',
    title: 'Glassdoor Job Market',
    titleAccent: 'salary signals.',
    lede: 'A Python-based cleaning and EDA project analyzing 2,251 Glassdoor Data Analyst postings to understand how salary estimates vary by sector, skills, and company location.',
    meta: {
      role: 'Data Analytics Fellow · Eskwelabs',
      timeline: 'Sprint 4 · 2026',
      tools: 'Python, Pandas, Matplotlib, Jupyter',
      analysis: 'Data Cleaning, EDA, Salary Benchmarking'
    },
    context: [
      'Early-career analysts are often told to optimize for broad advice: get into tech, learn SQL, move to a big market. This project tested that advice against job-posting data instead of treating it as common wisdom.',
      'The goal was to turn messy job listings into an evidence-based view of the analyst market: which factors appear connected to salary estimates, and how candidates can use that signal responsibly.'
    ],
    problem: [
      'The raw Glassdoor export was not analysis-ready. Salary values were stored as text ranges, company size and revenue were inconsistent, and useful signals were buried inside job titles and job descriptions.',
      'The portfolio challenge was also structural: keep cleaning and EDA separate so the workflow is easy to follow, while still connecting both notebooks into one case-study narrative.'
    ],
    dataBody: [
      'The cleaning notebook prepares the raw Glassdoor job-posting export, then saves a cleaned CSV used by the EDA notebook. The current cleaned dataset contains 2,251 valid postings after removing unusable rows and standardizing key fields.'
    ],
    data: [
      'Glassdoor Data Analyst job postings with salary ranges, job titles, descriptions, company names, ratings, location, sector, industry, size, founded year, and revenue.',
      'Derived salary fields: salary_min, salary_max, and salary_avg for benchmark analysis.',
      'Derived company fields: size_min, size_max, size_avg, revenue ranges, company_age, and seniority_level.',
      'EDA features for location, skills, and salary comparison across sector, company profile, and geography.'
    ],
    pipeline: [
      { title: 'Raw Export', label: 'RAW',
        desc: 'Started with a raw Glassdoor export: job titles, salary ranges, descriptions, ratings, company metadata, location, sector, and revenue fields.',
        shot: 'images/jobs-1-raw.png' },
      { title: 'Cleaning Notebook', label: 'CLEAN',
        desc: 'Standardized columns, handled ghost values, removed unusable rows, parsed salary ranges, and converted company size and revenue into analysis-ready numeric fields.',
        shot: 'images/jobs-2-cleaning.png' },
      { title: 'EDA Notebook', label: 'EXPLORE',
        desc: 'Loaded the cleaned CSV and explored salary patterns by sector, skill signals, company profile, and location without repeating the cleaning pipeline.',
        shot: 'images/jobs-3-eda.png' },
      { title: 'Insight Synthesis', label: 'INSIGHT',
        desc: 'Turned charts into direct research answers: job volume is not the same as salary premium, and salary signals need to be framed with context and limitations.',
        shot: 'images/jobs-4-findings.png' },
      { title: 'Deck Now, Dashboard Next', label: 'SHIP',
        desc: 'Packaged the analysis into a stakeholder-ready presentation deck. The dashboard is intentionally marked as a follow-up artifact instead of pretending it already exists.',
        shot: 'images/jobs-5-deck.png' }
    ],
    dashHeading: 'Current Output',
    dashBody: [
      'The current output is a connected workflow: cleaning notebook → cleaned CSV → EDA notebook → presentation deck. This is enough to include in the portfolio now because the analytical story is already complete.',
      'The dashboard is intentionally left as a follow-up deliverable. That is cleaner than linking a placeholder dashboard or overstating the project maturity.'
    ],
    shot: 'images/project-04.png',
    shotLabel: 'CASE STUDY OUTPUT',
    stats: [
      { value: '2,251', label: 'CLEANED GLASSDOOR POSTINGS ANALYZED' },
      { value: '$69k', label: 'MEDIAN SALARY ESTIMATE IN THE DATASET' },
      { value: '2', label: 'CONNECTED NOTEBOOKS: CLEANING + EDA' }
    ],
    findings: [
      'Sector matters: the project found that sectors with the most postings are not automatically the highest-paying sectors.',
      'Skills need context: SQL appears frequently, but the analysis does not support treating SQL alone as a guaranteed salary premium.',
      'Location changes the equation: the deck highlights geographic salary differences, with California showing a stronger salary signal than New York in this dataset.',
      'The strongest portfolio value is the workflow itself: raw job listings were converted into structured features, visual analysis, and a defensible story.'
    ],
    recommendations: [
      'For job seekers: do not optimize only for posting volume. Compare sector, skill stack, and employer location before deciding where to focus applications.',
      'For portfolio positioning: show Python and SQL together, but lead with evidence that you can clean messy data and communicate findings clearly.',
      'For the next project phase: build the dashboard from the cleaned CSV and reuse the same research-question structure so the visual layer supports the existing story.'
    ],
    impact: [
      'This project now has a portfolio-ready workflow: a focused cleaning notebook, a separate EDA notebook, downloadable deliverables, and a case-study page that explains the analysis without forcing the reader through code first.',
      'It demonstrates practical analyst judgment: cleaning messy text data, creating usable features, checking assumptions, and turning analysis into a decision narrative.'
    ],
    lessons: [
      'Separating cleaning from EDA makes the work easier to explain and easier to maintain.',
      'Salary data from job postings should be treated as directional, not causal proof.',
      'A strong portfolio case study does not need every artifact finished at once. It needs a clear workflow, honest limitations, and a credible next step.'
    ],
    links: {
      deck: 'assets/Sprint_4_Glassdoor_Job_Market_Analysis.pdf',
      dashboard: '',
      cleaning: 'notebooks/01_data_cleaning_portfolio_balanced.html',
      notebook: 'notebooks/02_eda_and_insights.html',
      dataset: 'data/DataAnalyst_cleaned.csv',
      cleaning_code: 'https://github.com/solom0n16/lewis-portfolio/blob/main/notebooks/01_data_cleaning_portfolio_balanced.ipynb',
      notebook_code: 'https://github.com/solom0n16/lewis-portfolio/blob/main/notebooks/02_eda_and_insights.ipynb'
    }
  }
};

/* order used for prev / next navigation */
window.CASE_ORDER = ['financial-report', 'covid-italy', 'co2-thailand', 'glassdoor-jobs'];
