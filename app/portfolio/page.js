"use client";

import { useEffect, useState } from "react";
import API from "../../lib/api";
import Link from "next/link";
import AnimatedPage from "../../components/AnimatedPage";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Portfolio() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    API.get("/users/public").then((res) => setUsers(res.data));
  }, []);

  // 🔥 FILTER LOGIC (regex-like behavior)
  const filteredUsers = users.filter((u) =>
    u.username?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatedPage>
      <div className="container py-10">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Members
        </h1>

        {/* 🔍 SEARCH BAR */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>

        {/* RESULTS COUNT */}
        <p className="text-center text-sm text-gray-500 mb-6">
          {filteredUsers.length} result(s)
        </p>

        {/* USER CARDS */}
        <div className="grid md:grid-cols-3 gap-6">

          {filteredUsers.length > 0 ? (
            filteredUsers.map((u) => (
              <Link
                key={u.id}
                href={`/portfolio/${u.id}`}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur rounded-2xl shadow hover:shadow-xl hover:scale-[1.02] transition overflow-hidden"
              >
                <img
                  src={
                    u.image
                      ? `${BASE_URL}/${u.image}`
                      : "https://via.placeholder.com/300"
                  }
                  className="h-48 w-full object-cover"
                />

                <div className="p-4 text-center">
                  <h2 className="font-semibold text-lg">{u.username}</h2>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {u.bio}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-3 text-gray-500">
              No users found
            </p>
          )}

        </div>

      </div>
    </AnimatedPage>
  );
}