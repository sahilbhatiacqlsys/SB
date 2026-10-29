import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TIME_FILTER_OPTIONS = [
  { id: "today", label: "Today" },
  { id: "7days", label: "7 Days" },
  { id: "14days", label: "14 Days" },
  { id: "1month", label: "1 Month" },
  { id: "3months", label: "3 Months" },
  { id: "6months", label: "6 Months" },
  { id: "1year", label: "1 Year" },
  { id: "2years", label: "2 Years" },
  { id: "3years", label: "3 Years" },
  { id: "custom", label: "Custom Range" },
];

const formatDisplayDate = (isoStr) => {
  if (!isoStr) return "";
  const [yyyy, mm, dd] = isoStr.split("-");
  if (!yyyy || !mm || !dd) return "";
  return `${dd}-${mm}-${yyyy}`;
};

const INITIAL_KHATABOOK_TXNS = [
  {
    id: "KB-101",
    date: "29 Oct, 2026",
    rawDate: "2026-10-29",
    type: "got", // "got" = You Got (Green)
    amount: 25000,
    note: "Advance payment for Diwali electronics order",
  },
  {
    id: "KB-102",
    date: "28 Oct, 2026",
    rawDate: "2026-10-28",
    type: "give", // "give" = You Give (Red)
    amount: 8500,
    note: "Warehouse shipping & freight charges invoice",
  },
  {
    id: "KB-103",
    date: "27 Oct, 2026",
    rawDate: "2026-10-27",
    type: "got",
    amount: 14200,
    note: "Wholesale retail accessories batch settlement",
  },
  {
    id: "KB-104",
    date: "26 Oct, 2026",
    rawDate: "2026-10-26",
    type: "give",
    amount: 12000,
    note: "Server hosting & cloud security renewal",
  },
  {
    id: "KB-105",
    date: "25 Oct, 2026",
    rawDate: "2026-10-25",
    type: "got",
    amount: 32000,
    note: "Bulk monitors dispatch receipt",
  },
  {
    id: "KB-106",
    date: "24 Oct, 2026",
    rawDate: "2026-10-24",
    type: "give",
    amount: 4500,
    note: "Corrugated boxes & packing labels supply",
  },
  {
    id: "KB-107",
    date: "20 Oct, 2026",
    rawDate: "2026-10-20",
    type: "got",
    amount: 48500,
    note: "Smartwatches distributor supply clearance",
  },
  {
    id: "KB-108",
    date: "14 Oct, 2026",
    rawDate: "2026-10-14",
    type: "give",
    amount: 18000,
    note: "Monthly warehouse depot lease agreement",
  },
  {
    id: "KB-109",
    date: "02 Oct, 2026",
    rawDate: "2026-10-02",
    type: "give",
    amount: 9800,
    note: "Marketing collateral prints and festival standees",
  },
  {
    id: "KB-110",
    date: "18 Sep, 2026",
    rawDate: "2026-09-18",
    type: "got",
    amount: 65000,
    note: "Bulk Bluetooth earbuds regional supply consignment",
  },
  {
    id: "KB-111",
    date: "10 Aug, 2026",
    rawDate: "2026-08-10",
    type: "give",
    amount: 35000,
    note: "Annual courier fleet retainer advance lock",
  },
  {
    id: "KB-112",
    date: "15 May, 2026",
    rawDate: "2026-05-15",
    type: "give",
    amount: 54000,
    note: "Enterprise ERP software cloud multi-seat renewal",
  },
  {
    id: "KB-113",
    date: "12 Dec, 2025",
    rawDate: "2025-12-12",
    type: "got",
    amount: 110000,
    note: "Year-end corporate gifting bulk merchandise sale",
  },
  {
    id: "KB-114",
    date: "18 Nov, 2024",
    rawDate: "2024-11-18",
    type: "give",
    amount: 85000,
    note: "Raw material import supply batch advance",
  },
];

