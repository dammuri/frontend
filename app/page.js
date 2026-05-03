"use client";

import AnimatedPage from "../components/AnimatedPage";

// 🔥 your Supabase image (CHANGE if needed)
const BG_IMAGE =
  "https://qoommaskjnisnqckjgov.supabase.co/storage/v1/object/public/uploads/logoweb.png";

export default function Home() {
  return (
    <AnimatedPage>

      {/* ================= HERO ================= */}
      <div className="relative h-[85vh] flex items-center justify-center text-center text-white overflow-hidden">

        {/* BACKGROUND */}
        <img
          src={BG_IMAGE}
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1522202176988-66273c2fd55f";
          }}
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-3xl px-6">

          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
            Build Your Professional Portfolio
          </h1>

          <p className="text-gray-300 text-lg md:text-xl mb-8">
            Showcase your skills, achievements, and certificates in one place.
          </p>

          <div className="flex flex-wrap justify-center gap-4">

            <a
              href="/portfolio"
              className="px-7 py-3 bg-blue-600 rounded-xl shadow-lg hover:bg-blue-700 hover:scale-105 transition"
            >
              Anggota Kami
            </a>

            <a
              href="/register"
              className="px-7 py-3 border border-white/70 rounded-xl bg-white/10 backdrop-blur-md hover:bg-white hover:text-black transition"
            >
              Mari Mulai
            </a>

          </div>

        </div>
      </div>

      {/* ================= FEATURES ================= */}
      <div className="container py-20">

        <h2 className="text-3xl font-bold text-center mb-12">
          Why Use Our Platform?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Easy Profile</h3>
            <p className="text-gray-500 text-sm">
              Create and manage your personal profile easily.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Showcase Skills</h3>
            <p className="text-gray-500 text-sm">
              Highlight your expertise and achievements.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg mb-2">Upload Certificates</h3>
            <p className="text-gray-500 text-sm">
              Display your certifications professionally.
            </p>
          </div>

        </div>
      </div>

    </AnimatedPage>
  );
}