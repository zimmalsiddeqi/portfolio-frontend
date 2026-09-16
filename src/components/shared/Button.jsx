import { motion } from "framer-motion";
import { cn } from "../../utils/helpers";

const variants = {
  primary: "btn-primary",
  glass: "btn-glass",
  outline: "btn-outline",
  danger: "px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl hover:scale-105 active:scale-95 transition-all duration-300",
  ghost: "px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-700 font-semibold rounded-xl transition-all duration-300",
};

const sizes = {
  sm: "!px-4 !py-2 text-sm",
  md: "",
  lg: "!px-8 !py-4 text-lg",
};

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  icon: Icon,
  iconPosition = "left",
  ...props
}) => {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
      className={cn(
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed !scale-100",
        loading && "opacity-70 cursor-wait",
        "inline-flex items-center justify-center gap-2",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="w-5 h-5" />}
          {children}
          {Icon && iconPosition === "right" && <Icon className="w-5 h-5" />}
        </>
      )}
    </motion.button>
  );
};

export default Button;