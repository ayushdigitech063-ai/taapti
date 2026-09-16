"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Swal from "sweetalert2";
import ReactQuillEditor from "@/components/ReactQuillEditor";

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
        label: "2. Dynamic Services",
        icon: "cpu",
        subItems: [
          { id: "services-all", label: "⚡ All Services" },
          { id: "services-create", label: "➕ Add Service" },
        ],
      },
      {
        id: "industries-page-cms",
        label: "3. Dynamic Industries",
        icon: "briefcase",
        subItems: [
          { id: "ind-all", label: "⚡ All Industries" },
          { id: "ind-create", label: "➕ Add Industry" },
        ],
      },
      {
        id: "case-studies-page-cms",
        label: "4. Case Studies",
        icon: "layers",
        subItems: [
          { id: "cs-all", label: "⚡ All Case Studies" },
          { id: "cs-create", label: "➕ Add Case Study" },
          { id: "cs-hero", label: "Section 1: Hero Banner" },
          { id: "cs-filter", label: "Section 2: Listing Header & Filter" },
          { id: "cs-outcomes", label: "Section 3: Bottom CTA Banner" },
        ],
      },
      {
        id: "about-page-cms",
        label: "5. About Page",
        icon: "info",
        subItems: [
          { id: "about-hero", label: "Section 1: Hero & Mission" },
          { id: "about-stats", label: "Section 2: Engineering Metrics & SLAs" },
          { id: "about-partner", label: "Section 3: Who We Are & Benchmark" },
          { id: "about-values", label: "Section 4: Core Principles & Values" },
          { id: "about-capabilities", label: "Section 5: Engineering Capabilities" },
          { id: "about-cta", label: "Section 6: Let's Build CTA Banner" },
        ],
      },
      {
        id: "contact-page-cms",
        label: "6. Contact Us Page",
        icon: "mail",
      },
      {
        id: "careers-page-cms",
        label: "7. Careers Page Sections",
        icon: "user-plus",
        subItems: [
          { id: "careers-page-hero", label: "Section 1: Hero Banner & Tagline" },
          { id: "careers-page-benefits", label: "Section 2: Perks & Benefits Cards" },
          { id: "careers-page-hiring", label: "Section 3: How We Hire Process" },
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
          { id: "blog-categories", label: "Categories & Tags" },
        ],
      },
    ],
  },
  {
    group: "HIRING",
    items: [
      {
        id: "careers-cms",
        label: "Hiring",
        icon: "user-plus",
        subItems: [
          { id: "careers-openings", label: "Active Job Positions" },
          { id: "careers-create", label: "✏️ + Add New Job Opening" },
          { id: "careers-applications", label: "📄 Resumes & Submissions Received" },
        ],
      },
    ],
  },
  {
    group: "LEADS & ENQUIRIES",
    items: [
      { id: "leads", label: "Contact Form Enquiries", icon: "mail" },
    ],
  },
  {
    group: "SYSTEM & ADMIN",
    items: [
      { id: "settings", label: "General Settings", icon: "settings" },
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
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    "services-page-cms": true,
    "industries-page-cms": true,
    "careers-cms": true,
    "careers-page-cms": true,
  });
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
  const [caseStudiesForm, setCaseStudiesForm] = useState<{
    eyebrow: string;
    headingNormal: string;
    headingHighlight: string;
    description: string;
    caseStudies: Array<{
      id: string;
      category: string;
      title: string;
      description: string;
      image?: string;
      metrics: Array<{ value: string; label: string }>;
    }>;
  }>({
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
        image: "",
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
        image: "",
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
        image: "",
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

  // -------------------------------------------------------------
  // DYNAMIC SERVICES MANAGEMENT SYSTEM (SUPER ADMIN CRUD)
  // -------------------------------------------------------------
  const [dynamicServicesList, setDynamicServicesList] = useState<any[]>([]);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [isSavingService, setIsSavingService] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    heroHeading: "",
    heroDescription: "",
    heroMediaUrl: "",
    ctaText: "Start a Conversation",
    seoTitle: "",
    seoDescription: "",
    status: "Published",
    template: "default",
    order: 1,
    features: [
      { title: "Custom Engineering", description: "High availability scalable system development.", icon: "⚡" },
      { title: "API Microservices", description: "Modular API architecture designed for peak scale.", icon: "🚀" }
    ],
    processSteps: [
      { stepNumber: 1, title: "Discovery & Scope", description: "Understanding technical architecture and business goals." },
      { stepNumber: 2, title: "Agile Development", description: "Iterative sprint delivery with continuous integration." }
    ],
    technologies: [
      { name: "Node.js", category: "Backend", icon: "🟢" },
      { name: "React / Next.js", category: "Frontend", icon: "⚛️" }
    ]
  });

  const fetchServicesAdminData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/services").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setDynamicServicesList(data.data);
        }
      }
    } catch { /* silent */ }
  };

  const handleEditServiceInit = (srv: any) => {
    setEditingServiceId(srv._id);
    setServiceForm({
      name: srv.name || "",
      slug: srv.slug || "",
      shortDescription: srv.shortDescription || "",
      fullDescription: srv.fullDescription || "",
      heroHeading: srv.heroHeading || srv.name || "",
      heroDescription: srv.heroDescription || srv.shortDescription || "",
      heroMediaUrl: srv.heroMediaUrl || "",
      ctaText: srv.ctaText || "Start a Conversation",
      seoTitle: srv.seoTitle || "",
      seoDescription: srv.seoDescription || "",
      status: srv.status || "Published",
      template: srv.template || "default",
      order: srv.order || 1,
      features: srv.features && srv.features.length > 0 ? srv.features : [
        { title: "Custom Feature", description: "Feature description...", icon: "⚡" }
      ],
      processSteps: srv.processSteps && srv.processSteps.length > 0 ? srv.processSteps : [
        { stepNumber: 1, title: "Step 1", description: "Process description..." }
      ],
      technologies: srv.technologies && srv.technologies.length > 0 ? srv.technologies : [
        { name: "Tech Name", category: "Category", icon: "💻" }
      ]
    });
    setActiveTab("services-create");
  };

  const handleResetServiceForm = () => {
    setEditingServiceId(null);
    setServiceForm({
      name: "",
      slug: "",
      shortDescription: "",
      fullDescription: "",
      heroHeading: "",
      heroDescription: "",
      heroMediaUrl: "",
      ctaText: "Start a Conversation",
      seoTitle: "",
      seoDescription: "",
      status: "Published",
      template: "default",
      order: dynamicServicesList.length + 1,
      features: [
        { title: "Custom Software Development", description: "Tailored enterprise solutions.", icon: "⚡" },
        { title: "API Integration", description: "Modular API architecture.", icon: "🚀" }
      ],
      processSteps: [
        { stepNumber: 1, title: "Discovery & Scope", description: "Understanding technical architecture." },
        { stepNumber: 2, title: "Agile Build", description: "Iterative sprint delivery." }
      ],
      technologies: [
        { name: "Node.js", category: "Backend", icon: "🟢" },
        { name: "Next.js", category: "Frontend", icon: "⚛️" }
      ]
    });
  };

  const handleSaveService = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (!serviceForm.name.trim() || !serviceForm.shortDescription.trim() || !serviceForm.fullDescription.trim()) {
      Swal.fire("Validation Error", "Please fill in Service Name, Short Description, and Full Description.", "warning");
      return;
    }

    setIsSavingService(true);
    const token = localStorage.getItem("adminToken");
    const isEdit = !!editingServiceId;
    const url = isEdit
      ? `http://localhost:5000/api/services/${editingServiceId}`
      : "http://localhost:5000/api/services";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(serviceForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("SERVICES_UPDATED");
          bc.close();
        }
        Swal.fire({
          icon: "success",
          title: isEdit ? "Service Updated! 🚀" : "Service Created & Published! 🚀",
          text: `Service '${data.data.name}' is now live on the site!`,
          timer: 2000,
          showConfirmButton: false,
        });
        fetchServicesAdminData();
        handleResetServiceForm();
        setActiveTab("services-all");
      } else {
        Swal.fire("Error", data.message || "Failed to save service", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingService(false);
    }
  };

  const handleDeleteService = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: `Delete Service '${name}'?`,
      text: "This will remove the service from the database and navbar. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch(`http://localhost:5000/api/services/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            const bc = new BroadcastChannel("taapti_cms_updates");
            bc.postMessage("SERVICES_UPDATED");
            bc.close();
          }
          Swal.fire({ icon: "success", title: "Deleted!", text: `Service '${name}' deleted.`, timer: 1500, showConfirmButton: false });
          fetchServicesAdminData();
        } else {
          Swal.fire("Error", data.message || "Failed to delete", "error");
        }
      } catch {
        Swal.fire("Error", "Delete request failed", "error");
      }
    }
  };

  // ── DYNAMIC INDUSTRIES CMS STATE & HANDLERS ──
  const [dynamicIndustriesList, setDynamicIndustriesList] = useState<any[]>([]);
  const [editingIndustryId, setEditingIndustryId] = useState<string | null>(null);
  const [isSavingIndustry, setIsSavingIndustry] = useState(false);
  const [industryForm, setIndustryForm] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    heroHeading: "",
    heroDescription: "",
    heroMediaUrl: "",
    ctaText: "Consult Industry Experts",
    seoTitle: "",
    seoDescription: "",
    status: "Published",
    template: "default",
    order: 1,
    features: [
      { title: "Domain Solution", description: "Tailored industry solution.", icon: "⚡" }
    ],
    challenges: [
      { title: "Industry Challenge", description: "Challenge description...", impact: "High Severity" }
    ],
    solutions: [
      { title: "Targeted Fix", description: "Solution description...", icon: "💡" }
    ],
    processSteps: [
      { stepNumber: 1, title: "Discovery", description: "Understanding technical requirements." }
    ],
    technologies: [
      { name: "Node.js", category: "Core Backend", icon: "🟢" }
    ]
  });

  const fetchIndustriesAdminData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/industries").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          setDynamicIndustriesList(data.data);
        }
      }
    } catch { /* silent */ }
  };

  const handleEditIndustryInit = (ind: any) => {
    setEditingIndustryId(ind._id);
    setIndustryForm({
      name: ind.name || "",
      slug: ind.slug || "",
      shortDescription: ind.shortDescription || "",
      fullDescription: ind.fullDescription || "",
      heroHeading: ind.heroHeading || ind.name || "",
      heroDescription: ind.heroDescription || ind.shortDescription || "",
      heroMediaUrl: ind.heroMediaUrl || "",
      ctaText: ind.ctaText || "Consult Industry Experts",
      seoTitle: ind.seoTitle || "",
      seoDescription: ind.seoDescription || "",
      status: ind.status || "Published",
      template: ind.template || "default",
      order: ind.order || 1,
      features: ind.features && ind.features.length > 0 ? ind.features : [
        { title: "Domain Solution", description: "Tailored industry solution.", icon: "⚡" }
      ],
      challenges: ind.challenges && ind.challenges.length > 0 ? ind.challenges : [
        { title: "Industry Challenge", description: "Challenge description...", impact: "High Severity" }
      ],
      solutions: ind.solutions && ind.solutions.length > 0 ? ind.solutions : [
        { title: "Targeted Fix", description: "Solution description...", icon: "💡" }
      ],
      processSteps: ind.processSteps && ind.processSteps.length > 0 ? ind.processSteps : [
        { stepNumber: 1, title: "Discovery", description: "Understanding technical requirements." }
      ],
      technologies: ind.technologies && ind.technologies.length > 0 ? ind.technologies : [
        { name: "Node.js", category: "Core Backend", icon: "🟢" }
      ]
    });
    setActiveTab("ind-create");
  };

  const handleResetIndustryForm = () => {
    setEditingIndustryId(null);
    setIndustryForm({
      name: "",
      slug: "",
      shortDescription: "",
      fullDescription: "",
      heroHeading: "",
      heroDescription: "",
      heroMediaUrl: "",
      ctaText: "Consult Industry Experts",
      seoTitle: "",
      seoDescription: "",
      status: "Published",
      template: "default",
      order: dynamicIndustriesList.length + 1,
      features: [
        { title: "Domain Solution", description: "Tailored industry solution.", icon: "⚡" }
      ],
      challenges: [
        { title: "Industry Challenge", description: "Challenge description...", impact: "High Severity" }
      ],
      solutions: [
        { title: "Targeted Fix", description: "Solution description...", icon: "💡" }
      ],
      processSteps: [
        { stepNumber: 1, title: "Discovery", description: "Understanding technical requirements." }
      ],
      technologies: [
        { name: "Node.js", category: "Core Backend", icon: "🟢" }
      ]
    });
  };

  const handleSaveIndustry = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (!industryForm.name.trim() || !industryForm.shortDescription.trim() || !industryForm.fullDescription.trim()) {
      Swal.fire("Validation Error", "Please fill in Industry Name, Short Description, and Full Description.", "warning");
      return;
    }

    setIsSavingIndustry(true);
    const token = localStorage.getItem("adminToken");
    const isEdit = !!editingIndustryId;
    const url = isEdit
      ? `http://localhost:5000/api/industries/${editingIndustryId}`
      : "http://localhost:5000/api/industries";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(industryForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("INDUSTRIES_UPDATED");
          bc.close();
        }
        Swal.fire({
          icon: "success",
          title: isEdit ? "Industry Updated! 🚀" : "Industry Created & Published! 🚀",
          text: `Industry '${data.data.name}' is now live on the site!`,
          timer: 2000,
          showConfirmButton: false,
        });
        fetchIndustriesAdminData();
        handleResetIndustryForm();
        setActiveTab("ind-all");
      } else {
        Swal.fire("Error", data.message || "Failed to save industry", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingIndustry(false);
    }
  };

  const handleDeleteIndustry = async (id: string, name: string) => {
    const result = await Swal.fire({
      title: `Delete Industry '${name}'?`,
      text: "This will remove the industry from the database and navbar. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch(`http://localhost:5000/api/industries/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            const bc = new BroadcastChannel("taapti_cms_updates");
            bc.postMessage("INDUSTRIES_UPDATED");
            bc.close();
          }
          Swal.fire({ icon: "success", title: "Deleted!", text: `Industry '${name}' deleted.`, timer: 1500, showConfirmButton: false });
          fetchIndustriesAdminData();
        } else {
          Swal.fire("Error", data.message || "Failed to delete", "error");
        }
      } catch {
        Swal.fire("Error", "Delete request failed", "error");
      }
    }
  };

  // ── DYNAMIC CASE STUDIES / PROJECTS CMS STATE & HANDLERS ──
  const [dynamicProjectsList, setDynamicProjectsList] = useState<any[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isSavingProject, setIsSavingProject] = useState(false);
  const [projectForm, setProjectForm] = useState({
    title: "",
    slug: "",
    category: "FinTech & Digital Banking",
    summary: "",
    context: "",
    challenge: "",
    solution: "",
    outcome: "",
    image: "",
    status: "Published",
    template: "default",
    order: 1,
    serviceName: "Software Engineering",
    serviceSlug: "software-engineering",
    contribution: ["Requirement Analysis", "Frontend & Backend Development"],
    technology: ["Next.js", "React", "Node.js", "MongoDB"],
    metrics: [
      { value: "3x", label: "Growth Metric" },
      { value: "99%", label: "Satisfaction" }
    ]
  });

  const fetchProjectsAdminData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/projects").catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        const items = Array.isArray(json) ? json : (json.data || []);
        setDynamicProjectsList(items);
      }
    } catch { /* silent */ }
  };

  const handleEditProjectInit = (p: any) => {
    setEditingProjectId(p._id);
    setProjectForm({
      title: p.title || "",
      slug: p.slug || "",
      category: p.category || (dynamicIndustriesList[0]?.name || "FinTech & Digital Banking"),
      summary: p.summary || "",
      context: p.context || "",
      challenge: p.challenge || "",
      solution: p.solution || "",
      outcome: p.outcome || "",
      image: p.image || "",
      status: p.status || "Published",
      template: p.template || "default",
      order: p.order || 1,
      serviceName: p.serviceName || "Software Engineering",
      serviceSlug: p.serviceSlug || "software-engineering",
      contribution: p.contribution && p.contribution.length > 0 ? p.contribution : ["Requirement Analysis"],
      technology: p.technology && p.technology.length > 0 ? p.technology : ["Next.js", "Node.js"],
      metrics: p.metrics && p.metrics.length > 0 ? p.metrics : [{ value: "3x", label: "Metric" }]
    });
    setActiveTab("cs-create");
  };

  const handleResetProjectForm = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: "",
      slug: "",
      category: dynamicIndustriesList[0]?.name || "FinTech & Digital Banking",
      summary: "",
      context: "",
      challenge: "",
      solution: "",
      outcome: "",
      image: "",
      status: "Published",
      template: "default",
      order: dynamicProjectsList.length + 1,
      serviceName: "Software Engineering",
      serviceSlug: "software-engineering",
      contribution: ["Requirement Analysis", "Frontend & Backend Engineering"],
      technology: ["Next.js", "React", "Node.js", "MongoDB"],
      metrics: [
        { value: "3x", label: "User Growth" },
        { value: "99.9%", label: "Uptime" }
      ]
    });
  };

  const handleSaveProject = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (!projectForm.title.trim() || !projectForm.summary.trim() || !projectForm.context.trim() || !projectForm.solution.trim()) {
      Swal.fire("Validation Error", "Please fill in Case Study Title, Summary, Context, and Solution.", "warning");
      return;
    }

    setIsSavingProject(true);
    const token = localStorage.getItem("adminToken");
    const isEdit = !!editingProjectId;
    const url = isEdit
      ? `http://localhost:5000/api/projects/${editingProjectId}`
      : "http://localhost:5000/api/projects";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(projectForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("CASE_STUDIES_UPDATED");
          bc.close();
        }
        Swal.fire({
          icon: "success",
          title: isEdit ? "Case Study Updated! 🚀" : "Case Study Created & Published! 🚀",
          text: `Project '${data.data.title}' is now live on the site!`,
          timer: 2000,
          showConfirmButton: false,
        });
        fetchProjectsAdminData();
        handleResetProjectForm();
        setActiveTab("cs-all");
      } else {
        Swal.fire("Error", data.message || "Failed to save case study", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingProject(false);
    }
  };

  const handleDeleteProject = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: `Delete Case Study '${title}'?`,
      text: "This will remove the case study project from the database and website. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch(`http://localhost:5000/api/projects/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            const bc = new BroadcastChannel("taapti_cms_updates");
            bc.postMessage("CASE_STUDIES_UPDATED");
            bc.close();
          }
          Swal.fire({ icon: "success", title: "Deleted!", text: `Case study '${title}' deleted.`, timer: 1500, showConfirmButton: false });
          fetchProjectsAdminData();
        } else {
          Swal.fire("Error", data.message || "Failed to delete", "error");
        }
      } catch {
        Swal.fire("Error", "Delete request failed", "error");
      }
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

  const handleUpdateLead = async (id: string, updates: any) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(updates),
      });
      const data = await res.json();
      if (data.success) {
        fetchLeads();
      } else {
        Swal.fire("Error", data.message || "Failed to update lead status", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server", "error");
    }
  };

  const handleDeleteLead = async (id: string, clientName: string) => {
    const result = await Swal.fire({
      title: `Delete lead from ${clientName}?`,
      text: "This enquiry will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      cancelButtonColor: "#64748B",
      confirmButtonText: "Yes, delete it",
    });
    if (result.isConfirmed) {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          Swal.fire({ icon: "success", title: "Deleted!", text: "Lead deleted.", timer: 1500, showConfirmButton: false });
          fetchLeads();
        } else {
          Swal.fire("Error", data.message || "Failed to delete lead", "error");
        }
      } catch {
        Swal.fire("Error", "Could not connect to backend server", "error");
      }
    }
  };

  // ── ABOUT PAGE CMS STATE & HANDLERS ──
  const [aboutPageForm, setAboutPageForm] = useState({
    hero: {
      eyebrow: "Senior Software Engineering Firm",
      headingNormal: "Senior engineers building",
      headingHighlight: "production-ready software.",
      description: "Taapti Technologies is a founder-led software engineering firm. We design, modernize, and scale mission-critical digital products for ambitious enterprises and high-growth startups.",
      stats: [
        { value: "50+", label: "Production Apps Shipped", desc: "Across Fintech, Healthcare & SaaS" },
        { value: "99.9%", label: "System Uptime SLA", desc: "High availability infrastructure" },
        { value: "100%", label: "Senior Engineering", desc: "No junior dev handoffs" },
        { value: "< 24h", label: "Response SLA", desc: "Dedicated engineering channel" },
      ]
    },
    partner: {
      eyebrow: "WHO WE ARE",
      headingNormal: "A technical partner,",
      headingHighlight: "not just an agency.",
      paragraph1: "We partner with engineering leaders, CTOs, and founders who need high-velocity engineering teams to solve hard technical problems or launch ambitious products.",
      paragraph2: "Unlike traditional outsourced agencies that push junior talent and heavy account management, our team consists of senior engineers who write clean, battle-tested code and communicate directly with your team.",
      benchmarkTitle: "Built around production standards.",
      pillars: [
        { title: "Security & Compliance", desc: "Bank-grade encryption, OWASP top 10 protection, and automated vulnerability scanning.", metric: "SOC2 Ready" },
        { title: "Performance Optimization", desc: "Sub-100ms API response targets, edge caching, and bundle size reduction.", metric: "98+ Lighthouse" },
        { title: "DevOps & Observability", desc: "Automated CI/CD pipelines, Datadog/Grafana monitoring, and self-healing infrastructure.", metric: "Zero-Downtime" },
      ],
    },
    values: {
      eyebrow: "OUR CORE VALUES",
      headingNormal: "Architectural Principles",
      headingHighlight: "We Live By",
      items: [
        { number: "01", title: "Engineering First", subtitle: "Built for Resilience", description: "We design software with strict adherence to architectural principles—prioritizing type safety, modular code, and automated testing.", tags: ["Clean Code", "Type Safety", "CI/CD Automation"] },
        { number: "02", title: "Direct Collaboration", subtitle: "Zero Middlemen", description: "You work directly with the senior architects and product engineers building your product. Clear technical communication without project management bloat.", tags: ["Direct Access", "Transparent Slack", "Agile Sprints"] },
        { number: "03", title: "Practical Innovation", subtitle: "No Hype, Real ROI", description: "We integrate AI, RAG pipelines, and cloud automation where they provide clear competitive advantage.", tags: ["RAG Pipelines", "Cloud Native", "Cost Optimization"] },
        { number: "04", title: "Long-Term Scalability", subtitle: "Built to Evolve", description: "Software foundations crafted to scale gracefully with user growth and traffic spikes without requiring total rewrites.", tags: ["Microservices", "Event-Driven", "Database Scaling"] }
      ]
    },
    capabilities: {
      eyebrow: "OUR ENGINEERING CAPABILITIES",
      headingNormal: "Full-spectrum technology",
      headingHighlight: "execution.",
      description: "From initial system architecture to production rollout, we bring specialized technical capabilities across the software development lifecycle.",
      items: [
        { id: "backend", title: "Backend Engineering", desc: "Distributed microservices, high-throughput REST & GraphQL APIs, real-time WebSockets, and secure data storage.", tech: ["Node.js", "Python", "Go", "PostgreSQL", "Redis", "Kafka"] },
        { id: "web-mobile", title: "Web & Mobile Engineering", desc: "Blazing-fast modern web applications, progressive web apps, and native iOS & Android experiences.", tech: ["Next.js", "React Native", "TypeScript", "TailwindCSS", "Flutter"] },
        { id: "ai-rag", title: "AI & RAG Solutions", desc: "Custom LLM fine-tuning, retrieval-augmented generation pipelines, vector databases, and intelligent document AI.", tech: ["LangChain", "LlamaIndex", "Pinecone", "OpenAI", "PyTorch"] },
        { id: "modernization", title: "Legacy Modernization", desc: "Refactoring monolithic codebases into cloud-native architectures with zero downtime migration strategies.", tech: ["Docker", "Kubernetes", "AWS", "GCP", "Terraform"] },
        { id: "product", title: "Full Product Engineering", desc: "End-to-end product engineering from tech specification, database design, UI/UX architecture to deployment.", tech: ["System Design", "UI/UX System", "Analytics", "DevOps"] },
        { id: "teams", title: "Dedicated Technical Teams", desc: "Autonomous, senior engineering squads that integrate seamlessly into your technical roadmap and workflow.", tech: ["Full-Stack Eng", "DevOps Lead", "QA Automation", "Tech Architect"] }
      ]
    },
    cta: {
      eyebrow: "LET'S BUILD TOGETHER",
      headingNormal: "Have a technical challenge or product idea?",
      headingHighlight: "Let's talk.",
      description: "Schedule a 30-minute discovery call directly with our engineering founders to discuss your architecture, tech stack, and goals.",
      buttonText: "Schedule Technical Discovery",
      buttonLink: "/contact",
    },
    team: {
      eyebrow: "OUR LEADERSHIP",
      headingNormal: "Senior Engineering Squads",
      headingHighlight: "Driving Results",
      members: [
        { title: "Founder & Lead Architect", role: "Surat / India Office", desc: "10+ years scaling cloud backends and high-concurrency systems." },
        { title: "Senior AI & RAG Engineers", role: "Python / Vector DBs", desc: "LLM fine-tuning, embeddings, and automated retrieval pipelines." },
        { title: "Frontend & Mobile Squad", role: "Next.js / React Native", desc: "Crafting pixel-perfect, responsive user interfaces." }
      ]
    }
  });
  const [isSavingAboutPage, setIsSavingAboutPage] = useState(false);

  const fetchAboutPageData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/about-page").catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setAboutPageForm({
            hero: {
              eyebrow: d.hero?.eyebrow || "Senior Software Engineering Firm",
              headingNormal: d.hero?.headingNormal || "Senior engineers building",
              headingHighlight: d.hero?.headingHighlight || "production-ready software.",
              description: d.hero?.description || "",
              stats: d.hero?.stats && d.hero.stats.length > 0 ? d.hero.stats : aboutPageForm.hero.stats
            },
            partner: {
              eyebrow: d.partner?.eyebrow || "WHO WE ARE",
              headingNormal: d.partner?.headingNormal || "A technical partner,",
              headingHighlight: d.partner?.headingHighlight || "not just an agency.",
              paragraph1: d.partner?.paragraph1 || "",
              paragraph2: d.partner?.paragraph2 || "",
              benchmarkTitle: d.partner?.benchmarkTitle || "Built around production standards.",
              pillars: d.partner?.pillars && d.partner.pillars.length > 0 ? d.partner.pillars : aboutPageForm.partner.pillars
            },
            values: {
              eyebrow: d.values?.eyebrow || "OUR CORE VALUES",
              headingNormal: d.values?.headingNormal || "Architectural Principles",
              headingHighlight: d.values?.headingHighlight || "We Live By",
              items: d.values?.items && d.values.items.length > 0 ? d.values.items : aboutPageForm.values.items
            },
            capabilities: {
              eyebrow: d.capabilities?.eyebrow || "OUR ENGINEERING CAPABILITIES",
              headingNormal: d.capabilities?.headingNormal || "Full-spectrum technology",
              headingHighlight: d.capabilities?.headingHighlight || "execution.",
              description: d.capabilities?.description || "",
              items: d.capabilities?.items && d.capabilities.items.length > 0 ? d.capabilities.items : aboutPageForm.capabilities.items
            },
            cta: {
              eyebrow: d.cta?.eyebrow || "LET'S BUILD TOGETHER",
              headingNormal: d.cta?.headingNormal || "Have a technical challenge or product idea?",
              headingHighlight: d.cta?.headingHighlight || "Let's talk.",
              description: d.cta?.description || "",
              buttonText: d.cta?.buttonText || "Schedule Technical Discovery",
              buttonLink: d.cta?.buttonLink || "/contact"
            },
            team: {
              eyebrow: d.team?.eyebrow || "OUR LEADERSHIP",
              headingNormal: d.team?.headingNormal || "Senior Engineering Squads",
              headingHighlight: d.team?.headingHighlight || "Driving Results",
              members: d.team?.members && d.team.members.length > 0 ? d.team.members : aboutPageForm.team.members
            }
          });
        }
      }
    } catch { /* silent */ }
  };

  const handleSaveAboutPage = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIsSavingAboutPage(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/about-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(aboutPageForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("ABOUT_PAGE_UPDATED");
          bc.close();
        }
        Swal.fire({ icon: "success", title: "Saved & Published! 🚀", text: "About Page live content updated!", timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire("Error", data.message || "Failed to update About page", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingAboutPage(false);
    }
  };

  // ── CONTACT PAGE CMS STATE & HANDLERS ──
  const [contactPageForm, setContactPageForm] = useState({
    heroBadge: "GET IN TOUCH",
    heroTitleNormal: "Let's Build Something",
    heroTitleHighlight: "Great Together",
    heroDescription: "Have a project idea, architecture requirement, or looking to scale your engineering team? Reach out to us directly.",
    phone: "+91 98765 43210",
    email: "hello@taapti.com",
    address: "Surat, Gujarat, India",
    slaResponseTime: "Under 2 Hours (Mon - Sat)",
    trustBadgeText: "100% Confidentiality & Non-Disclosure Guarantee",
  });
  const [isSavingContactPage, setIsSavingContactPage] = useState(false);

  const fetchContactPageData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact-page").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setContactPageForm({
            heroBadge: d.heroBadge || "GET IN TOUCH",
            heroTitleNormal: d.heroTitleNormal || "Let's Build Something",
            heroTitleHighlight: d.heroTitleHighlight || "Great Together",
            heroDescription: d.heroDescription || "",
            phone: d.phone || "+91 98765 43210",
            email: d.email || "hello@taapti.com",
            address: d.address || "Surat, Gujarat, India",
            slaResponseTime: d.slaResponseTime || "Under 2 Hours (Mon - Sat)",
            trustBadgeText: d.trustBadgeText || "100% Confidentiality & Non-Disclosure Guarantee",
          });
        }
      }
    } catch { /* silent */ }
  };

  const handleSaveContactPage = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIsSavingContactPage(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/contact-page", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(contactPageForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("CONTACT_PAGE_UPDATED");
          bc.close();
        }
        Swal.fire({ icon: "success", title: "Saved & Published! 🚀", text: "Contact Us page details updated live!", timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire("Error", data.message || "Failed to update", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingContactPage(false);
    }
  };

  // ── CAREERS PAGE CMS STATE & HANDLERS ──
  const [careersPageForm, setCareersPageForm] = useState({
    heroBadge: "We Are Hiring — Join Our Engineering Team",
    heroTitleNormal: "Build high-impact software.",
    heroTitleHighlight: "Accelerate your career.",
    heroDescription: "Taapti Technologies is looking for senior developers and architects passionate about clean code, high availability systems, and modern AI engineering.",
    benefitsBadge: "PERKS & BENEFITS",
    benefitsTitle: "Why engineers thrive at Taapti",
    benefitsList: [
      { number: "01", subtitle: "Real Scale & Impact", title: "Work on Production Systems", description: "Build software that powers real businesses. Your engineering decisions have direct impact on system architecture, uptime, and user experience." },
      { number: "02", subtitle: "No Micro-Management", title: "True Engineering Ownership", description: "Own your features end-to-end—from system design and code implementation to automated testing and cloud deployment." },
      { number: "03", subtitle: "Next.js, AI, RAG & Cloud", title: "Modern Tech Stack", description: "Work with cutting-edge tools including TypeScript, Next.js, Python, Vector DBs, Kubernetes, and automated CI/CD pipelines." },
      { number: "04", subtitle: "Work From Anywhere", title: "Remote-First Flexibility", description: "We operate with asynchronous communication, flexible hours, and a high-trust culture focused on output rather than hours spent at a desk." },
      { number: "05", subtitle: "Top Market Pay", title: "Competitive Compensation", description: "Above-market salaries, performance bonuses, health benefits, equipment budget, and annual learning stipends for courses and conferences." },
      { number: "06", subtitle: "Grow With The Firm", title: "Fast Career Velocity", description: "As a founder-led engineering company, top performers quickly step into technical leadership, architecture design, and client partner roles." },
    ],
    hiringBadge: "HOW WE HIRE",
    hiringTitle: "Our straightforward hiring process",
    hiringSteps: [
      { step: "01", title: "Profile Review", desc: "We review your portfolio, GitHub, or previous technical work to evaluate your engineering depth." },
      { step: "02", title: "Introductory Sync", desc: "A 20-minute casual video call to align on career goals, working style, and team fit." },
      { step: "03", title: "Technical Discussion", desc: "A hands-on discussion reviewing real-world system architecture or code structure with senior leads." },
      { step: "04", title: "Offer & Onboarding", desc: "Fast offer rollout with clear equity/salary terms, followed by smooth engineering onboarding." },
    ],
  });
  const [isSavingCareersPage, setIsSavingCareersPage] = useState(false);

  const fetchCareersPageData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/careers/page").catch(() => null);
      if (res && res.ok) {
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setCareersPageForm({
            heroBadge: d.heroBadge || "We Are Hiring — Join Our Engineering Team",
            heroTitleNormal: d.heroTitleNormal || "Build high-impact software.",
            heroTitleHighlight: d.heroTitleHighlight || "Accelerate your career.",
            heroDescription: d.heroDescription || "",
            benefitsBadge: d.benefitsBadge || "PERKS & BENEFITS",
            benefitsTitle: d.benefitsTitle || "Why engineers thrive at Taapti",
            benefitsList: d.benefitsList && d.benefitsList.length > 0 ? d.benefitsList : careersPageForm.benefitsList,
            hiringBadge: d.hiringBadge || "HOW WE HIRE",
            hiringTitle: d.hiringTitle || "Our straightforward hiring process",
            hiringSteps: d.hiringSteps && d.hiringSteps.length > 0 ? d.hiringSteps : careersPageForm.hiringSteps,
          });
        }
      }
    } catch { /* silent */ }
  };

  const handleSaveCareersPage = async (e?: React.MouseEvent) => {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    setIsSavingCareersPage(true);
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/careers/page", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(careersPageForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("CAREERS_PAGE_UPDATED");
          bc.close();
        }
        Swal.fire({ icon: "success", title: "Saved & Published! 🚀", text: "Careers page sections updated live on website!", timer: 2000, showConfirmButton: false });
      } else {
        Swal.fire("Error", data.message || "Failed to update Careers page", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingCareersPage(false);
    }
  };

  // ── BLOG CMS STATE, MODAL & HANDLERS ──
  const [blogsList, setBlogsList] = useState<any[]>([]);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [isSavingBlog, setIsSavingBlog] = useState(false);
  const [blogCategories, setBlogCategories] = useState<string[]>([
    "Software Engineering & Architecture",
    "AI & Practical RAG Solutions",
    "Cloud & Infrastructure Modernization",
    "Product Engineering & Agile",
    "Web & Mobile Architecture",
  ]);
  const [newCatInput, setNewCatInput] = useState("");

  const handleAddCategory = () => {
    if (!newCatInput.trim()) return;
    const cat = newCatInput.trim();
    if (!blogCategories.includes(cat)) {
      setBlogCategories((prev) => [...prev, cat]);
      setBlogForm((prev) => ({ ...prev, category: cat }));
      Swal.fire({ icon: "success", title: "New Category Added!", text: `'${cat}' is now available in the blog form dropdown.`, timer: 1500, showConfirmButton: false });
    }
    setNewCatInput("");
  };

  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    category: "Software Engineering & Architecture",
    authorName: "Taapti Tech Team",
    authorRole: "Senior Software Architect",
    authorAvatar: "",
    summary: "",
    contentHtml: "<p>Write your detailed blog content here...</p>",
    coverImage: "",
    bgImage: "",
    readTime: "5 min read",
    status: "Published",
    tags: ["Engineering", "Software"],
  });

  const fetchBlogsAdminData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs").catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setBlogsList(json.data);
        }
      }
    } catch { /* silent */ }
  };

  const handleOpenBlogCreateModal = () => {
    setEditingBlogId(null);
    setBlogForm({
      title: "",
      slug: "",
      category: "Engineering & Architecture",
      authorName: "Taapti Tech Team",
      authorRole: "Senior Software Architect",
      authorAvatar: "",
      summary: "",
      contentHtml: "<h2>Introduction</h2><p>Start writing your blog article body with TipTap rich text formatting...</p>",
      coverImage: "",
      bgImage: "",
      readTime: "5 min read",
      status: "Published",
      tags: ["Engineering", "Software"],
    });
    setIsBlogModalOpen(true);
  };

  const handleOpenBlogEditModal = (blog: any) => {
    setEditingBlogId(blog._id);
    setBlogForm({
      title: blog.title || "",
      slug: blog.slug || "",
      category: blog.category || "Engineering & Architecture",
      authorName: blog.authorName || "Taapti Tech Team",
      authorRole: blog.authorRole || "Senior Software Architect",
      authorAvatar: blog.authorAvatar || "",
      summary: blog.summary || "",
      contentHtml: blog.contentHtml || "<p>Blog content...</p>",
      coverImage: blog.coverImage || "",
      bgImage: blog.bgImage || "",
      readTime: blog.readTime || "5 min read",
      status: blog.status || "Published",
      tags: blog.tags && blog.tags.length > 0 ? blog.tags : ["Engineering"],
    });
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!blogForm.title.trim() || !blogForm.summary.trim() || !blogForm.contentHtml.trim()) {
      Swal.fire("Validation Error", "Please fill in Blog Title, Summary, and Content.", "warning");
      return;
    }

    setIsSavingBlog(true);
    const token = localStorage.getItem("adminToken");
    const isEdit = !!editingBlogId;
    const url = isEdit
      ? `http://localhost:5000/api/blogs/${editingBlogId}`
      : "http://localhost:5000/api/blogs";
    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(blogForm),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("BLOGS_UPDATED");
          bc.close();
        }
        Swal.fire({
          icon: "success",
          title: isEdit ? "Blog Article Updated!" : "Blog Article Published!",
          text: `'${data.data.title}' is now live on the site!`,
          timer: 2000,
          showConfirmButton: false,
        });
        setIsBlogModalOpen(false);
        fetchBlogsAdminData();
      } else {
        Swal.fire("Error", data.message || "Failed to save blog article", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingBlog(false);
    }
  };

  const handleDeleteBlog = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: `Delete '${title}'?`,
      text: "This will permanently remove this blog article.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            const bc = new BroadcastChannel("taapti_cms_updates");
            bc.postMessage("BLOGS_UPDATED");
            bc.close();
          }
          Swal.fire({ icon: "success", title: "Deleted!", text: "Blog article deleted.", timer: 1500, showConfirmButton: false });
          fetchBlogsAdminData();
        } else {
          Swal.fire("Error", data.message || "Failed to delete", "error");
        }
      } catch {
        Swal.fire("Error", "Delete request failed", "error");
      }
    }
  };

  // ── CAREERS & HIRING CMS STATE & HANDLERS ──
  const [jobOpeningsList, setJobOpeningsList] = useState<any[]>([]);
  const [jobApplicationsList, setJobApplicationsList] = useState<any[]>([]);
  const [unreadApplicationsCount, setUnreadApplicationsCount] = useState(0);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [isSavingJobOpening, setIsSavingJobOpening] = useState(false);
  const [jobOpeningForm, setJobOpeningForm] = useState({
    title: "",
    department: "Engineering",
    location: "Surat, India / Remote",
    type: "Full-Time",
    experience: "3+ Years",
    salaryRange: "₹8L - ₹18L L P.A.",
    description: "",
    requirementsText: "Next.js, React, Node.js\nPostgreSQL / MongoDB\nAWS & CI/CD",
    responsibilitiesText: "Architect scalable web products\nLead code reviews\nCollaborate with team",
    status: "Open",
  });

  const fetchJobOpeningsAdminData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/careers/jobs").catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setJobOpeningsList(json.data);
        }
      }
    } catch { /* silent */ }
  };

  const fetchJobApplicationsAdminData = async () => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch("http://localhost:5000/api/careers/applications", {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setJobApplicationsList(json.data);
          const unread = json.data.filter((a: any) => !a.isRead).length;
          setUnreadApplicationsCount(unread);
        }
      }
    } catch { /* silent */ }
  };

  const handleOpenJobCreateModal = () => {
    setEditingJobId(null);
    setJobOpeningForm({
      title: "",
      department: "Engineering",
      location: "Surat, India / Remote",
      type: "Full-Time",
      experience: "3+ Years",
      salaryRange: "₹8L - ₹18L L P.A.",
      description: "",
      requirementsText: "React / Next.js, Node.js\nTypeScript & TailwindCSS\nREST & GraphQL APIs",
      responsibilitiesText: "Build production-ready web products\nCollaborate directly with client architects",
      status: "Open",
    });
    setIsJobModalOpen(true);
  };

  const handleOpenJobEditModal = (job: any) => {
    setEditingJobId(job._id);
    setJobOpeningForm({
      title: job.title || "",
      department: job.department || "Engineering",
      location: job.location || "Surat, India / Remote",
      type: job.type || "Full-Time",
      experience: job.experience || "3+ Years",
      salaryRange: job.salaryRange || "Competitive",
      description: job.description || "",
      requirementsText: job.requirements ? job.requirements.join("\n") : "",
      responsibilitiesText: job.responsibilities ? job.responsibilities.join("\n") : "",
      status: job.status || "Open",
    });
    setIsJobModalOpen(true);
  };

  const handleSaveJobOpening = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!jobOpeningForm.title.trim() || !jobOpeningForm.description.trim()) {
      Swal.fire("Validation Error", "Please fill in Job Title and Job Description.", "warning");
      return;
    }

    setIsSavingJobOpening(true);
    const token = localStorage.getItem("adminToken");
    const isEdit = !!editingJobId;
    const url = isEdit
      ? `http://localhost:5000/api/careers/jobs/${editingJobId}`
      : "http://localhost:5000/api/careers/jobs";
    const method = isEdit ? "PUT" : "POST";

    const payload = {
      ...jobOpeningForm,
      requirements: jobOpeningForm.requirementsText.split("\n").map(s => s.trim()).filter(Boolean),
      responsibilities: jobOpeningForm.responsibilitiesText.split("\n").map(s => s.trim()).filter(Boolean),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("CAREERS_UPDATED");
          bc.close();
        }
        Swal.fire({
          icon: "success",
          title: isEdit ? "Job Position Updated!" : "Job Position Posted!",
          text: `'${data.data.title}' is now live on the site!`,
          timer: 2000,
          showConfirmButton: false,
        });
        setIsJobModalOpen(false);
        fetchJobOpeningsAdminData();
      } else {
        Swal.fire("Error", data.message || "Failed to save job opening", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSavingJobOpening(false);
    }
  };

  const handleDeleteJobOpening = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: `Delete '${title}'?`,
      text: "This will remove the job opening from the site.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      confirmButtonText: "Yes, delete",
    });

    if (result.isConfirmed) {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch(`http://localhost:5000/api/careers/jobs/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          if (typeof window !== "undefined" && "BroadcastChannel" in window) {
            const bc = new BroadcastChannel("taapti_cms_updates");
            bc.postMessage("CAREERS_UPDATED");
            bc.close();
          }
          Swal.fire({ icon: "success", title: "Deleted!", text: "Job position deleted.", timer: 1500, showConfirmButton: false });
          fetchJobOpeningsAdminData();
        } else {
          Swal.fire("Error", data.message || "Failed to delete", "error");
        }
      } catch {
        Swal.fire("Error", "Delete request failed", "error");
      }
    }
  };

  const handleUpdateApplicationStatus = async (id: string, status: string) => {
    const token = localStorage.getItem("adminToken");
    try {
      const res = await fetch(`http://localhost:5000/api/careers/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status, isRead: true }),
      });
      const data = await res.json();
      if (data.success) {
        fetchJobApplicationsAdminData();
      }
    } catch { /* silent */ }
  };

  const handleDeleteApplication = async (id: string, candidateName: string) => {
    const result = await Swal.fire({
      title: `Delete application from ${candidateName}?`,
      text: "This will remove the resume application permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DC2626",
      confirmButtonText: "Yes, delete",
    });
    if (result.isConfirmed) {
      const token = localStorage.getItem("adminToken");
      try {
        const res = await fetch(`http://localhost:5000/api/careers/applications/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          Swal.fire({ icon: "success", title: "Deleted!", text: "Application deleted.", timer: 1500, showConfirmButton: false });
          fetchJobApplicationsAdminData();
        }
      } catch { /* silent */ }
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
    fetchServicesAdminData();
    fetchIndustriesAdminData();
    fetchProjectsAdminData();
    fetchAboutPageData();
    fetchContactPageData();
    fetchCareersPageData();
    fetchBlogsAdminData();
    fetchLeads();
    fetchJobOpeningsAdminData();
    fetchJobApplicationsAdminData();

    let channel: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel("taapti_cms_updates");
      channel.onmessage = (event) => {
        if (event.data === "NEW_LEAD_SUBMITTED" || event.data === "CMS_UPDATED") {
          fetchLeads();
        }
        if (event.data === "JOB_APPLICATION_SUBMITTED") {
          fetchJobApplicationsAdminData();
        }
      };
    }

    return () => {
      if (channel) channel.close();
    };
  }, []);

  useEffect(() => {
    if (activeTab === "leads") {
      setUnreadCount(0);
    }
  }, [activeTab]);

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
                        } else {
                          setActiveTab(item.id);
                          setMobileMenuOpen(false);
                        }
                      }}
                    >
                      <div className="cmd-nav-item-main" style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: 0 }}>
                        <NavIcon name={item.icon} />
                        {!sidebarCollapsed && (
                          <span className="cmd-nav-item-label" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: "13px" }}>
                            {item.label}
                          </span>
                        )}
                      </div>
                      {!sidebarCollapsed && (item.id === "leads" ? (unreadCount > 0 ? unreadCount : undefined) : item.count) && (
                        <span className="cmd-nav-item-count">
                          {item.id === "leads" ? unreadCount : item.count}
                        </span>
                      )}
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
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "7px 12px 7px 28px",
                              fontSize: "12px",
                              fontWeight: activeTab === sub.id ? "700" : "500",
                              textAlign: "left",
                              width: "100%",
                              lineHeight: "1.3",
                            }}
                            onClick={() => {
                              if (sub.id === "careers-create") {
                                setActiveTab("careers-openings");
                                handleOpenJobCreateModal();
                              } else {
                                setActiveTab(sub.id);
                              }
                              setMobileMenuOpen(false);
                            }}
                          >
                            {!sub.label.startsWith("➕") && !sub.label.startsWith("+") && <span className="cmd-subnav-bullet" style={{ flexShrink: 0 }} />}
                            <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={sub.label}>
                              {sub.label}
                            </span>
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


      </aside>

      {/* MAIN COMMAND CENTER BODY */}
      <div className="cmd-main">
        {/* ====================== TOP HEADER BAR ====================== */}
        <header className="cmd-header">
          {/* LEFT: Mobile Toggle + Page title */}
          <div className="cmd-header-left" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <button
              className="cmd-mobile-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation"
              title="Open Navigation Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/>
                <line x1="3" y1="12" x2="21" y2="12"/>
                <line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
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
                        <span className="ov-kpi-badge up">Live</span>
                      </div>
                      <div className="ov-kpi-value">{leads.length + jobApplicationsList.length}</div>
                      <div className="ov-kpi-label">Total Submissions (Leads + Resumes)</div>
                      <svg className="ov-sparkline" viewBox="0 0 100 28" preserveAspectRatio="none">
                        <path d="M0,22 Q25,10 50,16 T100,4" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                      </svg>
                    </div>

                    <div className="ov-kpi-card ov-kpi-green">
                      <div className="ov-kpi-top">
                        <div className="ov-kpi-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </div>
                        <span className="ov-kpi-badge up">+{leads.filter(l => l.status === "New" || !l.status).length} new</span>
                      </div>
                      <div className="ov-kpi-value">{leads.length}</div>
                      <div className="ov-kpi-label">Total Contact Form Leads</div>
                      <svg className="ov-sparkline" viewBox="0 0 100 28" preserveAspectRatio="none">
                        <path d="M0,24 Q20,12 40,18 T80,6 T100,2" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                      </svg>
                    </div>

                    <div className="ov-kpi-card ov-kpi-purple">
                      <div className="ov-kpi-top">
                        <div className="ov-kpi-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                        </div>
                        <span className="ov-kpi-badge neutral">Live Published</span>
                      </div>
                      <div className="ov-kpi-value">{dynamicProjectsList.length || caseStudiesForm.caseStudies.length || 3}</div>
                      <div className="ov-kpi-label">Active Portfolio Case Studies</div>
                      <svg className="ov-sparkline" viewBox="0 0 100 28" preserveAspectRatio="none">
                        <path d="M0,14 Q30,16 60,10 T100,12" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                      </svg>
                    </div>

                    <div className="ov-kpi-card ov-kpi-amber">
                      <div className="ov-kpi-top">
                        <div className="ov-kpi-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="17" y1="11" x2="23" y2="11"/></svg>
                        </div>
                        <span className="ov-kpi-badge up">{jobApplicationsList.length} Applicants</span>
                      </div>
                      <div className="ov-kpi-value">{jobOpeningsList.length}</div>
                      <div className="ov-kpi-label">Active Job Openings</div>
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
                          <div className="ov-card-sub">Website contact submissions & enquiries activity</div>
                        </div>
                        <button className="ov-link-btn" onClick={() => setActiveTab("leads")}>View report →</button>
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
                        <button className="ov-link-btn" onClick={() => setActiveTab("leads")}>View report →</button>
                      </div>
                      <div className="ov-pipeline-list">
                        {(() => {
                          const total = leads.length || 1;
                          const newLeads = leads.filter(l => l.status === "New" || !l.status).length;
                          const contacted = leads.filter(l => l.status === "Contacted" || l.status === "In Review").length;
                          const inConv = leads.filter(l => l.status === "In Conversation" || l.status === "Proposal Sent").length;
                          const closed = leads.filter(l => l.status === "Deal Closed" || l.status === "Resolved").length;
                          return [
                            { label: "New Enquiries", count: newLeads, pct: total > 0 && newLeads > 0 ? Math.round((newLeads / total) * 100) : 0, color: "#00875A" },
                            { label: "Contacted & In Review", count: contacted, pct: total > 0 && contacted > 0 ? Math.round((contacted / total) * 100) : 0, color: "#F59E0B" },
                            { label: "In Conversation / Proposal", count: inConv, pct: total > 0 && inConv > 0 ? Math.round((inConv / total) * 100) : 0, color: "#6366F1" },
                            { label: "Deal Closed 🎉", count: closed, pct: total > 0 && closed > 0 ? Math.round((closed / total) * 100) : 0, color: "#10B981" },
                          ];
                        })().map((item) => (
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
            /* DYNAMIC LEADS CONTROL PANEL WITH PIPELINE STAGES */
            <div className="ov-card" style={{ minHeight: "550px" }}>
              <div className="ov-card-head" style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "16px" }}>
                <div>
                  <div className="ov-card-title" style={{ fontSize: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
                    <span>📬 Contact Form Enquiries & Leads Pipeline ({leads.length})</span>
                  </div>
                  <div className="ov-card-sub">Manage lead pipeline status (New, Contacted, In Conversation, Deal Closed, Deal Lost) and internal remarks</div>
                </div>
                <button className="cmd-top-action-btn primary" onClick={fetchLeads}>
                  🔄 Refresh Leads
                </button>
              </div>

              {/* PIPELINE SUMMARY STAT BADGES */}
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", margin: "16px 0 8px 0" }}>
                {[
                  { label: "Total Leads", count: leads.length, color: "#1E293B", bg: "#F1F5F9" },
                  { label: "New", count: leads.filter(l => l.status === "New" || !l.status).length, color: "#2563EB", bg: "#EFF6FF" },
                  { label: "Contacted", count: leads.filter(l => l.status === "Contacted").length, color: "#D97706", bg: "#FEF3C7" },
                  { label: "In Conversation", count: leads.filter(l => l.status === "In Conversation").length, color: "#9333EA", bg: "#F3E8FF" },
                  { label: "Deal Closed 🎉", count: leads.filter(l => l.status === "Deal Closed" || l.status === "Resolved").length, color: "#15803D", bg: "#DCFCE7" },
                  { label: "Deal Lost ❌", count: leads.filter(l => l.status === "Deal Lost").length, color: "#DC2626", bg: "#FEF2F2" },
                ].map((st, i) => (
                  <div key={i} style={{ background: st.bg, color: st.color, padding: "8px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                    <span>{st.label}:</span>
                    <span style={{ fontSize: "14px", fontWeight: "800" }}>{st.count}</span>
                  </div>
                ))}
              </div>

              <div className="ov-table-wrap" style={{ marginTop: "12px" }}>
                <table className="ov-table">
                  <thead>
                    <tr>
                      <th>CLIENT NAME</th>
                      <th>PHONE & EMAIL</th>
                      <th>REQUESTED SERVICE</th>
                      <th>REQUIREMENT & NOTES</th>
                      <th>SUBMITTED</th>
                      <th>PIPELINE STATUS</th>
                      <th style={{ textAlign: "right" }}>ACTIONS</th>
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
                      leads.map((ld) => {
                        const currentStatus = ld.status || "New";
                        const getStatusBadgeStyle = (status: string) => {
                          switch (status) {
                            case "New": return { bg: "#EFF6FF", color: "#1D4ED8", border: "#BFDBFE" };
                            case "Contacted": return { bg: "#FEF3C7", color: "#B45309", border: "#FDE68A" };
                            case "In Conversation": return { bg: "#F3E8FF", color: "#7E22CE", border: "#E9D5FF" };
                            case "Deal Closed":
                            case "Resolved": return { bg: "#DCFCE7", color: "#15803D", border: "#BBF7D0" };
                            case "Deal Lost": return { bg: "#FEF2F2", color: "#B91C1C", border: "#FECACA" };
                            default: return { bg: "#F1F5F9", color: "#475569", border: "#E2E8F0" };
                          }
                        };
                        const badgeStyle = getStatusBadgeStyle(currentStatus);

                        return (
                          <tr key={ld._id || ld.phone} className="ov-table-row" style={{ opacity: ld.isRead ? 0.9 : 1 }}>
                            <td>
                              <div className="ov-client-cell">
                                <div className="ov-avatar ov-avatar-blue" style={{ position: "relative" }}>
                                  {ld.name.charAt(0).toUpperCase()}
                                  {!ld.isRead && (
                                    <span style={{ position: "absolute", top: "-2px", right: "-2px", width: "8px", height: "8px", background: "#EF4444", borderRadius: "50%" }} />
                                  )}
                                </div>
                                <div>
                                  <div className="ov-client-name" style={{ fontWeight: "700" }}>{ld.name}</div>
                                  {!ld.isRead && <span style={{ fontSize: "10px", color: "#2563EB", fontWeight: "800" }}>● UNREAD</span>}
                                </div>
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
                              <div style={{ fontSize: "13px", color: "#334155", marginBottom: "4px" }}>
                                {ld.message || "No custom message attached."}
                              </div>
                              {ld.notes && (
                                <div style={{ fontSize: "11px", color: "#65A30D", background: "#ECFDF5", padding: "2px 6px", borderRadius: "4px", display: "inline-block" }}>
                                  📝 {ld.notes}
                                </div>
                              )}
                            </td>
                            <td className="ov-td-muted" style={{ fontSize: "12px" }}>
                              {new Date(ld.createdAt || Date.now()).toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })}
                            </td>
                            <td>
                              {/* SELECT DROPDOWN FOR PIPELINE STATUS UPDATE */}
                              <select
                                value={currentStatus}
                                onChange={(e) => handleUpdateLead(ld._id, { status: e.target.value })}
                                style={{
                                  background: badgeStyle.bg,
                                  color: badgeStyle.color,
                                  border: `1px solid ${badgeStyle.border}`,
                                  padding: "6px 10px",
                                  borderRadius: "8px",
                                  fontSize: "12px",
                                  fontWeight: "800",
                                  cursor: "pointer",
                                  outline: "none"
                                }}
                              >
                                <option value="New">🟢 New Lead</option>
                                <option value="Contacted">🟡 Contacted</option>
                                <option value="In Conversation">🟣 In Conversation</option>
                                <option value="Deal Closed">🎉 Deal Closed (Won)</option>
                                <option value="Deal Lost">❌ Deal Lost</option>
                              </select>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <div style={{ display: "flex", gap: "6px", justifyContent: "flex-end" }}>
                                <button
                                  className="ov-view-btn"
                                  onClick={() => {
                                    handleUpdateLead(ld._id, { isRead: true });
                                    Swal.fire({
                                      title: `Lead Details: ${ld.name}`,
                                      html: `
                                        <div style="text-align: left; font-size: 14px; line-height: 1.6;">
                                          <p><strong>Full Name:</strong> ${ld.name}</p>
                                          <p><strong>Phone:</strong> ${ld.phone}</p>
                                          <p><strong>Email:</strong> ${ld.email}</p>
                                          <p><strong>Service Requested:</strong> ${ld.service}</p>
                                          <p><strong>Current Status:</strong> ${currentStatus}</p>
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
                                  style={{ padding: "6px 10px", fontSize: "12px" }}
                                >
                                  👁️ View
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(ld._id, ld.name)}
                                  style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", padding: "6px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            /* DYNAMIC SECTION EDITOR MODULE - EXACT REAL FRONTEND FIELDS */
            <div className="ov-card" style={{ minHeight: "550px" }}>
              <div className="ov-card-head" style={{ borderBottom: "1px solid #E2E8F0", paddingBottom: "16px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px" }}>
                <div style={{ flex: "1 1 260px", minWidth: 0 }}>
                  <div className="ov-card-title" style={{ fontSize: "18px", display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                    <span>🛠️ Section CMS Manager:</span>
                    <span style={{ color: "#2563EB", textTransform: "capitalize", wordBreak: "break-word" }}>{activeTab.replace("home-", "Home Page ").replace("-", " ")}</span>
                  </div>
                  <div className="ov-card-sub" style={{ fontSize: "12.5px", lineHeight: "1.4", marginTop: "4px" }}>Super Admin Content Control Panel — Mapped directly to Backend API & Frontend React components</div>
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
                    (isSavingCta && activeTab === "home-cta") ||
                    (isSavingContactPage && activeTab === "contact-page-cms")
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
                    } else if (activeTab.startsWith("about-")) {
                      handleSaveAboutPage();
                    } else if (activeTab === "contact-page-cms") {
                      handleSaveContactPage();
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
                  (isSavingCta && activeTab === "home-cta") ||
                  (isSavingContactPage && activeTab === "contact-page-cms")
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

              {/* 2. CATEGORY FILTERS & LIVE CASE STUDIES BREAKDOWN */}
              {activeTab === "cs-filter" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  {/* Category Header Controls */}
                  <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Listing Section Title & Subtitle</h3>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "14px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Section Eyebrow</label>
                        <input type="text" defaultValue="SELECTED WORK" style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Listing Section Title</label>
                        <input type="text" defaultValue="Real problems. Real solutions." style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }} />
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Category Cards & Case Studies breakdown */}
                  <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          Live Industry Category Filters & Associated Case Studies ({dynamicIndustriesList.length})
                        </h3>
                        <p style={{ fontSize: "12px", color: "#64748B", margin: "2px 0 0 0" }}>
                          These categories automatically populate from your Dynamic Industries module. Below you can see how many case studies belong to each category.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setActiveTab("ind-create")}
                        style={{ background: "#EFF6FF", color: "#2563EB", padding: "8px 14px", borderRadius: "6px", border: "1px solid #BFDBFE", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
                      >
                        ➕ Add New Industry Category
                      </button>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "14px", marginTop: "8px" }}>
                      {dynamicIndustriesList.length === 0 ? (
                        <div style={{ padding: "20px", background: "#F8FAFC", borderRadius: "8px", color: "#64748B", fontSize: "13px" }}>
                          No industries added yet. Go to 3. Dynamic Industries to create your first category.
                        </div>
                      ) : (
                        dynamicIndustriesList.map((ind: any) => {
                          const matchingProjects = dynamicProjectsList.filter(
                            (p: any) => p.category?.toLowerCase() === ind.name?.toLowerCase()
                          );
                          return (
                            <div
                              key={ind._id}
                              style={{
                                background: "#F8FAFC",
                                padding: "16px",
                                borderRadius: "10px",
                                border: "1px solid #E2E8F0",
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <strong style={{ fontSize: "15px", color: "#0F172A" }}>{ind.name}</strong>
                                <span
                                  style={{
                                    background: matchingProjects.length > 0 ? "#DCFCE7" : "#F1F5F9",
                                    color: matchingProjects.length > 0 ? "#15803D" : "#64748B",
                                    padding: "3px 8px",
                                    borderRadius: "12px",
                                    fontSize: "11px",
                                    fontWeight: "800",
                                  }}
                                >
                                  {matchingProjects.length} Case {matchingProjects.length === 1 ? "Study" : "Studies"}
                                </span>
                              </div>

                              {/* Projects List within this Industry */}
                              <div style={{ background: "#FFF", borderRadius: "6px", border: "1px solid #E2E8F0", padding: "8px 10px", fontSize: "12px" }}>
                                {matchingProjects.length === 0 ? (
                                  <span style={{ color: "#94A3B8", fontStyle: "italic" }}>No case study assigned yet</span>
                                ) : (
                                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                    {matchingProjects.map((p: any) => (
                                      <div key={p._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ color: "#334155", fontWeight: "600", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>
                                          • {p.title}
                                        </span>
                                        <button
                                          type="button"
                                          onClick={() => handleEditProjectInit(p)}
                                          style={{ background: "#F3E8FF", color: "#7C3AED", border: "none", padding: "2px 6px", borderRadius: "4px", fontSize: "10px", fontWeight: "700", cursor: "pointer" }}
                                        >
                                          Edit
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    handleResetProjectForm();
                                    setProjectForm((prev) => ({ ...prev, category: ind.name }));
                                    setActiveTab("cs-create");
                                  }}
                                  style={{ flex: 1, background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)", color: "#FFF", border: "none", padding: "6px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                                >
                                  ➕ Add Case Study here
                                </button>
                              </div>
                            </div>
                          );
                        })
                      )}
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
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Section 1: Hero & Mission</h3>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Eyebrow Tag
                      </label>
                      <input
                        type="text"
                        value={aboutPageForm.hero.eyebrow}
                        onChange={(e) => setAboutPageForm({ ...aboutPageForm, hero: { ...aboutPageForm.hero, eyebrow: e.target.value } })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                        Main Heading Normal / Highlight
                      </label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          type="text"
                          value={aboutPageForm.hero.headingNormal}
                          onChange={(e) => setAboutPageForm({ ...aboutPageForm, hero: { ...aboutPageForm.hero, headingNormal: e.target.value } })}
                          style={{ width: "50%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                        />
                        <input
                          type="text"
                          value={aboutPageForm.hero.headingHighlight}
                          onChange={(e) => setAboutPageForm({ ...aboutPageForm, hero: { ...aboutPageForm.hero, headingHighlight: e.target.value } })}
                          style={{ width: "50%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>
                      Mission Statement / Description
                    </label>
                    <textarea
                      rows={3}
                      value={aboutPageForm.hero.description}
                      onChange={(e) => setAboutPageForm({ ...aboutPageForm, hero: { ...aboutPageForm.hero, description: e.target.value } })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>
                </div>
              )}

              {/* 2. ENGINEERING METRICS & SLAS */}
              {activeTab === "about-stats" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Section 2: Engineering Metrics & SLAs</h3>
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      4 Engineering Metrics & SLAs
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
                      {aboutPageForm.hero.stats.map((st, i) => (
                        <div key={i} style={{ background: "#FFF", padding: "10px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <input
                            type="text"
                            value={st.value}
                            onChange={(e) => {
                              const updatedStats = [...aboutPageForm.hero.stats];
                              updatedStats[i].value = e.target.value;
                              setAboutPageForm({ ...aboutPageForm, hero: { ...aboutPageForm.hero, stats: updatedStats } });
                            }}
                            style={{ width: "100%", fontWeight: "800", fontSize: "15px", color: "#2563EB", marginBottom: "2px" }}
                          />
                          <input
                            type="text"
                            value={st.label}
                            onChange={(e) => {
                              const updatedStats = [...aboutPageForm.hero.stats];
                              updatedStats[i].label = e.target.value;
                              setAboutPageForm({ ...aboutPageForm, hero: { ...aboutPageForm.hero, stats: updatedStats } });
                            }}
                            style={{ width: "100%", fontWeight: "700", fontSize: "12px", marginBottom: "2px" }}
                          />
                          <input
                            type="text"
                            value={st.desc}
                            onChange={(e) => {
                              const updatedStats = [...aboutPageForm.hero.stats];
                              updatedStats[i].desc = e.target.value;
                              setAboutPageForm({ ...aboutPageForm, hero: { ...aboutPageForm.hero, stats: updatedStats } });
                            }}
                            style={{ width: "100%", fontSize: "11px", color: "#64748B" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. WHO WE ARE & BENCHMARK */}
              {activeTab === "about-partner" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Section 3: Technical Partner vs Agency & Benchmark</h3>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Eyebrow Tag</label>
                      <input
                        type="text"
                        value={aboutPageForm.partner.eyebrow}
                        onChange={(e) => setAboutPageForm({ ...aboutPageForm, partner: { ...aboutPageForm.partner, eyebrow: e.target.value } })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Normal / Highlight</label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          type="text"
                          value={aboutPageForm.partner.headingNormal}
                          onChange={(e) => setAboutPageForm({ ...aboutPageForm, partner: { ...aboutPageForm.partner, headingNormal: e.target.value } })}
                          style={{ width: "50%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                        />
                        <input
                          type="text"
                          value={aboutPageForm.partner.headingHighlight}
                          onChange={(e) => setAboutPageForm({ ...aboutPageForm, partner: { ...aboutPageForm.partner, headingHighlight: e.target.value } })}
                          style={{ width: "50%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Paragraph 1</label>
                      <textarea
                        rows={3}
                        value={aboutPageForm.partner.paragraph1}
                        onChange={(e) => setAboutPageForm({ ...aboutPageForm, partner: { ...aboutPageForm.partner, paragraph1: e.target.value } })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Paragraph 2</label>
                      <textarea
                        rows={3}
                        value={aboutPageForm.partner.paragraph2}
                        onChange={(e) => setAboutPageForm({ ...aboutPageForm, partner: { ...aboutPageForm.partner, paragraph2: e.target.value } })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", background: "#FFF" }}
                      />
                    </div>
                  </div>

                  {/* Pillars */}
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>Benchmark Pillars ({aboutPageForm.partner.pillars.length})</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                      {aboutPageForm.partner.pillars.map((pil, i) => (
                        <div key={i} style={{ background: "#FFF", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <input
                            type="text"
                            value={pil.title}
                            onChange={(e) => {
                              const updated = [...aboutPageForm.partner.pillars];
                              updated[i].title = e.target.value;
                              setAboutPageForm({ ...aboutPageForm, partner: { ...aboutPageForm.partner, pillars: updated } });
                            }}
                            style={{ width: "100%", fontWeight: "700", fontSize: "13px", marginBottom: "4px" }}
                          />
                          <input
                            type="text"
                            value={pil.metric}
                            onChange={(e) => {
                              const updated = [...aboutPageForm.partner.pillars];
                              updated[i].metric = e.target.value;
                              setAboutPageForm({ ...aboutPageForm, partner: { ...aboutPageForm.partner, pillars: updated } });
                            }}
                            style={{ width: "100%", fontSize: "11px", color: "#059669", fontWeight: "700", marginBottom: "4px" }}
                          />
                          <textarea
                            rows={2}
                            value={pil.desc}
                            onChange={(e) => {
                              const updated = [...aboutPageForm.partner.pillars];
                              updated[i].desc = e.target.value;
                              setAboutPageForm({ ...aboutPageForm, partner: { ...aboutPageForm.partner, pillars: updated } });
                            }}
                            style={{ width: "100%", fontSize: "11px", color: "#64748B" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 4. CORE ARCHITECTURAL VALUES */}
              {activeTab === "about-values" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Section 4: Core Architectural Values</h3>
                  </div>
                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>
                      4 Core Architectural Values
                    </label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                      {aboutPageForm.values.items.map((val, idx) => (
                        <div key={idx} style={{ background: "#FFF", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                            <span style={{ fontWeight: "800", color: "#2563EB", fontSize: "11px" }}>VALUE {val.number || `0${idx + 1}`}</span>
                            <input
                              type="text"
                              value={val.subtitle}
                              onChange={(e) => {
                                const updatedItems = [...aboutPageForm.values.items];
                                updatedItems[idx].subtitle = e.target.value;
                                setAboutPageForm({ ...aboutPageForm, values: { ...aboutPageForm.values, items: updatedItems } });
                              }}
                              style={{ fontSize: "11px", color: "#059669", fontWeight: "700", border: "none", textAlign: "right" }}
                            />
                          </div>
                          <input
                            type="text"
                            value={val.title}
                            onChange={(e) => {
                              const updatedItems = [...aboutPageForm.values.items];
                              updatedItems[idx].title = e.target.value;
                              setAboutPageForm({ ...aboutPageForm, values: { ...aboutPageForm.values, items: updatedItems } });
                            }}
                            style={{ width: "100%", fontWeight: "700", fontSize: "13px", marginBottom: "4px" }}
                          />
                          <textarea
                            rows={2}
                            value={val.description}
                            onChange={(e) => {
                              const updatedItems = [...aboutPageForm.values.items];
                              updatedItems[idx].description = e.target.value;
                              setAboutPageForm({ ...aboutPageForm, values: { ...aboutPageForm.values, items: updatedItems } });
                            }}
                            style={{ width: "100%", fontSize: "12px", color: "#475569" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 5. ENGINEERING CAPABILITIES */}
              {activeTab === "about-capabilities" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Section 5: Engineering Capabilities Grid</h3>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Eyebrow Tag</label>
                      <input
                        type="text"
                        value={aboutPageForm.capabilities.eyebrow}
                        onChange={(e) => setAboutPageForm({ ...aboutPageForm, capabilities: { ...aboutPageForm.capabilities, eyebrow: e.target.value } })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Normal / Highlight</label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          type="text"
                          value={aboutPageForm.capabilities.headingNormal}
                          onChange={(e) => setAboutPageForm({ ...aboutPageForm, capabilities: { ...aboutPageForm.capabilities, headingNormal: e.target.value } })}
                          style={{ width: "50%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                        />
                        <input
                          type="text"
                          value={aboutPageForm.capabilities.headingHighlight}
                          onChange={(e) => setAboutPageForm({ ...aboutPageForm, capabilities: { ...aboutPageForm.capabilities, headingHighlight: e.target.value } })}
                          style={{ width: "50%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "12px" }}>6 Capabilities ({aboutPageForm.capabilities.items.length})</label>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                      {aboutPageForm.capabilities.items.map((cap, i) => (
                        <div key={i} style={{ background: "#FFF", padding: "12px", borderRadius: "8px", border: "1px solid #CBD5E1" }}>
                          <input
                            type="text"
                            value={cap.title}
                            onChange={(e) => {
                              const updated = [...aboutPageForm.capabilities.items];
                              updated[i].title = e.target.value;
                              setAboutPageForm({ ...aboutPageForm, capabilities: { ...aboutPageForm.capabilities, items: updated } });
                            }}
                            style={{ width: "100%", fontWeight: "700", fontSize: "13px", marginBottom: "4px" }}
                          />
                          <textarea
                            rows={2}
                            value={cap.desc}
                            onChange={(e) => {
                              const updated = [...aboutPageForm.capabilities.items];
                              updated[i].desc = e.target.value;
                              setAboutPageForm({ ...aboutPageForm, capabilities: { ...aboutPageForm.capabilities, items: updated } });
                            }}
                            style={{ width: "100%", fontSize: "11px", color: "#64748B", marginBottom: "4px" }}
                          />
                          <input
                            type="text"
                            value={cap.tech.join(", ")}
                            onChange={(e) => {
                              const updated = [...aboutPageForm.capabilities.items];
                              updated[i].tech = e.target.value.split(",").map(s => s.trim());
                              setAboutPageForm({ ...aboutPageForm, capabilities: { ...aboutPageForm.capabilities, items: updated } });
                            }}
                            placeholder="Tech tags (comma separated)"
                            style={{ width: "100%", fontSize: "11px", color: "#2563EB" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 6. LET'S BUILD CTA BANNER */}
              {activeTab === "about-cta" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Section 6: Let&apos;s Build CTA Banner</h3>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Eyebrow Tag</label>
                      <input
                        type="text"
                        value={aboutPageForm.cta.eyebrow}
                        onChange={(e) => setAboutPageForm({ ...aboutPageForm, cta: { ...aboutPageForm.cta, eyebrow: e.target.value } })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Heading Normal / Highlight</label>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <input
                          type="text"
                          value={aboutPageForm.cta.headingNormal}
                          onChange={(e) => setAboutPageForm({ ...aboutPageForm, cta: { ...aboutPageForm.cta, headingNormal: e.target.value } })}
                          style={{ width: "50%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                        />
                        <input
                          type="text"
                          value={aboutPageForm.cta.headingHighlight}
                          onChange={(e) => setAboutPageForm({ ...aboutPageForm, cta: { ...aboutPageForm.cta, headingHighlight: e.target.value } })}
                          style={{ width: "50%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>CTA Description</label>
                    <textarea
                      rows={2}
                      value={aboutPageForm.cta.description}
                      onChange={(e) => setAboutPageForm({ ...aboutPageForm, cta: { ...aboutPageForm.cta, description: e.target.value } })}
                      style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                    />
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Button Text</label>
                      <input
                        type="text"
                        value={aboutPageForm.cta.buttonText}
                        onChange={(e) => setAboutPageForm({ ...aboutPageForm, cta: { ...aboutPageForm.cta, buttonText: e.target.value } })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                    <div style={{ background: "#F8FAFC", padding: "16px 20px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                      <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#0F172A", marginBottom: "6px" }}>Button Link</label>
                      <input
                        type="text"
                        value={aboutPageForm.cta.buttonLink}
                        onChange={(e) => setAboutPageForm({ ...aboutPageForm, cta: { ...aboutPageForm.cta, buttonLink: e.target.value } })}
                        style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ⚡ ALL DYNAMIC SERVICES MANAGER */}
              {activeTab === "services-all" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF", padding: "18px 24px", borderRadius: "14px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div>
                      <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Dynamic Services Directory ({dynamicServicesList.length})</h2>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>Manage database-driven services that auto-populate the Navbar Services dropdown and /services/[slug] pages.</p>
                    </div>
                    <button
                      onClick={() => { handleResetServiceForm(); setActiveTab("services-create"); }}
                      style={{ background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)", color: "#FFF", padding: "10px 18px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      ➕ Create New Service
                    </button>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: "14px", border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                      <thead>
                        <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", fontSize: "12px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          <th style={{ padding: "14px 20px" }}>Service Name & Slug</th>
                          <th style={{ padding: "14px 20px" }}>Short Description</th>
                          <th style={{ padding: "14px 20px" }}>Template</th>
                          <th style={{ padding: "14px 20px" }}>Status</th>
                          <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dynamicServicesList.length === 0 ? (
                          <tr>
                            <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#94A3B8", fontSize: "14px" }}>
                              No services found. Click &quot;Create New Service&quot; to add one.
                            </td>
                          </tr>
                        ) : (
                          dynamicServicesList.map((srv: any) => (
                            <tr key={srv._id} style={{ borderBottom: "1px solid #F1F5F9", fontSize: "14px" }}>
                              <td style={{ padding: "16px 20px" }}>
                                <strong style={{ color: "#0F172A", display: "block" }}>{srv.name}</strong>
                                <code style={{ fontSize: "12px", color: "#2563EB", background: "#EFF6FF", padding: "2px 6px", borderRadius: "4px" }}>/services/{srv.slug}</code>
                              </td>
                              <td style={{ padding: "16px 20px", color: "#475569", maxWidth: "300px" }}>
                                <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{srv.shortDescription}</span>
                              </td>
                              <td style={{ padding: "16px 20px" }}>
                                <span style={{ background: srv.template === "ai-custom" ? "#F593E020" : "#F1F5F9", color: srv.template === "ai-custom" ? "#9333EA" : "#475569", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                                  {srv.template || "default"}
                                </span>
                              </td>
                              <td style={{ padding: "16px 20px" }}>
                                <span style={{ background: srv.status === "Published" ? "#DCFCE7" : "#FEF3C7", color: srv.status === "Published" ? "#15803D" : "#B45309", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                                  {srv.status}
                                </span>
                              </td>
                              <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                  <a href={`/services/${srv.slug}`} target="_blank" rel="noreferrer" style={{ background: "#F1F5F9", color: "#334155", padding: "6px 12px", borderRadius: "6px", textDecoration: "none", fontSize: "12px", fontWeight: "700" }}>
                                    👁️ View
                                  </a>
                                  <button onClick={() => handleEditServiceInit(srv)} style={{ background: "#EFF6FF", color: "#2563EB", padding: "6px 12px", borderRadius: "6px", border: "none", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                                    ✏️ Edit
                                  </button>
                                  <button onClick={() => handleDeleteService(srv._id, srv.name)} style={{ background: "#FEF2F2", color: "#DC2626", padding: "6px 12px", borderRadius: "6px", border: "none", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ➕ CREATE / EDIT SERVICE FORM */}
              {activeTab === "services-create" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF", padding: "18px 24px", borderRadius: "14px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div>
                      <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>
                        {editingServiceId ? `Editing Service: ${serviceForm.name}` : "Create New Dynamic Service"}
                      </h2>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>
                        Fill in service detail fields. Published services immediately sync with the Navbar and dynamic route `/services/[slug]`.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={() => setActiveTab("services-all")} style={{ background: "#F1F5F9", color: "#475569", padding: "10px 16px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button onClick={handleSaveService} disabled={isSavingService} style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", color: "#FFF", padding: "10px 20px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
                        {isSavingService ? "Saving..." : editingServiceId ? "💾 Save Changes" : "🚀 Create & Publish Service"}
                      </button>
                    </div>
                  </div>

                  {/* FORM SECTIONS */}
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      {/* Basic Details */}
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Basic Details</h3>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Service Name *</label>
                          <input
                            type="text"
                            value={serviceForm.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                              setServiceForm((prev) => ({ ...prev, name: val, slug: prev.slug ? prev.slug : autoSlug, heroHeading: prev.heroHeading ? prev.heroHeading : val }));
                            }}
                            placeholder="e.g. AI Systems & Automation"
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Slug (URL identifier) *</label>
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid #CBD5E1", borderRadius: "8px", overflow: "hidden", background: "#F8FAFC" }}>
                            <span style={{ padding: "10px 12px", fontSize: "13px", color: "#64748B", borderRight: "1px solid #CBD5E1" }}>/services/</span>
                            <input
                              type="text"
                              value={serviceForm.slug}
                              onChange={(e) => setServiceForm({ ...serviceForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                              placeholder="ai-systems-automation"
                              style={{ width: "100%", padding: "10px 14px", border: "none", fontSize: "14px", background: "#FFF" }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Short Description (Used in Navbar Dropdown & Previews) *</label>
                          <textarea
                            rows={2}
                            value={serviceForm.shortDescription}
                            onChange={(e) => setServiceForm({ ...serviceForm, shortDescription: e.target.value })}
                            placeholder="Briefly describe what this service delivers in 1-2 lines..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Full Overview Description *</label>
                          <textarea
                            rows={4}
                            value={serviceForm.fullDescription}
                            onChange={(e) => setServiceForm({ ...serviceForm, fullDescription: e.target.value })}
                            placeholder="Comprehensive explanation of your engineering offering..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>
                      </div>

                      {/* Hero Section Banner */}
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Hero Banner Settings</h3>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Hero Main Heading</label>
                          <input
                            type="text"
                            value={serviceForm.heroHeading}
                            onChange={(e) => setServiceForm({ ...serviceForm, heroHeading: e.target.value })}
                            placeholder="Headline on the service detail hero..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Hero Subtitle / Description</label>
                          <textarea
                            rows={2}
                            value={serviceForm.heroDescription}
                            onChange={(e) => setServiceForm({ ...serviceForm, heroDescription: e.target.value })}
                            placeholder="Hero subtitle explaining the impact of this service..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Hero Media / Image URL</label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <input
                                  type="text"
                                  value={serviceForm.heroMediaUrl}
                                  onChange={(e) => setServiceForm({ ...serviceForm, heroMediaUrl: e.target.value })}
                                  placeholder="https://images.unsplash.com/..."
                                  style={{ flex: 1, padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                                />
                                <label style={{ background: "#EFF6FF", color: "#2563EB", padding: "10px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", border: "1px solid #BFDBFE", whiteSpace: "nowrap" }}>
                                  📷 Upload Image
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
                                          setServiceForm({ ...serviceForm, heroMediaUrl: data.url });
                                          Swal.fire({ icon: "success", title: "Image Uploaded! 🚀", timer: 1500, showConfirmButton: false });
                                        } else {
                                          Swal.fire("Error", data.message || "Upload failed", "error");
                                        }
                                      } catch {
                                        Swal.fire("Error", "Could not upload image to server.", "error");
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                              {serviceForm.heroMediaUrl && (
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#F8FAFC", padding: "6px 10px", borderRadius: "6px", border: "1px solid #E2E8F0" }}>
                                  <img src={serviceForm.heroMediaUrl} alt="Preview" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                                  <span style={{ fontSize: "11px", color: "#64748B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{serviceForm.heroMediaUrl}</span>
                                  <button
                                    type="button"
                                    onClick={() => setServiceForm({ ...serviceForm, heroMediaUrl: "" })}
                                    style={{ background: "#FEF2F2", color: "#DC2626", border: "none", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                                  >
                                    ✕ Remove
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>CTA Button Text</label>
                            <input
                              type="text"
                              value={serviceForm.ctaText}
                              onChange={(e) => setServiceForm({ ...serviceForm, ctaText: e.target.value })}
                              placeholder="e.g. Start a Conversation"
                              style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* SEO Settings */}
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>SEO Metadata</h3>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>SEO Meta Title</label>
                          <input
                            type="text"
                            value={serviceForm.seoTitle}
                            onChange={(e) => setServiceForm({ ...serviceForm, seoTitle: e.target.value })}
                            placeholder="e.g. Custom AI & Software Engineering Services | TaapTi"
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>SEO Meta Description</label>
                          <textarea
                            rows={2}
                            value={serviceForm.seoDescription}
                            onChange={(e) => setServiceForm({ ...serviceForm, seoDescription: e.target.value })}
                            placeholder="Meta description for search engines..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sidebar Configuration Panel */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Publishing Status</h3>
                        
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Visibility Status</label>
                          <select
                            value={serviceForm.status}
                            onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          >
                            <option value="Published">🟢 Published (Live in Navbar & Route)</option>
                            <option value="Draft">🟡 Draft (Hidden from Public)</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>UI Template Engine</label>
                          <select
                            value={serviceForm.template}
                            onChange={(e) => setServiceForm({ ...serviceForm, template: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          >
                            <option value="default">Default Dynamic Template</option>
                            <option value="ai-custom">AI Custom Service Template</option>
                            <option value="healthcare-custom">Healthcare Custom Service Template</option>
                          </select>
                          <small style={{ display: "block", marginTop: "4px", color: "#64748B", fontSize: "11px" }}>
                            Agency developers can bind custom React templates in <code>ServiceTemplateRenderer.tsx</code>.
                          </small>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Navbar Display Order</label>
                          <input
                            type="number"
                            value={serviceForm.order}
                            onChange={(e) => setServiceForm({ ...serviceForm, order: parseInt(e.target.value) || 1 })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>
                      </div>

                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Quick Actions</h3>
                        <button onClick={handleSaveService} disabled={isSavingService} style={{ width: "100%", background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", color: "#FFF", padding: "12px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
                          {isSavingService ? "Saving..." : editingServiceId ? "💾 Save Changes" : "🚀 Publish Service"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ⚡ ALL DYNAMIC INDUSTRIES MANAGER */}
              {activeTab === "ind-all" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF", padding: "18px 24px", borderRadius: "14px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div>
                      <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Dynamic Industries Directory ({dynamicIndustriesList.length})</h2>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>Manage database-driven industries that auto-populate the Navbar Industries dropdown and /industries/[slug] pages.</p>
                    </div>
                    <button
                      onClick={() => { handleResetIndustryForm(); setActiveTab("ind-create"); }}
                      style={{ background: "linear-gradient(135deg, #059669 0%, #047857 100%)", color: "#FFF", padding: "10px 18px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      ➕ Create New Industry
                    </button>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: "14px", border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                      <thead>
                        <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", fontSize: "12px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          <th style={{ padding: "14px 20px" }}>Industry Name & Slug</th>
                          <th style={{ padding: "14px 20px" }}>Short Description</th>
                          <th style={{ padding: "14px 20px" }}>Template</th>
                          <th style={{ padding: "14px 20px" }}>Status</th>
                          <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dynamicIndustriesList.length === 0 ? (
                          <tr>
                            <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#94A3B8", fontSize: "14px" }}>
                              No industries found. Click &quot;Create New Industry&quot; to add one.
                            </td>
                          </tr>
                        ) : (
                          dynamicIndustriesList.map((ind: any) => (
                            <tr key={ind._id} style={{ borderBottom: "1px solid #F1F5F9", fontSize: "14px" }}>
                              <td style={{ padding: "16px 20px" }}>
                                <strong style={{ color: "#0F172A", display: "block" }}>{ind.name}</strong>
                                <code style={{ fontSize: "12px", color: "#059669", background: "#ECFDF5", padding: "2px 6px", borderRadius: "4px" }}>/industries/{ind.slug}</code>
                              </td>
                              <td style={{ padding: "16px 20px", color: "#475569", maxWidth: "300px" }}>
                                <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ind.shortDescription}</span>
                              </td>
                              <td style={{ padding: "16px 20px" }}>
                                <span style={{ background: ind.template === "healthcare-custom" ? "#ECFDF5" : "#F1F5F9", color: ind.template === "healthcare-custom" ? "#059669" : "#475569", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                                  {ind.template || "default"}
                                </span>
                              </td>
                              <td style={{ padding: "16px 20px" }}>
                                <span style={{ background: ind.status === "Published" ? "#DCFCE7" : "#FEF3C7", color: ind.status === "Published" ? "#15803D" : "#B45309", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                                  {ind.status}
                                </span>
                              </td>
                              <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                  <a href={`/industries/${ind.slug}`} target="_blank" rel="noreferrer" style={{ background: "#F1F5F9", color: "#334155", padding: "6px 12px", borderRadius: "6px", textDecoration: "none", fontSize: "12px", fontWeight: "700" }}>
                                    👁️ View
                                  </a>
                                  <button onClick={() => handleEditIndustryInit(ind)} style={{ background: "#ECFDF5", color: "#059669", padding: "6px 12px", borderRadius: "6px", border: "none", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                                    ✏️ Edit
                                  </button>
                                  <button onClick={() => handleDeleteIndustry(ind._id, ind.name)} style={{ background: "#FEF2F2", color: "#DC2626", padding: "6px 12px", borderRadius: "6px", border: "none", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ➕ CREATE / EDIT INDUSTRY FORM */}
              {activeTab === "ind-create" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF", padding: "18px 24px", borderRadius: "14px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div>
                      <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>
                        {editingIndustryId ? `Editing Industry: ${industryForm.name}` : "Create New Dynamic Industry"}
                      </h2>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>
                        Fill in industry details. Published items instantly update the Navbar and `/industries/[slug]`.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={() => setActiveTab("ind-all")} style={{ background: "#F1F5F9", color: "#475569", padding: "10px 16px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button onClick={handleSaveIndustry} disabled={isSavingIndustry} style={{ background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", color: "#FFF", padding: "10px 20px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
                        {isSavingIndustry ? "Saving..." : editingIndustryId ? "💾 Save Changes" : "🚀 Create & Publish Industry"}
                      </button>
                    </div>
                  </div>

                  {/* FORM SECTIONS */}
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      {/* Basic Details */}
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Basic Details</h3>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Industry Name *</label>
                          <input
                            type="text"
                            value={industryForm.name}
                            onChange={(e) => {
                              const val = e.target.value;
                              const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                              setIndustryForm((prev) => ({ ...prev, name: val, slug: prev.slug ? prev.slug : autoSlug, heroHeading: prev.heroHeading ? prev.heroHeading : val }));
                            }}
                            placeholder="e.g. FinTech & Banking Platforms"
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Slug (URL identifier) *</label>
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid #CBD5E1", borderRadius: "8px", overflow: "hidden", background: "#F8FAFC" }}>
                            <span style={{ padding: "10px 12px", fontSize: "13px", color: "#64748B", borderRight: "1px solid #CBD5E1" }}>/industries/</span>
                            <input
                              type="text"
                              value={industryForm.slug}
                              onChange={(e) => setIndustryForm({ ...industryForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                              placeholder="fintech"
                              style={{ width: "100%", padding: "10px 14px", border: "none", fontSize: "14px", background: "#FFF" }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Short Description (Navbar Dropdown & Previews) *</label>
                          <textarea
                            rows={2}
                            value={industryForm.shortDescription}
                            onChange={(e) => setIndustryForm({ ...industryForm, shortDescription: e.target.value })}
                            placeholder="Briefly describe what this industry sector entails..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Full Overview Description *</label>
                          <textarea
                            rows={4}
                            value={industryForm.fullDescription}
                            onChange={(e) => setIndustryForm({ ...industryForm, fullDescription: e.target.value })}
                            placeholder="Comprehensive explanation of industry architecture and solutions..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>
                      </div>

                      {/* Hero Section Banner */}
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Hero Banner Settings</h3>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Hero Main Heading</label>
                          <input
                            type="text"
                            value={industryForm.heroHeading}
                            onChange={(e) => setIndustryForm({ ...industryForm, heroHeading: e.target.value })}
                            placeholder="Headline on the industry detail hero..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Hero Subtitle / Description</label>
                          <textarea
                            rows={2}
                            value={industryForm.heroDescription}
                            onChange={(e) => setIndustryForm({ ...industryForm, heroDescription: e.target.value })}
                            placeholder="Hero subtitle explaining industry impact..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Hero Media / Image URL</label>
                            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <input
                                  type="text"
                                  value={industryForm.heroMediaUrl}
                                  onChange={(e) => setIndustryForm({ ...industryForm, heroMediaUrl: e.target.value })}
                                  placeholder="https://images.unsplash.com/..."
                                  style={{ flex: 1, padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                                />
                                <label style={{ background: "#EFF6FF", color: "#2563EB", padding: "10px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", border: "1px solid #BFDBFE", whiteSpace: "nowrap" }}>
                                  📷 Upload Image
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
                                          setIndustryForm({ ...industryForm, heroMediaUrl: data.url });
                                          Swal.fire({ icon: "success", title: "Image Uploaded! 🚀", timer: 1500, showConfirmButton: false });
                                        } else {
                                          Swal.fire("Error", data.message || "Upload failed", "error");
                                        }
                                      } catch {
                                        Swal.fire("Error", "Could not upload image to server.", "error");
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                              {industryForm.heroMediaUrl && (
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#F8FAFC", padding: "6px 10px", borderRadius: "6px", border: "1px solid #E2E8F0" }}>
                                  <img src={industryForm.heroMediaUrl} alt="Preview" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                                  <span style={{ fontSize: "11px", color: "#64748B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{industryForm.heroMediaUrl}</span>
                                  <button
                                    type="button"
                                    onClick={() => setIndustryForm({ ...industryForm, heroMediaUrl: "" })}
                                    style={{ background: "#FEF2F2", color: "#DC2626", border: "none", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                                  >
                                    ✕ Remove
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>CTA Button Text</label>
                            <input
                              type="text"
                              value={industryForm.ctaText}
                              onChange={(e) => setIndustryForm({ ...industryForm, ctaText: e.target.value })}
                              placeholder="e.g. Consult Industry Experts"
                              style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* SEO Settings */}
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>SEO Metadata</h3>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>SEO Meta Title</label>
                          <input
                            type="text"
                            value={industryForm.seoTitle}
                            onChange={(e) => setIndustryForm({ ...industryForm, seoTitle: e.target.value })}
                            placeholder="e.g. FinTech & Digital Banking Software | TaapTi Technologies"
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>SEO Meta Description</label>
                          <textarea
                            rows={2}
                            value={industryForm.seoDescription}
                            onChange={(e) => setIndustryForm({ ...industryForm, seoDescription: e.target.value })}
                            placeholder="Meta description for search engines..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Sidebar Configuration Panel */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Publishing Status</h3>
                        
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Visibility Status</label>
                          <select
                            value={industryForm.status}
                            onChange={(e) => setIndustryForm({ ...industryForm, status: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          >
                            <option value="Published">🟢 Published (Live in Navbar & Route)</option>
                            <option value="Draft">🟡 Draft (Hidden from Public)</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>UI Template Engine</label>
                          <select
                            value={industryForm.template}
                            onChange={(e) => setIndustryForm({ ...industryForm, template: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          >
                            <option value="default">Default Dynamic Template</option>
                            <option value="healthcare-custom">Healthcare Custom Template</option>
                          </select>
                          <small style={{ display: "block", marginTop: "4px", color: "#64748B", fontSize: "11px" }}>
                            Agency developers can bind custom React templates in <code>IndustryTemplateRenderer.tsx</code>.
                          </small>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Navbar Display Order</label>
                          <input
                            type="number"
                            value={industryForm.order}
                            onChange={(e) => setIndustryForm({ ...industryForm, order: parseInt(e.target.value) || 1 })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>
                      </div>

                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Quick Actions</h3>
                        <button onClick={handleSaveIndustry} disabled={isSavingIndustry} style={{ width: "100%", background: "linear-gradient(135deg, #10B981 0%, #059669 100%)", color: "#FFF", padding: "12px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
                          {isSavingIndustry ? "Saving..." : editingIndustryId ? "💾 Save Changes" : "🚀 Publish Industry"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ⚡ ALL DYNAMIC CASE STUDIES MANAGER */}
              {activeTab === "cs-all" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF", padding: "18px 24px", borderRadius: "14px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div>
                      <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Dynamic Case Studies Directory ({dynamicProjectsList.length})</h2>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>Manage database-driven case study projects live on website and `/case-studies/[slug]`.</p>
                    </div>
                    <button
                      onClick={() => { handleResetProjectForm(); setActiveTab("cs-create"); }}
                      style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)", color: "#FFF", padding: "10px 18px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" }}
                    >
                      ➕ Create New Case Study
                    </button>
                  </div>

                  <div style={{ background: "#FFF", borderRadius: "14px", border: "1px solid #E2E8F0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                      <thead>
                        <tr style={{ background: "#F8FAFC", borderBottom: "1px solid #E2E8F0", fontSize: "12px", color: "#475569", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          <th style={{ padding: "14px 20px" }}>Project Title & Slug</th>
                          <th style={{ padding: "14px 20px" }}>Industry Category</th>
                          <th style={{ padding: "14px 20px" }}>Summary</th>
                          <th style={{ padding: "14px 20px" }}>Status</th>
                          <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dynamicProjectsList.length === 0 ? (
                          <tr>
                            <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "#94A3B8", fontSize: "14px" }}>
                              No case studies found. Click &quot;Create New Case Study&quot; to add one.
                            </td>
                          </tr>
                        ) : (
                          dynamicProjectsList.map((p: any) => (
                            <tr key={p._id} style={{ borderBottom: "1px solid #F1F5F9", fontSize: "14px" }}>
                              <td style={{ padding: "16px 20px" }}>
                                <strong style={{ color: "#0F172A", display: "block" }}>{p.title}</strong>
                                <code style={{ fontSize: "12px", color: "#7C3AED", background: "#F3E8FF", padding: "2px 6px", borderRadius: "4px" }}>/case-studies/{p.slug}</code>
                              </td>
                              <td style={{ padding: "16px 20px" }}>
                                <span style={{ background: "#EFF6FF", color: "#2563EB", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                                  {p.category}
                                </span>
                              </td>
                              <td style={{ padding: "16px 20px", color: "#475569", maxWidth: "280px" }}>
                                <span style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{p.summary}</span>
                              </td>
                              <td style={{ padding: "16px 20px" }}>
                                <span style={{ background: p.status === "Published" ? "#DCFCE7" : "#FEF3C7", color: p.status === "Published" ? "#15803D" : "#B45309", padding: "4px 10px", borderRadius: "20px", fontSize: "12px", fontWeight: "700" }}>
                                  {p.status}
                                </span>
                              </td>
                              <td style={{ padding: "16px 20px", textAlign: "right" }}>
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                                  <a href={`/case-studies/${p.slug}`} target="_blank" rel="noreferrer" style={{ background: "#F1F5F9", color: "#334155", padding: "6px 12px", borderRadius: "6px", textDecoration: "none", fontSize: "12px", fontWeight: "700" }}>
                                    👁️ View
                                  </a>
                                  <button onClick={() => handleEditProjectInit(p)} style={{ background: "#F3E8FF", color: "#7C3AED", padding: "6px 12px", borderRadius: "6px", border: "none", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                                    ✏️ Edit
                                  </button>
                                  <button onClick={() => handleDeleteProject(p._id, p.title)} style={{ background: "#FEF2F2", color: "#DC2626", padding: "6px 12px", borderRadius: "6px", border: "none", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                                    🗑️ Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ➕ CREATE / EDIT CASE STUDY FORM */}
              {activeTab === "cs-create" && (
                <div style={{ paddingTop: "20px", display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FFF", padding: "18px 24px", borderRadius: "14px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div>
                      <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>
                        {editingProjectId ? `Editing Case Study: ${projectForm.title}` : "Create New Dynamic Case Study"}
                      </h2>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>
                        Fill in case study details. Published items instantly update website listings and `/case-studies/[slug]`.
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <button onClick={() => setActiveTab("cs-all")} style={{ background: "#F1F5F9", color: "#475569", padding: "10px 16px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
                        Cancel
                      </button>
                      <button onClick={handleSaveProject} disabled={isSavingProject} style={{ background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)", color: "#FFF", padding: "10px 20px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}>
                        {isSavingProject ? "Saving..." : editingProjectId ? "💾 Save Changes" : "🚀 Create & Publish Case Study"}
                      </button>
                    </div>
                  </div>

                  {/* FORM SECTIONS */}
                  <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      {/* Basic Details */}
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Basic Details</h3>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Project Title *</label>
                          <input
                            type="text"
                            value={projectForm.title}
                            onChange={(e) => {
                              const val = e.target.value;
                              const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
                              setProjectForm((prev) => ({ ...prev, title: val, slug: prev.slug ? prev.slug : autoSlug }));
                            }}
                            placeholder="e.g. Building a Scalable Digital Platform"
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Slug (URL identifier) *</label>
                          <div style={{ display: "flex", alignItems: "center", border: "1px solid #CBD5E1", borderRadius: "8px", overflow: "hidden", background: "#F8FAFC" }}>
                            <span style={{ padding: "10px 12px", fontSize: "13px", color: "#64748B", borderRight: "1px solid #CBD5E1" }}>/case-studies/</span>
                            <input
                              type="text"
                              value={projectForm.slug}
                              onChange={(e) => setProjectForm({ ...projectForm, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "") })}
                              placeholder="scalable-digital-platform"
                              style={{ width: "100%", padding: "10px 14px", border: "none", fontSize: "14px", background: "#FFF" }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Industry Category * (Dynamic from your Industries)</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          >
                            {dynamicIndustriesList.length === 0 ? (
                              <option value="FinTech & Digital Banking">FinTech & Digital Banking</option>
                            ) : (
                              dynamicIndustriesList.map((ind: any) => (
                                <option key={ind._id} value={ind.name}>{ind.name}</option>
                              ))
                            )}
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Summary (Brief Overview) *</label>
                          <textarea
                            rows={2}
                            value={projectForm.summary}
                            onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                            placeholder="Brief 1-2 line summary for card listings..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>
                      </div>

                      {/* Project Breakdown */}
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Project Narrative Breakdown</h3>
                        
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Business Context *</label>
                          <textarea
                            rows={3}
                            value={projectForm.context}
                            onChange={(e) => setProjectForm({ ...projectForm, context: e.target.value })}
                            placeholder="Why did the client need this project?"
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>The Challenge *</label>
                          <textarea
                            rows={3}
                            value={projectForm.challenge}
                            onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                            placeholder="What technical/operational bottleneck did you face?"
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>The Solution *</label>
                          <textarea
                            rows={3}
                            value={projectForm.solution}
                            onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                            placeholder="How did TaapTi engineer the solution?"
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Project Outcome *</label>
                          <textarea
                            rows={3}
                            value={projectForm.outcome}
                            onChange={(e) => setProjectForm({ ...projectForm, outcome: e.target.value })}
                            placeholder="Measurable business value and results achieved..."
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>
                      </div>

                      {/* Image Upload */}
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Featured Card Image</h3>
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Card Cover Image URL</label>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                              <input
                                type="text"
                                value={projectForm.image}
                                onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                                placeholder="https://images.unsplash.com/..."
                                style={{ flex: 1, padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                              />
                              <label style={{ background: "#EFF6FF", color: "#2563EB", padding: "10px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", border: "1px solid #BFDBFE", whiteSpace: "nowrap" }}>
                                📷 Upload Image
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
                                        setProjectForm({ ...projectForm, image: data.url });
                                        Swal.fire({ icon: "success", title: "Image Uploaded! 🚀", timer: 1500, showConfirmButton: false });
                                      } else {
                                        Swal.fire("Error", data.message || "Upload failed", "error");
                                      }
                                    } catch {
                                      Swal.fire("Error", "Could not upload image to server.", "error");
                                    }
                                  }}
                                />
                              </label>
                            </div>
                            {projectForm.image && (
                              <div style={{ display: "flex", alignItems: "center", gap: "10px", background: "#F8FAFC", padding: "6px 10px", borderRadius: "6px", border: "1px solid #E2E8F0" }}>
                                <img src={projectForm.image} alt="Preview" style={{ width: "40px", height: "40px", objectFit: "cover", borderRadius: "4px" }} />
                                <span style={{ fontSize: "11px", color: "#64748B", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", flex: 1 }}>{projectForm.image}</span>
                                <button
                                  type="button"
                                  onClick={() => setProjectForm({ ...projectForm, image: "" })}
                                  style={{ background: "#FEF2F2", color: "#DC2626", border: "none", padding: "4px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                                >
                                  ✕ Remove
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sidebar Configuration Panel */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "14px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Publishing Status</h3>
                        
                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Visibility Status</label>
                          <select
                            value={projectForm.status}
                            onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          >
                            <option value="Published">🟢 Published (Live on Site & Route)</option>
                            <option value="Draft">🟡 Draft (Hidden from Public)</option>
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Associated Service * (Dynamic from your Services)</label>
                          <select
                            value={projectForm.serviceName}
                            onChange={(e) => {
                              const selectedSrv = dynamicServicesList.find((s: any) => s.name === e.target.value);
                              setProjectForm({
                                ...projectForm,
                                serviceName: e.target.value,
                                serviceSlug: selectedSrv ? selectedSrv.slug : "software-engineering",
                              });
                            }}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          >
                            {dynamicServicesList.length === 0 ? (
                              <option value="Software Engineering">Software Engineering</option>
                            ) : (
                              dynamicServicesList.map((srv: any) => (
                                <option key={srv._id} value={srv.name}>{srv.name}</option>
                              ))
                            )}
                          </select>
                        </div>

                        <div>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "4px" }}>Display Order</label>
                          <input
                            type="number"
                            value={projectForm.order}
                            onChange={(e) => setProjectForm({ ...projectForm, order: parseInt(e.target.value) || 1 })}
                            style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "14px", background: "#FFF" }}
                          />
                        </div>
                      </div>

                      <div style={{ background: "#FFF", padding: "20px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "10px" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: "800", color: "#0F172A", margin: 0, textTransform: "uppercase", letterSpacing: "0.05em" }}>Quick Actions</h3>
                        <button onClick={handleSaveProject} disabled={isSavingProject} style={{ width: "100%", background: "linear-gradient(135deg, #7C3AED 0%, #6D28D9 100%)", color: "#FFF", padding: "12px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
                          {isSavingProject ? "Saving..." : editingProjectId ? "💾 Save Changes" : "🚀 Publish Case Study"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* 6. CONTACT US PAGE CMS EDITOR TAB */}
              {/* ========================================================================= */}
              {activeTab === "contact-page-cms" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "10px" }}>
                  <div style={{ background: "#FFF", padding: "20px 24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Contact Us Page CMS</h2>
                    <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>
                      Update contact details, phone number, support email, office location, SLA response target, and trust badge live on <code>/contact</code>.
                    </p>
                  </div>

                  {/* 1. Direct Contact Details (Phone, Email, Address, SLA) */}
                  <div style={{ background: "#FFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #F1F5F9", paddingBottom: "12px" }}>
                      <span style={{ background: "#DCFCE7", color: "#166534", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "14px" }}>📞</span>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Direct Contact Information</h3>
                        <span style={{ fontSize: "12px", color: "#64748B" }}>Updates the direct contact cards displayed to prospective clients.</span>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Phone / Mobile Number *</label>
                        <input
                          type="text"
                          value={contactPageForm.phone}
                          onChange={(e) => setContactPageForm({ ...contactPageForm, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Primary Support Email *</label>
                        <input
                          type="email"
                          value={contactPageForm.email}
                          onChange={(e) => setContactPageForm({ ...contactPageForm, email: e.target.value })}
                          placeholder="hello@taapti.com"
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Office Location / Address *</label>
                        <input
                          type="text"
                          value={contactPageForm.address}
                          onChange={(e) => setContactPageForm({ ...contactPageForm, address: e.target.value })}
                          placeholder="Surat, Gujarat, India"
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>

                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>SLA Target Response Time *</label>
                        <input
                          type="text"
                          value={contactPageForm.slaResponseTime}
                          onChange={(e) => setContactPageForm({ ...contactPageForm, slaResponseTime: e.target.value })}
                          placeholder="Under 2 Hours (Mon - Sat)"
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Hero Banner Content */}
                  <div style={{ background: "#FFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #F1F5F9", paddingBottom: "12px" }}>
                      <span style={{ background: "#E0F2FE", color: "#0369A1", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "14px" }}>💬</span>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Hero Banner Texts</h3>
                        <span style={{ fontSize: "12px", color: "#64748B" }}>Header text & descriptions for top banner on <code>/contact</code> page.</span>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Eyebrow Badge Text</label>
                        <input
                          type="text"
                          value={contactPageForm.heroBadge}
                          onChange={(e) => setContactPageForm({ ...contactPageForm, heroBadge: e.target.value })}
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Title Normal Text</label>
                        <input
                          type="text"
                          value={contactPageForm.heroTitleNormal}
                          onChange={(e) => setContactPageForm({ ...contactPageForm, heroTitleNormal: e.target.value })}
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Title Highlight Text (Green Gradient)</label>
                        <input
                          type="text"
                          value={contactPageForm.heroTitleHighlight}
                          onChange={(e) => setContactPageForm({ ...contactPageForm, heroTitleHighlight: e.target.value })}
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Hero Description Paragraph</label>
                      <textarea
                        rows={3}
                        value={contactPageForm.heroDescription}
                        onChange={(e) => setContactPageForm({ ...contactPageForm, heroDescription: e.target.value })}
                        style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                      />
                    </div>
                  </div>

                  {/* 3. Trust Guarantee Badge */}
                  <div style={{ background: "#FFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #F1F5F9", paddingBottom: "12px" }}>
                      <span style={{ background: "#FEF3C7", color: "#92400E", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "14px" }}>🛡️</span>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Trust Guarantee Badge</h3>
                        <span style={{ fontSize: "12px", color: "#64748B" }}>Bottom banner guarantee statement.</span>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Trust / NDA Statement</label>
                      <input
                        type="text"
                        value={contactPageForm.trustBadgeText}
                        onChange={(e) => setContactPageForm({ ...contactPageForm, trustBadgeText: e.target.value })}
                        style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                      />
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={handleSaveContactPage}
                      disabled={isSavingContactPage}
                      style={{
                        background: "linear-gradient(135deg, #00875A 0%, #006644 100%)",
                        color: "#FFF",
                        padding: "12px 28px",
                        borderRadius: "10px",
                        border: "none",
                        fontWeight: "700",
                        fontSize: "15px",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(0, 135, 90, 0.25)"
                      }}
                    >
                      {isSavingContactPage ? "Publishing Changes..." : "Publish Contact Page Changes"}
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* CAREERS PAGE SECTIONS CMS EDITOR TAB */}
              {/* ========================================================================= */}
              {(activeTab === "careers-page-cms" || activeTab === "careers-page-hero" || activeTab === "careers-page-benefits" || activeTab === "careers-page-hiring") && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "10px" }}>
                  <div style={{ background: "#FFF", padding: "20px 24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Careers Page Sections CMS</h2>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>
                        Update top hero banner, perks & benefits, and hiring process steps live on <code>/careers</code>.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveCareersPage}
                      disabled={isSavingCareersPage}
                      style={{
                        background: "linear-gradient(135deg, #00875A 0%, #006644 100%)",
                        color: "#FFF",
                        padding: "11px 22px",
                        borderRadius: "10px",
                        border: "none",
                        fontWeight: "700",
                        fontSize: "14px",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(0, 135, 90, 0.25)"
                      }}
                    >
                      {isSavingCareersPage ? "Saving Changes..." : "💾 Publish Careers Page Live"}
                    </button>
                  </div>

                  {/* 1. Hero Banner Content */}
                  <div style={{ background: "#FFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #F1F5F9", paddingBottom: "12px" }}>
                      <span style={{ background: "#E3FCEF", color: "#00875A", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "14px" }}>🚀</span>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Section 1: Hero Banner & Tagline</h3>
                        <span style={{ fontSize: "12px", color: "#64748B" }}>Header badge, headline, and subtitle paragraph.</span>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Eyebrow Badge Text</label>
                        <input
                          type="text"
                          value={careersPageForm.heroBadge}
                          onChange={(e) => setCareersPageForm({ ...careersPageForm, heroBadge: e.target.value })}
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Title Normal Line</label>
                        <input
                          type="text"
                          value={careersPageForm.heroTitleNormal}
                          onChange={(e) => setCareersPageForm({ ...careersPageForm, heroTitleNormal: e.target.value })}
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Title Highlight Line (Navy/Green)</label>
                        <input
                          type="text"
                          value={careersPageForm.heroTitleHighlight}
                          onChange={(e) => setCareersPageForm({ ...careersPageForm, heroTitleHighlight: e.target.value })}
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Hero Description Paragraph</label>
                      <textarea
                        rows={3}
                        value={careersPageForm.heroDescription}
                        onChange={(e) => setCareersPageForm({ ...careersPageForm, heroDescription: e.target.value })}
                        style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                      />
                    </div>
                  </div>

                  {/* 2. Perks & Benefits Cards */}
                  <div style={{ background: "#FFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #F1F5F9", paddingBottom: "12px" }}>
                      <span style={{ background: "#DCFCE7", color: "#166534", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "14px" }}>🎁</span>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Section 2: Perks & Benefits Cards ({careersPageForm.benefitsList.length})</h3>
                        <span style={{ fontSize: "12px", color: "#64748B" }}>Edit reasons why engineers thrive at Taapti.</span>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                      {careersPageForm.benefitsList.map((ben, idx) => (
                        <div key={idx} style={{ background: "#F8FAFC", padding: "14px", borderRadius: "12px", border: "1px solid #CBD5E1", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: "12px", fontWeight: "800", color: "#00875A" }}>BENEFIT {ben.number || `0${idx + 1}`}</span>
                            <input
                              type="text"
                              placeholder="Subtitle (e.g. Real Scale & Impact)"
                              value={ben.subtitle}
                              onChange={(e) => {
                                const updated = [...careersPageForm.benefitsList];
                                updated[idx] = { ...updated[idx], subtitle: e.target.value };
                                setCareersPageForm({ ...careersPageForm, benefitsList: updated });
                              }}
                              style={{ padding: "4px 8px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "11px", fontWeight: "700" }}
                            />
                          </div>

                          <input
                            type="text"
                            placeholder="Title"
                            value={ben.title}
                            onChange={(e) => {
                              const updated = [...careersPageForm.benefitsList];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setCareersPageForm({ ...careersPageForm, benefitsList: updated });
                            }}
                            style={{ width: "100%", padding: "8px 10px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", fontWeight: "800" }}
                          />

                          <textarea
                            rows={2}
                            placeholder="Description"
                            value={ben.description}
                            onChange={(e) => {
                              const updated = [...careersPageForm.benefitsList];
                              updated[idx] = { ...updated[idx], description: e.target.value };
                              setCareersPageForm({ ...careersPageForm, benefitsList: updated });
                            }}
                            style={{ width: "100%", padding: "8px 10px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "12px" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Hiring Process Steps */}
                  <div style={{ background: "#FFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #F1F5F9", paddingBottom: "12px" }}>
                      <span style={{ background: "#F3E8FF", color: "#9333EA", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800", fontSize: "14px" }}>🎯</span>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Section 3: How We Hire Process ({careersPageForm.hiringSteps.length} Steps)</h3>
                        <span style={{ fontSize: "12px", color: "#64748B" }}>Edit candidate screening and interview workflow steps.</span>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                      {careersPageForm.hiringSteps.map((stepItem, idx) => (
                        <div key={idx} style={{ background: "#F8FAFC", padding: "14px", borderRadius: "12px", border: "1px solid #CBD5E1", display: "flex", flexDirection: "column", gap: "8px" }}>
                          <span style={{ fontSize: "12px", fontWeight: "800", color: "#9333EA" }}>STEP {stepItem.step || `0${idx + 1}`}</span>

                          <input
                            type="text"
                            placeholder="Step Title"
                            value={stepItem.title}
                            onChange={(e) => {
                              const updated = [...careersPageForm.hiringSteps];
                              updated[idx] = { ...updated[idx], title: e.target.value };
                              setCareersPageForm({ ...careersPageForm, hiringSteps: updated });
                            }}
                            style={{ width: "100%", padding: "8px 10px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", fontWeight: "800" }}
                          />

                          <textarea
                            rows={2}
                            placeholder="Step Description"
                            value={stepItem.desc}
                            onChange={(e) => {
                              const updated = [...careersPageForm.hiringSteps];
                              updated[idx] = { ...updated[idx], desc: e.target.value };
                              setCareersPageForm({ ...careersPageForm, hiringSteps: updated });
                            }}
                            style={{ width: "100%", padding: "8px 10px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "12px" }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* ========================================================================= */}
              {/* GENERAL SETTINGS TAB: NAVBAR & FOOTER MANAGEMENT */}
              {/* ========================================================================= */}
              {activeTab === "settings" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "10px" }}>
                  <div style={{ background: "#FFF", padding: "20px 24px", borderRadius: "16px", border: "1px solid #E2E8F0", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: 0 }}>General Settings: Navbar & Footer CMS</h2>
                    <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>
                      Update website logo, re-order menu links (drag/move home, about, services, etc.), and customize footer copyright & social handles.
                    </p>
                  </div>

                  {/* 2. Navigation Menu Order & Swap Controls */}
                  <div style={{ background: "#FFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #F1F5F9", paddingBottom: "12px" }}>
                      <span style={{ background: "#E0F2FE", color: "#0369A1", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
                      </span>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Navbar Navigation Menu Links & Order</h3>
                        <span style={{ fontSize: "12px", color: "#64748B" }}>Use ▲ / ▼ buttons to reorder links (Home, Services, Case Studies, About, Contact).</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                      {[
                        { label: "Home", path: "/", order: 1 },
                        { label: "Services", path: "/services", order: 2 },
                        { label: "Case Studies", path: "/case-studies", order: 3 },
                        { label: "About Us", path: "/about", order: 4 },
                        { label: "Contact Us", path: "/contact", order: 5 },
                      ].map((link, idx) => (
                        <div key={idx} style={{ display: "flex", alignItems: "center", gap: "12px", background: "#F8FAFC", padding: "12px 16px", borderRadius: "10px", border: "1px solid #E2E8F0" }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                            <button type="button" title="Move Up" style={{ background: "#E2E8F0", border: "none", borderRadius: "4px", padding: "2px 6px", fontSize: "10px", cursor: "pointer", fontWeight: "700" }}>▲</button>
                            <button type="button" title="Move Down" style={{ background: "#E2E8F0", border: "none", borderRadius: "4px", padding: "2px 6px", fontSize: "10px", cursor: "pointer", fontWeight: "700" }}>▼</button>
                          </div>
                          <span style={{ fontSize: "12px", fontWeight: "800", background: "#E0F2FE", color: "#0369A1", padding: "4px 8px", borderRadius: "6px" }}>Pos #{link.order}</span>
                          <input type="text" defaultValue={link.label} style={{ flex: 1, padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px" }} />
                          <input type="text" defaultValue={link.path} style={{ flex: 1, padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", color: "#64748B" }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 3. Footer Content & Copyright Settings */}
                  <div style={{ background: "#FFF", padding: "24px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "18px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #F1F5F9", paddingBottom: "12px" }}>
                      <span style={{ background: "#FEF3C7", color: "#92400E", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
                      </span>
                      <div>
                        <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Footer Section CMS</h3>
                        <span style={{ fontSize: "12px", color: "#64748B" }}>Update footer tagline, email link, and copyright notice.</span>
                      </div>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Footer Tagline Text</label>
                      <input
                        type="text"
                        defaultValue="Software engineering and AI solutions for ambitious businesses."
                        style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                      />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Footer Contact Email</label>
                        <input
                          type="text"
                          defaultValue="hello@taapti.com"
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#475569", marginBottom: "6px" }}>Copyright Text</label>
                        <input
                          type="text"
                          defaultValue="© 2026 Taapti Technologies. All rights reserved."
                          style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={() => Swal.fire({ icon: "success", title: "General Settings Published!", text: "Logo, Navbar & Footer updates live!", timer: 2000, showConfirmButton: false })}
                      style={{
                        background: "linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)",
                        color: "#FFF",
                        padding: "12px 28px",
                        borderRadius: "10px",
                        border: "none",
                        fontWeight: "700",
                        fontSize: "15px",
                        cursor: "pointer",
                        boxShadow: "0 4px 14px rgba(37, 99, 235, 0.25)"
                      }}
                    >
                      Save & Publish All Settings
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* BLOG ARTICLES MANAGEMENT CMS TAB */}
              {/* ========================================================================= */}
              {(activeTab === "blog-cms" || activeTab === "blog-all" || activeTab === "blog-create" || activeTab === "blog-categories") && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "10px" }}>
                  {/* Dynamic Header Bar for Articles vs Categories */}
                  <div style={{ background: "#FFF", padding: "20px 24px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div>
                      <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                        <span>
                          {activeTab === "blog-categories"
                            ? `Blog Categories Manager (${blogCategories.length})`
                            : `Blog Articles & Insights (${blogsList.length})`}
                        </span>
                      </h2>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>
                        {activeTab === "blog-categories"
                          ? "Add or remove blog categories. Categories added here will automatically appear in the blog post creation form."
                          : "Manage blog posts, draft articles, rich text ReactQuill content formatting, and cover/background images."}
                      </p>
                    </div>

                    {activeTab !== "blog-categories" && (
                      <button
                        onClick={handleOpenBlogCreateModal}
                        style={{
                          background: "linear-gradient(135deg, #00875A 0%, #006644 100%)",
                          color: "#FFF",
                          padding: "11px 22px",
                          borderRadius: "10px",
                          border: "none",
                          fontWeight: "700",
                          fontSize: "14px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          boxShadow: "0 4px 14px rgba(0, 135, 90, 0.25)"
                        }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                        Add New Blog
                      </button>
                    )}
                  </div>

                  {/* CATEGORIES MANAGEMENT VIEW OR ARTICLES GRID */}
                  {activeTab === "blog-categories" ? (
                    <div style={{ background: "#FFF", padding: "28px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", flexDirection: "column", gap: "20px" }}>
                      <div>
                        <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#0F172A", margin: 0 }}>Add New Blog Category</h3>
                        <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>Create new categories to organize your blog posts. Every category added below will be instantly available in the blog modal dropdown.</p>
                      </div>

                      <div style={{ display: "flex", gap: "12px", maxWidth: "560px" }}>
                        <input
                          type="text"
                          placeholder="e.g. Artificial Intelligence, Cloud Architecture..."
                          value={newCatInput}
                          onChange={(e) => setNewCatInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); } }}
                          style={{ flex: 1, padding: "11px 16px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px", background: "#FFF" }}
                        />
                        <button
                          type="button"
                          onClick={handleAddCategory}
                          style={{ background: "#00875A", color: "#FFF", padding: "11px 24px", borderRadius: "10px", border: "none", fontWeight: "700", cursor: "pointer", fontSize: "14px", boxShadow: "0 4px 12px rgba(0, 135, 90, 0.2)" }}
                        >
                          + Save Category
                        </button>
                      </div>

                      <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: "20px", marginTop: "10px" }}>
                        <h4 style={{ fontSize: "14px", fontWeight: "800", color: "#334155", margin: "0 0 14px 0" }}>Active Categories ({blogCategories.length})</h4>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
                          {blogCategories.map((cat, idx) => (
                            <div key={idx} style={{ background: "#F8FAFC", color: "#0F172A", padding: "10px 18px", borderRadius: "10px", border: "1px solid #E2E8F0", fontSize: "13.5px", fontWeight: "700", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 1px 2px rgba(0,0,0,0.03)" }}>
                              <span>📁 {cat}</span>
                              <button
                                type="button"
                                title="Delete Category"
                                onClick={() => {
                                  setBlogCategories((prev) => prev.filter((_, i) => i !== idx));
                                  Swal.fire({ icon: "success", title: "Category Removed", timer: 1200, showConfirmButton: false });
                                }}
                                style={{ background: "#FEF2F2", border: "1px solid #FECACA", color: "#DC2626", borderRadius: "6px", width: "22px", height: "22px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontWeight: "800", fontSize: "11px" }}
                              >
                                ✕
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Blog Articles Grid / List */
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
                    {blogsList.length === 0 ? (
                      <div style={{ gridColumn: "1 / -1", background: "#FFF", padding: "48px", borderRadius: "16px", border: "1px dashed #CBD5E1", textAlign: "center" }}>
                        <div style={{ fontSize: "40px", marginBottom: "12px" }}>📝</div>
                        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1E293B", margin: 0 }}>No Blog Posts Created Yet</h3>
                        <p style={{ fontSize: "13px", color: "#64748B", margin: "6px 0 16px 0" }}>Click "+ Add New Blog" button above to publish your first blog post using TipTap editor.</p>
                        <button
                          onClick={handleOpenBlogCreateModal}
                          style={{ background: "#00875A", color: "#FFF", padding: "9px 18px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}
                        >
                          + Add New Blog Post
                        </button>
                      </div>
                    ) : (
                      blogsList.map((blog) => (
                        <div key={blog._id} style={{ background: "#FFF", borderRadius: "16px", border: "1px solid #E2E8F0", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
                          {/* Cover Image Preview */}
                          <div style={{ height: "180px", background: "#F1F5F9", position: "relative", overflow: "hidden" }}>
                            {blog.coverImage ? (
                              <img src={blog.coverImage} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            ) : (
                              <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#94A3B8", fontSize: "13px", fontWeight: "600" }}>
                                No Cover Image
                              </div>
                            )}
                            <span style={{ position: "absolute", top: "12px", right: "12px", background: blog.status === "Published" ? "#DCFCE7" : "#FEF3C7", color: blog.status === "Published" ? "#166534" : "#92400E", fontSize: "11px", fontWeight: "800", padding: "4px 10px", borderRadius: "99px", border: blog.status === "Published" ? "1px solid #86EFAC" : "1px solid #FDE68A" }}>
                              {blog.status || "Published"}
                            </span>
                            {blog.category && (
                              <span style={{ position: "absolute", bottom: "12px", left: "12px", background: "rgba(15, 23, 42, 0.8)", color: "#FFF", fontSize: "11px", fontWeight: "700", padding: "4px 10px", borderRadius: "6px", backdropFilter: "blur(4px)" }}>
                                {blog.category}
                              </span>
                            )}
                          </div>

                          {/* Details */}
                          <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column", gap: "10px" }}>
                            <h3 style={{ fontSize: "16px", fontWeight: "800", color: "#0F172A", margin: 0, lineHeight: "1.3" }}>
                              {blog.title}
                            </h3>
                            <p style={{ fontSize: "13px", color: "#64748B", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.5" }}>
                              {blog.summary || "No summary provided."}
                            </p>

                            <div style={{ marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                {blog.authorAvatar ? (
                                  <img src={blog.authorAvatar} alt={blog.authorName} style={{ width: "26px", height: "26px", borderRadius: "50%", objectFit: "cover" }} />
                                ) : (
                                  <div style={{ width: "26px", height: "26px", borderRadius: "50%", background: "#E0F2FE", color: "#0369A1", fontSize: "11px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {(blog.authorName || "A").charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <span style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>{blog.authorName || "Admin"}</span>
                              </div>

                              <span style={{ fontSize: "11px", color: "#94A3B8", fontWeight: "500" }}>{blog.readTime || "5 min read"}</span>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div style={{ padding: "12px 18px", background: "#F8FAFC", borderTop: "1px solid #E2E8F0", display: "flex", gap: "10px" }}>
                            <button
                              onClick={() => handleOpenBlogEditModal(blog)}
                              style={{ flex: 1, padding: "8px 12px", background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
                            >
                              Edit Article
                            </button>
                            <button
                              onClick={() => handleDeleteBlog(blog._id, blog.title)}
                              style={{ padding: "8px 12px", background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                  )}

                  {/* ------------------------------------------------------------- */}
                  {/* MODAL FORM FOR ADD / EDIT BLOG WITH TIPTAP EDITOR & FILE UPLOADS */}
                  {/* ------------------------------------------------------------- */}
                  {isBlogModalOpen && (
                    <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                      <div style={{ background: "#FFF", borderRadius: "20px", width: "100%", maxWidth: "900px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", display: "flex", flexDirection: "column" }}>
                        
                        {/* Modal Header */}
                        <div style={{ padding: "20px 28px", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                          <div>
                            <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>
                              {editingBlogId ? "Edit Blog Article" : "Create New Blog Article"}
                            </h2>
                            <p style={{ fontSize: "12px", color: "#64748B", margin: "2px 0 0 0" }}>Fill details and write full HTML content using TipTap rich text editor</p>
                          </div>
                          <button
                            onClick={() => setIsBlogModalOpen(false)}
                            style={{ background: "#E2E8F0", color: "#475569", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontWeight: "800", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            ✕
                          </button>
                        </div>

                        {/* Modal Body / Form */}
                        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "20px" }}>
                          {/* Row 1: Title & Category */}
                          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Blog Title *</label>
                              <input
                                type="text"
                                placeholder="e.g. How RAG Architecture Powers Enterprise AI"
                                value={blogForm.title}
                                onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                                style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                              />
                            </div>
                            <div>
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                                <label style={{ fontSize: "12px", fontWeight: "700", color: "#334155" }}>Category *</label>
                              </div>
                              <select
                                value={blogForm.category}
                                onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                                style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px", background: "#FFF", fontWeight: "600" }}
                              >
                                {blogCategories.map((cat, idx) => (
                                  <option key={idx} value={cat}>
                                    {cat}
                                  </option>
                                ))}
                              </select>

                              {/* Quick Inline New Category Adder */}
                              <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                                <input
                                  type="text"
                                  placeholder="+ Add New Category"
                                  value={newCatInput}
                                  onChange={(e) => setNewCatInput(e.target.value)}
                                  style={{ flex: 1, padding: "6px 10px", border: "1px solid #CBD5E1", borderRadius: "6px", fontSize: "12px" }}
                                />
                                <button
                                  type="button"
                                  onClick={handleAddCategory}
                                  style={{ background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", borderRadius: "6px", padding: "6px 12px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Row 2: Author Name, Author Role & Read Time */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" }}>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Author Name</label>
                              <input
                                type="text"
                                placeholder="e.g. Rahul Sharma"
                                value={blogForm.authorName}
                                onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                                style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Author Role</label>
                              <input
                                type="text"
                                placeholder="e.g. Founder & Lead Architect"
                                value={blogForm.authorRole}
                                onChange={(e) => setBlogForm({ ...blogForm, authorRole: e.target.value })}
                                style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Read Time / Status</label>
                              <div style={{ display: "flex", gap: "8px" }}>
                                <input
                                  type="text"
                                  placeholder="5 min read"
                                  value={blogForm.readTime}
                                  onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                                  style={{ flex: 1, padding: "10px 12px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "13px" }}
                                />
                                <select
                                  value={blogForm.status}
                                  onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value })}
                                  style={{ padding: "10px 12px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "13px", background: "#FFF", fontWeight: "700" }}
                                >
                                  <option value="Published">Published</option>
                                  <option value="Draft">Draft</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Row 3: Image Uploads (Cover Image & Background Image) */}
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            {/* Cover Image */}
                            <div style={{ background: "#F8FAFC", padding: "14px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Cover Image (Thumbnail)</label>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <input
                                  type="text"
                                  placeholder="URL or upload file"
                                  value={blogForm.coverImage}
                                  onChange={(e) => setBlogForm({ ...blogForm, coverImage: e.target.value })}
                                  style={{ flex: 1, padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px" }}
                                />
                                <label style={{ background: "#EFF6FF", color: "#2563EB", padding: "8px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", border: "1px solid #BFDBFE", whiteSpace: "nowrap" }}>
                                  Upload
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
                                          setBlogForm((prev) => ({ ...prev, coverImage: data.url }));
                                          Swal.fire({ icon: "success", title: "Cover Image Uploaded!", timer: 1200, showConfirmButton: false });
                                        }
                                      } catch {
                                        Swal.fire("Error", "Could not upload image", "error");
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                              {blogForm.coverImage && (
                                <img src={blogForm.coverImage} alt="Cover Preview" style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "8px", marginTop: "8px" }} />
                              )}
                            </div>

                            {/* Background Image */}
                            <div style={{ background: "#F8FAFC", padding: "14px", borderRadius: "12px", border: "1px solid #E2E8F0" }}>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Banner / Background Image</label>
                              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                                <input
                                  type="text"
                                  placeholder="URL or upload file"
                                  value={blogForm.bgImage}
                                  onChange={(e) => setBlogForm({ ...blogForm, bgImage: e.target.value })}
                                  style={{ flex: 1, padding: "8px 12px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px" }}
                                />
                                <label style={{ background: "#EFF6FF", color: "#2563EB", padding: "8px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", cursor: "pointer", border: "1px solid #BFDBFE", whiteSpace: "nowrap" }}>
                                  Upload
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
                                          setBlogForm((prev) => ({ ...prev, bgImage: data.url }));
                                          Swal.fire({ icon: "success", title: "Background Image Uploaded!", timer: 1200, showConfirmButton: false });
                                        }
                                      } catch {
                                        Swal.fire("Error", "Could not upload image", "error");
                                      }
                                    }}
                                  />
                                </label>
                              </div>
                              {blogForm.bgImage && (
                                <img src={blogForm.bgImage} alt="Background Preview" style={{ width: "100%", height: "80px", objectFit: "cover", borderRadius: "8px", marginTop: "8px" }} />
                              )}
                            </div>
                          </div>

                          {/* Short Summary */}
                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Short Article Summary *</label>
                            <textarea
                              rows={2}
                              placeholder="Brief 1-2 sentence overview of the article for blog card preview..."
                              value={blogForm.summary}
                              onChange={(e) => setBlogForm({ ...blogForm, summary: e.target.value })}
                              style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                            />
                          </div>

                          {/* ReactQuill Rich Text Article Body Content */}
                          <div>
                            <label style={{ display: "block", fontSize: "13px", fontWeight: "800", color: "#0F172A", marginBottom: "8px" }}>
                              Full Article Content Editor (ReactQuill Editor) *
                            </label>
                            <ReactQuillEditor
                              content={blogForm.contentHtml}
                              onChange={(html) => setBlogForm((prev) => ({ ...prev, contentHtml: html }))}
                            />
                          </div>
                        </div>

                        {/* Modal Footer Actions */}
                        <div style={{ padding: "16px 28px", borderTop: "1px solid #E2E8F0", background: "#F8FAFC", display: "flex", justifyContent: "flex-end", gap: "12px", borderBottomLeftRadius: "20px", borderBottomRightRadius: "20px" }}>
                          <button
                            type="button"
                            onClick={() => setIsBlogModalOpen(false)}
                            style={{ padding: "10px 20px", background: "#E2E8F0", color: "#475569", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}
                          >
                            Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveBlog}
                            disabled={isSavingBlog}
                            style={{ padding: "10px 24px", background: "linear-gradient(135deg, #00875A 0%, #006644 100%)", color: "#FFF", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 14px rgba(0, 135, 90, 0.25)" }}
                          >
                            {isSavingBlog ? "Saving Article..." : (editingBlogId ? "Update Blog Post" : "Publish Blog Post")}
                          </button>
                        </div>

                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ========================================================================= */}
              {/* CAREERS & HIRING MANAGEMENT CMS TAB */}
              {/* ========================================================================= */}
              {(activeTab === "careers-cms" || activeTab === "careers-openings" || activeTab === "careers-create") && (
                <div style={{ display: "flex", flexDirection: "column", gap: "24px", paddingTop: "10px" }}>
                  {/* Header Bar */}
                  <div style={{ background: "#FFF", padding: "20px 24px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div>
                      <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                        <span>Active Job Openings ({jobOpeningsList.length})</span>
                      </h2>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>
                        Manage engineering career positions, hiring requirements, experience criteria, and status.
                      </p>
                    </div>

                    <button
                      onClick={handleOpenJobCreateModal}
                      style={{
                        background: "linear-gradient(135deg, #00875A 0%, #006644 100%)",
                        color: "#FFF",
                        padding: "11px 22px",
                        borderRadius: "10px",
                        border: "none",
                        fontWeight: "700",
                        fontSize: "14px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        boxShadow: "0 4px 14px rgba(0, 135, 90, 0.25)"
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                      Post New Job Opening
                    </button>
                  </div>

                  {/* Job Openings Grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "20px" }}>
                    {jobOpeningsList.length === 0 ? (
                      <div style={{ gridColumn: "1 / -1", background: "#FFF", padding: "48px", borderRadius: "16px", border: "1px dashed #CBD5E1", textAlign: "center" }}>
                        <div style={{ fontSize: "40px", marginBottom: "12px" }}>💼</div>
                        <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#1E293B", margin: 0 }}>No Job Openings Posted Yet</h3>
                        <p style={{ fontSize: "13px", color: "#64748B", margin: "6px 0 16px 0" }}>Click "Post New Job Opening" above to list active hiring positions on the website.</p>
                        <button
                          onClick={handleOpenJobCreateModal}
                          style={{ background: "#00875A", color: "#FFF", padding: "9px 18px", borderRadius: "8px", border: "none", fontWeight: "700", fontSize: "13px", cursor: "pointer" }}
                        >
                          + Post New Job Opening
                        </button>
                      </div>
                    ) : (
                      jobOpeningsList.map((job) => (
                        <div key={job._id} style={{ background: "#FFF", borderRadius: "16px", border: "1px solid #E2E8F0", padding: "20px", display: "flex", flexDirection: "column", gap: "14px", boxShadow: "0 2px 4px rgba(0,0,0,0.03)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                            <div>
                              <span style={{ background: "#E3FCEF", color: "#00875A", fontSize: "11px", fontWeight: "800", padding: "3px 10px", borderRadius: "99px", textTransform: "uppercase" }}>
                                {job.department || "Engineering"}
                              </span>
                              <h3 style={{ fontSize: "17px", fontWeight: "800", color: "#0F172A", margin: "8px 0 0 0" }}>{job.title}</h3>
                            </div>
                            <span style={{ background: job.status === "Open" ? "#DCFCE7" : "#F1F5F9", color: job.status === "Open" ? "#166534" : "#64748B", fontSize: "11px", fontWeight: "800", padding: "4px 10px", borderRadius: "99px" }}>
                              {job.status || "Open"}
                            </span>
                          </div>

                          <div style={{ fontSize: "12.5px", color: "#64748B", display: "flex", flexWrap: "wrap", gap: "12px", borderTop: "1px solid #F1F5F9", borderBottom: "1px solid #F1F5F9", padding: "10px 0" }}>
                            <span>📍 {job.location}</span>
                            <span>⏱️ {job.type}</span>
                            <span>🎯 {job.experience}</span>
                            {job.salaryRange && <span style={{ fontWeight: "700", color: "#92400E" }}>💰 {job.salaryRange}</span>}
                          </div>

                          <p style={{ fontSize: "13px", color: "#475569", margin: 0, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                            {job.description}
                          </p>

                          {job.requirements && job.requirements.length > 0 && (
                            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                              {job.requirements.slice(0, 4).map((req: string, i: number) => (
                                <span key={i} style={{ background: "#F1F5F9", color: "#475569", fontSize: "11px", fontWeight: "700", padding: "3px 8px", borderRadius: "4px" }}>
                                  {req}
                                </span>
                              ))}
                            </div>
                          )}

                          <div style={{ marginTop: "auto", paddingTop: "12px", display: "flex", gap: "10px" }}>
                            <button
                              onClick={() => handleOpenJobEditModal(job)}
                              style={{ flex: 1, padding: "8px 12px", background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
                            >
                              Edit Position
                            </button>
                            <button
                              onClick={() => handleDeleteJobOpening(job._id, job.title)}
                              style={{ padding: "8px 12px", background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "8px", fontWeight: "700", fontSize: "12px", cursor: "pointer" }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Modal Form for Add/Edit Job Opening */}
                  {isJobModalOpen && (
                    <div style={{ position: "fixed", inset: 0, zIndex: 99999, background: "rgba(15, 23, 42, 0.65)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
                      <div style={{ background: "#FFF", borderRadius: "20px", width: "100%", maxWidth: "800px", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)", display: "flex", flexDirection: "column" }}>
                        <div style={{ padding: "20px 28px", borderBottom: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#F8FAFC", borderTopLeftRadius: "20px", borderTopRightRadius: "20px" }}>
                          <div>
                            <h2 style={{ fontSize: "18px", fontWeight: "800", color: "#0F172A", margin: 0 }}>
                              {editingJobId ? "Edit Job Position" : "Post New Job Position"}
                            </h2>
                            <p style={{ fontSize: "12px", color: "#64748B", margin: "2px 0 0 0" }}>Set hiring criteria, experience requirements, and salary scale</p>
                          </div>
                          <button
                            onClick={() => setIsJobModalOpen(false)}
                            style={{ background: "#E2E8F0", color: "#475569", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontWeight: "800", fontSize: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}
                          >
                            ✕
                          </button>
                        </div>

                        <form onSubmit={handleSaveJobOpening} style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: "18px" }}>
                          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Job Title *</label>
                              <input
                                type="text"
                                required
                                placeholder="e.g. Senior Full-Stack Engineer"
                                value={jobOpeningForm.title}
                                onChange={(e) => setJobOpeningForm({ ...jobOpeningForm, title: e.target.value })}
                                style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Department</label>
                              <input
                                type="text"
                                placeholder="e.g. Engineering, AI & Data"
                                value={jobOpeningForm.department}
                                onChange={(e) => setJobOpeningForm({ ...jobOpeningForm, department: e.target.value })}
                                style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                              />
                            </div>
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Location</label>
                              <input
                                type="text"
                                placeholder="Surat / Remote"
                                value={jobOpeningForm.location}
                                onChange={(e) => setJobOpeningForm({ ...jobOpeningForm, location: e.target.value })}
                                style={{ width: "100%", padding: "9px 12px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px" }}
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Employment Type</label>
                              <input
                                type="text"
                                placeholder="Full-Time / Contract"
                                value={jobOpeningForm.type}
                                onChange={(e) => setJobOpeningForm({ ...jobOpeningForm, type: e.target.value })}
                                style={{ width: "100%", padding: "9px 12px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px" }}
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Experience</label>
                              <input
                                type="text"
                                placeholder="3+ Years"
                                value={jobOpeningForm.experience}
                                onChange={(e) => setJobOpeningForm({ ...jobOpeningForm, experience: e.target.value })}
                                style={{ width: "100%", padding: "9px 12px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px" }}
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Status</label>
                              <select
                                value={jobOpeningForm.status}
                                onChange={(e) => setJobOpeningForm({ ...jobOpeningForm, status: e.target.value })}
                                style={{ width: "100%", padding: "9px 12px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", background: "#FFF", fontWeight: "700" }}
                              >
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Salary Range / Scale</label>
                            <input
                              type="text"
                              placeholder="e.g. ₹8L - ₹18L P.A."
                              value={jobOpeningForm.salaryRange}
                              onChange={(e) => setJobOpeningForm({ ...jobOpeningForm, salaryRange: e.target.value })}
                              style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                            />
                          </div>

                          <div>
                            <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Job Description *</label>
                            <textarea
                              rows={3}
                              required
                              placeholder="Detailed role overview..."
                              value={jobOpeningForm.description}
                              onChange={(e) => setJobOpeningForm({ ...jobOpeningForm, description: e.target.value })}
                              style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                            />
                          </div>

                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Requirements & Tech Stack (One per line)</label>
                              <textarea
                                rows={4}
                                placeholder="Next.js, React, Node.js&#10;PostgreSQL / MongoDB&#10;AWS & Docker"
                                value={jobOpeningForm.requirementsText}
                                onChange={(e) => setJobOpeningForm({ ...jobOpeningForm, requirementsText: e.target.value })}
                                style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "13px" }}
                              />
                            </div>
                            <div>
                              <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Key Responsibilities (One per line)</label>
                              <textarea
                                rows={4}
                                placeholder="Architect scalable web products&#10;Lead code reviews&#10;Collaborate directly with founders"
                                value={jobOpeningForm.responsibilitiesText}
                                onChange={(e) => setJobOpeningForm({ ...jobOpeningForm, responsibilitiesText: e.target.value })}
                                style={{ width: "100%", padding: "10px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "13px" }}
                              />
                            </div>
                          </div>

                          <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", borderTop: "1px solid #E2E8F0", paddingTop: "16px" }}>
                            <button
                              type="button"
                              onClick={() => setIsJobModalOpen(false)}
                              style={{ padding: "10px 20px", background: "#E2E8F0", color: "#475569", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              disabled={isSavingJobOpening}
                              style={{ padding: "10px 24px", background: "#00875A", color: "#FFF", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer", boxShadow: "0 4px 14px rgba(0, 135, 90, 0.25)" }}
                            >
                              {isSavingJobOpening ? "Saving Position..." : (editingJobId ? "Update Position" : "Publish Job Opening")}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}

                </div>
              )}

              {/* ========================================================================= */}
              {/* JOB APPLICATIONS & RESUMES RECEIVED TAB */}
              {/* ========================================================================= */}
              {activeTab === "careers-applications" && (
                <div style={{ display: "flex", flexDirection: "column", gap: "20px", paddingTop: "10px" }}>
                  <div style={{ background: "#FFF", padding: "20px 24px", borderRadius: "16px", border: "1px solid #E2E8F0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div>
                      <h2 style={{ fontSize: "20px", fontWeight: "800", color: "#0F172A", margin: 0, display: "flex", alignItems: "center", gap: "10px" }}>
                        <span>Candidate Resumes & Job Applications ({jobApplicationsList.length})</span>
                      </h2>
                      <p style={{ fontSize: "13px", color: "#64748B", margin: "4px 0 0 0" }}>
                        Review candidate submissions, download resume documents, and manage hiring pipeline status.
                      </p>
                    </div>

                    <button className="cmd-top-action-btn primary" onClick={fetchJobApplicationsAdminData}>
                      🔄 Refresh Submissions
                    </button>
                  </div>

                  {/* PIPELINE SUMMARY STAT BADGES */}
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {[
                      { label: "Total Applications", count: jobApplicationsList.length, color: "#1E293B", bg: "#F1F5F9" },
                      { label: "New Resumes", count: jobApplicationsList.filter(a => a.status === "New" || !a.status).length, color: "#2563EB", bg: "#EFF6FF" },
                      { label: "Shortlisted", count: jobApplicationsList.filter(a => a.status === "Shortlisted").length, color: "#00875A", bg: "#DCFCE7" },
                      { label: "Interview Scheduled", count: jobApplicationsList.filter(a => a.status === "Interview Scheduled").length, color: "#9333EA", bg: "#F3E8FF" },
                      { label: "Hired 🎉", count: jobApplicationsList.filter(a => a.status === "Hired").length, color: "#15803D", bg: "#E3FCEF" },
                      { label: "Rejected ❌", count: jobApplicationsList.filter(a => a.status === "Rejected").length, color: "#DC2626", bg: "#FEF2F2" },
                    ].map((st, i) => (
                      <div key={i} style={{ background: st.bg, color: st.color, padding: "8px 14px", borderRadius: "8px", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px" }}>
                        <span>{st.label}:</span>
                        <span style={{ fontSize: "14px", fontWeight: "800" }}>{st.count}</span>
                      </div>
                    ))}
                  </div>

                  {/* Applications Table */}
                  <div className="ov-table-wrap">
                    <table className="ov-table">
                      <thead>
                        <tr>
                          <th>CANDIDATE NAME</th>
                          <th>CONTACT DETAILS</th>
                          <th>POSITION APPLIED</th>
                          <th>EXP & NOTICE</th>
                          <th>RESUME DOCUMENT</th>
                          <th>SUBMITTED</th>
                          <th>HIRING PIPELINE STATUS</th>
                          <th style={{ textAlign: "right" }}>ACTIONS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {jobApplicationsList.length === 0 ? (
                          <tr>
                            <td colSpan={8} style={{ textAlign: "center", padding: "48px", color: "#64748B" }}>
                              <div style={{ fontSize: "36px", marginBottom: "8px" }}>📑</div>
                              No job applications received yet. Submissions from `/careers` page will automatically appear here live!
                            </td>
                          </tr>
                        ) : (
                          jobApplicationsList.map((app) => (
                            <tr key={app._id} className="ov-table-row">
                              <td>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#00875A", color: "#FFF", fontSize: "12px", fontWeight: "800", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    {(app.fullName || "C").charAt(0).toUpperCase()}
                                  </div>
                                  <div>
                                    <div style={{ fontSize: "13.5px", fontWeight: "700", color: "#0F172A" }}>{app.fullName}</div>
                                    {app.location && <div style={{ fontSize: "11px", color: "#64748B" }}>📍 {app.location}</div>}
                                  </div>
                                </div>
                              </td>
                              <td>
                                <div style={{ fontSize: "12.5px", fontWeight: "700", color: "#1E293B" }}>📞 {app.phone}</div>
                                <div style={{ fontSize: "11.5px", color: "#2563EB" }}>✉️ {app.email}</div>
                              </td>
                              <td>
                                <span style={{ fontSize: "12.5px", fontWeight: "700", color: "#00875A" }}>{app.jobTitle}</span>
                              </td>
                              <td>
                                <div style={{ fontSize: "12px", fontWeight: "600", color: "#334155" }}>Exp: {app.experienceYears || "N/A"}</div>
                                <div style={{ fontSize: "11px", color: "#64748B" }}>Notice: {app.noticePeriod || "Immediate"}</div>
                              </td>
                              <td>
                                {app.resumeUrl ? (
                                  <a
                                    href={app.resumeUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ display: "inline-flex", alignItems: "center", gap: "6px", background: "#EFF6FF", color: "#2563EB", border: "1px solid #BFDBFE", padding: "5px 10px", borderRadius: "6px", fontSize: "11.5px", fontWeight: "700", textDecoration: "none" }}
                                  >
                                    📄 View Resume
                                  </a>
                                ) : (
                                  <span style={{ fontSize: "11px", color: "#94A3B8" }}>No Resume</span>
                                )}
                              </td>
                              <td style={{ fontSize: "12px", color: "#64748B" }}>
                                {new Date(app.createdAt || Date.now()).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                              </td>
                              <td>
                                <select
                                  value={app.status || "New"}
                                  onChange={(e) => handleUpdateApplicationStatus(app._id, e.target.value)}
                                  style={{
                                    padding: "6px 10px",
                                    borderRadius: "8px",
                                    fontSize: "12px",
                                    fontWeight: "800",
                                    border: "1px solid #CBD5E1",
                                    background: app.status === "Shortlisted" || app.status === "Hired" ? "#DCFCE7" : app.status === "Rejected" ? "#FEF2F2" : "#FFF",
                                    color: app.status === "Shortlisted" || app.status === "Hired" ? "#166534" : app.status === "Rejected" ? "#DC2626" : "#0F172A",
                                    cursor: "pointer"
                                  }}
                                >
                                  <option value="New">New</option>
                                  <option value="In Review">In Review</option>
                                  <option value="Shortlisted">Shortlisted</option>
                                  <option value="Interview Scheduled">Interview Scheduled</option>
                                  <option value="Hired">Hired 🎉</option>
                                  <option value="Rejected">Rejected ❌</option>
                                </select>
                              </td>
                              <td style={{ textAlign: "right" }}>
                                <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px" }}>
                                  <button
                                    className="ov-view-btn"
                                    onClick={() => Swal.fire({
                                      title: `Application: ${app.fullName}`,
                                      html: `<p><strong>Applied Role:</strong> ${app.jobTitle}</p><p><strong>Phone:</strong> ${app.phone}</p><p><strong>Email:</strong> ${app.email}</p><p><strong>Location:</strong> ${app.location || 'N/A'}</p><p><strong>Experience:</strong> ${app.experienceYears || 'N/A'}</p><p><strong>LinkedIn:</strong> ${app.linkedinUrl || 'N/A'}</p><p><strong>Cover Letter:</strong> ${app.coverLetter || 'N/A'}</p><p><a href="${app.resumeUrl}" target="_blank" style="color:#2563eb;font-weight:bold;">Download Resume Document</a></p>`,
                                      icon: "info"
                                    })}
                                  >
                                    Details →
                                  </button>
                                  <button
                                    onClick={() => handleDeleteApplication(app._id, app.fullName)}
                                    style={{ background: "#FEF2F2", color: "#DC2626", border: "1px solid #FECACA", borderRadius: "6px", padding: "4px 8px", fontSize: "11px", fontWeight: "700", cursor: "pointer" }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* OTHER SECTIONS DEFAULT FALLBACK */}
              {!["home-hero", "home-gallery", "home-services", "home-company", "home-process", "home-partners", "home-case-studies", "home-testimonials", "home-cta", "services-all", "services-create", "services-hero", "services-core", "services-ai", "services-tech-stack", "services-faq", "ind-all", "ind-create", "ind-hero", "ind-fintech", "ind-healthcare", "ind-saas", "ind-ecommerce", "cs-all", "cs-create", "cs-hero", "cs-filter", "cs-projects-grid", "cs-outcomes", "about-hero", "about-stats", "about-partner", "about-values", "about-capabilities", "about-cta", "about-team", "contact-page-cms", "settings", "blog-cms", "blog-all", "blog-create", "blog-categories", "careers-cms", "careers-openings", "careers-create", "careers-applications", "careers-page-cms", "careers-page-hero", "careers-page-benefits", "careers-page-hiring"].includes(activeTab) && (
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
