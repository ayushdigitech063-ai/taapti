import Link from "next/link";
import { notFound } from "next/navigation";

const caseStudies = {
  "scalable-digital-platform": {
    number: "01",
    category: "FinTech",
    title: "Building a scalable digital platform",
    summary:
      "A modern technology solution designed to simplify operations and create a better digital experience.",

    context:
      "The business needed a reliable digital platform that could support complex workflows while providing a simple and efficient experience for its users. The existing processes created operational challenges and made future scaling more difficult.",

    challenge:
      "The key challenge was creating a technology foundation that could handle evolving business requirements without making the product unnecessarily complex. Reliability, maintainability and scalability were important considerations throughout the project.",

    solution:
      "Taapti designed and developed a structured digital platform around the business requirements. The solution focused on clear workflows, modular architecture, reliable APIs and a user experience that could evolve as the business grew.",

    contribution: [
      "Requirement analysis and technical planning",
      "Application architecture and development",
      "Frontend and backend engineering",
      "API development and integrations",
      "Performance and reliability improvements",
      "Ongoing technical improvements",
    ],

    technology: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "Cloud Infrastructure",
    ],

    implementation:
      "The implementation was approached incrementally, allowing the core platform capabilities to be developed and validated before expanding the system. This helped keep the product maintainable while leaving room for future improvements and integrations.",

    outcome:
      "The resulting platform provided a more reliable digital experience, simplified important workflows and created a stronger technical foundation for future growth.",

    serviceSlug: "software-engineering",
    serviceName: "Software Engineering",
  },

  "healthcare-workflow-platform": {
    number: "02",
    category: "Healthcare",
    title: "Transforming complex workflows with technology",
    summary:
      "A reliable digital product built to improve efficiency, accessibility and user experience.",

    context:
      "The organisation was working with complex operational workflows that required better coordination and a more accessible digital experience. The goal was to bring important workflows into a dependable technology platform.",

    challenge:
      "The challenge was to simplify complex processes without losing the information and functionality required by different users. The platform also needed to provide a consistent experience across devices.",

    solution:
      "Taapti developed a modern digital product focused on simplifying workflows and improving accessibility. The solution combined a clear frontend experience with backend systems and APIs supporting the application's core functionality.",

    contribution: [
      "Workflow analysis and technical planning",
      "Frontend application development",
      "Backend and API development",
      "System and third-party integrations",
      "Responsive user experience",
      "Testing and technical improvements",
    ],

    technology: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "REST APIs",
      "Cloud Services",
    ],

    implementation:
      "The product was developed around the most important operational workflows first. The implementation focused on creating a dependable foundation that could support additional functionality and improvements over time.",

    outcome:
      "The digital platform helped simplify complex workflows, improve accessibility and provide users with a more consistent technology experience.",

    serviceSlug: "web-development",
    serviceName: "Web Development",
  },

  "scaling-saas-product": {
    number: "03",
    category: "SaaS",
    title: "Scaling a product for growing businesses",
    summary:
      "Engineering and product development focused on performance, scalability and long-term growth.",

    context:
      "The product was growing and required a stronger technical foundation to support increasing users, features and business requirements. Performance and scalability became important priorities for the next stage of product development.",

    challenge:
      "The technical challenge was to improve the product foundation while continuing to support ongoing development. Architecture, performance and maintainability all needed to be considered without disrupting the product roadmap.",

    solution:
      "Taapti worked on the product architecture and development with a focus on improving scalability and creating a more maintainable technical foundation. New capabilities were developed alongside improvements to the existing system.",

    contribution: [
      "Existing architecture assessment",
      "Technical planning and prioritisation",
      "Frontend and backend development",
      "API development and integrations",
      "Performance optimisation",
      "Product improvements and ongoing engineering",
    ],

    technology: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "API Integrations",
      "Cloud Infrastructure",
    ],

    implementation:
      "The implementation followed an incremental improvement approach. Existing functionality was reviewed, technical bottlenecks were addressed and new product capabilities were developed without requiring an unnecessary full-system rewrite.",

    outcome:
      "The product gained a stronger technical foundation with improved scalability, better performance and the flexibility required for continued product development.",

    serviceSlug: "product-development",
    serviceName: "Product Development",
  },
};

