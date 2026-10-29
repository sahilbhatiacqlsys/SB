import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { INITIAL_QUERIES } from "./QueriesPage";

export default function QueryReplySubpage({ queriesList = INITIAL_QUERIES, onSaveQueryReply }) {
  const { queryId } = useParams();
  const navigate = useNavigate();

  const decodedId = decodeURIComponent(queryId || "");
  const query = queriesList.find(
    (q) => q.id === decodedId || q.id.toLowerCase() === decodedId.toLowerCase()
  );

  const [currentQuery, setCurrentQuery] = useState(query);
  const [replyText, setReplyText] = useState(query ? query.reply || "" : "");
  const [status, setStatus] = useState(query ? (query.status === "resolved" ? "resolved" : "in_progress") : "in_progress");
  const [formError, setFormError] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  if (!query && !currentQuery) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📩</div>
        <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Query Ticket Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          The requested query ticket <code>{decodedId}</code> does not exist or has been deleted.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/queries")}>
          ← Back to Queries
        </button>
      </div>
    );
  }

  const q = currentQuery || query;
  const isResolved = q.status === "resolved";

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (isResolved) {
      navigate("/queries");
      return;
    }

    if (!replyText.trim()) {
      setFormError("Admin Response / Resolution Note is compulsory before submit");
      return;
    }

    const updated = {
      ...q,
      status: status,
      reply: replyText.trim(),
    };

    setCurrentQuery(updated);
    if (onSaveQueryReply) {
      onSaveQueryReply(updated);
    }

    setSuccessMsg(true);
    setTimeout(() => {
      navigate("/queries");
    }, 1200);
  };

  return (
    <div className="category-form-subpage" style={{ paddingBottom: "3rem", maxWidth: "860px", margin: "0 auto" }}>
      {/* Subpage Header with Back Navigation */}
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
            onClick={() => navigate("/queries")}
            style={{
              padding: "0.45rem 0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            ← Back to Queries
          </button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <h1 className="page-title" style={{ margin: 0 }}>
                Ticket #{q.id}
              </h1>
              <span
                className={`status-badge status-${q.status === "resolved" ? "active" : q.status === "in_progress" ? "inactive" : "outstock"}`}
              >
                <span className="status-dot" />
                {q.status === "in_progress" ? "IN PROGRESS" : q.status.toUpperCase()}
              </span>
            </div>
            <p className="page-subtitle" style={{ margin: "0.25rem 0 0" }}>
              {q.subject}
            </p>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div
        className="card"
        style={{
          background: "#111422",
          border: "1px solid rgba(139, 92, 246, 0.25)",
          borderRadius: "14px",
          padding: "1.75rem",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.4)",
        }}
      >
        {successMsg && (
          <div
            style={{
              padding: "0.85rem 1.15rem",
              background: "rgba(52, 211, 153, 0.12)",
              border: "1px solid rgba(52, 211, 153, 0.35)",
              borderRadius: "8px",
              color: "#6ee7b7",
              fontSize: "0.88rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>✓</span>
            <span>Response saved and ticket updated successfully! Redirecting...</span>
          </div>
        )}

        {/* Resolved Lock Notice */}
        {isResolved && (
          <div
            style={{
              padding: "0.85rem 1.15rem",
              background: "rgba(52, 211, 153, 0.12)",
              border: "1px solid rgba(52, 211, 153, 0.35)",
              borderRadius: "8px",
              color: "#6ee7b7",
              fontSize: "0.88rem",
              marginBottom: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>🔒</span>
            <span>This ticket has been marked <b>Resolved</b>. The resolution note is locked and cannot be edited.</span>
          </div>
        )}

        {/* Customer Information Block */}
        <div
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            padding: "1.1rem 1.25rem",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
            <span style={{ fontWeight: 700, color: "#fff", fontSize: "1rem" }}>{q.customerName}</span>
            <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>{q.date}</span>
          </div>
          <div style={{ fontSize: "0.86rem", color: "var(--purple-light)" }}>
            {q.customerEmail} • {q.customerPhone}
          </div>
          {q.orderId && (
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "6px" }}>
              Linked Order Ref: <strong style={{ color: "#fff", background: "rgba(139, 92, 246, 0.15)", padding: "2px 6px", borderRadius: "4px" }}>{q.orderId}</strong>
            </div>
          )}
        </div>

        {/* User's Original Message */}
        <div className="form-field-group" style={{ marginBottom: "1.5rem" }}>
          <label style={{ color: "var(--text-muted)", fontSize: "0.84rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            Customer's Inquiry Message
          </label>
          <div
            style={{
              background: "rgba(0, 0, 0, 0.35)",
              padding: "1.1rem 1.25rem",
              borderRadius: "10px",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              color: "#fff",
              fontSize: "0.95rem",
              lineHeight: 1.6,
            }}
          >
            {q.message}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Status Dropdown */}
          <div className="form-field-group" style={{ marginBottom: "1.5rem" }}>
            <label>Update Ticket Status *</label>
            <select
              value={status}
              disabled={isResolved}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                width: "100%",
                padding: "0.65rem 0.95rem",
                background: isResolved ? "rgba(255, 255, 255, 0.05)" : "#181b2a",
                border: "1px solid rgba(139, 92, 246, 0.3)",
                borderRadius: "8px",
                color: isResolved ? "var(--text-muted)" : "#fff",
                fontSize: "0.9rem",
                cursor: isResolved ? "not-allowed" : "pointer",
              }}
            >
              <option value="in_progress">🟡 In Progress</option>
              <option value="resolved">🟢 Resolved</option>
            </select>
          </div>

          {/* Admin Response / Resolution Note */}
          <div className="form-field-group" style={{ marginBottom: "1.75rem" }}>
            <label>
              Admin Response / Resolution Note {!isResolved && <span style={{ color: "#ef4444" }}>* (Compulsory)</span>}
            </label>
            <textarea
              rows={5}
              disabled={isResolved}
              placeholder={
                isResolved
                  ? "Resolution note is locked."
                  : "Type official response to customer or internal resolution note (compulsory before submit)..."
              }
              value={replyText}
              onChange={(e) => {
                setReplyText(e.target.value);
                if (formError) setFormError("");
              }}
              className={formError ? "input-error" : ""}
              style={{
                background: isResolved ? "rgba(255, 255, 255, 0.04)" : "var(--bg-input)",
                color: isResolved ? "var(--text-secondary)" : "#fff",
                cursor: isResolved ? "not-allowed" : "text",
                lineHeight: 1.5,
              }}
            />
            <div className="field-error-slot">
              {formError && <span className="field-error-text">⚠️ {formError}</span>}
            </div>
          </div>

          {/* Form Actions */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/queries")}
            >
              {isResolved ? "Back to Queries" : "Cancel"}
            </button>
            {!isResolved && (
              <button type="submit" className="btn btn-primary" style={{ minWidth: "140px" }}>
                <span>✓</span> Submit Response
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
