"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, ArrowRight, User } from "lucide-react";

// Simple role options for demo purposes
const ROLE_OPTIONS = [
  { value: "owner", label: "Business Owner" },
  { value: "worker", label: "Branch Manager" },
  { value: "lissafiTeam", label: "Audit & Reconciliation" },
] as const;

type RoleOption = typeof ROLE_OPTIONS[number]["value"];

export default function SignupPage() {
  const { register } = useAuth();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [role, setRole] = useState<RoleOption>("owner");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    // Simulate a brief UX delay
    await new Promise(r => setTimeout(r, 300));
    const result = register({ name, email, password, businessName, role });
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Failed to create account.");
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-shell dark-theme">
      {/* Left brand panel – reuse same styling as login */}
      <div className="login-brand glass-card">
        <div className="login-brand-inner">
          <div className="flex items-center gap-3 mb-10">
            <div className="login-logo-mark">C</div>
            <div>
              <div className="login-logo-text">Capivo</div>
              <div className="login-logo-sub">Smart Business Ledger</div>
            </div>
          </div>

          <h1 className="login-headline">Create your account.</h1>
          <p className="login-sub">
            Get started with a brand-new workspace — choose your role and business name.
          </p>

          <div className="login-feature-list">
            {[
              "Multi-branch inventory & sales",
              "AI voice commands (5 languages)",
              "OCR receipt scanning",
              "Real-time profit & COGS",
            ].map((f) => (
              <div key={f} className="login-feature-item">
                <User className="w-3.5 h-3.5 text-[var(--ochre-soft)] flex-shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="login-orb login-orb-1" />
          <div className="login-orb login-orb-2" />
        </div>
      </div>

      {/* Right signup form */}
      <div className="login-form-panel glass-card">
        <div className="login-form-inner">
          <div className="mb-8">
            <h2 className="login-form-title">Join Capivo</h2>
            <p className="login-form-sub">Create a new workspace</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-5">
            <div>
              <label htmlFor="name" className="login-label">Full name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={e => { setName(e.target.value); setError(""); }}
                placeholder="Your name"
                className="login-input"
              />
            </div>

            <div>
              <label htmlFor="business" className="login-label">Business name</label>
              <input
                id="business"
                type="text"
                required
                value={businessName}
                onChange={e => { setBusinessName(e.target.value); setError(""); }}
                placeholder="e.g. Ilé Provisions"
                className="login-input"
              />
            </div>

            <div>
              <label htmlFor="role" className="login-label">Role</label>
              <select
                id="role"
                value={role}
                onChange={e => setRole(e.target.value as RoleOption)}
                className="login-input"
              >
                {ROLE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="email" className="login-label">Email address</label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={e => { setEmail(e.target.value); setError(""); }}
                placeholder="you@capivo.ng"
                className="login-input"
              />
            </div>

            <div>
              <label htmlFor="password" className="login-label">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(""); }}
                  placeholder="••••••••"
                  className="login-input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-soft)] hover:text-[var(--ink)] transition"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="login-error">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="login-submit-btn"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="login-spinner" />
                  Creating…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign up
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>
          <p className="text-center text-[11px] text-[var(--ink-soft)] mt-6">
            Already have an account? <a href="/login" className="text-[var(--ochre)] hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
