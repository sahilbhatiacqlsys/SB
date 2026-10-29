// src/pages/OrdersPage.jsx
import React, { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useStore } from "../context/StoreContext";
import { Package, Truck, CheckCircle2, Clock, ChevronRight, ShieldCheck, ArrowRight } from "lucide-react";

export default function OrdersPage() {
  const { orders } = useStore();
  const [searchParams] = useSearchParams();
  const successOrderId = searchParams.get("success");

  const [selectedOrder, setSelectedOrder] = useState(() => {
    if (successOrderId) {
      return orders.find((o) => o.id === successOrderId) || orders[0];
    }
    return orders[0];
  });

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
      {/* Success Notification if redirected from checkout */}
      {successOrderId && (
        <div
          style={{
            padding: "1.2rem 1.75rem",
            borderRadius: "16px",
            background: "linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)",
            border: "1px solid rgba(16, 185, 129, 0.4)",
            marginBottom: "2.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={{ width: "42px", height: "42px", borderRadius: "50%", background: "#10b981", color: "#fff", display: "grid", placeItems: "center" }}>
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h3 style={{ color: "#fff", fontSize: "1.15rem", marginBottom: "2px" }}>
                Order #{successOrderId} Confirmed!
              </h3>
              <p style={{ color: "#cbd5e1", fontSize: "0.85rem" }}>
                Tracking updates have been dispatched to your registered email &amp; phone.
              </p>
            </div>
          </div>
          <span className="badge badge-emerald" style={{ padding: "0.4rem 0.8rem", fontSize: "0.8rem" }}>
            Instant Fulfillment Queued
          </span>
        </div>
      )}

      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.3rem", color: "#fff", marginBottom: "0.3rem" }}>My Order History</h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>
          Track real-time shipment status, carrier tracking ID, and download GST invoices.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="glass-panel" style={{ padding: "4rem 2rem", textAlign: "center", borderRadius: "20px" }}>
          <Package size={48} color="#a78bfa" style={{ margin: "0 auto 1rem" }} />
          <h3 style={{ color: "#fff", fontSize: "1.4rem", marginBottom: "0.5rem" }}>No orders placed yet</h3>
          <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>Discover our new arrivals and place your first order.</p>
          <Link to="/shop" className="btn-primary">Browse Catalog</Link>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem",
            alignItems: "flex-start"
          }}
        >
          {/* Left Column: Order Cards List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {orders.map((order) => {
              const isSelected = selectedOrder?.id === order.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  className="glass-card"
                  style={{
                    padding: "1.5rem",
                    borderRadius: "18px",
                    cursor: "pointer",
                    border: isSelected ? "2px solid var(--accent-purple-light)" : "1px solid var(--border)",
                    background: isSelected ? "rgba(139, 92, 246, 0.12)" : "var(--bg-card)"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.85rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "3px" }}>
                        <strong style={{ color: "#fff", fontSize: "1.05rem" }}>{order.id}</strong>
                        <span
                          className={`badge ${
                            order.status === "Delivered"
                              ? "badge-emerald"
                              : order.status === "Shipped"
                              ? "badge-cyan"
                              : "badge-purple"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Placed on {order.date}</div>
                    </div>
                    <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "#fff" }}>
                      ₹{order.total.toLocaleString("en-IN")}
                    </div>
                  </div>

                  {/* Thumbnail snippet */}
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "1rem", paddingTop: "0.85rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
                    {order.items.slice(0, 3).map((item, i) => (
                      <img
                        key={i}
                        src={item.img}
                        alt={item.name}
                        style={{ width: "42px", height: "42px", borderRadius: "8px", objectFit: "cover" }}
                      />
                    ))}
                    <div style={{ flex: 1, fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                      {order.items[0]?.name}
                      {order.items.length > 1 && ` +${order.items.length - 1} more`}
                    </div>
                    <ChevronRight size={18} color="var(--text-muted)" />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Order Tracking Timeline & Details */}
          {selectedOrder && (
            <div className="glass-panel" style={{ borderRadius: "24px", padding: "2rem", position: "sticky", top: "100px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <div>
                  <span style={{ fontSize: "0.8rem", color: "var(--accent-purple-light)", fontWeight: 700 }}>
                    SHIPMENT TRACKING DETAILS
                  </span>
                  <h3 style={{ fontSize: "1.4rem", color: "#fff" }}>{selectedOrder.id}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => alert(`Downloading official GST invoice for ${selectedOrder.id}...`)}
                  style={{
                    padding: "0.45rem 0.85rem",
                    borderRadius: "8px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  📄 Download Invoice
                </button>
              </div>

              {/* Progress Stepper Animation */}
              <div style={{ padding: "1.5rem 0", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: "0.75rem" }}>
                  {/* Background line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "5%",
                      right: "5%",
                      height: "3px",
                      background: "rgba(255, 255, 255, 0.1)",
                      zIndex: 1
                    }}
                  />
                  {/* Filled progress line */}
                  <div
                    style={{
                      position: "absolute",
                      top: "14px",
                      left: "5%",
                      width: `${((selectedOrder.statusStep - 1) / 3) * 90}%`,
                      height: "3px",
                      background: "linear-gradient(90deg, #8b5cf6, #34d399)",
                      zIndex: 2,
                      transition: "width 0.4s ease"
                    }}
                  />

                  {["Placed", "Confirmed", "Shipped", "Delivered"].map((step, idx) => {
                    const stepNum = idx + 1;
                    const isDone = selectedOrder.statusStep >= stepNum;
                    return (
                      <div key={step} style={{ zIndex: 3, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <div
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            background: isDone ? "#10b981" : "var(--bg-secondary)",
                            border: isDone ? "2px solid #34d399" : "2px solid var(--border)",
                            color: "#fff",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            display: "grid",
                            placeItems: "center",
                            boxShadow: isDone ? "0 0 12px rgba(16, 185, 129, 0.5)" : "none"
                          }}
                        >
                          {isDone ? "✓" : stepNum}
                        </div>
                        <span style={{ fontSize: "0.75rem", color: isDone ? "#fff" : "var(--text-muted)", marginTop: "6px", fontWeight: isDone ? 700 : 500 }}>
                          {step}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Carrier & Tracking Meta */}
              <div
                style={{
                  padding: "1rem 1.25rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "12px",
                  border: "1px solid var(--border)",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                  fontSize: "0.85rem"
                }}
              >
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>Carrier Partner</span>
                  <strong style={{ color: "#fff" }}>{selectedOrder.carrier}</strong>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>Tracking Airway Bill</span>
                  <strong style={{ color: "#a78bfa", fontFamily: "monospace" }}>{selectedOrder.trackingNumber}</strong>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>Estimated Delivery</span>
                  <strong style={{ color: "#34d399" }}>{selectedOrder.estimatedDelivery}</strong>
                </div>
                <div>
                  <span style={{ color: "var(--text-muted)", display: "block", fontSize: "0.75rem" }}>Payment Mode</span>
                  <strong style={{ color: "#fff" }}>{selectedOrder.paymentMode}</strong>
                </div>
              </div>

              {/* Delivery Address */}
              <div style={{ marginBottom: "1.5rem" }}>
                <h4 style={{ color: "#fff", fontSize: "0.95rem", marginBottom: "0.4rem" }}>Shipping Destination:</h4>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.4 }}>
                  <strong>{selectedOrder.shippingAddress?.name}</strong> • {selectedOrder.shippingAddress?.phone}<br />
                  {selectedOrder.shippingAddress?.address}, {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
                </p>
              </div>

              {/* Ordered Items Breakdown */}
              <div>
                <h4 style={{ color: "#fff", fontSize: "0.95rem", marginBottom: "0.75rem" }}>Items in this parcel:</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {selectedOrder.items.map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.85rem" }}>
                      <img src={item.img} alt={item.name} style={{ width: "36px", height: "36px", borderRadius: "8px", objectFit: "cover" }} />
                      <div style={{ flex: 1, color: "#fff" }}>{item.name} (x{item.quantity})</div>
                      <div style={{ fontWeight: 700, color: "#a78bfa" }}>₹{(item.price * item.quantity).toLocaleString("en-IN")}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
