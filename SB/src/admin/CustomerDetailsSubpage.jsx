import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { INITIAL_CUSTOMERS } from "./CustomersPage";

export default function CustomerDetailsSubpage({ customersList = INITIAL_CUSTOMERS, onArchiveCustomer }) {
  const { customerId } = useParams();
  const navigate = useNavigate();

  const decodedId = decodeURIComponent(customerId || "");
  const customer = customersList.find(
    c => c.id === decodedId || c.id.toLowerCase() === decodedId.toLowerCase()
  );

  const [currentCustomer, setCurrentCustomer] = useState(customer);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  if (!customer && !currentCustomer) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👥</div>
        <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Customer Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          The requested customer ID <code>{decodedId}</code> does not exist or has been removed.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/customers")}>
          ← Back to Customers
        </button>
      </div>
    );
  }

  const cust = currentCustomer || customer;

  const handleToggleArchive = () => {
    const newStatus = cust.status === "archived" ? "active" : "archived";
    const updated = { ...cust, status: newStatus };
    setCurrentCustomer(updated);
    if (onArchiveCustomer) {
      onArchiveCustomer(updated);
    }
    setShowArchiveConfirm(false);
  };

  return (
    <div className="customer-details-subpage" style={{ paddingBottom: "3rem" }}>
      {/* Subpage Header with Back Navigation and Archive Button */}
      <div
        className="page-header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/customers")}
            style={{
              padding: "0.45rem 0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            ← Back to Customers
          </button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h1 className="page-title" style={{ margin: 0 }}>Customer Profile</h1>
              <span
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--purple-light)",
                  background: "rgba(139, 92, 246, 0.12)",
                  padding: "2px 10px",
                  borderRadius: "6px",
                  border: "1px solid rgba(167, 139, 250, 0.3)",
                }}
              >
                {cust.id}
              </span>
            </div>
            <p className="page-subtitle" style={{ margin: "0.25rem 0 0" }}>
              Registered on {cust.joinedDate} • Reference ID: {cust.id}
            </p>
          </div>
        </div>

        {/* Header Right Actions: Status Badge & Archive/Unarchive Button */}
        <div className="page-actions" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            className={`status-badge status-${cust.status === "archived" ? "draft" : cust.status}`}
            style={{ padding: "0.45rem 1rem", fontSize: "0.84rem" }}
          >
            <span className="status-dot" />
            {cust.status.toUpperCase()}
          </span>

          <button
            type="button"
            className="btn btn-outline"
            style={{
              color: cust.status === "archived" ? "#34d399" : "#fbbf24",
              borderColor: cust.status === "archived" ? "rgba(52, 211, 153, 0.3)" : "rgba(251, 191, 36, 0.3)",
              background: cust.status === "archived" ? "rgba(52, 211, 153, 0.08)" : "rgba(251, 191, 36, 0.08)",
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
            onClick={() => setShowArchiveConfirm(true)}
          >
            <span>{cust.status === "archived" ? "↺" : "📦"}</span>
            <span>{cust.status === "archived" ? "Unarchive Customer" : "Archive Customer"}</span>
          </button>
        </div>
      </div>

      {/* Top Overview Cards Row: Metric Highlights */}
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: "1.75rem" }}>
        <div className="stat-card" style={{ borderLeft: "3px solid var(--purple)" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "26px",
                  height: "26px",
                  borderRadius: "6px",
                  background: "rgba(139, 92, 246, 0.15)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  fontSize: "0.85rem",
                }}
              >
                📦
              </span>
              <span>COMPLETED ORDERS</span>
            </span>
          </div>
          <div className="stat-value" style={{ margin: "0.5rem 0 0" }}>{cust.ordersCount}</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>Total orders placed by customer</div>
        </div>

        <div className="stat-card" style={{ borderLeft: "3px solid #34d399" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34d399" }}>
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "26px",
                  height: "26px",
                  borderRadius: "6px",
                  background: "#34d39922",
                  border: "1px solid #34d39944",
                  fontSize: "0.85rem",
                }}
              >
                💰
              </span>
              <span>LIFETIME SPENT</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#34d399", margin: "0.5rem 0 0" }}>{cust.totalSpent}</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>Net revenue contributed</div>
        </div>

        <div className="stat-card" style={{ borderLeft: "3px solid #38bdf8" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#38bdf8" }}>
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "26px",
                  height: "26px",
                  borderRadius: "6px",
                  background: "#38bdf822",
                  border: "1px solid #38bdf844",
                  fontSize: "0.85rem",
                }}
              >
                🕒
              </span>
              <span>LAST PURCHASE</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#38bdf8", margin: "0.5rem 0 0", fontSize: "1.5rem" }}>{cust.lastOrder}</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>Most recent order date</div>
        </div>
      </div>

      {/* Main Content Layout: Customer Details & Recent Orders */}
      <div style={{ display: "grid", gridTemplateColumns: "360px 1fr", gap: "1.75rem", alignItems: "start" }}>
        {/* Customer Information Card */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "1.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          {/* Identity header */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img
              src={cust.avatar}
              alt={cust.name}
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid var(--purple)",
                boxShadow: "0 0 16px var(--purple-glow)",
              }}
            />
            <div>
              <h2 style={{ color: "#fff", fontSize: "1.2rem", margin: "0 0 0.25rem" }}>{cust.name}</h2>
              <div style={{ color: "var(--purple-light)", fontSize: "0.82rem", fontFamily: "monospace" }}>
                {cust.id}
              </div>
              <div style={{ color: "var(--text-muted)", fontSize: "0.76rem", marginTop: "2px" }}>
                Member since {cust.joinedDate}
              </div>
            </div>
          </div>

          <div style={{ width: "100%", height: "1px", background: "var(--border-light)" }} />

          {/* Contact Details List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.1rem" }}>✉️</span>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.5px", display: "block" }}>
                  Email Address
                </span>
                <span style={{ color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>{cust.email}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.1rem" }}>📞</span>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.5px", display: "block" }}>
                  Phone Number
                </span>
                <span style={{ color: "#fff", fontWeight: 500, fontSize: "0.9rem" }}>{cust.phone}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.1rem" }}>📍</span>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.5px", display: "block" }}>
                  Primary Shipping Location
                </span>
                <span style={{ color: "var(--text-secondary)", fontWeight: 500, fontSize: "0.9rem" }}>{cust.city}</span>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
              <span style={{ fontSize: "1.1rem" }}>🏷️</span>
              <div>
                <span style={{ color: "var(--text-muted)", fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.5px", display: "block" }}>
                  Account Status
                </span>
                <span style={{ color: cust.status === "active" ? "#34d399" : "#fbbf24", fontWeight: 600, fontSize: "0.85rem" }}>
                  ● {cust.status.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Order History Table */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-lg)",
            padding: "1.75rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ margin: 0, color: "#fff", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>📦</span> Order History
            </h3>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
              {cust.ordersCount} completed orders
            </span>
          </div>

          <div className="data-table-wrap" style={{ margin: 0 }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Order Ref</th>
                  <th style={{ textAlign: "center" }}>Date</th>
                  <th style={{ textAlign: "left" }}>Purchased Items</th>
                  <th style={{ textAlign: "right" }}>Amount</th>
                  <th style={{ textAlign: "center" }}>Status</th>
                  <th style={{ textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <code style={{ color: "var(--purple-light)", fontWeight: 700 }}>#1002</code>
                  </td>
                  <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>Yesterday</td>
                  <td style={{ textAlign: "left", color: "#fff" }}>Airpods Pro Max 2024</td>
                  <td style={{ textAlign: "right", fontWeight: 700, color: "#fff" }}>₹10,600.00</td>
                  <td style={{ textAlign: "center" }}>
                    <span className="status-badge status-active" style={{ margin: "0 auto" }}>
                      <span className="status-dot" />
                      COMPLETED
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      className="order-view-details-btn"
                      onClick={() => navigate("/orders/1002")}
                    >
                      <span>👁</span>
                      <span>View</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <code style={{ color: "var(--purple-light)", fontWeight: 700 }}>#998</code>
                  </td>
                  <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>14 Oct, 2026</td>
                  <td style={{ textAlign: "left", color: "#fff" }}>Sony WH-1000XM5 Headset</td>
                  <td style={{ textAlign: "right", fontWeight: 700, color: "#fff" }}>₹24,990.00</td>
                  <td style={{ textAlign: "center" }}>
                    <span className="status-badge status-active" style={{ margin: "0 auto" }}>
                      <span className="status-dot" />
                      DELIVERED
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      className="order-view-details-btn"
                      onClick={() => navigate("/orders/998")}
                    >
                      <span>👁</span>
                      <span>View</span>
                    </button>
                  </td>
                </tr>
                <tr>
                  <td style={{ textAlign: "center" }}>
                    <code style={{ color: "var(--purple-light)", fontWeight: 700 }}>#984</code>
                  </td>
                  <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>28 Sep, 2026</td>
                  <td style={{ textAlign: "left", color: "#fff" }}>Nike New Model Shoes</td>
                  <td style={{ textAlign: "right", fontWeight: 700, color: "#fff" }}>₹10,600.00</td>
                  <td style={{ textAlign: "center" }}>
                    <span className="status-badge status-active" style={{ margin: "0 auto" }}>
                      <span className="status-dot" />
                      DELIVERED
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      className="order-view-details-btn"
                      onClick={() => navigate("/orders/984")}
                    >
                      <span>👁</span>
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Archive / Unarchive Confirmation Modal */}
      {showArchiveConfirm && (
        <div
          className="order-modal-backdrop"
          onClick={() => setShowArchiveConfirm(false)}
          style={{ zIndex: 10000 }}
        >
          <div
            className="page-modal-card"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: "440px" }}
          >
            <div className="page-modal-header">
              <div className="page-modal-title">
                <span>{cust.status === "archived" ? "↺" : "📦"}</span>
                <span>{cust.status === "archived" ? "Unarchive Customer" : "Archive Customer"}</span>
              </div>
              <button
                type="button"
                onClick={() => setShowArchiveConfirm(false)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
            <div className="page-modal-body" style={{ textAlign: "center", padding: "1.75rem 1.5rem" }}>
              <div style={{ fontSize: "2.75rem", marginBottom: "0.75rem" }}>
                {cust.status === "archived" ? "🟢" : "📦"}
              </div>
              <h3 style={{ margin: "0 0 0.5rem", color: "#fff", fontSize: "1.1rem" }}>
                {cust.status === "archived" ? "Unarchive" : "Archive"} "{cust.name}"?
              </h3>
              <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.5 }}>
                {cust.status === "archived"
                  ? "This customer account will be restored back to active state."
                  : "This customer record will be moved to archived state. You can restore it at any time."}
              </p>
            </div>
            <div className="page-modal-footer" style={{ display: "flex", gap: "0.75rem" }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowArchiveConfirm(false)}
                style={{ flex: 1, justifyContent: "center" }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleToggleArchive}
                style={{
                  flex: 1,
                  background: cust.status === "archived"
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #f59e0b, #d97706)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  padding: "0.65rem 1rem",
                  fontWeight: 600,
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {cust.status === "archived" ? "Confirm Unarchive" : "Confirm Archive"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
