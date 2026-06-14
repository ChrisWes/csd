import {
  meta,
  buildDrivers,
  integrationByIndustry,
  integrationStats,
  perceptionGap,
  partnerClassification,
  partnerAspiration,
  offshoreStats,
  quotes,
} from '../src/data/surveyData.js';

// ============================================================
// Globals
// ============================================================

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = () => window.innerWidth < 768;

let currentScene = null;
const initialized = new Set();

// Step index → { scene: string, sub: string }
const STEP_MAP = [
  { scene: 'drivers',   sub: 'a' },   // 0
  { scene: 'drivers',   sub: 'b' },   // 1
  { scene: 'industry',  sub: null },   // 2
  { scene: 'paradox',   sub: 'a' },   // 3
  { scene: 'paradox',   sub: 'b' },   // 4
  { scene: 'gap',       sub: null },   // 5
  { scene: 'gapdetail', sub: null },   // 6
  { scene: 'partners',  sub: 'a' },   // 7
  { scene: 'partners',  sub: 'b' },   // 8
  { scene: 'partners',  sub: 'c' },   // 9
  { scene: 'close',     sub: 'a' },   // 10
  { scene: 'close',     sub: 'b' },   // 11
  { scene: 'close',     sub: 'c' },   // 12
];

// ============================================================
// Init
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Wire report links
  const reportUrl = meta.reportUrl;
  document.querySelectorAll('#nav-report-link, #footer-report-link').forEach(el => {
    el.href = reportUrl;
  });

  // Animate opening counter
  countUp(document.getElementById('hero-count'), 0, 70, 1400);

  // Build industry cells
  buildIndustryCells();

  // Set up mobile fallback or scrollytelling
  if (isMobile()) {
    initMobile();
  } else {
    initScrollytelling();
    // Show and draw first scene immediately — before any scroll event fires
    setTimeout(() => {
      transitionScene(null, 'drivers');
      currentScene = 'drivers';
    }, 100);
  }

  // Progress bar
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
});

function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.getElementById('progress-bar').style.width = `${Math.min(100, pct)}%`;
}

// ============================================================
// Scrollytelling init
// ============================================================

function initScrollytelling() {
  const scroller = scrollama();

  scroller
    .setup({
      step: '.narrative-step',
      offset: 0.5,
      debug: false,
    })
    .onStepEnter(({ index, direction }) => {
      updateStep(index);
    })
    .onStepExit(({ index, direction }) => {
      if (direction === 'up' && index > 0) {
        updateStep(index - 1);
      }
    });

  window.addEventListener('resize', scroller.resize);
}

function updateStep(index) {
  if (index < 0 || index >= STEP_MAP.length) return;
  const { scene, sub } = STEP_MAP[index];

  if (scene !== currentScene) {
    transitionScene(currentScene, scene);
    currentScene = scene;
  }

  updateSceneState(scene, sub, index);
}

// ============================================================
// Scene transitions
// ============================================================

function transitionScene(from, to) {
  if (from) {
    const el = document.getElementById(`scene-${from}`);
    if (el) el.classList.remove('active');
  }
  const el = document.getElementById(`scene-${to}`);
  if (!el) return;
  el.classList.add('active');

  if (!initialized.has(to)) {
    initialized.add(to);
    initScene(to);
  }
}

function initScene(sceneId) {
  switch (sceneId) {
    case 'drivers':   drawDriversChart('drivers-svg', 'a'); break;
    case 'industry':  drawDriversChart('drivers-svg-b', 'fade'); showIndustry(); break;
    case 'paradox':   drawConvergingBars('a'); break;
    case 'gap':       animateGap(); break;
    case 'gapdetail': initGapDetail(); break;
    case 'partners':  drawMaturityLadder('a'); break;
    case 'close':     break; // beats appear via updateSceneState
  }
}

function updateSceneState(scene, sub) {
  switch (scene) {
    case 'drivers':
      if (sub === 'b') highlightDriversBars('b');
      break;
    case 'paradox':
      if (sub === 'b') showAIFinding();
      break;
    case 'partners':
      if (sub === 'b') illuminateStrategic();
      if (sub === 'c') showAspiration();
      break;
    case 'close':
      updateClose(sub);
      break;
  }
}

// ============================================================
// SCENE: Drivers bar chart (D3)
// ============================================================

let driversHighlightState = 'a';

function drawDriversChart(svgId, mode) {
  const svgEl = document.getElementById(svgId);
  if (!svgEl) return;

  const data = buildDrivers.data;
  const maxVal = data[0].value;

  const lm = 280; // left margin for labels
  const rm = 60;  // right margin for pct labels
  const bh = 22;  // bar height
  const gap = 14; // gap between bars
  const topPad = 8;
  const totalH = data.length * (bh + gap) + topPad;

  svgEl.style.height = totalH + 'px';

  const svg = d3.select(svgEl);
  svg.selectAll('*').remove();

  const W = svgEl.clientWidth || 700;
  const barArea = W - lm - rm;

  svg
    .attr('viewBox', `0 0 ${W} ${totalH}`)
    .attr('preserveAspectRatio', 'xMidYMid meet');

  const barGroup = svg.append('g');

  data.forEach((d, i) => {
    const y = topPad + i * (bh + gap);
    const isFirst = i === 0;
    const isFade = mode === 'fade';
    const fillColor = isFirst ? '#C8102E' : '#1A4FAB';
    const opacity = isFade ? 0.25 : (isFirst ? 1 : 0.7);
    const targetW = (d.value / maxVal) * barArea;

    const g = barGroup.append('g');

    // Label
    g.append('text')
      .attr('x', lm - 12)
      .attr('y', y + bh / 2 + 4)
      .attr('text-anchor', 'end')
      .attr('font-family', 'Inter, system-ui, sans-serif')
      .attr('font-size', '13px')
      .attr('fill', '#4A4948')
      .attr('opacity', isFade ? 0.3 : 1)
      .text(d.label);

    // Bar background track
    g.append('rect')
      .attr('x', lm)
      .attr('y', y)
      .attr('width', barArea)
      .attr('height', bh)
      .attr('fill', '#F0EFEB')
      .attr('rx', 2)
      .attr('opacity', isFade ? 0.3 : 1);

    // Bar fill
    const bar = g.append('rect')
      .attr('x', lm)
      .attr('y', y)
      .attr('width', 0)
      .attr('height', bh)
      .attr('fill', fillColor)
      .attr('opacity', opacity)
      .attr('rx', 2)
      .attr('class', `driver-bar driver-bar-${i}`);

    if (!prefersReducedMotion) {
      bar.transition()
        .delay(i * 80)
        .duration(600)
        .ease(d3.easeCubicInOut)
        .attr('width', targetW);
    } else {
      bar.attr('width', targetW);
    }

    // Pct label
    g.append('text')
      .attr('x', lm + targetW + 8)
      .attr('y', y + bh / 2 + 4)
      .attr('font-family', 'Inter, system-ui, sans-serif')
      .attr('font-size', '13px')
      .attr('font-weight', '600')
      .attr('fill', isFirst ? '#C8102E' : '#4A4948')
      .attr('opacity', 0)
      .attr('class', `driver-pct driver-pct-${i}`)
      .text(d.value + '%')
      .transition()
      .delay(prefersReducedMotion ? 0 : i * 80 + 600)
      .duration(prefersReducedMotion ? 0 : 300)
      .attr('opacity', isFade ? 0.3 : 1);
  });
}

function highlightDriversBars(state) {
  if (driversHighlightState === state) return;
  driversHighlightState = state;

  // Indices 1, 2, 3 are Roadmap, UX, Security
  const highlightIndices = [1, 2, 3];

  d3.selectAll('.driver-bar').each(function(d, i) {
    const isHighlight = highlightIndices.includes(i);
    const isFirst = i === 0;
    d3.select(this)
      .transition().duration(prefersReducedMotion ? 0 : 400)
      .attr('opacity', isFirst ? 1 : isHighlight ? 1 : 0.25);
  });

  d3.selectAll('.driver-pct').each(function(d, i) {
    const isHighlight = highlightIndices.includes(i);
    const isFirst = i === 0;
    d3.select(this)
      .transition().duration(prefersReducedMotion ? 0 : 400)
      .attr('opacity', isFirst || isHighlight ? 1 : 0.25);
  });
}

// ============================================================
// SCENE: Industry cells
// ============================================================

function buildIndustryCells() {
  const container = document.getElementById('industry-cells');
  if (!container) return;

  integrationByIndustry.data.forEach(d => {
    const cell = document.createElement('div');
    cell.className = 'industry-cell';
    cell.innerHTML = `
      <span class="industry-pct">${d.value}%</span>
      <span class="industry-label">${d.label}</span>
    `;
    container.appendChild(cell);
  });
}

function showIndustry() {
  const overlay = document.getElementById('industry-overlay');
  if (!overlay) return;

  setTimeout(() => {
    overlay.classList.add('visible');
    const cells = overlay.querySelectorAll('.industry-cell');
    cells.forEach((cell, i) => {
      setTimeout(() => cell.classList.add('visible'), prefersReducedMotion ? 0 : i * 100);
    });
  }, prefersReducedMotion ? 0 : 200);
}

// ============================================================
// SCENE: Converging bars (D3)
// ============================================================

function drawConvergingBars(sub) {
  const svgEl = document.getElementById('converging-svg');
  if (!svgEl) return;

  const W = svgEl.clientWidth || 800;
  const H = 260;
  svgEl.style.height = H + 'px';

  const svg = d3.select(svgEl);
  svg.selectAll('*').remove();
  svg.attr('viewBox', `0 0 ${W} ${H}`);

  const cx = W / 2;
  const bh = 64;
  const pad = W * 0.02; // minimum gap from center each side

  // Integration driver (44%) — left bar, red
  const leftVal = integrationStats[0].stat;  // 44
  const rightVal = integrationStats[1].stat; // 40
  const maxPossible = 50;
  const leftW  = (leftVal  / maxPossible) * (cx - pad);
  const rightW = (rightVal / maxPossible) * (cx - pad);

  const y1 = H * 0.15;
  const y2 = H * 0.55;

  // Left bar
  const leftBar = svg.append('rect')
    .attr('x', 0)
    .attr('y', y1)
    .attr('width', 0)
    .attr('height', bh)
    .attr('fill', '#C8102E')
    .attr('rx', 3);

  // Left label (inside bar)
  const leftLbl = svg.append('text')
    .attr('x', 12)
    .attr('y', y1 + bh / 2 - 8)
    .attr('font-family', 'Inter, system-ui, sans-serif')
    .attr('font-size', '13px')
    .attr('font-weight', '600')
    .attr('fill', 'white')
    .attr('opacity', 0)
    .text(`${leftVal}%`);

  svg.append('text')
    .attr('x', 12)
    .attr('y', y1 + bh / 2 + 10)
    .attr('font-family', 'Inter, system-ui, sans-serif')
    .attr('font-size', '12px')
    .attr('fill', 'rgba(255,255,255,0.85)')
    .attr('opacity', 0)
    .attr('class', 'left-sub')
    .text('build custom for better integration');

  // Right bar
  const rightBar = svg.append('rect')
    .attr('x', W)
    .attr('y', y2)
    .attr('width', 0)
    .attr('height', bh)
    .attr('fill', '#1A4FAB')
    .attr('rx', 3);

  // Right label (inside bar, right-aligned)
  const rightLbl = svg.append('text')
    .attr('x', W - 12)
    .attr('y', y2 + bh / 2 - 8)
    .attr('text-anchor', 'end')
    .attr('font-family', 'Inter, system-ui, sans-serif')
    .attr('font-size', '13px')
    .attr('font-weight', '600')
    .attr('fill', 'white')
    .attr('opacity', 0)
    .text(`${rightVal}%`);

  svg.append('text')
    .attr('x', W - 12)
    .attr('y', y2 + bh / 2 + 10)
    .attr('text-anchor', 'end')
    .attr('font-family', 'Inter, system-ui, sans-serif')
    .attr('font-size', '12px')
    .attr('fill', 'rgba(255,255,255,0.85)')
    .attr('opacity', 0)
    .attr('class', 'right-sub')
    .text('cite integration as their biggest delivery challenge');

  // Centre divider line
  const divLine = svg.append('line')
    .attr('x1', cx).attr('y1', y1 - 16)
    .attr('x2', cx).attr('y2', y2 + bh + 16)
    .attr('stroke', '#E5E4E0')
    .attr('stroke-width', 1)
    .attr('stroke-dasharray', '4 3')
    .attr('opacity', 0);

  // Centre label
  const centreLbl = svg.append('text')
    .attr('x', cx)
    .attr('y', (y1 + y2) / 2 + bh / 2)
    .attr('text-anchor', 'middle')
    .attr('font-family', 'Inter, system-ui, sans-serif')
    .attr('font-size', '11px')
    .attr('font-weight', '500')
    .attr('fill', '#4A4948')
    .attr('text-transform', 'uppercase')
    .attr('letter-spacing', '0.08em')
    .attr('opacity', 0)
    .text('same organisations');

  if (!prefersReducedMotion) {
    const dur = 800;
    leftBar.transition().duration(dur).ease(d3.easeCubicInOut).attr('width', leftW);
    rightBar.transition().duration(dur).ease(d3.easeCubicInOut)
      .attr('x', W - rightW).attr('width', rightW);

    leftLbl.transition().delay(dur + 100).duration(300).attr('opacity', 1);
    svg.select('.left-sub').transition().delay(dur + 100).duration(300).attr('opacity', 1);
    rightLbl.transition().delay(dur + 100).duration(300).attr('opacity', 1);
    svg.select('.right-sub').transition().delay(dur + 100).duration(300).attr('opacity', 1);

    divLine.transition().delay(dur + 200).duration(400).attr('opacity', 1);
    centreLbl.transition().delay(dur + 400).duration(400).attr('opacity', 1);
  } else {
    leftBar.attr('width', leftW);
    rightBar.attr('x', W - rightW).attr('width', rightW);
    leftLbl.attr('opacity', 1);
    svg.select('.left-sub').attr('opacity', 1);
    rightLbl.attr('opacity', 1);
    svg.select('.right-sub').attr('opacity', 1);
    divLine.attr('opacity', 1);
    centreLbl.attr('opacity', 1);
  }
}

