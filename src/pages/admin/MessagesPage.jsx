import { useState } from "react";
import { motion } from "framer-motion";
import MessageTable from "../../components/admin/MessageTable";
import Loader from "../../components/shared/Loader";
import { useMessages } from "../../hooks/useMessages";

const MessagesPage = () => {
  const [filter, setFilter] = useState("all");
  const { messages, loading, refetch, unreadCount } = useMessages({ limit: 50 });

  const messageList = Array.isArray(messages) ? messages : [];

  const filteredMessages = messageList.filter((m) => {
    if (!m) return false;
    if (filter === "unread") return !m.is_read;
    if (filter === "read") return m.is_read;
    return true;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 sm:space-y-6"
    >
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold mb-1">Messages</h1>
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {messageList.length} total, {unreadCount} unread
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
        {[
          { key: "all", label: `All (${messageList.length})` },
          { key: "unread", label: `Unread (${unreadCount})` },
          { key: "read", label: `Read (${Math.max(0, messageList.length - unreadCount)})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 ${
              filter === tab.key
                ? "bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg"
                : "bg-white dark:bg-dark-800 border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-300 hover:border-primary-500/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? <Loader /> : <MessageTable messages={filteredMessages} onRefresh={refetch} />}
    </motion.div>
  );
};

export default MessagesPage;