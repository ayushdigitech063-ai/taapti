import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  }
};

async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/blogs/${slug}`, {
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
  try {
    const res = await fetch(`http://localhost:5000/api/blogs?status=Published`, {
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
  return Object.values(fallbackBlogs);
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
    <>
      <Navbar />

      <main style={{ backgroundColor: "#F8FAFC", color: "#0F172A", minHeight: "100vh", paddingTop: "100px" }}>
        
        {/* ========================================================================= */}
        {/* HERO BANNER: Clean Light Theme (Left Image + Right Heading & Author Info) */}
        {/* ========================================================================= */}
        <section
          style={{
            position: "relative",
            background: "linear-gradient(120deg, #F0F7FF 0%, #E2E8F0 50%, #F8FAFC 100%)",
            borderBottom: "1px solid #E2E8F0",
            padding: "50px 0 70px",
          }}
        >
          <div className="container">
            {/* Breadcrumb Navigation */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "#64748B", marginBottom: "28px" }}>
              <Link href="/" style={{ color: "#64748B", textDecoration: "none" }}>Home</Link>
              <span>/</span>
              <Link href="/blog" style={{ color: "#64748B", textDecoration: "none" }}>Blog</Link>
              <span>/</span>
              <span style={{ color: "#00875A", fontWeight: "700" }}>{blog.category || "Article"}</span>
            </div>

            {/* Split Hero Grid: Image Left, Title & Author Right */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
                gap: "40px",
                alignItems: "center",
              }}
            >
              {/* LEFT SIDE: Cover / Feature Image */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "24px",
                  overflow: "hidden",
                  border: "1px solid #CBD5E1",
                  boxShadow: "0 12px 35px rgba(0, 0, 0, 0.06)",
                  maxHeight: "400px",
                  height: "100%",
                  minHeight: "280px",
                  background: "#E2E8F0",
                }}
              >
                {blog.coverImage ? (
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "64px",
                      background: "linear-gradient(135deg, #E2E8F0 0%, #CBD5E1 100%)",
                    }}
                  >
                    💻
                  </div>
                )}
                {blog.category && (
                  <span
                    style={{
                      position: "absolute",
                      top: "18px",
                      left: "18px",
                      background: "#00875A",
                      color: "#FFF",
                      fontSize: "12px",
                      fontWeight: "800",
                      padding: "6px 14px",
                      borderRadius: "99px",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                      boxShadow: "0 4px 12px rgba(0, 135, 90, 0.3)",
                    }}
                  >
                    {blog.category}
                  </span>
                )}
              </div>

              {/* RIGHT SIDE: Heading, Metadata & Author Badge */}
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#64748B", fontWeight: "600" }}>
                  <span>⏱️ {blog.readTime || "5 min read"}</span>
                  <span>•</span>
                  <span>📅 Published on {new Date(blog.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</span>
                </div>

                <h1
                  style={{
                    fontSize: "clamp(26px, 3.2vw, 42px)",
                    fontWeight: "800",
                    lineHeight: "1.25",
                    letterSpacing: "-0.03em",
                    color: "#0F172A",
                  }}
                >
                  {blog.title}
                </h1>

                <p style={{ fontSize: "16px", lineHeight: "1.7", color: "#475569" }}>
                  {blog.summary}
                </p>

                {/* Author Card Profile */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    padding: "14px 20px",
                    borderRadius: "16px",
                    marginTop: "8px",
                    boxShadow: "0 4px 15px rgba(0,0,0,0.03)",
                  }}
                >
                  {blog.authorAvatar ? (
                    <img
                      src={blog.authorAvatar}
                      alt={blog.authorName || "Author"}
                      style={{ width: "46px", height: "46px", borderRadius: "50%", objectFit: "cover" }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "46px",
                        height: "46px",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #10243E 0%, #00875A 100%)",
                        color: "#FFF",
                        fontSize: "17px",
                        fontWeight: "800",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: "0 4px 12px rgba(0, 135, 90, 0.25)",
                      }}
                    >
                      {(blog.authorName || "A").charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div>
                    <div style={{ fontSize: "15px", fontWeight: "800", color: "#0F172A" }}>
                      {blog.authorName || "Taapti Tech Team"}
                    </div>
                    <div style={{ fontSize: "13px", color: "#00875A", fontWeight: "700" }}>
                      {blog.authorRole || "Senior Software Architect"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MAIN BODY CONTENT SECTION: Left Light Rich Content + Hashtags & Right Sidebar */}
        {/* ========================================================================= */}
        <section style={{ padding: "70px 0 110px", background: "#F8FAFC" }}>
          <div className="container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 340px",
                gap: "48px",
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
                    borderRadius: "24px",
                    padding: "40px",
                    lineHeight: "1.85",
                    fontSize: "16.5px",
                    color: "#334155",
                    boxShadow: "0 6px 25px rgba(0,0,0,0.03)",
                  }}
                  className="blog-rich-content"
                  dangerouslySetInnerHTML={{ __html: blog.contentHtml || `<p>${blog.summary}</p>` }}
                />

                {/* BOTTOM HASHTAGS (# words) */}
                {blog.tags && blog.tags.length > 0 && (
                  <div
                    style={{
                      marginTop: "36px",
                      padding: "22px 28px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      flexWrap: "wrap",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                    }}
                  >
                    <span style={{ fontSize: "13.5px", fontWeight: "800", color: "#00875A", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Topics & Hashtags:
                    </span>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      {blog.tags.map((tag: string, i: number) => {
                        const cleanTag = tag.startsWith("#") ? tag : `#${tag}`;
                        return (
                          <span
                            key={i}
                            style={{
                              background: "#EFF6FF",
                              color: "#2563EB",
                              border: "1px solid #BFDBFE",
                              padding: "6px 14px",
                              borderRadius: "99px",
                              fontSize: "13px",
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
                <div style={{ marginTop: "36px" }}>
                  <Link
                    href="/blog"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "#FFFFFF",
                      color: "#0F172A",
                      border: "1px solid #CBD5E1",
                      padding: "12px 24px",
                      borderRadius: "12px",
                      fontWeight: "700",
                      fontSize: "14px",
                      textDecoration: "none",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                    }}
                  >
                    ← Back to All Articles
                  </Link>
                </div>
              </div>

              {/* RIGHT SIDEBAR: Other Recent Published Blogs List */}
              <aside style={{ position: "sticky", top: "120px" }}>
                <div
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid #E2E8F0",
                    borderRadius: "24px",
                    padding: "26px",
                    boxShadow: "0 6px 25px rgba(0,0,0,0.03)",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "17px",
                      fontWeight: "800",
                      color: "#0F172A",
                      marginBottom: "18px",
                      paddingBottom: "12px",
                      borderBottom: "1px solid #F1F5F9",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>📚 More Articles</span>
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {sidebarBlogs.length === 0 ? (
                      <p style={{ fontSize: "13px", color: "#64748B" }}>No other articles published yet.</p>
                    ) : (
                      sidebarBlogs.map((b: any) => (
                        <Link
                          key={b.slug}
                          href={`/blog/${b.slug}`}
                          style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "5px" }}
                        >
                          <span style={{ fontSize: "11px", fontWeight: "800", color: "#00875A", textTransform: "uppercase" }}>
                            {b.category || "Article"}
                          </span>
                          <h4
                            style={{
                              fontSize: "14px",
                              fontWeight: "700",
                              color: "#0F172A",
                              lineHeight: "1.4",
                              margin: 0,
                            }}
                          >
                            {b.title}
                          </h4>
                          <span style={{ fontSize: "11.5px", color: "#64748B" }}>
                            ⏱️ {b.readTime || "5 min read"}
                          </span>
                        </Link>
                      ))
                    )}
                  </div>

                  {/* Sidebar CTA Card */}
                  <div
                    style={{
                      marginTop: "28px",
                      padding: "20px",
                      borderRadius: "16px",
                      background: "linear-gradient(135deg, #10243E 0%, #00875A 100%)",
                      textAlign: "center",
                    }}
                  >
                    <h4 style={{ fontSize: "15px", fontWeight: "800", color: "#FFF", margin: "0 0 6px 0" }}>Need a Custom Tech Solution?</h4>
                    <p style={{ fontSize: "12.5px", color: "#E2E8F0", margin: "0 0 14px 0" }}>Consult with our senior engineering architects directly.</p>
                    <Link
                      href="/contact"
                      style={{
                        display: "inline-block",
                        background: "#FFF",
                        color: "#00875A",
                        padding: "8px 18px",
                        borderRadius: "8px",
                        fontWeight: "800",
                        fontSize: "12.5px",
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

      </main>

      <Footer />
    </>
  );
}
