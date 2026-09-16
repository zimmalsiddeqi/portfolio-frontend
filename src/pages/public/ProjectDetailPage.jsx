import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import ReactMarkdown from "react-markdown";
import {
  IoArrowBack,
  IoLogoGithub,
  IoOpen,
  IoCalendar,
  IoPersonOutline,
  IoCheckmarkCircle,
  IoRocketOutline,
} from "react-icons/io5";
import { useProject } from "../../hooks/useProjects";
import Loader from "../../components/shared/Loader";
import GlassCard from "../../components/shared/GlassCard";
import ScreenshotGallery from "../../components/public/ScreenshotGallery";
import Button from "../../components/shared/Button";
import EmptyState from "../../components/shared/EmptyState";
import { CATEGORY_COLORS, STATUS_COLORS } from "../../utils/constants";
import { formatDateShort } from "../../utils/helpers";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { project, loading, error } = useProject(slug);

  if (loading) return <Loader fullScreen />;

  if (error || !project) {
    return (
      <div className="min-h-screen pt-24 sm:pt-32 pb-12 sm:pb-20 px-4">
        <EmptyState
          icon={IoRocketOutline}
          title="Project not found"
          description="The project you're looking for doesn't exist or has been removed."
          action={
            <Button icon={IoArrowBack} onClick={() => navigate("/")}>
              Back to Home
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} | Portfolio</title>
        <meta name="description" content={project.short_description} />
      </Helmet>

      <main className="pt-20 sm:pt-24 pb-12 sm:pb-20">
        <div className="container-custom px-4 sm:px-6">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4 sm:mb-8"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-500 transition-colors group"
            >
              <IoArrowBack className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            {/* Cover Image */}
            {project.cover_image_url && (
              <div className="relative aspect-video rounded-2xl sm:rounded-3xl overflow-hidden mb-6 sm:mb-8 shadow-3d">
                <img
                  src={project.cover_image_url}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3 sm:top-6 left-3 sm:left-6 flex flex-wrap gap-2">
                  <span className={`px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r ${CATEGORY_COLORS[project.category]} shadow-lg`}>
                    {project.category}
                  </span>
                  {project.is_featured && (
                    <span className="px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-yellow-500/90 text-white shadow-lg">
                      ⭐ Featured
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <span className={`text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-1 rounded-lg ${STATUS_COLORS[project.status]}`}>
                {project.status}
              </span>
              {project.role && (
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <IoPersonOutline className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {project.role}
                </span>
              )}
              {project.start_date && (
                <span className="inline-flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <IoCalendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {formatDateShort(project.start_date)}
                  {project.end_date && ` - ${formatDateShort(project.end_date)}`}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-3 sm:mb-4 gradient-text leading-tight">
              {project.title}
            </h1>

            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
              {project.short_description}
            </p>

            {/* Action Links */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mt-4 sm:mt-6">
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="glass" icon={IoLogoGithub} size="sm" className="sm:!px-6 sm:!py-3 sm:text-base">
                    <span className="hidden sm:inline">View Code</span>
                    <span className="sm:hidden">Code</span>
                  </Button>
                </a>
              )}
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <Button icon={IoOpen} size="sm" className="sm:!px-6 sm:!py-3 sm:text-base">
                    <span className="hidden sm:inline">Live Demo</span>
                    <span className="sm:hidden">Demo</span>
                  </Button>
                </a>
              )}
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6 sm:space-y-8 order-2 lg:order-1">
              {/* Detailed Description */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <GlassCard className="p-4 sm:p-6 md:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">About This Project</h2>
                  <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                    <ReactMarkdown>{project.detailed_description}</ReactMarkdown>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Screenshots */}
              {project.screenshots && project.screenshots.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <GlassCard className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Screenshots</h2>
                    <ScreenshotGallery screenshots={project.screenshots} title={project.title} />
                  </GlassCard>
                </motion.div>
              )}

              {/* Challenges */}
              {project.challenges_solutions && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <GlassCard className="p-4 sm:p-6 md:p-8">
                    <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Challenges & Solutions</h2>
                    <div className="prose prose-sm sm:prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                      <ReactMarkdown>{project.challenges_solutions}</ReactMarkdown>
                    </div>
                  </GlassCard>
                </motion.div>
              )}
            </div>

            {/* Sidebar - Shows FIRST on mobile, side on desktop */}
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <GlassCard className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Technologies</h3>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-mono font-medium bg-primary-500/10 text-primary-600 dark:text-primary-400 border border-primary-500/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </motion.div>
              )}

              {/* Key Features */}
              {project.key_features && project.key_features.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <GlassCard className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">Key Features</h3>
                    <ul className="space-y-2 sm:space-y-3">
                      {project.key_features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <IoCheckmarkCircle className="w-4 h-4 sm:w-5 sm:h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                          <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </GlassCard>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProjectDetailPage;