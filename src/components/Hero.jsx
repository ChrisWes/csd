import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Hero() {
  const prefersReduced = useReducedMotion();

  const fadeUp = prefersReduced
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : { initial: { opacity: 0, y: 24 }, animate: { opacity: 1, y: 0 } };

  return (
    <section
      className="min-h-screen flex items-center pt-14"
      aria-label="Hero — survey headline"
    >
      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20 py-20">
        {/* Left — typographic treatment */}
        <div className="lg:col-span-3 flex flex-col justify-center">
          <motion.p
            className="text-[12px] font-medium text-slate uppercase tracking-wide8 mb-6"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            1,000 technology leaders · 6 territories · 2026
          </motion.p>

          <motion.h1
            className="mb-6"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span
              className="block text-ink font-extrabold leading-none tracking-tight"
              style={{ fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: '-0.04em' }}
            >
              Custom software
            </span>
            <span
              className="block text-nt-red font-extrabold leading-none tracking-tight"
              style={{ fontSize: 'clamp(48px, 6vw, 80px)', letterSpacing: '-0.04em' }}
            >
              is the edge.
            </span>
          </motion.h1>

          <motion.p
            className="text-[20px] text-slate mb-10 max-w-xl"
            style={{ lineHeight: 1.5 }}
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Not every organisation has realised it yet.
          </motion.p>

          <motion.a
            href="#findings"
            className="inline-flex items-center gap-2 bg-nt-red text-white text-[15px] font-semibold px-7 py-3.5 rounded self-start hover:bg-red-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-nt-red focus-visible:ring-offset-2"
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Explore the findings
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M8 3L13 8L8 13M3 8H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.a>
        </div>

        {/* Right — dramatic stat */}
        <div className="lg:col-span-2 flex flex-col justify-center items-start lg:items-end">
          <motion.div
            className="text-right"
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div
              className="font-extrabold text-ink leading-none mb-3"
              style={{ fontSize: 'clamp(80px, 12vw, 120px)', letterSpacing: '-0.04em' }}
              aria-label="70 percent"
            >
              70%
            </div>
            <p className="text-[16px] text-slate max-w-[280px] ml-auto text-right leading-relaxed">
              of organisations now choose custom over off-the-shelf
            </p>

            <motion.div
              className="mt-6 h-[2px] bg-nt-red ml-auto"
              initial={prefersReduced ? { width: '100%' } : { width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
              style={{ maxWidth: '280px' }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
