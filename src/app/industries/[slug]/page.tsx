"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface IndustryDetail {
  slug: string;
  title: string;
  subtitle: string;
  heroDesc: string;
  challenges: { title: string; desc: string }[];
  solutions: { title: string; desc: string }[];
  stats: { value: string; label: string }[];
}

const industryData: Record<string, IndustryDetail> = {
  fintech: {
    slug: "fintech",
    title: "FinTech & Financial Systems",
    subtitle: "Secure, Scalable & Compliant Financial Technology",
    heroDesc:
      "We design, build, and scale high-availability financial software—ranging from automated payment gateways, core ledger engines, to fraud prevention systems.",
    challenges: [
      {
        title: "High-Throughput Transaction Processing",
        desc: "Handling peak financial transaction volumes with zero latency degradation or system downtime.",
      },
      {
        title: "Regulatory Compliance & Security",
        desc: "Meeting strict PCI-DSS, SOC2, and data sovereignty compliance standards across multi-cloud infrastructure.",
      },
      {
        title: "Real-Time Fraud & Anomaly Detection",
        desc: "Integrating intelligent machine learning models to detect suspicious activities before settlement.",
      },
    ],
    solutions: [
      {
        title: "Distributed Ledger Architecture",
        desc: "Immutable, audit-ready double-entry ledger systems built for microsecond precision.",
      },
      {
        title: "Unified Payment Gateway Aggregation",
        desc: "Seamless integration with Stripe, Plaid, Razorpay, and direct banking APIs.",
      },
      {
        title: "Bank-Grade Encryption & Vaults",
        desc: "Zero-trust security model with end-to-end payload encryption and KMS key management.",
      },
    ],
    stats: [
      { value: "$500M+", label: "Processed Annually" },
      { value: "99.99%", label: "System Uptime" },
      { value: "<50ms", label: "Api Latency" },
    ],
  },
  healthcare: {
    slug: "healthcare",
    title: "Healthcare & Digital Care Systems",
    subtitle: "Interoperable, Telehealth & HealthTech Solutions",
    heroDesc:
      "Empowering healthcare providers and Digital Health startups with modern patient portals, EHR integrations, and HIPAA-compliant cloud architectures.",
    challenges: [
      {
        title: "Data Fragmentation & EHR Integration",
        desc: "Connecting disparate legacy electronic health record systems via standardized HL7 and FHIR protocols.",
      },
      {
        title: "Patient Data Privacy (HIPAA / GDPR)",
        desc: "Enforcing strict access controls, audit logs, and encrypted medical records handling.",
      },
      {
        title: "Real-Time Telemedicine Reliability",
        desc: "Delivering low-latency video consultations and WebRTC streaming for remote diagnosis.",
      },
    ],
    solutions: [
      {
        title: "FHIR & HL7 Middleware Integration",
        desc: "Bidirectional sync pipelines connecting modern web portals to legacy Epic/Cerner systems.",
      },
      {
        title: "AI-Assisted Diagnostic Workflows",
        desc: "Document AI and image analysis pipelines for accelerating patient triage.",
      },
      {
        title: "Encrypted Patient Portals",
        desc: "Intuitive mobile & web applications for appointment booking, prescriptions, and lab results.",
      },
    ],
    stats: [
      { value: "1M+", label: "Patients Served" },
      { value: "HIPAA", label: "Compliant Stack" },
      { value: "100%", label: "Interoperable" },
    ],
  },
  "saas-technology": {
    slug: "saas-technology",
    title: "SaaS & Enterprise Technology",
    subtitle: "Cloud-Native Platforms & Multi-Tenant Architectures",
    heroDesc:
      "Accelerating product roadmap delivery for fast-growing SaaS startups and established technology vendors needing resilient, modular software architecture.",
    challenges: [
      {
        title: "Multi-Tenant Scalability",
        desc: "Designing database isolation and caching layers that scale effortlessly from 100 to 1,000,000 active users.",
      },
      {
        title: "Feature Velocity vs Technical Debt",
        desc: "Shipping rapid feature iterations without sacrificing code quality, automated test coverage, or maintainability.",
      },
      {
        title: "API Rate Limiting & Billing Metering",
        desc: "Accurately tracking resource usage and enforcing tier-based quota management for usage-based SaaS.",
      },
    ],
    solutions: [
      {
        title: "Serverless & Microservices Migration",
        desc: "Decoupling monolithic codebases into resilient Docker / Kubernetes containers.",
      },
      {
        title: "Automated CI/CD & Feature Flags",
        desc: "Deploying code updates safely multiple times a day with zero user interruption.",
      },
      {
        title: "Usage-Based Billing Engines",
        desc: "Stripe Metered Billing and custom usage aggregation pipelines for enterprise tiers.",
      },
    ],
    stats: [
      { value: "10x", label: "Faster Deployment" },
      { value: "99.9%", label: "SLA Guarantee" },
      { value: "Zero", label: "Downtime Releases" },
    ],
  },
  ecommerce: {
    slug: "ecommerce",
    title: "Digital Commerce & Marketplaces",
    subtitle: "High-Conversion, Headless Commerce Solutions",
    heroDesc:
      "Engineering ultra-fast e-commerce storefronts, custom marketplace platforms, and real-time inventory management engines designed for high conversion.",
    challenges: [
      {
        title: "Flash Sale Traffic Spikes",
        desc: "Preventing server crashes and cart drop-offs during black friday and high-demand product drops.",
      },
      {
        title: "Complex Multi-Vendor Workflows",
        desc: "Managing payout splitting, inventory synchronization, and logistics APIs across thousands of vendors.",
      },
      {
        title: "Page Speed & Mobile Conversions",
        desc: "Optimizing Core Web Vitals to achieve sub-second load times on mobile networks.",
      },
    ],
    solutions: [
      {
        title: "Headless Commerce Architecture",
        desc: "Next.js storefronts paired with Shopify Plus, Commerce Layer, or custom Node.js backends.",
      },
      {
        title: "Real-Time Inventory Synchronization",
        desc: "Redis-backed distributed locking to prevent overselling across omnichannel sales.",
      },
      {
        title: "Dynamic AI Recommendation Engines",
        desc: "Personalized product discovery based on user behavior and cart history.",
      },
    ],
    stats: [
      { value: "<1s", label: "Mobile Load Time" },
      { value: "+35%", label: "Conversion Lift" },
      { value: "100k+", label: "Concurrent Shoppers" },
    ],
  },
};

