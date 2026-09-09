"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const services = [
  {
    number: "01",
    tag: "BUILD",
    title: "Software Engineering",
    description:
      "Build reliable, scalable and high-performance software products tailored to your business needs.",
    link: "/services/software-engineering",
    image: "/services/se.jpg",
    active: true,
  },
  {
    number: "02",
    tag: "INTELLIGENCE",
    title: "AI & Machine Learning",
    description:
      "Turn AI opportunities into practical solutions that improve products, operations and customer experiences.",
    link: "/services/ai-machine-learning",
    image: "/services/ai.jpg",
    active: false,
  },
  {
    number: "03",
    tag: "WEB",
    title: "Web Development",
    description:
      "Modern, responsive web applications built for performance, usability and long-term scalability.",
    link: "/services/web-development",
    image: "/services/web.jpg",
    active: false,
  },
  {
    number: "04",
    tag: "PRODUCT",
    title: "Product Development",
    description:
      "From idea to launch, we help businesses design, develop and scale digital products.",
    link: "/services/product-development",
    image: "/services/product.jpg",
    active: false,
  },
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className={`section services ${isVisible ? "services--animated" : ""}`}>
      {/* SUBTLE DECORATIVE BACKGROUND LAYER */}
      <div className="services__bg-decor" aria-hidden="true">

        <div className="services__bg-grid"></div>
        <div className="services__bg-glow services__bg-glow--top-right"></div>
        <div className="services__bg-glow services__bg-glow--bottom-left"></div>

        {/* Subtle Side Annotations */}
        <div className="services__annotation services__annotation--left">
          <span className="services__annotation-dot"></span>
          <ul>
            <li>Ideas</li>
            <li>Technology</li>
            <li>People</li>
            <li>Real Impact</li>
          </ul>
        </div>

        <div className="services__annotation services__annotation--right">
          From ideas<br />to meaningful<br />products.
        </div>
      </div>

      <div className="container services__container">

        {/* TOP HEADER ROW */}
        <div className="services__header services__header--center reveal-down">
          <div className="services__heading-left">
            <div className="services__eyebrow">
              WHAT WE DO <span></span>
            </div>

            <h2>
              Engineering solutions{" "}
              <span className="services__blue-title">built for impact.</span>
            </h2>

            <p className="services__desc">
              We help ambitious businesses build, improve and scale digital products
              with modern software engineering and AI.
            </p>
          </div>
        </div>

        {/* 2x2 CARDS GRID */}
        <div className="services__grid">
          {services.map((service, idx) => {
            // Card 01 (top-left): comes from top (reveal-down)
            // Card 02 (top-right): comes from right (reveal-right)
            // Card 03 (bottom-left): comes from left (reveal-left)
            // Card 04 (bottom-right): comes from bottom (reveal-up)
            const revealClass =
              idx === 0
                ? "reveal-down"
                : idx === 1
                ? "reveal-right"
                : idx === 2
                ? "reveal-left"
                : "reveal-up";
            
            return (
              <article
                className={`service-card ${service.active ? "service-card--active" : ""} ${revealClass} delay-${(idx + 1) * 100}`}
                key={service.number}
              >
                {/* LEFT SIDE IMAGE PREVIEW */}
                <div className="service-card__left-image">
                  <div className="service-card__left-image-inner">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 220px"
                      className="service-card__img"
                    />
                  </div>
                </div>

                {/* RIGHT SIDE CONTENT */}
                <div className="service-card__right-content">
                  <div className="service-card__top">
                    <span className="service-card__number">{service.number}</span>
                    <span className="service-card__tag">{service.tag}</span>
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <div className="service-card__bottom">
                    <Link href={service.link} className="service-card__link">
                      Learn more <span>→</span>
                    </Link>

                    <Link href={service.link} className="service-card__btn-circle" aria-label={service.title}>
                      →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}