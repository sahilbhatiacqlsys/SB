import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-9025",
    date: "29 Oct, 2026",
    rawDate: "2026-10-29",
    type: "Sale",
    title: "Order #1006 - Wireless Gaming Headset",
    amount: "+₹8,450",
    fee: "-₹169",
    net: "₹8,281",
    status: "completed",
    channel: "UPI / PhonePe",
  },
  {
    id: "TXN-9024",
    date: "28 Oct, 2026",
    rawDate: "2026-10-28",
    type: "Sale",
    title: "Order #1005 - Ultra Slim Keyboard",
    amount: "+₹4,200",
    fee: "-₹84",
    net: "₹4,116",
    status: "completed",
    channel: "Razorpay Gateway",
  },
  {
    id: "TXN-9023",
    date: "28 Oct, 2026",
    rawDate: "2026-10-28",
    type: "Expense",
    title: "Server Infrastructure Cloud Invoice",
    amount: "-₹12,200",
    fee: "₹0.00",
    net: "-₹12,200",
    status: "completed",
    channel: "Net Banking",
  },
  {
    id: "TXN-9022",
    date: "27 Oct, 2026",
    rawDate: "2026-10-27",
    type: "Payout",
    title: "Stripe Automated Bank Settlement",
    amount: "+₹1,45,200",
    fee: "₹0.00",
    net: "₹1,45,200",
    status: "completed",
    channel: "Bank Transfer",
  },
  {
    id: "TXN-9021",
    date: "27 Oct, 2026",
    rawDate: "2026-10-27",
    type: "Sale",
    title: "Order #1002 - Airpods Pro Max",
    amount: "+₹10,600",
    fee: "-₹212",
    net: "₹10,388",
    status: "completed",
    channel: "UPI / PhonePe",
  },
  {
    id: "TXN-9020",
    date: "26 Oct, 2026",
    rawDate: "2026-10-26",
    type: "Refund",
    title: "Order #998 - Partial return",
    amount: "-₹2,499",
    fee: "₹0",
    net: "-₹2,499",
    status: "completed",
    channel: "Credit Card",
  },
  {
    id: "TXN-9019",
    date: "26 Oct, 2026",
    rawDate: "2026-10-26",
    type: "Sale",
    title: "Order #1001 - Nike New Model Shoes",
    amount: "+₹10,600",
    fee: "-₹212",
    net: "₹10,388",
    status: "completed",
    channel: "Razorpay Gateway",
  },
  {
    id: "TXN-9018",
    date: "25 Oct, 2026",
    rawDate: "2026-10-25",
    type: "Expense",
    title: "BlueDart Logistics Shipping Invoice",
    amount: "-₹14,800",
    fee: "-₹296",
    net: "-₹15,096",
    status: "pending",
    channel: "Net Banking",
  },
  {
    id: "TXN-9017",
    date: "24 Oct, 2026",
    rawDate: "2026-10-24",
    type: "Sale",
    title: "Order #995 - Apple Watch Ultra 2",
    amount: "+₹48,000",
    fee: "-₹960",
    net: "₹47,040",
    status: "completed",
    channel: "Credit Card",
  },
  {
    id: "TXN-9016",
    date: "20 Oct, 2026",
    rawDate: "2026-10-20",
    type: "Sale",
    title: "Order #990 - MacBook Air M3",
    amount: "+₹1,14,900",
    fee: "-₹2,298",
    net: "₹1,12,602",
    status: "completed",
    channel: "Net Banking",
  },
  {
    id: "TXN-9015",
    date: "15 Oct, 2026",
    rawDate: "2026-10-15",
    type: "Sale",
    title: "Order #985 - Sony WH-1000XM5",
    amount: "+₹29,990",
    fee: "-₹599",
    net: "₹29,391",
    status: "completed",
    channel: "Credit Card",
  },
  {
    id: "TXN-9014",
    date: "05 Oct, 2026",
    rawDate: "2026-10-05",
    type: "Payout",
    title: "Monthly Gateway Automated Payout",
    amount: "+₹2,84,000",
    fee: "₹0.00",
    net: "₹2,84,000",
    status: "completed",
    channel: "Bank Transfer",
  },
  {
    id: "TXN-9013",
    date: "18 Sep, 2026",
    rawDate: "2026-09-18",
    type: "Sale",
    title: "Order #952 - iPad Air 256GB",
    amount: "+₹64,900",
    fee: "-₹1,298",
    net: "₹63,602",
    status: "completed",
    channel: "Razorpay Gateway",
  },
  {
    id: "TXN-9012",
    date: "12 Aug, 2026",
    rawDate: "2026-08-12",
    type: "Sale",
    title: "Order #910 - Herman Miller Chair",
    amount: "+₹85,000",
    fee: "-₹1,700",
    net: "₹83,300",
    status: "completed",
    channel: "Credit Card",
  },
  {
    id: "TXN-9011",
    date: "25 May, 2026",
    rawDate: "2026-05-25",
    type: "Sale",
    title: "Order #845 - Canon EOS R6 Mark II",
    amount: "+₹2,15,000",
    fee: "-₹4,300",
    net: "₹2,10,700",
    status: "completed",
    channel: "Bank Transfer",
  },
  {
    id: "TXN-9010",
    date: "14 Jan, 2026",
    rawDate: "2026-01-14",
    type: "Sale",
    title: "Order #780 - LG C3 55-inch OLED TV",
    amount: "+₹1,24,990",
    fee: "-₹2,499",
    net: "₹1,22,491",
    status: "completed",
    channel: "Razorpay Gateway",
  },
  {
    id: "TXN-9009",
    date: "20 Nov, 2025",
    rawDate: "2025-11-20",
    type: "Payout",
    title: "Quarterly Consolidated Settlement",
    amount: "+₹4,50,000",
    fee: "₹0.00",
    net: "₹4,50,000",
    status: "completed",
    channel: "Bank Transfer",
  },
  {
    id: "TXN-9008",
    date: "18 Jun, 2025",
    rawDate: "2025-06-18",
    type: "Sale",
    title: "Order #640 - Dell XPS 15 9530",
    amount: "+₹1,89,900",
    fee: "-₹3,798",
    net: "₹1,86,102",
    status: "completed",
    channel: "Credit Card",
  },
  {
    id: "TXN-9007",
    date: "12 Oct, 2024",
    rawDate: "2024-10-12",
    type: "Sale",
    title: "Order #480 - Sony A7 IV Full-frame Camera",
    amount: "+₹2,09,990",
    fee: "-₹4,199",
    net: "₹2,05,791",
    status: "completed",
    channel: "Razorpay Gateway",
  },
  {
    id: "TXN-9006",
    date: "15 Apr, 2024",
    rawDate: "2024-04-15",
    type: "Expense",
    title: "Annual Data Center Hosting & Compliance",
    amount: "-₹45,000",
    fee: "-₹900",
    net: "-₹45,900",
    status: "completed",
    channel: "Net Banking",
  },
];


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

