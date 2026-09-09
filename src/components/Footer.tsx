import Link from "next/link";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Case Studies", href: "/case-studies" },
];

const serviceLinks = [
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="footer__logo">
              Taapti
            </Link>

            <p>
              Software engineering and AI solutions for ambitious businesses.
            </p>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h3>Company</h3>

              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="footer__column">
              <h3>Explore</h3>

              {serviceLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="footer__column">
              <h3>Contact</h3>

              <Link href="/contact">Let&apos;s Talk</Link>
              <a href="mailto:hello@taapti.com">hello@taapti.com</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} Taapti Technologies. All rights reserved.</p>

          <div className="footer__legal">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}