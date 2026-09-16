"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Globe from "@/components/Globe/Globe";
import EnquireModal from "@/components/EnquireModal";
import { API_BASE_URL } from "@/utils/api";

const defaultStats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "5+", label: "Industries Served" },
  { value: "99%", label: "Client Satisfaction" },
];

export default function Hero() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [heroData, setHeroData] = useState({
    eyebrow: "Software Engineering & AI",
    headingLine1: "We build technology",
    headingLine2: "that moves businesses forward.",
    description:
      "Taapti Technologies helps ambitious businesses design, build and scale reliable digital products with modern software engineering and AI.",
    primaryBtnText: "Start a Project",
    primaryBtnLink: "/contact",
    secondaryBtnText: "View Our Work",
    secondaryBtnLink: "/case-studies",
    stats: defaultStats,
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/hero`).catch(() => null);
        if (res && res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            setHeroData(data.data);
          }
        }
      } catch {
        // Silent fallback to initial state if backend unavailable
      }
    };

    // Initial fetch
    fetchHero();

    // BroadcastChannel real-time sync when updated from Admin
    let bc: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      bc = new BroadcastChannel("taapti_cms_updates");
      bc.onmessage = (event) => {
        if (event.data && event.data.type === "HERO_UPDATED") {
          fetchHero();
        }
      };
    }

    return () => {
      if (bc) bc.close();
    };
  }, []);

  return (
    <section className="hero">
      <div className="container hero__container">
        {/* LEFT CONTENT */}
        <div className="hero__content reveal-left">
          <div className="hero__eyebrow">
            <span></span>
            {heroData.eyebrow}
          </div>

          <h1>
            {heroData.headingLine1}
            <br />
            <span style={{ color: "#10243E" }}>{heroData.headingLine2}</span>
          </h1>

          <p className="hero__description">{heroData.description}</p>

          <div className="hero__actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)}
              style={{ border: "none", cursor: "pointer", background: "#00875A", boxShadow: "0 8px 24px rgba(0,135,90,0.28)" }}
            >
              {heroData.primaryBtnText}
              <span>→</span>
            </button>
            <Link href={heroData.secondaryBtnLink || "/case-studies"} className="btn btn-outline">
              {heroData.secondaryBtnText}
            </Link>
          </div>

          {/* STATS */}
          <div className="hero__stats">
            {(heroData.stats && heroData.stats.length > 0 ? heroData.stats : defaultStats).map(
              (stat, idx) => (
                <div className="hero__stat" key={stat.label || idx}>
                  <strong style={{ color: "#10243E" }}>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* RIGHT 3D GLOBE */}
        <div className="hero__visual reveal-right">
          <div className="hero__globe-background"></div>

          <Globe />

          {/* FLOATING CARD 1 */}
          <div className="hero__floating hero__floating--one">
            <span style={{ background: "#00875A", boxShadow: "0 0 0 5px rgba(0,135,90,0.15)" }}></span>
            <div>
              <strong>Ideas</strong>
              <small>to Products</small>
            </div>
          </div>

          {/* FLOATING CARD 2 */}
          <div className="hero__floating hero__floating--two">
            <span style={{ background: "#00875A", boxShadow: "0 0 0 5px rgba(0,135,90,0.15)" }}></span>
            <div>
              <strong>Technology</strong>
              <small>for Tomorrow</small>
            </div>
          </div>

          {/* FLOATING CARD 3 */}
          <div className="hero__floating hero__floating--three">
            <span style={{ background: "#00875A", boxShadow: "0 0 0 5px rgba(0,135,90,0.15)" }}></span>
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
            {/* Primary Flowing Ribbon Mesh - Thickened & Vibrant */}
            <path
              d="M -100 160 C 250 20, 500 300, 850 120 C 1150 0, 1350 280, 1550 100"
              stroke="#10243E"
              strokeWidth="4"
              opacity="0.9"
            />
            <path
              d="M -100 175 C 250 35, 500 315, 850 135 C 1150 15, 1350 295, 1550 115"
              stroke="#00875A"
              strokeWidth="3.8"
              opacity="0.85"
            />
            <path
              d="M -100 190 C 250 50, 500 330, 850 150 C 1150 30, 1350 310, 1550 130"
              stroke="#10243E"
              strokeWidth="3.5"
              opacity="0.75"
            />
            <path
              d="M -100 205 C 250 65, 500 345, 850 165 C 1150 45, 1350 325, 1550 145"
              stroke="#00875A"
              strokeWidth="3.2"
              opacity="0.65"
            />
            <path
              d="M -100 220 C 250 80, 500 360, 850 180 C 1150 60, 1350 340, 1550 160"
              stroke="#a7f3d0"
              strokeWidth="3"
              opacity="0.55"
            />

            {/* Intersecting Ribbon Mesh Secondary Flow */}
            <path
              d="M -100 80 C 200 280, 550 10, 850 220 C 1100 330, 1300 60, 1550 230"
              stroke="#10243E"
              strokeWidth="4"
              opacity="0.85"
            />
            <path
              d="M -100 95 C 200 295, 550 25, 850 235 C 1100 345, 1300 75, 1550 245"
              stroke="#00875A"
              strokeWidth="3.8"
              opacity="0.8"
            />
            <path
              d="M -100 110 C 200 310, 550 40, 850 250 C 1100 360, 1300 90, 1550 260"
              stroke="#10243E"
              strokeWidth="3.5"
              opacity="0.7"
            />
            <path
              d="M -100 125 C 200 325, 550 55, 850 265 C 1100 375, 1300 105, 1550 275"
              stroke="#00875A"
              strokeWidth="3.2"
              opacity="0.6"
            />
            <path
              d="M -100 140 C 200 340, 550 70, 850 280 C 1100 390, 1300 120, 1550 290"
              stroke="#a7f3d0"
              strokeWidth="3"
              opacity="0.5"
            />
          </g>
        </svg>
      </div>

      <EnquireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceTitle="Hero Inquiry"
      />
    </section>
  );
}