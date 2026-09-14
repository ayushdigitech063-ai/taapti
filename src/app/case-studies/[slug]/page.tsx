"use client";

import { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import EnquireModal from "@/components/EnquireModal";

const caseStudies = {
  "scalable-digital-platform": {
    number: "01",
    category: "FinTech",
    title: "Building a Scalable Digital Platform",
    summary:
      "A modern technology solution designed to simplify operations and create a better digital experience.",
    context:
      "The business needed a reliable digital platform that could support complex workflows while providing a simple and efficient experience for its users. The existing processes created operational challenges and made future scaling more difficult.",
    challenge:
      "The key challenge was creating a technology foundation that could handle evolving business requirements without making the product unnecessarily complex. Reliability, maintainability and scalability were important considerations throughout the project.",
    solution:
      "Taapti designed and developed a structured digital platform around the business requirements. The solution focused on clear workflows, modular architecture, reliable APIs and a user experience that could evolve as the business grew.",
    contribution: [
      "Requirement analysis and technical planning",
      "Application architecture and development",
      "Frontend and backend engineering",
      "API development and integrations",
      "Performance and reliability improvements",
      "Ongoing technical improvements",
    ],
    technology: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "Cloud Infrastructure",
    ],
    implementation:
      "The implementation was approached incrementally, allowing the core platform capabilities to be developed and validated before expanding the system. This helped keep the product maintainable while leaving room for future improvements and integrations.",
    outcome:
      "The resulting platform provided a more reliable digital experience, simplified important workflows and created a stronger technical foundation for future growth.",
    serviceSlug: "software-engineering",
    serviceName: "Software Engineering",
  },
  "healthcare-workflow-platform": {
    number: "02",
    category: "Healthcare",
    title: "Transforming Complex Workflows with Technology",
    summary:
      "A reliable digital product built to improve efficiency, accessibility and user experience.",
    context:
      "The organisation was working with complex operational workflows that required better coordination and a more accessible digital experience. The goal was to bring important workflows into a dependable technology platform.",
    challenge:
      "The challenge was to simplify complex processes without losing the information and functionality required by different users. The platform also needed to provide a consistent experience across devices.",
    solution:
      "Taapti developed a modern digital product focused on simplifying workflows and improving accessibility. The solution combined a clear frontend experience with backend systems and APIs supporting the application's core functionality.",
    contribution: [
      "Workflow analysis and technical planning",
      "Frontend application development",
      "Backend and API development",
      "System and third-party integrations",
      "Responsive user experience",
      "Testing and technical improvements",
    ],
    technology: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "Cloud Services",
    ],
    implementation:
      "The product was developed around the most important operational workflows first. The implementation focused on creating a dependable foundation that could support additional functionality and improvements over time.",
    outcome:
      "The digital platform helped simplify complex workflows, improve accessibility and provide users with a more consistent technology experience.",
    serviceSlug: "web-development",
    serviceName: "Web Development",
  },
  "scaling-saas-product": {
    number: "03",
    category: "SaaS",
    title: "Scaling a Product for Growing Businesses",
    summary:
      "Engineering and product development focused on performance, scalability and long-term growth.",
    context:
      "The product was growing and required a stronger technical foundation to support increasing users, features and business requirements. Performance and scalability became important priorities for the next stage of product development.",
    challenge:
      "The technical challenge was to improve the product foundation while continuing to support ongoing development. Architecture, performance and maintainability all needed to be considered without disrupting the product roadmap.",
    solution:
      "Taapti worked on the product architecture and development with a focus on improving scalability and creating a more maintainable technical foundation. New capabilities were developed alongside improvements to the existing system.",
    contribution: [
      "Existing architecture assessment",
      "Technical planning and prioritisation",
      "Frontend and backend development",
      "API development and integrations",
      "Performance optimisation",
      "Product improvements and ongoing engineering",
    ],
    technology: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "API Integrations",
      "Cloud Infrastructure",
    ],
    implementation:
      "The implementation followed an incremental improvement approach. Existing functionality was reviewed, technical bottlenecks were addressed and new product capabilities were developed without requiring an unnecessary full-system rewrite.",
    outcome:
      "The product gained a stronger technical foundation with improved scalability, better performance and the flexibility required for continued product development.",
    serviceSlug: "product-development",
    serviceName: "Product Development",
  },
};

type CaseStudySlug = keyof typeof caseStudies;

