import Link from "next/link";
import { notFound } from "next/navigation";

const services = {
  "software-engineering": {
    number: "01",
    title: "Software Engineering",
    shortDescription:
      "Build reliable, scalable and high-performance software products tailored to your business needs.",

    overview:
      "We design and build dependable software systems that solve real business problems and are ready to evolve as your business grows.",

    capabilities: [
      "Custom software development",
      "Scalable backend systems",
      "API development & integration",
      "Cloud-ready architecture",
      "Performance optimisation",
      "Maintenance & technical improvements",
    ],

    engagement:
      "We work closely with your team to understand your goals, define the right delivery approach and build technology that creates measurable value.",

    testimonials: [
      {
        quote:
          "Taapti helped us turn a complex idea into a reliable digital product. Their engineering approach and communication made the entire process smooth.",
        name: "Client Name",
        role: "Founder, Company Name",
      },
      {
        quote:
          "The team understood our business requirements quickly and delivered a solution that was both scalable and easy to use.",
        name: "Client Name",
        role: "Product Lead, Company Name",
      },
      {
        quote:
          "Working with Taapti gave us the technical confidence we needed to move faster and build for long-term growth.",
        name: "Client Name",
        role: "Technology Director, Company Name",
      },
    ],

    faqs: [
      {
        question: "What does your engagement process look like?",
        answer:
          "We start by understanding your business goals, technical requirements and priorities, then define the right delivery approach with your team.",
      },
      {
        question: "Can you work with an existing development team?",
        answer:
          "Yes. We can work alongside your existing team to extend capabilities, solve technical challenges or accelerate product delivery.",
      },
      {
        question: "How do you approach scalability?",
        answer:
          "We consider scalability from the beginning, using suitable architecture, development practices and infrastructure decisions based on your expected growth.",
      },
      {
        question: "Can you help after the initial product launch?",
        answer:
          "Yes. We can continue supporting your product through improvements, maintenance, optimisation and future development.",
      },
    ],
  },

  "ai-machine-learning": {
    number: "02",
    title: "AI & Machine Learning",
    shortDescription:
      "Turn AI opportunities into practical solutions that improve products, operations and customer experiences.",

    overview:
      "We help businesses identify practical AI opportunities and turn them into useful, reliable solutions that support real business outcomes.",

    capabilities: [
      "AI solution development",
      "Machine learning systems",
      "AI-powered product features",
      "Data-driven automation",
      "AI integrations",
      "Model implementation & optimisation",
    ],

    engagement:
      "We work with your team to identify the right AI opportunity, define the solution and develop technology that can create measurable business value.",

    testimonials: [
      {
        quote:
          "Taapti helped us understand where AI could genuinely improve our product and turned the opportunity into a practical solution.",
        name: "Client Name",
        role: "Founder, Company Name",
      },
      {
        quote:
          "The team made a complex AI requirement easy to understand and delivered a solution aligned with our business needs.",
        name: "Client Name",
        role: "Product Lead, Company Name",
      },
      {
        quote:
          "Their practical approach to AI helped us move from experimentation to something our team could actually use.",
        name: "Client Name",
        role: "Technology Director, Company Name",
      },
    ],

    faqs: [
      {
        question: "Can you help identify AI opportunities for our business?",
        answer:
          "Yes. We can understand your business workflows and identify practical areas where AI can improve efficiency, products or customer experiences.",
      },
      {
        question: "Can you integrate AI into an existing product?",
        answer:
          "Yes. We can integrate AI capabilities into existing web applications, software platforms and business workflows.",
      },
      {
        question: "Do you build custom AI solutions?",
        answer:
          "Yes. Solutions can be designed around your specific business requirements, data and product goals.",
      },
      {
        question: "Can you support the AI solution after launch?",
        answer:
          "Yes. We can continue supporting improvements, optimisation, integrations and future development.",
      },
    ],
  },

  "web-development": {
    number: "03",
    title: "Web Development",
    shortDescription:
      "Modern, responsive web applications built for performance, usability and long-term scalability.",

    overview:
      "We build modern web experiences and applications that combine strong user experience with reliable engineering and scalable architecture.",

    capabilities: [
      "Responsive web development",
      "Modern frontend applications",
      "Backend & API development",
      "Performance optimisation",
      "Third-party integrations",
      "Scalable web architecture",
    ],

    engagement:
      "From a new website to a complex web application, we work with your team to define the requirements and deliver a reliable digital experience.",

    testimonials: [
      {
        quote:
          "Taapti delivered a modern web experience that was fast, easy to use and aligned perfectly with our business goals.",
        name: "Client Name",
        role: "Founder, Company Name",
      },
      {
        quote:
          "The development process was smooth and the team was responsive throughout the project.",
        name: "Client Name",
        role: "Product Lead, Company Name",
      },
      {
        quote:
          "We finally had a web platform that could support the next stage of our business growth.",
        name: "Client Name",
        role: "Technology Director, Company Name",
      },
    ],

    faqs: [
      {
        question: "Do you build responsive websites?",
        answer:
          "Yes. We build responsive experiences designed to work across desktop, tablet and mobile devices.",
      },
      {
        question: "Can you work with our existing website?",
        answer:
          "Yes. We can improve, modernise or extend an existing website depending on its technical architecture and business requirements.",
      },
      {
        question: "Do you handle backend development too?",
        answer:
          "Yes. We can develop APIs, backend systems and integrations required to support the web application.",
      },
      {
        question: "Can you optimise an existing website?",
        answer:
          "Yes. We can work on performance, usability, architecture and technical improvements.",
      },
    ],
  },

  "product-development": {
    number: "04",
    title: "Product Development",
    shortDescription:
      "From idea to launch, we help businesses design, develop and scale digital products.",

    overview:
      "We help businesses transform product ideas into reliable digital experiences, from initial requirements through development and future improvements.",

    capabilities: [
      "Product discovery & planning",
      "MVP development",
      "Frontend & backend development",
      "Product integrations",
      "Scalable architecture",
      "Product improvement & support",
    ],

    engagement:
      "We collaborate with founders, product teams and business stakeholders to define priorities, build the product and support its evolution after launch.",

    testimonials: [
      {
        quote:
          "Taapti helped us take our product idea from concept to a working digital product with confidence.",
        name: "Client Name",
        role: "Founder, Company Name",
      },
      {
        quote:
          "The team understood both our product vision and technical requirements and helped us move quickly.",
        name: "Client Name",
        role: "Product Lead, Company Name",
      },
      {
        quote:
          "Their engineering approach gave us a strong foundation to continue growing our product.",
        name: "Client Name",
        role: "Technology Director, Company Name",
      },
    ],

    faqs: [
      {
        question: "Can you help with an MVP?",
        answer:
          "Yes. We can help define the initial scope and develop an MVP focused on the most important product requirements.",
      },
      {
        question: "Can you work with our existing product team?",
        answer:
          "Yes. We can collaborate with your product, design and engineering teams to accelerate development.",
      },
      {
        question: "Can you take a product from idea to launch?",
        answer:
          "Yes. We can support the technical journey from requirements and development through launch and future improvements.",
      },
      {
        question: "Do you provide ongoing product support?",
        answer:
          "Yes. We can continue working on new features, improvements, optimisation and technical maintenance after launch.",
      },
    ],
  },
};

