import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

// Public
import Navbar from "./components/public/Navbar";
import Footer from "./components/public/Footer";
import ThreeBackground from "./components/shared/ThreeBackground";
import ScrollToTop from "./components/shared/ScrollToTop";
import HomePage from "./pages/public/HomePage";
import ProjectDetailPage from "./pages/public/ProjectDetailPage";
import NotFoundPage from "./pages/public/NotFoundPage";
import WhatsAppFloat from "./components/shared/WhatsAppFloat";

// Admin
import AdminLayout from "./components/admin/AdminLayout";
import LoginPage from "./pages/admin/LoginPage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProjectsPage from "./pages/admin/ProjectsPage";
import AddProjectPage from "./pages/admin/AddProjectPage";
import EditProjectPage from "./pages/admin/EditProjectPage";
import MessagesPage from "./pages/admin/MessagesPage";
import ProfileSettingsPage from "./pages/admin/ProfileSettingsPage";

import { useAuth } from "./hooks/useAuth";
import Loader from "./components/shared/Loader";

// Public Layout Wrapper
const PublicLayout = () => (
  <>
    <ThreeBackground />
    <Navbar />
    <AnimatePresence mode="wait">
      <Outlet />
    </AnimatePresence>
    <Footer />
    <ScrollToTop />
    <WhatsAppFloat />
  </>
);

// Protected Route
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader fullScreen />;
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  return children;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "project/:slug", element: <ProjectDetailPage /> },
    ],
  },
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "projects", element: <ProjectsPage /> },
      { path: "projects/new", element: <AddProjectPage /> },
      { path: "projects/edit/:id", element: <EditProjectPage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "profile", element: <ProfileSettingsPage /> },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

export default router;