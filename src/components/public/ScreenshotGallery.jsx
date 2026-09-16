import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";

const ScreenshotGallery = ({ screenshots = [], title = "" }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const openLightbox = (index) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    setSelectedIndex((prev) => (prev + 1) % screenshots.length);
  };

  const goPrev = () => {
    setSelectedIndex((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  };

  if (screenshots.length === 0) return null;

  return (
    <>
      {/* Thumbnail Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {screenshots.map((url, i) => (
          <motion.div
            key={i}
            className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            onClick={() => openLightbox(i)}
          >
            <img
              src={url}
              alt={`${title} screenshot ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <span className="opacity-0 group-hover:opacity-100 text-white font-medium transition-opacity">
                View
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
            >
              <IoClose className="w-6 h-6" />
            </button>

            {/* Prev */}
            {screenshots.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 md:left-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              >
                <IoChevronBack className="w-6 h-6" />
              </button>
            )}

            {/* Image */}
            <motion.img
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              src={screenshots[selectedIndex]}
              alt={`${title} screenshot ${selectedIndex + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            {screenshots.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 md:right-8 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-10"
              >
                <IoChevronForward className="w-6 h-6" />
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {selectedIndex + 1} / {screenshots.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScreenshotGallery;