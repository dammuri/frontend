"use client";

import { useEffect, useState } from "react";
import API from "./api";

export default function useUser() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      return;
    }

    API.get("/users/me")
      .then(res => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  return user;
}