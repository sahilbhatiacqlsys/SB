// Dashboard.jsx – admin‑panel dashboard (single page)
import { useState } from "react";
import "./dashboard.css";

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("overview");

  const navItems = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "reports", label: "Reports", icon: "📈" },
  ];

  const stats = [
    { title: "Active Users", value: "1 254", bg: "var(--p1)" },
    { title: "New Sign‑ups", value: "84", bg: "var(--cyan)" },
    { title: "Revenue", value: "$12 340", bg: "var(--green)" },
    { title: "Errors", value: "3", bg: "var(--red)" },
  ];

  const users = [
    { id: "USR‑001", name: "Alice", role: "Admin", status: "Online" },
    { id: "USR‑002", name: "Bob", role: "Editor", status: "Offline" },
    { id: "USR‑003", name: "Cara", role: "Viewer", status: "Online" },
    { id: "USR‑004", name: "Dan", role: "Editor", status: "Idle" },
  ];

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar card">
        <h2 className="brand">SB Admin</h2>
        <nav>
          {navItems.map((it) => (
            <button
              key={it.id}
              className={`nav-item ${activeNav === it.id ? "active" : ""}`}
              onClick={() => setActiveNav(it.id)}
            >
              <span className="icon">{it.icon}</span>
              <span>{it.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="header card">
          <h1>{navItems.find((i) => i.id === activeNav).label}</h1>
          <div className="profile">
            <span className="avatar">👤</span>
            <span className="name">John Doe</span>
          </div>
        </header>

        {/* Stats grid */}
        <section className="stats-grid">
          {stats.map((s) => (
            <div
              key={s.title}
              className="stat-card card"
              style={{ background: s.bg }}
            >
              <h3>{s.title}</h3>
              <p>{s.value}</p>
            </div>
          ))}
        </section>

        {/* Users table */}
        {activeNav === "users" && (
          <section className="card table-section">
            <h2 className="section-title">User Directory</h2>
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.role}</td>
                    <td>{u.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </main>
    </div>
  );
}
