import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoClose,
  IoCheckmark,
  IoRefreshOutline,
  IoAdd,
  IoRemove,
  IoCropOutline,
} from "react-icons/io5";
import { getCroppedImg } from "../../utils/cropImage";
import Button from "../shared/Button";
import toast from "react-hot-toast";

const ImageCropperModal = ({
  isOpen,
  imageSrc,
  onClose,
  onCropComplete,
  cropShape = "round",
  aspect = 1,
  title = "Crop Profile Photo",
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [processing, setProcessing] = useState(false);

  const onCropAreaChange = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleApplyCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    setProcessing(true);
    try {
      const croppedResult = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      );
      onCropComplete(croppedResult);
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to crop image. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  if (!isOpen || !imageSrc) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white dark:bg-dark-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-100 dark:border-dark-700 z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-dark-700">
            <div className="flex items-center gap-2">
              <IoCropOutline className="w-5 h-5 text-primary-500" />
              <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                {title}
              </h3>
            </div>
            <button
              onClick={onClose}
              disabled={processing}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
            >
              <IoClose className="w-5 h-5" />
            </button>
          </div>

          {/* Cropper Container */}
          <div className="relative w-full h-80 bg-dark-900">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspect}
              cropShape={cropShape}
              showGrid={true}
              onCropChange={setCrop}
              onCropComplete={onCropAreaChange}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
            />
          </div>

          {/* Controls */}
          <div className="p-5 space-y-4 bg-gray-50/50 dark:bg-dark-800/50">
            {/* Zoom Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-medium text-gray-500 dark:text-gray-400">
                <span>Zoom</span>
                <span>{Math.round(zoom * 100)}%</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.max(1, z - 0.2))}
                  className="p-1.5 rounded-lg bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50"
                  title="Zoom Out"
                >
                  <IoRemove className="w-4 h-4" />
                </button>
                <input
                  type="range"
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.05}
                  aria-labelledby="Zoom"
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-primary-500 h-2 bg-gray-200 dark:bg-dark-700 rounded-lg cursor-pointer"
                />
                <button
                  type="button"
                  onClick={() => setZoom((z) => Math.min(3, z + 0.2))}
                  className="p-1.5 rounded-lg bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50"
                  title="Zoom In"
                >
                  <IoAdd className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleRotate}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-dark-700 border border-gray-200 dark:border-dark-600 hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
              >
                <IoRefreshOutline className="w-4 h-4" />
                <span>Rotate 90°</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCrop({ x: 0, y: 0 });
                  setZoom(1);
                  setRotation(0);
                }}
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
              >
                Reset Position
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 dark:border-dark-700 bg-white dark:bg-dark-800">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={processing}
              size="sm"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleApplyCrop}
              loading={processing}
              icon={IoCheckmark}
              size="sm"
            >
              Crop & Use Photo
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ImageCropperModal;
