import {
  signals, signalsSource, windowShould, executionLayers, ruleOfThumb, diagnostic,
  useCasePattern, scorecard, successLoop, loopDiscipline, operatingDecisions,
  humanInLoop, humanInLoopIntro, governanceChecklist, ninetyDayPath, dayNinetyDecision,
  leadersLabQuote, scalingIntro, scalingTest, finalThought, closingQuestion, closingCta,
  meta, howToUseThisPage,
} from './data/playbookData.js';

// ── Helpers ───────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s) => String(s ?? '');

// ── Count-up (same behaviour as the survey microsite) ──────────
const counted = new WeakSet();
function countUp(el) {
  if (counted.has(el)) return;
  counted.add(el);
  const end = parseInt(el.dataset.count, 10);
  const unit = el.dataset.unit || '%';
  if (reducedMotion()) { el.textContent = end + unit; return; }
  const t0 = performance.now();
  const tick = (t) => {
    const p = Math.min((t - t0) / 1400, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(e * end) + unit;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function animateTimeline(container) {
  const segs = $$('.timeline-seg', container);
  if (reducedMotion()) { segs.forEach(s => { s.style.width = s.dataset.pct + '%'; }); return; }
  segs.forEach((s, i) => setTimeout(() => { s.style.width = s.dataset.pct + '%'; }, i * 120));
}

function initObserver() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target: el }) => {
      if (!isIntersecting) return;
      if (el.dataset.animate !== undefined) el.classList.add('in-view');
      if (el.dataset.count !== undefined) countUp(el);
      if (el.classList.contains('timeline-wrap')) animateTimeline(el);
      io.unobserve(el);
    });
  }, { threshold: 0.15 });
  $$('[data-animate], [data-count]').forEach(el => io.observe(el));
}

// ── How to use this page ────────────────────────────────────────
function renderHowToUse() {
  const el = $('#how-to-use-text');
  if (!el) return;
  el.innerHTML = `<strong style="color:#C8102E;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;font-size:11px;">${esc(howToUseThisPage.label)}</strong> &nbsp; ${esc(howToUseThisPage.body)}`;
}

// ── Section 1: The reality ──────────────────────────────────────
function renderSignals() {
  const grid = $('#signals-grid');
  if (!grid) return;
  grid.innerHTML = signals.map(s => `
    <div data-animate style="background:#fff;border:1px solid #E8E8E4;border-radius:4px;padding:1.75rem;">
      <span data-count="${s.stat}" data-unit="${s.unit}"
        style="font-size:clamp(40px,5vw,52px);font-weight:800;letter-spacing:-0.03em;line-height:1;color:#C8102E;display:block;margin-bottom:0.5rem;"
        aria-label="${s.stat}${s.unit}">${s.stat}${s.unit}</span>
      <p style="font-size:13.5px;color:#0F0F0F;font-weight:500;line-height:1.4;margin:0 0 0.6rem;">${esc(s.label)}</p>
      <p style="font-size:13px;color:#4A4A48;line-height:1.5;margin:0;">${esc(s.meaning)}</p>
    </div>`).join('');
}

function renderShouldLists() {
  const should = $('#should-list');
  const shouldNot = $('#should-not-list');
  if (should) should.innerHTML = windowShould.should.map(item => `
    <li><span class="tick" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="#0E9E8E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>${esc(item)}</li>`).join('');
  if (shouldNot) shouldNot.innerHTML = windowShould.shouldNot.map(item => `
    <li><span class="tick" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="#C8102E" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>${esc(item)}</li>`).join('');
}

function renderLayers() {
  const el = $('#layers-grid');
  if (!el) return;
  el.innerHTML = executionLayers.map(l => `
    <div class="theme-card" data-animate style="background:#fff;border:1px solid #E8E8E4;border-radius:4px;padding:1.5rem;">
      <div style="font-size:13px;font-weight:700;color:#5B2D8E;text-transform:uppercase;letter-spacing:0.06em;margin-bottom:0.85rem;">${esc(l.layer)}</div>
      <p style="font-size:14px;color:#0F0F0F;line-height:1.5;margin:0 0 0.75rem;">${esc(l.question)}</p>
      <p style="font-size:12px;color:#4A4A48;line-height:1.5;margin:0;">${esc(l.evidence)}</p>
    </div>`).join('');
}

