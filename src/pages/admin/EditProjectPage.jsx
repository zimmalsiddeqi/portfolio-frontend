import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ProjectForm from "../../components/admin/ProjectForm";
import Loader from "../../components/shared/Loader";
import projectService from "../../services/projectService";

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await projectService.getById(id);
        setProject(response.data);
      } catch (err) {
        toast.error(err.message || "Project not found");
        navigate("/admin/projects");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id, navigate]);

  if (loading) return <Loader fullScreen />;
  if (!project) return null;

  return <ProjectForm mode="edit" existingProject={project} />;
};

export default EditProjectPage;
