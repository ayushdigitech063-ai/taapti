"use client";

import { useState } from "react";
import Link from "next/link";
import EnquireModal from "@/components/EnquireModal";

export default function CustomHealthcareIndustryTemplate({ industry }: { industry: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="custom-healthcare-template" style={{ background: "#051622", color: "#F8FAFC", minHeight: "100vh" }}>
      {/* 🏥 HEALTHCARE CUSTOM HERO */}
      <section style={{ position: "relative", paddingTop: "140px", paddingBottom: "90px", background: "radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.15), transparent 60%)" }}>
        <div className="container">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16, 185, 129, 0.1)", border: "1px solid rgba(16, 185, 129, 0.3)", borderRadius: "99px", padding: "6px 16px", fontSize: "12px", fontWeight: "700", color: "#34D399", marginBottom: "20px" }}>
            <span>🏥</span> HIPAA-COMPLIANT MEDTECH ARCHITECTURE
          </div>
          
          <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#FFF", lineHeight: "1.15", maxWidth: "850px", marginBottom: "24px" }}>
            {industry.heroHeading || "Custom Healthcare & Medical Systems"}
          </h1>
          
          <p style={{ fontSize: "18px", color: "#94A3B8", maxWidth: "750px", lineHeight: "1.6", marginBottom: "36px" }}>
            {industry.heroDescription || industry.shortDescription}
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{ background: "linear-gradient(135deg, #059669 0%, #047857 100%)", color: "#FFF", border: "none", padding: "14px 32px", borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: "pointer", boxShadow: "0 10px 25px -5px rgba(5, 150, 105, 0.4)" }}
            >
              {industry.ctaText || "Consult MedTech Architects"} →
            </button>
            <Link
              href="/contact"
              style={{ background: "rgba(255, 255, 255, 0.05)", color: "#FFF", border: "1px solid rgba(255, 255, 255, 0.15)", padding: "14px 24px", borderRadius: "10px", fontWeight: "700", fontSize: "15px", textDecoration: "none" }}
            >
              HIPAA Audit Request
            </Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW CONTENT */}
      <section style={{ padding: "60px 0", background: "#0B2535" }}>
        <div className="container">
          <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "40px", borderRadius: "20px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
            <h2 style={{ color: "#34D399", fontSize: "24px", fontWeight: "800", marginBottom: "16px" }}>Enterprise Healthcare Systems</h2>
            <p style={{ fontSize: "16px", color: "#CBD5E1", lineHeight: "1.8", margin: 0 }}>{industry.fullDescription}</p>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      {industry.features && industry.features.length > 0 && (
        <section style={{ padding: "80px 0" }}>
          <div className="container">
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#FFF", marginBottom: "40px" }}>MedTech Core Modules</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              {industry.features.map((feat: any, idx: number) => (
                <div key={idx} style={{ background: "#0B2535", padding: "28px", borderRadius: "16px", border: "1px solid rgba(16, 185, 129, 0.15)" }}>
                  <div style={{ fontSize: "32px", marginBottom: "14px" }}>{feat.icon || "🏥"}</div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#FFF", marginBottom: "8px" }}>{feat.title}</h3>
                  <p style={{ fontSize: "14px", color: "#94A3B8", lineHeight: "1.6", margin: 0 }}>{feat.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <EnquireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} serviceTitle={industry.name} />
    </div>
  );
}
