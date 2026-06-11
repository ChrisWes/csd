import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { headlines } from '../data/surveyData.js';
import StatCounter from './StatCounter.jsx';

const FEATURED_IDS = ['custom-preference', 'ai-adoption', 'offshore-use', 'strategic-partners'];

function StatCard({ item, index, activePersona, featured }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  const isRelevant =
    activePersona === 'all' ||
    item.personaRelevance.includes(activePersona);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white border border-mist rounded p-8 transition-opacity duration-300"
      style={{ opacity: isRelevant ? 1 : 0.4 }}
    >
      <StatCounter
        value={item.stat}
        unit={item.unit}
        color={featured ? 'text-nt-red' : 'text-ink'}
        size="text-[56px] lg:text-[64px]"
      />
      <p className="text-[13px] text-slate uppercase tracking-wide8 mt-3 leading-snug">
        {item.label}
      </p>
    </motion.div>
  );
}

export default function HeadlineStats({ activePersona }) {
  const featured = headlines.filter((h) => FEATURED_IDS.includes(h.id));
  const rest = headlines.filter((h) => !FEATURED_IDS.includes(h.id));

  return (
    <section className="bg-near-white py-20" aria-label="Headline statistics">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {featured.map((item, i) => (
            <StatCard
              key={item.id}
              item={item}
              index={i}
              activePersona={activePersona}
              featured
            />
          ))}
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {rest.map((item, i) => (
            <StatCard
              key={item.id}
              item={item}
              index={i + 4}
              activePersona={activePersona}
              featured={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