export default function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const data = industryData[resolvedParams.slug];

  if (!data) {
    notFound();
  }

  return (
    <main style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}>
      {/* Light Hero Section matching Brand visual language */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(120deg, #f0f7ff 0%, #e0f0ff 45%, #eff6ff 80%, #f8fafc 100%)",
          padding: "140px 0 90px",
          borderBottom: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
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
              stroke="#10243E"
              strokeWidth="1.5"
              strokeOpacity="0.25"
            />
            <circle cx="1130" cy="130" r="6" fill="#00875A" />
            <path
              d="M600 -50 Q 1000 250 1500 450"
              stroke="#00875A"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.3"
            />
          </svg>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <Link
            href="/industries"
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "#00875A",
              background: "#E3FCEF",
              padding: "6px 16px",
              borderRadius: "999px",
              display: "inline-block",
              marginBottom: "20px",
              border: "1px solid #A7F3D0",
            }}
          >
            ← Back to All Industries
          </Link>

          <div style={{ maxWidth: "780px" }}>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "800",
                color: "#00875A",
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Industry Specialization
            </span>

            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 60px)",
                fontWeight: "800",
                lineHeight: "1.15",
                letterSpacing: "-0.035em",
                color: "#0a0d14",
                marginBottom: "20px",
              }}
            >
              {data.title}{" "}
              <span style={{ color: "#10243E", display: "block" }}>
                {data.subtitle}
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 1.2vw, 19px)",
                lineHeight: "1.7",
                color: "#475569",
                marginBottom: "32px",
              }}
            >
              {data.heroDesc}
            </p>

            <Link
              href="/contact"
              className="btn btn-primary"
              style={{
                height: "52px",
                padding: "0 32px",
                borderRadius: "999px",
                background: "#00875A",
                boxShadow: "0 8px 20px rgba(0,135,90,0.3)",
              }}
            >
              Discuss Your {data.title.split(" ")[0]} Project <span>→</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <div
            style={{
              marginTop: "60px",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "20px",
              background: "#ffffff",
              borderRadius: "20px",
              padding: "28px 32px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
            }}
          >
            {data.stats.map((stat, i) => (
              <div key={i}>
                <div style={{ fontSize: "32px", fontWeight: "800", color: "#10243E" }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "14px", fontWeight: "700", color: "#64748b", marginTop: "2px" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section style={{ padding: "90px 0", background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 60px" }}>
            <span
              style={{
                color: "#00875A",
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                marginBottom: "12px",
                display: "inline-block",
              }}
            >
              Domain Expertise
            </span>
            <h2
              style={{
                fontSize: "clamp(30px, 3.5vw, 44px)",
                fontWeight: "800",
                color: "#0a0d14",
                letterSpacing: "-0.03em",
                marginBottom: "16px",
              }}
            >
              Solving key engineering <span style={{ color: "#10243E" }}>bottlenecks.</span>
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "28px",
            }}
          >
            {/* Left: Common Challenges */}
            <div
              style={{
                background: "#f8fafc",
                borderRadius: "24px",
                padding: "36px",
                border: "1px solid #e2e8f0",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  color: "#ef4444",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Key Industry Challenges
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {data.challenges.map((c, i) => (
                  <div key={i}>
                    <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "6px" }}>
                      {c.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Taapti Solutions */}
            <div
              style={{
                background: "linear-gradient(135deg, #0b0f19 0%, #0f172a 100%)",
                borderRadius: "24px",
                padding: "36px",
                color: "#ffffff",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  color: "#00875A",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Our Technical Solutions
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {data.solutions.map((s, i) => (
                  <div key={i}>
                    <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#ffffff", marginBottom: "6px" }}>
                      {s.title}
                    </h3>
                    <p style={{ fontSize: "14px", color: "#94a3b8", lineHeight: "1.6" }}>{s.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: "80px 0 120px", background: "#f8fafc" }}>
        <div className="container text-center">
          <div
            style={{
              background: "#ffffff",
              borderRadius: "28px",
              padding: "50px 32px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#0f172a", marginBottom: "16px" }}>
              Ready to engineer your <span style={{ color: "#00875A" }}>{data.title}</span> product?
            </h2>
            <p style={{ color: "#64748b", fontSize: "16px", marginBottom: "28px" }}>
              Work directly with our senior engineering architects to build software tailored for your industry.
            </p>
            <Link
              href="/contact"
              className="btn btn-primary"
              style={{
                height: "52px",
                padding: "0 36px",
                borderRadius: "999px",
                background: "#00875A",
                boxShadow: "0 8px 24px rgba(0,135,90,0.3)",
              }}
            >
              Get Started Now <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
