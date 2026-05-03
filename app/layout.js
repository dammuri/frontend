"use client";

import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 dark:bg-gray-900">

        {/* NAVBAR */}
        <Navbar />

        {/* MAIN CONTENT (fix overlap here) */}
        <main className="pt-20 px-4 md:px-8">
          {children}
        </main>

      </body>
    </html>
  );
}