function showAIFinding() {
  const el = document.getElementById('ai-finding');
  if (el) el.classList.add('visible');
}

// ============================================================
// SCENE: Gap / split screen
// ============================================================

function animateGap() {
  const dur = prefersReducedMotion ? 0 : null;

  // Divider grows
  setTimeout(() => {
    document.getElementById('gap-divider')?.classList.add('visible');
  }, dur ?? 100);

  // Halves fade in
  setTimeout(() => {
    document.getElementById('gap-left')?.classList.add('visible');
  }, dur ?? 300);
  setTimeout(() => {
    document.getElementById('gap-right')?.classList.add('visible');
  }, dur ?? 500);

  // Thermometer
  setTimeout(() => {
    const row = document.getElementById('thermo-row');
    if (!row) return;
    row.classList.add('visible');
    const total = perceptionGap.seniorLeadersExceeded + perceptionGap.midLevelExceeded;
    const lPct = (perceptionGap.seniorLeadersExceeded / total) * 100;
    const rPct = (perceptionGap.midLevelExceeded / total) * 100;
    setTimeout(() => {
      document.getElementById('thermo-l').style.width = `${lPct}%`;
      document.getElementById('thermo-r').style.width = `${rPct}%`;
    }, prefersReducedMotion ? 0 : 50);
  }, dur ?? 1500);
}

