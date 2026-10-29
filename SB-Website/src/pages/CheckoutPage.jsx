// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { ShieldCheck, CheckCircle2, CreditCard, Banknote, Smartphone, ArrowRight, Lock } from "lucide-react";
import confetti from "canvas-confetti";

export default function CheckoutPage() {
  const { cart, cartSubtotal, discountAmount, shippingCost, cartTotal, appliedCoupon, user, placeOrder } = useStore();
  const navigate = useNavigate();

  // Selected address state
  const [selectedAddressId, setSelectedAddressId] = useState(user.addresses[0]?.id || "addr-1");
  const [paymentMode, setPaymentMode] = useState("upi"); // 'upi', 'card', 'cod'
  const [upiId, setUpiId] = useState("sahil@okhdfcbank");
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedAddress = user.addresses.find((a) => a.id === selectedAddressId) || user.addresses[0];

  const handleCompleteOrder = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const modeLabel = paymentMode === "upi" ? "UPI (Instant PhonePe / GPay)" : paymentMode === "card" ? "Credit / Debit Card" : "Cash on Delivery (COD)";
      const createdOrder = placeOrder({
        paymentMode: modeLabel,
        address: selectedAddress
      });

      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.5 }
      });

      setIsProcessing(false);
      navigate(`/orders?success=${createdOrder.id}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div style={{ maxWidth: "600px", margin: "5rem auto", textAlign: "center", padding: "0 1.5rem" }}>
        <h2 style={{ color: "#fff", marginBottom: "1rem" }}>No items in cart for checkout</h2>
        <Link to="/shop" className="btn-primary">Go to Catalog</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1140px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.3rem", color: "#fff", marginBottom: "0.3rem" }}>Fast &amp; Secured Checkout</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", display: "flex", alignItems: "center", gap: "6px" }}>
          <Lock size={15} color="#34d399" /> Guaranteed safe payment powered by Razorpay gateway integration
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "2.5rem",
          alignItems: "flex-start"
        }}
      >
        {/* Left Form: Delivery Address & Payment Method */}
        <form onSubmit={handleCompleteOrder} style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* 1. Delivery Address Selection */}
          <div className="glass-panel" style={{ borderRadius: "20px", padding: "1.75rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <h3 style={{ fontSize: "1.15rem", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
                <span>📍</span>
                <span>Select Delivery Address</span>
              </h3>
              <Link to="/profile" style={{ fontSize: "0.82rem", color: "var(--accent-purple-light)", fontWeight: 700 }}>
                + Add / Manage
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {user.addresses.map((addr) => {
                const isSelected = selectedAddressId === addr.id;
                return (
                  <div
                    key={addr.id}
                    onClick={() => setSelectedAddressId(addr.id)}
                    style={{
                      padding: "1rem",
                      borderRadius: "14px",
                      background: isSelected ? "rgba(139, 92, 246, 0.12)" : "rgba(255, 255, 255, 0.03)",
                      border: isSelected ? "2px solid var(--accent-purple-light)" : "1px solid var(--border)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "12px",
                      transition: "all 0.2s ease"
                    }}
                  >
                    <input
                      type="radio"
                      name="delivery_address"
                      checked={isSelected}
                      onChange={() => setSelectedAddressId(addr.id)}
                      style={{ marginTop: "4px", accentColor: "var(--accent-purple)" }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                        <strong style={{ color: "#fff", fontSize: "0.95rem" }}>{addr.title}</strong>
                        {addr.isDefault && <span className="badge badge-purple">Default</span>}
                      </div>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.86rem", lineHeight: 1.4 }}>
                        {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        Phone: {addr.phone}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Payment Method Selection */}
          <div className="glass-panel" style={{ borderRadius: "20px", padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.15rem", color: "#fff", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>💳</span>
              <span>Payment Mode</span>
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "0.85rem", marginBottom: "1.5rem" }}>
              {/* Option 1: UPI */}
              <div
                onClick={() => setPaymentMode("upi")}
                style={{
                  padding: "1rem",
                  borderRadius: "14px",
                  background: paymentMode === "upi" ? "rgba(139, 92, 246, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: paymentMode === "upi" ? "2px solid #a78bfa" : "1px solid var(--border)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Smartphone size={22} color="#a78bfa" />
                  <div>
                    <strong style={{ color: "#fff", fontSize: "0.95rem", display: "block" }}>
                      Instant UPI / QR / PhonePe / GPay
                    </strong>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Zero extra gateway fees</span>
                  </div>
                </div>
                <span className="badge badge-emerald">Fastest</span>
              </div>

              {/* Option 2: Cards & Net Banking */}
              <div
                onClick={() => setPaymentMode("card")}
                style={{
                  padding: "1rem",
                  borderRadius: "14px",
                  background: paymentMode === "card" ? "rgba(139, 92, 246, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: paymentMode === "card" ? "2px solid #a78bfa" : "1px solid var(--border)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <CreditCard size={22} color="#38bdf8" />
                  <div>
                    <strong style={{ color: "#fff", fontSize: "0.95rem", display: "block" }}>
                      Credit / Debit Cards &amp; Net Banking
                    </strong>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Visa, Mastercard, RuPay, Amex</span>
                  </div>
                </div>
              </div>

              {/* Option 3: COD */}
              <div
                onClick={() => setPaymentMode("cod")}
                style={{
                  padding: "1rem",
                  borderRadius: "14px",
                  background: paymentMode === "cod" ? "rgba(139, 92, 246, 0.15)" : "rgba(255, 255, 255, 0.03)",
                  border: paymentMode === "cod" ? "2px solid #a78bfa" : "1px solid var(--border)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <Banknote size={22} color="#34d399" />
                  <div>
                    <strong style={{ color: "#fff", fontSize: "0.95rem", display: "block" }}>
                      Cash on Delivery (COD)
                    </strong>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Pay upon receiving package at doorstep</span>
                  </div>
                </div>
              </div>
            </div>

            {paymentMode === "upi" && (
              <div style={{ padding: "0.85rem", background: "rgba(0, 0, 0, 0.3)", borderRadius: "10px" }}>
                <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>
                  Verify Virtual Payment Address (VPA):
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border)",
                    color: "#fff",
                    fontSize: "0.9rem",
                    outline: "none"
                  }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className="btn-emerald"
            style={{
              padding: "1.1rem",
              fontSize: "1.08rem",
              justifyContent: "center",
              cursor: isProcessing ? "wait" : "pointer",
              opacity: isProcessing ? 0.75 : 1
            }}
          >
            {isProcessing ? "Authorizing Order..." : `Confirm & Pay ₹${cartTotal.toLocaleString("en-IN")}`}
          </button>
        </form>

        {/* Right Column: Order Review */}
        <div className="glass-panel" style={{ borderRadius: "20px", padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "1.25rem" }}>Order Summary</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.5rem" }}>
            {cart.map((item) => (
              <div key={item.product.id} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <img
                  src={item.product.img}
                  alt={item.product.name}
                  style={{ width: "54px", height: "54px", borderRadius: "10px", objectFit: "cover" }}
                />
                <div style={{ flex: 1, fontSize: "0.88rem" }}>
                  <div style={{ color: "#fff", fontWeight: 600 }}>{item.product.name}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: "0.78rem" }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.92rem" }}>
                  ₹{(item.product.price * item.quantity).toLocaleString("en-IN")}
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid var(--border)", paddingTop: "1rem", display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
              <span>Subtotal</span>
              <span style={{ color: "#fff" }}>₹{cartSubtotal.toLocaleString("en-IN")}</span>
            </div>
            {discountAmount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", color: "#34d399", fontWeight: 600 }}>
                <span>Voucher Saved ({appliedCoupon?.code})</span>
                <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)" }}>
              <span>Shipping</span>
              <span style={{ color: shippingCost === 0 ? "#34d399" : "#fff" }}>
                {shippingCost === 0 ? "FREE" : `₹${shippingCost}`}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: "0.75rem", fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>
              <span>Grand Total</span>
              <span style={{ color: "#a78bfa" }}>₹{cartTotal.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
