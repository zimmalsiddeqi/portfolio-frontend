import { cn } from "../../utils/helpers";

const Input = ({
  label,
  error,
  type = "text",
  className = "",
  textarea = false,
  rows = 4,
  ...props
}) => {
  const Component = textarea ? "textarea" : "input";

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <Component
        type={textarea ? undefined : type}
        rows={textarea ? rows : undefined}
        className={cn(
          "input-glass",
          error && "!ring-2 !ring-red-500/50 !border-red-500/50",
          textarea && "resize-none",
          className
        )}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;