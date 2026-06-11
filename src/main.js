import {
  meta, headlines, buildDrivers, integrationByIndustry,
  aiAdoption, aiBlockers, aiStackInvestment,
  perceptionGap, offshoreStats, offshoreOutcomes,
  partnerClassification, partnerByOrgSize,
  personas, quotes, themes
} from './data/surveyData.js';
import { chartExplainers } from './data/chartExplainers.js';

// ── Helpers ───────────────────────────────────────────────────
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const C44 = 2 * Math.PI * 44; // SVG donut circumference for r=44

// ── State ─────────────────────────────────────────────────────
let activePersona = 'all';
const counted = new WeakSet();

// ── Count-up ─────────────────────────────────────────────────
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

// ── Bar animation ─────────────────────────────────────────────
function animateBars(container) {
  const bars = $$('.bar-fill', container);
  if (!bars.length) return;
  const maxVal = Math.max(...bars.map(b => +b.dataset.value));
  bars.forEach((bar, i) => {
    const pct = (+bar.dataset.value / maxVal) * 100;
    if (reducedMotion()) { bar.style.width = pct + '%'; return; }
    setTimeout(() => { bar.style.width = pct + '%'; }, i * 60);
  });
}

// ── Donut animation ───────────────────────────────────────────
function animateDonut(svg) {
  const arc = $('.donut-arc', svg);
  if (!arc) return;
  const dash = (+arc.dataset.pct / 100) * C44;
  if (reducedMotion()) { arc.style.strokeDasharray = `${dash} ${C44}`; return; }
  setTimeout(() => { arc.style.strokeDasharray = `${dash} ${C44}`; }, 100);
}

// ── Thermometer animation ─────────────────────────────────────
function animateThermo(container) {
  const left = $('.thermo-left', container);
  const right = $('.thermo-right', container);
  if (reducedMotion()) {
    if (left) left.style.width = left.dataset.pct + '%';
    if (right) right.style.width = right.dataset.pct + '%';
    return;
  }
  if (left) setTimeout(() => { left.style.width = left.dataset.pct + '%'; }, 100);
  if (right) setTimeout(() => { right.style.width = right.dataset.pct + '%'; }, 100);
}

// ── Intersection Observer ─────────────────────────────────────
function initObserver() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(({ isIntersecting, target: el }) => {
      if (!isIntersecting) return;
      if (el.dataset.animate !== undefined) el.classList.add('in-view');
      if (el.dataset.count !== undefined) countUp(el);
      if (el.classList.contains('bar-chart')) animateBars(el);
      if (el.classList.contains('donut-svg')) animateDonut(el);
      if (el.classList.contains('thermo')) animateThermo(el);
      io.unobserve(el);
    });
  }, { threshold: 0.15 });

  $$('[data-animate], [data-count], .bar-chart, .donut-svg, .thermo').forEach(el => io.observe(el));
}

// ── Render helpers ────────────────────────────────────────────
function hBar(label, value, color, isWide = false) {
  const labelW = isWide ? 'width:18rem;min-width:18rem' : 'width:14rem;min-width:14rem';
  return `
    <div style="display:flex;align-items:center;gap:0.75rem;">
      <span style="${labelW};font-size:13px;color:#4A4A48;text-align:right;line-height:1.35;padding-right:0.5rem;flex-shrink:0;">${label}</span>
      <div style="flex:1;background:#E8E8E4;border-radius:9999px;height:8px;overflow:hidden;">
        <div class="bar-fill" style="background:${color};" data-value="${value}"></div>
      </div>
      <span style="font-size:13px;font-weight:600;color:#0F0F0F;width:2.5rem;flex-shrink:0;">${value}%</span>
    </div>`;
}

