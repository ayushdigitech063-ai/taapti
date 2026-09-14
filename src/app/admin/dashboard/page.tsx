"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";

interface SubItem {
  id: string;
  label: string;
}

interface NavItem {
  id: string;
  label: string;
  icon: string;
  count?: number;
  subItems?: SubItem[];
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    group: "OVERVIEW",
    items: [
      { id: "dashboard", label: "Dashboard Overview", icon: "grid" },
    ],
  },
  {
    group: "WEBSITE PAGES (STATIC SECTIONS)",
    items: [
      {
        id: "home-page-cms",
        label: "1. Home Page",
        icon: "home",
        subItems: [
          { id: "home-hero", label: "Hero Banner" },
          { id: "home-services", label: "Services Preview" },
          { id: "home-company", label: "Our Company (Ideas to Impact)" },
          { id: "home-process", label: "Engineering Process" },
          { id: "home-partners", label: "Technology Partners" },
          { id: "home-case-studies", label: "Featured Case Studies" },
          { id: "home-testimonials", label: "Client Testimonials" },
          { id: "home-gallery", label: "Our Gallery Section" },
          { id: "home-cta", label: "Call to Action Banner" },
        ],
      },
      {
        id: "services-page-cms",
        label: "2. Services Page",
        icon: "cpu",
        subItems: [
          { id: "services-hero", label: "Services Hero" },
          { id: "services-core", label: "Core Engineering Offerings" },
          { id: "services-ai", label: "AI & Custom Software Tools" },
          { id: "services-tech-stack", label: "Tech Stack & Frameworks" },
          { id: "services-faq", label: "Service FAQs" },
        ],
      },
      {
        id: "industries-page-cms",
        label: "3. Industries Page",
        icon: "briefcase",
        subItems: [
          { id: "ind-hero", label: "Industries Hero" },
          { id: "ind-fintech", label: "FinTech Section" },
          { id: "ind-healthcare", label: "Healthcare Section" },
          { id: "ind-saas", label: "SaaS & Tech Section" },
          { id: "ind-ecommerce", label: "E-commerce Section" },
        ],
      },
      {
        id: "case-studies-page-cms",
        label: "4. Case Studies Page",
        icon: "layers",
        subItems: [
          { id: "cs-hero", label: "Case Studies Hero" },
          { id: "cs-filter", label: "Category Filters" },
          { id: "cs-projects-grid", label: "Featured Projects Grid" },
          { id: "cs-outcomes", label: "Client Impact Metrics" },
        ],
      },
      {
        id: "about-page-cms",
        label: "5. About Page",
        icon: "info",
        subItems: [
          { id: "about-hero", label: "About Hero & Mission" },
          { id: "about-stats", label: "Engineering Metrics & SLAs" },
          { id: "about-values", label: "Core Architectural Values" },
          { id: "about-team", label: "Leadership & Engineers" },
        ],
      },
    ],
  },
  {
    group: "BLOG MANAGEMENT",
    items: [
      {
        id: "blog-cms",
        label: "Blog Articles",
        icon: "file-text",
        subItems: [
          { id: "blog-all", label: "All Published Blogs" },
          { id: "blog-create", label: "+ Add New Blog" },
          { id: "blog-categories", label: "Categories & Tags" },
        ],
      },
    ],
  },
  {
    group: "CAREERS & HIRING",
    items: [
      {
        id: "careers-cms",
        label: "Careers & Openings",
        icon: "user-plus",
        subItems: [
          { id: "careers-openings", label: "Active Job Positions" },
          { id: "careers-create", label: "+ Add New Hiring" },
          { id: "careers-applications", label: "Job Applications Received" },
        ],
      },
    ],
  },
  {
    group: "LEADS & ENQUIRIES",
    items: [
      { id: "leads", label: "Contact Form Enquiries", icon: "mail", count: 12 },
    ],
  },
  {
    group: "SYSTEM & ADMIN",
    items: [
      { id: "settings", label: "General Settings", icon: "settings" },
      { id: "users", label: "Super Admin Users", icon: "users" },
    ],
  },
];

