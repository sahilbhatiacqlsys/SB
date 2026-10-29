// src/admin/AdminPanel.jsx – Full-page admin panel matching reference design
import { useState, useRef, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useParams, useLocation, NavLink } from "react-router-dom";
import "./admin.css";
import "./pages.css";
import CustomersPage, { INITIAL_CUSTOMERS } from "./CustomersPage";
import CustomerDetailsSubpage from "./CustomerDetailsSubpage";
import ContentCMSPage from "./ContentCMSPage";
import FinancesPage from "./FinancesPage";
import KhatabookSubpage from "./KhatabookSubpage";
import DiscountsPage, { INITIAL_DISCOUNTS } from "./DiscountsPage";
import CreateDiscountSubpage from "./CreateDiscountSubpage";
import CouponUsageSubpage from "./CouponUsageSubpage";

import NotificationsSendPage from "./NotificationsSendPage";
import SendNotificationSubpage from "./SendNotificationSubpage";
import QueriesPage, { INITIAL_QUERIES } from "./QueriesPage";
import QueryReplySubpage from "./QueryReplySubpage";
import LoginPage from "./LoginPage";

/* ═══ Sidebar menu config ═══ */
const MAIN_MENU = [
  { id: "dashboard", path: "/dashboard", label: "Dashboard", icon: "📊" },
  { id: "orders", path: "/orders", label: "Orders", icon: "📦", badge: 3 },
  { id: "products", path: "/products", label: "Products", icon: "🛍️" },
  { id: "categories", path: "/categories", label: "Categories", icon: "📑" },
  { id: "customers", path: "/customers", label: "Customers", icon: "👥" },
  { id: "finances", path: "/finances", label: "Finances", icon: "💰" },
  { id: "discounts", path: "/discounts", label: "Discounts", icon: "🏷️" },
  { id: "content", path: "/content", label: "CMS", icon: "📝" },
  { id: "notifications-send", path: "/notifications-send", label: "Send Notifications", icon: "📢" },
  { id: "queries", path: "/queries", label: "Queries", icon: "💬" },
];

const CURRENT_YEAR = new Date().getFullYear();

/* ═══ Products mock data ═══ */
const PRODUCTS = [
  {
    id: 1,
    name: "Airpods Pro Max 2024",
    category: "Electric Product",
    sku: "#KMI662266",
    date: "Jan 01, 2024",
    price: "₹10,120.00",
    sellPrice: "Sell Price ₹10,600.00",
    stock: 120,
    status: "active",
    img: "🎧",
    rating: 4.8,
    reviewsCount: 142,
    reviews: [
      { id: "rev-101", customerName: "Aarav Sharma", customerEmail: "aarav.s@example.com", rating: 5, date: "Oct 24, 2026", comment: "Outstanding active noise cancellation and build quality. Battery lasts for days!" },
      { id: "rev-102", customerName: "Sneha Patel", customerEmail: "sneha.p@example.com", rating: 5, date: "Oct 20, 2026", comment: "The soundstage is super wide and clear. Worth the price, premium feel." },
      { id: "rev-103", customerName: "Vikram Malhotra", customerEmail: "vikram.m@example.com", rating: 4, date: "Oct 15, 2026", comment: "Great sound, slightly heavy on head during long work sessions." },
      { id: "rev-104", customerName: "Priya Nair", customerEmail: "priya.n@example.com", rating: 5, date: "Oct 08, 2026", comment: "Fast bluetooth pairing and crystal clear calls. Highly recommended!" },
      { id: "rev-105", customerName: "Manish Tiwari", customerEmail: "manish.t@example.com", rating: 3, date: "Sep 28, 2026", comment: "Case could have been more protective. Audio is crisp though." },
      { id: "rev-106", customerName: "Divya Agarwal", customerEmail: "divya.a@example.com", rating: 2, date: "Sep 14, 2026", comment: "Too tight around the ears for glasses wearers, had to take frequent breaks." },
    ]
  },
  {
    id: 2,
    name: "Nike New Model Shoes",
    category: "Shoes Product",
    sku: "#KMI662211",
    date: "Jan 01, 2024",
    price: "₹10,120.00",
    sellPrice: "Sell Price ₹10,600.00",
    stock: 25,
    status: "active",
    img: "👟",
    rating: 4.6,
    reviewsCount: 89,
    reviews: [
      { id: "rev-201", customerName: "Kunal Verma", customerEmail: "kunal.v@example.com", rating: 5, date: "Oct 22, 2026", comment: "Ultra lightweight and super cushioned sole. Great for marathon training." },
      { id: "rev-202", customerName: "Ananya Deshmukh", customerEmail: "ananya.d@example.com", rating: 4, date: "Oct 17, 2026", comment: "Comfortable fit, looks vibrant and matches gym outfits." },
      { id: "rev-203", customerName: "Rohan Gupta", customerEmail: "rohan.g@example.com", rating: 5, date: "Oct 11, 2026", comment: "True to size, excellent grip on wet pavements." },
      { id: "rev-204", customerName: "Siddharth Jain", customerEmail: "sid.jain@example.com", rating: 3, date: "Oct 02, 2026", comment: "Decent pair, but laces fray a bit after vigorous running." },
      { id: "rev-205", customerName: "Kavita Rao", customerEmail: "kavita.r@example.com", rating: 5, date: "Sep 20, 2026", comment: "Super breathable upper mesh. Feet stay cool even during afternoon runs." },
    ]
  },
  {
    id: 3,
    name: "Sony WH-1000XM5 Headset",
    category: "Electric Product",
    sku: "#KMI662233",
    date: "Jan 02, 2024",
    price: "₹24,990.00",
    sellPrice: "Sell Price ₹26,500.00",
    stock: 8,
    status: "inactive",
    img: "🎧",
    rating: 4.9,
    reviewsCount: 310,
    reviews: [
      { id: "rev-301", customerName: "Devansh Mehra", customerEmail: "devansh@example.com", rating: 5, date: "Oct 25, 2026", comment: "Industry benchmark for ANC. Feather light and plush earcups." },
      { id: "rev-302", customerName: "Meera Joshi", customerEmail: "meera.j@example.com", rating: 5, date: "Oct 19, 2026", comment: "Bass is punchy without distorting vocals. App equalizer is powerful." },
      { id: "rev-303", customerName: "Arjun Singhania", customerEmail: "arjun.s@example.com", rating: 5, date: "Oct 12, 2026", comment: "Quick charging is a lifesaver. 3 minutes gives 3 hours playback." },
      { id: "rev-304", customerName: "Nisha Pillai", customerEmail: "nisha.p@example.com", rating: 4, date: "Sep 30, 2026", comment: "Non-folding headband makes travel case a bit bulky, but audio is top notch." },
    ]
  },
  {
    id: 4,
    name: "Puma Nitro Carbon Shoes",
    category: "Shoes Product",
    sku: "#KMI662244",
    date: "Jan 03, 2024",
    price: "₹8,499.00",
    sellPrice: "Sell Price ₹9,200.00",
    stock: 0,
    status: "outstock",
    img: "👟",
    rating: 4.3,
    reviewsCount: 54,
    reviews: [
      { id: "rev-401", customerName: "Harsh Vardhan", customerEmail: "harsh@example.com", rating: 4, date: "Oct 18, 2026", comment: "Carbon plate provides serious bounce during sprint workouts." },
      { id: "rev-402", customerName: "Tanvi Saxena", customerEmail: "tanvi.s@example.com", rating: 5, date: "Oct 12, 2026", comment: "Super stylish shoes, cushioning is top tier." },
      { id: "rev-403", customerName: "Nikhil Bhatt", customerEmail: "nikhil.b@example.com", rating: 3, date: "Oct 05, 2026", comment: "Good response on tracks, but not ideal for casual walking." },
      { id: "rev-404", customerName: "Akash Deep", customerEmail: "akash@example.com", rating: 1, date: "Sep 18, 2026", comment: "Sole started peeling near outer edge after 3 weeks of running." },
    ]
  },
  {
    id: 5,
    name: "Apple Watch Ultra 2",
    category: "Electric Product",
    sku: "#KMI662255",
    date: "Jan 04, 2024",
    price: "₹45,900.00",
    sellPrice: "Sell Price ₹48,000.00",
    stock: 45,
    status: "active",
    img: "⌚",
    rating: 4.9,
    reviewsCount: 228,
    reviews: [
      { id: "rev-501", customerName: "Gaurav Sen", customerEmail: "gaurav@example.com", rating: 5, date: "Oct 23, 2026", comment: "Titanium case is bulletproof. Ultra-bright display in direct sunlight." },
      { id: "rev-502", customerName: "Pooja Reddy", customerEmail: "pooja.r@example.com", rating: 5, date: "Oct 16, 2026", comment: "Accurate GPS and multi-day battery life for trekking." },
      { id: "rev-503", customerName: "Raghav Menon", customerEmail: "raghav.m@example.com", rating: 5, date: "Oct 07, 2026", comment: "Action button customisation is super handy for interval timers." },
    ]
  },
  {
    id: 6,
    name: "Adidas Ultraboost Light",
    category: "Shoes Product",
    sku: "#KMI662277",
    date: "Jan 05, 2024",
    price: "₹12,499.00",
    sellPrice: "Sell Price ₹13,999.00",
    stock: 15,
    status: "draft",
    img: "👟",
    rating: 4.5,
    reviewsCount: 76,
    reviews: [
      { id: "rev-601", customerName: "Sameer Khan", customerEmail: "sameer.k@example.com", rating: 5, date: "Oct 14, 2026", comment: "Iconic comfort, lighter than previous iterations." },
      { id: "rev-602", customerName: "Ritu Singhal", customerEmail: "ritu@example.com", rating: 4, date: "Oct 09, 2026", comment: "Comfortable for all day walking and commutes." },
      { id: "rev-603", customerName: "Varun Bajaj", customerEmail: "varun.b@example.com", rating: 5, date: "Sep 25, 2026", comment: "Best daily trainers. Foot fatigue is gone after 10,000 steps." },
    ]
  },
  {
    id: 7,
    name: "Bose QuietComfort 45",
    category: "Electric Product",
    sku: "#KMI662288",
    date: "Jan 06, 2024",
    price: "₹19,990.00",
    sellPrice: "Sell Price ₹21,500.00",
    stock: 85,
    status: "active",
    img: "🎧",
    rating: 4.7,
    reviewsCount: 165,
    reviews: [
      { id: "rev-701", customerName: "Aditya Roy", customerEmail: "aditya.r@example.com", rating: 5, date: "Oct 21, 2026", comment: "Physical buttons make it so easy to use. Bose comfort is unmatched." },
      { id: "rev-702", customerName: "Simran Kaur", customerEmail: "simran.k@example.com", rating: 4, date: "Oct 15, 2026", comment: "Great voice mic quality during Zoom calls. Solid noise cancel." },
      { id: "rev-703", customerName: "Ritesh Mathur", customerEmail: "ritesh@example.com", rating: 5, date: "Oct 03, 2026", comment: "Folds compact into case. Battery life easily exceeded 22 hours." },
    ]
  },
  {
    id: 8,
    name: "Under Armour Phantom 3",
    category: "Shoes Product",
    sku: "#KMI662299",
    date: "Jan 07, 2024",
    price: "₹7,299.00",
    sellPrice: "Sell Price ₹8,199.00",
    stock: 5,
    status: "archived",
    img: "👟",
    rating: 4.2,
    reviewsCount: 38,
    reviews: [
      { id: "rev-801", customerName: "Karthik Iyer", customerEmail: "karthik.i@example.com", rating: 4, date: "Oct 10, 2026", comment: "Snug knit collar and decent energy return for gym days." },
      { id: "rev-802", customerName: "Neha Chawla", customerEmail: "neha.c@example.com", rating: 5, date: "Sep 27, 2026", comment: "Firm heel stability when lifting weights. Love the styling." },
      { id: "rev-803", customerName: "Gopal Krishna", customerEmail: "gopal.k@example.com", rating: 2, date: "Sep 11, 2026", comment: "Fits tighter than standard UK 9, recommend buying half size up." },
    ]
  },
  {
    id: 9,
    name: "Samsung Galaxy Buds Pro",
    category: "Electric Product",
    sku: "#KMI662310",
    date: "Jan 08, 2024",
    price: "₹11,490.00",
    sellPrice: "Sell Price ₹12,990.00",
    stock: 0,
    status: "outstock",
    img: "🎧",
    rating: 4.4,
    reviewsCount: 92,
    reviews: [
      { id: "rev-901", customerName: "Deepak Choudhary", customerEmail: "deepak@example.com", rating: 5, date: "Oct 17, 2026", comment: "Seamless ecosystem integration with Samsung phone and tablet." },
      { id: "rev-902", customerName: "Geeta Sen", customerEmail: "geeta.s@example.com", rating: 4, date: "Oct 04, 2026", comment: "360 Audio feature is fun for watching action movies." },
      { id: "rev-903", customerName: "Abhinav Prasad", customerEmail: "abhinav@example.com", rating: 3, date: "Sep 22, 2026", comment: "Glossy finish attracts fingerprint smudges easily." },
    ]
  },
  {
    id: 10,
    name: "Nike Air Jordan Retro",
    category: "Shoes Product",
    sku: "#KMI662320",
    date: "Jan 09, 2024",
    price: "₹16,995.00",
    sellPrice: "Sell Price ₹18,500.00",
    stock: 95,
    status: "active",
    img: "👟",
    rating: 4.9,
    reviewsCount: 420,
    reviews: [
      { id: "rev-1001", customerName: "Zubin Irani", customerEmail: "zubin@example.com", rating: 5, date: "Oct 26, 2026", comment: "A true classic silhouette. Premium leather finish and neck-turner look." },
      { id: "rev-1002", customerName: "Shalini Kapoor", customerEmail: "shalini.k@example.com", rating: 5, date: "Oct 21, 2026", comment: "Collectable piece, arrived in mint box condition." },
      { id: "rev-1003", customerName: "Yuvraj Singhal", customerEmail: "yuvraj@example.com", rating: 5, date: "Oct 14, 2026", comment: "The colorway is even better in person than website photos." },
      { id: "rev-1004", customerName: "Farhan Siddiqui", customerEmail: "farhan.s@example.com", rating: 4, date: "Oct 01, 2026", comment: "Creases slightly on toe box as expected with real leather, looks great." },
    ]
  },
];

const STATS = [
  { icon: "📦", label: "TOTAL PRODUCTS", value: "1,248", change: "+4.2%", up: true, period: "Last 7 days" },
  { icon: "₹", label: "TOTAL REVENUE", value: "₹84,320", change: "+12.5%", up: true, period: "Last 7 days" },
  { icon: "📋", label: "TOTAL ORDERS", value: "142", change: "-1.4%", up: false, period: "Last 7 days" },
  { icon: "👥", label: "CUSTOMERS", value: "3,240", change: "+2.1%", up: true, period: "Last 7 days" },
];

const CATEGORIES = [
  { id: 1, name: "Electric Product", slug: "electric-product", icon: "⚡", count: 420, description: "Headphones, smart devices and gadgets", status: "active" },
  { id: 2, name: "Shoes Product", slug: "shoes-product", icon: "👟", count: 310, description: "Sneakers, athletic shoes, and casual footwear", status: "active" },
  { id: 3, name: "Apparel & Clothing", slug: "apparel-clothing", icon: "👕", count: 285, description: "T-shirts, hoodies, jackets and sportswear", status: "active" },
  { id: 4, name: "Accessories", slug: "accessories", icon: "🎒", count: 145, description: "Bags, wallets, watches and cases", status: "active" },
  { id: 5, name: "Home & Living", slug: "home-living", icon: "🛋️", count: 88, description: "Modern furniture, decor and lighting", status: "inactive" },
];

