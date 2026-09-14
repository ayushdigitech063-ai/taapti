"use client";

import { useState } from "react";
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
          <span className="contact-hero-badge">GET IN TOUCH</span>
          <h1>Let&apos;s Build Something <span style={{ color: "#10243E" }}>Great Together</span></h1>
          <p>Have a project idea, architecture requirement, or looking to scale your engineering team? Reach out to us directly.</p>
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
                  <a href="tel:+919876543210">+91 98765 43210</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">✉️</div>
                <div>
                  <strong>Email Inquiry</strong>
                  <a href="mailto:hello@taapti.com">hello@taapti.com</a>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">📍</div>
                <div>
                  <strong>Engineering Hub</strong>
                  <span>Surat, Gujarat, India</span>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-info-icon">⚡</div>
                <div>
                  <strong>SLA Response Time</strong>
                  <span>Under 2 Hours (Mon - Sat)</span>
                </div>
              </div>
            </div>

            {/* TRUST BADGE */}
            <div className="contact-trust-box">
              <span className="trust-dot" />
              <span>100% Confidentiality & Non-Disclosure Guarantee</span>
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
