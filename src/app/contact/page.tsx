"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Software Engineering",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [contactData, setContactData] = useState({
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

  const fetchContactData = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/contact-page").catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          const d = json.data;
          setContactData({
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
    } catch { /* silent fallback */ }
  };

  useEffect(() => {
    fetchContactData();

    let channel: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      channel = new BroadcastChannel("taapti_cms_updates");
      channel.onmessage = (event) => {
        if (event.data === "CONTACT_PAGE_UPDATED") {
          fetchContactData();
        }
      };
    }
    return () => {
      if (channel) channel.close();
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      Swal.fire("Required Fields", "Please enter your Name and Phone number.", "warning");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (res.ok && json.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("NEW_LEAD_SUBMITTED");
          bc.close();
        }

        Swal.fire({
          icon: "success",
          title: "Message Sent Successfully! 🚀",
          text: "Thank you for reaching out! Our engineering leadership team will contact you within 2 hours.",
          confirmButtonColor: "#00875A",
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "Software Engineering",
          message: "",
        });
      } else {
        Swal.fire("Submission Error", json.message || "Could not submit enquiry.", "error");
      }
    } catch {
      Swal.fire("Server Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      {/* HERO BANNER */}
      <section className="contact-hero">
        <div className="container text-center">
          <span className="contact-hero-badge">{contactData.heroBadge}</span>
          <h1>{contactData.heroTitleNormal} <span style={{ color: "#10243E" }}>{contactData.heroTitleHighlight}</span></h1>
          <p>{contactData.heroDescription}</p>
        </div>
      </section>

      {/* MAIN CONTACT SECTION */}
      <section className="section contact-main">
        <div className="container contact-grid">
          
          {/* LEFT: DIRECT CONTACT INFO */}
          <div className="contact-info-card">
            <h3>Direct Communication</h3>
            <p>Work directly with our engineering architects. No sales pressure, no middlemen.</p>

            <div className="contact-info-list">
              <div className="contact-info-item">
                <div className="contact-info-icon">📞</div>
                <div>
                  <strong>Call or WhatsApp</strong>
                  <a href={`tel:${contactData.phone.replace(/[^0-9+]/g, "")}`}>{contactData.phone}</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">✉️</div>
                <div>
                  <strong>Email Inquiry</strong>
                  <a href={`mailto:${contactData.email}`}>{contactData.email}</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div>
                  <strong>Engineering Hub</strong>
                  <span>{contactData.address}</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">⚡</div>
                <div>
                  <strong>SLA Response Time</strong>
                  <span>{contactData.slaResponseTime}</span>
                </div>
              </div>
            </div>

            {/* TRUST BADGE */}
            <div className="contact-trust-box">
              <span className="trust-dot" />
              <span>{contactData.trustBadgeText}</span>
            </div>
          </div>

          {/* RIGHT: CONTACT LEAD FORM */}
          <div className="contact-form-card">
            <h3>Send Us a Message</h3>
            <p>Fill out the form below and we&apos;ll schedule a technical discovery call.</p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="contact-form-group">
                <label>Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rohan Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div className="contact-form-row">
                <div className="contact-form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="contact-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="contact-form-group">
                <label>Service / Area of Interest</label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                >
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="Cloud & DevOps">Cloud & DevOps</option>
                  <option value="General Consultation">General Consultation</option>
                </select>
              </div>

              <div className="contact-form-group">
                <label>Project Details / Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us briefly about your project, timeline, or requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>

              <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Send Message →"}
              </button>
            </form>
          </div>

        </div>
      </section>
    </main>
  );
}
