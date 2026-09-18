"use client";

import { useState } from "react";
import Link from "next/link";
import EnquireModal from "@/components/EnquireModal";
import { ServiceData } from "./DefaultServiceTemplate";

export default function CustomHealthcareServiceTemplate({
  service,
}: {
  service: ServiceData;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="healthcare-page">
        {/* Background Glow */}
        <div className="page-glow page-glow-one" />
        <div className="page-glow page-glow-two" />

        {/* HERO SECTION */}
        <section className="healthcare-hero">
          <div className="container healthcare-hero-grid">
            {/* Left Content */}
            <div className="hero-content">
              <div className="eyebrow">
                <span className="eyebrow-dot" />
                <span>HEALTHCARE TECHNOLOGY SOLUTIONS</span>
              </div>

              <h1>
                {service.heroHeading || service.name}
              </h1>

              <p className="hero-description">
                {service.heroDescription || service.shortDescription}
              </p>

              <div className="hero-actions">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="primary-btn"
                >
                  {service.ctaText || "Talk to Our Experts"}
                  <span>↗</span>
                </button>

                <Link href="/contact" className="secondary-btn">
                  Explore Our Services
                  <span>→</span>
                </Link>
              </div>

              <div className="hero-trust">
                <div className="trust-avatars">
                  <span>✚</span>
                  <span>⚕</span>
                  <span>+</span>
                </div>
                <div>
                  <strong>Built for modern healthcare</strong>
                  <p>Secure · Scalable · Patient-focused</p>
                </div>
              </div>
            </div>

            {/* Right Visual */}
            <div className="hero-visual">
              <div className="visual-orbit orbit-one" />
              <div className="visual-orbit orbit-two" />

              <div className="medical-dashboard">
                <div className="dashboard-top">
                  <div className="dashboard-brand">
                    <div className="brand-icon">✚</div>
                    <div>
                      <strong>Care<span>Sync</span></strong>
                      <small>Healthcare Platform</small>
                    </div>
                  </div>

                  <div className="dashboard-status">
                    <span />
                    Live System
                  </div>
                </div>

                <div className="dashboard-heading">
                  <div>
                    <small>Healthcare Overview</small>
                    <h3>Good morning, Admin</h3>
                  </div>
                  <div className="dashboard-date">Today ↗</div>
                </div>

                <div className="dashboard-stats">
                  <div className="dashboard-stat">
                    <div className="stat-icon blue">♙</div>
                    <small>Total Patients</small>
                    <strong>12,480</strong>
                    <span className="positive">↗ 12.8%</span>
                  </div>

                  <div className="dashboard-stat">
                    <div className="stat-icon green">✓</div>
                    <small>Appointments</small>
                    <strong>846</strong>
                    <span className="positive">↗ 8.4%</span>
                  </div>
                </div>

                <div className="dashboard-chart">
                  <div className="chart-heading">
                    <div>
                      <small>Patient Activity</small>
                      <strong>Weekly Overview</strong>
                    </div>
                    <span>Last 7 days⌄</span>
                  </div>

                  <div className="chart-area">
                    <div className="chart-lines">
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>

                    <svg
                      viewBox="0 0 400 140"
                      preserveAspectRatio="none"
                      className="chart-svg"
                    >
                      <defs>
                        <linearGradient
                          id="chartGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#2DD4BF"
                            stopOpacity="0.35"
                          />
                          <stop
                            offset="100%"
                            stopColor="#2DD4BF"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        d="M0,105 C30,95 35,65 65,75 S100,100 125,65 S160,45 185,60 S220,25 245,45 S280,70 305,35 S345,45 365,20 S390,30 400,10 L400,140 L0,140 Z"
                        fill="url(#chartGradient)"
                      />

                      <path
                        d="M0,105 C30,95 35,65 65,75 S100,100 125,65 S160,45 185,60 S220,25 245,45 S280,70 305,35 S345,45 365,20 S390,30 400,10"
                        fill="none"
                        stroke="#2DD4BF"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  <div className="chart-labels">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>

                <div className="dashboard-bottom">
                  <div className="mini-patient">
                    <div className="patient-avatar">👩🏻‍⚕️</div>
                    <div>
                      <strong>Care delivery simplified</strong>
                      <small>Connected healthcare workflows</small>
                    </div>
                  </div>
                  <div className="verified-badge">✓ Verified</div>
                </div>
              </div>

              <div className="floating-card floating-card-top">
                <div className="floating-icon">🛡</div>
                <div>
                  <strong>Secure & Reliable</strong>
                  <small>Enterprise-grade protection</small>
                </div>
                <span className="check-mark">✓</span>
              </div>

              <div className="floating-card floating-card-bottom">
                <div className="pulse-icon">⌁</div>
                <div>
                  <strong>Connected Care</strong>
                  <small>Better patient experiences</small>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Trust Strip */}
          <div className="container">
            <div className="hero-bottom-strip">
              <span>DESIGNED FOR HEALTHCARE INNOVATION</span>
              <div className="strip-line" />
              <div className="strip-items">
                <span>Patient-Centric</span>
                <span>Data-Driven</span>
                <span>Future-Ready</span>
              </div>
            </div>
          </div>
        </section>

        {/* OVERVIEW SECTION */}
        <section className="overview-section">
          <div className="container">
            <div className="section-label">01 — OUR APPROACH</div>

            <div className="overview-grid">
              <div>
                <h2>
                  Technology that puts
                  <span> care first.</span>
                </h2>
              </div>

              <div className="overview-content">
                <p>{service.fullDescription}</p>

                <div className="overview-line" />

                <div className="overview-points">
                  <div>
                    <span>01</span>
                    <strong>Human-centered design</strong>
                  </div>
                  <div>
                    <span>02</span>
                    <strong>Secure digital infrastructure</strong>
                  </div>
                  <div>
                    <span>03</span>
                    <strong>Scalable healthcare solutions</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        {service.features && service.features.length > 0 && (
          <section className="features-section">
            <div className="container">
              <div className="features-header">
                <div>
                  <div className="section-label">02 — CAPABILITIES</div>
                  <h2>
                    Built for the
                    <span> future of care.</span>
                  </h2>
                </div>

                <p>
                  Powerful technology and thoughtful experiences designed to
                  transform healthcare operations.
                </p>
              </div>

              <div className="features-grid">
                {service.features.map((feat, idx) => (
                  <div className="feature-card" key={idx}>
                    <div className="feature-card-top">
                      <div className="feature-number">
                        0{idx + 1}
                      </div>
                      <div className="feature-icon">
                        {feat.icon || "✚"}
                      </div>
                    </div>

                    <div className="feature-card-content">
                      <h3>{feat.title}</h3>
                      <p>{feat.description}</p>
                    </div>

                    <div className="feature-arrow">↗</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA SECTION */}
        <section className="healthcare-cta-section">
          <div className="container">
            <div className="healthcare-cta">
              <div className="cta-pattern" />

              <div className="cta-content">
                <div className="section-label light">03 — LET'S CONNECT</div>
                <h2 style={{ color: "#0F172A" }}>
                  Ready to build
                  <br />
                  <span style={{ color: "#00875A" }}>better healthcare?</span>
                </h2>
                <p style={{ color: "#475569" }}>
                  Let's create secure, scalable, and meaningful digital
                  experiences for the healthcare industry.
                </p>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="cta-btn"
                >
                  <span>Start a Conversation</span>
                  <span className="cta-btn-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </span>
                </button>
              </div>

              <div className="cta-symbol">
                <div className="cta-ring ring-one" />
                <div className="cta-ring ring-two" />
                <div className="cta-plus">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00875A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <EnquireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceTitle={service.name}
      />

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .healthcare-page {
          --bg: #FAFCFF;
          --bg-soft: #F1F5F9;
          --card: #FFFFFF;
          --teal: #00875A;
          --teal-dark: #006C48;
          --white: #0F172A;
          --muted: #64748B;
          background: var(--bg);
          color: var(--white);
          min-height: 100vh;
          overflow: hidden;
          position: relative;
          font-family: inherit;
        }

        .container {
          width: min(1180px, calc(100% - 48px));
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .page-glow {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          filter: blur(10px);
        }

        .page-glow-one {
          width: 500px;
          height: 500px;
          top: -180px;
          right: -150px;
          background: rgba(20, 184, 166, 0.08);
        }

        .page-glow-two {
          width: 400px;
          height: 400px;
          top: 900px;
          left: -250px;
          background: rgba(14, 165, 233, 0.05);
        }

        /* HERO */

        .healthcare-hero {
          position: relative;
          padding: 145px 0 0;
          background:
            radial-gradient(
              ellipse at 75% 25%,
              rgba(0, 135, 90, 0.06),
              transparent 42%
            ),
            linear-gradient(180deg, #F8FAFC 0%, #FAFCFF 100%);
          border-bottom: 1px solid #E2E8F0;
        }

        .healthcare-hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 55px;
          min-height: 620px;
        }

        .hero-content {
          padding-bottom: 55px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--teal);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
          margin-bottom: 27px;
        }

        .eyebrow-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--teal);
          box-shadow: 0 0 0 5px rgba(45, 212, 191, 0.12);
        }

        .hero-content h1 {
          font-size: clamp(38px, 4.2vw, 62px);
          line-height: 1.08;
          letter-spacing: -2.5px;
          font-weight: 800;
          margin: 0 0 25px;
          max-width: 650px;
        }

        .hero-description {
          color: var(--muted);
          font-size: 16px;
          line-height: 1.8;
          max-width: 530px;
          margin: 0 0 35px;
        }

        .hero-actions {
          display: flex;
          gap: 13px;
          flex-wrap: wrap;
        }

        .primary-btn,
        .secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          min-height: 53px;
          padding: 0 22px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s ease;
          font-family: inherit;
        }

        .primary-btn {
          background: #00875A;
          color: #FFFFFF;
          border: 1px solid #00875A;
          box-shadow: 0 8px 24px rgba(0, 135, 90, 0.28);
        }

        .primary-btn:hover {
          background: #006C48;
          color: #FFFFFF;
          border-color: #006C48;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 135, 90, 0.4);
        }

        .primary-btn span,
        .secondary-btn span,
        .cta-btn span {
          font-size: 18px;
        }

        .secondary-btn {
          color: #0F172A;
          border: 1px solid #CBD5E1;
          background: #FFFFFF;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
        }

        .secondary-btn:hover {
          border-color: #00875A;
          color: #00875A;
          background: #F4FBF7;
        }

        .hero-trust {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 46px;
        }

        .trust-avatars {
          display: flex;
          align-items: center;
        }

        .trust-avatars span {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px;
          height: 34px;
          margin-left: -7px;
          border-radius: 50%;
          background: #E3FCEF;
          border: 2px solid #FFFFFF;
          color: #00875A;
          font-size: 13px;
          font-weight: 800;
        }

        .trust-avatars span:first-child {
          margin-left: 0;
        }

        .hero-trust strong {
          display: block;
          font-size: 13px;
          color: #0F172A;
          font-weight: 700;
        }

        .hero-trust p {
          color: #64748B;
          font-size: 12px;
          margin: 3px 0 0;
        }

        /* DASHBOARD VISUAL */

        .hero-visual {
          position: relative;
          min-height: 540px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .visual-orbit {
          position: absolute;
          border: 1px dashed rgba(0, 135, 90, 0.15);
          border-radius: 50%;
          pointer-events: none;
        }

        .orbit-one {
          width: 590px;
          height: 590px;
        }

        .orbit-two {
          width: 430px;
          height: 430px;
          border-color: rgba(0, 135, 90, 0.12);
        }

        .medical-dashboard {
          width: 100%;
          max-width: 485px;
          padding: 23px;
          border-radius: 20px;
          position: relative;
          z-index: 2;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.06),
            0 2px 8px rgba(0, 0, 0, 0.03);
          transform: perspective(1200px) rotateY(-5deg) rotateX(2deg);
        }

        .dashboard-top,
        .dashboard-heading,
        .chart-heading,
        .dashboard-bottom,
        .mini-patient {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dashboard-brand {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .brand-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 31px;
          height: 31px;
          border-radius: 9px;
          background: #00875A;
          color: #FFFFFF;
          font-weight: 900;
        }

        .dashboard-brand strong {
          display: block;
          font-size: 14px;
          color: #0F172A;
          letter-spacing: -0.5px;
        }

        .dashboard-brand strong span {
          color: #00875A;
        }

        .dashboard-brand small {
          display: block;
          color: #64748B;
          font-size: 10px;
          margin-top: 2px;
        }

        .dashboard-status {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #00875A;
          font-size: 11px;
          font-weight: 700;
        }

        .dashboard-status span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #00875A;
          box-shadow: 0 0 8px rgba(0, 135, 90, 0.4);
        }

        .dashboard-heading {
          margin: 25px 0 16px;
        }

        .dashboard-heading small,
        .chart-heading small {
          display: block;
          color: #64748B;
          font-size: 11px;
          margin-bottom: 4px;
        }

        .dashboard-heading h3 {
          font-size: 17px;
          color: #0F172A;
          margin: 0;
          font-weight: 800;
          letter-spacing: -0.4px;
        }

        .dashboard-date {
          color: #475569;
          font-size: 11px;
          font-weight: 700;
          padding: 6px 12px;
          border: 1px solid #E2E8F0;
          background: #F8FAFC;
          border-radius: 6px;
        }

        .dashboard-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .dashboard-stat {
          padding: 15px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
        }

        .stat-icon {
          width: 27px;
          height: 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          margin-bottom: 11px;
          font-size: 12px;
        }

        .stat-icon.blue {
          background: #EFF6FF;
          color: #1D6FEB;
        }

        .stat-icon.green {
          background: #E3FCEF;
          color: #00875A;
        }

        .dashboard-stat small {
          display: block;
          color: #64748B;
          font-size: 11px;
          margin-bottom: 4px;
        }

        .dashboard-stat strong {
          font-size: 22px;
          color: #0F172A;
          letter-spacing: -0.5px;
          display: inline-block;
          margin-right: 6px;
        }

        .positive {
          color: #00875A;
          font-size: 10px;
          font-weight: 700;
        }

        .dashboard-chart {
          margin-top: 13px;
          padding: 16px;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          background: #F8FAFC;
        }

        .chart-heading strong {
          font-size: 13px;
          color: #0F172A;
          font-weight: 700;
        }

        .chart-heading > span {
          color: #64748B;
          font-size: 11px;
          font-weight: 600;
        }

        .chart-area {
          height: 120px;
          position: relative;
          margin-top: 17px;
        }

        .chart-lines {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .chart-lines span {
          width: 100%;
          height: 1px;
          background: #E2E8F0;
        }

        .chart-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        .chart-labels {
          display: flex;
          justify-content: space-between;
          color: #64748B;
          font-size: 10px;
          font-weight: 600;
          margin-top: 10px;
        }

        .dashboard-bottom {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #E2E8F0;
        }

        .mini-patient {
          justify-content: flex-start;
          gap: 9px;
        }

        .patient-avatar {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #E3FCEF;
          font-size: 15px;
        }

        .mini-patient strong {
          display: block;
          font-size: 11px;
          color: #0F172A;
          font-weight: 700;
        }

        .mini-patient small {
          display: block;
          color: #64748B;
          font-size: 10px;
          margin-top: 2px;
        }

        .verified-badge {
          font-size: 10px;
          font-weight: 700;
          color: #00875A;
          background: #E3FCEF;
          padding: 6px 10px;
          border-radius: 6px;
        }

        .floating-card {
          position: absolute;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 16px;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          backdrop-filter: blur(15px);
        }

        .floating-card-top {
          top: 40px;
          right: -5px;
        }

        .floating-card-bottom {
          bottom: 38px;
          left: -20px;
        }

        .floating-icon,
        .pulse-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 35px;
          height: 35px;
          border-radius: 9px;
          background: #E3FCEF;
          color: #00875A;
          font-size: 16px;
        }

        .floating-card strong {
          display: block;
          color: #0F172A;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }

        .floating-card small {
          display: block;
          color: #64748B;
          font-size: 10px;
          margin-top: 2px;
          white-space: nowrap;
        }

        .check-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #E3FCEF;
          color: #00875A;
          font-size: 10px;
          font-weight: 800;
          margin-left: 5px;
        }

        .hero-bottom-strip {
          display: flex;
          align-items: center;
          gap: 25px;
          padding: 27px 0;
          border-top: 1px solid #E2E8F0;
          color: #00875A;
          font-size: 11px;
          letter-spacing: 1.5px;
          font-weight: 800;
        }

        .strip-line {
          height: 1px;
          width: 60px;
          background: #CBD5E1;
        }

        .strip-items {
          display: flex;
          gap: 25px;
          color: #475569;
          letter-spacing: 0;
          font-size: 13px;
          font-weight: 600;
        }

        /* OVERVIEW */

        .overview-section {
          padding: 125px 0;
          background: #F8FAFC;
          border-top: 1px solid #E2E8F0;
        }

        .section-label {
          color: var(--teal);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.8px;
          margin-bottom: 27px;
        }

        .overview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 90px;
        }

        .overview-grid h2,
        .features-header h2 {
          font-size: clamp(32px, 3.5vw, 50px);
          line-height: 1.12;
          letter-spacing: -2px;
          margin: 0;
          font-weight: 800;
          color: #0F172A;
        }

        .overview-grid h2 span,
        .features-header h2 span {
          color: #64748B;
          display: block;
        }

        .overview-content > p {
          color: #334155;
          font-size: 15px;
          line-height: 1.9;
          margin: 0;
        }

        .overview-line {
          height: 1px;
          background: #E2E8F0;
          margin: 35px 0 25px;
        }

        .overview-points {
          display: flex;
          flex-direction: column;
          gap: 17px;
        }

        .overview-points > div {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .overview-points span {
          color: var(--teal);
          font-size: 10px;
          font-weight: 800;
        }

        .overview-points strong {
          color: #0F172A;
          font-size: 13px;
          font-weight: 600;
        }

        /* FEATURES */

        .features-section {
          padding: 125px 0;
          background: #FFFFFF;
        }

        .features-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 50px;
          margin-bottom: 55px;
        }

        .features-header .section-label {
          margin-bottom: 23px;
        }

        .features-header > p {
          color: #64748B;
          font-size: 14px;
          line-height: 1.8;
          max-width: 330px;
          margin: 0 0 5px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 17px;
        }

        .feature-card {
          position: relative;
          min-height: 300px;
          padding: 25px;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          background: #F8FAFC;
          box-shadow: 0 4px 12px rgba(0,0,0,0.03);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .feature-card::after {
          content: "";
          position: absolute;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: rgba(0, 135, 90, 0.04);
          right: -60px;
          bottom: -60px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          border-color: #00875A;
          background: #FFFFFF;
        }

        .feature-card:hover::after {
          transform: scale(1.8);
          background: rgba(45, 212, 191, 0.07);
        }

        .feature-card-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .feature-number {
          color: #55737d;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .feature-icon {
          width: 47px;
          height: 47px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          color: var(--teal);
          background: rgba(45, 212, 191, 0.08);
          border: 1px solid rgba(45, 212, 191, 0.1);
          font-size: 20px;
        }

        .feature-card-content {
          position: absolute;
          left: 25px;
          right: 25px;
          bottom: 25px;
          z-index: 1;
        }

        .feature-card h3 {
          color: #0F172A;
          font-size: 18px;
          line-height: 1.3;
          margin: 0 0 12px;
          font-weight: 700;
          letter-spacing: -0.4px;
        }

        .feature-card p {
          color: #64748B;
          font-size: 12px;
          line-height: 1.8;
          margin: 0;
          max-width: 280px;
        }

        .feature-arrow {
          position: absolute;
          top: 25px;
          right: 25px;
          opacity: 0;
          color: var(--teal);
          font-size: 18px;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-arrow {
          opacity: 1;
        }

        /* CTA */

        .healthcare-cta-section {
          padding: 0 0 90px;
          background: #FAFCFF;
        }

        .healthcare-cta {
          position: relative;
          overflow: hidden;
          min-height: 380px;
          padding: 60px;
          border-radius: 28px;
          background: linear-gradient(135deg, #060b13 0%, #0a1322 50%, #060a12 100%);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 50px rgba(6, 11, 19, 0.35);
        }

        .cta-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.25) 1px,
            transparent 1px
          );
          background-size: 24px 24px;
          mask-image: linear-gradient(
            to right,
            black,
            transparent 70%
          );
        }

        .cta-content {
          position: relative;
          z-index: 2;
          max-width: 570px;
        }

        .section-label.light {
          color: #00875A;
          background: rgba(0, 135, 90, 0.12);
          border: 1px solid rgba(0, 135, 90, 0.25);
          display: inline-block;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
        }

        .cta-content h2 {
          font-size: clamp(34px, 4vw, 48px);
          line-height: 1.15;
          letter-spacing: -0.03em;
          font-weight: 800;
          color: #FFFFFF !important;
          margin: 0 0 16px;
        }

        .cta-content h2 span {
          color: #00875A !important;
        }

        .cta-content p {
          color: #CBD5E1 !important;
          font-size: 15px;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 0 28px;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 14px 28px;
          border-radius: 999px;
          border: none;
          background: #00875A;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          box-shadow: 0 8px 24px rgba(0, 135, 90, 0.28);
          transition: all 0.25s ease;
        }

        .cta-btn:hover {
          background: #006C48;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(0, 135, 90, 0.4);
        }

        .cta-btn-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .cta-symbol {
          position: absolute;
          width: 380px;
          height: 380px;
          right: -30px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cta-ring {
          position: absolute;
          border: 1px solid rgba(0, 135, 90, 0.25);
          border-radius: 50%;
        }

        .ring-one {
          width: 310px;
          height: 310px;
        }

        .ring-two {
          width: 210px;
          height: 210px;
          border-color: rgba(0, 135, 90, 0.35);
        }

        .cta-plus {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 70px;
          height: 70px;
          border-radius: 20px;
          background: rgba(0, 135, 90, 0.15);
          border: 1px solid rgba(0, 135, 90, 0.35);
          color: #00875A;
          font-size: 32px;
          box-shadow: 0 0 50px rgba(0, 135, 90, 0.2);
        }

        .healthcare-footer {
          padding: 28px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          color: #4d6974;
          font-size: 9px;
          letter-spacing: 1.5px;
        }

        .healthcare-footer .container {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        /* RESPONSIVE */

        @media (max-width: 1024px) {
          .healthcare-hero-grid {
            gap: 25px;
          }

          .medical-dashboard {
            transform: none;
          }

          .floating-card-top {
            right: -15px;
          }

          .floating-card-bottom {
            left: -10px;
          }

          .overview-grid {
            gap: 45px;
          }

          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .container {
            width: min(100% - 36px, 600px);
          }

          .healthcare-hero {
            padding-top: 110px;
          }

          .healthcare-hero-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .hero-content {
            padding-bottom: 15px;
          }

          .hero-content h1 {
            font-size: 42px;
            letter-spacing: -1.8px;
          }

          .hero-description {
            font-size: 14px;
          }

          .hero-visual {
            min-height: 480px;
          }

          .medical-dashboard {
            max-width: 470px;
          }

          .orbit-one {
            width: 450px;
            height: 450px;
          }

          .orbit-two {
            width: 350px;
            height: 350px;
          }

          .floating-card-top {
            top: 5px;
            right: -3px;
          }

          .floating-card-bottom {
            bottom: 5px;
            left: -3px;
          }

          .hero-bottom-strip {
            flex-wrap: wrap;
            gap: 15px;
          }

          .strip-line {
            display: none;
          }

          .strip-items {
            width: 100%;
            justify-content: space-between;
          }

          .overview-section,
          .features-section {
            padding: 80px 0;
          }

          .overview-grid {
            grid-template-columns: 1fr;
            gap: 35px;
          }

          .overview-grid h2,
          .features-header h2 {
            font-size: 38px;
          }

          .features-header {
            display: block;
            margin-bottom: 35px;
          }

          .features-header > p {
            margin-top: 25px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .feature-card {
            min-height: 260px;
          }

          .healthcare-cta {
            padding: 45px 30px;
            min-height: 430px;
          }

          .cta-symbol {
            width: 260px;
            height: 260px;
            right: -100px;
            bottom: -40px;
            top: auto;
            transform: none;
            opacity: 0.65;
          }

          .ring-one {
            width: 220px;
            height: 220px;
          }

          .ring-two {
            width: 150px;
            height: 150px;
          }

          .healthcare-footer .container {
            gap: 15px;
            flex-direction: column;
            align-items: flex-start;
          }
        }

        @media (max-width: 480px) {
          .hero-content h1 {
            font-size: 35px;
          }

          .hero-actions {
            flex-direction: column;
          }

          .primary-btn,
          .secondary-btn {
            width: 100%;
          }

          .hero-visual {
            min-height: 420px;
          }

          .medical-dashboard {
            padding: 15px;
            border-radius: 15px;
          }

          .dashboard-heading {
            margin-top: 25px;
          }

          .dashboard-stat strong {
            font-size: 19px;
          }

          .floating-card {
            transform: scale(0.82);
          }

          .floating-card-top {
            right: -35px;
          }

          .floating-card-bottom {
            left: -35px;
          }

          .hero-trust {
            margin-top: 30px;
          }

          .strip-items {
            gap: 10px;
            font-size: 9px;
          }

          .overview-grid h2,
          .features-header h2 {
            font-size: 32px;
          }

          .healthcare-cta {
            padding: 38px 24px;
          }

          .cta-content h2 {
            font-size: 34px;
          }
        }
      `}</style>
    </>
  );
}