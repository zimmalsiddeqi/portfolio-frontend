import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoAdd, IoSearch, IoFilter } from "react-icons/io5";
import ProjectTable from "../../components/admin/ProjectTable";
import Button from "../../components/shared/Button";
import Loader from "../../components/shared/Loader";
import { useProjects } from "../../hooks/useProjects";
import { PROJECT_CATEGORIES } from "../../utils/constants";

const ProjectsPage = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const { projects, loading, refetch } = useProjects({ limit: 50 });

  const projectList = Array.isArray(projects) ? projects : [];

  const filteredProjects = projectList.filter((p) => {
    if (!p) return false;
    const matchesSearch = !search || p.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Projects</h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            {filteredProjects.length} projects
          </p>
        </div>
        <Link to="/admin/projects/new" className="self-start sm:self-auto">
          <Button icon={IoAdd} size="sm" className="sm:!px-6 sm:!py-3">
            <span className="hidden sm:inline">Add Project</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="admin-card !p-3 sm:!p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div className="relative">
            <IoSearch className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-glass !pl-10 sm:!pl-12 text-sm sm:text-base"
            />
          </div>
          <div className="relative">
            <IoFilter className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-glass !pl-10 sm:!pl-12 appearance-none text-sm sm:text-base"
            >
              <option value="">All Categories</option>
              {PROJECT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <Loader />
      ) : (
        <ProjectTable projects={filteredProjects} onRefresh={refetch} loading={loading} />
      )}
    </motion.div>
  );
};

export default ProjectsPage;