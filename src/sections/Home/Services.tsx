"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import EnquireModal from "@/components/EnquireModal";

const defaultServicesList = [
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
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [sectionData, setSectionData] = useState({
    badgeText: "WHAT WE DO",
    headingLine1: "Engineering solutions",
    headingHighlight: "built for impact.",
    subheading:
      "We help ambitious businesses build, improve and scale digital products with modern software engineering and AI.",
    services: defaultServicesList,
  });

  const fetchServicesData = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/services-section?_t=${Date.now()}`, {
        cache: "no-store",
      }).catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setSectionData({
            badgeText: json.data.badgeText || "WHAT WE DO",
            headingLine1: json.data.headingLine1 || "Engineering solutions",
            headingHighlight: json.data.headingHighlight || "built for impact.",
            subheading: json.data.subheading || "",
            services: json.data.services && json.data.services.length > 0 ? json.data.services : defaultServicesList,
          });
        }
      }
    } catch {
      // Silent fallback if backend is temporarily unreachable
    }
  };

  useEffect(() => {
    fetchServicesData();

    // BroadcastChannel real-time sync
    let bc: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      bc = new BroadcastChannel("taapti_cms_updates");
      bc.onmessage = (event) => {
        if (event.data === "SERVICES_SECTION_UPDATED" || event.data === "CMS_UPDATED") {
          console.log("⚡ Real-time Services section update received!");
          fetchServicesData();
        }
      };
    }

    const interval = setInterval(fetchServicesData, 3000);

    return () => {
      clearInterval(interval);
      if (bc) bc.close();
    };
  }, []);

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

  const handleOpenModal = (title: string) => {
    setSelectedServiceTitle(title);
    setIsModalOpen(true);
  };

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
              {sectionData.badgeText} <span></span>
            </div>

            <h2>
              {sectionData.headingLine1}{" "}
              <span className="services__blue-title">{sectionData.headingHighlight}</span>
            </h2>

            <p className="services__desc">
              {sectionData.subheading}
            </p>
          </div>
        </div>

        {/* 2x2 CARDS GRID */}
        <div className="services__grid">
          {sectionData.services.map((service, idx) => {
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
                key={service.number || idx}
              >
                {/* LEFT SIDE IMAGE PREVIEW */}
                <div className="service-card__left-image">
                  <div className="service-card__left-image-inner">
                    {service.image?.startsWith("http") ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="service-card__img"
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 220px"
                        className="service-card__img"
                      />
                    )}
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

                  <div className="service-card__bottom" style={{ justifyContent: "flex-end" }}>
                    <button
                      type="button"
                      className="service-card__btn-circle"
                      aria-label={`Enquire about ${service.title}`}
                      onClick={() => handleOpenModal(service.title)}
                      style={{ border: "none", cursor: "pointer" }}
                    >
                      →
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* Interactive Enquire Lead Modal */}
      <EnquireModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceTitle={selectedServiceTitle}
      />
    </section>
  );
}