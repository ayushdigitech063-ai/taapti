"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import EnquireModal from "@/components/EnquireModal";

interface EditorialItem {
  num: string;
  label: string;
  href: string;
  sub: string;
}

const editorialServices: EditorialItem[] = [
  {
    num: "01",
    label: "Software Engineering",
    href: "/services/software-engineering",
    sub: "Custom Scalable Software & API Backend Systems",
  },
  {
    num: "02",
    label: "AI & Machine Learning",
    href: "/services/ai-machine-learning",
    sub: "Predictive Models & Intelligent Automated Workflows",
  },
  {
    num: "03",
    label: "Web Development",
    href: "/services/web-development",
    sub: "Modern Responsive High-Performance Web Applications",
  },
  {
    num: "04",
    label: "Mobile Development",
    href: "/services/mobile-development",
    sub: "Native & Cross-Platform iOS & Android Mobile Apps",
  },
  {
    num: "05",
    label: "Cloud & DevOps",
    href: "/services/cloud-devops",
    sub: "Infrastructure Automation, CI/CD & Cloud Scaling",
  },
  {
    num: "06",
    label: "UI/UX & Product Design",
    href: "/services/ui-ux-design",
    sub: "User-Centered Design Systems & Interactive Interfaces",
  },
];

const editorialIndustries: EditorialItem[] = [
  {
    num: "01",
    label: "FinTech",
    href: "/industries/fintech",
    sub: "Banking • Payments • Financial Technology",
  },
  {
    num: "02",
    label: "Healthcare",
    href: "/industries/healthcare",
    sub: "HealthTech • MedTech • Digital Care",
  },
  {
    num: "03",
    label: "SaaS & Technology",
    href: "/industries/saas-technology",
    sub: "Cloud • Platforms • Enterprise Technology",
  },
  {
    num: "04",
    label: "E-commerce",
    href: "/industries/ecommerce",
    sub: "Retail • Marketplace • Checkout",
  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [isEnquireOpen, setIsEnquireOpen] = useState(false);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMenuOpen(false);
  }, [pathname]);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleMobileAccordion = (label: string) => {
    setMobileExpanded(mobileExpanded === label ? null : label);
  };

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link
          href="/"
          className="navbar__logo"
          onClick={() => {
            setMenuOpen(false);
            setActiveDropdown(null);
          }}
        >
          <img src="/logo-icon.png" alt="Taapti Icon" className="navbar__logo-icon" />
        </Link>

        {/* DESKTOP NAVIGATION WITH DROPDOWNS */}
        <nav className="navbar__nav" aria-label="Main navigation">
          {/* Home */}
          <Link
            href="/"
            className={`navbar__link ${pathname === "/" ? "active" : ""}`}
          >
            Home
          </Link>

          {/* Services Dropdown (EDITORIAL DESIGN) */}
          <div
            className="navbar__dropdown-wrapper"
            onMouseEnter={() => handleMouseEnter("Services")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              suppressHydrationWarning
              className={`navbar__link navbar__link--dropdown ${
                pathname.startsWith("/services") || activeDropdown === "Services" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveDropdown(activeDropdown === "Services" ? null : "Services");
              }}
              style={{ background: "none", border: "none", font: "inherit", cursor: "pointer" }}
            >
              <span>Services</span>
              <svg
                className={`navbar__chevron ${activeDropdown === "Services" ? "navbar__chevron--open" : ""}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {activeDropdown === "Services" && (
              <div className="nav-ind-panel nav-ind-panel--services">
                {/* HEADER */}
                <div className="nav-ind-header">
                  <span className="nav-ind-eyebrow">SERVICES</span>
                  <Link
                    href="/services"
                    className="nav-ind-all-link"
                    onClick={() => setActiveDropdown(null)}
                  >
                    View All Services →
                  </Link>
                </div>
                <div className="nav-ind-header-divider" />

                {/* NUMBERED EDITORIAL LIST */}
                <div className="nav-ind-list">
                  {editorialServices.map((srv, idx) => (
                    <div key={srv.href} className="nav-ind-row-wrapper">
                      <Link
                        href={srv.href}
                        className="nav-ind-item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="nav-ind-num">{srv.num}</span>
                        <div className="nav-ind-text">
                          <h3 className="nav-ind-title">{srv.label}</h3>
                          <p className="nav-ind-sub">{srv.sub}</p>
                        </div>
                        <span className="nav-ind-arrow">→</span>
                      </Link>
                      {idx < editorialServices.length - 1 && <div className="nav-ind-row-divider" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Industries Dropdown (EDITORIAL / NUMBERED LIST DESIGN) */}
          <div
            className="navbar__dropdown-wrapper"
            onMouseEnter={() => handleMouseEnter("Industries")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              suppressHydrationWarning
              className={`navbar__link navbar__link--dropdown ${
                pathname.startsWith("/industries") || activeDropdown === "Industries" ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveDropdown(activeDropdown === "Industries" ? null : "Industries");
              }}
              style={{ background: "none", border: "none", font: "inherit", cursor: "pointer" }}
            >
              <span>Industries</span>
              <svg
                className={`navbar__chevron ${activeDropdown === "Industries" ? "navbar__chevron--open" : ""}`}
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {activeDropdown === "Industries" && (
              <div className="nav-ind-panel">
                {/* HEADER */}
                <div className="nav-ind-header">
                  <span className="nav-ind-eyebrow">INDUSTRIES</span>
                  <Link
                    href="/industries"
                    className="nav-ind-all-link"
                    onClick={() => setActiveDropdown(null)}
                  >
                    View All Industries →
                  </Link>
                </div>
                <div className="nav-ind-header-divider" />

                {/* NUMBERED EDITORIAL LIST */}
                <div className="nav-ind-list">
                  {editorialIndustries.map((ind, idx) => (
                    <div key={ind.href} className="nav-ind-row-wrapper">
                      <Link
                        href={ind.href}
                        className="nav-ind-item"
                        onClick={() => setActiveDropdown(null)}
                      >
                        <span className="nav-ind-num">{ind.num}</span>
                        <div className="nav-ind-text">
                          <h3 className="nav-ind-title">{ind.label}</h3>
                          <p className="nav-ind-sub">{ind.sub}</p>
                        </div>
                        <span className="nav-ind-arrow">→</span>
                      </Link>
                      {idx < editorialIndustries.length - 1 && <div className="nav-ind-row-divider" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Case Studies */}
          <Link
            href="/case-studies"
            className={`navbar__link ${pathname === "/case-studies" ? "active" : ""}`}
          >
            Case Studies
          </Link>

          {/* About */}
          <Link
            href="/about"
            className={`navbar__link ${pathname === "/about" ? "active" : ""}`}
          >
            About
          </Link>

          {/* Blog */}
          <Link
            href="/blog"
            className={`navbar__link ${pathname === "/blog" ? "active" : ""}`}
          >
            Blog
          </Link>

          {/* Careers */}
          <Link
            href="/careers"
            className={`navbar__link ${pathname === "/careers" ? "active" : ""}`}
          >
            Careers
          </Link>

          {/* Contact */}
          <Link
            href="/contact"
            className={`navbar__link ${pathname === "/contact" ? "active" : ""}`}
          >
            Contact
          </Link>
        </nav>

        <div className="navbar__actions">
          <button
            type="button"
            className="btn btn-primary navbar__cta"
            onClick={() => setIsEnquireOpen(true)}
            style={{ cursor: "pointer" }}
          >
            Let&apos;s Talk
          </button>

          <button
            type="button"
            className={`navbar__toggle ${
              menuOpen ? "navbar__toggle--open" : ""
            }`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Global Enquire Modal */}
      <EnquireModal
        isOpen={isEnquireOpen}
        onClose={() => setIsEnquireOpen(false)}
        serviceTitle="General Enquiry"
      />

      {/* MOBILE MENU WITH EDITORIAL LIST ACCORDION */}
      <div
        className={`navbar__mobile-menu ${
          menuOpen ? "navbar__mobile-menu--open" : ""
        }`}
      >
        <nav aria-label="Mobile navigation">
          <Link
            href="/"
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            <span>Home</span>
            <span>→</span>
          </Link>

          {/* Services Mobile */}
          <div className="navbar__mobile-accordion">
            <div className="navbar__mobile-accordion-header">
              <Link
                href="/services"
                className="navbar__mobile-link navbar__mobile-link--main"
                onClick={() => setMenuOpen(false)}
              >
                <span>Services</span>
              </Link>
              <button
                type="button"
                className={`navbar__mobile-accordion-btn ${mobileExpanded === "Services" ? "open" : ""}`}
                onClick={() => toggleMobileAccordion("Services")}
                aria-label="Toggle Services dropdown"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
            {mobileExpanded === "Services" && (
              <div className="nav-ind-mobile-list">
                {editorialServices.map((srv) => (
                  <Link
                    key={srv.href}
                    href={srv.href}
                    className="nav-ind-mobile-item"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="nav-ind-mobile-num">{srv.num}</span>
                    <div>
                      <div className="nav-ind-mobile-title">{srv.label}</div>
                      <div className="nav-ind-mobile-sub">{srv.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Industries Mobile (EDITORIAL STYLE) */}
          <div className="navbar__mobile-accordion">
            <div className="navbar__mobile-accordion-header">
              <Link
                href="/industries"
                className="navbar__mobile-link navbar__mobile-link--main"
                onClick={() => setMenuOpen(false)}
              >
                <span>Industries</span>
              </Link>
              <button
                type="button"
                className={`navbar__mobile-accordion-btn ${mobileExpanded === "Industries" ? "open" : ""}`}
                onClick={() => toggleMobileAccordion("Industries")}
                aria-label="Toggle Industries dropdown"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
            {mobileExpanded === "Industries" && (
              <div className="nav-ind-mobile-list">
                {editorialIndustries.map((ind) => (
                  <Link
                    key={ind.href}
                    href={ind.href}
                    className="nav-ind-mobile-item"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="nav-ind-mobile-num">{ind.num}</span>
                    <div>
                      <div className="nav-ind-mobile-title">{ind.label}</div>
                      <div className="nav-ind-mobile-sub">{ind.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/case-studies"
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            <span>Case Studies</span>
            <span>→</span>
          </Link>

          <Link
            href="/about"
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            <span>About</span>
            <span>→</span>
          </Link>

          <Link
            href="/blog"
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            <span>Blog</span>
            <span>→</span>
          </Link>

          <Link
            href="/careers"
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            <span>Careers</span>
            <span>→</span>
          </Link>

          <Link
            href="/contact"
            className="navbar__mobile-link"
            onClick={() => setMenuOpen(false)}
          >
            <span>Contact</span>
            <span>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
