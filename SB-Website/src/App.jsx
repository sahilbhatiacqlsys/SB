// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { StoreProvider, useStore } from "./context/StoreContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import WishlistPage from "./pages/WishlistPage";
import ProfilePage from "./pages/ProfilePage";
import ContactQueriesPage from "./pages/ContactQueriesPage";

// Toast component for animated popups
function ToastContainer() {
  const { toast } = useStore();
  if (!toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        right: "30px",
        zIndex: 9999,
        background: "rgba(15, 20, 36, 0.95)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(139, 92, 246, 0.4)",
        boxShadow: "0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(139, 92, 246, 0.3)",
        borderRadius: "14px",
        padding: "0.9rem 1.4rem",
        color: "#fff",
        fontSize: "0.92rem",
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: "10px",
        animation: "fadeInDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards"
      }}
    >
      <span style={{ fontSize: "1.15rem" }}>⚡</span>
      <span>{toast.message}</span>
    </div>
  );
}

// ScrollToTop on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/contact" element={<ContactQueriesPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <ToastContainer />
      </BrowserRouter>
    </StoreProvider>
  );
}
