import React from 'react';
import { CASE_STUDIES } from '../../../data/caseStudies';

export const SemanticA11yTree: React.FC = () => {
  return (
    <div className="sr-only" aria-label="Accessible Portfolio of Ayan Pal">
      <h1>Ayan Pal — Java Full Stack Developer & AI Systems Architect</h1>
      <p>
        Full stack software engineer specializing in distributed systems, high-concurrency Java microservices,
        multi-cloud healthcare data pipelines, autonomous multi-provider AI product engineering, and Claude Certified
        Architect foundations.
      </p>

      <h2>Core Verified Projects & Case Studies</h2>
      {CASE_STUDIES.map((cs) => (
        <article key={cs.id}>
          <h3>{cs.title}</h3>
          <p>{cs.subtitle}</p>
          <p>Role / Timeline: {cs.timeline} at {cs.company}</p>
          <p>{cs.summary}</p>
          <h4>Key Architecture Highlights</h4>
          <ul>
            {cs.architectureHighlights.map((highlight, i) => (
              <li key={i}>{highlight}</li>
            ))}
          </ul>
          <h4>Technologies</h4>
          <p>{cs.technologies.join(', ')}</p>
        </article>
      ))}

      <h2>Autonomous AI Engineering Lab</h2>
      <section>
        <h3>100MB Document OCR & Agentic Parsing Pipeline</h3>
        <p>
          Coordinator-driven subagent spawning for high-throughput extraction from mixed-type enterprise documents.
        </p>
        <h3>ServiceNow AI Knowledge Base & Incident Vector Search</h3>
        <p>
          Automated ticket embedding and real-time semantic + flash search engine for pre-submission ticket deflection.
        </p>
        <h3>Multi-Provider LLM Orchestration & Failover Gateway</h3>
        <p>
          Dynamic quota-aware API key rotation and zero-downtime model fallbacks between Anthropic Claude and OpenAI.
        </p>
      </section>

      <h2>Credentials & Certifications</h2>
      <section>
        <h3>Claude Certified Architect: Foundations</h3>
        <p>
          Issued by Anthropic. Validates core competencies in advanced context management, prompt caching, deterministic
          tool use, autonomous subagents, and enterprise multi-provider topologies.
        </p>
      </section>

      <h2>Contact & Communication</h2>
      <ul>
        <li>Email: <a href="mailto:palayan789@gmail.com">palayan789@gmail.com</a></li>
        <li>GitHub: <a href="https://github.com/latecoder10">github.com/latecoder10</a></li>
        <li>LinkedIn: <a href="https://www.linkedin.com/in/ayan-pal-00067b1b6">linkedin.com/in/ayan-pal-00067b1b6</a></li>
      </ul>
    </div>
  );
};