const FINANCES_DATA_BY_PERIOD = {
  today: {
    netRevenue: "₹24,850",
    paidRevenue: "₹18,250",
    codRevenue: "₹6,600",
    refundRatio: "0.45%",
    fees: "₹497",
    withdrawalBalance: "₹16,420",
  },
  "7days": {
    netRevenue: "₹1,84,320",
    paidRevenue: "₹1,32,710",
    codRevenue: "₹51,610",
    refundRatio: "0.62%",
    fees: "₹3,686",
    withdrawalBalance: "₹48,900",
  },
  "14days": {
    netRevenue: "₹3,92,400",
    paidRevenue: "₹2,82,500",
    codRevenue: "₹1,09,900",
    refundRatio: "0.68%",
    fees: "₹7,848",
    withdrawalBalance: "₹62,800",
  },
  "1month": {
    netRevenue: "₹8,45,600",
    paidRevenue: "₹6,08,800",
    codRevenue: "₹2,36,800",
    refundRatio: "0.72%",
    fees: "₹16,912",
    withdrawalBalance: "₹84,550",
  },
  "3months": {
    netRevenue: "₹26,14,800",
    paidRevenue: "₹18,82,600",
    codRevenue: "₹7,32,200",
    refundRatio: "0.85%",
    fees: "₹52,296",
    withdrawalBalance: "₹1,42,000",
  },
  "6months": {
    netRevenue: "₹54,80,000",
    paidRevenue: "₹39,45,600",
    codRevenue: "₹15,34,400",
    refundRatio: "0.91%",
    fees: "₹1,09,600",
    withdrawalBalance: "₹2,18,500",
  },
  "1year": {
    netRevenue: "₹1,12,40,000",
    paidRevenue: "₹80,92,800",
    codRevenue: "₹31,47,200",
    refundRatio: "0.96%",
    fees: "₹2,24,800",
    withdrawalBalance: "₹3,45,000",
  },
  "2years": {
    netRevenue: "₹2,34,50,000",
    paidRevenue: "₹1,68,84,000",
    codRevenue: "₹65,66,000",
    refundRatio: "1.04%",
    fees: "₹4,69,000",
    withdrawalBalance: "₹5,10,000",
  },
  "3years": {
    netRevenue: "₹3,88,90,000",
    paidRevenue: "₹2,80,00,800",
    codRevenue: "₹1,08,89,200",
    refundRatio: "1.12%",
    fees: "₹7,77,800",
    withdrawalBalance: "₹7,25,000",
  },
};

