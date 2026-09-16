import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoGridOutline,
  IoFolderOpenOutline,
  IoMailOutline,
  IoPersonCircleOutline,
  IoLogOutOutline,
  IoAddCircleOutline,
  IoClose,
} from "react-icons/io5";
import toast from "react-hot-toast";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const menuItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: IoGridOutline },
  { path: "/admin/projects", label: "Projects", icon: IoFolderOpenOutline },
  { path: "/admin/projects/new", label: "Add Project", icon: IoAddCircleOutline },
  { path: "/admin/messages", label: "Messages", icon: IoMailOutline },
  { path: "/admin/profile", label: "Profile", icon: IoPersonCircleOutline },
];

const AdminSidebar = ({ unreadCount = 0, isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/admin/login");
    } catch {
      toast.error("Logout failed");
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : typeof window !== "undefined" && window.innerWidth >= 1024 ? 0 : -300,
        }}
        className={`fixed top-0 left-0 z-50 h-screen w-72 sm:w-64 
                   bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-600
                   flex flex-col shadow-2xl lg:shadow-none
                   transition-transform duration-300 ease-in-out
                   ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-dark-600">
          <NavLink to="/" className="text-xl font-display font-bold gradient-text">
            Portfolio
          </NavLink>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
          >
            <IoClose className="w-5 h-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 px-5 pb-4 -mt-2">Admin Panel</p>

        {/* Menu */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin/dashboard"}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-sm ${
                  isActive
                    ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 hover:text-primary-500"
                }`
              }
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium flex-1">{item.label}</span>
              {item.path === "/admin/messages" && unreadCount > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 text-[10px] font-bold rounded-full bg-red-500 text-white flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-gray-200 dark:border-dark-600">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-300 font-medium text-sm"
          >
            <IoLogOutOutline className="w-5 h-5" />
            Logout
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;