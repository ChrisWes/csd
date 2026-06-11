import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personas } from '../data/surveyData.js';

export default function PersonaBanner({ personaId }) {
  const persona = personas[personaId];
  if (!persona) return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={personaId}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className="bg-white border-b border-mist"
      >
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="border-l-[3px] border-nt-red pl-6">
            <p className="text-[11px] font-medium text-slate uppercase tracking-wide8 mb-3">
              Viewing as: {persona.label}
            </p>
            <h2 className="text-[22px] font-semibold text-ink mb-3 leading-snug">
              {persona.headline}
            </h2>
            <p className="text-[15px] text-slate leading-[1.7] mb-6 max-w-3xl">
              {persona.insight}
            </p>

            {/* Mini stat row */}
            <div className="flex flex-wrap gap-8 mb-5">
              {persona.keyStats.map((s, i) => (
                <div key={i} className="flex items-baseline gap-2">
                  <span className="text-[32px] font-extrabold text-nt-red leading-none">
                    {s.stat}%
                  </span>
                  <span className="text-[13px] text-slate max-w-[160px] leading-snug">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-[14px] text-slate italic">
              {persona.provocation}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
