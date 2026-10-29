import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock customer data
export const INITIAL_CUSTOMERS = [
  {
    id: "CUST-1001",
    name: "Alex Morgan",
    email: "alex.m@example.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80",
    ordersCount: 14,
    totalSpent: "₹1,42,850",
    status: "active",
    joinedDate: "12 Jan, 2024",
    lastOrder: "Yesterday",
    city: "Mumbai, MH",
  },
  {
    id: "CUST-1002",
    name: "Sophia Patel",
    email: "sophia.patel@gmail.com",
    phone: "+91 98220 11994",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
    ordersCount: 8,
    totalSpent: "₹68,400",
    status: "active",
    joinedDate: "04 Feb, 2024",
    lastOrder: "3 days ago",
    city: "Bengaluru, KA",
  },
  {
    id: "CUST-1003",
    name: "Rahul Verma",
    email: "rahul.v@outlook.com",
    phone: "+91 97110 55432",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&auto=format&fit=crop&q=80",
    ordersCount: 22,
    totalSpent: "₹2,84,300",
    status: "active",
    joinedDate: "18 Nov, 2023",
    lastOrder: "Today",
    city: "Delhi, DL",
  },
  {
    id: "CUST-1004",
    name: "Elena Rostova",
    email: "elena.design@icloud.com",
    phone: "+91 99401 23890",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
    ordersCount: 3,
    totalSpent: "₹22,100",
    status: "inactive",
    joinedDate: "15 Aug, 2024",
    lastOrder: "2 months ago",
    city: "Goa, GA",
  },
  {
    id: "CUST-1005",
    name: "Marcus Chen",
    email: "mchen@techflow.io",
    phone: "+91 94520 88219",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
    ordersCount: 19,
    totalSpent: "₹1,95,600",
    status: "active",
    joinedDate: "02 Mar, 2024",
    lastOrder: "5 days ago",
    city: "Hyderabad, TS",
  },
  {
    id: "CUST-1006",
    name: "Pooja Sharma",
    email: "pooja.sharma99@yahoo.com",
    phone: "+91 91234 56789",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80",
    ordersCount: 1,
    totalSpent: "₹8,499",
    status: "archived",
    joinedDate: "26 Oct, 2026",
    lastOrder: "Oct 26, 2026",
    city: "Pune, MH",
  },
];

