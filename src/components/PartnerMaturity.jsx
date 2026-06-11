import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { partnerClassification, partnerByOrgSize, partnerAspiration } from '../data/surveyData.js';

const BAR_COLORS = {
  'Strategic partner': '#C8102E',
  'Trusted delivery partner': '#4A4A48',
  'Project-based provider': '#9B9B98',
  'Tactical support': '#C8C8C4',
};

function PartnerBar({ item, max, delay, animate }) {
  const color = BAR_COLORS[item.label] || '#C8C8C4';
  const isStrategic = item.label === 'Strategic partner';

  return (
    <div className="flex items-center gap-4">
      <span
        className={`text-[13px] w-44 shrink-0 text-right pr-2 leading-snug ${isStrategic ? 'font-semibold text-ink' : 'text-slate'}`}
      >
        {item.label}
      </span>
      <div className="flex-1 bg-mist rounded h-3 overflow-hidden">
        <motion.div
          className="h-full rounded"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={animate ? { width: `${(item.value / max) * 100}%` } : { width: 0 }}
          transition={{ duration: 0.7, delay, ease: 'easeOut' }}
        />
      </div>
      <span className={`text-[14px] font-semibold w-10 shrink-0 ${isStrategic ? 'text-nt-red' : 'text-slate'}`}>
        {item.value}%
      </span>
    </div>
  );
}

export default function PartnerMaturity() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });
  const max = Math.max(...partnerClassification.data.map((d) => d.value));

  return (
    <section
      ref={ref}
      className="bg-white py-24"
      aria-label="Partner maturity"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <p className="text-[12px] font-medium text-slate uppercase tracking-wide8 mb-3">
            Theme 9 · Partners
          </p>
          <h2 className="text-[32px] font-semibold text-ink mb-2" style={{ letterSpacing: '-0.01em' }}>
            Only <span className="text-nt-red">32%</span> have a strategic partner.{' '}
            <span className="text-nt-red">97%</span> want one.
          </h2>
        </motion.div>

        {/* Classification bars */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-10 space-y-4 max-w-2xl"
          aria-label="Partner relationship classification"
        >
          <p className="text-[13px] text-slate mb-6">{partnerClassification.question}</p>
          {partnerClassification.data.map((item, i) => (
            <div key={item.label}>
              <PartnerBar item={item} max={max} delay={i * 0.08} animate={inView} />
              <p className="text-[12px] text-slate/70 mt-1 pl-[198px] leading-snug">
                {item.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Org size comparison */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-0 max-w-lg"
        >
          <div className="border border-mist rounded-l p-6">
            <div className="text-[40px] font-extrabold text-slate leading-none mb-2">
              {partnerByOrgSize[0].strategicPct}%
            </div>
            <p className="text-[13px] text-slate leading-snug">
              of <strong className="font-semibold text-ink">smaller enterprises</strong> see their partner as strategic
            </p>
          </div>
          <div className="border border-mist border-l-0 rounded-r p-6 bg-near-white">
            <div className="text-[40px] font-extrabold text-nt-red leading-none mb-2">
              {partnerByOrgSize[1].strategicPct}%
            </div>
            <p className="text-[13px] text-slate leading-snug">
              of <strong className="font-semibold text-ink">larger enterprises</strong> see their partner as strategic
            </p>
          </div>
        </motion.div>

        {/* Closing insight */}
        <motion.p
          className="text-[18px] italic text-ink mt-12 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          style={{ lineHeight: 1.6 }}
        >
          The jump from trusted to strategic is not a procurement decision. It is a relationship architecture.
        </motion.p>
      </div>
    </section>
  );
}