const CATEGORY_STATS = [
  { icon: "📑", label: "TOTAL CATEGORIES", value: "24", change: "+2 New", up: true, period: "This month" },
  { icon: "🛍️", label: "TOTAL ITEMS", value: "1,248", change: "+4.2%", up: true, period: "Across all categories" },
  { icon: "⚡", label: "TOP CATEGORY", value: "Electric", change: "420 items", up: true, period: "34% of inventory" },
  { icon: "🏷️", label: "ACTIVE TAGS", value: "56", change: "+5.0%", up: true, period: "Active filters" },
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

const DASHBOARD_DATA_BY_PERIOD = {
  today: {
    metrics: [
      { id: "revenue", icon: "💰", label: "TOTAL REVENUE", value: "₹24,850", color: "#a78bfa" },
      { id: "orders", icon: "📦", label: "TOTAL ORDER", value: "38", color: "#38bdf8" },
      { id: "delivered_orders", icon: "✅", label: "TOTAL DELIVERED ORDER", value: "29", color: "#34d399" },
      { id: "inprogress_orders", icon: "⏳", label: "TOTAL INPROGRESS ORDER", value: "7", color: "#fbbf24" },
      { id: "cancel_orders", icon: "❌", label: "TOTAL CANCEL ORDER", value: "2", color: "#f87171" },
      { id: "customers", icon: "👥", label: "TOTAL CUSTOMER", value: "14", color: "#c084fc" },
      { id: "active_customers", icon: "🟢", label: "TOTAL ACTIVE CUSTOMER", value: "11", color: "#4ade80" },
      { id: "active_coupons", icon: "🏷️", label: "TOTAL ACTIVE DISCOUNT COUPON", value: "6", color: "#e879f9" },
    ]
  },
  "7days": {
    metrics: [
      { id: "revenue", icon: "💰", label: "TOTAL REVENUE", value: "₹1,84,320", color: "#a78bfa" },
      { id: "orders", icon: "📦", label: "TOTAL ORDER", value: "284", color: "#38bdf8" },
      { id: "delivered_orders", icon: "✅", label: "TOTAL DELIVERED ORDER", value: "238", color: "#34d399" },
      { id: "inprogress_orders", icon: "⏳", label: "TOTAL INPROGRESS ORDER", value: "34", color: "#fbbf24" },
      { id: "cancel_orders", icon: "❌", label: "TOTAL CANCEL ORDER", value: "12", color: "#f87171" },
      { id: "customers", icon: "👥", label: "TOTAL CUSTOMER", value: "196", color: "#c084fc" },
      { id: "active_customers", icon: "🟢", label: "TOTAL ACTIVE CUSTOMER", value: "162", color: "#4ade80" },
      { id: "active_coupons", icon: "🏷️", label: "TOTAL ACTIVE DISCOUNT COUPON", value: "8", color: "#e879f9" },
    ]
  },
  "14days": {
    metrics: [
      { id: "revenue", icon: "💰", label: "TOTAL REVENUE", value: "₹3,92,400", color: "#a78bfa" },
      { id: "orders", icon: "📦", label: "TOTAL ORDER", value: "598", color: "#38bdf8" },
      { id: "delivered_orders", icon: "✅", label: "TOTAL DELIVERED ORDER", value: "512", color: "#34d399" },
      { id: "inprogress_orders", icon: "⏳", label: "TOTAL INPROGRESS ORDER", value: "62", color: "#fbbf24" },
      { id: "cancel_orders", icon: "❌", label: "TOTAL CANCEL ORDER", value: "24", color: "#f87171" },
      { id: "customers", icon: "👥", label: "TOTAL CUSTOMER", value: "410", color: "#c084fc" },
      { id: "active_customers", icon: "🟢", label: "TOTAL ACTIVE CUSTOMER", value: "338", color: "#4ade80" },
      { id: "active_coupons", icon: "🏷️", label: "TOTAL ACTIVE DISCOUNT COUPON", value: "10", color: "#e879f9" },
    ]
  },
  "1month": {
    metrics: [
      { id: "revenue", icon: "💰", label: "TOTAL REVENUE", value: "₹8,45,600", color: "#a78bfa" },
      { id: "orders", icon: "📦", label: "TOTAL ORDER", value: "1,248", color: "#38bdf8" },
      { id: "delivered_orders", icon: "✅", label: "TOTAL DELIVERED ORDER", value: "1,092", color: "#34d399" },
      { id: "inprogress_orders", icon: "⏳", label: "TOTAL INPROGRESS ORDER", value: "114", color: "#fbbf24" },
      { id: "cancel_orders", icon: "❌", label: "TOTAL CANCEL ORDER", value: "42", color: "#f87171" },
      { id: "customers", icon: "👥", label: "TOTAL CUSTOMER", value: "920", color: "#c084fc" },
      { id: "active_customers", icon: "🟢", label: "TOTAL ACTIVE CUSTOMER", value: "784", color: "#4ade80" },
      { id: "active_coupons", icon: "🏷️", label: "TOTAL ACTIVE DISCOUNT COUPON", value: "12", color: "#e879f9" },
    ]
  },
  "3months": {
    metrics: [
      { id: "revenue", icon: "💰", label: "TOTAL REVENUE", value: "₹26,14,800", color: "#a78bfa" },
      { id: "orders", icon: "📦", label: "TOTAL ORDER", value: "3,840", color: "#38bdf8" },
      { id: "delivered_orders", icon: "✅", label: "TOTAL DELIVERED ORDER", value: "3,410", color: "#34d399" },
      { id: "inprogress_orders", icon: "⏳", label: "TOTAL INPROGRESS ORDER", value: "285", color: "#fbbf24" },
      { id: "cancel_orders", icon: "❌", label: "TOTAL CANCEL ORDER", value: "145", color: "#f87171" },
      { id: "customers", icon: "👥", label: "TOTAL CUSTOMER", value: "2,680", color: "#c084fc" },
      { id: "active_customers", icon: "🟢", label: "TOTAL ACTIVE CUSTOMER", value: "2,210", color: "#4ade80" },
      { id: "active_coupons", icon: "🏷️", label: "TOTAL ACTIVE DISCOUNT COUPON", value: "15", color: "#e879f9" },
    ]
  },
  "6months": {
    metrics: [
      { id: "revenue", icon: "💰", label: "TOTAL REVENUE", value: "₹54,80,000", color: "#a78bfa" },
      { id: "orders", icon: "📦", label: "TOTAL ORDER", value: "7,920", color: "#38bdf8" },
      { id: "delivered_orders", icon: "✅", label: "TOTAL DELIVERED ORDER", value: "7,180", color: "#34d399" },
      { id: "inprogress_orders", icon: "⏳", label: "TOTAL INPROGRESS ORDER", value: "450", color: "#fbbf24" },
      { id: "cancel_orders", icon: "❌", label: "TOTAL CANCEL ORDER", value: "290", color: "#f87171" },
      { id: "customers", icon: "👥", label: "TOTAL CUSTOMER", value: "5,420", color: "#c084fc" },
      { id: "active_customers", icon: "🟢", label: "TOTAL ACTIVE CUSTOMER", value: "4,510", color: "#4ade80" },
      { id: "active_coupons", icon: "🏷️", label: "TOTAL ACTIVE DISCOUNT COUPON", value: "18", color: "#e879f9" },
    ]
  },
  "1year": {
    metrics: [
      { id: "revenue", icon: "💰", label: "TOTAL REVENUE", value: "₹1,18,50,000", color: "#a78bfa" },
      { id: "orders", icon: "📦", label: "TOTAL ORDER", value: "16,420", color: "#38bdf8" },
      { id: "delivered_orders", icon: "✅", label: "TOTAL DELIVERED ORDER", value: "15,120", color: "#34d399" },
      { id: "inprogress_orders", icon: "⏳", label: "TOTAL INPROGRESS ORDER", value: "680", color: "#fbbf24" },
      { id: "cancel_orders", icon: "❌", label: "TOTAL CANCEL ORDER", value: "620", color: "#f87171" },
      { id: "customers", icon: "👥", label: "TOTAL CUSTOMER", value: "11,850", color: "#c084fc" },
      { id: "active_customers", icon: "🟢", label: "TOTAL ACTIVE CUSTOMER", value: "9,640", color: "#4ade80" },
      { id: "active_coupons", icon: "🏷️", label: "TOTAL ACTIVE DISCOUNT COUPON", value: "24", color: "#e879f9" },
    ]
  },
  "2years": {
    metrics: [
      { id: "revenue", icon: "💰", label: "TOTAL REVENUE", value: "₹2,45,20,000", color: "#a78bfa" },
      { id: "orders", icon: "📦", label: "TOTAL ORDER", value: "34,800", color: "#38bdf8" },
      { id: "delivered_orders", icon: "✅", label: "TOTAL DELIVERED ORDER", value: "32,150", color: "#34d399" },
      { id: "inprogress_orders", icon: "⏳", label: "TOTAL INPROGRESS ORDER", value: "1,120", color: "#fbbf24" },
      { id: "cancel_orders", icon: "❌", label: "TOTAL CANCEL ORDER", value: "1,530", color: "#f87171" },
      { id: "customers", icon: "👥", label: "TOTAL CUSTOMER", value: "24,600", color: "#c084fc" },
      { id: "active_customers", icon: "🟢", label: "TOTAL ACTIVE CUSTOMER", value: "19,840", color: "#4ade80" },
      { id: "active_coupons", icon: "🏷️", label: "TOTAL ACTIVE DISCOUNT COUPON", value: "36", color: "#e879f9" },
    ]
  },
  "3years": {
    metrics: [
      { id: "revenue", icon: "💰", label: "TOTAL REVENUE", value: "₹4,12,80,000", color: "#a78bfa" },
      { id: "orders", icon: "📦", label: "TOTAL ORDER", value: "58,900", color: "#38bdf8" },
      { id: "delivered_orders", icon: "✅", label: "TOTAL DELIVERED ORDER", value: "54,620", color: "#34d399" },
      { id: "inprogress_orders", icon: "⏳", label: "TOTAL INPROGRESS ORDER", value: "1,640", color: "#fbbf24" },
      { id: "cancel_orders", icon: "❌", label: "TOTAL CANCEL ORDER", value: "2,640", color: "#f87171" },
      { id: "customers", icon: "👥", label: "TOTAL CUSTOMER", value: "42,300", color: "#c084fc" },
      { id: "active_customers", icon: "🟢", label: "TOTAL ACTIVE CUSTOMER", value: "33,950", color: "#4ade80" },
      { id: "active_coupons", icon: "🏷️", label: "TOTAL ACTIVE DISCOUNT COUPON", value: "48", color: "#e879f9" },
    ]
  },
  custom: {
    metrics: [
      { id: "revenue", icon: "💰", label: "TOTAL REVENUE", value: "₹5,14,200", color: "#a78bfa" },
      { id: "orders", icon: "📦", label: "TOTAL ORDER", value: "712", color: "#38bdf8" },
      { id: "delivered_orders", icon: "✅", label: "TOTAL DELIVERED ORDER", value: "628", color: "#34d399" },
      { id: "inprogress_orders", icon: "⏳", label: "TOTAL INPROGRESS ORDER", value: "59", color: "#fbbf24" },
      { id: "cancel_orders", icon: "❌", label: "TOTAL CANCEL ORDER", value: "25", color: "#f87171" },
      { id: "customers", icon: "👥", label: "TOTAL CUSTOMER", value: "540", color: "#c084fc" },
      { id: "active_customers", icon: "🟢", label: "TOTAL ACTIVE CUSTOMER", value: "462", color: "#4ade80" },
      { id: "active_coupons", icon: "🏷️", label: "TOTAL ACTIVE DISCOUNT COUPON", value: "10", color: "#e879f9" },
    ]
  }
};

const ORDER_STATUS_CONFIG = {
  "new": { label: "New", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.16)" },
  "packed": { label: "Packed", color: "#38bdf8", bg: "rgba(56, 189, 248, 0.12)" },
  "order placed": { label: "Order Placed", color: "#a78bfa", bg: "rgba(167, 139, 250, 0.12)" },
  "shipped": { label: "Shipped", color: "#818cf8", bg: "rgba(129, 140, 248, 0.12)" },
  "out of delivery": { label: "Out of Delivery", color: "#fbbf24", bg: "rgba(251, 191, 36, 0.12)" },
  "delivered": { label: "Delivered", color: "#34d399", bg: "rgba(52, 211, 153, 0.12)" },
  "cancel": { label: "Cancelled", color: "#f87171", bg: "rgba(248, 113, 113, 0.12)" },
  "return": { label: "Return Started", color: "#fb923c", bg: "rgba(251, 146, 60, 0.12)" },
  "refund": { label: "Return Completed", color: "#e879f9", bg: "rgba(232, 121, 249, 0.12)" },
};

const ORDER_STATUS_LIST = [
  "new",
  "packed",
  "order placed",
  "shipped",
  "out of delivery",
  "delivered",
  "cancel",
  "return",
  "refund",
];

const ALL_ORDERS = [
  { id: "#ORD-9924", customer: "Kabir Malhotra", phone: "+91 98711 55443", email: "kabir.m@example.com", items: "MacBook Air M3 (x1)", amount: "₹1,14,900", paymentType: "Paid", status: "new", shippingMethod: "", trackingNumber: "", date: "2026-10-27", time: "Just now, 03:25 PM", rating: null, ratingComment: "" },
  { id: "#ORD-9923", customer: "Priyanka Roy", phone: "+91 98310 99887", email: "priyanka.roy@example.com", items: "Sony WH-1000XM5 (x1)", amount: "₹29,990", paymentType: "COD", status: "order placed", shippingMethod: "Pending Courier Assignment", trackingNumber: "TRK-PENDING", date: "2026-10-27", time: "Just now, 03:15 PM", rating: null, ratingComment: "" },
  { id: "#ORD-9922", customer: "Rohan Kapoor", phone: "+91 98101 22334", email: "rohan.k@example.com", items: "Apple iPad Air M2 (x1)", amount: "₹59,900", paymentType: "Paid", status: "order placed", shippingMethod: "Pending Courier Assignment", trackingNumber: "TRK-PENDING", date: "2026-10-27", time: "Just now, 02:40 PM", rating: null, ratingComment: "" },
  { id: "#ORD-9921", customer: "Sophia Taylor", phone: "+91 98765 43210", email: "sophia@example.com", items: "Airpods Pro Max (x1)", amount: "₹45,540", paymentType: "Paid", status: "delivered", shippingMethod: "Express Delivery (BlueDart)", trackingNumber: "BD-98214-IN", date: "2026-10-27", time: "Today, 11:20 AM", rating: 5, ratingComment: "Exceptional audio clarity and lightning fast delivery!" },
  { id: "#ORD-9920", customer: "Marcus Vance", phone: "+91 98234 56789", email: "marcus@example.com", items: "Nike Air Zoom (x2)", amount: "₹26,800", paymentType: "COD", status: "out of delivery", shippingMethod: "Delhivery Surface", trackingNumber: "DL-44821-X", date: "2026-10-27", time: "Today, 09:45 AM", rating: null, ratingComment: "" },
  { id: "#ORD-9919", customer: "Elena Rostova", phone: "+91 97112 34567", email: "elena@example.com", items: "Leather Backpack (x1)", amount: "₹15,400", paymentType: "Paid", status: "packed", shippingMethod: "", trackingNumber: "", date: "2026-10-26", time: "Yesterday, 04:15 PM", rating: null, ratingComment: "" },
  { id: "#ORD-9918", customer: "David Kim", phone: "+91 96554 12345", email: "david@example.com", items: "Smart Watch Ultra", amount: "₹67,900", paymentType: "COD", status: "cancel", shippingMethod: "Standard Air", trackingNumber: "SA-88310-C", date: "2026-10-25", time: "Oct 25, 2026", rating: null, ratingComment: "" },
  { id: "#ORD-9917", customer: "Ananya Sharma", phone: "+91 98450 98765", email: "ananya@example.com", items: "Running Shoes (x1)", amount: "₹12,490", paymentType: "COD", status: "delivered", shippingMethod: "BlueDart Express", trackingNumber: "BD-55923-IN", date: "2026-10-24", time: "Oct 24, 2026", rating: 5, ratingComment: "Perfect fit and very comfortable during long runs." },
  { id: "#ORD-9916", customer: "Liam Johnson", phone: "+91 99887 65432", email: "liam@example.com", items: "Wireless Charger (x2)", amount: "₹8,900", paymentType: "Paid", status: "shipped", shippingMethod: "FedEx Standard", trackingNumber: "FX-30219-B", date: "2026-10-20", time: "Oct 20, 2026", rating: null, ratingComment: "" },
  { id: "#ORD-9915", customer: "Pooja Patel", phone: "+91 98199 88776", email: "pooja@example.com", items: "Noise-Cancel Earbuds", amount: "₹14,200", paymentType: "COD", status: "delivered", shippingMethod: "Delhivery Air", trackingNumber: "DL-66120-A", date: "2026-10-15", time: "Oct 15, 2026", rating: 5, ratingComment: "Active noise cancellation works brilliantly!" },
  { id: "#ORD-9914", customer: "Carlos Mendez", phone: "+91 97654 32109", email: "carlos@example.com", items: "Classic Denim Jacket", amount: "₹9,500", paymentType: "COD", status: "order placed", shippingMethod: "Ecom Express", trackingNumber: "EC-22910-K", date: "2026-10-02", time: "Oct 02, 2026", rating: null, ratingComment: "" },
  { id: "#ORD-9913", customer: "Zoe Chen", phone: "+91 98333 44556", email: "zoe@example.com", items: "Leather Wallet (x2)", amount: "₹6,400", paymentType: "Paid", status: "return", shippingMethod: "Reverse Pickup (BlueDart)", trackingNumber: "RP-10029-R", date: "2026-09-18", time: "Sep 18, 2026", rating: 3, ratingComment: "Slight shade variance from website image." },
  { id: "#ORD-9912", customer: "Aarav Mehta", phone: "+91 98200 11223", email: "aarav@example.com", items: "Electric Kettle Pro", amount: "₹7,800", paymentType: "COD", status: "delivered", shippingMethod: "DTDC Standard", trackingNumber: "DT-77401-M", date: "2026-08-11", time: "Aug 11, 2026", rating: 5, ratingComment: "Heats water in under 60 seconds, great build." },
  { id: "#ORD-9911", customer: "Emma Wilson", phone: "+91 99400 55667", email: "emma@example.com", items: "Running Sneakers Pro", amount: "₹18,900", paymentType: "Paid", status: "refund", shippingMethod: "Refund Processed via Bank", trackingNumber: "RF-99412-Z", date: "2026-05-19", time: "May 19, 2026", rating: 2, ratingComment: "Size was smaller than expected, refunded quickly." },
  { id: "#ORD-9910", customer: "Rahul Verma", phone: "+91 98111 22334", email: "rahul@example.com", items: "4K Home Projector", amount: "₹89,000", paymentType: "Paid", status: "delivered", shippingMethod: "Express Delivery (BlueDart)", trackingNumber: "BD-11029-IN", date: "2025-11-04", time: "Nov 04, 2025", rating: 5, ratingComment: "Cinema grade visuals in my living room. Worth every rupee!" },
];

const ORDERS_STATS_BY_PERIOD = {
  today: [
    { icon: "📦", label: "TOTAL ORDERS", value: "38", color: "#38bdf8" },
    { icon: "💳", label: "TOTAL PAID ORDER", value: "28", color: "#a78bfa" },
    { icon: "💵", label: "TOTAL COD ORDER", value: "10", color: "#f59e0b" },
    { icon: "✅", label: "DELIVERED", value: "29", color: "#34d399" },
    { icon: "⏳", label: "IN PROGRESS", value: "7", color: "#fbbf24" },
    { icon: "❌", label: "CANCELLED", value: "2", color: "#f87171" }
  ],
  "7days": [
    { icon: "📦", label: "TOTAL ORDERS", value: "284", color: "#38bdf8" },
    { icon: "💳", label: "TOTAL PAID ORDER", value: "216", color: "#a78bfa" },
    { icon: "💵", label: "TOTAL COD ORDER", value: "68", color: "#f59e0b" },
    { icon: "✅", label: "DELIVERED", value: "238", color: "#34d399" },
    { icon: "⏳", label: "IN PROGRESS", value: "34", color: "#fbbf24" },
    { icon: "❌", label: "CANCELLED", value: "12", color: "#f87171" }
  ],
  "14days": [
    { icon: "📦", label: "TOTAL ORDERS", value: "598", color: "#38bdf8" },
    { icon: "💳", label: "TOTAL PAID ORDER", value: "462", color: "#a78bfa" },
    { icon: "💵", label: "TOTAL COD ORDER", value: "136", color: "#f59e0b" },
    { icon: "✅", label: "DELIVERED", value: "512", color: "#34d399" },
    { icon: "⏳", label: "IN PROGRESS", value: "62", color: "#fbbf24" },
    { icon: "❌", label: "CANCELLED", value: "24", color: "#f87171" }
  ],
  "1month": [
    { icon: "📦", label: "TOTAL ORDERS", value: "1,248", color: "#38bdf8" },
    { icon: "💳", label: "TOTAL PAID ORDER", value: "964", color: "#a78bfa" },
    { icon: "💵", label: "TOTAL COD ORDER", value: "284", color: "#f59e0b" },
    { icon: "✅", label: "DELIVERED", value: "1,092", color: "#34d399" },
    { icon: "⏳", label: "IN PROGRESS", value: "114", color: "#fbbf24" },
    { icon: "❌", label: "CANCELLED", value: "42", color: "#f87171" }
  ],
  "3months": [
    { icon: "📦", label: "TOTAL ORDERS", value: "3,840", color: "#38bdf8" },
    { icon: "💳", label: "TOTAL PAID ORDER", value: "2,980", color: "#a78bfa" },
    { icon: "💵", label: "TOTAL COD ORDER", value: "860", color: "#f59e0b" },
    { icon: "✅", label: "DELIVERED", value: "3,410", color: "#34d399" },
    { icon: "⏳", label: "IN PROGRESS", value: "285", color: "#fbbf24" },
    { icon: "❌", label: "CANCELLED", value: "145", color: "#f87171" }
  ],
  "6months": [
    { icon: "📦", label: "TOTAL ORDERS", value: "7,920", color: "#38bdf8" },
    { icon: "💳", label: "TOTAL PAID ORDER", value: "6,180", color: "#a78bfa" },
    { icon: "💵", label: "TOTAL COD ORDER", value: "1,740", color: "#f59e0b" },
    { icon: "✅", label: "DELIVERED", value: "7,180", color: "#34d399" },
    { icon: "⏳", label: "IN PROGRESS", value: "450", color: "#fbbf24" },
    { icon: "❌", label: "CANCELLED", value: "290", color: "#f87171" }
  ],
  "1year": [
    { icon: "📦", label: "TOTAL ORDERS", value: "16,420", color: "#38bdf8" },
    { icon: "💳", label: "TOTAL PAID ORDER", value: "12,940", color: "#a78bfa" },
    { icon: "💵", label: "TOTAL COD ORDER", value: "3,480", color: "#f59e0b" },
    { icon: "✅", label: "DELIVERED", value: "15,120", color: "#34d399" },
    { icon: "⏳", label: "IN PROGRESS", value: "680", color: "#fbbf24" },
    { icon: "❌", label: "CANCELLED", value: "620", color: "#f87171" }
  ],
  "2years": [
    { icon: "📦", label: "TOTAL ORDERS", value: "34,800", color: "#38bdf8" },
    { icon: "💳", label: "TOTAL PAID ORDER", value: "27,500", color: "#a78bfa" },
    { icon: "💵", label: "TOTAL COD ORDER", value: "7,300", color: "#f59e0b" },
    { icon: "✅", label: "DELIVERED", value: "32,150", color: "#34d399" },
    { icon: "⏳", label: "IN PROGRESS", value: "1,120", color: "#fbbf24" },
    { icon: "❌", label: "CANCELLED", value: "1,530", color: "#f87171" }
  ],
  "3years": [
    { icon: "📦", label: "TOTAL ORDERS", value: "58,900", color: "#38bdf8" },
    { icon: "💳", label: "TOTAL PAID ORDER", value: "46,800", color: "#a78bfa" },
    { icon: "💵", label: "TOTAL COD ORDER", value: "12,100", color: "#f59e0b" },
    { icon: "✅", label: "DELIVERED", value: "54,620", color: "#34d399" },
    { icon: "⏳", label: "IN PROGRESS", value: "1,640", color: "#fbbf24" },
    { icon: "❌", label: "CANCELLED", value: "2,640", color: "#f87171" }
  ],
  custom: [
    { icon: "📦", label: "TOTAL ORDERS", value: "712", color: "#38bdf8" },
    { icon: "💳", label: "TOTAL PAID ORDER", value: "548", color: "#a78bfa" },
    { icon: "💵", label: "TOTAL COD ORDER", value: "164", color: "#f59e0b" },
    { icon: "✅", label: "DELIVERED", value: "628", color: "#34d399" },
    { icon: "⏳", label: "IN PROGRESS", value: "59", color: "#fbbf24" },
    { icon: "❌", label: "CANCELLED", value: "25", color: "#f87171" }
  ],
};

/* ═══════════════════ Order Details Subpage Component ═══════════════════ */
function OrderDetailsSubpage({ ordersList, updateOrderField }) {
  const { orderId } = useParams();
  const navigate = useNavigate();

  // Find order by matching raw ID or decoded ID (with or without #)
  const decodedId = decodeURIComponent(orderId || "");
  const order = ordersList.find(
    o => o.id === decodedId || o.id === `#${decodedId}` || o.id.replace("#", "") === decodedId.replace("#", "")
  );

  // Local draft state for fulfillment fields so changes are only applied upon clicking Submit
  const [statusVal, setStatusVal] = useState(order ? order.status : "new");
  const [shippingVal, setShippingVal] = useState(order ? (order.shippingMethod || "") : "");
  const [trackingVal, setTrackingVal] = useState(order ? (order.trackingNumber || "") : "");
  const [formError, setFormError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if order changes
  useEffect(() => {
    if (order) {
      setStatusVal(order.status);
      setShippingVal(order.shippingMethod || "");
      setTrackingVal(order.trackingNumber || "");
      setFormError("");
      setSaveSuccess(false);
    }
  }, [order?.id]);

  if (!order) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📦</div>
        <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Order Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          The requested order ID <code>{decodedId}</code> does not exist or has been removed.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/orders")}>
          ← Back to Orders
        </button>
      </div>
    );
  }

  const currentStatusConf = ORDER_STATUS_CONFIG[order.status] || {
    label: order.status,
    color: "#a78bfa",
    bg: "rgba(167, 139, 250, 0.12)",
  };

  const isExempt = statusVal === "new" || statusVal === "packed";

  const handleStatusChange = (newStatus) => {
    setStatusVal(newStatus);
    setFormError("");
    setSaveSuccess(false);
    if (newStatus === "new" || newStatus === "packed") {
      setShippingVal("");
      setTrackingVal("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setSaveSuccess(false);

    // Except for 'new' and 'packed', all three fields are compulsory
    if (!isExempt) {
      if (!shippingVal.trim()) {
        const statusLabel = ORDER_STATUS_CONFIG[statusVal]?.label || statusVal;
        setFormError(`Shipping Method is compulsory for status "${statusLabel}". Please enter the shipping method to update status.`);
        return;
      }
      if (!trackingVal.trim()) {
        const statusLabel = ORDER_STATUS_CONFIG[statusVal]?.label || statusVal;
        setFormError(`Tracking Number is compulsory for status "${statusLabel}". Please enter the tracking number to update status.`);
        return;
      }
    }

    // Apply updates to the order
    updateOrderField(order.id, "status", statusVal);
    updateOrderField(order.id, "shippingMethod", isExempt ? "" : shippingVal.trim());
    updateOrderField(order.id, "trackingNumber", isExempt ? "" : trackingVal.trim());

    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 4000);
  };

  return (
    <div className="order-details-subpage" style={{ paddingBottom: "3rem" }}>
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
            onClick={() => navigate("/orders")}
            style={{
              padding: "0.45rem 0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            ← Back to Orders
          </button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h1 className="page-title" style={{ margin: 0 }}>Order Details</h1>
              <span
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  color: "var(--purple-light)",
                  background: "var(--purple-bg)",
                  padding: "2px 10px",
                  borderRadius: "6px",
                  border: "1px solid rgba(167, 139, 250, 0.3)",
                }}
              >
                {order.id}
              </span>
            </div>
            <p className="page-subtitle" style={{ margin: "0.25rem 0 0" }}>
              Placed on {order.time || order.date} • Reference ID: {order.id}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "0.82rem",
              fontWeight: 700,
              color: currentStatusConf.color,
              background: currentStatusConf.bg,
              border: `1px solid ${currentStatusConf.color}40`,
            }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: currentStatusConf.color }} />
            {currentStatusConf.label.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Main Grid: Info Cards + Action / Edit Panels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Customer & Contact Card */}
        <div className="stat-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.6rem" }}>
            <span style={{ fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.88rem" }}>👤 Customer Information</span>
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>Verified Account</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>{order.customer}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "var(--purple-light)", fontWeight: 600 }}>
              <span>📞 Phone:</span>
              <span style={{ userSelect: "all" }}>{order.phone || "+91 98765 43210"}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
              <span>✉️ Email:</span>
              <span style={{ userSelect: "all" }}>{order.email}</span>
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              📍 <strong>Delivery Address:</strong><br />
              Plot #42, Tech City Road, HSR Sector 2, Bengaluru, Karnataka, 560102
            </div>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="stat-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.6rem" }}>
            <span style={{ fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.88rem" }}>💳 Payment &amp; Items</span>
            <span style={{
              fontSize: "0.75rem",
              color: order.paymentType === "COD" ? "#f59e0b" : "#34d399",
              background: order.paymentType === "COD" ? "rgba(245, 158, 11, 0.12)" : "rgba(52, 211, 153, 0.12)",
              padding: "2px 8px",
              borderRadius: "6px",
              fontWeight: 600,
            }}>
              {order.paymentType === "COD" ? "Cash on Delivery (COD)" : "Prepaid (Online)"}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Ordered Items:</span>
              <span style={{ color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>{order.items}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Subtotal:</span>
              <span style={{ color: "#fff" }}>{order.amount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Shipping Fee:</span>
              <span style={{ color: "#34d399", fontWeight: 600 }}>FREE</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed var(--border-color)", paddingTop: "0.5rem", marginTop: "0.25rem" }}>
              <span style={{ color: "var(--text-primary)", fontWeight: 700, fontSize: "1rem" }}>
                {order.paymentType === "COD" ? "Payable on Delivery:" : "Total Paid:"}
              </span>
              <span style={{ color: "var(--purple-light)", fontWeight: 800, fontSize: "1.2rem" }}>
                {order.amount} <span style={{ fontSize: "0.85rem", fontWeight: 600, color: order.paymentType === "COD" ? "#f59e0b" : "#34d399" }}>({order.paymentType || "Paid"})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Customer Rating & Review Card */}
        {(() => {
          const isDeliveryOrReturn = order.status === "delivered" || order.status === "return" || order.status === "refund";
          return (
            <div className="stat-card" style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "0.8rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.6rem" }}>
                <span style={{ fontWeight: 600, color: "var(--text-secondary)", fontSize: "0.88rem" }}>⭐ Order &amp; Delivery Rating</span>
                <span style={{
                  fontSize: "0.75rem",
                  color: isDeliveryOrReturn && order.rating ? "#fbbf24" : "var(--text-muted)",
                  background: isDeliveryOrReturn && order.rating ? "rgba(245, 158, 11, 0.12)" : "rgba(255, 255, 255, 0.05)",
                  padding: "2px 8px",
                  borderRadius: "6px",
                  fontWeight: 600,
                }}>
                  {!isDeliveryOrReturn ? "Pending Delivery" : order.rating ? `${order.rating} / 5 Stars` : "Not Rated Yet"}
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {isDeliveryOrReturn ? (
                  <>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ display: "flex", gap: "3px", fontSize: "1.3rem" }}>
                        {[1, 2, 3, 4, 5].map(star => (
                          <span
                            key={star}
                            style={{
                              color: star <= (order.rating || 0) ? "#fbbf24" : "#4b5563",
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span style={{ fontSize: "1.1rem", fontWeight: 800, color: order.rating ? "#fff" : "var(--text-muted)" }}>
                        {order.rating ? `${order.rating}.0` : "Not Rated"}
                      </span>
                    </div>
                    <div>
                      <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", marginBottom: "4px" }}>Customer Feedback:</div>
                      <div style={{
                        fontSize: "0.88rem",
                        color: order.ratingComment ? "var(--text-primary)" : "var(--text-muted)",
                        fontStyle: order.ratingComment ? "normal" : "italic",
                        background: "rgba(255, 255, 255, 0.02)",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        border: "1px solid var(--border-color)",
                      }}>
                        {order.ratingComment || "No written review submitted yet by the customer."}
                      </div>
                    </div>
                  </>
                ) : (
                  <div style={{ padding: "0.75rem 0", color: "var(--text-muted)", fontSize: "0.84rem" }}>
                    <span>🚚 Ratings &amp; customer reviews are unlocked once the order reaches <strong>Delivered</strong> or <strong>Return</strong> status.</span>
                  </div>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Manual Editable Fields Section with Form Validation & Submit Button */}
      <form
        onSubmit={handleSubmit}
        className="dashboard-filter-card"
        style={{
          padding: "1.5rem",
          borderRadius: "12px",
          marginBottom: "1.5rem",
        }}
      >
        <div style={{ marginBottom: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <div>
            <h3 style={{ margin: "0 0 0.25rem", color: "#fff", fontSize: "1.05rem", display: "flex", alignItems: "center", gap: "8px" }}>
              <span>✏️ Manage Order Status &amp; Fulfillment</span>
            </h3>
            <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.82rem" }}>
              Update order status, shipping method, and tracking number. Click Submit to save changes.
            </p>
          </div>
        </div>

        {/* Validation Error Banner */}
        {formError && (
          <div
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(239, 68, 68, 0.12)",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: "8px",
              color: "#fca5a5",
              fontSize: "0.88rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>⚠️</span>
            <span>{formError}</span>
          </div>
        )}

        {/* Success Confirmation Banner */}
        {saveSuccess && (
          <div
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(52, 211, 153, 0.15)",
              border: "1px solid rgba(52, 211, 153, 0.35)",
              borderRadius: "8px",
              color: "#34d399",
              fontSize: "0.88rem",
              marginBottom: "1.25rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>✅</span>
            <span>Order status and fulfillment details updated successfully!</span>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {/* Order Status Select */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Order Status: <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <select
              value={statusVal}
              onChange={(e) => handleStatusChange(e.target.value)}
              style={{
                background: "var(--bg-input, #1e2230)",
                color: "#fff",
                border: "1px solid var(--border-color, #2d3348)",
                borderRadius: "8px",
                padding: "0.6rem 0.8rem",
                fontSize: "0.88rem",
                cursor: "pointer",
              }}
            >
              {ORDER_STATUS_LIST.map((st) => (
                <option key={st} value={st} style={{ background: "#161922", color: "#fff" }}>
                  {ORDER_STATUS_CONFIG[st]?.label || st}
                </option>
              ))}
            </select>
          </div>

          {/* Shipping Method Input */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                Shipping Method: {!isExempt && <span style={{ color: "#ef4444" }}>*</span>}
              </label>
              {isExempt && (
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                  🔒 Locked in {ORDER_STATUS_CONFIG[statusVal]?.label || statusVal}
                </span>
              )}
            </div>
            <input
              type="text"
              value={shippingVal}
              placeholder={isExempt ? "Available once shipped" : "e.g. Express Delivery (BlueDart)"}
              disabled={isExempt}
              onChange={(e) => {
                setShippingVal(e.target.value);
                setFormError("");
              }}
              style={{
                background: isExempt ? "rgba(255, 255, 255, 0.03)" : "var(--bg-input, #1e2230)",
                color: isExempt ? "var(--text-muted)" : "#fff",
                border: formError && !isExempt && !shippingVal.trim() ? "1px solid #ef4444" : "1px solid var(--border-color, #2d3348)",
                borderRadius: "8px",
                padding: "0.6rem 0.8rem",
                fontSize: "0.88rem",
                cursor: isExempt ? "not-allowed" : "text",
                opacity: isExempt ? 0.6 : 1,
              }}
            />
          </div>

          {/* Tracking Number Input */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                Tracking Number: {!isExempt && <span style={{ color: "#ef4444" }}>*</span>}
              </label>
              {isExempt && (
                <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontStyle: "italic" }}>
                  🔒 Locked in {ORDER_STATUS_CONFIG[statusVal]?.label || statusVal}
                </span>
              )}
            </div>
            <input
              type="text"
              value={trackingVal}
              placeholder={isExempt ? "Available once shipped" : "e.g. BD-98214-IN"}
              disabled={isExempt}
              onChange={(e) => {
                setTrackingVal(e.target.value);
                setFormError("");
              }}
              style={{
                background: isExempt ? "rgba(255, 255, 255, 0.03)" : "var(--bg-input, #1e2230)",
                color: isExempt ? "var(--text-muted)" : "#fff",
                border: formError && !isExempt && !trackingVal.trim() ? "1px solid #ef4444" : "1px solid var(--border-color, #2d3348)",
                borderRadius: "8px",
                padding: "0.6rem 0.8rem",
                fontSize: "0.88rem",
                fontFamily: "monospace",
                cursor: isExempt ? "not-allowed" : "text",
                opacity: isExempt ? 0.6 : 1,
              }}
            />
          </div>
        </div>

        {/* Submit Button Section */}
        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--border-color, #2d3348)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: "0.6rem 1.6rem",
              fontWeight: 600,
              fontSize: "0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <span>💾</span> Submit Changes
          </button>
        </div>
      </form>
    </div>
  );
}

/* ═══════════════════ Product Details Subpage Component ═══════════════════ */
function ProductDetailsSubpage({ productsList, onArchiveProduct }) {
  const { productId } = useParams();
  const navigate = useNavigate();

  const product = productsList.find(p => String(p.id) === String(productId));

  if (!product) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛍️</div>
        <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Product Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          The requested product ID <code>{productId}</code> does not exist or has been removed.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/products")}>
          ← Back to Products
        </button>
      </div>
    );
  }

  const mediaList = product.mediaFiles && product.mediaFiles.length > 0
    ? product.mediaFiles
    : product.img && product.img.startsWith("http")
      ? [{ type: "image", url: product.img, name: product.name }]
      : [];

  return (
    <div className="product-details-subpage" style={{ paddingBottom: "3rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header with Back button & Edit / Archive Product actions */}
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
            onClick={() => navigate("/products")}
            style={{
              padding: "0.45rem 0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            ← Back to Products
          </button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h1 className="page-title" style={{ margin: 0 }}>Product Details</h1>
              <span
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--purple-light)",
                  background: "var(--purple-bg)",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  border: "1px solid rgba(167, 139, 250, 0.3)",
                  fontFamily: "monospace",
                }}
              >
                {product.sku}
              </span>
            </div>
            <p className="page-subtitle" style={{ margin: "0.25rem 0 0" }}>
              Added on {product.date} • Catalog ID: #{product.id}
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {onArchiveProduct && (
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => onArchiveProduct(product)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "0.55rem 1rem",
                fontWeight: 600,
                cursor: "pointer",
                color: product.status === "archived" ? "#34d399" : "#fbbf24",
                borderColor: product.status === "archived" ? "rgba(52, 211, 153, 0.4)" : "rgba(251, 191, 36, 0.4)",
                background: product.status === "archived" ? "rgba(52, 211, 153, 0.08)" : "rgba(251, 191, 36, 0.08)",
              }}
              title={product.status === "archived" ? "Unarchive this product" : "Archive this product"}
            >
              <span>{product.status === "archived" ? "📦" : "📁"}</span>
              <span>{product.status === "archived" ? "Unarchive" : "Archived"}</span>
            </button>
          )}

          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(`/products/${product.id}/edit`)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "0.55rem 1.25rem",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            <span>✏️</span>
            <span>Edit Product</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Info Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        {/* Basic Information Card */}
        <div className="stat-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid var(--border-color)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              {product.img && product.img.startsWith("http") ? (
                <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                product.img || "🛍️"
              )}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <h2 style={{ margin: "0 0 0.3rem", fontSize: "1.2rem", color: "#fff", fontWeight: 700, wordBreak: "break-word" }}>
                {product.name}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)", background: "rgba(255, 255, 255, 0.04)", padding: "2px 8px", borderRadius: "6px" }}>
                  📂 {product.category || "Uncategorized"}
                </span>
                <span className={`status-badge status-${product.status}`}>
                  <span className="status-dot" />
                  {product.status ? product.status.toUpperCase() : "ACTIVE"}
                </span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: "1px solid var(--border-color)", paddingTop: "0.85rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <div style={{ fontSize: "0.82rem", color: "var(--text-muted)", fontWeight: 600 }}>Description:</div>
            <div
              style={{
                fontSize: "0.88rem",
                color: product.description ? "var(--text-primary)" : "var(--text-muted)",
                fontStyle: product.description ? "normal" : "italic",
                lineHeight: 1.5,
                background: "rgba(255, 255, 255, 0.02)",
                padding: "10px 12px",
                borderRadius: "8px",
                border: "1px solid var(--border-color)",
                whiteSpace: "pre-line",
              }}
            >
              {product.description || "No detailed description provided for this product yet."}
            </div>
          </div>
        </div>

        {/* Pricing, Inventory & Ratings Card */}
        <div className="stat-card" style={{ padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ fontWeight: 700, color: "var(--text-secondary)", fontSize: "0.92rem", borderBottom: "1px solid var(--border-color)", paddingBottom: "0.6rem" }}>
            💰 Pricing, Stock &amp; Ratings
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "12px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginBottom: "4px" }}>ACTUAL PRICE</div>
              <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--purple-light)" }}>
                {product.price || "₹0.00"}
              </div>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "12px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginBottom: "4px" }}>SELL / CUT PRICE</div>
              <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text-primary)" }}>
                {product.sellPrice || "—"}
              </div>
            </div>

            <div style={{ background: "rgba(255, 255, 255, 0.02)", padding: "12px", borderRadius: "10px", border: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: "0.76rem", color: "var(--text-muted)", marginBottom: "4px" }}>CURRENT STOCK</div>
              <div
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: Number(product.stock) === 0 ? "#f87171" : Number(product.stock) < 10 ? "#fbbf24" : "#34d399",
                }}
              >
                {product.stock} <span style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--text-muted)" }}>units</span>
              </div>
            </div>

            <div
              onClick={() => navigate(`/products/${product.id}/reviews`)}
              title="Click to view all customer reviews and ratings"
              style={{
                background: "rgba(245, 158, 11, 0.05)",
                padding: "12px",
                borderRadius: "10px",
                border: "1px solid rgba(245, 158, 11, 0.25)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(245, 158, 11, 0.12)";
                e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.45)";
                e.currentTarget.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(245, 158, 11, 0.05)";
                e.currentTarget.style.borderColor = "rgba(245, 158, 11, 0.25)";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                <span style={{ fontSize: "0.76rem", color: "#fbbf24", fontWeight: 700 }}>CUSTOMER RATING</span>
                <span style={{ fontSize: "0.74rem", color: "var(--purple-light)", fontWeight: 600 }}>View All →</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ color: "#fbbf24", fontSize: "1.1rem" }}>★</span>
                <span style={{ fontSize: "1.2rem", fontWeight: 800, color: "#fff" }}>
                  {product.rating || "5.0"}
                </span>
                <span style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                  ({product.reviewsCount || 0} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Media Gallery / Uploaded Assets Section */}
      <div className="stat-card" style={{ padding: "1.5rem" }}>
        <div style={{ marginBottom: "1rem" }}>
          <h3 style={{ margin: "0 0 0.25rem", fontSize: "1rem", color: "#fff" }}>📸 Media &amp; Product Gallery</h3>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.8rem" }}>
            Uploaded images and showcase assets for this catalog product
          </p>
        </div>

        {mediaList.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "1rem" }}>
            {mediaList.map((media, idx) => (
              <div
                key={idx}
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  border: "1px solid var(--border-color)",
                  background: "rgba(255, 255, 255, 0.03)",
                  position: "relative",
                  aspectRatio: "1",
                }}
              >
                {media.type === "video" ? (
                  <video
                    src={media.url}
                    controls
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <img
                    src={media.url}
                    alt={media.name || `Product media ${idx + 1}`}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
                {idx === 0 && (
                  <span
                    style={{
                      position: "absolute",
                      bottom: "6px",
                      left: "6px",
                      background: "rgba(167, 139, 250, 0.9)",
                      color: "#fff",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    Primary
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", background: "rgba(255, 255, 255, 0.01)", borderRadius: "8px", border: "1px dashed var(--border-color)" }}>
            <span style={{ fontSize: "2rem", display: "block", marginBottom: "0.5rem" }}>🖼️</span>
            <span>No extra images or videos uploaded yet. Default icon: {product.img || "🛍️"}</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════ Product Customer Reviews Subpage Component ═══════════════════ */
function ProductReviewsSubpage({ productsList, onDeleteReview }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [filterStar, setFilterStar] = useState("all");
  const [searchReview, setSearchReview] = useState("");
  const [reviewToDelete, setReviewToDelete] = useState(null);

  const product = productsList.find(p => String(p.id) === String(productId));

  if (!product) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛍️</div>
        <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Product Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          The requested product ID <code>{productId}</code> does not exist or has been removed.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/products")}>
          ← Back to Products
        </button>
      </div>
    );
  }

  const reviewsList = product.reviews || [];

  const filteredReviews = reviewsList.filter(rev => {
    if (filterStar !== "all" && String(rev.rating) !== filterStar) return false;
    if (searchReview.trim()) {
      const q = searchReview.toLowerCase();
      const matchName = (rev.customerName || "").toLowerCase().includes(q);
      const matchEmail = (rev.customerEmail || "").toLowerCase().includes(q);
      const matchComment = (rev.comment || "").toLowerCase().includes(q);
      if (!matchName && !matchEmail && !matchComment) return false;
    }
    return true;
  });

  const handleDeleteConfirm = () => {
    if (!reviewToDelete) return;
    onDeleteReview(product.id, reviewToDelete.id);
    setReviewToDelete(null);
  };

  return (
    <div className="product-reviews-subpage" style={{ paddingBottom: "3rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header with Navigation */}
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
            onClick={() => navigate(`/products/${product.id}`)}
            style={{
              padding: "0.45rem 0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            ← Back to Product Details
          </button>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <h1 className="page-title" style={{ margin: 0 }}>Customer Reviews &amp; Ratings</h1>
              <span
                style={{
                  fontSize: "0.95rem",
                  fontWeight: 700,
                  color: "var(--purple-light)",
                  background: "var(--purple-bg)",
                  padding: "3px 10px",
                  borderRadius: "6px",
                  border: "1px solid rgba(167, 139, 250, 0.3)",
                  fontFamily: "monospace",
                }}
              >
                {product.sku}
              </span>
            </div>
            <p className="page-subtitle" style={{ margin: "0.25rem 0 0" }}>
              Verified customer feedback and ratings for <strong>{product.name}</strong>
            </p>
          </div>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.25rem",
          marginBottom: "1.5rem",
        }}
      >
        <div className="stat-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(245, 158, 11, 0.12)",
              border: "1px solid rgba(245, 158, 11, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.8rem",
              color: "#fbbf24",
            }}
          >
            ★
          </div>
          <div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>OVERALL RATING</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", display: "flex", alignItems: "baseline", gap: "6px" }}>
              <span>{product.rating || "5.0"}</span>
              <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>/ 5.0</span>
            </div>
          </div>
        </div>

        <div className="stat-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
            }}
          >
            💬
          </div>
          <div>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>TOTAL REVIEWS</div>
            <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff" }}>
              {reviewsList.length} <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: 500 }}>submitted</span>
            </div>
          </div>
        </div>

        <div className="stat-card" style={{ padding: "1.25rem", display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "14px",
              background: "rgba(52, 211, 153, 0.12)",
              border: "1px solid rgba(52, 211, 153, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
            }}
          >
            🛍️
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", fontWeight: 600 }}>PRODUCT</div>
            <div style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {product.name}
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="stat-card" style={{ padding: "1rem 1.25rem", marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", flex: 1 }}>
            <div style={{ position: "relative", minWidth: "220px", flex: 1, display: "flex", alignItems: "center" }}>
              <input
                type="text"
                placeholder="Search reviews by customer name, email, or keyword..."
                value={searchReview}
                onChange={e => setSearchReview(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--bg-input, #1e2230)",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "0.55rem 2.2rem 0.55rem 0.9rem",
                  color: "#fff",
                  fontSize: "0.86rem",
                }}
              />
              {searchReview && (
                <button
                  type="button"
                  onClick={() => setSearchReview("")}
                  title="Clear search"
                  style={{
                    position: "absolute",
                    right: "10px",
                    background: "rgba(255, 255, 255, 0.08)",
                    border: "none",
                    color: "var(--text-muted)",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    transition: "all 0.15s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.18)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "var(--text-muted)";
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)";
                  }}
                >
                  ✕
                </button>
              )}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>Filter:</span>
              <select
                value={filterStar}
                onChange={e => setFilterStar(e.target.value)}
                style={{
                  background: "var(--bg-input, #1e2230)",
                  color: "#fff",
                  border: "1px solid var(--border-color)",
                  borderRadius: "8px",
                  padding: "0.5rem 0.75rem",
                  fontSize: "0.84rem",
                  cursor: "pointer",
                }}
              >
                <option value="all">All Star Ratings</option>
                <option value="5">5 Stars only</option>
                <option value="4">4 Stars only</option>
                <option value="3">3 Stars only</option>
                <option value="2">2 Stars only</option>
                <option value="1">1 Star only</option>
              </select>
            </div>
          </div>

          <div style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
            Showing <strong>{filteredReviews.length}</strong> of <strong>{reviewsList.length}</strong> reviews
          </div>
        </div>
      </div>

      {/* Customer Reviews Feed */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {filteredReviews.length === 0 ? (
          <div className="stat-card" style={{ padding: "3rem 1.5rem", textAlign: "center", color: "var(--text-muted)" }}>
            <span style={{ fontSize: "2.5rem", display: "block", marginBottom: "0.75rem" }}>💬</span>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem" }}>
              No Customer Reviews Found
            </div>
            <p style={{ margin: 0, fontSize: "0.85rem" }}>
              {searchReview || filterStar !== "all"
                ? "Try adjusting your search query or star rating filter."
                : "No customer reviews have been submitted for this product yet."}
            </p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="stat-card"
              style={{
                padding: "1.25rem 1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.85rem",
                border: "1px solid var(--border-color)",
                transition: "all 0.2s ease",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "42px",
                      height: "42px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: "0.95rem",
                    }}
                  >
                    {rev.customerName ? rev.customerName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>
                      {rev.customerName || "Verified Customer"}
                    </div>
                    <div style={{ fontSize: "0.76rem", color: "var(--text-muted)" }}>
                      {rev.customerEmail ? `${rev.customerEmail} • ` : ""}{rev.date || "Recent"}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {/* Star Rating Badge */}
                  <div
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "4px",
                      padding: "4px 10px",
                      borderRadius: "12px",
                      background: "rgba(245, 158, 11, 0.12)",
                      border: "1px solid rgba(245, 158, 11, 0.3)",
                      color: "#fbbf24",
                      fontWeight: 700,
                      fontSize: "0.84rem",
                    }}
                  >
                    <span>★</span>
                    <span>{rev.rating}.0 / 5.0</span>
                  </div>

                  {/* Delete Option Button */}
                  <button
                    type="button"
                    onClick={() => setReviewToDelete(rev)}
                    style={{
                      background: "rgba(239, 68, 68, 0.1)",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      color: "#f87171",
                      borderRadius: "8px",
                      padding: "5px 12px",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
                    }}
                    title="Delete this customer review"
                  >
                    <span>🗑️</span>
                    <span>Delete</span>
                  </button>
                </div>
              </div>

              {/* Review Text / Feedback */}
              <div
                style={{
                  fontSize: "0.9rem",
                  color: rev.comment ? "var(--text-primary)" : "var(--text-muted)",
                  lineHeight: 1.55,
                  background: "rgba(255, 255, 255, 0.02)",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.04)",
                  fontStyle: rev.comment ? "normal" : "italic",
                }}
              >
                {rev.comment ? `“${rev.comment}”` : "No written comment provided with this rating."}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ════════ DELETE CONFIRMATION MODAL ════════ */}
      {reviewToDelete && (
        <div
          className="order-modal-overlay"
          onClick={() => setReviewToDelete(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "1rem",
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          <div
            className="archive-modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "430px",
              background: "#161b2e",
              border: "1px solid rgba(239, 68, 68, 0.4)",
              borderRadius: "18px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(239, 68, 68, 0.15)",
              overflow: "hidden",
              animation: "scaleUp 0.2s ease-out",
            }}
          >
            <div style={{ padding: "1.75rem 1.75rem 1.25rem", textAlign: "center" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.35)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.8rem",
                  margin: "0 auto 1.2rem",
                }}
              >
                🗑️
              </div>
              <h3 style={{ color: "#fff", fontSize: "1.25rem", margin: "0 0 0.5rem", fontWeight: 700 }}>
                Delete Customer Review?
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.5, margin: 0 }}>
                Are you sure you want to remove the review by <strong>{reviewToDelete.customerName}</strong>? This action cannot be undone.
              </p>
              <div
                style={{
                  margin: "1rem 0 0",
                  padding: "0.75rem 1rem",
                  background: "rgba(255, 255, 255, 0.03)",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.05)",
                  fontSize: "0.82rem",
                  color: "var(--text-secondary)",
                  textAlign: "left",
                  fontStyle: "italic",
                }}
              >
                ★ {reviewToDelete.rating}.0 — “{reviewToDelete.comment}”
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                padding: "1rem 1.75rem 1.5rem",
                borderTop: "1px solid rgba(255, 255, 255, 0.06)",
                background: "rgba(0, 0, 0, 0.2)",
              }}
            >
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setReviewToDelete(null)}
                style={{ flex: 1, padding: "0.65rem", fontSize: "0.9rem", fontWeight: 600, cursor: "pointer" }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleDeleteConfirm}
                style={{
                  flex: 1,
                  padding: "0.65rem",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  cursor: "pointer",
                  background: "#ef4444",
                  borderColor: "#ef4444",
                  boxShadow: "0 4px 14px rgba(239, 68, 68, 0.4)",
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════ Product Form Subpage Component (Add / Edit) ═══════════════════ */
function ProductFormSubpage({ productsList, onSaveProduct }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(productId);

  // If editing, find existing product
  const existingProduct = isEditing
    ? productsList.find(p => String(p.id) === String(productId))
    : null;

  const [name, setName] = useState(existingProduct ? existingProduct.name : "");
  const [category, setCategory] = useState(existingProduct ? existingProduct.category : "");
  const [description, setDescription] = useState(existingProduct ? (existingProduct.description || "") : "");
  const [actualPrice, setActualPrice] = useState(existingProduct ? (existingProduct.price || "").replace(/[^0-9.]/g, "") : "");
  const [cutPrice, setCutPrice] = useState(existingProduct ? (existingProduct.sellPrice || "").replace(/[^0-9.]/g, "") : "");
  const [stock, setStock] = useState(existingProduct ? String(existingProduct.stock) : "");
  const [status, setStatus] = useState(existingProduct ? existingProduct.status : "");
  const [mediaFiles, setMediaFiles] = useState(
    existingProduct?.mediaFiles
      ? existingProduct.mediaFiles
      : existingProduct?.img && existingProduct.img.startsWith("http")
        ? [{ type: "image", url: existingProduct.img, name: "Product Image" }]
        : []
  );
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync if editing and product changes
  useEffect(() => {
    if (isEditing && existingProduct) {
      setName(existingProduct.name);
      setCategory(existingProduct.category);
      setDescription(existingProduct.description || "");
      setActualPrice((existingProduct.price || "").replace(/[^0-9.]/g, ""));
      setCutPrice((existingProduct.sellPrice || "").replace(/[^0-9.]/g, ""));
      setStock(String(existingProduct.stock));
      setStatus(existingProduct.status);
      setMediaFiles(
        existingProduct.mediaFiles
          ? existingProduct.mediaFiles
          : existingProduct.img && existingProduct.img.startsWith("http")
            ? [{ type: "image", url: existingProduct.img, name: "Product Image" }]
            : []
      );
      setFormError("");
      setErrors({});
    }
  }, [productId, existingProduct]);

  if (isEditing && !existingProduct) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛍️</div>
        <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Product Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          The requested product ID <code>{productId}</code> does not exist or has been removed.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/products")}>
          ← Back to Products
        </button>
      </div>
    );
  }

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    if (mediaFiles.length + files.length > 10) {
      setErrors(prev => ({ ...prev, media: `Maximum 10 images or videos allowed. You already have ${mediaFiles.length}.` }));
      return;
    }

    setErrors(prev => ({ ...prev, media: "" }));
    files.forEach(file => {
      const isVideo = file.type.startsWith("video/");
      const isImage = file.type.startsWith("image/");
      if (!isImage && !isVideo) {
        setErrors(prev => ({ ...prev, media: "Only image and video files are supported." }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setMediaFiles(prev => {
          if (prev.length >= 10) return prev;
          return [
            ...prev,
            {
              id: Date.now() + Math.random().toString(36).substring(2, 7),
              type: isVideo ? "video" : "image",
              url: uploadEvent.target.result,
              name: file.name,
              size: (file.size / 1024).toFixed(1) + " KB",
            }
          ];
        });
      };
      reader.readAsDataURL(file);
    });
    // reset input value so user can re-select same file if desired
    e.target.value = "";
  };

  const removeMediaItem = (indexToRemove) => {
    setMediaFiles(prev => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setErrors({});
    setSaveSuccess(false);

    const newErrors = {};

    // Every field is compulsory EXCEPT Cut Price
    if (!name.trim()) {
      newErrors.name = "Product Name is required";
    }
    if (!category.trim()) {
      newErrors.category = "Category is required";
    }
    if (mediaFiles.length === 0) {
      newErrors.media = "Product Image or Video is required (at least 1 image or video, max 10)";
    } else if (mediaFiles.length > 10) {
      newErrors.media = "Maximum 10 images or videos allowed";
    }
    if (!description.trim()) {
      newErrors.description = "Product Description is required";
    }
    if (!actualPrice.trim()) {
      newErrors.actualPrice = "Actual Price is required";
    }
    if (!stock.trim()) {
      newErrors.stock = "Stock Quantity is required";
    } else {
      const numericStock = parseInt(stock, 10);
      if (isNaN(numericStock) || numericStock < 0) {
        newErrors.stock = "Please enter a valid stock quantity (0 or more)";
      }
    }
    if (!status.trim()) {
      newErrors.status = "Product Status is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const numericStock = parseInt(stock, 10);
    const computedStatus = numericStock === 0 && status === "active" ? "outstock" : status;

    const formattedActualPrice = actualPrice.trim().startsWith("₹")
      ? actualPrice.trim()
      : `₹${Number(actualPrice).toLocaleString("en-IN") || actualPrice.trim()}`;

    const formattedCutPrice = cutPrice.trim()
      ? (cutPrice.trim().startsWith("Sell Price")
        ? cutPrice.trim()
        : `Sell Price ₹${Number(cutPrice).toLocaleString("en-IN") || cutPrice.trim()}`)
      : `Sell Price ${formattedActualPrice}`;

    // Compute thumbnail / primary image for listing
    const primaryMedia = mediaFiles[0];
    const computedImg = primaryMedia
      ? primaryMedia.type === "video"
        ? "🎬"
        : primaryMedia.url
      : (existingProduct?.img || "🛍️");

    const productPayload = {
      id: isEditing ? existingProduct.id : Date.now(),
      name: name.trim(),
      category,
      description: description.trim(),
      sku: isEditing ? existingProduct.sku : `#KMI${Math.floor(100000 + Math.random() * 900000)}`,
      date: isEditing ? existingProduct.date : new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      price: formattedActualPrice,
      sellPrice: formattedCutPrice,
      stock: numericStock,
      status: computedStatus,
      rating: isEditing ? (existingProduct?.rating ?? 5.0) : 5.0,
      reviewsCount: isEditing ? (existingProduct?.reviewsCount ?? 0) : 0,
      img: computedImg,
      mediaFiles: mediaFiles,
    };

    onSaveProduct(productPayload, isEditing);
    setSaveSuccess(true);
    setTimeout(() => {
      if (isEditing) {
        navigate(`/products/${existingProduct.id}`);
      } else {
        navigate("/products");
      }
    }, 1200);
  };

  return (
    <div className="product-form-subpage" style={{ paddingBottom: "3rem", maxWidth: "860px", margin: "0 auto" }}>
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
            onClick={() => isEditing ? navigate(`/products/${existingProduct?.id || productId}`) : navigate("/products")}
            style={{
              padding: "0.45rem 0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            ← {isEditing ? "Back to Product Details" : "Back to Products"}
          </button>
          <div>
            <h1 className="page-title" style={{ margin: 0 }}>
              {isEditing ? "Edit Product" : "Add New Product"}
            </h1>
            <p className="page-subtitle" style={{ margin: "0.25rem 0 0" }}>
              {isEditing
                ? `Editing catalog details for ${existingProduct.sku}`
                : "Fill in the details below to add a new product to your inventory"}
            </p>
          </div>
        </div>

        {isEditing && (
          <span
            className={`status-badge status-${existingProduct.status}`}
            style={{ padding: "0.4rem 0.9rem", fontSize: "0.85rem" }}
          >
            <span className="status-dot" />
            {existingProduct.status.toUpperCase()}
          </span>
        )}
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="dashboard-filter-card"
        style={{
          padding: "2rem",
          borderRadius: "16px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Success notification banner */}
        {saveSuccess && (
          <div
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(52, 211, 153, 0.15)",
              border: "1px solid rgba(52, 211, 153, 0.35)",
              borderRadius: "8px",
              color: "#34d399",
              fontSize: "0.88rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>✅</span>
            <span>
              {isEditing
                ? "Product updated successfully! Redirecting to products..."
                : "Product created successfully! Redirecting to products..."}
            </span>
          </div>
        )}

        {/* Product Name (Compulsory) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            Product Name <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="text"
            className={errors.name ? "input-error" : ""}
            placeholder="e.g. Wireless Noise-Cancelling Headphones"
            value={name}
            onChange={e => {
              setName(e.target.value);
              if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
            }}
            style={{
              background: "var(--bg-input, #1e2230)",
              color: "#fff",
              border: errors.name ? "1px solid #ef4444" : "1px solid var(--border)",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              fontSize: "0.92rem",
            }}
          />
          <div className="field-error-slot">
            {errors.name && <span className="field-error-text">⚠️ {errors.name}</span>}
          </div>
        </div>

        {/* Category (Compulsory) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            Category <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            value={category}
            className={errors.category ? "input-error" : ""}
            onChange={e => {
              setCategory(e.target.value);
              if (errors.category) setErrors(prev => ({ ...prev, category: "" }));
            }}
            style={{
              background: "var(--bg-input, #1e2230)",
              color: category ? "#fff" : "var(--text-muted)",
              border: errors.category ? "1px solid #ef4444" : "1px solid var(--border)",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              fontSize: "0.92rem",
              cursor: "pointer",
            }}
          >
            <option value="" style={{ background: "#161922", color: "var(--text-muted)" }}>
              -- Select Category --
            </option>
            <option value="Electric Product" style={{ background: "#161922", color: "#fff" }}>Electric Product</option>
            <option value="Shoes Product" style={{ background: "#161922", color: "#fff" }}>Shoes Product</option>
            <option value="Apparel & Clothing" style={{ background: "#161922", color: "#fff" }}>Apparel &amp; Clothing</option>
            <option value="Accessories" style={{ background: "#161922", color: "#fff" }}>Accessories</option>
            <option value="Home & Living" style={{ background: "#161922", color: "#fff" }}>Home &amp; Living</option>
          </select>
          <div className="field-error-slot">
            {errors.category && <span className="field-error-text">⚠️ {errors.category}</span>}
          </div>
        </div>

        {/* Product Media (Images / Videos - Compulsory, Max 10) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.55rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Product Images / Videos <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <span style={{ fontSize: "0.78rem", color: mediaFiles.length >= 10 ? "#fbbf24" : "var(--text-muted)", fontWeight: 500 }}>
              {mediaFiles.length} / 10 media items uploaded
            </span>
          </div>

          {/* Upload Dropzone / Button */}
          {mediaFiles.length < 10 && (
            <label
              className={errors.media ? "input-error" : ""}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "1.5rem 1rem",
                background: "rgba(255, 255, 255, 0.02)",
                border: errors.media ? "2px dashed #ef4444" : "2px dashed var(--border)",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault();
                if (e.dataTransfer.files) {
                  handleMediaUpload({ target: { files: e.dataTransfer.files } });
                  if (errors.media) setErrors(prev => ({ ...prev, media: "" }));
                }
              }}
            >
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={e => {
                  handleMediaUpload(e);
                  if (errors.media) setErrors(prev => ({ ...prev, media: "" }));
                }}
                style={{ display: "none" }}
              />
              <div style={{ fontSize: "1.8rem" }}>📸 🎥</div>
              <div style={{ fontSize: "0.88rem", fontWeight: 600, color: "#fff" }}>
                Click to browse or drag &amp; drop images / videos
              </div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                Supports PNG, JPG, WEBP, MP4, MOV, WEBM (Max 10 files)
              </div>
            </label>
          )}

          {/* Media Previews Grid */}
          {mediaFiles.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))",
                gap: "0.75rem",
                marginTop: "0.5rem",
              }}
            >
              {mediaFiles.map((m, idx) => (
                <div
                  key={m.id || idx}
                  style={{
                    position: "relative",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: idx === 0 ? "2px solid #8b5cf6" : "1px solid var(--border)",
                    background: "#0d0f17",
                    height: "110px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Primary Cover Badge on 1st item */}
                  {idx === 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "4px",
                        left: "4px",
                        background: "#8b5cf6",
                        color: "#fff",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        padding: "2px 6px",
                        borderRadius: "4px",
                        zIndex: 2,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Cover
                    </span>
                  )}

                  {/* Media Preview (Image or Video) */}
                  {m.type === "video" ? (
                    <div style={{ width: "100%", height: "100%", position: "relative" }}>
                      <video
                        src={m.url}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        muted
                      />
                      <span
                        style={{
                          position: "absolute",
                          bottom: "4px",
                          left: "4px",
                          background: "rgba(0,0,0,0.75)",
                          color: "#fff",
                          fontSize: "0.65rem",
                          padding: "2px 5px",
                          borderRadius: "4px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "3px",
                        }}
                      >
                        🎥 Video
                      </span>
                    </div>
                  ) : (
                    <img
                      src={m.url}
                      alt={m.name || `media-${idx}`}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  )}

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeMediaItem(idx)}
                    title="Remove item"
                    style={{
                      position: "absolute",
                      top: "4px",
                      right: "4px",
                      background: "rgba(239, 68, 68, 0.88)",
                      color: "#fff",
                      border: "none",
                      borderRadius: "50%",
                      width: "22px",
                      height: "22px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      zIndex: 3,
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="field-error-slot">
            {errors.media && <span className="field-error-text">⚠️ {errors.media}</span>}
          </div>
        </div>

        {/* Product Description (Compulsory) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            Product Description <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <textarea
            rows={4}
            className={errors.description ? "input-error" : ""}
            placeholder="Enter detailed product description, specifications, and key features..."
            value={description}
            onChange={e => {
              setDescription(e.target.value);
              if (errors.description) setErrors(prev => ({ ...prev, description: "" }));
            }}
            style={{
              background: "var(--bg-input, #1e2230)",
              color: "#fff",
              border: errors.description ? "1px solid #ef4444" : "1px solid var(--border)",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              fontSize: "0.92rem",
              lineHeight: 1.5,
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
          <div className="field-error-slot">
            {errors.description && <span className="field-error-text">⚠️ {errors.description}</span>}
          </div>
        </div>

        {/* Two Separate Fields: Actual Price (Compulsory) & Cut Price (Optional) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem" }}>
          {/* Actual Price */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                Actual Price (₹) <span style={{ color: "#ef4444" }}>*</span>
              </label>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Current selling price</span>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span style={{ position: "absolute", left: "1rem", color: "var(--text-muted)", fontWeight: 600, fontSize: "0.95rem" }}>
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="any"
                className={errors.actualPrice ? "input-error" : ""}
                placeholder="e.g. 10120"
                value={actualPrice}
                onChange={e => {
                  setActualPrice(e.target.value);
                  if (errors.actualPrice) setErrors(prev => ({ ...prev, actualPrice: "" }));
                }}
                style={{
                  width: "100%",
                  background: "var(--bg-input, #1e2230)",
                  color: "#fff",
                  border: errors.actualPrice ? "1px solid #ef4444" : "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem 0.75rem 2.2rem",
                  fontSize: "0.92rem",
                }}
              />
            </div>
            <div className="field-error-slot">
              {errors.actualPrice && <span className="field-error-text">⚠️ {errors.actualPrice}</span>}
            </div>
          </div>

          {/* Cut Price (Optional) */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
                Cut Price (₹)
              </label>
              <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>Optional strikethrough price</span>
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <span style={{ position: "absolute", left: "1rem", color: "var(--text-muted)", fontWeight: 600, fontSize: "0.95rem" }}>
                ₹
              </span>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="e.g. 10600 (Optional)"
                value={cutPrice}
                onChange={e => setCutPrice(e.target.value)}
                style={{
                  width: "100%",
                  background: "var(--bg-input, #1e2230)",
                  color: "#fff",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  padding: "0.75rem 1rem 0.75rem 2.2rem",
                  fontSize: "0.92rem",
                }}
              />
            </div>
            <div className="field-error-slot" />
          </div>
        </div>

        {/* Stock Quantity (Compulsory) & Status (Compulsory) */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Stock Quantity <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="number"
              min="0"
              className={errors.stock ? "input-error" : ""}
              placeholder="e.g. 50"
              value={stock}
              onChange={e => {
                setStock(e.target.value);
                if (errors.stock) setErrors(prev => ({ ...prev, stock: "" }));
              }}
              style={{
                background: "var(--bg-input, #1e2230)",
                color: "#fff",
                border: errors.stock ? "1px solid #ef4444" : "1px solid var(--border)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                fontSize: "0.92rem",
              }}
            />
            <div className="field-error-slot">
              {errors.stock && <span className="field-error-text">⚠️ {errors.stock}</span>}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
            <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Product Status <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <select
              value={status}
              className={errors.status ? "input-error" : ""}
              onChange={e => {
                setStatus(e.target.value);
                if (errors.status) setErrors(prev => ({ ...prev, status: "" }));
              }}
              style={{
                background: "var(--bg-input, #1e2230)",
                color: status ? "#fff" : "var(--text-muted)",
                border: errors.status ? "1px solid #ef4444" : "1px solid var(--border)",
                borderRadius: "8px",
                padding: "0.75rem 1rem",
                fontSize: "0.92rem",
                cursor: "pointer",
              }}
            >
              <option value="" style={{ background: "#161922", color: "var(--text-muted)" }}>
                -- Select Status --
              </option>
              <option value="active" style={{ background: "#161922", color: "#34d399" }}>● Active (Publish)</option>
              <option value="draft" style={{ background: "#161922", color: "#94a3b8" }}>● Draft</option>
              <option value="inactive" style={{ background: "#161922", color: "#fbbf24" }}>● Inactive</option>
              <option value="archived" style={{ background: "#161922", color: "#a78bfa" }}>● Archived</option>
            </select>
            <div className="field-error-slot">
              {errors.status && <span className="field-error-text">⚠️ {errors.status}</span>}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div
          style={{
            marginTop: "1rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => isEditing ? navigate(`/products/${existingProduct?.id || productId}`) : navigate("/products")}
            style={{ padding: "0.6rem 1.4rem" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: "0.6rem 1.75rem",
              fontWeight: 600,
              fontSize: "0.92rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <span>💾</span> {isEditing ? "Update Product" : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ═══════════════════ Category Form Subpage Component (Add / Edit) ═══════════════════ */
function CategoryFormSubpage({ categoriesList, onSaveCategory }) {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(categoryId);

  const existingCategory = isEditing
    ? categoriesList.find(c => String(c.id) === String(categoryId))
    : null;

  const [name, setName] = useState(existingCategory ? existingCategory.name : "");
  const [slug, setSlug] = useState(existingCategory ? existingCategory.slug : "");
  const [description, setDescription] = useState(existingCategory ? (existingCategory.description || "") : "");
  const [status, setStatus] = useState(existingCategory ? existingCategory.status : "");
  const [formError, setFormError] = useState("");
  const [errors, setErrors] = useState({});
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (isEditing && existingCategory) {
      setName(existingCategory.name);
      setSlug(existingCategory.slug || "");
      setDescription(existingCategory.description || "");
      setStatus(existingCategory.status);
      setFormError("");
      setErrors({});
    }
  }, [categoryId, existingCategory]);

  const handleNameChange = (val) => {
    setName(val);
    setFormError("");
    if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
    if (!isEditing || !slug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
      if (errors.slug) setErrors(prev => ({ ...prev, slug: "" }));
    }
  };

  if (isEditing && !existingCategory) {
    return (
      <div style={{ padding: "3rem 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📑</div>
        <h2 style={{ color: "#fff", marginBottom: "0.5rem" }}>Category Not Found</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem" }}>
          The requested category ID <code>{categoryId}</code> does not exist or has been removed.
        </p>
        <button className="btn btn-primary" onClick={() => navigate("/categories")}>
          ← Back to Categories
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    setErrors({});
    setSaveSuccess(false);

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Category Name is required";
    }
    if (!slug.trim()) {
      newErrors.slug = "Slug is required";
    }
    if (!description.trim()) {
      newErrors.description = "Category Description is required";
    }
    if (!status.trim()) {
      newErrors.status = "Category Status is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const cleanSlug = slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const categoryPayload = {
      id: isEditing ? existingCategory.id : Date.now(),
      name: name.trim(),
      slug: cleanSlug,
      description: description.trim(),
      status: status,
      count: existingCategory ? existingCategory.count : 0,
    };

    onSaveCategory(categoryPayload, isEditing);
    setSaveSuccess(true);
    setTimeout(() => {
      navigate("/categories");
    }, 1200);
  };

  return (
    <div className="category-form-subpage" style={{ paddingBottom: "3rem", maxWidth: "860px", margin: "0 auto" }}>
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
            onClick={() => navigate("/categories")}
            style={{
              padding: "0.45rem 0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            ← Back to Categories
          </button>
          <div>
            <h1 className="page-title" style={{ margin: 0 }}>
              {isEditing ? "Edit Category" : "Add New Category"}
            </h1>
            <p className="page-subtitle" style={{ margin: "0.25rem 0 0" }}>
              {isEditing
                ? `Updating department details for ${existingCategory.name}`
                : "Fill in the details below to add a new category to your store"}
            </p>
          </div>
        </div>

        {isEditing && (
          <span
            className={`status-badge status-${existingCategory.status}`}
            style={{ padding: "0.4rem 0.9rem", fontSize: "0.85rem" }}
          >
            <span className="status-dot" />
            {existingCategory.status.toUpperCase()}
          </span>
        )}
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="dashboard-filter-card"
        style={{
          padding: "2rem",
          borderRadius: "16px",
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          boxShadow: "var(--shadow-lg)",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* Success notification banner */}
        {saveSuccess && (
          <div
            style={{
              padding: "0.75rem 1rem",
              background: "rgba(52, 211, 153, 0.15)",
              border: "1px solid rgba(52, 211, 153, 0.35)",
              borderRadius: "8px",
              color: "#34d399",
              fontSize: "0.88rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>✅</span>
            <span>
              {isEditing
                ? "Category updated successfully! Redirecting to categories..."
                : "Category created successfully! Redirecting to categories..."}
            </span>
          </div>
        )}

        {/* Category Name (Compulsory) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            Category Name <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            type="text"
            className={errors.name ? "input-error" : ""}
            placeholder="e.g. Smart Electronics"
            value={name}
            onChange={e => handleNameChange(e.target.value)}
            style={{
              background: "var(--bg-input, #1e2230)",
              color: "#fff",
              border: errors.name ? "1px solid #ef4444" : "1px solid var(--border)",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              fontSize: "0.92rem",
            }}
          />
          <div className="field-error-slot">
            {errors.name && <span className="field-error-text">⚠️ {errors.name}</span>}
          </div>
        </div>

        {/* Slug (Compulsory) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
              Slug <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>URL identifier</span>
          </div>
          <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
            <span style={{ position: "absolute", left: "1rem", color: "var(--text-muted)", fontSize: "0.9rem", fontFamily: "monospace" }}>
              /
            </span>
            <input
              type="text"
              className={errors.slug ? "input-error" : ""}
              placeholder="e.g. smart-electronics"
              value={slug}
              onChange={e => {
                setSlug(e.target.value);
                if (errors.slug) setErrors(prev => ({ ...prev, slug: "" }));
              }}
              style={{
                width: "100%",
                background: "var(--bg-input, #1e2230)",
                color: "#fff",
                border: errors.slug ? "1px solid #ef4444" : "1px solid var(--border)",
                borderRadius: "8px",
                padding: "0.75rem 1rem 0.75rem 1.8rem",
                fontSize: "0.92rem",
                fontFamily: "monospace",
              }}
            />
          </div>
          <div className="field-error-slot">
            {errors.slug && <span className="field-error-text">⚠️ {errors.slug}</span>}
          </div>
        </div>

        {/* Category Description (Compulsory) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            Description <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <textarea
            rows={4}
            className={errors.description ? "input-error" : ""}
            placeholder="Enter category description, overview, and types of products included..."
            value={description}
            onChange={e => {
              setDescription(e.target.value);
              if (errors.description) setErrors(prev => ({ ...prev, description: "" }));
            }}
            style={{
              background: "var(--bg-input, #1e2230)",
              color: "#fff",
              border: errors.description ? "1px solid #ef4444" : "1px solid var(--border)",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              fontSize: "0.92rem",
              lineHeight: 1.5,
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
          <div className="field-error-slot">
            {errors.description && <span className="field-error-text">⚠️ {errors.description}</span>}
          </div>
        </div>

        {/* Status (Compulsory) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.45rem" }}>
          <label style={{ fontSize: "0.86rem", fontWeight: 600, color: "var(--text-secondary)" }}>
            Category Status <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <select
            value={status}
            className={errors.status ? "input-error" : ""}
            onChange={e => {
              setStatus(e.target.value);
              if (errors.status) setErrors(prev => ({ ...prev, status: "" }));
            }}
            style={{
              background: "var(--bg-input, #1e2230)",
              color: status ? "#fff" : "var(--text-muted)",
              border: errors.status ? "1px solid #ef4444" : "1px solid var(--border)",
              borderRadius: "8px",
              padding: "0.75rem 1rem",
              fontSize: "0.92rem",
              cursor: "pointer",
            }}
          >
            <option value="" style={{ background: "#161922", color: "var(--text-muted)" }}>
              -- Select Status --
            </option>
            <option value="active" style={{ background: "#161922", color: "#34d399" }}>● Active</option>
            <option value="inactive" style={{ background: "#161922", color: "#fbbf24" }}>● Inactive</option>
            <option value="archived" style={{ background: "#161922", color: "#a78bfa" }}>● Archived</option>
          </select>
          <div className="field-error-slot">
            {errors.status && <span className="field-error-text">⚠️ {errors.status}</span>}
          </div>
        </div>

        {/* Form Actions */}
        <div
          style={{
            marginTop: "1rem",
            paddingTop: "1.25rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate("/categories")}
            style={{ padding: "0.6rem 1.4rem" }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              padding: "0.6rem 1.75rem",
              fontWeight: 600,
              fontSize: "0.92rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <span>💾</span> {isEditing ? "Update Category" : "Save Category"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ═══════════════════ Notifications Data ═══════════════════ */
const NOTIFICATIONS_DATA = [
  {
    id: "notif-1",
    type: "new_order",
    title: "New Order Received",
    description: "Kabir Malhotra placed order #ORD-9924 for ₹1,14,900 (Paid)",
    orderId: "ORD-9924",
    time: "Just now",
    timestamp: "2026-10-27T16:38:00",
    read: false,
    icon: "🛍️",
    badgeColor: "#10b981",
    badgeBg: "rgba(16, 185, 129, 0.15)",
  },
  {
    id: "notif-2",
    type: "cancel",
    title: "Order Cancelled",
    description: "Order #ORD-9918 was cancelled by David Kim (₹67,900)",
    orderId: "ORD-9918",
    time: "15 min ago",
    timestamp: "2026-10-27T16:25:00",
    read: false,
    icon: "❌",
    badgeColor: "#ef4444",
    badgeBg: "rgba(239, 68, 68, 0.15)",
  },
  {
    id: "notif-3",
    type: "return",
    title: "Return Request Initiated",
    description: "Zoe Chen requested a return for order #ORD-9913 (₹6,400)",
    orderId: "ORD-9913",
    time: "1 hour ago",
    timestamp: "2026-10-27T15:40:00",
    read: false,
    icon: "↩️",
    badgeColor: "#f59e0b",
    badgeBg: "rgba(245, 158, 11, 0.15)",
  },
  {
    id: "notif-4",
    type: "contact",
    title: "Contact Us Query",
    description: "Sneha Patel: 'Need bulk quotation for 25 units of MacBook Pro M3'",
    email: "sneha.patel@acme.org",
    time: "2 hours ago",
    timestamp: "2026-10-27T14:30:00",
    read: false,
    icon: "💬",
    badgeColor: "#06b6d4",
    badgeBg: "rgba(6, 182, 212, 0.15)",
  },
  {
    id: "notif-6",
    type: "stock",
    title: "Low Inventory Warning",
    description: "Dell XPS 15 is down to only 3 units in stock",
    time: "Yesterday",
    timestamp: "2026-10-26T18:00:00",
    read: true,
    icon: "⚠️",
    badgeColor: "#eab308",
    badgeBg: "rgba(234, 179, 8, 0.15)",
  },
];

/* ═══════════════════ Component ═══════════════════ */
export default function AdminPanel() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("sb_admin_auth") === "true";
  });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [productsList, setProductsList] = useState(PRODUCTS);
  const [productStatusFilter, setProductStatusFilter] = useState("all"); // 'all' | 'active' | 'draft' | 'archived'
  const [productStockFilter, setProductStockFilter] = useState(""); // "" (None) | "10" | "30" | "50" | "100"
  const [productSearch, setProductSearch] = useState("");

  // Categories State
  const [categoriesList, setCategoriesList] = useState(CATEGORIES);
  const [catStatusFilter, setCatStatusFilter] = useState("all"); // 'all' | 'active' | 'inactive' | 'archived'
  const [catSearch, setCatSearch] = useState("");
  const [categoryToArchive, setCategoryToArchive] = useState(null);

  // Customers State
  const [customersList, setCustomersList] = useState(INITIAL_CUSTOMERS);
  const [selected, setSelected] = useState(new Set([3, 4]));
  const [timeFilter, setTimeFilter] = useState("1month");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");

  // Notifications State
  const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifTab, setNotifTab] = useState("all"); // 'all' | 'unread'
  const notifDropdownRef = useRef(null);

  // Profile State (Editable Name & Profile Picture only, Email read-only)
  const [profileUser, setProfileUser] = useState({
    name: "John Doe",
    email: "john.doe@company.com", // Read-only
    role: "Super Admin",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  });
  const [activeProfileTab, setActiveProfileTab] = useState("profile"); // 'profile' | 'password'
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileEditName, setProfileEditName] = useState(profileUser.name);
  const [profileEditAvatar, setProfileEditAvatar] = useState(profileUser.avatar);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState(false);
  const profileFileInputRef = useRef(null);

  // Change Password State & Validation
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Logout Confirmation Modal State
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  // Archive Product Confirmation Modal State
  const [productToArchive, setProductToArchive] = useState(null);

  // Profile Dropdown State
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Auto-close notification and profile dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifDropdownRef.current && !notifDropdownRef.current.contains(event.target)) {
        setIsNotifOpen(false);
      }
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    if (isNotifOpen || isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isNotifOpen, isProfileOpen]);

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  const markAllNotifsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const markNotifAsRead = (id) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const clearAllNotifs = () => {
    setNotifications([]);
  };

  // Custom date range validation for Dashboard
  const getTodayDateStr = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  const todayStr = getTodayDateStr();

  const [dateRangeError, setDateRangeError] = useState("");

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

  // Orders Filter & Search state
  const [orderTimeFilter, setOrderTimeFilter] = useState("1month");
  const [orderCustomStartDate, setOrderCustomStartDate] = useState("");
  const [orderCustomEndDate, setOrderCustomEndDate] = useState("");
  const [orderDateRangeError, setOrderDateRangeError] = useState("");
  const [orderSearch, setOrderSearch] = useState("");
  // Orders state (editable for manual shippingMethod, status, trackingNumber)
  const [ordersList, setOrdersList] = useState(ALL_ORDERS);

  const handleOrderCustomStartDateChange = (val) => {
    if (orderCustomEndDate && val && val > orderCustomEndDate) {
      setOrderDateRangeError("Start Date cannot be selected after End Date");
      setOrderCustomStartDate(val);
      return;
    }
    if (val && val > todayStr) {
      setOrderDateRangeError("Dates cannot be in the future");
      setOrderCustomStartDate(val);
      return;
    }
    setOrderDateRangeError("");
    setOrderCustomStartDate(val);
  };

  const handleOrderCustomEndDateChange = (val) => {
    if (orderCustomStartDate && val && val < orderCustomStartDate) {
      setOrderDateRangeError("End Date cannot be selected before Start Date");
      setOrderCustomEndDate(val);
      return;
    }
    if (val && val > todayStr) {
      setOrderDateRangeError("Dates cannot be in the future");
      setOrderCustomEndDate(val);
      return;
    }
    setOrderDateRangeError("");
    setOrderCustomEndDate(val);
  };

  const isOrderCustomRangeValid = !orderDateRangeError && Boolean(orderCustomStartDate && orderCustomEndDate);

  const updateOrderField = (orderId, field, value) => {
    setOrdersList(prev =>
      prev.map(o => {
        if (o.id !== orderId) return o;
        if (field === "status" && (value === "new" || value === "packed")) {
          // In new and packed status, Shipping Method and Tracking Number must be cleared
          return {
            ...o,
            status: value,
            shippingMethod: "",
            trackingNumber: "",
          };
        }
        return { ...o, [field]: value };
      })
    );
  };

  // Filter Orders data by selected period and search query
  const filteredOrders = ordersList.filter(o => {
    // 1. Period filter
    let matchesPeriod = true;
    if (orderTimeFilter === "today") {
      matchesPeriod = o.date === "2026-10-27";
    } else if (orderTimeFilter === "7days") {
      matchesPeriod = o.date >= "2026-10-20";
    } else if (orderTimeFilter === "14days") {
      matchesPeriod = o.date >= "2026-10-13";
    } else if (orderTimeFilter === "1month") {
      matchesPeriod = o.date >= "2026-09-27";
    } else if (orderTimeFilter === "3months") {
      matchesPeriod = o.date >= "2026-07-27";
    } else if (orderTimeFilter === "6months") {
      matchesPeriod = o.date >= "2026-04-27";
    } else if (orderTimeFilter === "1year") {
      matchesPeriod = o.date >= "2025-10-27";
    } else if (orderTimeFilter === "2years") {
      matchesPeriod = o.date >= "2024-10-27";
    } else if (orderTimeFilter === "3years") {
      matchesPeriod = o.date >= "2023-10-27";
    } else if (orderTimeFilter === "custom" && isOrderCustomRangeValid) {
      matchesPeriod = o.date >= orderCustomStartDate && o.date <= orderCustomEndDate;
    }

    if (!matchesPeriod) return false;

    // 2. Search filter
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase().trim();
      const qClean = q.replace(/[₹,()]/g, "").trim();
      const qDigits = q.replace(/[^0-9]/g, ""); // strip symbols, spaces, commas to search numbers directly (e.g. "114900")
      const orderAmountDigits = (o.amount || "").replace(/[^0-9]/g, "");

      const displayAmountWithPayment = `${o.amount} (${o.paymentType || "Paid"})`.toLowerCase();
      const cleanDisplayAmount = displayAmountWithPayment.replace(/[₹,()]/g, "");

      const matchId = o.id.toLowerCase().includes(q) || o.id.replace(/[^a-zA-Z0-9]/g, "").toLowerCase().includes(q);
      const matchCustomer = o.customer.toLowerCase().includes(q);
      const matchPhone = (o.phone || "").toLowerCase().includes(q) || (o.phone || "").replace(/[^0-9]/g, "").includes(q);
      const matchEmail = o.email.toLowerCase().includes(q);
      const matchItems = o.items.toLowerCase().includes(q);
      const matchAmount = o.amount.toLowerCase().includes(q) || (qDigits && orderAmountDigits.includes(qDigits)) || displayAmountWithPayment.includes(q) || cleanDisplayAmount.includes(qClean);
      const matchPayment = (o.paymentType || "").toLowerCase().includes(q) || (q.includes("paid") && (o.paymentType || "Paid").toLowerCase() === "paid") || (q.includes("cod") && (o.paymentType || "").toLowerCase() === "cod");
      const matchStatus = (o.status || "").toLowerCase().includes(q);
      const matchShipping = (o.shippingMethod || "").toLowerCase().includes(q);
      const matchTracking = (o.trackingNumber || "").toLowerCase().includes(q);
      return Boolean(matchId || matchCustomer || matchPhone || matchEmail || matchItems || matchAmount || matchPayment || matchStatus || matchShipping || matchTracking);
    }

    return true;
  });

  const currentOrderStats = ORDERS_STATS_BY_PERIOD[orderTimeFilter] || ORDERS_STATS_BY_PERIOD["1month"];

  const toggleSelect = (id) => {
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === PRODUCTS.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(PRODUCTS.map(p => p.id)));
    }
  };

  const statusLabel = (s) => {
    switch (s) {
      case "published":
      case "active":
        return "Active";
      case "inactive":
        return "Inactive";
      case "outstock":
        return "Out of Stock";
      case "draft":
        return "Draft";
      case "archived":
        return "Archived";
      default:
        return s;
    }
  };

  // Products Metrics Calculation
  const totalProductsCount = productsList.length;
  const activeProductsCount = productsList.filter(p => p.status === "active" || p.status === "published").length;
  const inactiveProductsCount = productsList.filter(p => p.status === "inactive" || p.status === "draft" || p.status === "archived").length;
  const outOfStockCount = productsList.filter(p => p.status === "outstock" || Number(p.stock) === 0).length;

  // Filtered Products Calculation
  const filteredProducts = productsList.filter(p => {
    // 1. Status Dropdown Filter: (All / Active / Draft / Archived)
    if (productStatusFilter !== "all") {
      if (productStatusFilter === "active") {
        if (p.status !== "active" && p.status !== "published") return false;
      } else if (productStatusFilter === "draft") {
        if (p.status !== "draft") return false;
      } else if (productStatusFilter === "archived") {
        if (p.status !== "archived") return false;
      }
    }

    // 2. Quantity / Stock Dropdown Filter: (None / less than 10 / 30 / 50 / 100)
    if (productStockFilter) {
      const maxQty = Number(productStockFilter);
      const curStock = Number(String(p.stock).replace(/,/g, ""));
      if (curStock >= maxQty) return false;
    }

    // 3. Search query filter
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchSku = p.sku.toLowerCase().includes(q);
      const matchCat = p.category.toLowerCase().includes(q);
      if (!matchName && !matchSku && !matchCat) return false;
    }

    return true;
  });

  const handleSaveProduct = (productPayload, isEditing) => {
    if (isEditing) {
      setProductsList(prev => prev.map(p => (p.id === productPayload.id ? productPayload : p)));
    } else {
      setProductsList(prev => [productPayload, ...prev]);
    }
  };

  const handleDeleteProductReview = (productId, reviewId) => {
    setProductsList(prev =>
      prev.map(p => {
        if (String(p.id) === String(productId)) {
          const updatedReviews = (p.reviews || []).filter(r => r.id !== reviewId);
          const newReviewsCount = updatedReviews.length;
          const newAvgRating = newReviewsCount > 0
            ? Number((updatedReviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) / newReviewsCount).toFixed(1))
            : 5.0;
          return {
            ...p,
            reviews: updatedReviews,
            reviewsCount: newReviewsCount,
            rating: newAvgRating,
          };
        }
        return p;
      })
    );
  };

  const handleArchiveProduct = (product) => {
    setProductToArchive(product);
  };

  const confirmArchiveProduct = () => {
    if (!productToArchive) return;
    setProductsList(prev =>
      prev.map(p => {
        if (p.id === productToArchive.id) {
          const newStatus = p.status === "archived" ? "draft" : "archived";
          return { ...p, status: newStatus };
        }
        return p;
      })
    );
    setProductToArchive(null);
  };

  const handleSaveCategory = (categoryPayload, isEditing) => {
    if (isEditing) {
      setCategoriesList(prev => prev.map(c => (c.id === categoryPayload.id ? categoryPayload : c)));
    } else {
      setCategoriesList(prev => [categoryPayload, ...prev]);
    }
  };

  const handleArchiveCategory = (cat) => {
    setCategoryToArchive(cat);
  };

  const confirmArchiveCategory = () => {
    if (!categoryToArchive) return;
    setCategoriesList(prev =>
      prev.map(c => {
        if (c.id === categoryToArchive.id) {
          const newStatus = c.status === "archived" ? "active" : "archived";
          return { ...c, status: newStatus };
        }
        return c;
      })
    );
    setCategoryToArchive(null);
  };

  // Category Metrics
  const totalCategoriesCount = categoriesList.length;
  const activeCategoriesCount = categoriesList.filter(c => c.status === "active").length;
  const inactiveCategoriesCount = categoriesList.filter(c => c.status === "inactive" || c.status === "archived").length;

  const filteredCategories = categoriesList.filter(c => {
    // 1. Status Filter
    if (catStatusFilter !== "all") {
      if (c.status !== catStatusFilter) return false;
    }
    // 2. Search
    if (catSearch.trim()) {
      const q = catSearch.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchSlug = c.slug.toLowerCase().includes(q);
      const matchDesc = (c.description || "").toLowerCase().includes(q);
      if (!matchName && !matchSlug && !matchDesc) return false;
    }
    return true;
  });

  const currentDashboardData = DASHBOARD_DATA_BY_PERIOD[timeFilter] || DASHBOARD_DATA_BY_PERIOD["1month"];

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLoginSuccess={() => {
          localStorage.setItem("sb_admin_auth", "true");
          setIsAuthenticated(true);
          navigate("/dashboard");
        }}
      />
    );
  }

  return (
    <div className="admin-root">

      {/* ════════ LEFT SIDEBAR ════════ */}
      <aside className={`admin-sidebar ${!sidebarOpen ? "collapsed" : ""}`}>
        <div className="sidebar-header">
          <div className="brand" onClick={() => navigate("/dashboard")} style={{ cursor: "pointer" }} title="SB Admin">
            <div className="brand-icon">SB</div>
            <span className="brand-name">SB Admin</span>
          </div>
          <button
            type="button"
            className="sidebar-arrow-toggle"
            onClick={() => setSidebarOpen(prev => !prev)}
            title={sidebarOpen ? "Collapse sidebar menu" : "Expand sidebar menu"}
            aria-label={sidebarOpen ? "Collapse sidebar menu" : "Expand sidebar menu"}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                transform: sidebarOpen ? "rotate(0deg)" : "rotate(180deg)",
                transition: "transform 0.3s ease",
              }}
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        </div>

        <nav className="sidebar-menu">
          {/* Main section */}
          <div className="menu-section">
            <div className="menu-label">Main</div>
            {MAIN_MENU.map(item => (
              <NavLink
                key={item.id}
                to={item.path}
                title={item.label}
                className={({ isActive }) =>
                  `menu-item ${isActive ||
                    (item.id === "orders" && location.pathname.startsWith("/orders")) ||
                    (item.id === "customers" && location.pathname.startsWith("/customers")) ||
                    (item.id === "products" && location.pathname.startsWith("/products")) ||
                    (item.id === "categories" && location.pathname.startsWith("/categories"))
                    ? "active"
                    : ""
                  }`
                }
              >
                <span className="menu-icon">{item.icon}</span>
                <span className="menu-text">{item.label}</span>
                {item.badge && <span className="menu-badge">{item.badge}</span>}
                {item.arrow && <span className="menu-arrow">▼</span>}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <NavLink
            to="/settings"
            title="Settings"
            className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
          >
            <span className="menu-icon">⚙️</span>
            <span className="menu-text">Settings</span>
          </NavLink>
          <div className="sidebar-copyright">
            <p>© {CURRENT_YEAR} SB Admin</p>
            <span>All rights reserved</span>
          </div>
        </div>
      </aside>

      {/* ════════ MAIN AREA ════════ */}
      <div className={`admin-main ${!sidebarOpen ? "sidebar-collapsed" : ""}`}>

        {/* Top bar */}
        <header className="admin-topbar" style={{ justifyContent: "flex-end" }}>
          <div className="topbar-actions" style={{ marginLeft: "auto", position: "relative" }}>
            {/* Notification Menu Container */}
            <div className="notif-wrapper" ref={notifDropdownRef} style={{ position: "relative" }}>
              <button
                className={`topbar-icon-btn ${isNotifOpen ? "active" : ""}`}
                title="Notifications"
                onClick={() => setIsNotifOpen(prev => !prev)}
                aria-label="Notifications"
                aria-expanded={isNotifOpen}
                style={{
                  position: "relative",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  background: isNotifOpen ? "rgba(139, 92, 246, 0.2)" : "rgba(255, 255, 255, 0.05)",
                  border: isNotifOpen ? "1px solid var(--purple)" : "1px solid rgba(255, 255, 255, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: isNotifOpen ? "#c084fc" : "#e2e8f0",
                  transition: "all 0.2s ease",
                  boxShadow: isNotifOpen ? "0 0 15px rgba(139, 92, 246, 0.4)" : "none",
                }}
              >
                {/* Modern Bell SVG Icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>

                {/* Unread Badge Count or Glowing Dot */}
                {unreadNotifCount > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-2px",
                      right: "-2px",
                      background: "linear-gradient(135deg, #ef4444, #f43f5e)",
                      color: "#fff",
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      minWidth: "18px",
                      height: "18px",
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "0 4px",
                      border: "2px solid #0f1322",
                      boxShadow: "0 0 8px rgba(239, 68, 68, 0.6)",
                      animation: "pulse-subtle 2s infinite ease-in-out",
                    }}
                  >
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {isNotifOpen && (
                <div
                  className="notif-dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    right: 0,
                    width: "390px",
                    maxWidth: "92vw",
                    background: "rgba(18, 22, 38, 0.98)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "16px",
                    boxShadow: "0 18px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(139, 92, 246, 0.15)",
                    zIndex: 1000,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    animation: "fadeInDown 0.2s ease-out",
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem 1.25rem 0.75rem",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#fff" }}>
                        Notifications
                      </span>
                      {unreadNotifCount > 0 && (
                        <span
                          style={{
                            background: "rgba(139, 92, 246, 0.2)",
                            color: "#c084fc",
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            padding: "0.15rem 0.5rem",
                            borderRadius: "12px",
                            border: "1px solid rgba(139, 92, 246, 0.35)",
                          }}
                        >
                          {unreadNotifCount} new
                        </span>
                      )}
                    </div>
                    {unreadNotifCount > 0 && (
                      <button
                        onClick={markAllNotifsAsRead}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--purple-light, #a78bfa)",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          padding: "0.2rem 0.4rem",
                          borderRadius: "4px",
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.textDecoration = "underline")}
                        onMouseLeave={e => (e.currentTarget.style.textDecoration = "none")}
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>

                  {/* Filter Pills */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.4rem",
                      padding: "0.6rem 1.25rem",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                      background: "rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    {[
                      { key: "all", label: "All" },
                      { key: "unread", label: `Unread (${unreadNotifCount})` },
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => setNotifTab(tab.key)}
                        style={{
                          background: notifTab === tab.key ? "rgba(139, 92, 246, 0.25)" : "transparent",
                          border: notifTab === tab.key ? "1px solid rgba(139, 92, 246, 0.5)" : "1px solid transparent",
                          color: notifTab === tab.key ? "#fff" : "var(--text-muted, #94a3b8)",
                          borderRadius: "20px",
                          padding: "0.25rem 0.65rem",
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 0.15s",
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Notification Items List */}
                  <div
                    style={{
                      maxHeight: "380px",
                      overflowY: "auto",
                      padding: "0.4rem 0",
                    }}
                  >
                    {notifications.filter(n => {
                      if (notifTab === "unread") return !n.read;
                      return true;
                    }).length === 0 ? (
                      <div
                        style={{
                          padding: "2.5rem 1rem",
                          textAlign: "center",
                          color: "var(--text-muted, #94a3b8)",
                          fontSize: "0.85rem",
                        }}
                      >
                        <div style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>🔔</div>
                        <p style={{ margin: 0 }}>No notifications found</p>
                      </div>
                    ) : (
                      notifications
                        .filter(n => {
                          if (notifTab === "unread") return !n.read;
                          return true;
                        })
                        .map(n => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markNotifAsRead(n.id);
                              if (n.orderId) {
                                setIsNotifOpen(false);
                                navigate(`/orders/${n.orderId}`);
                              }
                            }}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "0.85rem",
                              padding: "0.85rem 1.25rem",
                              borderBottom: "1px solid rgba(255, 255, 255, 0.04)",
                              background: n.read ? "transparent" : "rgba(139, 92, 246, 0.06)",
                              cursor: n.orderId ? "pointer" : "default",
                              transition: "background 0.15s",
                              position: "relative",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)")}
                            onMouseLeave={e =>
                              (e.currentTarget.style.background = n.read ? "transparent" : "rgba(139, 92, 246, 0.06)")
                            }
                          >
                            {/* Icon badge */}
                            <div
                              style={{
                                width: "36px",
                                height: "36px",
                                borderRadius: "10px",
                                background: n.badgeBg || "rgba(255,255,255,0.08)",
                                border: `1px solid ${n.badgeColor || "rgba(255,255,255,0.15)"}44`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "1.05rem",
                                flexShrink: 0,
                                marginTop: "2px",
                              }}
                            >
                              {n.icon}
                            </div>

                            {/* Content */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  marginBottom: "0.2rem",
                                }}
                              >
                                <span
                                  style={{
                                    fontSize: "0.86rem",
                                    fontWeight: n.read ? 600 : 700,
                                    color: n.read ? "#cbd5e1" : "#fff",
                                  }}
                                >
                                  {n.title}
                                </span>
                                <span
                                  style={{
                                    fontSize: "0.72rem",
                                    color: "var(--text-muted, #94a3b8)",
                                    whiteSpace: "nowrap",
                                    marginLeft: "0.5rem",
                                  }}
                                >
                                  {n.time}
                                </span>
                              </div>
                              <p
                                style={{
                                  margin: 0,
                                  fontSize: "0.79rem",
                                  color: "var(--text-secondary, #94a3b8)",
                                  lineHeight: 1.4,
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  display: "-webkit-box",
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: "vertical",
                                }}
                              >
                                {n.description}
                              </p>
                              {n.orderId && (
                                <div
                                  style={{
                                    marginTop: "0.35rem",
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.3rem",
                                    fontSize: "0.72rem",
                                    color: "var(--purple-light, #a78bfa)",
                                    fontWeight: 600,
                                  }}
                                >
                                  <span>View Order #{n.orderId}</span>
                                  <span>→</span>
                                </div>
                              )}
                            </div>

                            {/* Unread indicator dot */}
                            {!n.read && (
                              <div
                                style={{
                                  width: "7px",
                                  height: "7px",
                                  borderRadius: "50%",
                                  background: "#8b5cf6",
                                  boxShadow: "0 0 6px #8b5cf6",
                                  flexShrink: 0,
                                  marginTop: "8px",
                                }}
                              />
                            )}
                          </div>
                        ))
                    )}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        padding: "0.75rem 1.25rem",
                        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                        background: "rgba(0, 0, 0, 0.25)",
                      }}
                    >
                      <button
                        onClick={clearAllNotifs}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "var(--text-muted, #94a3b8)",
                          fontSize: "0.75rem",
                          cursor: "pointer",
                          transition: "color 0.15s",
                        }}
                        onMouseEnter={e => (e.currentTarget.style.color = "#ef4444")}
                        onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted, #94a3b8)")}
                      >
                        Clear all notifications
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Profile Avatar with Dropdown */}
            <div className="profile-wrapper" ref={profileDropdownRef} style={{ position: "relative" }}>
              <button
                className={`profile-avatar-btn ${isProfileOpen ? "active" : ""}`}
                onClick={() => setIsProfileOpen(prev => !prev)}
                title="Account Settings & Profile"
                aria-label="Account Settings"
                aria-expanded={isProfileOpen}
                style={{
                  background: "none",
                  border: isProfileOpen ? "2px solid var(--purple)" : "2px solid rgba(255, 255, 255, 0.15)",
                  padding: 0,
                  borderRadius: "50%",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxShadow: isProfileOpen ? "0 0 15px rgba(139, 92, 246, 0.5)" : "none",
                }}
              >
                <img
                  src={profileUser.avatar}
                  alt={profileUser.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    display: "block",
                  }}
                  onError={(e) => {
                    // Fallback avatar if image network is unavailable
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.innerHTML = `<div style="width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,#8b5cf6,#06b6d4);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-size:0.9rem;">${(profileUser.name || "JD").slice(0, 2).toUpperCase()}</div>`;
                  }}
                />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div
                  className="profile-dropdown-menu"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 12px)",
                    right: 0,
                    width: "250px",
                    background: "rgba(18, 22, 38, 0.98)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(139, 92, 246, 0.3)",
                    borderRadius: "16px",
                    boxShadow: "0 18px 40px -10px rgba(0, 0, 0, 0.7), 0 0 25px rgba(139, 92, 246, 0.15)",
                    zIndex: 1000,
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    animation: "fadeInDown 0.2s ease-out",
                  }}
                >
                  {/* User Info Header */}
                  <div
                    style={{
                      padding: "1rem 1.25rem 0.85rem",
                      borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <img
                      src={profileUser.avatar}
                      alt={profileUser.name}
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "1px solid rgba(139, 92, 246, 0.4)",
                      }}
                    />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div
                        style={{
                          fontSize: "0.88rem",
                          fontWeight: 700,
                          color: "#fff",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {profileUser.name}
                      </div>
                      <div
                        style={{
                          fontSize: "0.74rem",
                          color: "var(--purple-light, #a78bfa)",
                          fontWeight: 500,
                        }}
                      >
                        {profileUser.role}
                      </div>
                    </div>
                  </div>

                  {/* Actions List */}
                  <div style={{ padding: "0.5rem" }}>
                    {/* Profile */}
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setActiveProfileTab("profile");
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setPasswordError("");
                        setPasswordSuccess(false);
                        navigate("/settings");
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.65rem 0.85rem",
                        background: "transparent",
                        border: "none",
                        borderRadius: "10px",
                        color: "#e2e8f0",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        textAlign: "left",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(139, 92, 246, 0.15)";
                        e.currentTarget.style.color = "#c084fc";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#e2e8f0";
                      }}
                    >
                      <span style={{ fontSize: "1.05rem" }}>👤</span>
                      <span>Profile</span>
                    </button>

                    {/* Change Password */}
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setActiveProfileTab("password");
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setPasswordError("");
                        setPasswordSuccess(false);
                        navigate("/settings");
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.65rem 0.85rem",
                        background: "transparent",
                        border: "none",
                        borderRadius: "10px",
                        color: "#e2e8f0",
                        fontSize: "0.85rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        textAlign: "left",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(139, 92, 246, 0.15)";
                        e.currentTarget.style.color = "#c084fc";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#e2e8f0";
                      }}
                    >
                      <span style={{ fontSize: "1.05rem" }}>🔑</span>
                      <span>Change Password</span>
                    </button>

                    <div
                      style={{
                        height: "1px",
                        background: "rgba(255, 255, 255, 0.08)",
                        margin: "0.4rem 0.3rem",
                      }}
                    />

                    {/* Logout */}
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        padding: "0.65rem 0.85rem",
                        background: "transparent",
                        border: "none",
                        borderRadius: "10px",
                        color: "#ef4444",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                        textAlign: "left",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(239, 68, 68, 0.12)";
                        e.currentTarget.style.color = "#f87171";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#ef4444";
                      }}
                    >
                      <span style={{ fontSize: "1.05rem" }}>🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content with Routes */}
        <main className="admin-content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* ════════ DASHBOARD ROUTE ════════ */}
            <Route
              path="/dashboard"
              element={
                <>
                  {/* Page header */}
                  <div className="page-header" style={{ alignItems: "center" }}>
                    <div className="page-header-left">
                      <h1 className="page-title">Dashboard Overview</h1>
                      <p className="page-subtitle">Real-time metrics and performance overview</p>
                    </div>
                    <div className="page-actions">
                      <button className="btn btn-outline" onClick={() => navigate("/orders")}>📦 Orders</button>
                      <button className="btn btn-outline" onClick={() => navigate("/products")}>🛍️ Products</button>
                      <button className="btn btn-outline" onClick={() => navigate("/categories")}>📑 Categories</button>
                    </div>
                  </div>

                  {/* Time Range Filter Bar */}
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
                                    if (typeof e.target.showPicker === 'function') {
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
                                    if (typeof e.target.showPicker === 'function') {
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

                  {/* 7 Required Metrics Grid */}
                  <div className="dashboard-metrics-grid">
                    {currentDashboardData.metrics.map((s) => (
                      <div key={s.id} className="stat-card metric-card" style={{ borderLeft: `3px solid ${s.color}` }}>
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
                                background: `${s.color}22`,
                                border: `1px solid ${s.color}44`,
                                fontSize: "0.85rem",
                                lineHeight: "1",
                                boxSizing: "border-box",
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              {s.id === "cancel_orders" ? (
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#f87171"
                                  strokeWidth="3.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  style={{ display: "block" }}
                                >
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              ) : (
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                                  {s.icon}
                                </span>
                              )}
                            </span>
                            <span>{s.label}</span>
                          </span>
                        </div>
                        <div className="stat-value" style={{ fontSize: "2rem", margin: "0.5rem 0 0" }}>
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              }
            />

            {/* ════════ CATEGORIES LIST ROUTE ════════ */}
            <Route
              path="/categories"
              element={
                <>
                  {/* Page header */}
                  <div className="page-header">
                    <div className="page-header-left">
                      <h1 className="page-title">Categories</h1>
                      <p className="page-subtitle">Organize and manage catalog departments and sub-categories</p>
                    </div>
                    <div className="page-actions">
                      <button className="btn btn-primary" onClick={() => navigate("/categories/new")}>
                        + Add category
                      </button>
                    </div>
                  </div>

                  {/* 3 Metric Cards: Total Categories, Active Categories, Inactive Categories */}
                  <div className="stats-row">
                    <div className="stat-card" style={{ borderLeft: "3px solid #38bdf8" }}>
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
                              background: "#38bdf822",
                              border: "1px solid #38bdf844",
                              fontSize: "0.85rem",
                              lineHeight: "1",
                              boxSizing: "border-box",
                              padding: 0,
                              margin: 0,
                            }}
                          >
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                              📑
                            </span>
                          </span>
                          <span>TOTAL CATEGORIES</span>
                        </span>
                      </div>
                      <div className="stat-value" style={{ margin: "0.5rem 0 0" }}>{totalCategoriesCount}</div>
                      <div className="stat-period" style={{ marginTop: "0.25rem" }}>All registered departments</div>
                    </div>

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
                          <span>ACTIVE CATEGORIES</span>
                        </span>
                      </div>
                      <div className="stat-value" style={{ color: "#34d399", margin: "0.5rem 0 0" }}>{activeCategoriesCount}</div>
                      <div className="stat-period" style={{ marginTop: "0.25rem" }}>Visible on storefront</div>
                    </div>

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
                          <span>INACTIVE CATEGORIES</span>
                        </span>
                      </div>
                      <div className="stat-value" style={{ color: "#fbbf24", margin: "0.5rem 0 0" }}>{inactiveCategoriesCount}</div>
                      <div className="stat-period" style={{ marginTop: "0.25rem" }}>Inactive or archived</div>
                    </div>
                  </div>

                  {/* Toolbar: Search on left, Status dropdown on right (no filter button) */}
                  <div className="toolbar" style={{ flexWrap: "wrap", gap: "1rem" }}>
                    <div className="toolbar-left" style={{ flex: "1 1 300px" }}>
                      <div className="toolbar-search" style={{ width: "100%", maxWidth: "380px" }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>🔍</span>
                        <input
                          type="text"
                          placeholder="Search categories by name, slug or description..."
                          value={catSearch}
                          onChange={(e) => setCatSearch(e.target.value)}
                        />
                        {catSearch && (
                          <button
                            type="button"
                            onClick={() => setCatSearch("")}
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
                        value={catStatusFilter}
                        onChange={(e) => setCatStatusFilter(e.target.value)}
                        style={{
                          background: "var(--bg-card)",
                          color: catStatusFilter !== "all" ? "var(--purple-light)" : "var(--text-secondary)",
                          border: "1px solid var(--border)",
                          borderRadius: "var(--radius-md)",
                          padding: "0.45rem 0.85rem",
                          fontSize: "0.84rem",
                          cursor: "pointer",
                          outline: "none",
                          fontWeight: catStatusFilter !== "all" ? 600 : 500,
                        }}
                      >
                        <option value="all" style={{ background: "#161922", color: "#fff" }}>All</option>
                        <option value="active" style={{ background: "#161922", color: "#fff" }}>Active</option>
                        <option value="inactive" style={{ background: "#161922", color: "#fff" }}>Inactive</option>
                        <option value="archived" style={{ background: "#161922", color: "#fff" }}>Archived</option>
                      </select>
                    </div>
                  </div>

                  {/* Categories table: all data center-aligned, icon removed from name */}
                  <div className="data-table-wrap">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th style={{ textAlign: "center" }}>Category Name</th>
                          <th style={{ textAlign: "center" }}>Slug</th>
                          <th style={{ textAlign: "center" }}>Description</th>
                          <th style={{ textAlign: "center" }}>Total Products</th>
                          <th style={{ textAlign: "center" }}>Status</th>
                          <th style={{ textAlign: "center" }}>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCategories.length === 0 ? (
                          <tr>
                            <td colSpan={6} style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
                              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📑</div>
                              <div style={{ fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>
                                No categories found
                              </div>
                              <div style={{ fontSize: "0.82rem" }}>
                                {catSearch || catStatusFilter !== "all"
                                  ? "Try clearing filters or search query to see all categories."
                                  : "Add your first category to get started."}
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredCategories.map(c => (
                            <tr key={c.id}>
                              <td style={{ textAlign: "center" }}>
                                <div style={{ fontWeight: 600, color: "#fff", fontSize: "0.92rem" }}>
                                  {c.name}
                                </div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <code style={{ background: "rgba(255, 255, 255, 0.05)", padding: "2px 8px", borderRadius: "4px", fontSize: "0.8rem", color: "var(--purple-light)" }}>
                                  /{c.slug}
                                </code>
                              </td>
                              <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.85rem", maxWidth: "260px" }}>
                                {c.description || "—"}
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>
                                  {c.count || 0} items
                                </span>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <span className={`status-badge status-${c.status || "active"}`} style={{ margin: "0 auto" }}>
                                  <span className="status-dot" />
                                  {c.status === "active" ? "Active" : c.status === "archived" ? "Archived" : "Inactive"}
                                </span>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <button
                                  type="button"
                                  className="order-view-details-btn"
                                  title="Edit category"
                                  onClick={() => navigate(`/categories/${c.id}/edit`)}
                                >
                                  <span>✏</span>
                                  <span>Edit</span>
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              }
            />

            {/* ════════ CATEGORY NEW / EDIT SUBPAGE ROUTES ════════ */}
            <Route
              path="/categories/new"
              element={
                <CategoryFormSubpage
                  categoriesList={categoriesList}
                  onSaveCategory={handleSaveCategory}
                />
              }
            />
            <Route
              path="/categories/:categoryId/edit"
              element={
                <CategoryFormSubpage
                  categoriesList={categoriesList}
                  onSaveCategory={handleSaveCategory}
                />
              }
            />

            {/* ════════ ORDERS LIST ROUTE ════════ */}
            <Route
              path="/orders"
              element={
                <>
                  {/* Page header */}
                  <div className="page-header">
                    <div className="page-header-left">
                      <h1 className="page-title">Orders</h1>
                      <p className="page-subtitle">Track, filter and manage customer orders across all channels</p>
                    </div>
                    <div className="page-actions">
                      <button className="btn btn-outline">↗ Export</button>
                    </div>
                  </div>

                  {/* Time Range Filter Bar for Orders */}
                  <div className="dashboard-filter-card">
                    <div className="dashboard-filter-header">
                      <span className="dashboard-filter-title">
                        <span>📅</span> Filter By Period:
                      </span>
                      {orderTimeFilter === "custom" && (
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                          <div className={`custom-date-inputs ${orderDateRangeError ? "date-input-error" : ""}`}>
                            <div className="date-input-group">
                              <label>From:</label>
                              <div className="custom-date-field">
                                <span className={`date-display-text ${!orderCustomStartDate ? "placeholder" : ""}`}>
                                  {orderCustomStartDate ? formatDisplayDate(orderCustomStartDate) : "DD-MM-YYYY"}
                                </span>
                                <input
                                  type="date"
                                  value={orderCustomStartDate}
                                  max={orderCustomEndDate || todayStr}
                                  onClick={(e) => {
                                    if (typeof e.target.showPicker === 'function') {
                                      e.target.showPicker();
                                    }
                                  }}
                                  onChange={(e) => handleOrderCustomStartDateChange(e.target.value)}
                                />
                              </div>
                            </div>
                            <div className="date-input-group">
                              <label>To:</label>
                              <div className="custom-date-field">
                                <span className={`date-display-text ${!orderCustomEndDate ? "placeholder" : ""}`}>
                                  {orderCustomEndDate ? formatDisplayDate(orderCustomEndDate) : "DD-MM-YYYY"}
                                </span>
                                <input
                                  type="date"
                                  value={orderCustomEndDate}
                                  min={orderCustomStartDate || undefined}
                                  max={todayStr}
                                  onClick={(e) => {
                                    if (typeof e.target.showPicker === 'function') {
                                      e.target.showPicker();
                                    }
                                  }}
                                  onChange={(e) => handleOrderCustomEndDateChange(e.target.value)}
                                />
                              </div>
                            </div>
                          </div>
                          {Boolean(orderDateRangeError) && (
                            <div style={{ fontSize: "0.75rem", color: "var(--text-red)", display: "flex", alignItems: "center", gap: "4px" }}>
                              <span>⚠️</span> {orderDateRangeError}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="dashboard-filter-pills">
                      {TIME_FILTER_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          className={`filter-pill-btn ${orderTimeFilter === opt.id ? "active" : ""}`}
                          onClick={() => setOrderTimeFilter(opt.id)}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Stat cards filtered by period */}
                  <div
                    className="stats-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: "1.1rem",
                    }}
                  >
                    {currentOrderStats.map(s => (
                      <div key={s.label} className="stat-card" style={{ borderLeft: s.color ? `3px solid ${s.color}` : "none" }}>
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
                                background: s.color ? `${s.color}22` : "rgba(255, 255, 255, 0.08)",
                                border: s.color ? `1px solid ${s.color}44` : "1px solid rgba(255, 255, 255, 0.12)",
                                fontSize: "0.82rem",
                                lineHeight: "1",
                                boxSizing: "border-box",
                                padding: 0,
                                margin: 0,
                              }}
                            >
                              {s.label === "CANCELLED" ? (
                                <svg
                                  width="13"
                                  height="13"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="#f87171"
                                  strokeWidth="3.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  style={{ display: "block" }}
                                >
                                  <line x1="18" y1="6" x2="6" y2="18" />
                                  <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                              ) : (
                                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                                  {s.icon}
                                </span>
                              )}
                            </span>
                            <span>{s.label}</span>
                          </span>
                        </div>
                        <div className="stat-value" style={{ color: s.color || "#fff" }}>{s.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Toolbar with Search Bar (Search icon and Clear icon) */}
                  <div className="table-toolbar" style={{ marginTop: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem" }}>
                    <div className="toolbar-left" style={{ flex: "1 1 340px", maxWidth: "480px" }}>
                      <div className="toolbar-search" style={{ position: "relative", width: "100%", maxWidth: "100%" }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>🔍</span>
                        <input
                          type="text"
                          placeholder="Search orders (ID, customer, phone, product, amount, paid/cod, status, tracking)..."
                          value={orderSearch}
                          onChange={(e) => setOrderSearch(e.target.value)}
                          style={{ paddingRight: orderSearch ? "1.8rem" : "0" }}
                        />
                        {orderSearch && (
                          <button
                            type="button"
                            onClick={() => setOrderSearch("")}
                            title="Clear search"
                            style={{
                              position: "absolute",
                              right: "10px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "rgba(255, 255, 255, 0.1)",
                              border: "none",
                              color: "var(--text-muted)",
                              borderRadius: "50%",
                              width: "20px",
                              height: "20px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              cursor: "pointer",
                              fontSize: "0.75rem",
                              lineHeight: 1,
                              transition: "all 0.15s ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = "#fff";
                              e.currentTarget.style.background = "rgba(248, 113, 113, 0.3)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = "var(--text-muted)";
                              e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                            }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                    <div style={{ color: "var(--text-muted)", fontSize: "0.85rem", whiteSpace: "nowrap" }}>
                      Showing <strong style={{ color: "var(--text-primary)" }}>{filteredOrders.length}</strong> Orders
                    </div>
                  </div>

                  {/* Orders table */}
                  <div className="data-table-wrap">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th style={{ textAlign: "center" }}>Order ID</th>
                          <th style={{ textAlign: "center" }}>Customer &amp; Contact</th>
                          <th style={{ textAlign: "center" }}>Items &amp; Details</th>
                          <th style={{ textAlign: "center" }}>Total Amount</th>
                          <th style={{ textAlign: "center" }}>Status</th>
                          <th style={{ textAlign: "center" }}>Rating</th>
                          <th style={{ textAlign: "center" }}>Shipping &amp; Tracking</th>
                          <th style={{ textAlign: "center" }}>Order Date</th>
                          <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.length === 0 ? (
                          <tr>
                            <td colSpan={9} style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--text-muted)" }}>
                              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📦</div>
                              <div style={{ fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.25rem" }}>No orders found</div>
                              <div style={{ fontSize: "0.82rem" }}>
                                {orderSearch ? `No orders matched "${orderSearch}" in the selected period.` : "Try selecting a broader date range."}
                              </div>
                              {orderSearch && (
                                <button
                                  className="btn btn-outline"
                                  onClick={() => setOrderSearch("")}
                                  style={{ marginTop: "1rem", padding: "0.4rem 0.9rem", fontSize: "0.82rem" }}
                                >
                                  ✕ Clear search
                                </button>
                              )}
                            </td>
                          </tr>
                        ) : (
                          filteredOrders.map(o => {
                            const conf = ORDER_STATUS_CONFIG[o.status] || { label: o.status, color: "#a78bfa", bg: "rgba(167, 139, 250, 0.12)" };
                            const cleanId = encodeURIComponent(o.id.replace("#", ""));
                            return (
                              <tr key={o.id}>
                                <td style={{ textAlign: "center" }}>
                                  <span style={{ fontWeight: 600, color: "var(--purple-light)" }}>{o.id}</span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <div>
                                    <div style={{ fontWeight: 600, color: "#fff" }}>{o.customer}</div>
                                    <div style={{ fontSize: "0.75rem", color: "var(--purple-light)", fontWeight: 600 }}>📞 {o.phone || "+91 98765 43210"}</div>
                                    <div style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{o.email}</div>
                                  </div>
                                </td>
                                <td style={{ textAlign: "center", color: "var(--text-secondary)" }}>{o.items}</td>
                                <td style={{ textAlign: "center" }}>
                                  <span style={{ fontWeight: 700, color: "#fff" }}>
                                    {o.amount}{" "}
                                    <span
                                      style={{
                                        fontWeight: 600,
                                        fontSize: "0.78rem",
                                        color: o.paymentType === "COD" ? "#f59e0b" : "#34d399",
                                        background: o.paymentType === "COD" ? "rgba(245, 158, 11, 0.12)" : "rgba(52, 211, 153, 0.12)",
                                        padding: "1px 6px",
                                        borderRadius: "6px",
                                        border: `1px solid ${o.paymentType === "COD" ? "rgba(245, 158, 11, 0.3)" : "rgba(52, 211, 153, 0.3)"}`,
                                        marginLeft: "4px",
                                        display: "inline-block",
                                      }}
                                    >
                                      ({o.paymentType || "Paid"})
                                    </span>
                                  </span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <span style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    padding: "3px 9px",
                                    borderRadius: "12px",
                                    fontSize: "0.75rem",
                                    fontWeight: 700,
                                    color: conf.color,
                                    background: conf.bg,
                                    border: `1px solid ${conf.color}40`,
                                  }}>
                                    <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: conf.color }} />
                                    {conf.label.toUpperCase()}
                                  </span>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  {(() => {
                                    const isDeliveryOrReturn = o.status === "delivered" || o.status === "return" || o.status === "refund";
                                    if (isDeliveryOrReturn && o.rating) {
                                      return (
                                        <div
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            padding: "3px 9px",
                                            borderRadius: "12px",
                                            background: "rgba(245, 158, 11, 0.12)",
                                            border: "1px solid rgba(245, 158, 11, 0.3)",
                                            color: "#fbbf24",
                                            fontWeight: 700,
                                            fontSize: "0.8rem",
                                          }}
                                          title={o.ratingComment || `${o.rating} out of 5 stars`}
                                        >
                                          <span>★</span>
                                          <span>{o.rating}.0</span>
                                        </div>
                                      );
                                    }
                                    if (isDeliveryOrReturn) {
                                      return (
                                        <span
                                          style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            gap: "4px",
                                            padding: "2px 8px",
                                            borderRadius: "10px",
                                            background: "rgba(255, 255, 255, 0.04)",
                                            border: "1px solid rgba(255, 255, 255, 0.08)",
                                            color: "var(--text-muted)",
                                            fontSize: "0.75rem",
                                            fontWeight: 500,
                                            letterSpacing: "0.2px",
                                          }}
                                          title="Delivered / Returned order awaiting customer rating"
                                        >
                                          <span style={{ fontSize: "0.7rem", opacity: 0.6 }}>⭐</span>
                                          <span>Not rated</span>
                                        </span>
                                      );
                                    }
                                    return (
                                      <span
                                        style={{
                                          display: "inline-flex",
                                          alignItems: "center",
                                          gap: "4px",
                                          padding: "2px 8px",
                                          borderRadius: "10px",
                                          background: "rgba(255, 255, 255, 0.02)",
                                          border: "1px dashed rgba(255, 255, 255, 0.08)",
                                          color: "rgba(255, 255, 255, 0.3)",
                                          fontSize: "0.72rem",
                                          fontWeight: 500,
                                        }}
                                        title="Ratings available after delivery or return"
                                      >
                                        <span>—</span>
                                        <span style={{ fontSize: "0.7rem" }}>Pending</span>
                                      </span>
                                    );
                                  })()}
                                </td>
                                <td style={{ textAlign: "center" }}>
                                  <div>
                                    <div style={{ fontSize: "0.82rem", color: o.shippingMethod ? "var(--text-primary)" : "var(--text-muted)", fontWeight: 500 }}>{o.shippingMethod || "—"}</div>
                                    <div style={{ fontSize: "0.72rem", color: "var(--purple-light)", fontFamily: "monospace" }}>{o.trackingNumber || "—"}</div>
                                  </div>
                                </td>
                                <td style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "0.82rem" }}>{o.time || o.date}</td>
                                <td style={{ textAlign: "center" }}>
                                  <button
                                    type="button"
                                    onClick={() => navigate(`/orders/${cleanId}`)}
                                    className="order-view-details-btn"
                                    title="Open full order subpage"
                                  >
                                    <span>👁</span>
                                    <span>View Details</span>
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        )}
                      </tbody>
                    </table>
                  </div>
                </>
              }
            />

            {/* ════════ ORDER DETAILS SUBPAGE ROUTE (/orders/:orderId) ════════ */}
            <Route
              path="/orders/:orderId"
              element={
                <OrderDetailsSubpage
                  ordersList={ordersList}
                  updateOrderField={updateOrderField}
                />
              }
            />

            {/* ════════ PRODUCTS ROUTE ════════ */}
            <Route
              path="/products"
              element={
                <>
                  {/* Page header */}
                  <div className="page-header">
                    <div className="page-header-left">
                      <h1 className="page-title">Products</h1>
                      <p className="page-subtitle">Manage inventory, pricing and availability across your store</p>
                    </div>
                    <div className="page-actions">
                      <button className="btn btn-outline">↗ Export</button>
                      <button
                        className="btn btn-primary"
                        onClick={() => navigate("/products/new")}
                      >
                        + Add product
                      </button>
                    </div>
                  </div>

                  {/* 1) 4 Metric cards: Total Products, Active Products, Inactive Products, Out of Stock Products */}
                  <div className="stats-row">
                    <div className="stat-card" style={{ borderLeft: "3px solid #38bdf8" }}>
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
                              background: "#38bdf822",
                              border: "1px solid #38bdf844",
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
                          <span>TOTAL PRODUCTS</span>
                        </span>
                      </div>
                      <div className="stat-value" style={{ margin: "0.5rem 0 0" }}>{totalProductsCount}</div>
                      <div className="stat-period" style={{ marginTop: "0.25rem" }}>All catalog items</div>
                    </div>

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
                          <span>ACTIVE PRODUCTS</span>
                        </span>
                      </div>
                      <div className="stat-value" style={{ color: "#34d399", margin: "0.5rem 0 0" }}>{activeProductsCount}</div>
                      <div className="stat-period" style={{ marginTop: "0.25rem" }}>Live &amp; purchasable</div>
                    </div>

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
                          <span>INACTIVE PRODUCTS</span>
                        </span>
                      </div>
                      <div className="stat-value" style={{ color: "#fbbf24", margin: "0.5rem 0 0" }}>{inactiveProductsCount}</div>
                      <div className="stat-period" style={{ marginTop: "0.25rem" }}>Inactive, draft &amp; archived</div>
                    </div>

                    <div className="stat-card" style={{ borderLeft: "3px solid #f87171" }}>
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
                              background: "#f8717122",
                              border: "1px solid #f8717144",
                              fontSize: "0.85rem",
                              lineHeight: "1",
                              boxSizing: "border-box",
                              padding: 0,
                              margin: 0,
                            }}
                          >
                            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 1 }}>
                              🔴
                            </span>
                          </span>
                          <span>OUT OF STOCK PRODUCTS</span>
                        </span>
                      </div>
                      <div className="stat-value" style={{ color: "#f87171", margin: "0.5rem 0 0" }}>{outOfStockCount}</div>
                      <div className="stat-period" style={{ marginTop: "0.25rem" }}>Inventory exhausted</div>
                    </div>
                  </div>

                  {/* Toolbar: Search input on left, Filter Dropdowns on right */}
                  <div className="toolbar" style={{ flexWrap: "wrap", gap: "1rem" }}>
                    <div className="toolbar-left" style={{ flex: "1 1 300px" }}>
                      <div className="toolbar-search" style={{ width: "100%", maxWidth: "380px" }}>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>🔍</span>
                        <input
                          type="text"
                          placeholder="Search by product name, SKU or category..."
                          value={productSearch}
                          onChange={(e) => setProductSearch(e.target.value)}
                        />
                        {productSearch && (
                          <button
                            type="button"
                            onClick={() => setProductSearch("")}
                            style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "0.85rem" }}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Right side dropdowns */}
                    <div className="toolbar-right" style={{ background: "transparent", border: "none", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                      {/* 4) Quantity Filter Dropdown: default nothing selected with top 'nothing selection' option */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                          Quantity:
                        </label>
                        <select
                          value={productStockFilter}
                          onChange={(e) => setProductStockFilter(e.target.value)}
                          style={{
                            background: "var(--bg-card)",
                            color: productStockFilter ? "var(--purple-light)" : "var(--text-secondary)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius-md)",
                            padding: "0.45rem 0.85rem",
                            fontSize: "0.84rem",
                            cursor: "pointer",
                            outline: "none",
                            fontWeight: productStockFilter ? 600 : 500,
                          }}
                        >
                          <option value="" style={{ background: "#161922", color: "#fff" }}>
                            All Quantities (No Filter)
                          </option>
                          <option value="10" style={{ background: "#161922", color: "#fff" }}>
                            Less than 10 quantity
                          </option>
                          <option value="30" style={{ background: "#161922", color: "#fff" }}>
                            Less than 30 quantity
                          </option>
                          <option value="50" style={{ background: "#161922", color: "#fff" }}>
                            Less than 50 quantity
                          </option>
                          <option value="100" style={{ background: "#161922", color: "#fff" }}>
                            Less than 100 quantity
                          </option>
                        </select>
                      </div>

                      {/* 3) Status Filter Dropdown: default 'All', options (All / Active / Draft / Archived) */}
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <label style={{ fontSize: "0.8rem", color: "var(--text-muted)", fontWeight: 600 }}>
                          Status:
                        </label>
                        <select
                          value={productStatusFilter}
                          onChange={(e) => setProductStatusFilter(e.target.value)}
                          style={{
                            background: "var(--bg-card)",
                            color: productStatusFilter !== "all" ? "var(--purple-light)" : "var(--text-secondary)",
                            border: "1px solid var(--border)",
                            borderRadius: "var(--radius-md)",
                            padding: "0.45rem 0.85rem",
                            fontSize: "0.84rem",
                            cursor: "pointer",
                            outline: "none",
                            fontWeight: productStatusFilter !== "all" ? 600 : 500,
                          }}
                        >
                          <option value="all" style={{ background: "#161922", color: "#fff" }}>All</option>
                          <option value="active" style={{ background: "#161922", color: "#fff" }}>Active</option>
                          <option value="draft" style={{ background: "#161922", color: "#fff" }}>Draft</option>
                          <option value="archived" style={{ background: "#161922", color: "#fff" }}>Archived</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Products table: Product Name left-aligned, others centered, single export removed */}
                  <div className="data-table-wrap">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th style={{ textAlign: "left", paddingLeft: "1.25rem" }}>Product Name</th>
                          <th style={{ textAlign: "center" }}>ID / SKU</th>
                          <th style={{ textAlign: "center" }}>Price &amp; Details</th>
                          <th style={{ textAlign: "center" }}>Rating</th>
                          <th style={{ textAlign: "center" }}>Stock</th>
                          <th style={{ textAlign: "center" }}>Status</th>
                          <th style={{ textAlign: "center" }}>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.length === 0 ? (
                          <tr>
                            <td colSpan={7} style={{ textAlign: "center", padding: "3rem 1.5rem", color: "var(--text-muted)" }}>
                              <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔍</div>
                              <div style={{ fontSize: "0.95rem", fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>
                                No products found
                              </div>
                              <div style={{ fontSize: "0.82rem" }}>
                                {productSearch || productStockFilter || productStatusFilter !== "all"
                                  ? "Try clearing filters or search query to see all products."
                                  : "Add your first product to get started."}
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredProducts.map(p => (
                            <tr key={p.id}>
                              <td style={{ textAlign: "left", paddingLeft: "1.25rem" }}>
                                <div className="product-cell" style={{ justifyContent: "flex-start" }}>
                                  <div
                                    className="product-img"
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      fontSize: "1.2rem",
                                      flexShrink: 0,
                                      overflow: "hidden",
                                      borderRadius: "6px",
                                    }}
                                  >
                                    {typeof p.img === "string" && (p.img.startsWith("data:") || p.img.startsWith("http")) ? (
                                      <img
                                        src={p.img}
                                        alt={p.name}
                                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                      />
                                    ) : (
                                      p.img || "🛍️"
                                    )}
                                  </div>
                                  <div style={{ textAlign: "left" }}>
                                    <div className="product-name">{p.name}</div>
                                    <div className="product-category">{p.category}</div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <div className="id-main">{p.sku}</div>
                                <div className="id-date">{p.date}</div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <div className="price-main">{p.price}</div>
                                <div className="price-sub">{p.sellPrice}</div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <div
                                  style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "5px",
                                    padding: "3px 9px",
                                    borderRadius: "12px",
                                    background: "rgba(245, 158, 11, 0.12)",
                                    border: "1px solid rgba(245, 158, 11, 0.3)",
                                    color: "#fbbf24",
                                    fontWeight: 700,
                                    fontSize: "0.82rem",
                                  }}
                                  title={`${p.rating || "5.0"} out of 5 (${p.reviewsCount || 0} reviews)`}
                                >
                                  <span>★</span>
                                  <span>{p.rating || "5.0"}</span>
                                  <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontWeight: 500 }}>
                                    ({p.reviewsCount || 0})
                                  </span>
                                </div>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <span
                                  style={{
                                    fontWeight: 700,
                                    fontSize: "0.92rem",
                                    color: Number(p.stock) === 0 ? "#f87171" : Number(p.stock) < 10 ? "#fbbf24" : "#fff",
                                  }}
                                >
                                  {p.stock}
                                </span>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <span className={`status-badge status-${p.status}`} style={{ margin: "0 auto" }}>
                                  <span className="status-dot" />
                                  {statusLabel(p.status)}
                                </span>
                              </td>
                              <td style={{ textAlign: "center" }}>
                                <button
                                  type="button"
                                  className="order-view-details-btn"
                                  title="View product details"
                                  onClick={() => navigate(`/products/${p.id}`)}
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
                </>
              }
            />

            {/* ════════ DEDICATED PROFILE & SETTINGS ROUTE ════════ */}
            <Route
              path="/settings"
              element={
                <div style={{ maxWidth: "780px", margin: "0 auto", padding: "1rem 0 3rem" }}>
                  {/* Page header */}
                  <div className="page-header" style={{ marginBottom: "1.5rem" }}>
                    <div className="page-header-left">
                      <h1 className="page-title">Admin Account Settings</h1>
                      <p className="page-subtitle">Manage your personal profile details and security credentials</p>
                    </div>
                  </div>

                  {/* Navigation Tabs (Profile vs Change Password) */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      borderBottom: "1px solid var(--border)",
                      marginBottom: "1.75rem",
                      paddingBottom: "0.25rem",
                    }}
                  >
                    <button
                      onClick={() => {
                        setActiveProfileTab("profile");
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setPasswordError("");
                        setPasswordSuccess(false);
                      }}
                      style={{
                        background: activeProfileTab === "profile" ? "rgba(139, 92, 246, 0.18)" : "transparent",
                        border: activeProfileTab === "profile" ? "1px solid rgba(139, 92, 246, 0.4)" : "1px solid transparent",
                        borderBottom: activeProfileTab === "profile" ? "2px solid var(--purple)" : "2px solid transparent",
                        color: activeProfileTab === "profile" ? "#fff" : "var(--text-muted)",
                        padding: "0.6rem 1.25rem",
                        borderRadius: "10px 10px 0 0",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span>👤</span>
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveProfileTab("password");
                        setIsEditingProfile(false);
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setPasswordError("");
                        setPasswordSuccess(false);
                      }}
                      style={{
                        background: activeProfileTab === "password" ? "rgba(139, 92, 246, 0.18)" : "transparent",
                        border: activeProfileTab === "password" ? "1px solid rgba(139, 92, 246, 0.4)" : "1px solid transparent",
                        borderBottom: activeProfileTab === "password" ? "2px solid var(--purple)" : "2px solid transparent",
                        color: activeProfileTab === "password" ? "#fff" : "var(--text-muted)",
                        padding: "0.6rem 1.25rem",
                        borderRadius: "10px 10px 0 0",
                        fontSize: "0.9rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <span>🔑</span>
                      <span>Change Password</span>
                    </button>
                  </div>

                  {/* ════════ TAB 1: PROFILE ════════ */}
                  {activeProfileTab === "profile" && (
                    <>
                      {/* Success notification banner */}
                      {profileSaveSuccess && (
                        <div
                          style={{
                            background: "rgba(16, 185, 129, 0.12)",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                            color: "#34d399",
                            borderRadius: "12px",
                            padding: "0.85rem 1.25rem",
                            marginBottom: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            fontSize: "0.9rem",
                            animation: "fadeInDown 0.2s ease-out",
                          }}
                        >
                          <span style={{ fontSize: "1.1rem" }}>✅</span>
                          <span>Profile updated successfully! Name and profile picture have been updated.</span>
                        </div>
                      )}

                      {!isEditingProfile ? (
                        /* ─── Profile View Card (Only Picture, Name, Email) ─── */
                        <div
                          style={{
                            background: "rgba(22, 27, 46, 0.8)",
                            border: "1px solid var(--border)",
                            borderRadius: "18px",
                            padding: "2rem",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem", borderBottom: "1px solid var(--border)", paddingBottom: "1.25rem" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                              {/* Avatar */}
                              <div
                                style={{
                                  position: "relative",
                                  width: "90px",
                                  height: "90px",
                                  borderRadius: "50%",
                                  border: "3px solid var(--purple)",
                                  overflow: "hidden",
                                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.35)",
                                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                                  flexShrink: 0,
                                }}
                              >
                                <img
                                  src={profileUser.avatar}
                                  alt={profileUser.name}
                                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                                  onError={(e) => {
                                    e.currentTarget.style.display = "none";
                                  }}
                                />
                              </div>

                              {/* Name & Email Details */}
                              <div>
                                <h2 style={{ fontSize: "1.45rem", fontWeight: 700, color: "#fff", margin: "0 0 0.35rem" }}>
                                  {profileUser.name}
                                </h2>
                                <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.92rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                  <span>✉️</span>
                                  <span>{profileUser.email}</span>
                                </p>
                              </div>
                            </div>

                            <button
                              className="btn btn-primary"
                              onClick={() => {
                                setProfileEditName(profileUser.name);
                                setProfileEditAvatar(profileUser.avatar);
                                setIsEditingProfile(true);
                                setProfileSaveSuccess(false);
                              }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.35)",
                              }}
                            >
                              <span>✏️</span>
                              <span>Edit Profile</span>
                            </button>
                          </div>

                          {/* Detail Rows (Only Name & Email) */}
                          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                            <div
                              style={{
                                background: "rgba(0, 0, 0, 0.25)",
                                borderRadius: "12px",
                                padding: "1rem 1.25rem",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                              }}
                            >
                              <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)", display: "block" }}>
                                Full Name
                              </span>
                              <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "#fff", marginTop: "0.2rem", display: "block" }}>
                                {profileUser.name}
                              </span>
                            </div>

                            <div
                              style={{
                                background: "rgba(0, 0, 0, 0.25)",
                                borderRadius: "12px",
                                padding: "1rem 1.25rem",
                                border: "1px solid rgba(255, 255, 255, 0.05)",
                              }}
                            >
                              <span style={{ fontSize: "0.74rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)", display: "block" }}>
                                Email Address
                              </span>
                              <span style={{ fontSize: "1.05rem", fontWeight: 600, color: "#94a3b8", marginTop: "0.2rem", display: "block" }}>
                                {profileUser.email}
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        /* ─── Profile Edit Form (Only Name & Profile Picture) ─── */
                        <form
                          onSubmit={(e) => {
                            e.preventDefault();
                            if (!profileEditName.trim()) return;
                            setProfileUser(prev => ({
                              ...prev,
                              name: profileEditName.trim(),
                              avatar: profileEditAvatar,
                            }));
                            setIsEditingProfile(false);
                            setProfileSaveSuccess(true);
                            setTimeout(() => setProfileSaveSuccess(false), 4000);
                          }}
                          style={{
                            background: "rgba(22, 27, 46, 0.8)",
                            border: "1px solid var(--border)",
                            borderRadius: "18px",
                            padding: "2rem",
                            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
                          }}
                        >
                          <div style={{ marginBottom: "1.75rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
                            <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: 0 }}>
                              Edit Profile
                            </h2>
                            <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                              Name and Profile Picture are editable. Email address is permanent.
                            </p>
                          </div>

                          {/* Profile Picture Section */}
                          <div style={{ marginBottom: "2rem" }}>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#fff", marginBottom: "0.75rem" }}>
                              Profile Picture
                            </label>
                            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
                              <div
                                style={{
                                  position: "relative",
                                  width: "90px",
                                  height: "90px",
                                  borderRadius: "50%",
                                  border: "3px solid var(--purple)",
                                  overflow: "hidden",
                                  boxShadow: "0 0 18px rgba(139, 92, 246, 0.4)",
                                  background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                                  flexShrink: 0,
                                }}
                              >
                                <img
                                  src={profileEditAvatar}
                                  alt="Preview"
                                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                />
                              </div>

                              <div style={{ flex: 1, minWidth: "240px" }}>
                                <input
                                  type="file"
                                  ref={profileFileInputRef}
                                  accept="image/*"
                                  style={{ display: "none" }}
                                  onChange={(e) => {
                                    const file = e.target.files && e.target.files[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        if (event.target && event.target.result) {
                                          setProfileEditAvatar(event.target.result);
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />

                                <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.6rem" }}>
                                  <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => profileFileInputRef.current && profileFileInputRef.current.click()}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "0.4rem",
                                      fontSize: "0.82rem",
                                      padding: "0.5rem 0.9rem",
                                    }}
                                  >
                                    <span>📁</span>
                                    <span>Upload New Photo</span>
                                  </button>

                                  <button
                                    type="button"
                                    className="btn btn-outline"
                                    onClick={() => {
                                      const presets = [
                                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
                                        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80",
                                        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80",
                                        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80",
                                      ];
                                      const nextIdx = (presets.indexOf(profileEditAvatar) + 1) % presets.length;
                                      setProfileEditAvatar(presets[nextIdx >= 0 ? nextIdx : 0]);
                                    }}
                                    style={{
                                      fontSize: "0.82rem",
                                      padding: "0.5rem 0.9rem",
                                    }}
                                  >
                                    <span>🎲 Choose Preset</span>
                                  </button>
                                </div>

                                <p style={{ margin: 0, fontSize: "0.76rem", color: "var(--text-muted)" }}>
                                  Supported formats: JPG, PNG, WEBP, GIF.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Full Name Input (Editable) */}
                          <div style={{ marginBottom: "1.5rem" }}>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#fff", marginBottom: "0.5rem" }}>
                              Full Name <span style={{ color: "#ef4444" }}>*</span>
                            </label>
                            <input
                              type="text"
                              required
                              value={profileEditName}
                              onChange={(e) => setProfileEditName(e.target.value)}
                              placeholder="Enter your full name"
                              style={{
                                width: "100%",
                                background: "rgba(0, 0, 0, 0.25)",
                                border: "1px solid var(--purple)",
                                borderRadius: "10px",
                                padding: "0.75rem 1rem",
                                color: "#fff",
                                fontSize: "0.95rem",
                                outline: "none",
                                boxShadow: "0 0 10px rgba(139, 92, 246, 0.2)",
                              }}
                            />
                          </div>

                          {/* Email Address */}
                          <div style={{ marginBottom: "2rem" }}>
                            <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                              Email Address
                            </label>
                            <input
                              type="email"
                              readOnly
                              disabled
                              value={profileUser.email}
                              style={{
                                width: "100%",
                                background: "rgba(0, 0, 0, 0.45)",
                                border: "1px solid rgba(255, 255, 255, 0.08)",
                                borderRadius: "10px",
                                padding: "0.75rem 1rem",
                                color: "#64748b",
                                fontSize: "0.95rem",
                                cursor: "not-allowed",
                              }}
                            />
                          </div>

                          {/* Action Buttons */}
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.85rem", borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
                            <button
                              type="button"
                              className="btn btn-outline"
                              onClick={() => {
                                setIsEditingProfile(false);
                                setProfileEditName(profileUser.name);
                                setProfileEditAvatar(profileUser.avatar);
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="btn btn-primary"
                              style={{
                                boxShadow: "0 4px 15px rgba(139, 92, 246, 0.35)",
                              }}
                            >
                              Save Changes
                            </button>
                          </div>
                        </form>
                      )}
                    </>
                  )}

                  {/* ════════ TAB 2: CHANGE PASSWORD ════════ */}
                  {activeProfileTab === "password" && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setPasswordError("");
                        setPasswordSuccess(false);

                        // 1. Validation: Current password check
                        if (!oldPassword.trim()) {
                          setPasswordError("Please enter your current password.");
                          return;
                        }

                        // 2. Validation: Minimum 6 characters for new password
                        if (newPassword.length < 6) {
                          setPasswordError("New password must be at least 6 characters long.");
                          return;
                        }

                        // 3. Validation: Confirm password must be entered
                        if (!confirmPassword.trim()) {
                          setPasswordError("Please enter the confirm password.");
                          return;
                        }

                        // 4. Validation: Match new password & confirm password
                        if (newPassword !== confirmPassword) {
                          setPasswordError("New password and confirm password do not match.");
                          return;
                        }

                        // Success: Reset password form
                        setPasswordSuccess(true);
                        setOldPassword("");
                        setNewPassword("");
                        setConfirmPassword("");
                        setTimeout(() => setPasswordSuccess(false), 5000);
                      }}
                      style={{
                        background: "rgba(22, 27, 46, 0.8)",
                        border: "1px solid var(--border)",
                        borderRadius: "18px",
                        padding: "2rem",
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.35)",
                      }}
                    >
                      <div style={{ marginBottom: "1.75rem", borderBottom: "1px solid var(--border)", paddingBottom: "1rem" }}>
                        <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: 0 }}>
                          Change Password
                        </h2>
                        <p style={{ margin: "0.25rem 0 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>
                          Ensure your account stays secure by using a strong password of at least 6 characters.
                        </p>
                      </div>

                      {/* Error Alert */}
                      {passwordError && (
                        <div
                          style={{
                            background: "rgba(239, 68, 68, 0.12)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            color: "#f87171",
                            borderRadius: "12px",
                            padding: "0.85rem 1.25rem",
                            marginBottom: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            fontSize: "0.88rem",
                            animation: "fadeInDown 0.2s ease-out",
                          }}
                        >
                          <span style={{ fontSize: "1.1rem" }}>⚠️</span>
                          <span>{passwordError}</span>
                        </div>
                      )}

                      {/* Success Alert */}
                      {passwordSuccess && (
                        <div
                          style={{
                            background: "rgba(16, 185, 129, 0.12)",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                            color: "#34d399",
                            borderRadius: "12px",
                            padding: "0.85rem 1.25rem",
                            marginBottom: "1.5rem",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.6rem",
                            fontSize: "0.9rem",
                            animation: "fadeInDown 0.2s ease-out",
                          }}
                        >
                          <span style={{ fontSize: "1.1rem" }}>✅</span>
                          <span>Password changed successfully! Your account credentials have been updated.</span>
                        </div>
                      )}

                      {/* 1. Current Password */}
                      <div style={{ marginBottom: "1.5rem" }}>
                        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#fff", marginBottom: "0.5rem" }}>
                          Current Password <span style={{ color: "#ef4444" }}>*</span>
                        </label>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showOldPassword ? "text" : "password"}
                            value={oldPassword}
                            onChange={(e) => {
                              setOldPassword(e.target.value);
                              if (passwordError) setPasswordError("");
                            }}
                            placeholder="Enter current password"
                            style={{
                              width: "100%",
                              background: "rgba(0, 0, 0, 0.25)",
                              border: "1px solid var(--border)",
                              borderRadius: "10px",
                              padding: "0.75rem 2.75rem 0.75rem 1rem",
                              color: "#fff",
                              fontSize: "0.95rem",
                              outline: "none",
                              transition: "border-color 0.2s ease",
                            }}
                            onFocus={e => (e.target.style.borderColor = "var(--purple)")}
                            onBlur={e => (e.target.style.borderColor = "var(--border)")}
                          />
                          <button
                            type="button"
                            onClick={() => setShowOldPassword(prev => !prev)}
                            title={showOldPassword ? "Hide password" : "Show password"}
                            aria-label={showOldPassword ? "Hide password" : "Show password"}
                            style={{
                              position: "absolute",
                              right: "12px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "none",
                              border: "none",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "4px",
                              transition: "color 0.15s ease",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--purple-light)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                          >
                            {showOldPassword ? (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* 2. New Password */}
                      <div style={{ marginBottom: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>
                            New Password <span style={{ color: "#ef4444" }}>*</span>
                          </label>
                          <span style={{ fontSize: "0.74rem", color: newPassword.length >= 6 ? "#34d399" : "var(--text-muted)" }}>
                            {newPassword.length >= 6 ? "✓ Minimum 6 characters met" : "Minimum 6 characters"}
                          </span>
                        </div>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showNewPassword ? "text" : "password"}
                            value={newPassword}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              if (passwordError) setPasswordError("");
                            }}
                            placeholder="Enter new password (min. 6 characters)"
                            style={{
                              width: "100%",
                              background: "rgba(0, 0, 0, 0.25)",
                              border: "1px solid var(--border)",
                              borderRadius: "10px",
                              padding: "0.75rem 2.75rem 0.75rem 1rem",
                              color: "#fff",
                              fontSize: "0.95rem",
                              outline: "none",
                              transition: "border-color 0.2s ease",
                            }}
                            onFocus={e => (e.target.style.borderColor = "var(--purple)")}
                            onBlur={e => (e.target.style.borderColor = "var(--border)")}
                          />
                          <button
                            type="button"
                            onClick={() => setShowNewPassword(prev => !prev)}
                            title={showNewPassword ? "Hide password" : "Show password"}
                            aria-label={showNewPassword ? "Hide password" : "Show password"}
                            style={{
                              position: "absolute",
                              right: "12px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "none",
                              border: "none",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "4px",
                              transition: "color 0.15s ease",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--purple-light)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                          >
                            {showNewPassword ? (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* 3. Confirm Password */}
                      <div style={{ marginBottom: "2rem" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#fff" }}>
                            Confirm New Password <span style={{ color: "#ef4444" }}>*</span>
                          </label>
                          {confirmPassword && (
                            <span style={{ fontSize: "0.74rem", color: newPassword === confirmPassword ? "#34d399" : "#ef4444" }}>
                              {newPassword === confirmPassword ? "✓ Passwords match" : "✕ Passwords do not match"}
                            </span>
                          )}
                        </div>
                        <div style={{ position: "relative" }}>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              if (passwordError) setPasswordError("");
                            }}
                            placeholder="Confirm your new password"
                            style={{
                              width: "100%",
                              background: "rgba(0, 0, 0, 0.25)",
                              border: "1px solid var(--border)",
                              borderRadius: "10px",
                              padding: "0.75rem 2.75rem 0.75rem 1rem",
                              color: "#fff",
                              fontSize: "0.95rem",
                              outline: "none",
                              transition: "border-color 0.2s ease",
                            }}
                            onFocus={e => (e.target.style.borderColor = "var(--purple)")}
                            onBlur={e => (e.target.style.borderColor = "var(--border)")}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(prev => !prev)}
                            title={showConfirmPassword ? "Hide password" : "Show password"}
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                            style={{
                              position: "absolute",
                              right: "12px",
                              top: "50%",
                              transform: "translateY(-50%)",
                              background: "none",
                              border: "none",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              padding: "4px",
                              transition: "color 0.15s ease",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.color = "var(--purple-light)")}
                            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-muted)")}
                          >
                            {showConfirmPassword ? (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle cx="12" cy="12" r="3" />
                              </svg>
                            ) : (
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                <line x1="1" y1="1" x2="23" y2="23" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "0.85rem", borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
                        <button
                          type="button"
                          className="btn btn-outline"
                          onClick={() => {
                            setOldPassword("");
                            setNewPassword("");
                            setConfirmPassword("");
                            setPasswordError("");
                          }}
                        >
                          Clear
                        </button>
                        <button
                          type="submit"
                          className="btn btn-primary"
                          style={{
                            boxShadow: "0 4px 15px rgba(139, 92, 246, 0.35)",
                          }}
                        >
                          Update Password
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              }
            />

            {/* ════════ CUSTOMERS ROUTE ════════ */}
            <Route
              path="/customers"
              element={
                <CustomersPage
                  customers={customersList}
                  setCustomers={setCustomersList}
                />
              }
            />

            {/* ════════ CUSTOMER DETAILS SUBPAGE ROUTE (/customers/:customerId) ════════ */}
            <Route
              path="/customers/:customerId"
              element={
                <CustomerDetailsSubpage
                  customersList={customersList}
                  onArchiveCustomer={(updatedCust) => {
                    setCustomersList(prev =>
                      prev.map(c => (c.id === updatedCust.id ? updatedCust : c))
                    );
                  }}
                />
              }
            />

            {/* ════════ CONTENT / CMS ROUTE ════════ */}
            <Route path="/content" element={<ContentCMSPage />} />

            {/* ════════ FINANCES ROUTE ════════ */}
            <Route path="/finances" element={<FinancesPage />} />
            <Route path="/finances/khatabook" element={<KhatabookSubpage />} />

            {/* ════════ DISCOUNTS ROUTE (Before Notifications Send) ════════ */}
            <Route path="/discounts" element={<DiscountsPage />} />
            <Route path="/discounts/new" element={<CreateDiscountSubpage />} />
            <Route path="/discounts/:discountId" element={<CouponUsageSubpage />} />

            {/* ════════ NOTIFICATIONS SEND ROUTE ════════ */}
            <Route
              path="/notifications-send"
              element={
                <NotificationsSendPage
                  onBroadcastSent={(newNotif) => {
                    setNotifications(prev => [newNotif, ...prev]);
                  }}
                />
              }
            />
            <Route
              path="/notifications-send/new"
              element={
                <SendNotificationSubpage
                  customers={customersList}
                  onBroadcastSent={(newNotif) => {
                    setNotifications(prev => [newNotif, ...prev]);
                  }}
                />
              }
            />

            {/* ════════ QUERIES ROUTE (After Notifications Send) ════════ */}
            <Route path="/queries" element={<QueriesPage />} />
            <Route path="/queries/:queryId" element={<QueryReplySubpage />} />

            {/* ════════ PRODUCT VIEW DETAILS SUBPAGE ════════ */}
            <Route
              path="/products/:productId"
              element={
                <ProductDetailsSubpage
                  productsList={productsList}
                  onArchiveProduct={handleArchiveProduct}
                />
              }
            />

            {/* ════════ PRODUCT CUSTOMER REVIEWS & RATINGS SUBPAGE ════════ */}
            <Route
              path="/products/:productId/reviews"
              element={
                <ProductReviewsSubpage
                  productsList={productsList}
                  onDeleteReview={handleDeleteProductReview}
                />
              }
            />

            {/* ════════ PRODUCT ADD & EDIT SUBPAGES ════════ */}
            <Route
              path="/products/new"
              element={
                <ProductFormSubpage
                  productsList={productsList}
                  onSaveProduct={handleSaveProduct}
                />
              }
            />
            <Route
              path="/products/:productId/edit"
              element={
                <ProductFormSubpage
                  productsList={productsList}
                  onSaveProduct={handleSaveProduct}
                />
              }
            />

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      {/* ════════ LOGOUT CONFIRMATION MODAL ════════ */}
      {showLogoutConfirm && (
        <div
          className="order-modal-overlay"
          onClick={() => setShowLogoutConfirm(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "1rem",
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          <div
            className="logout-modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "420px",
              background: "#161b2e",
              border: "1px solid rgba(239, 68, 68, 0.35)",
              borderRadius: "18px",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(239, 68, 68, 0.15)",
              overflow: "hidden",
              animation: "scaleUp 0.2s ease-out",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "1.5rem 1.5rem 1rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(239, 68, 68, 0.15)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  fontSize: "1.75rem",
                }}
              >
                🚪
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: "0 0 0.4rem" }}>
                Confirm Logout?
              </h3>
              <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.5 }}>
                Are you sure you want to log out of the admin panel?
              </p>
            </div>

            {/* Modal Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                padding: "1rem 1.5rem",
                background: "rgba(0, 0, 0, 0.25)",
                borderTop: "1px solid var(--border)",
              }}
            >
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1,
                  padding: "0.65rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false);
                  localStorage.removeItem("sb_admin_auth");
                  setIsAuthenticated(false);
                  navigate("/dashboard");
                }}
                style={{
                  flex: 1,
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  padding: "0.65rem 1rem",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: "0 4px 15px rgba(239, 68, 68, 0.4)",
                  transition: "opacity 0.15s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════ ARCHIVE PRODUCT CONFIRMATION MODAL ════════ */}
      {productToArchive && (
        <div
          className="order-modal-overlay"
          onClick={() => setProductToArchive(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "1rem",
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          <div
            className="archive-modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "430px",
              background: "#161b2e",
              border: productToArchive.status === "archived"
                ? "1px solid rgba(52, 211, 153, 0.35)"
                : "1px solid rgba(251, 191, 36, 0.35)",
              borderRadius: "18px",
              boxShadow: productToArchive.status === "archived"
                ? "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(52, 211, 153, 0.15)"
                : "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(251, 191, 36, 0.15)",
              overflow: "hidden",
              animation: "scaleUp 0.2s ease-out",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "1.5rem 1.5rem 1rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: productToArchive.status === "archived"
                    ? "rgba(52, 211, 153, 0.15)"
                    : "rgba(251, 191, 36, 0.15)",
                  border: productToArchive.status === "archived"
                    ? "1px solid rgba(52, 211, 153, 0.3)"
                    : "1px solid rgba(251, 191, 36, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  fontSize: "1.75rem",
                }}
              >
                {productToArchive.status === "archived" ? "📦" : "📁"}
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: "0 0 0.4rem" }}>
                {productToArchive.status === "archived" ? "Unarchive Product?" : "Archive Product?"}
              </h3>
              <p style={{ margin: "0 0 0.75rem", color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.5 }}>
                {productToArchive.status === "archived"
                  ? `Restore "${productToArchive.name}" back to product list?`
                  : `Are you sure you want to archive "${productToArchive.name}"?`}
              </p>
              <div
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.05)",
                  fontSize: "0.78rem",
                  color: "var(--text-secondary)",
                }}
              >
                SKU: <strong>{productToArchive.sku}</strong> • Price: <strong>{productToArchive.price}</strong>
              </div>
            </div>

            {/* Modal Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                padding: "1rem 1.5rem",
                background: "rgba(0, 0, 0, 0.25)",
                borderTop: "1px solid var(--border)",
              }}
            >
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setProductToArchive(null)}
                style={{
                  flex: 1,
                  padding: "0.65rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmArchiveProduct}
                style={{
                  flex: 1,
                  background: productToArchive.status === "archived"
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #f59e0b, #d97706)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  padding: "0.65rem 1rem",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: productToArchive.status === "archived"
                    ? "0 4px 15px rgba(16, 185, 129, 0.4)"
                    : "0 4px 15px rgba(245, 158, 11, 0.4)",
                  transition: "opacity 0.15s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {productToArchive.status === "archived" ? "Yes, Unarchive" : "Yes, Archive"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ════════ ARCHIVE CATEGORY CONFIRMATION MODAL ════════ */}
      {categoryToArchive && (
        <div
          className="order-modal-overlay"
          onClick={() => setCategoryToArchive(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.75)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "1rem",
            animation: "fadeIn 0.15s ease-out",
          }}
        >
          <div
            className="archive-modal-content"
            onClick={e => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "430px",
              background: "#161b2e",
              border: categoryToArchive.status === "archived"
                ? "1px solid rgba(52, 211, 153, 0.35)"
                : "1px solid rgba(251, 191, 36, 0.35)",
              borderRadius: "18px",
              boxShadow: categoryToArchive.status === "archived"
                ? "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(52, 211, 153, 0.15)"
                : "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 25px rgba(251, 191, 36, 0.15)",
              overflow: "hidden",
              animation: "scaleUp 0.2s ease-out",
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                padding: "1.5rem 1.5rem 1rem",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: categoryToArchive.status === "archived"
                    ? "rgba(52, 211, 153, 0.15)"
                    : "rgba(251, 191, 36, 0.15)",
                  border: categoryToArchive.status === "archived"
                    ? "1px solid rgba(52, 211, 153, 0.3)"
                    : "1px solid rgba(251, 191, 36, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                  fontSize: "1.75rem",
                }}
              >
                {categoryToArchive.status === "archived" ? "📦" : "📁"}
              </div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff", margin: "0 0 0.4rem" }}>
                {categoryToArchive.status === "archived" ? "Unarchive Category?" : "Archive Category?"}
              </h3>
              <p style={{ margin: "0 0 0.75rem", color: "var(--text-muted)", fontSize: "0.88rem", lineHeight: 1.5 }}>
                {categoryToArchive.status === "archived"
                  ? `Restore "${categoryToArchive.name}" back to category list?`
                  : `Are you sure you want to archive "${categoryToArchive.name}"?`}
              </p>
              <div
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "6px",
                  background: "rgba(255, 255, 255, 0.05)",
                  fontSize: "0.78rem",
                  color: "var(--text-secondary)",
                }}
              >
                Slug: <strong>/{categoryToArchive.slug}</strong> • Total Items: <strong>{categoryToArchive.count || 0}</strong>
              </div>
            </div>

            {/* Modal Actions */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                padding: "1rem 1.5rem",
                background: "rgba(0, 0, 0, 0.25)",
                borderTop: "1px solid var(--border)",
              }}
            >
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setCategoryToArchive(null)}
                style={{
                  flex: 1,
                  padding: "0.65rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmArchiveCategory}
                style={{
                  flex: 1,
                  background: categoryToArchive.status === "archived"
                    ? "linear-gradient(135deg, #10b981, #059669)"
                    : "linear-gradient(135deg, #f59e0b, #d97706)",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  padding: "0.65rem 1rem",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: categoryToArchive.status === "archived"
                    ? "0 4px 15px rgba(16, 185, 129, 0.4)"
                    : "0 4px 15px rgba(245, 158, 11, 0.4)",
                  transition: "opacity 0.15s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "0.9")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
              >
                {categoryToArchive.status === "archived" ? "Yes, Unarchive" : "Yes, Archive"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
