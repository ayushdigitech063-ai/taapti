"use client";

import { useState } from "react";
import Link from "next/link";

const blogPosts = [
  {
    category: "Engineering",
    date: "Sep 05, 2026",
    title: "How to Build Scalable Software That Grows With Your Business",
    description:
      "Practical engineering principles for building reliable, maintainable and high-throughput software systems without taking on excessive technical debt.",
    slug: "building-scalable-software",
    readTime: "6 min read",
    author: "Arjun Verma",
    role: "Principal Architect",
    tags: ["#SystemDesign", "#Architecture", "#Scalability"],
    featured: true,
  },
  {
    category: "AI & Technology",
    date: "Aug 28, 2026",
    title: "Building Practical AI & RAG Solutions for Modern Businesses",
    description:
      "How enterprise teams can leverage vector databases, LLM orchestration, and RAG pipelines to automate complex workflows.",
    slug: "practical-ai-solutions",
    readTime: "5 min read",
    author: "Neha Sharma",
    role: "AI Lead Engineer",
    tags: ["#ArtificialIntelligence", "#RAG", "#Pinecone"],
    featured: false,
  },
  {
    category: "Modernization",
    date: "Aug 20, 2026",
    title: "Modernizing Legacy Monoliths Without a Big-Bang Rewrite",
    description:
      "A step-by-step strangler fig strategy for incrementally breaking down legacy codebases into cloud-native microservices.",
    slug: "legacy-modernization",
    readTime: "7 min read",
    author: "Rohan Gupta",
    role: "DevOps Architect",
    tags: ["#Microservices", "#AWS", "#Docker"],
    featured: false,
  },
  {
    category: "Product Development",
    date: "Aug 12, 2026",
    title: "From Product Vision to Production-Ready Software",
    description:
      "The critical milestones required to turn high-level product specifications into resilient, scalable digital products.",
    slug: "idea-to-production",
    readTime: "6 min read",
    author: "Priya Mehta",
    role: "Product Lead",
    tags: ["#ProductEngineering", "#Agile", "#UIUX"],
    featured: false,
  },
  {
    category: "Web Development",
    date: "Aug 05, 2026",
    title: "Why Next.js & Edge Architecture Matter for Modern Apps",
    description:
      "Understanding server components, streaming SSR, and edge deployment for ultra-fast web performance.",
    slug: "modern-web-architecture",
    readTime: "5 min read",
    author: "Arjun Verma",
    role: "Principal Architect",
    tags: ["#NextJS", "#React", "#TypeScript"],
    featured: false,
  },
  {
    category: "Engineering",
    date: "Jul 28, 2026",
    title: "Designing Resilient REST & GraphQL APIs for Scale",
    description:
      "Best practices for API versioning, rate limiting, error handling, and performance optimization at scale.",
    slug: "building-better-apis",
    readTime: "6 min read",
    author: "Rohan Gupta",
    role: "DevOps Architect",
    tags: ["#APIDesign", "#GraphQL", "#PostgreSQL"],
    featured: false,
  },
];

