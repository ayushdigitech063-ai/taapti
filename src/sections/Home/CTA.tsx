import Link from "next/link";

export default function CTA() {
  return (
    <section className="section cta-section">
      <div className="container cta-container">
        <div className="cta-box">
          
          {/* LEFT CONTENT AREA */}
          <div className="cta-left reveal-left">
            <div className="cta-eyebrow">
              <span className="cta-eyebrow-dot"></span>
              <span>HAVE A PROJECT IN MIND?</span>
            </div>

            <h2 className="cta-title">
              Let&apos;s build something <span className="cta-title-highlight">that matters.</span>
            </h2>

            <p className="cta-desc">
              Tell us what you&apos;re building, what you&apos;re trying to solve, or where you want to go next. We&apos;ll help you figure out the right technology approach.
            </p>

            <div className="cta-buttons">
              <Link href="/contact" className="cta-btn-primary">
                <span>Start a Conversation</span>
                <span className="cta-btn-arrow">→</span>
              </Link>

              <Link href="/services" className="cta-btn-outline">
                Explore Services
              </Link>
            </div>

            {/* BOTTOM TRUST FEATURES BAR */}
            <div className="cta-trust-bar">
              <div className="cta-trust-item">
                <div className="cta-trust-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <span>Free Consultation</span>
              </div>

              <div className="cta-trust-item">
                <div className="cta-trust-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                  </svg>
                </div>
                <span>Quick Response</span>
              </div>

              <div className="cta-trust-item">
                <div className="cta-trust-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span>Confidential &amp; Secure</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: 3D ROTATING CARDS & ORBITAL STACK */}
          <div className="cta-right reveal-right">
            <div className="cta-orbital-circle">
              {/* Decorative rays top right */}
              <div className="cta-rays">
                <span></span>
                <span></span>
              </div>

              {/* Hand drawn callout annotations */}
              <div className="cta-annotation cta-ann-top-left">
                <span>Ideas</span>
                <svg width="24" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor">
                  <path d="M2 2 Q 12 12 22 4" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <polyline points="18 1 22 4 19 8" strokeWidth="1.5"/>
                </svg>
              </div>

              <div className="cta-annotation cta-ann-left">
                <span>Products</span>
              </div>

              <div className="cta-annotation cta-ann-top-right">
                <span>Products</span>
                <svg width="24" height="14" viewBox="0 0 24 14" fill="none" stroke="currentColor">
                  <path d="M2 12 Q 12 2 22 10" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <polyline points="18 7 22 10 21 14" strokeWidth="1.5"/>
                </svg>
              </div>

              <div className="cta-annotation cta-ann-right">
                <span>Growth</span>
              </div>

              <div className="cta-annotation cta-ann-bottom-right">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M2 2 Q 10 20 22 16" strokeWidth="1.5" strokeDasharray="3 3"/>
                  <polyline points="18 20 22 16 20 12" strokeWidth="1.5"/>
                </svg>
                <span>Let&apos;s create what&apos;s next</span>
              </div>

              {/* 3D CARDS STACK CONTAINER WITH ROTATION ANIMATION */}
              <div className="cta-3d-stack">
                {/* CARD 1 (LEFT BACK) */}
                <div className="cta-3d-card cta-3d-card--left">
                  <div className="cta-card-inner">
                    <div className="cta-card-header-icon">💡</div>
                    <h4>Ideas</h4>
                    <div className="cta-card-line"></div>
                    <div className="cta-card-line short"></div>
                  </div>
                </div>

                {/* CARD 2 (MAIN CENTER FRONT CARD) */}
                <div className="cta-3d-card cta-3d-card--center">
                  <div className="cta-card-inner">
                    <div className="cta-card-bulb-icon">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18h6M10 22h4M15 9A6 6 0 0 0 9 9c0 2.38 1.19 4.47 3 5.74V17h0v0h0a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.26c1.81-1.27 3-3.36 3-5.74z"></path>
                      </svg>
                    </div>
                    <h3>From ideas to impact</h3>
                    <div className="cta-card-line"></div>
                    <div className="cta-card-line short"></div>
                    
                    <div className="cta-card-action-btn">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* CARD 3 (RIGHT BACK) */}
                <div className="cta-3d-card cta-3d-card--right">
                  <div className="cta-card-inner">
                    <h4>Growth</h4>
                    <div className="cta-card-bars">
                      <span className="bar b1"></span>
                      <span className="bar b2"></span>
                      <span className="bar b3"></span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}