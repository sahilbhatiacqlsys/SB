import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const INITIAL_QUERIES = [
  {
    id: "QRY-1042",
    customerName: "Rohan Khanna",
    customerEmail: "rohan.khanna@gmail.com",
    customerPhone: "+91 98450 12345",
    subject: "Return & Exchange timeline for Shoes",
    message: "Hi, I received my Puma Nitro Carbon Shoes (Order #9924) yesterday. The size is slightly tight. Can I request an exchange for UK 10?",
    date: "Today, 10:45 AM",
    status: "new", // 'new' | 'in_progress' | 'resolved'
    priority: "high",
    category: "Return / Exchange",
    orderId: "ORD-9924",
    reply: "",
  },
  {
    id: "QRY-1041",
    customerName: "Sneha Patel",
    customerEmail: "sneha.patel@acme.org",
    customerPhone: "+91 98112 99887",
    subject: "Bulk corporate order inquiry for Audio products",
    message: "Need quotation for 25 units of Sony WH-1000XM5 and GST invoice for our corporate gift hamper. What is the best wholesale price?",
    date: "Yesterday, 03:20 PM",
    status: "in_progress",
    priority: "urgent",
    category: "Wholesale Inquiry",
    orderId: "",
    reply: "Shared with B2B sales team. Proposal draft sent.",
  },
  {
    id: "QRY-1040",
    customerName: "Aditya Roy",
    customerEmail: "aditya.roy@yahoo.in",
    customerPhone: "+91 97230 44556",
    subject: "Payment debited but order confirmation pending",
    message: "Amount was deducted via UPI for Airpods Pro Max but the screen showed a timeout. Please verify transaction ID TXN-9020.",
    date: "26 Oct, 06:12 PM",
    status: "resolved",
    priority: "high",
    category: "Payment Issue",
    orderId: "ORD-9918",
    reply: "Payment verified and order confirmed successfully. Tracking details emailed.",
  },
  {
    id: "QRY-1039",
    customerName: "Ananya Deshmukh",
    customerEmail: "ananya.d@icloud.com",
    customerPhone: "+91 94001 23456",
    subject: "Diwali coupon code FESTIVE20 not applying at checkout",
    message: "Trying to apply promo code FESTIVE20 on cart value of ₹1,800. It shows requirement not met. Please clarify min purchase.",
    date: "25 Oct, 11:30 AM",
    status: "resolved",
    priority: "normal",
    category: "Discount Inquiry",
    orderId: "",
    reply: "Clarified minimum cart requirement of ₹1,999. Customer successfully placed order.",
  },
  {
    id: "QRY-1038",
    customerName: "Karan Johar",
    customerEmail: "karan.johar@outlook.com",
    customerPhone: "+91 99887 77665",
    subject: "Warranty verification for Apple Watch Ultra 2",
    message: "Where can I register the official brand warranty for the watch purchased last week?",
    date: "24 Oct, 04:15 PM",
    status: "new",
    priority: "normal",
    category: "Warranty & Support",
    orderId: "ORD-9912",
    reply: "",
  },
];

