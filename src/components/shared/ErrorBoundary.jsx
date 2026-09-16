import { useRouteError, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoHome, IoRefreshOutline } from "react-icons/io5";
import Button from "./Button";

const ErrorBoundary = () => {
  const error = useRouteError();
  console.error("Route error:", error);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-lg mx-auto glass-card p-8 rounded-2xl"
      >
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl font-display font-bold gradient-text mb-3">
          Something went wrong
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
          {error?.statusText || error?.message || "An unexpected error occurred while loading this page."}
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            icon={IoRefreshOutline}
            onClick={() => window.location.reload()}
            variant="glass"
          >
            Reload Page
          </Button>
          <Link to="/">
            <Button icon={IoHome}>Back to Home</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorBoundary;

