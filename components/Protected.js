"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useUser from "../lib/useUser";

export default function Protected({ children, adminOnly = false }) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    // ❌ Not logged in
    if (user === null) {
      router.push("/login");
      return;
    }

    // ❌ Not admin but trying admin page
    if (adminOnly && user && !user.is_admin) {
      router.push("/");
    }
  }, [user, adminOnly]);

  // ⏳ Loading state
  if (user === undefined) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  return children;
}