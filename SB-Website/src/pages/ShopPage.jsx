// src/pages/ShopPage.jsx
import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import ProductCard from "../components/ProductCard";
import { CATEGORIES } from "../data/storeData";
import { SlidersHorizontal, Search, ArrowUpDown } from "lucide-react";

export default function ShopPage() {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeCategory = searchParams.get("category") || "all";
  const searchParam = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [sortBy, setSortBy] = useState("popular"); // 'popular', 'price-low', 'price-high', 'rating'
  const [maxPrice, setMaxPrice] = useState(50000);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (activeCategory !== "all") {
        if (p.categorySlug !== activeCategory && !p.category.toLowerCase().includes(activeCategory.toLowerCase())) {
          return false;
        }
      }
      // Search filter
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesCat = p.category.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }
      // Price filter
      if (p.price > maxPrice) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular
    });
  }, [products, activeCategory, searchQuery, maxPrice, sortBy]);

  const handleCategoryClick = (catId) => {
    if (catId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem 4rem" }}>
      {/* Page Title & Breadcrumb */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#fff", marginBottom: "0.4rem" }}>
          All Products &amp; Gear
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
          Explore {filteredProducts.length} premium tech, footwear, and audio items with live stock verification.
        </p>
      </div>

      {/* Filter and Controls Toolbar */}
      <div
        className="glass-panel"
        style={{
          borderRadius: "18px",
          padding: "1.25rem 1.5rem",
          marginBottom: "2.5rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1.25rem",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* Category Pills */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryClick(cat.id)}
                style={{
                  padding: "0.5rem 1rem",
                  borderRadius: "var(--radius-full)",
                  background: isSelected ? "var(--accent-purple)" : "rgba(255, 255, 255, 0.05)",
                  border: isSelected ? "1px solid var(--accent-purple-light)" : "1px solid var(--border)",
                  color: isSelected ? "#fff" : "var(--text-secondary)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s ease"
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Right side search & sort */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {/* Quick Search inside page */}
          <div style={{ position: "relative", minWidth: "220px" }}>
            <input
              type="text"
              placeholder="Search in results..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem 0.85rem 0.5rem 2.2rem",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border)",
                color: "#fff",
                fontSize: "0.85rem",
                outline: "none"
              }}
            />
            <Search size={15} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
          </div>

          {/* Sort Dropdown */}
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <ArrowUpDown size={15} color="var(--text-muted)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "0.5rem 0.85rem",
                borderRadius: "10px",
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "#fff",
                fontSize: "0.85rem",
                outline: "none",
                cursor: "pointer"
              }}
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div
          className="glass-panel"
          style={{
            textAlign: "center",
            padding: "4rem 2rem",
            borderRadius: "20px"
          }}
        >
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
          <h3 style={{ color: "#fff", fontSize: "1.4rem", marginBottom: "0.5rem" }}>No matching products found</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "1.5rem" }}>
            Try clearing your search query or selecting a different category.
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              setSearchQuery("");
              handleCategoryClick("all");
            }}
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.75rem"
          }}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
