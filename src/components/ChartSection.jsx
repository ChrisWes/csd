import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import {
  buildDrivers,
  integrationByIndustry,
  aiAdoption,
  aiBlockers,
  aiStackInvestment,
} from '../data/surveyData.js';
import ChartExplainer from './ChartExplainer.jsx';

// ── Animated horizontal bar ─────────────────────────────────────
function HBar({ label, value, max, color, delay, animate }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] text-slate w-56 shrink-0 text-right leading-snug pr-2">
        {label}
      </span>
      <div className="flex-1 bg-mist rounded-full h-2 overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={animate ? { width: `${(value / max) * 100}%` } : { width: 0 }}
          transition={{ duration: 0.7, delay, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[13px] font-semibold text-ink w-10 shrink-0">{value}%</span>
    </div>
  );
}

// ── Build drivers chart ─────────────────────────────────────────
function BuildDriversChart() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const max = Math.max(...buildDrivers.data.map((d) => d.value));

  return (
    <div ref={ref} className="space-y-3" aria-label="Reasons organisations build custom software">
      {buildDrivers.data.map((item, i) => (
        <HBar
          key={item.label}
          label={item.label}
          value={item.value}
          max={max}
          color={i === 0 ? '#C8102E' : '#1A4FAB'}
          delay={i * 0.06}
          animate={inView}
        />
      ))}
      <p className="text-[12px] text-slate pt-1">{buildDrivers.note}</p>
    </div>
  );
}

// ── Integration by industry ─────────────────────────────────────
function IntegrationIndustry() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <div
      ref={ref}
      className="mt-10 grid grid-cols-2 md:grid-cols-4 divide-x divide-mist border border-mist rounded"
      aria-label="Integration as build driver by sector"
    >
      {integrationByIndustry.data.map((item, i) => (
        <motion.div
          key={item.label}
          className="px-5 py-4"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.08 }}
        >
          <div className="text-[28px] font-extrabold text-nt-purple leading-none mb-1">
            {item.value}%
          </div>
          <div className="text-[12px] text-slate uppercase tracking-wide8 leading-snug">
            {item.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── AI donut comparison ─────────────────────────────────────────
function AiDonutComparison() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const adoptionData = [
    { name: 'Adopting AI', value: aiAdoption.adoptingAI, fill: '#1A4FAB' },
    { name: 'Not yet', value: 100 - aiAdoption.adoptingAI, fill: '#E8E8E4' },
  ];
  const govData = [
    { name: 'With governance', value: aiAdoption.aiGovernance, fill: '#5B2D8E' },
    { name: 'Without', value: 100 - aiAdoption.aiGovernance, fill: '#E8E8E4' },
  ];

  return (
    <div ref={ref} aria-label="AI adoption vs governance">
      <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
        {[
          { data: adoptionData, label: 'Adopting AI', value: aiAdoption.adoptingAI, color: '#1A4FAB' },
          { data: govData, label: 'Building governance', value: aiAdoption.aiGovernance, color: '#5B2D8E' },
        ].map((ring) => (
          <div key={ring.label} className="flex flex-col items-center gap-2">
            <div className="relative w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={ring.data}
                    cx="50%"
                    cy="50%"
                    innerRadius={44}
                    outerRadius={58}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {ring.data.map((entry) => (
                      <Cell key={entry.name} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[22px] font-extrabold" style={{ color: ring.color }}>
                  {ring.value}%
                </span>
              </div>
            </div>
            <p className="text-[13px] text-slate text-center">{ring.label}</p>
          </div>
        ))}
      </div>
      <p className="text-[13px] text-slate text-center mt-4 italic">
        One in four organisations is building AI capability without a governance framework.
      </p>
    </div>
  );
}

// ── AI blockers ─────────────────────────────────────────────────
function AiBlockersChart() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const max = Math.max(...aiBlockers.data.map((d) => d.value));

  return (
    <div ref={ref} className="space-y-3" aria-label="AI adoption challenges">
      {aiBlockers.data.map((item, i) => (
        <HBar
          key={item.label}
          label={item.label}
          value={item.value}
          max={max}
          color="#1A4FAB"
          delay={i * 0.08}
          animate={inView}
        />
      ))}
    </div>
  );
}

// ── AI stack investment lollipop ────────────────────────────────
function AiStackChart() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <div ref={ref} className="space-y-2.5" aria-label="AI stack investment priorities">
      {aiStackInvestment.data.map((item, i) => (
        <motion.div
          key={item.label}
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.07 }}
        >
          <div className="flex-1 bg-mist rounded h-1.5 overflow-hidden">
            <motion.div
              className="h-full bg-data-amber rounded"
              initial={{ width: 0 }}
              animate={inView ? { width: `${(item.value / 30) * 100}%` } : { width: 0 }}
              transition={{ duration: 0.6, delay: i * 0.07 + 0.1 }}
            />
          </div>
          <span className="text-[13px] font-semibold text-ink w-8 shrink-0 text-right">
            {item.value}%
          </span>
          <span className="text-[13px] text-slate w-64 shrink-0 leading-snug">
            {item.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Section label ───────────────────────────────────────────────
function SectionLabel({ theme, title }) {
  return (
    <div className="mb-8">
      <p className="text-[12px] font-medium text-slate uppercase tracking-wide8 mb-2">{theme}</p>
      <h2 className="text-[32px] font-semibold text-ink" style={{ letterSpacing: '-0.01em' }}>
        {title}
      </h2>
    </div>
  );
}

// ── Main export ─────────────────────────────────────────────────
export default function ChartSection({ activePersona = 'all' }) {
  return (
    <>
      {/* ── Build drivers ── */}
      <section className="bg-white py-20" aria-label="Why organisations build custom software">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel theme="Theme 1" title="Why organisations build their own" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
            <div>
              <BuildDriversChart />
              <div className="mt-10">
                <h3 className="text-[17px] font-semibold text-ink mb-1">
                  Integration as a build driver, by sector
                </h3>
                <p className="text-[13px] text-slate mb-3">{integrationByIndustry.question}</p>
                <IntegrationIndustry />
              </div>
            </div>

            <div className="lg:border-l lg:border-mist lg:pl-10 pt-1">
              <ChartExplainer section="buildDrivers" activePersona={activePersona} />
            </div>
          </div>
        </div>
      </section>

      {/* ── AI ── */}
      <section className="bg-near-white py-20" aria-label="AI ambition vs readiness">
        <div className="max-w-7xl mx-auto px-6">
          <SectionLabel theme="Theme 4" title="AI ambition vs operational readiness" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
            <div className="space-y-12">
              <div>
                <h3 className="text-[18px] font-semibold text-ink mb-2">
                  Adopting AI: 85%. Building governance alongside it: 75%.
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-6">
                  <AiDonutComparison />
                  <div>
                    <h4 className="text-[15px] font-semibold text-ink mb-4">What's slowing it down</h4>
                    <AiBlockersChart />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[18px] font-semibold text-ink mb-1">
                  Where are organisations investing in the AI stack?
                </h3>
                <p className="text-[13px] text-slate mb-5">
                  Prioritised for investment or transformation, next 12–24 months
                </p>
                <AiStackChart />
              </div>
            </div>

            <div className="lg:border-l lg:border-mist lg:pl-10 pt-1">
              <ChartExplainer section="ai" activePersona={activePersona} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
