import React from 'react';

export default function CraftPhilosophy() {
  return (
    <section className="craft-manifesto-section">
      <div className="container craft-inner scroll-reveal">
        <div className="craft-stamp">RENTAL HOUSE FINDER ETHOS</div>
        <blockquote className="craft-quote">
          "A mindful room is more than four walls; it is your personal sanctuary for deep work, restful sleep, and peaceful daily focus."
        </blockquote>
        <div className="craft-pillars">
          <div className="pillar-card scroll-reveal">
            <span className="pillar-num">01</span>
            <h4>Zero Brokerage & Direct</h4>
            <p>Every monthly rent in ₹ is direct from room owner or lead flatmate. No hidden agent commissions or inflated fees.</p>
          </div>
          <div className="pillar-card scroll-reveal">
            <span className="pillar-num">02</span>
            <h4>Verified Comforts</h4>
            <p>Real bedroom photographs, confirmed fiber WiFi speeds, attached bath specifications, and clear utility sharing.</p>
          </div>
          <div className="pillar-card scroll-reveal">
            <span className="pillar-num">03</span>
            <h4>Peaceful Flatshares</h4>
            <p>Connect with quiet, like-minded flatmates and hosts who respect personal privacy, study hours, and clean shared spaces.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