function initGapDetail() {
  setTimeout(() => {
    document.getElementById('delivery-stats')?.classList.add('visible');
  }, prefersReducedMotion ? 0 : 300);
  setTimeout(() => {
    document.getElementById('gap-quote')?.classList.add('visible');
  }, prefersReducedMotion ? 0 : 700);
}

// ============================================================
// SCENE: Partner maturity ladder (D3)
// ============================================================

let ladderState = 'a';

function drawMaturityLadder(initialState) {
  const svgEl = document.getElementById('ladder-svg');
  if (!svgEl) return;

  // Reverse data order so ladder goes low→high (Tactical first, Strategic last)
  const levels = [...partnerClassification.data]
    .reverse()
    .map(d => ({
      label: d.label,
      value: d.value,
    }));

  const W = svgEl.clientWidth || 700;
  const H = 220;
  svgEl.style.height = H + 'px';

  const svg = d3.select(svgEl);
  svg.selectAll('*').remove();
  svg.attr('viewBox', `0 0 ${W} ${H}`);

  const n = levels.length;
  const colW = W / n;
  const platW = colW * 0.65;
  const platH = 10;
  const stepH = (H * 0.45) / (n - 1);
  const baseY = H * 0.72;

  levels.forEach((level, i) => {
    const cx = colW * i + colW / 2;
    const platX = cx - platW / 2;
    const platY = baseY - stepH * i;
    const startY = H + 20;
    const isLast = i === n - 1;
    const fillColor = isLast && initialState !== 'a' ? '#C8102E' : '#9A9896';

    const g = svg.append('g').attr('class', `ladder-group-${i}`);

    // Vertical riser to next level
    if (i < n - 1) {
      const nextX = colW * (i + 1) + colW / 2 - (colW * 0.65) / 2;
      const nextY = platY - stepH;
      g.append('line')
        .attr('x1', platX + platW)
        .attr('y1', platY)
        .attr('x2', nextX)
        .attr('y2', nextY)
        .attr('stroke', '#E5E4E0')
        .attr('stroke-width', 2)
        .attr('opacity', 0)
        .transition().delay(prefersReducedMotion ? 0 : i * 150 + 400).duration(prefersReducedMotion ? 0 : 300)
        .attr('opacity', 1);
    }

    // Platform rect
    g.append('rect')
      .attr('x', platX)
      .attr('y', prefersReducedMotion ? platY : startY)
      .attr('width', platW)
      .attr('height', platH)
      .attr('fill', fillColor)
      .attr('rx', 2)
      .attr('class', `ladder-plat ladder-plat-${i}`)
      .transition()
      .delay(prefersReducedMotion ? 0 : i * 150)
      .duration(prefersReducedMotion ? 0 : 600)
      .ease(d3.easeCubicOut)
      .attr('y', platY);

    // Percentage
    g.append('text')
      .attr('x', cx)
      .attr('y', platY - 32)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Inter, system-ui, sans-serif')
      .attr('font-size', '24px')
      .attr('font-weight', '700')
      .attr('fill', isLast && initialState !== 'a' ? '#C8102E' : '#0D0D0D')
      .attr('opacity', 0)
      .attr('class', `ladder-pct ladder-pct-${i}`)
      .text(level.value + '%')
      .transition()
      .delay(prefersReducedMotion ? 0 : i * 150 + 400)
      .duration(prefersReducedMotion ? 0 : 400)
      .attr('opacity', 1);

    // Label below — use smaller font + wrap at space for long labels
    const words = level.label.split(' ');
    const labelEl = g.append('text')
      .attr('x', cx)
      .attr('y', platY + platH + 16)
      .attr('text-anchor', 'middle')
      .attr('font-family', 'Inter, system-ui, sans-serif')
      .attr('font-size', '11px')
      .attr('fill', '#4A4948')
      .attr('opacity', 0);
    // Split into two lines if more than 2 words
    if (words.length > 2) {
      const mid = Math.ceil(words.length / 2);
      labelEl.append('tspan')
        .attr('x', cx).attr('dy', '0em')
        .text(words.slice(0, mid).join(' '));
      labelEl.append('tspan')
        .attr('x', cx).attr('dy', '1.2em')
        .text(words.slice(mid).join(' '));
    } else {
      labelEl.text(level.label);
    }
    labelEl
      .transition()
      .delay(prefersReducedMotion ? 0 : i * 150 + 400)
      .duration(prefersReducedMotion ? 0 : 400)
      .attr('opacity', 1);
  });

  ladderState = initialState;
}

