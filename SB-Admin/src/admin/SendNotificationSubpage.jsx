import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { INITIAL_CUSTOMERS } from "./CustomersPage";

export default function SendNotificationSubpage({ onBroadcastSent, customers = INITIAL_CUSTOMERS }) {
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // empty by default
  const [targetAudience, setTargetAudience] = useState(""); // empty by default: 'all' | 'selected'
  const [selectedUserIds, setSelectedUserIds] = useState([]);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");
  const [link, setLink] = useState("");
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState(false);

  // Filter users in dropdown search
  const filteredUsers = customers.filter((user) => {
    if (!userSearch.trim()) return true;
    const q = userSearch.toLowerCase();
    return (
      user.name.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q) ||
      (user.phone && user.phone.includes(q))
    );
  });

  // Toggle single user selection
  const handleToggleUser = (userId) => {
    if (selectedUserIds.includes(userId)) {
      setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
    } else {
      setSelectedUserIds([...selectedUserIds, userId]);
    }
  };

  // Toggle select all users
  const handleSelectAllUsers = () => {
    if (selectedUserIds.length === customers.length) {
      setSelectedUserIds([]);
    } else {
      setSelectedUserIds(customers.map((u) => u.id));
    }
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setErrors({});

    const newErrors = {};
    if (!title.trim()) {
      newErrors.title = "Notification Headline / Title is required";
    }
    if (!type) {
      newErrors.type = "Please select a Notification Type";
    }
    if (!targetAudience) {
      newErrors.target = "Please select a Target Audience";
    } else if (targetAudience === "selected" && selectedUserIds.length === 0) {
      newErrors.target = "Please select at least one user from the dropdown";
    }
    if (!message.trim()) {
      newErrors.message = "Notification Message / Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const targetLabel =
      targetAudience === "all"
        ? `All Users (${customers.length.toLocaleString()})`
        : `Selected Users (${selectedUserIds.length})`;

    const newBroadcast = {
      id: `NOTIF-B${Date.now()}`,
      title: title.trim(),
      message: message.trim(),
      type: type,
      target: targetAudience,
      targetLabel: targetLabel,
      sentAt: "Just now",
      sentBy: "Admin",
      status: "delivered",
      reach: targetAudience === "all" ? `${customers.length.toLocaleString()}` : `${selectedUserIds.length}`,
      openRate: "0.0%",
      link: link.trim(),
    };

    if (onBroadcastSent) {
      onBroadcastSent(newBroadcast);
    }

    setSuccessMsg(true);
    setTimeout(() => {
      navigate("/notifications-send");
    }, 1200);
  };

  return (
    <div className="category-form-subpage" style={{ paddingBottom: "3rem", maxWidth: "880px", margin: "0 auto" }}>
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
            onClick={() => navigate("/notifications-send")}
            style={{
              padding: "0.45rem 0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            ← Back to Notifications
          </button>
          <div>
            <h1 className="page-title" style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span>📢</span>
              <span>Send Customer Notification</span>
            </h1>
            <p className="page-subtitle" style={{ margin: "0.25rem 0 0" }}>
              Compose and dispatch push notifications and inbox announcements
            </p>
          </div>
        </div>
      </div>

      {/* Main Form Card */}
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
            <span>Notification broadcasted successfully! Redirecting...</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Notification Headline */}
          <div className="form-field-group">
            <label>Notification Headline / Title <span style={{ color: "#ef4444" }}>*</span></label>
            <input
              type="text"
              placeholder="e.g. Flash 25% Off Weekend Promo!"
              value={title}
              className={errors.title ? "input-error" : ""}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: "" }));
              }}
            />
            <div className="field-error-slot">
              {errors.title && <span className="field-error-text">⚠️ {errors.title}</span>}
            </div>
          </div>

          {/* Row: Notification Type & Target Audience */}
          <div className="form-row-2" style={{ marginTop: "0.5rem" }}>
            <div className="form-field-group">
              <label>Notification Type <span style={{ color: "#ef4444" }}>*</span></label>
              <select
                value={type}
                className={errors.type ? "input-error" : ""}
                onChange={(e) => {
                  setType(e.target.value);
                  if (errors.type) setErrors((prev) => ({ ...prev, type: "" }));
                }}
                style={{
                  background: "#181b2a",
                  color: "#fff",
                }}
              >
                <option value="" disabled>-- Select Notification Type --</option>
                <option value="offer">Special Offer / Discount</option>
                <option value="info">General Info &amp; Update</option>
                <option value="alert">Alert / System Announcement</option>
              </select>
              <div className="field-error-slot">
                {errors.type && <span className="field-error-text">⚠️ {errors.type}</span>}
              </div>
            </div>

            <div className="form-field-group">
              <label>Target Audience <span style={{ color: "#ef4444" }}>*</span></label>
              <select
                value={targetAudience}
                className={errors.target ? "input-error" : ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setTargetAudience(val);
                  if (errors.target) setErrors((prev) => ({ ...prev, target: "" }));
                  if (val === "selected") {
                    setUserDropdownOpen(true);
                  } else {
                    setUserDropdownOpen(false);
                  }
                }}
                style={{
                  background: "#181b2a",
                  color: "#fff",
                }}
              >
                <option value="" disabled>-- Select Target Audience --</option>
                <option value="all">All Users ({customers.length})</option>
                <option value="selected">Selected Users</option>
              </select>
              <div className="field-error-slot">
                {errors.target && <span className="field-error-text">⚠️ {errors.target}</span>}
              </div>
            </div>
          </div>

          {/* User Selection Multi-Select Dropdown (when targetAudience === 'selected') */}
          {targetAudience === "selected" && (
            <div
              className="form-field-group"
              style={{
                marginTop: "1.25rem",
                background: "rgba(18, 21, 37, 0.75)",
                border: "1px solid rgba(139, 92, 246, 0.35)",
                borderRadius: "10px",
                padding: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "0.75rem",
                }}
              >
                <label style={{ margin: 0, fontWeight: 600, color: "#fff", fontSize: "0.92rem" }}>
                  Select Users ({selectedUserIds.length} of {customers.length} selected)
                </label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={handleSelectAllUsers}
                    className="btn btn-outline"
                    style={{ padding: "0.25rem 0.65rem", fontSize: "0.75rem" }}
                  >
                    {selectedUserIds.length === customers.length ? "Deselect All" : "Select All"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="btn btn-outline"
                    style={{ padding: "0.25rem 0.65rem", fontSize: "0.75rem" }}
                  >
                    {userDropdownOpen ? "▲ Collapse List" : "▼ Expand List"}
                  </button>
                </div>
              </div>

              {/* Selected User Badges Pill Bar */}
              {selectedUserIds.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "0.85rem",
                    maxHeight: "90px",
                    overflowY: "auto",
                    padding: "4px",
                    background: "rgba(0, 0, 0, 0.2)",
                    borderRadius: "6px",
                  }}
                >
                  {selectedUserIds.map((id) => {
                    const u = customers.find((c) => c.id === id);
                    if (!u) return null;
                    return (
                      <span
                        key={id}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          background: "rgba(139, 92, 246, 0.25)",
                          border: "1px solid rgba(139, 92, 246, 0.5)",
                          color: "#c084fc",
                          padding: "2px 8px",
                          borderRadius: "14px",
                          fontSize: "0.78rem",
                          fontWeight: 500,
                        }}
                      >
                        {u.name}
                        <button
                          type="button"
                          onClick={() => handleToggleUser(id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "#fca5a5",
                            cursor: "pointer",
                            padding: 0,
                            lineHeight: 1,
                            fontSize: "0.85rem",
                          }}
                        >
                          ×
                        </button>
                      </span>
                    );
                  })}
                </div>
              )}

              {/* Collapsible Dropdown List */}
              {userDropdownOpen && (
                <div
                  style={{
                    border: "1px solid rgba(139, 92, 246, 0.25)",
                    borderRadius: "8px",
                    background: "#0c0e18",
                    padding: "0.75rem",
                  }}
                >
                  {/* Search inside user list */}
                  <div style={{ position: "relative", marginBottom: "0.75rem" }}>
                    <input
                      type="text"
                      placeholder="Search users by name, email, or phone..."
                      value={userSearch}
                      onChange={(e) => setUserSearch(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "0.5rem 0.75rem",
                        background: "#181b2a",
                        border: "1px solid rgba(139, 92, 246, 0.3)",
                        borderRadius: "6px",
                        color: "#fff",
                        fontSize: "0.85rem",
                      }}
                    />
                  </div>

                  {/* Users Checkbox List */}
                  <div
                    style={{
                      maxHeight: "220px",
                      overflowY: "auto",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {filteredUsers.length === 0 ? (
                      <div style={{ textAlign: "center", padding: "1rem", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                        No users found matching "{userSearch}"
                      </div>
                    ) : (
                      filteredUsers.map((user) => {
                        const isSelected = selectedUserIds.includes(user.id);
                        return (
                          <label
                            key={user.id}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              padding: "0.5rem 0.75rem",
                              borderRadius: "6px",
                              background: isSelected ? "rgba(139, 92, 246, 0.15)" : "transparent",
                              cursor: "pointer",
                              transition: "background 0.15s ease",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleToggleUser(user.id)}
                              style={{ width: "16px", height: "16px", accentColor: "#8b5cf6", cursor: "pointer" }}
                            />
                            {user.avatar ? (
                              <img
                                src={user.avatar}
                                alt={user.name}
                                style={{ width: "26px", height: "26px", borderRadius: "50%", objectFit: "cover" }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: "26px",
                                  height: "26px",
                                  borderRadius: "50%",
                                  background: "#8b5cf6",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "0.75rem",
                                  fontWeight: 600,
                                }}
                              >
                                {user.name.charAt(0)}
                              </div>
                            )}
                            <div style={{ flex: 1 }}>
                              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#fff" }}>
                                {user.name}
                              </div>
                              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                                {user.email} • {user.phone}
                              </div>
                            </div>
                            <span
                              style={{
                                fontSize: "0.72rem",
                                padding: "2px 6px",
                                borderRadius: "4px",
                                background: user.status === "active" ? "rgba(52, 211, 153, 0.15)" : "rgba(251, 191, 36, 0.15)",
                                color: user.status === "active" ? "#34d399" : "#fbbf24",
                              }}
                            >
                              {user.status || "user"}
                            </span>
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Notification Message */}
          <div className="form-field-group" style={{ marginTop: "1.25rem" }}>
            <label>Notification Message / Description <span style={{ color: "#ef4444" }}>*</span></label>
            <textarea
              rows={4}
              placeholder="Enter message text sent to customer push notifications and app inbox..."
              value={message}
              className={errors.message ? "input-error" : ""}
              onChange={(e) => {
                setMessage(e.target.value);
                if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
              }}
            />
            <div className="field-error-slot">
              {errors.message && <span className="field-error-text">⚠️ {errors.message}</span>}
            </div>
          </div>

          {/* Destination Route / Action Link */}
          <div className="form-field-group" style={{ marginTop: "1rem" }}>
            <label>Destination Route / Action Link (Optional)</label>
            <input
              type="text"
              placeholder="e.g. /discounts or /shop?deal=flash25"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
          </div>

          {/* Submit Actions */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end", marginTop: "2rem" }}>
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/notifications-send")}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" style={{ minWidth: "160px" }}>
              <span>🚀</span> Broadcast Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