export default function QueriesPage() {
  const navigate = useNavigate();
  const [queries, setQueries] = useState(INITIAL_QUERIES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'new' | 'in_progress' | 'resolved'
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [successToast, setSuccessToast] = useState("");

  // Counts
  const totalCount = queries.length;
  const newCount = queries.filter(q => q.status === "new").length;
  const inProgressCount = queries.filter(q => q.status === "in_progress").length;
  const resolvedCount = queries.filter(q => q.status === "resolved").length;

  const filteredQueries = queries.filter(q => {
    if (statusFilter !== "all" && q.status !== statusFilter) return false;
    if (search.trim()) {
      const term = search.toLowerCase();
      const matchName = q.customerName.toLowerCase().includes(term);
      const matchEmail = q.customerEmail.toLowerCase().includes(term);
      const matchPhone = (q.customerPhone || "").toLowerCase().includes(term);
      const matchSub = q.subject.toLowerCase().includes(term);
      const matchMsg = q.message.toLowerCase().includes(term);
      const matchId = q.id.toLowerCase().includes(term);
      const matchOrder = (q.orderId || "").toLowerCase().includes(term);
      if (!matchName && !matchEmail && !matchPhone && !matchSub && !matchMsg && !matchId && !matchOrder) return false;
    }
    return true;
  });

  const [modalStatus, setModalStatus] = useState("in_progress"); // 'in_progress' | 'resolved'
  const [modalError, setModalError] = useState("");

  const handleOpenQuery = (q) => {
    setSelectedQuery(q);
    setReplyText(q.reply || "");
    setModalStatus(q.status === "resolved" ? "resolved" : "in_progress");
    setModalError("");
  };

  const handleSaveReply = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!selectedQuery) return;

    // Check if query is already resolved: cannot edit
    if (selectedQuery.status === "resolved") {
      setSelectedQuery(null);
      return;
    }

    // Compulsory response / resolution note check
    if (!replyText.trim()) {
      setModalError("Admin Response / Resolution Note is required before submitting");
      return;
    }

    const updated = queries.map(q => {
      if (q.id === selectedQuery.id) {
        return {
          ...q,
          status: modalStatus,
          reply: replyText.trim(),
        };
      }
      return q;
    });
    setQueries(updated);
    const resolvedLabel = modalStatus === "resolved" ? "marked as Resolved" : "marked as In Progress";
    setSuccessToast(`Query ${selectedQuery.id} ${resolvedLabel} successfully!`);
    setSelectedQuery(null);
    setModalError("");
    setTimeout(() => setSuccessToast(""), 3500);
  };

  const [queryToDelete, setQueryToDelete] = useState(null);

  const handleDeleteClick = (query) => {
    setQueryToDelete(query);
  };

  const handleConfirmDelete = () => {
    if (queryToDelete) {
      setQueries(queries.filter(q => q.id !== queryToDelete.id));
      if (selectedQuery && selectedQuery.id === queryToDelete.id) {
        setSelectedQuery(null);
      }
      setQueryToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setQueryToDelete(null);
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">User Queries & Support Tickets</h1>
          <p className="page-subtitle">View and respond to inquiries, order questions, exchanges, and feedback sent by users</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline" onClick={() => alert("Exporting query tickets to CSV...")}>
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* Success banner */}
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

      {/* 4 Metric Stat Cards */}
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
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
                💬
              </span>
              <span>TOTAL QUERIES</span>
            </span>
          </div>
          <div className="stat-value" style={{ margin: "0.5rem 0 0" }}>{totalCount}</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>All customer tickets</div>
        </div>

        <div className="stat-card" style={{ borderLeft: "3px solid #f87171" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171" }}>
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "26px",
                  height: "26px",
                  borderRadius: "6px",
                  background: "rgba(248, 113, 113, 0.15)",
                  border: "1px solid rgba(248, 113, 113, 0.3)",
                  fontSize: "0.85rem",
                }}
              >
                🔴
              </span>
              <span>NEW / UNRESOLVED</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#f87171", margin: "0.5rem 0 0" }}>{newCount}</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>Awaiting first reply</div>
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
                🟡
              </span>
              <span>IN PROGRESS</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#fbbf24", margin: "0.5rem 0 0" }}>{inProgressCount}</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>Assigned to team</div>
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
                🟢
              </span>
              <span>RESOLVED TICKETS</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#34d399", margin: "0.5rem 0 0" }}>{resolvedCount}</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>Successfully closed</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar" style={{ flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
        <div className="toolbar-left" style={{ flex: "1 1 300px" }}>
          <div className="toolbar-search" style={{ width: "100%", maxWidth: "380px" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search by customer name, email, phone, order ref, or subject..."
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
            Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              background: "var(--bg-card)",
              color: statusFilter !== "all" ? "var(--purple-light)" : "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "0.45rem 0.85rem",
              fontSize: "0.84rem",
              cursor: "pointer",
              outline: "none",
              fontWeight: statusFilter !== "all" ? 600 : 500,
            }}
          >
            <option value="all" style={{ background: "#161922", color: "#fff" }}>All Tickets</option>
            <option value="new" style={{ background: "#161922", color: "#fff" }}>New / Unread</option>
            <option value="in_progress" style={{ background: "#161922", color: "#fff" }}>In Progress</option>
            <option value="resolved" style={{ background: "#161922", color: "#fff" }}>Resolved</option>
          </select>
        </div>
      </div>

      {/* Queries Table */}
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Customer</th>
              <th style={{ textAlign: "center" }}>Subject & Query</th>
              <th style={{ textAlign: "center" }}>Date & Time</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredQueries.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📩</div>
                  No user queries found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredQueries.map(q => (
                <tr key={q.id}>
                  <td style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 600, color: "#fff" }}>{q.customerName}</div>
                    <div style={{ fontSize: "0.78rem", color: "var(--purple-light)" }}>{q.customerEmail}</div>
                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{q.customerPhone}</div>
                  </td>

                  <td style={{ textAlign: "center", maxWidth: "340px" }}>
                    <div style={{ display: "inline-block", textAlign: "center" }}>
                      <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.9rem", marginBottom: "2px" }}>
                        {q.subject}
                      </div>
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--text-secondary)",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          textAlign: "center",
                        }}
                      >
                        {q.message}
                      </div>
                      {q.orderId && (
                        <span style={{ fontSize: "0.72rem", color: "var(--purple-light)", background: "rgba(139,92,246,0.12)", padding: "1px 6px", borderRadius: "4px", marginTop: "3px", display: "inline-block" }}>
                          Ref: {q.orderId}
                        </span>
                      )}
                    </div>
                  </td>

                  <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.82rem" }}>
                    {q.date}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <span
                      className={`status-badge status-${q.status === "resolved" ? "active" : q.status === "in_progress" ? "inactive" : "outstock"}`}
                      style={{ margin: "0 auto" }}
                    >
                      <span className="status-dot" />
                      {q.status === "in_progress" ? "IN PROGRESS" : q.status.toUpperCase()}
                    </span>
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                      <button
                        type="button"
                        className="order-view-details-btn"
                        title="View and reply to query"
                        onClick={() => navigate(`/queries/${q.id}`)}
                      >
                        <span>💬</span>
                        <span>{q.status === "resolved" ? "View" : "Reply"}</span>
                      </button>
                      <button
                        type="button"
                        className="order-view-details-btn"
                        title="Delete ticket"
                        onClick={() => handleDeleteClick(q)}
                        style={{
                          color: "#f87171",
                          borderColor: "rgba(248, 113, 113, 0.3)",
                          background: "rgba(248, 113, 113, 0.08)",
                        }}
                      >
                        <span>🗑️</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Query Detail & Reply Modal */}
      {selectedQuery && (
        <div className="page-modal-overlay" onClick={() => setSelectedQuery(null)}>
          <div className="page-modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: "620px" }}>
            <div className="page-modal-header">
              <div className="page-modal-title">
                <span>💬</span> Ticket #{selectedQuery.id}: {selectedQuery.subject}
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuery(null)}
                style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: "1.2rem", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>

            <div className="page-modal-body">
              {/* Resolved Locked Notice */}
              {selectedQuery.status === "resolved" && (
                <div
                  style={{
                    padding: "0.75rem 1rem",
                    background: "rgba(52, 211, 153, 0.12)",
                    border: "1px solid rgba(52, 211, 153, 0.35)",
                    borderRadius: "8px",
                    color: "#6ee7b7",
                    fontSize: "0.85rem",
                    marginBottom: "1rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span>🔒</span>
                  <span>This ticket is <b>Resolved</b>. The resolution note is locked and cannot be edited.</span>
                </div>
              )}

              {/* Customer summary */}
              <div style={{ background: "rgba(255, 255, 255, 0.03)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--border-light)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <span style={{ fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>{selectedQuery.customerName}</span>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{selectedQuery.date}</span>
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--purple-light)" }}>{selectedQuery.customerEmail} • {selectedQuery.customerPhone}</div>
                {selectedQuery.orderId && (
                  <div style={{ fontSize: "0.78rem", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Linked Order: <b>{selectedQuery.orderId}</b>
                  </div>
                )}
              </div>

              {/* Message from user */}
              <div className="form-field-group" style={{ marginTop: "1rem" }}>
                <label>User's Message</label>
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.3)",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    color: "#fff",
                    fontSize: "0.9rem",
                    lineHeight: 1.5,
                  }}
                >
                  {selectedQuery.message}
                </div>
              </div>

              {/* Ticket Status Dropdown */}
              <div className="form-field-group" style={{ marginTop: "1rem" }}>
                <label>Update Status *</label>
                <select
                  value={modalStatus}
                  disabled={selectedQuery.status === "resolved"}
                  onChange={(e) => setModalStatus(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.6rem 0.85rem",
                    background: selectedQuery.status === "resolved" ? "rgba(255, 255, 255, 0.05)" : "#181b2a",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "8px",
                    color: selectedQuery.status === "resolved" ? "var(--text-muted)" : "#fff",
                    fontSize: "0.9rem",
                    cursor: selectedQuery.status === "resolved" ? "not-allowed" : "pointer",
                  }}
                >
                  <option value="in_progress">🟡 In Progress</option>
                  <option value="resolved">🟢 Resolved</option>
                </select>
              </div>

              {/* Admin reply composer */}
              <div className="form-field-group" style={{ marginTop: "1rem" }}>
                <label>
                  Admin Response / Resolution Note {selectedQuery.status !== "resolved" && <span style={{ color: "#ef4444" }}>* (Compulsory)</span>}
                </label>
                <textarea
                  rows={4}
                  disabled={selectedQuery.status === "resolved"}
                  placeholder={
                    selectedQuery.status === "resolved"
                      ? "Resolution note is locked."
                      : "Type official response to customer or resolution note (compulsory before submit)..."
                  }
                  value={replyText}
                  onChange={(e) => {
                    setReplyText(e.target.value);
                    if (modalError) setModalError("");
                  }}
                  className={modalError ? "input-error" : ""}
                  style={{
                    background: selectedQuery.status === "resolved" ? "rgba(255, 255, 255, 0.04)" : "var(--bg-input)",
                    color: selectedQuery.status === "resolved" ? "var(--text-secondary)" : "#fff",
                    cursor: selectedQuery.status === "resolved" ? "not-allowed" : "text",
                  }}
                />
                <div className="field-error-slot">
                  {modalError && <span className="field-error-text">⚠️ {modalError}</span>}
                </div>
              </div>
            </div>

            <div className="page-modal-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => {
                  setSelectedQuery(null);
                  setModalError("");
                }}
              >
                {selectedQuery.status === "resolved" ? "Close" : "Cancel"}
              </button>
              {selectedQuery.status !== "resolved" && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveReply}
                >
                  <span>✓</span> Submit
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Warning Popup Modal */}
      {queryToDelete && (
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
              Delete Support Ticket?
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              Are you sure you want to permanently delete ticket{" "}
              <strong style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.12)", padding: "2px 8px", borderRadius: "4px" }}>
                {queryToDelete.id}
              </strong>{" "}
              ({queryToDelete.customerName})? This support ticket and all conversation history will be removed.
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
