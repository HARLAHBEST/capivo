"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff, Sparkles, ArrowRight, ChevronRight } from "lucide-react";

const DEMO_CREDENTIALS = [
  {
    email: "amina@capivo.ng",
    password: "owner123",
    label: "Business Owner",
    sublabel: "Full access — all branches & reports",
    color: "var(--ochre)",
    bg: "rgba(192,138,30,0.12)",
  },
  {
    email: "tunde@capivo.ng",
    password: "manager123",
    label: "Branch Manager",
    sublabel: "Operational access — Yaba branch",
    color: "var(--green)",
    bg: "rgba(46,107,74,0.12)",
  },
  {
    email: "audit@capivo.ng",
    password: "audit123",
    label: "Audit Team",
    sublabel: "Read-only — reconciliation & logs",
    color: "#7B8AE0",
    bg: "rgba(123,138,224,0.12)",
  },
];

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Small delay for UX
    await new Promise((r) => setTimeout(r, 400));

    const result = login(email, password);
    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Invalid credentials.");
      setIsLoading(false);
    }
  };

  const autofill = (cred: (typeof DEMO_CREDENTIALS)[0]) => {
    setEmail(cred.email);
    setPassword(cred.password);
    setError("");
  };

  return (
    <div className="login-shell">
      {/* Left: Brand panel */}
      <div className="login-brand">
        <div className="login-brand-inner">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-10">
            <div className="login-logo-mark">C</div>
            <div>
              <div className="login-logo-text">Capivo</div>
              <div className="login-logo-sub">Smart Business Ledger</div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="login-headline">
            Run every branch.<br />
            Track every naira.
          </h1>
          <p className="login-sub">
            The all-in-one financial command centre for Nigerian SMEs — in English,
            Hausa, Yoruba, Igbo, and Pidgin.
          </p>

          {/* Feature pills */}
          <div className="login-feature-list">
            {[
              "Multi-branch inventory & sales",
              "AI voice commands (5 languages)",
              "OCR receipt scanning",
              "Real-time profit & COGS",
              "Monthly reconciliation & audit logs",
            ].map((f) => (
              <div key={f} className="login-feature-item">
                <ChevronRight className="w-3.5 h-3.5 text-[var(--ochre-soft)] flex-shrink-0" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative gradient orb */}
        <div className="login-orb login-orb-1" />
        <div className="login-orb login-orb-2" />
      </div>

      {/* Right: Login form */}
      <div className="login-form-panel">
        <div className="login-form-inner">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[var(--ochre)]" />
              <span className="text-xs font-semibold text-[var(--ochre)] uppercase tracking-widest">
                Demo Access
              </span>
            </div>
            <h2 className="login-form-title">Welcome back</h2>
            <p className="login-form-sub">Sign in to your Capivo workspace</p>
          </div>

          {/* Demo credential quick-fill */}
          <div className="mb-6">
            <div className="text-[11px] font-semibold text-[var(--ink-soft)] uppercase tracking-wider mb-2">
              Quick sign-in as:
            </div>
            <div className="grid grid-cols-1 gap-2">
              {DEMO_CREDENTIALS.map((cred) => (
                <button
                  key={cred.email}
                  type="button"
                  onClick={() => autofill(cred)}
                  className="login-cred-btn"
                  style={{
                    borderColor: email === cred.email ? cred.color : "var(--line)",
                    background: email === cred.email ? cred.bg : "transparent",
                  }}
                >
                  <div>
                    <div
                      className="text-[12.5px] font-semibold"
                      style={{ color: email === cred.email ? cred.color : "var(--ink)" }}
                    >
                      {cred.label}
                    </div>
                    <div className="text-[11px] text-[var(--ink-soft)]">{cred.sublabel}</div>
                  </div>
                  <ArrowRight
                    className="w-3.5 h-3.5 flex-shrink-0"
                    style={{ color: cred.color, opacity: email === cred.email ? 1 : 0.3 }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="login-divider">
            <span>or enter manually</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mt-5">
            <div>
              <label htmlFor="login-email" className="login-label">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                placeholder="you@capivo.ng"
                className="login-input"
              />
            </div>

            <div>
              <label htmlFor="login-password" className="login-label">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
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

            {/* Error */}
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            <button
              id="login-submit"
              type="submit"
              disabled={isLoading}
              className="login-submit-btn"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="login-spinner" />
                  Signing in…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Sign in to Capivo
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-[11px] text-[var(--ink-soft)] mt-6">
            This is a demo environment. No data is sent to any server.
          </p>
        </div>
      </div>
    </div>
  );
}
