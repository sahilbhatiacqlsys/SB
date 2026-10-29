import React, { useState } from "react";
import "./login.css";
import ecommerceHero from "../assets/ecommerce_login_hero.jpg";

export default function LoginPage({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Email format validator
  const isValidEmail = (val) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    // Step 1: Check if email is entered
    if (!email.trim()) {
      setEmailError("Please enter your email address.");
      return;
    }

    // Step 2: Check if email is valid format
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address (e.g. admin@sbstore.com).");
      return;
    }

    // Step 3: Check if password is entered
    if (!password) {
      setPasswordError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      if (onLoginSuccess) {
        onLoginSuccess({ email });
      }
    }, 600);
  };

  return (
    <div className="login-root">
      <div className="login-container">
        {/* Left Side: Ecommerce Showcase Demo Visual */}
        <div className="login-visual-side">
          <div className="visual-image-wrapper">
            <img
              src={ecommerceHero}
              alt="Ecommerce Store Demo"
              className="visual-img"
            />
            <div className="visual-gradient-overlay" />
          </div>

          <div className="visual-content">
            <div className="visual-badge">
              <span className="live-dot" />
              <span>SB Ecommerce Admin Portal</span>
            </div>
            <h2 className="visual-title">
              Manage Products, Orders & Customer Growth in Real Time
            </h2>
            <p className="visual-description">
              Streamline multi-channel sales, live inventory, flash discounts, and instant query resolution all from a single cyber-themed command center.
            </p>

            <div className="visual-stats-row">
              <div className="v-stat-card">
                <span className="v-stat-val">₹8.4M+</span>
                <span className="v-stat-lbl">Monthly GMV</span>
              </div>
              <div className="v-stat-card">
                <span className="v-stat-val">99.8%</span>
                <span className="v-stat-lbl">Order Accuracy</span>
              </div>
              <div className="v-stat-card">
                <span className="v-stat-val">24/7</span>
                <span className="v-stat-lbl">Live Support</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="login-form-side">
          <div className="login-box">
            {/* Brand Logo */}
            <div className="login-brand">
              <div className="login-brand-icon">SB</div>
              <div>
                <h1 className="login-brand-title">SB Admin</h1>
                <p className="login-brand-subtitle">Ecommerce Management Suite</p>
              </div>
            </div>

            <div className="login-header-text">
              <h2>Welcome back</h2>
              <p>Sign in to access your administrative dashboard</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="login-form">
              {/* Field 1: Email */}
              <div className="form-group">
                <label htmlFor="login-email" className="form-label">
                  Email Address <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (emailError) setEmailError("");
                    }}
                    placeholder="name@company.com"
                    className={`form-input ${emailError ? "input-error" : ""}`}
                    autoComplete="email"
                  />
                </div>
                <div className="field-error-slot">
                  {emailError && <span className="field-error-text">⚠️ {emailError}</span>}
                </div>
              </div>

              {/* Field 2: Password */}
              <div className="form-group">
                <label htmlFor="login-password" className="form-label">
                  Password <span className="req-star">*</span>
                </label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (passwordError) setPasswordError("");
                    }}
                    placeholder="Enter your password"
                    className={`form-input ${passwordError ? "input-error" : ""}`}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="toggle-pwd-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex="-1"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
                <div className="field-error-slot">
                  {passwordError && <span className="field-error-text">⚠️ {passwordError}</span>}
                </div>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="login-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="btn-spinner-wrap">
                    <span className="btn-spinner" />
                    Signing in...
                  </span>
                ) : (
                  <span>Sign In to Dashboard →</span>
                )}
              </button>
            </form>

            <div className="login-footer">
              <p>🔒 Protected by enterprise-grade 256-bit encryption</p>
              <p>© {new Date().getFullYear()} SB Store Admin. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