// ── Render: Headline stats ────────────────────────────────────
function renderStats() {
  const grid = $('#headline-stats-grid');
  if (!grid) return;
  const featured = ['custom-preference','ai-adoption','offshore-use','strategic-partners'];
  const top = headlines.filter(h => featured.includes(h.id));
  const rest = headlines.filter(h => !featured.includes(h.id));

  const card = (h, big) => `
    <div data-animate data-persona-rel="${h.personaRelevance.join(',')}"
      style="background:#fff;border:1px solid #E8E8E4;border-radius:4px;padding:2rem;transition:opacity 0.3s ease;">
      <span data-count="${h.stat}" data-unit="${h.unit}"
        style="font-size:clamp(44px,5vw,60px);font-weight:800;letter-spacing:-0.04em;line-height:1;color:${big ? '#C8102E' : '#0F0F0F'};display:block;margin-bottom:0.75rem;"
        aria-label="${h.stat}${h.unit}">${h.stat}${h.unit}</span>
      <p style="font-size:13px;color:#4A4A48;text-transform:uppercase;letter-spacing:0.08em;line-height:1.4;">${h.label}</p>
    </div>`;

  grid.innerHTML = `
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-bottom:1rem;"
         class="lg:grid-cols-4" id="stats-top">
      ${top.map(h => card(h, true)).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;" id="stats-rest">
      ${rest.map(h => card(h, false)).join('')}
    </div>`;

  // responsive: 4-col top, 5-col rest on lg
  const topGrid = $('#stats-top');
  const restGrid = $('#stats-rest');
  const mql = window.matchMedia('(min-width:1024px)');
  const applyGrid = (q) => {
    if (topGrid) topGrid.style.gridTemplateColumns = q.matches ? 'repeat(4,1fr)' : 'repeat(2,1fr)';
    if (restGrid) restGrid.style.gridTemplateColumns = q.matches ? 'repeat(5,1fr)' : 'repeat(2,1fr)';
  };
  applyGrid(mql);
  mql.addEventListener('change', applyGrid);
}

// ── Render: Build drivers ─────────────────────────────────────
function renderBuildDrivers() {
  const el = $('#build-drivers-chart');
  if (!el) return;
  const max = Math.max(...buildDrivers.data.map(d => d.value));
  el.classList.add('bar-chart');
  el.innerHTML = buildDrivers.data.map((d, i) =>
    hBar(d.label, d.value, i === 0 ? '#C8102E' : '#1A4FAB')
  ).join('') + `<p style="font-size:12px;color:#4A4A48;margin-top:0.75rem;">${buildDrivers.note}</p>`;
}

// ── Render: Integration by industry ──────────────────────────
function renderIntegration() {
  const el = $('#integration-industry');
  if (!el) return;
  el.innerHTML = integrationByIndustry.data.map(d => `
    <div data-animate style="padding:1rem 1.25rem;">
      <div style="font-size:28px;font-weight:800;color:#5B2D8E;line-height:1;margin-bottom:0.25rem;">${d.value}%</div>
      <div style="font-size:12px;color:#4A4A48;text-transform:uppercase;letter-spacing:0.08em;line-height:1.35;">${d.label}</div>
    </div>`).join('');
}

// ── Render: AI donuts ─────────────────────────────────────────
function renderAiDonuts() {
  const el = $('#ai-donuts');
  if (!el) return;
  const rings = [
    { label: 'Adopting AI',         value: aiAdoption.adoptingAI,  color: '#1A4FAB' },
    { label: 'Building governance', value: aiAdoption.aiGovernance, color: '#5B2D8E' },
  ];
  el.innerHTML = rings.map(r => `
    <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;">
      <div style="position:relative;width:128px;height:128px;">
        <svg viewBox="0 0 100 100" class="donut-svg" style="width:100%;height:100%;" aria-label="${r.label}: ${r.value}%">
          <circle class="donut-track" cx="50" cy="50" r="44"/>
          <circle class="donut-arc" cx="50" cy="50" r="44" stroke="${r.color}" data-pct="${r.value}"/>
        </svg>
        <div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:22px;font-weight:800;color:${r.color};">${r.value}%</span>
        </div>
      </div>
      <p style="font-size:13px;color:#4A4A48;text-align:center;">${r.label}</p>
    </div>`).join('');
}

// ── Render: AI blockers ───────────────────────────────────────
function renderAiBlockers() {
  const el = $('#ai-blockers-chart');
  if (!el) return;
  el.classList.add('bar-chart');
  el.innerHTML = aiBlockers.data.map(d => hBar(d.label, d.value, '#1A4FAB')).join('');
}

