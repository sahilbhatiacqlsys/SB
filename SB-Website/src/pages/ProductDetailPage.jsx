// src/pages/ProductDetailPage.jsx
import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Check, Sparkles, ArrowLeft } from "lucide-react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, wishlist, toggleWishlist } = useStore();

  const product = products.find((p) => String(p.id) === String(id)) || products[0];
  const isWishlisted = wishlist.includes(product.id);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("features"); // 'features', 'specs', 'reviews'
  const [selectedColor, setSelectedColor] = useState("Midnight Titanium");

  const colors = ["Midnight Titanium", "Cyber Silver", "Deep Violet"];
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  const handleBuyNow = () => {
    addToCart(product, quantity, { selectedVariant: selectedColor });
    navigate("/checkout");
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1280px", margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>
      {/* Back button */}
      <Link
        to="/shop"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          color: "var(--text-secondary)",
          fontSize: "0.88rem",
          marginBottom: "2rem",
          fontWeight: 600,
          transition: "color 0.2s"
        }}
      >
        <ArrowLeft size={16} /> Back to Catalog
      </Link>

      {/* Main Product Showcase Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "3.5rem",
          alignItems: "flex-start",
          marginBottom: "4.5rem"
        }}
      >
        {/* Left Gallery / Main Visual with Zoom effect */}
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "480px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid var(--border)",
              boxShadow: "0 20px 45px rgba(0, 0, 0, 0.6), var(--shadow-glow)"
            }}
          >
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.5s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />

            {/* Badges */}
            <div style={{ position: "absolute", top: "18px", left: "18px", display: "flex", gap: "8px" }}>
              {product.badge && <span className="badge badge-purple">{product.badge}</span>}
              <span className="badge badge-emerald">Verified Stock</span>
            </div>

            {/* Wishlist Button */}
            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              style={{
                position: "absolute",
                top: "18px",
                right: "18px",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                background: "rgba(10, 13, 24, 0.8)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                display: "grid",
                placeItems: "center",
                color: isWishlisted ? "#f43f5e" : "#fff",
                cursor: "pointer",
                transition: "transform 0.2s ease"
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <Heart size={22} fill={isWishlisted ? "#f43f5e" : "none"} />
            </button>
          </div>
        </div>

        {/* Right Product Buy Box */}
        <div>
          {/* Category & Rating */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.6rem" }}>
            <span style={{ color: "var(--accent-purple-light)", fontWeight: 700, fontSize: "0.85rem", textTransform: "uppercase" }}>
              {product.category}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", color: "#fbbf24", fontSize: "0.88rem" }}>
              <Star size={16} fill="#fbbf24" />
              <strong style={{ color: "#fff" }}>{product.rating}</strong>
              <span style={{ color: "var(--text-muted)" }}>({product.reviewsCount} customer reviews)</span>
            </div>
          </div>

          {/* Title */}
          <h1 style={{ fontSize: "2.3rem", color: "#fff", lineHeight: 1.2, marginBottom: "1rem" }}>
            {product.name}
          </h1>

          {/* Pricing */}
          <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "2.2rem", fontWeight: 900, color: "#fff", fontFamily: "var(--font-display)" }}>
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span style={{ fontSize: "1.15rem", color: "var(--text-muted)", textDecoration: "line-through" }}>
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
            <span className="badge badge-emerald">Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}</span>
          </div>

          <p style={{ color: "var(--text-secondary)", fontSize: "0.98rem", lineHeight: 1.6, marginBottom: "2rem" }}>
            {product.description}
          </p>

          {/* Color Finish Variant Selector */}
          <div style={{ marginBottom: "1.8rem" }}>
            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.6rem" }}>
              Color Finish: <strong style={{ color: "#fff" }}>{selectedColor}</strong>
            </label>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {colors.map((color) => {
                const isSelected = selectedColor === color;
                return (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: "0.5rem 1rem",
                      borderRadius: "10px",
                      background: isSelected ? "rgba(139, 92, 246, 0.25)" : "rgba(255, 255, 255, 0.04)",
                      border: isSelected ? "1px solid var(--accent-purple-light)" : "1px solid var(--border)",
                      color: isSelected ? "#fff" : "var(--text-secondary)",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    {isSelected && <Check size={14} color="#a78bfa" />}
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity Selector & Primary CTAs */}
          <div style={{ display: "flex", gap: "1rem", alignItems: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            {/* Quantity */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border)",
                borderRadius: "12px",
                padding: "4px"
              }}
            >
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{
                  width: "36px",
                  height: "36px",
                  color: "#fff",
                  fontSize: "1.2rem",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer"
                }}
              >
                -
              </button>
              <span style={{ width: "36px", textAlign: "center", fontWeight: 800, color: "#fff" }}>
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                style={{
                  width: "36px",
                  height: "36px",
                  color: "#fff",
                  fontSize: "1.2rem",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer"
                }}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="btn-primary"
              onClick={() => addToCart(product, quantity, { selectedVariant: selectedColor })}
              style={{ flex: 1, minWidth: "180px", padding: "0.85rem 1.5rem" }}
            >
              <ShoppingBag size={18} /> Add to Cart
            </button>

            <button
              type="button"
              className="btn-emerald"
              onClick={handleBuyNow}
              style={{ flex: 1, minWidth: "160px", padding: "0.85rem 1.5rem" }}
            >
              Buy Now with CYBER25
            </button>
          </div>

          {/* Delivery & Assurance Checklist */}
          <div
            className="glass-card"
            style={{
              padding: "1.25rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              <Truck size={18} color="#38bdf8" />
              <span>Express Delivery in 2-3 Days</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              <ShieldCheck size={18} color="#34d399" />
              <span>1 Year Official Warranty</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              <RotateCcw size={18} color="#f43f5e" />
              <span>7 Days Hassle-free Returns</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
              <Sparkles size={18} color="#fbbf24" />
              <span>COD / UPI / Card Options</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs: Specifications, Features & Verified Reviews */}
      <div style={{ marginBottom: "4rem" }}>
        <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid var(--border)", marginBottom: "2rem" }}>
          {[
            { id: "features", label: "Key Highlights & Engineering" },
            { id: "reviews", label: `Customer Reviews (${product.reviews?.length || 0})` }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "0.75rem 1.25rem",
                  color: isActive ? "#a78bfa" : "var(--text-secondary)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  borderBottom: isActive ? "2px solid #a78bfa" : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "features" && (
          <div className="glass-panel" style={{ borderRadius: "20px", padding: "2rem" }}>
            <h3 style={{ color: "#fff", marginBottom: "1rem", fontSize: "1.2rem" }}>Technical Specifications:</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
              {product.features?.map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--accent-purple-light)" }} />
                  <span style={{ color: "#e2e8f0", fontSize: "0.95rem" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {product.reviews?.map((rev) => (
              <div key={rev.id} className="glass-panel" style={{ borderRadius: "16px", padding: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "var(--accent-purple)", color: "#fff", display: "grid", placeItems: "center", fontWeight: 700, fontSize: "0.85rem" }}>
                      {rev.user[0]}
                    </div>
                    <div>
                      <h4 style={{ color: "#fff", fontSize: "0.95rem" }}>{rev.user}</h4>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Verified Purchaser • {rev.date}</span>
                    </div>
                  </div>
                  <div style={{ display: "flex", color: "#fbbf24" }}>
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} size={14} fill="#fbbf24" />
                    ))}
                  </div>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>"{rev.comment}"</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Related Gear Suggestions */}
      <div>
        <h3 style={{ fontSize: "1.6rem", color: "#fff", marginBottom: "1.5rem" }}>You May Also Like</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.75rem" }}>
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
