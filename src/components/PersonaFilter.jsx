import React from 'react';

const PERSONAS = [
  { id: 'all', label: 'All' },
  { id: 'ceo', label: 'CEO' },
  { id: 'cfo', label: 'CFO' },
  { id: 'cio', label: 'CIO / CTO' },
  { id: 'cdo', label: 'CDO' },
  { id: 'architect', label: 'Senior Architect' },
];

export default function PersonaFilter({ activePersona, onSelect }) {
  return (
    <div
      className="sticky bg-white border-b border-mist z-40 overflow-x-auto"
      style={{ top: '56px' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div
          role="group"
          aria-label="Filter by role"
          className="flex gap-2 min-w-max"
        >
          {PERSONAS.map((p) => {
            const isActive = activePersona === p.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelect(p.id)}
                aria-pressed={isActive}
                className={[
                  'text-[13px] font-medium px-4 py-1.5 rounded-full border transition-colors whitespace-nowrap',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-nt-red focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-nt-red text-white border-nt-red'
                    : 'bg-white text-slate border-mist hover:border-slate/60',
                ].join(' ')}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
