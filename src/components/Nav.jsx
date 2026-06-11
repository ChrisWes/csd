import React from 'react';
import { meta } from '../data/surveyData.js';
import ntLogo from '../ntlogo.png';

export default function Nav() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-mist"
      style={{ height: '56px' }}
      role="navigation"
      aria-label="Site navigation"
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        <div className="flex items-baseline gap-3">
          <span className="font-bold text-[18px] text-ink tracking-tight">NashTech</span>
          <span className="text-[13px] text-slate">Research {meta.publishYear}</span>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={meta.reportUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-nt-red border border-nt-red/40 px-4 py-1.5 rounded hover:bg-nt-red/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-nt-red focus-visible:ring-offset-2"
          >
            Download the report
          </a>
          <img
            src={ntLogo}
            alt="NashTech"
            className="h-7 w-auto"
          />
        </div>
      </div>
    </nav>
  );
}
