"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px 0px -40px 0px",
      threshold: 0.05,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const observeAll = () => {
      const revealElements = document.querySelectorAll(
        ".reveal-up, .reveal-down, .reveal-left, .reveal-right, .reveal-zoom"
      );

      revealElements.forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          observer.observe(el);
        }
      });
    };

    observeAll();

    // Listen for DOM mutations to catch any dynamically rendered elements
    const mutationObserver = new MutationObserver(() => {
      observeAll();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
