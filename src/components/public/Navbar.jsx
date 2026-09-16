import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenu, IoClose, IoSunny, IoMoon } from "react-icons/io5";
import { useTheme } from "../../hooks/useTheme";
import { NAV_LINKS } from "../../utils/constants";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const handleNavClick = (href) => {
    setIsMobileOpen(false);
    if (isHome && href.startsWith("#")) {
      const element = document.querySelector(href);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? "glass-strong shadow-lg py-3" : "py-5 bg-transparent"
        }`}
      >
        <div className="container-custom flex items-center justify-between px-4 sm:px-6">
          {/* Logo */}
          <Link to="/" className="relative group">
            <span className="text-2xl font-display font-bold gradient-text">
              Portfolio
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {isHome &&
              NAV_LINKS.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 dark:hover:text-primary-400 rounded-xl hover:bg-primary-500/5 transition-all duration-300"
                >
                  {link.name}
                </button>
              ))}

            {!isHome && (
              <Link
                to="/"
                className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-500 rounded-xl hover:bg-primary-500/5 transition-all duration-300"
              >
                Home
              </Link>
            )}

            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              className="ml-2 p-2.5 rounded-xl glass hover:shadow-glass-hover transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <IoSunny className="w-5 h-5 text-yellow-400" />
                  </motion.div>
                ) : (
                  <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.3 }}>
                    <IoMoon className="w-5 h-5 text-primary-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* ADMIN BUTTON REMOVED FROM PUBLIC NAV */}
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-2">
            <motion.button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl glass"
              whileTap={{ scale: 0.95 }}
            >
              {isDark ? <IoSunny className="w-5 h-5 text-yellow-400" /> : <IoMoon className="w-5 h-5 text-primary-500" />}
            </motion.button>

            <motion.button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2.5 rounded-xl glass"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileOpen ? <IoClose className="w-5 h-5" /> : <IoMenu className="w-5 h-5" />}
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[68px] z-40 p-4 md:hidden"
          >
            <div className="glass-strong rounded-2xl shadow-2xl p-4 space-y-1">
              {isHome &&
                NAV_LINKS.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary-500/10 rounded-xl transition-colors"
                  >
                    {link.name}
                  </button>
                ))}
              {!isHome && (
                <Link
                  to="/"
                  className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-primary-500/10 rounded-xl transition-colors"
                >
                  Home
                </Link>
              )}
              {/* NO ADMIN LINK HERE */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;