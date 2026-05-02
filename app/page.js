"use client";

import AnimatedPage from "../components/AnimatedPage";

export default function Home() {
  return (
    <AnimatedPage>
      {/* HERO SECTION */}
      <div className="relative h-[80vh] flex items-center justify-center text-center text-white">

        {/* BACKGROUND IMAGE */}
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"/*<- ganti gambar disini ini untuk gambar home */
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60" />

        {/* CONTENT */}
        <div className="relative z-10 max-w-2xl px-4">

          <h1 className="text-5xl font-bold mb-4">
            Build Your Professional Portfolio
          </h1>

          <p className="text-lg text-gray-200 mb-6">
            Showcase your skills, achievements, and certificates in one place.
          </p>

          <div className="flex justify-center gap-4">

            <a
              href="/portfolio"
              className="px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700 transition"
            >
              Anggota Kami
            </a>

            <a
              href="/"
              className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition"
            >
              Mari Mulai
            </a>

          </div>

        </div>
      </div>

      {/* FEATURES SECTION */}
      <div className="container py-20">

        <h2 className="text-3xl font-bold text-center mb-12">
          Why Use Our Platform?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-center">

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">Easy Profile</h3>
            <p className="text-gray-500 text-sm">
              Create and manage your personal profile easily.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">Showcase Skills</h3>
            <p className="text-gray-500 text-sm">
              Highlight your expertise and achievements.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
            <h3 className="font-semibold text-lg mb-2">Upload Certificates</h3>
            <p className="text-gray-500 text-sm">
              Display your certifications professionally.
            </p>
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      {/* <div className="bg-blue-600 text-white py-16 text-center">

        <h2 className="text-3xl font-bold mb-4">
          Start Building Your Portfolio Today
        </h2>

        <a
          href="/"
          className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition"
        >
          Bergabung Sekarang
        </a>

      </div> */}
    </AnimatedPage>
  );
}