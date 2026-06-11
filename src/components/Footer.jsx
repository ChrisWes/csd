import React from 'react';
import { meta } from '../data/surveyData.js';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-mist py-12" role="contentinfo">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Left */}
          <div>
            <div className="font-bold text-[18px] text-ink mb-1">NashTech</div>
            <p className="text-[13px] text-slate">
              {meta.title} · {meta.publishYear} UK Survey
            </p>
          </div>

          {/* Centre — primary CTA */}
          <div className="flex items-center gap-4">
            <a
              href={meta.reportUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-nt-red text-white text-[14px] font-semibold px-6 py-3 rounded hover:bg-red-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-nt-red focus-visible:ring-offset-2"
            >
              Read the full report
            </a>
            <a
              href="https://www.nashtechglobal.com/contact/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-ink text-[14px] font-semibold px-6 py-3 rounded border border-mist hover:border-slate/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-nt-red focus-visible:ring-offset-2"
            >
              Talk to NashTech
            </a>
          </div>
        </div>

        {/* Legal */}
        <p className="text-[12px] text-slate border-t border-mist pt-6">
          Research conducted by {meta.researchPartner} on behalf of NashTech, 2025. N={meta.respondents.toLocaleString()}.
        </p>
      </div>
    </footer>
  );
}
