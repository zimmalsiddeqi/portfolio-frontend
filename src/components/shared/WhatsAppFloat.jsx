import { motion } from "framer-motion";
import { IoLogoWhatsapp } from "react-icons/io5";
import { useProfile } from "../../hooks/useProfile";

const WhatsAppFloat = () => {
  const { profile } = useProfile();
  const whatsappNumber = profile?.social_links?.whatsapp || "923440114925";

  const handleClick = () => {
    const message = encodeURIComponent(
      `Hi Shawkat! I visited your portfolio and I'd like to discuss a project with you.`
    );
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 group flex items-center"
      aria-label="Chat on WhatsApp"
    >
      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-30 animate-ping" />
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-pulse" />

      {/* Main icon */}
      <div className="relative p-3.5 sm:p-4 rounded-full bg-gradient-to-br from-green-500 to-green-600 shadow-2xl hover:shadow-[0_0_30px_rgba(34,197,94,0.6)] transition-all text-white">
        <IoLogoWhatsapp className="w-6 h-6 sm:w-7 sm:h-7" />
      </div>

      {/* Tooltip to the LEFT */}
      <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-xs font-semibold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
        Chat with me 💬
      </span>
    </motion.button>
  );
};

export default WhatsAppFloat;