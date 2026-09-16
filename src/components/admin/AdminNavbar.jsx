import { motion, AnimatePresence } from "framer-motion";
import { IoMenu, IoSunny, IoMoon, IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import { useAuth } from "../../hooks/useAuth";

const AdminNavbar = ({ onMenuClick }) => {
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-dark-800/90 backdrop-blur-xl border-b border-gray-200 dark:border-dark-600">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center gap-2 sm:gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          >
            <IoMenu className="w-6 h-6" />
          </button>
          <h2 className="hidden sm:block text-base sm:text-lg font-semibold truncate max-w-[200px] sm:max-w-none">
            Welcome back, <span className="gradient-text">Admin</span>
          </h2>
          <h2 className="sm:hidden text-base font-semibold">
            <span className="gradient-text">Admin</span>
          </h2>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            to="/"
            target="_blank"
            className="p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-all duration-300"
            title="View Site"
          >
            <IoEyeOutline className="w-5 h-5" />
          </Link>

          <motion.button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-dark-700 transition-all duration-300"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <IoSunny className="w-5 h-5 text-yellow-400" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <IoMoon className="w-5 h-5 text-primary-500" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="ml-1 sm:ml-2 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gray-50 dark:bg-dark-700 border border-gray-200 dark:border-dark-600">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xs sm:text-sm font-bold flex-shrink-0">
              {user?.email?.[0]?.toUpperCase() || "A"}
            </div>
            <span className="hidden md:inline text-xs sm:text-sm font-medium truncate max-w-[120px] lg:max-w-[180px]">
              {user?.email}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;