import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { IoCloudUpload, IoClose, IoImage } from "react-icons/io5";
import toast from "react-hot-toast";

const ImageUploader = ({
  onUpload,
  multiple = false,
  currentImage = null,
  currentImages = [],
  onRemove,
  maxFiles = 10,
  label = "Upload Image",
}) => {
  const [preview, setPreview] = useState(currentImage);
  const [previews, setPreviews] = useState(currentImages);
  const [uploading, setUploading] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"],
    },
    multiple,
    maxFiles,
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;

      setUploading(true);
      try {
        if (multiple) {
          await onUpload(acceptedFiles);
          const newPreviews = acceptedFiles.map((f) => URL.createObjectURL(f));
          setPreviews((prev) => [...prev, ...newPreviews]);
        } else {
          const file = acceptedFiles[0];
          await onUpload(file);
          setPreview(URL.createObjectURL(file));
        }
        toast.success("Image uploaded successfully");
      } catch (err) {
        toast.error(err.message || "Upload failed");
      } finally {
        setUploading(false);
      }
    },
    onDropRejected: (rejections) => {
      const error = rejections[0]?.errors[0];
      if (error?.code === "file-too-large") {
        toast.error("File is too large (max 5MB)");
      } else if (error?.code === "file-invalid-type") {
        toast.error("Invalid file type");
      } else {
        toast.error("File rejected");
      }
    },
  });

  const removeImage = () => {
    setPreview(null);
    if (onRemove) onRemove();
  };

  const removeImageAt = (index, url) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index));
    if (onRemove) onRemove(url);
  };

  return (
    <div className="space-y-4">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      {/* Single image preview */}
      {!multiple && preview && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block"
        >
          <img
            src={preview}
            alt="Preview"
            className="w-full max-w-md h-48 object-cover rounded-xl border border-gray-200 dark:border-dark-600"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <IoClose className="w-4 h-4" />
          </button>
        </motion.div>
      )}

      {/* Multiple images preview */}
      {multiple && previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {previews.map((url, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative aspect-video rounded-xl overflow-hidden group"
            >
              <img src={url} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removeImageAt(i, url)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <IoClose className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Dropzone */}
      {((!multiple && !preview) || multiple) && (
        <div
          {...getRootProps()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? "border-primary-500 bg-primary-500/5"
              : "border-gray-300 dark:border-dark-600 hover:border-primary-500 hover:bg-primary-500/5"
          } ${uploading ? "opacity-50 pointer-events-none" : ""}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <div className="p-4 rounded-full bg-primary-500/10">
              {uploading ? (
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <IoCloudUpload className="w-8 h-8 text-primary-500" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">
                {uploading
                  ? "Uploading..."
                  : isDragActive
                  ? "Drop files here"
                  : "Click or drag to upload"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                PNG, JPG, WEBP up to 5MB {multiple && `(max ${maxFiles})`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;