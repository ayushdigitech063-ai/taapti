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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="globe-3d">
        <TechGlobe />
      </div>
    );
  }

  return (
    <div className="globe-3d">
      <GlobeErrorBoundary fallback={<TechGlobe />}>
        <GlobeScene />
      </GlobeErrorBoundary>
    </div>
  );
}