import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoLogoGithub, IoOpen, IoArrowForward } from "react-icons/io5";
import GlassCard from "../shared/GlassCard";
import { CATEGORY_COLORS, STATUS_COLORS } from "../../utils/constants";
import { truncate } from "../../utils/helpers";

const ProjectCard = ({ project, index = 0 }) => {
  return (
    <GlassCard
      className="group overflow-hidden cursor-pointer"
      hover3D
      delay={index * 0.1}
    >
      {/* Cover Image */}
      <div className="relative h-52 overflow-hidden">
        {project.cover_image_url ? (
          <img
            src={project.cover_image_url}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${CATEGORY_COLORS[project.category] || "from-primary-500 to-accent-500"} opacity-80`} />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${CATEGORY_COLORS[project.category] || "from-primary-500 to-accent-500"} shadow-lg`}>
            {project.category}
          </span>
        </div>

        {/* Featured Badge */}
        {project.is_featured && (
          <div className="absolute top-4 right-4">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-500/90 text-white shadow-lg">
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Quick Links */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
            >
              <IoLogoGithub className="w-5 h-5" />
            </a>
          )}
          {project.live_url && (
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
            >
              <IoOpen className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${STATUS_COLORS[project.status]}`}>
            {project.status}
          </span>
        </div>

        <Link to={`/project/${project.slug}`}>
          <h3 className="text-lg font-bold mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
            {project.title}
          </h3>
        </Link>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
          {truncate(project.short_description, 120)}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {(project.technologies || []).slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-gray-100 dark:bg-dark-600 text-gray-600 dark:text-gray-400"
            >
              {tech}
            </span>
          ))}
          {project.technologies?.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-primary-500/10 text-primary-500">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        {/* Actions & Links */}
        <div className="pt-4 mt-auto border-t border-gray-100 dark:border-dark-700/80 flex items-center justify-between gap-2">
          <Link
            to={`/project/${project.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary-500 hover:text-primary-400 transition-colors group/link"
          >
            <span>Details</span>
            <IoArrowForward className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
          </Link>

          <div className="flex items-center gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-dark-700 hover:bg-primary-500/10 hover:text-primary-500 dark:hover:text-primary-400 border border-gray-200/60 dark:border-dark-600 transition-all duration-200"
                title="View GitHub Repository"
              >
                <IoLogoGithub className="w-4 h-4" />
                <span className="hidden sm:inline">Code</span>
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 shadow-sm transition-all duration-200"
                title="View Live Website"
              >
                <IoOpen className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ProjectCard;