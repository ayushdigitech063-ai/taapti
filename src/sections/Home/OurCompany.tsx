"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const defaultTopPhotos = [
  { src: "/about/team1.jpg", alt: "Taapti software engineering team at office" },
  { src: "/about/team3.jpg", alt: "Taapti tech team reviewing project deliverables" },
  { src: "/about/team2.jpg", alt: "Taapti developers collaborating on code" },
];

const defaultBottomPhotos = [
  { src: "/about/team2.jpg", alt: "Taapti developers collaborating on code" },
  { src: "/about/team3.jpg", alt: "Taapti tech team reviewing project deliverables" },
  { src: "/about/team1.jpg", alt: "Taapti software engineering team at office" },
];

export default function OurCompany() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  const [sectionData, setSectionData] = useState({
    eyebrow: "OUR COMPANY",
    headingNormal: "A founder-led software team that",
    headingHighlight: "ships to production",
    paragraph1:
      "Taapti Technologies is a founder-led software team based in Surat, India, working with clients from California to Sydney. We build full-stack products end to end: backends in Java, Spring Boot, Node.js and Python, web and mobile front-ends in React, Next.js and React Native, and AI features built on RAG. We have shipped for USP, Bar.Stream and Invoxbooks.",
    paragraph2:
      "You work directly with the engineers writing your code, not a layer of account managers. Most clients keep three to four hours of daily overlap with our team, so reviews and decisions happen the same day. We bill in USD by the hour, and you pay only for hours actually worked.",
    badgeNumber: "10",
    badgeLabel: "Years\nexperience",
    topPhotos: defaultTopPhotos,
    bottomPhotos: defaultBottomPhotos,
  });

  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/our-company?_t=${Date.now()}`, {
        cache: "no-store",
      }).catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setSectionData({
            eyebrow: d.eyebrow || "OUR COMPANY",
            headingNormal: d.headingNormal || "A founder-led software team that",
            headingHighlight: d.headingHighlight || "ships to production",
            paragraph1: d.paragraph1 || "",
            paragraph2: d.paragraph2 || "",
            badgeNumber: d.badgeNumber || "10",
            badgeLabel: d.badgeLabel || "Years\nexperience",
            topPhotos: d.topPhotos && d.topPhotos.length > 0 ? d.topPhotos : defaultTopPhotos,
            bottomPhotos: d.bottomPhotos && d.bottomPhotos.length > 0 ? d.bottomPhotos : defaultBottomPhotos,
          });
        }
      }
    } catch {
      // Silent fallback
    }
  };

  useEffect(() => {
    fetchData();

    // BroadcastChannel for real-time sync from admin dashboard
    let bc: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      bc = new BroadcastChannel("taapti_cms_updates");
      bc.onmessage = (event) => {
        if (event.data === "OUR_COMPANY_UPDATED" || event.data === "CMS_UPDATED") {
          fetchData();
        }
      };
    }

    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % 3);
    }, 3500);

    return () => {
      clearInterval(timer);
      if (bc) bc.close();
    };
  }, []);

  return (
    <section className="section our-company">

      <div className="container our-company__container">
        <div className="our-company__grid">
          
          {/* LEFT SIDE OVERLAPPING PHOTOS & FLOATING BADGE */}
          <div className="our-company__visual reveal-left">
            
            {/* 3D ROTATING DOT GRID SPHERES IN BACKGROUND */}
            <div className="our-company__sphere-bg our-company__sphere-bg--top-right" aria-hidden="true">
              <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.6">
                  {Array.from({ length: 9 }).map((_, r) =>
                    Array.from({ length: 9 }).map((_, c) => {
                      const cx = 50 + c * 25 + (r % 2) * 5;
                      const cy = 40 + r * 25;
                      const size = 1.8 + ((c + r) % 4) * 0.8;
                      const opacity = 0.2 + ((c * r) % 5) * 0.15;
                      return (
                        <circle
                          key={`tr-${r}-${c}`}
                          cx={cx}
                          cy={cy}
                          r={size}
                          fill="#cbd5e1"
                          opacity={opacity}
                        />
                      );
                    })
                  )}
                </g>
              </svg>
            </div>

            <div className="our-company__sphere-bg our-company__sphere-bg--bottom-left" aria-hidden="true">
              <svg viewBox="0 0 350 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.65">
                  {Array.from({ length: 12 }).map((_, r) =>
                    Array.from({ length: 12 }).map((_, c) => {
                      const cx = Number((30 + c * 22 + Math.sin(r * 0.4) * 15).toFixed(2));
                      const cy = Number((50 + r * 20 + Math.cos(c * 0.4) * 10).toFixed(2));
                      const size = Number((1.5 + (r % 3) * 0.7).toFixed(2));
                      const opacity = Number((0.15 + ((r + c) % 6) * 0.12).toFixed(2));
                      return (
                        <circle
                          key={`bl-${r}-${c}`}
                          cx={cx}
                          cy={cy}
                          r={size}
                          fill="#94a3b8"
                          opacity={opacity}
                        />
                      );
                    })
                  )}
                </g>
              </svg>
            </div>

            {/* TOP BACK PHOTO FRAME - AUTO ROTATING SLIDESHOW */}
            <div className="our-company__photo our-company__photo--top">
              {sectionData.topPhotos.map((photo, index) => (
                <div
                  key={`top-${index}`}
                  className={`our-company__slide ${index === activePhotoIndex % sectionData.topPhotos.length ? "our-company__slide--active" : ""}`}
                >
                  {photo.src?.startsWith("http") ? (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="our-company__img"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="our-company__img"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* BOTTOM FRONT PHOTO FRAME - AUTO ROTATING SLIDESHOW */}
            <div className="our-company__photo our-company__photo--bottom">
              {sectionData.bottomPhotos.map((photo, index) => (
                <div
                  key={`bottom-${index}`}
                  className={`our-company__slide ${index === activePhotoIndex % sectionData.bottomPhotos.length ? "our-company__slide--active" : ""}`}
                >
                  {photo.src?.startsWith("http") ? (
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="our-company__img"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 360px"
                      className="our-company__img"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* FLOATING CIRCULAR EXPERIENCE BADGE */}
            <div className="our-company__badge">
              <div className="our-company__badge-inner" style={{ background: "#00875A", color: "#FFFFFF", boxShadow: "0 10px 30px rgba(0, 135, 90, 0.4)", border: "2px stroke #A7F3D0" }}>
                <strong style={{ color: "#FFFFFF" }}>{sectionData.badgeNumber}</strong>
                <span style={{ color: "#FFFFFF", whiteSpace: "pre-line" }}>{sectionData.badgeLabel}</span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE TEXT CONTENT */}
          <div className="our-company__content reveal-right">
            <span className="our-company__eyebrow">{sectionData.eyebrow}</span>

            <h2>
              {sectionData.headingNormal} <span>{sectionData.headingHighlight}</span>
            </h2>

            <div className="our-company__body">
              <p>{sectionData.paragraph1}</p>
              <p>{sectionData.paragraph2}</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
