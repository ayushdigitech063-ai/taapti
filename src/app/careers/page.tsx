"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Swal from "sweetalert2";
import { Country, State, City } from "country-state-city";

const benefits = [
  {
    number: "01",
    title: "Work on Production Systems",
    subtitle: "Real Scale & Impact",
    description:
      "Build software that powers real businesses. Your engineering decisions have direct impact on system architecture, uptime, and user experience.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "True Engineering Ownership",
    subtitle: "No Micro-Management",
    description:
      "Own your features end-to-end—from system design and code implementation to automated testing and cloud deployment.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Modern Tech Stack",
    subtitle: "Next.js, AI, RAG & Cloud",
    description:
      "Work with cutting-edge tools including TypeScript, Next.js, Python, Vector DBs, Kubernetes, and automated CI/CD pipelines.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Remote-First Flexibility",
    subtitle: "Work From Anywhere",
    description:
      "We operate with asynchronous communication, flexible hours, and a high-trust culture focused on output rather than hours spent at a desk.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Competitive Compensation",
    subtitle: "Top Market Pay",
    description:
      "Above-market salaries, performance bonuses, health benefits, equipment budget, and annual learning stipends for courses and conferences.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Fast Career Velocity",
    subtitle: "Grow With The Firm",
    description:
      "As a founder-led engineering company, top performers quickly step into technical leadership, architecture design, and client partner roles.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
];

const hiringProcess = [
  {
    step: "01",
    title: "Profile Review",
    desc: "We review your portfolio, GitHub, or previous technical work to evaluate your engineering depth.",
  },
  {
    step: "02",
    title: "Introductory Sync",
    desc: "A 20-minute casual video call to align on career goals, working style, and team fit.",
  },
  {
    step: "03",
    title: "Technical Discussion",
    desc: "A hands-on discussion reviewing real-world system architecture or code structure with senior leads.",
  },
  {
    step: "04",
    title: "Offer & Onboarding",
    desc: "Fast offer rollout with clear equity/salary terms, followed by smooth engineering onboarding.",
  },
];

const openRoles = [
  {
    id: "mern-lead",
    department: "Engineering",
    title: "Senior Full-Stack Engineer (MERN / Next.js)",
    type: "Full-Time",
    location: "Remote (India / Global)",
    experience: "3+ Years",
    description:
      "Lead feature development for high-growth web applications using React, Next.js, Node.js, and PostgreSQL/MongoDB.",
    stack: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "TailwindCSS"],
  },
  {
    id: "backend-arch",
    department: "Engineering",
    title: "Senior Backend Systems Engineer",
    type: "Full-Time",
    location: "Remote",
    experience: "4+ Years",
    description:
      "Architect high-throughput microservices, Redis caching layers, and resilient database models for mission-critical apps.",
    stack: ["Node.js", "Python", "Go", "Redis", "PostgreSQL", "Docker", "AWS"],
  },
  {
    id: "ai-engineer",
    department: "AI & Data",
    title: "AI / LLM Solutions Engineer",
    type: "Full-Time",
    location: "Remote",
    experience: "2+ Years",
    description:
      "Build RAG pipelines, integrate LLMs, optimize vector search, and build intelligent AI agents for enterprise workflows.",
    stack: ["Python", "LangChain", "Pinecone", "OpenAI API", "PyTorch", "FastAPI"],
  },
  {
    id: "devops-engineer",
    department: "Engineering",
    title: "DevOps & Cloud Infrastructure Specialist",
    type: "Full-Time",
    location: "Remote",
    experience: "3+ Years",
    description:
      "Automate multi-cloud deployments, maintain Kubernetes clusters, setup CI/CD pipelines, and manage system monitoring.",
    stack: ["Kubernetes", "Docker", "AWS", "Terraform", "GitHub Actions", "Grafana"],
  },
];

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [jobs, setJobs] = useState<any[]>(openRoles);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [isSubmittingApply, setIsSubmittingApply] = useState(false);
  const [isUploadingResume, setIsUploadingResume] = useState(false);

  // Country State City selectors
  const [selectedCountryCode, setSelectedCountryCode] = useState("IN");
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [selectedCityName, setSelectedCityName] = useState("");

  const [applyForm, setApplyForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    experienceYears: "3 Years",
    currentCompany: "",
    expectedCtc: "",
    noticePeriod: "Immediate / 15 Days",
    linkedinUrl: "",
    portfolioUrl: "",
    resumeUrl: "",
    coverLetter: "",
  });

  // Editable page content state
  const [pageContent, setPageContent] = useState<any>(null);

  const fetchJobs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/careers/jobs?status=Open").catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data && json.data.length > 0) {
          const mapped = json.data.map((j: any) => ({
            id: j._id,
            department: j.department || "Engineering",
            title: j.title,
            type: j.type || "Full-Time",
            location: j.location || "Surat, India / Remote",
            experience: j.experience || "3+ Years",
            salaryRange: j.salaryRange || "Competitive",
            description: j.description || "",
            stack: j.requirements && j.requirements.length > 0 ? j.requirements : ["React", "Node.js", "TypeScript", "Next.js"],
          }));
          setJobs(mapped);
        }
      }
    } catch { /* silent */ }
  };

  const fetchPageContent = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/careers/page").catch(() => null);
      if (res && res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setPageContent(json.data);
        }
      }
    } catch { /* silent */ }
  };

  useEffect(() => {
    fetchJobs();
    fetchPageContent();
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      const bc = new BroadcastChannel("taapti_cms_updates");
      bc.onmessage = () => {
        fetchJobs();
        fetchPageContent();
      };
      return () => bc.close();
    }
  }, []);

  const handleOpenApplyModal = (job: any) => {
    setSelectedJob(job);
    setSelectedCountryCode("IN");
    setSelectedStateCode("");
    setSelectedCityName("");
    setApplyForm({
      fullName: "",
      email: "",
      phone: "",
      location: "",
      experienceYears: job.experience || "3 Years",
      currentCompany: "",
      expectedCtc: "",
      noticePeriod: "Immediate / 15 Days",
      linkedinUrl: "",
      portfolioUrl: "",
      resumeUrl: "",
      coverLetter: "",
    });
    setIsApplyModalOpen(true);
  };

  useEffect(() => {
    if (isApplyModalOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isApplyModalOpen]);

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploadingResume(true);
    const fd = new FormData();
    fd.append("image", file); // api/upload takes image/file

    try {
      const res = await fetch("http://localhost:5000/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        setApplyForm((prev) => ({ ...prev, resumeUrl: data.url }));
        Swal.fire({ icon: "success", title: "Resume Uploaded!", text: `${file.name} uploaded successfully.`, timer: 1500, showConfirmButton: false });
      } else {
        Swal.fire("Upload Error", data.message || "Could not upload resume", "error");
      }
    } catch {
      Swal.fire("Upload Error", "Could not connect to server for file upload", "error");
    } finally {
      setIsUploadingResume(false);
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyForm.fullName.trim() || !applyForm.email.trim() || !applyForm.phone.trim()) {
      Swal.fire("Required Fields", "Please enter your Full Name, Email, and Phone Number.", "warning");
      return;
    }
    if (!applyForm.resumeUrl) {
      Swal.fire("Resume Required", "Please upload your resume file before submitting.", "warning");
      return;
    }

    setIsSubmittingApply(true);
    try {
      const payload = {
        jobId: selectedJob?.id,
        jobTitle: selectedJob?.title || "General Application",
        ...applyForm,
      };

      const res = await fetch("http://localhost:5000/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined" && "BroadcastChannel" in window) {
          const bc = new BroadcastChannel("taapti_cms_updates");
          bc.postMessage("JOB_APPLICATION_SUBMITTED");
          bc.close();
        }

        Swal.fire({
          icon: "success",
          title: "Application Submitted! 🎉",
          text: `Thank you ${applyForm.fullName}! Your resume for '${selectedJob?.title}' has been sent to our recruitment team.`,
          confirmButtonColor: "#00875A",
        });

        setIsApplyModalOpen(false);
      } else {
        Swal.fire("Error", data.message || "Failed to submit application", "error");
      }
    } catch {
      Swal.fire("Error", "Could not connect to server", "error");
    } finally {
      setIsSubmittingApply(false);
    }
  };

  const filteredRoles = jobs.filter((role) => {
    return selectedDepartment === "All" || role.department === selectedDepartment;
  });

  return (
    <main style={{ backgroundColor: "#f8fafc", color: "#0f172a" }}>
      {/* Dynamic Light Hero Banner */}
      <section
        style={{
          position: "relative",
          background: "linear-gradient(120deg, #f0f7ff 0%, #e0f0ff 45%, #eff6ff 80%, #f8fafc 100%)",
          padding: "140px 0 100px",
          borderBottom: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        {/* Soft Decorative Background SVG Curved Lines */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100%", height: "100%", opacity: 0.85 }}
            preserveAspectRatio="none"
          >
            <path
              d="M750 -100 C 950 150, 1150 450, 1600 650"
              stroke="#10243E"
              strokeWidth="1.5"
              strokeOpacity="0.25"
            />
            <circle cx="1130" cy="130" r="6" fill="#00875A" />
            <path
              d="M600 -50 Q 1000 250 1500 450"
              stroke="#00875A"
              strokeWidth="1"
              strokeDasharray="4 4"
              strokeOpacity="0.3"
            />
          </svg>
        </div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "780px" }} className="animate-from-left">
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 16px",
                borderRadius: "999px",
                background: "#ffffff",
                border: "1px solid #a7f3d0",
                boxShadow: "0 4px 15px rgba(0,135,90,0.06)",
                fontSize: "13px",
                fontWeight: "700",
                color: "#00875A",
                marginBottom: "24px",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#00875A",
                  boxShadow: "0 0 8px #00875A",
                }}
              />
              {pageContent?.heroBadge || "We Are Hiring — Join Our Engineering Team"}
            </div>

            <h1
              style={{
                fontSize: "clamp(40px, 5.5vw, 68px)",
                fontWeight: "800",
                lineHeight: "1.1",
                letterSpacing: "-0.035em",
                color: "#0a0d14",
                marginBottom: "24px",
              }}
            >
              {pageContent?.heroTitleNormal || "Build high-impact software."}{" "}
              <span style={{ color: "#10243E", display: "block" }}>
                {pageContent?.heroTitleHighlight || "Accelerate your career."}
              </span>
            </h1>

            <p
              style={{
                fontSize: "clamp(17px, 1.3vw, 20px)",
                lineHeight: "1.7",
                color: "#475569",
                marginBottom: "36px",
                maxWidth: "700px",
              }}
            >
              {pageContent?.heroDescription || "Taapti Technologies is looking for senior developers and architects passionate about clean code, high availability systems, and modern AI engineering."}
            </p>

            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <a
                href="#open-roles"
                className="btn btn-primary"
                style={{
                  height: "54px",
                  padding: "0 32px",
                  borderRadius: "999px",
                  background: "#00875A",
                  boxShadow: "0 8px 20px rgba(0,135,90,0.3)",
                }}
              >
                View Open Positions <span>↓</span>
              </a>
              <Link
                href="/about"
                className="btn btn-outline"
                style={{
                  height: "54px",
                  padding: "0 28px",
                  borderRadius: "999px",
                  background: "#ffffff",
                  borderColor: "#cbd5e1",
                  color: "#0f172a",
                }}
              >
                Learn About Our Culture
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join Taapti - Perks */}
      <section style={{ padding: "100px 0", background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 60px" }}>
            <span
              style={{
                color: "#00875A",
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              PERKS & BENEFITS
            </span>
            <h2
              style={{
                fontSize: "clamp(30px, 3.5vw, 44px)",
                fontWeight: "800",
                color: "#0f172a",
                marginTop: "8px",
              }}
            >
              Why engineers thrive at Taapti
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "28px",
            }}
          >
            {(pageContent?.benefitsList && pageContent.benefitsList.length > 0 ? pageContent.benefitsList : benefits).map((b: any, idx: number) => (
              <div
                key={b.number || idx}
                className={idx % 2 === 0 ? "animate-from-left" : "animate-from-right"}
                style={{
                  background: "#f8fafc",
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  padding: "36px",
                  transition: "all 0.3s ease",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "24px",
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "16px",
                      background: "#00875A",
                      color: "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 8px 20px rgba(0,135,90,0.25)",
                    }}
                  >
                    {b.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "24px",
                      fontWeight: "800",
                      color: "#cbd5e1",
                    }}
                  >
                    {b.number}
                  </span>
                </div>

                <div style={{ fontSize: "12px", fontWeight: "800", color: "#00875A", textTransform: "uppercase", marginBottom: "6px" }}>
                  {b.subtitle}
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: "800", color: "#0f172a", marginBottom: "12px" }}>
                  {b.title}
                </h3>
                <p style={{ fontSize: "14.5px", color: "#64748b", lineHeight: "1.65" }}>
                  {b.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="open-roles" style={{ padding: "100px 0", background: "#f8fafc" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 40px" }}>
            <span
              style={{
                color: "#00875A",
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              ACTIVE HIRING
            </span>
            <h2
              style={{
                fontSize: "clamp(30px, 3.5vw, 44px)",
                fontWeight: "800",
                color: "#0f172a",
                marginTop: "8px",
              }}
            >
              Current Job Openings ({jobs.length})
            </h2>
            <p style={{ color: "#64748b", fontSize: "16px", marginTop: "8px" }}>
              Explore our active engineering positions and submit your resume directly.
            </p>
          </div>

          {/* Department Filter Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              flexWrap: "wrap",
              marginBottom: "40px",
            }}
          >
            {["All", "Engineering", "AI & Data", "DevOps & Security"].map((dept) => {
              const isActive = selectedDepartment === dept;
              return (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  style={{
                    padding: "9px 20px",
                    borderRadius: "999px",
                    fontSize: "13px",
                    fontWeight: "700",
                    border: isActive ? "none" : "1px solid #cbd5e1",
                    background: isActive ? "#00875A" : "#ffffff",
                    color: isActive ? "#ffffff" : "#475569",
                    cursor: "pointer",
                    boxShadow: isActive ? "0 4px 14px rgba(0,135,90,0.25)" : "none",
                  }}
                >
                  {dept}
                </button>
              );
            })}
          </div>

          {/* Roles Cards Grid */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {filteredRoles.map((role, idx) => (
              <div
                key={role.id || idx}
                className={idx % 2 === 0 ? "animate-from-left" : "animate-from-right"}
                style={{
                  background: "#ffffff",
                  borderRadius: "24px",
                  border: "1px solid #e2e8f0",
                  padding: "36px",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "24px",
                  alignItems: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                  transition: "all 0.3s ease",
                }}
              >
                <div>
                  <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" }}>
                    <span
                      style={{
                        background: "#E3FCEF",
                        color: "#00875A",
                        fontSize: "11.5px",
                        fontWeight: "800",
                        padding: "4px 12px",
                        borderRadius: "999px",
                        textTransform: "uppercase",
                      }}
                    >
                      {role.department}
                    </span>
                    <span style={{ fontSize: "13px", color: "#64748b", fontWeight: "600" }}>{role.location}</span>
                    <span style={{ fontSize: "13px", color: "#94a3b8" }}>• {role.type}</span>
                    {role.salaryRange && (
                      <span style={{ fontSize: "12px", background: "#FEF3C7", color: "#92400E", fontWeight: "700", padding: "3px 8px", borderRadius: "6px" }}>
                        💰 {role.salaryRange}
                      </span>
                    )}
                  </div>

                  <h3 style={{ fontSize: "24px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
                    {role.title}
                  </h3>

                  <p style={{ fontSize: "14.5px", color: "#64748b", lineHeight: "1.6", marginBottom: "18px" }}>
                    {role.description}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {role.stack.map((tech: string, i: number) => (
                      <span
                        key={i}
                        style={{
                          background: "#f1f5f9",
                          color: "#475569",
                          fontSize: "12px",
                          fontWeight: "700",
                          padding: "4px 10px",
                          borderRadius: "6px",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", gap: "12px" }}>
                  <div style={{ fontSize: "13px", color: "#64748b", fontWeight: "600" }}>
                    Exp Required: <strong style={{ color: "#0f172a" }}>{role.experience}</strong>
                  </div>
                  <button
                    onClick={() => handleOpenApplyModal(role)}
                    className="btn btn-primary"
                    style={{
                      height: "48px",
                      padding: "0 28px",
                      fontSize: "14px",
                      borderRadius: "999px",
                      background: "#00875A",
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 8px 20px rgba(0,135,90,0.3)",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#FFF",
                      fontWeight: "700"
                    }}
                  >
                    Apply Now <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* CANDIDATE JOB APPLICATION MODAL FORM WITH RESUME UPLOAD */}
      {/* ------------------------------------------------------------- */}
      {isApplyModalOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999999, background: "rgba(15, 23, 42, 0.75)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div style={{ background: "#FFF", borderRadius: "20px", width: "100%", maxWidth: "720px", maxHeight: "90dvh", overflowY: "auto", boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)", display: "flex", flexDirection: "column" }}>
            
            {/* Modal Header */}
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC", borderTopLeftRadius: "20px", borderTopRightRadius: "20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#00875A", textTransform: "uppercase", letterSpacing: "0.08em" }}>CANDIDATE APPLICATION</span>
                <h2 style={{ fontSize: "17px", fontWeight: "800", color: "#0F172A", margin: "2px 0 0 0", lineHeight: "1.3" }}>
                  Applying for: {selectedJob?.title}
                </h2>
              </div>
              <button
                onClick={() => setIsApplyModalOpen(false)}
                style={{ background: "#E2E8F0", color: "#475569", border: "none", width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", fontWeight: "800", fontSize: "15px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body / Form */}
            <form onSubmit={handleSubmitApplication} style={{ padding: "28px 30px", display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {/* Row 1: Full Name & Email */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikramaditya Singh"
                    value={applyForm.fullName}
                    onChange={(e) => setApplyForm({ ...applyForm, fullName: e.target.value })}
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. vikram@gmail.com"
                    value={applyForm.email}
                    onChange={(e) => setApplyForm({ ...applyForm, email: e.target.value })}
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                  />
                </div>
              </div>

              {/* Row 2: Phone Number */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={applyForm.phone}
                  onChange={(e) => setApplyForm({ ...applyForm, phone: e.target.value })}
                  style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                />
              </div>

              {/* Location Selectors: Country, State, City */}
              <div style={{ background: "#F8FAFC", padding: "16px", borderRadius: "14px", border: "1px solid #E2E8F0", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Country *</label>
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => {
                      const cCode = e.target.value;
                      setSelectedCountryCode(cCode);
                      setSelectedStateCode("");
                      setSelectedCityName("");
                      const cObj = Country.getCountryByCode(cCode);
                      setApplyForm((prev) => ({ ...prev, location: cObj ? cObj.name : "" }));
                    }}
                    style={{ width: "100%", padding: "10px 10px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", background: "#FFF" }}
                  >
                    {Country.getAllCountries().map((c) => (
                      <option key={c.isoCode} value={c.isoCode}>
                        {c.flag} {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>State / Region</label>
                  <select
                    value={selectedStateCode}
                    onChange={(e) => {
                      const sCode = e.target.value;
                      setSelectedStateCode(sCode);
                      setSelectedCityName("");
                      const cObj = Country.getCountryByCode(selectedCountryCode);
                      const sObj = State.getStateByCodeAndCountry(sCode, selectedCountryCode);
                      const locStr = `${sObj ? sObj.name + ", " : ""}${cObj ? cObj.name : ""}`;
                      setApplyForm((prev) => ({ ...prev, location: locStr }));
                    }}
                    style={{ width: "100%", padding: "10px 10px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", background: "#FFF" }}
                  >
                    <option value="">Select State</option>
                    {State.getStatesOfCountry(selectedCountryCode).map((s) => (
                      <option key={s.isoCode} value={s.isoCode}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>City / District</label>
                  {selectedStateCode ? (
                    <select
                      value={selectedCityName}
                      onChange={(e) => {
                        const cName = e.target.value;
                        setSelectedCityName(cName);
                        const cObj = Country.getCountryByCode(selectedCountryCode);
                        const sObj = State.getStateByCodeAndCountry(selectedStateCode, selectedCountryCode);
                        const locStr = `${cName ? cName + ", " : ""}${sObj ? sObj.name + ", " : ""}${cObj ? cObj.name : ""}`;
                        setApplyForm((prev) => ({ ...prev, location: locStr }));
                      }}
                      style={{ width: "100%", padding: "10px 10px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", background: "#FFF" }}
                    >
                      <option value="">Select City</option>
                      {City.getCitiesOfState(selectedCountryCode, selectedStateCode).map((city, idx) => (
                        <option key={`${city.name}-${idx}`} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      placeholder="Enter City name"
                      value={selectedCityName}
                      onChange={(e) => {
                        const cName = e.target.value;
                        setSelectedCityName(cName);
                        const cObj = Country.getCountryByCode(selectedCountryCode);
                        const locStr = `${cName ? cName + ", " : ""}${cObj ? cObj.name : ""}`;
                        setApplyForm((prev) => ({ ...prev, location: locStr }));
                      }}
                      style={{ width: "100%", padding: "9px 12px", border: "1px solid #CBD5E1", borderRadius: "8px", fontSize: "13px", background: "#FFF" }}
                    />
                  )}
                </div>
              </div>

              {/* Row 3: Total Experience & Notice Period */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Total Experience (Years)</label>
                  <input
                    type="text"
                    placeholder="e.g. 4.5 Years"
                    value={applyForm.experienceYears}
                    onChange={(e) => setApplyForm({ ...applyForm, experienceYears: e.target.value })}
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Notice Period / Availability</label>
                  <input
                    type="text"
                    placeholder="e.g. Immediate / 15 Days / 30 Days"
                    value={applyForm.noticePeriod}
                    onChange={(e) => setApplyForm({ ...applyForm, noticePeriod: e.target.value })}
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                  />
                </div>
              </div>

              {/* Row 4: LinkedIn & Portfolio URL */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>LinkedIn Profile / GitHub</label>
                  <input
                    type="url"
                    placeholder="https://linkedin.in/in/username"
                    value={applyForm.linkedinUrl}
                    onChange={(e) => setApplyForm({ ...applyForm, linkedinUrl: e.target.value })}
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Portfolio / Website (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://yourportfolio.com"
                    value={applyForm.portfolioUrl}
                    onChange={(e) => setApplyForm({ ...applyForm, portfolioUrl: e.target.value })}
                    style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                  />
                </div>
              </div>

              {/* Resume File Upload Field */}
              <div style={{ background: "#F8FAFC", padding: "18px", borderRadius: "14px", border: "1.5px dashed #CBD5E1", textAlign: "center" }}>
                <label style={{ display: "block", fontSize: "13px", fontWeight: "800", color: "#0F172A", marginBottom: "4px" }}>
                  Upload Resume / CV Document (.PDF, .DOC, .DOCX) *
                </label>
                <p style={{ fontSize: "12px", color: "#64748B", margin: "0 0 12px 0" }}>Upload your updated resume file for HR screening</p>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "12px" }}>
                  <label style={{ background: "#00875A", color: "#FFF", padding: "10px 20px", borderRadius: "10px", fontSize: "13px", fontWeight: "700", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    {isUploadingResume ? "Uploading Resume..." : "📄 Select & Upload Resume"}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,image/*"
                      style={{ display: "none" }}
                      onChange={handleResumeUpload}
                    />
                  </label>
                </div>

                {applyForm.resumeUrl && (
                  <div style={{ marginTop: "12px", padding: "8px 14px", background: "#DCFCE7", color: "#166534", borderRadius: "8px", fontSize: "12px", fontWeight: "700", display: "inline-flex", alignItems: "center", gap: "8px" }}>
                    <span>✓ Resume Uploaded Successfully!</span>
                    <a href={applyForm.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#15803D", textDecoration: "underline" }}>View File</a>
                  </div>
                )}
              </div>

              {/* Cover Letter */}
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "700", color: "#334155", marginBottom: "6px" }}>Cover Letter / Brief Pitch (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us why you are a great fit for this position..."
                  value={applyForm.coverLetter}
                  onChange={(e) => setApplyForm({ ...applyForm, coverLetter: e.target.value })}
                  style={{ width: "100%", padding: "11px 14px", border: "1px solid #CBD5E1", borderRadius: "10px", fontSize: "14px" }}
                />
              </div>

              {/* Modal Actions */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", paddingTop: "12px", borderTop: "1px solid #E2E8F0" }}>
                <button
                  type="button"
                  onClick={() => setIsApplyModalOpen(false)}
                  style={{ padding: "11px 22px", background: "#E2E8F0", color: "#475569", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingApply || isUploadingResume}
                  style={{ padding: "11px 24px", background: "#00875A", color: "#FFF", border: "none", borderRadius: "10px", fontWeight: "700", fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(0, 135, 90, 0.3)" }}
                >
                  {isSubmittingApply ? "Submitting..." : "Submit Application 🚀"}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Hiring Process */}
      <section style={{ padding: "100px 0", background: "#ffffff" }}>
        <div className="container">
          <div style={{ textAlign: "center", maxWidth: "720px", margin: "0 auto 60px" }}>
            <span
              style={{
                color: "#00875A",
                fontSize: "13px",
                fontWeight: "800",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              HOW WE HIRE
            </span>
            <h2
              style={{
                fontSize: "clamp(30px, 3.5vw, 44px)",
                fontWeight: "800",
                color: "#0f172a",
                marginTop: "8px",
              }}
            >
              Our straightforward hiring process
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {hiringProcess.map((item, idx) => (
              <div
                key={item.step}
                className={idx % 2 === 0 ? "animate-from-left" : "animate-from-right"}
                style={{
                  background: "#f8fafc",
                  borderRadius: "20px",
                  border: "1px solid #e2e8f0",
                  padding: "32px",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "800",
                    color: "#00875A",
                    marginBottom: "16px",
                  }}
                >
                  {item.step}
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#0f172a", marginBottom: "8px" }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* General Application CTA */}
      <section style={{ padding: "80px 0 120px", background: "#f8fafc" }}>
        <div className="container">
          <div
            className="animate-from-left"
            style={{
              background: "linear-gradient(135deg, #0b0f19 0%, #0f172a 100%)",
              borderRadius: "32px",
              padding: "60px 40px",
              color: "#ffffff",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "40px",
              alignItems: "center",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.3)",
            }}
          >
            <div>
              <span
                style={{
                  color: "#00875A",
                  fontSize: "12px",
                  fontWeight: "800",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: "12px",
                  display: "inline-block",
                }}
              >
                Spontaneous Application
              </span>
              <h2 style={{ fontSize: "36px", fontWeight: "800", color: "#ffffff", marginBottom: "12px" }}>
                Don&apos;t see your role?
              </h2>
              <p style={{ color: "#94a3b8", fontSize: "16px", lineHeight: "1.65" }}>
                We are always open to connecting with senior developers, cloud architects, and AI researchers. Send us your resume or GitHub link directly.
              </p>
            </div>

            <div style={{ textAlign: "right" }}>
              <Link
                href="/contact"
                className="btn btn-primary"
                style={{
                  height: "56px",
                  padding: "0 36px",
                  fontSize: "16px",
                  borderRadius: "999px",
                  background: "#00875A",
                  boxShadow: "0 8px 30px rgba(0,135,90,0.4)",
                }}
              >
                Send General Application <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}