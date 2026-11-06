import React from 'react';
import { CheckCircle2, Search, Target, TrendingUp } from 'lucide-react';
import './About.scss';

export default function About() {
  return (
    <main className="about-page">
      <section className="container section about-hero">
        <div>
          <span className="eyebrow">WHO WE ARE</span>
          <h1>
            Good strategy. <em>Better outcomes.</em>
          </h1>
          <p>
            We are a digital growth studio focused on making businesses easier to find,
            easier to trust, and easier to choose.
          </p>
        </div>
        <div className="about-art">
          <TrendingUp size={90} />
          <span>
            Digital Growth
            <br />
            Starts Here.
          </span>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2>What matters to us</h2>
          <div className="about-values-grid">
            {[
              ['Strategy Before Tactics', 'We first understand the problem.', Search],
              ['People Before Metrics', 'Real customers matter more than vanity numbers.', Target],
              ['Progress Over Promises', 'Clear reporting and consistent improvement.', CheckCircle2]
            ].map(([title, desc, Icon]) => (
              <div key={title}>
                <Icon size={30} />
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
