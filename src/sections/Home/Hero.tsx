"use client";

import Link from "next/link";
import Globe from "@/components/Globe/Globe";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+",  label: "Industries Served" },
  { value: "99%", label: "Client Satisfaction" },
];

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero__container">

        {/* LEFT CONTENT */}
        <div className="hero__content reveal-left">
          <div className="hero__eyebrow">
            <span></span>
            Software Engineering &amp; AI
          </div>

          <h1>
            We build technology<br />
            <span>that moves businesses forward.</span>
          </h1>

          <p className="hero__description">
            Taapti Technologies helps ambitious businesses design, build and
            scale reliable digital products with modern software engineering
            and AI.
          </p>

          <div className="hero__actions">
            <Link href="/contact" className="btn btn-primary">
              Start a Project
              <span>→</span>
            </Link>
            <Link href="/case-studies" className="btn btn-outline">
              View Our Work
            </Link>
          </div>

          {/* STATS */}
          <div className="hero__stats">
            {stats.map((stat) => (
              <div className="hero__stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>


        </div>

        {/* RIGHT 3D GLOBE */}
        <div className="hero__visual reveal-right">
          <div className="hero__globe-background"></div>

          <Globe />

          {/* FLOATING CARD 1 */}
          <div className="hero__floating hero__floating--one">
            <span></span>
            <div>
              <strong>Ideas</strong>
              <small>to Products</small>
            </div>
          </div>

          {/* FLOATING CARD 2 */}
          <div className="hero__floating hero__floating--two">
            <span></span>
            <div>
              <strong>Technology</strong>
              <small>for Tomorrow</small>
            </div>
          </div>

          {/* FLOATING CARD 3 */}
          <div className="hero__floating hero__floating--three">
            <span></span>
            <div>
              <strong>People</strong>
              <small>for Progress</small>
            </div>
          </div>

          {/* CAPTION */}
          <div className="hero__visual-caption">
            <strong>Global</strong>
            <span>Solutions.</span>
            <span>Real Impact.</span>
          </div>
        </div>

      </div>

      {/* SINGLE CONTINUOUS SECTION DIVIDER WAVE MESH */}
      <div className="section-wave-divider">
        <svg
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <g opacity="0.95">
            {/* Primary Flowing Ribbon Mesh */}
            <path d="M -100 160 C 250 40, 500 280, 850 140 C 1150 20, 1350 260, 1550 120" stroke="#1d4ed8" strokeWidth="1.6" opacity="0.9" />
            <path d="M -100 170 C 250 50, 500 290, 850 150 C 1150 30, 1350 270, 1550 130" stroke="#2563eb" strokeWidth="1.5" opacity="0.85" />
            <path d="M -100 180 C 250 60, 500 300, 850 160 C 1150 40, 1350 280, 1550 140" stroke="#3b82f6" strokeWidth="1.4" opacity="0.8" />
            <path d="M -100 190 C 250 70, 500 310, 850 170 C 1150 50, 1350 290, 1550 150" stroke="#60a5fa" strokeWidth="1.3" opacity="0.7" />
            <path d="M -100 200 C 250 80, 500 320, 850 180 C 1150 60, 1350 300, 1550 160" stroke="#93c5fd" strokeWidth="1.2" opacity="0.6" />

            {/* Intersecting Ribbon Mesh Secondary Flow */}
            <path d="M -100 100 C 200 260, 550 30, 850 200 C 1100 310, 1300 80, 1550 210" stroke="#1d4ed8" strokeWidth="1.6" opacity="0.85" />
            <path d="M -100 110 C 200 270, 550 40, 850 210 C 1100 320, 1300 90, 1550 220" stroke="#2563eb" strokeWidth="1.5" opacity="0.8" />
            <path d="M -100 120 C 200 280, 550 50, 850 220 C 1100 330, 1300 100, 1550 230" stroke="#3b82f6" strokeWidth="1.4" opacity="0.75" />
            <path d="M -100 130 C 200 290, 550 60, 850 230 C 1100 340, 1300 110, 1550 240" stroke="#60a5fa" strokeWidth="1.3" opacity="0.65" />
            <path d="M -100 140 C 200 300, 550 70, 850 240 C 1100 350, 1300 120, 1550 250" stroke="#93c5fd" strokeWidth="1.2" opacity="0.55" />
          </g>
        </svg>
      </div>

    </section>
  );
}