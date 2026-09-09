"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const topPhotos = [
  { src: "/about/team1.jpg", alt: "Taapti software engineering team at office" },
  { src: "/about/team3.jpg", alt: "Taapti tech team reviewing project deliverables" },
  { src: "/about/team2.jpg", alt: "Taapti developers collaborating on code" },
];

const bottomPhotos = [
  { src: "/about/team2.jpg", alt: "Taapti developers collaborating on code" },
  { src: "/about/team3.jpg", alt: "Taapti tech team reviewing project deliverables" },
  { src: "/about/team1.jpg", alt: "Taapti software engineering team at office" },
];

export default function OurCompany() {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhotoIndex((prev) => (prev + 1) % topPhotos.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section our-company">

      <div className="container our-company__container">
        <div className="our-company__grid">
          
          {/* LEFT SIDE OVERLAPPING PHOTOS & FLOATING BADGE */}
          <div className="our-company__visual reveal-left">
            
            {/* 3D ROTATING DOT GRID SPHERES IN BACKGROUND (TOP-RIGHT AND BOTTOM-LEFT) */}
            <div className="our-company__sphere-bg our-company__sphere-bg--top-right" aria-hidden="true">
              <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g opacity="0.6">
                  {/* Outer & Inner Dot Grid Array Sphere */}
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
                  {/* Curved Globe Grid Dot Matrix */}
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
              {topPhotos.map((photo, index) => (
                <div
                  key={`top-${photo.src}-${index}`}
                  className={`our-company__slide ${index === activePhotoIndex ? "our-company__slide--active" : ""}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="our-company__img"
                  />
                </div>
              ))}
            </div>

            {/* BOTTOM FRONT PHOTO FRAME - AUTO ROTATING SLIDESHOW */}
            <div className="our-company__photo our-company__photo--bottom">
              {bottomPhotos.map((photo, index) => (
                <div
                  key={`bottom-${photo.src}-${index}`}
                  className={`our-company__slide ${index === activePhotoIndex ? "our-company__slide--active" : ""}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 360px"
                    className="our-company__img"
                  />
                </div>
              ))}
            </div>

            {/* FLOATING CIRCULAR EXPERIENCE BADGE */}
            <div className="our-company__badge">
              <div className="our-company__badge-inner">
                <strong>10</strong>
                <span>Years<br />experience</span>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE TEXT CONTENT */}
          <div className="our-company__content reveal-right">
            <span className="our-company__eyebrow">OUR COMPANY</span>

            <h2>
              A founder-led software team that <span>ships to production</span>
            </h2>

            <div className="our-company__body">
              <p>
                Taapti Technologies is a founder-led software team based in Surat, India,
                working with clients from California to Sydney. We build full-stack products
                end to end: backends in Java, Spring Boot, Node.js and Python, web and
                mobile front-ends in React, Next.js and React Native, and AI features built on
                RAG. We have shipped for USP, Bar.Stream and Invoxbooks.
              </p>

              <p>
                You work directly with the engineers writing your code, not a layer of
                account managers. Most clients keep three to four hours of daily overlap
                with our team, so reviews and decisions happen the same day. We bill in
                USD by the hour, and you pay only for hours actually worked.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
