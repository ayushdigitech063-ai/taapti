"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Careers", href: "/careers" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <Link
          href="/"
          className="navbar__logo"
          onClick={() => setMenuOpen(false)}
        >
          Taapti
        </Link>

        <nav className="navbar__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="navbar__link"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__actions">
          <Link href="/contact" className="btn btn-primary navbar__cta">
            Let&apos;s Talk
          </Link>

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

      <div
        className={`navbar__mobile-menu ${
          menuOpen ? "navbar__mobile-menu--open" : ""
        }`}
      >
        <nav aria-label="Mobile navigation">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="navbar__mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              <span>{item.label}</span>
              <span>→</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}