// ── Interactive 1: Execution gap diagnostic ─────────────────────
const diagState = {};
function anchorText(dim, val) {
  if (dim.anchors[val]) return dim.anchors[val];
  if (val === 2) return `Between “${dim.anchors[1]}” and “${dim.anchors[3]}”`;
  if (val === 4) return `Between “${dim.anchors[3]}” and “${dim.anchors[5]}”`;
  return '';
}

function renderDiagnostic() {
  $('#diagnostic-intro').textContent = diagnostic.intro;
  const grid = $('#diagnostic-grid');
  if (!grid) return;
  grid.innerHTML = diagnostic.dimensions.map(dim => `
    <div class="diag-row" data-dim="${dim.id}">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.6rem;flex-wrap:wrap;gap:0.5rem;">
        <span style="font-size:15px;font-weight:600;color:#0F0F0F;">${esc(dim.label)}</span>
        <div style="display:flex;gap:0.4rem;" role="group" aria-label="${esc(dim.label)} score, 1 to 5">
          ${[1,2,3,4,5].map(v => `<button type="button" class="opt-btn" data-diag="${dim.id}" data-val="${v}" title="${esc(v)} — ${esc(anchorText(dim, v))}" style="width:2.4rem;text-align:center;">${v}</button>`).join('')}
        </div>
      </div>
      <div class="diag-scale-labels">
        <span><strong>1</strong> ${esc(dim.anchors[1])}</span>
        <span><strong>5</strong> ${esc(dim.anchors[5])}</span>
      </div>
      <p class="diag-caption" data-caption-for="${dim.id}" style="font-size:12.5px;color:#0F0F0F;font-weight:500;min-height:1.2em;margin:0.5rem 0 0;"></p>
    </div>`).join('');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-diag]');
    if (!btn) return;
    const dimId = btn.dataset.diag;
    const val = parseInt(btn.dataset.val, 10);
    diagState[dimId] = val;
    $$(`button[data-diag="${dimId}"]`, grid).forEach(b => b.classList.toggle('on', parseInt(b.dataset.val, 10) === val));
    const dim = diagnostic.dimensions.find(d => d.id === dimId);
    const cap = $(`[data-caption-for="${dimId}"]`, grid);
    if (cap) cap.textContent = `You scored this ${val}: ${anchorText(dim, val)}`;
    if (Object.keys(diagState).length === diagnostic.dimensions.length) showDiagnosticResult();
  });
}

function showDiagnosticResult() {
  let lowestId = null, lowestVal = 6;
  diagnostic.dimensions.forEach(d => { if (diagState[d.id] < lowestVal) { lowestVal = diagState[d.id]; lowestId = d.id; } });
  const dim = diagnostic.dimensions.find(d => d.id === lowestId);
  $('#diag-result-dim').textContent = dim.label;
  $('#diag-result-why').textContent = dim.whyItMatters;
  $('#diag-result-decision').textContent = `Decision before proceeding: ${dim.decision}`;
  $('#diagnostic-placeholder').style.display = 'none';
  $('#diagnostic-result').classList.add('show');
}

// ── Section 2: Decide what to build ─────────────────────────────
function renderUseCasePattern() {
  $('#pattern-template').textContent = useCasePattern.template;
  $('#pattern-example').textContent = useCasePattern.example;
}

