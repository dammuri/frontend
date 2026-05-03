"use client";

import AnimatedPage from "../components/AnimatedPage";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 🔥 background helper
const getBg = () => {
  return `${BASE_URL}/uploads/logoweb.png?ngrok-skip-browser-warning=true`;
};

export default function Home() {
  return (
    <AnimatedPage>

      {/* ================= HERO ================= */}
      <div className="hero">

        {/* BACKGROUND */}
        <img
          src={getBg()}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f";
          }}
          className="hero-bg"
        />

        {/* OVERLAY */}
        <div className="hero-overlay" />

        {/* CONTENT */}
        <div className="hero-content">

          <h1 className="hero-title">
            Build Your Professional Portfolio
          </h1>

          <p className="hero-subtitle">
            Showcase your skills, achievements, and certificates in one place.
          </p>

          <div className="hero-buttons">

            <a href="/portfolio" className="btn-primary">
              Anggota Kami
            </a>

            <a href="/register" className="btn-secondary">
              Mari Mulai
            </a>

          </div>

        </div>
      </div>

      {/* ================= FEATURES ================= */}
      <div className="container py-20">

        <h2 className="section-title">
          Why Use Our Platform?
        </h2>

        <div className="feature-grid">

          <div className="feature-card">
            <h3>Easy Profile</h3>
            <p>Create and manage your personal profile easily.</p>
          </div>

          <div className="feature-card">
            <h3>Showcase Skills</h3>
            <p>Highlight your expertise and achievements.</p>
          </div>

          <div className="feature-card">
            <h3>Upload Certificates</h3>
            <p>Display your certifications professionally.</p>
          </div>

        </div>
      </div>

    </AnimatedPage>
  );
}