export default function CustomersPage({ customers = INITIAL_CUSTOMERS }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'active' | 'inactive' | 'archived'

  // Dynamic counts for stat cards
  const totalCustomersCount = customers.length;
  const activeCustomersCount = customers.filter(c => c.status === "active").length;
  const inactiveCustomersCount = customers.filter(c => c.status === "inactive" || c.status === "archived").length;

  // Filter logic: search + status (All / Active / Inactive / Archived)
  const filteredCustomers = customers.filter(c => {
    if (statusFilter !== "all" && c.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchEmail = c.email.toLowerCase().includes(q);
      const matchPhone = c.phone.toLowerCase().includes(q);
      const matchCity = c.city.toLowerCase().includes(q);
      const matchId = c.id.toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchPhone && !matchCity && !matchId) return false;
    }
    return true;
  });

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-left">
          <h1 className="page-title">Customers</h1>
          <p className="page-subtitle">Manage customer profiles, contact info, and purchase histories</p>
        </div>
        <div className="page-actions">
          <button className="btn btn-outline" onClick={() => alert("Exporting customer dataset (CSV)...")}>
            📥 Export CSV
          </button>
        </div>
      </div>

      {/* 3 Metric Stat Cards: Identical icon box styling as other pages, without vs and % */}
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {/* TOTAL CUSTOMERS */}
        <div className="stat-card" style={{ borderLeft: "3px solid var(--purple)" }}>
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
                  background: "rgba(139, 92, 246, 0.15)",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  fontSize: "0.85rem",
                  lineHeight: "1",
                  boxSizing: "border-box",
                  padding: 0,
                  margin: 0,
                }}
              >
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                  👥
                </span>
              </span>
              <span>TOTAL CUSTOMERS</span>
            </span>
          </div>
          <div className="stat-value" style={{ margin: "0.5rem 0 0" }}>{totalCustomersCount}</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>All registered accounts</div>
        </div>

        {/* ACTIVE CUSTOMER */}
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
                  background: "#34d39922",
                  border: "1px solid #34d39944",
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
              <span>ACTIVE CUSTOMER</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#34d399", margin: "0.5rem 0 0" }}>{activeCustomersCount}</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>Currently active buyers</div>
        </div>

        {/* INACTIVE CUSTOMER */}
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
                  background: "#fbbf2422",
                  border: "1px solid #fbbf2444",
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
              <span>INACTIVE CUSTOMER</span>
            </span>
          </div>
          <div className="stat-value" style={{ color: "#fbbf24", margin: "0.5rem 0 0" }}>{inactiveCustomersCount}</div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>Inactive or archived accounts</div>
        </div>
      </div>

      {/* Toolbar: Search on left, Status dropdown on right (All / Active / Inactive / Archived) */}
      <div className="toolbar" style={{ flexWrap: "wrap", gap: "1rem", marginTop: "1.5rem" }}>
        <div className="toolbar-left" style={{ flex: "1 1 300px" }}>
          <div className="toolbar-search" style={{ width: "100%", maxWidth: "380px" }}>
            <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>🔍</span>
            <input
              type="text"
              placeholder="Search customers by name, email, phone, city or ID..."
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

        {/* Right side status filter dropdown: (All / Active / Inactive / Archived) */}
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
            <option value="all" style={{ background: "#161922", color: "#fff" }}>All</option>
            <option value="active" style={{ background: "#161922", color: "#fff" }}>Active</option>
            <option value="inactive" style={{ background: "#161922", color: "#fff" }}>Inactive</option>
            <option value="archived" style={{ background: "#161922", color: "#fff" }}>Archived</option>
          </select>
        </div>
      </div>

      {/* Customers Table: count (#) removed, all data center-aligned except Customer Name, only View Details in actions */}
      <div className="data-table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: "left", paddingLeft: "1.25rem" }}>Customer</th>
              <th style={{ textAlign: "center" }}>Contact Details</th>
              <th style={{ textAlign: "center" }}>Location</th>
              <th style={{ textAlign: "center" }}>Orders</th>
              <th style={{ textAlign: "center" }}>Total Spent</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>👥</div>
                  No customers found matching the search criteria.
                </td>
              </tr>
            ) : (
              filteredCustomers.map(c => (
                <tr key={c.id}>
                  {/* Left-aligned customer profile name & avatar */}
                  <td style={{ textAlign: "left", paddingLeft: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                      <img
                        src={c.avatar}
                        alt={c.name}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "1px solid var(--border-purple)",
                        }}
                      />
                      <div>
                        <div style={{ fontWeight: 600, color: "#fff" }}>{c.name}</div>
                        <div style={{ fontSize: "0.74rem", color: "var(--text-muted)", fontFamily: "monospace" }}>
                          {c.id} • Joined {c.joinedDate}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Center aligned contact details */}
                  <td style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>{c.email}</div>
                    <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>{c.phone}</div>
                  </td>

                  {/* Center aligned location */}
                  <td style={{ textAlign: "center", color: "var(--text-secondary)", fontSize: "0.85rem" }}>
                    📍 {c.city}
                  </td>

                  {/* Center aligned orders */}
                  <td style={{ textAlign: "center", fontWeight: 700, color: "var(--text-primary)" }}>
                    {c.ordersCount}
                  </td>

                  {/* Center aligned total spent */}
                  <td style={{ textAlign: "center", fontWeight: 700, color: "var(--green)" }}>
                    {c.totalSpent}
                  </td>

                  {/* Center aligned status */}
                  <td style={{ textAlign: "center" }}>
                    <span className={`status-badge status-${c.status === "archived" ? "draft" : c.status}`} style={{ margin: "0 auto" }}>
                      <span className="status-dot" />
                      {c.status.toUpperCase()}
                    </span>
                  </td>

                  {/* Center aligned Actions: View Details button only (archive button removed) */}
                  <td style={{ textAlign: "center" }}>
                    <button
                      type="button"
                      className="order-view-details-btn"
                      title="View Customer Details Subpage"
                      onClick={() => navigate(`/customers/${encodeURIComponent(c.id)}`)}
                      style={{ margin: "0 auto" }}
                    >
                      <span>👁</span>
                      <span>View Details</span>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