// ── Interactive 2: AI-ready scorecard ───────────────────────────
const scoreState = {};
function renderScorecard() {
  $('#scorecard-intro').textContent = scorecard.intro;
  $('#scorecard-footnote').textContent = scorecard.footnote;
  const grid = $('#scorecard-grid');
  if (!grid) return;
  grid.innerHTML = scorecard.dimensions.map(dim => `
    <div class="score-row" data-dim="${dim.id}">
      <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.85rem;">
        <span style="font-size:15px;font-weight:600;color:#0F0F0F;">${esc(dim.label)}</span>
        ${scorecard.criticalIds.includes(dim.id) ? '<span style="font-size:10.5px;font-weight:600;color:#C8102E;text-transform:uppercase;letter-spacing:0.06em;border:1px solid rgba(200,16,46,0.35);border-radius:9999px;padding:0.1rem 0.55rem;">Critical</span>' : ''}
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0.6rem;" class="score-opts-resp">
        ${dim.options.map((opt, i) => `<button type="button" class="opt-btn" data-score="${dim.id}" data-val="${i + 1}">${esc(opt)}</button>`).join('')}
      </div>
    </div>`).join('');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-score]');
    if (!btn) return;
    const dimId = btn.dataset.score;
    const val = parseInt(btn.dataset.val, 10);
    scoreState[dimId] = val;
    const isCritical = scorecard.criticalIds.includes(dimId);
    $$(`button[data-score="${dimId}"]`, grid).forEach(b => {
      const bv = parseInt(b.dataset.val, 10);
      b.classList.toggle('on', bv === val && !(isCritical && val === 1));
      b.classList.toggle('critical-on', bv === val && isCritical && val === 1);
    });
    if (Object.keys(scoreState).length === scorecard.dimensions.length) showScorecardResult();
  });
}

function showScorecardResult() {
  const total = Object.values(scoreState).reduce((a, b) => a + b, 0);
  const max = scorecard.dimensions.length * 4;
  const criticalHit = scorecard.criticalIds.some(id => scoreState[id] === 1);
  const band = scorecard.bands.find(b => total >= b.min && total <= b.max);

  const label = criticalHit ? 'Blocked' : (band ? band.label : '—');
  const interpretation = criticalHit ? scorecard.criticalOverride : (band ? band.interpretation : '');
  const accent = criticalHit ? '#C8102E' : (label === 'Proceed' ? '#0E9E8E' : label === 'Narrow' ? '#D4820A' : '#C8102E');

  const el = $('#scorecard-result');
  el.innerHTML = `
    <div style="background:#0F0F0F;border-radius:6px;padding:2rem;display:grid;grid-template-columns:auto 1fr;gap:2rem;align-items:start;" class="scorecard-result-grid">
      <div style="text-align:center;">
        <p style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:0.1em;margin:0 0 0.375rem;">Score</p>
        <span style="font-size:34px;font-weight:800;color:#fff;line-height:1;">${total}<span style="font-size:16px;color:rgba(255,255,255,0.5);">/${max}</span></span>
        <p style="font-size:15px;font-weight:700;color:${accent};margin:0.6rem 0 0;">${esc(label)}</p>
      </div>
      <div>
        <p style="font-size:16px;font-weight:600;color:#fff;line-height:1.5;margin:0 0 0.75rem;">${esc(interpretation)}</p>
        ${criticalHit ? `<p style="font-size:13px;color:rgba(255,255,255,0.6);line-height:1.6;margin:0 0 1.25rem;">A score of 1 in data, governance or ownership overrides the total — these are the dimensions most likely to break a production path late.</p>` : ''}
        <a href="${meta.contactUrl}" target="_blank" rel="noopener noreferrer"
           style="display:inline-flex;align-items:center;gap:0.5rem;background:#C8102E;color:#fff;font-size:13px;font-weight:600;padding:0.625rem 1.25rem;border-radius:4px;text-decoration:none;transition:background 0.15s;"
           onmouseover="this.style.background='#a00d24'" onmouseout="this.style.background='#C8102E'">
          Talk to NashTech about this use case
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </div>`;
  el.style.display = 'block';
  requestAnimationFrame(() => { el.style.opacity = '1'; });
}

// ── Section 3: Design for production ────────────────────────────
function renderLoop() {
  const el = $('#loop-flow');
  if (!el) return;
  const arrow = `<div class="loop-arrow" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 16 16" fill="none"><path d="M2 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>`;
  el.innerHTML = successLoop.map((s, i) => `
    <div class="loop-node" data-animate>
      <div class="lnum">${String(s.id).padStart(2,'0')}</div>
      <h4>${esc(s.stage)}</h4>
      <p>${esc(s.question)}</p>
    </div>${i < successLoop.length - 1 ? arrow : ''}`).join('');
  $('#loop-discipline').textContent = `↺ ${loopDiscipline}`;
}

