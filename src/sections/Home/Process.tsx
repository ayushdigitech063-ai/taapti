"use client";

import { useState, useEffect, useRef } from "react";

const processSteps = [
  {
    number: 1,
    title: "Scope definition",
    description: "Mapping project boundaries and establishing clear success metrics.",
    angle: -67.5, // ~1 o'clock
  },
  {
    number: 2,
    title: "UI/UX design",
    description: "Designing clear, usable interfaces that fit your brand.",
    angle: -22.5, // ~2 o'clock
  },
  {
    number: 3,
    title: "Architecture planning",
    description: "Designing scalable system architecture with modern technology stacks.",
    angle: 22.5, // ~4 o'clock
  },
  {
    number: 4,
    title: "Agile development",
    description: "Building reliable solutions through iterative sprints with complete transparency.",
    angle: 67.5, // ~5 o'clock
  },
  {
    number: 5,
    title: "Rigorous testing",
    description: "Comprehensive QA processes including security audits and performance optimization.",
    angle: 112.5, // ~7 o'clock
  },
  {
    number: 6,
    title: "Zero-downtime deployment",
    description: "Rolling out your solution with zero downtime and complete documentation.",
    angle: 157.5, // ~8 o'clock
  },
  {
    number: 7,
    title: "Ongoing maintenance",
    description: "Ongoing support with regular updates and performance monitoring.",
    angle: -157.5, // ~10 o'clock
  },
  {
    number: 8,
    title: "Growth & scaling",
    description: "Tracking metrics and shipping improvements over time.",
    angle: -112.5, // ~11 o'clock
  },
];

export default function Process() {
  const [isVisible, setIsVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleReplayAnimation = () => {
    // Re-trigger animation sequence on step nodes strictly
    setAnimKey((prev) => prev + 1);
  };

  return (
    <section ref={sectionRef} className={`section process-section ${isVisible ? "process-section--visible" : ""}`}>
      {/* LEFT SIDE BLUE VECTOR WAVE */}
      <div className="process-section__bg-wave" aria-hidden="true">
        <svg viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <g opacity="0.85">
            <path d="M -80 0 C 220 250, 20 520, 520 800" stroke="#1d4ed8" strokeWidth="1.6" opacity="0.65" />
            <path d="M -60 0 C 240 260, 40 530, 540 800" stroke="#2563eb" strokeWidth="1.5" opacity="0.55" />
            <path d="M -40 0 C 260 270, 60 540, 560 800" stroke="#3b82f6" strokeWidth="1.4" opacity="0.5" />
            <path d="M -20 0 C 280 280, 80 550, 580 800" stroke="#60a5fa" strokeWidth="1.3" opacity="0.4" />
            <path d="M 0 0 C 300 290, 100 560, 600 800" stroke="#93c5fd" strokeWidth="1.2" opacity="0.3" />
          </g>
        </svg>
      </div>

      <div className="container process-section__container">
        {/* HEADER */}
        <div className="process-section__header text-center reveal-down">
          <span className="process-section__eyebrow">PROCESS</span>
          <h2>
            Delivering results <span>with purpose</span>
          </h2>
          <p className="process-section__desc">
            Our systematic approach delivers every project with precision and measurable results.
          </p>
        </div>

        {/* CIRCULAR PROCESS LAYOUT */}
        <div className="process-circle-wrapper reveal-zoom">
          {/* CENTER LOGO BRANDING BUTTON */}
          <button
            type="button"
            className="process-circle__center"
            onClick={handleReplayAnimation}
            title="Click to replay animation sequence"
            aria-label="Replay process animation sequence"
          >
            <span className="process-circle__logo-text">
              TAAPT<span>i</span>
            </span>
          </button>

          {/* DASHED CIRCLE TRACK SVG */}
          <svg className="process-circle__svg-track" viewBox="0 0 500 500" fill="none" aria-hidden="true">
            <circle
              cx="250"
              cy="250"
              r="180"
              stroke="#cbd5e1"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
          </svg>

          {/* 8 CIRCULAR NODES WITH LABELS */}
          <div key={animKey} className="process-nodes">
            {processSteps.map((step) => {
              // Convert angle to position on circle (radius = 180px on 500px container)
              const rad = (step.angle * Math.PI) / 180;
              const radius = 180;
              const x = Math.round(250 + radius * Math.cos(rad));
              const y = Math.round(250 + radius * Math.sin(rad));

              return (
                <div
                  key={step.number}
                  className="process-node-item"
                  style={{
                    left: `${x}px`,
                    top: `${y}px`,
                    animationDelay: `${0.1 + step.number * 0.14}s`,
                  }}
                >
                  {/* NUMBER BADGE CENTERED ON CIRCLE LINE */}
                  <div className="process-node__badge">{step.number}</div>

                  {/* TEXT DESCRIPTION BOX ABSOLUTELY OFFSET OUTWARDS */}
                  <div className={`process-node__content process-node__content--step-${step.number}`}>
                    <h4>{step.title}</h4>
                    <p>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
