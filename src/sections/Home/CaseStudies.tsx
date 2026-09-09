"use client";

import Link from "next/link";

const caseStudiesData = [
  {
    id: "01",
    category: "FINTECH",
    categoryTheme: "fintech",
    title: "Building the future of digital banking",
    description:
      "A secure, scalable and intuitive platform used by 1M+ customers across India.",
    link: "/case-studies/fintech",
    isDark: false,
    metrics: [
      { value: "3x", label: "User Growth" },
      { value: "40%", label: "Faster Transactions" },
      { value: "99.9%", label: "Platform Uptime" },
    ],
  },
  {
    id: "02",
    category: "HEALTHCARE",
    categoryTheme: "healthcare",
    title: "Smarter care for healthier tomorrows",
    description:
      "A HIPAA-compliant patient portal with automated workflows and real-time care coordination.",
    link: "/case-studies/healthcare",
    isDark: true,
    metrics: [
      { value: "60%", label: "Faster Onboarding" },
      { value: "2x", label: "Operational Efficiency" },
      { value: "4.8/5", label: "User Satisfaction" },
    ],
  },
  {
    id: "03",
    category: "SAAS",
    categoryTheme: "saas",
    title: "Scaling a product for global markets",
    description:
      "We helped GlobalPay scale their payment infrastructure to support multi-currency transactions worldwide.",
    link: "/case-studies/saas",
    isDark: false,
    metrics: [
      { value: "5x", label: "Revenue Growth" },
      { value: "70%", label: "Fraud Reduction" },
      { value: "50+", label: "Countries Supported" },
    ],
  },
];

