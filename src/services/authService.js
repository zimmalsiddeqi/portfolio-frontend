import api from "./api";

const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    if (response.data?.session?.access_token) {
      localStorage.setItem("auth_token", response.data.session.access_token);
    }
    return response;
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } finally {
      localStorage.removeItem("auth_token");
    }
  },

  getMe: async () => {
    return await api.get("/auth/me");
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("auth_token");
  },
};

export default authService;