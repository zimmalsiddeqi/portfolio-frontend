import api from "./api";

const uploadService = {
  uploadCover: async (file, projectId = null) => {
    const formData = new FormData();
    formData.append("image", file);
    if (projectId) formData.append("projectId", projectId);

    return await api.post("/upload/cover", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  uploadScreenshots: async (files, projectId = null) => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    if (projectId) formData.append("projectId", projectId);

    return await api.post("/upload/screenshots", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    return await api.post("/upload/avatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  uploadResume: async (file) => {
    const formData = new FormData();
    formData.append("resume", file);

    return await api.post("/upload/resume", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  deleteFile: async (bucket, fileName) => {
    return await api.delete(`/upload/${bucket}/${fileName}`);
  },

  deleteScreenshot: async (projectId, screenshotUrl) => {
    return await api.post("/upload/screenshots/delete", { projectId, screenshotUrl });
  },
};

export default uploadService;