import { motion } from "framer-motion";

const Loader = ({ size = "md", fullScreen = false }) => {
  const sizes = {
    sm: "w-6 h-6",
    md: "w-10 h-10",
    lg: "w-16 h-16",
  };

  const loader = (
    <div className="flex items-center justify-center gap-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`rounded-full bg-gradient-to-r from-primary-500 to-accent-500 ${
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
          }`}
          animate={{ y: [0, -12, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-dark-900/80 backdrop-blur-sm">
        {loader}
      </div>
    );
  }

  return <div className="flex items-center justify-center py-12">{loader}</div>;
};

export default Loader;