const parseNum = (str) => {
  if (!str) return 0;
  const cleaned = String(str).replace(/[^0-9.-]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

const formatINR = (num) => "₹" + Math.round(num).toLocaleString("en-IN");


export default function FinancesPage() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [typeFilter, setTypeFilter] = useState("all");
  const [search, setSearch] = useState("");
  // Period filter & Custom Range state
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

  // 1. Transactions matching period filter (before search and type filtering)
  const periodTxns = transactions.filter(t => {
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
      if (!isCustomRangeValid) return true; // Show all when range incomplete
      return txnDate >= customStartDate && txnDate <= customEndDate;
    }
    return true;
  });

  // 2. Derive metrics for the active period (Preset or Custom Range)
  const currentFinancesData = (() => {
    if (timeFilter !== "custom" && FINANCES_DATA_BY_PERIOD[timeFilter]) {
      return FINANCES_DATA_BY_PERIOD[timeFilter];
    }

    if (timeFilter === "custom" && isCustomRangeValid) {
      // Calculate from days count and matching period transactions
      const startMs = new Date(customStartDate).getTime();
      const endMs = new Date(customEndDate).getTime();
      const daysCount = Math.max(1, Math.round((endMs - startMs) / (1000 * 60 * 60 * 24)) + 1);

      // Baseline daily averages scaled by date range length + real transactions
      const baseDailyNet = 26500;
      const baseDailyPaid = 19200;
      const baseDailyCod = 7300;
      const baseDailyFee = 530;

      // Sum values from periodTxns
      let txnNetSum = 0;
      let txnPaidSum = 0;
      let txnCodSum = 0;
      let txnFeeSum = 0;
      let txnRefundSum = 0;
      let txnSaleSum = 0;

      periodTxns.forEach(t => {
        const netVal = parseNum(t.net);
        const feeVal = parseNum(t.fee);
        const grossVal = parseNum(t.amount);
        if (t.type === "Sale") {
          txnSaleSum += grossVal;
          if (t.channel && t.channel.toLowerCase().includes("cod")) {
            txnCodSum += grossVal;
          } else {
            txnPaidSum += grossVal;
          }
          txnNetSum += netVal;
          txnFeeSum += feeVal;
        } else if (t.type === "Refund") {
          txnRefundSum += Math.abs(grossVal);
          txnNetSum -= Math.abs(grossVal);
        } else if (t.type === "Expense") {
          txnNetSum -= Math.abs(grossVal);
          txnFeeSum += feeVal;
        }
      });

      const calcNet = (daysCount * baseDailyNet) + txnNetSum;
      const calcPaid = (daysCount * baseDailyPaid) + txnPaidSum;
      const calcCod = (daysCount * baseDailyCod) + txnCodSum;
      const calcFee = (daysCount * baseDailyFee) + txnFeeSum;
      const refundRatioPercent = Math.min(2.5, Math.max(0.35, ((daysCount * 180 + txnRefundSum) / (calcNet || 1)) * 100)).toFixed(2) + "%";
      const calcWithdrawal = Math.round(calcNet * 0.12);

      return {
        netRevenue: formatINR(calcNet),
        paidRevenue: formatINR(calcPaid),
        codRevenue: formatINR(calcCod),
        refundRatio: refundRatioPercent,
        fees: formatINR(calcFee),
        withdrawalBalance: formatINR(calcWithdrawal),
      };
    }

    return FINANCES_DATA_BY_PERIOD["1month"];
  })();

  // 3. Transactions filtered by Period + Type + Search Query
  const filteredTxns = periodTxns.filter(t => {
    // Type filter
    if (typeFilter !== "all" && t.type.toLowerCase() !== typeFilter.toLowerCase()) return false;

    // Search query
    if (search.trim()) {
      const q = search.toLowerCase();
      if (!t.title.toLowerCase().includes(q) && !t.id.toLowerCase().includes(q) && !t.channel.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Finances &amp; Payouts</h1>
          <p className="page-subtitle">Track revenue settlements, gateway transaction fees, refunds, and operating costs</p>
        </div>
        <div className="page-actions" style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <button
            type="button"
            className="btn btn-primary"
            style={{
              background: "linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)",
              border: "1px solid #ef4444",
              boxShadow: "0 4px 14px rgba(220, 38, 38, 0.35)",
              color: "#fff",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              gap: "7px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/finances/khatabook")}
          >
            <span style={{ fontSize: "1.05rem" }}>📖</span> Khatabook
          </button>

          <button
            type="button"
            className="btn btn-outline"
            onClick={() => alert("Exporting Financial Data...")}
          >
            ↗ Export
          </button>
        </div>
      </div>



      {/* Time Range Filter Bar for Finances */}
      <div className="dashboard-filter-card">
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

      {/* 5 Financial Metric Cards without subtext */}
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", marginBottom: "2rem" }}>
        {/* TOTAL NET REVENUE */}
        <div className="stat-card metric-card" style={{ borderLeft: "3px solid #34d399" }}>
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
                  💵
                </span>
              </span>
              <span>TOTAL NET REVENUE</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#34d399", margin: "0.5rem 0 0" }}>
            {currentFinancesData.netRevenue}
          </div>
        </div>

        {/* TOTAL PAID REVENUE */}
        <div className="stat-card metric-card" style={{ borderLeft: "3px solid #38bdf8" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#38bdf8" }}>
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
                  💳
                </span>
              </span>
              <span>TOTAL PAID REVENUE</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#38bdf8", margin: "0.5rem 0 0" }}>
            {currentFinancesData.paidRevenue}
          </div>
        </div>

        {/* TOTAL COD REVENUE */}
        <div className="stat-card metric-card" style={{ borderLeft: "3px solid #a78bfa" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#a78bfa" }}>
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "26px",
                  height: "26px",
                  minWidth: "26px",
                  minHeight: "26px",
                  borderRadius: "6px",
                  background: "rgba(167, 139, 250, 0.15)",
                  border: "1px solid rgba(167, 139, 250, 0.3)",
                  fontSize: "0.85rem",
                  lineHeight: "1",
                  boxSizing: "border-box",
                  padding: 0,
                  margin: 0,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                  📦
                </span>
              </span>
              <span>TOTAL COD REVENUE</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#a78bfa", margin: "0.5rem 0 0" }}>
            {currentFinancesData.codRevenue}
          </div>
        </div>

        {/* REFUND RATIO */}
        <div className="stat-card metric-card" style={{ borderLeft: "3px solid #fbbf24" }}>
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
                  📉
                </span>
              </span>
              <span>REFUND RATIO</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#fbbf24", margin: "0.5rem 0 0" }}>
            {currentFinancesData.refundRatio}
          </div>
        </div>

        {/* GATEWAY FEES */}
        <div className="stat-card metric-card" style={{ borderLeft: "3px solid #f87171" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#f87171" }}>
              <span
                style={{
                  display: "inline-grid",
                  placeItems: "center",
                  width: "26px",
                  height: "26px",
                  minWidth: "26px",
                  minHeight: "26px",
                  borderRadius: "6px",
                  background: "rgba(248, 113, 113, 0.15)",
                  border: "1px solid rgba(248, 113, 113, 0.3)",
                  fontSize: "0.85rem",
                  lineHeight: "1",
                  boxSizing: "border-box",
                  padding: 0,
                  margin: 0,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                  ⚡
                </span>
              </span>
              <span>GATEWAY FEES</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#f87171", margin: "0.5rem 0 0" }}>

            {currentFinancesData.fees}
          </div>
        </div>
      </div>


      {/* Toolbar: Search on Left & Type Filter on Right */}
      <div className="toolbar" style={{ flexWrap: "wrap", gap: "1rem" }}>
        <div className="toolbar-left" style={{ flex: "1 1 300px" }}>
          <div className="toolbar-search" style={{ width: "100%", maxWidth: "380px" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search reference, order, or gateway..."
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

        {/* Right side filter dropdown */}
        <div className="toolbar-right" style={{ background: "transparent", border: "none", display: "flex", alignItems: "center", gap: "8px" }}>
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
            <option value="sale" style={{ background: "#161922", color: "#fff" }}>Sales</option>
            <option value="payout" style={{ background: "#161922", color: "#fff" }}>Payouts</option>
            <option value="refund" style={{ background: "#161922", color: "#fff" }}>Refunds</option>
            <option value="expense" style={{ background: "#161922", color: "#fff" }}>Expenses</option>
          </select>
        </div>
      </div>

      {/* Transactions Table: Data center aligned to match other admin tables */}
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: "center" }}>Txn Reference</th>
              <th style={{ textAlign: "center" }}>Date</th>
              <th style={{ textAlign: "center" }}>Description / Source</th>
              <th style={{ textAlign: "center" }}>Payment Channel</th>
              <th style={{ textAlign: "center" }}>Gross Amount</th>
              <th style={{ textAlign: "center" }}>Gateway Fee</th>
              <th style={{ textAlign: "center" }}>Net Amount</th>
              <th style={{ textAlign: "center" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxns.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>💰</div>
                  <div style={{ fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                    No transactions found
                  </div>
                  <div style={{ fontSize: "0.82rem" }}>
                    {search || typeFilter !== "all"
                      ? "Try clearing your filters or search term to see all financial entries."
                      : "Record your first transaction using the button above."}
                  </div>
                </td>
              </tr>
            ) : (
              filteredTxns.map(t => {
                const isPositive = t.amount.startsWith("+");
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
                      <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.88rem" }}>{t.title}</div>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          color:
                            t.type === "Sale"
                              ? "#34d399"
                              : t.type === "Payout"
                              ? "#38bdf8"
                              : t.type === "Refund"
                              ? "#fbbf24"
                              : "#f87171",
                          textTransform: "uppercase",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                        }}
                      >
                        {t.type}
                      </span>
                    </td>
                    <td style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                      {t.channel}
                    </td>
                    <td
                      style={{
                        textAlign: "center",
                        fontWeight: 700,
                        color: isPositive ? "#34d399" : "#f87171",
                        fontSize: "0.92rem",
                      }}
                    >
                      {t.amount}
                    </td>
                    <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                      {t.fee}
                    </td>
                    <td style={{ textAlign: "center", fontWeight: 700, color: "#fff", fontSize: "0.92rem" }}>
                      {t.net}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        className={`status-badge status-${t.status === "completed" ? "active" : "inactive"}`}
                      >
                        <span className="status-dot" />
                        {t.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}




