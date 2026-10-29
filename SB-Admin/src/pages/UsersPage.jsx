// src/pages/UsersPage.jsx
import "./users.css";

const USERS = [
  { id: "USR‑001", name: "Alice", role: "Admin", status: "Online" },
  { id: "USR‑002", name: "Bob", role: "Editor", status: "Offline" },
  { id: "USR‑003", name: "Cara", role: "Viewer", status: "Online" },
  { id: "USR‑004", name: "Dan", role: "Editor", status: "Idle" },
];

export default function UsersPage() {
  return (
    <section className="users-page card">
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
          {USERS.map(u => (
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
  );
}
