"use client";

import { useState } from "react";
import Link from "next/link";
import EnquireModal from "@/components/EnquireModal";

export default function DefaultIndustryTemplate({ industry }: { industry: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="industry-detail-page" style={{ background: "#FAFCFF", color: "#0F172A", minHeight: "100vh" }}>
      {/* ── HERO BANNER SECTION ── */}
      <section style={{ position: "relative", paddingTop: "140px", paddingBottom: "80px", overflow: "hidden", background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(circle at 50% 20%, rgba(0, 135, 90, 0.05), transparent 70%)", pointerEvents: "none" }} />
        
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0, 135, 90, 0.1)", border: "1px solid rgba(0, 135, 90, 0.25)", borderRadius: "99px", padding: "6px 16px", fontSize: "12px", fontWeight: "700", color: "#00875A", marginBottom: "20px" }}>
                <span>🏢</span> {industry.name.toUpperCase()} SOLUTIONS
              </div>
              
              <h1 style={{ fontSize: "44px", fontWeight: "800", lineHeight: "1.15", color: "#0F172A", marginBottom: "20px" }}>
                {industry.heroHeading || industry.name}
              </h1>
              
              <p style={{ fontSize: "17px", lineHeight: "1.6", color: "#475569", marginBottom: "32px" }}>
                {industry.heroDescription || industry.shortDescription}
              </p>

              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                <button
                  onClick={() => setIsModalOpen(true)}
                  style={{ background: "#00875A", color: "#FFF", border: "none", padding: "14px 28px", borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: "pointer", boxShadow: "0 10px 25px -5px rgba(0, 135, 90, 0.3)" }}
                >
                  {industry.ctaText || "Consult Industry Experts"} →
                </button>
                <Link
                  href="/contact"
                  style={{ background: "#FFF", color: "#0F172A", border: "1px solid #CBD5E1", padding: "14px 24px", borderRadius: "10px", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}
                >
                  Schedule Technical Audit
                </Link>
              </div>
            </div>

            <div>
              <div style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 20px 50px rgba(0,0,0,0.06)", background: "#FFFFFF" }}>
                {industry.heroMediaUrl ? (
                  <img src={industry.heroMediaUrl} alt={industry.name} style={{ width: "100%", height: "380px", objectFit: "cover" }} />
                ) : (
                  <div style={{ height: "380px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)", color: "#64748B", fontSize: "18px" }}>
                    🏢 {industry.name} Architecture
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW & CHALLENGES ── */}
      <section style={{ padding: "80px 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ maxWidth: "800px", margin: "0 auto 60px text-align", textAlign: "center" }}>
            <span style={{ color: "#00875A", fontWeight: "700", fontSize: "12px", letterSpacing: "0.1em" }}>INDUSTRY LANDSCAPE</span>
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", marginTop: "8px", marginBottom: "16px" }}>Domain Overview & Architecture</h2>
            <p style={{ fontSize: "16px", color: "#475569", lineHeight: "1.7" }}>{industry.fullDescription}</p>
          </div>

          {industry.challenges && industry.challenges.length > 0 && (
            <div style={{ marginTop: "40px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", marginBottom: "24px" }}>Critical Industry Challenges We Solve</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
                {industry.challenges.map((ch: any, i: number) => (
                  <div key={i} style={{ background: "#FFFFFF", padding: "24px", borderRadius: "14px", border: "1px solid #FECACA", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                      <span style={{ fontSize: "24px" }}>⚠️</span>
                      <span style={{ background: "#FEE2E2", color: "#991B1B", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "700" }}>{ch.impact || "High Severity"}</span>
                    </div>
                    <h4 style={{ fontSize: "17px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>{ch.title}</h4>
                    <p style={{ fontSize: "14px", color: "#64748B", lineHeight: "1.6", margin: 0 }}>{ch.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── SOLUTIONS & FEATURES ── */}
      {industry.features && industry.features.length > 0 && (
        <section style={{ padding: "80px 0", background: "#FFFFFF" }}>
          <div className="container">
            <div style={{ marginBottom: "50px" }}>
              <span style={{ color: "#00875A", fontWeight: "700", fontSize: "12px", letterSpacing: "0.1em" }}>ENGINEERED SOLUTIONS</span>
              <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", marginTop: "8px" }}>Key Capabilities & Solutions</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "30px" }}>
              {industry.features.map((feat: any, idx: number) => (
                <div key={idx} style={{ background: "#F8FAFC", padding: "30px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", transition: "transform 0.2s ease" }}>
                  <div style={{ fontSize: "36px", marginBottom: "16px" }}>{feat.icon || "⚡"}</div>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0F172A", marginBottom: "10px" }}>{feat.title}</h3>
                  <p style={{ fontSize: "14px", color: "#64748B", lineHeight: "1.6", margin: 0 }}>{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── PROCESS & TECH STACK ── */}
      {industry.technologies && industry.technologies.length > 0 && (
        <section style={{ padding: "60px 0", background: "#F8FAFC", borderTop: "1px solid #E2E8F0" }}>
          <div className="container">
            <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0F172A", marginBottom: "24px" }}>Tech Stack & Frameworks</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "16px" }}>
              {industry.technologies.map((t: any, i: number) => (
                <div key={i} style={{ background: "#FFFFFF", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 2px 6px rgba(0,0,0,0.03)", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "22px" }}>{t.icon || "💻"}</span>
                  <div>
                    <strong style={{ display: "block", color: "#0F172A", fontSize: "14px" }}>{t.name}</strong>
                    <span style={{ fontSize: "11px", color: "#64748B" }}>{t.category || "Core Tech"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA BANNER ── */}
      <section style={{ padding: "80px 0", textAlign: "center", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "700px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0F172A", marginBottom: "16px" }}>Ready to scale your {industry.name} platform?</h2>
          <p style={{ fontSize: "16px", color: "#64748B", marginBottom: "32px" }}>Talk directly with our senior software architects to map out your technical roadmap.</p>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ background: "#00875A", color: "#FFF", border: "none", padding: "16px 36px", borderRadius: "12px", fontWeight: "700", fontSize: "16px", cursor: "pointer", boxShadow: "0 10px 30px rgba(0, 135, 90, 0.3)" }}
          >
            {industry.ctaText || "Get Started"} →
          </button>
        </div>
      </section>

      <EnquireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} serviceTitle={industry.name} />
    </div>
  );
}
