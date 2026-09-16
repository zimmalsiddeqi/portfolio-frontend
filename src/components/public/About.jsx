import AnimatedSection from "../shared/AnimatedSection";
import GlassCard from "../shared/GlassCard";
import SkillBadge from "./SkillBadge";
import { useProfile } from "../../hooks/useProfile";
import { IoCodeSlash, IoBriefcase, IoSchool } from "react-icons/io5";

const About = () => {
  const { profile } = useProfile();

  return (
    <section id="about" className="section-padding relative">
      <div className="container-custom">
        {/* Section Header */}
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
              About <span className="gradient-text">Me</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              Passionate about building impactful digital solutions
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <AnimatedSection direction="right">
            <GlassCard className="p-8" hover3D>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <span className="p-2 rounded-xl bg-primary-500/10">
                  <IoCodeSlash className="w-6 h-6 text-primary-500" />
                </span>
                Who I Am
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                {profile?.bio || "A passionate full-stack developer who loves building modern web applications."}
              </p>
            </GlassCard>
          </AnimatedSection>

          {/* Skills */}
          <AnimatedSection direction="left">
            <GlassCard className="p-8" hover3D>
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="p-2 rounded-xl bg-accent-500/10">
                  <IoCodeSlash className="w-6 h-6 text-accent-500" />
                </span>
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {(profile?.skills || []).map((skill, i) => (
                  <SkillBadge key={skill} skill={skill} index={i} />
                ))}
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>

        {/* Experience & Education */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Experience */}
          {profile?.experience && profile.experience.length > 0 && (
            <AnimatedSection delay={0.2}>
              <GlassCard className="p-8" hover3D>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-green-500/10">
                    <IoBriefcase className="w-6 h-6 text-green-500" />
                  </span>
                  Experience
                </h3>
                <div className="space-y-6">
                  {profile.experience.map((exp, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-primary-500/30">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary-500" />
                      <h4 className="font-semibold text-lg">{exp.role}</h4>
                      <p className="text-primary-500 font-medium">{exp.company}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{exp.duration}</p>
                      {exp.description && (
                        <p className="text-gray-600 dark:text-gray-300 mt-2">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>
          )}

          {/* Education */}
          {profile?.education && profile.education.length > 0 && (
            <AnimatedSection delay={0.3}>
              <GlassCard className="p-8" hover3D>
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-yellow-500/10">
                    <IoSchool className="w-6 h-6 text-yellow-500" />
                  </span>
                  Education
                </h3>
                <div className="space-y-6">
                  {profile.education.map((edu, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-accent-500/30">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-accent-500" />
                      <h4 className="font-semibold text-lg">{edu.degree}</h4>
                      <p className="text-accent-500 font-medium">{edu.institution}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{edu.duration}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </AnimatedSection>
          )}
        </div>
      </div>
    </section>
  );
};

export default About;