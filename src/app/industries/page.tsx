"use client";

import { useEffect } from "react";
import Link from "next/link";

const industries = [
  {
    number: "01",
    title: "FinTech",
    description:
      "Technology solutions for financial businesses that need secure, reliable and scalable digital systems.",
    problems: [
      "Complex business workflows",
      "Scalability and performance",
      "Digital customer experiences",
    ],
  },
  {
    number: "02",
    title: "Healthcare",
    description:
      "Digital products and technology solutions designed to improve accessibility, efficiency and user experiences.",
    problems: [
      "Complex operational workflows",
      "Data and system integration",
      "Better digital experiences",
    ],
  },
  {
    number: "03",
    title: "SaaS & Technology",
    description:
      "Engineering support for technology companies building and scaling modern software products.",
    problems: [
      "Product scalability",
      "Performance optimisation",
      "Continuous product development",
    ],
  },
  {
    number: "04",
    title: "E-commerce",
    description:
      "Reliable digital commerce experiences built to support growing businesses and their customers.",
    problems: [
      "High-performance platforms",
      "Third-party integrations",
      "Scalable customer experiences",
    ],
  },
];

export default function IndustriesPage() {
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
      {/* Hero (EXACT BG IMAGE DESIGN) */}
      <section className="ind-hero-section">
        {/* Full Background Graphic Image */}
        <div className="ind-hero-bg-layer" aria-hidden="true">
          <img
            src="/industries_hero_bg.png"
            alt="Industries Hero Background"
            className="ind-hero-bg-img"
          />
        </div>

        <div className="container ind-hero-container">
          {/* Left Text Content */}
          <div className="ind-hero-content reveal-left">
            <span className="ind-hero-eyebrow">INDUSTRIES</span>

            <h1 className="ind-hero-title">
              Technology built for <br />
              <span className="ind-hero-title-blue">real-world industries.</span>
            </h1>

            <p className="ind-hero-desc">
              We help businesses across different industries solve complex technology challenges and build reliable digital products that support long-term growth.
            </p>
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section industries-listing">
        <div className="container">
          <div className="section-heading industries-listing__heading reveal-down">
            <span className="industries__eyebrow">
              Sectors We Serve
            </span>

            <h2>
              Solutions shaped around
              <span> your industry.</span>
            </h2>

            <p>
              Every industry has different challenges. Our
              engineering approach focuses on understanding those
              challenges and building technology around them.
            </p>
          </div>

          <div className="industries__grid">
            {industries.map((industry, index) => {
              // Alternating directions for cards: 0: top/up, 1: right, 2: left, 3: bottom/down
              const animClasses = [
                "reveal-up",
                "reveal-right",
                "reveal-left",
                "reveal-down"
              ];
              const animClass = animClasses[index % 4];

              return (
                <article
                  className={`industry-card ${animClass}`}
                  key={industry.number}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="industry-card__top">
                    <span>{industry.number}</span>
                    <span className="industry-card__arrow">
                      ↗
                    </span>
                  </div>

                  <div>
                    <h3>{industry.title}</h3>

                    <p>{industry.description}</p>
                  </div>

                  <div className="industry-card__problems">
                    <span>Common Challenges</span>

                    <ul>
                      {industry.problems.map((problem) => (
                        <li key={problem}>{problem}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Studies CTA (EXACT SCREENSHOT DESIGN) */}
      <section className="section ind-cs-cta-section">
        <div className="container">
          <div className="ind-cs-cta-card reveal-up">
            <div className="ind-cs-cta-left reveal-left">
              <span className="ind-cs-cta-eyebrow">OUR WORK</span>

              <h2 className="ind-cs-cta-title">
                See how we solve <span className="ind-cs-cta-blue">real <br />business challenges.</span>
              </h2>

              <p className="ind-cs-cta-desc">
                Explore our case studies to see the technology, approach and outcomes behind the work we deliver.
              </p>
            </div>

            <div className="ind-cs-cta-right reveal-right">
              <Link href="/case-studies" className="ind-cs-cta-btn">
                <span>View Case Studies</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section service-detail-cta">
        <div className="container">
          <div className="service-detail-cta__box reveal-up">
            <span className="reveal-down">
              Have an industry challenge?
            </span>

            <h2 className="reveal-left">
              Let&apos;s build the right
              <span> solution for you.</span>
            </h2>

            <Link
              href="/contact"
              className="btn btn-primary reveal-right"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}