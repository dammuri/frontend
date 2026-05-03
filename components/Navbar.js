"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import API from "../lib/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    API.get("/users/me")
      .then((res) => {
        console.log("USER:", res.data);
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
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
      <div className="container mx-auto flex justify-between items-center py-4 px-6">

        {/* LOGO */}
        <Link href="/" className="font-bold text-blue-600 text-lg">
          Portfolio
        </Link>

        {/* NAV */}
        <div className="flex items-center gap-6">

          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>

          {user ? (
            <div className="relative" ref={dropdownRef}>

              {/* PROFILE BUTTON */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 hover:opacity-80 transition"
              >
                <img
                  src={
                    user.image
                      ? `${BASE_URL}/${user.image}?ngrok-skip-browser-warning=true`
                      : "https://i.pravatar.cc/40"
                  }
                  className="w-9 h-9 rounded-full object-cover border"
                />

                <span className="font-medium hidden md:block">
                  {user.username}
                </span>
              </button>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">

                  <Link
                    href="/profile"
                    className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    👤 Profile
                  </Link>

                  {user.is_admin && (
                    <Link
                      href="/admin"
                      className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      ⚙️ Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    🚪 Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">Login</Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}