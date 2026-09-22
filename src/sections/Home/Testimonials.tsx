"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";

const defaultReviews = [
  {
    name: "Rohit Sharma",
    date: "2 weeks ago",
    avatar: "/testimonials/rohit.jpg",
    rating: 5,
    review:
      "Amazing experience working with the team! They understood our requirements perfectly and delivered beyond expectations. Highly recommended!",
  },
  {
    name: "Priya Mehta",
    date: "1 month ago",
    avatarBg: "#9333ea",
    initial: "P",
    rating: 5,
    review:
      "Professional, responsive and great at what they do. The entire process was smooth and the final product exceeded our expectations. Truly a reliable team!",
  },
  {
    name: "Amit Verma",
    date: "3 weeks ago",
    avatar: "/testimonials/rohit.jpg",
    rating: 5,
    review:
      "Excellent service and support. The team is very professional and delivers high-quality work on time. Would definitely work with them again!",
  },
  {
    name: "Saurabh Joshi",
    date: "1 month ago",
    avatarBg: "#2563eb",
    initial: "S",
    rating: 5,
    review:
      "Taapti Technologies built our scalable web application from scratch with flawless execution. Outstanding technical capabilities and engineering standards!",
  },
  {
    name: "Neha Kapoor",
    date: "2 months ago",
    avatarBg: "#059669",
    initial: "N",
    rating: 5,
    review:
      "The engineering team is super quick, transparent and direct to communicate with. Overlap hours were super productive for our California team!",
  },
];

export default function Testimonials() {
  const [data, setData] = useState({
    eyebrow: "Google Reviews Official Badge",
    headingNormal: "Loved by Our",
    headingHighlight: "Clients",
    subtitle: "Real feedback from real people on Google.",
    reviews: defaultReviews,
  });

  const [activePage, setActivePage] = useState(0);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/testimonials`).catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json && json.success && json.data) {
          const d = json.data;
          setData({
            eyebrow: d.eyebrow || "Google Reviews Official Badge",
            headingNormal: d.headingNormal || "Loved by Our",
            headingHighlight: d.headingHighlight || "Clients",
            subtitle: d.subtitle || "Real feedback from real people on Google.",
            reviews: d.reviews && d.reviews.length > 0 ? d.reviews : defaultReviews,
          });
        }
      }
    } catch {
      /* silent */
    }
  };

  useEffect(() => {
    fetchTestimonials();

    let channel: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel("taapti_cms_updates");
      channel.onmessage = (event) => {
        if (event.data === "TESTIMONIALS_UPDATED" || event.data === "CMS_UPDATED") {
          fetchTestimonials();
        }
      };
    }

    return () => {
      if (channel) channel.close();
    };
  }, []);

  const handlePrev = () => {
    setActivePage((prev) => (prev === 0 ? data.reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActivePage((prev) => (prev >= data.reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="section google-reviews-section">
      <div className="container google-reviews__container">
        
        {/* GOOGLE BRANDED HEADER */}
        <div className="google-reviews__header text-center reveal-down">
          {/* GOOGLE OFFICIAL COLORED LOGO */}
          <div className="google-reviews__logo-wrapper">
            <svg viewBox="0 -12 272 110" width="140" height="48" aria-label="Google">
              <path fill="#4285F4" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.27 81.24 25 93.5 25s22.25 9.27 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.84 5.79 13.44 12.51 13.44s12.51-5.6 12.51-13.44z"/>
              <path fill="#EA4335" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.91 9.99-22.18 22.25-22.18s22.25 9.27 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.84 5.79 13.44 12.51 13.44s12.51-5.6 12.51-13.44z"/>
              <path fill="#FBBC05" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13.01v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.6 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.45zm-8.99 21c0-7.84-5.21-13.27-11.93-13.27-6.89 0-12.6 5.43-12.6 13.27 0 7.7 5.71 13.27 12.6 13.27 6.72 0 11.93-5.57 11.93-13.27z"/>
              <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z"/>
              <path fill="#34A853" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.49 9.83-12.6 0-22.01-9.83-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.99 14.11l1.01 2.6-28.57 11.85c2.18 4.37 5.63 6.55 10.5 6.55 4.87 0 8.15-2.35 10.08-5.62zm-19.83-7.81l19.08-7.9c-1.09-2.77-4.37-4.7-8.23-4.7-4.96 0-11.6 4.37-10.85 12.6z"/>
              <path fill="#EA4335" d="M35.29 41.41V32.4h33.87c.34 1.6.5 3.3.5 5.29 0 6.5-1.76 14.6-7.56 20.4-5.63 5.96-13.07 9.16-23.31 9.16C17.38 67.25 0 49.87 0 28.5C0 7.13 17.38-10.25 38.79-10.25c11.76 0 20.42 4.62 26.8 10.67l-7.56 7.56c-4.62-4.37-10.84-7.73-19.24-7.73-15.63 0-28.06 12.6-28.06 28.25s12.43 28.25 28.06 28.25c10.17 0 15.96-4.12 19.66-7.82 3.03-3.03 5.04-7.39 5.8-13.11H35.29z"/>
            </svg>
          </div>

          <h2>
            {data.headingNormal} <span style={{ color: "#10243E" }}>{data.headingHighlight}</span>
          </h2>

          <p className="google-reviews__subtitle">
            {data.subtitle}
          </p>

          <div className="google-reviews__divider-line" aria-hidden="true"></div>
        </div>

        {/* CAROUSEL SLIDER WRAPPER */}
        <div className="google-reviews__carousel reveal-up">
          
          {/* PREVIOUS BUTTON */}
          <button
            className="google-reviews__arrow google-reviews__arrow--prev"
            onClick={handlePrev}
            type="button"
            aria-label="Previous Google Reviews"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
          </button>

          {/* VISIBLE CARDS TRACK */}
          <div className="google-reviews__cards-track">
            {data.reviews.map((review, index) => {
              const isVisibleDesktop = index >= activePage && index < activePage + 3;
              const isVisibleMobile = index === activePage;

              return (
                <article
                  className={`google-review-card ${
                    isVisibleDesktop ? "google-review-card--desktop-visible" : "google-review-card--desktop-hidden"
                  } ${isVisibleMobile ? "google-review-card--mobile-active" : "google-review-card--mobile-hidden"}`}
                  key={`${review.name}-${index}`}
                >
                  {/* CARD HEADER */}
                  <div className="google-review-card__header">
                    <div className="google-review-card__user">
                      {review.avatar ? (
                        <div className="google-review-card__avatar" style={{ position: "relative", width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden" }}>
                          <Image
                            src={review.avatar}
                            alt={review.name}
                            width={44}
                            height={44}
                            unoptimized
                            style={{ objectFit: "cover" }}
                          />
                        </div>
                      ) : (
                        <div
                          className="google-review-card__avatar-initial"
                          style={{ backgroundColor: review.avatarBg || "#2563eb" }}
                        >
                          {review.initial || review.name.charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className="google-review-card__meta">
                        <h3>{review.name}</h3>
                        <span>{review.date}</span>
                      </div>
                    </div>

                    {/* OFFICIAL GOOGLE FULL LOGO */}
                    <div className="google-review-card__g-logo">
                      <svg viewBox="0 -12 272 110" width="66" height="22" aria-label="Google">
                        <path fill="#4285F4" d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.27 81.24 25 93.5 25s22.25 9.27 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.84 5.79 13.44 12.51 13.44s12.51-5.6 12.51-13.44z"/>
                        <path fill="#EA4335" d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.91 9.99-22.18 22.25-22.18s22.25 9.27 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.84 5.79 13.44 12.51 13.44s12.51-5.6 12.51-13.44z"/>
                        <path fill="#FBBC05" d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13.01v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.6 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.45zm-8.99 21c0-7.84-5.21-13.27-11.93-13.27-6.89 0-12.6 5.43-12.6 13.27 0 7.7 5.71 13.27 12.6 13.27 6.72 0 11.93-5.57 11.93-13.27z"/>
                        <path fill="#4285F4" d="M225 3v65h-9.5V3h9.5z"/>
                        <path fill="#34A853" d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.49 9.83-12.6 0-22.01-9.83-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.99 14.11l1.01 2.6-28.57 11.85c2.18 4.37 5.63 6.55 10.5 6.55 4.87 0 8.15-2.35 10.08-5.62zm-19.83-7.81l19.08-7.9c-1.09-2.77-4.37-4.7-8.23-4.7-4.96 0-11.6 4.37-10.85 12.6z"/>
                        <path fill="#EA4335" d="M35.29 41.41V32.4h33.87c.34 1.6.5 3.3.5 5.29 0 6.5-1.76 14.6-7.56 20.4-5.63 5.96-13.07 9.16-23.31 9.16C17.38 67.25 0 49.87 0 28.5C0 7.13 17.38-10.25 38.79-10.25c11.76 0 20.42 4.62 26.8 10.67l-7.56 7.56c-4.62-4.37-10.84-7.73-19.24-7.73-15.63 0-28.06 12.6-28.06 28.25s12.43 28.25 28.06 28.25c10.17 0 15.96-4.12 19.66-7.82 3.03-3.03 5.04-7.39 5.8-13.11H35.29z"/>
                      </svg>
                    </div>
                  </div>

                  {/* 5 GOLDEN STARS */}
                  <div className="google-review-card__stars" aria-label="5 out of 5 stars">
                    {"★".repeat(review.rating || 5)}
                  </div>

                  {/* REVIEW TEXT BODY */}
                  <p className="google-review-card__text">{review.review}</p>
                </article>
              );
            })}
          </div>

          {/* NEXT BUTTON */}
          <button
            className="google-reviews__arrow google-reviews__arrow--next"
            onClick={handleNext}
            type="button"
            aria-label="Next Google Reviews"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* DOTS PAGINATION INDICATOR */}
        <div className="google-reviews__dots">
          {data.reviews.map((_, index) => (
            <button
              key={index}
              className={`google-reviews__dot ${index === activePage ? "google-reviews__dot--active" : ""}`}
              onClick={() => setActivePage(index)}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>

        {/* READ MORE GOOGLE REVIEWS BUTTON */}
        <div className="google-reviews__footer text-center">
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="google-reviews__btn"
          >
            <svg viewBox="0 0 24 24" width="20" height="20">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span>Read More Google Reviews</span>
            <span className="google-reviews__btn-arrow">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}