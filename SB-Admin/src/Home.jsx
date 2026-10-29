// Home.jsx – landing page with navbar, banner slider, and category grid
import { useEffect, useState } from "react";
import "./home.css";

// Simple image URLs for the slider (public domain placeholders)
const slides = [
  "https://images.unsplash.com/photo-1503264116251-35a269479413?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?auto=format&fit=crop&w=1200&q=80",
];

// Mock categories – you can replace with real data later
const categories = [
  { name: "Technology", img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80" },
  { name: "Design", img: "https://images.unsplash.com/photo-1506089676904-1e8e86b4d8e0?auto=format&fit=crop&w=400&q=80" },
  { name: "Travel", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80" },
  { name: "Food", img: "https://images.unsplash.com/photo-1512058564366-c9e9b03a8b3b?auto=format&fit=crop&w=400&q=80" },
];

export default function Home() {
  const [idx, setIdx] = useState(0);

  // Auto‑rotate slider every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="home-page">
      {/* ── Navbar ── */}
      <nav className="navbar card">
        <div className="logo">SB</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      {/* ── Banner Slider ── */}
      <section className="banner card">
        <img src={slides[idx]} alt="Banner slide" className="banner-img" />
      </section>

      {/* ── Category Grid ── */}
      <section className="categories card">
        <h2 className="section-title">Categories</h2>
        <div className="grid">
          {categories.map((cat) => (
            <div key={cat.name} className="category-card">
              <img src={cat.img} alt={cat.name} />
              <div className="cat-name">{cat.name}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
