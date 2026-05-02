"use client";

import { useState } from "react";
import API from "../../lib/api";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const send = async () => {
    await API.post("/contact", { email, message });
    alert("Message sent!");
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white p-6 rounded-xl shadow w-96">
        <h2 className="text-xl font-bold mb-4">Contact</h2>

        <input
          className="border p-2 w-full mb-3 rounded"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          className="border p-2 w-full mb-3 rounded"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          onClick={send}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
}