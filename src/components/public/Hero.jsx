import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import {
  IoArrowDown,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMail,
  IoLogoWhatsapp,
  IoCall,
} from "react-icons/io5";
import { useProfile } from "../../hooks/useProfile";
import AnimatedSection from "../shared/AnimatedSection";

const Hero = () => {
  const { profile } = useProfile();

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleWhatsAppClick = () => {
    const whatsappNumber = profile?.social_links?.whatsapp || "923440114925";
    const message = encodeURIComponent(
      `Hi Shawkat! I visited your portfolio and I'd like to discuss a project with you.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center section-padding pt-32">
      <div className="container-custom">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Avatar */}
          {profile?.avatar_url && (
            <AnimatedSection delay={0.1}>
              <motion.div className="relative mb-8" whileHover={{ scale: 1.05 }}>
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-primary-500/30 ring-offset-4 ring-offset-white dark:ring-offset-dark-900 shadow-3d">
                  <img
                    src={profile.avatar_url}
                    alt={profile.full_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 rounded-full animate-pulse-glow bg-primary-500/20 blur-xl -z-10" />
              </motion.div>
            </AnimatedSection>
          )}

          {/* Greeting */}
          <AnimatedSection delay={0.2}>
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 shadow-soft">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Available for work
              </span>
            </motion.div>
          </AnimatedSection>

          {/* Name */}
          <AnimatedSection delay={0.3}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-4 leading-tight text-gray-900 dark:text-white">
              Hi, I'm{" "}
              <span className="gradient-text text-shadow-glow">
                {profile?.full_name || "Shawkat Siddeqi"}
              </span>
            </h1>
          </AnimatedSection>

          {/* Typing Animation */}
          <AnimatedSection delay={0.4}>
            <div className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-300 mb-6 h-10">
              <TypeAnimation
                sequence={[
                  "Full Stack Developer",
                  2000,
                  "MERN Stack Expert",
                  2000,
                  "AI/ML Integrator",
                  2000,
                  "Problem Solver",
                  2000,
                  "UI/UX Enthusiast",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </AnimatedSection>

          {/* Tagline */}
          <AnimatedSection delay={0.5}>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
              {profile?.tagline || "Crafting beautiful digital experiences with modern web technologies."}
            </p>
          </AnimatedSection>

          {/* CTA Buttons */}
          <AnimatedSection delay={0.6}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
              <motion.button
                onClick={scrollToProjects}
                className="btn-primary text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={handleWhatsAppClick}
                className="btn-whatsapp !text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <IoLogoWhatsapp className="w-5 h-5" />
                WhatsApp Me
              </motion.button>
              {profile?.resume_url && (
                <motion.a
                  href={profile.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline text-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Download CV
                </motion.a>
              )}
            </div>
          </AnimatedSection>

          {/* Social Links */}
          <AnimatedSection delay={0.7}>
            <div className="flex items-center gap-3 flex-wrap justify-center">
              {profile?.social_links?.github && (
                <motion.a
                  href={profile.social_links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:shadow-glass-hover hover:text-primary-500 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  title="GitHub"
                >
                  <IoLogoGithub className="w-6 h-6" />
                </motion.a>
              )}
              {profile?.social_links?.linkedin && (
                <motion.a
                  href={profile.social_links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl glass hover:shadow-glass-hover hover:text-blue-500 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  title="LinkedIn"
                >
                  <IoLogoLinkedin className="w-6 h-6" />
                </motion.a>
              )}
              {profile?.social_links?.email && (
                <motion.a
                  href={`mailto:${profile.social_links.email}`}
                  className="p-3 rounded-xl glass hover:shadow-glass-hover hover:text-accent-500 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  title="Email"
                >
                  <IoMail className="w-6 h-6" />
                </motion.a>
              )}
              {profile?.social_links?.phone && (
                <motion.a
                  href={`tel:${profile.social_links.phone}`}
                  className="p-3 rounded-xl glass hover:shadow-glass-hover hover:text-purple-500 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  title="Call"
                >
                  <IoCall className="w-6 h-6" />
                </motion.a>
              )}
              {profile?.social_links?.whatsapp && (
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="p-3 rounded-xl glass hover:shadow-glass-hover hover:text-green-500 transition-all duration-300"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  title="WhatsApp"
                >
                  <IoLogoWhatsapp className="w-6 h-6" />
                </motion.button>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <IoArrowDown className="w-6 h-6 text-gray-400 dark:text-gray-500" />
      </motion.div>
    </section>
  );
};

export default Hero;