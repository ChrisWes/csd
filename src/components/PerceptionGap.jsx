import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { perceptionGap, quotes } from '../data/surveyData.js';
import { useCountUp } from '../hooks/useCountUp.js';

function GapCounter({ value, color, label }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const count = useCountUp(value, 1400, 0, inView);

  return (
    <div ref={ref} className="flex flex-col items-center">
      <span
        className="font-extrabold leading-none"
        style={{ fontSize: 'clamp(64px, 8vw, 88px)', color, letterSpacing: '-0.04em' }}
        aria-label={`${value}%`}
      >
        <span aria-hidden="true">{count}%</span>
        <span className="sr-only">{value}%</span>
      </span>
      <span className="text-[13px] font-medium text-slate uppercase tracking-wide8 mt-3">
        {label}
      </span>
    </div>
  );
}

export default function PerceptionGap() {
  const { ref: sectionRef, inView: sectionIn } = useInView({ threshold: 0.15, triggerOnce: true });
  const misalignmentQuote = quotes.find((q) => q.id === 'q4');

  return (
    <section
      ref={sectionRef}
      className="bg-white py-24"
      aria-label="The perception gap"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow + headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={sectionIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[12px] font-medium text-slate uppercase tracking-wide8 mb-3">
            The perception gap · Theme 5
          </p>
          <h2 className="text-[clamp(28px,4vw,44px)] font-bold text-ink leading-tight max-w-3xl"
            style={{ letterSpacing: '-0.02em' }}>
            63% of leaders say projects exceeded expectations.{' '}
            <span className="text-nt-red">39% of the people delivering them agree.</span>
          </h2>
        </motion.div>

        {/* Two numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={sectionIn ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-0 mb-4"
        >
          <GapCounter value={perceptionGap.seniorLeadersExceeded} color="#0F0F0F" label="C-suite and board" />

          {/* Divider */}
          <div className="sm:mx-12 my-6 sm:my-0 w-px sm:h-28 h-px bg-mist" aria-hidden="true" />

          <GapCounter value={perceptionGap.midLevelExceeded} color="#C8102E" label="Delivery managers" />
        </motion.div>

        {/* Gap annotation */}
        <motion.div
          className="flex flex-col items-center mb-14"
          initial={{ opacity: 0, y: 8 }}
          animate={sectionIn ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex items-center gap-2 text-nt-red">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[15px] font-semibold">{perceptionGap.gap} point gap</span>
          </div>
        </motion.div>

        {/* Split thermometer */}
        <motion.div
          className="max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0 }}
          animate={sectionIn ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.7 }}
          aria-label={`Gap visualisation: ${perceptionGap.seniorLeadersExceeded}% vs ${perceptionGap.midLevelExceeded}%`}
        >
          <div className="flex h-3 rounded-full overflow-hidden">
            <motion.div
              className="bg-ink"
              initial={{ width: 0 }}
              animate={sectionIn ? { width: `${perceptionGap.seniorLeadersExceeded}%` } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
            />
            <motion.div
              className="bg-nt-red"
              initial={{ width: 0 }}
              animate={sectionIn ? { width: `${perceptionGap.midLevelExceeded}%` } : {}}
              transition={{ duration: 0.7, delay: 0.8 }}
            />
            <div className="flex-1 bg-mist" />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-slate uppercase tracking-wide8">0%</span>
            <span className="text-[11px] text-slate uppercase tracking-wide8">100%</span>
          </div>
        </motion.div>

        {/* Two-column detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={sectionIn ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <h3 className="text-[17px] font-semibold text-slate uppercase tracking-wide mb-5">
              What delivery teams are actually experiencing
            </h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="text-[40px] font-extrabold text-nt-red leading-none">
                  {perceptionGap.midLevelScopeCreep}%
                </span>
                <p className="text-[15px] text-slate leading-relaxed pt-1">
                  of mid-level managers report scope creep as a recurring delivery challenge
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[40px] font-extrabold text-nt-red leading-none">
                  {perceptionGap.midLevelIntegrationIssues}%
                </span>
                <p className="text-[15px] text-slate leading-relaxed pt-1">
                  point to integration challenges as their primary delivery blocker
                </p>
              </div>
            </div>
          </motion.div>

          {misalignmentQuote && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={sectionIn ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.65 }}
              className="border-l border-mist pl-8"
            >
              <p className="text-[18px] italic text-ink leading-[1.7] mb-4">
                "{misalignmentQuote.text}"
              </p>
              <p className="text-[13px] text-slate uppercase tracking-wide8">
                {misalignmentQuote.role}
              </p>
            </motion.div>
          )}
        </div>

        {/* Closing line */}
        <motion.p
          className="text-[18px] italic text-ink mt-14 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={sectionIn ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 }}
          style={{ lineHeight: 1.6 }}
        >
          The gap rarely stems from lack of ambition. It stems from measuring success differently at each level.
        </motion.p>
      </div>
    </section>
  );
}
