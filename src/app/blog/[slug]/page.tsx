import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Fallback articles dictionary if DB is offline or empty
const fallbackBlogs: Record<string, any> = {
  "building-scalable-software": {
    title: "How to Build Scalable Software That Grows With Your Business",
    category: "Software Engineering",
    slug: "building-scalable-software",
    authorName: "Arjun Verma",
    authorRole: "Principal Architect",
    authorAvatar: "",
    readTime: "6 min read",
    createdAt: "2026-09-05",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    summary: "Practical engineering principles for building reliable, maintainable and high-throughput software systems without taking on excessive technical debt.",
    contentHtml: `
      <h2>1. Design for High Availability & Low Coupling</h2>
      <p>Building software that scales requires separating concerns into decoupled services, caching hot data paths, and utilizing non-blocking asynchronous event architectures.</p>
      <h3>Core Architectural Pillars:</h3>
      <ul>
        <li><strong>Stateless API Application Tier:</strong> Enables horizontal auto-scaling without sticky session friction.</li>
        <li><strong>Database Read Replicas & Connection Pooling:</strong> Isolates heavy reporting queries from live transactional workloads.</li>
        <li><strong>Distributed Caching Layer (Redis):</strong> Reduces SQL query latency from 80ms down to sub-3ms.</li>
      </ul>
      <h2>2. Type Safety & Micro-Services Boundaries</h2>
      <p>Clean code architecture begins with end-to-end type safety, automated continuous integration tests, and explicit API contracts between microservices.</p>
    `,
    tags: ["SystemDesign", "Architecture", "Scalability", "Backend", "NodeJS"],
  },
  "practical-ai-solutions": {
    title: "Building Practical AI & RAG Solutions for Modern Businesses",
    category: "AI & Machine Learning",
    slug: "practical-ai-solutions",
    authorName: "Neha Sharma",
    authorRole: "AI Lead Engineer",
    authorAvatar: "",
    readTime: "5 min read",
    createdAt: "2026-08-28",
    coverImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
    summary: "How enterprise teams can leverage vector databases, LLM orchestration, and RAG pipelines to automate complex workflows.",
    contentHtml: `
      <h2>Retrieval Augmented Generation (RAG) in Practice</h2>
      <p>Generative AI model accuracy improves dramatically when grounded in proprietary enterprise knowledge data sources via vector embeddings.</p>
      <h2>Vector Search & Chunking Strategies</h2>
      <p>Optimal chunk sizes combined with dense retrieval algorithms ensure high relevance for contextual AI output.</p>
    `,
    tags: ["ArtificialIntelligence", "RAG", "Pinecone", "VectorDB", "LLMs"],
  },
  "legacy-modernization": {
    title: "Modernizing Legacy Monoliths Without a Big-Bang Rewrite",
    category: "Cloud Modernization",
    slug: "legacy-modernization",
    authorName: "Rohan Gupta",
    authorRole: "DevOps Architect",
    authorAvatar: "",
    readTime: "7 min read",
    createdAt: "2026-08-20",
    coverImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80",
    summary: "A step-by-step strangler fig strategy for incrementally breaking down legacy codebases into cloud-native microservices.",
    contentHtml: `
      <h2>The Strangler Fig Modernization Pattern</h2>
      <p>Replacing legacy codebases gradually reduces deployment risk while ensuring business operations run uninterrupted.</p>
    `,
    tags: ["Microservices", "AWS", "Docker", "Cloud", "Modernization"],
  },
  "idea-to-production": {
    title: "From Product Vision to Production-Ready Software",
    category: "Product Development",
    slug: "idea-to-production",
    authorName: "Priya Mehta",
    authorRole: "Product Lead",
    authorAvatar: "",
    readTime: "6 min read",
    createdAt: "2026-08-12",
    coverImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
    summary: "The critical milestones required to turn high-level product specifications into resilient, scalable digital products.",
    contentHtml: `
      <h2>Bridging Design & Production</h2>
      <p>Converting initial architectural concept maps into production-ready software systems with robust automated pipeline test steps.</p>
    `,
    tags: ["ProductEngineering", "Agile", "UIUX", "Software"],
  },
  "modern-web-architecture": {
    title: "Why Next.js & Edge Architecture Matter for Modern Apps",
    category: "Web Development",
    slug: "modern-web-architecture",
    authorName: "Arjun Verma",
    authorRole: "Principal Architect",
    authorAvatar: "",
    readTime: "5 min read",
    createdAt: "2026-08-05",
    coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    summary: "Understanding server components, streaming SSR, and edge deployment for ultra-fast web performance.",
    contentHtml: `
      <h2>Next.js App Router & Server Components</h2>
      <p>Combining Server Side Rendering with Client Side hydration yields lightning-fast web applications.</p>
    `,
    tags: ["NextJS", "React", "TypeScript", "Frontend"],
  },
  "building-better-apis": {
    title: "Designing Resilient REST & GraphQL APIs for Scale",
    category: "Engineering",
    slug: "building-better-apis",
    authorName: "Rohan Gupta",
    authorRole: "DevOps Architect",
    authorAvatar: "",
    readTime: "6 min read",
    createdAt: "2026-07-28",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    summary: "Best practices for API versioning, rate limiting, error handling, and performance optimization at scale.",
    contentHtml: `
      <h2>API Security & Rate Limiting</h2>
      <p>Designing robust API gateways and endpoints with JWT authorization, rate limiters, and clean OpenAPI specifications.</p>
    `,
    tags: ["APIDesign", "GraphQL", "PostgreSQL", "Backend"],
  }
};

