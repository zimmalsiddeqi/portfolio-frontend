import { cn } from "../../utils/helpers";

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300",
    primary: "bg-primary-500/10 text-primary-600 dark:text-primary-400",
    accent: "bg-accent-500/10 text-accent-600 dark:text-accent-400",
    success: "bg-green-500/10 text-green-600 dark:text-green-400",
    warning: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    danger: "bg-red-500/10 text-red-600 dark:text-red-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
};

export default Badge;