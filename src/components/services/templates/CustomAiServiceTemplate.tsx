"use client";

import { useState } from "react";
import Link from "next/link";
import EnquireModal from "@/components/EnquireModal";
import { ServiceData } from "./DefaultServiceTemplate";

export default function CustomAiServiceTemplate({ service }: { service: ServiceData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="custom-ai-service-template" style={{ background: "#FAFCFF", color: "#0F172A", minHeight: "100vh", paddingTop: "100px", fontFamily: "sans-serif" }}>
      {/* FUTURISTIC AI HERO */}
      <section style={{ padding: "80px 0", background: "linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)", borderBottom: "1px solid #E2E8F0" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(0, 135, 90, 0.1)", border: "1px solid rgba(0, 135, 90, 0.3)", color: "#00875A", padding: "6px 18px", borderRadius: "30px", fontSize: "12px", fontWeight: "800", marginBottom: "24px", letterSpacing: "1.5px" }}>
            <span>🤖 AI & MACHINE LEARNING</span>
          </div>

          <h1 style={{ fontSize: "52px", fontWeight: "900", color: "#0F172A", lineHeight: "1.1", marginBottom: "24px" }}>
            {service.heroHeading || service.name}
          </h1>

          <p style={{ fontSize: "20px", color: "#475569", maxWidth: "800px", margin: "0 auto 36px", lineHeight: "1.6" }}>
            {service.heroDescription || service.shortDescription}
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              style={{ background: "#00875A", color: "#FFF", border: "none", padding: "16px 36px", borderRadius: "30px", fontWeight: "800", fontSize: "16px", cursor: "pointer", boxShadow: "0 10px 30px rgba(0, 135, 90, 0.3)" }}
            >
              {service.ctaText || "Deploy AI Solution"} 🚀
            </button>
          </div>
        </div>
      </section>

      {/* OVERVIEW & CAPABILITIES */}
      <section style={{ padding: "80px 0", background: "#F8FAFC" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "#FFFFFF", borderRadius: "20px", padding: "40px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <h2 style={{ fontSize: "28px", color: "#0F172A", marginBottom: "16px" }}>AI Architecture Overview</h2>
            <p style={{ fontSize: "17px", color: "#334155", lineHeight: "1.8", whiteSpace: "pre-line" }}>
              {service.fullDescription}
            </p>
          </div>

          {service.features && service.features.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "48px" }}>
              {service.features.map((feat, idx) => (
                <div key={idx} style={{ background: "#FFFFFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
                  <div style={{ fontSize: "36px", marginBottom: "12px" }}>{feat.icon || "🤖"}</div>
                  <h3 style={{ fontSize: "18px", color: "#0F172A", fontWeight: "700", marginBottom: "8px" }}>{feat.title}</h3>
                  <p style={{ fontSize: "14px", color: "#64748B" }}>{feat.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <EnquireModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} serviceTitle={service.name} />
    </div>
  );
}