function illuminateStrategic() {
  if (ladderState === 'b') return;
  ladderState = 'b';

  // Highlight last platform in red
  d3.selectAll('.ladder-plat').each(function(d, i) {
    const isLast = i === 3;
    d3.select(this)
      .transition().duration(prefersReducedMotion ? 0 : 500)
      .attr('fill', isLast ? '#C8102E' : '#9A9896');
  });
  d3.selectAll('.ladder-pct').each(function(d, i) {
    const isLast = i === 3;
    d3.select(this)
      .transition().duration(prefersReducedMotion ? 0 : 500)
      .attr('fill', isLast ? '#C8102E' : '#0D0D0D');
  });
}

function showAspiration() {
  if (ladderState === 'c') return;
  ladderState = 'c';
  illuminateStrategic();
  const row = document.getElementById('aspiration-row');
  if (row) row.classList.add('visible');
}

// ============================================================
// SCENE: Closing
// ============================================================

function updateClose(sub) {
  if (sub === 'a') {
    document.getElementById('beat-1')?.classList.add('visible');
  } else if (sub === 'b') {
    document.getElementById('beat-1')?.classList.add('visible');
    setTimeout(() => {
      document.getElementById('beat-2')?.classList.add('visible');
    }, prefersReducedMotion ? 0 : 300);
  } else if (sub === 'c') {
    document.getElementById('beat-1')?.classList.add('visible');
    document.getElementById('beat-2')?.classList.add('visible');
    setTimeout(() => {
      document.getElementById('beat-3')?.classList.add('visible');
    }, prefersReducedMotion ? 0 : 300);
    setTimeout(() => {
      document.getElementById('close-footer')?.classList.add('visible');
    }, prefersReducedMotion ? 0 : 700);
  }
}

// ============================================================
// Counter animation
// ============================================================