type ServiceSlug = keyof typeof services;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const service = services[slug as ServiceSlug];

  if (!service) {
    notFound();
  }

  return (
    <main>

      {/* =========================
          Hero
      ========================= */}

      <section className="service-detail-hero">
        <div className="container">

          <Link
            href="/services"
            className="service-detail-hero__back"
          >
            ← Back to Services
          </Link>

          <span className="service-detail-hero__number">
            {service.number}
          </span>

          <h1>{service.title}</h1>

          <p>{service.shortDescription}</p>

          <Link
            href="/contact"
            className="btn btn-primary"
          >
            Enquire Now
          </Link>

        </div>
      </section>


      {/* =========================
          Overview
      ========================= */}

      <section className="section service-overview">
        <div className="container service-overview__grid">

          <div>
            <span className="service-section__eyebrow">
              Overview
            </span>

            <h2>
              Engineering built around
              <span> your needs.</span>
            </h2>
          </div>

          <div>
            <p className="service-overview__text">
              {service.overview}
            </p>
          </div>

        </div>
      </section>


      {/* =========================
          Capabilities
      ========================= */}

      <section className="section service-capabilities">
        <div className="container">

          <div className="service-section__heading">

            <span className="service-section__eyebrow">
              What We Deliver
            </span>

            <h2>
              Our capabilities
              <span> within {service.title}.</span>
            </h2>

          </div>


          <div className="service-capabilities__grid">

            {service.capabilities.map(
              (capability, index) => (
                <div
                  className="capability-card"
                  key={capability}
                >
                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3>{capability}</h3>
                </div>
              )
            )}

          </div>

        </div>
      </section>


      {/* =========================
          Engagement Model
      ========================= */}

      <section className="section engagement">
        <div className="container engagement__box">

          <div>

            <span className="service-section__eyebrow">
              Engagement Model
            </span>

            <h2>
              A flexible way to
              <span> work together.</span>
            </h2>

          </div>


          <div className="engagement__content">

            <p>{service.engagement}</p>

            <Link
              href="/contact"
              className="btn btn-primary"
            >
              Book a Consultation
            </Link>

          </div>

        </div>
      </section>


      {/* =========================
          Testimonials
      ========================= */}

      <section className="section service-testimonials">
        <div className="container">

          <div className="service-testimonials__heading">

            <span className="service-section__eyebrow">
              Client Feedback
            </span>

            <h2>
              What our clients
              <span> say about us.</span>
            </h2>

          </div>


          <div className="service-testimonials__grid">

            {service.testimonials.map(
              (testimonial) => (

                <article
                  className="service-testimonial-card"
                  key={testimonial.quote}
                >

                  <span className="service-testimonial-card__quote">
                    “
                  </span>

                  <p>{testimonial.quote}</p>


                  <div className="service-testimonial-card__author">

                    <div className="service-testimonial-card__avatar">
                      {testimonial.name.charAt(0)}
                    </div>

                    <div>

                      <strong>
                        {testimonial.name}
                      </strong>

                      <span>
                        {testimonial.role}
                      </span>

                    </div>

                  </div>

                </article>

              )
            )}

          </div>

        </div>
      </section>


      {/* =========================
          FAQs
      ========================= */}

      <section className="section service-faqs">
        <div className="container service-faqs__grid">

          <div className="service-faqs__intro">

            <span className="service-section__eyebrow">
              FAQs
            </span>

            <h2>
              Frequently asked
              <span> questions.</span>
            </h2>

            <p>
              Find answers to common questions about our
              services, engagement process and technical
              approach.
            </p>

          </div>


          <div className="service-faqs__list">

            {service.faqs.map((faq, index) => (

              <details
                className="service-faq"
                key={faq.question}
              >

                <summary>

                  <span>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <strong>
                    {faq.question}
                  </strong>

                  <b>+</b>

                </summary>


                <div className="service-faq__answer">

                  <p>{faq.answer}</p>

                </div>

              </details>

            ))}

          </div>

        </div>
      </section>


      {/* =========================
          Final CTA
      ========================= */}

      <section className="section service-detail-cta">
        <div className="container">

          <div className="service-detail-cta__box">

            <span>
              Ready to get started?
            </span>

            <h2>
              Let&apos;s build your
              <span> next solution.</span>
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