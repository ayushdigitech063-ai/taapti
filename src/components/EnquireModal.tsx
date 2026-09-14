"use client";

import { useState, useEffect } from "react";
import Swal from "sweetalert2";

interface EnquireModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceTitle?: string;
}

export default function EnquireModal({ isOpen, onClose, serviceTitle = "Software Engineering" }: EnquireModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) {
      Swal.fire("Missing Information", "Please fill in your Name and Phone number.", "warning");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service: serviceTitle,
          message,
        }),
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
          title: "Enquiry Submitted! 🚀",
          text: "Thank you! Our engineering team will reach out to you shortly.",
          confirmButtonColor: "#0B3B82",
        });

        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        onClose();
      } else {
        Swal.fire("Submission Failed", json.message || "Failed to submit enquiry.", "error");
      }
    } catch {
      Swal.fire("Server Error", "Could not connect to backend server.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="srv-modal-overlay" onClick={onClose}>
      <div className="srv-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="srv-modal-close" onClick={onClose} aria-label="Close Modal">
          ✕
        </button>

        <div className="srv-modal-header">
          <span className="srv-modal-badge">QUICK ENQUIRY</span>
          <h3>Enquire for {serviceTitle}</h3>
          <p>Leave your details and our team will get in touch with you within 2 hours.</p>
        </div>

        <form onSubmit={handleSubmit} className="srv-modal-form">
          <div className="srv-form-group">
            <label>Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Rahul Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="srv-form-row">
            <div className="srv-form-group">
              <label>Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="srv-form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="srv-form-group">
            <label>Project Requirements / Message</label>
            <textarea
              rows={3}
              placeholder="Tell us briefly about your software or project requirements..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button type="submit" className="srv-modal-submit-btn" disabled={isSubmitting}>
            {isSubmitting ? "Submitting Lead..." : "Submit Enquiry →"}
          </button>
        </form>
      </div>
    </div>
  );
}
