import React from 'react';
import Hero from '../components/Hero';
import FilterBar from '../components/FilterBar';
import SanctuaryGrid from '../components/SanctuaryGrid';
import CraftPhilosophy from '../components/CraftPhilosophy';

export default function HomePage() {
  return (
    <main id="mainApp">
      <Hero />
      <FilterBar />
      <SanctuaryGrid />
      <CraftPhilosophy />
    </main>
  );
}
