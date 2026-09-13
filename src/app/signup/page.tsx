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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [role, setRole] = useState<RoleOption>("owner");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordStrength =
    password.length >= 10 ? "Strong" : password.length >= 6 ? "Good" : password.length > 0 ? "Needs work" : "";

  const passwordStrengthTone =
    password.length >= 10 ? "text-[var(--green)]" : password.length >= 6 ? "text-[var(--ochre)]" : "text-[var(--terracotta)]";

  const confirmPasswordError =
    confirmPassword && password !== confirmPassword ? "Passwords do not match." : "";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedBusinessName = businessName.trim();

    if (!trimmedName || trimmedName.length < 2) {
      setError("Please enter your full name.");
      return;
    }

    if (!trimmedBusinessName) {
      setError("Please enter your business name.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (confirmPassword !== password) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 300));

    const result = register({
      name: trimmedName,
      email: trimmedEmail,
      password,
      businessName: trimmedBusinessName,
      role,
    });

    if (result.success) {
      router.push("/");
    } else {
      setError(result.error || "Failed to create account.");
      setIsLoading(false);
    }
  };

  return (
    <div className="signup-shell dark-theme">
      <div className="login-brand glass-card">
        <div className="login-brand-inner">
          <div className="flex items-center gap-3 mb-10">
            <div className="login-logo-mark">C</div>
            <div>
              <div className="login-logo-text">Capivo</div>
              <div className="login-logo-sub">Smart Business Ledger</div>
            </div>
          </div>

          <h1 className="login-headline">Set up your Capivo workspace.</h1>
          <p className="login-sub">
            Launch your business dashboard in minutes — choose your role, add your workspace, and start tracking sales, inventory, cash, and profit with confidence.
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

          <div className="signup-benefit-grid">
            <div className="signup-benefit-item">
              <div className="signup-benefit-title">Live oversight</div>
              <div className="signup-benefit-copy">See sales, stock, credit, and branch health from one place.</div>
            </div>
            <div className="signup-benefit-item">
              <div className="signup-benefit-title">Role-based access</div>
              <div className="signup-benefit-copy">Give owners, managers, and audit teams the right level of visibility.</div>
            </div>
            <div className="signup-benefit-item">
              <div className="signup-benefit-title">Built for Nigeria</div>
              <div className="signup-benefit-copy">Stay in English, Hausa, Yoruba, Igbo, or Pidgin from day one.</div>
            </div>
          </div>

          <div className="login-orb login-orb-1" />
          <div className="login-orb login-orb-2" />
        </div>
      </div>

      <div className="login-form-panel glass-card">
        <div className="login-form-inner">
          <div className="mb-8">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--ochre)] mb-2">
              Create workspace
            </div>
            <h2 className="login-form-title">Join Capivo</h2>
            <p className="login-form-sub">Start with your business details and preferred role.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 mt-5">
            <div>
              <label htmlFor="name" className="login-label">Full name</label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
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
                onChange={(e) => {
                  setBusinessName(e.target.value);
                  setError("");
                }}
                placeholder="e.g. Ilé Provisions"
                className="login-input"
              />
            </div>

            <div>
              <label htmlFor="role" className="login-label">Role</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as RoleOption)}
                className="login-input"
              >
                {ROLE_OPTIONS.map((opt) => (
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
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
              {password && (
                <div className="signup-inline-hint">
                  <span>Password strength:</span>
                  <span className={passwordStrengthTone}>{passwordStrength || "Too short"}</span>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="confirm-password" className="login-label">Confirm password</label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setError("");
                  }}
                  placeholder="Re-enter password"
                  className="login-input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-soft)] hover:text-[var(--ink)] transition"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirmPasswordError && (
                <div className="signup-inline-error">{confirmPasswordError}</div>
              )}
            </div>

            {error && <div className="login-error">{error}</div>}

            <button type="submit" disabled={isLoading} className="login-submit-btn">
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="login-spinner" />
                  Creating workspace…
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Create workspace
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
