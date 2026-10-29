// src/pages/ContactQueriesPage.jsx
import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { MessageSquare, Send, HelpCircle, CheckCircle, Clock } from "lucide-react";

export default function ContactQueriesPage() {
  const { queries, submitQuery } = useStore();

  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("Product Inquiry");
  const [message, setMessage] = useState("");
  const [activeQuery, setActiveQuery] = useState(queries[0] || null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) {
      alert("Please enter subject and message.");
      return;
    }

    const created = submitQuery({ subject, category, message });
    setActiveQuery(created);
    setSubject("");
    setMessage("");
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1280px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontSize: "2.3rem", color: "#fff", marginBottom: "0.3rem" }}>
          Help Center &amp; Support Tickets
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.92rem" }}>
          Synchronized directly with the SB Admin Queries Module for lightning-fast resolutions.
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
        {/* Left Column: Submit New Query Form */}
        <div className="glass-panel" style={{ borderRadius: "20px", padding: "2rem" }}>
          <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <MessageSquare size={18} color="#a78bfa" />
            <span>Submit a New Query</span>
          </h3>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Topic / Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  color: "#fff",
                  outline: "none"
                }}
              >
                <option value="Product Inquiry">Product Inquiry &amp; Specifications</option>
                <option value="Shipping">Shipping &amp; Delivery Tracking</option>
                <option value="Payment">Payment / Refund Status</option>
                <option value="Warranty">Warranty &amp; Service</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Subject Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Delivery ETA for Airpods Pro Max"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border)",
                  color: "#fff",
                  outline: "none"
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Message &amp; Detailed Description
              </label>
              <textarea
                rows={4}
                required
                placeholder="Explain what assistance or clarification you need from our team..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid var(--border)",
                  color: "#fff",
                  outline: "none",
                  resize: "vertical"
                }}
              />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: "0.85rem", marginTop: "0.5rem" }}>
              <Send size={16} /> Send Ticket to Admin Team
            </button>
          </form>
        </div>

        {/* Right Column: Existing Tickets & Responses */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <h3 style={{ fontSize: "1.2rem", color: "#fff" }}>Your Support Tickets ({queries.length})</h3>

          {queries.map((q) => {
            const isSelected = activeQuery?.id === q.id;
            const isResolved = q.status === "Resolved";
            return (
              <div
                key={q.id}
                onClick={() => setActiveQuery(q)}
                className="glass-card"
                style={{
                  padding: "1.5rem",
                  borderRadius: "18px",
                  border: isSelected ? "2px solid var(--accent-purple-light)" : "1px solid var(--border)",
                  cursor: "pointer"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <code style={{ color: "var(--accent-purple-light)", fontSize: "0.8rem", background: "rgba(139, 92, 246, 0.15)", padding: "2px 6px", borderRadius: "4px" }}>
                      {q.id}
                    </code>
                    <span className={`badge ${isResolved ? "badge-emerald" : "badge-purple"}`}>
                      {q.status}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{q.date}</span>
                </div>

                <h4 style={{ color: "#fff", fontSize: "1.05rem", marginBottom: "0.4rem" }}>{q.subject}</h4>
                <div style={{ fontSize: "0.82rem", color: "var(--accent-cyan-light)", marginBottom: "0.75rem" }}>
                  Category: {q.category}
                </div>

                {/* Conversation thread */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginTop: "1rem", paddingTop: "0.85rem", borderTop: "1px solid rgba(255, 255, 255, 0.06)" }}>
                  {q.messages?.map((msg, i) => (
                    <div
                      key={i}
                      style={{
                        padding: "0.7rem 0.9rem",
                        borderRadius: "10px",
                        background: msg.sender === "admin" ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 255, 255, 0.04)",
                        border: msg.sender === "admin" ? "1px solid rgba(16, 185, 129, 0.3)" : "1px solid var(--border)",
                        fontSize: "0.85rem"
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "3px" }}>
                        <strong style={{ color: msg.sender === "admin" ? "#34d399" : "#a78bfa", fontSize: "0.75rem" }}>
                          {msg.sender === "admin" ? "SB Store Support Team" : "You"}
                        </strong>
                        <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{msg.time}</span>
                      </div>
                      <p style={{ color: "#e2e8f0", lineHeight: 1.4 }}>{msg.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
