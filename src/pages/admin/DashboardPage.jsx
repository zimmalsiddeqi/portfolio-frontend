import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoAdd, IoArrowForward, IoFolderOpen } from "react-icons/io5";
import DashboardStats from "../../components/admin/DashboardStats";
import Button from "../../components/shared/Button";
import Loader from "../../components/shared/Loader";
import api from "../../services/api";
import { useProjects } from "../../hooks/useProjects";
import { formatDate } from "../../utils/helpers";

const DashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const { projects, loading: loadingProjects } = useProjects({ limit: 5, sort: "newest" });
  const projectList = Array.isArray(projects) ? projects : [];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/dashboard/stats");
        setStats(response?.data || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingStats(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 sm:space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">Overview of your portfolio</p>
        </div>
        <Link to="/admin/projects/new" className="self-start sm:self-auto">
          <Button icon={IoAdd} size="sm" className="sm:!px-6 sm:!py-3 sm:text-base">
            <span className="hidden sm:inline">Add New Project</span>
            <span className="sm:hidden">Add Project</span>
          </Button>
        </Link>
      </div>

      {/* Stats */}
      {loadingStats ? <Loader /> : <DashboardStats stats={stats} />}

      {/* Recent Projects */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-semibold">Recent Projects</h2>
          <Link
            to="/admin/projects"
            className="text-xs sm:text-sm text-primary-500 hover:text-primary-600 inline-flex items-center gap-1"
          >
            View All <IoArrowForward className="w-4 h-4" />
          </Link>
        </div>

        {loadingProjects ? (
          <Loader />
        ) : projectList.length === 0 ? (
          <div className="admin-card text-center py-8 sm:py-12">
            <IoFolderOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 dark:text-dark-600 mb-4" />
            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">No projects yet</p>
            <Link to="/admin/projects/new">
              <Button icon={IoAdd} size="sm">Create First Project</Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-3">
            {projectList.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  to={`/admin/projects/edit/${project.id}`}
                  className="admin-card flex items-center gap-3 sm:gap-4 hover:shadow-glass-hover transition-all duration-300 group !p-3 sm:!p-6"
                >
                  {project.cover_image_url ? (
                    <img src={project.cover_image_url} alt="" className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg object-cover flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base truncate group-hover:text-primary-500 transition-colors">{project.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5 hidden sm:block">{project.short_description}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500 mt-1">{formatDate(project.created_at)}</p>
                  </div>
                  <IoArrowForward className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all flex-shrink-0" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DashboardPage;