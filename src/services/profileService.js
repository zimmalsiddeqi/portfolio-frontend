import api from "./api";

const profileService = {
  get: async () => {
    return await api.get("/profile");
  },

  update: async (data) => {
    return await api.put("/profile", data);
  },

  updateSocial: async (data) => {
    return await api.put("/profile/social", data);
  },

  updateSkills: async (skills) => {
    return await api.put("/profile/skills", { skills });
  },
};

export default profileService;