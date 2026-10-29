// src/data/storeData.js
// Centralized mock data matching SB Admin Panel products, categories, coupons, and initial orders

export const CATEGORIES = [
  { id: "all", name: "All Products", icon: "✨" },
  { id: "electric", name: "Electric Product", icon: "⚡", slug: "electric-product" },
  { id: "shoes", name: "Shoes Product", icon: "👟", slug: "shoes-product" },
  { id: "fashion", name: "Fashion & Style", icon: "👔", slug: "fashion-product" },
  { id: "accessories", name: "Accessories", icon: "🎧", slug: "accessories" },
];

export const PRODUCTS = [
  {
    id: 1,
    name: "Airpods Pro Max 2024",
    category: "Electric Product",
    categorySlug: "electric",
    sku: "#KMI662211",
    price: 9999,
    originalPrice: 12999,
    stock: 28,
    status: "active",
    badge: "Trending",
    img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewsCount: 142,
    description: "Experience ultra-crisp spatial audio with active noise cancellation, adaptive transparency mode, and 30-hour battery life crafted with titanium accents.",
    features: [
      "Industry-leading Active Noise Cancellation",
      "Dynamic Head-Tracking Spatial Audio",
      "MagSafe Fast Charging (5 mins = 2 hrs playback)",
      "Sweat and water resistance IPX4"
    ],
    reviews: [
      { id: "r1", user: "Vikram Rathore", rating: 5, date: "24 Oct 2026", comment: "The soundstage is breathtaking! Beats any over-ear headphones I've tested." },
      { id: "r2", user: "Priya Sharma", rating: 5, date: "20 Oct 2026", comment: "Super comfy headband and the mic clarity on calls is unmatched." },
    ]
  },
  {
    id: 2,
    name: "Nike Cyber Carbon Runner",
    category: "Shoes Product",
    categorySlug: "shoes",
    sku: "#KMI662222",
    price: 10600,
    originalPrice: 14500,
    stock: 18,
    status: "active",
    badge: "Best Seller",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 96,
    description: "High-performance carbon plate propulsion with breathable engineered mesh and dual-density ZoomX foam for marathon pace efficiency.",
    features: [
      "Full-length carbon fiber propulsion plate",
      "Ultra-lightweight Flyknit upper",
      "High abrasion Continental rubber outsole",
      "Energy return efficiency up to 85%"
    ],
    reviews: [
      { id: "r3", user: "Rohan Khanna", rating: 5, date: "22 Oct 2026", comment: "Shaved 2 minutes off my 10k! The snap from the carbon plate is real." },
      { id: "r4", user: "Ananya Roy", rating: 4, date: "15 Oct 2026", comment: "Great colorway and grip, looks stunning in person." },
    ]
  },
  {
    id: 3,
    name: "Apple Watch Ultra 2 Titanium",
    category: "Electric Product",
    categorySlug: "electric",
    sku: "#KMI662255",
    price: 45900,
    originalPrice: 48000,
    stock: 12,
    status: "active",
    badge: "Premium Flagship",
    img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 228,
    description: "Aerospace-grade titanium 49mm chassis, 3000-nit ultra-bright OLED display, precision dual-frequency GPS, and up to 72 hours of low-power mode.",
    features: [
      "Rugged 49mm Titanium case with sapphire crystal",
      "Water resistant to 100 meters with depth gauge",
      "Customizable Action Button for instant workouts",
      "Emergency siren audible up to 180 meters"
    ],
    reviews: [
      { id: "r5", user: "Gaurav Sen", rating: 5, date: "23 Oct 2026", comment: "Titanium case is bulletproof. Ultra-bright in direct sunlight." },
      { id: "r6", user: "Pooja Reddy", rating: 5, date: "16 Oct 2026", comment: "Accurate GPS and multi-day battery life for trekking." }
    ]
  },
  {
    id: 4,
    name: "Adidas Ultraboost Light 24",
    category: "Shoes Product",
    categorySlug: "shoes",
    sku: "#KMI662277",
    price: 12499,
    originalPrice: 13999,
    stock: 15,
    status: "active",
    badge: "Popular",
    img: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
    rating: 4.6,
    reviewsCount: 76,
    description: "30% lighter Boost capsule material engineered with Linear Energy Push system for boundless all-day energy and effortless stride transition.",
    features: [
      "Light Boost midsole innovation",
      "Primeknit+ textile upper snug fit",
      "Continental™ Better Rubber traction",
      "Eco-conscious recycled yarn elements"
    ],
    reviews: [
      { id: "r7", user: "Sameer Khan", rating: 5, date: "14 Oct 2026", comment: "Foot fatigue is gone after 12,000 steps. Daily driver!" }
    ]
  },
  {
    id: 5,
    name: "Bose QuietComfort 45 Studio",
    category: "Electric Product",
    categorySlug: "electric",
    sku: "#KMI662288",
    price: 19990,
    originalPrice: 24900,
    stock: 22,
    status: "active",
    badge: "Top Rated",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    rating: 4.7,
    reviewsCount: 165,
    description: "Iconic quiet comfort acoustic noise cancelling with plush synthetic leather cushions, TriPort acoustic headphone structure, and 24-hr wireless life.",
    features: [
      "TriPort acoustic architecture with high fidelity EQ",
      "Quiet and Aware modes with quick toggle switch",
      "Up to 24 hours of listening per charge",
      "Impact-resistant glass-filled nylon headband"
    ],
    reviews: [
      { id: "r8", user: "Aditya Roy", rating: 5, date: "21 Oct 2026", comment: "Best ANC for long flights and cafe work. Weightless on ears." }
    ]
  },
  {
    id: 6,
    name: "Sony WH-1000XM5 Premium ANC",
    category: "Electric Product",
    categorySlug: "electric",
    sku: "#KMI662299",
    price: 29990,
    originalPrice: 34990,
    stock: 14,
    status: "active",
    badge: "Audiophile Pick",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80",
    rating: 4.9,
    reviewsCount: 310,
    description: "Two processors controlling 8 microphones for unprecedented noise cancellation. Auto NC optimizer with specially designed 30mm carbon driver.",
    features: [
      "Dual processors and 8 microphones for flawless silence",
      "Precise Voice Pickup technology with 4 beamforming mics",
      "Multipoint connection pairing 2 devices seamlessly",
      "Speak-to-Chat auto pause functionality"
    ],
    reviews: [
      { id: "r9", user: "Karan Mehta", rating: 5, date: "18 Oct 2026", comment: "Absolute masterpiece. Calls in noisy streets sound crystal clear." }
    ]
  },
  {
    id: 7,
    name: "Puma Nitro Carbon Speed",
    category: "Shoes Product",
    categorySlug: "shoes",
    sku: "#KMI662244",
    price: 8499,
    originalPrice: 11000,
    stock: 8,
    status: "active",
    badge: "Sale -23%",
    img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    rating: 4.5,
    reviewsCount: 54,
    description: "Engineered with nitrogen-infused foam tech offering explosive responsiveness in a featherlight silhouette tailored for fast intervals.",
    features: [
      "NITRO FOAM nitrogen-injected cushioning",
      "INNOPLATE carbon composite propulsion blade",
      "PUMAGRIP all-weather high traction compound",
      "Reflective accents for low-light night running"
    ],
    reviews: [
      { id: "r10", user: "Harsh Vardhan", rating: 4, date: "18 Oct 2026", comment: "Carbon plate provides serious bounce during sprint workouts." }
    ]
  },
  {
    id: 8,
    name: "Minimalist Leather Cardholder Wallet",
    category: "Fashion & Style",
    categorySlug: "fashion",
    sku: "#KMI662300",
    price: 1899,
    originalPrice: 2499,
    stock: 35,
    status: "active",
    badge: "Crafted",
    img: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&auto=format&fit=crop&q=80",
    rating: 4.8,
    reviewsCount: 88,
    description: "Full-grain vegetable tanned Italian leather featuring RFID blocking inner lining, quick-draw card access, and magnetic cash clip.",
    features: [
      "100% Genuine Full-grain Italian Leather",
      "Certified RFID protection against digital skimming",
      "Holds up to 8 cards and 15 banknotes effortlessly",
      "Hand-stitched perimeter with burnished edges"
    ],
    reviews: [
      { id: "r11", user: "Nitin Gadhavi", rating: 5, date: "11 Oct 2026", comment: "Fits in the front pocket without any bulk. Leather smells amazing!" }
    ]
  }
];

