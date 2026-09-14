"use client";

import { useState, useEffect } from "react";

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: string;
}

interface GalleryData {
  badgeText: string;
  heading: string;
  subheading: string;
  images: GalleryImage[];
}

const defaultGallery: GalleryData = {
  badgeText: "OUR GALLERY",
  heading: "Engineering & Culture in Action",
  subheading:
    "Explore moments from our engineering hub, client workshops, tech summits, and collaborative culture.",
  images: [
    {
      id: "g1",
      url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
      title: "Engineering Team Collaboration",
      category: "Culture",
    },
    {
      id: "g2",
      url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80",
      title: "Architecture & Design Workshop",
      category: "Workshops",
    },
    {
      id: "g3",
      url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80",
      title: "Client Technology Summit",
      category: "Events",
    },
    {
      id: "g4",
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
      title: "Cloud & Microservices Development",
      category: "Engineering",
    },
    {
      id: "g5",
      url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
      title: "AI & Systems Hackathon",
      category: "Innovation",
    },
    {
      id: "g6",
      url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80",
      title: "Taapti Technology Hub",
      category: "Workspace",
    },
  ],
};

export default function Gallery() {
  const [data, setData] = useState<GalleryData>(defaultGallery);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const fetchGallery = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/gallery").catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json && json.images && json.images.length > 0) {
          setData(json);
        }
      }
    } catch {
      // Keep fallback defaultGallery state quietly
    }
  };

  useEffect(() => {
    fetchGallery();

    const sectionEl = document.getElementById("gallery");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionEl) observer.observe(sectionEl);

    let channel: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel("taapti_cms_updates");
      channel.onmessage = (event) => {
        if (event.data === "GALLERY_UPDATED" || event.data === "CMS_UPDATED") {
          fetchGallery();
        }
      };
    }

    const interval = setInterval(() => {
      fetchGallery();
    }, 3000);

    return () => {
      if (sectionEl) observer.unobserve(sectionEl);
      if (channel) channel.close();
      clearInterval(interval);
    };
  }, []);

  const categories = ["All", ...Array.from(new Set(data.images.map((img) => img.category)))];

  const filteredImages =
    activeCategory === "All"
      ? data.images
      : data.images.filter((img) => img.category === activeCategory);

  return (
    <section className={`section home-gallery-section ${isVisible ? "is-visible" : ""}`} id="gallery">
      <div className="container">
        {/* Section Header */}
        <div className="section-heading text-center reveal-down">
          <span className="badge badge-primary">{data.badgeText}</span>
          <h2>{data.heading}</h2>
          <p>{data.subheading}</p>
        </div>

        {/* Category Filters */}
        <div className="gallery-filters reveal-up">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`gallery-filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid with Staggered Entrance & Category Animations */}
        <div className="gallery-grid">
          {filteredImages.map((img, idx) => (
            <div
              key={`${img.id}-${activeCategory}`}
              className="gallery-card gallery-card-anim"
              style={{
                transitionDelay: `${idx * 0.1}s`,
                animationDelay: `${idx * 0.08}s`,
              }}
              onClick={() => setLightboxImage(img)}
            >
              <div className="gallery-img-wrapper">
                <img src={img.url} alt={img.title} className="gallery-img" />
                <div className="gallery-overlay">
                  <span className="gallery-cat-tag">{img.category}</span>
                  <h4 className="gallery-title">{img.title}</h4>
                  <span className="gallery-zoom-icon">🔍 View Photo</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="gallery-lightbox" onClick={() => setLightboxImage(null)}>
          <div className="gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="gallery-lightbox-close"
              onClick={() => setLightboxImage(null)}
              aria-label="Close Lightbox"
            >
              ✕
            </button>
            <img src={lightboxImage.url} alt={lightboxImage.title} />
            <div className="gallery-lightbox-caption">
              <span className="gallery-cat-tag">{lightboxImage.category}</span>
              <h3>{lightboxImage.title}</h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
