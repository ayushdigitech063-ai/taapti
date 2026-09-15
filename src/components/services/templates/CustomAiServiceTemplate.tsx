"use client";

import { useState } from "react";
import Link from "next/link";
import EnquireModal from "@/components/EnquireModal";
import { ServiceData } from "./DefaultServiceTemplate";

export default function CustomAiServiceTemplate({ service }: { service: ServiceData }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="custom-ai-service-template" style={{ background: "#050814", color: "#F8FAFC", minHeight: "100vh", paddingTop: "100px", fontFamily: "sans-serif" }}>
      {/* FUTURISTIC AI HERO */}
      <section style={{ padding: "80px 0", background: "radial-gradient(ellipse at top, #1e1b4b 0%, #050814 70%)", borderBottom: "1px solid rgba(147, 51, 234, 0.2)" }}>
        <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(147, 51, 234, 0.15)", border: "1px solid rgba(147, 51, 234, 0.4)", color: "#C084FC", padding: "6px 18px", borderRadius: "30px", fontSize: "12px", fontWeight: "800", marginBottom: "24px", letterSpacing: "1.5px" }}>
            <span>🤖NEW UI TEST</span>
          </div>

          <h1 style={{ fontSize: "52px", fontWeight: "900", color: "#FFF", lineHeight: "1.1", marginBottom: "24px", background: "linear-gradient(to right, #FFF, #C084FC, #60A5FA)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {service.heroHeading || service.name}
          </h1>

          <p style={{ fontSize: "20px", color: "#94A3B8", maxWidth: "800px", margin: "0 auto 36px", lineHeight: "1.6" }}>
            {service.heroDescription || service.shortDescription}
          </p>

          <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              style={{ background: "linear-gradient(135deg, #7C3AED, #2563EB)", color: "#FFF", border: "none", padding: "16px 36px", borderRadius: "30px", fontWeight: "800", fontSize: "16px", cursor: "pointer", boxShadow: "0 10px 30px rgba(124, 58, 237, 0.4)" }}
            >
              {service.ctaText || "Deploy AI Solution"} 🚀
            </button>
          </div>
        </div>
      </section>

      {/* OVERVIEW & CAPABILITIES */}
      <section style={{ padding: "80px 0" }}>
        <div className="container" style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "rgba(15, 23, 42, 0.8)", borderRadius: "20px", padding: "40px", border: "1px solid rgba(147, 51, 234, 0.3)", backdropFilter: "blur(10px)" }}>
            <h2 style={{ fontSize: "28px", color: "#C084FC", marginBottom: "16px" }}>AI Architecture Overview</h2>
            <p style={{ fontSize: "17px", color: "#E2E8F0", lineHeight: "1.8", whiteSpace: "pre-line" }}>
              {service.fullDescription}
            </p>
          </div>

          {service.features && service.features.length > 0 && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "24px", marginTop: "48px" }}>
              {service.features.map((feat, idx) => (
                <div key={idx} style={{ background: "#0F172A", padding: "28px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ fontSize: "36px", marginBottom: "12px" }}>{feat.icon || "🤖"}</div>
                  <h3 style={{ fontSize: "18px", color: "#FFF", fontWeight: "700", marginBottom: "8px" }}>{feat.title}</h3>
                  <p style={{ fontSize: "14px", color: "#94A3B8" }}>{feat.description}</p>
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
