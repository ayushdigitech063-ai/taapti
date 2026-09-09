"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const partners = [
  {
    name: "USP",
    category: "Logistics & Supply Chain",
    description: "Enterprise software solution and tracking engine optimization.",
    logoText: "USP",
    accentColor: "#3b82f6",
    image: "/partners/usp.jpg",
  },
  {
    name: "Bar.Stream",
    category: "Media & Streaming Tech",
    description: "High-concurrency streaming infrastructure & React Native mobile client.",
    logoText: "BAR.STREAM",
    accentColor: "#2563eb",
    image: "/partners/barstream.jpg",
  },
  {
    name: "Invoxbooks",
    category: "FinTech & Accounting",
    description: "Automated invoice processing & accounting dashboard platform.",
    logoText: "INVOXBOOKS",
    accentColor: "#1d4ed8",
    image: "/partners/invoxbooks.jpg",
  },
  {
    name: "TechInnovate",
    category: "Cloud SaaS",
    description: "Multi-tenant cloud architecture & AI RAG implementation.",
    logoText: "TECHINNOVATE",
    accentColor: "#0284c7",
    image: "/partners/techinnovate.jpg",
  },
  {
    name: "HealthPulse",
    category: "Digital Healthcare",
    description: "HIPAA-compliant patient portal & automated workflow system.",
    logoText: "HEALTHPULSE",
    accentColor: "#059669",
    image: "/partners/healthpulse.jpg",
  },
  {
    name: "GlobalPay",
    category: "Cross-Border FinTech",
    description: "Real-time payment gateway integration & fraud detection engine.",
    logoText: "GLOBALPAY",
    accentColor: "#7c3aed",
    image: "/partners/globalpay.jpg",
  },
];

export default function Partners() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slider timer: cycle slides every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % partners.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="section partners-section">
      <div className="container partners-section__container">
        
        {/* CENTERED HEADER */}
        <div className="partners-section__header text-center reveal-down">
          <span className="partners-section__eyebrow">TRUSTED PARTNERSHIPS</span>

          <h2>
            Trusted by companies <span>we&apos;ve built for</span>
          </h2>

          <p className="partners-section__desc">
            We collaborate with industry leaders and fast-growing startups to engineer high-impact digital products.
          </p>
        </div>

        {/* ELEGANT STATS BAR ADJUSTED BELOW HEADER */}
        <div className="partners-section__stats-bar reveal-up">
          <div className="partners-stat-item">
            <div className="partners-stat-icon">🚀</div>
            <div>
              <strong>50+</strong>
              <span>Production Apps Shipped</span>
            </div>
          </div>
          <div className="partners-stat-divider"></div>

          <div className="partners-stat-item">
            <div className="partners-stat-icon">⚡</div>
            <div>
              <strong>100%</strong>
              <span>On-Time Delivery</span>
            </div>
          </div>
          <div className="partners-stat-divider"></div>

          <div className="partners-stat-item">
            <div className="partners-stat-icon">🌐</div>
            <div>
              <strong>10+</strong>
              <span>Countries Served</span>
            </div>
          </div>
          <div className="partners-stat-divider"></div>

          <div className="partners-stat-item">
            <div className="partners-stat-icon">⭐</div>
            <div>
              <strong>4.9/5</strong>
              <span>Client Rating</span>
            </div>
          </div>
        </div>

        {/* AUTO SLIDER CAROUSEL (NOT CONTINUOUS SCROLLER) */}
        <div
          className="partners-slider-wrapper reveal-zoom"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="partners-slider-container">
            <div
              className="partners-slider-track"
              style={{
                transform: `translateX(-${(activeSlide % Math.ceil(partners.length / 3)) * 100}%)`,
              }}
            >
              {partners.map((partner, index) => (
                <article
                  className="partner-card"
                  key={`${partner.name}-${index}`}
                >
                  {/* DEFAULT CARD VIEW: PROMINENT FULL IMAGE */}
                  <div className="partner-card__logo-main">
                    <div className="partner-card__img-box">
                      <Image
                        src={partner.image}
                        alt={`${partner.name} logo`}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className="partner-card__img"
                      />
                      <div className="partner-card__img-overlay"></div>
                    </div>

                    <div className="partner-card__top-badge">
                      <span className="partner-card__brand-pill" style={{ color: partner.accentColor }}>
                        {partner.name}
                      </span>
                    </div>
                  </div>

                  {/* BOTTOM DRAWER SLIDE-UP OVERLAY ON HOVER */}
                  <div className="partner-card__drawer">
                    <div className="partner-drawer-handle"></div>
                    
                    <span className="partner-card__category" style={{ color: partner.accentColor }}>
                      {partner.category}
                    </span>

                    <h3 className="partner-drawer-title">{partner.name}</h3>

                    <p className="partner-drawer-desc">{partner.description}</p>

                    <div className="partner-drawer-action" style={{ color: partner.accentColor }}>
                      <span>Explore details</span>
                      <span className="action-arrow">→</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* SLIDER PAGINATION DOTS */}
          <div className="partners-slider-dots">
            {Array.from({ length: Math.ceil(partners.length / 3) }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx * 3)}
                className={`partners-dot ${Math.floor(activeSlide / 3) === idx ? "active" : ""}`}
                aria-label={`Go to slide group ${idx + 1}`}
              ></button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
