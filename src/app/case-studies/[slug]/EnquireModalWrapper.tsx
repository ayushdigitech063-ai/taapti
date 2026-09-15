"use client";

import { useState } from "react";
import EnquireModal from "@/components/EnquireModal";

export default function EnquireModalWrapper({ studyTitle, btnText = "Book a Consultation" }: { studyTitle: string; btnText?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="srv-hero-enquire-btn btn btn-primary"
        onClick={() => setIsOpen(true)}
      >
        <span>{btnText}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      <EnquireModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        serviceTitle={studyTitle}
      />
    </>
  );
}
