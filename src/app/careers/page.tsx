"use client";

import { useState } from "react";
import Link from "next/link";

const benefits = [
  {
    number: "01",
    title: "Work on Production Systems",
    subtitle: "Real Scale & Impact",
    description:
      "Build software that powers real businesses. Your engineering decisions have direct impact on system architecture, uptime, and user experience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "True Engineering Ownership",
    subtitle: "No Micro-Management",
    description:
      "Own your features end-to-end—from system design and code implementation to automated testing and cloud deployment.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Modern Tech Stack",
    subtitle: "Next.js, AI, RAG & Cloud",
    description:
      "Work with cutting-edge tools including TypeScript, Next.js, Python, Vector DBs, Kubernetes, and automated CI/CD pipelines.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Remote-First Flexibility",
    subtitle: "Work From Anywhere",
    description:
      "We operate with asynchronous communication, flexible hours, and a high-trust culture focused on output rather than hours spent at a desk.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Competitive Compensation",
    subtitle: "Top Market Pay",
    description:
      "Above-market salaries, performance bonuses, health benefits, equipment budget, and annual learning stipends for courses and conferences.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Fast Career Velocity",
    subtitle: "Grow With The Firm",
    description:
      "As a founder-led engineering company, top performers quickly step into technical leadership, architecture design, and client partner roles.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const hiringProcess = [
  {
    step: "01",
    title: "Profile Review",
    desc: "We review your portfolio, GitHub, or previous technical work to evaluate your engineering depth.",
  },
  {
    step: "02",
    title: "Introductory Sync",
    desc: "A 20-minute casual video call to align on career goals, working style, and team fit.",
  },
  {
    step: "03",
    title: "Technical Discussion",
    desc: "A hands-on discussion reviewing real-world system architecture or code structure with senior leads.",
  },
  {
    step: "04",
    title: "Offer & Onboarding",
    desc: "Fast offer rollout with clear equity/salary terms, followed by smooth engineering onboarding.",
  },
];

const openRoles = [
  {
    id: "mern-lead",
    department: "Engineering",
    title: "Senior Full-Stack Engineer (MERN / Next.js)",
    type: "Full-Time",
    location: "Remote (India / Global)",
    experience: "3+ Years",
    description:
      "Lead feature development for high-growth web applications using React, Next.js, Node.js, and PostgreSQL/MongoDB.",
    stack: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
  },
  {
    id: "backend-arch",
    department: "Engineering",
    title: "Senior Backend Systems Engineer",
    type: "Full-Time",
    location: "Remote",
    experience: "4+ Years",
    description:
      "Architect high-throughput microservices, Redis caching layers, and resilient database models for mission-critical apps.",
    stack: ["Node.js", "Python", "Go", "Redis", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: "ai-engineer",
    department: "AI & Data",
    title: "AI / LLM Solutions Engineer",
    type: "Full-Time",
    location: "Remote",
    experience: "2+ Years",
    description:
      "Build RAG pipelines, integrate LLMs, optimize vector search, and build intelligent AI agents for enterprise workflows.",
    stack: ["Python", "LangChain", "Pinecone", "OpenAI API", "PyTorch", "FastAPI"],
  },
  {
    id: "devops-engineer",
    department: "Engineering",
    title: "DevOps & Cloud Infrastructure Specialist",
    type: "Full-Time",
    location: "Remote",
    experience: "3+ Years",
    description:
      "Automate multi-cloud deployments, maintain Kubernetes clusters, setup CI/CD pipelines, and manage system monitoring.",
    stack: ["Kubernetes", "Docker", "AWS", "Terraform", "GitHub Actions", "Grafana"],
  },
];

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");

  const filteredRoles = openRoles.filter((role) => {
    return selectedDepartment === "All" || role.department === selectedDepartment;
  });

  return (
    <main style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}>
      {/* Dynamic Light Hero Banner */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(120deg, #f0f7ff 0%, #e0f0ff 45%, #eff6ff 80%, #f8fafc 100%)",
          padding: "140px 0 100px",
          borderBottom: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        {/* Soft Decorative Background SVG Curved Lines */}
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
              We Are Hiring — Join Our Engineering Team
            </div>

            <h1
              style={{
                fontSize: "clamp(40px, 5.5vw, 68px)",
                fontWeight: "800",
                lineHeight: "1.1",
                letterSpacing: "-0.035em",
                color: "#0a0d14",
                marginBottom: "24px",
              }}
            >
              Build high-impact software.{" "}
              <span style={{ color: "#2563eb", display: "block" }}>
                Accelerate your career.
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(17px, 1.3vw, 20px)",
                lineHeight: "1.7",
                color: "#475569",
                marginBottom: "36px",
                maxWidth: "700px",
              }}
            >
              Taapti Technologies is looking for senior developers and architects passionate about clean code, high availability systems, and modern AI engineering.
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <a href="#open-roles" className="btn btn-primary" style={{ height: "54px", padding: "0 32px" }}>
                View Open Positions <span>↓</span>
              </a>
              <Link href="/about" className="btn btn-outline" style={{ height: "54px", padding: "0 28px" }}>
                Learn About Our Culture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Taapti - Perks */}
      <section style={{ padding: "100px 0", background: "#ffffff" }}>
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
              Life At Taapti
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
              Why engineers love <span style={{ color: "#1d4ed8" }}>working here.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#64748b", lineHeight: "1.7" }}>
              We build an environment where engineering ownership, rapid growth, and work-life balance go hand in hand.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "24px",
            }}
          >
            {benefits.map((benefit, idx) => (
              <div
                key={benefit.number}
                className={idx % 2 === 0 ? "animate-from-left" : "animate-from-right"}
                style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  padding: "36px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "16px",
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {benefit.icon}
                    </div>
                    <span style={{ fontSize: "18px", fontWeight: "800", color: "#cbd5e1" }}>{benefit.number}</span>
                  </div>

                  <div style={{ fontSize: "12px", fontWeight: "800", color: "#1d4ed8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "6px" }}>
                    {benefit.subtitle}
                  </div>
                  <h3 style={{ fontSize: "22px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>
                    {benefit.title}
                  </h3>
                  <p style={{ fontSize: "14.5px", color: "#64748b", lineHeight: "1.65" }}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-roles" style={{ padding: "100px 0", background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 50px" }}>
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
              Current Hiring
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
              Open <span style={{ color: "#1d4ed8" }}>positions.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#64748b", lineHeight: "1.7" }}>
              Explore our current technical roles. We are always hiring talent passionate about software engineering excellence.
            </p>
          </div>

          {/* Department Filter */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            {["All", "Engineering", "AI & Data"].map((dept) => {
              const isActive = selectedDepartment === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "999px",
                    fontSize: "14px",
                    fontWeight: "700",
                    border: isActive ? "2px solid #2563eb" : "1px solid #cbd5e1",
                    background: isActive ? "#2563eb" : "#ffffff",
                    color: isActive ? "#ffffff" : "#475569",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  {dept === "All" ? "All Departments" : dept}
                </button>
              );
            })}
          </div>

          {/* Roles Cards Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {filteredRoles.map((role, idx) => (
              <div
                key={role.id}
                className={idx % 2 === 0 ? "animate-from-left" : "animate-from-right"}
                style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  padding: "36px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                  alignItems: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                  transition: "all 0.3s ease",
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px" }}>
                    <span
                      style={{
                        background: "#eff6ff",
                        color: "#1d4ed8",
                        fontSize: "11.5px",
                        fontWeight: "800",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        textTransform: "uppercase",
                      }}
                    >
                      {role.department}
                    </span>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "600" }}>{role.location}</span>
                    <span style={{ fontSize: "13px", color: "#94a3b8" }}>• {role.type}</span>
                  </div>

                  <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
                    {role.title}
                  </h3>

                  <p style={{ fontSize: "14.5px", color: "#64748b", lineHeight: "1.6", marginBottom: "18px" }}>
                    {role.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {role.stack.map((tech, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: "#f1f5f9",
                          color: "#475569",
                          fontSize: "12px",
                          fontWeight: "700",
                          padding: "4px 10px",
                          borderRadius: "6px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", gap: "12px" }}>
                  <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "600" }}>
                    Exp Required: <strong style={{ color: "#0f172a" }}>{role.experience}</strong>
                  </div>
                  <Link
                    href="/contact"
                    className="btn btn-primary"
                    style={{ height: "48px", padding: "0 28px", fontSize: "14px" }}
                  >
                    Apply For Role <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hiring Process */}
      <section style={{ padding: "100px 0", background: "#ffffff" }}>
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
              Transparent Process
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
              Fast, practical <span style={{ color: "#1d4ed8" }}>hiring pipeline.</span>
            </h2>
            <p style={{ fontSize: "16px", color: "#64748b", lineHeight: "1.7" }}>
              No 8-stage algorithmic puzzles. We focus on real-world engineering discussions and practical code.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "20px",
            }}
          >
            {hiringProcess.map((proc, idx) => (
              <div
                key={proc.step}
                className={idx % 2 === 0 ? "animate-from-left" : "animate-from-right"}
                style={{
                  background: "#f8fafc",
                  borderRadius: "20px",
                  padding: "32px",
                  border: "1px solid #e2e8f0",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "12px",
                    background: "#2563eb",
                    color: "#ffffff",
                    fontWeight: "800",
                    fontSize: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "20px",
                    boxShadow: "0 8px 20px rgba(37,99,235,0.3)",
                  }}
                >
                  {proc.step}
                </div>

                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
                  {proc.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>{proc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application CTA */}
      <section style={{ padding: "80px 0 120px", background: "#f8fafc" }}>
        <div className="container">
          <div
            className="animate-from-left"
            style={{
              background: "linear-gradient(135deg, #0b0f19 0%, #0f172a 100%)",
              borderRadius: "32px",
              padding: "60px 40px",
              color: "#ffffff",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div>
              <span
                style={{
                  color: "#38bdf8",
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  display: "inline-block",
                }}
              >
                Spontaneous Application
              </span>
              <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#ffffff", marginBottom: "12px" }}>
                Don&apos;t see your role?
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.65" }}>
                We are always open to connecting with senior developers, cloud architects, and AI researchers. Send us your resume or GitHub link directly.
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{
                  height: "56px",
                  padding: "0 36px",
                  fontSize: "16px",
                  background: "linear-gradient(135deg, #0070f3 0%, #0051cb 100%)",
                }}
              >
                Send General Application <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}