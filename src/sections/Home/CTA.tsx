"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import EnquireModal from "@/components/EnquireModal";

export default function CTA() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    eyebrow: "HAVE A PROJECT IN MIND?",
    titleNormal: "Let's build something",
    titleHighlight: "that matters.",
    description:
      "Tell us what you're building, what you're trying to solve, or where you want to go next. We'll help you figure out the right technology approach.",
    primaryBtnText: "Start a Conversation",
    secondaryBtnText: "Explore Services",
    bannerImage: "",
    centerCardTitle: "From ideas to impact",
    trustItems: [
      { title: "Free Consultation" },
      { title: "Quick Response" },
      { title: "Confidential & Secure" },
    ],
  });

  const fetchCta = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cta").catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json && json.success && json.data) {
          const d = json.data;
          setData({
            eyebrow: d.eyebrow || "HAVE A PROJECT IN MIND?",
            titleNormal: d.titleNormal || "Let's build something",
            titleHighlight: d.titleHighlight || "that matters.",
            description: d.description || "Tell us what you're building...",
            primaryBtnText: d.primaryBtnText || "Start a Conversation",
            secondaryBtnText: d.secondaryBtnText || "Explore Services",
            bannerImage: d.bannerImage || "",
            centerCardTitle: d.centerCardTitle || "From ideas to impact",
            trustItems: d.trustItems && d.trustItems.length > 0 ? d.trustItems : [
              { title: "Free Consultation" },
              { title: "Quick Response" },
              { title: "Confidential & Secure" },
            ],
          });
        }
      }
    } catch {
      /* silent */
    }
  };

  useEffect(() => {
    fetchCta();

    let channel: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel("taapti_cms_updates");
      channel.onmessage = (event) => {
        if (event.data === "CTA_UPDATED" || event.data === "CMS_UPDATED") {
          fetchCta();
        }
      };
    }

    const interval = setInterval(() => {
      fetchCta();
    }, 4000);

    return () => {
      if (channel) channel.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="section cta-section">
      <div className="container cta-container">
        <div className="cta-box" style={data.bannerImage ? { backgroundImage: `linear-gradient(to right, rgba(15,23,42,0.95), rgba(15,23,42,0.85)), url(${data.bannerImage})`, backgroundSize: "cover", backgroundPosition: "center" } : {}}>
          
          {/* LEFT CONTENT AREA */}
          <div className="cta-left reveal-left">
            <div className="cta-eyebrow">
              <span className="cta-eyebrow-dot" style={{ background: "#00875A" }}></span>
              <span style={{ color: "#00875A" }}>{data.eyebrow}</span>
            </div>

            <h2 className="cta-title">
              {data.titleNormal} <span className="cta-title-highlight" style={{ color: "#10243E" }}>{data.titleHighlight}</span>
            </h2>

            <p className="cta-desc">
              {data.description}
            </p>

            <div className="cta-buttons">
              <button
                type="button"
                className="cta-btn-primary"
                onClick={() => setIsModalOpen(true)}
                style={{ border: "none", cursor: "pointer", background: "#00875A", boxShadow: "0 8px 24px rgba(0,135,90,0.3)" }}
              >
                <span>{data.primaryBtnText}</span>
                <span className="cta-btn-arrow">→</span>
              </button>

              <Link href="/services" className="cta-btn-outline">
                {data.secondaryBtnText}
              </Link>
            </div>

            {/* BOTTOM TRUST FEATURES BAR */}
            <div className="cta-trust-bar">
              {data.trustItems.map((item, idx) => (
                <div key={idx} className="cta-trust-item">
                  <div className="cta-trust-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                    </svg>
                  </div>
                  <span>{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: 3D ROTATING CARDS & ORBITAL STACK */}
          <div className="cta-right reveal-right">
            <div className="cta-orbital-circle">
              {/* Decorative rays top right */}
              <div className="cta-rays">
                <span></span>
                <span></span>
              </div>

              {/* Hand drawn callout annotations */}
              <div className="cta-annotation cta-ann-top-left">
                <span>Ideas</span>
                <svg width="24" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor">
                  <path d="M2 2 Q 12 12 22 4" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <polyline points="18 1 22 4 19 8" strokeWidth="1.5"/>
                </svg>
              </div>

              <div className="cta-annotation cta-ann-left">
                <span>Products</span>
              </div>

              <div className="cta-annotation cta-ann-top-right">
                <span>Products</span>
                <svg width="24" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor">
                  <path d="M2 12 Q 12 2 22 10" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <polyline points="18 7 22 10 21 14" strokeWidth="1.5"/>
                </svg>
              </div>

              <div className="cta-annotation cta-ann-right">
                <span>Growth</span>
              </div>

              <div className="cta-annotation cta-ann-bottom-right">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M2 2 Q 10 20 22 16" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <polyline points="18 20 22 16 20 12" strokeWidth="1.5"/>
                </svg>
                <span>Let&apos;s create what&apos;s next</span>
              </div>

              {/* 3D CARDS STACK CONTAINER WITH ROTATION ANIMATION */}
              <div className="cta-3d-stack">
                {/* CARD 1 (LEFT BACK) */}
                <div className="cta-3d-card cta-3d-card--left">
                  <div className="cta-card-inner">
                    <div className="cta-card-header-icon">💡</div>
                    <h4>Ideas</h4>
                    <div className="cta-card-line"></div>
                    <div className="cta-card-line short"></div>
                  </div>
                </div>

                {/* CARD 2 (MAIN CENTER FRONT CARD) */}
                <div
                  className="cta-3d-card cta-3d-card--center"
                  onClick={() => setIsModalOpen(true)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="cta-card-inner">
                    <div className="cta-card-bulb-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18h6M10 22h4M15 9A6 6 0 0 0 9 9c0 2.38 1.19 4.47 3 5.74V17h0v0h0a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74z"></path>
                      </svg>
                    </div>
                    <h3>{data.centerCardTitle}</h3>
                    <div className="cta-card-line"></div>
                    <div className="cta-card-line short"></div>
                    
                    <div className="cta-card-action-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* CARD 3 (RIGHT BACK) */}
                <div className="cta-3d-card cta-3d-card--right">
                  <div className="cta-card-inner">
                    <h4>Growth</h4>
                    <div className="cta-card-bars">
                      <span className="bar b1"></span>
                      <span className="bar b2"></span>
                      <span className="bar b3"></span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Enquire Lead Modal */}
      <EnquireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceTitle="General Project Consultation"
      />
    </section>
  );
}