// Helper to render SVG Icons cleanly
function NavIcon({ name }: { name: string }) {
  switch (name) {
    case "grid":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
    case "home":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
    case "info":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
    case "mail":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
    case "briefcase":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>;
    case "cpu":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>;
    case "layers":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
    case "file-text":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>;
    case "bar-chart-2":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
    case "trending-up":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>;
    case "settings":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
    case "users":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case "user-plus":
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>;
    default:
      return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/></svg>;
  }
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [admin, setAdmin] = useState<{ name: string; email: string } | null>(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({ "home-page-cms": true });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Home Hero CMS state
  const [heroForm, setHeroForm] = useState({
    eyebrow: "Software Engineering & AI",
    headingLine1: "We build technology",
    headingLine2: "that moves businesses forward.",
    description:
      "Taapti Technologies helps ambitious businesses design, build and scale reliable digital products with modern software engineering and AI.",
    primaryBtnText: "Start a Project",
    primaryBtnLink: "/contact",
    secondaryBtnText: "View Our Work",
    secondaryBtnLink: "/case-studies",
    stats: [
      { value: "50+", label: "Projects Delivered" },
      { value: "30+", label: "Happy Clients" },
      { value: "5+", label: "Industries Served" },
      { value: "99%", label: "Client Satisfaction" },
    ],
  });
  const [isSavingHero, setIsSavingHero] = useState(false);

  // Home Services Preview Section CMS state
  const [servicesSectionForm, setServicesSectionForm] = useState({
    badgeText: "WHAT WE DO",
    headingLine1: "Engineering solutions",
    headingHighlight: "built for impact.",
    subheading:
      "We help ambitious businesses build, improve and scale digital products with modern software engineering and AI.",
    services: [
      {
        number: "01",
        tag: "BUILD",
        title: "Software Engineering",
        description:
          "Build reliable, scalable and high-performance software products tailored to your business needs.",
        link: "/services/software-engineering",
        image: "/services/se.jpg",
      },
      {
        number: "02",
        tag: "INTELLIGENCE",
        title: "AI & Machine Learning",
        description:
          "Turn AI opportunities into practical solutions that improve products, operations and customer experiences.",
        link: "/services/ai-machine-learning",
        image: "/services/ai.jpg",
      },
      {
        number: "03",
        tag: "WEB",
        title: "Web Development",
        description:
          "Modern, responsive web applications built for performance, usability and long-term scalability.",
        link: "/services/web-development",
        image: "/services/web.jpg",
      },
      {
        number: "04",
        tag: "PRODUCT",
        title: "Product Development",
        description:
          "From idea to launch, we help businesses design, develop and scale digital products.",
        link: "/services/product-development",
        image: "/services/product.jpg",
      },
    ],
  });
  const [isSavingServicesSection, setIsSavingServicesSection] = useState(false);

  // Home Partners Section CMS state
  const [partnersSectionForm, setPartnersSectionForm] = useState({
    eyebrow: "TRUSTED PARTNERSHIPS",
    headingNormal: "Trusted by companies",
    headingHighlight: "we've built for",
    description: "We collaborate with industry leaders and fast-growing startups to engineer high-impact digital products.",
    stats: [
      { icon: "🚀", value: "50+", label: "Production Apps Shipped" },
      { icon: "⚡", value: "100%", label: "On-Time Delivery" },
      { icon: "🌐", value: "10+", label: "Countries Served" },
      { icon: "⭐", value: "4.9/5", label: "Client Rating" },
    ],
    partners: [
      { name: "USP", category: "Logistics & Supply Chain", description: "Enterprise software solution and tracking engine optimization.", logoText: "USP", accentColor: "#3b82f6", image: "/partners/usp.jpg" },
      { name: "Bar.Stream", category: "Media & Streaming Tech", description: "High-concurrency streaming infrastructure & React Native mobile client.", logoText: "BAR.STREAM", accentColor: "#2563eb", image: "/partners/barstream.jpg" },
      { name: "Invoxbooks", category: "FinTech & Accounting", description: "Automated invoice processing & accounting dashboard platform.", logoText: "INVOXBOOKS", accentColor: "#1d4ed8", image: "/partners/invoxbooks.jpg" },
      { name: "TechInnovate", category: "Cloud SaaS", description: "Multi-tenant cloud architecture & AI RAG implementation.", logoText: "TECHINNOVATE", accentColor: "#0284c7", image: "/partners/techinnovate.jpg" },
      { name: "HealthPulse", category: "Digital Healthcare", description: "HIPAA-compliant patient portal & automated workflow system.", logoText: "HEALTHPULSE", accentColor: "#059669", image: "/partners/healthpulse.jpg" },
      { name: "GlobalPay", category: "Cross-Border FinTech", description: "Real-time payment gateway integration & fraud detection engine.", logoText: "GLOBALPAY", accentColor: "#7c3aed", image: "/partners/globalpay.jpg" },
    ],
  });
  const [isSavingPartners, setIsSavingPartners] = useState(false);

  const fetchPartnersData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/partners-section").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setPartnersSectionForm((prev) => ({
            eyebrow: d.eyebrow || "TRUSTED PARTNERSHIPS",
            headingNormal: d.headingNormal || "Trusted by companies",
            headingHighlight: d.headingHighlight || "we've built for",
            description: d.description || "",
            stats: d.stats && d.stats.length > 0 ? d.stats : prev.stats,
            partners: d.partners && d.partners.length > 0 ? d.partners : prev.partners,
          }));
        }
      }
    } catch { /* silent */ }
  };

  const handleSavePartnersSection = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIsSavingPartners(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/partners-section", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(partnersSectionForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("PARTNERS_SECTION_UPDATED");
          bc.close();
        }
        Swal.fire({ icon: "success", title: "Saved & Published! 🚀", text: "Trusted Partners section updated!", timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire("Error", data.message || "Failed to update", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingPartners(false);
    }
  };

  // Home Case Studies CMS state
  const [caseStudiesForm, setCaseStudiesForm] = useState({
    eyebrow: "PROVEN IMPACT",
    headingNormal: "Real businesses.",
    headingHighlight: "Measurable results.",
    description: "From ambitious startups to global enterprises, we build scalable software solutions that solve real-world problems.",
    caseStudies: [
      {
        id: "01",
        category: "FINTECH",
        title: "Building the future of digital banking",
        description: "A secure, scalable and intuitive platform used by 1M+ customers across India.",
        metrics: [
          { value: "3x", label: "User Growth" },
          { value: "40%", label: "Faster Transactions" },
          { value: "99.9%", label: "Platform Uptime" },
        ],
      },
      {
        id: "02",
        category: "HEALTHCARE",
        title: "Smarter care for healthier tomorrows",
        description: "A HIPAA-compliant patient portal with automated workflows and real-time care coordination.",
        metrics: [
          { value: "60%", label: "Faster Onboarding" },
          { value: "2x", label: "Operational Efficiency" },
          { value: "4.8/5", label: "User Satisfaction" },
        ],
      },
      {
        id: "03",
        category: "SAAS",
        title: "Scaling a product for global markets",
        description: "We helped GlobalPay scale their payment infrastructure to support multi-currency transactions worldwide.",
        metrics: [
          { value: "5x", label: "Revenue Growth" },
          { value: "70%", label: "Fraud Reduction" },
          { value: "50+", label: "Countries Supported" },
        ],
      },
    ],
  });
  const [isSavingCaseStudies, setIsSavingCaseStudies] = useState(false);

  const fetchCaseStudiesData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/case-studies").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setCaseStudiesForm((prev) => ({
            eyebrow: d.eyebrow || "PROVEN IMPACT",
            headingNormal: d.headingNormal || "Real businesses.",
            headingHighlight: d.headingHighlight || "Measurable results.",
            description: d.description || "",
            caseStudies: d.caseStudies && d.caseStudies.length > 0 ? d.caseStudies : prev.caseStudies,
          }));
        }
      }
    } catch { /* silent */ }
  };

  const handleSaveCaseStudies = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIsSavingCaseStudies(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/case-studies", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(caseStudiesForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("CASE_STUDIES_UPDATED");
          bc.close();
        }
        Swal.fire({ icon: "success", title: "Saved & Published! 🚀", text: "Case Studies section updated live!", timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire("Error", data.message || "Failed to update", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingCaseStudies(false);
    }
  };

  // Home Testimonials CMS state
  const [testimonialsForm, setTestimonialsForm] = useState({
    eyebrow: "Google Reviews Official Badge",
    headingNormal: "Loved by Our",
    headingHighlight: "Clients",
    subtitle: "Real feedback from real people on Google.",
    reviews: [
      { name: "Rohit Sharma", date: "2 weeks ago", avatar: "/testimonials/rohit.jpg", rating: 5, review: "Amazing experience working with the team! They understood our requirements perfectly and delivered beyond expectations." },
      { name: "Priya Mehta", date: "1 month ago", avatar: "", avatarBg: "#9333ea", initial: "P", rating: 5, review: "Professional, responsive and great at what they do. The entire process was smooth!" },
      { name: "Amit Verma", date: "3 weeks ago", avatar: "/testimonials/rohit.jpg", rating: 5, review: "Excellent service and support. The team is very professional and delivers high-quality work on time." },
    ],
  });
  const [isSavingTestimonials, setIsSavingTestimonials] = useState(false);

  const fetchTestimonialsData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/testimonials").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setTestimonialsForm((prev) => ({
            eyebrow: d.eyebrow || "Google Reviews Official Badge",
            headingNormal: d.headingNormal || "Loved by Our",
            headingHighlight: d.headingHighlight || "Clients",
            subtitle: d.subtitle || "",
            reviews: d.reviews && d.reviews.length > 0 ? d.reviews : prev.reviews,
          }));
        }
      }
    } catch { /* silent */ }
  };

  const handleSaveTestimonials = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIsSavingTestimonials(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(testimonialsForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("TESTIMONIALS_UPDATED");
          bc.close();
        }
        Swal.fire({ icon: "success", title: "Saved & Published! 🚀", text: "Testimonials section updated live!", timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire("Error", data.message || "Failed to update", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingTestimonials(false);
    }
  };

  // Home CTA Banner CMS state
  const [ctaForm, setCtaForm] = useState({
    eyebrow: "HAVE A PROJECT IN MIND?",
    titleNormal: "Let's build something",
    titleHighlight: "that matters.",
    description: "Tell us what you're building, what you're trying to solve, or where you want to go next.",
    primaryBtnText: "Start a Conversation",
    secondaryBtnText: "Explore Services",
    bannerImage: "",
    centerCardTitle: "From ideas to impact",
    trustItems: [
      { title: "Free Consultation" },
      { title: "Quick Response" },
      { title: "Confidential & Secure" },
    ],
  });
  const [isSavingCta, setIsSavingCta] = useState(false);

  const fetchCtaData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cta").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setCtaForm((prev) => ({
            eyebrow: d.eyebrow || "HAVE A PROJECT IN MIND?",
            titleNormal: d.titleNormal || "Let's build something",
            titleHighlight: d.titleHighlight || "that matters.",
            description: d.description || "",
            primaryBtnText: d.primaryBtnText || "Start a Conversation",
            secondaryBtnText: d.secondaryBtnText || "Explore Services",
            bannerImage: d.bannerImage || "",
            centerCardTitle: d.centerCardTitle || "From ideas to impact",
            trustItems: d.trustItems && d.trustItems.length > 0 ? d.trustItems : prev.trustItems,
          }));
        }
      }
    } catch { /* silent */ }
  };

  const handleSaveCta = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIsSavingCta(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/cta", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(ctaForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("CTA_UPDATED");
          bc.close();
        }
        Swal.fire({ icon: "success", title: "Saved & Published! 🚀", text: "CTA Banner section updated live!", timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire("Error", data.message || "Failed to update", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingCta(false);
    }
  };

  // Home Process Section CMS state
  const [processSectionForm, setProcessSectionForm] = useState({
    eyebrow: "PROCESS",
    headingNormal: "Delivering results",
    headingHighlight: "with purpose",
    description: "Our systematic approach delivers every project with precision and measurable results.",
    centerLogoUrl: "",
    centerLogoText: "TaapTi",
    steps: [
      { number: 1, title: "Scope definition", description: "Mapping project boundaries and establishing clear success metrics.", angle: -67.5 },
      { number: 2, title: "UI/UX design", description: "Designing clear, usable interfaces that fit your brand.", angle: -22.5 },
      { number: 3, title: "Architecture planning", description: "Designing scalable system architecture with modern technology stacks.", angle: 22.5 },
      { number: 4, title: "Agile development", description: "Building reliable solutions through iterative sprints with complete transparency.", angle: 67.5 },
      { number: 5, title: "Rigorous testing", description: "Comprehensive QA processes including security audits and performance optimization.", angle: 112.5 },
      { number: 6, title: "Zero-downtime deployment", description: "Rolling out your solution with zero downtime and complete documentation.", angle: 157.5 },
      { number: 7, title: "Ongoing maintenance", description: "Ongoing support with regular updates and performance monitoring.", angle: -157.5 },
      { number: 8, title: "Growth & scaling", description: "Tracking metrics and shipping improvements over time.", angle: -112.5 },
    ],
  });
  const [isSavingProcess, setIsSavingProcess] = useState(false);

  const fetchProcessSectionData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/process-section").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setProcessSectionForm((prev) => ({
            eyebrow: d.eyebrow || "PROCESS",
            headingNormal: d.headingNormal || "Delivering results",
            headingHighlight: d.headingHighlight || "with purpose",
            description: d.description || "",
            centerLogoUrl: d.centerLogoUrl || "",
            centerLogoText: d.centerLogoText || "TaapTi",
            steps: d.steps && d.steps.length > 0 ? d.steps : prev.steps,
          }));
        }
      }
    } catch { /* silent */ }
  };

  const handleSaveProcessSection = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIsSavingProcess(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/process-section", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(processSectionForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("PROCESS_SECTION_UPDATED");
          bc.close();
        }
        Swal.fire({ icon: "success", title: "Saved & Published! 🚀", text: "Process section updated!", timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire("Error", data.message || "Failed to update", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingProcess(false);
    }
  };

  // Home Our Company Section CMS state
  const [ourCompanyForm, setOurCompanyForm] = useState({
    eyebrow: "OUR COMPANY",
    headingNormal: "A founder-led software team that",
    headingHighlight: "ships to production",
    paragraph1:
      "Taapti Technologies is a founder-led software team based in Surat, India, working with clients from California to Sydney. We build full-stack products end to end: backends in Java, Spring Boot, Node.js and Python, web and mobile front-ends in React, Next.js and React Native, and AI features built on RAG. We have shipped for USP, Bar.Stream and Invoxbooks.",
    paragraph2:
      "You work directly with the engineers writing your code, not a layer of account managers. Most clients keep three to four hours of daily overlap with our team, so reviews and decisions happen the same day. We bill in USD by the hour, and you pay only for hours actually worked.",
    badgeNumber: "10",
    badgeLabel: "Years\nexperience",
    topPhotos: [
      { src: "/about/team1.jpg", alt: "Taapti software engineering team at office" },
      { src: "/about/team3.jpg", alt: "Taapti tech team reviewing project deliverables" },
      { src: "/about/team2.jpg", alt: "Taapti developers collaborating on code" },
    ],
    bottomPhotos: [
      { src: "/about/team2.jpg", alt: "Taapti developers collaborating on code" },
      { src: "/about/team3.jpg", alt: "Taapti tech team reviewing project deliverables" },
      { src: "/about/team1.jpg", alt: "Taapti software engineering team at office" },
    ],
  });
  const [isSavingOurCompany, setIsSavingOurCompany] = useState(false);

  const fetchOurCompanyData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/our-company").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setOurCompanyForm({
            eyebrow: d.eyebrow || "OUR COMPANY",
            headingNormal: d.headingNormal || "A founder-led software team that",
            headingHighlight: d.headingHighlight || "ships to production",
            paragraph1: d.paragraph1 || "",
            paragraph2: d.paragraph2 || "",
            badgeNumber: d.badgeNumber || "10",
            badgeLabel: d.badgeLabel || "Years\nexperience",
            topPhotos: d.topPhotos && d.topPhotos.length > 0 ? d.topPhotos : ourCompanyForm.topPhotos,
            bottomPhotos: d.bottomPhotos && d.bottomPhotos.length > 0 ? d.bottomPhotos : ourCompanyForm.bottomPhotos,
          });
        }
      }
    } catch {
      // Silent catch
    }
  };

  const handleSaveOurCompany = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIsSavingOurCompany(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/our-company", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(ourCompanyForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("OUR_COMPANY_UPDATED");
          bc.close();
        }
        Swal.fire({ icon: "success", title: "Saved & Published Live! 🚀", text: "Our Company section updated!", timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire("Error", data.message || "Failed to update Our Company section", "error");
      }
    } catch (err) {
      console.error("Save ourCompany error:", err);
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingOurCompany(false);
    }
  };

  const fetchServicesSectionData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services-section").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setServicesSectionForm({
            badgeText: data.data.badgeText || "WHAT WE DO",
            headingLine1: data.data.headingLine1 || "Engineering solutions",
            headingHighlight: data.data.headingHighlight || "built for impact.",
            subheading: data.data.subheading || "",
            services: data.data.services && data.data.services.length > 0 ? data.data.services : servicesSectionForm.services,
          });
        }
      }
    } catch {
      // Silent catch if backend unavailable
    }
  };

  const handleSaveServicesSection = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsSavingServicesSection(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/services-section", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(servicesSectionForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("SERVICES_SECTION_UPDATED");
          bc.close();
        }

        Swal.fire({
          icon: "success",
          title: "Saved & Published Live! 🚀",
          text: "Home Services Preview section live website content has been updated!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", data.message || "Failed to update Services section", "error");
      }
    } catch (err) {
      console.error("Save services section error:", err);
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingServicesSection(false);
    }
  };

  const fetchHeroData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/hero").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setHeroForm({
            eyebrow: data.data.eyebrow || "",
            headingLine1: data.data.headingLine1 || "",
            headingLine2: data.data.headingLine2 || "",
            description: data.data.description || "",
            primaryBtnText: data.data.primaryBtnText || "",
            primaryBtnLink: data.data.primaryBtnLink || "/contact",
            secondaryBtnText: data.data.secondaryBtnText || "",
            secondaryBtnLink: data.data.secondaryBtnLink || "/case-studies",
            stats: data.data.stats && data.data.stats.length > 0 ? data.data.stats : [
              { value: "50+", label: "Projects Delivered" },
              { value: "30+", label: "Happy Clients" },
              { value: "5+", label: "Industries Served" },
              { value: "99%", label: "Client Satisfaction" },
            ],
          });
        }
      }
    } catch {
      // Silent catch if backend unavailable
    }
  };

  const handleSaveHero = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log("handleSaveHero triggered! Payload:", heroForm);
    setIsSavingHero(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/hero", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(heroForm),
      });
      const data = await res.json();
      console.log("PUT /api/hero response:", data);
      if (data.success) {
        // Broadcast instant update signal to open website tabs
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage({ type: "HERO_UPDATED" });
          bc.close();
        }

        Swal.fire({
          icon: "success",
          title: "Saved & Published Live! 🚀",
          text: "Home Hero section live website content has been updated!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", data.message || "Failed to update hero section", "error");
      }
    } catch (err) {
      console.error("Save hero error:", err);
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingHero(false);
    }
  };

  const [galleryForm, setGalleryForm] = useState({
    badgeText: "OUR GALLERY",
    heading: "Engineering & Culture in Action",
    subheading: "Explore moments from our engineering hub, client workshops, tech summits, and collaborative culture.",
    images: [
      { id: "g1", url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80", title: "Engineering Team Collaboration", category: "Culture" },
      { id: "g2", url: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80", title: "Architecture & Design Workshop", category: "Workshops" },
      { id: "g3", url: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80", title: "Client Technology Summit", category: "Events" },
      { id: "g4", url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80", title: "Cloud & Microservices Development", category: "Engineering" },
      { id: "g5", url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80", title: "AI & Systems Hackathon", category: "Innovation" },
      { id: "g6", url: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=800&q=80", title: "Taapti Technology Hub", category: "Workspace" }
    ]
  });
  const [isSavingGallery, setIsSavingGallery] = useState(false);

  const fetchGalleryData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/gallery");
      const data = await res.json();
      if (data && data.images) {
        setGalleryForm({
          badgeText: data.badgeText || "OUR GALLERY",
          heading: data.heading || "",
          subheading: data.subheading || "",
          images: data.images || [],
        });
      }
    } catch (err) {
      console.error("Fetch gallery error:", err);
    }
  };

  const handleSaveGallery = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsSavingGallery(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/gallery", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(galleryForm),
      });
      const data = await res.json();
      if (res.ok) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("GALLERY_UPDATED");
          bc.close();
        }

        Swal.fire({
          icon: "success",
          title: "Saved & Published Live! 🚀",
          text: "Home Gallery section live website content has been updated!",
          timer: 2000,
          showConfirmButton: false,
        });
      } else {
        Swal.fire("Error", data.message || "Failed to update gallery section", "error");
      }
    } catch (err) {
      console.error("Save gallery error:", err);
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingGallery(false);
    }
  };

  const [leads, setLeads] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchLeads = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/leads").catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json && json.data) {
          setLeads(json.data);
          const unread = json.data.filter((l: any) => !l.isRead).length;
          setUnreadCount(unread);
        }
      }
    } catch (err) {
      console.error("Fetch leads error:", err);
    }
  };

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    fetchHeroData();
    fetchServicesSectionData();
    fetchOurCompanyData();
    fetchProcessSectionData();
    fetchPartnersData();
    fetchCaseStudiesData();
    fetchTestimonialsData();
    fetchCtaData();
    fetchLeads();

    let channel: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel("taapti_cms_updates");
      channel.onmessage = (event) => {
        if (event.data === "NEW_LEAD_SUBMITTED" || event.data === "CMS_UPDATED") {
          fetchLeads();
        }
      };
    }

    const interval = setInterval(() => {
      fetchLeads();
    }, 4000);

    return () => {
      if (channel) channel.close();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminData = localStorage.getItem("adminData");

    if (!token || !adminData) {
      router.push("/admin/login");
      return;
    }

    try {
      setAdmin(JSON.parse(adminData));
    } catch {
      router.push("/admin/login");
    } finally {
      const timer = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [router]);

  const handleLogout = () => {
    Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to end your Super Admin session?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#687386",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("adminToken");
        try {
          await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        } catch (err) {
          console.error("Logout error", err);
        }

        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminData");

        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been safely logged out.",
          timer: 1500,
          showConfirmButton: false,
        });

        setTimeout(() => {
          router.push("/admin/login");
        }, 1200);
      }
    });
  };

  if (!admin) return null;

  return (
    <div className={`cmd-container ${sidebarCollapsed ? "cmd-container--collapsed" : ""}`}>
      {/* MOBILE BACKDROP OVERLAY */}
      {mobileMenuOpen && (
        <div
          className="cmd-mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className={`cmd-sidebar ${mobileMenuOpen ? "cmd-sidebar--open" : ""} ${sidebarCollapsed ? "cmd-sidebar--collapsed" : ""}`}>
        {/* Brand Header */}
        <div className="cmd-sidebar-brand">
          <div className="cmd-brand-logo">
            <span className="cmd-brand-dot" style={{ background: "#00875A", boxShadow: "0 0 10px rgba(0, 135, 90, 0.4)" }} />
            {!sidebarCollapsed && (
              <span className="cmd-brand-text" style={{ fontSize: "20px", fontWeight: "800", letterSpacing: "1px", color: "#00875A" }}>
                TAAPT<span style={{ color: "#10243E" }}>I</span>
              </span>
            )}
          </div>
        </div>

        {/* Grouped Navigation */}
        <div className="cmd-sidebar-nav">
          {navGroups.map((group) => (
            <div key={group.group} className="cmd-nav-group">
              {!sidebarCollapsed && <span className="cmd-nav-group-label">{group.group}</span>}
              {group.items.map((item) => {
                const hasSub = Boolean(item.subItems && item.subItems.length > 0);
                const isOpen = Boolean(openDropdowns[item.id]);

                return (
                  <div key={item.id} className="cmd-nav-dropdown-wrapper">
                    <button
                      className={`cmd-nav-item ${activeTab === item.id || (hasSub && item.subItems?.some(s => s.id === activeTab)) ? "active" : ""}`}
                      title={sidebarCollapsed ? item.label : undefined}
                      onClick={() => {
                        if (hasSub) {
                          toggleDropdown(item.id);
                          if (item.subItems && item.subItems.length > 0 && !isOpen) {
                            setActiveTab(item.subItems[0].id);
                          }
                        } else {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }
                      }}
                    >
                      <div className="cmd-nav-item-main">
                        <NavIcon name={item.icon} />
                        {!sidebarCollapsed && <span className="cmd-nav-item-label">{item.label}</span>}
                      </div>
                      {!sidebarCollapsed && item.count && <span className="cmd-nav-item-count">{item.count}</span>}
                      {!sidebarCollapsed && hasSub && (
                        <svg
                          className={`cmd-dropdown-chevron ${isOpen ? "open" : ""}`}
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        >
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      )}
                    </button>

                    {/* Dropdown Sub-Items List */}
                    {!sidebarCollapsed && hasSub && isOpen && (
                      <div className="cmd-subnav-list">
                        {item.subItems?.map((sub) => (
                          <button
                            key={sub.id}
                            className={`cmd-subnav-item ${activeTab === sub.id ? "active" : ""}`}
                            onClick={() => {
                              setActiveTab(sub.id);
                              setMobileMenuOpen(false);
                            }}
                          >
                            <span className="cmd-subnav-bullet" />
                            <span>{sub.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer View Site Link */}
        <div className="cmd-sidebar-footer">
          <Link href="/" target="_blank" className="cmd-view-site-btn" title="View Live Website">
            <span>{!sidebarCollapsed ? "View Live Website" : "🌐"}</span>
            {!sidebarCollapsed && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            )}
          </Link>
        </div>
      </aside>

      {/* MAIN COMMAND CENTER BODY */}
      <div className="cmd-main">
        {/* ====================== TOP HEADER BAR ====================== */}
        <header className="cmd-header">
          {/* LEFT: Page title only */}
          <div className="cmd-header-left">
            <div className="cmd-breadcrumb">
              <span className="cmd-breadcrumb-title">Taapti Super Admin</span>
            </div>
          </div>

          {/* RIGHT: Quick Action Buttons + Bell notification + Profile avatar dropdown */}
          <div className="cmd-header-right">

            {/* 🔔 Notification Bell */}
            <button
              className="cmd-icon-btn"
              aria-label="Notifications"
              title={`${unreadCount} New Leads Received`}
              onClick={() => {
                setActiveTab("leads");
                setUnreadCount(0);
              }}
              style={{ position: "relative" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              {unreadCount > 0 && (
                <span className="cmd-notif-badge" style={{ position: "absolute", top: "-4px", right: "-4px", background: "#EF4444", color: "#FFF", fontSize: "10px", fontWeight: "800", padding: "1px 5px", borderRadius: "99px" }}>
                  {unreadCount}
                </span>
              )}
            </button>

            {/* 👤 Profile Pill + Hover Dropdown */}
            <div className="cmd-profile-dropdown-wrapper">
              <div className="cmd-profile-trigger">
                <div className="cmd-avatar">{admin.name.charAt(0).toUpperCase()}</div>
                <span className="cmd-profile-role">Super Admin</span>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </div>

              {/* Dropdown Menu (appears on hover) */}
              <div className="cmd-profile-menu">
                <div className="cmd-menu-user-info">
                  <strong>{admin.name}</strong>
                  <small>{admin.email}</small>
                  <span className="cmd-menu-badge">🛡️ Super Admin</span>
                </div>
                <div className="cmd-menu-divider" />
                <button className="cmd-menu-item" onClick={() => setActiveTab("settings")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                  Account Settings
                </button>
                <button className="cmd-menu-item cmd-menu-logout" onClick={handleLogout}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Sign Out
                </button>
              </div>
            </div>

          </div>
        </header>

        {/* DASHBOARD CONTENT CONTAINER */}
        <main className="cmd-content">

          {activeTab === "dashboard" ? (
            <>
              {/* ── HERO WELCOME BANNER ── */}
              <div className="ov-hero">
                <div className="ov-hero-left">
                  <div className="ov-hero-greeting">Good morning, {admin.name} 👋</div>
                  <p className="ov-hero-sub">Here&apos;s your complete platform overview for today.</p>
                </div>
                <div className="ov-hero-right">
                  <div className="ov-date-badge">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    {new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                  </div>
                </div>
              </div>

              {/* SKELETON LOADING OR REAL DASHBOARD CONTENT */}
              {isLoading ? (
                <div className="cmd-skeleton-wrapper">
                  <div className="cmd-skeleton-grid">
                    {[1, 2, 3, 4].map((n) => (
                      <div key={n} className="cmd-skeleton-card" />
                    ))}
                  </div>
                  <div className="cmd-skeleton-row">
                    <div className="cmd-skeleton-panel" />
                    <div className="cmd-skeleton-panel" />
                  </div>
                </div>
              ) : (
                <>
                  {/* ── 4 KPI STAT CARDS ── */}
                  <div className="ov-kpi-grid">

                    <div className="ov-kpi-card ov-kpi-blue">
                      <div className="ov-kpi-top">
                        <div className="ov-kpi-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                        </div>
                        <span className="ov-kpi-badge up">↑ 18.4%</span>
                      </div>
                      <div className="ov-kpi-value">24,850</div>
                      <div className="ov-kpi-label">Total Website Traffic</div>
                      <svg className="ov-sparkline" viewBox="0 0 100 28" preserveAspectRatio="none">
                        <path d="M0,22 Q25,10 50,16 T100,4" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                      </svg>
                    </div>

                    <div className="ov-kpi-card ov-kpi-green">
                      <div className="ov-kpi-top">
                        <div className="ov-kpi-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </div>
                        <span className="ov-kpi-badge up">+12 today</span>
                      </div>
                      <div className="ov-kpi-value">142</div>
                      <div className="ov-kpi-label">New Enquiries</div>
                      <svg className="ov-sparkline" viewBox="0 0 100 28" preserveAspectRatio="none">
                        <path d="M0,24 Q20,12 40,18 T80,6 T100,2" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                      </svg>
                    </div>

                    <div className="ov-kpi-card ov-kpi-purple">
                      <div className="ov-kpi-top">
                        <div className="ov-kpi-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        </div>
                        <span className="ov-kpi-badge neutral">On Track</span>
                      </div>
                      <div className="ov-kpi-value">18</div>
                      <div className="ov-kpi-label">Active Projects</div>
                      <svg className="ov-sparkline" viewBox="0 0 100 28" preserveAspectRatio="none">
                        <path d="M0,14 Q30,16 60,10 T100,12" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                      </svg>
                    </div>

                    <div className="ov-kpi-card ov-kpi-amber">
                      <div className="ov-kpi-top">
                        <div className="ov-kpi-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        </div>
                        <span className="ov-kpi-badge up">30+ Reviews</span>
                      </div>
                      <div className="ov-kpi-value">4.95<span className="ov-kpi-suffix">/5.0</span></div>
                      <div className="ov-kpi-label">Client Rating</div>
                      <svg className="ov-sparkline" viewBox="0 0 100 28" preserveAspectRatio="none">
                        <path d="M0,18 Q40,8 70,10 T100,4" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                      </svg>
                    </div>

                  </div>

                  {/* ── ANALYTICS ROW: Chart + Pipeline ── */}
                  <div className="ov-analytics-row">

                    {/* Lead Activity Chart */}
                    <div className="ov-card ov-chart-card">
                      <div className="ov-card-head">
                        <div>
                          <div className="ov-card-title">Lead Activity</div>
                          <div className="ov-card-sub">Website contact submissions — last 30 days</div>
                        </div>
                        <button className="ov-link-btn">View report →</button>
                      </div>
                      <svg className="ov-area-chart" viewBox="0 0 500 150" preserveAspectRatio="none">
                        <defs>
                          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#00875A" stopOpacity="0.18"/>
                            <stop offset="100%" stopColor="#00875A" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="38" x2="500" y2="38" stroke="#E3E8F0" strokeWidth="1" strokeDasharray="4 4"/>
                        <line x1="0" y1="76" x2="500" y2="76" stroke="#E3E8F0" strokeWidth="1" strokeDasharray="4 4"/>
                        <line x1="0" y1="114" x2="500" y2="114" stroke="#E3E8F0" strokeWidth="1" strokeDasharray="4 4"/>
                        <path d="M0,125 Q60,100 120,108 T240,58 T360,80 T460,30 L500,25 L500,150 L0,150 Z" fill="url(#areaGrad)"/>
                        <path d="M0,125 Q60,100 120,108 T240,58 T360,80 T460,30 L500,25" fill="none" stroke="#00875A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="240" cy="58" r="5" fill="#00875A" stroke="#fff" strokeWidth="2"/>
                        <circle cx="500" cy="25" r="5" fill="#00875A" stroke="#fff" strokeWidth="2"/>
                      </svg>
                      <div className="ov-chart-labels">
                        <span>1 Sep</span><span>8 Sep</span><span>15 Sep</span><span>22 Sep</span><span>30 Sep</span>
                      </div>
                    </div>

                    {/* Enquiry Pipeline */}
                    <div className="ov-card ov-pipeline-card">
                      <div className="ov-card-head">
                        <div>
                          <div className="ov-card-title">Enquiry Pipeline</div>
                          <div className="ov-card-sub">Distribution of current lead stages</div>
                        </div>
                        <button className="ov-link-btn">View report →</button>
                      </div>
                      <div className="ov-pipeline-list">
                        {[
                          { label: "New Enquiries",        count: 24, pct: 70, color: "#00875A" },
                          { label: "Contacted & In Review", count: 18, pct: 53, color: "#F59E0B" },
                          { label: "Proposal Sent",         count: 9,  pct: 30, color: "#6366F1" },
                          { label: "Won & Onboarded",       count: 6,  pct: 20, color: "#10B981" },
                        ].map((item) => (
                          <div key={item.label} className="ov-pipeline-item">
                            <div className="ov-pipeline-meta">
                              <span>{item.label}</span>
                              <strong>{item.count}</strong>
                            </div>
                            <div className="ov-pipeline-track">
                              <div className="ov-pipeline-fill" style={{ width: `${item.pct}%`, background: item.color }}/>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* ── RECENT ENQUIRIES TABLE ── */}
                  <div className="ov-card ov-table-card">
                    <div className="ov-card-head">
                      <div>
                        <div className="ov-card-title">Recent Enquiries ({leads.length})</div>
                        <div className="ov-card-sub">Latest submissions from project contact & enquiry forms</div>
                      </div>
                      <button className="ov-link-btn" onClick={() => setActiveTab("leads")}>View all →</button>
                    </div>

                    {/* Desktop Table */}
                    <div className="ov-table-wrap">
                      <table className="ov-table">
                        <thead>
                          <tr>
                            <th>CLIENT NAME</th>
                            <th>CONTACT DETAILS</th>
                            <th>SERVICE / REQ</th>
                            <th>DATE & TIME</th>
                            <th>STATUS</th>
                            <th style={{ textAlign: "right" }}>ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {leads.slice(0, 5).map((ld) => (
                            <tr key={ld._id || ld.phone} className="ov-table-row">
                              <td>
                                <div className="ov-client-cell">
                                  <div className="ov-avatar ov-avatar-blue">{ld.name.charAt(0).toUpperCase()}</div>
                                  <div>
                                    <div className="ov-client-name">{ld.name}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="ov-td-muted">
                                <div><strong>📞 {ld.phone}</strong></div>
                                <div style={{ fontSize: "11px", color: "#64748B" }}>{ld.email}</div>
                              </td>
                              <td className="ov-td-muted"><span style={{ fontWeight: "700", color: "#00875A" }}>{ld.service}</span></td>
                              <td className="ov-td-muted">{new Date(ld.createdAt || Date.now()).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}</td>
                              <td><span className={`ov-badge ${ld.status === "New" ? "badge-new" : "badge-resolved"}`}>{ld.status || "New"}</span></td>
                              <td style={{ textAlign: "right" }}>
                                <button className="ov-view-btn" onClick={() => Swal.fire({ title: `Enquiry from ${ld.name}`, html: `<p><strong>Phone:</strong> ${ld.phone}</p><p><strong>Email:</strong> ${ld.email}</p><p><strong>Service:</strong> ${ld.service}</p><p><strong>Message:</strong> ${ld.message || 'N/A'}</p>`, icon: "info" })}>
                                  View Details →
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : activeTab === "leads" ? (
            /* DYNAMIC LEADS CONTROL PANEL */
            <div className="ov-card" style={{ minHeight: "550px" }}>
              <div className="ov-card-head" style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "16px" }}>
                <div>
                  <div className="ov-card-title" style={{ fontSize: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span>📬 Contact Form Enquiries & Leads ({leads.length})</span>
                  </div>
                  <div className="ov-card-sub">Live submissions received from Enquire Now modals and website contact forms</div>
                </div>
                <button className="cmd-top-action-btn primary" onClick={fetchLeads}>
                  🔄 Refresh Leads
                </button>
              </div>

              <div className="ov-table-wrap" style={{ marginTop: "20px" }}>
                <table className="ov-table">
                  <thead>
                    <tr>
                      <th>CLIENT NAME</th>
                      <th>PHONE & EMAIL</th>
                      <th>REQUESTED SERVICE</th>
                      <th>MESSAGE / NOTES</th>
                      <th>DATE SUBMITTED</th>
                      <th>STATUS</th>
                      <th style={{ textAlign: "right" }}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.length === 0 ? (
                      <tr>
                        <td colSpan={7} style={{ textAlign: "center", padding: "40px", color: "#64748B" }}>
                          No enquiries received yet. Form submissions will automatically show here live!
                        </td>
                      </tr>
                    ) : (
                      leads.map((ld) => (
                        <tr key={ld._id || ld.phone} className="ov-table-row">
                          <td>
                            <div className="ov-client-cell">
                              <div className="ov-avatar ov-avatar-blue">{ld.name.charAt(0).toUpperCase()}</div>
                              <div className="ov-client-name" style={{ fontWeight: "700" }}>{ld.name}</div>
                            </div>
                          </td>
                          <td className="ov-td-muted">
                            <div style={{ color: "#0F172A", fontWeight: "700" }}>📞 {ld.phone}</div>
                            <div style={{ fontSize: "12px", color: "#64748B" }}>{ld.email}</div>
                          </td>
                          <td className="ov-td-muted">
                            <span style={{ background: "#EFF6FF", color: "#0B3B82", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "800" }}>
                              {ld.service}
                            </span>
                          </td>
                          <td className="ov-td-muted" style={{ maxWidth: "240px" }}>
                            {ld.message || "No custom message attached."}
                          </td>
                          <td className="ov-td-muted">
                            {new Date(ld.createdAt || Date.now()).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                          </td>
                          <td>
                            <span className={`ov-badge ${ld.status === "New" ? "badge-new" : "badge-resolved"}`}>
                              {ld.status || "New"}
                            </span>
                          </td>
                          <td style={{ textAlign: "right" }}>
                            <button
                              className="ov-view-btn"
                              onClick={() => {
                                Swal.fire({
                                  title: `Lead Details: ${ld.name}`,
                                  html: `
                                    <div style="text-align: left; font-size: 14px; line-height: 1.6;">
                                      <p><strong>Full Name:</strong> ${ld.name}</p>
                                      <p><strong>Phone:</strong> ${ld.phone}</p>
                                      <p><strong>Email:</strong> ${ld.email}</p>
                                      <p><strong>Service Requested:</strong> ${ld.service}</p>
                                      <p><strong>Submitted Date:</strong> ${new Date(ld.createdAt).toLocaleString()}</p>
                                      <hr style="margin: 12px 0; border: 0; border-top: 1px solid #E2E8F0;" />
                                      <p><strong>Message / Requirement:</strong></p>
                                      <div style="background: #F8FAFC; padding: 12px; border-radius: 8px; font-size: 13px;">${ld.message || "N/A"}</div>
                                    </div>
                                  `,
                                  icon: "info",
                                  confirmButtonColor: "#0B3B82",
                                });
                              }}
                            >
                              View Full Lead →
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* DYNAMIC SECTION EDITOR MODULE - EXACT REAL FRONTEND FIELDS */
            <div className="ov-card" style={{ minHeight: "550px" }}>
              <div className="ov-card-head" style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "16px" }}>
                <div>
                  <div className="ov-card-title" style={{ fontSize: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span>🛠️ Section CMS Manager:</span>
                    <span style={{ color: "#2563EB", textTransform: "capitalize" }}>{activeTab.replace("home-", "Home Page ").replace("-", " ")}</span>
                  </div>
                  <div className="ov-card-sub">Super Admin Content Control Panel — Mapped directly to Backend API & Frontend React components</div>
                </div>
                <button
                  className="cmd-top-action-btn primary"
                  disabled={
                    (isSavingHero && activeTab === "home-hero") ||
                    (isSavingGallery && activeTab === "home-gallery") ||
                    (isSavingServicesSection && activeTab === "home-services") ||
                    (isSavingOurCompany && activeTab === "home-company") ||
                    (isSavingProcess && activeTab === "home-process") ||
                    (isSavingPartners && activeTab === "home-partners") ||
                    (isSavingCaseStudies && activeTab === "home-case-studies") ||
                    (isSavingTestimonials && activeTab === "home-testimonials") ||
                    (isSavingCta && activeTab === "home-cta")
                  }
                  onClick={() => {
                    if (activeTab === "home-hero") {
                      handleSaveHero();
                    } else if (activeTab === "home-gallery") {
                      handleSaveGallery();
                    } else if (activeTab === "home-services") {
                      handleSaveServicesSection();
                    } else if (activeTab === "home-company") {
                      handleSaveOurCompany();
                    } else if (activeTab === "home-process") {
                      handleSaveProcessSection();
                    } else if (activeTab === "home-partners") {
                      handleSavePartnersSection();
                    } else if (activeTab === "home-case-studies") {
                      handleSaveCaseStudies();
                    } else if (activeTab === "home-testimonials") {
                      handleSaveTestimonials();
                    } else if (activeTab === "home-cta") {
                      handleSaveCta();
                    } else {
                      Swal.fire({
                        icon: "info",
                        title: "Coming Soon",
                        text: "This section's CMS editor is being set up. Check back shortly.",
                        confirmButtonColor: "#00875A",
                      });
                    }
                  }}
                >
                  {(isSavingHero && activeTab === "home-hero") ||
                  (isSavingGallery && activeTab === "home-gallery") ||
                  (isSavingServicesSection && activeTab === "home-services") ||
                  (isSavingOurCompany && activeTab === "home-company") ||
                  (isSavingProcess && activeTab === "home-process") ||
                  (isSavingPartners && activeTab === "home-partners") ||
                  (isSavingCaseStudies && activeTab === "home-case-studies") ||
                  (isSavingTestimonials && activeTab === "home-testimonials") ||
                  (isSavingCta && activeTab === "home-cta")
                    ? "💾 Saving..."
                    : "💾 Save & Publish Live"}
                </button>
              </div>

              {/* HOME GALLERY SECTION FIELDS */}
              {activeTab === "home-gallery" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Gallery Eyebrow Badge Tag
                    </label>
                    <input
                      type="text"
                      value={galleryForm.badgeText}
                      onChange={(e) => setGalleryForm({ ...galleryForm, badgeText: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Main Section Heading
                    </label>
                    <input
                      type="text"
                      value={galleryForm.heading}
                      onChange={(e) => setGalleryForm({ ...galleryForm, heading: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Subheading / Description
                    </label>
                    <textarea
                      rows={2}
                      value={galleryForm.subheading}
                      onChange={(e) => setGalleryForm({ ...galleryForm, subheading: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  {/* Images List Control */}
                  <div style={{ background: "#F8FAFC", padding: "20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                      <label style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>
                        Gallery Images List ({galleryForm.images.length} Photos)
                      </label>
                      <button
                        type="button"
                        className="cmd-top-action-btn primary"
                        style={{ padding: "6px 14px", fontSize: "12px" }}
                        onClick={() => {
                          const newImg = {
                            id: `g_${Date.now()}`,
                            url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
                            title: "New Event Photo",
                            category: "Culture",
                          };
                          setGalleryForm({ ...galleryForm, images: [...galleryForm.images, newImg] });
                        }}
                      >
                        + Add New Photo
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
                      {galleryForm.images.map((img, idx) => (
                        <div key={img.id || idx} style={{ background: "#FFF", padding: "14px", borderRadius: "10px", border: "1px solid #CBD5E1" }}>
                          <div style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
                            <img src={img.url} alt="" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "6px" }} />
                            <div style={{ flex: 1 }}>
                              <input
                                type="text"
                                placeholder="Image Title"
                                value={img.title}
                                onChange={(e) => {
                                  const updated = [...galleryForm.images];
                                  updated[idx].title = e.target.value;
                                  setGalleryForm({ ...galleryForm, images: updated });
                                }}
                                style={{ width: "100%", padding: "6px 10px", fontSize: "13px", fontWeight: "700", marginBottom: "4px" }}
                              />
                              <input
                                type="text"
                                placeholder="Category (e.g. Culture, Engineering)"
                                value={img.category}
                                onChange={(e) => {
                                  const updated = [...galleryForm.images];
                                  updated[idx].category = e.target.value;
                                  setGalleryForm({ ...galleryForm, images: updated });
                                }}
                                style={{ width: "100%", padding: "6px 10px", fontSize: "12px" }}
                              />
                            </div>
                          </div>
                          <input
                            type="text"
                            placeholder="Image Direct URL"
                            value={img.url}
                            onChange={(e) => {
                              const updated = [...galleryForm.images];
                              updated[idx].url = e.target.value;
                              setGalleryForm({ ...galleryForm, images: updated });
                            }}
                            style={{ width: "100%", padding: "6px 10px", fontSize: "12px", marginBottom: "8px" }}
                          />
                          <div style={{ display: "flex", gap: "8px", alignItems: "center", marginTop: "4px" }}>
                            <label style={{ background: "#EFF6FF", color: "#2563EB", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer", border: "1px solid #BFDBFE" }}>
                              📷 Upload Photo
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const fd = new FormData();
                                  fd.append("image", file);
                                  try {
                                    const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: fd });
                                    const data = await res.json();
                                    if (data.success) {
                                      const updated = [...galleryForm.images];
                                      updated[idx].url = data.url;
                                      setGalleryForm({ ...galleryForm, images: updated });
                                      Swal.fire({ icon: "success", title: "Photo Uploaded!", timer: 1500, showConfirmButton: false });
                                    } else Swal.fire("Error", data.message, "error");
                                  } catch {
                                    Swal.fire("Error", "Upload failed", "error");
                                  }
                                }}
                              />
                            </label>
                            <button
                              type="button"
                              style={{ color: "#EF4444", background: "#FEF2F2", border: "1px solid #FECACA", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                              onClick={() => {
                                const updated = galleryForm.images.filter((_, i) => i !== idx);
                                setGalleryForm({ ...galleryForm, images: updated });
                              }}
                            >
                              🗑️ Remove Photo
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <button
                      type="button"
                      className="cmd-top-action-btn primary"
                      disabled={isSavingGallery}
                      onClick={handleSaveGallery}
                      style={{ padding: "12px 28px", fontSize: "14px" }}
                    >
                      {isSavingGallery ? "💾 Saving..." : "💾 Save & Publish Gallery Section Live"}
                    </button>
                  </div>
                </div>
              )}

              {/* 1. HOME HERO BANNER FIELDS */}
              {activeTab === "home-hero" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Hero Eyebrow Badge Tag
                    </label>
                    <input
                      type="text"
                      value={heroForm.eyebrow}
                      onChange={(e) => setHeroForm({ ...heroForm, eyebrow: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Main Heading Line 1
                      </label>
                      <input
                        type="text"
                        value={heroForm.headingLine1}
                        onChange={(e) => setHeroForm({ ...heroForm, headingLine1: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Main Heading Line 2 (Blue Highlight)
                      </label>
                      <input
                        type="text"
                        value={heroForm.headingLine2}
                        onChange={(e) => setHeroForm({ ...heroForm, headingLine2: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Hero Description Text
                    </label>
                    <textarea
                      rows={3}
                      value={heroForm.description}
                      onChange={(e) => setHeroForm({ ...heroForm, description: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Primary Button Text
                      </label>
                      <input
                        type="text"
                        value={heroForm.primaryBtnText}
                        onChange={(e) => setHeroForm({ ...heroForm, primaryBtnText: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Secondary Button Text
                      </label>
                      <input
                        type="text"
                        value={heroForm.secondaryBtnText}
                        onChange={(e) => setHeroForm({ ...heroForm, secondaryBtnText: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                  </div>

                  {/* Stat Counters Grid */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      Hero Stat Counters (4 Items)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                      {heroForm.stats.map((st, i) => (
                        <div key={i} style={{ background: "#FFF", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <input
                            type="text"
                            value={st.value}
                            onChange={(e) => {
                              const newStats = [...heroForm.stats];
                              newStats[i].value = e.target.value;
                              setHeroForm({ ...heroForm, stats: newStats });
                            }}
                            style={{ width: "100%", fontWeight: "700", fontSize: "13px", marginBottom: "4px" }}
                          />
                          <input
                            type="text"
                            value={st.label}
                            onChange={(e) => {
                              const newStats = [...heroForm.stats];
                              newStats[i].label = e.target.value;
                              setHeroForm({ ...heroForm, stats: newStats });
                            }}
                            style={{ width: "100%", fontSize: "12px", color: "#64748B" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dedicated Hero Section Save Button */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <button
                      className="cmd-top-action-btn primary"
                      style={{ padding: "12px 24px", fontSize: "15px" }}
                      disabled={isSavingHero}
                      onClick={handleSaveHero}
                    >
                      {isSavingHero ? "💾 Saving..." : "💾 Save & Publish Hero Section Live"}
                    </button>
                  </div>
                </div>
              )}

              {/* 2. HOME SERVICES PREVIEW FIELDS */}
              {activeTab === "home-services" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Section Eyebrow Tag
                      </label>
                      <input
                        type="text"
                        value={servicesSectionForm.badgeText}
                        onChange={(e) => setServicesSectionForm({ ...servicesSectionForm, badgeText: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Heading Line 1
                      </label>
                      <input
                        type="text"
                        value={servicesSectionForm.headingLine1}
                        onChange={(e) => setServicesSectionForm({ ...servicesSectionForm, headingLine1: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Heading Highlight (Blue/Green Text)
                      </label>
                      <input
                        type="text"
                        value={servicesSectionForm.headingHighlight}
                        onChange={(e) => setServicesSectionForm({ ...servicesSectionForm, headingHighlight: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Subheading / Description Paragraph
                    </label>
                    <textarea
                      rows={2}
                      value={servicesSectionForm.subheading}
                      onChange={(e) => setServicesSectionForm({ ...servicesSectionForm, subheading: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      Featured Service Cards ({servicesSectionForm.services.length} Services Mapped)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {servicesSectionForm.services.map((srv, idx) => (
                        <div key={srv.number || idx} style={{ background: "#FFF", padding: "14px", borderRadius: "10px", border: "1px solid #CBD5E1" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                            <span style={{ fontWeight: "800", color: "#00875A", fontSize: "12px" }}>CARD {srv.number}</span>
                            <input
                              type="text"
                              value={srv.tag}
                              onChange={(e) => {
                                const updated = [...servicesSectionForm.services];
                                updated[idx].tag = e.target.value;
                                setServicesSectionForm({ ...servicesSectionForm, services: updated });
                              }}
                              style={{ background: "#EFF6FF", color: "#00875A", padding: "2px 8px", borderRadius: "4px", fontSize: "10px", fontWeight: "800", width: "90px" }}
                            />
                          </div>
                          <input
                            type="text"
                            value={srv.title}
                            onChange={(e) => {
                              const updated = [...servicesSectionForm.services];
                              updated[idx].title = e.target.value;
                              setServicesSectionForm({ ...servicesSectionForm, services: updated });
                            }}
                            style={{ width: "100%", fontWeight: "700", fontSize: "13px", marginBottom: "6px" }}
                          />
                          <textarea
                            rows={2}
                            value={srv.description}
                            onChange={(e) => {
                              const updated = [...servicesSectionForm.services];
                              updated[idx].description = e.target.value;
                              setServicesSectionForm({ ...servicesSectionForm, services: updated });
                            }}
                            style={{ width: "100%", fontSize: "12px", color: "#475569", marginBottom: "8px" }}
                          />
                          {/* Image URL & Cloudinary Uploader */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <label style={{ fontSize: "11px", fontWeight: "700", color: "#64748B" }}>Service Preview Image:</label>
                            {srv.image && (
                              <div style={{ marginBottom: "4px" }}>
                                <img
                                  src={srv.image}
                                  alt="Service Preview"
                                  style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "4px", border: "1px solid #E2E8F0" }}
                                />
                              </div>
                            )}
                            <div style={{ display: "flex", gap: "6px" }}>
                              <input
                                type="text"
                                value={srv.image}
                                onChange={(e) => {
                                  const updated = [...servicesSectionForm.services];
                                  updated[idx].image = e.target.value;
                                  setServicesSectionForm({ ...servicesSectionForm, services: updated });
                                }}
                                style={{ flex: 1, padding: "4px 8px", fontSize: "11px", border: "1px solid #CBD5E1", borderRadius: "4px" }}
                              />
                              <label style={{ background: "#00875A", color: "#FFF", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "700", cursor: "pointer", display: "inline-flex", alignItems: "center" }}>
                                ☁️ Upload
                                <input
                                  type="file"
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  onChange={async (e) => {
                                    const file = e.target.files?.[0];
                                    if (!file) return;
                                    const formData = new FormData();
                                    formData.append("image", file);
                                    try {
                                      const res = await fetch("http://localhost:5000/api/upload", {
                                        method: "POST",
                                        body: formData,
                                      });
                                      const data = await res.json();
                                      if (data.success) {
                                        const updated = [...servicesSectionForm.services];
                                        updated[idx].image = data.url;
                                        setServicesSectionForm({ ...servicesSectionForm, services: updated });
                                        Swal.fire({ icon: "success", title: "Image Uploaded!", text: "Cloudinary URL updated automatically", timer: 1500, showConfirmButton: false });
                                      } else {
                                        Swal.fire("Error", data.message || "Cloudinary upload failed", "error");
                                      }
                                    } catch (err) {
                                      console.error("Upload error:", err);
                                      Swal.fire("Error", "Could not connect to backend server.", "error");
                                    }
                                  }}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <button
                      type="button"
                      className="cmd-top-action-btn primary"
                      disabled={isSavingServicesSection}
                      onClick={handleSaveServicesSection}
                      style={{ padding: "12px 28px", fontSize: "14px" }}
                    >
                      {isSavingServicesSection ? "💾 Saving..." : "💾 Save & Publish Services Section Live"}
                    </button>
                  </div>
                </div>
              )}

              {/* 3. HOME OUR COMPANY FIELDS - DYNAMIC */}
              {activeTab === "home-company" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>

                  {/* Row 1: Eyebrow + Badge */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Section Eyebrow</label>
                      <input type="text" value={ourCompanyForm.eyebrow} onChange={(e) => setOurCompanyForm({ ...ourCompanyForm, eyebrow: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Badge Number (e.g. 10)</label>
                      <input type="text" value={ourCompanyForm.badgeNumber} onChange={(e) => setOurCompanyForm({ ...ourCompanyForm, badgeNumber: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Badge Label (e.g. Years↵experience)</label>
                      <input type="text" value={ourCompanyForm.badgeLabel} onChange={(e) => setOurCompanyForm({ ...ourCompanyForm, badgeLabel: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  {/* Row 2: Heading */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Normal Text</label>
                      <input type="text" value={ourCompanyForm.headingNormal} onChange={(e) => setOurCompanyForm({ ...ourCompanyForm, headingNormal: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Highlight (Green text)</label>
                      <input type="text" value={ourCompanyForm.headingHighlight} onChange={(e) => setOurCompanyForm({ ...ourCompanyForm, headingHighlight: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  {/* Paragraphs */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Company Story Paragraph 1</label>
                    <textarea rows={3} value={ourCompanyForm.paragraph1} onChange={(e) => setOurCompanyForm({ ...ourCompanyForm, paragraph1: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Company Story Paragraph 2</label>
                    <textarea rows={3} value={ourCompanyForm.paragraph2} onChange={(e) => setOurCompanyForm({ ...ourCompanyForm, paragraph2: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>

                  {/* Top Photos */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>Top Slideshow Photos ({ourCompanyForm.topPhotos.length} photos)</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {ourCompanyForm.topPhotos.map((photo, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "8px", alignItems: "center", background: "#FFF", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          {photo.src && (
                            <img src={photo.src.startsWith("http") ? photo.src : undefined} alt="preview" style={{ width: "48px", height: "36px", objectFit: "cover", borderRadius: "4px", border: "1px solid #E2E8F0", display: photo.src.startsWith("http") ? "block" : "none" }} />
                          )}
                          <input type="text" value={photo.src} placeholder="Image URL" onChange={(e) => { const updated = [...ourCompanyForm.topPhotos]; updated[idx] = { ...updated[idx], src: e.target.value }; setOurCompanyForm({ ...ourCompanyForm, topPhotos: updated }); }} style={{ flex: 1, padding: "6px 10px", fontSize: "12px", border: "1px solid #CBD5E1", borderRadius: "6px" }} />
                          <label style={{ background: "#00875A", color: "#FFF", padding: "6px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer", whiteSpace: "nowrap" }}>
                            ☁️ Upload
                            <input type="file" accept="image/*" style={{ display: "none" }} onChange={async (e) => {
                              const file = e.target.files?.[0]; if (!file) return;
                              const fd = new FormData(); fd.append("image", file);
                              try {
                                const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: fd });
                                const data = await res.json();
                                if (data.success) { const updated = [...ourCompanyForm.topPhotos]; updated[idx] = { ...updated[idx], src: data.url }; setOurCompanyForm({ ...ourCompanyForm, topPhotos: updated }); Swal.fire({ icon: "success", title: "Uploaded!", timer: 1500, showConfirmButton: false }); }
                                else Swal.fire("Error", data.message, "error");
                              } catch { Swal.fire("Error", "Upload failed", "error"); }
                            }} />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Photos */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>Bottom Slideshow Photos ({ourCompanyForm.bottomPhotos.length} photos)</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {ourCompanyForm.bottomPhotos.map((photo, idx) => (
                        <div key={idx} style={{ display: "flex", gap: "8px", alignItems: "center", background: "#FFF", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          {photo.src && (
                            <img src={photo.src.startsWith("http") ? photo.src : undefined} alt="preview" style={{ width: "48px", height: "36px", objectFit: "cover", borderRadius: "4px", border: "1px solid #E2E8F0", display: photo.src.startsWith("http") ? "block" : "none" }} />
                          )}
                          <input type="text" value={photo.src} placeholder="Image URL" onChange={(e) => { const updated = [...ourCompanyForm.bottomPhotos]; updated[idx] = { ...updated[idx], src: e.target.value }; setOurCompanyForm({ ...ourCompanyForm, bottomPhotos: updated }); }} style={{ flex: 1, padding: "6px 10px", fontSize: "12px", border: "1px solid #CBD5E1", borderRadius: "6px" }} />
                          <label style={{ background: "#00875A", color: "#FFF", padding: "6px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer", whiteSpace: "nowrap" }}>
                            ☁️ Upload
                            <input type="file" accept="image/*" style={{ display: "none" }} onChange={async (e) => {
                              const file = e.target.files?.[0]; if (!file) return;
                              const fd = new FormData(); fd.append("image", file);
                              try {
                                const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: fd });
                                const data = await res.json();
                                if (data.success) { const updated = [...ourCompanyForm.bottomPhotos]; updated[idx] = { ...updated[idx], src: data.url }; setOurCompanyForm({ ...ourCompanyForm, bottomPhotos: updated }); Swal.fire({ icon: "success", title: "Uploaded!", timer: 1500, showConfirmButton: false }); }
                                else Swal.fire("Error", data.message, "error");
                              } catch { Swal.fire("Error", "Upload failed", "error"); }
                            }} />
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <button type="button" className="cmd-top-action-btn primary" disabled={isSavingOurCompany} onClick={handleSaveOurCompany} style={{ padding: "12px 28px", fontSize: "14px" }}>
                      {isSavingOurCompany ? "💾 Saving..." : "💾 Save & Publish Our Company Section Live"}
                    </button>
                  </div>

                </div>
              )}

              {/* 4. HOME PROCESS SECTION - DYNAMIC */}
              {activeTab === "home-process" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>

                  {/* Header Row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Section Eyebrow</label>
                      <input type="text" value={processSectionForm.eyebrow} onChange={(e) => setProcessSectionForm({ ...processSectionForm, eyebrow: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Normal</label>
                      <input type="text" value={processSectionForm.headingNormal} onChange={(e) => setProcessSectionForm({ ...processSectionForm, headingNormal: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Highlight</label>
                      <input type="text" value={processSectionForm.headingHighlight} onChange={(e) => setProcessSectionForm({ ...processSectionForm, headingHighlight: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Section Description</label>
                    <textarea rows={2} value={processSectionForm.description} onChange={(e) => setProcessSectionForm({ ...processSectionForm, description: e.target.value })} style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>

                  {/* Center Circle Logo */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>🎯 Center Circle — Logo or Text</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "12px" }}>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748B", marginBottom: "4px", display: "block" }}>Fallback Text (shown if no logo)</label>
                        <input type="text" value={processSectionForm.centerLogoText} onChange={(e) => setProcessSectionForm({ ...processSectionForm, centerLogoText: e.target.value })} style={{ width: "100%", padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                      </div>
                      <div>
                        <label style={{ fontSize: "12px", fontWeight: "700", color: "#64748B", marginBottom: "4px", display: "block" }}>Logo URL (paste or upload)</label>
                        <input type="text" value={processSectionForm.centerLogoUrl} onChange={(e) => setProcessSectionForm({ ...processSectionForm, centerLogoUrl: e.target.value })} placeholder="https://..." style={{ width: "100%", padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      {processSectionForm.centerLogoUrl && processSectionForm.centerLogoUrl.startsWith("http") && (
                        <img src={processSectionForm.centerLogoUrl} alt="Logo preview" style={{ width: "60px", height: "60px", objectFit: "contain", borderRadius: "8px", border: "1px solid #E2E8F0", background: "#F1F5F9", padding: "4px" }} />
                      )}
                      <label style={{ background: "#00875A", color: "#FFF", padding: "8px 16px", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                        ☁️ Upload Logo
                        <input type="file" accept="image/*" style={{ display: "none" }} onChange={async (e) => {
                          const file = e.target.files?.[0]; if (!file) return;
                          const fd = new FormData(); fd.append("image", file);
                          try {
                            const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: fd });
                            const data = await res.json();
                            if (data.success) { setProcessSectionForm({ ...processSectionForm, centerLogoUrl: data.url }); Swal.fire({ icon: "success", title: "Logo Uploaded!", timer: 1500, showConfirmButton: false }); }
                            else Swal.fire("Error", data.message, "error");
                          } catch { Swal.fire("Error", "Upload failed", "error"); }
                        }} />
                      </label>
                      {processSectionForm.centerLogoUrl && (
                        <button type="button" onClick={() => setProcessSectionForm({ ...processSectionForm, centerLogoUrl: "" })} style={{ padding: "8px 12px", background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "6px", fontSize: "12px", cursor: "pointer" }}>✕ Remove</button>
                      )}
                    </div>
                  </div>

                  {/* Process Steps */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>⚙️ Process Steps ({processSectionForm.steps.length} steps)</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                      {processSectionForm.steps.map((step, idx) => (
                        <div key={idx} style={{ background: "#FFF", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                            <span style={{ background: "#00875A", color: "#FFF", borderRadius: "50%", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "800", flexShrink: 0 }}>{step.number}</span>
                            <input type="text" value={step.title} onChange={(e) => { const updated = [...processSectionForm.steps]; updated[idx] = { ...updated[idx], title: e.target.value }; setProcessSectionForm({ ...processSectionForm, steps: updated }); }} style={{ flex: 1, padding: "4px 8px", fontSize: "12px", fontWeight: "700", border: "1px solid #E2E8F0", borderRadius: "4px" }} />
                          </div>
                          <textarea rows={2} value={step.description} onChange={(e) => { const updated = [...processSectionForm.steps]; updated[idx] = { ...updated[idx], description: e.target.value }; setProcessSectionForm({ ...processSectionForm, steps: updated }); }} style={{ width: "100%", padding: "4px 8px", fontSize: "11px", border: "1px solid #E2E8F0", borderRadius: "4px", resize: "none" }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <button type="button" className="cmd-top-action-btn primary" disabled={isSavingProcess} onClick={handleSaveProcessSection} style={{ padding: "12px 28px", fontSize: "14px" }}>
                      {isSavingProcess ? "💾 Saving..." : "💾 Save & Publish Process Section Live"}
                    </button>
                  </div>

                </div>
              )}

              {/* 5. HOME PARTNERS FIELDS */}
              {activeTab === "home-partners" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  {/* Eyebrow */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Section Eyebrow Tag
                    </label>
                    <input
                      type="text"
                      value={partnersSectionForm.eyebrow}
                      onChange={(e) => setPartnersSectionForm({ ...partnersSectionForm, eyebrow: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  {/* Heading Split */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Normal</label>
                      <input
                        type="text"
                        value={partnersSectionForm.headingNormal}
                        onChange={(e) => setPartnersSectionForm({ ...partnersSectionForm, headingNormal: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Highlight (Gradient)</label>
                      <input
                        type="text"
                        value={partnersSectionForm.headingHighlight}
                        onChange={(e) => setPartnersSectionForm({ ...partnersSectionForm, headingHighlight: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Section Description</label>
                    <textarea
                      rows={2}
                      value={partnersSectionForm.description}
                      onChange={(e) => setPartnersSectionForm({ ...partnersSectionForm, description: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  {/* 4 Key Stats */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>📊 Bottom Stats Counter Cards (4 Metrics)</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "10px" }}>
                      {partnersSectionForm.stats.map((st, idx) => (
                        <div key={idx} style={{ background: "#FFF", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <div style={{ display: "flex", gap: "6px", marginBottom: "6px" }}>
                            <input
                              type="text"
                              value={st.icon}
                              onChange={(e) => {
                                const updated = [...partnersSectionForm.stats];
                                updated[idx] = { ...updated[idx], icon: e.target.value };
                                setPartnersSectionForm({ ...partnersSectionForm, stats: updated });
                              }}
                              style={{ width: "40px", textAlign: "center", padding: "4px", fontSize: "14px", border: "1px solid #CBD5E1", borderRadius: "4px" }}
                            />
                            <input
                              type="text"
                              value={st.value}
                              onChange={(e) => {
                                const updated = [...partnersSectionForm.stats];
                                updated[idx] = { ...updated[idx], value: e.target.value };
                                setPartnersSectionForm({ ...partnersSectionForm, stats: updated });
                              }}
                              placeholder="50+"
                              style={{ flex: 1, padding: "4px 8px", fontSize: "13px", fontWeight: "700", border: "1px solid #CBD5E1", borderRadius: "4px" }}
                            />
                          </div>
                          <input
                            type="text"
                            value={st.label}
                            onChange={(e) => {
                              const updated = [...partnersSectionForm.stats];
                              updated[idx] = { ...updated[idx], label: e.target.value };
                              setPartnersSectionForm({ ...partnersSectionForm, stats: updated });
                            }}
                            placeholder="Metric label"
                            style={{ width: "100%", padding: "4px 8px", fontSize: "11px", border: "1px solid #E2E8F0", borderRadius: "4px" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Partner Logos List */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <label style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>
                        🤝 Trusted Partner Client Cards ({partnersSectionForm.partners.length} Companies)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setPartnersSectionForm({
                            ...partnersSectionForm,
                            partners: [
                              ...partnersSectionForm.partners,
                              { name: "New Partner", category: "Tech Industry", description: "Company description...", logoText: "LOGO", accentColor: "#2563eb", image: "" },
                            ],
                          });
                        }}
                        style={{ padding: "6px 12px", background: "#00875A", color: "#FFF", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer", border: "none" }}
                      >
                        + Add Partner
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {partnersSectionForm.partners.map((prt, idx) => (
                        <div key={idx} style={{ background: "#FFF", padding: "14px", borderRadius: "10px", border: "1px solid #CBD5E1", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <input
                              type="text"
                              value={prt.name}
                              onChange={(e) => {
                                const updated = [...partnersSectionForm.partners];
                                updated[idx] = { ...updated[idx], name: e.target.value };
                                setPartnersSectionForm({ ...partnersSectionForm, partners: updated });
                              }}
                              placeholder="Partner Name"
                              style={{ flex: 1, fontWeight: "700", fontSize: "13px", padding: "6px 10px", border: "1px solid #E2E8F0", borderRadius: "6px" }}
                            />
                            <input
                              type="text"
                              value={prt.category}
                              onChange={(e) => {
                                const updated = [...partnersSectionForm.partners];
                                updated[idx] = { ...updated[idx], category: e.target.value };
                                setPartnersSectionForm({ ...partnersSectionForm, partners: updated });
                              }}
                              placeholder="Category / Tag"
                              style={{ width: "140px", fontSize: "11px", color: "#2563EB", padding: "6px 10px", border: "1px solid #E2E8F0", borderRadius: "6px" }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = partnersSectionForm.partners.filter((_, i) => i !== idx);
                                setPartnersSectionForm({ ...partnersSectionForm, partners: updated });
                              }}
                              style={{ padding: "4px 8px", background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}
                            >
                              ✕
                            </button>
                          </div>

                          <textarea
                            rows={2}
                            value={prt.description}
                            onChange={(e) => {
                              const updated = [...partnersSectionForm.partners];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              setPartnersSectionForm({ ...partnersSectionForm, partners: updated });
                            }}
                            placeholder="Description"
                            style={{ width: "100%", fontSize: "11px", color: "#475569", padding: "6px 10px", border: "1px solid #E2E8F0", borderRadius: "6px" }}
                          />

                          {/* Image/Logo Row */}
                          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "4px" }}>
                            {prt.image && (
                              <img src={prt.image} alt={prt.name} style={{ width: "40px", height: "40px", objectFit: "contain", borderRadius: "6px", border: "1px solid #E2E8F0", background: "#F8FAFC" }} />
                            )}
                            <label style={{ background: "#EFF6FF", color: "#2563EB", padding: "6px 12px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer", border: "1px solid #BFDBFE" }}>
                              📷 Upload Logo Image
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const fd = new FormData();
                                  fd.append("image", file);
                                  try {
                                    const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: fd });
                                    const data = await res.json();
                                    if (data.success) {
                                      const updated = [...partnersSectionForm.partners];
                                      updated[idx] = { ...updated[idx], image: data.url };
                                      setPartnersSectionForm({ ...partnersSectionForm, partners: updated });
                                      Swal.fire({ icon: "success", title: "Logo Uploaded!", timer: 1500, showConfirmButton: false });
                                    } else Swal.fire("Error", data.message, "error");
                                  } catch {
                                    Swal.fire("Error", "Upload failed", "error");
                                  }
                                }}
                              />
                            </label>
                            {prt.image && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...partnersSectionForm.partners];
                                  updated[idx] = { ...updated[idx], image: "" };
                                  setPartnersSectionForm({ ...partnersSectionForm, partners: updated });
                                }}
                                style={{ padding: "4px 8px", background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}
                              >
                                Remove Image
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Save Button */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <button
                      type="button"
                      className="cmd-top-action-btn primary"
                      disabled={isSavingPartners}
                      onClick={handleSavePartnersSection}
                      style={{ padding: "12px 28px", fontSize: "14px" }}
                    >
                      {isSavingPartners ? "💾 Saving..." : "💾 Save & Publish Partners Section Live"}
                    </button>
                  </div>
                </div>
              )}

              {/* 6. HOME CASE STUDIES FIELDS */}
              {activeTab === "home-case-studies" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  {/* Eyebrow */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Section Eyebrow Tag
                    </label>
                    <input
                      type="text"
                      value={caseStudiesForm.eyebrow}
                      onChange={(e) => setCaseStudiesForm({ ...caseStudiesForm, eyebrow: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  {/* Heading Split */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Normal</label>
                      <input
                        type="text"
                        value={caseStudiesForm.headingNormal}
                        onChange={(e) => setCaseStudiesForm({ ...caseStudiesForm, headingNormal: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Highlight (Gradient)</label>
                      <input
                        type="text"
                        value={caseStudiesForm.headingHighlight}
                        onChange={(e) => setCaseStudiesForm({ ...caseStudiesForm, headingHighlight: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Section Description</label>
                    <textarea
                      rows={2}
                      value={caseStudiesForm.description}
                      onChange={(e) => setCaseStudiesForm({ ...caseStudiesForm, description: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  {/* 3 Case Study Cards */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      🚀 Featured Case Study Impact Cards ({caseStudiesForm.caseStudies.length} Cards)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                      {caseStudiesForm.caseStudies.map((cs, idx) => (
                        <div key={idx} style={{ background: "#FFF", padding: "12px", borderRadius: "10px", border: "1px solid #CBD5E1", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                            <span style={{ fontSize: "11px", fontWeight: "800", color: "#00875A" }}>#{idx + 1}</span>
                            <input
                              type="text"
                              value={cs.category}
                              onChange={(e) => {
                                const updated = [...caseStudiesForm.caseStudies];
                                updated[idx] = { ...updated[idx], category: e.target.value };
                                setCaseStudiesForm({ ...caseStudiesForm, caseStudies: updated });
                              }}
                              placeholder="CATEGORY (e.g. FINTECH)"
                              style={{ width: "100%", fontWeight: "800", fontSize: "11px", color: "#2563EB", padding: "4px 8px", border: "1px solid #E2E8F0", borderRadius: "4px" }}
                            />
                          </div>

                          <input
                            type="text"
                            value={cs.title}
                            onChange={(e) => {
                              const updated = [...caseStudiesForm.caseStudies];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setCaseStudiesForm({ ...caseStudiesForm, caseStudies: updated });
                            }}
                            placeholder="Case Study Title"
                            style={{ width: "100%", fontWeight: "700", fontSize: "13px", padding: "6px 8px", border: "1px solid #CBD5E1", borderRadius: "6px" }}
                          />

                          <textarea
                            rows={3}
                            value={cs.description}
                            onChange={(e) => {
                              const updated = [...caseStudiesForm.caseStudies];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              setCaseStudiesForm({ ...caseStudiesForm, caseStudies: updated });
                            }}
                            placeholder="Description..."
                            style={{ width: "100%", fontSize: "11px", color: "#475569", padding: "6px 8px", border: "1px solid #E2E8F0", borderRadius: "6px" }}
                          />

                          {/* 3 Metrics */}
                          <div style={{ background: "#F1F5F9", padding: "8px", borderRadius: "6px" }}>
                            <span style={{ fontSize: "10px", fontWeight: "700", color: "#64748B", display: "block", marginBottom: "4px" }}>3 Key Metrics:</span>
                            {cs.metrics?.map((m, mIdx) => (
                              <div key={mIdx} style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                                <input
                                  type="text"
                                  value={m.value}
                                  onChange={(e) => {
                                    const updatedCS = [...caseStudiesForm.caseStudies];
                                    const updatedM = [...(updatedCS[idx].metrics || [])];
                                    updatedM[mIdx] = { ...updatedM[mIdx], value: e.target.value };
                                    updatedCS[idx] = { ...updatedCS[idx], metrics: updatedM };
                                    setCaseStudiesForm({ ...caseStudiesForm, caseStudies: updatedCS });
                                  }}
                                  placeholder="3x"
                                  style={{ width: "45px", fontSize: "11px", fontWeight: "700", padding: "2px 4px", border: "1px solid #CBD5E1", borderRadius: "4px" }}
                                />
                                <input
                                  type="text"
                                  value={m.label}
                                  onChange={(e) => {
                                    const updatedCS = [...caseStudiesForm.caseStudies];
                                    const updatedM = [...(updatedCS[idx].metrics || [])];
                                    updatedM[mIdx] = { ...updatedM[mIdx], label: e.target.value };
                                    updatedCS[idx] = { ...updatedCS[idx], metrics: updatedM };
                                    setCaseStudiesForm({ ...caseStudiesForm, caseStudies: updatedCS });
                                  }}
                                  placeholder="Metric label"
                                  style={{ flex: 1, fontSize: "10px", padding: "2px 4px", border: "1px solid #CBD5E1", borderRadius: "4px" }}
                                />
                              </div>
                            ))}
                          </div>

                          {/* Image Upload Row */}
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                            {cs.image && (
                              <img src={cs.image} alt={cs.title} style={{ width: "40px", height: "35px", objectFit: "cover", borderRadius: "4px", border: "1px solid #CBD5E1" }} />
                            )}
                            <label style={{ background: "#EFF6FF", color: "#2563EB", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer", border: "1px solid #BFDBFE" }}>
                              📷 Upload Card Image
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const fd = new FormData();
                                  fd.append("image", file);
                                  try {
                                    const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: fd });
                                    const data = await res.json();
                                    if (data.success) {
                                      const updated = [...caseStudiesForm.caseStudies];
                                      updated[idx] = { ...updated[idx], image: data.url };
                                      setCaseStudiesForm({ ...caseStudiesForm, caseStudies: updated });
                                      Swal.fire({ icon: "success", title: "Image Uploaded!", timer: 1500, showConfirmButton: false });
                                    } else Swal.fire("Error", data.message, "error");
                                  } catch {
                                    Swal.fire("Error", "Upload failed", "error");
                                  }
                                }}
                              />
                            </label>
                            {cs.image && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...caseStudiesForm.caseStudies];
                                  updated[idx] = { ...updated[idx], image: "" };
                                  setCaseStudiesForm({ ...caseStudiesForm, caseStudies: updated });
                                }}
                                style={{ padding: "4px 6px", background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "4px", fontSize: "10px", cursor: "pointer" }}
                              >
                                Remove Image
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <button
                      type="button"
                      className="cmd-top-action-btn primary"
                      disabled={isSavingCaseStudies}
                      onClick={handleSaveCaseStudies}
                      style={{ padding: "12px 28px", fontSize: "14px" }}
                    >
                      {isSavingCaseStudies ? "💾 Saving..." : "💾 Save & Publish Case Studies Live"}
                    </button>
                  </div>
                </div>
              )}

              {/* 7. HOME TESTIMONIALS FIELDS */}
              {activeTab === "home-testimonials" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  {/* Eyebrow & Headings */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Section Eyebrow Badge Tag
                    </label>
                    <input
                      type="text"
                      value={testimonialsForm.eyebrow}
                      onChange={(e) => setTestimonialsForm({ ...testimonialsForm, eyebrow: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Normal</label>
                      <input
                        type="text"
                        value={testimonialsForm.headingNormal}
                        onChange={(e) => setTestimonialsForm({ ...testimonialsForm, headingNormal: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Highlight</label>
                      <input
                        type="text"
                        value={testimonialsForm.headingHighlight}
                        onChange={(e) => setTestimonialsForm({ ...testimonialsForm, headingHighlight: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Subheading / Description</label>
                    <textarea
                      rows={2}
                      value={testimonialsForm.subtitle}
                      onChange={(e) => setTestimonialsForm({ ...testimonialsForm, subtitle: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  {/* Reviews List */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                      <label style={{ fontSize: "14px", fontWeight: "700", color: "#0F172A" }}>
                        ⭐ Google Client Reviews ({testimonialsForm.reviews.length} Testimonials)
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setTestimonialsForm({
                            ...testimonialsForm,
                            reviews: [
                              ...testimonialsForm.reviews,
                              { name: "New Client", date: "Just now", avatar: "", avatarBg: "#2563eb", initial: "C", rating: 5, review: "Great service and engineering quality!" },
                            ],
                          });
                        }}
                        style={{ padding: "6px 12px", background: "#00875A", color: "#FFF", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer", border: "none" }}
                      >
                        + Add Review
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {testimonialsForm.reviews.map((rv, idx) => (
                        <div key={idx} style={{ background: "#FFF", padding: "12px", borderRadius: "10px", border: "1px solid #CBD5E1", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                            <input
                              type="text"
                              value={rv.name}
                              onChange={(e) => {
                                const updated = [...testimonialsForm.reviews];
                                updated[idx] = { ...updated[idx], name: e.target.value };
                                setTestimonialsForm({ ...testimonialsForm, reviews: updated });
                              }}
                              placeholder="Client Name"
                              style={{ flex: 1, fontWeight: "700", fontSize: "13px", padding: "4px 8px", border: "1px solid #E2E8F0", borderRadius: "6px" }}
                            />
                            <input
                              type="text"
                              value={rv.date}
                              onChange={(e) => {
                                const updated = [...testimonialsForm.reviews];
                                updated[idx] = { ...updated[idx], date: e.target.value };
                                setTestimonialsForm({ ...testimonialsForm, reviews: updated });
                              }}
                              placeholder="2 weeks ago"
                              style={{ width: "100px", fontSize: "11px", color: "#64748B", padding: "4px 8px", border: "1px solid #E2E8F0", borderRadius: "6px" }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const updated = testimonialsForm.reviews.filter((_, i) => i !== idx);
                                setTestimonialsForm({ ...testimonialsForm, reviews: updated });
                              }}
                              style={{ padding: "4px 8px", background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "4px", fontSize: "11px", cursor: "pointer" }}
                            >
                              ✕
                            </button>
                          </div>

                          <textarea
                            rows={2}
                            value={rv.review}
                            onChange={(e) => {
                              const updated = [...testimonialsForm.reviews];
                              updated[idx] = { ...updated[idx], review: e.target.value };
                              setTestimonialsForm({ ...testimonialsForm, reviews: updated });
                            }}
                            placeholder="Review content..."
                            style={{ width: "100%", fontSize: "11px", color: "#475569", padding: "6px 8px", border: "1px solid #E2E8F0", borderRadius: "6px" }}
                          />

                          {/* Avatar Photo Upload */}
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                            {rv.avatar && (
                              <img src={rv.avatar} alt={rv.name} style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover", border: "1px solid #CBD5E1" }} />
                            )}
                            <label style={{ background: "#EFF6FF", color: "#2563EB", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer", border: "1px solid #BFDBFE" }}>
                              📷 Upload Avatar Photo
                              <input
                                type="file"
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={async (e) => {
                                  const file = e.target.files?.[0];
                                  if (!file) return;
                                  const fd = new FormData();
                                  fd.append("image", file);
                                  try {
                                    const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: fd });
                                    const data = await res.json();
                                    if (data.success) {
                                      const updated = [...testimonialsForm.reviews];
                                      updated[idx] = { ...updated[idx], avatar: data.url };
                                      setTestimonialsForm({ ...testimonialsForm, reviews: updated });
                                      Swal.fire({ icon: "success", title: "Avatar Uploaded!", timer: 1500, showConfirmButton: false });
                                    } else Swal.fire("Error", data.message, "error");
                                  } catch {
                                    Swal.fire("Error", "Upload failed", "error");
                                  }
                                }}
                              />
                            </label>
                            {rv.avatar && (
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = [...testimonialsForm.reviews];
                                  updated[idx] = { ...updated[idx], avatar: "" };
                                  setTestimonialsForm({ ...testimonialsForm, reviews: updated });
                                }}
                                style={{ padding: "4px 6px", background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "4px", fontSize: "10px", cursor: "pointer" }}
                              >
                                Remove Photo
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <button
                      type="button"
                      className="cmd-top-action-btn primary"
                      disabled={isSavingTestimonials}
                      onClick={handleSaveTestimonials}
                      style={{ padding: "12px 28px", fontSize: "14px" }}
                    >
                      {isSavingTestimonials ? "💾 Saving..." : "💾 Save & Publish Testimonials Live"}
                    </button>
                  </div>
                </div>
              )}

              {/* 8. HOME CTA BANNER FIELDS */}
              {activeTab === "home-cta" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  {/* Eyebrow */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      CTA Eyebrow Tag
                    </label>
                    <input
                      type="text"
                      value={ctaForm.eyebrow}
                      onChange={(e) => setCtaForm({ ...ctaForm, eyebrow: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  {/* Title split */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Title Normal</label>
                      <input
                        type="text"
                        value={ctaForm.titleNormal}
                        onChange={(e) => setCtaForm({ ...ctaForm, titleNormal: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Title Highlight</label>
                      <input
                        type="text"
                        value={ctaForm.titleHighlight}
                        onChange={(e) => setCtaForm({ ...ctaForm, titleHighlight: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Description Body</label>
                    <textarea
                      rows={3}
                      value={ctaForm.description}
                      onChange={(e) => setCtaForm({ ...ctaForm, description: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  {/* Buttons Text */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Primary Button Text</label>
                      <input
                        type="text"
                        value={ctaForm.primaryBtnText}
                        onChange={(e) => setCtaForm({ ...ctaForm, primaryBtnText: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Secondary Button Text</label>
                      <input
                        type="text"
                        value={ctaForm.secondaryBtnText}
                        onChange={(e) => setCtaForm({ ...ctaForm, secondaryBtnText: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                  </div>

                  {/* Banner Image Upload & Center Card Title */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>3D Center Card Title</label>
                      <input
                        type="text"
                        value={ctaForm.centerCardTitle}
                        onChange={(e) => setCtaForm({ ...ctaForm, centerCardTitle: e.target.value })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>📷 Banner Background Image</label>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        {ctaForm.bannerImage && (
                          <img src={ctaForm.bannerImage} alt="Banner" style={{ width: "50px", height: "40px", objectFit: "cover", borderRadius: "6px" }} />
                        )}
                        <label style={{ background: "#EFF6FF", color: "#2563EB", padding: "8px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer", border: "1px solid #BFDBFE" }}>
                          Upload Banner Image
                          <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={async (e) => {
                              const file = e.target.files?.[0];
                              if (!file) return;
                              const fd = new FormData();
                              fd.append("image", file);
                              try {
                                const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: fd });
                                const data = await res.json();
                                if (data.success) {
                                  setCtaForm({ ...ctaForm, bannerImage: data.url });
                                  Swal.fire({ icon: "success", title: "Banner Uploaded!", timer: 1500, showConfirmButton: false });
                                } else Swal.fire("Error", data.message, "error");
                              } catch {
                                Swal.fire("Error", "Upload failed", "error");
                              }
                            }}
                          />
                        </label>
                        {ctaForm.bannerImage && (
                          <button
                            type="button"
                            onClick={() => setCtaForm({ ...ctaForm, bannerImage: "" })}
                            style={{ padding: "6px 10px", background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "6px", fontSize: "11px", cursor: "pointer" }}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Trust Items */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "14px", fontWeight: "700", color: "#0F172A", marginBottom: "10px" }}>🛡️ Bottom Trust Bar Features ({ctaForm.trustItems.length} Metrics)</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                      {ctaForm.trustItems.map((tr, idx) => (
                        <div key={idx} style={{ background: "#FFF", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <input
                            type="text"
                            value={tr.title}
                            onChange={(e) => {
                              const updated = [...ctaForm.trustItems];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setCtaForm({ ...ctaForm, trustItems: updated });
                            }}
                            style={{ width: "100%", padding: "6px 10px", border: "1px solid #E2E8F0", borderRadius: "6px", fontSize: "12px", fontWeight: "700" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Save Button */}
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
                    <button
                      type="button"
                      className="cmd-top-action-btn primary"
                      disabled={isSavingCta}
                      onClick={handleSaveCta}
                      style={{ padding: "12px 28px", fontSize: "14px" }}
                    >
                      {isSavingCta ? "💾 Saving..." : "💾 Save & Publish CTA Banner Live"}
                    </button>
                  </div>
                </div>
              )}

              {/* ── SERVICES PAGE CMS SUB-SECTIONS ── */}
              {/* 1. SERVICES HERO */}
              {activeTab === "services-hero" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Eyebrow Badge
                      </label>
                      <input type="text" defaultValue="OUR SERVICES & CAPABILITIES" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Services Hero Title & Highlight
                      </label>
                      <input type="text" defaultValue="Software Engineering & AI built for real production impact" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Hero Subtitle Description
                    </label>
                    <textarea rows={3} defaultValue="We design, build, and scale production-grade software applications, cloud backends, modern frontend interfaces, and practical AI solutions tailored for high-growth businesses." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>
                </div>
              )}

              {/* 2. CORE ENGINEERING OFFERINGS */}
              {activeTab === "services-core" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      4 Core Engineering Offerings Mapped
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                      {[
                        { id: "01", slug: "software-engineering", title: "Software Engineering", desc: "Production-focused engineering for scalable systems, APIs and backend-heavy applications.", caps: "Backend Engineering, API Architecture, Java / Spring Boot, Node.js / Python, Cloud & Infrastructure, Legacy Modernization" },
                        { id: "02", slug: "ai-machine-learning", title: "AI & Machine Learning", desc: "Practical AI solutions that improve products, workflows and business operations.", caps: "AI Applications, RAG Systems, AI Integration, Intelligent Automation, Machine Learning, AI Workflows" },
                        { id: "03", slug: "web-development", title: "Web Development", desc: "Modern web products built for usability, performance and long-term scalability.", caps: "React, Next.js, Full-stack Development, Frontend Engineering, API Integration, Performance Tuning" },
                        { id: "04", slug: "product-development", title: "Product Development", desc: "From product idea to production-ready software, with engineering support across the journey.", caps: "Product Discovery, MVP Development, UX/UI Implementation, Web & Mobile Products, Product Scaling" },
                      ].map((offer) => (
                        <div key={offer.id} style={{ background: "#FFF", padding: "14px", borderRadius: "10px", border: "1px solid #CBD5E1" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                            <span style={{ fontWeight: "800", color: "#2563EB", fontSize: "12px" }}>OFFERING {offer.id}</span>
                            <span style={{ fontSize: "11px", color: "#64748B" }}>/{offer.slug}</span>
                          </div>
                          <input type="text" defaultValue={offer.title} style={{ width: "100%", fontWeight: "700", fontSize: "13px", marginBottom: "6px" }} />
                          <textarea rows={2} defaultValue={offer.desc} style={{ width: "100%", fontSize: "12px", color: "#475569", marginBottom: "6px" }} />
                          <label style={{ fontSize: "11px", fontWeight: "700", color: "#334155" }}>Capabilities (Comma separated):</label>
                          <input type="text" defaultValue={offer.caps} style={{ width: "100%", fontSize: "11px", color: "#2563EB" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. AI & CUSTOM SOFTWARE TOOLS */}
              {activeTab === "services-ai" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Section Tagline
                      </label>
                      <input type="text" defaultValue="PRACTICAL AI & MODERN AUTOMATION" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        AI Section Heading
                      </label>
                      <input type="text" defaultValue="Add intelligence & automated RAG systems to your products" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      4 Engagement Models Mapped
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {[
                        { title: "Build from Scratch", tag: "Turn an idea into a production-ready digital product.", caps: "Full-stack MVP, Architecture Setup, Production Launch" },
                        { title: "Modernize Existing Systems", tag: "Improve legacy software without unnecessary big-bang rewrites.", caps: "Refactoring, Cloud Migration, Performance Tuning" },
                        { title: "Extend Your Engineering Team", tag: "Add experienced engineers to an existing product team.", caps: "Senior Engineers, Sprint Alignment, Code Quality" },
                        { title: "Add AI to Existing Products", tag: "Introduce practical AI, RAG and automation into workflows.", caps: "RAG Pipelines, LLM Integration, Workflow Automation" },
                      ].map((eng, i) => (
                        <div key={i} style={{ background: "#FFF", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <span style={{ fontWeight: "800", color: "#059669", fontSize: "11px" }}>MODEL 0{i + 1}</span>
                          <input type="text" defaultValue={eng.title} style={{ width: "100%", fontWeight: "700", fontSize: "13px", marginBottom: "4px" }} />
                          <input type="text" defaultValue={eng.tag} style={{ width: "100%", fontSize: "12px", color: "#475569", marginBottom: "6px" }} />
                          <input type="text" defaultValue={eng.caps} style={{ width: "100%", fontSize: "11px", color: "#0284C7" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. TECH STACK & FRAMEWORKS */}
              {activeTab === "services-tech-stack" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Section Heading
                    </label>
                    <input type="text" defaultValue="Technologies & Frameworks We Master" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      Tech Stack Icons Grid (20+ Managed Technologies)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
                      {["Java", "Spring Boot", "Node.js", "Python", "React", "Next.js", "React Native", "AI RAG", "AWS Cloud", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "MySQL", "Redis", "TypeScript", "Tailwind CSS", "Figma", "GraphQL", "REST APIs"].map((tech, i) => (
                        <div key={i} style={{ background: "#FFF", padding: "8px 10px", borderRadius: "6px", border: "1px solid #CBD5E1", textAlign: "center" }}>
                          <input type="text" defaultValue={tech} style={{ width: "100%", textAlign: "center", fontSize: "12px", fontWeight: "700", color: "#0F172A" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. SERVICE FAQS */}
              {activeTab === "services-faq" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Eyebrow
                      </label>
                      <input type="text" defaultValue="FREQUENTLY ASKED QUESTIONS" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        FAQ Section Heading
                      </label>
                      <input type="text" defaultValue="Common questions about working with Taapti" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      Services FAQs List
                    </label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      {[
                        { q: "What type of projects does Taapti work on?", a: "We build, scale, and modernize production web applications, custom APIs, microservices, mobile apps, and AI/RAG integrations for high-growth businesses and enterprise clients." },
                        { q: "Can Taapti modernize an existing application?", a: "Yes. We specialize in incremental modernization—refactoring backend codebases, upgrading cloud architecture, and improving reliability without risky, expensive big-bang rewrites." },
                        { q: "How do you structure daily engineering communication?", a: "You communicate directly with our engineers. Clients maintain 3-4 hours of daily time overlap with our Surat engineering team for same-day code reviews." },
                        { q: "What billing models do you support?", a: "We bill transparently in USD by the hour for actual engineering work completed, giving you full control over scope and budget." },
                      ].map((faq, i) => (
                        <div key={i} style={{ background: "#FFF", padding: "12px 16px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <label style={{ display: "block", fontSize: "11px", fontWeight: "800", color: "#2563EB", marginBottom: "4px" }}>QUESTION {i + 1}</label>
                          <input type="text" defaultValue={faq.q} style={{ width: "100%", fontWeight: "700", fontSize: "13px", marginBottom: "6px" }} />
                          <textarea rows={2} defaultValue={faq.a} style={{ width: "100%", fontSize: "12px", color: "#475569" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── INDUSTRIES PAGE CMS SUB-SECTIONS ── */}
              {/* 1. INDUSTRIES HERO */}
              {activeTab === "ind-hero" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Eyebrow Badge
                      </label>
                      <input type="text" defaultValue="INDUSTRIES" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Hero Title & Highlight
                      </label>
                      <input type="text" defaultValue="Technology built for real-world industries." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Hero Subtitle Description
                    </label>
                    <textarea rows={3} defaultValue="We help businesses across different industries solve complex technology challenges and build reliable digital products that support long-term growth." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>
                </div>
              )}

              {/* 2. FINTECH SECTION */}
              {activeTab === "ind-fintech" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Industry Number
                      </label>
                      <input type="text" defaultValue="01" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        FinTech Title
                      </label>
                      <input type="text" defaultValue="FinTech & Digital Banking" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      FinTech Description
                    </label>
                    <textarea rows={2} defaultValue="Technology solutions for financial businesses that need secure, reliable and scalable digital systems." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>
                      Common Challenges Addressed (3 Items)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                      <input type="text" defaultValue="Complex business workflows" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                      <input type="text" defaultValue="Scalability and performance" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                      <input type="text" defaultValue="Digital customer experiences" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. HEALTHCARE SECTION */}
              {activeTab === "ind-healthcare" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Industry Number
                      </label>
                      <input type="text" defaultValue="02" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Healthcare Title
                      </label>
                      <input type="text" defaultValue="Healthcare & Medical Tech" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Healthcare Description
                    </label>
                    <textarea rows={2} defaultValue="Digital products and technology solutions designed to improve accessibility, efficiency and user experiences." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>
                      Common Challenges Addressed (3 Items)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                      <input type="text" defaultValue="Complex operational workflows" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                      <input type="text" defaultValue="Data and system integration" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                      <input type="text" defaultValue="Better digital experiences" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* 4. SAAS & TECH SECTION */}
              {activeTab === "ind-saas" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Industry Number
                      </label>
                      <input type="text" defaultValue="03" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        SaaS & Tech Title
                      </label>
                      <input type="text" defaultValue="SaaS & Cloud Technology" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      SaaS Description
                    </label>
                    <textarea rows={2} defaultValue="Engineering support for technology companies building and scaling modern software products." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>
                      Common Challenges Addressed (3 Items)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                      <input type="text" defaultValue="Product scalability" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                      <input type="text" defaultValue="Performance optimisation" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                      <input type="text" defaultValue="Continuous product development" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* 5. E-COMMERCE SECTION */}
              {activeTab === "ind-ecommerce" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Industry Number
                      </label>
                      <input type="text" defaultValue="04" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        E-commerce Title
                      </label>
                      <input type="text" defaultValue="E-commerce & Digital Retail" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      E-commerce Description
                    </label>
                    <textarea rows={2} defaultValue="Reliable digital commerce experiences built to support growing businesses and their customers." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "8px" }}>
                      Common Challenges Addressed (3 Items)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                      <input type="text" defaultValue="High-performance platforms" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                      <input type="text" defaultValue="Third-party integrations" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                      <input type="text" defaultValue="Scalable customer experiences" style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* ── CASE STUDIES PAGE CMS SUB-SECTIONS ── */}
              {/* 1. CASE STUDIES HERO */}
              {activeTab === "cs-hero" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Eyebrow Badge
                      </label>
                      <input type="text" defaultValue="CASE STUDIES" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Hero Title & Highlight
                      </label>
                      <input type="text" defaultValue="Work that creates impact." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Hero Subtitle Description
                    </label>
                    <textarea rows={2} defaultValue="Explore how we solve complex technology challenges, build digital products and help businesses move forward." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>
                </div>
              )}

              {/* 2. CATEGORY FILTERS */}
              {activeTab === "cs-filter" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "10px" }}>
                      Active Category Filter Tabs
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px" }}>
                      {["All", "FinTech", "Healthcare", "SaaS", "AI & Data"].map((cat, i) => (
                        <input key={i} type="text" defaultValue={cat} style={{ padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "13px", textAlign: "center", fontWeight: "700" }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. FEATURED PROJECTS GRID */}
              {activeTab === "cs-projects-grid" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      6 Featured Case Studies Mapped
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {[
                        { num: "01", cat: "FinTech", title: "Building a scalable digital platform", srv: "Software Engineering", slug: "scalable-digital-platform" },
                        { num: "02", cat: "Healthcare", title: "Transforming complex workflows with technology", srv: "Web Development", slug: "healthcare-workflow-platform" },
                        { num: "03", cat: "SaaS", title: "Scaling a product for growing businesses", srv: "Product Development", slug: "scaling-saas-product" },
                        { num: "04", cat: "E-commerce", title: "High-performance digital commerce engine", srv: "Web & Mobile Systems", slug: "digital-commerce-engine" },
                        { num: "05", cat: "AI & Data", title: "Enterprise RAG & intelligent workflow automation", srv: "AI Systems & RAG", slug: "enterprise-rag-automation" },
                        { num: "06", cat: "FinTech", title: "Real-time payment gateway & microservices API", srv: "API & Backend Systems", slug: "payment-gateway-microservices" },
                      ].map((cs) => (
                        <div key={cs.num} style={{ background: "#FFF", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                            <span style={{ fontWeight: "800", color: "#2563EB", fontSize: "12px" }}>PROJECT {cs.num}</span>
                            <span style={{ background: "#EFF6FF", color: "#1D4ED8", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "700" }}>{cs.cat}</span>
                          </div>
                          <input type="text" defaultValue={cs.title} style={{ width: "100%", fontWeight: "700", fontSize: "13px", marginBottom: "4px" }} />
                          <div style={{ display: "flex", gap: "8px" }}>
                            <input type="text" defaultValue={cs.srv} style={{ width: "50%", fontSize: "11px", color: "#475569" }} />
                            <input type="text" defaultValue={`/${cs.slug}`} style={{ width: "50%", fontSize: "11px", color: "#94A3B8" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. CLIENT IMPACT METRICS */}
              {activeTab === "cs-outcomes" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      Client Impact Metrics (3 Key Outcomes)
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                      {[
                        { val: "3x", lbl: "User Growth", sub: "FinTech Banking Platform" },
                        { val: "60%", lbl: "Faster Onboarding", sub: "Healthcare Portal" },
                        { val: "5x", lbl: "Revenue Growth", sub: "GlobalPay SaaS Infrastructure" },
                      ].map((m, i) => (
                        <div key={i} style={{ background: "#FFF", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <input type="text" defaultValue={m.val} style={{ width: "100%", fontWeight: "800", fontSize: "16px", color: "#2563EB", marginBottom: "2px" }} />
                          <input type="text" defaultValue={m.lbl} style={{ width: "100%", fontWeight: "700", fontSize: "12px", marginBottom: "2px" }} />
                          <input type="text" defaultValue={m.sub} style={{ width: "100%", fontSize: "11px", color: "#64748B" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── ABOUT PAGE CMS SUB-SECTIONS ── */}
              {/* 1. ABOUT HERO & MISSION */}
              {activeTab === "about-hero" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Eyebrow Tag
                      </label>
                      <input type="text" defaultValue="About Taapti Technologies" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Main Heading & Highlight
                      </label>
                      <input type="text" defaultValue="Senior engineers building production-ready software." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Mission Statement
                    </label>
                    <textarea rows={3} defaultValue="Taapti Technologies is a founder-led software engineering firm. We design, modernize, and scale mission-critical digital products for ambitious enterprises and high-growth startups." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                  </div>
                </div>
              )}

              {/* 2. ENGINEERING METRICS & SLAS */}
              {activeTab === "about-stats" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      4 Engineering Metrics & SLAs
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                      {[
                        { val: "50+", lbl: "Production Apps Shipped", desc: "Across Fintech, Healthcare & SaaS" },
                        { val: "99.9%", lbl: "System Uptime SLA", desc: "High availability infrastructure" },
                        { val: "100%", lbl: "Senior Engineering", desc: "No junior dev handoffs" },
                        { val: "< 24h", lbl: "Response SLA", desc: "Dedicated engineering channel" },
                      ].map((st, i) => (
                        <div key={i} style={{ background: "#FFF", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <input type="text" defaultValue={st.val} style={{ width: "100%", fontWeight: "800", fontSize: "15px", color: "#2563EB", marginBottom: "2px" }} />
                          <input type="text" defaultValue={st.lbl} style={{ width: "100%", fontWeight: "700", fontSize: "12px", marginBottom: "2px" }} />
                          <input type="text" defaultValue={st.desc} style={{ width: "100%", fontSize: "11px", color: "#64748B" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. CORE ARCHITECTURAL VALUES */}
              {activeTab === "about-values" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      4 Core Architectural Values
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {[
                        { num: "01", title: "Engineering First", sub: "Built for Resilience", desc: "We design software with strict adherence to architectural principles—prioritizing type safety, modular code, and automated testing." },
                        { num: "02", title: "Direct Collaboration", sub: "Zero Middlemen", desc: "You work directly with senior architects building your product. Clear technical communication without project management bloat." },
                        { num: "03", title: "Practical Innovation", sub: "No Hype, Real ROI", desc: "We integrate AI, RAG pipelines, and cloud automation where they provide clear competitive advantage." },
                        { num: "04", title: "Long-Term Scalability", sub: "Built to Evolve", desc: "Software foundations crafted to scale gracefully with user growth and traffic spikes without total rewrites." },
                      ].map((val) => (
                        <div key={val.num} style={{ background: "#FFF", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                            <span style={{ fontWeight: "800", color: "#2563EB", fontSize: "11px" }}>VALUE {val.num}</span>
                            <span style={{ fontSize: "11px", color: "#059669", fontWeight: "700" }}>{val.sub}</span>
                          </div>
                          <input type="text" defaultValue={val.title} style={{ width: "100%", fontWeight: "700", fontSize: "13px", marginBottom: "4px" }} />
                          <textarea rows={2} defaultValue={val.desc} style={{ width: "100%", fontSize: "12px", color: "#475569" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. LEADERSHIP & ENGINEERS */}
              {activeTab === "about-team" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      Leadership & Engineering Squad Structure
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                      {[
                        { title: "Founder & Lead Architect", role: "Surat / India Office", desc: "10+ years scaling cloud backends and high-concurrency systems." },
                        { title: "Senior AI & RAG Engineers", role: "Python / Vector DBs", desc: "LLM fine-tuning, embeddings, and automated retrieval pipelines." },
                        { title: "Frontend & Mobile Squad", role: "Next.js / React Native", desc: "Crafting pixel-perfect, responsive user interfaces." },
                      ].map((tm, i) => (
                        <div key={i} style={{ background: "#FFF", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <input type="text" defaultValue={tm.title} style={{ width: "100%", fontWeight: "700", fontSize: "13px", marginBottom: "2px" }} />
                          <input type="text" defaultValue={tm.role} style={{ width: "100%", fontSize: "11px", color: "#2563EB", marginBottom: "4px" }} />
                          <textarea rows={2} defaultValue={tm.desc} style={{ width: "100%", fontSize: "11px", color: "#64748B" }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* OTHER SECTIONS DEFAULT FALLBACK */}
              {!["home-hero", "home-gallery", "home-services", "home-company", "home-process", "home-partners", "home-case-studies", "home-testimonials", "home-cta", "services-hero", "services-core", "services-ai", "services-tech-stack", "services-faq", "ind-hero", "ind-fintech", "ind-healthcare", "ind-saas", "ind-ecommerce", "cs-hero", "cs-filter", "cs-projects-grid", "cs-outcomes", "about-hero", "about-stats", "about-values", "about-team"].includes(activeTab) && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Section Heading
                    </label>
                    <input
                      type="text"
                      defaultValue={`${activeTab.toUpperCase().replace("-", " ")} Header Content`}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Section Body Content
                    </label>
                    <textarea
                      rows={3}
                      defaultValue={`Super admin text input fields ready for dynamic API binding tomorrow.`}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
