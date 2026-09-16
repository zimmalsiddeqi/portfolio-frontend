import { useState, useEffect, useCallback } from "react";
import projectService from "../services/projectService";

export const useProjects = (params = {}) => {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProjects = useCallback(async (queryParams = params) => {
    setLoading(true);
    setError(null);
    try {
      const response = await projectService.getAll(queryParams);
      setProjects(Array.isArray(response?.data) ? response.data : []);
      setPagination(response?.pagination || null);
    } catch (err) {
      setProjects([]);
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, pagination, loading, error, refetch: fetchProjects };
};

export const useFeaturedProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await projectService.getFeatured();
        setProjects(Array.isArray(response?.data) ? response.data : []);
      } catch (err) {
        console.error(err);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  return { projects, loading };
};

export const useProject = (slug) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;
    const fetch = async () => {
      setLoading(true);
      try {
        const response = await projectService.getBySlug(slug);
        setProject(response.data);
      } catch (err) {
        setError(err.message || "Project not found");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [slug]);

  return { project, loading, error };
};