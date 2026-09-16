"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { API_ENDPOINTS } from "@/utils/api";

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
  const [posts, setPosts] = useState<any[]>(blogPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleLimit, setVisibleLimit] = useState(5);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const fetchBlogs = async () => {
    try {
      const res = await fetch(`${API_ENDPOINTS.BLOGS}?status=Published`).catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          const mapped = data.data.map((b: any) => ({
            category: b.category || "Engineering",
            date: new Date(b.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
            title: b.title,
            description: b.summary,
            slug: b.slug,
            readTime: b.readTime || "5 min read",
            author: b.authorName || "Admin",
            role: b.authorRole || "Senior Engineer",
            tags: b.tags && b.tags.length > 0 ? b.tags : ["#SoftwareEngineering"],
            featured: false,
            coverImage: b.coverImage,
            contentHtml: b.contentHtml
          }));
          setPosts(mapped);
        }
      }
    } catch { /* silent */ }
  };

  useEffect(() => {
    fetchBlogs();
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const bc = new BroadcastChannel("taapti_cms_updates");
      bc.onmessage = () => {
        fetchBlogs();
      };
      return () => bc.close();
    }
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0] || blogPosts[0];

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
                border: "1px solid #a7f3d0",
                boxShadow: "0 4px 15px rgba(0,135,90,0.06)",
                fontSize: "13px",
                fontWeight: "700",
                color: "#00875A",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#00875A",
                  boxShadow: "0 0 8px #00875A",
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
              <span style={{ color: "#00875A", display: "block" }}>
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
                    border: isActive ? "none" : "1px solid #cbd5e1",
                    background: isActive ? "linear-gradient(135deg, #10243E 0%, #00875A 100%)" : "#ffffff",
                    color: isActive ? "#ffffff" : "#475569",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    boxShadow: isActive ? "0 8px 24px rgba(0, 135, 90, 0.28)" : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>



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
              <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
                {/* UNIFORM GRID: 3 BLOG CARDS PER ROW */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: "28px",
                  }}
                >
                  {filteredPosts.slice(0, visibleLimit).map((post) => (
                    <article
                      key={post.slug}
                      style={{
                        background: "#ffffff",
                        borderRadius: "20px",
                        border: "1px solid #e2e8f0",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "0 4px 18px rgba(0,0,0,0.03)",
                        transition: "transform 0.2s ease, box-shadow 0.2s ease",
                      }}
                    >
                      {/* Top Image Banner */}
                      <div style={{ height: "200px", background: "linear-gradient(135deg, #0b0f19 0%, #1e293b 100%)", position: "relative", overflow: "hidden" }}>
                        {post.coverImage ? (
                          <img src={post.coverImage} alt={post.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "radial-gradient(circle, #1e293b 0%, #0f172a 100%)", color: "#94a3b8", fontSize: "38px" }}>
                            💻
                          </div>
                        )}
                        <span style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(15, 23, 42, 0.85)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)", padding: "4px 10px", borderRadius: "999px", fontSize: "10.5px", fontWeight: "800", textTransform: "uppercase", backdropFilter: "blur(4px)" }}>
                          {post.category}
                        </span>
                      </div>

                      {/* Content Below */}
                      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <div>
                          <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: "600", marginBottom: "8px" }}>
                            {post.readTime} • Published on {post.date}
                          </div>
                          <h3 style={{ fontSize: "19px", fontWeight: "800", color: "#0f172a", lineHeight: "1.35", marginBottom: "10px" }}>
                            {post.title}
                          </h3>
                          <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6", marginBottom: "18px", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {post.description}
                          </p>
                        </div>

                        <div>
                          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "16px" }}>
                            {post.tags.map((t: string, i: number) => (
                              <span key={i} style={{ background: "#f1f5f9", color: "#475569", fontSize: "11px", padding: "3px 8px", borderRadius: "4px", fontWeight: "600" }}>
                                {t}
                              </span>
                            ))}
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #f1f5f9", paddingTop: "14px" }}>
                            <div>
                              <div style={{ fontSize: "12.5px", fontWeight: "700", color: "#0f172a" }}>{post.author}</div>
                              <div style={{ fontSize: "11px", color: "#64748b" }}>{post.role || "Senior Architect"}</div>
                            </div>
                            <Link href={`/blog/${post.slug}`} style={{ color: "#00875A", fontWeight: "700", fontSize: "13.5px", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                              Read Article →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {/* VIEW MORE / LOAD MORE BUTTON */}
                {filteredPosts.length > visibleLimit && (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                      onClick={() => setVisibleLimit((prev) => prev + 6)}
                      style={{
                        padding: "14px 36px",
                        background: "linear-gradient(135deg, #10243E 0%, #00875A 100%)",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "99px",
                        fontSize: "15px",
                        fontWeight: "800",
                        cursor: "pointer",
                        boxShadow: "0 8px 25px rgba(0, 135, 90, 0.3)",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      View More Articles ({filteredPosts.length - visibleLimit} remaining) ↓
                    </button>
                  </div>
                )}
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
                      background: "linear-gradient(135deg, #10243E 0%, #00875A 100%)",
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