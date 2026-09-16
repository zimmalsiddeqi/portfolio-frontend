import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminNavbar from "./AdminNavbar";
import { useMessages } from "../../hooks/useMessages";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { unreadCount } = useMessages();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <AdminSidebar
        unreadCount={unreadCount}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="lg:ml-64 flex flex-col min-h-screen transition-all duration-300">
        <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-3 sm:p-4 lg:p-8 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;