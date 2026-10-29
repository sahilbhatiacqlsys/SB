import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_BROADCASTS = [
  {
    id: "NOTIF-B1",
    title: "Flash Deal Alert: 30% OFF Audio",
    message: "Grab premium headphones and earphones at flat 30% off with promo code CYBER30. Ends tonight at midnight.",
    type: "offer",
    target: "all",
    targetLabel: "All App & Web Users (3,240)",
    sentAt: "Today, 10:15 AM",
    sentBy: "Admin John",
    status: "delivered",
    reach: "3,240",
    openRate: "42.8%",
    link: "/shop?category=electric-product",
  },
  {
    id: "NOTIF-B2",
    title: "Festive Weekend Dispatch Notice",
    message: "All express orders placed before 3 PM will be dispatched on the same day. Happy celebrations.",
    type: "info",
    target: "customers",
    targetLabel: "Active Customers (2,890)",
    sentAt: "Yesterday, 04:30 PM",
    sentBy: "Operations Team",
    status: "delivered",
    reach: "2,890",
    openRate: "58.2%",
    link: "/shipping-policy",
  },
  {
    id: "NOTIF-B3",
    title: "VIP Early Access: New Sneaker Drop",
    message: "Nike Cyber Carbon Edition is now live exclusively for VIP members. Limited stocks remaining.",
    type: "offer",
    target: "vip",
    targetLabel: "VIP Tier (420)",
    sentAt: "24 Oct, 02:00 PM",
    sentBy: "Marketing Desk",
    status: "delivered",
    reach: "420",
    openRate: "81.4%",
    link: "/products/2",
  },
  {
    id: "NOTIF-B4",
    title: "Scheduled Server Maintenance",
    message: "We are upgrading our payment gateway infrastructure on Sunday from 02:00 AM to 04:00 AM IST.",
    type: "alert",
    target: "all",
    targetLabel: "All Registered Users",
    sentAt: "Scheduled (Sunday)",
    sentBy: "DevOps Admin",
    status: "scheduled",
    reach: "3,240",
    openRate: "—",
    link: "",
  },
];

