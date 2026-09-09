"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

function TypewriterCodeVisual({ service }: { service: (typeof coreServices)[0] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [typedChars, setTypedChars] = useState(0);
  const [isStarted, setIsStarted] = useState(false);

  const line1 = `const service = "${service.slug}";`;
  const line2 = `import { scaleSystem } from "@taapti/core";`;
  const cm = `// Production Capabilities`;
  const cap1 = `01  ${service.capabilities[0]}: true`;
  const cap2 = `02  ${service.capabilities[1]}: true`;
  const cap3 = `03  ${service.capabilities[2]}: true`;

  const totalLength = line1.length + line2.length + cm.length + cap1.length + cap2.length + cap3.length + 10;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isStarted) return;
    if (typedChars >= totalLength) return;

    const timer = setTimeout(() => {
      setTypedChars((prev) => prev + 1);
    }, 18);

    return () => clearTimeout(timer);
  }, [isStarted, typedChars, totalLength]);

  let count = typedChars;
  const l1Len = Math.min(count, line1.length);
  count = Math.max(0, count - line1.length - 2);

  const l2Len = Math.min(count, line2.length);
  count = Math.max(0, count - line2.length - 2);

  const cmLen = Math.min(count, cm.length);
  count = Math.max(0, count - cm.length - 2);

  const c1Len = Math.min(count, cap1.length);
  count = Math.max(0, count - cap1.length - 1);

  const c2Len = Math.min(count, cap2.length);
  count = Math.max(0, count - cap2.length - 1);

  const c3Len = Math.min(count, cap3.length);

  return (
    <div ref={containerRef} className="srv-visual-card">
      <div className="srv-visual-card__bar">
        <span className="dot dot--red" />
        <span className="dot dot--yellow" />
        <span className="dot dot--green" />
        <span className="title">{service.title} Module</span>
      </div>
      <div className="srv-visual-card__body">
        <div className="srv-visual-code">
          {l1Len > 0 && (
            <div>
              <span className="kw">{"const ".slice(0, Math.min(l1Len, 6))}</span>
              {l1Len > 6 && <span>{"service = ".slice(0, Math.min(l1Len - 6, 10))}</span>}
              {l1Len > 16 && <span className="str">{`"${service.slug}";`.slice(0, Math.min(l1Len - 16, line1.length - 16))}</span>}
              {typedChars <= line1.length + 2 && <span className="srv-typing-cursor" />}
            </div>
          )}

          {l2Len > 0 && (
            <div>
              <span className="kw">{"import ".slice(0, Math.min(l2Len, 7))}</span>
              {l2Len > 7 && <span>{"{ ".slice(0, Math.min(l2Len - 7, 2))}</span>}
              {l2Len > 9 && <span className="fn">{"scaleSystem ".slice(0, Math.min(l2Len - 9, 12))}</span>}
              {l2Len > 21 && <span>{"} ".slice(0, Math.min(l2Len - 21, 2))}</span>}
              {l2Len > 23 && <span className="kw">{"from ".slice(0, Math.min(l2Len - 23, 5))}</span>}
              {l2Len > 28 && <span className="str">{`"@taapti/core";`.slice(0, Math.min(l2Len - 28, line2.length - 28))}</span>}
              {typedChars > line1.length + 2 && typedChars <= line1.length + line2.length + 4 && <span className="srv-typing-cursor" />}
            </div>
          )}

          {cmLen > 0 && <br />}

          {cmLen > 0 && (
            <div>
              <span className="cm">{cm.slice(0, cmLen)}</span>
              {typedChars > line1.length + line2.length + 4 && typedChars <= line1.length + line2.length + cm.length + 6 && <span className="srv-typing-cursor" />}
            </div>
          )}

          {c1Len > 0 && (
            <div className="srv-code-line">
              <span className="num">01</span>
              <span className="key">{service.capabilities[0]}:&nbsp;</span>
              {c1Len > cap1.length - 4 && (
                <span className="val">{"true".slice(0, c1Len - (cap1.length - 4))}</span>
              )}
              {typedChars > line1.length + line2.length + cm.length + 6 && typedChars <= line1.length + line2.length + cm.length + cap1.length + 7 && <span className="srv-typing-cursor" />}
            </div>
          )}

          {c2Len > 0 && (
            <div className="srv-code-line">
              <span className="num">02</span>
              <span className="key">{service.capabilities[1]}:&nbsp;</span>
              {c2Len > cap2.length - 4 && (
                <span className="val">{"true".slice(0, c2Len - (cap2.length - 4))}</span>
              )}
              {typedChars > line1.length + line2.length + cm.length + cap1.length + 7 && typedChars <= line1.length + line2.length + cm.length + cap1.length + cap2.length + 8 && <span className="srv-typing-cursor" />}
            </div>
          )}

          {c3Len > 0 && (
            <div className="srv-code-line">
              <span className="num">03</span>
              <span className="key">{service.capabilities[2]}:&nbsp;</span>
              {c3Len > cap3.length - 4 && (
                <span className="val">{"true".slice(0, c3Len - (cap3.length - 4))}</span>
              )}
              {typedChars > line1.length + line2.length + cm.length + cap1.length + cap2.length + 8 && typedChars < totalLength && <span className="srv-typing-cursor" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function EngagementSequentialTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && activeStep === 0) {
          setActiveStep(1);
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [activeStep]);

  useEffect(() => {
    if (activeStep > 0 && activeStep < 7) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, 750); // Slower, elegant pacing!

      return () => clearTimeout(timer);
    }
  }, [activeStep]);

  return (
    <div ref={containerRef} className="srv-eng-timeline-wrapper">
      {/* SVG Masks for Animated Dashed Line Draw */}
      <svg className="srv-eng-svg-wave" viewBox="0 0 1200 60" fill="none">
        <defs>
          <mask id="wm1">
            <path
              className={`srv-mask-path ${activeStep >= 2 ? "is-drawn" : ""}`}
              d="M 167 40 C 250 15, 340 15, 426 40"
              stroke="#ffffff"
              strokeWidth="10"
              fill="none"
            />
          </mask>
          <mask id="wm2">
            <path
              className={`srv-mask-path ${activeStep >= 4 ? "is-drawn" : ""}`}
              d="M 470 40 C 550 15, 650 15, 730 40"
              stroke="#ffffff"
              strokeWidth="10"
              fill="none"
            />
          </mask>
          <mask id="wm3">
            <path
              className={`srv-mask-path ${activeStep >= 6 ? "is-drawn" : ""}`}
              d="M 774 40 C 860 15, 950 15, 1033 40"
              stroke="#ffffff"
              strokeWidth="10"
              fill="none"
            />
          </mask>
        </defs>

        {/* Visible Dashed Line Paths (Touching Orbs Directly) */}
        <path
          d="M 167 40 C 250 15, 340 15, 426 40"
          className="srv-wave-path-dashed"
          mask="url(#wm1)"
        />
        <text
          x="260"
          y="18"
          className={`srv-wave-label ${activeStep >= 2 ? "is-drawn" : ""}`}
        >
          IDEA TO SCALE
        </text>

        <path
          d="M 470 40 C 550 15, 650 15, 730 40"
          className="srv-wave-path-dashed"
          mask="url(#wm2)"
        />
        <text
          x="540"
          y="18"
          className={`srv-wave-label ${activeStep >= 4 ? "is-drawn" : ""}`}
        >
          MODERNIZE TO GROW
        </text>

        <path
          d="M 774 40 C 860 15, 950 15, 1033 40"
          className="srv-wave-path-dashed"
          mask="url(#wm3)"
        />
        <text
          x="830"
          y="18"
          className={`srv-wave-label ${activeStep >= 6 ? "is-drawn" : ""}`}
        >
          PEOPLE TO PROGRESS
        </text>
      </svg>

      {/* 4-Column Grid */}
      <div className="srv-eng-grid-4col">
        {/* Column 01 */}
        <div className={`srv-eng-col ${activeStep >= 1 ? "srv-eng-step--active" : "srv-eng-step--hidden"}`}>
          <div className="srv-eng-node-orb">01</div>
          <div className="srv-eng-dashed-line" />
          <h3 className="srv-eng-col-title">Build from Scratch</h3>
          <p className="srv-eng-col-desc">
            Turn an idea into a production-ready digital product.
          </p>

          <div className="srv-eng-visual-box">
            <div className="srv-3d-scratch">
              <div className="srv-3d-plate srv-3d-plate--1" />
              <div className="srv-3d-plate srv-3d-plate--2" />
              <div className="srv-3d-cube">
                <span>+</span>
                <span>+</span>
              </div>
            </div>
          </div>

          <div className="srv-eng-pills-list">
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>
              <span>Full-stack MVP</span>
            </div>
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Architecture Setup</span>
            </div>
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Production Launch</span>
            </div>
          </div>

          <Link href="/services/product-development" className="srv-eng-cta-link">
            <span>Explore</span> <span>→</span>
          </Link>
        </div>

        {/* Column 02 */}
        <div className={`srv-eng-col ${activeStep >= 3 ? "srv-eng-step--active" : "srv-eng-step--hidden"}`}>
          <div className="srv-eng-node-orb">02</div>
          <div className="srv-eng-dashed-line" />
          <h3 className="srv-eng-col-title">Modernize Existing Systems</h3>
          <p className="srv-eng-col-desc">
            Improve legacy software without unnecessary big-bang rewrites.
          </p>

          <div className="srv-eng-visual-box">
            <div className="srv-3d-modernize">
              <div className="srv-3d-screen srv-3d-screen--back" />
              <div className="srv-3d-screen srv-3d-screen--front">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l5.67-5.67"/></svg>
              </div>
            </div>
          </div>

          <div className="srv-eng-pills-list">
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Refactoring</span>
            </div>
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/></svg>
              <span>Cloud Migration</span>
            </div>
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6v6H9z"/></svg>
              <span>Performance Tuning</span>
            </div>
          </div>

          <Link href="/services/software-engineering" className="srv-eng-cta-link">
            <span>Explore</span> <span>→</span>
          </Link>
        </div>

        {/* Column 03 */}
        <div className={`srv-eng-col ${activeStep >= 5 ? "srv-eng-step--active" : "srv-eng-step--hidden"}`}>
          <div className="srv-eng-node-orb">03</div>
          <div className="srv-eng-dashed-line" />
          <h3 className="srv-eng-col-title">Extend Your Engineering Team</h3>
          <p className="srv-eng-col-desc">
            Add experienced engineers to an existing product or engineering team.
          </p>

          <div className="srv-eng-visual-box">
            <div className="srv-3d-team">
              <div className="srv-3d-avatars">
                <div className="avatar avatar--large" />
                <div className="avatar avatar--small" />
              </div>
              <span className="orbit-pill orbit-pill--tl">✦ Frontend</span>
              <span className="orbit-pill orbit-pill--tr">✦ DevOps</span>
              <span className="orbit-pill orbit-pill--bl">✦ Backend</span>
              <span className="orbit-pill orbit-pill--br">✦ AI/ML</span>
            </div>
          </div>

          <div className="srv-eng-pills-list">
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>Senior Engineers</span>
            </div>
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              <span>Sprint Alignment</span>
            </div>
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>Seamless Collaboration</span>
            </div>
          </div>

          <Link href="/contact" className="srv-eng-cta-link">
            <span>Explore</span> <span>→</span>
          </Link>
        </div>

        {/* Column 04 */}
        <div className={`srv-eng-col ${activeStep >= 7 ? "srv-eng-step--active" : "srv-eng-step--hidden"}`}>
          <div className="srv-eng-node-orb">04</div>
          <div className="srv-eng-dashed-line" />
          <h3 className="srv-eng-col-title">Add AI to Existing Products</h3>
          <p className="srv-eng-col-desc">
            Introduce practical AI, RAG and automation into existing workflows.
          </p>

          <div className="srv-eng-visual-box">
            <div className="srv-3d-ai">
              <div className="srv-3d-chip">
                <span>AI</span>
              </div>
              <span className="orbit-tag tag--1"><svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M12 2L2 7l10 5 10-5-10-5z"/></svg> RAG</span>
              <span className="orbit-tag tag--2"><svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><circle cx="12" cy="12" r="10"/></svg> Automation</span>
              <span className="orbit-tag tag--3"><svg viewBox="0 0 24 24" fill="currentColor" width="10" height="10"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/></svg> Integration</span>
            </div>
          </div>

          <div className="srv-eng-pills-list">
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <span>RAG Pipelines</span>
            </div>
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
              <span>LLM Integration</span>
            </div>
            <div className="srv-eng-pill">
              <svg className="srv-eng-pill-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              <span>Workflow Automation</span>
            </div>
          </div>

          <Link href="/services/ai-machine-learning" className="srv-eng-cta-link">
            <span>Explore</span> <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function PortfolioRotator() {
  const [activeIdx, setActiveIdx] = useState(1);

  const items = [
    {
      badge: "FINTECH",
      title: "Building the future of digital banking",
      desc: "A secure, scalable and intuitive platform used by 1M+ customers across India.",
      metrics: [
        { val: "3x", label: "User Growth" },
        { val: "40%", label: "Faster Tx" },
        { val: "99.9%", label: "Uptime" },
      ],
      isDark: false,
    },
    {
      badge: "HEALTHCARE",
      title: "Smarter care for healthier tomorrows",
      desc: "A HIPAA-compliant patient portal with automated workflows and real-time care coordination.",
      metrics: [
        { val: "60%", label: "Faster Onboarding" },
        { val: "2x", label: "Efficiency" },
        { val: "4.8/5", label: "Rating" },
      ],
      isDark: true,
    },
    {
      badge: "SAAS",
      title: "Scaling a product for global markets",
      desc: "We helped GlobalPay scale their payment infrastructure to support multi-currency transactions worldwide.",
      metrics: [
        { val: "5x", label: "Revenue Growth" },
        { val: "70%", label: "Fraud Cut" },
        { val: "50+", label: "Countries" },
      ],
      isDark: false,
    },
    {
      badge: "AI & LOGISTICS",
      title: "Intelligent supply chain routing",
      desc: "Real-time dispatch optimization engine processing 50,000+ daily deliveries with machine learning.",
      metrics: [
        { val: "35%", label: "Cost Savings" },
        { val: "99.4%", label: "On-time" },
        { val: "50K", label: "Daily Orders" },
      ],
      isDark: true,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % items.length);
    }, 2800);

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="srv-portfolio-wrapper">
      <div className="srv-portfolio-stage">
        {items.map((item, idx) => {
          let posClass = "srv-3d-pos--back";
          const diff = (idx - activeIdx + items.length) % items.length;

          if (diff === 0) posClass = "srv-3d-pos--center";
          else if (diff === 1) posClass = "srv-3d-pos--right";
          else if (diff === items.length - 1) posClass = "srv-3d-pos--left";

          return (
            <article
              key={item.badge}
              className={`srv-portfolio-card-3d ${item.isDark ? "srv-portfolio-card-3d--dark" : ""} ${posClass}`}
              onClick={() => setActiveIdx(idx)}
            >
              <div>
                <span className="srv-work-card__badge">{item.badge}</span>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>

              <div className="srv-work-card__metrics">
                {item.metrics.map((m) => (
                  <div key={m.label}>
                    <strong>{m.val}</strong>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="srv-portfolio-controls">
        <div className="srv-portfolio-dots">
          {items.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`srv-portfolio-dot ${idx === activeIdx ? "active" : ""}`}
              onClick={() => setActiveIdx(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TechStackGrid() {
  const row1 = [
    {
      name: "Java",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M4 19c6 1.5 10 1.5 16 0M6 21c4 1 8 1 12 0" stroke="#ea580c" strokeWidth="2" strokeLinecap="round"/>
          <path d="M12 3c-2 2 0 4-2 6M15 5c-2 2 0 3-2 5" stroke="#0284c7" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      name: "Spring Boot",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2V9h2v8z" fill="#16a34a"/>
        </svg>
      ),
    },
    {
      name: "Node.js",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L3 7v10l9 5 9-5V7l-9-5zm0 2.3l6.7 3.7v7.4L12 19.1l-6.7-3.7V8L12 4.3z" fill="#22c55e"/>
        </svg>
      ),
    },
    {
      name: "Python",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M12 2c-4 0-4 2-4 4v2h8V6c0-2 0-4-4-4zm0 20c4 0 4-2 4-4v-2H8v2c0 2 0 4 4 4z" fill="#3b82f6"/>
          <path d="M6 8c-2 0-4 0-4 4s2 4 4 4h2V8H6zm12 0h-2v8h2c2 0 4 0 4-4s-2-4-4-4z" fill="#eab308"/>
        </svg>
      ),
    },
    {
      name: "React",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#06b6d4" strokeWidth="2" transform="rotate(30 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#06b6d4" strokeWidth="2" transform="rotate(90 12 12)"/>
          <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#06b6d4" strokeWidth="2" transform="rotate(150 12 12)"/>
          <circle cx="12" cy="12" r="2" fill="#06b6d4"/>
        </svg>
      ),
    },
    {
      name: "Next.js",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" fill="#000000"/>
          <path d="M9 8v8l7-8v8" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: "React Native",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#38bdf8" strokeWidth="2" transform="rotate(0 12 12)"/>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#38bdf8" strokeWidth="2" transform="rotate(60 12 12)"/>
          <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="#38bdf8" strokeWidth="2" transform="rotate(120 12 12)"/>
          <circle cx="12" cy="12" r="2" fill="#38bdf8"/>
        </svg>
      ),
    },
    {
      name: "AI",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9L12 2Z" fill="#10b981"/>
        </svg>
      ),
    },
    {
      name: "RAG",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: "Cloud",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" fill="#0284c7"/>
        </svg>
      ),
    },
  ];

  const row2 = [
    {
      name: "AWS",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M6 14c4 3 8 3 12 0M16 13l3 2-1-3" stroke="#f97316" strokeWidth="2" strokeLinecap="round"/>
          <text x="5" y="10" fontSize="8" fontWeight="bold" fill="#0f172a">aws</text>
        </svg>
      ),
    },
    {
      name: "Docker",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M3 13.5C3 17 6.5 20 12 20c6 0 9-3 9-6.5h-18z" fill="#0284c7"/>
          <rect x="5" y="9" width="3" height="3" rx="0.5" fill="#0284c7"/>
          <rect x="9" y="9" width="3" height="3" rx="0.5" fill="#0284c7"/>
          <rect x="13" y="9" width="3" height="3" rx="0.5" fill="#0284c7"/>
          <rect x="9" y="5" width="3" height="3" rx="0.5" fill="#0284c7"/>
        </svg>
      ),
    },
    {
      name: "Kubernetes",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M12 2l8.5 5v10L12 22l-8.5-5V7L12 2z" stroke="#2563eb" strokeWidth="2"/>
          <circle cx="12" cy="12" r="3" fill="#2563eb"/>
        </svg>
      ),
    },
    {
      name: "MongoDB",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M12 2s-6 5-6 11a6 6 0 0012 0c0-6-6-11-6-11z" fill="#16a34a"/>
        </svg>
      ),
    },
    {
      name: "PostgreSQL",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M12 3C7 3 4 7 4 12c0 6 5 9 8 9 2 0 4-1 5-3l-2-2c-1 1-2 1-3 1-3 0-6-2-6-5s3-5 6-5 5 2 5 5v2h3v-2c0-5-3-9-8-9z" fill="#0284c7"/>
        </svg>
      ),
    },
    {
      name: "MySQL",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M4 15c4-6 10-6 16 0M8 9c2-2 6-2 8 0" stroke="#0284c7" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      name: "Redis",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M3 8l9-4 9 4-9 4-9-4zm0 4l9 4 9-4m-18 4l9 4 9-4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: "TypeScript",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="4" fill="#2563eb"/>
          <text x="5" y="16" fontSize="11" fontWeight="bold" fill="#ffffff">TS</text>
        </svg>
      ),
    },
    {
      name: "Tailwind CSS",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <path d="M12 6c-2.4 0-4 1.2-4.8 3.6 1.2-1.2 2.4-1.5 3.6-.9 1.4.7 2 2.1 1.7 3.9-.4 2.2-2.5 3.9-4.7 3.9 2.4 0 4-1.2 4.8-3.6-1.2 1.2-2.4 1.5-3.6.9-1.4-.7-2-2.1-1.7-3.9.4-2.2 2.5-3.9 4.7-3.9z" fill="#06b6d4"/>
        </svg>
      ),
    },
    {
      name: "Figma",
      svg: (
        <svg className="srv-tech-icon-svg" viewBox="0 0 24 24" fill="none">
          <circle cx="9" cy="6" r="3" fill="#ea580c"/>
          <circle cx="15" cy="6" r="3" fill="#f97316"/>
          <circle cx="9" cy="12" r="3" fill="#a855f7"/>
          <circle cx="15" cy="12" r="3" fill="#06b6d4"/>
          <circle cx="9" cy="18" r="3" fill="#22c55e"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="srv-tech-grid-wrapper">
      <div className="srv-tech-row">
        {row1.map((item) => (
          <div key={item.name} className="srv-tech-card-pill">
            {item.svg}
            <span>{item.name}</span>
          </div>
        ))}
      </div>

      <div className="srv-tech-row">
        {row2.map((item) => (
          <div key={item.name} className="srv-tech-card-pill">
            {item.svg}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const coreServices = [
  {
    id: "01",
    slug: "software-engineering",
    title: "Software Engineering",
    description:
      "Production-focused engineering for scalable systems, APIs and backend-heavy applications.",
    capabilities: [
      "Backend Engineering",
      "API Architecture",
      "Java / Spring Boot",
      "Node.js / Python",
      "Cloud & Infrastructure",
      "Legacy Modernization",
    ],
    ctaText: "Explore Software Engineering",
  },
  {
    id: "02",
    slug: "ai-machine-learning",
    title: "AI & Machine Learning",
    description:
      "Practical AI solutions that improve products, workflows and business operations.",
    capabilities: [
      "AI Applications",
      "RAG Systems",
      "AI Integration",
      "Intelligent Automation",
      "Machine Learning",
      "AI-powered Workflows",
    ],
    ctaText: "Explore AI & Machine Learning",
  },
  {
    id: "03",
    slug: "web-development",
    title: "Web Development",
    description:
      "Modern web products built for usability, performance and long-term scalability.",
    capabilities: [
      "React",
      "Next.js",
      "Full-stack Development",
      "Frontend Engineering",
      "API Integration",
      "Performance Optimization",
    ],
    ctaText: "Explore Web Development",
  },
  {
    id: "04",
    slug: "product-development",
    title: "Product Development",
    description:
      "From product idea to production-ready software, with engineering support across the journey.",
    capabilities: [
      "Product Discovery",
      "MVP Development",
      "UX/UI Implementation",
      "Web & Mobile Products",
      "Product Scaling",
      "Ongoing Engineering",
    ],
    ctaText: "Explore Product Development",
  },
];

const engagementBlocks = [
  {
    id: "01",
    title: "Build from Scratch",
    tagline: "Turn an idea into a production-ready digital product.",
    capabilities: ["Full-stack MVP", "Architecture Setup", "Production Launch"],
  },
  {
    id: "02",
    title: "Modernize Existing Systems",
    tagline: "Improve legacy software without unnecessary big-bang rewrites.",
    capabilities: ["Refactoring", "Cloud Migration", "Performance Tuning"],
  },
  {
    id: "03",
    title: "Extend Your Engineering Team",
    tagline: "Add experienced engineers to an existing product or engineering team.",
    capabilities: ["Senior Engineers", "Sprint Alignment", "Code Quality"],
  },
  {
    id: "04",
    title: "Add AI to Existing Products",
    tagline: "Introduce practical AI, RAG and automation into existing workflows.",
    capabilities: ["RAG Pipelines", "LLM Integration", "Workflow Automation"],
  },
];

const techStack = [
  "Java",
  "Spring Boot",
  "Node.js",
  "Python",
  "React",
  "Next.js",
  "React Native",
  "AI",
  "RAG",
  "Cloud",
];

const faqs = [
  {
    q: "What type of projects does Taapti work on?",
    a: "We build, scale, and modernize production web applications, custom APIs, microservices, mobile apps, and AI/RAG integrations for high-growth businesses and enterprise clients.",
  },
  {
    q: "Can Taapti modernize an existing application?",
    a: "Yes. We specialize in incremental modernization—refactoring backend codebases, upgrading cloud architecture, and improving reliability without risky, expensive big-bang rewrites.",
  },
  {
    q: "Can Taapti work with our existing engineering team?",
    a: "Absolutely. Our senior engineers integrate directly into your sprint cycles, code reviews, and CI/CD pipelines as an extension of your core tech team.",
  },
  {
    q: "How does Taapti approach AI and RAG projects?",
    a: "We focus on practical, ROI-driven AI. We design secure Retrieval-Augmented Generation (RAG) pipelines, LLM fine-tuning, and workflow automation grounded in your proprietary data.",
  },
  {
    q: "Can we start with an MVP?",
    a: "Yes. We help founders and product leaders define tight scope boundaries to deliver clean, scalable, production-ready MVPs in weeks.",
  },
  {
    q: "How do we get started?",
    a: "Simply click 'Start a Project' or schedule a free consultation with our senior engineering team to discuss your goals and technical requirements.",
  },
];
export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [cmapKey, setCmapKey] = useState(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleReplayCmap = () => {
    setCmapKey((prev) => prev + 1);
  };

  return (
    <main className="srv-page">
      {/* 1. SERVICES HERO (Matching Brand Light Hero Style) */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(120deg, #f0f7ff 0%, #e0f0ff 45%, #eff6ff 80%, #f8fafc 100%)",
          padding: "140px 0 90px",
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
              Our Core Services & Capabilities
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
              Engineering solutions{" "}
              <span style={{ color: "#2563eb", display: "block" }}>
                built for impact.
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
              We design, build and modernize reliable digital products with practical software engineering, cloud architecture, and AI expertise.
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
                Schedule Technical Call <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICES INTRO / CAPABILITY MAP */}
      <section className="section srv-capability-section">
        <div className="container">
          <div className="srv-section-header text-center reveal-down">
            <div className="srv-eyebrow-line-wrapper">
              <span className="srv-eyebrow-line" />
              <span className="srv-eyebrow-text">CAPABILITY MAP</span>
              <span className="srv-eyebrow-line" />
            </div>

            <h2 className="srv-cmap-title-single">
              One engineering partner. <span className="srv-text-blue">Multiple ways to build.</span>
            </h2>

            <p className="srv-cmap-subtitle">
              From complex backend systems to AI-powered products, we bring the right expertise to every stage of your journey.
            </p>
          </div>

          <div className="srv-cmap-visual-container reveal-zoom">
            {/* Center Glowing Hub Button */}
            <button
              type="button"
              className="srv-cmap__center-hub"
              onClick={handleReplayCmap}
              title="Click to replay card sequence 1, 2, 3, 4"
              aria-label="Replay capability map card sequence"
            >
              <div className="srv-cmap__center-inner">
                <span className="srv-cmap__hub-logo">T</span>
                <span className="srv-cmap__hub-brand">TAAPTI</span>
                <span className="srv-cmap__hub-sub">ENGINEERING</span>
              </div>
            </button>

            {/* Connecting Curved Lines SVG */}
            <svg className="srv-cmap-svg-lines" viewBox="0 0 1000 600" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 330 180 C 420 180, 440 250, 500 300" stroke="#3b82f6" strokeWidth="2" opacity="0.6" strokeDasharray="4 4" />
              <path d="M 670 180 C 580 180, 560 250, 500 300" stroke="#3b82f6" strokeWidth="2" opacity="0.6" strokeDasharray="4 4" />
              <path d="M 330 420 C 420 420, 440 350, 500 300" stroke="#3b82f6" strokeWidth="2" opacity="0.6" strokeDasharray="4 4" />
              <path d="M 670 420 C 580 420, 560 350, 500 300" stroke="#3b82f6" strokeWidth="2" opacity="0.6" strokeDasharray="4 4" />
              <circle cx="330" cy="180" r="4" fill="#2563eb" />
              <circle cx="670" cy="180" r="4" fill="#2563eb" />
              <circle cx="330" cy="420" r="4" fill="#2563eb" />
              <circle cx="670" cy="420" r="4" fill="#2563eb" />
            </svg>

            {/* 4 Connected Capability Cards with Key Replay & Sequential Delay */}
            <div key={cmapKey} className="srv-cmap-grid">
              {/* Card 01: Backend */}
              <div className="srv-cmap-card srv-cmap-card--tl srv-cmap-anim--1">
                <div className="srv-cmap-card__top">
                  <span className="srv-cmap-card__num">01</span>
                  <div className="srv-cmap-card__3d-icon srv-cmap-card__3d-icon--blue">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                  </div>
                </div>
                <h3>Backend</h3>
                <p>Robust systems that scale with your business.</p>
                <div className="srv-cmap-card__tags">
                  <span>APIs</span><span>Java</span><span>Spring Boot</span><span>Node.js</span><span>Python</span><span>Cloud</span>
                </div>
                <Link href="/services/software-engineering" className="srv-cmap-card__action">
                  Build Scalable Systems <span>→</span>
                </Link>
              </div>

              {/* Card 02: Web */}
              <div className="srv-cmap-card srv-cmap-card--tr srv-cmap-anim--2">
                <div className="srv-cmap-card__top">
                  <span className="srv-cmap-card__num">02</span>
                  <div className="srv-cmap-card__3d-icon srv-cmap-card__3d-icon--light-blue">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 4v10h16V8H4zm2 2h4v2H6v-2z"/></svg>
                  </div>
                </div>
                <h3>Web</h3>
                <p>Modern web experiences built for impact.</p>
                <div className="srv-cmap-card__tags">
                  <span>React</span><span>Next.js</span><span>Full-stack</span><span>Performance</span><span>TypeScript</span>
                </div>
                <Link href="/services/web-development" className="srv-cmap-card__action">
                  Create Better Experiences <span>→</span>
                </Link>
              </div>

              {/* Card 03: AI */}
              <div className="srv-cmap-card srv-cmap-card--bl srv-cmap-anim--3">
                <div className="srv-cmap-card__top">
                  <span className="srv-cmap-card__num">03</span>
                  <div className="srv-cmap-card__3d-icon srv-cmap-card__3d-icon--blue">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z"/></svg>
                  </div>
                </div>
                <h3>AI</h3>
                <p>Practical AI solutions for real business outcomes.</p>
                <div className="srv-cmap-card__tags">
                  <span>AI Applications</span><span>RAG</span><span>Automation</span><span>Machine Learning</span>
                </div>
                <Link href="/services/ai-machine-learning" className="srv-cmap-card__action">
                  Unlock with AI <span>→</span>
                </Link>
              </div>

              {/* Card 04: Product */}
              <div className="srv-cmap-card srv-cmap-card--br srv-cmap-anim--4">
                <div className="srv-cmap-card__top">
                  <span className="srv-cmap-card__num">04</span>
                  <div className="srv-cmap-card__3d-icon srv-cmap-card__3d-icon--blue">
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 16.5C21 16.88 20.79 17.21 20.47 17.38L12.57 21.82C12.41 21.94 12.21 22 12 22C11.79 22 11.59 21.94 11.43 21.82L3.53 17.38C3.21 17.21 3 16.88 3 16.5V7.5C3 7.12 3.21 6.79 3.53 6.62L11.43 2.18C11.59 2.06 11.79 2 12 2C12.21 2 12.41 2.06 12.57 2.18L20.47 6.62C20.79 6.79 21 7.12 21 7.5V16.5Z"/></svg>
                  </div>
                </div>
                <h3>Product</h3>
                <p>From idea to production, with end-to-end support.</p>
                <div className="srv-cmap-card__tags">
                  <span>MVP</span><span>Product Development</span><span>Mobile</span><span>Scaling</span>
                </div>
                <Link href="/services/product-development" className="srv-cmap-card__action">
                  Build What's Next <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE SERVICES */}
      <section className="section srv-core-section">
        <div className="container">
          <div className="srv-section-header text-center reveal-down">
            <span className="srv-eyebrow">OUR CORE SERVICES</span>
            <h2>Engineered for Scale and Precision</h2>
          </div>

          <div className="srv-core-list">
            {coreServices.map((service, idx) => {
              const isEven = idx % 2 === 1;
              const revealClass = isEven ? "reveal-right" : "reveal-left";
              return (
                <div
                  key={service.id}
                  className={`srv-core-item ${isEven ? "srv-core-item--reverse" : ""} ${revealClass}`}
                >
                  <div className="srv-core-item__info">
                    <span className="srv-core-item__num">{service.id}</span>
                    <h3>{service.title}</h3>
                    <p className="srv-core-item__desc">{service.description}</p>

                    <div className="srv-core-item__chips">
                      {service.capabilities.map((cap) => (
                        <span key={cap} className="srv-chip">
                          {cap}
                        </span>
                      ))}
                    </div>

                    <Link href={`/services/${service.slug}`} className="srv-core-item__cta">
                      <span>{service.ctaText}</span>
                      <span className="cta-arrow">→</span>
                    </Link>
                  </div>

                  <div className="srv-core-item__visual">
                    <TypewriterCodeVisual service={service} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. HOW WE CAN WORK WITH YOU (ENGAGEMENT MODELS EXACT SCREENSHOT DESIGN) */}
      <section className="section srv-eng-section-exact">
        {/* Handwritten Cursive Decorative Annotations */}
        <div className="srv-eng-cursive-left">
          <span>From idea to impact</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
        </div>

        <div className="srv-eng-cursive-right">
          <span>Engineering what's next</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
        </div>

        <div className="container">
          {/* Header */}
          <div className="srv-section-header text-center reveal-down">
            <span className="srv-eng-eyebrow">— ENGAGEMENT MODELS —</span>
            <h2 className="srv-eng-title">
              How we can <span className="srv-eng-title-blue">help</span>
            </h2>
            <p className="srv-eng-subtitle">
              Different challenges need different engineering approaches.
            </p>
          </div>

          <EngagementSequentialTimeline />
        </div>
      </section>

      {/* 5. SELECTED WORK */}
      <section className="section srv-work-section">
        <div className="container">
          <div className="srv-section-header text-center reveal-down">
            <span className="srv-eyebrow">PORTFOLIO</span>
            <h2>Engineering work, backed by real projects.</h2>
            <p>Explore selected work across software engineering, product development and technology modernization.</p>
          </div>

          <PortfolioRotator />

          <div className="srv-portfolio-cta-wrapper">
            <Link href="/case-studies" className="srv-btn srv-btn--outline">
              View All Case Studies →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. OUR TECH STACK (EXACT SCREENSHOT DESIGN) */}
      <section className="section srv-tech-section-exact">
        <div className="container">
          {/* Header */}
          <div className="srv-section-header text-center reveal-down">
            <span className="srv-eng-eyebrow">— OUR TECH STACK —</span>
            <h2 className="srv-eng-title">
              Built with technologies that <span className="srv-eng-title-blue">scale.</span>
            </h2>
            <p className="srv-eng-subtitle">
              The right tools for real-world products, from idea to impact.
            </p>
          </div>

          {/* 2-Row Tech Badges Grid */}
          <TechStackGrid />

          {/* Bottom 3-Feature Highlights Bar */}
          <div className="srv-tech-highlights-bar reveal-up">
            <div className="srv-tech-feature-item">
              <svg className="srv-tech-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <div className="srv-tech-feature-text">
                <strong>Modern Stack</strong>
                <span>Built for performance</span>
              </div>
            </div>

            <div className="srv-tech-divider" />

            <div className="srv-tech-feature-item">
              <svg className="srv-tech-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              <div className="srv-tech-feature-text">
                <strong>Flexible & Scalable</strong>
                <span>Adapts to your needs</span>
              </div>
            </div>

            <div className="srv-tech-divider" />

            <div className="srv-tech-feature-item">
              <svg className="srv-tech-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div className="srv-tech-feature-text">
                <strong>Production Ready</strong>
                <span>Trusted by teams</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ ACCORDION */}
      <section className="section srv-faq-section">
        <div className="container">
          <div className="srv-section-header text-center reveal-down">
            <span className="srv-eyebrow">FAQ</span>
            <h2>Questions before we start?</h2>
          </div>

          <div className="srv-faq-list">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={faq.q} className={`srv-faq-item ${isOpen ? "srv-faq-item--open" : ""}`}>
                  <button
                    type="button"
                    className="srv-faq-question"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="srv-faq-toggle">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <div className="srv-faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 8. FINAL CTA (EXACT SCREENSHOT DESIGN) */}
      <section className="srv-final-cta-section">
        <div className="container">
          <div className="srv-cta-box">
            {/* Left Content */}
            <div className="srv-cta-left">
              <div className="srv-cta-eyebrow-wrapper">
                <span className="srv-cta-eyebrow">HAVE A PROJECT IN MIND?</span>
                <span className="srv-cta-eyebrow-line" />
              </div>

              <h2 className="srv-cta-title">
                Let's build what <br />
                <span className="srv-cta-highlight">that matters.</span>
              </h2>

              <p className="srv-cta-desc">
                Tell us what you're building, what you're trying to solve, or where you want to go next. We'll help you figure out the right technology approach.
              </p>

              <div className="srv-cta-buttons">
                <Link href="/contact" className="srv-btn srv-btn--primary srv-cta-btn-main">
                  <span>Start a Conversation</span>
                  <span>→</span>
                </Link>
                <Link href="#services" className="srv-btn srv-btn--outline-dark srv-cta-btn-sub">
                  Explore Services
                </Link>
              </div>

              <div className="srv-cta-trust">
                <div className="trust-item"><span className="trust-check">✓</span> Free Consultation</div>
                <div className="trust-item"><span className="trust-check">✓</span> Quick Response</div>
                <div className="trust-item"><span className="trust-check">✓</span> Confidential & Secure</div>
              </div>
            </div>

            {/* Right Visual Flow Diagram with Interactive Animation */}
            <div className="srv-cta-right">
              {/* Top Handwritten Annotation */}
              <div className="srv-cta-handwriting srv-cta-handwriting-top">
                <span>From idea to impact</span>
                <svg className="srv-cta-arrow-svg" viewBox="0 0 40 40" fill="none">
                  <path d="M 5 10 Q 25 5, 30 25" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" fill="none"/>
                  <path d="M 24 20 L 30 25 L 32 18" stroke="#60a5fa" strokeWidth="1.5" fill="none"/>
                </svg>
              </div>

              {/* Central Outer Glass Container */}
              <div className="srv-cta-diagram-container">
                {/* Main 3 Vertical Cards Stack */}
                <div className="srv-cta-vertical-stack">
                  {/* Card 1 */}
                  <div className="srv-cta-step-card">
                    <div className="srv-cta-step-icon srv-cta-step-icon--bulb">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18h6m-5 3h4a2 2 0 0 0 2-2v-1H8v1a2 2 0 0 0 2 2zm-1-5a7 7 0 1 1 8 0c0 2.5-1.5 3.5-2 4H10c-.5-.5-2-1.5-2-4z"/>
                      </svg>
                    </div>
                    <div className="srv-cta-step-text">
                      <div className="srv-cta-step-heading">Your Idea</div>
                      <div className="srv-cta-step-sub">Share your goals</div>
                    </div>
                  </div>

                  {/* Vertical Connecting Line 1 */}
                  <div className="srv-cta-v-line">
                    <span className="srv-cta-line-dot srv-cta-line-dot-1" />
                  </div>

                  {/* Card 2 */}
                  <div className="srv-cta-step-card">
                    <div className="srv-cta-step-icon srv-cta-step-icon--gear">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                      </svg>
                    </div>
                    <div className="srv-cta-step-text">
                      <div className="srv-cta-step-heading">Right Technology</div>
                      <div className="srv-cta-step-sub">Our expert guidance</div>
                    </div>
                  </div>

                  {/* Vertical Connecting Line 2 */}
                  <div className="srv-cta-v-line">
                    <span className="srv-cta-line-dot srv-cta-line-dot-2" />
                  </div>

                  {/* Card 3 (Glowing Active Card) */}
                  <div className="srv-cta-step-card srv-cta-step-card--active">
                    <div className="srv-cta-step-icon srv-cta-step-icon--box">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                        <line x1="12" y1="22.08" x2="12" y2="12"/>
                      </svg>
                    </div>
                    <div className="srv-cta-step-text">
                      <div className="srv-cta-step-heading">Production Ready</div>
                      <div className="srv-cta-step-sub">Real business impact</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Handwritten Annotation */}
              <div className="srv-cta-handwriting srv-cta-handwriting-bottom">
                <svg className="srv-cta-arrow-svg-bot" viewBox="0 0 50 30" fill="none">
                  <path d="M 5 25 Q 25 28, 45 10" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="3 3" fill="none"/>
                  <path d="M 38 12 L 45 10 L 44 18" stroke="#60a5fa" strokeWidth="1.5" fill="none"/>
                </svg>
                <span>Let's build together</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

