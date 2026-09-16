import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { IoHome, IoRocket } from "react-icons/io5";
import Button from "../../components/shared/Button";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="text-9xl mb-8"
        >
          🚀
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-display font-bold gradient-text mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have wandered off into space.
        </p>
        <Link to="/">
          <Button icon={IoHome} size="lg">
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;