const categories = [
  "All",
  "Engineering",
  "AI & Technology",
  "Modernization",
  "Product Development",
  "Web Development",
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogPosts[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <main style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}>
      {/* Dynamic Light Hero Banner */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(120deg, #f0f7ff 0%, #e0f0ff 45%, #eff6ff 80%, #f8fafc 100%)",
          padding: "140px 0 90px",
          borderBottom: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        {/* Soft Decorative Background SVG Curved Lines */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%", opacity: 0.85 }}
            preserveAspectRatio="none"
          >
            <path
              d="M750 -100 C 950 150, 1150 450, 1600 650"
              stroke="#2563eb"
              strokeWidth="1.5"
              strokeOpacity="0.4"
            />
            <circle cx="1130" cy="130" r="6" fill="#2563eb" />
            <path
              d="M600 -50 Q 1000 250 1500 450"
              stroke="#60a5fa"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.3"
            />
          </svg>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "780px" }} className="animate-from-left">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 16px",
                borderRadius: "999px",
                background: "#ffffff",
                border: "1px solid #bfdbfe",
                boxShadow: "0 4px 15px rgba(37,99,235,0.06)",
                fontSize: "13px",
                fontWeight: "700",
                color: "#1d4ed8",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#2563eb",
                  boxShadow: "0 0 8px #2563eb",
                }}
              />
              Engineering Insights & Code
            </div>

            <h1
              style={{
                fontSize: "clamp(38px, 5vw, 64px)",
                fontWeight: "800",
                lineHeight: "1.12",
                letterSpacing: "-0.035em",
                color: "#0a0d14",
                marginBottom: "24px",
              }}
            >
              Practical ideas for building{" "}
              <span style={{ color: "#2563eb", display: "block" }}>
                better software.
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(16px, 1.2vw, 19px)",
                lineHeight: "1.7",
                color: "#475569",
                marginBottom: "36px",
                maxWidth: "680px",
              }}
            >
              Articles, architectural deep-dives, and technical perspectives from the senior engineering team at Taapti Technologies.
            </p>

            {/* Search Input Bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#ffffff",
                border: "1px solid #cbd5e1",
                borderRadius: "16px",
                padding: "6px 8px 6px 20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
                maxWidth: "540px",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search articles by topic, keyword or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  border: "none",
                  background: "transparent",
                  outline: "none",
                  padding: "12px",
                  fontSize: "14.5px",
                  width: "100%",
                  color: "#0f172a",
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{
                    background: "#f1f5f9",
                    border: "none",
                    borderRadius: "50%",
                    width: "28px",
                    height: "28px",
                    cursor: "pointer",
                    color: "#64748b",
                    fontSize: "13px",
                  }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Blog Content Section */}
      <section style={{ padding: "80px 0 110px" }}>
        <div className="container">
          {/* Category Filter Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "50px",
              borderBottom: "1px solid #e2e8f0",
              paddingBottom: "20px",
            }}
          >
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  style={{
                    padding: "10px 22px",
                    borderRadius: "999px",
                    fontSize: "13.5px",
                    fontWeight: "700",
                    border: isActive ? "2px solid #2563eb" : "1px solid #cbd5e1",
                    background: isActive ? "#2563eb" : "#ffffff",
                    color: isActive ? "#ffffff" : "#475569",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isActive ? "0 4px 15px rgba(37,99,235,0.25)" : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Featured Article Card */}
          {selectedCategory === "All" && !searchQuery && (
            <div style={{ marginBottom: "60px" }} className="animate-from-left">
              <div
                style={{
                  fontSize: "12px",
                  fontWeight: "800",
                  color: "#1d4ed8",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: "16px",
                }}
              >
                Featured Insight
              </div>
              <article
                style={{
                  background: "#ffffff",
                  borderRadius: "28px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 20px 45px rgba(0,0,0,0.05)",
                  overflow: "hidden",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                  gap: "0",
                }}
              >
                <div
                  style={{
                    background: "linear-gradient(135deg, #0b0f19 0%, #0a1324 100%)",
                    padding: "48px",
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "20px" }}>
                      <span
                        style={{
                          background: "rgba(56,189,248,0.15)",
                          color: "#38bdf8",
                          border: "1px solid rgba(56,189,248,0.3)",
                          padding: "6px 14px",
                          borderRadius: "999px",
                          fontSize: "12px",
                          fontWeight: "800",
                          textTransform: "uppercase",
                        }}
                      >
                        {featuredPost.category}
                      </span>
                      <span style={{ fontSize: "13px", color: "#94a3b8" }}>{featuredPost.readTime}</span>
                    </div>

                    <h2
                      style={{
                        fontSize: "clamp(26px, 3vw, 36px)",
                        fontWeight: "800",
                        color: "#ffffff",
                        lineHeight: "1.25",
                        marginBottom: "18px",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {featuredPost.title}
                    </h2>

                    <p style={{ fontSize: "16px", color: "#94a3b8", lineHeight: "1.7", marginBottom: "28px" }}>
                      {featuredPost.description}
                    </p>
                  </div>

                  <div>
                    <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
                      {featuredPost.tags.map((t, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            color: "#cbd5e1",
                            padding: "4px 10px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "600",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "700", color: "#ffffff" }}>{featuredPost.author}</div>
                        <div style={{ fontSize: "12px", color: "#64748b" }}>{featuredPost.role}</div>
                      </div>

                      <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="btn btn-primary"
                        style={{ height: "46px", padding: "0 22px", fontSize: "14px" }}
                      >
                        Read Article <span>→</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div
                  style={{
                    background: "radial-gradient(circle at center, #eff6ff 0%, #dbeafe 100%)",
                    padding: "48px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      borderRadius: "50%",
                      background: "#ffffff",
                      boxShadow: "0 20px 40px rgba(37,99,235,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                    </svg>
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
                    Production System Engineering
                  </div>
                  <div style={{ fontSize: "14px", color: "#64748b" }}>
                    Published on {featuredPost.date} by {featuredPost.author}
                  </div>
                </div>
              </article>
            </div>
          )}

          {/* Grid of Filtered Posts */}
          <div style={{ marginBottom: "30px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "28px" }}>
              <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a" }}>
                {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
              </h3>
              <span style={{ fontSize: "14px", color: "#64748b", fontWeight: "600" }}>
                Showing {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
              </span>
            </div>

            {filteredPosts.length === 0 ? (
              <div
                style={{
                  background: "#ffffff",
                  borderRadius: "20px",
                  padding: "60px",
                  textAlign: "center",
                  border: "1px dashed #cbd5e1",
                }}
              >
                <div style={{ fontSize: "18px", fontWeight: "700", color: "#0f172a", marginBottom: "8px" }}>
                  No articles found
                </div>
                <p style={{ color: "#64748b", fontSize: "14px", marginBottom: "20px" }}>
                  Try resetting your search query or choosing another category filter.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                  }}
                  className="btn btn-outline"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: "28px",
                }}
              >
                {filteredPosts.map((post, idx) => (
                  <article
                    key={post.slug}
                    className={idx % 2 === 0 ? "animate-from-left" : "animate-from-right"}
                    style={{
                      background: "#ffffff",
                      borderRadius: "24px",
                      border: "1px solid #e2e8f0",
                      padding: "32px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "all 0.3s ease",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                    }}
                  >
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                        <span
                          style={{
                            background: "#eff6ff",
                            color: "#1d4ed8",
                            padding: "4px 12px",
                            borderRadius: "999px",
                            fontSize: "11.5px",
                            fontWeight: "800",
                            textTransform: "uppercase",
                          }}
                        >
                          {post.category}
                        </span>
                        <span style={{ fontSize: "12.5px", color: "#94a3b8", fontWeight: "600" }}>{post.readTime}</span>
                      </div>

                      <h3
                        style={{
                          fontSize: "20px",
                          fontWeight: "800",
                          color: "#0f172a",
                          lineHeight: "1.35",
                          marginBottom: "12px",
                        }}
                      >
                        {post.title}
                      </h3>

                      <p style={{ fontSize: "14.5px", color: "#64748b", lineHeight: "1.65", marginBottom: "20px" }}>
                        {post.description}
                      </p>
                    </div>

                    <div>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
                        {post.tags.map((t, idx) => (
                          <span
                            key={idx}
                            style={{
                              background: "#f1f5f9",
                              color: "#475569",
                              fontSize: "11.5px",
                              padding: "3px 8px",
                              borderRadius: "4px",
                              fontWeight: "600",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "18px" }}>
                        <div>
                          <div style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a" }}>{post.author}</div>
                          <div style={{ fontSize: "11.5px", color: "#94a3b8" }}>{post.date}</div>
                        </div>

                        <Link
                          href={`/blog/${post.slug}`}
                          style={{
                            color: "#1d4ed8",
                            fontWeight: "700",
                            fontSize: "14px",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          Read <span>→</span>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ padding: "80px 0 110px", background: "#f8fafc" }}>
        <div className="container">
          <div
            className="animate-from-right"
            style={{
              background: "linear-gradient(135deg, #0b0f19 0%, #0f172a 100%)",
              borderRadius: "32px",
              padding: "50px 40px",
              color: "#ffffff",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "40px",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div>
              <span
                style={{
                  color: "#38bdf8",
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  display: "inline-block",
                }}
              >
                Engineering Digest
              </span>
              <h2 style={{ fontSize: "32px", fontWeight: "800", color: "#ffffff", marginBottom: "12px" }}>
                Stay updated with engineering insights.
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "15px", lineHeight: "1.6" }}>
                Join 2,500+ CTOs, tech leads, and developers receiving our bi-weekly newsletter on software architecture, AI, and cloud performance.
              </p>
            </div>

            <div>
              {subscribed ? (
                <div
                  style={{
                    background: "rgba(16,185,129,0.15)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    borderRadius: "16px",
                    padding: "20px",
                    textAlign: "center",
                    color: "#10b981",
                    fontWeight: "700",
                  }}
                >
                  ✓ Thank you! You&apos;re now subscribed to Taapti Engineering Digest.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <input
                    type="email"
                    required
                    placeholder="Enter your work email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    style={{
                      flex: "1",
                      minWidth: "220px",
                      height: "52px",
                      background: "rgba(255,255,255,0.08)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      borderRadius: "14px",
                      padding: "0 18px",
                      color: "#ffffff",
                      fontSize: "14.5px",
                      outline: "none",
                    }}
                  />
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      height: "52px",
                      padding: "0 28px",
                      background: "linear-gradient(135deg, #0070f3 0%, #0051cb 100%)",
                    }}
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}