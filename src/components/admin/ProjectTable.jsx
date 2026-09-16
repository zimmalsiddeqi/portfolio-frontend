import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  IoCreateOutline,
  IoTrashOutline,
  IoStar,
  IoStarOutline,
  IoEyeOutline,
  IoAddOutline,
  IoFolderOpen,
} from "react-icons/io5";
import Badge from "../shared/Badge";
import Button from "../shared/Button";
import ConfirmDialog from "../shared/ConfirmDialog";
import EmptyState from "../shared/EmptyState";
import { STATUS_COLORS } from "../../utils/constants";
import projectService from "../../services/projectService";

const ProjectTable = ({ projects, onRefresh, loading }) => {
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleToggleFeatured = async (id) => {
    try {
      await projectService.toggleFeatured(id);
      toast.success("Featured status updated");
      onRefresh();
    } catch (err) {
      toast.error(err.message || "Failed to update");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await projectService.delete(deleteId);
      toast.success("Project deleted successfully");
      onRefresh();
      setDeleteId(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  if (projects.length === 0 && !loading) {
    return (
      <EmptyState
        icon={IoFolderOpen}
        title="No projects yet"
        description="Get started by creating your first project"
        action={
          <Link to="/admin/projects/new">
            <Button icon={IoAddOutline}>Add Project</Button>
          </Link>
        }
      />
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block admin-card overflow-hidden !p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-dark-700">
              <tr>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Project</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Category</th>
                <th className="text-left p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-center p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Order</th>
                <th className="text-right p-4 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {projects.map((project, i) => (
                  <motion.tr
                    key={project.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className="border-t border-gray-100 dark:border-dark-600 hover:bg-gray-50 dark:hover:bg-dark-700/50 transition-colors"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {project.cover_image_url ? (
                          <img
                            src={project.cover_image_url}
                            alt=""
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500" />
                        )}
                        <div>
                          <p className="font-medium">{project.title}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">/{project.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="primary">{project.category}</Badge>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${STATUS_COLORS[project.status]}`}>
                        {project.status}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className="text-sm font-medium">{project.display_order || 0}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end items-center gap-1">
                        <button
                          onClick={() => handleToggleFeatured(project.id)}
                          className="p-2 rounded-lg hover:bg-yellow-500/10 transition-colors"
                          title="Toggle Featured"
                        >
                          {project.is_featured ? (
                            <IoStar className="w-5 h-5 text-yellow-500" />
                          ) : (
                            <IoStarOutline className="w-5 h-5 text-gray-400" />
                          )}
                        </button>
                        <Link
                          to={`/project/${project.slug}`}
                          target="_blank"
                          className="p-2 rounded-lg hover:bg-blue-500/10 text-gray-500 hover:text-blue-500 transition-colors"
                          title="View"
                        >
                          <IoEyeOutline className="w-5 h-5" />
                        </Link>
                        <Link
                          to={`/admin/projects/edit/${project.id}`}
                          className="p-2 rounded-lg hover:bg-primary-500/10 text-gray-500 hover:text-primary-500 transition-colors"
                          title="Edit"
                        >
                          <IoCreateOutline className="w-5 h-5" />
                        </Link>
                        <button
                          onClick={() => setDeleteId(project.id)}
                          className="p-2 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-500 transition-colors"
                          title="Delete"
                        >
                          <IoTrashOutline className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        <AnimatePresence>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.05 }}
              className="admin-card"
            >
              <div className="flex items-start gap-3 mb-3">
                {project.cover_image_url ? (
                  <img
                    src={project.cover_image_url}
                    alt=""
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500" />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{project.title}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge variant="primary">{project.category}</Badge>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${STATUS_COLORS[project.status]}`}>
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-1 pt-3 border-t border-gray-100 dark:border-dark-600">
                <button
                  onClick={() => handleToggleFeatured(project.id)}
                  className="p-2 rounded-lg hover:bg-yellow-500/10"
                >
                  {project.is_featured ? (
                    <IoStar className="w-5 h-5 text-yellow-500" />
                  ) : (
                    <IoStarOutline className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                <Link to={`/project/${project.slug}`} target="_blank" className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-500">
                  <IoEyeOutline className="w-5 h-5" />
                </Link>
                <Link to={`/admin/projects/edit/${project.id}`} className="p-2 rounded-lg hover:bg-primary-500/10 text-primary-500">
                  <IoCreateOutline className="w-5 h-5" />
                </Link>
                <button onClick={() => setDeleteId(project.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-500">
                  <IoTrashOutline className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Project?"
        message="This project and all its images will be permanently deleted. This action cannot be undone."
        loading={deleting}
      />
    </>
  );
};

export default ProjectTable;