import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import {
  IoMailOpen,
  IoMailUnread,
  IoTrashOutline,
  IoEyeOutline,
  IoMailOutline,
} from "react-icons/io5";
import ConfirmDialog from "../shared/ConfirmDialog";
import EmptyState from "../shared/EmptyState";
import MessageDetail from "./MessageDetail";
import { timeAgo } from "../../utils/helpers";
import contactService from "../../services/contactService";

const MessageTable = ({ messages, onRefresh }) => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const handleToggleRead = async (id, e) => {
    e?.stopPropagation();
    try {
      await contactService.toggleRead(id);
      onRefresh();
    } catch (err) {
      toast.error(err.message || "Failed to update");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await contactService.delete(deleteId);
      toast.success("Message deleted");
      onRefresh();
      setDeleteId(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  const handleView = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      await contactService.toggleRead(msg.id);
      onRefresh();
    }
  };

  if (messages.length === 0) {
    return (
      <EmptyState
        icon={IoMailOutline}
        title="No messages yet"
        description="Messages from your contact form will appear here"
      />
    );
  }

  return (
    <>
      <div className="space-y-3">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => handleView(msg)}
              className={`admin-card cursor-pointer hover:shadow-glass-hover transition-all duration-300 ${
                !msg.is_read ? "border-l-4 border-primary-500" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-white ${
                  !msg.is_read ? "bg-gradient-to-br from-primary-500 to-accent-500" : "bg-gray-400 dark:bg-dark-600"
                }`}>
                  {msg.name[0].toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="min-w-0">
                      <h3 className={`truncate ${!msg.is_read ? "font-bold" : "font-medium"}`}>
                        {msg.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{msg.email}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(msg.created_at)}</span>
                  </div>

                  <p className={`text-sm mb-2 ${!msg.is_read ? "font-semibold" : "text-gray-600 dark:text-gray-300"}`}>
                    {msg.subject}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{msg.message}</p>

                  <div className="flex items-center gap-1 mt-3 pt-3 border-t border-gray-100 dark:border-dark-600" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => handleView(msg)}
                      className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-500 transition-colors"
                    >
                      <IoEyeOutline className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleToggleRead(msg.id, e)}
                      className="p-2 rounded-lg hover:bg-primary-500/10 text-primary-500 transition-colors"
                    >
                      {msg.is_read ? <IoMailUnread className="w-4 h-4" /> : <IoMailOpen className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setDeleteId(msg.id); }}
                      className="p-2 rounded-lg hover:bg-red-500/10 text-red-500 transition-colors"
                    >
                      <IoTrashOutline className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <MessageDetail
        message={selectedMessage}
        onClose={() => setSelectedMessage(null)}
      />

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDelete}
        title="Delete Message?"
        message="This message will be permanently deleted."
        loading={deleting}
      />
    </>
  );
};

export default MessageTable;