function renderOperatingTable() {
  const el = $('#operating-table');
  if (!el) return;
  const cols = '1.1fr 1.3fr 1.6fr 1.4fr';
  const head = `<div style="display:grid;grid-template-columns:${cols};gap:1rem;padding:0.75rem 1.25rem;background:#F8F8F6;border-bottom:1px solid #E8E8E4;">
    <span style="font-size:11px;font-weight:600;color:#4A4A48;text-transform:uppercase;letter-spacing:0.06em;">Decision area</span>
    <span style="font-size:11px;font-weight:600;color:#4A4A48;text-transform:uppercase;letter-spacing:0.06em;">Owner</span>
    <span style="font-size:11px;font-weight:600;color:#4A4A48;text-transform:uppercase;letter-spacing:0.06em;">Decide before build</span>
    <span style="font-size:11px;font-weight:600;color:#4A4A48;text-transform:uppercase;letter-spacing:0.06em;">Evidence</span>
  </div>`;
  const rows = operatingDecisions.map((d, i) => `
    <div style="display:grid;grid-template-columns:${cols};gap:1rem;padding:0.9rem 1.25rem;${i < operatingDecisions.length - 1 ? 'border-bottom:1px solid #E8E8E4;' : ''}">
      <span style="font-size:13.5px;font-weight:600;color:#0F0F0F;">${esc(d.area)}</span>
      <span style="font-size:13px;color:#5B2D8E;">${esc(d.owner)}</span>
      <span style="font-size:13px;color:#4A4A48;line-height:1.4;">${esc(d.decideBeforeBuild)}</span>
      <span style="font-size:12.5px;color:#4A4A48;font-style:italic;line-height:1.4;">${esc(d.evidence)}</span>
    </div>`).join('');
  el.innerHTML = `<div style="overflow-x:auto;"><div style="min-width:640px;">${head}${rows}</div></div>`;
}

function renderHitl() {
  $('#hitl-intro').textContent = humanInLoopIntro;
  const el = $('#hitl-ladder');
  if (!el) return;
  el.innerHTML = humanInLoop.map(l => `
    <div class="ladder-row" data-animate style="border-left-color:${l.color};">
      <span class="ladder-num" style="color:${l.color};">${l.level}</span>
      <div class="ladder-col">
        <p style="font-size:13px;font-weight:600;color:${l.color};margin-bottom:0.3rem;">${esc(l.label)}</p>
        <p class="ladder-role"><strong style="color:#0F0F0F;">AI:</strong> ${esc(l.aiRole)}</p>
        <p class="ladder-role"><strong style="color:#0F0F0F;">Human:</strong> ${esc(l.humanRole)}</p>
      </div>
      <div class="ladder-col">
        <p class="ladder-use">${esc(l.useWhen)}</p>
      </div>
    </div>`).join('');
}

// ── Interactive 3: Governance checklist ─────────────────────────
const govChecked = new Set();
const GOV_MESSAGES = {
  0: 'Nothing checked yet — click a control to start the walkthrough.',
  full: 'That’s all 7. In practice, confirming each one with evidence — not a click — is what earns the move to build.',
};
function renderGovernance() {
  const list = $('#governance-list');
  if (!list) return;
  list.innerHTML = governanceChecklist.map((item, i) => `
    <li class="gov-item" data-idx="${i}" role="checkbox" aria-checked="false" tabindex="0">
      <span class="gov-box" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      <p>${esc(item)}</p>
    </li>`).join('');
  updateGovProgress();

  const toggle = (li) => {
    const idx = li.dataset.idx;
    const on = !govChecked.has(idx);
    if (on) govChecked.add(idx); else govChecked.delete(idx);
    li.classList.toggle('checked', on);
    li.setAttribute('aria-checked', String(on));
    updateGovProgress();
  };
  list.addEventListener('click', (e) => { const li = e.target.closest('.gov-item'); if (li) toggle(li); });
  list.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const li = e.target.closest('.gov-item'); if (!li) return;
    e.preventDefault(); toggle(li);
  });
}
function updateGovProgress() {
  const n = govChecked.size;
  $('#gov-count').textContent = n;
  $('#gov-progress').style.width = `${(n / governanceChecklist.length) * 100}%`;
  $('#gov-message').textContent = n === 0 ? GOV_MESSAGES[0] : (n === governanceChecklist.length ? GOV_MESSAGES.full : `${n} of ${governanceChecklist.length} checked.`);
}

