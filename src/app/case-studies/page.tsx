"use client";

import { useEffect } from "react";
import Link from "next/link";

const caseStudies = [
  {
    number: "01",
    category: "FinTech",
    title: "Building a scalable digital platform",
    description:
      "A modern technology solution designed to simplify operations and create a better digital experience.",
    services: "Software Engineering",
    slug: "scalable-digital-platform",
    image: "/case-studies/fintech.jpg",
  },
  {
    number: "02",
    category: "Healthcare",
    title: "Transforming complex workflows with technology",
    description:
      "A reliable digital product built to improve efficiency, accessibility and user experience.",
    services: "Web Development",
    slug: "healthcare-workflow-platform",
    image: "/case-studies/healthcare.jpg",
  },
  {
    number: "03",
    category: "SaaS",
    title: "Scaling a product for growing businesses",
    description:
      "Engineering and product development focused on performance, scalability and long-term growth.",
    services: "Product Development",
    slug: "scaling-saas-product",
    image: "/case-studies/saas.jpg",
  },
  {
    number: "04",
    category: "E-commerce",
    title: "High-performance digital commerce engine",
    description:
      "Scalable online shopping experience with seamless checkout and automated inventory management.",
    services: "Web & Mobile Systems",
    slug: "digital-commerce-engine",
    image: "/case-studies/fintech.jpg",
  },
  {
    number: "05",
    category: "AI & Data",
    title: "Enterprise RAG & intelligent workflow automation",
    description:
      "Custom LLM and vector database pipeline transforming document discovery for enterprise teams.",
    services: "AI Systems & RAG",
    slug: "enterprise-rag-automation",
    image: "/case-studies/saas.jpg",
  },
  {
    number: "06",
    category: "FinTech",
    title: "Real-time payment gateway & microservices API",
    description:
      "Ultra-low latency transactional backend supporting thousands of concurrent financial requests.",
    services: "API & Backend Systems",
    slug: "payment-gateway-microservices",
    image: "/case-studies/healthcare.jpg",
  },
];

export default function CaseStudiesPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(
      ".reveal-left, .reveal-right, .reveal-up, .reveal-down"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* Hero (EXACT SCREENSHOT & BG IMAGE DESIGN) */}
      <section className="cs-hero-section">
        {/* Full Background Graphic Image */}
        <div className="cs-hero-bg-layer" aria-hidden="true">
          <img
            src="/case_studies_hero_bg.png"
            alt="Case Studies Hero Background"
            className="cs-hero-bg-img"
          />
        </div>

        <div className="container cs-hero-container">
          {/* Left Text Content */}
          <div className="cs-hero-content reveal-left">
            <span className="cs-hero-eyebrow">CASE STUDIES</span>

            <h1 className="cs-hero-title">
              Work that <span className="cs-hero-title-blue">creates <br />impact.</span>
            </h1>

            <p className="cs-hero-desc">
              Explore how we solve complex technology challenges, build digital products and help businesses move forward.
            </p>
          </div>

          {/* Top Right Handwriting Annotation */}
          <div className="cs-hero-handwriting" aria-hidden="true">
            <span>Real <br />Problems <br />Real Results</span>
            <svg className="cs-hero-arrow-svg" viewBox="0 0 30 35" fill="none">
              <path d="M 15 5 Q 5 20, 20 28" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" fill="none"/>
              <path d="M 14 25 L 20 28 L 22 22" stroke="#60a5fa" strokeWidth="1.5" fill="none"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Listing (CENTERED HEADER, 6 CARDS IN 2 ROWS & VIEW MORE BUTTON) */}
      <section className="section case-studies-listing">
        <div className="container">
          {/* Centered Header with Single Line Title */}
          <div className="cs-centered-header text-center reveal-down">
            <span className="cs-eyebrow">SELECTED WORK</span>

            <h2 className="cs-heading-title-single">
              Real problems. <span className="cs-title-blue">Real solutions.</span>
            </h2>

            <p className="cs-heading-subtitle">
              Take a look at some of the technology challenges we have helped businesses solve through engineering, product development and modern digital solutions.
            </p>

            {/* Filter Tabs Underneath Subheading */}
            <div className="case-studies-filter cs-filter-centered reveal-up">
              <button className="case-filter case-filter--active">All</button>
              <button className="case-filter">FinTech</button>
              <button className="case-filter">Healthcare</button>
              <button className="case-filter">SaaS</button>
              <button className="case-filter">AI & Data</button>
            </div>
          </div>

          {/* 6 Cards Grid in 2 Rows (3 Cards per Row) */}
          <div className="case-studies-page-grid cs-grid-6cards">
            {caseStudies.map((study, index) => (
              <article
                className={`case-study-page-card cs-card-compact reveal-up`}
                key={study.slug}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="case-study-page-card__visual"
                >
                  <img
                    src={study.image}
                    alt={study.title}
                    className="case-study-page-card__bg-img"
                  />
                  <div className="case-study-page-card__visual-overlay" />

                  <div className="case-study-page-card__number">
                    {study.number}
                  </div>

                  <span className="case-study-page-card__visual-label">
                    {study.category}
                  </span>

                  <span className="case-study-page-card__visual-arrow">
                    ↗
                  </span>
                </Link>

                <div className="case-study-page-card__content">
                  <div className="case-study-page-card__meta">
                    <span>{study.category}</span>

                    <span>{study.services}</span>
                  </div>

                  <h2>{study.title}</h2>

                  <p>{study.description}</p>

                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="case-study-page-card__link"
                  >
                    View Case Study
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* View More Button Centered Bottom */}
          <div className="cs-view-more-wrapper text-center reveal-up">
            <button type="button" className="cs-view-more-btn">
              <span>View More Case Studies</span>
              <span>↓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Bottom CTA (EXACT DARK CARD SCREENSHOT DESIGN) */}
      <section className="section case-studies-cta">
        <div className="container">
          <div className="case-studies-cta__box reveal-up">
            <div className="case-studies-cta__left">
              <span className="case-studies-cta__eyebrow">HAVE A SIMILAR CHALLENGE?</span>

              <h2 className="case-studies-cta__title">
                Let's build something <br />
                <span className="case-studies-cta__blue">meaningful together.</span>
              </h2>
            </div>

            <div className="case-studies-cta__right">
              <Link href="/contact" className="case-studies-cta__btn">
                Start a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}