// Active coupons matching Admin Panel Discounts
export const ACTIVE_COUPONS = [
  { code: "CYBER25", discount: 0.25, label: "25% OFF on Orders above ₹1,999", minPurchase: 1999 },
  { code: "FESTIVE15", discount: 0.15, label: "15% OFF Sitewide", minPurchase: 999 },
  { code: "FLAT500", discount: 500, isFixed: true, label: "Flat ₹500 OFF on Orders above ₹2,999", minPurchase: 2999 },
  { code: "FREESHIP", freeShipping: true, label: "Free Express Shipping", minPurchase: 499 }
];

export const INITIAL_USER_ORDERS = [
  {
    id: "SB-ORD-9821",
    date: "28 Oct 2026",
    status: "Shipped",
    statusStep: 3, // 1: Placed, 2: Confirmed, 3: Shipped, 4: Delivered
    carrier: "BlueDart Express",
    trackingNumber: "BD99281903IN",
    estimatedDelivery: "31 Oct 2026",
    paymentMode: "UPI / PhonePe",
    items: [
      {
        id: 1,
        name: "Airpods Pro Max 2024",
        price: 9999,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80"
      }
    ],
    subtotal: 9999,
    discount: 2500,
    shipping: 0,
    total: 7499,
    shippingAddress: {
      name: "Sahil Bhatia",
      address: "Flat 402, Skyline Residency, Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      phone: "+91 98765 43210"
    }
  },
  {
    id: "SB-ORD-9740",
    date: "14 Oct 2026",
    status: "Delivered",
    statusStep: 4,
    carrier: "Delhivery Surface",
    trackingNumber: "DLH88710283",
    estimatedDelivery: "18 Oct 2026",
    paymentMode: "Credit Card (Razorpay)",
    items: [
      {
        id: 2,
        name: "Nike Cyber Carbon Runner",
        price: 10600,
        quantity: 1,
        img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80"
      }
    ],
    subtotal: 10600,
    discount: 1590,
    shipping: 0,
    total: 9010,
    shippingAddress: {
      name: "Sahil Bhatia",
      address: "Flat 402, Skyline Residency, Sector 62",
      city: "Noida",
      state: "Uttar Pradesh",
      pincode: "201301",
      phone: "+91 98765 43210"
    }
  }
];
