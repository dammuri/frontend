"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import API from "../lib/api";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    API.get("/users/me")
      .then((res) => {
        console.log("USER:", res.data); // 🔥 DEBUG
        setUser(res.data);
      })
      .catch(() => {
        localStorage.removeItem("token");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow z-50">
      <div className="container mx-auto flex justify-between p-4">

        <Link href="/" className="font-bold text-blue-600">
          Portfolio
        </Link>

        <div className="space-x-6">
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>

          {!loading && user ? (
            <>
              <Link href="/profile">Profile</Link>

              {/* ✅ ADMIN BUTTON */}
              {user.is_admin === true && (
                <Link href="/admin" className="text-purple-600 font-semibold">
                  Admin
                </Link>
              )}

              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </>
          ) : !loading ? (
            <Link href="/login">Login</Link>
          ) : null}
        </div>

      </div>
    </nav>
  );
}