function countUp(el, from, to, durationMs) {
  if (!el) return;
  if (prefersReducedMotion) { el.textContent = to; return; }
  const start = performance.now();
  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / durationMs, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // cubic ease-out
    el.textContent = Math.round(from + (to - from) * eased);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ============================================================
// MOBILE FALLBACK — render inline scenes
// ============================================================

function initMobile() {
  const container = document.getElementById('scrolly-outer');
  if (!container) return;

  // Hide existing scrolly structure
  container.style.display = 'none';

  // Render inline mobile scenes after opening section
  const mobileEl = document.createElement('div');
  mobileEl.id = 'mobile-content';
  container.parentNode.insertBefore(mobileEl, container.nextSibling);

  renderMobileScenes(mobileEl);
  initMobileAnimations();
}

function renderMobileScenes(el) {
  el.innerHTML = `
    <!-- Scene 1 -->
    <section class="mobile-scene" aria-label="Why organisations build custom">
      <div style="padding:2rem 1.25rem 1.5rem;">
        <p class="industry-headline">What tips the decision toward custom</p>
        <div id="mobile-drivers" style="display:flex;flex-direction:column;gap:0.5rem;margin-top:1rem;"></div>
      </div>
      <div class="mobile-step-text">
        <p>The decision to build custom software is almost never ideological. Integration is the most common trigger — 44% of organisations chose custom for better fit with their existing systems.</p>
        <p>The integration driver runs across every sector: strongest in IT and technology (61%), present in manufacturing (53%), consumer goods (57%), and logistics (43%).</p>
      </div>
    </section>

    <!-- Scene 2 -->
    <section class="mobile-scene" aria-label="The integration paradox">
      <div style="padding:2rem 1.25rem 1rem;display:flex;gap:2rem;flex-wrap:wrap;">
        <div style="flex:1;min-width:140px;">
          <div style="font-size:48px;font-weight:800;color:#C8102E;line-height:1;letter-spacing:-0.04em;">44%</div>
          <p style="font-size:14px;color:#4A4948;margin-top:0.5rem;line-height:1.4;">build custom for better integration</p>
        </div>
        <div style="flex:1;min-width:140px;">
          <div style="font-size:48px;font-weight:800;color:#1A4FAB;line-height:1;letter-spacing:-0.04em;">40%</div>
          <p style="font-size:14px;color:#4A4948;margin-top:0.5rem;line-height:1.4;">cite integration as biggest delivery challenge</p>
        </div>
      </div>
      <div class="mobile-step-text">
        <p>The same force is driving demand and throttling delivery. And 43% say legacy integration is already a significant obstacle to adopting agentic AI.</p>
      </div>
    </section>

    <!-- Scene 3 -->
    <section class="mobile-scene" aria-label="The perception gap">
      <div style="padding:2rem 1.25rem 1rem;">
        <div style="display:flex;gap:2rem;margin-bottom:1.5rem;align-items:flex-start;">
          <div style="flex:1;text-align:center;">
            <div style="font-size:56px;font-weight:800;color:#0D0D0D;line-height:1;letter-spacing:-0.04em;">${perceptionGap.seniorLeadersExceeded}%</div>
            <p style="font-size:12px;font-weight:500;color:#4A4948;text-transform:uppercase;letter-spacing:0.08em;margin-top:0.5rem;">C-suite</p>
          </div>
          <div style="width:1px;background:#E5E4E0;margin-top:0.5rem;self-align:stretch;align-self:stretch;"></div>
          <div style="flex:1;text-align:center;">
            <div style="font-size:56px;font-weight:800;color:#C8102E;line-height:1;letter-spacing:-0.04em;">${perceptionGap.midLevelExceeded}%</div>
            <p style="font-size:12px;font-weight:500;color:#4A4948;text-transform:uppercase;letter-spacing:0.08em;margin-top:0.5rem;">Delivery</p>
          </div>
        </div>
        <p style="font-size:14px;font-weight:600;color:#C8102E;text-align:center;">${perceptionGap.gap} point gap</p>
        <div style="margin:1rem 0;height:8px;border-radius:9999px;background:#E5E4E0;overflow:hidden;display:flex;">
          <div style="width:${(63/102)*100}%;background:#0D0D0D;"></div>
          <div style="width:${(39/102)*100}%;background:#C8102E;"></div>
        </div>
      </div>
      <div class="mobile-step-text">
        <p>C-suite report strong outcomes — ${perceptionGap.seniorLeadersExceeded}% say projects exceeded expectations. Only ${perceptionGap.midLevelExceeded}% of delivery managers say the same. The gap is where return on investment quietly leaks.</p>
        <p>${perceptionGap.midLevelScopeCreep}% of delivery managers report scope creep. ${perceptionGap.midLevelIntegrationIssues}% point to integration as a primary friction point.</p>
        <blockquote style="margin-top:1.25rem;padding-left:1rem;border-left:2px solid #E5E4E0;">
          <p style="font-family:'Playfair Display',serif;font-style:italic;font-size:16px;color:#0D0D0D;line-height:1.6;">"${quotes[3].text}"</p>
          <cite style="font-size:11px;color:#4A4948;text-transform:uppercase;letter-spacing:0.08em;font-style:normal;">Survey respondent</cite>
        </blockquote>
      </div>
    </section>

    <!-- Scene 4 -->
    <section class="mobile-scene" aria-label="Partner maturity">
      <div style="padding:2rem 1.25rem 1rem;">
        <p class="industry-headline" style="margin-bottom:1.25rem;">Partner relationship type</p>
        <div style="display:flex;flex-direction:column;gap:0.75rem;" id="mobile-partners"></div>
      </div>
      <div class="mobile-step-text">
        <p>47% of organisations have a trusted delivery relationship. Only 32% have a strategic partner — yet 97% would invest more in one who consistently delivers long-term value.</p>
        <p>The jump from trusted to strategic is not a procurement decision. It is a relationship architecture.</p>
      </div>
    </section>

    <!-- Scene 5 -->
    <section class="mobile-scene" style="text-align:center;padding:3rem 1.25rem;" aria-label="Closing">
      <p style="font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(24px,6vw,40px);color:#0D0D0D;line-height:1.35;margin-bottom:1.25rem;">
        97% of organisations say they would invest more in a partner who consistently delivers long-term value.
      </p>
      <p style="font-family:'Playfair Display',serif;font-style:italic;font-size:clamp(24px,6vw,40px);color:#C8102E;line-height:1.35;margin-bottom:2rem;">
        32% of them have one.
      </p>
      <p style="font-size:16px;color:#4A4948;line-height:1.7;max-width:480px;margin:0 auto 2.5rem;">
        The gap between what organisations know they need and what they have settled for is where competitive advantage is currently being lost.
      </p>
      <div style="border-top:1px solid #E5E4E0;padding-top:2rem;display:flex;flex-direction:column;align-items:center;gap:1.25rem;">
        <div style="font-size:20px;font-weight:700;color:#0D0D0D;">NashTech</div>
        <p style="font-size:13px;color:#4A4948;">Differentiating Through Custom Software · 2026</p>
        <div style="display:flex;gap:0.75rem;flex-wrap:wrap;justify-content:center;">
          <a href="${meta.reportUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary">Read the full report</a>
          <a href="https://www.nashtechglobal.com/contact/" target="_blank" rel="noopener noreferrer" class="btn-secondary">Talk to NashTech</a>
        </div>
        <p style="font-size:12px;color:#4A4948;">Research conducted by Vanson Bourne on behalf of NashTech, 2025. N=1,000.</p>
      </div>
    </section>
  `;

  // Populate mobile drivers chart
  const mDrivers = document.getElementById('mobile-drivers');
  if (mDrivers) {
    buildDrivers.data.forEach((d, i) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:0.75rem;';
      row.innerHTML = `
        <span style="font-size:13px;color:#4A4948;flex:0 0 200px;text-align:right;">${d.label}</span>
        <div style="flex:1;height:18px;background:#F0EFEB;border-radius:2px;overflow:hidden;">
          <div style="height:100%;width:${d.value}%;background:${i===0?'#C8102E':'#1A4FAB'};opacity:${i===0?1:0.7};border-radius:2px;"></div>
        </div>
        <span style="font-size:13px;font-weight:600;color:${i===0?'#C8102E':'#4A4948'};flex:0 0 2.5rem;">${d.value}%</span>
      `;
      mDrivers.appendChild(row);
    });
  }

  // Populate mobile partners
  const mPartners = document.getElementById('mobile-partners');
  if (mPartners) {
    const ordered = [...partnerClassification.data].reverse();
    ordered.forEach(d => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex;align-items:center;gap:0.75rem;';
      const isStrategic = d.label === 'Strategic partner';
      row.innerHTML = `
        <span style="font-size:24px;font-weight:800;color:${isStrategic?'#C8102E':'#0D0D0D'};flex:0 0 3.5rem;">${d.value}%</span>
        <div>
          <p style="font-size:14px;font-weight:600;color:${isStrategic?'#C8102E':'#0D0D0D'};">${d.label}</p>
          <p style="font-size:12px;color:#4A4948;">${d.description}</p>
        </div>
      `;
      mPartners.appendChild(row);
    });
  }
}

function initMobileAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Animate mobile sections on scroll
  document.querySelectorAll('.mobile-scene').forEach((section, i) => {
    if (!prefersReducedMotion) {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = `opacity 0.5s ease ${i * 0.1}s, transform 0.5s ease ${i * 0.1}s`;
    }
    observer.observe(section);
  });
}
