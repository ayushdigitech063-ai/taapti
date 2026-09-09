"use client";

export default function TechGlobe() {
  return (
    <div className="tech-globe__wrapper" aria-hidden="true">
      <svg
        viewBox="0 0 600 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="tech-globe__svg"
      >
        <defs>
          {/* Main sphere gradient */}
          <radialGradient id="sphereGrad" cx="40%" cy="35%" r="60%">
            <stop offset="0%"   stopColor="#ffffff"  stopOpacity="1"   />
            <stop offset="30%"  stopColor="#dbeafe"  stopOpacity="0.9" />
            <stop offset="65%"  stopColor="#93c5fd"  stopOpacity="0.7" />
            <stop offset="100%" stopColor="#2563eb"  stopOpacity="0.4" />
          </radialGradient>

          {/* Inner ambient glow */}
          <radialGradient id="innerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#eff6ff"  stopOpacity="0.5" />
            <stop offset="55%"  stopColor="#bfdbfe"  stopOpacity="0.2" />
            <stop offset="100%" stopColor="#3b82f6"  stopOpacity="0"   />
          </radialGradient>

          {/* Outer ambient glow (behind sphere) */}
          <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor="#bfdbfe"  stopOpacity="0.5"  />
            <stop offset="55%"  stopColor="#93c5fd"  stopOpacity="0.22" />
            <stop offset="100%" stopColor="#3b82f6"  stopOpacity="0"    />
          </radialGradient>

          {/* Dot glow filter */}
          <filter id="dotGlow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Arc glow filter */}
          <filter id="arcGlow" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Clip to sphere */}
          <clipPath id="sphereClip">
            <circle cx="300" cy="300" r="215" />
          </clipPath>
        </defs>

        {/* ── OUTER GLOW RINGS behind sphere ── */}
        <circle cx="300" cy="300" r="275" fill="url(#outerGlow)" />
        <circle cx="300" cy="300" r="245" fill="url(#outerGlow)" opacity="0.55" />

        {/* ── MAIN SPHERE ── */}
        <circle cx="300" cy="300" r="215" fill="url(#sphereGrad)" />
        <circle cx="300" cy="300" r="215" fill="url(#innerGlow)" />

        {/* Sphere edge ring */}
        <circle
          cx="300" cy="300" r="215"
          stroke="#93c5fd" strokeWidth="1.2" strokeOpacity="0.6"
          fill="none"
        />

        {/* ── ORBITAL ARCS ── */}

        {/* Equator */}
        <ellipse
          cx="300" cy="300" rx="215" ry="58"
          stroke="rgba(255,255,255,0.6)" strokeWidth="1.2"
          fill="none" filter="url(#arcGlow)"
        />

        {/* Diagonal arc 1 – top-left to bottom-right */}
        <ellipse
          cx="300" cy="300" rx="215" ry="68"
          stroke="rgba(255,255,255,0.55)" strokeWidth="1.1"
          fill="none" transform="rotate(-42 300 300)"
          filter="url(#arcGlow)"
        />

        {/* Diagonal arc 2 – top-right to bottom-left */}
        <ellipse
          cx="300" cy="300" rx="215" ry="68"
          stroke="rgba(255,255,255,0.5)" strokeWidth="1.1"
          fill="none" transform="rotate(42 300 300)"
          filter="url(#arcGlow)"
        />

        {/* Vertical longitude */}
        <ellipse
          cx="300" cy="300" rx="62" ry="215"
          stroke="rgba(255,255,255,0.38)" strokeWidth="1"
          fill="none" filter="url(#arcGlow)"
        />

        {/* Extra wide diagonal */}
        <ellipse
          cx="300" cy="300" rx="215" ry="85"
          stroke="rgba(255,255,255,0.3)" strokeWidth="1"
          fill="none" transform="rotate(68 300 300)"
          filter="url(#arcGlow)"
        />

        {/* ── GLOWING ANIMATED DOTS ── */}

        {/* Dot on equator – far left */}
        <circle cx="86" cy="303" r="5" fill="#1d4ed8" filter="url(#dotGlow)" opacity="0.9">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="2.4s" repeatCount="indefinite"/>
          <animate attributeName="r"       values="4;6;4"       dur="2.4s" repeatCount="indefinite"/>
        </circle>

        {/* Dot on diagonal top-right */}
        <circle cx="448" cy="178" r="5" fill="#1d4ed8" filter="url(#dotGlow)" opacity="0.85">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="3.1s" begin="0.6s" repeatCount="indefinite"/>
          <animate attributeName="r"       values="4;5.5;4"   dur="3.1s" begin="0.6s" repeatCount="indefinite"/>
        </circle>

        {/* Central big dot */}
        <circle cx="300" cy="232" r="7" fill="#1d4ed8" filter="url(#dotGlow)" opacity="1">
          <animate attributeName="r"       values="5.5;8;5.5"  dur="2s"   repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.7;1;0.7"  dur="2s"   repeatCount="indefinite"/>
        </circle>

        {/* Dot bottom-left on diagonal */}
        <circle cx="158" cy="415" r="5" fill="#2563eb" filter="url(#dotGlow)" opacity="0.85">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2.8s" begin="1.1s" repeatCount="indefinite"/>
        </circle>

        {/* Dot right edge */}
        <circle cx="490" cy="308" r="4.5" fill="#3b82f6" filter="url(#dotGlow)" opacity="0.8">
          <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.6s" begin="0.9s" repeatCount="indefinite"/>
        </circle>

        {/* Dot top */}
        <circle cx="328" cy="90" r="4" fill="#3b82f6" filter="url(#dotGlow)" opacity="0.75">
          <animate attributeName="opacity" values="0.3;1;0.3" dur="2.6s" begin="1.5s" repeatCount="indefinite"/>
        </circle>

        {/* Dot bottom-right */}
        <circle cx="418" cy="410" r="4" fill="#60a5fa" filter="url(#dotGlow)" opacity="0.7">
          <animate attributeName="opacity" values="0.3;0.85;0.3" dur="3.3s" begin="0.3s" repeatCount="indefinite"/>
        </circle>

        {/* Small mid-sphere dot */}
        <circle cx="360" cy="310" r="3.5" fill="#93c5fd" filter="url(#dotGlow)" opacity="0.65">
          <animate attributeName="opacity" values="0.3;0.8;0.3" dur="4s" begin="0.8s" repeatCount="indefinite"/>
        </circle>

        {/* ── SHORT CONNECTOR LINES from dots outward ── */}
        <line x1="86"  y1="303" x2="42"  y2="290" stroke="rgba(255,255,255,0.35)" strokeWidth="0.9"/>
        <line x1="448" y1="178" x2="492" y2="152" stroke="rgba(255,255,255,0.35)" strokeWidth="0.9"/>
        <line x1="158" y1="415" x2="110" y2="440" stroke="rgba(255,255,255,0.35)" strokeWidth="0.9"/>
        <line x1="490" y1="308" x2="530" y2="314" stroke="rgba(255,255,255,0.3)"  strokeWidth="0.9"/>
        <line x1="328" y1="90"  x2="340" y2="48"  stroke="rgba(255,255,255,0.3)"  strokeWidth="0.9"/>

        {/* ── SPECULAR HIGHLIGHT (glass shine) ── */}
        <ellipse
          cx="248" cy="210" rx="78" ry="50"
          fill="white" fillOpacity="0.2"
          transform="rotate(-22 248 210)"
        />
        <ellipse
          cx="236" cy="202" rx="32" ry="20"
          fill="white" fillOpacity="0.38"
          transform="rotate(-22 236 202)"
        />
      </svg>
    </div>
  );
}