// ── Section 4: 90-day timeline ───────────────────────────────────
function renderNinetyDayIntro() {
  $('#ninety-intro').textContent = ninetyDayPath.intro;
  $('#ninety-evidence').textContent = `Evidence note: ${ninetyDayPath.evidenceNote}`;
}

function renderTimeline() {
  const track = $('#timeline-track');
  const labels = $('#timeline-labels');
  const legend = $('#phase-legend');
  if (!track) return;
  const weeklyPhases = ninetyDayPath.phases.filter(p => p.weeks > 0);
  const totalWeeks = weeklyPhases.reduce((a, p) => a + p.weeks, 0);

  track.innerHTML = weeklyPhases.map(p => `<div class="timeline-seg" style="background:${p.color};" data-pct="${(p.weeks / totalWeeks) * 100}"></div>`).join('');
  labels.innerHTML = weeklyPhases.map(p => `<div class="timeline-label" style="flex:${p.weeks} 1 0;">${esc(p.weekSpan)}</div>`).join('');

  legend.innerHTML = ninetyDayPath.phases.map(p => `
    <div style="display:flex;align-items:center;gap:0.5rem;">
      <span style="width:9px;height:9px;border-radius:9999px;background:${p.color};flex-shrink:0;" aria-hidden="true"></span>
      <span style="font-size:12.5px;color:#4A4A48;"><strong style="color:#0F0F0F;font-weight:600;">${esc(p.tag)}</strong> · ${esc(p.title)}</span>
    </div>`).join('');
}

