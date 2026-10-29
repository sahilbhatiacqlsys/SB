import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { INITIAL_DISCOUNTS } from "./DiscountsPage";

export default function CouponUsageSubpage({ discountsList = INITIAL_DISCOUNTS }) {
  const { discountId } = useParams();
  const navigate = useNavigate();

  const decodedId = decodeURIComponent(discountId || "");
  const discount = discountsList.find(
    (d) => d.id === decodedId || d.code.toLowerCase() === decodedId.toLowerCase()
  );

  if (!discount) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏷️</div>
        <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Discount Code Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          The requested coupon <code>{decodedId}</code> does not exist or has been deleted.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/discounts")}>
          ← Back to Discounts
        </button>
      </div>
    );
  }

  const redemptions = discount.redemptions || [];

  return (
    <div className="category-form-subpage" style={{ paddingBottom: "3rem", maxWidth: "980px", margin: "0 auto" }}>
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
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
              <h1 className="page-title" style={{ margin: 0 }}>
                Coupon Redemptions &amp; Usage
              </h1>
              <span
                style={{
                  background: "rgba(139, 92, 246, 0.2)",
                  border: "1px solid rgba(139, 92, 246, 0.4)",
                  color: "#c084fc",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  letterSpacing: "0.5px",
                }}
              >
                {discount.code}
              </span>
            </div>
            <p className="page-subtitle" style={{ margin: "0.25rem 0 0" }}>
              {discount.title} • Discount Value: <strong style={{ color: "#34d399" }}>{discount.value}</strong> • Validity: {discount.startDate} → {discount.endDate}
            </p>
          </div>
        </div>
      </div>

      {/* 3 Metric Stat Containers */}
      <div className="stats-row" style={{ gridTemplateColumns: "repeat(3, 1fr)", marginBottom: "1.5rem" }}>
        <div className="stat-card" style={{ borderLeft: "3px solid #38bdf8" }}>
          <div className="stat-header">
            <span className="stat-label">TOTAL REDEMPTIONS</span>
          </div>
          <div className="stat-value" style={{ margin: "0.5rem 0 0" }}>
            {discount.usageCount}
          </div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>
            Allowed Limit: {discount.usageLimit}
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: "3px solid #34d399" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ color: "#34d399" }}>
              COUPON BENEFIT
            </span>
          </div>
          <div className="stat-value" style={{ color: "#34d399", margin: "0.5rem 0 0" }}>
            {discount.value}
          </div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>
            Min Order: {discount.minPurchase}
          </div>
        </div>

        <div className="stat-card" style={{ borderLeft: "3px solid #fbbf24" }}>
          <div className="stat-header">
            <span className="stat-label" style={{ color: "#fbbf24" }}>
              STATUS
            </span>
          </div>
          <div className="stat-value" style={{ color: "#fbbf24", margin: "0.5rem 0 0", textTransform: "uppercase", fontSize: "1.4rem" }}>
            {discount.status}
          </div>
          <div className="stat-period" style={{ marginTop: "0.25rem" }}>
            {redemptions.length} order records available
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div
        className="card"
        style={{
          background: "#111422",
          border: "1px solid rgba(139, 92, 246, 0.25)",
          borderRadius: "14px",
          padding: "1.5rem",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>
            Customer Orders with this Coupon
          </h3>
          <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Showing {redemptions.length} records
          </span>
        </div>

        {redemptions.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3.5rem 1rem",
              background: "rgba(255, 255, 255, 0.02)",
              borderRadius: "10px",
              border: "1px dashed rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📭</div>
            <div style={{ fontWeight: 600, color: "#fff", fontSize: "1rem", marginBottom: "0.35rem" }}>
              No customer redemptions recorded yet
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", maxWidth: "420px", margin: "0 auto" }}>
              When customers enter code <strong>{discount.code}</strong> at checkout, their order details and purchased products will appear here.
            </div>
          </div>
        ) : (
          <div className="data-table-wrap" style={{ border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px" }}>
            <table className="data-table" style={{ width: "100%", fontSize: "0.88rem" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "center" }}>Order &amp; Date</th>
                  <th style={{ textAlign: "left", paddingLeft: "1.2rem" }}>Customer Details</th>
                  <th style={{ textAlign: "left" }}>Product Purchased</th>
                  <th style={{ textAlign: "center" }}>Original</th>
                  <th style={{ textAlign: "center" }}>Discount Saved</th>
                  <th style={{ textAlign: "center" }}>Paid Amount</th>
                </tr>
              </thead>
              <tbody>
                {redemptions.map((r, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: "center" }}>
                      <span
                        style={{
                          fontWeight: 700,
                          color: "var(--purple-light)",
                          background: "rgba(139, 92, 246, 0.12)",
                          padding: "3px 8px",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {r.orderId}
                      </span>
                      <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginTop: "4px" }}>
                        {r.date}
                      </div>
                    </td>
                    <td style={{ textAlign: "left", paddingLeft: "1.2rem" }}>
                      <div style={{ fontWeight: 600, color: "#fff" }}>{r.customerName}</div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}>{r.customerEmail}</div>
                      <div style={{ fontSize: "0.74rem", color: "var(--text-secondary)" }}>{r.customerPhone}</div>
                    </td>
                    <td style={{ textAlign: "left" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <span style={{ fontSize: "1.35rem" }}>{r.productImg || "📦"}</span>
                        <div>
                          <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.88rem" }}>
                            {r.productName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td style={{ textAlign: "center", color: "var(--text-muted)", textDecoration: "line-through", fontSize: "0.85rem" }}>
                      {r.productPrice}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <span
                        style={{
                          color: "#34d399",
                          fontWeight: 700,
                          background: "rgba(52, 211, 153, 0.12)",
                          padding: "3px 10px",
                          borderRadius: "4px",
                          fontSize: "0.85rem",
                        }}
                      >
                        -{r.discountSaved}
                      </span>
                    </td>
                    <td style={{ textAlign: "center", fontWeight: 700, color: "#fff", fontSize: "0.95rem" }}>
                      {r.finalAmount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
