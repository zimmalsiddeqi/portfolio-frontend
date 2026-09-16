import { motion } from "framer-motion";
import AnimatedSection from "../shared/AnimatedSection";

const stats = [
  { number: "9+", label: "Projects Completed" },
  { number: "15+", label: "Technologies" },
  { number: "2+", label: "Years Experience" },
  { number: "100%", label: "Client Satisfaction" },
];

const Stats = () => {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1}>
              <motion.div
                className="glass-card p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <h3 className="text-3xl md:text-4xl font-display font-bold gradient-text mb-2">
                  {stat.number}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;