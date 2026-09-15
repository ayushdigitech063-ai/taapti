"use client";

import { useState, useEffect, Fragment } from "react";

const defaultPartners = [
  { name: "USP", category: "Logistics & Supply Chain", description: "Enterprise software solution and tracking engine optimization.", logoText: "USP", accentColor: "#3b82f6", image: "/partners/usp.jpg" },
  { name: "Bar.Stream", category: "Media & Streaming Tech", description: "High-concurrency streaming infrastructure & React Native mobile client.", logoText: "BAR.STREAM", accentColor: "#2563eb", image: "/partners/barstream.jpg" },
  { name: "Invoxbooks", category: "FinTech & Accounting", description: "Automated invoice processing & accounting dashboard platform.", logoText: "INVOXBOOKS", accentColor: "#1d4ed8", image: "/partners/invoxbooks.jpg" },
  { name: "TechInnovate", category: "Cloud SaaS", description: "Multi-tenant cloud architecture & AI RAG implementation.", logoText: "TECHINNOVATE", accentColor: "#0284c7", image: "/partners/techinnovate.jpg" },
  { name: "HealthPulse", category: "Digital Healthcare", description: "HIPAA-compliant patient portal & automated workflow system.", logoText: "HEALTHPULSE", accentColor: "#059669", image: "/partners/healthpulse.jpg" },
  { name: "GlobalPay", category: "Cross-Border FinTech", description: "Real-time payment gateway integration & fraud detection engine.", logoText: "GLOBALPAY", accentColor: "#7c3aed", image: "/partners/globalpay.jpg" },
];

const defaultStats = [
  { icon: "🚀", value: "50+", label: "Production Apps Shipped" },
  { icon: "⚡", value: "100%", label: "On-Time Delivery" },
  { icon: "🌐", value: "10+", label: "Countries Served" },
  { icon: "⭐", value: "4.9/5", label: "Client Rating" },
];

export default function Partners() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const [sectionData, setSectionData] = useState({
    eyebrow: "TRUSTED PARTNERSHIPS",
    headingNormal: "Trusted by companies",
    headingHighlight: "we've built for",
    description: "We collaborate with industry leaders and fast-growing startups to engineer high-impact digital products.",
    stats: defaultStats,
    partners: defaultPartners,
  });

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/partners-section?_t=${Date.now()}`, {
        cache: "no-store",
      }).catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setSectionData({
            eyebrow: d.eyebrow || "TRUSTED PARTNERSHIPS",
            headingNormal: d.headingNormal || "Trusted by companies",
            headingHighlight: d.headingHighlight || "we've built for",
            description: d.description || "",
            stats: d.stats && d.stats.length > 0 ? d.stats : defaultStats,
            partners: d.partners && d.partners.length > 0 ? d.partners : defaultPartners,
          });
        }
      }
    } catch {
      // Silent fallback
    }
  };

  useEffect(() => {
    fetchData();

    let bc: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      bc = new BroadcastChannel("taapti_cms_updates");
      bc.onmessage = (event) => {
        if (event.data === "PARTNERS_SECTION_UPDATED" || event.data === "CMS_UPDATED") {
          fetchData();
        }
      };
    }
    return () => { if (bc) bc.close(); };
  }, []);

  // Auto-slider timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sectionData.partners.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, sectionData.partners.length]);

  const slideGroups = Math.ceil(sectionData.partners.length / 3);

  return (
    <section className="section partners-section">
      <div className="container partners-section__container">

        {/* CENTERED HEADER */}
        <div className="partners-section__header text-center reveal-down">
          <span className="partners-section__eyebrow" style={{ color: "#00875A" }}>{sectionData.eyebrow}</span>
          <h2>
            {sectionData.headingNormal} <span style={{ color: "#10243E" }}>{sectionData.headingHighlight}</span>
          </h2>
          <p className="partners-section__desc">{sectionData.description}</p>
        </div>

        {/* STATS BAR */}
        <div className="partners-section__stats-bar reveal-up">
          {sectionData.stats.map((stat, idx) => (
            <Fragment key={(stat as any)._id || idx}>
              <div className="partners-stat-item">
                <div className="partners-stat-icon">{stat.icon}</div>
                <div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              </div>
              {idx < sectionData.stats.length - 1 && <div className="partners-stat-divider"></div>}
            </Fragment>
          ))}
        </div>

        {/* AUTO SLIDER CAROUSEL */}
        <div
          className="partners-slider-wrapper reveal-zoom"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="partners-slider-container">
            <div
              className="partners-slider-track"
              style={{
                transform: `translateX(-${(activeSlide % slideGroups) * 100}%)`,
              }}
            >
              {sectionData.partners.map((partner, index) => (
                <article className="partner-card" key={`${partner.name}-${index}`}>
                  {/* CARD IMAGE */}
                  <div className="partner-card__logo-main">
                    <div className="partner-card__img-box">
                      {partner.image?.startsWith("http") ? (
                        <img
                          src={partner.image}
                          alt={`${partner.name} logo`}
                          className="partner-card__img"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <img
                          src={partner.image}
                          alt={`${partner.name} logo`}
                          className="partner-card__img"
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      )}
                      <div className="partner-card__img-overlay"></div>
                    </div>
                    <div className="partner-card__top-badge">
                      <span className="partner-card__brand-pill" style={{ color: partner.accentColor }}>
                        {partner.name}
                      </span>
                    </div>
                  </div>

                  {/* HOVER DRAWER */}
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

          {/* PAGINATION DOTS */}
          <div className="partners-slider-dots">
            {Array.from({ length: slideGroups }).map((_, idx) => (
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
