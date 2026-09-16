"use client";

import { useState } from "react";
import Link from "next/link";
import EnquireModal from "@/components/EnquireModal";

export default function CustomHealthcareIndustryTemplate({ industry }: { industry: any }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="custom-healthcare-template" style={{ background: "#FAFCFF", color: "#0F172A", minHeight: "100vh" }}>
      {/* 🏥 HEALTHCARE CUSTOM HERO */}
      <section style={{ position: "relative", paddingTop: "140px", paddingBottom: "90px", background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container">
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0, 135, 90, 0.1)", border: "1px solid rgba(0, 135, 90, 0.3)", borderRadius: "99px", padding: "6px 16px", fontSize: "12px", fontWeight: "700", color: "#00875A", marginBottom: "20px" }}>
            <span>🏥</span> HIPAA-COMPLIANT MEDTECH ARCHITECTURE
          </div>
          
          <h1 style={{ fontSize: "48px", fontWeight: "800", color: "#0F172A", lineHeight: "1.15", maxWidth: "850px", marginBottom: "24px" }}>
            {industry.heroHeading || "Custom Healthcare & Medical Systems"}
          </h1>
          
          <p style={{ fontSize: "18px", color: "#475569", maxWidth: "750px", lineHeight: "1.6", marginBottom: "36px" }}>
            {industry.heroDescription || industry.shortDescription}
          </p>

          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{ background: "#00875A", color: "#FFF", border: "none", padding: "14px 32px", borderRadius: "10px", fontWeight: "700", fontSize: "15px", cursor: "pointer", boxShadow: "0 10px 25px -5px rgba(0, 135, 90, 0.3)" }}
            >
              {industry.ctaText || "Consult MedTech Architects"} →
            </button>
            <Link
              href="/contact"
              style={{ background: "#FFF", color: "#0F172A", border: "1px solid #CBD5E1", padding: "14px 24px", borderRadius: "10px", fontWeight: "700", fontSize: "15px", textDecoration: "none", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}
            >
              HIPAA Audit Request
            </Link>
          </div>
        </div>
      </section>

      {/* OVERVIEW CONTENT */}
      <section style={{ padding: "60px 0", background: "#F8FAFC" }}>
        <div className="container">
          <div style={{ background: "#FFFFFF", padding: "40px", borderRadius: "20px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <h2 style={{ color: "#0F172A", fontSize: "24px", fontWeight: "800", marginBottom: "16px" }}>Enterprise Healthcare Systems</h2>
            <p style={{ fontSize: "16px", color: "#334155", lineHeight: "1.8", margin: 0 }}>{industry.fullDescription}</p>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      {industry.features && industry.features.length > 0 && (
        <section style={{ padding: "80px 0", background: "#FFFFFF" }}>
          <div className="container">
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0F172A", marginBottom: "40px" }}>MedTech Core Modules</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px" }}>
              {industry.features.map((feat: any, idx: number) => (
                <div key={idx} style={{ background: "#F8FAFC", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: "32px", marginBottom: "14px" }}>{feat.icon || "🏥"}</div>
                  <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>{feat.title}</h3>
                  <p style={{ fontSize: "14px", color: "#64748B", lineHeight: "1.6", margin: 0 }}>{feat.description}</p>
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
