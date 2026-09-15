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
                <h2>
                  Ready to build
                  <br />
                  <span>better healthcare?</span>
                </h2>
                <p>
                  Let's create secure, scalable, and meaningful digital
                  experiences for the healthcare industry.
                </p>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="cta-btn"
                >
                  Start a Conversation <span>↗</span>
                </button>
              </div>

              <div className="cta-symbol">
                <div className="cta-ring ring-one" />
                <div className="cta-ring ring-two" />
                <div className="cta-plus">✚</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="healthcare-footer">
          <div className="container">
            <span>HEALTHCARE TECHNOLOGY</span>
            <span>© {new Date().getFullYear()} — ALL RIGHTS RESERVED</span>
          </div>
        </footer>
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
          --bg: #06141c;
          --bg-soft: #0a202b;
          --card: #0d2632;
          --teal: #2dd4bf;
          --teal-dark: #14b8a6;
          --white: #f8fafc;
          --muted: #8da4ae;
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
              rgba(20, 184, 166, 0.1),
              transparent 42%
            ),
            linear-gradient(180deg, #071923 0%, #06141c 100%);
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
          background: var(--teal);
          color: #06201f;
          border: 1px solid var(--teal);
          box-shadow: 0 12px 35px rgba(45, 212, 191, 0.15);
        }

        .primary-btn:hover {
          background: #5eead4;
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(45, 212, 191, 0.25);
        }

        .primary-btn span,
        .secondary-btn span,
        .cta-btn span {
          font-size: 18px;
        }

        .secondary-btn {
          color: #d8e5e8;
          border: 1px solid rgba(148, 163, 184, 0.2);
          background: rgba(255, 255, 255, 0.025);
        }

        .secondary-btn:hover {
          border-color: rgba(45, 212, 191, 0.5);
          background: rgba(45, 212, 191, 0.06);
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
          width: 31px;
          height: 31px;
          margin-left: -7px;
          border-radius: 50%;
          background: #173744;
          border: 2px solid #06141c;
          color: var(--teal);
          font-size: 13px;
        }

        .trust-avatars span:first-child {
          margin-left: 0;
        }

        .hero-trust strong {
          display: block;
          font-size: 12px;
          color: #d6e4e7;
          font-weight: 700;
        }

        .hero-trust p {
          color: #718994;
          font-size: 11px;
          margin: 5px 0 0;
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
          border: 1px solid rgba(45, 212, 191, 0.1);
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
          border-color: rgba(45, 212, 191, 0.08);
        }

        .medical-dashboard {
          width: 100%;
          max-width: 485px;
          padding: 23px;
          border-radius: 20px;
          position: relative;
          z-index: 2;
          background: linear-gradient(
            145deg,
            rgba(21, 55, 66, 0.96),
            rgba(8, 29, 39, 0.98)
          );
          border: 1px solid rgba(133, 226, 214, 0.17);
          box-shadow:
            0 30px 80px rgba(0, 0, 0, 0.35),
            inset 0 1px 0 rgba(255, 255, 255, 0.04);
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
          background: var(--teal);
          color: #06302e;
          font-weight: 900;
        }

        .dashboard-brand strong {
          display: block;
          font-size: 14px;
          letter-spacing: -0.5px;
        }

        .dashboard-brand strong span {
          color: var(--teal);
        }

        .dashboard-brand small {
          display: block;
          color: #6f8b95;
          font-size: 8px;
          margin-top: 3px;
        }

        .dashboard-status {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #86a5aa;
          font-size: 9px;
        }

        .dashboard-status span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          box-shadow: 0 0 8px #4ade80;
        }

        .dashboard-heading {
          margin: 35px 0 20px;
        }

        .dashboard-heading small,
        .chart-heading small {
          display: block;
          color: #6d8993;
          font-size: 10px;
          margin-bottom: 6px;
        }

        .dashboard-heading h3 {
          font-size: 16px;
          margin: 0;
          font-weight: 700;
          letter-spacing: -0.4px;
        }

        .dashboard-date {
          color: #8ca9b1;
          font-size: 10px;
          padding: 8px 11px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 6px;
        }

        .dashboard-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .dashboard-stat {
          padding: 15px;
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
        }

        .stat-icon {
          width: 27px;
          height: 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          margin-bottom: 13px;
          font-size: 12px;
        }

        .stat-icon.blue {
          background: rgba(56, 189, 248, 0.12);
          color: #38bdf8;
        }

        .stat-icon.green {
          background: rgba(45, 212, 191, 0.12);
          color: var(--teal);
        }

        .dashboard-stat small {
          display: block;
          color: #78949d;
          font-size: 9px;
          margin-bottom: 6px;
        }

        .dashboard-stat strong {
          font-size: 23px;
          letter-spacing: -1px;
          display: inline-block;
          margin-right: 8px;
        }

        .positive {
          color: #4ade80;
          font-size: 9px;
        }

        .dashboard-chart {
          margin-top: 13px;
          padding: 17px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.025);
        }

        .chart-heading strong {
          font-size: 12px;
          font-weight: 700;
        }

        .chart-heading > span {
          color: #66828d;
          font-size: 9px;
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
          background: rgba(255, 255, 255, 0.055);
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
          color: #5d7984;
          font-size: 8px;
          margin-top: 10px;
        }

        .dashboard-bottom {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
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
          background: #183d49;
          font-size: 15px;
        }

        .mini-patient strong {
          display: block;
          font-size: 10px;
          color: #c8dadd;
        }

        .mini-patient small {
          display: block;
          color: #68848e;
          font-size: 8px;
          margin-top: 3px;
        }

        .verified-badge {
          font-size: 8px;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.08);
          padding: 6px 8px;
          border-radius: 5px;
        }

        .floating-card {
          position: absolute;
          z-index: 4;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 15px;
          background: rgba(12, 37, 48, 0.95);
          border: 1px solid rgba(100, 200, 190, 0.15);
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
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
          background: rgba(45, 212, 191, 0.1);
          color: var(--teal);
          font-size: 16px;
        }

        .floating-card strong {
          display: block;
          color: #d9e8e9;
          font-size: 10px;
          white-space: nowrap;
        }

        .floating-card small {
          display: block;
          color: #6d8993;
          font-size: 8px;
          margin-top: 4px;
          white-space: nowrap;
        }

        .check-mark {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 17px;
          height: 17px;
          border-radius: 50%;
          background: rgba(74, 222, 128, 0.12);
          color: #4ade80;
          font-size: 9px;
          margin-left: 5px;
        }

        .hero-bottom-strip {
          display: flex;
          align-items: center;
          gap: 25px;
          padding: 27px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.07);
          color: #55717c;
          font-size: 9px;
          letter-spacing: 1.5px;
          font-weight: 700;
        }

        .strip-line {
          height: 1px;
          width: 60px;
          background: rgba(255, 255, 255, 0.12);
        }

        .strip-items {
          display: flex;
          gap: 25px;
          color: #76929b;
          letter-spacing: 0;
          font-size: 11px;
          font-weight: 500;
        }

        /* OVERVIEW */

        .overview-section {
          padding: 125px 0;
          background: #081b25;
          border-top: 1px solid rgba(255, 255, 255, 0.025);
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
        }

        .overview-grid h2 span,
        .features-header h2 span {
          color: #607e88;
          display: block;
        }

        .overview-content > p {
          color: #91a9b1;
          font-size: 15px;
          line-height: 1.9;
          margin: 0;
        }

        .overview-line {
          height: 1px;
          background: rgba(255, 255, 255, 0.08);
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
          color: #c2d2d6;
          font-size: 13px;
          font-weight: 600;
        }

        /* FEATURES */

        .features-section {
          padding: 125px 0;
          background: #06141c;
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
          color: #78939d;
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
          border: 1px solid rgba(125, 190, 190, 0.1);
          border-radius: 14px;
          background: linear-gradient(
            145deg,
            rgba(17, 48, 59, 0.75),
            rgba(9, 28, 37, 0.6)
          );
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .feature-card::after {
          content: "";
          position: absolute;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: rgba(45, 212, 191, 0.04);
          right: -60px;
          bottom: -60px;
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          border-color: rgba(45, 212, 191, 0.35);
          background: linear-gradient(
            145deg,
            rgba(20, 59, 68, 0.9),
            rgba(9, 30, 39, 0.9)
          );
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
          color: #e3eeee;
          font-size: 18px;
          line-height: 1.3;
          margin: 0 0 12px;
          font-weight: 700;
          letter-spacing: -0.4px;
        }

        .feature-card p {
          color: #79949e;
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
          background: #06141c;
        }

        .healthcare-cta {
          position: relative;
          overflow: hidden;
          min-height: 390px;
          padding: 70px;
          border-radius: 20px;
          background:
            radial-gradient(
              circle at 90% 50%,
              rgba(45, 212, 191, 0.15),
              transparent 40%
            ),
            linear-gradient(115deg, #0d303b, #0a222d);
          border: 1px solid rgba(45, 212, 191, 0.14);
        }

        .cta-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.18;
          background-image: radial-gradient(
            rgba(255, 255, 255, 0.2) 1px,
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
          color: #65daca;
          margin-bottom: 23px;
        }

        .cta-content h2 {
          font-size: clamp(34px, 4vw, 53px);
          line-height: 1.1;
          letter-spacing: -2px;
          margin: 0 0 20px;
        }

        .cta-content h2 span {
          color: #65939c;
        }

        .cta-content p {
          color: #89a8b0;
          font-size: 14px;
          line-height: 1.8;
          max-width: 430px;
          margin: 0 0 30px;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 35px;
          padding: 15px 20px;
          border-radius: 8px;
          border: 1px solid var(--teal);
          background: var(--teal);
          color: #06201f;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.25s ease;
        }

        .cta-btn:hover {
          background: #5eead4;
          transform: translateY(-2px);
        }

        .cta-symbol {
          position: absolute;
          width: 400px;
          height: 400px;
          right: -45px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cta-ring {
          position: absolute;
          border: 1px solid rgba(45, 212, 191, 0.15);
          border-radius: 50%;
        }

        .ring-one {
          width: 310px;
          height: 310px;
        }

        .ring-two {
          width: 210px;
          height: 210px;
          border-color: rgba(45, 212, 191, 0.25);
        }

        .cta-plus {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 25px;
          background: rgba(45, 212, 191, 0.1);
          border: 1px solid rgba(45, 212, 191, 0.3);
          color: var(--teal);
          font-size: 35px;
          box-shadow: 0 0 70px rgba(45, 212, 191, 0.1);
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