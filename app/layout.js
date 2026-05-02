"use client";

import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 dark:bg-gray-900`}>

        <div className="min-h-screen flex flex-col">

          <Navbar />

          <main className="flex-1">
            {children}
          </main>

          <Footer />

        </div>

        <Toaster position="top-right" />

      </body>
    </html>
  );
}