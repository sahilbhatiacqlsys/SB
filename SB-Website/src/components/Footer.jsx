// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Truck, RotateCcw, Headphones, ArrowRight, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "rgba(8, 11, 20, 0.98)",
        borderTop: "1px solid rgba(139, 92, 246, 0.2)",
        marginTop: "4rem",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* 4 Feature Highlights Band with Micro-Animations */}
      <div
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
          padding: "2.5rem 1.5rem",
          background: "rgba(15, 20, 36, 0.4)"
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "2rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(139, 92, 246, 0.15)",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                display: "grid",
                placeItems: "center",
                color: "#a78bfa"
              }}
            >
              <Truck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", color: "#fff", marginBottom: "2px" }}>Free Express Delivery</h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>On all prepaid orders above ₹1,500</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.3)",
                display: "grid",
                placeItems: "center",
                color: "#34d399"
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", color: "#fff", marginBottom: "2px" }}>100% Authentic Guarantee</h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Verified direct manufacturer brands</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(6, 182, 212, 0.15)",
                border: "1px solid rgba(6, 182, 212, 0.3)",
                display: "grid",
                placeItems: "center",
                color: "#38bdf8"
              }}
            >
              <RotateCcw size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", color: "#fff", marginBottom: "2px" }}>7 Days Easy Returns</h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Instant doorstep pickup and refund</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "rgba(244, 63, 94, 0.15)",
                border: "1px solid rgba(244, 63, 94, 0.3)",
                display: "grid",
                placeItems: "center",
                color: "#fb7185"
              }}
            >
              <Headphones size={24} />
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", color: "#fff", marginBottom: "2px" }}>Dedicated 24/7 Support</h4>
              <p style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Live chat &amp; instant ticketing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "3.5rem 1.5rem 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "2.5rem"
        }}
      >
        {/* Brand info */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "1rem" }}>
            <span style={{ fontSize: "1.5rem" }}>⚡</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1.35rem", color: "#fff" }}>
              SB <span style={{ color: "#a78bfa" }}>STORE</span>
            </span>
          </div>
          <p style={{ fontSize: "0.86rem", color: "var(--text-muted)", marginBottom: "1.25rem", lineHeight: 1.6 }}>
            Redefining luxury digital commerce. Engineered for high-speed browsing, authenticated gadgets, flagship electronics, and effortless doorstep fulfillment.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            {["Twitter", "Instagram", "LinkedIn", "YouTube"].map((social) => (
              <span
                key={social}
                style={{
                  padding: "0.35rem 0.65rem",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  fontSize: "0.75rem",
                  color: "var(--text-secondary)",
                  cursor: "pointer"
                }}
              >
                {social}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: "#fff", fontSize: "1.05rem", marginBottom: "1.2rem" }}>Shop Categories</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
            <li><Link to="/shop?category=electric" style={{ transition: "color 0.2s" }}>Flagship Audio &amp; Gadgets</Link></li>
            <li><Link to="/shop?category=shoes" style={{ transition: "color 0.2s" }}>Carbon Propulsion Running Shoes</Link></li>
            <li><Link to="/shop?category=electric" style={{ transition: "color 0.2s" }}>Smart Watches &amp; Wearables</Link></li>
            <li><Link to="/shop?category=fashion" style={{ transition: "color 0.2s" }}>Full-Grain Italian Leather</Link></li>
            <li><Link to="/shop" style={{ transition: "color 0.2s" }}>All New Arrivals 2026</Link></li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 style={{ color: "#fff", fontSize: "1.05rem", marginBottom: "1.2rem" }}>Customer Services</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
            <li><Link to="/orders">Track My Order Status</Link></li>
            <li><Link to="/contact">Raise Support Ticket</Link></li>
            <li><Link to="/profile">Manage Addresses &amp; Profile</Link></li>
            <li><Link to="/wishlist">Saved Favorites Wishlist</Link></li>
            <li><a href="#returns" onClick={(e) => { e.preventDefault(); alert("Returns are free within 7 days of package delivery."); }}>Shipping &amp; Return Policy</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 style={{ color: "#fff", fontSize: "1.05rem", marginBottom: "0.5rem" }}>VIP Insider Club</h4>
          <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "1rem" }}>
            Subscribe to receive private coupon drops, early access sales, and tech reveals.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing! Your ₹500 welcome discount has been emailed.");
            }}
            style={{ display: "flex", gap: "8px" }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email"
              style={{
                flex: 1,
                padding: "0.6rem 0.85rem",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border)",
                color: "#fff",
                fontSize: "0.85rem",
                outline: "none"
              }}
            />
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: "0.6rem 1rem", fontSize: "0.85rem" }}
            >
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255, 255, 255, 0.05)",
          padding: "1.5rem",
          textAlign: "center",
          fontSize: "0.82rem",
          color: "var(--text-muted)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          maxWidth: "1280px",
          margin: "0 auto"
        }}
      >
        <div>
          © 2026 SB Store. Built for modern web pair programming. All rights reserved.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span>Crafted with</span>
          <Heart size={14} fill="#f43f5e" color="#f43f5e" />
          <span>and dynamic React + Vite architecture</span>
        </div>
      </div>
    </footer>
  );
}
