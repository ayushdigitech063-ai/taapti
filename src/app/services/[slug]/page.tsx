import { notFound } from "next/navigation";
import ServiceDetailClient from "./ServiceDetailClient";

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
  "mobile-development": {
    number: "05",
    title: "Mobile Development",
    shortDescription:
      "Native and cross-platform iOS & Android mobile applications built for high performance and reliability.",
    overview:
      "We design and build high-performance mobile applications with seamless user experience, offline capabilities, and robust API integrations across iOS and Android platforms.",
    capabilities: [
      "React Native & Cross-Platform",
      "Native iOS & Android Engineering",
      "Mobile App Architecture",
      "Offline Synchronization",
      "Push Notifications & Real-time Sync",
      "App Store & Play Store Deployment",
    ],
    engagement:
      "Whether launching a new mobile app or scaling an existing mobile product, our team delivers production-ready mobile applications optimized for performance and growth.",
    testimonials: [
      {
        quote:
          "Taapti built our cross-platform mobile app seamlessly. The smooth performance and offline-first capabilities exceeded our expectations.",
        name: "Mobile Lead",
        role: "Head of Product, Tech App",
      },
      {
        quote:
          "Their engineering team ensured high app stability, fast loading times, and zero-downtime release cycles across both app stores.",
        name: "Engineering Manager",
        role: "CTO, Digital Platform",
      },
      {
        quote:
          "Direct communication with senior mobile engineers made feature rollouts smooth and predictable.",
        name: "Product Manager",
        role: "Founder, Consumer App",
      },
    ],
    faqs: [
      {
        question: "Do you build for both iOS and Android?",
        answer:
          "Yes. We specialize in cross-platform development using React Native as well as native iOS/Android development depending on your project requirements.",
      },
      {
        question: "Can you handle app store submissions?",
        answer:
          "Yes. We take care of end-to-end publishing, store compliance, certificate management, and updates for Apple App Store and Google Play Store.",
      },
      {
        question: "How do you ensure mobile app performance?",
        answer:
          "We implement clean state management, efficient asset caching, lazy loading, and thorough testing across physical devices.",
      },
      {
        question: "Can you integrate our existing backend APIs?",
        answer:
          "Yes. We integrate RESTful APIs, WebSockets, and GraphQL backends seamlessly into your mobile application.",
      },
    ],
  },
  "cloud-devops": {
    number: "06",
    title: "Cloud & DevOps",
    shortDescription:
      "Infrastructure automation, CI/CD pipelines, containerization and cloud scaling for production apps.",
    overview:
      "We design, build, and automate resilient cloud infrastructure that scales effortlessly, reduces downtime, and accelerates your release cycles with strict DevOps practices.",
    capabilities: [
      "AWS & Multi-Cloud Architecture",
      "Docker & Kubernetes Containerization",
      "CI/CD Pipeline Automation",
      "Infrastructure as Code (Terraform)",
      "System Monitoring & Observability",
      "Security Audits & SLA Guarantee",
    ],
    engagement:
      "We partner with your team to automate manual server provisioning, build self-healing cloud setups, and maintain 99.9% uptime SLAs for your core applications.",
    testimonials: [
      {
        quote:
          "Taapti automated our deployment pipelines completely. We went from weekly manual builds to zero-downtime continuous deployments.",
        name: "DevOps Lead",
        role: "VP of Engineering, SaaS Platform",
      },
      {
        quote:
          "Their cloud infrastructure refactoring cut our monthly AWS server costs by 35% while increasing system reliability.",
        name: "Operations Director",
        role: "COO, E-Commerce Infrastructure",
      },
      {
        quote:
          "The team set up Datadog monitoring and self-healing Kubernetes clusters that keep our services up 24/7.",
        name: "Infrastructure Architect",
        role: "Tech Lead, Enterprise Cloud",
      },
    ],
    faqs: [
      {
        question: "Which cloud providers do you support?",
        answer:
          "We primarily work with AWS, Google Cloud Platform (GCP), Azure, and specialized cloud hosts like Vercel, DigitalOcean, and Supabase.",
      },
      {
        question: "Can you migrate our monolithic infrastructure to the cloud?",
        answer:
          "Yes. We execute zero-downtime migration strategies by containerizing applications and moving databases safely to managed cloud services.",
      },
      {
        question: "Do you build automated CI/CD deployment pipelines?",
        answer:
          "Yes. We configure GitHub Actions, GitLab CI, or Jenkins pipelines for automated testing, linting, building, and deployment.",
      },
      {
        question: "Can you help optimize our monthly cloud infrastructure costs?",
        answer:
          "Yes. We audit resource utilization, implement auto-scaling, rightsized instances, and caching to significantly lower cloud bills.",
      },
    ],
  },
  "ui-ux-product-design": {
    number: "07",
    title: "UI/UX & Product Design",
    shortDescription:
      "User-centered design systems, modern visual interfaces, and interactive digital prototypes.",
    overview:
      "We craft intuitive user journeys, high-converting visual interfaces, and robust design systems that connect user needs directly with business goals.",
    capabilities: [
      "User Research & Wireframing",
      "Interactive Prototyping (Figma)",
      "Design Systems & Component Libraries",
      "Mobile & Web Interface Design",
      "Usability Testing & UX Audits",
      "Frontend Developer Handoff",
    ],
    engagement:
      "We collaborate closely with product managers and engineers to turn complex user requirements into elegant, accessible, and high-performing design experiences.",
    testimonials: [
      {
        quote:
          "Taapti transformed our clunky enterprise platform into a sleek, intuitive product that our users love using daily.",
        name: "Product Design Lead",
        role: "Chief Product Officer, Enterprise SaaS",
      },
      {
        quote:
          "Their Figma design system made engineering handoff instantaneous and reduced frontend implementation bugs dramatically.",
        name: "Frontend Lead",
        role: "Engineering Director, Web Platform",
      },
      {
        quote:
          "The modern aesthetic and user flow redesign boosted our landing page conversion by over 40%.",
        name: "Growth Lead",
        role: "Co-Founder, Startup Platform",
      },
    ],
    faqs: [
      {
        question: "What tools do you use for UI/UX design?",
        answer:
          "We work primarily with Figma for visual interface design, interactive prototyping, and component-based design systems.",
      },
      {
        question: "Do you deliver developer-ready design systems?",
        answer:
          "Yes. All designs include complete design tokens, color variables, typography scales, responsive layouts, and interactive state specs.",
      },
      {
        question: "Can you redesign an existing digital product?",
        answer:
          "Yes. We perform UX audits, gather user feedback, and restructure navigation and visual hierarchy to improve usability and retention.",
      },
      {
        question: "Do you assist during frontend implementation?",
        answer:
          "Yes. Our designers work alongside frontend developers to ensure pixel-perfect fidelity and smooth UI micro-animations.",
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

  return <ServiceDetailClient service={service} />;
}