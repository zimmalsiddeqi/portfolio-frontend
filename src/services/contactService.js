import api from "./api";

const contactService = {
  send: async (data) => {
    return await api.post("/contact", data);
  },

  getAll: async (params = {}) => {
    return await api.get("/contact", { params });
  },

  getById: async (id) => {
    return await api.get(`/contact/${id}`);
  },

  toggleRead: async (id) => {
    return await api.patch(`/contact/${id}/read`);
  },

  delete: async (id) => {
    return await api.delete(`/contact/${id}`);
  },

  getUnreadCount: async () => {
    return await api.get("/contact/unread-count");
  },
};

export default contactService;