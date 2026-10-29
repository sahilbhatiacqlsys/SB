// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { Heart, ShoppingBag, Star, Zap } from "lucide-react";

export default function ProductCard({ product }) {
  const { wishlist, toggleWishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="glass-card animate-fade-in"
      style={{
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        group: "card"
      }}
    >
      {/* Product Image Area with Badges & Wishlist Trigger */}
      <div
        style={{
          position: "relative",
          width: "100%",
          paddingTop: "90%",
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(0, 0, 0, 0.4) 100%)",
          overflow: "hidden"
        }}
      >
        <Link to={`/product/${product.id}`} style={{ display: "block" }}>
          <img
            src={product.img}
            alt={product.name}
            loading="lazy"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Link>

        {/* Floating Badges */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            zIndex: 2
          }}
        >
          {product.badge && (
            <span
              className="badge badge-purple"
              style={{
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)"
              }}
            >
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span
              className="badge badge-emerald"
              style={{
                backdropFilter: "blur(8px)",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)"
              }}
            >
              -{discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "rgba(10, 13, 24, 0.75)",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            display: "grid",
            placeItems: "center",
            color: isWishlisted ? "#f43f5e" : "#fff",
            zIndex: 3,
            transition: "all 0.2s ease"
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.15)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart size={18} fill={isWishlisted ? "#f43f5e" : "none"} />
        </button>
      </div>

      {/* Card Info Details */}
      <div
        style={{
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          justifyContent: "space-between"
        }}
      >
        <div>
          {/* Category & Rating */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "0.45rem",
              fontSize: "0.78rem"
            }}
          >
            <span style={{ color: "var(--accent-purple-light)", fontWeight: 600 }}>
              {product.category}
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: "3px", color: "#fbbf24" }}>
              <Star size={13} fill="#fbbf24" />
              <span style={{ fontWeight: 700, color: "#fff" }}>{product.rating}</span>
              <span style={{ color: "var(--text-muted)" }}>({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            style={{
              display: "block",
              fontSize: "1.02rem",
              fontWeight: 700,
              color: "#fff",
              marginBottom: "0.5rem",
              lineHeight: 1.35,
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-purple-light)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#fff")}
          >
            {product.name}
          </Link>
        </div>

        {/* Pricing & Add to Cart button */}
        <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "0.85rem" }}>
            <span
              style={{
                fontSize: "1.35rem",
                fontWeight: 900,
                color: "#fff",
                fontFamily: "var(--font-display)"
              }}
            >
              ₹{product.price.toLocaleString("en-IN")}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "var(--text-muted)",
                  textDecoration: "line-through"
                }}
              >
                ₹{product.originalPrice.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          <button
            type="button"
            className="btn-primary"
            onClick={() => addToCart(product, 1)}
            style={{
              width: "100%",
              padding: "0.65rem 1rem",
              fontSize: "0.88rem",
              borderRadius: "10px"
            }}
          >
            <ShoppingBag size={16} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
