import axios from "axios";

const formatBaseUrl = (url) => {
  let target = (url || "").trim();
  if (!target) return "http://localhost:5000/api";

  // If target doesn't start with http://, https://, or /, prepend https://
  if (!target.startsWith("http://") && !target.startsWith("https://") && !target.startsWith("/")) {
    target = `https://${target}`;
  }

  // Remove trailing slashes
  target = target.replace(/\/+$/, "");

  // If target does not end with /api, append /api
  if (!target.endsWith("/api")) {
    target = `${target}/api`;
  }

  return target;
};

const API_BASE_URL = formatBaseUrl(import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request interceptor - add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors
api.interceptors.response.use(
  (response) => {
    // If response is HTML instead of JSON (e.g. hitting frontend SPA fallback)
    if (typeof response.data === "string" && response.data.trim().startsWith("<")) {
      throw { success: false, message: "Invalid API response format (HTML received)" };
    }
    return response.data;
  },
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        localStorage.removeItem("auth_token");
        if (window.location.pathname.startsWith("/admin") && window.location.pathname !== "/admin/login") {
          window.location.href = "/admin/login";
        }
      }
      throw error.response.data || { success: false, message: "Server error" };
    }
    throw { success: false, message: error.message || "Network error. Please check your connection." };
  }
);

export default api;