export default function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const unwrappedParams = use(params);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const study = caseStudies[unwrappedParams.slug as CaseStudySlug];

  if (!study) {
    notFound();
  }

  return (
    <main className="cs-detail-page">
      {/* =========================
          PREMIUM HERO BANNER
      ========================= */}
      <section className="service-detail-hero cs-hero">
        <div className="srv-hero-bg-orbs">
          <div className="srv-orb srv-orb-left-huge" />
          <div className="srv-orb srv-orb-right-giant" />
          <div className="srv-orb-sphere srv-sphere-left-floating" />
          <div className="srv-orb-sphere srv-sphere-right-floating" />
          <div className="srv-hero-grid-pattern" />
        </div>

        <div className="container service-detail-hero__container" style={{ textAlign: "center", alignItems: "center" }}>
          {/* Back Navigation */}
          <Link href="/case-studies" className="cs-back-link">
            ← Back to Case Studies
          </Link>

          {/* Eyebrow / Tag */}
          <div className="service-detail-hero__eyebrow" style={{ justifyContent: "center", margin: "14px 0 16px 0" }}>
            <span className="srv-eyebrow-line" />
            <span className="srv-eyebrow-text">{study.number} • {study.category} CASE STUDY</span>
          </div>

          {/* Main Headline (Single Line Compact) */}
          <h1 className="cs-hero-title">
            {study.title}
          </h1>

          {/* Summary Subtitle */}
          <p className="service-detail-hero__desc" style={{ maxWidth: "660px", margin: "0 auto 24px auto" }}>
            {study.summary}
          </p>

          {/* Primary Action Button */}
          <button
            type="button"
            className="srv-hero-enquire-btn"
            onClick={() => setIsModalOpen(true)}
          >
            <span>Book a Consultation</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </section>

      {/* =========================
          META INFO CARDS BAR
      ========================= */}
      <section className="cs-meta-bar">
        <div className="container">
          <div className="cs-meta-grid">
            <div className="cs-meta-card">
              <span className="cs-meta-label">INDUSTRY</span>
              <strong className="cs-meta-val">{study.category}</strong>
            </div>

            <div className="cs-meta-card">
              <span className="cs-meta-label">SERVICE</span>
              <strong className="cs-meta-val">{study.serviceName}</strong>
            </div>

            <div className="cs-meta-card">
              <span className="cs-meta-label">PROJECT FOCUS</span>
              <strong className="cs-meta-val">Digital Product</strong>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          CONTENT SECTION: CONTEXT & CHALLENGE (GRID CARDS)
      ========================= */}
      <section className="section cs-section">
        <div className="container">
          <div className="cs-two-col-grid">
            {/* Context Card */}
            <div className="cs-feature-card">
              <span className="service-section__eyebrow">Project Context</span>
              <h2 className="cs-card-title">Understanding the <span>Business.</span></h2>
              <p className="cs-card-desc">{study.context}</p>
            </div>

            {/* Challenge Card */}
            <div className="cs-feature-card">
              <span className="service-section__eyebrow">The Challenge</span>
              <h2 className="cs-card-title">Solving the <span>Right Problem.</span></h2>
              <p className="cs-card-desc">{study.challenge}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          SOLUTION & DELIVERABLES (NUMBERED CARDS)
      ========================= */}
      <section className="section cs-section cs-bg-light">
        <div className="container">
          <div className="service-section__heading service-section__heading--centered" style={{ marginBottom: "36px" }}>
            <span className="service-section__eyebrow">The Solution</span>
            <h2>From Challenge to <span>Working Solution.</span></h2>
            <p className="cs-section-subtitle">{study.solution}</p>
          </div>

          <div className="cs-deliverables-grid">
            {study.contribution.map((item, idx) => (
              <div className="cs-deliv-card" key={item}>
                <span className="cs-deliv-num">{String(idx + 1).padStart(2, "0")}</span>
                <strong className="cs-deliv-text">{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          TECHNOLOGY STACK
      ========================= */}
      <section className="section cs-section">
        <div className="container">
          <div className="service-section__heading service-section__heading--centered" style={{ marginBottom: "36px" }}>
            <span className="service-section__eyebrow">Technology Stack</span>
            <h2>Built with <span>Modern Tech.</span></h2>
            <p className="cs-section-subtitle">Selected for reliability, maintainability and future scalability.</p>
          </div>

          <div className="cs-tech-tags-grid">
            {study.technology.map((tech) => (
              <div className="cs-tech-pill" key={tech}>
                <span className="cs-tech-icon">⚡</span>
                <span>{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          OUTCOME HIGHLIGHT BOX
      ========================= */}
      <section className="section cs-section">
        <div className="container">
          <div className="cs-outcome-card">
            <span className="service-section__eyebrow" style={{ color: "#BFDBFE" }}>Project Outcome</span>
            <h2>Creating Meaningful <span>Business Value.</span></h2>
            <p>{study.outcome}</p>
          </div>
        </div>
      </section>

      {/* =========================
          FINAL CTA
      ========================= */}
      <section className="section service-detail-cta">
        <div className="container">
          <div className="service-detail-cta__box">
            <span>Have a similar challenge?</span>
            <h2>Let&apos;s build something <span>that creates impact.</span></h2>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Start a Conversation
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Enquire Modal */}
      <EnquireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceTitle={study.title}
      />
    </main>
  );
}