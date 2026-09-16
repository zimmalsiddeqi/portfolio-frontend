import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoArrowUp } from "react-icons/io5";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-40 p-3.5 rounded-full glass hover:bg-primary-500 hover:text-white text-gray-700 dark:text-gray-300 shadow-soft hover:shadow-neon border-2 border-gray-200 dark:border-white/10 transition-all duration-300 group"
          aria-label="Scroll to top"
        >
          <IoArrowUp className="w-5 h-5 transition-transform group-hover:-translate-y-0.5" />
          
          {/* Tooltip to the RIGHT */}
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            Back to top
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;