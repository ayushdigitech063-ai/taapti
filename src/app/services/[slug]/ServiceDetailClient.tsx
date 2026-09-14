"use client";

import { useState } from "react";
import Link from "next/link";
import EnquireModal from "@/components/EnquireModal";

interface ServiceData {
  number: string;
  title: string;
  shortDescription: string;
  overview: string;
  capabilities: string[];
  engagement: string;
  testimonials: Array<{ quote: string; name: string; role: string }>;
  faqs: Array<{ question: string; answer: string }>;
}

export default function ServiceDetailClient({ service }: { service: ServiceData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      {/* =========================
          Hero (Centered Heading & Book a Consultation Modal)
      ========================= */}
      <section className="service-detail-hero">
        {/* Background Orbs & Grid */}
        <div className="srv-hero-bg-orbs">
          <div className="srv-orb srv-orb-left-huge" />
          <div className="srv-orb srv-orb-right-giant" />
          <div className="srv-orb-sphere srv-sphere-left-floating" />
          <div className="srv-orb-sphere srv-sphere-right-floating" />
          <div className="srv-hero-grid-pattern" />
          <div className="srv-hero-orbit-ring" />
        </div>

        <div className="container service-detail-hero__container">
          {/* Eyebrow */}
          <div className="service-detail-hero__eyebrow">
            <span className="srv-eyebrow-line" />
            <span className="srv-eyebrow-text">OUR SERVICE</span>
          </div>

          {/* Main Title (Centered, Single Line) */}
          <h1 className="service-detail-hero__title">
            <span className="srv-title-black">{service.title.split(" ")[0]} </span>
            <span className="srv-title-blue">{service.title.split(" ").slice(1).join(" ")}</span>
          </h1>

          {/* Subtitle / Short Description */}
          <p className="service-detail-hero__desc">{service.shortDescription}</p>

          {/* Actions: Book a Consultation Popup Modal Button */}
          <div className="service-detail-hero__actions">
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
        </div>
      </section>

      {/* =========================
          Capabilities
      ========================= */}
      <section className="section service-capabilities">
        <div className="container">
          <div className="service-section__heading service-section__heading--centered">
            <span className="service-section__eyebrow">What We Deliver</span>
            <h2>
              Our capabilities <span>within {service.title}.</span>
            </h2>
          </div>

          <div className="service-capabilities__grid">
            {service.capabilities.map((capability, index) => (
              <div className="capability-card" key={capability}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{capability}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          Engagement Model (Centered Stacked)
      ========================= */}
      <section className="section engagement">
        <div className="container engagement__box" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "18px" }}>
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span className="service-section__eyebrow" style={{ justifyContent: "center" }}>Engagement Model</span>
            <h2 style={{ textAlign: "center", margin: "10px 0 0 0", whiteSpace: "nowrap", fontSize: "clamp(24px, 3vw, 38px)" }}>
              Flexible <span>Partnership Models.</span>
            </h2>
          </div>

          <div className="engagement__content" style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "680px" }}>
            <p style={{ textAlign: "center", margin: "0 0 24px 0", fontSize: "16px", color: "#64748B", lineHeight: "1.7" }}>{service.engagement}</p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Book a Consultation
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          Testimonials
      ========================= */}
      <section className="section service-testimonials">
        <div className="container">
          <div className="service-testimonials__heading">
            <span className="service-section__eyebrow">Client Feedback</span>
            <h2>
              What our clients <span>say about us.</span>
            </h2>
          </div>

          <div className="service-testimonials__grid">
            {service.testimonials.map((testimonial) => (
              <article className="service-testimonial-card" key={testimonial.quote}>
                <span className="service-testimonial-card__quote">“</span>
                <p>{testimonial.quote}</p>
                <div className="service-testimonial-card__author">
                  <div className="service-testimonial-card__avatar">{testimonial.name.charAt(0)}</div>
                  <div>
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.role}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          FAQs
      ========================= */}
      <section className="section service-faqs">
        <div className="container service-faqs__grid">
          <div className="service-faqs__intro">
            <span className="service-section__eyebrow">FAQs</span>
            <h2>
              Frequently asked <span>questions.</span>
            </h2>
            <p>
              Find answers to common questions about our services, engagement process and technical approach.
            </p>
          </div>

          <div className="service-faqs__list">
            {service.faqs.map((faq, index) => (
              <details className="service-faq" key={faq.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{faq.question}</strong>
                  <b>+</b>
                </summary>
                <div className="service-faq__answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =========================
          Final CTA
      ========================= */}
      <section className="section service-detail-cta">
        <div className="container">
          <div className="service-detail-cta__box">
            <span>Ready to get started?</span>
            <h2>
              Let&apos;s build your <span>next solution.</span>
            </h2>
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

      {/* Enquire Modal Popup */}
      <EnquireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceTitle={service.title}
      />
    </main>
  );
}
