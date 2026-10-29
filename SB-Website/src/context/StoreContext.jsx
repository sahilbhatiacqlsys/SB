// src/context/StoreContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { PRODUCTS as DEFAULT_PRODUCTS, ACTIVE_COUPONS, INITIAL_USER_ORDERS } from "../data/storeData";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  // Products state (persisted in localStorage or default)
  const [products] = useState(() => {
    const saved = localStorage.getItem("sb_products");
    return saved ? JSON.parse(saved) : DEFAULT_PRODUCTS;
  });

  // Cart state: [ { product, quantity, selectedVariant } ]
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("sb_cart");
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist state: array of product IDs
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("sb_wishlist");
    return saved ? JSON.parse(saved) : [1, 3];
  });

  // Applied Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // User Profile State (Single User Role)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("sb_user");
    return saved
      ? JSON.parse(saved)
      : {
          name: "Sahil Bhatia",
          email: "sahil@cqlsys.com",
          phone: "+91 98765 43210",
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
          addresses: [
            {
              id: "addr-1",
              title: "Home",
              isDefault: true,
              address: "Flat 402, Skyline Residency, Sector 62",
              city: "Noida",
              state: "Uttar Pradesh",
              pincode: "201301",
              phone: "+91 98765 43210"
            },
            {
              id: "addr-2",
              title: "Office",
              isDefault: false,
              address: "CQLSYS Technologies, IT Park Tower C",
              city: "Mohali",
              state: "Punjab",
              pincode: "160071",
              phone: "+91 98112 33445"
            }
          ]
        };
  });

  // User Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("sb_orders");
    return saved ? JSON.parse(saved) : INITIAL_USER_ORDERS;
  });

  // User Queries / Support tickets submitted
  const [queries, setQueries] = useState(() => {
    const saved = localStorage.getItem("sb_queries");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: "QRY-108",
            subject: "Express Delivery Inquiry for Order #SB-ORD-9821",
            category: "Shipping",
            status: "Resolved",
            date: "28 Oct 2026",
            messages: [
              { sender: "user", text: "Can I receive this order before Friday evening?", time: "10:30 AM" },
              { sender: "admin", text: "Hello Sahil! Your parcel is on priority dispatch with BlueDart and will reach on or before Oct 31.", time: "11:15 AM" }
            ]
          }
        ];
  });

  // Toast notifications state
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem("sb_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("sb_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem("sb_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("sb_queries", JSON.stringify(queries));
  }, [queries]);

  useEffect(() => {
    localStorage.setItem("sb_user", JSON.stringify(user));
  }, [user]);

  // Cart operations
  const addToCart = (product, quantity = 1, options = {}) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { product, quantity, ...options }];
    });
    showToast(`Added "${product.name}" to your cart! ✨`);
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast("Item removed from cart");
  };

  const updateQuantity = (productId, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast("Removed from wishlist");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Added to wishlist ❤️");
        return [...prev, productId];
      }
    });
  };

  // Cart Financials
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  let discountAmount = 0;
  let isFreeShipping = false;

  if (appliedCoupon) {
    if (appliedCoupon.freeShipping) {
      isFreeShipping = true;
    } else if (appliedCoupon.isFixed) {
      discountAmount = appliedCoupon.discount;
    } else {
      discountAmount = Math.round(cartSubtotal * appliedCoupon.discount);
    }
  }

  const shippingCost = cartSubtotal > 1500 || isFreeShipping || cartSubtotal === 0 ? 0 : 150;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  // Apply Coupon
  const applyCouponCode = (code) => {
    const found = ACTIVE_COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: "Invalid promo code. Try CYBER25 or FESTIVE15!" };
    }
    if (cartSubtotal < found.minPurchase) {
      return { success: false, message: `Minimum cart value of ₹${found.minPurchase} required for ${found.code}` };
    }
    setAppliedCoupon(found);
    showToast(`Promo ${found.code} applied! Saved discount.`);
    return { success: true, message: `Coupon ${found.code} applied successfully!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast("Coupon removed");
  };

  // Place Order
  const placeOrder = ({ paymentMode, address }) => {
    const newOrder = {
      id: `SB-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      status: "Confirmed",
      statusStep: 2,
      carrier: "BlueDart Express",
      trackingNumber: `BD${Math.floor(10000000 + Math.random() * 90000000)}IN`,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      }),
      paymentMode,
      items: cart.map((item) => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        img: item.product.img
      })),
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: shippingCost,
      total: cartTotal,
      shippingAddress: address
    };

    setOrders([newOrder, ...orders]);
    clearCart();
    setAppliedCoupon(null);
    return newOrder;
  };

  // Submit Query
  const submitQuery = ({ subject, category, message }) => {
    const newQuery = {
      id: `QRY-${Math.floor(200 + Math.random() * 800)}`,
      subject,
      category,
      status: "In Progress",
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
      messages: [{ sender: "user", text: message, time: "Just now" }]
    };
    setQueries([newQuery, ...queries]);
    showToast("Your support ticket has been submitted!");
    return newQuery;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        cart,
        wishlist,
        user,
        setUser,
        orders,
        queries,
        appliedCoupon,
        cartSubtotal,
        discountAmount,
        shippingCost,
        cartTotal,
        toast,
        showToast,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        applyCouponCode,
        removeCoupon,
        placeOrder,
        submitQuery
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
