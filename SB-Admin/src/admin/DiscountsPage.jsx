import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const formatDisplayDate = (isoStr) => {
  if (!isoStr) return "";
  const [yyyy, mm, dd] = isoStr.split("-");
  if (!yyyy || !mm || !dd) return "";
  return `${dd}-${mm}-${yyyy}`;
};

export const INITIAL_DISCOUNTS = [
  {
    id: "DISC-101",
    code: "CYBER25",
    title: "Sitewide Launch Discount",
    type: "percentage",
    value: "25%",
    minPurchase: "₹1,999",
    usageCount: 142,
    usageLimit: 500,
    startDate: "01 Oct, 2026",
    endDate: "31 Dec, 2026",
    status: "active",
    redemptions: [
      {
        orderId: "ORD-9924",
        date: "27 Oct, 2026",
        customerName: "Alex Morgan",
        customerEmail: "alex.m@example.com",
        customerPhone: "+91 98765 43210",
        productName: "Airpods Pro Max 2024",
        productImg: "🎧",
        productPrice: "₹10,600",
        discountSaved: "₹2,650",
        finalAmount: "₹7,950",
      },
      {
        orderId: "ORD-9918",
        date: "26 Oct, 2026",
        customerName: "Sneha Patel",
        customerEmail: "sneha.patel@acme.org",
        customerPhone: "+91 98112 99887",
        productName: "Nike Cyber Carbon Shoes",
        productImg: "👟",
        productPrice: "₹10,600",
        discountSaved: "₹2,650",
        finalAmount: "₹7,950",
      },
      {
        orderId: "ORD-9905",
        date: "24 Oct, 2026",
        customerName: "Rahul Verma",
        customerEmail: "rahul.v@outlook.com",
        customerPhone: "+91 97110 55432",
        productName: "Apple Watch Ultra 2",
        productImg: "⌚",
        productPrice: "₹34,900",
        discountSaved: "₹8,725",
        finalAmount: "₹26,175",
      },
    ],
  },
  {
    id: "DISC-102",
    code: "WELCOME500",
    title: "First Order Welcome Voucher",
    type: "fixed",
    value: "₹500",
    minPurchase: "₹2,500",
    usageCount: 89,
    usageLimit: 1000,
    startDate: "15 Sep, 2026",
    endDate: "Ongoing",
    status: "active",
    redemptions: [
      {
        orderId: "ORD-9920",
        date: "27 Oct, 2026",
        customerName: "Elena Rostova",
        customerEmail: "elena.design@icloud.com",
        customerPhone: "+91 99401 23890",
        productName: "Mechanical Wireless Keyboard",
        productImg: "⌨️",
        productPrice: "₹4,299",
        discountSaved: "₹500",
        finalAmount: "₹3,799",
      },
      {
        orderId: "ORD-9911",
        date: "25 Oct, 2026",
        customerName: "Marcus Chen",
        customerEmail: "mchen@techflow.io",
        customerPhone: "+91 94520 88219",
        productName: "Smart Fitness Band Pro",
        productImg: "📱",
        productPrice: "₹3,499",
        discountSaved: "₹500",
        finalAmount: "₹2,999",
      },
    ],
  },
  {
    id: "DISC-103",
    code: "AUDIOFLASH",
    title: "Electric Audio Accessories Flash Deal",
    type: "percentage",
    value: "15%",
    minPurchase: "₹4,999",
    usageCount: 312,
    usageLimit: 300,
    startDate: "20 Oct, 2026",
    endDate: "26 Oct, 2026",
    status: "expired",
    redemptions: [
      {
        orderId: "ORD-9889",
        date: "25 Oct, 2026",
        customerName: "Pooja Sharma",
        customerEmail: "pooja.sharma99@yahoo.com",
        customerPhone: "+91 91234 56789",
        productName: "Noise Cancelling Earbuds",
        productImg: "🎵",
        productPrice: "₹6,499",
        discountSaved: "₹974",
        finalAmount: "₹5,525",
      },
    ],
  },
  {
    id: "DISC-104",
    code: "FREESHIP",
    title: "Free Express Shipping Nationwide",
    type: "shipping",
    value: "Free Ship",
    minPurchase: "₹999",
    usageCount: 420,
    usageLimit: 2000,
    startDate: "01 Jan, 2026",
    endDate: "31 Dec, 2026",
    status: "active",
    redemptions: [
      {
        orderId: "ORD-9923",
        date: "27 Oct, 2026",
        customerName: "Rohan Khanna",
        customerEmail: "rohan.khanna@gmail.com",
        customerPhone: "+91 98450 12345",
        productName: "Fast GaN Charger 65W",
        productImg: "🔌",
        productPrice: "₹1,899",
        discountSaved: "₹150",
        finalAmount: "₹1,899",
      },
    ],
  },
  {
    id: "DISC-105",
    code: "VIPDIWALI",
    title: "Exclusive Festive VIP Tier Privilege",
    type: "percentage",
    value: "30%",
    minPurchase: "₹10,000",
    usageCount: 0,
    usageLimit: 100,
    startDate: "01 Nov, 2026",
    endDate: "15 Nov, 2026",
    status: "scheduled",
    redemptions: [],
  },
];

