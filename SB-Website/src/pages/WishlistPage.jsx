// src/pages/WishlistPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { Heart, ArrowRight, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, products, addToCart } = useStore();
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.3rem", color: "#fff", marginBottom: "0.3rem", display: "flex", alignItems: "center", gap: "10px" }}>
          <span>Saved Favorites</span>
          <Heart size={26} fill="#f43f5e" color="#f43f5e" />
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>
          You have {wishlistedProducts.length} items saved in your personal wishlist.
        </p>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="glass-panel" style={{ padding: "4rem 2rem", textAlign: "center", borderRadius: "20px" }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>❤️</div>
          <h3 style={{ color: "#fff", fontSize: "1.4rem", marginBottom: "0.5rem" }}>Your Wishlist is Empty</h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
            Tap the heart icon on any product to save it here for later.
          </p>
          <Link to="/shop" className="btn-primary">Browse New Gear <ArrowRight size={16} /></Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.75rem"
          }}
        >
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
