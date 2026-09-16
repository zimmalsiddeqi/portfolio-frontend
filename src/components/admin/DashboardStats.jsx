import { motion } from "framer-motion";
import { IoFolderOpen, IoMail, IoMailUnread, IoTrendingUp } from "react-icons/io5";

const StatCard = ({ icon: Icon, label, value, color, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ y: -3, scale: 1.01 }}
    className="admin-card !p-4 sm:!p-6 relative overflow-hidden group"
  >
    <div className={`absolute -right-6 -top-6 w-24 h-24 sm:w-32 sm:h-32 rounded-full ${color} opacity-10 group-hover:opacity-20 transition-opacity blur-2xl`} />

    <div className="relative flex items-start justify-between">
      <div>
        <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 sm:mb-2">{label}</p>
        <p className="text-2xl sm:text-3xl font-display font-bold">{value ?? 0}</p>
      </div>
      <div className={`p-2 sm:p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${color.replace("bg-", "text-")}`} />
      </div>
    </div>
  </motion.div>
);

const DashboardStats = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
      <StatCard
        icon={IoFolderOpen}
        label="Projects"
        value={stats?.totalProjects}
        color="bg-primary-500"
        delay={0}
      />
      <StatCard
        icon={IoMail}
        label="Messages"
        value={stats?.totalMessages}
        color="bg-accent-500"
        delay={0.1}
      />
      <StatCard
        icon={IoMailUnread}
        label="Unread"
        value={stats?.unreadMessages}
        color="bg-red-500"
        delay={0.2}
      />
      <StatCard
        icon={IoTrendingUp}
        label="Status"
        value="Active"
        color="bg-green-500"
        delay={0.3}
      />
    </div>
  );
};

export default DashboardStats;