// src/pages/CartPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discountAmount,
    shippingCost,
    cartTotal,
    appliedCoupon,
    applyCouponCode,
    removeCoupon
  } = useStore();

  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState("");
  const [couponError, setCouponError] = useState("");

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    if (!couponInput.trim()) return;

    const res = applyCouponCode(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput("");
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleQuickApply = (code) => {
    const res = applyCouponCode(code);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div
        className="animate-fade-in"
        style={{
          maxWidth: "600px",
          margin: "5rem auto",
          padding: "3rem 2rem",
          textAlign: "center"
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background: "rgba(139, 92, 246, 0.15)",
            border: "1px solid rgba(139, 92, 246, 0.3)",
            display: "grid",
            placeItems: "center",
            margin: "0 auto 1.5rem",
            color: "#a78bfa"
          }}
        >
          <ShoppingBag size={38} />
        </div>
        <h2 style={{ fontSize: "2rem", color: "#fff", marginBottom: "0.5rem" }}>Your Bag is Empty</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginBottom: "2rem" }}>
          Explore our trending audio gear, carbon propulsion shoes, and titanium smartwatches.
        </p>
        <Link to="/shop" className="btn-primary" style={{ padding: "0.85rem 2rem" }}>
          Start Shopping <ArrowRight size={18} />
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
      <h1 style={{ fontSize: "2.3rem", color: "#fff", marginBottom: "0.5rem" }}>Shopping Bag</h1>
      <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "2.5rem" }}>
        Review items, apply promo vouchers, and proceed to secured checkout.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          alignItems: "flex-start"
        }}
      >
        {/* Left Column: Cart Items List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {cart.map((item) => (
            <div
              key={item.product.id}
              className="glass-panel"
              style={{
                borderRadius: "18px",
                padding: "1.25rem",
                display: "flex",
                gap: "1.25rem",
                alignItems: "center"
              }}
            >
              {/* Product Thumbnail */}
              <Link to={`/product/${item.product.id}`}>
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  style={{
                    width: "90px",
                    height: "90px",
                    borderRadius: "14px",
                    objectFit: "cover",
                    border: "1px solid var(--border)"
                  }}
                />
              </Link>

              {/* Item Info */}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "0.75rem", color: "var(--accent-purple-light)", fontWeight: 700 }}>
                  {item.product.category}
                </span>
                <Link
                  to={`/product/${item.product.id}`}
                  style={{
                    display: "block",
                    fontWeight: 700,
                    color: "#fff",
                    fontSize: "1.05rem",
                    marginBottom: "4px"
                  }}
                >
                  {item.product.name}
                </Link>
                {item.selectedVariant && (
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "6px" }}>
                    Color: {item.selectedVariant}
                  </div>
                )}
                <div style={{ fontSize: "1.1rem", fontWeight: 800, color: "#fff" }}>
                  ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                </div>
              </div>

              {/* Quantity Changer */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border)",
                  borderRadius: "10px",
                  padding: "2px"
                }}
              >
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, -1)}
                  style={{ width: "30px", height: "30px", color: "#fff", display: "grid", placeItems: "center" }}
                >
                  <Minus size={14} />
                </button>
                <span style={{ width: "30px", textAlign: "center", fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>
                  {item.quantity}
                </span>
                <button
                  type="button"
                  onClick={() => updateQuantity(item.product.id, 1)}
                  style={{ width: "30px", height: "30px", color: "#fff", display: "grid", placeItems: "center" }}
                >
                  <Plus size={14} />
                </button>
              </div>

              {/* Delete Item */}
              <button
                type="button"
                onClick={() => removeFromCart(item.product.id)}
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "rgba(244, 63, 94, 0.12)",
                  border: "1px solid rgba(244, 63, 94, 0.3)",
                  color: "#f43f5e",
                  display: "grid",
                  placeItems: "center",
                  cursor: "pointer",
                  transition: "transform 0.2s"
                }}
                title="Remove item"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          {/* Quick return/continue shopping link */}
          <Link
            to="/shop"
            style={{
              color: "var(--accent-purple-light)",
              fontSize: "0.88rem",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "0.5rem"
            }}
          >
            ← Add more items to your bag
          </Link>
        </div>

        {/* Right Column: Order Summary & Coupon Vouchers */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Coupon Redemption Card */}
          <div className="glass-panel" style={{ borderRadius: "20px", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "#fff", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <Tag size={18} color="#a78bfa" />
              <span>Apply Promo Voucher</span>
            </h3>

            {appliedCoupon ? (
              <div
                style={{
                  padding: "0.85rem 1rem",
                  borderRadius: "12px",
                  background: "rgba(16, 185, 129, 0.15)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  <div style={{ fontWeight: 800, color: "#34d399", fontSize: "0.95rem" }}>
                    ✓ {appliedCoupon.code} Applied
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "#cbd5e1" }}>{appliedCoupon.label}</div>
                </div>
                <button
                  type="button"
                  onClick={removeCoupon}
                  style={{
                    color: "#f87171",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "8px", marginBottom: "0.75rem" }}>
                <input
                  type="text"
                  placeholder="Enter code (e.g. CYBER25)"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value.toUpperCase());
                    if (couponError) setCouponError("");
                  }}
                  style={{
                    flex: 1,
                    padding: "0.65rem 0.85rem",
                    borderRadius: "10px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border)",
                    color: "#fff",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    outline: "none"
                  }}
                />
                <button type="submit" className="btn-primary" style={{ padding: "0.65rem 1.25rem" }}>
                  Apply
                </button>
              </form>
            )}

            {couponError && (
              <div style={{ fontSize: "0.8rem", color: "#f87171", marginBottom: "0.75rem" }}>
                ⚠️ {couponError}
              </div>
            )}

            {/* Quick 1-click apply suggestion pills */}
            <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginBottom: "6px" }}>
                Available Store Coupons:
              </span>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["CYBER25", "FESTIVE15", "FLAT500"].map((code) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => handleQuickApply(code)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      background: "rgba(139, 92, 246, 0.12)",
                      border: "1px dashed rgba(139, 92, 246, 0.4)",
                      color: "#a78bfa",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      cursor: "pointer"
                    }}
                  >
                    + {code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Price Calculation Card */}
          <div className="glass-panel" style={{ borderRadius: "20px", padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "1.25rem" }}>Order Summary</h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.95rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Subtotal ({cart.length} items)</span>
                <span style={{ color: "#fff", fontWeight: 600 }}>₹{cartSubtotal.toLocaleString("en-IN")}</span>
              </div>

              {discountAmount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#34d399", fontWeight: 600 }}>
                  <span>Promotional Discount</span>
                  <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
                <span>Insured Express Shipping</span>
                <span style={{ color: shippingCost === 0 ? "#34d399" : "#fff", fontWeight: 600 }}>
                  {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
                </span>
              </div>

              <div
                style={{
                  margin: "0.75rem 0",
                  borderTop: "1px solid var(--border)",
                  paddingTop: "0.85rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline"
                }}
              >
                <div>
                  <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>Total Amount</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Inclusive of all GST taxes</div>
                </div>
                <div style={{ fontSize: "1.6rem", fontWeight: 900, color: "#a78bfa", fontFamily: "var(--font-display)" }}>
                  ₹{cartTotal.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            <button
              type="button"
              className="btn-emerald"
              onClick={() => navigate("/checkout")}
              style={{
                width: "100%",
                padding: "0.9rem",
                fontSize: "1rem",
                marginTop: "1.25rem",
                justifyContent: "center"
              }}
            >
              Proceed to Checkout <ArrowRight size={18} />
            </button>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginTop: "1rem", fontSize: "0.78rem", color: "var(--text-muted)" }}>
              <ShieldCheck size={14} color="#34d399" />
              <span>256-Bit SSL Secured Checkout Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