export default function DiscountsPage() {
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState(INITIAL_DISCOUNTS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [copiedCode, setCopiedCode] = useState(null);
  const [selectedCouponUsage, setSelectedCouponUsage] = useState(null);

  const [dateError, setDateError] = useState("");
  const [formError, setFormError] = useState("");
  const [modalErrors, setModalErrors] = useState({});

  const [formData, setFormData] = useState({
    code: "",
    title: "",
    type: "", // nothing selected by default
    value: "",
    minPurchase: "",
    usageLimit: "",
    startDate: "",
    endDate: "",
    status: "", // nothing selected by default
  });

  const totalCouponsCount = discounts.length;
  const activeCouponsCount = discounts.filter((d) => d.status === "active").length;
  const inactiveCouponsCount = discounts.filter(
    (d) => d.status === "expired" || d.status === "scheduled" || d.status === "inactive"
  ).length;

  const filteredDiscounts = discounts.filter((d) => {
    if (statusFilter !== "all") {
      if (statusFilter === "inactive") {
        if (d.status !== "expired" && d.status !== "scheduled" && d.status !== "inactive") return false;
      } else if (d.status !== statusFilter) {
        return false;
      }
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!d.code.toLowerCase().includes(q) && !d.title.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleOpenModal = () => {
    setFormData({
      code: "",
      title: "",
      type: "",
      value: "",
      minPurchase: "",
      usageLimit: "",
      startDate: "",
      endDate: "",
      status: "",
    });
    setFormError("");
    setDateError("");
    setShowAddModal(true);
  };

  const handleStartDateChange = (val) => {
    setFormData((prev) => ({ ...prev, startDate: val }));
    setFormError("");
    if (formData.endDate && val && val > formData.endDate) {
      setDateError("Start Date cannot be after Expiry Date");
    } else {
      setDateError("");
    }
  };

  const handleEndDateChange = (val) => {
    setFormData((prev) => ({ ...prev, endDate: val }));
    setFormError("");
    if (formData.startDate && val && val < formData.startDate) {
      setDateError("Expiry Date cannot be before Start Date");
    } else {
      setDateError("");
    }
  };

  const handleCreateDiscount = (e) => {
    e.preventDefault();
    setFormError("");
    setDateError("");
    setModalErrors({});

    const errs = {};
    if (!formData.code.trim()) {
      errs.code = "Coupon Code is required";
    }
    if (!formData.type) {
      errs.type = "Please select a Discount Type";
    }
    if (!formData.title.trim()) {
      errs.title = "Campaign Title is required";
    }
    if (formData.type !== "shipping" && !formData.value.trim()) {
      errs.value = formData.type === "percentage" ? "Discount Percentage is required" : "Discount Amount is required";
    }
    if (!formData.status) {
      errs.status = "Please select a Campaign Status";
    }
    if (!formData.startDate) {
      errs.startDate = "Start Date is required";
    }
    if (!formData.endDate) {
      errs.endDate = "Expiration Date is required";
    }
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      errs.startDate = "Start Date cannot be after Expiry Date";
      errs.endDate = "Expiry Date cannot be before Start Date";
    }

    if (Object.keys(errs).length > 0) {
      setModalErrors(errs);
      return;
    }

    const formattedValue =
      formData.type === "percentage"
        ? `${formData.value.replace(/[^0-9.]/g, "")}%`
        : formData.type === "fixed"
        ? `₹${formData.value.replace(/[^0-9.]/g, "")}`
        : "Free Ship";

    const formattedMinPurchase = formData.minPurchase.trim()
      ? formData.minPurchase.startsWith("₹")
        ? formData.minPurchase.trim()
        : `₹${formData.minPurchase.trim()}`
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
      id: `DISC-${100 + discounts.length + 1}`,
      code: formData.code.trim().toUpperCase(),
      title: formData.title.trim(),
      type: formData.type,
      value: formattedValue,
      minPurchase: formattedMinPurchase,
      usageCount: 0,
      usageLimit: parseInt(formData.usageLimit, 10) || 500,
      startDate: formatDisplayDate(formData.startDate, "Today"),
      endDate: formatDisplayDate(formData.endDate, "Ongoing"),
      status: formData.status,
    };

    setDiscounts([newDiscount, ...discounts]);
    setShowAddModal(false);
  };

  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (discount) => {
    setItemToDelete(discount);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setDiscounts(discounts.filter((d) => d.id !== itemToDelete.id));
      setItemToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setItemToDelete(null);
  };

  const handleToggleStatus = (id) => {
    setDiscounts(
      discounts.map((d) => {
        if (d.id !== id) return d;
        return {
          ...d,
          status: d.status === "active" ? "expired" : "active",
        };
      })
    );
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Discounts & Promotions</h1>
          <p className="page-subtitle">Configure promo coupon codes, tiered cart thresholds, and automated discounts</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-primary" onClick={() => navigate("/discounts/new")}>
            <span>🏷️</span> Create Discount
          </button>
        </div>
      </div>

      {/* 3 Metric Cards: Matching other pages with container icon */}
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {/* Total Coupons */}
        <div className="stat-card" style={{ borderLeft: "3px solid #38bdf8" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "26px",
                  height: "26px",
                  minWidth: "26px",
                  minHeight: "26px",
                  borderRadius: "6px",
                  background: "rgba(56, 189, 248, 0.15)",
                  border: "1px solid rgba(56, 189, 248, 0.3)",
                  fontSize: "0.85rem",
                  lineHeight: "1",
                  boxSizing: "border-box",
                  padding: 0,
                  margin: 0,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                  🏷️
                </span>
              </span>
              <span>TOTAL COUPONS</span>
            </span>
          </div>
          <div className="stat-value" style={{ margin: "0.5rem 0 0" }}>
            {totalCouponsCount}
          </div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>
            All discount codes
          </div>
        </div>

        {/* Active Coupon */}
        <div className="stat-card" style={{ borderLeft: "3px solid #34d399" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34d399" }}>
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "26px",
                  height: "26px",
                  minWidth: "26px",
                  minHeight: "26px",
                  borderRadius: "6px",
                  background: "rgba(52, 211, 153, 0.15)",
                  border: "1px solid rgba(52, 211, 153, 0.3)",
                  fontSize: "0.85rem",
                  lineHeight: "1",
                  boxSizing: "border-box",
                  padding: 0,
                  margin: 0,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                  🟢
                </span>
              </span>
              <span>ACTIVE COUPON</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#34d399", margin: "0.5rem 0 0" }}>
            {activeCouponsCount}
          </div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>
            Currently live &amp; redeemable
          </div>
        </div>

        {/* Inactive Coupon */}
        <div className="stat-card" style={{ borderLeft: "3px solid #fbbf24" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#fbbf24" }}>
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "26px",
                  height: "26px",
                  minWidth: "26px",
                  minHeight: "26px",
                  borderRadius: "6px",
                  background: "rgba(251, 191, 36, 0.15)",
                  border: "1px solid rgba(251, 191, 36, 0.3)",
                  fontSize: "0.85rem",
                  lineHeight: "1",
                  boxSizing: "border-box",
                  padding: 0,
                  margin: 0,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                  🟡
                </span>
              </span>
              <span>INACTIVE COUPON</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#fbbf24", margin: "0.5rem 0 0" }}>
            {inactiveCouponsCount}
          </div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>
            Scheduled or expired vouchers
          </div>
        </div>
      </div>

      {/* Toolbar: Search on left, (All / Active / Schedule / Expired) dropdown on right */}
      <div className="toolbar" style={{ flexWrap: "wrap", gap: "1rem", marginTop: "1.25rem" }}>
        <div className="toolbar-left" style={{ flex: "1 1 300px" }}>
          <div className="toolbar-search" style={{ width: "100%", maxWidth: "380px" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search coupon code or campaign..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                style={{
                  background: "none",
                  border: "none",
                  color: "var(--text-muted)",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right side status filter dropdown (All / Active / Schedule / Expire) */}
        <div
          className="toolbar-right"
          style={{
            background: "transparent",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
            Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              background: "#151928",
              color: statusFilter !== "all" ? "var(--purple-light)" : "var(--text-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-md)",
              padding: "0.45rem 2.2rem 0.45rem 0.85rem",
              fontSize: "0.84rem",
              cursor: "pointer",
              outline: "none",
              fontWeight: statusFilter !== "all" ? 600 : 500,
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
              backgroundImage:
                "url(\"data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a78bfa' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "0.9rem",
            }}
          >
            <option value="all" style={{ background: "#111422", color: "#fff" }}>All</option>
            <option value="active" style={{ background: "#111422", color: "#fff" }}>Active</option>
            <option value="scheduled" style={{ background: "#111422", color: "#fff" }}>Schedule</option>
            <option value="expired" style={{ background: "#111422", color: "#fff" }}>Expire</option>
          </select>
        </div>
      </div>

      {/* Discounts Table: Data center aligned */}
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Discount Code</th>
              <th style={{ textAlign: "center" }}>Campaign Name</th>
              <th style={{ textAlign: "center" }}>Discount Value</th>
              <th style={{ textAlign: "center" }}>Minimum Cart Value</th>
              <th style={{ textAlign: "center" }}>Redemptions / Limit</th>
              <th style={{ textAlign: "center" }}>Validity Window</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDiscounts.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🏷️</div>
                  <div style={{ fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                    No discount codes found
                  </div>
                  <div style={{ fontSize: "0.82rem" }}>
                    {search || statusFilter !== "all"
                      ? "Try clearing your search query or status filter."
                      : "Create your first discount code to get started."}
                  </div>
                </td>
              </tr>
            ) : (
              filteredDiscounts.map((d) => {
                const usagePercent = Math.min(100, Math.round((d.usageCount / d.usageLimit) * 100));
                return (
                  <tr key={d.id}>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ display: "inline-flex", alignItems: "center", gap: "0.45rem", justifyContent: "center" }}>
                        <span className="coupon-badge">{d.code}</span>
                        <button
                          title="Copy coupon code"
                          onClick={() => handleCopyCode(d.code)}
                          style={{
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            color: copiedCode === d.code ? "var(--green)" : "var(--text-muted)",
                            fontSize: "0.85rem",
                            padding: "2px",
                          }}
                        >
                          {copiedCode === d.code ? "✓ Copied" : "📋"}
                        </button>
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.92rem" }}>{d.title}</div>
                      <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", textTransform: "capitalize" }}>
                        Type: {d.type}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span style={{ fontWeight: 800, color: "var(--purple-light)", fontSize: "1rem" }}>
                        {d.value}
                      </span>
                    </td>
                    <td style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      {d.minPurchase}
                    </td>
                    <td style={{ textAlign: "center", minWidth: "135px" }}>
                      <button
                        type="button"
                        onClick={() => navigate(`/discounts/${d.id}`)}
                        title="View customers and products redeemed with this coupon"
                        style={{
                          background: "rgba(139, 92, 246, 0.12)",
                          border: "1px solid rgba(139, 92, 246, 0.35)",
                          borderRadius: "8px",
                          padding: "4px 8px",
                          cursor: "pointer",
                          display: "inline-flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "3px",
                          width: "100%",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "#c084fc";
                          e.currentTarget.style.background = "rgba(139, 92, 246, 0.22)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "rgba(139, 92, 246, 0.35)";
                          e.currentTarget.style.background = "rgba(139, 92, 246, 0.12)";
                        }}
                      >
                        <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: "4px" }}>
                          <span>👥</span>
                          <span>{d.usageCount} / {d.usageLimit}</span>
                        </div>
                        <div
                          style={{
                            width: "80px",
                            height: "4px",
                            background: "rgba(255,255,255,0.08)",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${usagePercent}%`,
                              height: "100%",
                              background: "var(--purple)",
                              borderRadius: "4px",
                            }}
                          />
                        </div>
                        <span style={{ fontSize: "0.68rem", color: "#c084fc", fontWeight: 600 }}>
                          👁️ View Users ({d.redemptions ? d.redemptions.length : d.usageCount})
                        </span>
                      </button>
                    </td>
                    <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.82rem" }}>
                      {d.startDate} → {d.endDate}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        className={`status-badge status-${
                          d.status === "active" ? "active" : d.status === "scheduled" ? "inactive" : "outstock"
                        }`}
                        style={{ margin: "0 auto" }}
                      >
                        <span className="status-dot" />
                        {d.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ display: "inline-flex", gap: "0.4rem", justifyContent: "center" }}>
                        <button
                          className="row-action-btn"
                          title={d.status === "active" ? "Pause promotion" : "Activate promotion"}
                          onClick={() => handleToggleStatus(d.id)}
                        >
                          {d.status === "active" ? "⏸️" : "▶️"}
                        </button>
                        <button
                          className="row-action-btn delete"
                          title="Delete promotion"
                          onClick={() => handleDeleteClick(d)}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Create Promotional Discount Modal with Interactive Calendars & Bidirectional Validation */}
      {showAddModal && (
        <div className="page-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div
            className="page-modal-card"
            style={{ maxWidth: "680px" }}
            onClick={(e) => e.stopPropagation()}
          >
            <form onSubmit={handleCreateDiscount}>
              {/* Modal Header */}
              <div className="page-modal-header">
                <div className="page-modal-title">
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: "rgba(139, 92, 246, 0.15)",
                      border: "1px solid rgba(139, 92, 246, 0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.1rem",
                    }}
                  >
                    🏷️
                  </div>
                  <div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
                      Create Promotional Discount
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 400 }}>
                      Set up coupon codes, value reductions, and cart redemption limits
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    fontSize: "1.3rem",
                    cursor: "pointer",
                    padding: "0.2rem",
                    lineHeight: 1,
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Modal Body */}
              <div className="page-modal-body">
                {formError && (
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      background: "rgba(239, 68, 68, 0.15)",
                      border: "1px solid rgba(239, 68, 68, 0.35)",
                      borderRadius: "8px",
                      color: "#fca5a5",
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <span>⚠️</span> {formError}
                  </div>
                )}

                {/* Coupon Code & Discount Type */}
                <div className="form-row-2">
                  <div className="form-field-group">
                    <label>Coupon Code <span style={{ color: "#ef4444" }}>*</span></label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        required
                        placeholder="e.g. FESTIVE20"
                        value={formData.code}
                        onChange={(e) => {
                          setFormData({ ...formData, code: e.target.value.toUpperCase() });
                          setFormError("");
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
                  </div>

                  <div className="form-field-group">
                    <label>Discount Type <span style={{ color: "#ef4444" }}>*</span></label>
                    <select
                      value={formData.type}
                      onChange={(e) => {
                        setFormData({ ...formData, type: e.target.value });
                        setFormError("");
                      }}
                      required
                    >
                      <option value="" disabled>-- Select Discount Type --</option>
                      <option value="percentage">Percentage Off (%)</option>
                      <option value="fixed">Fixed Cash Amount (₹)</option>
                      <option value="shipping">Free Express Shipping</option>
                    </select>
                  </div>
                </div>

                {/* Campaign Title */}
                <div className="form-field-group">
                  <label>Campaign Title / Public Description <span style={{ color: "#ef4444" }}>*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Diwali Weekend Mega Flash Offer"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                      setFormError("");
                    }}
                  />
                </div>

                {/* Discount Value & Min Cart Requirement */}
                <div className="form-row-2">
                  <div className="form-field-group">
                    <label>
                      {formData.type === "percentage" ? (
                        <>Discount Percentage (%) <span style={{ color: "#ef4444" }}>*</span></>
                      ) : formData.type === "fixed" ? (
                        <>Discount Amount (₹) <span style={{ color: "#ef4444" }}>*</span></>
                      ) : formData.type === "shipping" ? (
                        "Shipping Waiver"
                      ) : (
                        <>Discount Amount / Value <span style={{ color: "#ef4444" }}>*</span></>
                      )}
                    </label>
                    <input
                      type="text"
                      required={formData.type !== "shipping"}
                      disabled={formData.type === "shipping" || !formData.type}
                      placeholder={
                        !formData.type
                          ? "Select discount type first"
                          : formData.type === "percentage"
                          ? "e.g. 25"
                          : formData.type === "fixed"
                          ? "e.g. 500"
                          : "Free Ship"
                      }
                      value={formData.type === "shipping" ? "Free Ship" : formData.value}
                      onChange={(e) => {
                        setFormData({ ...formData, value: e.target.value });
                        setFormError("");
                      }}
                    />
                  </div>

                  <div className="form-field-group">
                    <label>Min. Cart Requirement (₹)</label>
                    <input
                      type="text"
                      placeholder="e.g. 1499 or ₹1,499"
                      value={formData.minPurchase}
                      onChange={(e) => setFormData({ ...formData, minPurchase: e.target.value })}
                    />
                  </div>
                </div>

                {/* Usage Limit & Status */}
                <div className="form-row-2">
                  <div className="form-field-group">
                    <label>Total Redemption Limit</label>
                    <input
                      type="number"
                      placeholder="e.g. 500"
                      value={formData.usageLimit}
                      onChange={(e) => setFormData({ ...formData, usageLimit: e.target.value })}
                    />
                  </div>

                  <div className="form-field-group">
                    <label>Campaign Status <span style={{ color: "#ef4444" }}>*</span></label>
                    <select
                      value={formData.status}
                      className={modalErrors.status ? "input-error" : ""}
                      onChange={(e) => {
                        setFormData({ ...formData, status: e.target.value });
                        if (modalErrors.status) setModalErrors(prev => ({ ...prev, status: "" }));
                      }}
                    >
                      <option value="" disabled>-- Select Campaign Status --</option>
                      <option value="active">Active (Redeemable Now)</option>
                      <option value="scheduled">Schedule (Upcoming)</option>
                      <option value="expired">Expire (Inactive)</option>
                    </select>
                    <div className="field-error-slot">
                      {modalErrors.status && <span className="field-error-text">⚠️ {modalErrors.status}</span>}
                    </div>
                  </div>
                </div>

                {/* Start Date & Expiration Date with Interactive Calendars and Bidirectional Validation */}
                <div className="form-row-2">
                  <div className="form-field-group">
                    <label>Start Date <span style={{ color: "#ef4444" }}>*</span></label>
                    <div className="custom-form-date-field">
                      <span className={`date-field-display-text ${!formData.startDate ? "placeholder" : ""}`}>
                        {formData.startDate ? formatDisplayDate(formData.startDate) : "dd-mm-yyyy"}
                      </span>
                      <input
                        type="date"
                        max={formData.endDate || undefined}
                        value={formData.startDate}
                        className={modalErrors.startDate ? "input-error" : ""}
                        onClick={(e) => {
                          if (typeof e.target.showPicker === "function") {
                            e.target.showPicker();
                          }
                        }}
                        onChange={(e) => {
                          handleStartDateChange(e.target.value);
                          if (modalErrors.startDate) setModalErrors(prev => ({ ...prev, startDate: "" }));
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      {formData.endDate ? `Cannot be selected after ${formatDisplayDate(formData.endDate)}` : "Campaign launch date"}
                    </span>
                    <div className="field-error-slot">
                      {modalErrors.startDate && <span className="field-error-text">⚠️ {modalErrors.startDate}</span>}
                    </div>
                  </div>

                  <div className="form-field-group">
                    <label>Expiration Date / Validity <span style={{ color: "#ef4444" }}>*</span></label>
                    <div className="custom-form-date-field">
                      <span className={`date-field-display-text ${!formData.endDate ? "placeholder" : ""}`}>
                        {formData.endDate ? formatDisplayDate(formData.endDate) : "dd-mm-yyyy"}
                      </span>
                      <input
                        type="date"
                        min={formData.startDate || undefined}
                        value={formData.endDate}
                        className={modalErrors.endDate ? "input-error" : ""}
                        onClick={(e) => {
                          if (typeof e.target.showPicker === "function") {
                            e.target.showPicker();
                          }
                        }}
                        onChange={(e) => {
                          handleEndDateChange(e.target.value);
                          if (modalErrors.endDate) setModalErrors(prev => ({ ...prev, endDate: "" }));
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", marginTop: "2px" }}>
                      {formData.startDate ? `Cannot be selected before ${formatDisplayDate(formData.startDate)}` : "Must be on or after start date"}
                    </span>
                    <div className="field-error-slot">
                      {modalErrors.endDate && <span className="field-error-text">⚠️ {modalErrors.endDate}</span>}
                    </div>
                  </div>
                </div>

                {/* Live Coupon Preview Card */}
                {(formData.code || formData.title || formData.type) && (
                  <div
                    style={{
                      background: "rgba(139, 92, 246, 0.08)",
                      border: "1px dashed rgba(139, 92, 246, 0.35)",
                      borderRadius: "10px",
                      padding: "0.85rem 1.15rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <span style={{ fontSize: "1.4rem" }}>⚡</span>
                      <div>
                        <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#fff" }}>
                          {formData.title || "Your Campaign Title"}
                        </div>
                        <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                          Code:{" "}
                          <strong style={{ color: "var(--purple-light)" }}>
                            {formData.code || "ENTER_CODE"}
                          </strong>{" "}
                          • Value:{" "}
                          {formData.type === "percentage"
                            ? `${formData.value || "0"}% OFF`
                            : formData.type === "fixed"
                            ? `₹${formData.value || "0"} OFF`
                            : formData.type === "shipping"
                            ? "Free Shipping"
                            : "Unset"}
                        </div>
                      </div>
                    </div>
                    {formData.status && (
                      <span className={`status-badge status-${formData.status === "active" ? "active" : "draft"}`}>
                        <span className="status-dot" />
                        {formData.status.toUpperCase()}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="page-modal-footer">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  🚀 Launch Discount
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Warning Popup Modal */}
      {itemToDelete && (
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
              Delete Promotion?
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              Are you sure you want to permanently delete discount code{" "}
              <strong style={{ color: "#ef4444", background: "rgba(239, 68, 68, 0.12)", padding: "2px 8px", borderRadius: "4px" }}>
                {itemToDelete.code}
              </strong>
              ? Customers will no longer be able to use this promotional voucher at checkout.
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

      {/* Coupon Redemptions Modal with User & Product Details */}
      {selectedCouponUsage && (
        <div
          className="page-modal-backdrop"
          onClick={() => setSelectedCouponUsage(null)}
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
            padding: "1.25rem",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <div
            className="card"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#111422",
              border: "1px solid rgba(139, 92, 246, 0.35)",
              borderRadius: "16px",
              padding: "1.75rem",
              maxWidth: "760px",
              width: "100%",
              maxHeight: "88vh",
              overflowY: "auto",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(139, 92, 246, 0.15)",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                paddingBottom: "1rem",
                marginBottom: "1.25rem",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span style={{ fontSize: "1.3rem" }}>🏷️</span>
                  <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>
                    Coupon Usage &amp; Redemptions
                  </h2>
                  <span
                    style={{
                      background: "rgba(139, 92, 246, 0.2)",
                      border: "1px solid rgba(139, 92, 246, 0.4)",
                      color: "#c084fc",
                      padding: "2px 8px",
                      borderRadius: "6px",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      letterSpacing: "0.5px",
                    }}
                  >
                    {selectedCouponUsage.code}
                  </span>
                </div>
                <p style={{ margin: "0.35rem 0 0", color: "var(--text-muted)", fontSize: "0.84rem" }}>
                  {selectedCouponUsage.title} • Discount Value: <strong style={{ color: "#34d399" }}>{selectedCouponUsage.value}</strong> • Total Redemptions: <strong style={{ color: "#fff" }}>{selectedCouponUsage.usageCount}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCouponUsage(null)}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                  border: "none",
                  color: "var(--text-muted)",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ✕
              </button>
            </div>

            {/* Redemptions Table */}
            {(!selectedCouponUsage.redemptions || selectedCouponUsage.redemptions.length === 0) ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "3rem 1rem",
                  background: "rgba(255, 255, 255, 0.02)",
                  borderRadius: "10px",
                  border: "1px dashed rgba(255, 255, 255, 0.1)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📭</div>
                <div style={{ fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>
                  No customer redemptions recorded yet
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  Customers who apply this voucher code during checkout will appear here with purchased product details.
                </div>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table className="data-table" style={{ width: "100%", fontSize: "0.86rem" }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center" }}>Order &amp; Date</th>
                      <th style={{ textAlign: "left", paddingLeft: "1rem" }}>Customer Details</th>
                      <th style={{ textAlign: "left" }}>Product Purchased</th>
                      <th style={{ textAlign: "center" }}>Original</th>
                      <th style={{ textAlign: "center" }}>Discount Saved</th>
                      <th style={{ textAlign: "center" }}>Paid Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedCouponUsage.redemptions.map((r, idx) => (
                      <tr key={idx}>
                        <td style={{ textAlign: "center" }}>
                          <span
                            style={{
                              fontWeight: 700,
                              color: "var(--purple-light)",
                              background: "rgba(139, 92, 246, 0.12)",
                              padding: "2px 6px",
                              borderRadius: "4px",
                              fontSize: "0.78rem",
                            }}
                          >
                            {r.orderId}
                          </span>
                          <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", marginTop: "3px" }}>
                            {r.date}
                          </div>
                        </td>
                        <td style={{ textAlign: "left", paddingLeft: "1rem" }}>
                          <div style={{ fontWeight: 600, color: "#fff" }}>{r.customerName}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{r.customerEmail}</div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)" }}>{r.customerPhone}</div>
                        </td>
                        <td style={{ textAlign: "left" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <span style={{ fontSize: "1.2rem" }}>{r.productImg || "📦"}</span>
                            <div>
                              <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.85rem" }}>
                                {r.productName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ textAlign: "center", color: "var(--text-muted)", textDecoration: "line-through", fontSize: "0.82rem" }}>
                          {r.productPrice}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          <span
                            style={{
                              color: "#34d399",
                              fontWeight: 700,
                              background: "rgba(52, 211, 153, 0.12)",
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontSize: "0.82rem",
                            }}
                          >
                            -{r.discountSaved}
                          </span>
                        </td>
                        <td style={{ textAlign: "center", fontWeight: 700, color: "#fff" }}>
                          {r.finalAmount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Modal Footer */}
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1.5rem" }}>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setSelectedCouponUsage(null)}
                style={{ padding: "0.55rem 1.4rem", borderRadius: "8px", fontWeight: 600 }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