import { API_ENDPOINTS } from "@/utils/api";

async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${API_ENDPOINTS.BLOGS}/${slug}`, {
      cache: "no-store",
    }).catch(() => null);

    if (res && res.ok) {
      const json = await res.json();
      if (json && json.success && json.data) {
        return json.data;
      }
    }
  } catch {
    /* silent */
  }
  return fallbackBlogs[slug] || null;
}

async function getAllPublishedBlogs() {
  let dbBlogs: any[] = [];
  try {
    const res = await fetch(`${API_ENDPOINTS.BLOGS}?status=Published`, {
      cache: "no-store",
    }).catch(() => null);

    if (res && res.ok) {
      const json = await res.json();
      if (json && json.success && Array.isArray(json.data)) {
        dbBlogs = json.data;
      }
    }
  } catch {
    /* silent */
  }

  // Combine DB blogs with fallback blogs to ensure sidebar is never empty
  const fallbackList = Object.values(fallbackBlogs);
  const combinedMap = new Map();

  dbBlogs.forEach((b: any) => combinedMap.set(b.slug, b));
  fallbackList.forEach((b: any) => {
    if (!combinedMap.has(b.slug)) {
      combinedMap.set(b.slug, b);
    }
  });

  return Array.from(combinedMap.values());
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    return {
      title: "Article Not Found | TaapTi Technologies",
    };
  }

  return {
    title: `${blog.title} | TaapTi Technologies Blog`,
    description: blog.summary,
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const blog = await getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const allBlogs = await getAllPublishedBlogs();
  const sidebarBlogs = allBlogs.filter((b: any) => b.slug !== blog.slug).slice(0, 5);

  return (
    <main style={{ backgroundColor: "#F8FAFC", color: "#0F172A", minHeight: "100vh", paddingTop: "100px" }}>
        
        {/* ========================================================================= */}
        {/* HERO BANNER: Clean Light Theme (Left Image + Right Heading & Author Info) */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* HERO BANNER: Full Background Cover Image with Left Content & Right Author Info */}
        {/* ========================================================================= */}
        {/* ========================================================================= */}
        {/* HERO BANNER: Cinematic Dark Cover Background with Title & Compact Inline Author Badge */}
        {/* ========================================================================= */}
        <section
          style={{
            position: "relative",
            minHeight: "520px",
            background: blog.coverImage
              ? `linear-gradient(to bottom, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.88) 60%, rgba(15, 23, 42, 0.95) 100%), url(${blog.coverImage}) center/cover no-repeat`
              : "linear-gradient(135deg, #0F172A 0%, #10243E 60%, #00875A 100%)",
            color: "#FFFFFF",
            padding: "85px 0 95px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="container" style={{ width: "100%", maxWidth: "1200px", paddingLeft: "32px", paddingRight: "32px" }}>
            
            {/* Top Date & Category Line */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#E2E8F0", fontWeight: "600", marginBottom: "20px" }}>
              <span style={{ color: "#F1F5F9", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
                {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit", year: "numeric" })}
              </span>
              <span style={{ opacity: 0.6 }}>|</span>
              {blog.category && (
                <span style={{ color: "#34D399", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.06em", fontSize: "13px" }}>
                  {blog.category}
                </span>
              )}
            </div>

            {/* Title & Author Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "36px",
                alignItems: "center",
              }}
              className="cs-main-grid"
            >
              {/* LEFT: Large Hero Title */}
              <div style={{ minWidth: 0 }}>
                <h1
                  style={{
                    fontSize: "clamp(28px, 4vw, 50px)",
                    fontWeight: "800",
                    lineHeight: "1.25",
                    letterSpacing: "-0.025em",
                    color: "#FFFFFF",
                    margin: 0,
                    textShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
                    wordBreak: "break-word",
                    overflowWrap: "anywhere",
                  }}
                >
                  {blog.title}
                </h1>
              </div>

              {/* RIGHT: Compact Author Badge with Purple/Cyan Glow Ring as seen in screenshot */}
              <div style={{ display: "flex", alignItems: "center", gap: "14px", flexShrink: 0 }}>
                {/* Author Avatar with Purple Glow Ring */}
                <div style={{ position: "relative" }}>
                  {blog.authorAvatar ? (
                    <img
                      src={blog.authorAvatar}
                      alt={blog.authorName || "Author"}
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2.5px solid #A855F7",
                        boxShadow: "0 0 16px rgba(168, 85, 247, 0.6)",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #A855F7 0%, #6366F1 100%)",
                        color: "#FFF",
                        fontSize: "22px",
                        fontWeight: "800",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2.5px solid #A855F7",
                        boxShadow: "0 0 16px rgba(168, 85, 247, 0.6)",
                      }}
                    >
                      {(blog.authorName || "A").charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                {/* Author Details Text */}
                <div style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}>
                  <div style={{ fontSize: "16px", fontWeight: "800", color: "#FFFFFF", lineHeight: "1.2" }}>
                    {blog.authorName || "Taapti Tech Architect"}
                  </div>
                  <div style={{ fontSize: "12.5px", color: "#CBD5E1", fontWeight: "600", marginTop: "3px" }}>
                    {blog.authorRole || "Senior Lead Architect"}
                  </div>
                </div>
              </div>
            </div>

            {/* Subheading Summary Below if present */}
            {blog.summary && (
              <p
                style={{
                  fontSize: "16.5px",
                  lineHeight: "1.7",
                  color: "#E2E8F0",
                  fontWeight: "500",
                  maxWidth: "800px",
                  marginTop: "24px",
                  marginBottom: 0,
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                  wordBreak: "break-word",
                  overflowWrap: "anywhere",
                }}
              >
                {blog.summary}
              </p>
            )}

          </div>
        </section>

        {/* ========================================================================= */}
        {/* MAIN BODY CONTENT SECTION: Left Light Rich Content + Hashtags & Right Sidebar */}
        {/* ========================================================================= */}
        <section style={{ padding: "60px 0 100px", background: "#F8FAFC" }}>
          <div className="container" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 340px",
                gap: "40px",
                alignItems: "start",
              }}
              className="cs-main-grid"
            >
              {/* LEFT COLUMN: Main HTML Content & Hashtags */}
              <div style={{ minWidth: 0 }}>
                
                {/* Rich HTML Content Body */}
                <article
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "20px",
                    padding: "40px 44px",
                    lineHeight: "1.8",
                    fontSize: "16.5px",
                    color: "#334155",
                    boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                    overflow: "hidden",
                    wordBreak: "break-word",
                  }}
                  className="blog-rich-content"
                >
                  <style>{`
                    .blog-rich-content h1,
                    .blog-rich-content h2,
                    .blog-rich-content h3,
                    .blog-rich-content h4 {
                      color: #0F172A;
                      font-weight: 800;
                      letter-spacing: -0.02em;
                      margin-top: 32px;
                      margin-bottom: 14px;
                      line-height: 1.35;
                    }
                    .blog-rich-content h1 { font-size: 28px; border-bottom: 2px solid #F1F5F9; padding-bottom: 10px; }
                    .blog-rich-content h2 { font-size: 22px; border-bottom: 1px solid #F1F5F9; padding-bottom: 8px; }
                    .blog-rich-content h3 { font-size: 19px; color: #1E293B; }
                    .blog-rich-content h4 { font-size: 16.5px; color: #00875A; }
                    .blog-rich-content p {
                      margin-bottom: 20px;
                      color: #334155;
                      font-size: 16px;
                      line-height: 1.85;
                      word-break: break-word;
                      overflow-wrap: break-word;
                    }
                    .blog-rich-content ul,
                    .blog-rich-content ol {
                      margin: 18px 0 24px 20px;
                      padding-left: 10px;
                      list-style-type: disc !important;
                    }
                    .blog-rich-content ol {
                      list-style-type: decimal !important;
                    }
                    .blog-rich-content li {
                      margin-bottom: 10px;
                      color: #334155;
                      line-height: 1.7;
                      padding-left: 4px;
                    }
                    .blog-rich-content li strong {
                      color: #0F172A;
                    }
                    .blog-rich-content blockquote {
                      margin: 24px 0;
                      padding: 18px 22px;
                      background: #F8FAFC;
                      border-left: 4px solid #00875A;
                      border-radius: 0 12px 12px 0;
                      font-style: italic;
                      color: #475569;
                    }
                    .blog-rich-content code {
                      background: #F1F5F9;
                      color: #0F172A;
                      padding: 3px 8px;
                      border-radius: 6px;
                      font-size: 14px;
                      font-family: monospace;
                    }
                    .blog-rich-content pre {
                      background: #0F172A;
                      color: #F8FAFC;
                      padding: 18px 20px;
                      border-radius: 12px;
                      overflow-x: auto;
                      margin: 22px 0;
                    }
                  `}</style>

                  {/* Smart Content Renderer */}
                  {(() => {
                    const rawContent = blog.contentHtml || blog.content || blog.summary || "";
                    const hasHtmlTags = /<[a-z][\s\S]*>/i.test(rawContent);

                    if (hasHtmlTags) {
                      return <div dangerouslySetInnerHTML={{ __html: rawContent }} />;
                    }

                    const paragraphs = rawContent
                      .split(/\n\s*\n|\n/)
                      .map((p: string) => p.trim())
                      .filter((p: string) => p.length > 0);

                    return (
                      <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                        {paragraphs.map((paragraph: string, idx: number) => (
                          <p key={idx} style={{ margin: 0, whiteSpace: "pre-line" }}>
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    );
                  })()}
                </article>

                {/* BOTTOM HASHTAGS (# words) */}
                {blog.tags && blog.tags.length > 0 && (
                  <div
                    style={{
                      marginTop: "28px",
                      padding: "20px 24px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                    }}
                  >
                    <span style={{ fontSize: "13px", fontWeight: "800", color: "#00875A", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Topics & Hashtags:
                    </span>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {blog.tags.map((tag: string, i: number) => {
                        const cleanTag = tag.startsWith("#") ? tag : `#${tag}`;
                        return (
                          <span
                            key={i}
                            style={{
                              background: "#EFF6FF",
                              color: "#2563EB",
                              border: "1px solid #BFDBFE",
                              padding: "5px 12px",
                              borderRadius: "99px",
                              fontSize: "12.5px",
                              fontWeight: "700",
                            }}
                          >
                            {cleanTag}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Back to Blogs Button */}
                <div style={{ marginTop: "28px" }}>
                  <Link
                    href="/blog"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#FFFFFF",
                      color: "#0F172A",
                      border: "1px solid #CBD5E1",
                      padding: "11px 22px",
                      borderRadius: "10px",
                      fontWeight: "700",
                      fontSize: "13.5px",
                      textDecoration: "none",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    }}
                  >
                    ← Back to All Articles
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDEBAR: Other Recent Published Blogs List */}
              <aside style={{ position: "sticky", top: "110px" }}>
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "20px",
                    padding: "24px",
                    boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "800",
                      color: "#0F172A",
                      marginBottom: "16px",
                      paddingBottom: "12px",
                      borderBottom: "1px solid #F1F5F9",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>📚 More Articles</span>
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {sidebarBlogs.length === 0 ? (
                      <p style={{ fontSize: "13px", color: "#64748B" }}>No other articles published yet.</p>
                    ) : (
                      sidebarBlogs.map((b: any) => (
                        <Link
                          key={b.slug}
                          href={`/blog/${b.slug}`}
                          style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "4px" }}
                        >
                          <span style={{ fontSize: "10.5px", fontWeight: "800", color: "#00875A", textTransform: "uppercase" }}>
                            {b.category || "Article"}
                          </span>
                          <h4
                            style={{
                              fontSize: "13.5px",
                              fontWeight: "700",
                              color: "#0F172A",
                              lineHeight: "1.4",
                              margin: 0,
                            }}
                          >
                            {b.title}
                          </h4>
                          <span style={{ fontSize: "11px", color: "#64748B" }}>
                            ⏱️ {b.readTime || "5 min read"}
                          </span>
                        </Link>
                      ))
                    )}
                  </div>

                  {/* Sidebar CTA Card */}
                  <div
                    style={{
                      marginTop: "24px",
                      padding: "18px",
                      borderRadius: "14px",
                      background: "linear-gradient(135deg, #10243E 0%, #00875A 100%)",
                      textAlign: "center",
                    }}
                  >
                    <h4 style={{ fontSize: "14.5px", fontWeight: "800", color: "#FFF", margin: "0 0 5px 0" }}>Need a Custom Tech Solution?</h4>
                    <p style={{ fontSize: "12px", color: "#E2E8F0", margin: "0 0 12px 0" }}>Consult with our senior engineering architects directly.</p>
                    <Link
                      href="/contact"
                      style={{
                        display: "inline-block",
                        background: "#FFF",
                        color: "#00875A",
                        padding: "7px 16px",
                        borderRadius: "8px",
                        fontWeight: "800",
                        fontSize: "12px",
                        textDecoration: "none",
                      }}
                    >
                      Start a Project →
                    </Link>
                  </div>
                </div>
              </aside>

            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* RELATED ARTICLES SECTION: 3 Cards Grid at Bottom */}
        {/* ========================================================================= */}
        {sidebarBlogs.length > 0 && (
          <section style={{ padding: "60px 0 90px", background: "#FFFFFF", borderTop: "1px solid #E2E8F0" }}>
            <div className="container">
              <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 40px" }}>
                <span style={{ color: "#00875A", fontSize: "12.5px", fontWeight: "800", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  CONTINUE READING
                </span>
                <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#0F172A", marginTop: "6px" }}>
                  Related Blog Articles
                </h2>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "28px",
                }}
              >
                {sidebarBlogs.slice(0, 3).map((item: any) => (
                  <Link
                    key={item.slug || item._id}
                    href={`/blog/${item.slug}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <div
                      style={{
                        background: "#F8FAFC",
                        borderRadius: "20px",
                        border: "1px solid #E2E8F0",
                        overflow: "hidden",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.25s ease",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.02)",
                      }}
                    >
                      {/* Image Top */}
                      <div style={{ position: "relative", height: "190px", width: "100%", background: "#CBD5E1", overflow: "hidden" }}>
                        {item.coverImage ? (
                          <img
                            src={item.coverImage}
                            alt={item.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "40px" }}>
                            💻
                          </div>
                        )}
                        {item.category && (
                          <span
                            style={{
                              position: "absolute",
                              top: "12px",
                              left: "12px",
                              background: "#00875A",
                              color: "#FFF",
                              fontSize: "11px",
                              fontWeight: "800",
                              padding: "4px 10px",
                              borderRadius: "99px",
                              textTransform: "uppercase",
                            }}
                          >
                            {item.category}
                          </span>
                        )}
                      </div>

                      {/* Content Below */}
                      <div style={{ padding: "20px", display: "flex", flexDirection: "column", flexGrow: 1, gap: "10px" }}>
                        <div style={{ fontSize: "12px", color: "#64748B", fontWeight: "600" }}>
                          ⏱️ {item.readTime || "5 min read"}
                        </div>
                        <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#0F172A", lineHeight: "1.4", margin: 0 }}>
                          {item.title}
                        </h3>
                        <p style={{ fontSize: "13.5px", color: "#64748B", lineHeight: "1.6", margin: 0, flexGrow: 1 }}>
                          {item.summary ? item.summary.slice(0, 90) + "..." : ""}
                        </p>
                        <div style={{ color: "#00875A", fontSize: "13px", fontWeight: "700", marginTop: "auto", display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          Read Article →
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

      </main>
  );
}
