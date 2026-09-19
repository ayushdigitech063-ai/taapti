"use client";

import React, { useEffect, useState, Component } from "react";
import dynamic from "next/dynamic";
import TechGlobe from "./TechGlobe";

const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => <TechGlobe />,
});

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class GlobeErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.warn("Globe 3D render caught fallback:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function Globe() {
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setInView(entry.isIntersecting);
      },
      { rootMargin: "200px" } // Render just before coming into view
    );
    
    observer.observe(containerRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="globe-3d">
        <TechGlobe />
      </div>
    );
  }

  return (
    <div className="globe-3d" ref={containerRef}>
      <GlobeErrorBoundary fallback={<TechGlobe />}>
        <GlobeScene inView={inView} />
      </GlobeErrorBoundary>
    </div>
  );
}