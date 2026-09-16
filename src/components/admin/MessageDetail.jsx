import Modal from "../shared/Modal";
import Button from "../shared/Button";
import { IoMail, IoCalendar, IoPersonCircle } from "react-icons/io5";
import { formatDate } from "../../utils/helpers";

const MessageDetail = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <Modal isOpen={!!message} onClose={onClose} title="Message Details" size="lg">
      <div className="space-y-6">
        {/* Sender Info */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-dark-700">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl font-bold">
            {message.name[0].toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold flex items-center gap-2">
              <IoPersonCircle className="w-5 h-5" />
              {message.name}
            </h3>
            <a
              href={`mailto:${message.email}`}
              className="text-sm text-primary-500 hover:underline flex items-center gap-1.5 mt-1"
            >
              <IoMail className="w-4 h-4" />
              {message.email}
            </a>
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-1">
              <IoCalendar className="w-4 h-4" />
              {formatDate(message.created_at)}
            </p>
          </div>
        </div>

        {/* Subject */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Subject
          </p>
          <h4 className="text-lg font-semibold">{message.subject}</h4>
        </div>

        {/* Message */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
            Message
          </p>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-dark-700">
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
              {message.message}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-dark-600">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          <a href={`mailto:${message.email}?subject=Re: ${message.subject}`}>
            <Button icon={IoMail}>Reply via Email</Button>
          </a>
        </div>
      </div>
    </Modal>
  );
};

export default MessageDetail;