export default function KhatabookSubpage() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState(INITIAL_KHATABOOK_TXNS);
  const [activeTab, setActiveTab] = useState("all"); // 'all', 'give', 'got'
  const [search, setSearch] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Period filter & Custom Range state (same functionality as Finances and Dashboard)
  const [timeFilter, setTimeFilter] = useState("1month");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [dateRangeError, setDateRangeError] = useState("");

  const getTodayDateStr = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const todayStr = getTodayDateStr();

  const handleCustomStartDateChange = (val) => {
    if (customEndDate && val && val > customEndDate) {
      setDateRangeError("Start Date cannot be selected after End Date");
      setCustomStartDate(val);
      return;
    }
    if (val && val > todayStr) {
      setDateRangeError("Dates cannot be in the future");
      setCustomStartDate(val);
      return;
    }
    setDateRangeError("");
    setCustomStartDate(val);
  };

  const handleCustomEndDateChange = (val) => {
    if (customStartDate && val && val < customStartDate) {
      setDateRangeError("End Date cannot be selected before Start Date");
      setCustomEndDate(val);
      return;
    }
    if (val && val > todayStr) {
      setDateRangeError("Dates cannot be in the future");
      setCustomEndDate(val);
      return;
    }
    setDateRangeError("");
    setCustomEndDate(val);
  };

  const isCustomRangeValid = !dateRangeError && Boolean(customStartDate && customEndDate);

  // Period-matching transactions (controls You Got, You Give, and table synchronously)
  const periodTxns = transactions.filter((t) => {
    const txnDate = t.rawDate || todayStr;
    if (timeFilter === "today") {
      return txnDate === todayStr;
    } else if (timeFilter === "7days") {
      const d7 = new Date();
      d7.setDate(d7.getDate() - 7);
      return txnDate >= d7.toISOString().split("T")[0];
    } else if (timeFilter === "14days") {
      const d14 = new Date();
      d14.setDate(d14.getDate() - 14);
      return txnDate >= d14.toISOString().split("T")[0];
    } else if (timeFilter === "1month") {
      const d30 = new Date();
      d30.setDate(d30.getDate() - 30);
      return txnDate >= d30.toISOString().split("T")[0];
    } else if (timeFilter === "3months") {
      const d90 = new Date();
      d90.setDate(d90.getDate() - 90);
      return txnDate >= d90.toISOString().split("T")[0];
    } else if (timeFilter === "6months") {
      const d180 = new Date();
      d180.setDate(d180.getDate() - 180);
      return txnDate >= d180.toISOString().split("T")[0];
    } else if (timeFilter === "1year") {
      const d365 = new Date();
      d365.setDate(d365.getDate() - 365);
      return txnDate >= d365.toISOString().split("T")[0];
    } else if (timeFilter === "2years") {
      const d730 = new Date();
      d730.setDate(d730.getDate() - 730);
      return txnDate >= d730.toISOString().split("T")[0];
    } else if (timeFilter === "3years") {
      const d1095 = new Date();
      d1095.setDate(d1095.getDate() - 1095);
      return txnDate >= d1095.toISOString().split("T")[0];
    } else if (timeFilter === "custom") {
      if (!isCustomRangeValid) return true; // Show all until valid date range picked
      return txnDate >= customStartDate && txnDate <= customEndDate;
    }
    return true;
  });

  // New Transaction Form State
  const [txnType, setTxnType] = useState("got"); // "got" or "give"
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [errors, setErrors] = useState({});

  // Totals calculations based on active period
  const totalYouGot = periodTxns
    .filter((t) => t.type === "got")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalYouGive = periodTxns
    .filter((t) => t.type === "give")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalYouGot - totalYouGive;

  // Filtered transactions by Search and 3 Bars (All / You Give / You Got) over the selected period
  const filteredTransactions = periodTxns.filter((t) => {
    if (activeTab === "give" && t.type !== "give") return false;
    if (activeTab === "got" && t.type !== "got") return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        t.id.toLowerCase().includes(q) ||
        (t.note && t.note.toLowerCase().includes(q)) ||
        String(t.amount).includes(q) ||
        t.date.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleOpenAddModal = (defaultType = "got") => {
    setTxnType(defaultType);
    setAmount("");
    setNote("");
    setErrors({});
    setShowAddModal(true);
  };

  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    const newErrors = {};

    const numAmount = parseFloat(amount);
    if (!amount || !amount.toString().trim()) {
      newErrors.amount = "Amount is required";
    } else if (isNaN(numAmount) || numAmount <= 0) {
      newErrors.amount = "Please enter a valid positive amount";
    }

    if (!note.trim()) {
      newErrors.note = "Note / Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const today = new Date();
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${String(today.getDate()).padStart(2, "0")} ${months[today.getMonth()]}, ${today.getFullYear()}`;

    const newTxn = {
      id: `KB-${100 + transactions.length + 1}`,
      date: formattedDate,
      rawDate: todayStr,
      type: txnType,
      amount: numAmount,
      note: note.trim(),
    };

    setTransactions([newTxn, ...transactions]);
    setShowAddModal(false);
    setAmount("");
    setNote("");
    setErrors({});

    const label = txnType === "got" ? "You Got" : "You Give";
    setToastMessage(`Transaction recorded successfully (${label}: ₹${numAmount.toLocaleString("en-IN")})!`);
    setTimeout(() => setToastMessage(""), 3500);
  };

  return (
    <div className="page-container" style={{ paddingBottom: "3rem" }}>
      {/* Header with Back Button */}
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
            onClick={() => navigate("/finances")}
            style={{
              padding: "0.5rem 1rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            ← Back to Finances
          </button>
          <div>
            <h1 className="page-title" style={{ margin: 0, display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <span style={{ fontSize: "1.4rem" }}>📖</span>
              <span>Khatabook</span>
            </h1>
            <p className="page-subtitle" style={{ margin: "0.25rem 0 0" }}>
              Digital cashbook ledger — record and track payments given and received
            </p>
          </div>
        </div>

        {/* Right side Add New Transaction Button */}
        <div className="page-actions" style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              border: "1px solid #10b981",
              boxShadow: "0 4px 14px rgba(16, 185, 129, 0.35)",
              color: "#fff",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "7px",
              padding: "0.55rem 1.15rem",
            }}
            onClick={() => handleOpenAddModal("got")}
          >
            <span style={{ fontSize: "1.1rem", lineHeight: 1 }}>+</span> Add New Transaction
          </button>
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => alert("Exporting Khatabook Statement (PDF / Excel)...")}
          >
            ↗ Export
          </button>
        </div>
      </div>

      {/* Time Range Filter Bar for Khatabook (Same as other pages) */}
      <div className="dashboard-filter-card" style={{ marginBottom: "1.75rem" }}>
        <div className="dashboard-filter-header">
          <span className="dashboard-filter-title">
            <span>📅</span> Filter By Period:
          </span>
          {timeFilter === "custom" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              <div className={`custom-date-inputs ${dateRangeError ? "date-input-error" : ""}`}>
                <div className="date-input-group">
                  <label>From:</label>
                  <div className="custom-date-field">
                    <span className={`date-display-text ${!customStartDate ? "placeholder" : ""}`}>
                      {customStartDate ? formatDisplayDate(customStartDate) : "DD-MM-YYYY"}
                    </span>
                    <input
                      type="date"
                      value={customStartDate}
                      max={customEndDate || todayStr}
                      onClick={(e) => {
                        if (typeof e.target.showPicker === "function") {
                          e.target.showPicker();
                        }
                      }}
                      onChange={(e) => handleCustomStartDateChange(e.target.value)}
                    />
                  </div>
                </div>
                <div className="date-input-group">
                  <label>To:</label>
                  <div className="custom-date-field">
                    <span className={`date-display-text ${!customEndDate ? "placeholder" : ""}`}>
                      {customEndDate ? formatDisplayDate(customEndDate) : "DD-MM-YYYY"}
                    </span>
                    <input
                      type="date"
                      value={customEndDate}
                      min={customStartDate || undefined}
                      max={todayStr}
                      onClick={(e) => {
                        if (typeof e.target.showPicker === "function") {
                          e.target.showPicker();
                        }
                      }}
                      onChange={(e) => handleCustomEndDateChange(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {Boolean(dateRangeError) && (
                <div style={{ fontSize: "0.75rem", color: "var(--text-red)", display: "flex", alignItems: "center", gap: "4px" }}>
                  <span>⚠️</span> {dateRangeError}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="dashboard-filter-pills">
          {TIME_FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.id}
              className={`filter-pill-btn ${timeFilter === opt.id ? "active" : ""}`}
              onClick={() => setTimeFilter(opt.id)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Top Containers: YOU GOT and YOU GIVE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.75rem",
        }}
      >
        {/* YOU GOT CONTAINER */}
        <div
          className="stat-card metric-card"
          style={{
            borderLeft: "4px solid #34d399",
            background: "linear-gradient(145deg, rgba(16, 185, 129, 0.08) 0%, rgba(17, 24, 39, 0.95) 100%)",
            borderRadius: "12px",
            padding: "1.35rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="stat-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#34d399", fontWeight: 700, letterSpacing: "0.5px" }}>
                <span
                  style={{
                    display: "inline-grid",
                    placeItems: "center",
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    background: "rgba(52, 211, 153, 0.2)",
                    border: "1px solid rgba(52, 211, 153, 0.4)",
                    fontSize: "0.9rem",
                  }}
                >
                  🟢
                </span>
                <span>YOU GOT</span>
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>
                {transactions.filter((t) => t.type === "got").length} entries
              </span>
            </div>
            <div className="stat-value" style={{ color: "#34d399", margin: "0.75rem 0 0", fontSize: "2rem", fontWeight: 800 }}>
              ₹{totalYouGot.toLocaleString("en-IN")}
            </div>
          </div>
          <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <button
              type="button"
              onClick={() => handleOpenAddModal("got")}
              style={{
                background: "rgba(52, 211, 153, 0.15)",
                border: "1px solid rgba(52, 211, 153, 0.35)",
                color: "#34d399",
                borderRadius: "6px",
                padding: "0.35rem 0.75rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              + Record You Got
            </button>
          </div>
        </div>

        {/* YOU GIVE CONTAINER */}
        <div
          className="stat-card metric-card"
          style={{
            borderLeft: "4px solid #f87171",
            background: "linear-gradient(145deg, rgba(239, 68, 68, 0.08) 0%, rgba(17, 24, 39, 0.95) 100%)",
            borderRadius: "12px",
            padding: "1.35rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="stat-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171", fontWeight: 700, letterSpacing: "0.5px" }}>
                <span
                  style={{
                    display: "inline-grid",
                    placeItems: "center",
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    background: "rgba(248, 113, 113, 0.2)",
                    border: "1px solid rgba(248, 113, 113, 0.4)",
                    fontSize: "0.9rem",
                  }}
                >
                  🔴
                </span>
                <span>YOU GIVE</span>
              </span>
              <span style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>
                {transactions.filter((t) => t.type === "give").length} entries
              </span>
            </div>
            <div className="stat-value" style={{ color: "#f87171", margin: "0.75rem 0 0", fontSize: "2rem", fontWeight: 800 }}>
              ₹{totalYouGive.toLocaleString("en-IN")}
            </div>
          </div>
          <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)" }}>
            <button
              type="button"
              onClick={() => handleOpenAddModal("give")}
              style={{
                background: "rgba(248, 113, 113, 0.15)",
                border: "1px solid rgba(248, 113, 113, 0.35)",
                color: "#f87171",
                borderRadius: "6px",
                padding: "0.35rem 0.75rem",
                fontSize: "0.8rem",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              + Record You Give
            </button>
          </div>
        </div>

        {/* NET BALANCE CONTAINER */}
        <div
          className="stat-card metric-card"
          style={{
            borderLeft: `4px solid ${netBalance >= 0 ? "#38bdf8" : "#fbbf24"}`,
            background: "linear-gradient(145deg, rgba(56, 189, 248, 0.08) 0%, rgba(17, 24, 39, 0.95) 100%)",
            borderRadius: "12px",
            padding: "1.35rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div className="stat-header">
              <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: netBalance >= 0 ? "#38bdf8" : "#fbbf24", fontWeight: 700, letterSpacing: "0.5px" }}>
                <span
                  style={{
                    display: "inline-grid",
                    placeItems: "center",
                    width: "28px",
                    height: "28px",
                    borderRadius: "6px",
                    background: netBalance >= 0 ? "rgba(56, 189, 248, 0.2)" : "rgba(251, 191, 36, 0.2)",
                    border: `1px solid ${netBalance >= 0 ? "rgba(56, 189, 248, 0.4)" : "rgba(251, 191, 36, 0.4)"}`,
                    fontSize: "0.9rem",
                  }}
                >
                  ⚖️
                </span>
                <span>NET BALANCE</span>
              </span>
            </div>
            <div className="stat-value" style={{ color: netBalance >= 0 ? "#38bdf8" : "#fbbf24", margin: "0.75rem 0 0", fontSize: "2rem", fontWeight: 800 }}>
              {netBalance >= 0 ? "+" : "-"}₹{Math.abs(netBalance).toLocaleString("en-IN")}
            </div>
          </div>
          <div style={{ marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid rgba(255, 255, 255, 0.05)", fontSize: "0.82rem", color: "var(--text-muted)" }}>
            {netBalance >= 0 ? "Net receivable balance" : "Net payable balance"}
          </div>
        </div>
      </div>

      {/* Toolbar: Search Bar on Left, Three Bars (All / You Give / You Got) on Right */}
      <div
        className="toolbar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.25rem",
          background: "var(--bg-card)",
          padding: "1rem",
          borderRadius: "12px",
          border: "1px solid var(--border)",
        }}
      >
        {/* Search Bar */}
        <div className="toolbar-left" style={{ flex: "1 1 300px" }}>
          <div className="toolbar-search" style={{ width: "100%", maxWidth: "380px" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search by note, transaction ID, or amount..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#fff",
                fontSize: "0.88rem",
              }}
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

        {/* Three Bars: ALL / YOU GIVE / YOU GOT */}
        <div
          style={{
            display: "inline-flex",
            background: "rgba(255, 255, 255, 0.04)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "4px",
            gap: "4px",
          }}
        >
          {/* BAR 1: ALL */}
          <button
            type="button"
            className={`filter-pill-btn ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "8px",
              fontSize: "0.84rem",
              fontWeight: 700,
              cursor: "pointer",
              border: activeTab === "all" ? "1px solid var(--purple-light)" : "1px solid transparent",
              background: activeTab === "all" ? "var(--purple-dark, #7c3aed)" : "transparent",
              color: activeTab === "all" ? "#fff" : "var(--text-secondary)",
              transition: "all 0.2s ease",
            }}
          >
            All ({transactions.length})
          </button>

          {/* BAR 2: YOU GIVE */}
          <button
            type="button"
            className={`filter-pill-btn ${activeTab === "give" ? "active" : ""}`}
            onClick={() => setActiveTab("give")}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "8px",
              fontSize: "0.84rem",
              fontWeight: 700,
              cursor: "pointer",
              border: activeTab === "give" ? "1px solid #ef4444" : "1px solid transparent",
              background: activeTab === "give" ? "rgba(239, 68, 68, 0.2)" : "transparent",
              color: activeTab === "give" ? "#f87171" : "var(--text-secondary)",
              transition: "all 0.2s ease",
            }}
          >
            🔴 You Give ({transactions.filter((t) => t.type === "give").length})
          </button>

          {/* BAR 3: YOU GOT */}
          <button
            type="button"
            className={`filter-pill-btn ${activeTab === "got" ? "active" : ""}`}
            onClick={() => setActiveTab("got")}
            style={{
              padding: "0.45rem 1rem",
              borderRadius: "8px",
              fontSize: "0.84rem",
              fontWeight: 700,
              cursor: "pointer",
              border: activeTab === "got" ? "1px solid #10b981" : "1px solid transparent",
              background: activeTab === "got" ? "rgba(16, 185, 129, 0.2)" : "transparent",
              color: activeTab === "got" ? "#34d399" : "var(--text-secondary)",
              transition: "all 0.2s ease",
            }}
          >
            🟢 You Got ({transactions.filter((t) => t.type === "got").length})
          </button>
        </div>
      </div>

      {/* Transactions Table Below - Center Aligned & Status Column Removed */}
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center", width: "130px" }}>Entry ID</th>
              <th style={{ textAlign: "center", width: "160px" }}>Date</th>
              <th style={{ textAlign: "center" }}>Note / Description</th>
              <th style={{ textAlign: "center", width: "180px" }}>Type</th>
              <th style={{ textAlign: "center", width: "180px" }}>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📖</div>
                  <div style={{ fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                    No Khatabook transactions found
                  </div>
                  <div style={{ fontSize: "0.82rem" }}>
                    {search || activeTab !== "all"
                      ? "Try clearing search or tab filters."
                      : 'Click "+ Add New Transaction" to record your first entry.'}
                  </div>
                </td>
              </tr>
            ) : (
              filteredTransactions.map((t) => {
                const isGot = t.type === "got";
                return (
                  <tr key={t.id}>
                    <td style={{ textAlign: "center" }}>
                      <code
                        style={{
                          background: "rgba(255, 255, 255, 0.05)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "0.82rem",
                          color: "var(--purple-light)",
                          fontFamily: "monospace",
                          border: "1px solid rgba(139, 92, 246, 0.2)",
                        }}
                      >
                        {t.id}
                      </code>
                    </td>
                    <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      {t.date}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.9rem" }}>
                        {t.note || "-"}
                      </div>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "4px 10px",
                          borderRadius: "6px",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          background: isGot ? "rgba(52, 211, 153, 0.15)" : "rgba(248, 113, 113, 0.15)",
                          color: isGot ? "#34d399" : "#f87171",
                          border: `1px solid ${isGot ? "rgba(52, 211, 153, 0.3)" : "rgba(248, 113, 113, 0.3)"}`,
                        }}
                      >
                        <span>{isGot ? "🟢" : "🔴"}</span>
                        <span>{isGot ? "YOU GOT" : "YOU GIVE"}</span>
                      </span>
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontWeight: 800,
                        color: isGot ? "#34d399" : "#f87171",
                        fontSize: "1rem",
                      }}
                    >
                      {isGot ? "+" : "-"}₹{t.amount.toLocaleString("en-IN")}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Add New Transaction Modal */}
      {showAddModal && (
        <div className="page-modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="page-modal-card" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "480px" }}>
            <form onSubmit={handleSubmitTransaction} noValidate>
              <div className="page-modal-header">
                <div className="page-modal-title" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>📖</span>
                  <span>Add New Transaction</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "var(--text-muted)",
                    fontSize: "1.2rem",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </div>

              <div className="page-modal-body" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
                {/* Two Buttons: GOT and GIVE */}
                <div className="form-field-group">
                  <label style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.5rem", display: "block" }}>
                    Select Transaction Type <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    {/* GOT BUTTON */}
                    <button
                      type="button"
                      onClick={() => setTxnType("got")}
                      style={{
                        padding: "0.85rem",
                        borderRadius: "10px",
                        border: txnType === "got" ? "2px solid #34d399" : "1px solid var(--border)",
                        background: txnType === "got" ? "rgba(52, 211, 153, 0.2)" : "rgba(255, 255, 255, 0.02)",
                        color: txnType === "got" ? "#34d399" : "var(--text-secondary)",
                        fontWeight: 800,
                        fontSize: "0.92rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>🟢</span> You Got
                    </button>

                    {/* GIVE BUTTON */}
                    <button
                      type="button"
                      onClick={() => setTxnType("give")}
                      style={{
                        padding: "0.85rem",
                        borderRadius: "10px",
                        border: txnType === "give" ? "2px solid #f87171" : "1px solid var(--border)",
                        background: txnType === "give" ? "rgba(248, 113, 113, 0.2)" : "rgba(255, 255, 255, 0.02)",
                        color: txnType === "give" ? "#f87171" : "var(--text-secondary)",
                        fontWeight: 800,
                        fontSize: "0.92rem",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "8px",
                        transition: "all 0.2s ease",
                      }}
                    >
                      <span style={{ fontSize: "1.1rem" }}>🔴</span> You Give
                    </button>
                  </div>
                </div>

                {/* Amount Input with Validation below */}
                <div className="form-field-group">
                  <label style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>
                    Amount (₹) <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    min="1"
                    placeholder="Enter amount (e.g. 5000)"
                    value={amount}
                    className={errors.amount ? "input-error" : ""}
                    onChange={(e) => {
                      setAmount(e.target.value);
                      if (errors.amount) setErrors((prev) => ({ ...prev, amount: "" }));
                    }}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: errors.amount ? "1px solid #ef4444" : "1px solid var(--border)",
                      color: "#fff",
                      fontSize: "1rem",
                      fontWeight: 600,
                      outline: "none",
                    }}
                  />
                  <div className="field-error-slot">
                    {errors.amount && <span className="field-error-text">⚠️ {errors.amount}</span>}
                  </div>
                </div>

                {/* Note / Remarks Input with Validation below */}
                <div className="form-field-group">
                  <label style={{ fontSize: "0.84rem", fontWeight: 700, color: "var(--text-secondary)", marginBottom: "0.4rem", display: "block" }}>
                    Note / Description <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. Advance payment for batch #21 delivery"
                    value={note}
                    className={errors.note ? "input-error" : ""}
                    onChange={(e) => {
                      setNote(e.target.value);
                      if (errors.note) setErrors((prev) => ({ ...prev, note: "" }));
                    }}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      borderRadius: "8px",
                      background: "rgba(255, 255, 255, 0.04)",
                      border: errors.note ? "1px solid #ef4444" : "1px solid var(--border)",
                      color: "#fff",
                      fontSize: "0.9rem",
                      outline: "none",
                      resize: "vertical",
                    }}
                  />
                  <div className="field-error-slot">
                    {errors.note && <span className="field-error-text">⚠️ {errors.note}</span>}
                  </div>
                </div>
              </div>

              {/* Modal Footer with Submit Button */}
              <div
                className="page-modal-footer"
                style={{
                  padding: "1rem 1.5rem",
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "0.75rem",
                  borderTop: "1px solid var(--border)",
                }}
              >
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    background: txnType === "got" ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" : "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                    borderColor: txnType === "got" ? "#10b981" : "#ef4444",
                    color: "#fff",
                    fontWeight: 700,
                    padding: "0.55rem 1.4rem",
                  }}
                >
                  Submit Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {Boolean(toastMessage) && (
        <div
          style={{
            position: "fixed",
            bottom: "25px",
            right: "25px",
            background: "rgba(17, 24, 39, 0.95)",
            border: "1px solid #34d399",
            color: "#34d399",
            padding: "0.85rem 1.25rem",
            borderRadius: "10px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            zIndex: 1200,
            fontSize: "0.88rem",
            fontWeight: 600,
          }}
        >
          <span style={{ fontSize: "1.1rem" }}>✅</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
