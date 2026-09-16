import api from "./api";

const projectService = {
  getAll: async (params = {}) => {
    return await api.get("/projects", { params });
  },

  getFeatured: async () => {
    return await api.get("/projects/featured");
  },

  getBySlug: async (slug) => {
    return await api.get(`/projects/slug/${slug}`);
  },

  getById: async (id) => {
    return await api.get(`/projects/${id}`);
  },

  create: async (data) => {
    return await api.post("/projects", data);
  },

  update: async (id, data) => {
    return await api.put(`/projects/${id}`, data);
  },

  delete: async (id) => {
    return await api.delete(`/projects/${id}`);
  },

  toggleFeatured: async (id) => {
    return await api.patch(`/projects/${id}/feature`);
  },

  updateOrder: async (id, displayOrder) => {
    return await api.patch(`/projects/${id}/order`, { display_order: displayOrder });
  },
};

export default projectService;