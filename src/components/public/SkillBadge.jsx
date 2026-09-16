import { motion } from "framer-motion";

const SkillBadge = ({ skill, index = 0 }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: 1.1, y: -2 }}
      className="px-4 py-2 rounded-xl text-sm font-medium font-mono
                 bg-gradient-to-r from-primary-500/10 to-accent-500/10
                 border border-primary-500/20 dark:border-primary-500/30
                 text-primary-600 dark:text-primary-400
                 hover:border-primary-500/50 hover:shadow-neon
                 transition-all duration-300 cursor-default"
    >
      {skill}
    </motion.span>
  );
};

export default SkillBadge;