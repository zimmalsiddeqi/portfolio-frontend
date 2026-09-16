import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { IoMail, IoLockClosed, IoLogInOutline, IoArrowBack } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import Input from "../../components/shared/Input";
import Button from "../../components/shared/Button";
import GlassCard from "../../components/shared/GlassCard";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) navigate("/admin/dashboard");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success("Welcome back!");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-500 mb-6 transition-colors"
        >
          <IoArrowBack className="w-4 h-4" />
          Back to Home
        </Link>

        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-neon"
            >
              <IoLockClosed className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-3xl font-display font-bold mb-2">Admin Login</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign in to manage your portfolio
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="admin@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                className="!pl-11"
              />
              <IoMail className="absolute left-3.5 top-[38px] w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="relative">
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                className="!pl-11"
              />
              <IoLockClosed className="absolute left-3.5 top-[38px] w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <Button
              type="submit"
              loading={loading}
              icon={IoLogInOutline}
              className="w-full"
              size="lg"
            >
              Sign In
            </Button>
          </form>
        </GlassCard>
      </motion.div>
    </div>
  );
};

export default LoginPage;