// src/pages/ProfilePage.jsx
import React, { useState } from "react";
import { useStore } from "../context/StoreContext";
import { User, Mail, Phone, MapPin, Plus, Check, Shield, Edit3 } from "lucide-react";

export default function ProfilePage() {
  const { user, setUser, showToast } = useStore();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddr, setNewAddr] = useState({
    title: "Home",
    address: "",
    city: "",
    state: "",
    pincode: "",
    phone: user.phone
  });

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setUser({ ...user, name, email, phone });
    showToast("Profile details updated successfully! ✨");
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.address || !newAddr.city || !newAddr.pincode) {
      alert("Please fill in address, city, and pincode.");
      return;
    }
    const updatedAddresses = [
      ...user.addresses,
      { id: `addr-${Date.now()}`, isDefault: user.addresses.length === 0, ...newAddr }
    ];
    setUser({ ...user, addresses: updatedAddresses });
    setShowAddressModal(false);
    setNewAddr({ title: "Home", address: "", city: "", state: "", pincode: "", phone: user.phone });
    showToast("New delivery address added!");
  };

  const handleSetDefaultAddress = (id) => {
    const updated = user.addresses.map((a) => ({
      ...a,
      isDefault: a.id === id
    }));
    setUser({ ...user, addresses: updated });
    showToast("Default address updated");
  };

  const handleDeleteAddress = (id) => {
    if (user.addresses.length <= 1) {
      alert("You must keep at least one delivery address.");
      return;
    }
    const updated = user.addresses.filter((a) => a.id !== id);
    setUser({ ...user, addresses: updated });
    showToast("Address removed");
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: "1140px", margin: "0 auto", padding: "2.5rem 1.5rem 5rem" }}>
      {/* Header Profile Hero Card */}
      <div
        className="glass-panel"
        style={{
          borderRadius: "24px",
          padding: "2rem",
          marginBottom: "2.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1.75rem",
          flexWrap: "wrap",
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.1) 100%)",
          border: "1px solid rgba(139, 92, 246, 0.3)"
        }}
      >
        <img
          src={user.avatar}
          alt={user.name}
          style={{
            width: "90px",
            height: "90px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #a78bfa",
            boxShadow: "0 0 25px rgba(139, 92, 246, 0.5)"
          }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
            <h1 style={{ fontSize: "1.8rem", color: "#fff" }}>{user.name}</h1>
            <span className="badge badge-emerald">Verified Customer</span>
          </div>
          <div style={{ display: "flex", gap: "1.25rem", color: "var(--text-secondary)", fontSize: "0.88rem", flexWrap: "wrap" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Mail size={15} /> {user.email}</span>
            <span style={{ display: "flex", alignItems: "center", gap: "5px" }}><Phone size={15} /> {user.phone}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2.5rem" }}>
        {/* Profile Settings Form */}
        <div className="glass-panel" style={{ borderRadius: "20px", padding: "2rem" }}>
          <h3 style={{ fontSize: "1.2rem", color: "#fff", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <Edit3 size={18} color="#a78bfa" /> Personal Information
          </h3>

          <form onSubmit={handleUpdateProfile} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            <div>
              <label style={{ fontSize: "0.85rem", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

            <button type="submit" className="btn-primary" style={{ marginTop: "0.5rem" }}>
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Saved Delivery Addresses */}
        <div className="glass-panel" style={{ borderRadius: "20px", padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <h3 style={{ fontSize: "1.2rem", color: "#fff", display: "flex", alignItems: "center", gap: "8px" }}>
              <MapPin size={18} color="#34d399" /> Saved Addresses
            </h3>
            <button
              type="button"
              onClick={() => setShowAddressModal(true)}
              style={{
                background: "rgba(16, 185, 129, 0.15)",
                border: "1px solid rgba(16, 185, 129, 0.35)",
                color: "#34d399",
                borderRadius: "8px",
                padding: "0.4rem 0.8rem",
                fontSize: "0.82rem",
                fontWeight: 700,
                display: "inline-flex",
                alignItems: "center",
                gap: "4px"
              }}
            >
              <Plus size={14} /> Add New
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {user.addresses.map((addr) => (
              <div
                key={addr.id}
                style={{
                  padding: "1rem",
                  borderRadius: "14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: addr.isDefault ? "2px solid #a78bfa" : "1px solid var(--border)",
                  position: "relative"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <strong style={{ color: "#fff", fontSize: "0.95rem" }}>{addr.title}</strong>
                    {addr.isDefault && <span className="badge badge-purple">Default</span>}
                  </div>
                  <div style={{ display: "flex", gap: "8px", fontSize: "0.78rem" }}>
                    {!addr.isDefault && (
                      <button
                        type="button"
                        onClick={() => handleSetDefaultAddress(addr.id)}
                        style={{ color: "#a78bfa", textDecoration: "underline", cursor: "pointer" }}
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(addr.id)}
                      style={{ color: "#f87171", cursor: "pointer" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", lineHeight: 1.4 }}>
                  {addr.address}, {addr.city}, {addr.state} - {addr.pincode}
                </p>
                <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "4px" }}>
                  Phone: {addr.phone}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(8px)",
            zIndex: 100,
            display: "grid",
            placeItems: "center",
            padding: "1.5rem"
          }}
          onClick={() => setShowAddressModal(false)}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: "500px",
              width: "100%",
              borderRadius: "20px",
              padding: "2rem"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ color: "#fff", fontSize: "1.3rem", marginBottom: "1.25rem" }}>Add Delivery Address</h3>
            <form onSubmit={handleAddAddress} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Label (e.g. Home, Work)</label>
                <input
                  type="text"
                  value={newAddr.title}
                  onChange={(e) => setNewAddr({ ...newAddr, title: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: "8px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--border)", color: "#fff", outline: "none" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Street Address</label>
                <input
                  type="text"
                  required
                  placeholder="House/Flat number, Road, Area"
                  value={newAddr.address}
                  onChange={(e) => setNewAddr({ ...newAddr, address: e.target.value })}
                  style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: "8px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--border)", color: "#fff", outline: "none" }}
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>City</label>
                  <input
                    type="text"
                    required
                    value={newAddr.city}
                    onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: "8px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--border)", color: "#fff", outline: "none" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Pincode</label>
                  <input
                    type="text"
                    required
                    value={newAddr.pincode}
                    onChange={(e) => setNewAddr({ ...newAddr, pincode: e.target.value })}
                    style={{ width: "100%", padding: "0.6rem 0.85rem", borderRadius: "8px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--border)", color: "#fff", outline: "none" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
                <button type="button" className="btn-secondary" onClick={() => setShowAddressModal(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Address</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
