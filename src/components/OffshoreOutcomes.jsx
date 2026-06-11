import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { offshoreStats, offshoreOutcomes, quotes } from '../data/surveyData.js';
import { useCountUp } from '../hooks/useCountUp.js';
import ChartExplainer from './ChartExplainer.jsx';

function BigCounter({ value, label }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const count = useCountUp(value, 1400, 0, inView);
  return (
    <div ref={ref} className="flex flex-col items-center">
      <span
        className="font-extrabold text-ink leading-none"
        style={{ fontSize: 'clamp(56px, 7vw, 80px)', letterSpacing: '-0.04em' }}
        aria-label={`${value}%`}
      >
        <span aria-hidden="true">{count}%</span>
        <span className="sr-only">{value}%</span>
      </span>
      <span className="text-[14px] text-slate text-center mt-3 max-w-[180px] leading-snug">
        {label}
      </span>
    </div>
  );
}

function OutcomeBar({ label, value, max, color, highlight, delay, animate }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[13px] text-slate w-72 shrink-0 text-right pr-2 leading-snug">
        {label}
      </span>
      <div className="flex-1 bg-mist rounded h-2 overflow-hidden">
        <motion.div
          className="h-full rounded"
          style={{ backgroundColor: highlight ? '#5B2D8E' : color }}
          initial={{ width: 0 }}
          animate={animate ? { width: `${(value / max) * 100}%` } : { width: 0 }}
          transition={{ duration: 0.7, delay, ease: 'easeOut' }}
        />
      </div>
      <span className="text-[13px] font-semibold text-ink w-10 shrink-0">
        {value}%
      </span>
    </div>
  );
}

export default function OffshoreOutcomes({ activePersona = 'all' }) {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const filtered = offshoreOutcomes.data.filter((d) => d.label !== 'Nothing has improved');
  const max = Math.max(...filtered.map((d) => d.value));

  const q7 = quotes.find((q) => q.id === 'q7');

  return (
    <section
      ref={ref}
      className="bg-near-white py-24"
      aria-label="Offshore development outcomes"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-[12px] font-medium text-slate uppercase tracking-wide8 mb-3">
            Theme 10 · The offshore reality check
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start">
          <div>
            {/* Two large stats */}
            <div className="flex flex-col sm:flex-row items-start gap-10 sm:gap-16 mb-14">
              <BigCounter value={offshoreStats.useOffshore} label="use offshore partners" />
              <div className="w-px h-20 bg-mist hidden sm:block" aria-hidden="true" />
              <BigCounter value={offshoreStats.reportBetterOutcomes} label="of those report better outcomes" />
            </div>

            {/* Outcomes chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-10"
            >
              <h3 className="text-[20px] font-semibold text-ink mb-1">
                What's actually improving
              </h3>
              <p className="text-[13px] text-slate mb-6">{offshoreOutcomes.note}</p>
              <div className="space-y-3" aria-label="Offshore outcomes breakdown">
                {filtered.map((item, i) => (
                  <OutcomeBar
                    key={item.label}
                    label={item.label}
                    value={item.value}
                    max={max}
                    color="#0E9E8E"
                    highlight={i === 0}
                    delay={i * 0.06}
                    animate={inView}
                  />
                ))}
              </div>
            </motion.div>

            {/* Pull quote */}
            {q7 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="border-l-2 border-mist pl-6 my-8"
              >
                <p className="text-[22px] text-nt-red font-bold mb-2 leading-none" aria-hidden="true">"</p>
                <p className="text-[17px] italic text-ink leading-[1.7] mb-3">
                  {q7.text}
                </p>
                <p className="text-[13px] text-slate uppercase tracking-wide8">
                  {q7.role} · {q7.location}
                </p>
              </motion.div>
            )}

            {/* Closing line */}
            <motion.p
              className="text-[17px] text-slate italic mt-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              The risk is not offshore itself. The risk is the wrong operating model around it.
            </motion.p>
          </div>{/* chart content end */}

          <div className="lg:border-l lg:border-mist lg:pl-10 pt-1">
            <ChartExplainer section="offshore" activePersona={activePersona} />
          </div>
        </div>{/* grid end */}
      </div>
    </section>
  );
}
