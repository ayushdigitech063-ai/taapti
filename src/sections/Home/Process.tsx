"use client";

import { useState, useEffect, useRef } from "react";

const defaultSteps = [
  { number: 1, title: "Scope definition", description: "Mapping project boundaries and establishing clear success metrics.", angle: -67.5 },
  { number: 2, title: "UI/UX design", description: "Designing clear, usable interfaces that fit your brand.", angle: -22.5 },
  { number: 3, title: "Architecture planning", description: "Designing scalable system architecture with modern technology stacks.", angle: 22.5 },
  { number: 4, title: "Agile development", description: "Building reliable solutions through iterative sprints with complete transparency.", angle: 67.5 },
  { number: 5, title: "Rigorous testing", description: "Comprehensive QA processes including security audits and performance optimization.", angle: 112.5 },
  { number: 6, title: "Zero-downtime deployment", description: "Rolling out your solution with zero downtime and complete documentation.", angle: 157.5 },
  { number: 7, title: "Ongoing maintenance", description: "Ongoing support with regular updates and performance monitoring.", angle: -157.5 },
  { number: 8, title: "Growth & scaling", description: "Tracking metrics and shipping improvements over time.", angle: -112.5 },
];

export default function Process() {
  const [isVisible, setIsVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const [sectionData, setSectionData] = useState({
    eyebrow: "PROCESS",
    headingNormal: "Delivering results",
    headingHighlight: "with purpose",
    description: "Our systematic approach delivers every project with precision and measurable results.",
    centerLogoUrl: "",
    centerLogoText: "TaapTi",
    steps: defaultSteps,
  });

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/process-section?_t=${Date.now()}`, {
        cache: "no-store",
      }).catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setSectionData({
            eyebrow: d.eyebrow || "PROCESS",
            headingNormal: d.headingNormal || "Delivering results",
            headingHighlight: d.headingHighlight || "with purpose",
            description: d.description || "",
            centerLogoUrl: d.centerLogoUrl || "",
            centerLogoText: d.centerLogoText || "TaapTi",
            steps: d.steps && d.steps.length > 0 ? d.steps : defaultSteps,
          });
        }
      }
    } catch {
      // Silent fallback
    }
  };

  useEffect(() => {
    fetchData();

    let bc: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      bc = new BroadcastChannel("taapti_cms_updates");
      bc.onmessage = (event) => {
        if (event.data === "PROCESS_SECTION_UPDATED" || event.data === "CMS_UPDATED") {
          fetchData();
        }
      };
    }
    return () => { if (bc) bc.close(); };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setIsVisible(entry.isIntersecting); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleReplayAnimation = () => setAnimKey((prev) => prev + 1);

  return (
    <section ref={sectionRef} className={`section process-section ${isVisible ? "process-section--visible" : ""}`}>
      {/* LEFT SIDE VECTOR WAVE */}
      <div className="process-section__bg-wave" aria-hidden="true">
        <svg viewBox="0 0 500 800" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <g opacity="0.85">
            <path d="M -80 0 C 220 250, 20 520, 520 800" stroke="#10243E" strokeWidth="1.6" opacity="0.4" />
            <path d="M -60 0 C 240 260, 40 530, 540 800" stroke="#00875A" strokeWidth="1.5" opacity="0.5" />
            <path d="M -40 0 C 260 270, 60 540, 560 800" stroke="#10243E" strokeWidth="1.4" opacity="0.3" />
            <path d="M -20 0 C 280 280, 80 550, 580 800" stroke="#00875A" strokeWidth="1.3" opacity="0.4" />
            <path d="M 0 0 C 300 290, 100 560, 600 800" stroke="#a7f3d0" strokeWidth="1.2" opacity="0.3" />
          </g>
        </svg>
      </div>

      <div className="container process-section__container">
        {/* HEADER */}
        <div className="process-section__header text-center reveal-down">
          <span className="process-section__eyebrow" style={{ color: "#00875A" }}>{sectionData.eyebrow}</span>
          <h2>
            {sectionData.headingNormal} <span style={{ color: "#10243E" }}>{sectionData.headingHighlight}</span>
          </h2>
          <p className="process-section__desc">{sectionData.description}</p>
        </div>

        {/* CIRCULAR PROCESS LAYOUT */}
        <div className="process-circle-wrapper reveal-zoom">
          {/* CENTER LOGO / TEXT BUTTON */}
          <button
            type="button"
            className="process-circle__center"
            onClick={handleReplayAnimation}
            title="Click to replay animation sequence"
            aria-label="Replay process animation sequence"
          >
            {sectionData.centerLogoUrl && sectionData.centerLogoUrl.startsWith("http") ? (
              <img
                src={sectionData.centerLogoUrl}
                alt="Company Logo"
                style={{ width: "72%", height: "72%", objectFit: "contain", borderRadius: "4px" }}
              />
            ) : (
              <span className="process-circle__logo-text">
                {sectionData.centerLogoText.slice(0, -1)}<span>{sectionData.centerLogoText.slice(-1)}</span>
              </span>
            )}
          </button>

          {/* DASHED CIRCLE TRACK SVG */}
          <svg className="process-circle__svg-track" viewBox="0 0 500 500" fill="none" aria-hidden="true">
            <circle cx="250" cy="250" r="180" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
          </svg>

          {/* 8 CIRCULAR NODES WITH LABELS */}
          <div key={animKey} className="process-nodes">
            {sectionData.steps.map((step) => {
              const rad = (step.angle * Math.PI) / 180;
              const radius = 180;
              const x = Math.round(250 + radius * Math.cos(rad));
              const y = Math.round(250 + radius * Math.sin(rad));
              return (
                <div
                  key={step.number}
                  className="process-node-item"
                  style={{ left: `${x}px`, top: `${y}px`, animationDelay: `${0.1 + step.number * 0.14}s` }}
                >
                  <div className="process-node__badge">{step.number}</div>
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
