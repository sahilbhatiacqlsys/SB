// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { ShoppingBag, Heart, User, Search, Package, MessageSquare, Menu, X, Sparkles } from "lucide-react";

export default function Navbar() {
  const { cart, wishlist, user } = useStore();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Top Notification Bar for Store Promotions matching Admin */}
      <div
        style={{
          background: "linear-gradient(90deg, #7c3aed 0%, #2563eb 50%, #06b6d4 100%)",
          color: "#fff",
          fontSize: "0.82rem",
          fontWeight: 600,
          textAlign: "center",
          padding: "0.45rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          position: "relative",
          zIndex: 60,
          letterSpacing: "0.3px",
        }}
      >
        <Sparkles size={14} className="animate-spin-slow" />
        <span>Diwali Festive Sale is Live! Use coupon code <strong>CYBER25</strong> for 25% OFF.</span>
        <Link
          to="/shop"
          style={{
            marginLeft: "8px",
            textDecoration: "underline",
            fontWeight: 800,
            color: "#ffedd5"
          }}
        >
          Shop Now →
        </Link>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: isScrolled ? "rgba(10, 13, 24, 0.92)" : "rgba(10, 13, 24, 0.75)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: isScrolled ? "1px solid rgba(139, 92, 246, 0.25)" : "1px solid rgba(255, 255, 255, 0.05)",
          transition: "all 0.3s ease",
          padding: isScrolled ? "0.75rem 0" : "1.1rem 0"
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1.5rem"
          }}
        >
          {/* Brand Logo with Glow */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none"
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
                display: "grid",
                placeItems: "center",
                color: "#fff",
                fontWeight: 900,
                fontSize: "1.25rem",
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                fontFamily: "var(--font-display)"
              }}
            >
              ⚡
            </div>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "1.35rem",
                  letterSpacing: "-0.5px",
                  color: "#fff"
                }}
              >
                SB <span style={{ color: "#a78bfa" }}>STORE</span>
              </span>
              <span
                style={{
                  display: "block",
                  fontSize: "0.68rem",
                  color: "var(--text-muted)",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontWeight: 700
                }}
              >
                Lifestyle &amp; Tech
              </span>
            </div>
          </Link>

          {/* Center Nav Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.75rem",
              fontSize: "0.92rem",
              fontWeight: 600
            }}
            className="desktop-nav"
          >
            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: isActive ? "#a78bfa" : "var(--text-secondary)",
                transition: "color 0.2s ease"
              })}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              style={({ isActive }) => ({
                color: isActive ? "#a78bfa" : "var(--text-secondary)",
                transition: "color 0.2s ease"
              })}
            >
              All Products
            </NavLink>
            <NavLink
              to="/orders"
              style={({ isActive }) => ({
                color: isActive ? "#a78bfa" : "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "color 0.2s ease"
              })}
            >
              <Package size={16} /> My Orders
            </NavLink>
            <NavLink
              to="/contact"
              style={({ isActive }) => ({
                color: isActive ? "#a78bfa" : "var(--text-secondary)",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                transition: "color 0.2s ease"
              })}
            >
              <MessageSquare size={16} /> Help &amp; Queries
            </NavLink>
          </nav>

          {/* Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              position: "relative",
              maxWidth: "280px",
              width: "100%"
            }}
            className="desktop-search"
          >
            <input
              type="text"
              placeholder="Search gadgets, shoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.55rem 1rem 0.55rem 2.4rem",
                borderRadius: "var(--radius-full)",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border)",
                color: "#fff",
                fontSize: "0.85rem",
                outline: "none",
                transition: "all 0.25s ease"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "var(--accent-purple-light)";
                e.target.style.background = "rgba(255, 255, 255, 0.08)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "var(--border)";
                e.target.style.background = "rgba(255, 255, 255, 0.05)";
              }}
            />
            <Search
              size={15}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-muted)"
              }}
            />
          </form>

          {/* Right Action Icons: Wishlist, Cart, Profile */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
            {/* Wishlist */}
            <Link
              to="/wishlist"
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border)",
                display: "grid",
                placeItems: "center",
                color: wishlist.length > 0 ? "#f43f5e" : "var(--text-secondary)",
                transition: "all 0.2s ease"
              }}
              title="Wishlist"
            >
              <Heart size={19} fill={wishlist.length > 0 ? "#f43f5e" : "none"} />
              {wishlist.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-5px",
                    background: "#f43f5e",
                    color: "#fff",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 0 10px rgba(244, 63, 94, 0.5)"
                  }}
                >
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart with Live Count Badge */}
            <Link
              to="/cart"
              style={{
                position: "relative",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "rgba(139, 92, 246, 0.12)",
                border: "1px solid rgba(139, 92, 246, 0.35)",
                display: "grid",
                placeItems: "center",
                color: "#a78bfa",
                transition: "all 0.2s ease"
              }}
              title="View Cart"
            >
              <ShoppingBag size={19} />
              {totalCartCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "-6px",
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    color: "#fff",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    display: "grid",
                    placeItems: "center",
                    boxShadow: "0 0 12px rgba(16, 185, 129, 0.6)"
                  }}
                >
                  {totalCartCount}
                </span>
              )}
            </Link>

            {/* Profile User Icon */}
            <Link
              to="/profile"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "0.35rem 0.65rem",
                borderRadius: "10px",
                background: "rgba(255, 255, 255, 0.04)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none"
              }}
            >
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: "26px",
                  height: "26px",
                  borderRadius: "50%",
                  objectFit: "cover"
                }}
              />
              <span className="profile-name" style={{ maxWidth: "80px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {user.name.split(" ")[0]}
              </span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn"
              style={{
                padding: "8px",
                color: "#fff",
                display: "none"
              }}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              background: "rgba(15, 20, 36, 0.98)",
              borderTop: "1px solid var(--border)",
              padding: "1.25rem 1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}
          >
            <form onSubmit={handleSearchSubmit} style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.65rem 1rem 0.65rem 2.4rem",
                  borderRadius: "8px",
                  background: "rgba(255, 255, 255, 0.06)",
                  border: "1px solid var(--border)",
                  color: "#fff"
                }}
              />
              <Search size={16} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            </form>

            <NavLink to="/" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "0.5rem 0", fontWeight: 600 }}>Home</NavLink>
            <NavLink to="/shop" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "0.5rem 0", fontWeight: 600 }}>All Products</NavLink>
            <NavLink to="/orders" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "0.5rem 0", fontWeight: 600 }}>My Orders</NavLink>
            <NavLink to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "0.5rem 0", fontWeight: 600 }}>Help &amp; Support</NavLink>
            <NavLink to="/profile" onClick={() => setMobileMenuOpen(false)} style={{ color: "#fff", padding: "0.5rem 0", fontWeight: 600 }}>Account Profile</NavLink>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 860px) {
          .desktop-nav, .desktop-search {
            display: none !important;
          }
          .mobile-toggle-btn {
            display: block !important;
          }
          .profile-name {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
