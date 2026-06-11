import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chartExplainers } from '../data/chartExplainers.js';

export default function ChartExplainer({ section, activePersona }) {
  const sectionData = chartExplainers[section];
  if (!sectionData) return null;

  const paras = sectionData[activePersona] ?? sectionData.all;

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key={activePersona}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col gap-4 pt-1"
        aria-live="polite"
      >
        {paras.map((text, i) => (
          <p
            key={i}
            className="text-[15px] text-slate leading-[1.75]"
          >
            {text}
          </p>
        ))}
      </motion.aside>
    </AnimatePresence>
  );
}