type CaseStudySlug = keyof typeof caseStudies;

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const study = caseStudies[slug as CaseStudySlug];

  if (!study) {
    notFound();
  }

  return (
    <main>
      {/* Hero */}
      <section className="case-detail-hero">
        <div className="container">
          <Link
            href="/case-studies"
            className="case-detail-hero__back"
          >
            ← Back to Case Studies
          </Link>

          <div className="case-detail-hero__top">
            <span>{study.number}</span>
            <span>{study.category}</span>
          </div>

          <h1>{study.title}</h1>

          <p>{study.summary}</p>
        </div>
      </section>

      {/* Project Meta */}
      <section className="case-detail-meta">
        <div className="container">
          <div className="case-detail-meta__grid">
            <div>
              <span>Industry</span>
              <strong>{study.category}</strong>
            </div>

            <div>
              <span>Service</span>
              <strong>{study.serviceName}</strong>
            </div>

            <div>
              <span>Project Focus</span>
              <strong>Digital Product</strong>
            </div>
          </div>
        </div>
      </section>

      {/* Context */}
      <section className="section case-detail-context">
        <div className="container case-detail-two-column">
          <div>
            <span className="service-section__eyebrow">
              Project Context
            </span>

            <h2>
              Understanding the
              <span> business.</span>
            </h2>
          </div>

          <div>
            <p>{study.context}</p>
          </div>
        </div>
      </section>

      {/* Challenge */}
      <section className="section case-detail-challenge">
        <div className="container case-detail-two-column">
          <div>
            <span className="service-section__eyebrow">
              The Challenge
            </span>

            <h2>
              Solving the
              <span> right problem.</span>
            </h2>
          </div>

          <div>
            <p>{study.challenge}</p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section case-detail-solution">
        <div className="container">
          <div className="case-detail-section-heading">
            <span className="service-section__eyebrow">
              The Solution
            </span>

            <h2>
              From challenge to
              <span> working solution.</span>
            </h2>

            <p>{study.solution}</p>
          </div>

          <div className="case-detail-contribution">
            {study.contribution.map((item, index) => (
              <div
                className="case-detail-contribution__item"
                key={item}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{item}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="section case-detail-technology">
        <div className="container case-detail-two-column">
          <div>
            <span className="service-section__eyebrow">
              Technology Stack
            </span>

            <h2>
              Built with the
              <span> right technology.</span>
            </h2>

            <p>
              The technology stack was selected around the
              product requirements, maintainability and future
              scalability.
            </p>
          </div>

          <div className="case-detail-tech-list">
            {study.technology.map((technology, index) => (
              <div
                className="case-detail-tech"
                key={technology}
              >
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <strong>{technology}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section className="section case-detail-implementation">
        <div className="container case-detail-two-column">
          <div>
            <span className="service-section__eyebrow">
              Implementation
            </span>

            <h2>
              A practical,
              <span> incremental approach.</span>
            </h2>
          </div>

          <div>
            <p>{study.implementation}</p>
          </div>
        </div>
      </section>

      {/* Outcome */}
      <section className="section case-detail-outcome">
        <div className="container">
          <div className="case-detail-outcome__box">
            <div>
              <span className="service-section__eyebrow">
                Outcome
              </span>

              <h2>
                Creating meaningful
                <span> business value.</span>
              </h2>
            </div>

            <p>{study.outcome}</p>
          </div>
        </div>
      </section>

      {/* Related Service */}
      <section className="section case-detail-related">
        <div className="container">
          <div className="case-detail-related__box">
            <div>
              <span className="service-section__eyebrow">
                Related Service
              </span>

              <h2>
                Explore our
                <span> {study.serviceName}.</span>
              </h2>
            </div>

            <Link
              href={`/services/${study.serviceSlug}`}
              className="btn btn-primary"
            >
              View Service
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section service-detail-cta">
        <div className="container">
          <div className="service-detail-cta__box">
            <span>Have a similar challenge?</span>

            <h2>
              Let&apos;s build something
              <span> that creates impact.</span>
            </h2>

            <Link
              href="/contact"
              className="btn btn-primary"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}