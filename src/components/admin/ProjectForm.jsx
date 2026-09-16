import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { IoAdd, IoTrash, IoSave, IoArrowBack } from "react-icons/io5";
import Input from "../shared/Input";
import Button from "../shared/Button";
import ImageUploader from "./ImageUploader";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "../../utils/constants";
import projectService from "../../services/projectService";
import uploadService from "../../services/uploadService";

const initialData = {
  title: "",
  short_description: "",
  detailed_description: "",
  category: "Web App",
  technologies: [],
  github_url: "",
  live_url: "",
  cover_image_url: "",
  screenshots: [],
  status: "Completed",
  is_featured: false,
  display_order: 0,
  key_features: [],
  role: "",
  start_date: "",
  end_date: "",
  challenges_solutions: "",
};

const ProjectForm = ({ existingProject = null, mode = "create" }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialData);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingProject) {
      setFormData({
        ...initialData,
        ...existingProject,
        start_date: existingProject.start_date || "",
        end_date: existingProject.end_date || "",
        technologies: existingProject.technologies || [],
        screenshots: existingProject.screenshots || [],
        key_features: existingProject.key_features || [],
      });
    }
  }, [existingProject]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const addTag = (field, value, setValue) => {
    if (!value.trim()) return;
    if (formData[field].includes(value.trim())) {
      toast.error("Already added");
      return;
    }
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], value.trim()] }));
    setValue("");
  };

  const removeTag = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleCoverUpload = async (file) => {
    const response = await uploadService.uploadCover(file);
    setFormData((prev) => ({ ...prev, cover_image_url: response.data.url }));
  };

  const handleScreenshotsUpload = async (files) => {
    const response = await uploadService.uploadScreenshots(files);
    setFormData((prev) => ({
      ...prev,
      screenshots: [...prev.screenshots, ...response.data.urls],
    }));
  };

  const removeCover = () => {
    setFormData((prev) => ({ ...prev, cover_image_url: "" }));
  };

  const removeScreenshot = (url) => {
    setFormData((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((s) => s !== url),
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.short_description.trim()) newErrors.short_description = "Short description is required";
    if (!formData.detailed_description.trim()) newErrors.detailed_description = "Detailed description is required";
    if (formData.github_url && !/^https?:\/\//.test(formData.github_url)) newErrors.github_url = "Must be a valid URL";
    if (formData.live_url && !/^https?:\/\//.test(formData.live_url)) newErrors.live_url = "Must be a valid URL";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) toast.error("Please fix the form errors");
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const cleanData = { ...formData };
      if (!cleanData.github_url) delete cleanData.github_url;
      if (!cleanData.live_url) delete cleanData.live_url;
      if (!cleanData.start_date) delete cleanData.start_date;
      if (!cleanData.end_date) delete cleanData.end_date;
      if (!cleanData.role) delete cleanData.role;
      if (!cleanData.challenges_solutions) delete cleanData.challenges_solutions;

      if (mode === "edit") {
        await projectService.update(existingProject.id, cleanData);
        toast.success("Project updated successfully");
      } else {
        await projectService.create(cleanData);
        toast.success("Project created successfully");
      }
      navigate("/admin/projects");
    } catch (err) {
      toast.error(err.message || "Failed to save project");
      if (err.errors) {
        const errorMap = {};
        err.errors.forEach((e) => (errorMap[e.field] = e.message));
        setErrors(errorMap);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <button
            onClick={() => navigate("/admin/projects")}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-500 hover:text-primary-500 mb-2 transition-colors"
          >
            <IoArrowBack className="w-4 h-4" />
            Back to Projects
          </button>
          <h1 className="text-2xl sm:text-3xl font-display font-bold">
            {mode === "edit" ? "Edit Project" : "New Project"}
          </h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        {/* Basic Info */}
        <div className="admin-card space-y-4 sm:space-y-5 !p-4 sm:!p-6">
          <h2 className="text-base sm:text-lg font-semibold border-b border-gray-200 dark:border-dark-600 pb-3">
            Basic Information
          </h2>

          <Input label="Project Title *" name="title" placeholder="My Awesome Project" value={formData.title} onChange={handleChange} error={errors.title} />
          <Input label="Short Description *" name="short_description" placeholder="Brief description" value={formData.short_description} onChange={handleChange} error={errors.short_description} textarea rows={2} />
          <Input label="Detailed Description *" name="detailed_description" placeholder="Full description (Markdown supported)" value={formData.detailed_description} onChange={handleChange} error={errors.detailed_description} textarea rows={6} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Category *</label>
              <select name="category" value={formData.category} onChange={handleChange} className="input-glass text-sm sm:text-base">
                {PROJECT_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="input-glass text-sm sm:text-base">
                {PROJECT_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Links & Meta */}
        <div className="admin-card space-y-4 sm:space-y-5 !p-4 sm:!p-6">
          <h2 className="text-base sm:text-lg font-semibold border-b border-gray-200 dark:border-dark-600 pb-3">
            Links & Meta
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <Input label="GitHub URL" name="github_url" placeholder="https://github.com/user/repo" value={formData.github_url} onChange={handleChange} error={errors.github_url} />
            <Input label="Live URL" name="live_url" placeholder="https://myproject.com" value={formData.live_url} onChange={handleChange} error={errors.live_url} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            <Input label="Role" name="role" placeholder="Full Stack Developer" value={formData.role} onChange={handleChange} />
            <Input label="Start Date" name="start_date" type="date" value={formData.start_date} onChange={handleChange} />
            <Input label="End Date" name="end_date" type="date" value={formData.end_date} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <Input label="Display Order" name="display_order" type="number" min="0" value={formData.display_order} onChange={handleChange} />
            <div className="flex items-center sm:pt-6">
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" name="is_featured" checked={formData.is_featured} onChange={handleChange} className="w-5 h-5 rounded accent-primary-500 mr-2" />
                <span className="font-medium text-sm sm:text-base">Featured Project ⭐</span>
              </label>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="admin-card space-y-4 !p-4 sm:!p-6">
          <h2 className="text-base sm:text-lg font-semibold border-b border-gray-200 dark:border-dark-600 pb-3">Technologies</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag("technologies", techInput, setTechInput); } }}
              placeholder="React.js, Node.js..."
              className="input-glass flex-1 text-sm sm:text-base"
            />
            <Button type="button" size="sm" onClick={() => addTag("technologies", techInput, setTechInput)} icon={IoAdd}>
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
          {formData.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, i) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs sm:text-sm font-mono">
                  {tech}
                  <button type="button" onClick={() => removeTag("technologies", i)} className="hover:text-red-500">
                    <IoTrash className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Key Features */}
        <div className="admin-card space-y-4 !p-4 sm:!p-6">
          <h2 className="text-base sm:text-lg font-semibold border-b border-gray-200 dark:border-dark-600 pb-3">Key Features</h2>
          <div className="flex gap-2">
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag("key_features", featureInput, setFeatureInput); } }}
              placeholder="Real-time messaging..."
              className="input-glass flex-1 text-sm sm:text-base"
            />
            <Button type="button" size="sm" onClick={() => addTag("key_features", featureInput, setFeatureInput)} icon={IoAdd}>
              <span className="hidden sm:inline">Add</span>
            </Button>
          </div>
          {formData.key_features.length > 0 && (
            <ul className="space-y-2">
              {formData.key_features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-50 dark:bg-dark-700">
                  <span className="flex-1 text-xs sm:text-sm">{feature}</span>
                  <button type="button" onClick={() => removeTag("key_features", i)} className="text-red-500 hover:text-red-600 flex-shrink-0">
                    <IoTrash className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Cover Image */}
        <div className="admin-card space-y-4 !p-4 sm:!p-6">
          <h2 className="text-base sm:text-lg font-semibold border-b border-gray-200 dark:border-dark-600 pb-3">Cover Image</h2>
          <ImageUploader currentImage={formData.cover_image_url} onUpload={handleCoverUpload} onRemove={removeCover} />
        </div>

        {/* Screenshots */}
        <div className="admin-card space-y-4 !p-4 sm:!p-6">
          <h2 className="text-base sm:text-lg font-semibold border-b border-gray-200 dark:border-dark-600 pb-3">Screenshots (up to 10)</h2>
          <ImageUploader multiple currentImages={formData.screenshots} onUpload={handleScreenshotsUpload} onRemove={removeScreenshot} maxFiles={10} />
        </div>

        {/* Challenges */}
        <div className="admin-card space-y-4 !p-4 sm:!p-6">
          <h2 className="text-base sm:text-lg font-semibold border-b border-gray-200 dark:border-dark-600 pb-3">Challenges & Solutions</h2>
          <Input name="challenges_solutions" placeholder="Describe key challenges..." value={formData.challenges_solutions} onChange={handleChange} textarea rows={5} />
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 sticky bottom-4 z-10 bg-gray-50/80 dark:bg-dark-900/80 backdrop-blur-xl p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-dark-600">
          <Button type="button" variant="ghost" onClick={() => navigate("/admin/projects")} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button type="submit" loading={loading} icon={IoSave} className="w-full sm:w-auto">
            {mode === "edit" ? "Update Project" : "Create Project"}
          </Button>
        </div>
      </form>
    </motion.div>
  );
};

export default ProjectForm;