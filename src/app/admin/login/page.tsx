"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

import Image from "next/image";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in both email and password!",
        confirmButtonColor: "#00875A",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Invalid credentials");
      }

      // Save token and admin info
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminData", JSON.stringify(data.admin));

      Swal.fire({
        icon: "success",
        title: "Welcome Back!",
        text: `Logged in successfully as Super Admin (${data.admin.name})`,
        timer: 2000,
        showConfirmButton: false,
        background: "#ffffff",
      });

      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 1200);

    } catch (err: any) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message || "Could not connect to server.",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        {/* Logo */}
        <div className="admin-login-brand">
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
            <Image src="/logo-icon.png" alt="TAAPTI Logo" width={48} height={48} priority style={{ objectFit: "contain" }} />
          </div>
          <h2>TAAPT<span style={{ color: "#10243E" }}>I</span></h2>
          <p>SUPER ADMIN PORTAL</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="admin-input-group">
            <label>Admin Email Address</label>
            <input
              type="email"
              placeholder="admin@taapti.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? "Authenticating..." : "Sign In to Super Admin"}
          </button>
        </form>

        <div className="admin-login-footer">
          <p>Protected System — Authorized Personnel Only</p>
          <small>Default credentials: <code>admin@taapti.com</code> / <code>Admin@12345</code></small>
        </div>
      </div>
    </div>
  );
}
