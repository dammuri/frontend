"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("user"));
      setUser(stored);
    } catch {}
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur border-b shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* LOGO */}
        <Link href="/" className="text-blue-600 font-bold text-lg">
          Portfolio
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>

          {user ? (
            <div className="relative">
              <div
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <img
                  src={
                    user.image ||
                    `https://ui-avatars.com/api/?name=${user.username}`
                  }
                  className="w-9 h-9 rounded-full object-cover"
                />
                <span className="text-sm">{user.username}</span>
              </div>

              {open && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow p-2">
                  <Link href="/profile" className="block px-3 py-2 hover:bg-gray-100">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-3 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="md:hidden text-xl"
          onClick={() => setMobile(!mobile)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {mobile && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-3">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>

          {user ? (
            <>
              <Link href="/profile">Profile</Link>
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}