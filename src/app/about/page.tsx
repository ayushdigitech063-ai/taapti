"use client";

import { useState } from "react";
import Link from "next/link";

const stats = [
  { value: "50+", label: "Production Apps Shipped", desc: "Across Fintech, Healthcare & SaaS" },
  { value: "99.9%", label: "System Uptime SLA", desc: "High availability infrastructure" },
  { value: "100%", label: "Senior Engineering", desc: "No junior dev handoffs" },
  { value: "< 24h", label: "Response SLA", desc: "Dedicated engineering channel" },
];

const values = [
  {
    number: "01",
    title: "Engineering First",
    subtitle: "Built for Resilience",
    description:
      "We design software with strict adherence to architectural principles—prioritizing type safety, modular code, automated testing, and long-term maintainability.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    tags: ["Clean Code", "Type Safety", "CI/CD Automation"],
  },
  {
    number: "02",
    title: "Direct Collaboration",
    subtitle: "Zero Middlemen",
    description:
      "You work directly with the senior architects and product engineers building your product. Clear technical communication without project management bloat.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    tags: ["Direct Access", "Transparent Slack", "Agile Sprints"],
  },
  {
    number: "03",
    title: "Practical Innovation",
    subtitle: "No Hype, Real ROI",
    description:
      "We integrate AI, RAG pipelines, and cloud automation where they provide clear competitive advantage, avoiding unnecessary complexity or over-engineering.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    tags: ["RAG Pipelines", "Cloud Native", "Cost Optimization"],
  },
  {
    number: "04",
    title: "Long-Term Scalability",
    subtitle: "Built to Evolve",
    description:
      "Software foundations crafted to scale gracefully with user growth, traffic spikes, and evolving business requirements without requiring total rewrites.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    tags: ["Microservices", "Event-Driven", "Database Scaling"],
  },
];

const capabilities = [
  {
    id: "backend",
    title: "Backend Engineering",
    desc: "Distributed microservices, high-throughput REST & GraphQL APIs, real-time WebSockets, and secure data storage.",
    tech: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "Kafka"],
  },
  {
    id: "web-mobile",
    title: "Web & Mobile Engineering",
    desc: "Blazing-fast modern web applications, progressive web apps, and native iOS & Android experiences.",
    tech: ["Next.js", "React Native", "TypeScript", "TailwindCSS", "Flutter"],
  },
  {
    id: "ai-rag",
    title: "AI & RAG Solutions",
    desc: "Custom LLM fine-tuning, retrieval-augmented generation pipelines, vector databases, and intelligent document AI.",
    tech: ["LangChain", "LlamaIndex", "Pinecone", "OpenAI", "PyTorch"],
  },
  {
    id: "modernization",
    title: "Legacy Modernization",
    desc: "Refactoring monolithic codebases into cloud-native architectures with zero downtime migration strategies.",
    tech: ["Docker", "Kubernetes", "AWS", "GCP", "Terraform"],
  },
  {
    id: "product",
    title: "Full Product Engineering",
    desc: "End-to-end product engineering from tech specification, database design, UI/UX architecture to deployment.",
    tech: ["System Design", "UI/UX System", "Analytics", "DevOps"],
  },
  {
    id: "teams",
    title: "Dedicated Technical Teams",
    desc: "Autonomous, senior engineering squads that integrate seamlessly into your technical roadmap and workflow.",
    tech: ["Full-Stack Eng", "DevOps Lead", "QA Automation", "Tech Architect"],
  },
];

const techPillars = [
  {
    title: "Security & Compliance",
    desc: "Bank-grade encryption, OWASP top 10 protection, and automated vulnerability scanning.",
    metric: "SOC2 Ready",
  },
  {
    title: "Performance Optimization",
    desc: "Sub-100ms API response targets, edge caching, and bundle size reduction.",
    metric: "98+ Lighthouse",
  },
  {
    title: "DevOps & Observability",
    desc: "Automated CI/CD pipelines, Datadog/Grafana monitoring, and self-healing infrastructure.",
    metric: "Zero-Downtime",
  },
];

