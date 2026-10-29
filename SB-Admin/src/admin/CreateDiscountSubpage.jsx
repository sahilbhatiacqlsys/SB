import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const formatDisplayDate = (isoStr) => {
  if (!isoStr) return "";
  const [yyyy, mm, dd] = isoStr.split("-");
  if (!yyyy || !mm || !dd) return "";
  return `${dd}-${mm}-${yyyy}`;
};

export default function CreateDiscountSubpage({ onSaveDiscount }) {
  const navigate = useNavigate();

  // Nothing is selected by default
  const [code, setCode] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState(""); // empty by default
  const [value, setValue] = useState("");
  const [minPurchase, setMinPurchase] = useState("");
  const [usageLimit, setUsageLimit] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState(""); // empty by default

  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState({});
  const [dateError, setDateError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Real-time validation when Start Date changes
  const handleStartDateChange = (val) => {
    // If user picks a start date after the already selected expiry date, reject it
    if (endDate && val && val > endDate) {
      setDateError("Start Date cannot be selected after Expiry Date");
      setStartDate(val);
      return;
    }
    setDateError("");
    setFormError("");
    setStartDate(val);
  };

  // Real-time validation when Expiry Date changes
  const handleEndDateChange = (val) => {
    // If user picks an expiry date before the already selected start date, reject it
    if (startDate && val && val < startDate) {
      setDateError("Expiry Date cannot be selected before Start Date");
      setEndDate(val);
      return;
    }
    setDateError("");
    setFormError("");
    setEndDate(val);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setErrors({});
    setDateError("");
    setSaveSuccess(false);

    const newErrors = {};

    if (!code.trim()) {
      newErrors.code = "Coupon Code is required";
    }
    if (!type) {
      newErrors.type = "Please select a Discount Type";
    }
    if (!title.trim()) {
      newErrors.title = "Campaign Title is required";
    }
    if (type !== "shipping") {
      if (!value.trim()) {
        newErrors.value = type === "percentage" ? "Discount Percentage is required" : "Discount Amount is required";
      } else {
        const numVal = parseFloat(value);
        if (isNaN(numVal) || numVal <= 0) {
          newErrors.value = "Please enter a valid numeric value greater than 0";
        } else if (type === "percentage" && numVal > 100) {
          newErrors.value = "Percentage discount cannot exceed 100%";
        }
      }
    }
    if (minPurchase.trim()) {
      const minVal = parseFloat(minPurchase);
      if (isNaN(minVal) || minVal < 0) {
        newErrors.minPurchase = "Please enter a valid numeric value for Min. Cart Requirement";
      }
    }
    if (!status) {
      newErrors.status = "Please select a Campaign Status";
    }
    if (!startDate) {
      newErrors.startDate = "Start Date is required";
    }
    if (!endDate) {
      newErrors.endDate = "Expiration Date is required";
    }
    if (startDate && endDate && startDate > endDate) {
      newErrors.startDate = "Start Date cannot be after Expiry Date";
      newErrors.endDate = "Expiry Date cannot be before Start Date";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formattedValue =
      type === "percentage"
        ? `${value.replace(/[^0-9.]/g, "")}%`
        : type === "fixed"
        ? `₹${value.replace(/[^0-9.]/g, "")}`
        : "Free Ship";

    const formattedMinPurchase = minPurchase.trim()
      ? minPurchase.startsWith("₹")
        ? minPurchase.trim()
        : `₹${minPurchase.trim()}`
      : "₹0";

    const formatDisplayDate = (dStr, fallback) => {
      if (!dStr) return fallback;
      try {
        const parts = dStr.split("-");
        if (parts.length === 3) {
          const d = new Date(parts[0], parseInt(parts[1], 10) - 1, parts[2]);
          const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
          ];
          return `${String(d.getDate()).padStart(2, "0")} ${months[d.getMonth()]}, ${d.getFullYear()}`;
        }
      } catch (err) {
        // fallback
      }
      return dStr;
    };

    const newDiscount = {
      id: `DISC-${Date.now()}`,
      code: code.trim().toUpperCase(),
      title: title.trim(),
      type: type,
      value: formattedValue,
      minPurchase: formattedMinPurchase,
      usageCount: 0,
      usageLimit: parseInt(usageLimit, 10) || 500,
      startDate: formatDisplayDate(startDate, "Today"),
      endDate: formatDisplayDate(endDate, "Ongoing"),
      status: status,
    };

    if (onSaveDiscount) {
      onSaveDiscount(newDiscount);
    }

    setSaveSuccess(true);
    setTimeout(() => {
      navigate("/discounts");
    }, 1000);
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
            onClick={() => navigate("/discounts")}
            style={{
              padding: "0.45rem 0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            ← Back to Discounts
          </button>
          <div>
            <h1 className="page-title" style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span>🏷️</span>
              <span>Create Promotional Discount</span>
            </h1>
            <p className="page-subtitle" style={{ margin: "0.25rem 0 0" }}>
              Configure promo voucher code, discount rate, minimum order threshold, and redemption limits
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
        {saveSuccess && (
          <div
            style={{
              padding: "0.85rem 1.15rem",
              background: "rgba(52, 211, 153, 0.12)",
              border: "1px solid rgba(52, 211, 153, 0.35)",
              borderRadius: "8px",
              color: "#6ee7b7",
              fontSize: "0.88rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>✓</span> Promotional discount created successfully! Returning to discounts list...
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Row 1: Coupon Code & Discount Type */}
          <div className="form-row-2">
            <div className="form-field-group">
              <label>Coupon Code <span style={{ color: "#ef4444" }}>*</span></label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  placeholder="e.g. FESTIVE20"
                  value={code}
                  className={errors.code ? "input-error" : ""}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    if (errors.code) setErrors(prev => ({ ...prev, code: "" }));
                  }}
                  style={{
                    textTransform: "uppercase",
                    fontWeight: 700,
                    letterSpacing: "1px",
                    paddingLeft: "2.4rem",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    left: "0.85rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    fontSize: "0.95rem",
                    color: "var(--purple-light)",
                  }}
                >
                  🎟️
                </span>
              </div>
              <div className="field-error-slot">
                {errors.code && <span className="field-error-text">⚠️ {errors.code}</span>}
              </div>
            </div>

            <div className="form-field-group">
              <label>Discount Type <span style={{ color: "#ef4444" }}>*</span></label>
              <select
                value={type}
                className={errors.type ? "input-error" : ""}
                onChange={(e) => {
                  setType(e.target.value);
                  if (errors.type) setErrors(prev => ({ ...prev, type: "" }));
                }}
              >
                <option value="" disabled>-- Select Discount Type --</option>
                <option value="percentage">Percentage Off (%)</option>
                <option value="fixed">Fixed Cash Amount (₹)</option>
                <option value="shipping">Free Express Shipping</option>
              </select>
              <div className="field-error-slot">
                {errors.type && <span className="field-error-text">⚠️ {errors.type}</span>}
              </div>
            </div>
          </div>

          {/* Campaign Title */}
          <div className="form-field-group" style={{ marginTop: "0.5rem" }}>
            <label>Campaign Title / Public Description <span style={{ color: "#ef4444" }}>*</span></label>
            <input
              type="text"
              placeholder="e.g. Diwali Weekend Mega Flash Offer"
              value={title}
              className={errors.title ? "input-error" : ""}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors(prev => ({ ...prev, title: "" }));
              }}
            />
            <div className="field-error-slot">
              {errors.title && <span className="field-error-text">⚠️ {errors.title}</span>}
            </div>
          </div>

          {/* Row 2: Discount Value & Min Cart Requirement */}
          <div className="form-row-2" style={{ marginTop: "0.5rem" }}>
            <div className="form-field-group">
              <label>
                {type === "percentage" ? (
                  <>Discount Percentage (%) <span style={{ color: "#ef4444" }}>*</span></>
                ) : type === "fixed" ? (
                  <>Discount Amount (₹) <span style={{ color: "#ef4444" }}>*</span></>
                ) : type === "shipping" ? (
                  "Shipping Waiver"
                ) : (
                  <>Discount Amount / Value <span style={{ color: "#ef4444" }}>*</span></>
                )}
              </label>
              <input
                type="text"
                inputMode="decimal"
                disabled={type === "shipping" || !type}
                className={errors.value ? "input-error" : ""}
                placeholder={
                  !type
                    ? "Select discount type first"
                    : type === "percentage"
                    ? "e.g. 25 (0 - 100)"
                    : type === "fixed"
                    ? "e.g. 500"
                    : "Free Ship"
                }
                value={type === "shipping" ? "Free Ship" : value}
                onChange={(e) => {
                  const raw = e.target.value;
                  // If shipping waiver, do not edit
                  if (type === "shipping") return;

                  // Numeric validation: only allow numbers and at most one decimal point
                  const cleaned = raw.replace(/[^0-9.]/g, "");
                  const parts = cleaned.split(".");
                  const validVal = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned;

                  // For percentage, cap numeric value at 100
                  if (type === "percentage" && validVal !== "") {
                    const num = parseFloat(validVal);
                    if (!isNaN(num) && num > 100) {
                      setValue("100");
                      setErrors(prev => ({ ...prev, value: "Percentage discount cannot exceed 100%" }));
                      return;
                    }
                  }

                  setValue(validVal);
                  if (errors.value) setErrors(prev => ({ ...prev, value: "" }));
                }}
              />
              <div className="field-error-slot">
                {errors.value && <span className="field-error-text">⚠️ {errors.value}</span>}
              </div>
            </div>

            <div className="form-field-group">
              <label>Min. Cart Requirement (₹)</label>
              <input
                type="text"
                inputMode="decimal"
                placeholder="e.g. 1499"
                value={minPurchase}
                onChange={(e) => {
                  const raw = e.target.value;
                  // Numeric validation: only allow digits and at most one decimal point
                  const cleaned = raw.replace(/[^0-9.]/g, "");
                  const parts = cleaned.split(".");
                  const validVal = parts.length > 2 ? `${parts[0]}.${parts.slice(1).join("")}` : cleaned;
                  setMinPurchase(validVal);
                  setFormError("");
                }}
              />
            </div>
          </div>

          {/* Row 3: Total Redemption Limit & Campaign Status */}
          <div className="form-row-2" style={{ marginTop: "1rem" }}>
            <div className="form-field-group">
              <label>Total Redemption Limit</label>
              <input
                type="number"
                placeholder="e.g. 500"
                value={usageLimit}
                onChange={(e) => setUsageLimit(e.target.value)}
              />
            </div>

            <div className="form-field-group">
              <label>Campaign Status <span style={{ color: "#ef4444" }}>*</span></label>
              <select
                value={status}
                className={errors.status ? "input-error" : ""}
                onChange={(e) => {
                  setStatus(e.target.value);
                  if (errors.status) setErrors(prev => ({ ...prev, status: "" }));
                }}
              >
                <option value="" disabled>-- Select Campaign Status --</option>
                <option value="active">Active (Redeemable Now)</option>
                <option value="scheduled">Schedule (Upcoming)</option>
                <option value="expired">Expire (Inactive)</option>
              </select>
              <div className="field-error-slot">
                {errors.status && <span className="field-error-text">⚠️ {errors.status}</span>}
              </div>
            </div>
          </div>

          {/* Row 4: Start Date & Expiration Date with bidirectional restrictions */}
          <div className="form-row-2" style={{ marginTop: "0.5rem" }}>
            <div className="form-field-group">
              <label>Start Date <span style={{ color: "#ef4444" }}>*</span></label>
              <div className="custom-form-date-field">
                <span className={`date-field-display-text ${!startDate ? "placeholder" : ""}`}>
                  {startDate ? formatDisplayDate(startDate) : "dd-mm-yyyy"}
                </span>
                <input
                  type="date"
                  max={endDate || undefined}
                  value={startDate}
                  className={errors.startDate ? "input-error" : ""}
                  onClick={(e) => {
                    if (typeof e.target.showPicker === "function") {
                      e.target.showPicker();
                    }
                  }}
                  onChange={(e) => {
                    handleStartDateChange(e.target.value);
                    if (errors.startDate) setErrors(prev => ({ ...prev, startDate: "" }));
                  }}
                />
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                {endDate ? `Cannot be selected after ${formatDisplayDate(endDate)}` : "Campaign launch date"}
              </span>
              <div className="field-error-slot">
                {errors.startDate && <span className="field-error-text">⚠️ {errors.startDate}</span>}
              </div>
            </div>

            <div className="form-field-group">
              <label>Expiration Date / Validity <span style={{ color: "#ef4444" }}>*</span></label>
              <div className="custom-form-date-field">
                <span className={`date-field-display-text ${!endDate ? "placeholder" : ""}`}>
                  {endDate ? formatDisplayDate(endDate) : "dd-mm-yyyy"}
                </span>
                <input
                  type="date"
                  min={startDate || undefined}
                  value={endDate}
                  className={errors.endDate ? "input-error" : ""}
                  onClick={(e) => {
                    if (typeof e.target.showPicker === "function") {
                      e.target.showPicker();
                    }
                  }}
                  onChange={(e) => {
                    handleEndDateChange(e.target.value);
                    if (errors.endDate) setErrors(prev => ({ ...prev, endDate: "" }));
                  }}
                />
              </div>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                {startDate ? `Cannot be selected before ${formatDisplayDate(startDate)}` : "Must be on or after start date"}
              </span>
              <div className="field-error-slot">
                {errors.endDate && <span className="field-error-text">⚠️ {errors.endDate}</span>}
              </div>
            </div>
          </div>

          {/* Live Coupon Preview (Only rendered when user enters details) */}
          {(code || title || type) && (
            <div
              style={{
                background: "rgba(139, 92, 246, 0.08)",
                border: "1px dashed rgba(139, 92, 246, 0.35)",
                borderRadius: "10px",
                padding: "1rem 1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                marginTop: "1.5rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.5rem" }}>⚡</span>
                <div>
                  <div style={{ fontSize: "0.92rem", fontWeight: 700, color: "#fff" }}>
                    {title || "Campaign Headline Preview"}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "2px" }}>
                    Code:{" "}
                    <strong style={{ color: "var(--purple-light)" }}>
                      {code || "YOUR_CODE"}
                    </strong>{" "}
                    • Value:{" "}
                    {type === "percentage"
                      ? `${value || "0"}% OFF`
                      : type === "fixed"
                      ? `₹${value || "0"} OFF`
                      : type === "shipping"
                      ? "Free Shipping"
                      : "Unset"}
                    {minPurchase ? ` • Min: ₹${minPurchase.replace(/[^0-9]/g, "")}` : ""}
                  </div>
                </div>
              </div>
              {status && (
                <span className={`status-badge status-${status === "active" ? "active" : "draft"}`}>
                  <span className="status-dot" />
                  {status.toUpperCase()}
                </span>
              )}
            </div>
          )}

          {/* Form Actions */}
          <div
            style={{
              marginTop: "2rem",
              paddingTop: "1.25rem",
              borderTop: "1px solid var(--border)",
              display: "flex",
              justifyContent: "flex-end",
              gap: "0.85rem",
            }}
          >
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => navigate("/discounts")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={Boolean(dateError)}
              style={{
                padding: "0.65rem 1.5rem",
                opacity: dateError ? 0.6 : 1,
                cursor: dateError ? "not-allowed" : "pointer",
              }}
            >
              🚀 Launch Discount
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
