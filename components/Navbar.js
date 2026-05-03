"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import API from "../lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    API.get("/users/me")
      .then((res) => setUser(res.data))
      .catch(() => localStorage.removeItem("token"));
  }, []);

  // close profile dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (!profileRef.current?.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 w-full backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="font-bold text-blue-600 text-lg">
          Portfolio
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>

          {user ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2"
              >
                <img
                  src={
                    user.image
                      ? `${BASE_URL}/${user.image}`
                      : "https://i.pravatar.cc/40"
                  }
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span>{user.username}</span>
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 rounded-xl shadow">
                  <Link className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700" href="/profile">
                    Profile
                  </Link>

                  {user.is_admin && (
                    <Link className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700" href="/admin">
                      Admin
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 pb-4 space-y-3 shadow">

          <Link href="/" className="block">Home</Link>
          <Link href="/portfolio" className="block">Portfolio</Link>

          {user ? (
            <>
              <Link href="/profile" className="block">Profile</Link>

              {user.is_admin && (
                <Link href="/admin" className="block">Admin</Link>
              )}

              <button
                onClick={logout}
                className="block text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block">Login</Link>
              <Link href="/register" className="block text-blue-500 font-semibold">
                Register
              </Link>
            </>
          )}

        </div>
      )}
    </nav>
  );
}