import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  config.headers["ngrok-skip-browser-warning"] = "true";

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;