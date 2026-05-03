"use client";

import { useState } from "react";
import API from "../../lib/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await API.post("/users/login", { username, password });
      localStorage.setItem("token", res.data.access_token);
      window.location.href = "/profile";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh]">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-96">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Welcome Back
        </h2>

        <input
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 mb-6 rounded-lg focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
}