// ── Render: AI stack ──────────────────────────────────────────
function renderAiStack() {
  const el = $('#ai-stack-chart');
  if (!el) return;
  el.classList.add('bar-chart');
  const MAX = 30;
  el.innerHTML = aiStackInvestment.data.map(d => {
    const scaled = Math.round((d.value / MAX) * 100);
    return `
      <div style="display:flex;align-items:center;gap:0.75rem;">
        <div style="flex:1;background:#E8E8E4;border-radius:3px;height:6px;overflow:hidden;">
          <div class="bar-fill" style="background:#D4820A;" data-value="${scaled}"></div>
        </div>
        <span style="font-size:13px;font-weight:600;color:#0F0F0F;width:2rem;flex-shrink:0;text-align:right;">${d.value}%</span>
        <span style="font-size:13px;color:#4A4A48;width:16rem;flex-shrink:0;line-height:1.35;">${d.label}</span>
      </div>`;
  }).join('');
}

// ── Render: Offshore outcomes ─────────────────────────────────
function renderOffshoreOutcomes() {
  const el = $('#offshore-chart');
  if (!el) return;
  el.classList.add('bar-chart');
  const data = offshoreOutcomes.data.filter(d => d.label !== 'Nothing has improved');
  el.innerHTML = data.map((d, i) => hBar(d.label, d.value, i === 0 ? '#5B2D8E' : '#0E9E8E', true)).join('');
}

// ── Render: Partner classification ───────────────────────────
function renderPartnerClassification() {
  const el = $('#partner-chart');
  if (!el) return;
  el.classList.add('bar-chart');
  const colors = {
    'Strategic partner': '#C8102E',
    'Trusted delivery partner': '#4A4A48',
    'Project-based provider': '#9B9B98',
    'Tactical support': '#C8C8C4',
  };
  el.innerHTML = `<p style="font-size:13px;color:#4A4A48;margin-bottom:1.25rem;">${partnerClassification.question}</p>` +
    partnerClassification.data.map(d => `
      <div style="margin-bottom:1rem;">
        <div style="display:flex;align-items:center;gap:1rem;">
          <span style="width:11rem;min-width:11rem;font-size:13px;text-align:right;padding-right:0.5rem;line-height:1.35;${d.label === 'Strategic partner' ? 'font-weight:600;color:#0F0F0F' : 'color:#4A4A48'}">${d.label}</span>
          <div style="flex:1;background:#E8E8E4;border-radius:4px;height:12px;overflow:hidden;">
            <div class="bar-fill" style="background:${colors[d.label] || '#C8C8C4'};" data-value="${d.value}"></div>
          </div>
          <span style="font-size:14px;font-weight:600;width:2.5rem;flex-shrink:0;${d.label === 'Strategic partner' ? 'color:#C8102E' : 'color:#4A4A48'}">${d.value}%</span>
        </div>
        <p style="font-size:12px;color:rgba(74,74,72,0.65);margin:0.2rem 0 0 12.75rem;line-height:1.35;">${d.description}</p>
      </div>`).join('');
}

// ── Render: Theme grid ────────────────────────────────────────
const THEME_SUMMARIES = {
  1: 'Custom software is the primary competitive differentiator — not a cost or IT function.',
  2: 'The shift from traditional development to AI-native engineering is structural, not incremental.',
  3: 'Integration is driving demand, throttling delivery, and blocking AI adoption simultaneously.',
  4: '85% are moving on AI. Skills gaps, infrastructure debt, and governance shortfalls are compressing real timelines.',
  5: '97% report resourcing concerns. The bottleneck is not ambition — it is capability at scale.',
  6: 'A 24-point gap between C-suite and delivery-manager perceptions of project success — where ROI quietly leaks.',
  7: 'Governance is not optional overhead. For half of organisations, it is already a compliance imperative.',
  8: '57% cite engineering quality as the primary purchase factor. Speed matters, but it is not the deciding vote.',
  9: '32% have a strategic partner. 97% would invest more in one. The gap is the opportunity.',
  10: '92% use offshore. 99% see better outcomes. The model works — the operating model is what varies.',
};