export default function NotificationsSendPage({ onBroadcastSent }) {
  const navigate = useNavigate();
  const [broadcasts, setBroadcasts] = useState(INITIAL_BROADCASTS);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [successToast, setSuccessToast] = useState("");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "offer",
    target: "all",
    link: "",
  });

  const filteredBroadcasts = broadcasts.filter(b => {
    if (typeFilter !== "all" && b.type !== typeFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!b.title.toLowerCase().includes(q) && !b.message.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const handleSendNotification = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.message.trim()) return;

    const targetLabels = {
      all: "All App & Web Users (3,240)",
      customers: "Active Customers (2,890)",
      vip: "VIP Members (420)",
      abandoned: "Cart Abandoners (184)",
    };

    const newBroadcast = {
      id: `NOTIF-B${broadcasts.length + 1}`,
      title: formData.title.trim(),
      message: formData.message.trim(),
      type: formData.type,
      target: formData.target,
      targetLabel: targetLabels[formData.target] || "All Users",
      sentAt: "Just now",
      sentBy: "Admin John",
      status: "delivered",
      reach: formData.target === "vip" ? "420" : formData.target === "abandoned" ? "184" : "3,240",
      openRate: "0.0%",
      link: formData.link.trim(),
    };

    setBroadcasts([newBroadcast, ...broadcasts]);

    // Also push to topbar notification bell if callback provided
    if (onBroadcastSent) {
      onBroadcastSent({
        id: `notif-${Date.now()}`,
        type: formData.type,
        title: formData.title.trim(),
        description: formData.message.trim(),
        time: "Just now",
        timestamp: new Date().toISOString(),
        read: false,
        icon: formData.type === "offer" ? "🏷️" : formData.type === "alert" ? "⚠️" : "📢",
        badgeColor: formData.type === "offer" ? "#c084fc" : formData.type === "alert" ? "#ef4444" : "#38bdf8",
        badgeBg: formData.type === "offer" ? "rgba(192, 132, 252, 0.15)" : "rgba(56, 189, 248, 0.15)",
      });
    }

    setFormData({ title: "", message: "", type: "offer", target: "all", link: "" });
    setShowComposeModal(false);
    setSuccessToast(`Notification "${formData.title}" sent successfully!`);
    setTimeout(() => setSuccessToast(""), 4000);
  };

  const [notifToDelete, setNotifToDelete] = useState(null);

  const handleDeleteClick = (notif) => {
    setNotifToDelete(notif);
  };

  const handleConfirmDelete = () => {
    if (notifToDelete) {
      setBroadcasts(broadcasts.filter(b => b.id !== notifToDelete.id));
      setNotifToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setNotifToDelete(null);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Send Notifications</h1>
          <p className="page-subtitle">Broadcast promotional offers, delivery updates, and important announcements to customers</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => navigate("/notifications-send/new")}>
            <span>📢</span> Send Notification
          </button>
        </div>
      </div>

      {/* Success Banner */}
      {successToast && (
        <div
          style={{
            background: "rgba(52, 211, 153, 0.15)",
            border: "1px solid #34d399",
            color: "#34d399",
            padding: "0.85rem 1.25rem",
            borderRadius: "var(--radius-md)",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            fontSize: "0.9rem",
            fontWeight: 600,
          }}
        >
          <span>✓</span>
          <span>{successToast}</span>
        </div>
      )}

      {/* 3 Metric Stat Cards */}
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
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
                📢
              </span>
              <span>TOTAL BROADCASTS</span>
            </span>
          </div>
          <div className="stat-value" style={{ margin: "0.5rem 0 0" }}>{broadcasts.length}</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>Sent across all channels</div>
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
                👥
              </span>
              <span>TOTAL AUDIENCE REACH</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#38bdf8", margin: "0.5rem 0 0" }}>3,240</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>Subscribed device tokens</div>
        </div>

        <div className="stat-card" style={{ borderLeft: "3px solid #fbbf24" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#fbbf24" }}>
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "26px",
                  height: "26px",
                  borderRadius: "6px",
                  background: "#fbbf2422",
                  border: "1px solid #fbbf2444",
                  fontSize: "0.85rem",
                }}
              >
                📊
              </span>
              <span>AVG OPEN RATE</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#fbbf24", margin: "0.5rem 0 0" }}>54.1%</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>Click-through rate</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar" style={{ flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
        <div className="toolbar-left" style={{ flex: "1 1 300px" }}>
          <div className="toolbar-search" style={{ width: "100%", maxWidth: "380px" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search sent notifications by title or message..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.85rem" }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="toolbar-right" style={{ background: "transparent", border: "none", display: "flex", alignItems: "center", gap: "6px" }}>
          <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
            Type:
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              background: "var(--bg-card)",
              color: typeFilter !== "all" ? "var(--purple-light)" : "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "0.45rem 0.85rem",
              fontSize: "0.84rem",
              cursor: "pointer",
              outline: "none",
              fontWeight: typeFilter !== "all" ? 600 : 500,
            }}
          >
            <option value="all" style={{ background: "#161922", color: "#fff" }}>All Types</option>
            <option value="offer" style={{ background: "#161922", color: "#fff" }}>Promotions & Offers</option>
            <option value="info" style={{ background: "#161922", color: "#fff" }}>Information & Updates</option>
            <option value="alert" style={{ background: "#161922", color: "#fff" }}>System Alerts</option>
          </select>
        </div>
      </div>

      {/* Broadcasts History Table */}
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Notification Details</th>
              <th style={{ textAlign: "center" }}>Category</th>
              <th style={{ textAlign: "center" }}>Target Audience</th>
              <th style={{ textAlign: "center" }}>Sent Time</th>
              <th style={{ textAlign: "center" }}>Audience Reach</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBroadcasts.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📢</div>
                  No broadcast notifications found matching your search.
                </td>
              </tr>
            ) : (
              filteredBroadcasts.map(b => (
                <tr key={b.id}>
                  <td style={{ textAlign: "center", maxWidth: "340px" }}>
                    <div style={{ display: "inline-block", textAlign: "center" }}>
                      <div style={{ fontWeight: 700, color: "#fff", fontSize: "0.92rem", marginBottom: "2px" }}>
                        {b.title}
                      </div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", lineHeight: 1.4 }}>
                        {b.message}
                      </div>
                      {b.link && (
                        <div style={{ fontSize: "0.72rem", color: "var(--purple-light)", marginTop: "4px" }}>
                          Target: {b.link}
                        </div>
                      )}
                    </div>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <span
                      style={{
                        padding: "3px 9px",
                        borderRadius: "12px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        background: b.type === "offer" ? "rgba(192, 132, 252, 0.15)" : b.type === "alert" ? "rgba(248, 113, 113, 0.15)" : "rgba(56, 189, 248, 0.15)",
                        color: b.type === "offer" ? "#c084fc" : b.type === "alert" ? "#f87171" : "#38bdf8",
                        border: `1px solid ${b.type === "offer" ? "#c084fc40" : b.type === "alert" ? "#f8717140" : "#38bdf840"}`,
                      }}
                    >
                      {b.type === "offer" ? "PROMO OFFER" : b.type === "alert" ? "ALERT" : "INFO UPDATE"}
                    </span>
                  </td>

                  <td style={{ textAlign: "center", color: "var(--text-primary)", fontSize: "0.85rem" }}>
                    {b.targetLabel}
                  </td>

                  <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    <div>{b.sentAt}</div>
                  </td>

                  <td style={{ textAlign: "center", fontWeight: 700, color: "#fff" }}>
                    {b.reach} users
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      className="order-view-details-btn"
                      title="Delete Notification Record"
                      onClick={() => handleDeleteClick(b)}
                      style={{
                        color: "#f87171",
                        borderColor: "rgba(248, 113, 113, 0.3)",
                        background: "rgba(248, 113, 113, 0.08)",
                        margin: "0 auto",
                      }}
                    >
                      <span>🗑️</span>
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Compose Notification Modal */}
      {showComposeModal && (
        <div className="page-modal-overlay" onClick={() => setShowComposeModal(false)}>
          <div className="page-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: "560px" }}>
            <form onSubmit={handleSendNotification}>
              <div className="page-modal-header">
                <div className="page-modal-title">
                  <span>📢</span> Send Customer Notification
                </div>
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "1.2rem", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>

              <div className="page-modal-body">
                <div className="form-field-group">
                  <label>Notification Headline / Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flash 25% Off Weekend Promo!"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div className="form-row-2">
                  <div className="form-field-group">
                    <label>Notification Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="offer">Special Offer / Discount</option>
                      <option value="info">General Info & Update</option>
                      <option value="alert">Alert / System Announcement</option>
                    </select>
                  </div>

                  <div className="form-field-group">
                    <label>Target Audience</label>
                    <select
                      value={formData.target}
                      onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                    >
                      <option value="all">All App & Web Users (3,240)</option>
                      <option value="customers">Active Customers (2,890)</option>
                      <option value="vip">VIP Club Tier (420)</option>
                      <option value="abandoned">Abandoned Cart Users (184)</option>
                    </select>
                  </div>
                </div>

                <div className="form-field-group">
                  <label>Notification Message / Description *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Enter message text sent to customer push notifications and app inbox..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="form-field-group">
                  <label>Destination Route / Action Link (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. /discounts or /shop?deal=flash25"
                    value={formData.link}
                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  />
                </div>
              </div>

              <div className="page-modal-footer">
                <button type="button" className="btn btn-outline" onClick={() => setShowComposeModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <span>🚀</span> Broadcast Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Warning Popup Modal */}
      {notifToDelete && (
        <div
          className="page-modal-backdrop"
          onClick={handleCancelDelete}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "1rem",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            className="card"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#141726",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              borderRadius: "16px",
              padding: "2rem",
              maxWidth: "460px",
              width: "100%",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 25px rgba(239, 68, 68, 0.15)",
              textAlign: "center",
            }}
          >
            {/* Warning Icon Badge */}
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "rgba(239, 68, 68, 0.15)",
                border: "2px solid rgba(239, 68, 68, 0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.25rem",
                fontSize: "1.75rem",
              }}
            >
              ⚠️
            </div>

            {/* Warning Heading & Description */}
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>
              Delete Notification?
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              Are you sure you want to permanently delete broadcast{" "}
              <strong style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.12)", padding: "2px 8px", borderRadius: "4px" }}>
                {notifToDelete.title}
              </strong>
              ? This action cannot be undone.
            </p>

            {/* Modal Actions */}
            <div style={{ display: "flex", gap: "0.85rem", justifyContent: "center", alignItems: "center", maxWidth: "320px", margin: "0 auto" }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={handleCancelDelete}
                style={{
                  flex: 1,
                  padding: "0.65rem 1.25rem",
                  borderRadius: "8px",
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "center",
                  justifyContent: "center",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleConfirmDelete}
                style={{
                  flex: 1,
                  padding: "0.65rem 1.25rem",
                  borderRadius: "8px",
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "6px",
                  boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)",
                  textAlign: "center",
                }}
              >
                <span>🗑️</span> Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
