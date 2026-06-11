import React, { useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import PersonaFilter from './components/PersonaFilter.jsx';
import PersonaBanner from './components/PersonaBanner.jsx';
import HeadlineStats from './components/HeadlineStats.jsx';
import ChartSection from './components/ChartSection.jsx';
import PerceptionGap from './components/PerceptionGap.jsx';
import OffshoreOutcomes from './components/OffshoreOutcomes.jsx';
import PartnerMaturity from './components/PartnerMaturity.jsx';
import ThemeGrid from './components/ThemeGrid.jsx';
import QuoteBlock from './components/QuoteBlock.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  const [activePersona, setActivePersona] = useState('all');

  return (
    <div className="font-sans bg-white text-ink">
      <Nav />
      <Hero />
      <div id="findings">
        <PersonaFilter activePersona={activePersona} onSelect={setActivePersona} />
        {activePersona !== 'all' && <PersonaBanner personaId={activePersona} />}
        <HeadlineStats activePersona={activePersona} />
        <ChartSection activePersona={activePersona} />
        <PerceptionGap activePersona={activePersona} />
        <OffshoreOutcomes activePersona={activePersona} />
        <PartnerMaturity activePersona={activePersona} />
        <ThemeGrid />
        <QuoteBlock />
        <Footer />
      </div>
    </div>
  );
}
