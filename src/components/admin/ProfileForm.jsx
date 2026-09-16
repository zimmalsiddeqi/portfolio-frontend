import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { IoSave, IoAdd, IoTrash } from "react-icons/io5";
import Input from "../shared/Input";
import Button from "../shared/Button";
import ImageUploader from "./ImageUploader";
import profileService from "../../services/profileService";
import uploadService from "../../services/uploadService";

const ProfileForm = ({ profile, onSuccess }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    title: "",
    tagline: "",
    bio: "",
    avatar_url: "",
    resume_url: "",
    skills: [],
    experience: [],
    education: [],
    social_links: { github: "", linkedin: "", twitter: "", email: "" },
    meta_title: "",
    meta_description: "",
  });
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || "",
        title: profile.title || "",
        tagline: profile.tagline || "",
        bio: profile.bio || "",
        avatar_url: profile.avatar_url || "",
        resume_url: profile.resume_url || "",
        skills: profile.skills || [],
        experience: profile.experience || [],
        education: profile.education || [],
        social_links: profile.social_links || { github: "", linkedin: "", twitter: "", email: "" },
        meta_title: profile.meta_title || "",
        meta_description: profile.meta_description || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      social_links: { ...prev.social_links, [name]: value },
    }));
  };

  const addSkill = () => {
    if (!skillInput.trim()) return;
    if (formData.skills.includes(skillInput.trim())) {
      toast.error("Already added");
      return;
    }
    setFormData((prev) => ({ ...prev, skills: [...prev.skills, skillInput.trim()] }));
    setSkillInput("");
  };

  const removeSkill = (index) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experience: [...prev.experience, { role: "", company: "", duration: "", description: "" }],
    }));
  };

  const updateExperience = (i, field, value) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, idx) => idx === i ? { ...exp, [field]: value } : exp),
    }));
  };

  const removeExperience = (i) => {
    setFormData((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, idx) => idx !== i),
    }));
  };

  const addEducation = () => {
    setFormData((prev) => ({
      ...prev,
      education: [...prev.education, { degree: "", institution: "", duration: "" }],
    }));
  };

  const updateEducation = (i, field, value) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.map((edu, idx) => idx === i ? { ...edu, [field]: value } : edu),
    }));
  };

  const removeEducation = (i) => {
    setFormData((prev) => ({
      ...prev,
      education: prev.education.filter((_, idx) => idx !== i),
    }));
  };

  const handleAvatarUpload = async (file) => {
    const response = await uploadService.uploadAvatar(file);
    setFormData((prev) => ({ ...prev, avatar_url: response.data.url }));
  };

  const handleResumeUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const response = await uploadService.uploadResume(file);
      setFormData((prev) => ({ ...prev, resume_url: response.data.url }));
      toast.success("Resume uploaded");
    } catch (err) {
      toast.error(err.message || "Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await profileService.update(formData);
      toast.success("Profile updated successfully");
      if (onSuccess) onSuccess();
    } catch (err) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Basic */}
      <div className="admin-card space-y-5">
        <h2 className="text-lg font-semibold border-b border-gray-200 dark:border-dark-600 pb-3">
          Personal Information
        </h2>

        <ImageUploader
          label="Profile Photo"
          currentImage={formData.avatar_url}
          onUpload={handleAvatarUpload}
          onRemove={() => setFormData((prev) => ({ ...prev, avatar_url: "" }))}
        />

        <div className="grid md:grid-cols-2 gap-5">
          <Input label="Full Name" name="full_name" value={formData.full_name} onChange={handleChange} />
          <Input label="Title" name="title" placeholder="Full Stack Developer" value={formData.title} onChange={handleChange} />
        </div>

        <Input label="Tagline" name="tagline" placeholder="Building digital experiences that matter" value={formData.tagline} onChange={handleChange} textarea rows={2} />
        <Input label="Bio" name="bio" placeholder="Tell your story..." value={formData.bio} onChange={handleChange} textarea rows={5} />

        {/* Resume Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Resume (PDF)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleResumeUpload}
              className="input-glass file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-primary-500 file:text-white file:cursor-pointer"
            />
            {formData.resume_url && (
              <a
                href={formData.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary-500 hover:underline whitespace-nowrap"
              >
                View Current
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="admin-card space-y-4">
        <h2 className="text-lg font-semibold border-b border-gray-200 dark:border-dark-600 pb-3">Skills</h2>
        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
            placeholder="React.js, Node.js..."
            className="input-glass flex-1"
          />
          <Button type="button" size="sm" onClick={addSkill} icon={IoAdd}>Add</Button>
        </div>
        {formData.skills.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.skills.map((skill, i) => (
              <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm">
                {skill}
                <button type="button" onClick={() => removeSkill(i)} className="hover:text-red-500">
                  <IoTrash className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Experience */}
      <div className="admin-card space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-dark-600 pb-3">
          <h2 className="text-lg font-semibold">Experience</h2>
          <Button type="button" size="sm" onClick={addExperience} icon={IoAdd}>Add</Button>
        </div>
        {formData.experience.map((exp, i) => (
          <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-dark-700 space-y-3 relative">
            <button type="button" onClick={() => removeExperience(i)} className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20">
              <IoTrash className="w-4 h-4" />
            </button>
            <div className="grid md:grid-cols-2 gap-3 pr-10">
              <Input placeholder="Role" value={exp.role} onChange={(e) => updateExperience(i, "role", e.target.value)} />
              <Input placeholder="Company" value={exp.company} onChange={(e) => updateExperience(i, "company", e.target.value)} />
            </div>
            <Input placeholder="Duration (e.g. 2022 - Present)" value={exp.duration} onChange={(e) => updateExperience(i, "duration", e.target.value)} />
            <Input placeholder="Description" value={exp.description} onChange={(e) => updateExperience(i, "description", e.target.value)} textarea rows={2} />
          </div>
        ))}
      </div>

      {/* Education */}
      <div className="admin-card space-y-4">
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-dark-600 pb-3">
          <h2 className="text-lg font-semibold">Education</h2>
          <Button type="button" size="sm" onClick={addEducation} icon={IoAdd}>Add</Button>
        </div>
        {formData.education.map((edu, i) => (
          <div key={i} className="p-4 rounded-xl bg-gray-50 dark:bg-dark-700 space-y-3 relative">
            <button type="button" onClick={() => removeEducation(i)} className="absolute top-3 right-3 p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20">
              <IoTrash className="w-4 h-4" />
            </button>
            <div className="grid md:grid-cols-2 gap-3 pr-10">
              <Input placeholder="Degree" value={edu.degree} onChange={(e) => updateEducation(i, "degree", e.target.value)} />
              <Input placeholder="Institution" value={edu.institution} onChange={(e) => updateEducation(i, "institution", e.target.value)} />
            </div>
            <Input placeholder="Duration" value={edu.duration} onChange={(e) => updateEducation(i, "duration", e.target.value)} />
          </div>
        ))}
      </div>

      {/* Social */}
      <div className="admin-card space-y-4">
        <h2 className="text-lg font-semibold border-b border-gray-200 dark:border-dark-600 pb-3">Social Links</h2>
        <div className="grid md:grid-cols-2 gap-5">
          <Input label="GitHub" name="github" placeholder="https://github.com/username" value={formData.social_links.github} onChange={handleSocialChange} />
          <Input label="LinkedIn" name="linkedin" placeholder="https://linkedin.com/in/username" value={formData.social_links.linkedin} onChange={handleSocialChange} />
          <Input label="Twitter/X" name="twitter" placeholder="https://twitter.com/username" value={formData.social_links.twitter} onChange={handleSocialChange} />
          <Input label="Email" name="email" type="email" placeholder="contact@example.com" value={formData.social_links.email} onChange={handleSocialChange} />
        </div>
      </div>

      {/* SEO */}
      <div className="admin-card space-y-4">
        <h2 className="text-lg font-semibold border-b border-gray-200 dark:border-dark-600 pb-3">SEO Metadata</h2>
        <Input label="Meta Title" name="meta_title" value={formData.meta_title} onChange={handleChange} />
        <Input label="Meta Description" name="meta_description" value={formData.meta_description} onChange={handleChange} textarea rows={3} />
      </div>

      <div className="flex justify-end">
        <Button type="submit" loading={loading} icon={IoSave} size="lg">
          Save Profile
        </Button>
      </div>
    </motion.form>
  );
};

export default ProfileForm;