"use client";

import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(process.env.NEXT_PUBLIC_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      })
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(() => setUser(null));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login"; // force refresh
  };

  return (
    <nav className="bg-white/70 backdrop-blur border-b sticky top-0 z-50">
      <div className="container flex justify-between py-4">

        <h1 className="font-bold text-blue-600">Portfolio</h1>

        <div className="flex gap-4 items-center text-sm">

          <a href="/">Home</a>
          <a href="/portfolio">Portfolio</a>

          {user ? (
            <>
              <a href="/profile">Profile</a>

              {user.is_admin && <a href="/admin">Admin</a>}

              <button
                onClick={logout}
                className="text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <a href="/login">Login</a>
          )}

        </div>
      </div>
    </nav>
  );
}