export default function CaseStudies() {
  return (
    <section className="section tp-case-studies">
      <div className="container tp-case-studies__container">
        
        {/* HEADER TOP */}
        <div className="tp-case-studies__header reveal-down">
          <div className="tp-case-studies__header-content text-center">
            <div className="tp-case-studies__eyebrow">
              <span className="tp-eyebrow-line"></span>
              <span>TRUSTED PARTNERSHIPS</span>
              <span className="tp-eyebrow-line"></span>
            </div>

            <h2 className="tp-case-studies__title">
              Real businesses. <span className="tp-text-highlight">Real impact.</span>
            </h2>

            <p className="tp-case-studies__subtitle">
              From ambitious startups to global enterprises, we build scalable solutions that solve real-world problems.
            </p>
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="tp-cards-grid reveal-zoom">
          
          {/* CARD 1: FINTECH */}
          <article className="tp-card tp-card--light tp-card--fintech">
            <div className="tp-card__top">
              <span className="tp-badge tp-badge--fintech">FINTECH</span>
              <span className="tp-card__number">01</span>
            </div>

            <div className="tp-card__body">
              <h3 className="tp-card__title">Building the future of digital banking</h3>
              <p className="tp-card__desc">
                A secure, scalable and intuitive platform used by 1M+ customers across India.
              </p>

              <Link href="/case-studies" className="tp-card__action">
                <span className="tp-action-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <span>View Case Study</span>
              </Link>
            </div>

            {/* PHONE MOCKUP VISUAL */}
            <div className="tp-card__visual tp-card__visual--phone">
              <div className="tp-phone-glow"></div>
              <div className="tp-phone">
                <div className="tp-phone__notch"></div>
                <div className="tp-phone__screen">
                  {/* Phone Header */}
                  <div className="tp-phone__header">
                    <div>
                      <span className="tp-phone__greeting">Good Morning,</span>
                      <strong className="tp-phone__name">Aarav</strong>
                    </div>
                    <div className="tp-phone__avatar">
                      <span>👤</span>
                    </div>
                  </div>

                  {/* Balance Card */}
                  <div className="tp-phone__balance-card">
                    <span className="tp-phone__balance-label">Total Balance</span>
                    <div className="tp-phone__balance-val">₹ 2,48,930</div>
                    <span className="tp-phone__balance-badge">▲ 12.3% this month</span>
                  </div>

                  {/* Actions Row */}
                  <div className="tp-phone__actions">
                    <div className="tp-phone__act-btn">
                      <span className="tp-act-icon">↑</span>
                      <span>Send</span>
                    </div>
                    <div className="tp-phone__act-btn">
                      <span className="tp-act-icon">↓</span>
                      <span>Receive</span>
                    </div>
                    <div className="tp-phone__act-btn">
                      <span className="tp-act-icon">✕</span>
                      <span>Invest</span>
                    </div>
                    <div className="tp-phone__act-btn">
                      <span className="tp-act-icon">••</span>
                      <span>More</span>
                    </div>
                  </div>

                  {/* Recent Transactions */}
                  <div className="tp-phone__tx-section">
                    <span className="tp-tx-title">Recent Transactions</span>
                    
                    <div className="tp-tx-item">
                      <div className="tp-tx-logo tp-tx-logo--zomato">z</div>
                      <div className="tp-tx-info">
                        <strong>Zomato</strong>
                        <small>Aug 12, 2024</small>
                      </div>
                      <span className="tp-tx-amount">-₹1,240</span>
                    </div>

                    <div className="tp-tx-item">
                      <div className="tp-tx-logo tp-tx-logo--spotify">🟢</div>
                      <div className="tp-tx-info">
                        <strong>Spotify</strong>
                        <small>Aug 11, 2024</small>
                      </div>
                      <span className="tp-tx-amount">-₹299</span>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="tp-phone__nav">
                    <span className="active">🏠</span>
                    <span>💳</span>
                    <span>📊</span>
                    <span>👤</span>
                  </div>
                </div>
              </div>
            </div>

            {/* METRICS FOOTER */}
            <div className="tp-card__footer">
              <div className="tp-metric">
                <span className="tp-metric__val">3x</span>
                <span className="tp-metric__lbl">User Growth</span>
              </div>
              <div className="tp-metric">
                <span className="tp-metric__val">40%</span>
                <span className="tp-metric__lbl">Faster Transactions</span>
              </div>
              <div className="tp-metric">
                <span className="tp-metric__val">99.9%</span>
                <span className="tp-metric__lbl">Platform Uptime</span>
              </div>
            </div>
          </article>

          {/* CARD 2: HEALTHCARE */}
          <article className="tp-card tp-card--dark tp-card--healthcare">
            <div className="tp-card__top">
              <span className="tp-badge tp-badge--healthcare">HEALTHCARE</span>
              <span className="tp-card__number">02</span>
            </div>

            <div className="tp-card__body">
              <h3 className="tp-card__title">Smarter care for healthier tomorrows</h3>
              <p className="tp-card__desc">
                A HIPAA-compliant patient portal with automated workflows and real-time care coordination.
              </p>

              <Link href="/case-studies" className="tp-card__action">
                <span className="tp-action-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <span>View Case Study</span>
              </Link>
            </div>

            {/* WATCH MOCKUP VISUAL */}
            <div className="tp-card__visual tp-card__visual--watch">
              <div className="tp-watch-wrapper">
                <div className="tp-watch">
                  <div className="tp-watch__screen">
                    <div className="tp-watch__heart-icon">❤️</div>
                    <div className="tp-watch__bpm">
                      <strong>72</strong>
                      <span>bpm</span>
                    </div>
                    {/* Pulsing ECG Wave SVG */}
                    <div className="tp-watch__ecg">
                      <svg viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M0 15 H35 L40 5 L45 25 L50 10 L55 20 L60 15 H120"
                          stroke="#14b8a6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Cinematic Rocky Terrain Base */}
                <div className="tp-terrain-base">
                  <svg viewBox="0 0 400 120" fill="none" preserveAspectRatio="none">
                    <path d="M0 120 L0 60 Q 60 40 120 70 Q 200 90 280 40 Q 340 20 400 65 L400 120 Z" fill="#0f172a" opacity="0.9" />
                    <path d="M0 120 L0 80 Q 80 50 160 85 Q 240 110 320 60 L400 90 L400 120 Z" fill="#020617" opacity="0.95" />
                  </svg>
                </div>
              </div>
            </div>

            {/* METRICS FOOTER */}
            <div className="tp-card__footer">
              <div className="tp-metric">
                <span className="tp-metric__val">60%</span>
                <span className="tp-metric__lbl">Faster Onboarding</span>
              </div>
              <div className="tp-metric">
                <span className="tp-metric__val">2x</span>
                <span className="tp-metric__lbl">Operational Efficiency</span>
              </div>
              <div className="tp-metric">
                <span className="tp-metric__val">4.8/5</span>
                <span className="tp-metric__lbl">User Satisfaction</span>
              </div>
            </div>
          </article>

          {/* CARD 3: SAAS */}
          <article className="tp-card tp-card--light tp-card--saas">
            <div className="tp-card__top">
              <span className="tp-badge tp-badge--saas">SAAS</span>
              <span className="tp-card__number">03</span>
            </div>

            <div className="tp-card__body">
              <h3 className="tp-card__title">Scaling a product for global markets</h3>
              <p className="tp-card__desc">
                We helped GlobalPay scale their payment infrastructure to support multi-currency transactions worldwide.
              </p>

              <Link href="/case-studies" className="tp-card__action">
                <span className="tp-action-circle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <span>View Case Study</span>
              </Link>
            </div>

            {/* CREDIT CARD & GLOBE MOCKUP VISUAL */}
            <div className="tp-card__visual tp-card__visual--saas">
              <div className="tp-globe-bg">
                <svg viewBox="0 0 300 200" fill="none" className="tp-globe-svg">
                  <circle cx="150" cy="100" r="80" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" opacity="0.6"/>
                  <ellipse cx="150" cy="100" rx="80" ry="30" stroke="#94a3b8" strokeWidth="1" opacity="0.4"/>
                  <ellipse cx="150" cy="100" rx="40" ry="80" stroke="#94a3b8" strokeWidth="1" opacity="0.4"/>
                  <circle cx="110" cy="80" r="3" fill="#2563eb"/>
                  <circle cx="190" cy="120" r="3" fill="#2563eb"/>
                  <circle cx="170" cy="70" r="2.5" fill="#3b82f6"/>
                </svg>
              </div>

              <div className="tp-credit-card">
                <div className="tp-cc-header">
                  <div className="tp-cc-brand">
                    <span className="tp-cc-star">✪</span>
                    <strong>GlobalPay</strong>
                  </div>
                  <div className="tp-cc-signal">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                      <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                      <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                      <line x1="12" y1="20" x2="12.01" y2="20"></line>
                    </svg>
                  </div>
                </div>

                <div className="tp-cc-chip"></div>

                <div className="tp-cc-number">•••• 4582</div>
              </div>
            </div>

            {/* METRICS FOOTER */}
            <div className="tp-card__footer">
              <div className="tp-metric">
                <span className="tp-metric__val">5x</span>
                <span className="tp-metric__lbl">Revenue Growth</span>
              </div>
              <div className="tp-metric">
                <span className="tp-metric__val">70%</span>
                <span className="tp-metric__lbl">Fraud Reduction</span>
              </div>
              <div className="tp-metric">
                <span className="tp-metric__val">50+</span>
                <span className="tp-metric__lbl">Countries Supported</span>
              </div>
            </div>
          </article>

        </div>

        {/* BOTTOM CENTER CTA BUTTON */}
        <div className="tp-case-studies__footer text-center">
          <Link href="/case-studies" className="tp-btn-pill">
            <span>View All Case Studies</span>
            <span className="tp-btn-arrow">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}


