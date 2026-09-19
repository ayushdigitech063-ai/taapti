"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { API_BASE_URL } from "@/utils/api";

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCaseStudies() {
      try {
        const res = await fetch(`${API_BASE_URL}/api/projects?status=Published`);
        if (res.ok) {
          const json = await res.json();
          const items = Array.isArray(json) ? json : (json.data || []);
          setCaseStudies(items);
          // extract unique categories
          const cats = ["All", ...Array.from(new Set(items.map((item: any) => item.category))).filter(Boolean)];
          setCategories(cats as string[]);
        }
      } catch (err) {
        console.error("Failed to load dynamic case studies:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCaseStudies();

    let channel: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel("taapti_cms_updates");
      channel.onmessage = (event) => {
        if (event.data === "CASE_STUDIES_UPDATED" || event.data === "PROJECTS_UPDATED") {
          fetchCaseStudies();
        }
      };
    }
    return () => {
      if (channel) channel.close();
    };
  }, []);

  const filteredStudies = Array.isArray(caseStudies)
    ? (activeCategory === "All"
        ? caseStudies
        : caseStudies.filter((s) => s.category?.toLowerCase() === activeCategory.toLowerCase()))
    : [];

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
      {/* Dynamic Light Hero Banner */}
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
              Proven Engineering Deliveries
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
              Work that creates{" "}
              <span style={{ color: "#00875A", display: "inline-block" }}>
                real impact.
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
              Explore how we solve complex technology challenges, build scalable digital products, and help ambitious businesses move forward.
            </p>
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
              Real problems. <span style={{ color: "#10243E" }}>Real solutions.</span>
            </h2>

            <p className="cs-heading-subtitle">
              Take a look at some of the technology challenges we have helped businesses solve through engineering, product development and modern digital solutions.
            </p>

            {/* Interactive Filter Tabs */}
            <div className="case-studies-filter cs-filter-centered reveal-up">
              {categories.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  className={`case-filter ${activeCategory === cat ? "case-filter--active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                  style={{ cursor: "pointer" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filtered Cards Grid */}
          <div className="case-studies-page-grid cs-grid-6cards">
            {filteredStudies.map((study, index) => (
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

              <h2 className="case-studies-cta__title" style={{ color: "#F8FAFC" }}>
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
