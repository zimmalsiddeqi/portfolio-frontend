import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "./ProjectCard";
import AnimatedSection from "../shared/AnimatedSection";
import Loader from "../shared/Loader";
import EmptyState from "../shared/EmptyState";
import { useProjects } from "../../hooks/useProjects";
import { PROJECT_CATEGORIES } from "../../utils/constants";
import { IoGridOutline, IoSearch } from "react-icons/io5";

const ProjectGrid = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { projects, loading } = useProjects({ limit: 50 });

  const categories = ["All", ...PROJECT_CATEGORIES];
  const projectList = Array.isArray(projects) ? projects : [];

  const filteredProjects = projectList.filter((project) => {
    if (!project) return false;
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      project.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies?.some((t) => t?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              My <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              A collection of projects that showcase my skills and experience
            </p>
          </div>
        </AnimatedSection>

        {/* Search */}
        <AnimatedSection delay={0.1}>
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-glass !pl-12"
              />
            </div>
          </div>
        </AnimatedSection>

        {/* Category Filter */}
        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "btn-primary !py-2"
                    : "glass hover:bg-primary-500/10 text-gray-600 dark:text-gray-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        {/* Grid */}
        {loading ? (
          <Loader />
        ) : filteredProjects.length === 0 ? (
          <EmptyState
            icon={IoGridOutline}
            title="No projects found"
            description="Try adjusting your search or filter criteria"
          />
        ) : (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, i) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  <ProjectCard project={project} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectGrid;