import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { themes } from '../data/surveyData.js';

const SUMMARIES = {
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

export default function ThemeGrid() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      ref={ref}
      className="bg-near-white py-24"
      aria-label="Ten themes from the report"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-[12px] font-medium text-slate uppercase tracking-wide8 mb-3">
            The full picture
          </p>
          <h2 className="text-[32px] font-semibold text-ink" style={{ letterSpacing: '-0.01em' }}>
            Ten themes from 1,000 leaders
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {themes.map((theme, i) => (
            <motion.div
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="bg-white border border-mist rounded p-5 cursor-default transition-all duration-200
                         hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(0,0,0,0.07)]"
            >
              <div
                className="text-[28px] font-extrabold text-nt-red leading-none mb-3"
                aria-hidden="true"
              >
                {String(theme.id).padStart(2, '0')}
              </div>
              <h3 className="text-[14px] font-semibold text-ink mb-2 leading-snug">
                {theme.title}
              </h3>
              <p className="text-[12px] text-slate leading-relaxed">
                {SUMMARIES[theme.id]}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