function renderThemes() {
  const el = $('#theme-grid');
  if (!el) return;
  el.innerHTML = themes.map(t => `
    <div class="theme-card" data-animate style="background:#fff;border:1px solid #E8E8E4;border-radius:4px;padding:1.25rem;">
      <div style="font-size:28px;font-weight:800;color:#C8102E;line-height:1;margin-bottom:0.75rem;">${String(t.id).padStart(2,'0')}</div>
      <h3 style="font-size:14px;font-weight:600;color:#0F0F0F;margin:0 0 0.5rem;line-height:1.35;">${t.title}</h3>
      <p style="font-size:12px;color:#4A4A48;margin:0;line-height:1.6;">${THEME_SUMMARIES[t.id]}</p>
    </div>`).join('');
}

// ── Explainers ────────────────────────────────────────────────
function initExplainers() {
  $$('[data-explainer]').forEach(el => {
    populateExplainer(el, 'all');
    setTimeout(() => el.classList.add('ready'), 50);
  });
}

function explainerLabel(persona) {
  if (persona === 'all') return 'All roles';
  const p = personas[persona];
  return p ? `${p.label} view` : persona;
}

function populateExplainer(el, persona) {
  const section = el.dataset.explainer;
  const data = chartExplainers[section];
  if (!data) return;
  const paras = data[persona] || data.all;
  el.classList.remove('ready');
  el.innerHTML =
    `<p style="font-size:11px;font-weight:600;color:#C8102E;text-transform:uppercase;letter-spacing:0.1em;margin:0 0 1rem;">${explainerLabel(persona)}</p>` +
    paras.map(p => `<p>${p}</p>`).join('');
  requestAnimationFrame(() => el.classList.add('ready'));
}

// ── Persona filter ────────────────────────────────────────────
function initPersonaFilter() {
  const btns = $$('[data-persona]');

  btns.forEach(btn => btn.addEventListener('click', () => {
    activePersona = btn.dataset.persona;

    btns.forEach(b => {
      const on = b.dataset.persona === activePersona;
      b.style.background = on ? '#C8102E' : '#fff';
      b.style.color = on ? '#fff' : '#4A4A48';
      b.style.borderColor = on ? '#C8102E' : '#E8E8E4';
      b.setAttribute('aria-pressed', on);
    });

    updateBanner();
    updateStatOpacity();
    $$('[data-explainer]').forEach(el => populateExplainer(el, activePersona));
  }));
}

function updateBanner() {
  const banner = $('#persona-banner');
  if (!banner) return;
  if (activePersona === 'all') { banner.style.display = 'none'; return; }
  const p = personas[activePersona];
  if (!p) return;
  banner.style.display = 'block';
  banner.innerHTML = `
    <div class="max-w-7xl mx-auto px-6 py-8">
      <div style="border-left:3px solid #C8102E;padding-left:1.5rem;">
        <p style="font-size:11px;font-weight:500;color:#4A4A48;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 0.75rem;">Viewing as: ${p.label}</p>
        <h2 style="font-size:22px;font-weight:600;color:#0F0F0F;margin:0 0 0.75rem;line-height:1.3;">${p.headline}</h2>
        <p style="font-size:15px;color:#4A4A48;line-height:1.7;margin:0 0 1.5rem;max-width:48rem;">${p.insight}</p>
        <div style="display:flex;flex-wrap:wrap;gap:2rem;margin-bottom:1.25rem;">
          ${p.keyStats.map(s => `
            <div style="display:flex;align-items:baseline;gap:0.5rem;">
              <span style="font-size:32px;font-weight:800;color:#C8102E;line-height:1;">${s.stat}%</span>
              <span style="font-size:13px;color:#4A4A48;max-width:160px;line-height:1.35;">${s.label}</span>
            </div>`).join('')}
        </div>
        <p style="font-size:14px;color:#4A4A48;font-style:italic;">${p.provocation}</p>
      </div>
    </div>`;
}

function updateStatOpacity() {
  $$('[data-persona-rel]').forEach(card => {
    const rel = card.dataset.personaRel.split(',');
    card.style.opacity = (activePersona === 'all' || rel.includes(activePersona)) ? '1' : '0.4';
  });
}

// ── Boot ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderStats();
  renderBuildDrivers();
  renderIntegration();
  renderAiDonuts();
  renderAiBlockers();
  renderAiStack();
  renderOffshoreOutcomes();
  renderPartnerClassification();
  renderThemes();
  initExplainers();
  initPersonaFilter();
  requestAnimationFrame(initObserver);
});