function renderPhaseCards() {
  const el = $('#phase-cards');
  if (!el) return;
  const introEl = $('#phase-cards-intro');
  if (introEl) introEl.textContent = ninetyDayPath.phaseCardsIntro;
  el.innerHTML = ninetyDayPath.phases.map(p => `
    <div class="phase-card" data-animate style="border-top-color:${p.color};">
      <div style="display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.75rem;">
        <div>
          <span style="font-size:11px;font-weight:600;color:${p.color};text-transform:uppercase;letter-spacing:0.08em;">${esc(p.tag)}</span>
          <h3 style="font-size:19px;font-weight:600;color:#0F0F0F;margin:0.3rem 0 0;">${esc(p.title)}</h3>
        </div>
        ${p.gate ? `<span style="font-size:12px;font-weight:600;color:#0F0F0F;background:#F8F8F6;border:1px solid #E8E8E4;border-radius:9999px;padding:0.3rem 0.85rem;">${esc(p.gate)}</span>` : ''}
      </div>
      <p style="font-size:14px;color:#4A4A48;line-height:1.65;margin:0 0 1.25rem;max-width:52rem;">${esc(p.objective)}</p>

      <div style="display:grid;grid-template-columns:${p.weeklyFocus ? '1fr 1fr' : '1fr'};gap:2.5rem;" class="phase-inner-grid">
        <div>
          <p style="font-size:11px;font-weight:600;color:#4A4A48;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 0.75rem;">What would need to be true</p>
          <ul class="check-list">
            ${p.checklist.map(c => `<li><span class="tick" aria-hidden="true"><svg width="15" height="15" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="${p.color}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></span>${esc(c)}</li>`).join('')}
          </ul>
        </div>
        ${p.weeklyFocus ? `
        <div>
          <p style="font-size:11px;font-weight:600;color:#4A4A48;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 0.25rem;">Week by week</p>
          <div class="week-chip-row">
            ${p.weeklyFocus.map(w => `<div class="week-chip"><span class="wk-num">Wk ${esc(w.week)}</span><span class="wk-body">${esc(w.workstream)}<span>${esc(w.output)}</span></span></div>`).join('')}
          </div>
        </div>` : ''}
      </div>
    </div>`).join('');
}

// ── Interactive 4: Day-90 decision ──────────────────────────────
function renderDecisionCards() {
  const el = $('#decision-cards');
  if (!el) return;
  el.innerHTML = dayNinetyDecision.map(d => `
    <button type="button" class="decision-card" data-decision="${d.id}">
      <span class="dc-label">${esc(d.label)}</span>
    </button>`).join('');
  el.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-decision]');
    if (!btn) return;
    $$('.decision-card', el).forEach(b => b.classList.toggle('on', b === btn));
    const d = dayNinetyDecision.find(x => x.id === btn.dataset.decision);
    const result = $('#decision-result');
    result.innerHTML = `<p style="font-size:13px;font-weight:600;color:#4A4A48;text-transform:uppercase;letter-spacing:0.06em;margin:0 0 0.4rem;">If you ${d.label.toLowerCase()}…</p><p style="font-size:15px;color:#0F0F0F;margin:0;line-height:1.5;">${esc(d.detail)}</p>`;
    result.style.display = 'block';
  });
}

// ── Section 5: Make it work (and scale) ─────────────────────────
function renderScalingSection() {
  $('#scaling-intro-text').textContent = scalingIntro;
  $('#leaders-lab-text').textContent = `"${leadersLabQuote.text}"`;
  $('#leaders-lab-attr').textContent = leadersLabQuote.attribution;
}

const scaleState = {};
function renderScalingTest() {
  const introEl = $('#scaling-test-intro');
  if (introEl) introEl.textContent = scalingTest.intro;
  const el = $('#scaling-questions');
  if (!el) return;
  el.innerHTML = scalingTest.questions.map((q, i) => `
    <div class="scale-row" data-idx="${i}">
      <p>${esc(q)}</p>
      <div class="yn-toggle" role="group" aria-label="${esc(q)}">
        <button type="button" class="yn-btn yes" data-idx="${i}" data-ans="yes">Yes</button>
        <button type="button" class="yn-btn no" data-idx="${i}" data-ans="no">No</button>
      </div>
    </div>`).join('');

  el.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-ans]');
    if (!btn) return;
    const idx = btn.dataset.idx;
    scaleState[idx] = btn.dataset.ans;
    $$(`button[data-idx="${idx}"]`, el).forEach(b => b.classList.toggle('on', b.dataset.ans === btn.dataset.ans));
    if (Object.keys(scaleState).length === scalingTest.questions.length) showScalingVerdict();
  });
}
function showScalingVerdict() {
  const allYes = Object.values(scaleState).every(v => v === 'yes');
  const el = $('#scaling-verdict');
  el.innerHTML = `
    <p style="font-size:11px;font-weight:600;color:${allYes ? '#0E9E8E' : '#C8102E'};text-transform:uppercase;letter-spacing:0.08em;margin:0 0 0.6rem;">${allYes ? 'Ready to scale' : 'Not yet ready to scale'}</p>
    <p style="font-size:16px;color:#0F0F0F;line-height:1.6;margin:0;">${allYes ? esc(scalingTest.passVerdict) : esc(scalingTest.failVerdict)}</p>`;
  el.style.opacity = '1';
}

// ── Final thought ────────────────────────────────────────────────
function renderFinalThought() {
  $('#final-thought').innerHTML = finalThought.map(p => `<p data-animate style="font-size:19px;color:#0F0F0F;line-height:1.55;margin:0 0 1.25rem;font-weight:500;">${esc(p)}</p>`).join('');
  $('#closing-question').textContent = closingQuestion;
  $('#closing-cta').textContent = closingCta;
}

// ── Visit beacon ─────────────────────────────────────────────
fetch('/api/visits', { method: 'POST' }).catch(() => {});

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHowToUse();
  renderSignals();
  renderShouldLists();
  renderLayers();
  $('#rule-of-thumb').textContent = ruleOfThumb;
  renderDiagnostic();
  renderUseCasePattern();
  renderScorecard();
  renderLoop();
  renderOperatingTable();
  renderHitl();
  renderGovernance();
  renderNinetyDayIntro();
  renderTimeline();
  renderPhaseCards();
  renderDecisionCards();
  renderScalingSection();
  renderScalingTest();
  renderFinalThought();
  initObserver();
});