export default function AboutPage() {
  const [activeCapability, setActiveCapability] = useState(0);

  return (
    <main style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}>
      {/* Dynamic Light Hero Banner (Matching Brand Visual Style) */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(120deg, #f0f7ff 0%, #e0f0ff 45%, #eff6ff 80%, #f8fafc 100%)",
          padding: "140px 0 100px",
          overflow: "hidden",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        {/* Soft Decorative Background SVG Curved Lines (Matching Reference Image) */}
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
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <circle cx="1130" cy="130" r="6" fill="#2563eb" />
            <path
              d="M600 -50 Q 1000 250 1500 450"
              stroke="#60a5fa"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.3"
            />
          </svg>
        </div>

        {/* Floating Side Watermark Label */}
        <div
          style={{
            position: "absolute",
            right: "8%",
            top: "42%",
            transform: "translateY(-50%)",
            color: "#1e40af",
            opacity: 0.35,
            fontSize: "19px",
            fontStyle: "italic",
            fontFamily: "serif",
            letterSpacing: "0.05em",
            pointerEvents: "none",
            zIndex: 1,
            display: "none",
          }}
          className="d-none d-lg-block"
        >
          <div style={{ fontWeight: "400", letterSpacing: "0.08em" }}>Ideas</div>
          <div style={{ fontWeight: "700" }}>to Impact</div>
          <div style={{ width: "40px", height: "2px", background: "#2563eb", marginTop: "8px", opacity: 0.5 }} />
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
                border: "1px solid #bfdbfe",
                boxShadow: "0 4px 15px rgba(37,99,235,0.06)",
                fontSize: "13px",
                fontWeight: "700",
                color: "#1d4ed8",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#2563eb",
                  boxShadow: "0 0 8px #2563eb",
                }}
              />
              About Taapti Technologies
            </div>

            <h1
              style={{
                fontSize: "clamp(38px, 5.2vw, 64px)",
                fontWeight: "800",
                lineHeight: "1.12",
                letterSpacing: "-0.035em",
                color: "#0a0d14",
                marginBottom: "24px",
              }}
            >
              Senior engineers building{" "}
              <span style={{ color: "#2563eb", display: "block" }}>
                production-ready software.
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 1.25vw, 19px)",
                lineHeight: "1.7",
                color: "#475569",
                maxWidth: "680px",
                marginBottom: "36px",
              }}
            >
              Taapti Technologies is a founder-led software engineering firm. We design, modernize, and scale mission-critical digital products for ambitious enterprises and high-growth startups.
            </p>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{
                  height: "52px",
                  padding: "0 30px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
                  boxShadow: "0 8px 20px rgba(29,78,216,0.3)",
                }}
              >
                Start a Conversation <span>→</span>
              </Link>
              <Link
                href="/case-studies"
                className="btn btn-outline"
                style={{
                  height: "52px",
                  padding: "0 28px",
                  borderRadius: "999px",
                  background: "#ffffff",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              >
                Explore Case Studies
              </Link>
            </div>
          </div>

          {/* Stats Bar */}
          <div
            className="animate-from-right"
            style={{
              marginTop: "80px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "20px",
              background: "#ffffff",
              borderRadius: "24px",
              padding: "32px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 20px 40px rgba(11,59,130,0.06)",
            }}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                style={{
                  borderRight: i < stats.length - 1 ? "1px solid #e2e8f0" : "none",
                  paddingRight: "20px",
                }}
              >
                <div style={{ fontSize: "36px", fontWeight: "800", color: "#1d4ed8", letterSpacing: "-0.03em" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", marginTop: "4px" }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: "13px", color: "#64748b", marginTop: "2px" }}>{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Partner vs Agency */}
      <section style={{ padding: "110px 0", background: "#ffffff" }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <div className="animate-from-left">
              <span
                style={{
                  color: "#1d4ed8",
                  fontSize: "13px",
                  fontWeight: "800",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "14px",
                  display: "inline-block",
                }}
              >
                Who We Are
              </span>
              <h2
                style={{
                  fontSize: "clamp(32px, 3.5vw, 48px)",
                  fontWeight: "800",
                  lineHeight: "1.2",
                  color: "#0a0d14",
                  letterSpacing: "-0.03em",
                  marginBottom: "20px",
                }}
              >
                A technical partner, <span style={{ color: "#1d4ed8" }}>not just an agency.</span>
              </h2>
              <p style={{ fontSize: "17px", lineHeight: "1.8", color: "#64748b", marginBottom: "20px" }}>
                We partner with engineering leaders, CTOs, and founders who need high-velocity engineering teams to solve hard technical problems or launch ambitious products.
              </p>
              <p style={{ fontSize: "17px", lineHeight: "1.8", color: "#64748b" }}>
                Unlike traditional outsourced agencies that push junior talent and heavy account management, our team consists of senior engineers who write clean, battle-tested code and communicate directly with your team.
              </p>
            </div>

            {/* Interactive Feature Card Box */}
            <div
              className="animate-from-right"
              style={{
                background: "linear-gradient(135deg, #0b0f19 0%, #0f172a 100%)",
                borderRadius: "28px",
                padding: "40px",
                color: "#ffffff",
                boxShadow: "0 25px 60px rgba(11,15,25,0.25)",
                border: "1px solid rgba(255,255,255,0.1)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  color: "#38bdf8",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                The Taapti Benchmark
              </div>
              <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#ffffff", marginBottom: "24px" }}>
                Built around production standards.
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                {techPillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "16px",
                      padding: "18px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                    }}
                  >
                    <div>
                      <div style={{ fontSize: "15px", fontWeight: "700", color: "#ffffff" }}>{pillar.title}</div>
                      <div style={{ fontSize: "13px", color: "#94a3b8", marginTop: "2px" }}>{pillar.desc}</div>
                    </div>
                    <span
                      style={{
                        background: "rgba(56,189,248,0.15)",
                        color: "#38bdf8",
                        border: "1px solid rgba(56,189,248,0.3)",
                        padding: "6px 12px",
                        borderRadius: "999px",
                        fontSize: "11px",
                        fontWeight: "800",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {pillar.metric}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles Section */}
      <section style={{ padding: "100px 0", background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 60px" }}>
            <span
              style={{
                color: "#1d4ed8",
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
                display: "inline-block",
              }}
            >
              Our Core Principles
            </span>
            <h2
              style={{
                fontSize: "clamp(32px, 3.8vw, 48px)",
                fontWeight: "800",
                color: "#0a0d14",
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              How we think about <span style={{ color: "#1d4ed8" }}>software engineering.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#64748b", lineHeight: "1.7" }}>
              Great software isn&apos;t created by writing more code—it&apos;s created by making smart decisions that save months of technical debt down the line.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {values.map((val, idx) => (
              <div
                key={val.number}
                className={idx % 2 === 0 ? "animate-from-left" : "animate-from-right"}
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  padding: "32px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                  transition: "all 0.3s ease",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "14px",
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {val.icon}
                    </div>
                    <span style={{ fontSize: "20px", fontWeight: "800", color: "#cbd5e1" }}>{val.number}</span>
                  </div>

                  <div style={{ fontSize: "12px", fontWeight: "800", color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                    {val.subtitle}
                  </div>
                  <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>
                    {val.title}
                  </h3>
                  <p style={{ fontSize: "14.5px", color: "#64748b", lineHeight: "1.65", marginBottom: "24px" }}>
                    {val.description}
                  </p>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
                  {val.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: "#f1f5f9",
                        color: "#475569",
                        padding: "4px 10px",
                        borderRadius: "999px",
                        fontSize: "11.5px",
                        fontWeight: "600",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Capabilities Grid */}
      <section style={{ padding: "110px 0", background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "740px", margin: "0 auto 60px" }}>
            <span
              style={{
                color: "#1d4ed8",
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
                display: "inline-block",
              }}
            >
              Our Engineering Capabilities
            </span>
            <h2
              style={{
                fontSize: "clamp(32px, 3.8vw, 48px)",
                fontWeight: "800",
                color: "#0a0d14",
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              Full-spectrum technology <span style={{ color: "#1d4ed8" }}>execution.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#64748b", lineHeight: "1.7" }}>
              From initial system architecture to production rollout, we bring specialized technical capabilities across the software development lifecycle.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: "20px",
            }}
          >
            {capabilities.map((item, idx) => {
              const isActive = activeCapability === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveCapability(idx)}
                  className={idx % 2 === 0 ? "animate-from-left" : "animate-from-right"}
                  style={{
                    background: isActive ? "linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)" : "#ffffff",
                    border: isActive ? "2px solid #2563eb" : "1px solid #e2e8f0",
                    borderRadius: "20px",
                    padding: "32px",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isActive ? "0 20px 40px rgba(37,99,235,0.12)" : "0 4px 15px rgba(0,0,0,0.02)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "800",
                        color: isActive ? "#2563eb" : "#94a3b8",
                        background: isActive ? "#dbeafe" : "#f1f5f9",
                        padding: "4px 10px",
                        borderRadius: "999px",
                      }}
                    >
                      0{idx + 1}
                    </span>
                    <span style={{ color: isActive ? "#2563eb" : "#cbd5e1", fontSize: "18px", fontWeight: "700" }}>
                      ↗
                    </span>
                  </div>

                  <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "10px" }}>
                    {item.title}
                  </h3>

                  <p style={{ fontSize: "14.5px", color: "#64748b", lineHeight: "1.65", marginBottom: "20px" }}>
                    {item.desc}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {item.tech.map((t, i) => (
                      <span
                        key={i}
                        style={{
                          background: isActive ? "#ffffff" : "#f8fafc",
                          border: "1px solid #e2e8f0",
                          color: isActive ? "#1d4ed8" : "#475569",
                          fontSize: "12px",
                          fontWeight: "700",
                          padding: "4px 10px",
                          borderRadius: "6px",
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section style={{ padding: "80px 0 120px", background: "#f8fafc" }}>
        <div className="container">
          <div
            className="animate-from-left"
            style={{
              background: "linear-gradient(135deg, #060b13 0%, #0a1322 50%, #060a12 100%)",
              borderRadius: "32px",
              padding: "60px 40px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 60px rgba(6,11,19,0.4)",
            }}
          >
            <span
              style={{
                color: "#38bdf8",
                fontSize: "12px",
                fontWeight: "800",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "16px",
                display: "inline-block",
              }}
            >
              Let&apos;s Build Together
            </span>

            <h2
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                fontWeight: "800",
                color: "#ffffff",
                marginBottom: "20px",
                letterSpacing: "-0.03em",
              }}
            >
              Have a technical challenge or product idea?{" "}
              <span style={{ color: "#38bdf8" }}>Let&apos;s talk.</span>
            </h2>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "17px",
                maxWidth: "600px",
                margin: "0 auto 36px",
                lineHeight: "1.65",
              }}
            >
              Schedule a 30-minute discovery call directly with our engineering founders to discuss your architecture, tech stack, and goals.
            </p>

            <Link
              href="/contact"
              className="btn btn-primary"
              style={{
                height: "56px",
                padding: "0 36px",
                fontSize: "16px",
                background: "linear-gradient(135deg, #0070f3 0%, #0051cb 100%)",
                boxShadow: "0 8px 30px rgba(0,112,243,0.4)",
              }}
            >
              Schedule Technical Discovery <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
