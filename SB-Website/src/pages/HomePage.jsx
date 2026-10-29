// src/pages/HomePage.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../data/storeData";
import { ArrowRight, Sparkles, Zap, Shield, Flame, Gift, Star, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const { products } = useStore();
  const [selectedCat, setSelectedCat] = useState("all");

  const featuredProducts = products.slice(0, 4);
  const bestSellers = products.filter((p) => p.badge?.toLowerCase().includes("seller") || p.rating >= 4.8);

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "4rem" }}>
      {/* ════════ HERO SECTION ════════ */}
      <section
        style={{
          position: "relative",
          minHeight: "82vh",
          display: "flex",
          alignItems: "center",
          padding: "3.5rem 1.5rem",
          maxWidth: "1280px",
          margin: "0 auto",
          overflow: "hidden"
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "3rem",
            alignItems: "center",
            width: "100%",
            zIndex: 2
          }}
        >
          {/* Left Hero Content */}
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "0.4rem 1rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(139, 92, 246, 0.15)",
                border: "1px solid rgba(139, 92, 246, 0.35)",
                color: "var(--accent-purple-light)",
                fontSize: "0.85rem",
                fontWeight: 700,
                marginBottom: "1.5rem"
              }}
              className="animate-pulse-glow"
            >
              <Sparkles size={16} />
              <span>Next-Gen Lifestyle &amp; Tech Collection 2026</span>
            </div>

            <h1
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "1.25rem",
                letterSpacing: "-1.5px"
              }}
            >
              Precision Audio, <br />
              <span className="gradient-text">Elite Runner Shoes</span> &amp; Gadgets.
            </h1>

            <p
              style={{
                fontSize: "clamp(1rem, 2vw, 1.15rem)",
                color: "var(--text-secondary)",
                marginBottom: "2.25rem",
                maxWidth: "520px",
                lineHeight: 1.6
              }}
            >
              Curated flagship headphones, carbon propulsion footwear, and titanium smart wearables crafted for speed, aesthetics, and pure performance.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
              <Link to="/shop" className="btn-primary" style={{ padding: "0.9rem 2rem", fontSize: "1.02rem" }}>
                Explore Collection <ArrowRight size={18} />
              </Link>
              <Link to="/orders" className="btn-secondary" style={{ padding: "0.9rem 1.8rem" }}>
                Track Live Order
              </Link>
            </div>

            {/* Social Trust Metrics */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.75rem",
                marginTop: "3rem",
                paddingTop: "1.5rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.08)"
              }}
            >
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff" }}>4.9★</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>10,000+ Happy Customers</div>
              </div>
              <div style={{ width: "1px", height: "35px", background: "rgba(255, 255, 255, 0.1)" }} />
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#34d399" }}>Instant</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Same-day Dispatch</div>
              </div>
              <div style={{ width: "1px", height: "35px", background: "rgba(255, 255, 255, 0.1)" }} />
              <div>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "var(--accent-purple-light)" }}>100%</div>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>Genuine Warranty</div>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Showcase with Floating Cards */}
          <div style={{ position: "relative", display: "grid", placeItems: "center" }}>
            <div
              style={{
                width: "100%",
                maxWidth: "460px",
                height: "500px",
                borderRadius: "28px",
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.7), 0 0 50px rgba(139, 92, 246, 0.3)",
                border: "1px solid rgba(139, 92, 246, 0.3)"
              }}
              className="animate-float"
            >
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=1000&auto=format&fit=crop&q=80"
                alt="Airpods Pro Max Banner"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover"
                }}
              />
              {/* Overlay Gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, transparent 40%, rgba(10, 13, 24, 0.95) 100%)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  padding: "2rem"
                }}
              >
                <span className="badge badge-purple" style={{ width: "fit-content", marginBottom: "0.5rem" }}>
                  Featured Release
                </span>
                <h3 style={{ fontSize: "1.4rem", color: "#fff", marginBottom: "0.25rem" }}>Airpods Pro Max 2024</h3>
                <p style={{ fontSize: "0.88rem", color: "#94a3b8", marginBottom: "1rem" }}>
                  Spatial Audio with Dynamic Head Tracking &amp; Titanium Headband.
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff" }}>₹9,999</span>
                  <Link to="/product/1" className="btn-primary" style={{ padding: "0.55rem 1.1rem", fontSize: "0.85rem" }}>
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Floating micro glass badges */}
            <div
              className="glass-panel"
              style={{
                position: "absolute",
                top: "20px",
                left: "-20px",
                padding: "0.85rem 1.15rem",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "var(--shadow-md)"
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>👟</span>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#fff" }}>Carbon Propulsion</div>
                <div style={{ fontSize: "0.68rem", color: "#34d399" }}>+85% Energy Return</div>
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                position: "absolute",
                bottom: "30px",
                right: "-15px",
                padding: "0.85rem 1.15rem",
                borderRadius: "16px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                boxShadow: "var(--shadow-md)"
              }}
            >
              <span style={{ fontSize: "1.4rem" }}>⚡</span>
              <div>
                <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#fff" }}>Active Promo</div>
                <div style={{ fontSize: "0.68rem", color: "#a78bfa" }}>Save 25% with CYBER25</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CATEGORY CHIPS STRIP ════════ */}
      <section style={{ maxWidth: "1280px", margin: "1rem auto 3.5rem", padding: "0 1.5rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
            marginBottom: "1.5rem"
          }}
        >
          <div>
            <h2 style={{ fontSize: "1.8rem", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>Browse by Category</span>
            </h2>
            <p style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}>
              Filter products synchronized with SB inventory catalogue
            </p>
          </div>
          <Link
            to="/shop"
            style={{
              color: "var(--accent-purple-light)",
              fontSize: "0.9rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            See All Products ({products.length}) →
          </Link>
        </div>

        <div style={{ display: "flex", gap: "0.85rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCat === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                style={{
                  padding: "0.75rem 1.4rem",
                  borderRadius: "14px",
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(139, 92, 246, 0.3) 0%, rgba(37, 99, 235, 0.3) 100%)"
                    : "rgba(255, 255, 255, 0.03)",
                  border: isSelected ? "1px solid var(--accent-purple-light)" : "1px solid var(--border)",
                  color: isSelected ? "#fff" : "var(--text-secondary)",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  whiteSpace: "nowrap",
                  transition: "all 0.25s ease",
                  cursor: "pointer"
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ════════ FEATURED PRODUCTS GRID ════════ */}
      <section style={{ maxWidth: "1280px", margin: "0 auto 4.5rem", padding: "0 1.5rem" }}>
        <div style={{ marginBottom: "2rem" }}>
          <span className="badge badge-purple" style={{ marginBottom: "0.5rem" }}>Handpicked For You</span>
          <h2 style={{ fontSize: "2rem", color: "#fff" }}>Trending Flagships</h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.75rem"
          }}
        >
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ════════ PROMOTIONAL VIP BANNER (CYBER25 COUPON) ════════ */}
      <section style={{ maxWidth: "1280px", margin: "0 auto 4.5rem", padding: "0 1.5rem" }}>
        <div
          className="glass-panel"
          style={{
            borderRadius: "24px",
            padding: "3rem 2.5rem",
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)",
            border: "1px solid rgba(139, 92, 246, 0.35)",
            boxShadow: "var(--shadow-glow)"
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem",
              alignItems: "center"
            }}
          >
            <div>
              <span className="badge badge-emerald" style={{ marginBottom: "0.75rem" }}>
                Exclusive Promo
              </span>
              <h2 style={{ fontSize: "2.4rem", color: "#fff", lineHeight: 1.2, marginBottom: "0.75rem" }}>
                Get 25% Off Your Entire Cart
              </h2>
              <p style={{ color: "#cbd5e1", fontSize: "1rem", marginBottom: "1.5rem", maxWidth: "480px" }}>
                Apply code <strong>CYBER25</strong> at checkout on all orders above ₹1,999. Includes free insured courier delivery across India.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                <div
                  style={{
                    padding: "0.6rem 1.2rem",
                    borderRadius: "10px",
                    background: "rgba(0, 0, 0, 0.4)",
                    border: "1px dashed rgba(255, 255, 255, 0.3)",
                    fontFamily: "monospace",
                    fontSize: "1.1rem",
                    fontWeight: 800,
                    letterSpacing: "2px",
                    color: "#a78bfa"
                  }}
                >
                  CYBER25
                </div>
                <Link to="/shop" className="btn-emerald">
                  Shop Deal Now <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div className="glass-card" style={{ padding: "1.2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <CheckCircle2 size={24} color="#34d399" />
                <div>
                  <h4 style={{ color: "#fff", fontSize: "0.95rem" }}>Instant Redemption at Checkout</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>One-click auto apply button on Cart &amp; Checkout pages</p>
                </div>
              </div>
              <div className="glass-card" style={{ padding: "1.2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                <CheckCircle2 size={24} color="#34d399" />
                <div>
                  <h4 style={{ color: "#fff", fontSize: "0.95rem" }}>COD &amp; UPI Supported</h4>
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Pay via Razorpay, Google Pay, PhonePe, or Cash on Delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ BEST SELLERS SECTION ════════ */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
          <div>
            <span className="badge badge-emerald" style={{ marginBottom: "0.5rem" }}>Top Rated</span>
            <h2 style={{ fontSize: "2rem", color: "#fff" }}>Customer Favorites</h2>
          </div>
          <Link to="/shop" style={{ color: "var(--accent-purple-light)", fontWeight: 700, fontSize: "0.9rem" }}>
            View Full Catalogue →
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.75rem"
          }}
        >
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
