"use client";

import { useState } from "react";
import Link from "next/link";
import EnquireModal from "@/components/EnquireModal";

export interface ServiceData {
  _id?: string;
  name: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  heroHeading?: string;
  heroDescription?: string;
  heroMediaUrl?: string;
  ctaText?: string;
  features?: { title: string; description: string; icon?: string }[];
  processSteps?: { stepNumber: number; title: string; description: string }[];
  technologies?: { name: string; category?: string; icon?: string }[];
  seoTitle?: string;
  seoDescription?: string;
  status?: string;
  template?: string;
}

export default function DefaultServiceTemplate({ service }: { service: ServiceData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="service-detail-page-wrapper" style={{ background: "#FAFCFF", color: "#0F172A", minHeight: "100vh", paddingTop: "100px" }}>
      {/* HERO SECTION */}
      <section className="service-hero-section" style={{ padding: "60px 0 80px", borderBottom: "1px solid #E2E8F0", background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px", alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0,135,90,0.1)", border: "1px solid rgba(0,135,90,0.3)", color: "#00875A", padding: "6px 14px", borderRadius: "30px", fontSize: "12px", fontWeight: "700", marginBottom: "20px", textTransform: "uppercase" }}>
                <span>✨ Service Detail</span>
              </div>
              <h1 style={{ fontSize: "44px", fontWeight: "800", lineHeight: "1.15", color: "#0F172A", marginBottom: "20px", letterSpacing: "-0.02em" }}>
                {service.heroHeading || service.name}
              </h1>
              <p style={{ fontSize: "18px", color: "#475569", lineHeight: "1.6", marginBottom: "32px" }}>
                {service.heroDescription || service.shortDescription}
              </p>
              <div style={{ display: "flex", gap: "16px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  style={{ background: "#00875A", color: "#FFFFFF", border: "none", padding: "14px 32px", borderRadius: "8px", fontWeight: "700", fontSize: "15px", cursor: "pointer", boxShadow: "0 8px 20px rgba(0,135,90,0.25)" }}
                >
                  {service.ctaText || "Start a Conversation"} →
                </button>
                <Link
                  href="/contact"
                  style={{ background: "#FFFFFF", color: "#0F172A", padding: "14px 28px", borderRadius: "8px", fontWeight: "600", fontSize: "15px", textDecoration: "none", border: "1px solid #CBD5E1", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}
                >
                  Contact Engineering Team
                </Link>
              </div>
            </div>

            {/* HERO MEDIA */}
            <div style={{ borderRadius: "16px", overflow: "hidden", border: "1px solid #E2E8F0", boxShadow: "0 20px 40px rgba(0,0,0,0.06)", background: "#FFFFFF" }}>
              {service.heroMediaUrl ? (
                <img src={service.heroMediaUrl} alt={service.name} style={{ width: "100%", height: "380px", objectFit: "cover" }} />
              ) : (
                <div style={{ height: "380px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #F1F5F9, #E2E8F0)", padding: "40px", textAlign: "center" }}>
                  <span style={{ fontSize: "64px", marginBottom: "16px" }}>🛠️</span>
                  <h3 style={{ fontSize: "22px", color: "#0F172A" }}>{service.name}</h3>
                  <p style={{ fontSize: "14px", color: "#64748B", maxWidth: "320px", marginTop: "8px" }}>{service.shortDescription}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section style={{ padding: "80px 0", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "#FFFFFF", padding: "40px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "700", color: "#0F172A", marginBottom: "16px" }}>Service Overview</h2>
            <p style={{ fontSize: "16px", color: "#334155", lineHeight: "1.8", whiteSpace: "pre-line" }}>
              {service.fullDescription}
            </p>
          </div>
        </div>
      </section>

      {/* FEATURES / CAPABILITIES SECTION */}
      {service.features && service.features.length > 0 && (
        <section style={{ padding: "80px 0", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC" }}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span style={{ color: "#00875A", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Key Capabilities</span>
              <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0F172A", marginTop: "8px" }}>What We Deliver</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px" }}>
              {service.features.map((feat, idx) => (
                <div key={idx} style={{ background: "#FFFFFF", padding: "28px", borderRadius: "12px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)", transition: "transform 0.2s ease" }}>
                  <div style={{ fontSize: "32px", marginBottom: "16px" }}>{feat.icon || "⚡"}</div>
                  <h3 style={{ fontSize: "20px", fontWeight: "700", color: "#0F172A", marginBottom: "10px" }}>{feat.title}</h3>
                  <p style={{ fontSize: "14px", color: "#64748B", lineHeight: "1.6" }}>{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS STEPS */}
      {service.processSteps && service.processSteps.length > 0 && (
        <section style={{ padding: "80px 0", borderBottom: "1px solid #E2E8F0", background: "#FFFFFF" }}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: "48px" }}>
              <span style={{ color: "#00875A", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "1px" }}>Execution Framework</span>
              <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#0F172A", marginTop: "8px" }}>Our Delivery Process</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(service.processSteps.length, 3)}, 1fr)`, gap: "24px" }}>
              {service.processSteps.map((step, idx) => (
                <div key={idx} style={{ background: "#F8FAFC", padding: "28px", borderRadius: "12px", border: "1px solid #E2E8F0", position: "relative" }}>
                  <div style={{ background: "#00875A", color: "#FFF", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "16px", marginBottom: "16px" }}>
                    {step.stepNumber || idx + 1}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>{step.title}</h3>
                  <p style={{ fontSize: "14px", color: "#64748B", lineHeight: "1.6" }}>{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TECHNOLOGIES */}
      {service.technologies && service.technologies.length > 0 && (
        <section style={{ padding: "80px 0", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC" }}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: "36px" }}>
              <span style={{ color: "#00875A", fontSize: "13px", fontWeight: "700", textTransform: "uppercase" }}>Tech Stack</span>
              <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", marginTop: "6px" }}>Technologies & Tools</h2>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "center" }}>
              {service.technologies.map((t, idx) => (
                <div key={idx} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", padding: "12px 20px", borderRadius: "30px", display: "flex", alignItems: "center", gap: "10px", boxShadow: "0 2px 6px rgba(0,0,0,0.03)" }}>
                  <span style={{ fontSize: "18px" }}>{t.icon || "💻"}</span>
                  <span style={{ fontWeight: "700", fontSize: "14px", color: "#0F172A" }}>{t.name}</span>
                  {t.category && <span style={{ fontSize: "11px", background: "#F1F5F9", padding: "2px 8px", borderRadius: "10px", color: "#64748B" }}>{t.category}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA BANNER */}
      <section style={{ padding: "100px 0", background: "#FFFFFF" }}>
        <div className="container" style={{ maxWidth: "900px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <h2 style={{ fontSize: "38px", fontWeight: "800", color: "#0F172A", marginBottom: "16px" }}>Ready to Build Your {service.name} Solution?</h2>
          <p style={{ fontSize: "18px", color: "#64748B", marginBottom: "32px" }}>
            Let our senior software engineers design the right architecture for your business needs.
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            style={{ background: "#00875A", color: "#FFF", padding: "16px 36px", borderRadius: "8px", fontWeight: "800", fontSize: "16px", border: "none", cursor: "pointer", boxShadow: "0 10px 25px rgba(0,135,90,0.3)" }}
          >
            {service.ctaText || "Start a Conversation"} →
          </button>
        </div>
      </section>

      {/* Enquire Modal */}
      <EnquireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceTitle={service.name}
      />
    </div>
  );
}
