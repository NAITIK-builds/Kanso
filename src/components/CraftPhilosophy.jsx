import React from 'react';

export default function CraftPhilosophy() {
  return (
    <section className="craft-manifesto-section">
      <div className="container craft-inner">
        <div className="craft-stamp">KANSO PHILOSOPHY</div>
        <blockquote className="craft-quote">
          "Architecture is not merely walls and beams; it is the curation of stillness, light, and natural shadow."
        </blockquote>
        <div className="craft-pillars">
          <div className="pillar-card">
            <span className="pillar-num">01</span>
            <h4>Indigenous Craft</h4>
            <p>Built with regional materials: Goa laterite stone, Himalayan deodar wood, and Rajasthan sandstone.</p>
          </div>
          <div className="pillar-card">
            <span className="pillar-num">02</span>
            <h4>Transparent Living</h4>
            <p>Every rate in ₹ is direct from host to guest with verified amenities, zero hidden costs, and standard 12% GST.</p>
          </div>
          <div className="pillar-card">
            <span className="pillar-num">03</span>
            <h4>Host Sanctuary Care</h4>
            <p>Each home is managed by passionate local hosts and architectural custodians dedicated to high hospitality.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
