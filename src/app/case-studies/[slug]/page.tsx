import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { API_BASE_URL } from "@/utils/api";
import EnquireModalWrapper from "./EnquireModalWrapper";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCaseStudyBySlug(slug: string) {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects/slug/${slug}`, {
      cache: "no-store",
    }).catch(() => null);

    if (!res || !res.ok) return null;
    const json = await res.json();
    if (json && json.success && json.data) {
      if (json.data.status !== "Published") return null;
      return json.data;
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const study = await getCaseStudyBySlug(resolvedParams.slug);

  if (!study) {
    return {
      title: "Case Study Not Found | TaapTi Technologies",
    };
  }

  return {
    title: `${study.title} | Case Study | TaapTi Technologies`,
    description: study.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const study = await getCaseStudyBySlug(resolvedParams.slug);

  if (!study) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="cs-detail-page">
        {/* HERO BANNER */}
        <section className="service-detail-hero cs-hero">
          <div className="srv-hero-bg-orbs">
            <div className="srv-orb srv-orb-left-huge" />
            <div className="srv-orb srv-orb-right-giant" />
            <div className="srv-hero-grid-pattern" />
          </div>

          <div className="container service-detail-hero__container" style={{ textAlign: "center", alignItems: "center" }}>
            <Link href="/case-studies" className="cs-back-link">
              ← Back to Case Studies
            </Link>

            <div className="service-detail-hero__eyebrow" style={{ justifyContent: "center", margin: "14px 0 16px 0" }}>
              <span className="srv-eyebrow-line" />
              <span className="srv-eyebrow-text">{study.number || "01"} • {study.category.toUpperCase()} CASE STUDY</span>
            </div>

            <h1 className="cs-hero-title">
              {study.title}
            </h1>

            <p className="service-detail-hero__desc" style={{ maxWidth: "660px", margin: "0 auto 24px auto" }}>
              {study.summary}
            </p>

            <EnquireModalWrapper studyTitle={study.title} />
          </div>
        </section>

        {/* META BAR */}
        <section className="cs-meta-bar">
          <div className="container">
            <div className="cs-meta-grid">
              <div className="cs-meta-card">
                <span className="cs-meta-label">INDUSTRY</span>
                <strong className="cs-meta-val">{study.category}</strong>
              </div>

              <div className="cs-meta-card">
                <span className="cs-meta-label">SERVICE</span>
                <strong className="cs-meta-val">{study.serviceName || "Software Engineering"}</strong>
              </div>

              <div className="cs-meta-card">
                <span className="cs-meta-label">PROJECT FOCUS</span>
                <strong className="cs-meta-val">Digital Product</strong>
              </div>
            </div>
          </div>
        </section>

        {/* CONTEXT & CHALLENGE */}
        <section className="section cs-section">
          <div className="container">
            <div className="cs-two-col-grid">
              <div className="cs-feature-card">
                <span className="service-section__eyebrow">Project Context</span>
                <h2 className="cs-card-title">Understanding the <span>Business.</span></h2>
                <p className="cs-card-desc">{study.context}</p>
              </div>

              <div className="cs-feature-card">
                <span className="service-section__eyebrow">The Challenge</span>
                <h2 className="cs-card-title">Solving the <span>Right Problem.</span></h2>
                <p className="cs-card-desc">{study.challenge}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUTION & DELIVERABLES */}
        <section className="section cs-section cs-bg-light">
          <div className="container">
            <div className="service-section__heading service-section__heading--centered" style={{ marginBottom: "36px" }}>
              <span className="service-section__eyebrow">The Solution</span>
              <h2>From Challenge to <span>Working Solution.</span></h2>
              <p className="cs-section-subtitle">{study.solution}</p>
            </div>

            {study.contribution && study.contribution.length > 0 && (
              <div className="cs-deliverables-grid">
                {study.contribution.map((item: string, idx: number) => (
                  <div className="cs-deliv-card" key={idx}>
                    <span className="cs-deliv-num">{String(idx + 1).padStart(2, "0")}</span>
                    <strong className="cs-deliv-text">{item}</strong>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* TECH STACK */}
        {study.technology && study.technology.length > 0 && (
          <section className="section cs-section">
            <div className="container">
              <div className="service-section__heading service-section__heading--centered" style={{ marginBottom: "36px" }}>
                <span className="service-section__eyebrow">Technology Stack</span>
                <h2>Built with <span>Modern Tech.</span></h2>
                <p className="cs-section-subtitle">Selected for reliability, maintainability and future scalability.</p>
              </div>

              <div className="cs-tech-tags-grid">
                {study.technology.map((tech: string, i: number) => (
                  <div className="cs-tech-pill" key={i}>
                    <span className="cs-tech-icon">⚡</span>
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* OUTCOME */}
        <section className="section cs-section">
          <div className="container">
            <div className="cs-outcome-card">
              <span className="service-section__eyebrow" style={{ color: "#BFDBFE" }}>Project Outcome</span>
              <h2>Creating Meaningful <span>Business Value.</span></h2>
              <p>{study.outcome}</p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="section service-detail-cta">
          <div className="container">
            <div className="service-detail-cta__box">
              <span>Have a similar challenge?</span>
              <h2>Let&apos;s build something <span>that creates impact.</span></h2>
              <EnquireModalWrapper studyTitle={study.title} btnText="Start a Conversation" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}