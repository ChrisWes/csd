import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { quotes } from '../data/surveyData.js';

const FEATURED_IDS = ['q1', 'q5', 'q6'];

export default function QuoteBlock() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const featured = FEATURED_IDS.map((id) => quotes.find((q) => q.id === id)).filter(Boolean);

  return (
    <section
      ref={ref}
      className="bg-white py-24 border-t border-mist"
      aria-label="Voices from the research"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          className="text-[12px] font-medium text-slate uppercase tracking-wide8 mb-10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          Voices from the research
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((q, i) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <p
                className="text-nt-red font-bold leading-none mb-4 select-none"
                style={{ fontSize: '72px', lineHeight: 0.8 }}
                aria-hidden="true"
              >
                "
              </p>
              <p className="text-[18px] italic text-ink leading-[1.7] mb-5">
                {q.text}
              </p>
              <p className="text-[13px] text-slate uppercase tracking-wide8">
                {q.role}
                {q.location ? ` · ${q.location}` : ''}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
