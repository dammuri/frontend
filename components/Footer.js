"use client";

import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-300 mt-16">

      <div className="container py-12 grid md:grid-cols-4 gap-8">

        {/* BRAND */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Portfolio
          </h2>
          <p className="text-sm text-gray-400">
            A modern platform to showcase your skills, projects, and achievements professionally.
          </p>
        </div>

        {/* NAVIGATION */}
        <div>
          <h3 className="font-semibold text-white mb-3">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="/portfolio" className="hover:text-blue-400 transition">Portfolio</a></li>
            <li><a href="/login" className="hover:text-blue-400 transition">Login</a></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>kelompok4ptikb@gmail.com</li>
            <li>Universitas Negeri Medan</li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-semibold text-white mb-3">Follow Us</h3>

          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-400 transition">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-blue-400 transition">
              <FaEnvelope />
            </a>
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 text-center py-4 text-sm text-gray-400">
        © 2026 Portfolio Platform. All rights reserved.
      </div>

    </footer>
  );
}