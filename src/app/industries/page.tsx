"use client";

import { useEffect } from "react";
import Link from "next/link";

const industries = [
  {
    number: "01",
    slug: "fintech",
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
    slug: "healthcare",
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
    slug: "saas-technology",
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
    slug: "ecommerce",
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
      <section
        style={{
          position: "relative",
          background: "linear-gradient(120deg, #f0f7ff 0%, #e0f0ff 45%, #eff6ff 80%, #f8fafc 100%)",
          padding: "140px 0 90px",
          borderBottom: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        {/* Soft Decorative Background SVG Curved Lines */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%", opacity: 0.85 }}
            preserveAspectRatio="none"
          >
            <path
              d="M750 -100 C 950 150, 1150 450, 1600 650"
              stroke="#10243E"
              strokeWidth="1.5"
              strokeOpacity="0.25"
            />
            <circle cx="1130" cy="130" r="6" fill="#00875A" />
            <path
              d="M600 -50 Q 1000 250 1500 450"
              stroke="#00875A"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.3"
            />
          </svg>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "780px" }} className="animate-from-left">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 16px",
                borderRadius: "999px",
                background: "#ffffff",
                border: "1px solid #a7f3d0",
                boxShadow: "0 4px 15px rgba(0,135,90,0.06)",
                fontSize: "13px",
                fontWeight: "700",
                color: "#00875A",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#00875A",
                  boxShadow: "0 0 8px #00875A",
                }}
              />
              INDUSTRIES
            </div>

            <h1
              style={{
                fontSize: "clamp(38px, 5vw, 64px)",
                fontWeight: "800",
                lineHeight: "1.12",
                letterSpacing: "-0.035em",
                color: "#0a0d14",
                marginBottom: "24px",
              }}
            >
              Technology built for <br />
              <span style={{ color: "#00875A", display: "inline-block" }}>
                real-world industries.
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 1.2vw, 19px)",
                lineHeight: "1.7",
                color: "#475569",
                marginBottom: "36px",
                maxWidth: "680px",
              }}
            >
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
                <Link
                  href={`/industries/${industry.slug}`}
                  key={industry.number}
                  style={{ textDecoration: "none", color: "inherit", display: "block" }}
                >
                  <article
                    className={`industry-card ${animClass}`}
                    style={{ animationDelay: `${index * 0.15}s`, cursor: "pointer" }}
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
                </Link>
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
