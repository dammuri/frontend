"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUser from "../lib/useUser";

export default function Protected({ children, adminOnly = false }) {
  const user = useUser();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // ⏳ still loading user → do nothing
    if (user === undefined) return;

    // ❌ not logged in
    if (!user) {
      router.push("/login");
      return;
    }

    // ❌ not admin
    if (adminOnly && !user.is_admin) {
      router.push("/");
      return;
    }

    // ✅ safe to render
    setReady(true);
  }, [user, adminOnly]);

  // ⏳ still checking
  if (!ready) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  return children;
}