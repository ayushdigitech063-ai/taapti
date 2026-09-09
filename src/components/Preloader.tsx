"use client";

import { useState, useEffect } from "react";

const LETTERS = ["T", "A", "A", "P", "T", "I"];

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Reveal letters one by one: T -> A -> A -> P -> T -> I
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev >= LETTERS.length) {
          clearInterval(interval);
          // Wait briefly after all letters are revealed then fade out smoothly
          setTimeout(() => {
            setFadeOut(true);
            setTimeout(() => {
              setLoading(false);
            }, 600);
          }, 400);
          return prev;
        }
        return prev + 1;
      });
    }, 180); // speed of letter appearance

    return () => clearInterval(interval);
  }, []);

  if (!loading) return null;

  return (
    <div className={`preloader-overlay ${fadeOut ? "preloader-overlay--fade" : ""}`}>
      <div className="preloader-content">
        {/* Soft glowing subtle badge dot */}
        <div className="preloader-light-orb" />

        {/* Sequential Animated Letter Reveal: T A A P T I */}
        <div className="preloader-text-sequence">
          {LETTERS.map((char, index) => (
            <span
              key={index}
              className={`preloader-char ${index < visibleCount ? "preloader-char--active" : ""}`}
            >
              {char}
            </span>
          ))}
        </div>

        <p className="preloader-subtext">TECHNOLOGIES</p>
      </div>
    </div>
  );
}
